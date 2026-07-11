# 아침 알림(푸시 알림) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 공휴일과 주말을 제외한 평일 아침 07:10(KST)에 "영어회화 연습 시작" 푸시 알림을 사용자 폰에 자동으로 보낸다.

**Architecture:** GitHub Actions 예약 작업(cron, KST 07:10 평일에 해당하는 UTC 시각)이 매번 실행되어 한국 공휴일 목록을 확인한 뒤, `web-push` 라이브러리로 사용자의 저장된 구독(subscription) 정보에 진짜 Web Push 메시지를 발송한다. 클라이언트(`web/sw.js`)는 `push` 이벤트를 받아 OS 알림을 표시하고, `notificationclick` 시 앱을 열어 오늘의 학습을 즉시 시작한다.

**Tech Stack:** 클라이언트는 순수 브라우저 API(Push API, Notification API, Service Worker) — 새 의존성 없음. 발송 쪽은 GitHub Actions 안에서만 실행되는 Node.js + `web-push` npm 패키지 — 로컬 개발/사용자 PC에는 전혀 영향 없음.

## Global Constraints

- 기존 "로컬 개발은 빌드 스텝 없음, npm 불필요" 원칙은 **클라이언트(`web/`) 및 로컬 개발 기준으로만** 유지한다. `scripts/notify/`의 `npm install`은 GitHub Actions 러너 안에서만 실행되며 사용자 PC/로컬 개발에는 영향 없음.
- 기존 커리큘럼/세션/한국어 UI 문구 로직은 변경하지 않는다.
- `web/sw.js`의 기존 install/activate/fetch 리스너(오프라인 캐싱)는 그대로 유지, 새 리스너만 추가한다.
- VAPID 개인키(`VAPID_PRIVATE_KEY`)는 어떤 파일에도 커밋하지 않는다. GitHub Actions 시크릿으로만 존재한다.
- VAPID 공개키는 비밀이 아니므로 클라이언트 코드에 그대로 커밋해도 된다.
- cron 스케줄: `10 22 * * 0-4` (UTC 기준 일~목 22:10 = KST 월~금 07:10).
- 알림 문구: title/body 모두 "영어회화 연습 시작".
- 대상 저장소: `https://github.com/BOJAELEE/English-tutor.git`, 배포 URL: `https://bojaelee.github.io/English-tutor/`.
- 이 환경에는 `gh` CLI와 `winget`이 설치되어 있지 않음 (Task 7에서 확인됨). GitHub 시크릿 등록은 웹 UI(`https://github.com/BOJAELEE/English-tutor/settings/secrets/actions`)로 사람이 직접 진행한다 — CLI 설치를 계획에 넣지 않는다.
- Windows PowerShell 5.1 함정 (이전 기능 개발에서 발견됨, `.ps1` 파일을 새로 만들 경우에만 해당): 한글 문자가 `$var`에 공백/구두점 없이 바로 붙으면 토크나이저가 통째로 변수명으로 흡수함 → `${var}`로 감싸서 방지. `.ps1` 파일은 UTF-8 BOM으로 저장. (이번 계획은 `.ps1` 파일을 새로 만들지 않지만, 만약 태스크 중 필요해지면 유의.)
- 로컬 정적 파일 서빙: `python -m http.server <포트> --directory web`. 헤드리스 Chromium: `C:\Users\이보재\AppData\Local\ms-playwright\chromium-1228\chrome-win64\chrome.exe --headless=new --disable-gpu --dump-dom`.
- Push API 구독 생성 자체는 브라우저 알림 권한 UI 상호작용이 필요해 헤드리스로 전체 플로우를 테스트할 수 없다. 순수 로직(날짜/공휴일 판정, VAPID 키 변환, 함수 존재 여부)까지만 자동화하고, 실제 알림 수신은 Task 7(사람 개입)에서 확인한다.

---

### Task 1: 한국 공휴일 데이터 + 날짜/공휴일 판정 순수 함수

**Files:**
- Create: `data/kr-holidays.json`
- Create: `scripts/notify/holiday-utils.mjs`
- Create: `scripts/notify/holiday-utils.test.mjs`

**Interfaces:**
- Produces: `kstDateString(date: Date): string` (예: `"2026-07-13"`), `isHoliday(dateStr: string, holidayData: {holidays: {date:string,name:string}[]}): boolean` — Task 2가 그대로 import해서 사용.

- [ ] **Step 1: 공휴일 데이터 파일 작성**

