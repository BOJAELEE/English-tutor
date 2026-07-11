"use strict";

/* ==================== 저장소 ==================== */
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

/* ==================== 음성: TTS ==================== */
let voices = [];
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
    u.rate = lang.startsWith("en") ? 0.92 : 1.0;
    u.onend = resolve;
    u.onerror = resolve;
    speechSynthesis.speak(u);
  });
}

function speak(text, lang) {
  return new Promise(resolve => {
    if (!text) return resolve();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    const v = pickVoice(lang);
    if (v) u.voice = v;
    u.rate = lang.startsWith("en") ? 0.92 : 1.0;
    u.onend = resolve;
    u.onerror = resolve;
    speechSynthesis.speak(u);
  });
}

/* ==================== 음성: STT ==================== */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

function listen(lang, timeoutMs) {
  return new Promise(resolve => {
    if (!SR) return resolve({ error: "unsupported" });
    const r = new SR();
    r.lang = lang;
    r.interimResults = false;
    r.maxAlternatives = 1;
    let done = false;
    const finish = res => { if (!done) { done = true; clearTimeout(timer); ui.mic(false); resolve(res); } };
    const timer = setTimeout(() => { try { r.stop(); } catch {} finish({ error: "timeout" }); }, timeoutMs || 12000);
    r.onresult = e => finish({ text: e.results[0][0].transcript });
    r.onerror = e => finish({ error: e.error });
    r.onend = () => finish({ error: "no-speech" });
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
  const key = "p" + p.num + "_e" + exIdx;
  const cached = LS.cache[key];
  if (cached) return cached;
  const ex = p.examples[exIdx];
  const raw = await callLLM(
    `영어 문장: "${ex}" (패턴: ${p.title})\n` +
    `학습자가 이 영어 문장을 말하도록 유도하는 한국어 안내문을 만드세요. ` +
    `형식: 상황을 한 문장으로 묘사한 뒤, 해야 할 말을 한국어로 알려주세요. ` +
    `예: "지금 막 집을 나서려는 상황이에요. '나 지금 막 나가려던 참이야'라고 영어로 말해보세요." ` +
    `영어 정답 문장은 절대 노출하지 마세요.\n` +
    `JSON: {"prompt_ko": "..."}`
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
async function checkPattern(targetEn, heard) {
  const raw = await callLLM(
    `목표 영어 문장: "${targetEn}"\n학습자 발화(음성인식 결과): "${heard}"\n` +
    `학습자가 목표 문장을 올바르게 말했는지 판정하세요. 음성인식 특성상 대소문자/구두점/축약형 차이는 정답으로 인정하세요.\n` +
    `JSON: {"correct": true 또는 false, "feedback_ko": "짧은 한국어 피드백 한 문장", "model_en": "가장 자연스러운 영어 문장"}`
  );
  return parseJson(raw);
}

async function checkAnswer(p, question, heard) {
  const raw = await callLLM(
    `패턴: "${p.title}"\n질문: "${question}"\n학습자 답변(음성인식 결과): "${heard}"\n` +
    `학습자가 이 패턴을 사용해 자연스럽게 대답했는지 판정하세요. 의미가 통하면 관대하게 평가하세요.\n` +
    `JSON: {"correct": true 또는 false, "feedback_ko": "짧은 한국어 피드백 한 문장", "model_en": "이 패턴을 사용한 자연스러운 모범 답변 한 문장"}`
  );
  return parseJson(raw);
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
  sub(t) { $("status-sub").textContent = t; },
  mic(on) { $("mic-indicator").classList.toggle("hidden", !on); },
  header(day, session, done, total) {
    $("ph-day").textContent = "Day " + day;
    $("ph-session").textContent = session;
    $("ph-progress").textContent = done + " / " + total;
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
async function listenWithRetry() {
  for (let i = 0; i < 3; i++) {
    if (state.skip || state.back || state.quit) return null;
    const r = await step(() => listen("en-US", 12000));
    if (r.text) return r.text;
    if (r.error === "unsupported") {
      await step(() => speak("이 브라우저는 음성인식을 지원하지 않습니다. 크롬을 사용해주세요.", "ko-KR"));
      throw { quit: true };
    }
    if (i < 2) {
      ui.sub("(잘 안 들렸어요. 다시 말해주세요)");
      await step(() => speak("잘 못 들었어요. 다시 말해주세요.", "ko-KR"));
    }
  }
  return null;
}

async function shadow(modelEn) {
  ui.main(modelEn);
  ui.sub("따라 말해보세요 (쉐도잉)");
  await step(() => speak("따라 해보세요.", "ko-KR"));
  await step(() => speak(modelEn, "en-US"));
  const r = await step(() => listen("en-US", 12000));
  if (r.text) ui.sub("들린 내용: " + r.text);
  await step(() => speak("좋아요.", "ko-KR"));
}

async function runPatternTask(task) {
  const { p, ex, exIdx } = task;
  ui.main("패턴 " + p.num + ": " + p.title);
  ui.sub("상황 안내를 준비 중...");
  const promptKo = await step(() => getKoreanPrompt(p, exIdx));
  ui.main(promptKo);
  ui.sub("");
  await step(() => speak(promptKo, "ko-KR"));
  if (state.skip || state.back) return;

  const heard = await listenWithRetry();
  if (state.skip || state.back) return;

  let feedbackKo, modelEn;
  if (heard === null) {
    feedbackKo = "괜찮아요. 정답을 알려드릴게요.";
    modelEn = ex;
  } else {
    ui.sub("들린 내용: " + heard);
    ui.main("확인 중...");
    const result = await step(() => checkPattern(ex, heard));
    feedbackKo = result.feedback_ko;
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

  const heard = await listenWithRetry();
  if (state.skip || state.back) return;

  let feedbackKo, modelEn;
  if (heard === null) {
    feedbackKo = "괜찮아요. 모범 답변을 알려드릴게요.";
    modelEn = p.examples[0];
  } else {
    ui.sub("들린 내용: " + heard);
    ui.main("확인 중...");
    const result = await step(() => checkAnswer(p, q.question_en, heard));
    feedbackKo = result.feedback_ko;
    modelEn = result.model_en || p.examples[0];
  }
  ui.main(feedbackKo);
  await step(() => speak(feedbackKo, "ko-KR"));
  if (state.skip || state.back) return;
  await shadow(modelEn);
}

function savePos(day, pos) { LS.progress = { day, pos }; }

async function runDay() {
  const prog = LS.progress;
  let day = prog.day;
  let pos = prog.pos;

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
    ui.header(day, task.sessionName, pos + 1, tasks.length);
    $("btn-back").disabled = (day === 1 && pos === 0);

    if (pos === 0 || tasks[pos - 1].sessionName !== task.sessionName) {
      await step(() => speak(task.sessionName.replace("세션", "세션 ") + "을 시작합니다.", "ko-KR"));
    }

    try {
      if (task.kind === "pattern") await runPatternTask(task);
      else await runSituationTask(task);
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
  if (prog.day > 1) lines.push("+ 어제 복습 4개, 전체 복습 2개");
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
  if (wakeLock) { try { wakeLock.release(); } catch {} wakeLock = null; }
  ui.show("home");
  refreshHome();
};

$("btn-pause").onclick = () => {
  state.paused = !state.paused;
  $("btn-pause").textContent = state.paused ? "재개" : "일시정지";
  if (state.paused) speechSynthesis.pause(); else speechSynthesis.resume();
};

$("btn-skip").onclick = () => { state.skip = true; speechSynthesis.cancel(); };

$("btn-back").onclick = () => { state.back = true; speechSynthesis.cancel(); };

$("btn-quit").onclick = () => {
  state.quit = true; state.paused = false;
  speechSynthesis.cancel();
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
  const d = parseInt($("input-day").value, 10);
  if (d >= 1 && d <= TOTAL_DAYS && d !== LS.progress.day) {
    LS.progress = { day: d, pos: 0 };
  }
  ui.show("home");
  refreshHome();
};

$("btn-preview-korean").onclick = () => previewVoice("ko-KR", $("input-korean-voice").value);
$("btn-preview-english").onclick = () => previewVoice("en-US", $("input-english-voice").value);
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
