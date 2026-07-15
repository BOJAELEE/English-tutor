# Google Cloud TTS 도입 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Google Cloud Text-to-Speech(Chirp3-HD)를 기존 브라우저 TTS 옆에 선택 가능한 새 음성 엔진으로 추가하여, 한국어/영어 안내 음성을 훨씬 자연스럽게 만든다.

**Architecture:** `web/app.js`의 `speak(text, lang)`을 dispatcher로 재구성한다. 기존 구현은 이름만 `speakBrowser`로 바꿔 그대로 유지하고, 신규 `speakGoogle`이 Google Cloud TTS REST API(`?key=` 쿼리 파라미터, 기존 `callGemini`와 동일 패턴)를 호출한다. `LS.ttsEngine`이 `"google"`이고 키가 있을 때만 Google을 먼저 시도하며, 실패 시 자동으로 `speakBrowser`로 대체한다. 기존 호출부 13곳은 전혀 수정하지 않는다.

**Tech Stack:** 순수 브라우저 API(`fetch`, `Audio`, `AbortController`) — 새 의존성 없음, 빌드 스텝 없음.

## Global Constraints

- 빌드 스텝 없음. `web/`는 계속 순수 `<script>` 태그 로드 (npm/번들러 도입 안 함).
- 기존 커리큘럼/세션 로직, 기존 Claude/Gemini API 연동은 전혀 변경하지 않는다.
- `LS.ttsEngine` 기본값은 `"browser"` — 이 값이거나 키가 없으면 기존 사용자는 동작이 100% 동일해야 한다 (Google API를 절대 건드리지 않음).
- `speak(text, lang)`의 계약("절대 throw 안 함, 항상 resolve")은 그대로 유지한다 — 기존 호출부 13곳이 이 계약에 의존한다.
- 비용 제한/글자수 제한 코드는 만들지 않는다 (무료 한도 월 100만자 대비 실사용량이 월 5~9만자 수준으로 충분히 여유로움 — `docs/superpowers/specs/2026-07-15-google-tts-design.md` 참고).
- 백엔드 프록시(Cloudflare Workers 등)는 만들지 않는다. API 키는 기존 Claude/Gemini 키와 동일하게 클라이언트에 노출된 상태로 저장한다.
- Google Cloud TTS REST API: `POST https://texttospeech.googleapis.com/v1/text:synthesize?key=API_KEY`, 요청 바디 `{"input":{"text":"..."},"voice":{"languageCode":"ko-KR","name":"ko-KR-Chirp3-HD-Aoede"},"audioConfig":{"audioEncoding":"MP3"}}`, 응답 `{"audioContent":"<base64 MP3>"}`.
- Chirp3-HD 공유 음성 8종(ko-KR/en-US 둘 다 지원 확인됨): `Aoede`, `Charon`, `Fenrir`, `Kore`, `Leda`, `Orus`, `Puck`, `Zephyr`.
- 로컬 정적 파일 서빙: `python -m http.server <포트> --directory web`. 헤드리스 Chromium: `C:\Users\이보재\AppData\Local\ms-playwright\chromium-1228\chrome-win64\chrome.exe --headless=new --disable-gpu --dump-dom`. 검증용 `web/_test.html`은 커밋 전 삭제한다(이 프로젝트에서 반복된 관례).

---

### Task 1: LS 저장소 필드 + Chirp3-HD 음성 목록 + 순수 함수

**Files:**
- Modify: `web/app.js:11-14` (LS 객체에 새 필드 추가)
- Modify: `web/app.js:100` (기존 `speak()` 함수 뒤, `/* ==================== 음성: STT ==================== */` 주석 앞에 신규 섹션 삽입)

**Interfaces:**
- Produces: `LS.googleTtsKey`(get/set), `LS.ttsEngine`(get/set, 기본값 `"browser"`), `LS.googleKoreanVoice`/`LS.googleEnglishVoice`(get/set), `const GOOGLE_TTS_VOICES`(8개 배열), `const GOOGLE_TTS_DEFAULT_VOICE = "Aoede"`, `function resolveGoogleVoice(lang): string`, `function buildGoogleTtsRequestBody(text, lang, voiceName): object` — Task 2가 전부 그대로 사용.

- [ ] **Step 1: `web/app.js`의 LS 객체에 새 필드 추가**

`web/app.js:11-14`(현재 내용, 정확히 이 4줄):
```javascript
  get koreanVoice() { return localStorage.getItem("koreanVoice") || ""; },
  set koreanVoice(v) { localStorage.setItem("koreanVoice", v); },
  get englishVoice() { return localStorage.getItem("englishVoice") || ""; },
  set englishVoice(v) { localStorage.setItem("englishVoice", v); },
```