```json
{
  "_source_note": "2026년: kr.trip.com/blog/2026-calendar, publicholidays.co.kr 등 교차 확인. 2027년: issue.curationinfo.com, kr.trip.com/blog/2026-calendar 교차 확인. 2027-06-06(현충일, 일요일)의 대체공휴일 여부는 출처마다 상충되어(일부는 있다고 함, kr.trip.com은 '국가추모일이라 대체공휴일 없음'이라 명시) 보수적으로 미포함 처리함 - 2027년 6월 이전에 정부 공식 발표로 재확인 권장. 근로자의 날(5/1)은 법정공휴일이 아니므로 제외.",
  "holidays": [
    {"date": "2026-01-01", "name": "신정"},
    {"date": "2026-02-16", "name": "설날연휴"},
    {"date": "2026-02-17", "name": "설날"},
    {"date": "2026-02-18", "name": "설날연휴"},
    {"date": "2026-03-01", "name": "삼일절"},
    {"date": "2026-03-02", "name": "삼일절 대체공휴일"},
    {"date": "2026-05-05", "name": "어린이날"},
    {"date": "2026-05-24", "name": "부처님오신날"},
    {"date": "2026-05-25", "name": "부처님오신날 대체공휴일"},
    {"date": "2026-06-06", "name": "현충일"},
    {"date": "2026-08-15", "name": "광복절"},
    {"date": "2026-08-17", "name": "광복절 대체공휴일"},
    {"date": "2026-09-24", "name": "추석연휴"},
    {"date": "2026-09-25", "name": "추석"},
    {"date": "2026-09-26", "name": "추석연휴"},
    {"date": "2026-10-03", "name": "개천절"},
    {"date": "2026-10-05", "name": "개천절 대체공휴일"},
    {"date": "2026-10-09", "name": "한글날"},
    {"date": "2026-12-25", "name": "크리스마스"},
    {"date": "2027-01-01", "name": "신정"},
    {"date": "2027-02-06", "name": "설날연휴"},
    {"date": "2027-02-07", "name": "설날"},
    {"date": "2027-02-08", "name": "설날연휴"},
    {"date": "2027-02-09", "name": "설날 대체공휴일"},
    {"date": "2027-03-01", "name": "삼일절"},
    {"date": "2027-05-05", "name": "어린이날"},
    {"date": "2027-05-13", "name": "부처님오신날"},
    {"date": "2027-06-06", "name": "현충일"},
    {"date": "2027-08-15", "name": "광복절"},
    {"date": "2027-08-16", "name": "광복절 대체공휴일"},
    {"date": "2027-09-14", "name": "추석연휴"},
    {"date": "2027-09-15", "name": "추석"},
    {"date": "2027-09-16", "name": "추석연휴"},
    {"date": "2027-10-03", "name": "개천절"},
    {"date": "2027-10-04", "name": "개천절 대체공휴일"},
    {"date": "2027-10-09", "name": "한글날"},
    {"date": "2027-10-11", "name": "한글날 대체공휴일"},
    {"date": "2027-12-25", "name": "크리스마스"},
    {"date": "2027-12-27", "name": "크리스마스 대체공휴일"}
  ]
}
```

- [ ] **Step 2: 순수 함수 작성**

`scripts/notify/holiday-utils.mjs`:

```javascript
export function kstDateString(date) {
  const kst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
}

export function isHoliday(dateStr, holidayData) {
  return holidayData.holidays.some(h => h.date === dateStr);
}
```

- [ ] **Step 3: 실패하는 테스트 작성**

`scripts/notify/holiday-utils.test.mjs`:

```javascript
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { kstDateString, isHoliday } from "./holiday-utils.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const holidayData = JSON.parse(
  readFileSync(join(__dirname, "..", "..", "data", "kr-holidays.json"), "utf8")
);

test("kstDateString converts UTC midnight to KST date (9 hours ahead)", () => {
  // 2026-07-12T00:00:00Z (UTC) -> 2026-07-12T09:00:00 KST
  assert.equal(kstDateString(new Date("2026-07-12T00:00:00Z")), "2026-07-12");
});

test("kstDateString rolls over to next day near midnight UTC", () => {
  // 2026-07-12T15:30:00Z (UTC) -> 2026-07-13T00:30:00 KST
  assert.equal(kstDateString(new Date("2026-07-12T15:30:00Z")), "2026-07-13");
});

test("isHoliday returns true for a known 2026 holiday (Chuseok)", () => {
  assert.equal(isHoliday("2026-09-25", holidayData), true);
});

test("isHoliday returns true for a substitute holiday (개천절 대체공휴일)", () => {
  assert.equal(isHoliday("2026-10-05", holidayData), true);
});

test("isHoliday returns false for a plain weekday", () => {
  assert.equal(isHoliday("2026-07-13", holidayData), false);
});

test("isHoliday returns false for a date not in the list at all (2028)", () => {
  assert.equal(isHoliday("2028-01-01", holidayData), false);
});
```

