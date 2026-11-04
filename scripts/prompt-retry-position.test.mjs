import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const app = fs.readFileSync(new URL("../web/app.js", import.meta.url), "utf8");
const start = app.indexOf("async function runDay()");
const end = app.indexOf("/* ==================== 화면 꺼짐 방지", start);
assert.ok(start >= 0 && end > start, "학습 진행 함수를 찾을 수 있어야 합니다.");

async function runFailure(retryAction, promptRetry = true, failures = 1) {
  const task = { kind: "pattern", sessionName: "세션1 패턴 연습", p: { num: 61 } };
  const saved = [];
  const attempted = [];
  const state = { skip: false, back: false, quit: false };
  const waits = [];
  let intros = 0;
  const context = vm.createContext({
    LS: { progress: { day: 31, pos: 0 } }, TOTAL_DAYS: 95,
    buildDayTasks: () => [task],
    ui: { main: () => {}, sub: () => {}, header: () => {}, clearConversationReview: () => {} },
    $: () => ({ disabled: false }), state, step: fn => fn(),
    sessionIntro: () => "세션 1, 오늘 패턴 연습입니다.", speak: async text => { if (text.startsWith("세션")) intros++; },
    runPatternTask: async currentTask => {
      attempted.push({ task: currentTask, savedCount: saved.length });
      if (attempted.length <= failures) throw Object.assign(new Error("형식 오류"), { promptRetry, promptFailure: "안내 형식 오류" });
    },
    waitCancellable: async ms => { waits.push(ms); await retryAction(state, attempted); },
    advancePos: (day, pos) => ({ day, pos: pos + 1 }),
    savePos: (day, pos) => saved.push({ day, pos }),
    console: { warn: () => {}, error: () => {} },
  });
  vm.runInContext(app.slice(start, end) + "globalThis.__runDay = runDay;", context);
  try { await context.__runDay(); } catch (e) { assert.equal(e.quit, true); }
  return { attempted, waits, saved, intros };
}

for (const promptRetry of [true, false]) {
  const automatic = await runFailure(async (_state, attempted) => {
    assert.equal(attempted.length, 1, "짧은 대기를 거쳐 자동으로 같은 문제를 다시 실행해야 합니다.");
  }, promptRetry);
  assert.deepEqual(automatic.waits, [2000]);
  assert.equal(automatic.attempted.length, 2);
  assert.equal(automatic.attempted[0].task, automatic.attempted[1].task);
  assert.deepEqual(automatic.attempted.map(item => item.savedCount), [0, 0]);
  assert.equal(automatic.saved[0].pos, 1, "성공한 뒤에만 문제를 완료 처리해야 합니다.");
  assert.equal(automatic.intros, 1, "자동 재시도마다 세션 안내를 다시 읽으면 안 됩니다.");
}
const quit = await runFailure(async state => {
  state.quit = true;
  throw { cancelled: true };
});
assert.equal(quit.attempted.length, 1, "종료 시 자동 재요청하면 안 됩니다.");
assert.equal(quit.saved.length, 0, "실패한 문제 위치는 그대로 남겨야 합니다.");
const persistent = await runFailure(async (state, attempted) => {
  if (attempted.length === 6) {
    state.quit = true;
    throw { cancelled: true };
  }
}, true, Infinity);
assert.deepEqual(persistent.waits, [2000, 4000, 8000, 16000, 30000, 30000], "연속 실패에는 재시도 간격을 늘리되 30초를 넘기지 않아야 합니다.");
assert.equal(persistent.attempted.length, 6);
assert.equal(persistent.saved.length, 0, "계속 실패하더라도 문제를 자동 완료하면 안 됩니다.");

const waiterStart = app.indexOf("function waitCancellable(");
const waiterEnd = app.indexOf("function waitBeforeLlmRetry", waiterStart);
assert.ok(waiterStart >= 0 && waiterEnd > waiterStart);
const waiters = new Set();
const timers = new Map();
const waiterContext = vm.createContext({
  activeRetryWaiters: waiters, cancelledRequestError: () => ({ cancelled: true }),
  setTimeout: fn => { timers.set(1, fn); return 1; }, clearTimeout: id => timers.delete(id),
});
vm.runInContext(app.slice(waiterStart, waiterEnd) + "globalThis.__wait = waitCancellable;", waiterContext);
const elapsed = waiterContext.__wait(2000);
timers.get(1)();
await elapsed;
assert.equal(waiters.size, 0);
const cancelled = waiterContext.__wait(30000);
for (const cancel of waiters) cancel();
await assert.rejects(cancelled, error => error.cancelled === true);
assert.equal(waiters.size, 0);
assert.equal(timers.size, 0, "제어 버튼 취소 뒤 대기 타이머가 남으면 안 됩니다.");
const buttons = Object.fromEntries(["btn-back", "btn-skip", "btn-quit"].map(id => [id, {}]));
Object.assign(waiterContext, {
  $: id => buttons[id], state: {}, releasePauseWaiters: () => {}, stopActiveListening: () => {}, stopCurrentSpeech: () => {},
  cancelActiveRequests: () => { for (const cancel of waiters) cancel(); },
});
const controlsStart = app.indexOf("function cancelCurrentWork()");
const controlsEnd = app.indexOf("let draftPatternNums", controlsStart);
vm.runInContext(app.slice(controlsStart, controlsEnd), waiterContext);
for (const [id, flag] of [["btn-back", "back"], ["btn-skip", "skip"], ["btn-quit", "quit"]]) {
  waiterContext.state = {};
  const waiting = waiterContext.__wait(30000);
  buttons[id].onclick();
  await assert.rejects(waiting, error => error.cancelled === true);
  assert.equal(waiterContext.state[flag], true);
  assert.equal(waiters.size, 0);
  assert.equal(timers.size, 0);
}
assert.doesNotMatch(app, /waitForPromptRetry|btn-retry/, "수동 버튼을 기다리는 경로는 제거해야 합니다.");
console.log("Prompt failures retry automatically with cancellable backoff and preserve position");
