import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const app = fs.readFileSync(new URL("../web/app.js", import.meta.url), "utf8");
const start = app.indexOf("async function runDay()");
const end = app.indexOf("/* ==================== 화면 꺼짐 방지", start);
assert.ok(start >= 0 && end > start, "학습 진행 함수를 찾을 수 있어야 합니다.");

async function runFailure(retryAction, promptRetry = true, alwaysFail = false) {
  const task = { kind: "pattern", sessionName: "세션1 패턴 연습", p: { num: 55 } };
  const saved = [];
  const attempted = [];
  const state = { skip: false, back: false, quit: false };
  let waits = 0;
  const context = vm.createContext({
    LS: { progress: { day: 28, pos: 0 } }, TOTAL_DAYS: 95,
    buildDayTasks: () => [task],
    ui: { main: () => {}, sub: () => {}, header: () => {}, clearConversationReview: () => {} },
    $: () => ({ disabled: false }), state, step: fn => fn(),
    sessionIntro: () => "세션 1, 오늘 패턴 연습입니다.", speak: async () => {},
    runPatternTask: async currentTask => {
      attempted.push({ task: currentTask, savedCount: saved.length });
      if (attempted.length === 1 || alwaysFail) throw Object.assign(new Error("형식 오류"), { promptRetry });
    },
    waitForPromptRetry: async () => { waits++; await retryAction(state, attempted); },
    advancePos: (day, pos) => ({ day, pos: pos + 1 }),
    savePos: (day, pos) => saved.push({ day, pos }),
    console: { warn: () => {}, error: () => {} },
  });
  vm.runInContext(app.slice(start, end) + "globalThis.__runDay = runDay;", context);
  try { await context.__runDay(); } catch (e) { assert.equal(e.quit, true); }
  return { attempted, waits, saved };
}

for (const promptRetry of [true, false]) {
  const manual = await runFailure(async (_state, attempted) => {
    assert.equal(attempted.length, 1, "버튼을 누르기 전에는 자동으로 같은 요청을 반복하면 안 됩니다.");
  }, promptRetry);
  assert.equal(manual.waits, 1, "수동 재시도 선택을 기다려야 합니다.");
  assert.equal(manual.attempted.length, 2);
  assert.equal(manual.attempted[0].task, manual.attempted[1].task);
  assert.deepEqual(manual.attempted.map(item => item.savedCount), [0, 0]);
  assert.equal(manual.saved[0].pos, 1, "성공한 뒤에만 문제를 완료 처리해야 합니다.");
}
const quit = await runFailure(async state => {
  state.quit = true;
  throw { cancelled: true };
});
assert.equal(quit.attempted.length, 1, "종료 시 자동 재요청하면 안 됩니다.");
assert.equal(quit.saved.length, 0, "실패한 문제 위치는 그대로 남겨야 합니다.");
const persistent = await runFailure(async (state, attempted) => {
  if (attempted.length === 2) {
    state.quit = true;
    throw { cancelled: true };
  }
}, true, true);
assert.equal(persistent.waits, 2, "연속 실패도 매번 사용자 선택을 기다려야 합니다.");
assert.equal(persistent.attempted.length, 2);
assert.equal(persistent.saved.length, 0, "계속 실패하더라도 문제를 자동 완료하면 안 됩니다.");

const waiterStart = app.indexOf("function waitForPromptRetry()");
const waiterEnd = app.indexOf("async function step", waiterStart);
assert.ok(waiterStart >= 0 && waiterEnd > waiterStart, "취소 가능한 수동 재시도 대기가 필요합니다.");
const waiters = new Set();
const button = { hidden: true, onclick: null, classList: {
  add: () => { button.hidden = true; }, remove: () => { button.hidden = false; },
} };
const waiterContext = vm.createContext({ $: () => button, activeRetryWaiters: waiters, cancelledRequestError: () => ({ cancelled: true }) });
vm.runInContext(app.slice(waiterStart, waiterEnd) + "globalThis.__wait = waitForPromptRetry;", waiterContext);
const clicked = waiterContext.__wait();
assert.equal(button.hidden, false);
button.onclick();
await clicked;
assert.equal(button.hidden, true);
assert.equal(waiters.size, 0);
const cancelled = waiterContext.__wait();
for (const cancel of waiters) cancel();
await assert.rejects(cancelled, error => error.cancelled === true);
assert.equal(button.hidden, true);
assert.equal(button.onclick, null);
assert.equal(waiters.size, 0);
console.log("Prompt failures wait for manual retry without advancing or looping");