- [ ] **Step 4: 테스트 실행해서 실패 확인**

Run: `node --test scripts/notify/holiday-utils.test.mjs`
Expected: FAIL — `holiday-utils.mjs` 파일이 아직 없거나(이 단계 순서상 Step 2에서 이미 만들었으므로 실제로는 바로 통과할 수 있음) import 오류. Step 2와 Step 3을 이 순서 그대로 따라 했다면 이미 통과 상태일 수 있음 — 그 경우 이 스텝은 "테스트가 이미 통과함"을 확인하는 것으로 대체.

- [ ] **Step 5: 테스트 통과 확인**

Run: `node --test scripts/notify/holiday-utils.test.mjs`
Expected: `# pass 6`, `# fail 0`

- [ ] **Step 6: Commit**

```bash
git add data/kr-holidays.json scripts/notify/holiday-utils.mjs scripts/notify/holiday-utils.test.mjs
git commit -m "한국 공휴일 데이터 + 날짜/공휴일 판정 순수 함수 추가"
```

---

### Task 2: 알림 발송 스크립트 (web-push 통합)

**Files:**
- Create: `scripts/notify/package.json`
- Create: `scripts/notify/package-lock.json` (npm install로 생성됨)
- Create: `scripts/notify/send-notification.mjs`
- Create: `scripts/notify/send-notification.test.mjs`
- Modify: `.gitignore` (신규 파일이면 생성) — `scripts/notify/node_modules/` 추가

**Interfaces:**
- Consumes: `kstDateString`, `isHoliday` (Task 1, `./holiday-utils.mjs`)
- Produces: `run({ today, holidayData, env, webpushSend }): Promise<{sent: boolean, reason?: string, date: string}>` — 순수 테스트 가능한 핵심 로직. 실제 실행 시 진입점이 `run()`을 실제 `web-push`와 `process.env`로 감싸서 호출한다.

- [ ] **Step 1: package.json 작성**

`scripts/notify/package.json`:

```json
{
  "name": "englishtutor-notify",
  "private": true,
  "type": "module",
  "description": "GitHub Actions 예약 작업에서만 실행되는 푸시 알림 발송 스크립트 (사용자 로컬 개발과 무관)",
  "dependencies": {
    "web-push": "^3.6.7"
  }
}
```

- [ ] **Step 2: 의존성 설치 (lockfile 생성)**

Run:
```bash
cd "C:\VS CODE\EnglishTutor\scripts\notify"
npm install
```
Expected: `node_modules/`와 `package-lock.json`이 생성됨. `web-push` 및 그 의존성이 설치됨.

- [ ] **Step 3: .gitignore에 node_modules 제외 추가**

프로젝트 루트에 `.gitignore`가 없으면 새로 만들고, 있으면 아래 줄을 추가:

```
scripts/notify/node_modules/
```

- [ ] **Step 4: 실패하는 테스트 작성**

`scripts/notify/send-notification.test.mjs`:

```javascript
import { test } from "node:test";
import assert from "node:assert/strict";
import { run } from "./send-notification.mjs";

const holidayData = { holidays: [{ date: "2026-10-05", name: "개천절 대체공휴일" }] };

test("run skips sending on a holiday", async () => {
  let called = false;
  const result = await run({
    today: "2026-10-05",
    holidayData,
    env: { VAPID_PUBLIC_KEY: "pub", VAPID_PRIVATE_KEY: "priv", PUSH_SUBSCRIPTION: "{}" },
    webpushSend: async () => { called = true; },
  });
  assert.equal(result.sent, false);
  assert.equal(result.reason, "holiday");
  assert.equal(called, false);
});

test("run sends on a non-holiday weekday with correct payload", async () => {
  let capturedArgs = null;
  const result = await run({
    today: "2026-10-06",
    holidayData,
    env: { VAPID_PUBLIC_KEY: "pub", VAPID_PRIVATE_KEY: "priv", PUSH_SUBSCRIPTION: '{"endpoint":"https://example.com/x"}' },
    webpushSend: async (subscription, payload, keys) => {
      capturedArgs = { subscription, payload, keys };
    },
  });
  assert.equal(result.sent, true);
  assert.deepEqual(capturedArgs.subscription, { endpoint: "https://example.com/x" });
  const payload = JSON.parse(capturedArgs.payload);
  assert.equal(payload.title, "영어회화 연습 시작");
  assert.equal(payload.body, "영어회화 연습 시작");
  assert.equal(capturedArgs.keys.publicKey, "pub");
  assert.equal(capturedArgs.keys.privateKey, "priv");
});

test("run throws a clear error when a required env var is missing", async () => {
  await assert.rejects(
    () => run({
      today: "2026-10-06",
      holidayData,
      env: { VAPID_PUBLIC_KEY: "pub", VAPID_PRIVATE_KEY: "", PUSH_SUBSCRIPTION: "{}" },
      webpushSend: async () => {},
    }),
    /VAPID_PRIVATE_KEY/
  );
});
```