아래로 교체(기존 4줄 + 새 8줄):
```javascript
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
```

- [ ] **Step 2: 신규 섹션과 순수 함수 추가**

`web/app.js:100` 직후(`speak()` 함수가 끝나는 `}` 다음 줄), `/* ==================== 음성: STT ==================== */` 주석 앞에 삽입:

```javascript

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
    audioConfig: { audioEncoding: "MP3" },
  };
}
```

- [ ] **Step 3: 헤드리스 브라우저로 검증**

`web/_test.html` 생성(프로젝트 루트가 아니라 `web/` 안, 커밋 안 함):

```html
<!DOCTYPE html><html><body>
<pre id="out"></pre>
<script src="push-config.js"></script>
<script src="patterns.js"></script>
<script src="day-tasks.js"></script>
<script src="app.js"></script>
<script>
let out = "";
function check(name, cond) { out += (cond ? "PASS " : "FAIL ") + name + "\n"; }

localStorage.clear();
check("googleTtsKey 기본값 빈 문자열", LS.googleTtsKey === "");
LS.googleTtsKey = "test-key-123";
check("googleTtsKey round-trip", LS.googleTtsKey === "test-key-123");

check("ttsEngine 기본값 browser", LS.ttsEngine === "browser");
LS.ttsEngine = "google";
check("ttsEngine round-trip", LS.ttsEngine === "google");

LS.googleKoreanVoice = "Kore";
check("googleKoreanVoice round-trip", LS.googleKoreanVoice === "Kore");
LS.googleEnglishVoice = "Puck";
check("googleEnglishVoice round-trip", LS.googleEnglishVoice === "Puck");

check("GOOGLE_TTS_VOICES 8개", GOOGLE_TTS_VOICES.length === 8);
check("GOOGLE_TTS_VOICES에 Aoede 포함", GOOGLE_TTS_VOICES.includes("Aoede"));
check("GOOGLE_TTS_DEFAULT_VOICE는 Aoede", GOOGLE_TTS_DEFAULT_VOICE === "Aoede");

check("resolveGoogleVoice(ko-KR)는 저장된 Kore 반환", resolveGoogleVoice("ko-KR") === "Kore");
check("resolveGoogleVoice(en-US)는 저장된 Puck 반환", resolveGoogleVoice("en-US") === "Puck");
LS.googleKoreanVoice = "";
check("resolveGoogleVoice(ko-KR) 미설정시 기본값", resolveGoogleVoice("ko-KR") === "Aoede");
LS.googleKoreanVoice = "InvalidVoiceName";
check("resolveGoogleVoice(ko-KR) 잘못된 값이면 기본값으로 폴백", resolveGoogleVoice("ko-KR") === "Aoede");

const body = buildGoogleTtsRequestBody("안녕", "ko-KR", "Aoede");
check("buildGoogleTtsRequestBody 구조 확인",
  JSON.stringify(body) === JSON.stringify({
    input: { text: "안녕" },
    voice: { languageCode: "ko-KR", name: "ko-KR-Chirp3-HD-Aoede" },
    audioConfig: { audioEncoding: "MP3" },
  }));

document.getElementById("out").textContent = out;
</script>
</body></html>
```

```bash
python -m http.server 8124 --directory "C:\VS CODE\EnglishTutor\web"
```
(별도 터미널/백그라운드)

