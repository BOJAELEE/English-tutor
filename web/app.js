"use strict";

/* ==================== 저장소 ==================== */
const CURRICULUM_VERSION = "263-patterns-prefixes-removed-v1";
const LS = {
  get apiKey() { return localStorage.getItem("apiKey") || ""; },
  set apiKey(v) { localStorage.setItem("apiKey", v); },
  get geminiKey() { return localStorage.getItem("geminiKey") || ""; },
  set geminiKey(v) { localStorage.setItem("geminiKey", v); },
  get engine() { return localStorage.getItem("engine") || "claude"; },
  set engine(v) { localStorage.setItem("engine", v); },
  get koreanVoice() { return localStorage.getItem("koreanVoice") || ""; },
  set koreanVoice(v) { localStorage.setItem("koreanVoice", v); },
  get englishVoice() { return localStorage.getItem("englishVoice") || ""; },
  set englishVoice(v) { localStorage.setItem("englishVoice", v); },
  get googleTtsKey() { return localStorage.getItem("googleTtsKey") || ""; },
  set googleTtsKey(v) { localStorage.setItem("googleTtsKey", v); },
  get ttsEngine() { return localStorage.getItem("ttsEngine") || "browser"; },
  set ttsEngine(v) { localStorage.setItem("ttsEngine", v); },
  get googleKoreanVoice() { return localStorage.getItem("googleKoreanVoice") || ""; },
  set googleKoreanVoice(v) { localStorage.setItem("googleKoreanVoice", v); },
  get googleEnglishVoice() { return localStorage.getItem("googleEnglishVoice") || ""; },
  set googleEnglishVoice(v) { localStorage.setItem("googleEnglishVoice", v); },
  get progress() {
    let v;
    try { v = JSON.parse(localStorage.getItem("progress")); } catch { v = null; }
    if (!v) return { day: 1, pos: 0 };
    if (typeof v.pos === "number") return v;
    // 기존 {day, session, index} 형식 마이그레이션
    const sessions = buildSessions(v.day || 1);
    let pos = 0;
    for (let i = 0; i < (v.session || 0); i++) pos += sessions[i] ? sessions[i].tasks.length : 0;
    pos += v.index || 0;
    const migrated = { day: v.day || 1, pos };
    localStorage.setItem("progress", JSON.stringify(migrated));
    return migrated;
  },
  set progress(v) { localStorage.setItem("progress", JSON.stringify(v)); },
  get cache() {
    try { return JSON.parse(localStorage.getItem("promptCache")) || {}; }
    catch { return {}; }
  },
  cacheSet(key, val) {
    const c = LS.cache; c[key] = val;
    localStorage.setItem("promptCache", JSON.stringify(c));
  },
};

function applyCurriculumVersion() {
  if (localStorage.getItem("curriculumVersion") === CURRICULUM_VERSION) return;
  localStorage.removeItem("progress");
  localStorage.removeItem("promptCache");
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key && key.startsWith("reviewPicks_")) localStorage.removeItem(key);
  }
  localStorage.setItem("curriculumVersion", CURRICULUM_VERSION);
}
applyCurriculumVersion();

/* ==================== 음성: TTS ==================== */
let voices = [];
const KOREAN_SPEECH_RATE = 1.1;
const ANSWER_LISTEN_TIMEOUT_MS = 45000;
const ANSWER_SPEECH_PAUSE_MS = 3500;
function loadVoices() { voices = speechSynthesis.getVoices(); }
loadVoices();
if (speechSynthesis.onvoiceschanged !== undefined) speechSynthesis.onvoiceschanged = loadVoices;

function pickVoice(lang) {
  const exact = voices.filter(v => v.lang.replace("_", "-").startsWith(lang.slice(0, 2)));
  const overrideURI = lang.startsWith("ko") ? LS.koreanVoice : LS.englishVoice;
  if (overrideURI) {
    const chosen = exact.find(v => v.voiceURI === overrideURI);
    if (chosen) return chosen;
  }
  return exact.find(v => !v.localService) || exact[0] || null;
}

function populateVoiceSelect(selectEl, lang, savedURI) {
  const langPrefix = lang.slice(0, 2);
  const opts = voices.filter(v => v.lang.replace("_", "-").startsWith(langPrefix));
  selectEl.textContent = "";
  const def = document.createElement("option");
  def.value = ""; def.textContent = "자동 선택";
  selectEl.appendChild(def);
  opts.forEach(v => {
    const o = document.createElement("option");
    o.value = v.voiceURI;
    o.textContent = v.name + (v.localService ? " (기기 내장)" : " (네트워크)");
    selectEl.appendChild(o);
  });
  selectEl.value = savedURI && opts.some(v => v.voiceURI === savedURI) ? savedURI : "";
}

function previewVoice(lang, voiceURI) {
  const sample = lang.startsWith("ko") ? "안녕하세요, 이 목소리로 학습을 진행합니다." : "Hello, I'm about to leave the house.";
  return new Promise(resolve => {
    const u = new SpeechSynthesisUtterance(sample);
    u.lang = lang;
    if (voiceURI) {
      const v = voices.find(x => x.voiceURI === voiceURI);
      if (v) u.voice = v;
    }
    u.rate = lang.startsWith("en") ? 0.92 : KOREAN_SPEECH_RATE;
    u.onend = resolve;
    u.onerror = resolve;
    speechSynthesis.speak(u);
  });
}

function populateGoogleVoiceSelect(selectEl, savedName) {
  selectEl.textContent = "";
  GOOGLE_TTS_VOICES.forEach(name => {
    const o = document.createElement("option");
    o.value = name; o.textContent = name;
    selectEl.appendChild(o);
  });
  selectEl.value = GOOGLE_TTS_VOICES.includes(savedName) ? savedName : GOOGLE_TTS_DEFAULT_VOICE;
}

async function previewGoogleVoice(lang, voiceName) {
  const key = $("input-google-tts-key").value.trim();
  if (!key) { alert("먼저 API 키를 입력하세요."); return; }
  const sample = lang.startsWith("ko") ? "안녕하세요, 이 목소리로 학습을 진행합니다." : "Hello, I'm about to leave the house.";
  try { await synthesizeAndPlayGoogle(sample, lang, voiceName, key); }
  catch (e) { alert("Google TTS 미리듣기 실패: " + e.message); }
}