- [ ] **Step 5: 테스트 실행해서 실패 확인**

Run: `cd "C:\VS CODE\EnglishTutor\scripts\notify" && node --test send-notification.test.mjs`
Expected: FAIL — `send-notification.mjs`에 `run` export가 아직 없음 (`Cannot find module` 또는 `run is not a function`)

- [ ] **Step 6: 최소 구현 작성**

`scripts/notify/send-notification.mjs`:

```javascript
import webpush from "web-push";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { kstDateString, isHoliday } from "./holiday-utils.mjs";

export async function run({ today, holidayData, env, webpushSend }) {
  if (isHoliday(today, holidayData)) {
    return { sent: false, reason: "holiday", date: today };
  }

  const { VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, PUSH_SUBSCRIPTION } = env;
  const missing = ["VAPID_PUBLIC_KEY", "VAPID_PRIVATE_KEY", "PUSH_SUBSCRIPTION"]
    .filter(k => !env[k]);
  if (missing.length > 0) {
    throw new Error("필요한 환경변수가 설정되지 않았습니다: " + missing.join(", "));
  }

  const subscription = JSON.parse(PUSH_SUBSCRIPTION);
  const payload = JSON.stringify({ title: "영어회화 연습 시작", body: "영어회화 연습 시작" });
  await webpushSend(subscription, payload, {
    publicKey: VAPID_PUBLIC_KEY,
    privateKey: VAPID_PRIVATE_KEY,
  });
  return { sent: true, date: today };
}

async function realWebpushSend(subscription, payload, keys) {
  webpush.setVapidDetails("mailto:donravetop@gmail.com", keys.publicKey, keys.privateKey);
  await webpush.sendNotification(subscription, payload);
}

async function main() {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const holidayData = JSON.parse(
    readFileSync(join(__dirname, "..", "..", "data", "kr-holidays.json"), "utf8")
  );
  const today = kstDateString(new Date());
  const result = await run({
    today,
    holidayData,
    env: process.env,
    webpushSend: realWebpushSend,
  });
  console.log(JSON.stringify(result));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
```

- [ ] **Step 7: 테스트 실행해서 통과 확인**

Run: `cd "C:\VS CODE\EnglishTutor\scripts\notify" && node --test send-notification.test.mjs`
Expected: `# pass 3`, `# fail 0`

- [ ] **Step 8: holiday-utils 테스트도 같이 재확인 (회귀 확인)**

Run: `cd "C:\VS CODE\EnglishTutor" && node --test scripts/notify/holiday-utils.test.mjs`
Expected: `# pass 6`, `# fail 0` (Task 1과 동일하게 유지되어야 함)

- [ ] **Step 9: Commit**

```bash
git add scripts/notify/package.json scripts/notify/package-lock.json scripts/notify/send-notification.mjs scripts/notify/send-notification.test.mjs .gitignore
git commit -m "알림 발송 스크립트(send-notification.mjs) 추가 - web-push 통합, 순수 로직 단위 테스트"
```

---

### Task 3: VAPID 키 생성 + 클라이언트 공개키 설정 파일

**Files:**
- Create: `web/push-config.js`
- Modify: `web/index.html` (script 태그 추가)

**Interfaces:**
- Consumes: `scripts/notify/` 안의 `web-push` 패키지 (Task 2에서 설치됨, 키 생성 커맨드에만 일회성으로 사용)
- Produces: 전역 상수 `VAPID_PUBLIC_KEY` (문자열) — Task 6이 `web/app.js`에서 그대로 참조.

- [ ] **Step 1: VAPID 키 쌍 생성**

Run:
```bash
cd "C:\VS CODE\EnglishTutor\scripts\notify"
node --input-type=module -e "import webpush from 'web-push'; const k = webpush.generateVAPIDKeys(); console.log('PUBLIC:' + k.publicKey); console.log('PRIVATE:' + k.privateKey);"
```
Expected: `PUBLIC:` 로 시작하는 줄과 `PRIVATE:` 로 시작하는 줄 각각 하나씩 출력됨 (둘 다 URL-safe base64 문자열).

