# 패턴 추가 간편화 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **참고:** 이번 실행은 별도 세션이 아니라 **현재 대화 세션 내에서 인라인으로** 진행한다 (요청자 확인 완료).

**Goal:** 사용자가 앞으로 새 영어회화 패턴을 4개 단위로 추가할 때, 텍스트 파일만 직접 준비하면 `패턴추가.bat` 더블클릭 한 번으로 검증·배포까지 끝나도록 만든다. 앱은 패턴 개수에 따라 총 학습 일수를 자동으로 계산한다.

**Architecture:** `parse_patterns.py`의 검증을 "정확히 200개"에서 "4의 배수, 1번부터 연속"으로 일반화하고, `web/day-tasks.js`에 `TOTAL_DAYS = Math.ceil(PATTERNS.length / 4)` 상수를 추가해 하드코딩된 `50`을 대체한다. 새 `add_patterns.ps1`(+ 순수 함수만 담은 `pattern-helpers.ps1`)이 변환·커밋 메시지 생성·git push·배포 대기를 자동화하고, 프로젝트 루트의 `패턴추가.bat`가 이를 더블클릭으로 실행시킨다.

**Tech Stack:** 순수 정적 웹앱(JS/HTML/CSS, 빌드 도구 없음), Python(패턴 파싱), PowerShell 5.1(자동화 스크립트). 검증은 헤드리스 Chromium(`C:\Users\이보재\AppData\Local\ms-playwright\chromium-1228\chrome-win64\chrome.exe`)과 격리된 임시 디렉터리/임시 git 저장소로 진행하며, 실제 프로젝트의 `data/patterns_raw.txt`·`web/patterns.js`·원격 저장소는 테스트 중 건드리지 않는다.

## Global Constraints

- 화면에 나오는 한국어 문구, 커리큘럼 순서(세션1~4), 이전/건너뛰기 동작 등 기존 학습 로직은 바꾸지 않는다
- 새 npm 패키지나 빌드 단계를 추가하지 않는다
- `패턴추가.bat`/`add_patterns.ps1`은 `web/` 폴더 밖에 두어 GitHub Pages 배포 대상에서 자동 제외되게 한다 (`.github/workflows/deploy.yml`이 `web/`만 업로드)
- PowerShell 5.1 환경에서 한글이 깨지지 않아야 한다 — `.ps1` 파일은 UTF-8 **BOM 포함**으로 저장한다 (BOM 없으면 Windows PowerShell 5.1이 시스템 코드페이지로 잘못 해석해 한글이 깨짐)
- 배포 저장소: `https://github.com/BOJAELEE/English-tutor.git`, 배포 URL: `https://bojaelee.github.io/English-tutor/`

---

## 사전 준비: 로컬 검증 서버 확인

```powershell
try { (Invoke-WebRequest -Uri "http://localhost:8123/" -UseBasicParsing -TimeoutSec 3).StatusCode } catch { "DOWN" }
```

`DOWN`이면 `run_in_background: true`로:

```powershell
python -m http.server 8123 --directory "C:\VS CODE\EnglishTutor\web"
```

---

### Task 1: `parse_patterns.py` 검증 일반화 (200개 고정 → 4의 배수)

**Files:**
- Modify: `scripts/parse_patterns.py:44-71` (검증 블록 + 출력 메시지)
- Test: 임시 디렉터리 (`%TEMP%\parse_test_ok`, `%TEMP%\parse_test_fail`), 실제 프로젝트 파일은 건드리지 않음

**Interfaces:** 없음 (독립 스크립트, 표준입출력과 종료코드로만 동작)

- [ ] **Step 1: 검증 블록을 패턴 개수 기반 일반화 로직으로 교체**

찾기 (`scripts/parse_patterns.py`):

```python
patterns.sort(key=lambda p: p["num"])

# 검증
nums = [p["num"] for p in patterns]
ok = True
if len(patterns) != 200:
    print(f"FAIL: 패턴 수 {len(patterns)} != 200"); ok = False
if nums != list(range(1, 201)):
    missing = sorted(set(range(1, 201)) - set(nums))
    dupes = sorted({n for n in nums if nums.count(n) > 1})
    print(f"FAIL: 누락={missing} 중복={dupes}"); ok = False
for p in patterns:
    if len(p["examples"]) != 3:
        print(f"FAIL: #{p['num']} 예문 {len(p['examples'])}개"); ok = False
    if not p["title"]:
        print(f"FAIL: #{p['num']} 제목 없음"); ok = False
for a in anomalies:
    print("ANOMALY:", a); ok = False

if not ok:
    sys.exit(1)

out = ROOT / "web" / "patterns.js"
out.parent.mkdir(exist_ok=True)
js = "const PATTERNS = " + json.dumps(patterns, ensure_ascii=False, indent=1) + ";\n"
out.write_text(js, encoding="utf-8")
print(f"OK: 200 patterns, 50 days -> {out}")
print("샘플 #1:", json.dumps(patterns[0], ensure_ascii=False))
print("샘플 #120:", json.dumps(patterns[119], ensure_ascii=False))
print("샘플 #200:", json.dumps(patterns[199], ensure_ascii=False))
```