function updateTtsEngineFieldsVisibility() {
  const isGoogle = $("input-tts-engine").value === "google";
  $("field-google-tts-key").classList.toggle("hidden", !isGoogle);
  $("field-korean-voice-browser").classList.toggle("hidden", isGoogle);
  $("field-english-voice-browser").classList.toggle("hidden", isGoogle);
  $("field-korean-voice-google").classList.toggle("hidden", !isGoogle);
  $("field-english-voice-google").classList.toggle("hidden", !isGoogle);
}

function speakBrowser(text, lang) {
  return new Promise(resolve => {
    if (!text) return resolve();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    const v = pickVoice(lang);
    if (v) u.voice = v;
    u.rate = lang.startsWith("en") ? 0.92 : KOREAN_SPEECH_RATE;
    u.onend = resolve;
    u.onerror = resolve;
    speechSynthesis.speak(u);
  });
}

/* ==================== 음성: Google Cloud TTS ==================== */
const GOOGLE_TTS_VOICES = ["Aoede", "Charon", "Fenrir", "Kore", "Leda", "Orus", "Puck", "Zephyr"];
const GOOGLE_TTS_DEFAULT_VOICE = "Aoede";

function resolveGoogleVoice(lang) {
  const saved = lang.startsWith("ko") ? LS.googleKoreanVoice : LS.googleEnglishVoice;
  return GOOGLE_TTS_VOICES.includes(saved) ? saved : GOOGLE_TTS_DEFAULT_VOICE;
}

function buildGoogleTtsRequestBody(text, lang, voiceName) {
  return {
    input: { text },
    voice: { languageCode: lang, name: lang + "-Chirp3-HD-" + voiceName },
    audioConfig: {
      audioEncoding: "MP3",
      speakingRate: lang.startsWith("ko") ? KOREAN_SPEECH_RATE : 1.0,
    },
  };
}

let googleTtsAbort = null;   // 진행 중인 fetch를 취소하기 위한 AbortController
let currentAudio = null;     // 현재 재생 중인 Audio 엘리먼트 (Google TTS 전용)
let audioStopResolve = null; // 진행 중인 synthesizeAndPlayGoogle() 프라미스의 대기 중 resolve

function synthesizeAndPlayGoogle(text, lang, voiceName, apiKey = LS.googleTtsKey) {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    googleTtsAbort = controller;
    fetch(
      "https://texttospeech.googleapis.com/v1/text:synthesize?key=" + encodeURIComponent(apiKey),
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(buildGoogleTtsRequestBody(text, lang, voiceName)),
        signal: controller.signal,
      }
    )
      .then(res => {
        if (!res.ok) return res.text().then(t => {
          const err = new Error("Google TTS API 오류 " + res.status + ": " + t.slice(0, 200));
          err.status = res.status;
          throw err;
        });
        return res.json();
      })
      .then(data => {
        googleTtsAbort = null;
        if (!data.audioContent) throw new Error("Google TTS 응답에 audioContent 없음");
        const audio = new Audio("data:audio/mp3;base64," + data.audioContent);
        currentAudio = audio;
        audioStopResolve = resolve;
        audio.onended = () => { currentAudio = null; audioStopResolve = null; resolve(); };
        audio.onerror = () => { currentAudio = null; audioStopResolve = null; reject(new Error("Google TTS 오디오 재생 오류")); };
        return audio.play();
      })
      .catch(e => {
        googleTtsAbort = null;
        currentAudio = null;
        if (e && e.name === "AbortError") { audioStopResolve = null; resolve(); return; }
        audioStopResolve = null;
        reject(e);
      });
  });
}

function speakGoogle(text, lang) {
  if (!text) return Promise.resolve();
  return synthesizeAndPlayGoogle(text, lang, resolveGoogleVoice(lang));
}

function stopCurrentAudio() {
  if (googleTtsAbort) { googleTtsAbort.abort(); googleTtsAbort = null; }
  if (currentAudio) { currentAudio.pause(); currentAudio.src = ""; currentAudio = null; }
  if (audioStopResolve) { const r = audioStopResolve; audioStopResolve = null; r(); }
}

async function speak(text, lang) {
  if (!text) return;
  if (LS.ttsEngine === "google" && LS.googleTtsKey) {
    try { await speakGoogle(text, lang); return; }
    catch (e) { console.error("Google TTS 실패 - 브라우저 음성으로 대체:", e); }
  }
  await speakBrowser(text, lang);
}

/* ==================== 음성: STT ==================== */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

function transcriptWords(text) {
  return text.trim().split(/\s+/).filter(Boolean);
}

function comparableWord(word) {
  return word.toLowerCase().replace(/^[^a-z0-9']+|[^a-z0-9']+$/g, "");
}

function sameTranscriptWords(a, b) {
  return comparableWord(a) === comparableWord(b);
}

function mergeRecognitionSegment(previous, next) {
  const previousWords = transcriptWords(previous);
  const nextWords = transcriptWords(next);
  if (!previousWords.length) return nextWords.join(" ");
  if (!nextWords.length) return previousWords.join(" ");

  const previousIsPrefix = previousWords.length <= nextWords.length
    && previousWords.every((word, i) => sameTranscriptWords(word, nextWords[i]));
  if (previousIsPrefix) return nextWords.join(" ");

  const nextIsPrefix = nextWords.length <= previousWords.length
    && nextWords.every((word, i) => sameTranscriptWords(word, previousWords[i]));
  if (nextIsPrefix) return previousWords.join(" ");

  let sharedPrefixLength = 0;
  const maxSharedPrefix = Math.min(previousWords.length, nextWords.length);
  while (sharedPrefixLength < maxSharedPrefix
    && sameTranscriptWords(previousWords[sharedPrefixLength], nextWords[sharedPrefixLength])) {
    sharedPrefixLength++;
  }
  if (sharedPrefixLength >= 2 && sharedPrefixLength * 2 >= Math.min(previousWords.length, nextWords.length)) {
    return nextWords.join(" ");
  }

  let overlap = Math.min(previousWords.length, nextWords.length);
  while (overlap > 0 && !previousWords.slice(-overlap)
    .every((word, i) => sameTranscriptWords(word, nextWords[i]))) overlap--;
  return previousWords.concat(nextWords.slice(overlap)).join(" ");
}