**개인키(PRIVATE로 시작하는 값)는 이 단계에서 어디에도 저장하지 말고, 이 태스크의 리포트 파일에만 평문으로 남겨서 Task 7(사람이 GitHub 시크릿으로 직접 등록)에서 사용하게 한다. 커밋 대상 파일에는 절대 넣지 않는다.**

- [ ] **Step 2: 공개키를 클라이언트 설정 파일로 저장**

`web/push-config.js` (Step 1에서 나온 실제 `PUBLIC:` 값을 그대로 사용):

```javascript
"use strict";
const VAPID_PUBLIC_KEY = "<Step 1에서 생성된 PUBLIC 값을 여기에 붙여넣기>";
```

- [ ] **Step 3: index.html에 로드 순서 추가**

`web/index.html`의 스크립트 로딩 부분(89번째 줄 근처, `<script src="patterns.js">` 앞)을 다음과 같이 수정:

```html
<script src="push-config.js"></script>
<script src="patterns.js"></script>
<script src="day-tasks.js"></script>
<script src="app.js"></script>
```

- [ ] **Step 4: 헤드리스 브라우저로 전역 상수 로드 확인**

```bash
python -m http.server 8123 --directory "C:\VS CODE\EnglishTutor\web"
```
(별도 터미널/백그라운드로 실행)

```powershell
$chrome = "C:\Users\이보재\AppData\Local\ms-playwright\chromium-1228\chrome-win64\chrome.exe"
cmd /c "`"$chrome`" --headless=new --disable-gpu --dump-dom http://localhost:8123/ > `"%TEMP%\vapid_check.html`" 2>nul"
```
헤드리스 dump-dom만으로는 JS 전역 변수 값을 직접 확인할 수 없으므로, 대신 `web/push-config.js` 파일 내용을 직접 읽어 다음을 확인:
- `VAPID_PUBLIC_KEY`가 플레이스홀더(`<...>`)가 아니라 실제 base64 문자열로 채워져 있는지
- 정확히 한 줄짜리 `const` 선언이고 문법 오류가 없는지 (`node --check web/push-config.js`로 확인 가능)

Run: `node --check "C:\VS CODE\EnglishTutor\web\push-config.js"`
Expected: 아무 출력 없이 종료 (문법 오류 없음)

- [ ] **Step 5: Commit**

```bash
git add web/push-config.js web/index.html
git commit -m "VAPID 공개키 클라이언트 설정 파일(push-config.js) 추가"
```

(주의: 이 커밋 직전에 `git status`/`git diff --staged`로 개인키 문자열이 실수로 포함되지 않았는지 반드시 육안 확인할 것.)

---

### Task 4: GitHub Actions 예약 작업 워크플로우

**Files:**
- Create: `.github/workflows/notify.yml`

**Interfaces:**
- Consumes: `scripts/notify/package.json`, `scripts/notify/send-notification.mjs` (Task 2)
- Produces: 없음 (터미널 워크플로우, 이후 태스크가 참조하지 않음)

- [ ] **Step 1: 워크플로우 파일 작성**

`.github/workflows/notify.yml`:

```yaml
name: Morning Practice Notification

on:
  schedule:
    - cron: "10 22 * * 0-4"
  workflow_dispatch:

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install dependencies
        working-directory: scripts/notify
        run: npm ci
      - name: Send notification
        working-directory: scripts/notify
        env:
          VAPID_PUBLIC_KEY: ${{ secrets.VAPID_PUBLIC_KEY }}
          VAPID_PRIVATE_KEY: ${{ secrets.VAPID_PRIVATE_KEY }}
          PUSH_SUBSCRIPTION: ${{ secrets.PUSH_SUBSCRIPTION }}
        run: node send-notification.mjs
