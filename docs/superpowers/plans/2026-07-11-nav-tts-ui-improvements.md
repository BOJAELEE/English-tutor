# 학습 화면 개선(이전 탐색·자연스러운 음성·텍스트 계층) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **참고:** 이 프로젝트는 사용자 혼자 쓰는 개인용 정적 웹앱이며, 이번 실행은 별도 세션이 아니라 **현재 대화 세션 내에서 인라인으로** 진행한다 (요청자 확인 완료).

**Goal:** EnglishTutor PWA의 학습 화면에 "이전"(뒤로가기, Day 경계까지 자유 이동) 버튼을 추가하고, 위치를 항상 즉시 저장해 앱을 껐다 켜도 마지막 화면으로 정확히 복원하며, 한국어 TTS 목소리를 자연스럽게 개선하고, 상태 텍스트 2줄의 크기/색을 구분한다.

**Architecture:** 하루치 문제(세션1~4)를 `buildDayTasks(day)`로 평평한 배열로 만들고, `{day, pos}` 하나의 커서로 위치를 추적한다. 순수 로직(`buildDayTasks`, `advancePos`, 리뷰 픽 캐싱)은 새 파일 `web/day-tasks.js`로 분리해 DOM 의존 없이 독립 테스트 가능하게 하고, `web/app.js`의 `runDay()`는 이 커서를 소비하는 얇은 오케스트레이션 루프로 재작성한다.

**Tech Stack:** 순수 정적 HTML/CSS/JS (빌드 도구 없음, ES 모듈 없음, 전역 스크립트 로드). 검증은 이미 설치된 Chromium(`C:\Users\이보재\AppData\Local\ms-playwright\chromium-1228\chrome-win64\chrome.exe`)의 headless `--dump-dom`으로 수행 (기존 세션에서 이미 검증된 방식 재사용, 새 npm 의존성 없음). 배포는 기존 GitHub Actions → GitHub Pages 파이프라인 그대로 사용.

## Global Constraints

- 새 npm 패키지나 빌드 단계를 추가하지 않는다 (순수 정적 사이트 유지)
- 화면에 나오는 한국어 문구 자체는 바꾸지 않는다 (사용자가 "음성만" 문제라고 명확히 확인함, 설계 문서 §범위 밖 참조)
- "건너뛰기"는 오늘 리스트를 넘어 내일로 미리 진입하지 않는다 (day 증가는 "오늘 전체 완료" 시에만)
- Day 범위는 항상 1~50으로 clamp
- Claude/Gemini AI 엔진 선택 로직(`callLLM`, `callClaude`, `callGemini`, `resolveGeminiModel`)은 이번 작업과 무관하므로 손대지 않는다
- 기존 서비스워커(`web/sw.js`)의 no-cache 전략은 이미 최신 코드를 항상 가져오므로 캐시 버전을 올릴 필요 없음 (건드리지 않음)

---

## 사전 준비: 로컬 검증 서버 확인

모든 태스크가 `http://localhost:8123`에 떠 있는 정적 서버를 사용한다. 아래 명령으로 살아있는지 확인하고, 없으면 백그라운드로 띄운다.

```powershell
try { (Invoke-WebRequest -Uri "http://localhost:8123/" -UseBasicParsing -TimeoutSec 3).StatusCode } catch { "DOWN" }
```

`DOWN`이 나오면:

```powershell
python -m http.server 8123 --directory "C:\VS CODE\EnglishTutor\web"
```

이 명령은 `run_in_background: true`로 실행하고, 이후 모든 태스크에서 이 서버를 계속 재사용한다.

---

### Task 1: `day-tasks.js` 분리 — 순수 커리큘럼 로직 + 세션4 랜덤 고정 버그 수정

**Files:**
- Create: `web/day-tasks.js`
- Modify: `web/app.js:26-51` (기존 `dayPatterns`/`buildSessions` 정의 블록 삭제 — day-tasks.js로 이동)
- Modify: `web/index.html:76` (`<script src="patterns.js">` 다음 줄에 `day-tasks.js` 로드 추가)
- Test: `web/_test.html` (임시 파일, Task 7에서 삭제)

**Interfaces:**
- Produces: 전역 함수 `dayPatterns(day)`, `buildSessions(day)`, `getReviewPicks(day, pool)`, `buildDayTasks(day)` — `patterns.js`(`PATTERNS` 배열)와 `localStorage`에만 의존, DOM 의존 없음. `buildDayTasks(day)`는 `{kind, p, ex?, exIdx?, sessionName}` 객체 배열 반환.

- [ ] **Step 1: `web/day-tasks.js` 작성**