function mergeRecognitionResults(results, alternativeIndex = 0) {
  return Array.from(results, result => (result[alternativeIndex] || result[0]).transcript)
    .reduce((transcript, segment) => mergeRecognitionSegment(transcript, segment), "");
}

function mergeRecognitionAlternatives(results) {
  const alternativeCount = Array.from(results)
    .reduce((count, result) => Math.max(count, result.length), 0);
  const merged = Array.from({ length: alternativeCount }, (_, i) => mergeRecognitionResults(results, i));
  const rawCandidates = Array.from(results, result => Array.from(result, alt => alt.transcript.trim())).flat();
  return [...merged, ...rawCandidates]
    .filter((text, i, all) => text && all.indexOf(text) === i);
}

function applyRecognitionHints(recognition, hints) {
  const uniqueHints = [...new Set(hints.map(text => text.trim()).filter(Boolean))].slice(0, 20);
  const Phrase = window.SpeechRecognitionPhrase || window.webkitSpeechRecognitionPhrase;
  if (Phrase && "phrases" in recognition) {
    try { recognition.phrases = uniqueHints.map(text => new Phrase(text, 8)); } catch {}
  }

  const GrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
  if (GrammarList && "grammars" in recognition && uniqueHints.length) {
    const phrases = uniqueHints.map(text => text.replace(/[^a-zA-Z0-9'\s]/g, " ")
      .replace(/\s+/g, " ").trim()).filter(Boolean);
    if (!phrases.length) return;
    try {
      const grammars = new GrammarList();
      grammars.addFromString("#JSGF V1.0; grammar tutor; public <phrase> = " + phrases.join(" | ") + " ;", 1);
      recognition.grammars = grammars;
    } catch {}
  }
}

function listen(lang, timeoutMs, keepListeningOnNoSpeech = false, hints = []) {
  return new Promise(resolve => {
    if (!SR) return resolve({ error: "unsupported" });
    const r = new SR();
    r.lang = lang;
    r.continuous = true;
    r.interimResults = true;
    r.maxAlternatives = 5;
    applyRecognitionHints(r, hints);
    let done = false;
    let heard = "";
    let heardAlternatives = [];
    let speechEndTimer = null;
    let restartTimer = null;
    const finish = res => {
      if (!done) {
        done = true;
        clearTimeout(timer);
        clearTimeout(speechEndTimer);
        clearTimeout(restartTimer);
        ui.mic(false);
        resolve(res);
      }
    };
    const restartIfWaiting = () => {
      if (!keepListeningOnNoSpeech || done) return false;
      clearTimeout(restartTimer);
      restartTimer = setTimeout(() => {
        try { r.start(); }
        catch (e) {
          if (e.name !== "InvalidStateError") finish(heard ? { text: heard, alternatives: heardAlternatives } : { error: "start-failed" });
        }
      }, 100);
      return true;
    };
    const finishAfterSpeechEnd = () => {
      if (done) return;
      clearTimeout(speechEndTimer);
      speechEndTimer = setTimeout(() => {
        finish(heard ? { text: heard, alternatives: heardAlternatives } : { error: "no-speech" });
        try { r.stop(); } catch {}
      }, ANSWER_SPEECH_PAUSE_MS);
    };
    const timer = setTimeout(() => {
      finish(heard ? { text: heard, alternatives: heardAlternatives } : { error: "timeout" });
      try { r.stop(); } catch {}
    }, timeoutMs || 12000);
    r.onspeechstart = () => {
      clearTimeout(speechEndTimer);
    };
    r.onspeechend = finishAfterSpeechEnd;
    r.onresult = e => {
      const currentAlternatives = mergeRecognitionAlternatives(e.results);
      const mergedAlternatives = currentAlternatives
        .map(candidate => mergeRecognitionSegment(heard, candidate));
      heard = mergedAlternatives[0] || heard;
      heardAlternatives = [...new Set([...mergedAlternatives, ...currentAlternatives])];
    };
    r.onerror = e => {
      if (e.error === "no-speech") {
        if (heard) finishAfterSpeechEnd();
        if (restartIfWaiting()) return;
      }
      finish(heard ? { text: heard, alternatives: heardAlternatives } : { error: e.error });
    };
    r.onend = () => {
      if (done) return;
      if (heard) finishAfterSpeechEnd();
      if (restartIfWaiting()) return;
      finish(heard ? { text: heard, alternatives: heardAlternatives } : { error: "no-speech" });
    };
    ui.mic(true);
    try { r.start(); } catch { finish({ error: "start-failed" }); }
  });
}

/* ==================== AI API (Claude / Gemini) ==================== */
const SYSTEM_PROMPT =
  "당신은 한국인을 위한 영어회화 튜터입니다. 반드시 요청된 JSON 형식으로만 응답하세요. 다른 텍스트는 출력하지 마세요.";

function currentKey() { return LS.engine === "gemini" ? LS.geminiKey : LS.apiKey; }

/* 일시 오류(과부하/한도)는 자동 재시도 */
async function callLLM(user, maxTokens) {
  let lastErr;
  for (let i = 0; i < 3; i++) {
    try {
      return await (LS.engine === "gemini" ? callGemini(user, maxTokens) : callClaude(user, maxTokens));
    } catch (e) {
      lastErr = e;
      if (e.status === 429 || e.status >= 500) {
        await new Promise(r => setTimeout(r, 2000 * (i + 1)));
        continue;
      }
      throw e;
    }
  }
  throw lastErr;
}

/* 키에서 사용 가능한 텍스트 생성용 flash 모델을 자동 탐색 (결과 캐시) */
const geminiFailed = new Set();
const geminiBusy = {};

async function resolveGeminiModel() {
  const cached = localStorage.getItem("geminiModel");
  if (cached && !geminiFailed.has(cached)) return cached;
  let model = "gemini-flash-latest";
  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models?pageSize=1000&key="
      + encodeURIComponent(LS.geminiKey));
    if (res.ok) {
      const data = await res.json();
      const names = (data.models || [])
        .filter(m => (m.supportedGenerationMethods || []).includes("generateContent"))
        .map(m => m.name.replace("models/", ""))
        .filter(n => !/(image|tts|audio|live|embed|vision)/.test(n))
        .filter(n => !geminiFailed.has(n));
      const prefs = [
        /^gemini-flash-latest$/,
        /^gemini-\d[\d.]*-flash$/,
        /^gemini-[\d.]+-flash-\d+$/,
        /flash-latest/,
        /flash(?!-lite)/,
        /flash/,
      ];
      for (const re of prefs) {
        const hit = names.find(n => re.test(n));
        if (hit) { model = hit; break; }
      }
    }
  } catch {}
  localStorage.setItem("geminiModel", model);
  return model;
}