```

- [ ] **Step 2: YAML 문법 검증**

Run: `python -c "import yaml; yaml.safe_load(open('.github/workflows/notify.yml', encoding='utf-8'))" `
Expected: 아무 오류 없이 종료 (Python의 `PyYAML`이 이미 설치되어 있지 않다면 `python -c "import yaml"`이 `ModuleNotFoundError`를 낼 수 있음 — 그 경우 대신 아래 Node 방식으로 검증):

대체 검증 (PyYAML이 없을 경우):
```bash
node -e "const fs=require('fs'); const s=fs.readFileSync('.github/workflows/notify.yml','utf8'); if(!s.includes('cron: \"10 22 * * 0-4\"')) throw new Error('cron 스케줄 문자열 불일치'); if(!s.includes('workflow_dispatch')) throw new Error('workflow_dispatch 누락'); console.log('OK: 필수 키워드 확인됨');"
```
Expected: `OK: 필수 키워드 확인됨`

- [ ] **Step 3: cron 스케줄 계산 재검증 (KST 07:10 = UTC 22:10 전날)**

```bash
node -e "
const d = new Date('2026-07-13T22:10:00Z'); // cron이 트리거하는 UTC 시각 예시
const kst = new Date(d.getTime() + 9*60*60*1000);
console.log(kst.toISOString()); // 9시간 뒤, 날짜가 하루 넘어가면서 07:10이 되어야 함
"
```
Expected: `2026-07-14T07:10:00.000Z` — UTC 22:10에 9시간을 더하면 KST 기준 다음 날 07:10이 된다는 시차 계산 자체가 맞는지 확인하는 것이 목적 (요일 자체는 이 테스트의 관심사가 아님). cron 필드 `0-4`(UTC 일~목)가 KST 월~금과 대응된다는 것은 "UTC 요일 N에 트리거되면 KST로는 요일 N+1"이라는 상수 관계이므로, 이 시차 계산이 맞으면 cron 요일 매핑도 맞다.

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/notify.yml
git commit -m "아침 알림 예약 작업(GitHub Actions cron) 워크플로우 추가"
```

---

### Task 5: 서비스워커 push/notificationclick 리스너

**Files:**
- Modify: `web/sw.js`

**Interfaces:**
- Consumes: 없음 (독립적인 브라우저 API 코드)
- Produces: `push`, `notificationclick` 이벤트 핸들러 — Task 6의 클라이언트 코드가 `notificationclick` 안에서 보내는 `postMessage({type:"autostart"})`를 수신하는 쪽은 Task 6에서 구현.

- [ ] **Step 1: sw.js에 리스너 추가**

`web/sw.js`의 기존 `fetch` 리스너(29번째 줄) 뒤에 다음을 추가:

```javascript
self.addEventListener("push", e => {
  let data = { title: "영어회화 연습 시작", body: "영어회화 연습 시작" };
  try { if (e.data) data = e.data.json(); } catch {}
  e.waitUntil(
    self.registration.showNotification(data.title || "영어회화 연습 시작", {
      body: data.body || "영어회화 연습 시작",
      icon: "icon-192.png",
      badge: "icon-192.png",
    })
  );
});

self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if ("focus" in client) {
          client.postMessage({ type: "autostart" });
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow("./index.html?autostart=1");
      }
    })
  );
});
```

전체 파일은 아래 순서를 유지해야 한다: `install` → `activate` → `fetch`(기존, 변경 없음) → `push`(신규) → `notificationclick`(신규).

- [ ] **Step 2: 문법 검증**

Run: `node --check "C:\VS CODE\EnglishTutor\web\sw.js"`
Expected: 아무 출력 없이 종료 (문법 오류 없음)

- [ ] **Step 3: 헤드리스 브라우저로 서비스워커 등록 및 리스너 존재 확인**

`python -m http.server 8123 --directory "C:\VS CODE\EnglishTutor\web"`를 별도로 띄운 상태에서:

```powershell
$chrome = "C:\Users\이보재\AppData\Local\ms-playwright\chromium-1228\chrome-win64\chrome.exe"
$html = @"
<!DOCTYPE html><html><body><pre id="out"></pre><script>
(async () => {
  const out = document.getElementById('out');
  try {
    const reg = await navigator.serviceWorker.register('http://localhost:8123/sw.js');
    await navigator.serviceWorker.ready;
    const res = await fetch('http://localhost:8123/sw.js');
    const src = await res.text();
    out.textContent =
      'sw registered: true\n' +
      'has push listener: ' + src.includes('addEventListener("push"') + '\n' +
      'has notificationclick listener: ' + src.includes('addEventListener("notificationclick"');
  } catch (e) {
    out.textContent = 'error: ' + e.message;
  }
})();
</script></body></html>
"@
$html | Out-File -FilePath "$env:TEMP\sw_test.html" -Encoding utf8
cmd /c "`"$chrome`" --headless=new --disable-gpu --allow-file-access-from-files --dump-dom `"$env:TEMP\sw_test.html`" > `"$env:TEMP\sw_test_out.html`" 2>nul"
Start-Sleep -Milliseconds 800
Get-Content "$env:TEMP\sw_test_out.html" -Raw
```
Expected: 출력에 `sw registered: true`, `has push listener: true`, `has notificationclick listener: true` 포함됨.

