import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const app = fs.readFileSync(new URL("../web/app.js", import.meta.url), "utf8");
const start = app.indexOf("/* ==================== 음성: STT ==================== */");
const end = app.indexOf("/* ==================== AI API", start);
assert.ok(start >= 0 && end > start, "STT 구간을 찾을 수 있어야 합니다.");

const tracks = [];
const uiEvents = [];
const sockets = [];
const warnings = [];
let processor;
let audioContext;

class MockSocket {
  static OPEN = 1;
  static CLOSING = 2;

  constructor(url) {
    this.url = url;
    this.readyState = MockSocket.OPEN;
    this.sent = [];
    sockets.push(this);
  }

  send(message) { this.sent.push(JSON.parse(message)); }

  close() {
    this.readyState = 3;
    this.closed = true;
    if (this.onclose) this.onclose();
  }
}

class MockRecognition {
  constructor() { this.abortCount = 0; }

  start() {
    queueMicrotask(() => this.onresult({
      resultIndex: 0,
      results: [{ isFinal: true, 0: { transcript: "browser fallback" } }],
    }));
  }

  abort() { this.abortCount++; }
}

class MockAudioContext {
  constructor() {
    this.sampleRate = 48000;
    this.destination = {};
    audioContext = this;
  }

  resume() { return Promise.resolve(); }
  close() { this.closed = true; return Promise.resolve(); }
  createMediaStreamSource() { return { connect() {}, disconnect() {} }; }
  createScriptProcessor() {
    processor = { connect() {}, disconnect() {}, onaudioprocess: null };
    return processor;
  }
}

const stream = {
  getTracks() {
    return [{ stop() { tracks.push("stopped"); } }];
  },
};
const context = vm.createContext({
  window: {
    SpeechRecognition: MockRecognition,
    WebSocket: MockSocket,
    AudioContext: MockAudioContext,
  },
  WebSocket: MockSocket,
  navigator: { mediaDevices: { getUserMedia: () => Promise.resolve(stream) } },
  btoa: value => Buffer.from(value, "binary").toString("base64"),
  setTimeout,
  clearTimeout,
  queueMicrotask,
  console: { warn: (...args) => warnings.push(args.join(" ")), log() {} },
});

vm.runInContext(`
  const LS = { geminiKey: "test-key" };
  const ui = {
    mic: value => globalThis.__uiEvents.push(["mic", value]),
    sub: value => globalThis.__uiEvents.push(["sub", value]),
  };
  const ANSWER_SPEECH_PAUSE_MS = 1;
  ${app.slice(start, end)}
  globalThis.__stt = { buildGeminiLiveSetup, geminiLiveFallbackMessage, listenWithGeminiLive, listen, stopActiveListening };
`, Object.assign(context, { __uiEvents: uiEvents }));

const setup = context.__stt.buildGeminiLiveSetup();
assert.equal(setup.setup.realtimeInputConfig.automaticActivityDetection.silenceDurationMs, 3500);
assert.equal(setup.setup.realtimeInputConfig.automaticActivityDetection.endOfSpeechSensitivity, "END_SENSITIVITY_LOW");
assert.equal(JSON.stringify(setup.setup.inputAudioTranscription), "{}");
assert.equal(JSON.stringify(setup.setup.generationConfig.responseModalities), "[\"AUDIO\"]");
assert.equal("responseModalities" in setup.setup, false, "Native Audio Live 모델은 응답 형식을 generationConfig 안에서 받아야 합니다.");

