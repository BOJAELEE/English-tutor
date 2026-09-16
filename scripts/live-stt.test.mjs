import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const app = fs.readFileSync(new URL("../web/app.js", import.meta.url), "utf8");
const start = app.indexOf("/* ==================== 음성: STT ==================== */");
const end = app.indexOf("/* ==================== AI API", start);
assert.ok(start >= 0 && end > start, "STT 구간을 찾을 수 있어야 합니다.");
const sttCode = app.slice(start, end);

const recognizers = [];
const uiEvents = [];
const toneEvents = [];

class MockRecognition {
  constructor() {
    this.abortCount = 0;
    recognizers.push(this);
  }

  start() { this.started = true; }
  abort() { this.abortCount++; }
  startEvent() { this.onstart(); }
  audioStart() { this.onaudiostart(); }

  final(text, index = 0) {
    this.onresult({ resultIndex: index, results: [{ isFinal: true, 0: { transcript: text } }] });
  }
}

class MockOscillator {
  constructor() {
    this.frequency = { setValueAtTime() {} };
  }

  connect() {}
  disconnect() {}
  start() { toneEvents.push("start"); }
  stop(at) { if (at === undefined) toneEvents.push("cancel"); }
}

class MockGain {
  constructor() {
    this.gain = {
      setValueAtTime() {},
      exponentialRampToValueAtTime() {},
    };
  }

  connect() {}
  disconnect() {}
}

class MockAudioContext {
  constructor() {
    this.currentTime = 0;
    this.destination = {};
    this.state = "running";
  }

  createOscillator() { return new MockOscillator(); }
  createGain() { return new MockGain(); }
}

const context = vm.createContext({
  window: { SpeechRecognition: MockRecognition, AudioContext: MockAudioContext },
  setTimeout,
  clearTimeout,
  Set,
});

vm.runInContext(`
  const ui = {
    mic: (value, message) => globalThis.__uiEvents.push(["mic", value, message]),
  };
  const ANSWER_SPEECH_PAUSE_MS = 40;
  ${sttCode}
  globalThis.__stt = { listen, stopActiveListening };
`, Object.assign(context, { __uiEvents: uiEvents }));

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const result = context.__stt.listen("en-US", 2000, true);
const first = recognizers.at(-1);
assert.ok(first.started, "질문 음성 종료 후 인식을 즉시 시작해야 합니다.");
assert.equal(first.continuous, false, "한 인식기에서 연속 인식해 결과를 중복시키면 안 됩니다.");
assert.equal(first.interimResults, true, "임시 결과는 발화가 이어지는지 판단하는 데 사용해야 합니다.");
assert.equal(first.maxAlternatives, 1, "후보 선택으로 원문을 바꾸면 안 됩니다.");
assert.equal(JSON.stringify(uiEvents.at(-1)), JSON.stringify(["mic", true, "마이크 준비 중..."]), "실제 입력 전에는 준비 상태를 보여야 합니다.");
first.startEvent();
first.audioStart();
assert.equal(JSON.stringify(uiEvents.at(-1)), JSON.stringify(["mic", true, "말씀하세요"]), "실제 마이크 입력 시작 뒤에만 말하기 안내를 보여야 합니다.");
assert.equal(toneEvents.filter(event => event === "start").length, 1, "실제 마이크 입력 시작 뒤에 안내음이 한 번 울려야 합니다.");

first.final("I am");
first.final("I am");
first.onend();

const second = recognizers.at(-1);
assert.notEqual(second, first, "첫 구절 뒤 새 인식기를 이벤트 대기 없이 즉시 열어야 합니다.");
second.startEvent();
second.audioStart();
assert.equal(toneEvents.filter(event => event === "start").length, 1, "문장 중 자동 재시작에는 안내음을 다시 울리면 안 됩니다.");
second.final("Bojae");
second.onend();

const third = recognizers.at(-1);
third.final("and I work here");
third.onend();
await wait(70);
assert.equal(JSON.stringify(await result), JSON.stringify({ text: "I am Bojae and I work here", alternatives: [] }), "1초 안팎의 여러 휴지 뒤 구절을 순서대로 한 번만 합쳐야 합니다.");

const repeatedResult = context.__stt.listen("en-US", 2000, true);
const repeatedFirst = recognizers.at(-1);
repeatedFirst.startEvent();
repeatedFirst.audioStart();
repeatedFirst.final("I am");
repeatedFirst.onend();
const repeatedSecond = recognizers.at(-1);
repeatedSecond.final("I am Bojae");
repeatedSecond.onend();
await wait(70);
assert.equal(JSON.stringify(await repeatedResult), JSON.stringify({ text: "I am I am Bojae", alternatives: [] }), "사용자가 실제로 반복한 말은 삭제하지 않아야 합니다.");

const pausedResult = context.__stt.listen("en-US", 2000, true);
const pausedRecognizer = recognizers.at(-1);
pausedRecognizer.startEvent();
pausedRecognizer.audioStart();
const toneCancelsBeforePause = toneEvents.filter(event => event === "cancel").length;
context.__stt.stopActiveListening("paused");
assert.equal(JSON.stringify(await pausedResult), JSON.stringify({ error: "paused" }));
assert.equal(pausedRecognizer.abortCount, 1, "일시정지는 현재 브라우저 인식을 즉시 중단해야 합니다.");
assert.equal(toneEvents.filter(event => event === "cancel").length, toneCancelsBeforePause + 1, "일시정지는 진행 중인 안내음도 즉시 중단해야 합니다.");

const fallbackResult = context.__stt.listen("en-US", 2000, true);
const fallbackRecognizer = recognizers.at(-1);
const toneStartsBeforeFallback = toneEvents.filter(event => event === "start").length;
fallbackRecognizer.startEvent();
await wait(320);
assert.equal(toneEvents.filter(event => event === "start").length, toneStartsBeforeFallback + 1, "audiostart가 없으면 start 뒤 안전 대기 후 안내음을 울려야 합니다.");
context.__stt.stopActiveListening();
await fallbackResult;

assert.doesNotMatch(sttCode, /LIVE_STT|listenWithGeminiLive|WebSocket/, "음성 인식 경로에 Gemini Live 연결이 남아 있으면 안 됩니다.");
assert.match(app, /음성인식 원문은 단어 오인식·누락이 있을 수 있는 참고 자료입니다/, "불완전한 브라우저 인식만으로 오답 처리하면 안 됩니다.");
console.log("Browser STT mock tests passed");