(참고: 서비스워커 등록은 원칙적으로 secure context(https 또는 localhost)에서만 동작하므로 `localhost:8123`이면 정상 동작해야 함. 헤드리스 환경에서 `file://` 페이지가 `http://localhost` origin의 서비스워커를 등록하려 하면 교차 출처 문제가 날 수 있으므로, 위 테스트 페이지도 `http://localhost:8123/`에서 서빙해서 열어야 한다면 `python -m http.server`가 서빙하는 디렉터리에 임시 테스트 html을 넣고 `http://localhost:8123/<파일명>`으로 접근하는 방식으로 조정할 것.)

- [ ] **Step 4: Commit**

```bash
git add web/sw.js
git commit -m "서비스워커에 push/notificationclick 리스너 추가"
```

---

### Task 6: 클라이언트 — 알림 켜기 버튼 + 구독 생성 + 자동 시작

**Files:**
- Modify: `web/app.js`
- Modify: `web/index.html`

**Interfaces:**
- Consumes: `VAPID_PUBLIC_KEY` (Task 3, `web/push-config.js`), `push`/`notificationclick` (Task 5, `web/sw.js`)
- Produces: 없음 (최종 사용자 대면 기능)

- [ ] **Step 1: index.html에 설정 화면 마크업 추가**

`web/index.html`의 설정 화면에서 `<button id="btn-settings-save" ...>` (83번째 줄) 바로 앞에 추가:

```html
<label class="field">
  <span>아침 알림</span>
  <button type="button" id="btn-enable-push" class="ctl-btn">알림 켜기</button>
</label>
<div id="push-sub-area" class="hidden">
  <p style="font-size:13px;color:#9aa3c0">아래 내용을 복사해서 개발자에게 전달해주세요 (최초 1회만 필요).</p>
  <textarea id="push-sub-output" readonly rows="4" style="width:100%;font-size:11px"></textarea>
  <button type="button" id="btn-copy-sub" class="ctl-btn">복사</button>
</div>
```

- [ ] **Step 2: app.js에 urlBase64ToUint8Array + enablePush 추가**

`web/app.js`의 `/* ==================== UI ==================== */` 섹션(340번째 줄) 바로 앞에 추가:

```javascript
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
```

- [ ] **Step 3: 버튼 이벤트 연결**

`web/app.js`의 `$("btn-preview-korean").onclick = ...` 줄(601번째 줄) 근처에 추가:

```javascript
$("btn-enable-push").onclick = () => enablePush().catch(e => alert("알림 설정 중 오류: " + e.message));
$("btn-copy-sub").onclick = () => {
  navigator.clipboard.writeText($("push-sub-output").value)
    .then(() => alert("복사되었습니다."))
    .catch(() => alert("복사에 실패했습니다. 직접 선택해서 복사해주세요."));
};
```

- [ ] **Step 4: 서비스워커 메시지 수신 + autostart 처리**

`web/app.js` 맨 끝(`refreshHome();` 바로 앞, 616번째 줄)에 추가:

```javascript
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
```

- [ ] **Step 5: 순수 함수 단위 테스트 (헤드리스 브라우저)**

`python -m http.server 8123 --directory "C:\VS CODE\EnglishTutor\web"`를 띄운 상태에서, `web/` 디렉터리에 임시 테스트 파일을 만들어 실행:

```powershell
$html = @"
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
check("urlBase64ToUint8Array returns Uint8Array", urlBase64ToUint8Array("AAAA") instanceof Uint8Array);
check("urlBase64ToUint8Array decodes known value", (() => {
  const arr = urlBase64ToUint8Array("SGVsbG8"); // "Hello" without padding
  return String.fromCharCode(...arr) === "Hello";
})());
check("enablePush is a function", typeof enablePush === "function");
check("btn-enable-push has onclick handler", typeof document.getElementById("btn-enable-push").onclick === "function");
check("btn-copy-sub has onclick handler", typeof document.getElementById("btn-copy-sub").onclick === "function");
document.getElementById("out").textContent = out;
</script>
</body></html>
"@
$html | Out-File -FilePath "C:\VS CODE\EnglishTutor\web\_test.html" -Encoding utf8
$chrome = "C:\Users\이보재\AppData\Local\ms-playwright\chromium-1228\chrome-win64\chrome.exe"
cmd /c "`"$chrome`" --headless=new --disable-gpu --dump-dom http://localhost:8123/_test.html > `"$env:TEMP\push_client_test.html`" 2>nul"
Start-Sleep -Milliseconds 800
Get-Content "$env:TEMP\push_client_test.html" -Raw
```
Expected: 5개 항목 전부 `PASS`.

(`web/_test.html`은 검증 후 삭제한다 — 커밋하지 않는다. 이전 "패턴 추가" 기능 때와 동일한 관례.)

- [ ] **Step 6: 테스트 파일 삭제**

```bash
rm -f "C:\VS CODE\EnglishTutor\web\_test.html"
```

- [ ] **Step 7: Commit**

```bash
git add web/app.js web/index.html
git commit -m "설정 화면에 알림 켜기 버튼 + 구독 생성 + 알림 탭 시 자동 시작 기능 추가"
```

---

### Task 7: 사람 개입 — 시크릿 등록 + 실사용 검증

**이 태스크는 사람(사용자 본인 또는 이 세션을 통해 사용자와 함께)이 직접 수행해야 하는 단계로 구성된다. 자동화 서브에이전트에게 그대로 위임하지 말고, 사용자와 상호작용하며 진행한다.**

**Files:** 없음 (운영 설정 단계)

- [ ] **Step 1: gh CLI / winget 가용성 확인**

```bash
gh --version
winget --version
```
이 계획을 작성하는 시점에 이미 확인됨: 이 개발 환경에는 **둘 다 설치되어 있지 않음.** 따라서 시크릿 등록은 GitHub 웹 UI로 진행한다 (아래 Step 3).

- [ ] **Step 2: 사용자가 실제 폰에서 "알림 켜기" 실행**

배포된(또는 배포 예정인) 사이트 `https://bojaelee.github.io/English-tutor/`를 사용자의 Galaxy Z Fold 7 Chrome PWA에서 열고:
1. 설정 화면 → "알림 켜기" 버튼 탭
2. 브라우저 알림 권한 요청에 "허용" 선택
3. 화면에 표시된 구독 정보(JSON 텍스트)를 "복사" 버튼으로 복사
4. 그 텍스트를 이 대화(개발 세션)에 붙여넣어 전달

- [ ] **Step 3: GitHub 저장소 시크릿 3개 등록 (웹 UI)**

`https://github.com/BOJAELEE/English-tutor/settings/secrets/actions` 접속 → "New repository secret"을 3번 눌러 아래 3개를 등록:

| Name | Value |
|---|---|
| `VAPID_PUBLIC_KEY` | Task 3 Step 1에서 생성된 `PUBLIC:` 값 |
| `VAPID_PRIVATE_KEY` | Task 3 Step 1에서 생성된 `PRIVATE:` 값 (이 태스크 리포트에만 존재 — 어느 커밋에도 없음) |
| `PUSH_SUBSCRIPTION` | Step 2에서 사용자가 전달한 구독 JSON 텍스트 그대로 |

- [ ] **Step 4: workflow_dispatch로 수동 실행 테스트**

`https://github.com/BOJAELEE/English-tutor/actions/workflows/notify.yml` 접속 → "Run workflow" 버튼으로 수동 실행.

Expected: 실행이 초록색 체크(성공)로 끝남. 로그에 `{"sent":true,"date":"..."}` 형태의 출력이 보임 (오늘 날짜가 공휴일이 아닌 경우).

- [ ] **Step 5: 실제 폰에서 알림 수신 확인**

Step 4 실행 후 수 초~수십 초 안에 사용자의 폰에 "영어회화 연습 시작" 알림이 실제로 뜨는지 확인. 뜨면:
- 알림을 탭했을 때 앱이 열리고 바로 오늘의 학습(`runDay()`)이 시작되는지 확인 (앱이 이미 백그라운드에 있던 경우와, 완전히 종료되어 있던 경우 둘 다 한 번씩 확인 권장)

- [ ] **Step 6: 실제 예약 시각(cron) 동작은 다음 평일 아침에 최종 확인**

`workflow_dispatch` 수동 실행은 cron 스케줄 자체가 올바른지까지 검증하지 않는다 (수동 실행은 즉시 실행되므로). 계획상 마지막 확인은 **다음 평일 아침 07:10(KST)**에 실제로 알림이 자동으로 오는지 사용자가 직접 확인하는 것으로 남긴다. 이 대화 세션 안에서는 검증할 수 없음을 사용자에게 명확히 안내한다.

- [ ] **Step 7: 사용자에게 완료 보고**

시크릿 3개 등록 완료, 수동 실행 성공, 실제 알림 수신 확인까지 끝났다면 기능이 정상 배포된 것으로 보고한다. 다음 평일 아침 자동 발송은 사용자가 직접 확인하고 문제가 있으면 알려달라고 안내한다.