const liveResult = context.__stt.listenWithGeminiLive(2000);
const liveSocket = sockets.at(-1);
liveSocket.onopen();
assert.equal(liveSocket.sent[0].setup.model, "models/gemini-2.5-flash-native-audio-latest");
liveSocket.onmessage({ data: JSON.stringify({ setupComplete: {} }) });
await new Promise(resolve => setImmediate(resolve));
processor.onaudioprocess({
  inputBuffer: { getChannelData: () => new Float32Array(2048).fill(0.25) },
  outputBuffer: { getChannelData: () => new Float32Array(2048) },
});
assert.equal(liveSocket.sent[1].realtimeInput.audio.mimeType, "audio/pcm;rate=16000");
assert.equal(Buffer.from(liveSocket.sent[1].realtimeInput.audio.data, "base64").byteLength, 1024, "Live에는 16kHz 32ms PCM 단위만 전송해야 합니다.");
let advancedBeforeServerTurnEnds = false;
liveResult.then(() => { advancedBeforeServerTurnEnds = true; });
await new Promise(resolve => setTimeout(resolve, 500));
assert.equal(advancedBeforeServerTurnEnds, false, "0.5초의 말 사이 휴지는 앱에서 발화를 끝내면 안 됩니다.");
liveSocket.onmessage({ data: JSON.stringify({ serverContent: { inputTranscription: { text: "I am Bojae" } } }) });
assert.equal(JSON.stringify(await liveResult), JSON.stringify({ text: "I am Bojae", alternatives: [] }));
assert.ok(tracks.length > 0 && audioContext.closed && liveSocket.closed, "완료 시 Live 자원을 닫아야 합니다.");

const cancelled = context.__stt.listenWithGeminiLive(2000);
const cancelSocket = sockets.at(-1);
cancelSocket.onopen();
cancelSocket.onmessage({ data: JSON.stringify({ setupComplete: {} }) });
await new Promise(resolve => setImmediate(resolve));
context.__stt.stopActiveListening("paused");
assert.equal(JSON.stringify(await cancelled), JSON.stringify({ error: "paused" }));
assert.ok(cancelSocket.closed, "일시정지는 Live WebSocket을 즉시 닫아야 합니다.");

const fallback = context.__stt.listen("en-US", 2000, true);
const fallbackSocket = sockets.at(-1);
fallbackSocket.onerror();
fallbackSocket.onclose({ code: 1006 });
assert.equal(JSON.stringify(await fallback), JSON.stringify({ text: "browser fallback", alternatives: [] }));
assert.ok(uiEvents.some(([, text]) => typeof text === "string" && text.startsWith("Gemini Live WebSocket 연결이 끊겼습니다 (코드 1006). 브라우저 인식으로 전환합니다.") && text.includes("진단 코드: LIVE_1006")));

const serverFallback = context.__stt.listen("en-US", 2000, true);
const serverSocket = sockets.at(-1);
serverSocket.onopen();
serverSocket.onmessage({ data: JSON.stringify({ error: { status: "PERMISSION_DENIED" } }) });
assert.equal(JSON.stringify(await serverFallback), JSON.stringify({ text: "browser fallback", alternatives: [] }));
assert.ok(warnings.some(message => message.includes("server:PERMISSION_DENIED")));
assert.equal(context.__stt.geminiLiveFallbackMessage("server:RESOURCE_EXHAUSTED"), "Gemini 무료 할당량 문제로 브라우저 인식으로 전환합니다.");
assert.equal(context.__stt.geminiLiveFallbackMessage("microphone:NotAllowedError"), "Gemini용 마이크 연결에 실패해 브라우저 인식으로 전환합니다.");
assert.equal(context.__stt.geminiLiveFallbackMessage("websocket-close:1008"), "Gemini Live 접근이 거절됐습니다 (코드 1008). API 키·Live 권한을 확인해 주세요.");
assert.equal(context.__stt.geminiLiveFallbackMessage("websocket-close:1007"), "Gemini Live 오디오 데이터를 처리하지 못했습니다 (코드 1007). 브라우저 인식으로 전환합니다.");
assert.match(
  context.__stt.geminiLiveFallbackMessage("websocket-close:1007:invalid audio payload", { phase: "PCM 전송", trackRate: 48000, trackChannels: 1, contextRate: 16000, framesSent: 2 }),
  /진단 코드: LIVE_1007\n실패 단계: PCM 전송\n모델: gemini-2\.5-flash-native-audio-latest\n실제 입력: 48000Hz \/ 1채널 · 컨텍스트 16000Hz\n전송: PCM 16kHz \/ 16비트 \/ 모노 · 2프레임\n서버 사유: invalid audio payload/
);

assert.match(app, /r\.continuous = false;/);
assert.match(app, /r\.interimResults = false;/);
assert.match(app, /r\.maxAlternatives = 1;/);
console.log("Live STT mock tests passed");