async function callGemini(user, maxTokens) {
  const model = await resolveGeminiModel();
  const url = "https://generativelanguage.googleapis.com/v1beta/models/" + model
    + ":generateContent?key=" + encodeURIComponent(LS.geminiKey);
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ role: "user", parts: [{ text: user }] }],
      generationConfig: {
        maxOutputTokens: (maxTokens || 400) + 2000, // thinking 토큰 여유분
        responseMimeType: "application/json",
      },
    }),
  });
  if (!res.ok) {
    if (res.status === 404) { // 이 모델 제외하고 다음 시도에 재탐색
      geminiFailed.add(model);
      localStorage.removeItem("geminiModel");
    }
    if (res.status === 503 || res.status === 429) { // 과부하/한도: 2회 연속이면 다른 모델로 전환
      geminiBusy[model] = (geminiBusy[model] || 0) + 1;
      if (geminiBusy[model] >= 2) {
        geminiFailed.add(model);
        localStorage.removeItem("geminiModel");
      }
    }
    const t = await res.text();
    const err = new Error("Gemini API 오류 " + res.status + " (모델: " + model + "): " + t.slice(0, 200));
    err.status = res.status;
    throw err;
  }
  geminiBusy[model] = 0;
  const data = await res.json();
  const cand = (data.candidates && data.candidates[0]) || {};
  const parts = (cand.content && cand.content.parts) || [];
  const text = parts.map(p => p.text || "").join("");
  if (!text) {
    const err = new Error("Gemini 빈 응답 (finishReason: " + (cand.finishReason || "?") + ")");
    err.status = 503; // 재시도 대상으로 처리
    throw err;
  }
  return text;
}

async function callClaude(user, maxTokens) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": LS.apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5",
      max_tokens: maxTokens || 512,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: user }],
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    const err = new Error("Claude API 오류 " + res.status + ": " + t.slice(0, 200));
    err.status = res.status;
    throw err;
  }
  const data = await res.json();
  return data.content.filter(b => b.type === "text").map(b => b.text).join("");
}

function parseJson(text) {
  // 코드펜스 제거
  let s = text.replace(/```json/gi, "").replace(/```/g, "").trim();
  const start = s.indexOf("{");
  if (start > 0) s = s.slice(start);
  try {
    return JSON.parse(s);
  } catch {
    // 잘린 JSON 복구: 열린 문자열/중괄호 닫기
    return JSON.parse(repairJson(s));
  }
}

function repairJson(s) {
  let inStr = false, esc = false, depth = 0;
  let out = "";
  for (const ch of s) {
    out += ch;
    if (esc) { esc = false; continue; }
    if (ch === "\\") { esc = true; continue; }
    if (ch === '"') { inStr = !inStr; continue; }
    if (!inStr) {
      if (ch === "{") depth++;
      else if (ch === "}") depth--;
    }
  }
  if (inStr) out += '"';       // 열린 문자열 닫기
  while (depth-- > 0) out += "}"; // 열린 중괄호 닫기
  return out;
}

/* 세션1: 한국어 상황 제시문 (캐시됨) */
async function getKoreanPrompt(p, exIdx) {
  const key = "p3_" + p.num + "_e" + exIdx;
  const cached = LS.cache[key];
  if (cached) return cached;
  const ex = p.examples[exIdx];
  const raw = await callLLM(
    `영어 문장: "${ex}" (패턴: ${p.title})\n` +
    `학습자가 이 영어 문장을 말하도록 유도하는 한국어 안내문을 만드세요. ` +
    `형식: 짧은 두 문장. 첫 문장은 15자 안팎의 상황 설명, 둘째 문장은 번역할 한국어 표현을 따옴표로 제시하고 "를 영어로 말해보세요."라고 쓰세요. ` +
    `예: "막 나가려던 참이에요. '나 지금 막 나가려던 참이야'를 영어로 말해보세요." ` +
    `영어 정답 문장은 절대 노출하지 마세요.\n` +
    `JSON: {"prompt_ko": "..."}`,
    100
  );
  const val = parseJson(raw).prompt_ko;
  LS.cacheSet(key, val);
  return val;
}

/* 세션2~4: 패턴 유도 영어 질문 (캐시됨) */
async function getQuestion(p) {
  const key = "q" + p.num;
  const cached = LS.cache[key];
  if (cached) return cached;
  const raw = await callLLM(
    `패턴: "${p.title}"\n예문: ${p.examples.join(" / ")}\n` +
    `학습자가 이 패턴을 사용해 대답하게 되는 자연스러운 영어 질문(또는 말)을 한 문장 만드세요.\n` +
    `JSON: {"question_en": "...", "question_ko": "질문의 한국어 해석"}`
  );
  const val = parseJson(raw);
  LS.cacheSet(key, val);
  return val;
}

/* 교정 */
function recognitionCandidates(heard, alternatives = []) {
  return [...new Set([heard, ...alternatives].filter(Boolean))].slice(0, 12);
}

function sanitizeFeedback(feedback) {
  const cleaned = String(feedback || "")
    .replace(/(?:음성\s*인식|인식\s*결과|발음\s*인식|잘\s*안\s*들렸|잘\s*못\s*들었)[^.?!\n]*[.?!]?/gi, "")
    .trim();
  return cleaned || "목표 패턴을 넣어 한 문장으로 말해보세요.";
}