```js
"use strict";

/* ==================== 하루 커리큘럼 로직 (DOM 비의존, 테스트 가능) ==================== */

function dayPatterns(day) { return PATTERNS.slice((day - 1) * 4, day * 4); }

/* 세션4 랜덤 복습 선택을 날짜별로 고정 (뒤로/앞으로 이동해도 같은 문제 유지) */
function getReviewPicks(day, pool) {
  const key = "reviewPicks_" + day;
  let cachedNums = null;
  try { cachedNums = JSON.parse(localStorage.getItem(key)); } catch {}
  if (Array.isArray(cachedNums)) {
    const found = cachedNums.map(n => pool.find(p => p.num === n)).filter(Boolean);
    if (found.length === cachedNums.length && found.length > 0) return found;
  }
  const picks = [];
  const used = new Set();
  while (picks.length < Math.min(2, pool.length)) {
    const i = Math.floor(Math.random() * pool.length);
    if (!used.has(i)) { used.add(i); picks.push(pool[i]); }
  }
  localStorage.setItem(key, JSON.stringify(picks.map(p => p.num)));
  return picks;
}

function buildSessions(day) {
  const today = dayPatterns(day);
  const s1 = [];
  today.forEach(p => p.examples.forEach((ex, i) => s1.push({ kind: "pattern", p, ex, exIdx: i })));
  const s2 = today.map(p => ({ kind: "situation", p }));
  const sessions = [
    { name: "세션1 패턴 연습", tasks: s1 },
    { name: "세션2 상황 연습", tasks: s2 },
  ];
  if (day > 1) {
    const prev = dayPatterns(day - 1);
    sessions.push({ name: "세션3 어제 복습", tasks: prev.map(p => ({ kind: "situation", p })) });
    const pool = PATTERNS.slice(0, (day - 1) * 4);
    const picks = getReviewPicks(day, pool);
    sessions.push({ name: "세션4 전체 복습", tasks: picks.map(p => ({ kind: "situation", p })) });
  }
  return sessions;
}

/* 오늘 할 일을 세션 이름표를 붙여 평평한 배열로 반환 */
function buildDayTasks(day) {
  return buildSessions(day).flatMap(s => s.tasks.map(t => ({ ...t, sessionName: s.name })));
}
```

- [ ] **Step 2: `web/app.js`에서 옮긴 블록 삭제**

`web/app.js`에서 아래 블록을 찾아 통째로 삭제한다 (day-tasks.js로 이동했으므로):

```js
/* ==================== 세션 구성 ==================== */
function dayPatterns(day) { return PATTERNS.slice((day - 1) * 4, day * 4); }

function buildSessions(day) {
  const today = dayPatterns(day);
  const s1 = [];
  today.forEach(p => p.examples.forEach((ex, i) => s1.push({ kind: "pattern", p, ex, exIdx: i })));
  const s2 = today.map(p => ({ kind: "situation", p }));
  const sessions = [
    { name: "세션1 패턴 연습", tasks: s1 },
    { name: "세션2 상황 연습", tasks: s2 },
  ];
  if (day > 1) {
    const prev = dayPatterns(day - 1);
    sessions.push({ name: "세션3 어제 복습", tasks: prev.map(p => ({ kind: "situation", p })) });
    const pool = PATTERNS.slice(0, (day - 1) * 4);
    const picks = [];
    const used = new Set();
    while (picks.length < Math.min(2, pool.length)) {
      const i = Math.floor(Math.random() * pool.length);
      if (!used.has(i)) { used.add(i); picks.push(pool[i]); }
    }
    sessions.push({ name: "세션4 전체 복습", tasks: picks.map(p => ({ kind: "situation", p })) });
  }
  return sessions;
}
```

삭제 후 그 자리는 빈 줄 하나만 남긴다 (`/* ==================== 음성: TTS ==================== */` 섹션 바로 위).

- [ ] **Step 3: `web/index.html`에 스크립트 로드 순서 추가**

`web/index.html`에서:

```html
<script src="patterns.js"></script>
<script src="app.js"></script>
```

를 아래로 교체 (`day-tasks.js`를 `patterns.js`와 `app.js` 사이에 삽입):

```html
<script src="patterns.js"></script>
<script src="day-tasks.js"></script>
<script src="app.js"></script>
```

- [ ] **Step 4: 테스트 하네스 작성 — `web/_test.html`**

```html
<!DOCTYPE html><html><body><pre id="out"></pre>
<script src="patterns.js"></script>
<script src="day-tasks.js"></script>
<script>
let out = "";
function check(name, cond) { out += (cond ? "PASS " : "FAIL ") + name + "\n"; }

localStorage.clear();

const day1 = buildDayTasks(1);
check("day1 length is 16", day1.length === 16);
check("day1 all sessionName set", day1.every(t => typeof t.sessionName === "string"));
check("day1 first task is pattern kind", day1[0].kind === "pattern");
check("day1 session1 has 12 tasks", day1.filter(t => t.sessionName === "세션1 패턴 연습").length === 12);
check("day1 session2 has 4 tasks", day1.filter(t => t.sessionName === "세션2 상황 연습").length === 4);

const day2 = buildDayTasks(2);
check("day2 length is 22", day2.length === 22);
check("day2 session3 has 4 tasks", day2.filter(t => t.sessionName === "세션3 어제 복습").length === 4);
check("day2 session4 has 2 tasks", day2.filter(t => t.sessionName === "세션4 전체 복습").length === 2);

const day2Again = buildDayTasks(2);
const picks1 = day2.filter(t => t.sessionName === "세션4 전체 복습").map(t => t.p.num).sort();
const picks2 = day2Again.filter(t => t.sessionName === "세션4 전체 복습").map(t => t.p.num).sort();
check("day2 review picks stable across calls", JSON.stringify(picks1) === JSON.stringify(picks2));

document.getElementById("out").textContent = out;
</script>
</body></html>
```

- [ ] **Step 5: 헤드리스 Chromium으로 실행 및 확인**

