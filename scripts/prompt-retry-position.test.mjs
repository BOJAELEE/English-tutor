import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const app = fs.readFileSync(new URL("../web/app.js", import.meta.url), "utf8");
const start = app.indexOf("async function runDay()");
const end = app.indexOf("/* ==================== 화면 꺼짐 방지", start);
assert.ok(start >= 0 && end > start, "학습 진행 함수를 찾을 수 있어야 합니다.");

const task = { kind: "pattern", sessionName: "세션1 패턴 연습", p: { num: 2 } };
const saved = [];
const attempted = [];
let retryNoticeFailed = false;
const state = { skip: false, back: false, quit: false };
const context = vm.createContext({
  LS: { progress: { day: 1, pos: 0 } },
  TOTAL_DAYS: 2,
  buildDayTasks: () => [task],
  ui: { main: () => {}, sub: () => {}, header: () => {}, clearConversationReview: () => {} },
  $: () => ({ disabled: false }),
  state,
  step: fn => fn(),
  sessionIntro: () => "세션 1, 오늘 패턴 연습입니다.",
  speak: async text => {
    if (text === "정확한 안내를 다시 준비하고 있어요." && !retryNoticeFailed) {
      retryNoticeFailed = true;
      throw new Error("안내 음성 재생 오류");
    }
  },
  runPatternTask: async currentTask => {
    attempted.push({ task: currentTask, savedCount: saved.length });
    if (attempted.length === 1) throw Object.assign(new Error("형식 오류"), { promptRetry: true });
  },
  advancePos: (day, pos) => ({ day, pos: pos + 1 }),
  savePos: (day, pos) => saved.push({ day, pos }),
  console: { warn: () => {}, error: () => {} },
});
vm.runInContext(app.slice(start, end) + "globalThis.__runDay = runDay;", context);
await context.__runDay();

assert.equal(attempted.length, 2, "안내 오류 뒤 같은 문제를 다시 실행해야 합니다.");
assert.equal(attempted[0].task, attempted[1].task, "재시도 중 문제를 바꾸면 안 됩니다.");
assert.deepEqual(attempted.map(item => item.savedCount), [0, 0], "성공 전에는 학습 위치를 저장하거나 올리면 안 됩니다.");
assert.equal(saved[0].pos, 1, "문제 성공 후에만 다음 위치를 저장해야 합니다.");
console.log("Prompt retry keeps the same task");