async function checkPattern(p, targetEn, heard, alternatives) {
  const candidates = JSON.stringify(recognitionCandidates(heard, alternatives));
  const raw = await callLLM(
    `학습 목표 패턴: "${p.title}"\n목표 영어 문장: "${targetEn}"\n` +
    `음성인식 첫 결과: "${heard}"\n음성인식 후보: ${candidates}\n` +
    `판정 기준: 목표 문장과 단어 순서가 완전히 같을 필요는 없습니다. 학습자가 목표 패턴(자연스러운 축약·시제 변화 포함)을 사용했고 같은 핵심 뜻을 전달했다면 correct는 true입니다. 후보 중 하나가 조건을 충족하면 correct는 true입니다. feedback_ko에는 음성 인식, 잘 안 들림, 발음 확인, 다시 말해 달라는 내용을 절대 쓰지 말고 학습 표현만 안내하세요.\n` +
    `JSON: {"correct": true 또는 false, "feedback_ko": "짧은 한국어 피드백 한 문장", "model_en": "가장 자연스러운 영어 문장"}`
  );
  return parseJson(raw);
}

async function checkAnswer(p, question, heard, alternatives) {
  const candidates = JSON.stringify(recognitionCandidates(heard, alternatives));
  const raw = await callLLM(
    `학습 목표 패턴: "${p.title}"\n질문: "${question}"\n` +
    `음성인식 첫 결과: "${heard}"\n음성인식 후보: ${candidates}\n` +
    `판정 기준: 모범 답안과 정확히 같은 문장을 요구하지 마세요. 학습자가 이 패턴(자연스러운 축약·시제 변화 포함)을 사용하고 질문에 맞는 뜻을 전달했다면 correct는 true입니다. 후보 중 하나가 조건을 충족하면 correct는 true입니다. feedback_ko에는 음성 인식, 잘 안 들림, 발음 확인, 다시 말해 달라는 내용을 절대 쓰지 말고 학습 표현만 안내하세요.\n` +
    `JSON: {"correct": true 또는 false, "feedback_ko": "짧은 한국어 피드백 한 문장", "model_en": "이 패턴을 사용한 자연스러운 모범 답변 한 문장"}`
  );
  return parseJson(raw);
}

/* ==================== 일상 회화 ==================== */
function conversationPatternContext(patterns) {
  return patterns.map(p => `패턴 ${p.num}: ${p.title} (${p.examples.join(" / ")})`).join("\n");
}

function conversationHistoryText(history) {
  return history.map((turn, i) =>
    `AI ${i + 1}: ${turn.ai}\n학습자 ${i + 1}: ${turn.user || "[답변 없음]"}`
  ).join("\n");
}

async function startDailyConversation(patterns) {
  const raw = await callLLM(
    `오늘 학습한 패턴:\n${conversationPatternContext(patterns)}\n\n` +
    `당신은 친절한 영어 회화 상대입니다. 위 패턴을 자연스럽게 쓸 수 있는 일상 상황으로 짧은 대화를 시작하세요. ` +
    `학습자가 영어로 답할 수 있도록 영어 질문 한 문장만 말하세요. 한국어, 해설, 교정은 넣지 마세요.\n` +
    `JSON: {"reply_en": "..."}`,
    120
  );
  return parseJson(raw);
}

async function continueDailyConversation(patterns, history) {
  const raw = await callLLM(
    `오늘 학습한 패턴:\n${conversationPatternContext(patterns)}\n\n` +
    `대화 기록:\n${conversationHistoryText(history)}\n\n` +
    `당신은 친절한 영어 회화 상대입니다. 학습자의 답변이 배운 패턴과 달라도 교정하거나 대화를 멈추지 말고, ` +
    `의미를 자연스럽게 받아 짧은 영어 답변과 다음 질문 한 문장으로 대화를 이어가세요. ` +
    `답변이 없으면 짧게 격려하고 다음 질문을 하세요. 한국어와 해설은 넣지 마세요.\n` +
    `JSON: {"reply_en": "..."}`,
    140
  );
  return parseJson(raw);
}

async function reviewDailyConversation(patterns, history) {
  const prompt =
    `오늘 학습한 패턴:\n${conversationPatternContext(patterns)}\n\n` +
    `대화 기록:\n${conversationHistoryText(history)}\n\n` +
    `학습자 답변 3개를 코칭하세요. 배운 패턴을 쓰지 않았어도 실패로 판단하지 말고 자연스러운 대화를 칭찬하며, ` +
    `각 답변에 12단어 이하의 더 자연스러운 영어 문장과 20자 이하의 짧은 한국어 이유를 제시하세요. 답변이 없으면 그 상황에서 쓸 수 있는 짧은 영어 문장을 제시하세요. ` +
    `summary_ko는 운전 중 들을 2문장 이하의 짧은 총평입니다.\n` +
    `JSON: {"summary_ko": "...", "reviews": [{"natural_en": "...", "coaching_ko": "..."}, {"natural_en": "...", "coaching_ko": "..."}, {"natural_en": "...", "coaching_ko": "..."}]}`;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const raw = await callLLM(
        prompt + (attempt ? "\n반드시 설명 없이 유효한 JSON만 출력하세요." : ""),
        600
      );
      const review = parseJson(raw);
      if (!review || typeof review !== "object") throw new Error("리뷰 형식이 올바르지 않습니다.");
      return review;
    } catch (e) {
      console.error("일상 회화 리뷰 생성 실패:", e);
    }
  }

  return {
    summary_ko: "대화를 끝까지 잘 이어갔어요. 아래의 추천 표현을 다음 대화에서 편하게 써보세요.",
    reviews: history.map(turn => ({
      natural_en: turn.user || "Could you say that again?",
      coaching_ko: turn.user ? "의미가 잘 전달되었어요." : "다음에는 짧게 대답해보세요.",
    })),
  };
}

/* ==================== 푸시 알림 ==================== */
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}

async function enablePush() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    alert("이 브라우저는 푸시 알림을 지원하지 않습니다.");
    return;
  }
  const perm = await Notification.requestPermission();
  if (perm !== "granted") {
    alert("알림 권한이 거부되었습니다. 브라우저 설정에서 알림을 허용해주세요.");
    return;
  }
  const reg = await navigator.serviceWorker.ready;
  const sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  });
  const json = JSON.stringify(sub);
  $("push-sub-output").value = json;
  $("push-sub-area").classList.remove("hidden");
}