```powershell
$chrome = "C:\Users\이보재\AppData\Local\ms-playwright\chromium-1228\chrome-win64\chrome.exe"
cmd /c "`"$chrome`" --headless=new --disable-gpu --dump-dom http://localhost:8123/_test.html > `"%TEMP%\test_out.html`" 2>nul"
$dom = [System.IO.File]::ReadAllText("$env:TEMP\test_out.html", [System.Text.Encoding]::UTF8)
[regex]::Match($dom, "<pre[^>]*>([\s\S]*?)</pre>").Groups[1].Value
```

Expected: 8줄 모두 `PASS`로 시작, `FAIL` 없음.

- [ ] **Step 6: Commit**

```bash
cd "/c/VS CODE/EnglishTutor"
git add web/day-tasks.js web/app.js web/index.html
git commit -m "day-tasks.js 분리: 커리큘럼 로직 + 세션4 랜덤 복습 고정 버그 수정"
```

---

### Task 2: `{day, pos}` 위치 모델 + 기존 데이터 마이그레이션 + `advancePos`

**Files:**
- Modify: `web/app.js` (`LS.progress` getter, `state` 객체)
- Modify: `web/day-tasks.js` (Task 1에서 만든 파일에 `advancePos` 추가)
- Test: `web/_test.html` (덮어씀)

**Interfaces:**
- Consumes: Task 1의 `buildDayTasks(day)`
- Produces: `advancePos(day, pos, direction)` — `direction`은 `"forward"` 또는 `"back"`, `{day, pos}` 반환 (day-tasks.js). `LS.progress` getter가 이제 항상 `{day, pos}` 형태를 반환 (기존 `{day, session, index}` 저장값 자동 변환).

- [ ] **Step 1: `web/day-tasks.js`에 `advancePos` 추가**

`web/day-tasks.js` 맨 끝에 추가:

```js
/* 위치 이동 계산 (순수 함수, day-1의 마지막 문제까지 자유롭게 뒤로 이동 가능) */
function advancePos(day, pos, direction) {
  if (direction === "back") {
    if (pos > 0) return { day, pos: pos - 1 };
    if (day > 1) return { day: day - 1, pos: buildDayTasks(day - 1).length - 1 };
    return { day, pos };
  }
  return { day, pos: pos + 1 };
}
```

- [ ] **Step 2: `web/app.js`의 `LS.progress` getter를 마이그레이션 로직으로 교체**

찾기:

```js
  get progress() {
    try { return JSON.parse(localStorage.getItem("progress")) || { day: 1, session: 0, index: 0 }; }
    catch { return { day: 1, session: 0, index: 0 }; }
  },
```

교체:

```js
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
```

- [ ] **Step 3: `web/app.js`의 `state` 객체에 `back` 플래그 추가**

찾기:

```js
const state = { running: false, paused: false, skip: false, quit: false };
```

교체:

```js
const state = { running: false, paused: false, skip: false, back: false, quit: false };
```

- [ ] **Step 4: 테스트 하네스를 app.js 포함 버전으로 교체 — `web/_test.html`**

Task 1의 `_test.html`을 아래 내용으로 완전히 덮어쓴다. `app.js`는 최상단 코드가 여러 버튼 id를 즉시 참조하므로, 최소 스텁 버튼/요소를 함께 넣는다 (이후 태스크에서도 계속 재사용):

```html
<!DOCTYPE html><html><body>
<button id="btn-start"></button>
<button id="btn-pause"></button>
<button id="btn-skip"></button>
<button id="btn-back"></button>
<button id="btn-quit"></button>
<button id="btn-settings"></button>
<button id="btn-settings-close"></button>
<button id="btn-settings-save"></button>
<button id="btn-reset"></button>
<button id="btn-preview-korean"></button>
<button id="btn-preview-english"></button>
<div id="home-day"></div>
<div id="home-plan"></div>
<div id="home-warning"></div>
<select id="input-engine"></select>
<input id="input-apikey">
<input id="input-geminikey">
<input id="input-day">
<select id="input-korean-voice"></select>
<select id="input-english-voice"></select>
<div id="mic-indicator" class="hidden"><span class="pulse"></span></div>
<div id="status-main"></div>
<div id="status-sub"></div>
<span id="ph-day"></span><span id="ph-session"></span><span id="ph-progress"></span>
<pre id="out"></pre>
<script src="patterns.js"></script>
<script src="day-tasks.js"></script>
<script src="app.js"></script>
<script>
let out = "";
function check(name, cond) { out += (cond ? "PASS " : "FAIL ") + name + "\n"; }

localStorage.clear();

let r = advancePos(3, 5, "forward");
check("forward increments pos", r.day === 3 && r.pos === 6);

r = advancePos(3, 5, "back");
check("back decrements pos", r.day === 3 && r.pos === 4);

r = advancePos(3, 0, "back");
const day2Len = buildDayTasks(2).length;
check("back at pos0 crosses to prev day", r.day === 2 && r.pos === day2Len - 1);

r = advancePos(1, 0, "back");
check("back at day1 pos0 stays put", r.day === 1 && r.pos === 0);

localStorage.setItem("progress", JSON.stringify({ day: 3, session: 1, index: 2 }));
const sessions3 = buildSessions(3);
const expectedPos = sessions3[0].tasks.length + 2;
const migrated = LS.progress;
check("migration converts session/index to pos", migrated.day === 3 && migrated.pos === expectedPos);

const reloaded = JSON.parse(localStorage.getItem("progress"));
check("migration persists new format", typeof reloaded.pos === "number");