교체:

```python
patterns.sort(key=lambda p: p["num"])

# 검증
nums = [p["num"] for p in patterns]
n = len(patterns)
ok = True
if n == 0 or n % 4 != 0:
    print(f"FAIL: 패턴 수 {n}개는 4의 배수가 아닙니다 (하루 4패턴 단위로만 추가할 수 있습니다)"); ok = False
if nums != list(range(1, n + 1)):
    missing = sorted(set(range(1, n + 1)) - set(nums))
    dupes = sorted({x for x in nums if nums.count(x) > 1})
    print(f"FAIL: 1번부터 {n}번까지 빠짐없이 연속이어야 합니다. 누락={missing} 중복={dupes}"); ok = False
for p in patterns:
    if len(p["examples"]) != 3:
        print(f"FAIL: #{p['num']} 예문 {len(p['examples'])}개"); ok = False
    if not p["title"]:
        print(f"FAIL: #{p['num']} 제목 없음"); ok = False
for a in anomalies:
    print("ANOMALY:", a); ok = False

if not ok:
    sys.exit(1)

out = ROOT / "web" / "patterns.js"
out.parent.mkdir(exist_ok=True)
js = "const PATTERNS = " + json.dumps(patterns, ensure_ascii=False, indent=1) + ";\n"
out.write_text(js, encoding="utf-8")
total_days = n // 4
print(f"OK: {n} patterns, {total_days} days -> {out}")
print("샘플 #1:", json.dumps(patterns[0], ensure_ascii=False))
print(f"샘플 #{n}:", json.dumps(patterns[-1], ensure_ascii=False))
```

- [ ] **Step 2: 격리된 임시 디렉터리에서 정상 케이스(8개, 4의 배수) 테스트**

```powershell
$testDir = "$env:TEMP\parse_test_ok"
Remove-Item $testDir -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path "$testDir\scripts","$testDir\data" -Force | Out-Null
Copy-Item "C:\VS CODE\EnglishTutor\scripts\parse_patterns.py" "$testDir\scripts\parse_patterns.py"

@"
Pattern 001: Test title A + word  Test example A1.  Test example A2.Test example A3.Pattern 002: Test title B  Test example B1.  Test example B2.Test example B3.Pattern 003: Test title C  Test example C1.  Test example C2.Test example C3.Pattern 004: Test title D  Test example D1.  Test example D2.Test example D3.Pattern 005: Test title E  Test example E1.  Test example E2.Test example E3.Pattern 006: Test title F  Test example F1.  Test example F2.Test example F3.Pattern 007: Test title G  Test example G1.  Test example G2.Test example G3.Pattern 008: Test title H  Test example H1.  Test example H2.Test example H3.
"@ | Out-File -FilePath "$testDir\data\patterns_raw.txt" -Encoding utf8 -NoNewline

python "$testDir\scripts\parse_patterns.py"
Write-Output ("exit code: " + $LASTEXITCODE)
Write-Output (Get-Content "$testDir\web\patterns.js" -Raw -Encoding UTF8).Length
```

Expected: `OK: 8 patterns, 2 days -> ...`, `exit code: 0`, `web\patterns.js`가 생성되고 길이가 0보다 큼.

- [ ] **Step 3: 같은 임시 구조에서 4의 배수가 아닌 케이스(5개) 테스트**

```powershell
$testDir2 = "$env:TEMP\parse_test_fail"
Remove-Item $testDir2 -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path "$testDir2\scripts","$testDir2\data" -Force | Out-Null
Copy-Item "C:\VS CODE\EnglishTutor\scripts\parse_patterns.py" "$testDir2\scripts\parse_patterns.py"

@"
Pattern 001: Test title A  Test example A1.  Test example A2.Test example A3.Pattern 002: Test title B  Test example B1.  Test example B2.Test example B3.Pattern 003: Test title C  Test example C1.  Test example C2.Test example C3.Pattern 004: Test title D  Test example D1.  Test example D2.Test example D3.Pattern 005: Test title E  Test example E1.  Test example E2.Test example E3.
"@ | Out-File -FilePath "$testDir2\data\patterns_raw.txt" -Encoding utf8 -NoNewline

python "$testDir2\scripts\parse_patterns.py"
Write-Output ("exit code: " + $LASTEXITCODE)
Write-Output ("web/patterns.js exists: " + (Test-Path "$testDir2\web\patterns.js"))
```