/* ==================== UI ==================== */
const $ = id => document.getElementById(id);
const ui = {
  show(name) {
    ["home", "practice", "settings"].forEach(s => $("screen-" + s).classList.toggle("hidden", s !== name));
  },
  main(t) { $("status-main").textContent = t; },
  mainWithHighlightedQuote(t) {
    const el = $("status-main");
    const quotePattern = /["'“”‘’「」『』]([^"'“”‘’「」『』]+)["'“”‘’「」『』]/g;
    let lastIndex = 0;

    el.textContent = "";
    for (const match of t.matchAll(quotePattern)) {
      el.append(document.createTextNode(t.slice(lastIndex, match.index)));
      const target = document.createElement("span");
      target.className = "target-phrase";
      target.textContent = match[0];
      el.append(target);
      lastIndex = match.index + match[0].length;
    }
    el.append(document.createTextNode(t.slice(lastIndex)));
  },
  sub(t) { $("status-sub").textContent = t; },
  mic(on) { $("mic-indicator").classList.toggle("hidden", !on); },
  header(day, session, done, total) {
    $("ph-day").textContent = "Day " + day;
    $("ph-session").textContent = session;
    $("ph-progress").textContent = done + " / " + total;
  },
  clearConversationReview() {
    const box = $("conversation-review");
    if (!box) return;
    box.textContent = "";
    box.classList.add("hidden");
  },
  showConversationReview(history, reviews) {
    const box = $("conversation-review");
    if (!box) return;
    box.textContent = "";
    const title = document.createElement("div");
    title.className = "conversation-review-title";
    title.textContent = "대화 리뷰";
    box.appendChild(title);
    history.forEach((turn, i) => {
      const review = reviews[i] || {};
      const item = document.createElement("div");
      item.className = "conversation-review-item";
      const heard = document.createElement("div");
      heard.className = "conversation-review-heard";
      heard.textContent = "내 답변: " + (turn.user || "답변 없음");
      const natural = document.createElement("div");
      natural.className = "conversation-review-natural";
      natural.textContent = "더 자연스럽게: " + (review.natural_en || turn.user || "Try a short answer.");
      const coaching = document.createElement("div");
      coaching.className = "conversation-review-coaching";
      coaching.textContent = review.coaching_ko || "다음에는 짧게라도 영어로 답해보세요.";
      item.append(heard, natural, coaching);
      box.appendChild(item);
    });
    box.classList.remove("hidden");
  },
};

/* ==================== 학습 엔진 ==================== */
const state = { running: false, paused: false, skip: false, back: false, quit: false };

function waitWhilePaused() {
  return new Promise(resolve => {
    (function check() {
      if (!state.paused || state.quit) return resolve();
      setTimeout(check, 300);
    })();
  });
}

async function step(fn) {
  if (state.quit) throw { quit: true };
  await waitWhilePaused();
  if (state.quit) throw { quit: true };
  return fn();
}

/* 듣기: 실패 시 재요청, 3회 실패하면 null 반환 */
async function listenWithRetry(hints = []) {
  for (let i = 0; i < 3; i++) {
    if (state.skip || state.back || state.quit) return null;
    const r = await step(() => listen("en-US", ANSWER_LISTEN_TIMEOUT_MS, true, hints));
    if (r.text) return r;
    if (r.error === "unsupported") {
      await step(() => speak("이 브라우저에서는 학습을 계속할 수 없습니다. 크롬으로 열어주세요.", "ko-KR"));
      throw { quit: true };
    }
    if (i < 2) {
      ui.sub("(한 번 더 말해보세요)");
      await step(() => speak("한 번 더 말해보세요.", "ko-KR"));
    }
  }
  return null;
}

async function listenWithConversationRetry(hints = []) {
  for (let i = 0; i < 3; i++) {
    if (state.skip || state.back || state.quit) return null;
    const r = await step(() => listen("en-US", ANSWER_LISTEN_TIMEOUT_MS, true, hints));
    if (r.text) return r;
    if (r.error === "unsupported") {
      await step(() => speak("Speech recognition is not supported in this browser.", "en-US"));
      throw { quit: true };
    }
    if (i < 2) {
      ui.sub("Please say it once more.");
      await step(() => speak("Please say it once more.", "en-US"));
    }
  }
  return null;
}

async function shadow(modelEn) {
  ui.main(modelEn);
  ui.sub("따라 말해보세요 (쉐도잉)");
  await step(() => speak("따라 해보세요.", "ko-KR"));
  await step(() => speak(modelEn, "en-US"));
  const r = await step(() => listen("en-US", ANSWER_LISTEN_TIMEOUT_MS, true, [modelEn]));
  if (r.text) ui.sub("들린 내용: " + r.text);
  await step(() => speak("좋아요.", "ko-KR"));
}

async function runPatternTask(task) {
  const { p, ex, exIdx } = task;
  ui.main("패턴 " + p.num + ": " + p.title);
  ui.sub("상황 안내를 준비 중...");
  const promptKo = await step(() => getKoreanPrompt(p, exIdx));
  ui.mainWithHighlightedQuote(promptKo);
  ui.sub("");
  await step(() => speak(promptKo, "ko-KR"));
  if (state.skip || state.back) return;

  const recognition = await listenWithRetry([p.title, ...p.examples]);
  if (state.skip || state.back) return;

  let feedbackKo, modelEn;
  if (recognition === null) {
    feedbackKo = "괜찮아요. 정답을 알려드릴게요.";
    modelEn = ex;
  } else {
    const heard = recognition.text;
    ui.sub("들린 내용: " + heard);
    ui.main("확인 중...");
    const result = await step(() => checkPattern(p, ex, heard, recognition.alternatives));
    feedbackKo = sanitizeFeedback(result.feedback_ko);
    modelEn = result.model_en || ex;
  }
  ui.main(feedbackKo);
  await step(() => speak(feedbackKo, "ko-KR"));
  if (state.skip || state.back) return;
  await shadow(modelEn);
}