document.getElementById("out").textContent = out;
</script>
</body></html>
```

- [ ] **Step 5: 헤드리스 Chromium으로 실행 및 확인**

```powershell
$chrome = "C:\Users\이보재\AppData\Local\ms-playwright\chromium-1228\chrome-win64\chrome.exe"
cmd /c "`"$chrome`" --headless=new --disable-gpu --dump-dom http://localhost:8123/_test.html > `"%TEMP%\test_out.html`" 2>nul"
$dom = [System.IO.File]::ReadAllText("$env:TEMP\test_out.html", [System.Text.Encoding]::UTF8)
[regex]::Match($dom, "<pre[^>]*>([\s\S]*?)</pre>").Groups[1].Value
```

Expected: 6줄 모두 `PASS`, `FAIL` 없음.

- [ ] **Step 6: Commit**

```bash
cd "/c/VS CODE/EnglishTutor"
git add web/app.js web/day-tasks.js
git commit -m "위치 모델을 {day,pos}로 전환, 기존 저장 데이터 자동 마이그레이션"
```

---

### Task 3: `runDay()` 재작성 — 커서 기반 이동 루프 (이전/건너뛰기/즉시저장)

**Files:**
- Modify: `web/app.js` (`listenWithRetry`, `runPatternTask`, `runSituationTask`, `runDay` 전체 교체, `savePos` 추가)
- Test: `web/_test.html` (덮어씀)

**Interfaces:**
- Consumes: `buildDayTasks(day)`, `advancePos(day, pos, direction)` (Task 1, 2)
- Produces: `savePos(day, pos)` — 즉시 저장 헬퍼. `runDay()`는 여전히 인자 없이 호출되는 `async function` (기존 호출부 `$("btn-start").onclick` 변경 없음).

- [ ] **Step 1: `listenWithRetry`에 `state.back` 체크 추가**

찾기 (`web/app.js`):

```js
async function listenWithRetry() {
  for (let i = 0; i < 3; i++) {
    if (state.skip || state.quit) return null;
```

교체:

```js
async function listenWithRetry() {
  for (let i = 0; i < 3; i++) {
    if (state.skip || state.back || state.quit) return null;
```

- [ ] **Step 2: `runPatternTask`의 abort 체크 3곳에 `state.back` 추가**

`runPatternTask` 함수 안에서 아래 3줄을 각각 찾아 교체한다 (모두 동일한 치환):

찾기 (3곳 모두):
```js
  if (state.skip) return;
```

`runPatternTask` 함수 본문 안에 있는 것만 교체 (총 3곳):
```js
  if (state.skip || state.back) return;
```

- [ ] **Step 3: `runSituationTask`의 abort 체크 3곳에 `state.back` 추가**

동일하게 `runSituationTask` 함수 안의 3곳도:

```js
  if (state.skip) return;
```

→

```js
  if (state.skip || state.back) return;
```

(Step 2, 3 합쳐서 총 6곳 — `runPatternTask`에 3곳, `runSituationTask`에 3곳)

- [ ] **Step 4: `runDay()` 전체를 교체**

찾기 — 기존 `runDay()` 함수 전체 (`async function runDay() {` 부터 마지막 `}` 까지):

```js
async function runDay() {
  const prog = LS.progress;
  const day = prog.day;
  const sessions = buildSessions(day);
  const totalTasks = sessions.reduce((n, s) => n + s.tasks.length, 0);

  let doneCount = 0;
  for (let si = 0; si < sessions.length; si++) {
    if (si < prog.session) { doneCount += sessions[si].tasks.length; continue; }
    const session = sessions[si];
    const startIdx = si === prog.session ? prog.index : 0;
    doneCount += startIdx;

    if (startIdx === 0) {
      ui.header(day, session.name, doneCount, totalTasks);
      ui.main(session.name + " 시작!");
      ui.sub("");
      await step(() => speak(session.name.replace("세션", "세션 ") + "을 시작합니다.", "ko-KR"));
    }

    for (let ti = startIdx; ti < session.tasks.length; ti++) {
      state.skip = false;
      ui.header(day, session.name, doneCount, totalTasks);
      const task = session.tasks[ti];
      try {
        if (task.kind === "pattern") await runPatternTask(task);
        else await runSituationTask(task);
      } catch (e) {
        if (e && e.quit) throw e;
        // API 오류 등: 음성 안내 후 잠시 대기, 같은 문제 재시도
        console.error(e);
        ui.main("오류가 발생했어요");
        ui.sub(String(e.message || e));
        await speak("오류가 발생했어요. 잠시 후 다시 시도합니다.", "ko-KR");
        await new Promise(r => setTimeout(r, 3000));
        ti--; continue;
      }
      doneCount++;
      LS.progress = { day, session: si, index: ti + 1 };
    }
    LS.progress = { day, session: si + 1, index: 0 };
  }

  // 하루 완료
  LS.progress = { day: Math.min(day + 1, 50), session: 0, index: 0 };
  ui.main("Day " + day + " 완료! 수고하셨어요!");
  ui.sub("");
  await speak("오늘 학습을 모두 완료했어요. 수고하셨습니다!", "ko-KR");
}
```

교체:

```js
function savePos(day, pos) { LS.progress = { day, pos }; }

async function runDay() {
  const prog = LS.progress;
  let day = prog.day;
  let pos = prog.pos;

  while (true) {
    const tasks = buildDayTasks(day);

    if (pos >= tasks.length) {
      const finishedDay = day;
      day = Math.min(day + 1, 50);
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
```

- [ ] **Step 5: 테스트 하네스에 `runDay()` 통합 시나리오 추가 — `web/_test.html`**

Task 2의 `_test.html` 안, `<script src="app.js"></script>` 다음 `<script>` 블록의 `document.getElementById("out").textContent = out;` 줄 **바로 위**에 아래 코드를 추가한다 (실제 음성/마이크 없이, `runPatternTask`/`runSituationTask`/`speak`를 스텁으로 교체해 루프 로직만 검증):

```js
// runDay() 통합 테스트 (실제 speak/task 실행은 스텁으로 대체)
async function testRunDay() {
  // 시나리오 A: day2 끝에서 2문제 남았을 때 정방향 진행 -> 하루 완료 후 다음날로
  localStorage.clear();
  speak = () => Promise.resolve();
  runPatternTask = async () => {};
  runSituationTask = async () => {};
  LS.progress = { day: 2, pos: 20 };
  state.skip = false; state.back = false; state.quit = false;
  await runDay();
  check("forward flow completes day and advances", LS.progress.day === 3 && LS.progress.pos === 0);

  // 시나리오 B: day2 시작 문제에서 이전을 누르면 day1 마지막 문제로 갔다가,
  // 그 한 문제를 마치면(day1 완료) 다시 day2 pos0로 돌아온다
  localStorage.clear();
  let callCount = 0;
  const backOnceStub = async () => { callCount++; if (callCount === 1) state.back = true; };
  runPatternTask = backOnceStub;
  runSituationTask = backOnceStub;
  LS.progress = { day: 2, pos: 0 };
  state.skip = false; state.back = false; state.quit = false;
  await runDay();
  check("back at day-start crosses to prev day then round-trips", LS.progress.day === 2 && LS.progress.pos === 0);
}
await testRunDay();
```

이 블록을 추가한 뒤, 스크립트 전체를 감싸는 최상위 `<script>` 태그를 `async` 실행 가능하도록 즉시실행 async 함수로 바꾼다 — `web/_test.html`의 세 번째 `<script>` 블록 전체를 아래처럼 `(async () => { ... })();`로 감싼다:

```html
<script>
(async () => {
let out = "";
function check(name, cond) { out += (cond ? "PASS " : "FAIL ") + name + "\n"; }

localStorage.clear();

let r = advancePos(3, 5, "forward");
check("forward increments pos", r.day === 3 && r.pos === 6);

r = advancePos(3, 5, "back");
check("back decrements pos", r.day === 3 && r.pos === 4);

r = advancePos(3, 0, "back");
const day2Len = buildDayTasks(2).length;
check("back at pos0 crosses to prev day", r.day === 2 && r.pos === day2Len - 1);

r = advancePos(1, 0, "back");
check("back at day1 pos0 stays put", r.day === 1 && r.pos === 0);

localStorage.setItem("progress", JSON.stringify({ day: 3, session: 1, index: 2 }));
const sessions3 = buildSessions(3);
const expectedPos = sessions3[0].tasks.length + 2;
const migrated = LS.progress;
check("migration converts session/index to pos", migrated.day === 3 && migrated.pos === expectedPos);

const reloaded = JSON.parse(localStorage.getItem("progress"));
check("migration persists new format", typeof reloaded.pos === "number");

async function testRunDay() {
  localStorage.clear();
  speak = () => Promise.resolve();
  runPatternTask = async () => {};
  runSituationTask = async () => {};
  LS.progress = { day: 2, pos: 20 };
  state.skip = false; state.back = false; state.quit = false;
  await runDay();
  check("forward flow completes day and advances", LS.progress.day === 3 && LS.progress.pos === 0);

  localStorage.clear();
  let callCount = 0;
  const backOnceStub = async () => { callCount++; if (callCount === 1) state.back = true; };
  runPatternTask = backOnceStub;
  runSituationTask = backOnceStub;
  LS.progress = { day: 2, pos: 0 };
  state.skip = false; state.back = false; state.quit = false;
  await runDay();
  check("back at day-start crosses to prev day then round-trips", LS.progress.day === 2 && LS.progress.pos === 0);
}
await testRunDay();

document.getElementById("out").textContent = out;
})();
</script>
```

이 블록으로 `web/_test.html`의 세 번째(마지막) `<script>` 태그 내용 전체를 교체한다.

- [ ] **Step 6: 헤드리스 Chromium으로 실행 및 확인**

```powershell
$chrome = "C:\Users\이보재\AppData\Local\ms-playwright\chromium-1228\chrome-win64\chrome.exe"
cmd /c "`"$chrome`" --headless=new --disable-gpu --dump-dom http://localhost:8123/_test.html > `"%TEMP%\test_out.html`" 2>nul"
$dom = [System.IO.File]::ReadAllText("$env:TEMP\test_out.html", [System.Text.Encoding]::UTF8)
[regex]::Match($dom, "<pre[^>]*>([\s\S]*?)</pre>").Groups[1].Value
```

Expected: 8줄 모두 `PASS` (기존 6줄 + 새로운 2줄 `runDay` 통합 테스트), `FAIL` 없음.

- [ ] **Step 7: Commit**

```bash
cd "/c/VS CODE/EnglishTutor"
git add web/app.js
git commit -m "runDay()를 커서 기반 이동 루프로 재작성 (이전/건너뛰기, 즉시 위치저장)"
```

---

### Task 4: 학습 화면 "이전" 버튼 + 2행 2열 레이아웃

**Files:**
- Modify: `web/index.html:29-45` (학습 화면 controls div)
- Modify: `web/style.css:88-99` (`.controls`, `.ctl-btn`)
- Modify: `web/app.js` (`$("btn-back")` 핸들러 추가, `refreshHome()`의 재개 판단, 설정 저장의 day 초기화)

**Interfaces:**
- Consumes: `state.back` (Task 2), `runDay()`가 매 문제마다 `$("btn-back").disabled`를 갱신 (Task 3)

- [ ] **Step 1: `web/index.html`의 controls div 교체**

찾기:

```html
  <div class="controls">
    <button id="btn-pause" class="ctl-btn">일시정지</button>
    <button id="btn-skip" class="ctl-btn">건너뛰기</button>
    <button id="btn-quit" class="ctl-btn danger">종료</button>
  </div>
```

교체:

```html
  <div class="controls">
    <button id="btn-back" class="ctl-btn">이전</button>
    <button id="btn-skip" class="ctl-btn">건너뛰기</button>
    <button id="btn-pause" class="ctl-btn">일시정지</button>
    <button id="btn-quit" class="ctl-btn danger">종료</button>
  </div>
```

- [ ] **Step 2: `web/style.css`의 `.controls`/`.ctl-btn` 교체**

찾기:

```css
.controls { display: flex; gap: 10px; }
.ctl-btn {
  flex: 1;
  background: #353b58;
  color: #eef0f6;
  border: none;
  border-radius: 12px;
  font-size: 17px;
  padding: 16px 8px;
  cursor: pointer;
}
.ctl-btn.danger { background: #6b3040; }
```

교체:

```css
.controls { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.ctl-btn {
  background: #353b58;
  color: #eef0f6;
  border: none;
  border-radius: 12px;
  font-size: 17px;
  padding: 16px 8px;
  cursor: pointer;
}
.ctl-btn.danger { background: #6b3040; }
.ctl-btn:disabled { opacity: 0.4; cursor: default; }
```

- [ ] **Step 3: `web/app.js`에 `btn-back` 클릭 핸들러 추가**

찾기:

```js
$("btn-skip").onclick = () => { state.skip = true; speechSynthesis.cancel(); };
```

교체 (기존 줄은 그대로 두고 바로 아래에 추가):

```js
$("btn-skip").onclick = () => { state.skip = true; speechSynthesis.cancel(); };

$("btn-back").onclick = () => { state.back = true; speechSynthesis.cancel(); };
```

- [ ] **Step 4: `refreshHome()`의 재개 판단을 `pos` 기준으로 변경**

찾기:

```js
  const resumed = prog.session > 0 || prog.index > 0;
```

교체:

```js
  const resumed = prog.pos > 0;
```

- [ ] **Step 5: 설정 화면의 Day 강제 이동 로직을 새 포맷으로 변경**

찾기:

```js
  const d = parseInt($("input-day").value, 10);
  if (d >= 1 && d <= 50 && d !== LS.progress.day) {
    LS.progress = { day: d, session: 0, index: 0 };
  }
```

교체:

```js
  const d = parseInt($("input-day").value, 10);
  if (d >= 1 && d <= 50 && d !== LS.progress.day) {
    LS.progress = { day: d, pos: 0 };
  }
```

- [ ] **Step 6: 헤드리스 Chromium으로 구조 확인**

```powershell
$chrome = "C:\Users\이보재\AppData\Local\ms-playwright\chromium-1228\chrome-win64\chrome.exe"
cmd /c "`"$chrome`" --headless=new --disable-gpu --dump-dom http://localhost:8123/index.html > `"%TEMP%\index_dom.html`" 2>nul"
$dom = [System.IO.File]::ReadAllText("$env:TEMP\index_dom.html", [System.Text.Encoding]::UTF8)
Write-Output ("btn-back present: " + ($dom -match 'id="btn-back"'))
Write-Output ("button order correct: " + ($dom -match '(?s)id="btn-back".*?id="btn-skip".*?id="btn-pause".*?id="btn-quit"'))
```

Expected: 두 줄 다 `True`.

- [ ] **Step 7: Commit**

```bash
cd "/c/VS CODE/EnglishTutor"
git add web/index.html web/style.css web/app.js
git commit -m "학습 화면에 이전 버튼 추가, 2행 2열 컨트롤 레이아웃으로 재배치"
```

---

### Task 5: TTS 음성 자동 선택(네트워크 우선) + 수동 음성 선택 UI

**Files:**
- Modify: `web/app.js` (`LS` 객체에 `koreanVoice`/`englishVoice` 추가, `pickVoice` 반전, `populateVoiceSelect`/`previewVoice` 추가, `openSettings`/저장 핸들러 갱신)
- Modify: `web/index.html:60-71` (설정 화면에 음성 선택 필드 추가)

**Interfaces:**
- Produces: `pickVoice(lang)` (동작 변경), `populateVoiceSelect(selectEl, lang, savedURI)`, `previewVoice(lang, voiceURI)`

- [ ] **Step 1: `web/app.js`의 `LS` 객체에 음성 선택 저장 필드 추가**

찾기:

```js
  get engine() { return localStorage.getItem("engine") || "claude"; },
  set engine(v) { localStorage.setItem("engine", v); },
```

교체:

```js
  get engine() { return localStorage.getItem("engine") || "claude"; },
  set engine(v) { localStorage.setItem("engine", v); },
  get koreanVoice() { return localStorage.getItem("koreanVoice") || ""; },
  set koreanVoice(v) { localStorage.setItem("koreanVoice", v); },
  get englishVoice() { return localStorage.getItem("englishVoice") || ""; },
  set englishVoice(v) { localStorage.setItem("englishVoice", v); },
```

- [ ] **Step 2: `pickVoice`를 네트워크 우선 + 수동 선택 우선으로 교체**

찾기:

```js
function pickVoice(lang) {
  const exact = voices.filter(v => v.lang.replace("_", "-").startsWith(lang.slice(0, 2)));
  return exact.find(v => v.localService) || exact[0] || null;
}
```

교체:

```js
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
```

- [ ] **Step 3: `web/index.html` 설정 화면에 음성 선택 필드 추가**

찾기:

```html
  <label class="field">
    <span>Gemini API 키</span>
    <input type="password" id="input-geminikey" placeholder="AIza...">
  </label>
  <label class="field">
    <span>현재 Day (1~50)</span>
    <input type="number" id="input-day" min="1" max="50">
  </label>
```

교체:

```html
  <label class="field">
    <span>Gemini API 키</span>
    <input type="password" id="input-geminikey" placeholder="AIza...">
  </label>
  <label class="field">
    <span>한국어 음성</span>
    <select id="input-korean-voice"></select>
    <button type="button" id="btn-preview-korean" class="ctl-btn">미리듣기</button>
  </label>
  <label class="field">
    <span>영어 음성</span>
    <select id="input-english-voice"></select>
    <button type="button" id="btn-preview-english" class="ctl-btn">미리듣기</button>
  </label>
  <label class="field">
    <span>현재 Day (1~50)</span>
    <input type="number" id="input-day" min="1" max="50">
  </label>
```

- [ ] **Step 4: `openSettings()`에서 음성 목록 채우기**

찾기:

```js
function openSettings() {
  $("input-engine").value = LS.engine;
  $("input-apikey").value = LS.apiKey;
  $("input-geminikey").value = LS.geminiKey;
  $("input-day").value = LS.progress.day;
  ui.show("settings");
}
```

교체:

```js
function openSettings() {
  $("input-engine").value = LS.engine;
  $("input-apikey").value = LS.apiKey;
  $("input-geminikey").value = LS.geminiKey;
  $("input-day").value = LS.progress.day;
  populateVoiceSelect($("input-korean-voice"), "ko-KR", LS.koreanVoice);
  populateVoiceSelect($("input-english-voice"), "en-US", LS.englishVoice);
  ui.show("settings");
}
```

- [ ] **Step 5: 저장 핸들러에 음성 선택값 저장 추가, 미리듣기 버튼 핸들러 추가**

찾기:

```js
$("btn-settings-save").onclick = () => {
  LS.engine = $("input-engine").value;
  LS.apiKey = $("input-apikey").value.trim();
  const newGeminiKey = $("input-geminikey").value.trim();
  if (newGeminiKey !== LS.geminiKey) localStorage.removeItem("geminiModel");
  LS.geminiKey = newGeminiKey;
  const d = parseInt($("input-day").value, 10);
  if (d >= 1 && d <= 50 && d !== LS.progress.day) {
    LS.progress = { day: d, pos: 0 };
  }
  ui.show("home");
  refreshHome();
};
```

교체:

```js
$("btn-settings-save").onclick = () => {
  LS.engine = $("input-engine").value;
  LS.apiKey = $("input-apikey").value.trim();
  const newGeminiKey = $("input-geminikey").value.trim();
  if (newGeminiKey !== LS.geminiKey) localStorage.removeItem("geminiModel");
  LS.geminiKey = newGeminiKey;
  LS.koreanVoice = $("input-korean-voice").value;
  LS.englishVoice = $("input-english-voice").value;
  const d = parseInt($("input-day").value, 10);
  if (d >= 1 && d <= 50 && d !== LS.progress.day) {
    LS.progress = { day: d, pos: 0 };
  }
  ui.show("home");
  refreshHome();
};

$("btn-preview-korean").onclick = () => previewVoice("ko-KR", $("input-korean-voice").value);
$("btn-preview-english").onclick = () => previewVoice("en-US", $("input-english-voice").value);
```

- [ ] **Step 6: 테스트 하네스에 `pickVoice`/`populateVoiceSelect` 검증 추가 — `web/_test.html`**

Task 3에서 만든 `_test.html`의 즉시실행 함수 안, `await testRunDay();` 줄 다음에 추가:

```js
// 음성 선택 로직 테스트 (가짜 voices 배열 사용)
voices = [
  { lang: "ko-KR", name: "Local Korean", localService: true, voiceURI: "local-ko" },
  { lang: "ko-KR", name: "Network Korean", localService: false, voiceURI: "net-ko" },
];
LS.koreanVoice = "";
let picked = pickVoice("ko-KR");
check("pickVoice prefers network voice by default", picked.voiceURI === "net-ko");

LS.koreanVoice = "local-ko";
picked = pickVoice("ko-KR");
check("pickVoice honors manual override", picked.voiceURI === "local-ko");
LS.koreanVoice = "";

populateVoiceSelect($("input-korean-voice"), "ko-KR", "");
check("populateVoiceSelect adds default + 2 voices", $("input-korean-voice").options.length === 3);
```

- [ ] **Step 7: 헤드리스 Chromium으로 실행 및 확인**

```powershell
$chrome = "C:\Users\이보재\AppData\Local\ms-playwright\chromium-1228\chrome-win64\chrome.exe"
cmd /c "`"$chrome`" --headless=new --disable-gpu --dump-dom http://localhost:8123/_test.html > `"%TEMP%\test_out.html`" 2>nul"
$dom = [System.IO.File]::ReadAllText("$env:TEMP\test_out.html", [System.Text.Encoding]::UTF8)
[regex]::Match($dom, "<pre[^>]*>([\s\S]*?)</pre>").Groups[1].Value
```

Expected: 11줄 모두 `PASS` (기존 8줄 + 새로운 3줄), `FAIL` 없음.

- [ ] **Step 8: Commit**

```bash
cd "/c/VS CODE/EnglishTutor"
git add web/app.js web/index.html
git commit -m "TTS 음성을 네트워크 우선으로 변경, 설정에 음성 선택+미리듣기 UI 추가"
```

---

### Task 6: 상태 텍스트 2줄 구분(B안) + 버전 배지 v7

**Files:**
- Modify: `web/style.css:70-71` (`#status-main`, `#status-sub`)
- Modify: `web/index.html:16` (버전 배지)

**Interfaces:** 없음 (순수 스타일/표시 변경)

- [ ] **Step 1: `web/style.css`의 상태 텍스트 스타일 교체**

찾기:

```css
#status-main { font-size: 24px; line-height: 1.5; font-weight: bold; }
#status-sub { font-size: 17px; line-height: 1.5; color: #9aa3c0; min-height: 26px; }
```

교체:

```css
#status-main { font-size: 24px; line-height: 1.5; font-weight: bold; }
#status-sub { font-size: 22px; line-height: 1.5; color: #6ee7a0; font-weight: 600; min-height: 34px; }
```

- [ ] **Step 2: `web/index.html`의 버전 배지 갱신**

찾기:

```html
    <h1>English Tutor <small style="font-size:12px;color:#9aa3c0">v6</small></h1>
```

교체:

```html
    <h1>English Tutor <small style="font-size:12px;color:#9aa3c0">v7</small></h1>
```

- [ ] **Step 3: 스타일 반영 확인 (텍스트 검색)**

```powershell
Select-String -Path "C:\VS CODE\EnglishTutor\web\style.css" -Pattern "#status-sub \{ font-size: 22px.*color: #6ee7a0.*font-weight: 600"
Select-String -Path "C:\VS CODE\EnglishTutor\web\index.html" -Pattern "v7"
```

Expected: 두 명령 모두 일치하는 줄을 1개씩 출력.

- [ ] **Step 4: Commit**

```bash
cd "/c/VS CODE/EnglishTutor"
git add web/style.css web/index.html
git commit -m "상태 텍스트 둘째줄 크기/색상 구분(B안), 버전 배지 v7"
```

---

### Task 7: 정리, 전체 스모크 검증, 배포

**Files:**
- Delete: `web/_test.html` (임시 테스트 하네스)

- [ ] **Step 1: 임시 테스트 파일 삭제**

```bash
cd "/c/VS CODE/EnglishTutor"
rm -f web/_test.html
```

- [ ] **Step 2: 실제 앱 페이지 전체 스모크 검증 (헤드리스 Chromium)**

```powershell
$chrome = "C:\Users\이보재\AppData\Local\ms-playwright\chromium-1228\chrome-win64\chrome.exe"
cmd /c "`"$chrome`" --headless=new --disable-gpu --dump-dom http://localhost:8123/ > `"%TEMP%\final_dom.html`" 2>nul"
$dom = [System.IO.File]::ReadAllText("$env:TEMP\final_dom.html", [System.Text.Encoding]::UTF8)
Write-Output ("v7 badge: " + ($dom -match "v7"))
Write-Output ("pattern list renders: " + ($dom -match "패턴 1\."))
Write-Output ("no leftover v6: " + (-not ($dom -match "v6")))
```

Expected: 세 줄 모두 `True`.

이어서 학습 화면도 확인 (홈에서 `btn-start`를 실제로 누르는 것은 헤드리스로 어렵기 때문에, `index.html`의 정적 마크업에 이전 버튼이 포함돼 있는지 재확인):

```powershell
Write-Output ("btn-back in markup: " + ($dom -match 'id="btn-back"'))
```

Expected: `True`.

- [ ] **Step 3: 남은 변경사항 확인 및 커밋**

```bash
cd "/c/VS CODE/EnglishTutor"
git status --short
git add -A
git status --short
```

`web/_test.html` 삭제만 남아있어야 한다 (다른 태스크들은 이미 각자 커밋됨). 삭제할 파일이 있다면:

```bash
git commit -m "임시 테스트 하네스 삭제"
```

변경사항이 없다면 이 스텝은 건너뛴다.

- [ ] **Step 4: 푸시하여 GitHub Pages 자동 배포 트리거**

```bash
cd "/c/VS CODE/EnglishTutor"
git push
```

- [ ] **Step 5: 배포 완료까지 대기 후 라이브 사이트 확인**

```powershell
$deadline = (Get-Date).AddMinutes(4)
do {
  Start-Sleep -Seconds 15
  $r = Invoke-RestMethod -Uri "https://api.github.com/repos/BOJAELEE/English-tutor/actions/runs?per_page=1" -UseBasicParsing
  $run = $r.workflow_runs[0]
} while ($run.status -ne "completed" -and (Get-Date) -lt $deadline)
Write-Output ("deploy: " + $run.conclusion)

Start-Sleep -Seconds 8
$res = Invoke-WebRequest -Uri "https://bojaelee.github.io/English-tutor/" -UseBasicParsing -Headers @{ "Cache-Control" = "no-cache" }
$liveDom = [System.Text.Encoding]::UTF8.GetString($res.RawContentStream.ToArray())
Write-Output ("live v7: " + ($liveDom -match "v7"))
Write-Output ("live btn-back: " + ($liveDom -match 'id="btn-back"'))
```

Expected: `deploy: success`, `live v7: True`, `live btn-back: True`.

- [ ] **Step 6: 사용자에게 완료 보고**

폰에서 앱을 새로고침(탭 완전히 닫았다 다시 열기)한 뒤 홈 화면에 "v7" 배지가 보이는지, 설정에서 한국어/영어 음성을 골라 미리듣기가 되는지, 학습 화면에서 "이전" 버튼으로 Day 경계를 넘어 이동해도 문제없는지 확인해달라고 안내한다.

---

## 셀프 리뷰 결과

**스펙 커버리지 확인:**
- §1 위치 추적 아키텍처 (데이터 모델, 이동 규칙, 저장 시점, 세션4 버그 수정, 마이그레이션) → Task 1, 2, 3에서 모두 구현·테스트됨
- §2 화면 버튼 배치 (2행 2열, 비활성화) → Task 4
- §3 TTS 자연스러움 (네트워크 우선, 수동 선택+미리듣기) → Task 5
- §4 텍스트 계층 (B안: 색상+크기) → Task 6
- 범위 밖 항목(문구 변경 안 함, 건너뛰기로 내일 진입 안 함, Day 1~50 clamp)은 Global Constraints에 명시하고 어떤 태스크도 위반하지 않음

**플레이스홀더 스캔:** "TBD", "적절히 처리" 등의 표현 없음. 모든 스텝에 실행 가능한 전체 코드/명령 포함.

**타입/이름 일관성 확인:** `buildDayTasks`, `advancePos`, `savePos`, `pickVoice`, `populateVoiceSelect`, `previewVoice` 등 모든 함수명이 정의된 태스크와 사용되는 태스크에서 동일하게 사용됨. `state.back` 플래그명이 Task 2(정의)부터 Task 3(사용), Task 4(핸들러)까지 일관됨.