Expected: `FAIL: 패턴 수 5개는 4의 배수가 아닙니다...` 출력, `exit code: 1`, `web/patterns.js exists: False` (검증 실패 시 파일을 쓰지 않음).

- [ ] **Step 4: 임시 디렉터리 정리**

```powershell
Remove-Item "$env:TEMP\parse_test_ok" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "$env:TEMP\parse_test_fail" -Recurse -Force -ErrorAction SilentlyContinue
```

- [ ] **Step 5: Commit**

```bash
cd "/c/VS CODE/EnglishTutor"
git add scripts/parse_patterns.py
git commit -m "parse_patterns.py 검증을 200개 고정에서 4의 배수 일반화로 변경"
```

---

### Task 2: `web/day-tasks.js`에 `TOTAL_DAYS` 상수 추가

**Files:**
- Modify: `web/day-tasks.js:1-3`
- Test: `web/_test.html` (임시 파일, 마지막 태스크에서 삭제)

**Interfaces:**
- Produces: 전역 상수 `TOTAL_DAYS` (숫자) — `PATTERNS.length`를 4로 나눠 올림한 값. `patterns.js`가 먼저 로드되어 있어야 함.

- [ ] **Step 1: `web/day-tasks.js` 상단에 상수 추가**

찾기:

```js
"use strict";

/* ==================== 하루 커리큘럼 로직 (DOM 비의존, 테스트 가능) ==================== */
```

교체:

```js
"use strict";

/* 총 학습 일수 (패턴 개수 ÷ 4, 올림) */
const TOTAL_DAYS = Math.ceil(PATTERNS.length / 4);

/* ==================== 하루 커리큘럼 로직 (DOM 비의존, 테스트 가능) ==================== */
```

- [ ] **Step 2: 테스트 하네스 작성 — `web/_test.html`**

```html
<!DOCTYPE html><html><body><pre id="out"></pre>
<script src="patterns.js"></script>
<script src="day-tasks.js"></script>
<script>
let out = "";
function check(name, cond) { out += (cond ? "PASS " : "FAIL ") + name + "\n"; }

check("TOTAL_DAYS is a number", typeof TOTAL_DAYS === "number");
check("TOTAL_DAYS matches current 200-pattern data (50 days)", TOTAL_DAYS === 50);
check("formula rounds up for non-multiple counts", Math.ceil(220 / 4) === 55);
check("formula matches for exact multiple", Math.ceil(200 / 4) === 50);

document.getElementById("out").textContent = out;
</script>
</body></html>
```

- [ ] **Step 3: 헤드리스 Chromium으로 확인**