async function runSituationTask(task) {
  const { p } = task;
  ui.main("패턴 " + p.num + ": " + p.title);
  ui.sub("질문을 준비 중...");
  const q = await step(() => getQuestion(p));
  ui.main(q.question_en);
  ui.sub(q.question_ko + "\n(오늘 배운 패턴으로 대답해보세요)");
  await step(() => speak(q.question_en, "en-US"));
  if (state.skip || state.back) return;

  const recognition = await listenWithRetry([p.title, ...p.examples]);
  if (state.skip || state.back) return;

  let feedbackKo, modelEn;
  if (recognition === null) {
    feedbackKo = "괜찮아요. 모범 답변을 알려드릴게요.";
    modelEn = p.examples[0];
  } else {
    const heard = recognition.text;
    ui.sub("들린 내용: " + heard);
    ui.main("확인 중...");
    const result = await step(() => checkAnswer(p, q.question_en, heard, recognition.alternatives));
    feedbackKo = sanitizeFeedback(result.feedback_ko);
    modelEn = result.model_en || p.examples[0];
  }
  ui.main(feedbackKo);
  await step(() => speak(feedbackKo, "ko-KR"));
  if (state.skip || state.back) return;
  await shadow(modelEn);
}

async function runDailyConversationTask(task) {
  const history = [];
  ui.main("Starting a short conversation...");
  ui.sub("");
  const opening = await step(() => startDailyConversation(task.patterns));
  let aiLine = opening.reply_en;
  if (!aiLine) throw new Error("일상 회화 시작 문장을 받지 못했습니다.");

  for (let turn = 0; turn < 3; turn++) {
    ui.main(aiLine);
    ui.sub("");
    await step(() => speak(aiLine, "en-US"));
    if (state.skip || state.back) return;

    const hints = task.patterns.flatMap(p => [p.title, ...p.examples]);
    const recognition = await listenWithConversationRetry(hints);
    if (state.skip || state.back) return;
    const heard = recognition && recognition.text;
    history.push({ ai: aiLine, user: heard || "" });
    ui.sub(heard ? "You said: " + heard : "No answer recorded.");

    if (turn < 2) {
      const next = await step(() => continueDailyConversation(task.patterns, history));
      aiLine = next.reply_en;
      if (!aiLine) throw new Error("다음 일상 회화 문장을 받지 못했습니다.");
    }
  }

  ui.main("Let's review your conversation.");
  ui.sub("");
  const result = await step(() => reviewDailyConversation(task.patterns, history));
  if (state.skip || state.back) return;
  const rawReviews = Array.isArray(result.reviews) ? result.reviews : [];
  const reviews = history.map((turn, i) => ({
    natural_en: rawReviews[i] && rawReviews[i].natural_en || turn.user || "Try a short answer.",
    coaching_ko: rawReviews[i] && rawReviews[i].coaching_ko || "다음에는 짧게라도 영어로 답해보세요.",
  }));
  ui.showConversationReview(history, reviews);
  const summary = result.summary_ko || "대화를 잘 이어갔어요. 아래의 더 자연스러운 표현을 확인해 보세요.";
  await step(() => speak(summary, "ko-KR"));
  if (state.skip || state.back) return;
  for (const review of reviews.slice(0, history.length)) {
    if (review.natural_en) await step(() => speak(review.natural_en, "en-US"));
    if (state.skip || state.back) return;
  }
}

function savePos(day, pos) { LS.progress = { day, pos }; }

const SESSION_INTROS = {
  "세션1 패턴 연습": "세션 1, 오늘 패턴 연습입니다.",
  "세션2 상황 연습": "세션 2, 오늘 상황 연습입니다.",
  "세션3 어제 복습": "세션 3, 어제 복습입니다.",
  "세션4 전체 복습": "세션 4, 전체 복습입니다.",
  "마무리 일상 회화": "마무리 일상 회화입니다.",
};

function sessionIntro(sessionName) {
  return SESSION_INTROS[sessionName] || sessionName + "입니다.";
}

async function runDay() {
  const prog = LS.progress;
  let day = prog.day;
  let pos = prog.pos;
  let previousTask = null;
  let arrivedByBack = false;

  while (true) {
    const tasks = buildDayTasks(day);

    if (pos >= tasks.length) {
      const finishedDay = day;
      day = Math.min(day + 1, TOTAL_DAYS);
      pos = 0;
      savePos(day, pos);
      ui.main("Day " + finishedDay + " 완료! 수고하셨어요!");
      ui.sub("");
      await speak("오늘 학습을 모두 완료했어요. 수고하셨습니다!", "ko-KR");
      return;
    }

    state.skip = false;
    state.back = false;
    const task = tasks[pos];
    ui.clearConversationReview();
    ui.header(day, task.sessionName, pos + 1, tasks.length);
    $("btn-back").disabled = (day === 1 && pos === 0);

    if (!previousTask || previousTask.sessionName !== task.sessionName) {
      await step(() => speak(sessionIntro(task.sessionName), "ko-KR"));
    } else if (!arrivedByBack && previousTask.sessionName === task.sessionName
      && previousTask.p.num !== task.p.num) {
      await step(() => speak("다음 패턴이에요.", "ko-KR"));
    }

    try {
      if (task.kind === "pattern") await runPatternTask(task);
      else if (task.kind === "situation") await runSituationTask(task);
      else if (task.kind === "conversation") await runDailyConversationTask(task);
    } catch (e) {
      if (e && e.quit) throw e;
      // API 오류 등: 음성 안내 후 잠시 대기, 같은 문제 재시도 (위치 이동 없음)
      console.error(e);
      ui.main("오류가 발생했어요");
      ui.sub(String(e.message || e));
      await speak("오류가 발생했어요. 잠시 후 다시 시도합니다.", "ko-KR");
      await new Promise(r => setTimeout(r, 3000));
      continue;
    }

    const prevDay = day, prevPos = pos;
    const next = advancePos(day, pos, state.back ? "back" : "forward");
    day = next.day; pos = next.pos;
    arrivedByBack = state.back;
    previousTask = task;
    if (state.back && day === prevDay && pos === prevPos) {
      await step(() => speak("지금이 처음이에요.", "ko-KR"));
    }
    savePos(day, pos);
  }
}