```powershell
$chrome = "C:\Users\이보재\AppData\Local\ms-playwright\chromium-1228\chrome-win64\chrome.exe"
cmd /c "`"$chrome`" --headless=new --disable-gpu --dump-dom http://localhost:8124/_test.html > `"%TEMP%\task1_test.html`" 2>nul"
Start-Sleep -Milliseconds 800
Get-Content "$env:TEMP\task1_test.html" -Raw
```
Expected: 12개 항목 전부 `PASS`.

- [ ] **Step 4: 테스트 파일 삭제**

```bash
rm -f "C:\VS CODE\EnglishTutor\web\_test.html"
```

- [ ] **Step 5: Commit**

```bash
git add web/app.js
git commit -m "Google Cloud TTS 저장소 필드 + Chirp3-HD 음성 목록 + 요청 바디 생성 순수 함수 추가"
```

---

### Task 2: `speakGoogle` + `speak` dispatcher 재구성 + 컨트롤 버튼 연동

**Files:**
- Modify: `web/app.js:88-100` (기존 `speak` 함수 → `speakBrowser`로 이름 변경, 이후 새 dispatcher 추가)
- Modify: `web/app.js` Google TTS 섹션 (Task 1에서 만든 섹션에 함수 추가)
- Modify: `web/app.js:581, 587-591, 593, 595, 597-600` (컨트롤 버튼 5곳)

**Interfaces:**
- Consumes: `GOOGLE_TTS_VOICES`, `GOOGLE_TTS_DEFAULT_VOICE`, `resolveGoogleVoice`, `buildGoogleTtsRequestBody`, `LS.googleTtsKey`, `LS.ttsEngine` (Task 1)
- Produces: `function synthesizeAndPlayGoogle(text, lang, voiceName): Promise<void>` (Task 3의 `previewGoogleVoice`가 그대로 사용), `function stopCurrentAudio(): void`, `async function speak(text, lang): Promise<void>` (dispatcher, 시그니처는 기존과 동일 — 호출부 13곳 수정 없음)

- [ ] **Step 1: 기존 `speak`를 `speakBrowser`로 이름 변경**

`web/app.js:88-100`(현재 내용, 정확히 이 13줄):
```javascript
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
```

아래로 교체(함수 이름만 `speakBrowser`로 변경, 본문은 완전히 동일):
```javascript
function speakBrowser(text, lang) {
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
```

- [ ] **Step 2: Task 1에서 만든 Google TTS 섹션에 재생/dispatcher 함수 추가**

Task 1이 추가한 `buildGoogleTtsRequestBody` 함수 바로 뒤(같은 `/* ==================== 음성: Google Cloud TTS ==================== */` 섹션 안, STT 섹션 주석 앞)에 삽입:

```javascript

let googleTtsAbort = null;   // 진행 중인 fetch를 취소하기 위한 AbortController
let currentAudio = null;     // 현재 재생 중인 Audio 엘리먼트 (Google TTS 전용)
let audioStopResolve = null; // 진행 중인 synthesizeAndPlayGoogle() 프라미스의 대기 중 resolve

function synthesizeAndPlayGoogle(text, lang, voiceName) {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    googleTtsAbort = controller;
    fetch(
      "https://texttospeech.googleapis.com/v1/text:synthesize?key=" + encodeURIComponent(LS.googleTtsKey),
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
```

- [ ] **Step 3: 컨트롤 버튼 5곳에 `stopCurrentAudio()` 연동**

`web/app.js:572-585`(현재 내용, `btn-start` 핸들러 전체):
```javascript
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
```

`speechSynthesis.cancel();` 다음 줄에 `stopCurrentAudio();` 추가(그 외 전부 동일):
```javascript
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
```

`web/app.js:587-591`(현재 내용, `btn-pause` 핸들러 전체):
```javascript
$("btn-pause").onclick = () => {
  state.paused = !state.paused;
  $("btn-pause").textContent = state.paused ? "재개" : "일시정지";
  if (state.paused) speechSynthesis.pause(); else speechSynthesis.resume();
};
```

아래로 교체:
```javascript
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
```

`web/app.js:593`(현재 내용): `$("btn-skip").onclick = () => { state.skip = true; speechSynthesis.cancel(); };`
아래로 교체: `$("btn-skip").onclick = () => { state.skip = true; speechSynthesis.cancel(); stopCurrentAudio(); };`

`web/app.js:595`(현재 내용): `$("btn-back").onclick = () => { state.back = true; speechSynthesis.cancel(); };`
아래로 교체: `$("btn-back").onclick = () => { state.back = true; speechSynthesis.cancel(); stopCurrentAudio(); };`

`web/app.js:597-600`(현재 내용, `btn-quit` 핸들러 전체):
```javascript
$("btn-quit").onclick = () => {
  state.quit = true; state.paused = false;
  speechSynthesis.cancel();
};
```

아래로 교체:
```javascript
$("btn-quit").onclick = () => {
  state.quit = true; state.paused = false;
  speechSynthesis.cancel();
  stopCurrentAudio();
};
```

- [ ] **Step 4: 문법 검증**

```bash
node --check "C:\VS CODE\EnglishTutor\web\app.js"
```
Expected: 아무 출력 없이 종료.

- [ ] **Step 5: 헤드리스 브라우저로 폴백 로직 검증 (fetch 모킹)**

`web/_test.html` 생성:

```html
<!DOCTYPE html><html><body>
<pre id="out"></pre>
<script src="push-config.js"></script>
<script src="patterns.js"></script>
<script src="day-tasks.js"></script>
<script src="app.js"></script>
<script>
(async () => {
let out = "";
function check(name, cond) { out += (cond ? "PASS " : "FAIL ") + name + "\n"; }

localStorage.clear();

// 1) ttsEngine이 기본값(browser)이면 fetch를 전혀 호출하지 않고 바로 speakBrowser로 감
let fetchCalled = false;
let speakBrowserCalledWith = null;
const realFetch = window.fetch;
const realSpeakBrowser = speakBrowser;
window.fetch = (...args) => { fetchCalled = true; return realFetch(...args); };
speakBrowser = (text, lang) => { speakBrowserCalledWith = { text, lang }; return Promise.resolve(); };

await speak("안녕하세요", "ko-KR");
check("ttsEngine 기본값(browser)일 때 fetch 호출 안 함", fetchCalled === false);
check("ttsEngine 기본값(browser)일 때 speakBrowser 직접 호출", speakBrowserCalledWith && speakBrowserCalledWith.text === "안녕하세요" && speakBrowserCalledWith.lang === "ko-KR");

// 2) ttsEngine이 google인데 fetch가 실패하면 speakBrowser로 폴백
LS.ttsEngine = "google";
LS.googleTtsKey = "fake-key";
speakBrowserCalledWith = null;
window.fetch = () => Promise.reject(new Error("network down"));
await speak("Hello", "en-US");
check("fetch 실패 시 speakBrowser로 폴백", speakBrowserCalledWith && speakBrowserCalledWith.text === "Hello" && speakBrowserCalledWith.lang === "en-US");

// 3) ttsEngine이 google인데 fetch가 non-OK 응답이면 speakBrowser로 폴백
speakBrowserCalledWith = null;
window.fetch = () => Promise.resolve({ ok: false, status: 403, text: async () => "forbidden" });
await speak("Hello again", "en-US");
check("fetch non-OK 응답 시 speakBrowser로 폴백", speakBrowserCalledWith && speakBrowserCalledWith.text === "Hello again");

// 4) 빈 텍스트는 fetch도 speakBrowser도 호출하지 않고 즉시 resolve
fetchCalled = false;
speakBrowserCalledWith = null;
window.fetch = (...args) => { fetchCalled = true; return realFetch(...args); };
await speak("", "ko-KR");
check("빈 텍스트는 아무것도 호출하지 않음", fetchCalled === false && speakBrowserCalledWith === null);

window.fetch = realFetch;
speakBrowser = realSpeakBrowser;

document.getElementById("out").textContent = out;
})();
</script>
</body></html>
```

```powershell
$chrome = "C:\Users\이보재\AppData\Local\ms-playwright\chromium-1228\chrome-win64\chrome.exe"
cmd /c "`"$chrome`" --headless=new --disable-gpu --dump-dom http://localhost:8124/_test.html > `"%TEMP%\task2_test.html`" 2>nul"
Start-Sleep -Milliseconds 800
Get-Content "$env:TEMP\task2_test.html" -Raw
```
Expected: 4개 항목 전부 `PASS`. (성공 재생 경로와 `AbortController` 취소 경로는 실제 오디오 장치/실제 키가 필요해 헤드리스로 검증 불가 — Task 5에서 사람이 실제 키로 검증.)

- [ ] **Step 6: 테스트 파일 삭제**

```bash
rm -f "C:\VS CODE\EnglishTutor\web\_test.html"
```

- [ ] **Step 7: Commit**

```bash
git add web/app.js
git commit -m "speak()를 dispatcher로 재구성 - speakGoogle 추가 + 실패 시 브라우저 음성 자동 대체 + 이동/일시정지 컨트롤 연동"
```

---

### Task 3: 설정 화면 UI — 엔진 선택 / API 키 / 음성 선택

**Files:**
- Modify: `web/index.html:69-91` (기존 음성 필드에 id 추가, 새 필드 삽입)
- Modify: `web/app.js` (새 함수 추가, `openSettings()`/저장 핸들러/미리듣기 핸들러 확장)

**Interfaces:**
- Consumes: `synthesizeAndPlayGoogle`, `GOOGLE_TTS_VOICES`, `LS.ttsEngine`/`LS.googleTtsKey`/`LS.googleKoreanVoice`/`LS.googleEnglishVoice` (Task 1, 2)
- Produces: 없음 (최종 사용자 대면 기능)

- [ ] **Step 1: `web/index.html`의 기존 음성 필드에 id 추가**

`web/index.html:69-73`(현재 내용):
```html
  <label class="field">
    <span>한국어 음성</span>
    <select id="input-korean-voice"></select>
    <button type="button" id="btn-preview-korean" class="ctl-btn">미리듣기</button>
  </label>
```

아래로 교체(래핑 `<label>`에 id 추가, 내부는 동일):
```html
  <label class="field" id="field-korean-voice-browser">
    <span>한국어 음성</span>
    <select id="input-korean-voice"></select>
    <button type="button" id="btn-preview-korean" class="ctl-btn">미리듣기</button>
  </label>
```

`web/index.html:74-78`(현재 내용):
```html
  <label class="field">
    <span>영어 음성</span>
    <select id="input-english-voice"></select>
    <button type="button" id="btn-preview-english" class="ctl-btn">미리듣기</button>
  </label>
```

아래로 교체:
```html
  <label class="field" id="field-english-voice-browser">
    <span>영어 음성</span>
    <select id="input-english-voice"></select>
    <button type="button" id="btn-preview-english" class="ctl-btn">미리듣기</button>
  </label>
```

- [ ] **Step 2: 새 설정 필드 삽입**

`web/index.html:78` 직후(방금 수정한 영어 음성 `</label>` 바로 뒤), `<label class="field"><span id="day-range-label">...` (기존 79번째 줄) 앞에 삽입:

```html
  <label class="field">
    <span>TTS 음성 소스</span>
    <select id="input-tts-engine">
      <option value="browser">브라우저 내장 (무료)</option>
      <option value="google">Google Cloud TTS (자연스러운 음성)</option>
    </select>
  </label>
  <label class="field" id="field-google-tts-key">
    <span>Google Cloud TTS API 키</span>
    <input type="password" id="input-google-tts-key" placeholder="AIza...">
  </label>
  <label class="field" id="field-korean-voice-google">
    <span>한국어 음성 (Google)</span>
    <select id="input-google-korean-voice"></select>
    <button type="button" id="btn-preview-google-korean" class="ctl-btn">미리듣기</button>
  </label>
  <label class="field" id="field-english-voice-google">
    <span>영어 음성 (Google)</span>
    <select id="input-google-english-voice"></select>
    <button type="button" id="btn-preview-google-english" class="ctl-btn">미리듣기</button>
  </label>
```

- [ ] **Step 3: `web/app.js`에 설정 화면 로직 함수 추가**

`web/app.js`의 `previewVoice` 함수(현재 72-86번 줄) 바로 뒤, `speak`/`speakBrowser` 함수 앞에 삽입:

```javascript
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
  const sample = lang.startsWith("ko") ? "안녕하세요, 이 목소리로 학습을 진행합니다." : "Hello, I'm about to leave the house.";
  try { await synthesizeAndPlayGoogle(sample, lang, voiceName); }
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
```

`populateGoogleVoiceSelect`/`previewGoogleVoice`는 Task 1의 `GOOGLE_TTS_VOICES`/`GOOGLE_TTS_DEFAULT_VOICE`와 Task 2의 `synthesizeAndPlayGoogle`을 참조하므로, 이 함수들이 파일 내에서 먼저 선언되어 있어야 한다(Task 1·2가 이미 완료된 상태이므로 실행 순서상 문제 없음 — `function` 선언은 호이스팅되어 파일 내 위치와 무관하게 동작하지만, 가독성을 위해 여기 배치한다).

- [ ] **Step 4: `openSettings()`에 새 필드 연동**

`web/app.js:602-612`(현재 내용, `openSettings()` 함수 전체):
```javascript
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
```

아래로 교체:
```javascript
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
```

- [ ] **Step 5: 저장 핸들러에 새 필드 연동**

`web/app.js:615-629`(현재 내용, `btn-settings-save` 핸들러 전체):
```javascript
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
```

아래로 교체:
```javascript
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
```

- [ ] **Step 6: 미리듣기 버튼 + 엔진 전환 이벤트 연동**

`web/app.js:631-632`(현재 내용):
```javascript
$("btn-preview-korean").onclick = () => previewVoice("ko-KR", $("input-korean-voice").value);
$("btn-preview-english").onclick = () => previewVoice("en-US", $("input-english-voice").value);
```

바로 뒤에 추가(기존 두 줄은 그대로 유지):
```javascript
$("btn-preview-korean").onclick = () => previewVoice("ko-KR", $("input-korean-voice").value);
$("btn-preview-english").onclick = () => previewVoice("en-US", $("input-english-voice").value);
$("input-tts-engine").onchange = updateTtsEngineFieldsVisibility;
$("btn-preview-google-korean").onclick = () => previewGoogleVoice("ko-KR", $("input-google-korean-voice").value);
$("btn-preview-google-english").onclick = () => previewGoogleVoice("en-US", $("input-google-english-voice").value);
```

- [ ] **Step 7: 헤드리스 브라우저로 검증**

`web/_test.html` 생성:

```html
<!DOCTYPE html><html><body>
<div id="screen-home"></div><div id="screen-practice"></div><div id="screen-settings"></div>
<button id="btn-start"></button><button id="btn-pause"></button><button id="btn-skip"></button>
<button id="btn-back"></button><button id="btn-quit"></button><button id="btn-settings"></button>
<button id="btn-settings-close"></button><button id="btn-settings-save"></button><button id="btn-reset"></button>
<button id="btn-preview-korean"></button><button id="btn-preview-english"></button>
<button id="btn-enable-push"></button><button id="btn-copy-sub"></button>
<div id="push-sub-area" class="hidden"></div><textarea id="push-sub-output"></textarea>
<div id="home-day"></div><div id="home-plan"></div><div id="home-warning"></div>
<select id="input-engine"></select><input id="input-apikey"><input id="input-geminikey">
<input id="input-day"><select id="input-korean-voice"></select><select id="input-english-voice"></select>
<span id="day-range-label"></span>
<label id="field-korean-voice-browser"></label><label id="field-english-voice-browser"></label>
<select id="input-tts-engine"><option value="browser">브라우저 내장 (무료)</option><option value="google">Google Cloud TTS (자연스러운 음성)</option></select>
<label id="field-google-tts-key"></label><input id="input-google-tts-key">
<label id="field-korean-voice-google"></label><select id="input-google-korean-voice"></select><button id="btn-preview-google-korean"></button>
<label id="field-english-voice-google"></label><select id="input-google-english-voice"></select><button id="btn-preview-google-english"></button>
<div id="mic-indicator" class="hidden"><span class="pulse"></span></div>
<div id="status-main"></div><div id="status-sub"></div>
<span id="ph-day"></span><span id="ph-session"></span><span id="ph-progress"></span>
<pre id="out"></pre>
<script src="push-config.js"></script>
<script src="patterns.js"></script>
<script src="day-tasks.js"></script>
<script src="app.js"></script>
<script>
let out = "";
function check(name, cond) { out += (cond ? "PASS " : "FAIL ") + name + "\n"; }

check("populateGoogleVoiceSelect는 8개 옵션 생성", (() => {
  populateGoogleVoiceSelect($("input-google-korean-voice"), "");
  return $("input-google-korean-voice").options.length === 8;
})());
check("populateGoogleVoiceSelect는 기본값 Aoede 선택", $("input-google-korean-voice").value === "Aoede");

populateGoogleVoiceSelect($("input-google-korean-voice"), "Kore");
check("populateGoogleVoiceSelect는 저장된 값 선택", $("input-google-korean-voice").value === "Kore");

$("input-tts-engine").value = "google";
updateTtsEngineFieldsVisibility();
check("google 선택시 API키 필드 보임", !$("field-google-tts-key").classList.contains("hidden"));
check("google 선택시 브라우저 한국어음성 필드 숨김", $("field-korean-voice-browser").classList.contains("hidden"));
check("google 선택시 브라우저 영어음성 필드 숨김", $("field-english-voice-browser").classList.contains("hidden"));
check("google 선택시 구글 한국어음성 필드 보임", !$("field-korean-voice-google").classList.contains("hidden"));
check("google 선택시 구글 영어음성 필드 보임", !$("field-english-voice-google").classList.contains("hidden"));

$("input-tts-engine").value = "browser";
updateTtsEngineFieldsVisibility();
check("browser 선택시 API키 필드 숨김", $("field-google-tts-key").classList.contains("hidden"));
check("browser 선택시 브라우저 음성 필드 보임", !$("field-korean-voice-browser").classList.contains("hidden"));
check("browser 선택시 구글 음성 필드 숨김", $("field-korean-voice-google").classList.contains("hidden"));

check("previewGoogleVoice는 함수", typeof previewGoogleVoice === "function");
check("btn-preview-google-korean에 핸들러 연결됨", typeof $("btn-preview-google-korean").onclick === "function");
check("btn-preview-google-english에 핸들러 연결됨", typeof $("btn-preview-google-english").onclick === "function");
check("input-tts-engine에 onchange 핸들러 연결됨", typeof $("input-tts-engine").onchange === "function");

document.getElementById("out").textContent = out;
</script>
</body></html>
```

```powershell
$chrome = "C:\Users\이보재\AppData\Local\ms-playwright\chromium-1228\chrome-win64\chrome.exe"
cmd /c "`"$chrome`" --headless=new --disable-gpu --dump-dom http://localhost:8124/_test.html > `"%TEMP%\task3_test.html`" 2>nul"
Start-Sleep -Milliseconds 800
Get-Content "$env:TEMP\task3_test.html" -Raw
```
Expected: 13개 항목 전부 `PASS`.

또한 실제 `index.html`이 새 요소들을 실제로 포함하는지 확인:
```powershell
cmd /c "`"$chrome`" --headless=new --disable-gpu --dump-dom http://localhost:8124/index.html > `"%TEMP%\task3_index_test.html`" 2>nul"
Start-Sleep -Milliseconds 800
$dom = Get-Content "$env:TEMP\task3_index_test.html" -Raw
Write-Output ("input-tts-engine 존재: " + ($dom -match 'id="input-tts-engine"'))
Write-Output ("input-google-tts-key 존재: " + ($dom -match 'id="input-google-tts-key"'))
Write-Output ("input-google-korean-voice 존재: " + ($dom -match 'id="input-google-korean-voice"'))
Write-Output ("input-google-english-voice 존재: " + ($dom -match 'id="input-google-english-voice"'))
```
Expected: 4줄 전부 `True`.

- [ ] **Step 8: 테스트 파일 삭제**

```bash
rm -f "C:\VS CODE\EnglishTutor\web\_test.html"
```

- [ ] **Step 9: Commit**

```bash
git add web/index.html web/app.js
git commit -m "설정 화면에 Google Cloud TTS 엔진 선택 / API 키 / 음성 선택 UI 추가"
```

---

### Task 4: 회귀 테스트 — 기존 사용자 동작 무변경 확인

**Files:** 없음 (검증 전용, 문제 발견 시에만 커밋)

**Interfaces:**
- Consumes: Task 1~3의 전체 결과물

- [ ] **Step 1: 문법 검증**

```bash
node --check "C:\VS CODE\EnglishTutor\web\app.js"
node --check "C:\VS CODE\EnglishTutor\web\sw.js"
```
Expected: 둘 다 아무 출력 없이 종료.

- [ ] **Step 2: 기존 `speak()` 호출부 13곳이 여전히 `speak(text, lang)` 시그니처로만 호출되는지 확인**

```bash
grep -n "speak(" "C:\VS CODE\EnglishTutor\web\app.js"
```
Expected: `speakBrowser`/`speakGoogle`/`synthesizeAndPlayGoogle` 정의부를 빼면, 나머지 호출부(`listenWithRetry`, `shadow`, `runPatternTask`, `runSituationTask`, `runDay` 등)는 전부 `speak(무언가, "ko-KR"|"en-US")` 형태로 두 개의 인자만 사용 — Task 1~3 이전과 동일한 호출 형태인지 육안 확인.

- [ ] **Step 3: `ttsEngine` 기본값(unset)일 때 fetch를 전혀 안 건드리는지 최종 확인**

Task 2 Step 5에서 이미 검증했지만, Task 3까지 반영된 최종 `app.js`로 다시 한 번 같은 테스트를 실행해 회귀가 없는지 확인한다. `web/_test.html`에 Task 2 Step 5의 테스트 블록 1번(`ttsEngine 기본값(browser)일 때 fetch 호출 안 함`)만 다시 실행:

```html
<!DOCTYPE html><html><body>
<pre id="out"></pre>
<script src="push-config.js"></script>
<script src="patterns.js"></script>
<script src="day-tasks.js"></script>
<script src="app.js"></script>
<script>
(async () => {
let out = "";
function check(name, cond) { out += (cond ? "PASS " : "FAIL ") + name + "\n"; }
localStorage.clear();
let fetchCalled = false;
const realFetch = window.fetch;
window.fetch = (...args) => { fetchCalled = true; return realFetch(...args); };
await speak("회귀 테스트", "ko-KR");
check("Task 3 반영 후에도 기본 엔진(browser)일 때 fetch 미호출", fetchCalled === false);
window.fetch = realFetch;
document.getElementById("out").textContent = out;
})();
</script>
</body></html>
```

```powershell
$chrome = "C:\Users\이보재\AppData\Local\ms-playwright\chromium-1228\chrome-win64\chrome.exe"
cmd /c "`"$chrome`" --headless=new --disable-gpu --dump-dom http://localhost:8124/_test.html > `"%TEMP%\task4_test.html`" 2>nul"
Start-Sleep -Milliseconds 800
Get-Content "$env:TEMP\task4_test.html" -Raw
```
Expected: `PASS`.

- [ ] **Step 4: `web/sw.js`의 동일 출처 필터가 그대로인지 확인**

```bash
grep -n "url.origin !== location.origin" "C:\VS CODE\EnglishTutor\web\sw.js"
```
Expected: `if (url.origin !== location.origin) return;` 줄이 그대로 존재 — Task 1~3에서 `sw.js`를 전혀 건드리지 않았다는 뜻이므로, 새 Google TTS 요청도 기존 Claude/Gemini 호출과 마찬가지로 서비스워커를 우회해 네트워크로 바로 나간다.

- [ ] **Step 5: 테스트 파일 삭제**

```bash
rm -f "C:\VS CODE\EnglishTutor\web\_test.html"
```

- [ ] **Step 6: 문제 발견 시에만 커밋**

이 태스크에서 회귀나 문제가 발견되지 않으면 커밋할 내용이 없다(검증 전용 태스크). 문제가 발견되면 최소한의 수정을 하고 아래처럼 커밋:

```bash
git add web/app.js
git commit -m "Task 1-3 회귀 수정: <구체적 문제 설명>"
```

---

### Task 5: 사람 개입 — GCP 설정 + 실사용 검증

**이 태스크는 사람이 직접 수행한다 (Google Cloud Console 웹 UI, 신용카드/결제 정보 필요). 서브에이전트에게 위임하지 말고 컨트롤러가 사용자와 함께 진행한다.**

**Files:** 없음 (운영 설정 단계)

- [ ] **Step 1: GCP 프로젝트 생성/선택**

https://console.cloud.google.com 접속 → 상단 프로젝트 선택기 → "새 프로젝트" → 이름 입력(예: `english-tutor-tts`) → 만들기.

- [ ] **Step 2: 결제 계정 연결 (필수)**

좌측 메뉴 "결제" → 결제 계정이 없으면 새로 만들고 신용카드 등록. Cloud Text-to-Speech API는 결제 계정이 연결된 프로젝트에서만 활성화 가능하며, 이는 계정 확인 목적으로 무료 사용량(월 100만자) 안에서는 과금되지 않는다.

- [ ] **Step 3: Text-to-Speech API 활성화**

https://console.cloud.google.com/apis/library/texttospeech.googleapis.com → Step 1에서 만든 프로젝트 선택 확인 → "사용 설정" 클릭.

- [ ] **Step 4: API 키 생성**

"API 및 서비스" → "사용자 인증 정보" → "사용자 인증 정보 만들기" → "API 키". 생성된 키를 복사해둔다.

- [ ] **Step 5: 키 제한 (보안, 필수)**

방금 만든 키의 "키 제한사항" 편집 → "API 제한사항" → "키 제한" 선택 → "Cloud Text-to-Speech API"만 체크 → 저장. 이렇게 하면 이 키가 다른 Google API에는 쓰일 수 없어, 유출되어도 피해 범위가 TTS로 한정된다.

- [ ] **Step 6: 예산 알림 설정 (권장)**

"결제" → "예산 및 알림" → 새 예산 만들기 → 예: 월 $5 한도, 50%/90%/100% 알림 이메일 설정. 무료 한도 안에서 쓸 계획이라도, 실수로 넘길 경우 즉시 알 수 있도록.

- [ ] **Step 7: 앱에 키 입력**

배포된 사이트(`https://bojaelee.github.io/English-tutor/`)를 열고 설정 화면 → "TTS 음성 소스"를 "Google Cloud TTS"로 변경 → API 키 붙여넣기 → 한국어/영어 음성 각각 선택 → "미리듣기"로 확인 → 저장.

- [ ] **Step 8: 실사용 검증 체크리스트**

- [ ] 설정 화면에서 한국어/영어 각각 "미리듣기" 버튼으로 8개 음성 중 하나 이상 실제로 들어봄
- [ ] 잘못된 키(예: 마지막 글자를 하나 지운 값)로 학습을 시작해, 오류 없이 브라우저 음성으로 자동 대체되는지 확인 (Task 2의 폴백 로직 실사용 검증)
- [ ] 올바른 키로 실제 Day 학습을 진행하며, 안내 문구가 자연스러운 Google 음성으로 재생되는지 확인
- [ ] 학습 중 Google 음성이 재생되는 동안 "건너뛰기"/"이전"/"일시정지→재개"/"종료"를 각각 눌러, 오디오가 즉시 멈추거나(또는 일시정지 후 재개되고) 다음 동작으로 정상 전환되는지 확인 — 헤드리스로 검증 불가능했던 부분이므로 특히 꼼꼼히 확인
- [ ] 운전 중 실사용 시나리오로 최소 1회 확인

- [ ] **Step 9: 사용자에게 완료 보고**

체크리스트가 전부 통과하면 기능이 정상 배포된 것으로 보고한다. 문제가 있으면 어느 단계에서 실패했는지 구체적으로 기록해 다음 수정에 참고한다.