```powershell
$chrome = "C:\Users\이보재\AppData\Local\ms-playwright\chromium-1228\chrome-win64\chrome.exe"
cmd /c "`"$chrome`" --headless=new --disable-gpu --dump-dom http://localhost:8123/_test.html > `"%TEMP%\test_out.html`" 2>nul"
Start-Sleep -Milliseconds 800
$dom = [System.IO.File]::ReadAllText("$env:TEMP\test_out.html", [System.Text.Encoding]::UTF8)
[regex]::Match($dom, "<pre[^>]*>([\s\S]*?)</pre>").Groups[1].Value
```

Expected: 4줄 모두 `PASS`.

- [ ] **Step 4: Commit**

```bash
cd "/c/VS CODE/EnglishTutor"
git add web/day-tasks.js
git commit -m "day-tasks.js에 패턴 개수 기반 TOTAL_DAYS 상수 추가"
```

---

### Task 3: `web/app.js`의 하드코딩된 `50`을 `TOTAL_DAYS`로 교체

**Files:**
- Modify: `web/app.js` (`runDay()`의 day-complete 분기, 설정 저장 핸들러)
- Test: `web/_test.html` (Task 2 파일에 이어서 작성)

**Interfaces:**
- Consumes: `TOTAL_DAYS` (Task 2)

- [ ] **Step 1: `runDay()`의 day-complete 분기 수정**

찾기 (`web/app.js`):

```js
    if (pos >= tasks.length) {
      const finishedDay = day;
      day = Math.min(day + 1, 50);
      pos = 0;
```

교체:

```js
    if (pos >= tasks.length) {
      const finishedDay = day;
      day = Math.min(day + 1, TOTAL_DAYS);
      pos = 0;
```

- [ ] **Step 2: 설정 저장 핸들러의 Day 범위 체크 수정**

찾기:

```js
  const d = parseInt($("input-day").value, 10);
  if (d >= 1 && d <= 50 && d !== LS.progress.day) {
    LS.progress = { day: d, pos: 0 };
  }
```

교체:

```js
  const d = parseInt($("input-day").value, 10);
  if (d >= 1 && d <= TOTAL_DAYS && d !== LS.progress.day) {
    LS.progress = { day: d, pos: 0 };
  }
```

- [ ] **Step 3: 하드코딩된 50이 남아있지 않은지 확인**

```powershell
Select-String -Path "C:\VS CODE\EnglishTutor\web\app.js" -Pattern "day \+ 1, 50\)|d <= 50"
```

Expected: 아무 결과도 나오지 않음 (일치하는 줄 없음).

- [ ] **Step 4: `web/_test.html`에 runDay 클램프 통합 테스트 추가**

Task 2에서 만든 `_test.html`을 아래 내용으로 완전히 덮어쓴다 (기존 4개 체크 + 새 통합 테스트, `app.js`가 여러 버튼 id를 즉시 참조하므로 스텁 요소 포함):

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
<span id="day-range-label"></span>
<div id="mic-indicator" class="hidden"><span class="pulse"></span></div>
<div id="status-main"></div>
<div id="status-sub"></div>
<span id="ph-day"></span><span id="ph-session"></span><span id="ph-progress"></span>
<pre id="out"></pre>
<script src="patterns.js"></script>
<script src="day-tasks.js"></script>
<script src="app.js"></script>
<script>
(async () => {
let out = "";
function check(name, cond) { out += (cond ? "PASS " : "FAIL ") + name + "\n"; }

check("TOTAL_DAYS is a number", typeof TOTAL_DAYS === "number");
check("TOTAL_DAYS matches current 200-pattern data (50 days)", TOTAL_DAYS === 50);
check("formula rounds up for non-multiple counts", Math.ceil(220 / 4) === 55);
check("formula matches for exact multiple", Math.ceil(200 / 4) === 50);

// runDay()가 마지막 날 완료 시 TOTAL_DAYS를 넘지 않는지 확인
localStorage.clear();
speak = () => Promise.resolve();
runPatternTask = async () => {};
runSituationTask = async () => {};
const lastDayTasks = buildDayTasks(TOTAL_DAYS).length;
LS.progress = { day: TOTAL_DAYS, pos: lastDayTasks - 1 };
state.skip = false; state.back = false; state.quit = false;
await runDay();
check("finishing the last day clamps at TOTAL_DAYS (does not overflow)",
      LS.progress.day === TOTAL_DAYS && LS.progress.pos === 0);

document.getElementById("out").textContent = out;
})();
</script>
</body></html>
```

- [ ] **Step 5: 헤드리스 Chromium으로 확인**

```powershell
$chrome = "C:\Users\이보재\AppData\Local\ms-playwright\chromium-1228\chrome-win64\chrome.exe"
cmd /c "`"$chrome`" --headless=new --disable-gpu --dump-dom http://localhost:8123/_test.html > `"%TEMP%\test_out2.html`" 2>nul"
Start-Sleep -Milliseconds 800
$dom = [System.IO.File]::ReadAllText("$env:TEMP\test_out2.html", [System.Text.Encoding]::UTF8)
[regex]::Match($dom, "<pre[^>]*>([\s\S]*?)</pre>").Groups[1].Value
```

Expected: 5줄 모두 `PASS`.

- [ ] **Step 6: Commit**

```bash
cd "/c/VS CODE/EnglishTutor"
git add web/app.js
git commit -m "app.js의 하드코딩된 50일을 TOTAL_DAYS로 교체"
```

---

### Task 4: `web/index.html` — Day 범위 라벨/최대값을 동적으로 표시

**Files:**
- Modify: `web/index.html:79-82` (설정 화면의 Day 입력 필드)
- Modify: `web/app.js`의 `openSettings()`
- Test: `web/_test.html` (Task 3 파일에 이어서 작성)

**Interfaces:**
- Consumes: `TOTAL_DAYS` (Task 2)

- [ ] **Step 1: `web/index.html`의 Day 입력 필드 라벨에 id 부여, 하드코딩된 50 제거**

찾기:

```html
  <label class="field">
    <span>현재 Day (1~50)</span>
    <input type="number" id="input-day" min="1" max="50">
  </label>
```

교체:

```html
  <label class="field">
    <span id="day-range-label">현재 Day</span>
    <input type="number" id="input-day" min="1">
  </label>
```

- [ ] **Step 2: `openSettings()`에서 라벨과 max를 동적으로 채우기**

찾기 (`web/app.js`):

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

교체:

```js
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

- [ ] **Step 3: `web/_test.html`에 openSettings 테스트 추가**

Task 3의 `_test.html`, `document.getElementById("out").textContent = out;` 줄 **바로 위**에 추가:

```js
openSettings();
check("openSettings sets input-day max to TOTAL_DAYS", $("input-day").max === String(TOTAL_DAYS));
check("openSettings sets day-range-label text", $("day-range-label").textContent === "현재 Day (1~" + TOTAL_DAYS + ")");
ui.show("home");
```

- [ ] **Step 4: 헤드리스 Chromium으로 확인**

```powershell
$chrome = "C:\Users\이보재\AppData\Local\ms-playwright\chromium-1228\chrome-win64\chrome.exe"
cmd /c "`"$chrome`" --headless=new --disable-gpu --dump-dom http://localhost:8123/_test.html > `"%TEMP%\test_out3.html`" 2>nul"
Start-Sleep -Milliseconds 800
$dom = [System.IO.File]::ReadAllText("$env:TEMP\test_out3.html", [System.Text.Encoding]::UTF8)
[regex]::Match($dom, "<pre[^>]*>([\s\S]*?)</pre>").Groups[1].Value
```

Expected: 7줄 모두 `PASS`.

- [ ] **Step 5: Commit**

```bash
cd "/c/VS CODE/EnglishTutor"
git add web/index.html web/app.js
git commit -m "설정 화면의 Day 범위를 TOTAL_DAYS 기준으로 동적 표시"
```

---

### Task 5: 패턴 추가 자동화 — `pattern-helpers.ps1` (순수 함수) + 단위 테스트

**Files:**
- Create: `scripts/pattern-helpers.ps1`
- Test: 임시 디렉터리(`%TEMP%\pattern_helpers_test`), 실제 프로젝트 파일 미사용

**Interfaces:**
- Produces: `Get-PatternCount -Path <patterns.js 경로>` → 정수 (패턴이 없거나 파일이 없으면 0). `Build-CommitMessage -OldCount <int> -NewCount <int>` → 커밋 메시지 문자열.

- [ ] **Step 1: `scripts/pattern-helpers.ps1` 작성 (함수 정의만, 실행 로직 없음)**

```powershell
function Get-PatternCount {
    param([string]$Path)
    if (-not (Test-Path $Path)) { return 0 }
    $content = Get-Content $Path -Raw -Encoding UTF8
    $matches = [regex]::Matches($content, '"num":\s*(\d+)')
    if ($matches.Count -eq 0) { return 0 }
    return ($matches | ForEach-Object { [int]$_.Groups[1].Value } | Measure-Object -Maximum).Maximum
}

function Build-CommitMessage {
    param([int]$OldCount, [int]$NewCount)
    if ($NewCount -gt $OldCount) {
        return "패턴 추가: $($OldCount + 1)~$NewCount번"
    }
    return "패턴 데이터 갱신 (총 $NewCount 개)"
}
```

- [ ] **Step 2: UTF-8 BOM으로 저장 (한글 안전)**

```powershell
$content = Get-Content "C:\VS CODE\EnglishTutor\scripts\pattern-helpers.ps1" -Raw -Encoding UTF8
[System.IO.File]::WriteAllText("C:\VS CODE\EnglishTutor\scripts\pattern-helpers.ps1", $content, (New-Object System.Text.UTF8Encoding($true)))
```

- [ ] **Step 3: 격리된 임시 디렉터리에서 단위 테스트**

```powershell
$testDir = "$env:TEMP\pattern_helpers_test"
Remove-Item $testDir -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path $testDir | Out-Null

. "C:\VS CODE\EnglishTutor\scripts\pattern-helpers.ps1"

# 존재하지 않는 파일 -> 0
$c0 = Get-PatternCount -Path "$testDir\nope.js"
Write-Output ("PASS Get-PatternCount missing file returns 0: " + ($c0 -eq 0))

# 가짜 patterns.js (num 1~8) -> 8
@'
const PATTERNS = [
 {"num": 1, "title": "a", "examples": ["x","y","z"]},
 {"num": 5, "title": "b", "examples": ["x","y","z"]},
 {"num": 8, "title": "c", "examples": ["x","y","z"]}
];
'@ | Out-File -FilePath "$testDir\patterns.js" -Encoding utf8
$c8 = Get-PatternCount -Path "$testDir\patterns.js"
Write-Output ("PASS Get-PatternCount finds max num (8): " + ($c8 -eq 8))

# 커밋 메시지: 증가한 경우
$msgGrow = Build-CommitMessage -OldCount 200 -NewCount 220
Write-Output ("PASS Build-CommitMessage growth message: " + ($msgGrow -eq "패턴 추가: 201~220번"))

# 커밋 메시지: 변화 없는 경우
$msgSame = Build-CommitMessage -OldCount 200 -NewCount 200
Write-Output ("PASS Build-CommitMessage no-growth message: " + ($msgSame -eq "패턴 데이터 갱신 (총 200 개)"))

Remove-Item $testDir -Recurse -Force -ErrorAction SilentlyContinue
```

Expected: 4줄 모두 `PASS ... : True`.

- [ ] **Step 4: Commit**

```bash
cd "/c/VS CODE/EnglishTutor"
git add scripts/pattern-helpers.ps1
git commit -m "패턴 개수 계산 + 커밋 메시지 생성 순수 함수 추가 (pattern-helpers.ps1)"
```

---

### Task 6: `add_patterns.ps1` 메인 스크립트 + `패턴추가.bat`

**Files:**
- Create: `scripts/add_patterns.ps1`
- Create: `패턴추가.bat` (프로젝트 루트, `web/` 밖 — 배포 대상에서 자동 제외)
- Test: 임시 git 저장소(`%TEMP%\add_patterns_test_repo`), 실제 프로젝트/원격 저장소 미사용

**Interfaces:**
- Consumes: `Get-PatternCount`, `Build-CommitMessage` (Task 5), `scripts/parse_patterns.py` (Task 1)

- [ ] **Step 1: `scripts/add_patterns.ps1` 작성**

```powershell
param(
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$root = Split-Path -Parent $PSScriptRoot
. (Join-Path $root "scripts\pattern-helpers.ps1")

$patternsJs = Join-Path $root "web\patterns.js"
$parseScript = Join-Path $root "scripts\parse_patterns.py"

Write-Output "=== 패턴 변환 및 검증 시작 ==="
$oldCount = Get-PatternCount -Path $patternsJs

$pyOutput = & python $parseScript 2>&1
$pyExit = $LASTEXITCODE
$pyOutput | ForEach-Object { Write-Output $_ }

if ($pyExit -ne 0) {
    Write-Output ""
    Write-Output "=== 검증 실패 ==="
    Write-Output "위 오류 메시지를 확인하고 data\patterns_raw.txt를 고친 뒤 다시 실행해주세요."
    Read-Host "아무 키나 누르면 창이 닫힙니다"
    exit 1
}

$newCount = Get-PatternCount -Path $patternsJs
$commitMessage = Build-CommitMessage -OldCount $oldCount -NewCount $newCount

Write-Output ""
Write-Output "=== 검증 성공 ==="
Write-Output "패턴 개수: $oldCount -> $newCount"
Write-Output "커밋 메시지: $commitMessage"

Push-Location $root
try {
    git add data/patterns_raw.txt web/patterns.js
    $changed = (git status --porcelain -- data/patterns_raw.txt web/patterns.js)

    if (-not $changed) {
        Write-Output ""
        Write-Output "=== 변경사항이 없습니다 ==="
        Write-Output "이미 최신 상태입니다. 커밋/배포를 진행하지 않습니다."
        Read-Host "아무 키나 누르면 창이 닫힙니다"
        exit 0
    }

    git commit -m $commitMessage

    if ($DryRun) {
        Write-Output ""
        Write-Output "=== DRY RUN: 로컬 커밋까지만 진행했습니다 ==="
        Write-Output "실제 배포하려면 -DryRun 없이 다시 실행하거나 'git push'를 직접 실행하세요."
        Read-Host "아무 키나 누르면 창이 닫힙니다"
        exit 0
    }

    git push

    Write-Output ""
    Write-Output "=== 배포 대기 중 (최대 4분) ==="
    $deadline = (Get-Date).AddMinutes(4)
    $run = $null
    do {
        Start-Sleep -Seconds 15
        $r = Invoke-RestMethod -Uri "https://api.github.com/repos/BOJAELEE/English-tutor/actions/runs?per_page=1" -UseBasicParsing
        $run = $r.workflow_runs[0]
        Write-Output ("  상태: " + $run.status)
    } while ($run.status -ne "completed" -and (Get-Date) -lt $deadline)

    if ($run -and $run.conclusion -eq "success") {
        Write-Output ""
        Write-Output "=== 완료되었습니다! ==="
        Write-Output "폰에서 앱을 완전히 닫았다가 다시 열어 새로고침해주세요."
    } else {
        Write-Output ""
        Write-Output "=== 배포 상태를 확인해주세요 ==="
        Write-Output "https://github.com/BOJAELEE/English-tutor/actions"
    }
} finally {
    Pop-Location
}

Read-Host "아무 키나 누르면 창이 닫힙니다"
```

- [ ] **Step 2: UTF-8 BOM으로 저장 (한글 안전)**

```powershell
$content = Get-Content "C:\VS CODE\EnglishTutor\scripts\add_patterns.ps1" -Raw -Encoding UTF8
[System.IO.File]::WriteAllText("C:\VS CODE\EnglishTutor\scripts\add_patterns.ps1", $content, (New-Object System.Text.UTF8Encoding($true)))
```

- [ ] **Step 3: `패턴추가.bat` 작성 (프로젝트 루트)**

```bat
@echo off
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\add_patterns.ps1"
```

- [ ] **Step 4: 격리된 임시 git 저장소에서 로컬 커밋 경로 테스트 (push/배포 대기는 제외)**

실제 프로젝트나 원격 저장소를 전혀 건드리지 않도록, 완전히 새로운 임시 git 저장소를 만들어 `-DryRun`으로 실행한다 (로컬 커밋까지만 진행하고 push는 하지 않음):

```powershell
$testRepo = "$env:TEMP\add_patterns_test_repo"
Remove-Item $testRepo -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path "$testRepo\scripts","$testRepo\data","$testRepo\web" -Force | Out-Null

Copy-Item "C:\VS CODE\EnglishTutor\scripts\parse_patterns.py" "$testRepo\scripts\parse_patterns.py"
Copy-Item "C:\VS CODE\EnglishTutor\scripts\pattern-helpers.ps1" "$testRepo\scripts\pattern-helpers.ps1"
Copy-Item "C:\VS CODE\EnglishTutor\scripts\add_patterns.ps1" "$testRepo\scripts\add_patterns.ps1"

# 초기 상태: 4패턴짜리 patterns_raw.txt + 이미 커밋된 patterns.js(4개)
@"
Pattern 001: Test title A  Test example A1.  Test example A2.Test example A3.Pattern 002: Test title B  Test example B1.  Test example B2.Test example B3.Pattern 003: Test title C  Test example C1.  Test example C2.Test example C3.Pattern 004: Test title D  Test example D1.  Test example D2.Test example D3.
"@ | Out-File -FilePath "$testRepo\data\patterns_raw.txt" -Encoding utf8 -NoNewline

Push-Location $testRepo
git init -q
git config user.email "test@test.com"
git config user.name "test"
python "$testRepo\scripts\parse_patterns.py" | Out-Null
git add -A
git commit -q -m "initial: 4 patterns"

# 8패턴으로 확장 (4개 추가)
@"
Pattern 001: Test title A  Test example A1.  Test example A2.Test example A3.Pattern 002: Test title B  Test example B1.  Test example B2.Test example B3.Pattern 003: Test title C  Test example C1.  Test example C2.Test example C3.Pattern 004: Test title D  Test example D1.  Test example D2.Test example D3.Pattern 005: Test title E  Test example E1.  Test example E2.Test example E3.Pattern 006: Test title F  Test example F1.  Test example F2.Test example F3.Pattern 007: Test title G  Test example G1.  Test example G2.Test example G3.Pattern 008: Test title H  Test example H1.  Test example H2.Test example H3.
"@ | Out-File -FilePath "$testRepo\data\patterns_raw.txt" -Encoding utf8 -NoNewline

& "$testRepo\scripts\add_patterns.ps1" -DryRun

Write-Output "--- git log ---"
git log --oneline -3
Write-Output "--- last commit message (full) ---"
git log -1 --format=%B
Pop-Location
```

Expected:
- 콘솔에 `=== 검증 성공 ===`, `패턴 개수: 4 -> 8`, `커밋 메시지: 패턴 추가: 5~8번`, `=== DRY RUN: 로컬 커밋까지만 진행했습니다 ===`가 출력됨
- `git log --oneline -3`에 새 커밋이 보임
- `git log -1 --format=%B`가 정확히 `패턴 추가: 5~8번` (한글이 깨지지 않음)

- [ ] **Step 5: 변경사항 없음(no-op) 케이스 테스트**

같은 임시 저장소에서, 데이터를 바꾸지 않고 다시 실행:

```powershell
Push-Location "$env:TEMP\add_patterns_test_repo"
& ".\scripts\add_patterns.ps1" -DryRun
Pop-Location
```

Expected: `=== 변경사항이 없습니다 ===` 출력, 새 커밋이 추가되지 않음 (`git log --oneline`으로 확인 시 커밋 수 동일).

- [ ] **Step 6: 임시 저장소 정리**

```powershell
Remove-Item "$env:TEMP\add_patterns_test_repo" -Recurse -Force -ErrorAction SilentlyContinue
```

- [ ] **Step 7: Commit**

```bash
cd "/c/VS CODE/EnglishTutor"
git add scripts/add_patterns.ps1 패턴추가.bat
git commit -m "패턴 추가 자동화 스크립트(add_patterns.ps1) 및 더블클릭 실행기(패턴추가.bat) 추가"
```

---

### Task 7: 정리, 전체 스모크 검증, 배포, 실사용 1회 검증

**Files:**
- Delete: `web/_test.html` (임시 테스트 하네스)

- [ ] **Step 1: 임시 테스트 파일 삭제**

```bash
cd "/c/VS CODE/EnglishTutor"
rm -f web/_test.html
```

- [ ] **Step 2: 실제 앱 페이지 전체 스모크 검증**

```powershell
$chrome = "C:\Users\이보재\AppData\Local\ms-playwright\chromium-1228\chrome-win64\chrome.exe"
cmd /c "`"$chrome`" --headless=new --disable-gpu --dump-dom http://localhost:8123/ > `"%TEMP%\final_dom.html`" 2>nul"
Start-Sleep -Milliseconds 800
$dom = [System.IO.File]::ReadAllText("$env:TEMP\final_dom.html", [System.Text.Encoding]::UTF8)
Write-Output ("pattern list renders: " + ($dom -match "패턴 1\."))
Write-Output ("no hardcoded 1~50 label left in markup: " + (-not ($dom -match "1~50")))
```

Expected: 첫 줄 `True` (정적 마크업엔 이제 "현재 Day"만 있고 "(1~50)"은 JS가 채우므로 초기 dump-dom에는 없어야 함), 둘째 줄 `True`.

- [ ] **Step 3: 남은 변경사항 확인 및 커밋**

```bash
cd "/c/VS CODE/EnglishTutor"
git status --short
```

`web/_test.html` 삭제만 남아있으면:

```bash
git add -A
git commit -m "임시 테스트 하네스 삭제"
```

변경사항이 없으면 이 스텝은 건너뛴다.

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
$res = Invoke-WebRequest -Uri "https://bojaelee.github.io/English-tutor/day-tasks.js" -UseBasicParsing -Headers @{ "Cache-Control" = "no-cache" }
$liveJs = [System.Text.Encoding]::UTF8.GetString($res.RawContentStream.ToArray())
Write-Output ("live has TOTAL_DAYS: " + ($liveJs -match "TOTAL_DAYS"))
```

Expected: `deploy: success`, `live has TOTAL_DAYS: True`.

- [ ] **Step 6: `패턴추가.bat`를 실제 프로젝트에서 변경 없이 1회 실행해 no-op 경로 확인**

지금 `data/patterns_raw.txt`는 그대로(200개)이므로, 실제 저장소에서 한 번 실행해도 새 커밋이 생기지 않아야 한다 — 이 스텝으로 스크립트가 실제 프로젝트 경로에서도 올바르게 동작하는지 최종 확인한다:

```powershell
cd "C:\VS CODE\EnglishTutor"
& ".\scripts\add_patterns.ps1"
```

Expected: `OK: 200 patterns, 50 days -> ...` 출력 후 `=== 변경사항이 없습니다 ===`로 끝남 (git push나 배포 대기로 진행하지 않음). `git status --short`로 실제 저장소에 원치 않는 변경이 남지 않았는지 확인:

```bash
cd "/c/VS CODE/EnglishTutor"
git status --short
```

Expected: 출력 없음 (깨끗함).

- [ ] **Step 7: 사용자에게 완료 보고**

다음에 패턴을 추가하고 싶을 때는 `data/patterns_raw.txt` 맨 아래에 새 패턴(4개 단위)을 이어 붙인 뒤, 프로젝트 폴더의 **`패턴추가.bat`**를 더블클릭하면 된다고 안내한다.

---

## 셀프 리뷰 결과

**스펙 커버리지 확인:**
- §1 패턴 추가 방법(4개 단위, 기존 데이터 유지) → Task 1(검증 일반화), Task 6(스크립트가 4개 단위 위반 시 파이썬 검증 실패를 그대로 노출)
- §2 실행 방식(.bat 더블클릭, PowerShell 내부 로직, 실패 시 한국어 안내+대기, 성공 시 자동 커밋 메시지+배포 대기) → Task 5, 6
- §3 "50일 고정" 제거(TOTAL_DAYS 도입, day-tasks.js/app.js/index.html 반영) → Task 2, 3, 4
- 범위 밖 항목(앱 내 패턴 편집 UI, AI 자동 생성, 기존 200개 내용 변경) — 어떤 태스크도 해당 기능을 추가하지 않음

**플레이스홀더 스캔:** "TBD", "적절히 처리" 등 없음. 모든 스텝에 실행 가능한 전체 코드/명령 포함.

**타입/이름 일관성 확인:** `TOTAL_DAYS`가 Task 2(정의)부터 Task 3, 4(사용)까지 동일. `Get-PatternCount`/`Build-CommitMessage`가 Task 5(정의)와 Task 6(사용)에서 동일한 파라미터명(`-Path`, `-OldCount`, `-NewCount`)으로 일관됨. `add_patterns.ps1`의 `-DryRun` 스위치가 Task 6의 테스트(Step 4)에서 실제로 사용하는 것과 동일.