/* ==================== 화면 꺼짐 방지 ==================== */
let wakeLock = null;
async function acquireWakeLock() {
  try { if ("wakeLock" in navigator) wakeLock = await navigator.wakeLock.request("screen"); }
  catch {}
}
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && state.running) acquireWakeLock();
});

/* ==================== 이벤트 ==================== */
function refreshHome() {
  const prog = LS.progress;
  $("home-day").textContent = "Day " + prog.day;
  const pats = dayPatterns(prog.day);
  const lines = pats.map(p => "패턴 " + p.num + ". " + p.title);
  if (prog.day > 1) lines.push("+ 어제 복습 " + PATTERNS_PER_DAY + "개, 전체 복습 2개");
  lines.push("+ 마무리 일상 회화");
  $("home-plan").innerHTML = lines.join("<br>");
  const engineName = LS.engine === "gemini" ? "Gemini" : "Claude";
  $("home-warning").textContent = currentKey() ? "" : "설정에서 " + engineName + " API 키를 먼저 입력해주세요.";
  const resumed = prog.pos > 0;
  $("btn-start").textContent = resumed ? "이어서 학습" : "학습 시작";
}

$("btn-start").onclick = async () => {
  if (!currentKey()) { openSettings(); return; }
  state.running = true; state.paused = false; state.quit = false;
  ui.show("practice");
  $("btn-pause").textContent = "일시정지";
  acquireWakeLock();
  try { await runDay(); }
  catch (e) { if (!(e && e.quit)) console.error(e); }
  state.running = false;
  speechSynthesis.cancel();
  stopCurrentAudio();
  if (wakeLock) { try { wakeLock.release(); } catch {} wakeLock = null; }
  ui.show("home");
  refreshHome();
};

$("btn-pause").onclick = () => {
  state.paused = !state.paused;
  $("btn-pause").textContent = state.paused ? "재개" : "일시정지";
  if (state.paused) {
    speechSynthesis.pause();
    if (currentAudio) currentAudio.pause();
  } else {
    speechSynthesis.resume();
    if (currentAudio) currentAudio.play().catch(() => {});
  }
};

$("btn-skip").onclick = () => { state.skip = true; speechSynthesis.cancel(); stopCurrentAudio(); };

$("btn-back").onclick = () => { state.back = true; speechSynthesis.cancel(); stopCurrentAudio(); };

$("btn-quit").onclick = () => {
  state.quit = true; state.paused = false;
  speechSynthesis.cancel();
  stopCurrentAudio();
};

function openSettings() {
  $("input-engine").value = LS.engine;
  $("input-apikey").value = LS.apiKey;
  $("input-geminikey").value = LS.geminiKey;
  $("input-day").value = LS.progress.day;
  $("input-day").max = TOTAL_DAYS;
  $("day-range-label").textContent = "현재 Day (1~" + TOTAL_DAYS + ")";
  populateVoiceSelect($("input-korean-voice"), "ko-KR", LS.koreanVoice);
  populateVoiceSelect($("input-english-voice"), "en-US", LS.englishVoice);
  $("input-tts-engine").value = LS.ttsEngine;
  $("input-google-tts-key").value = LS.googleTtsKey;
  populateGoogleVoiceSelect($("input-google-korean-voice"), LS.googleKoreanVoice);
  populateGoogleVoiceSelect($("input-google-english-voice"), LS.googleEnglishVoice);
  updateTtsEngineFieldsVisibility();
  ui.show("settings");
}
$("btn-settings").onclick = openSettings;
$("btn-settings-close").onclick = () => { ui.show("home"); refreshHome(); };
$("btn-settings-save").onclick = () => {
  LS.engine = $("input-engine").value;
  LS.apiKey = $("input-apikey").value.trim();
  const newGeminiKey = $("input-geminikey").value.trim();
  if (newGeminiKey !== LS.geminiKey) localStorage.removeItem("geminiModel");
  LS.geminiKey = newGeminiKey;
  LS.koreanVoice = $("input-korean-voice").value;
  LS.englishVoice = $("input-english-voice").value;
  LS.ttsEngine = $("input-tts-engine").value;
  LS.googleTtsKey = $("input-google-tts-key").value.trim();
  LS.googleKoreanVoice = $("input-google-korean-voice").value;
  LS.googleEnglishVoice = $("input-google-english-voice").value;
  const d = parseInt($("input-day").value, 10);
  if (d >= 1 && d <= TOTAL_DAYS && d !== LS.progress.day) {
    LS.progress = { day: d, pos: 0 };
  }
  ui.show("home");
  refreshHome();
};

$("btn-preview-korean").onclick = () => previewVoice("ko-KR", $("input-korean-voice").value);
$("btn-preview-english").onclick = () => previewVoice("en-US", $("input-english-voice").value);
$("input-tts-engine").onchange = updateTtsEngineFieldsVisibility;
$("btn-preview-google-korean").onclick = () => previewGoogleVoice("ko-KR", $("input-google-korean-voice").value);
$("btn-preview-google-english").onclick = () => previewGoogleVoice("en-US", $("input-google-english-voice").value);
$("btn-enable-push").onclick = () => enablePush().catch(e => alert("알림 설정 중 오류: " + e.message));
$("btn-copy-sub").onclick = () => {
  navigator.clipboard.writeText($("push-sub-output").value)
    .then(() => alert("복사되었습니다."))
    .catch(() => alert("복사에 실패했습니다. 직접 선택해서 복사해주세요."));
};
$("btn-reset").onclick = () => {
  if (confirm("학습 기록을 모두 초기화할까요? (Day 1부터 다시 시작)")) {
    localStorage.removeItem("progress");
    ui.show("home");
    refreshHome();
  }
};

/* 서비스워커 등록 */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

/* 알림 탭 시 자동 시작 */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.addEventListener("message", e => {
    if (e.data && e.data.type === "autostart" && currentKey() && !state.running) {
      $("btn-start").click();
    }
  });
}
(function handleAutostartParam() {
  const params = new URLSearchParams(location.search);
  if (params.get("autostart") === "1") {
    history.replaceState({}, "", location.pathname);
    if (currentKey()) setTimeout(() => $("btn-start").click(), 0);
  }
})();

refreshHome();
