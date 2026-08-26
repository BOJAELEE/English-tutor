import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const patternsCode = fs.readFileSync(new URL("../web/patterns.js", import.meta.url), "utf8");
const taskCode = fs.readFileSync(new URL("../web/day-tasks.js", import.meta.url), "utf8");
const app = fs.readFileSync(new URL("../web/app.js", import.meta.url), "utf8");
const storage = new Map();
const context = vm.createContext({
  localStorage: {
    getItem: key => storage.has(key) ? storage.get(key) : null,
    setItem: (key, value) => storage.set(key, String(value)),
  },
});

vm.runInContext(`${patternsCode}\nglobalThis.__patterns = PATTERNS;`, context);
vm.runInContext(`${taskCode}\nglobalThis.__tasks = { TOTAL_DAYS, dayPatterns, buildSessions, buildDayTasks };`, context);

const { TOTAL_DAYS, dayPatterns, buildSessions, buildDayTasks } = context.__tasks;
const patterns = context.__patterns;

assert.equal(patterns.length, 250, "등록 패턴은 250개여야 합니다.");
assert.equal(TOTAL_DAYS, 125, "모든 패턴을 하루 2개씩 125일에 배정해야 합니다.");
patterns.forEach((pattern, index) => {
  assert.equal(pattern.num, index + 1, `패턴 번호 ${index + 1}이 연속되어야 합니다.`);
  assert.ok(pattern.title.trim(), `패턴 ${pattern.num}에 제목이 필요합니다.`);
  assert.equal(pattern.examples.length, 3, `패턴 ${pattern.num}에는 예문 3개가 필요합니다.`);
  pattern.examples.forEach((example, exampleIndex) => {
    assert.ok(example.trim(), `패턴 ${pattern.num} 예문 ${exampleIndex + 1}이 비어 있으면 안 됩니다.`);
  });
});

for (let day = 1; day <= TOTAL_DAYS; day++) {
  const today = dayPatterns(day);
  const sessions = buildSessions(day);
  const tasks = buildDayTasks(day);
  assert.equal(today.length, 2, `Day ${day}는 오늘의 패턴 2개를 가져야 합니다.`);
  assert.equal(tasks.length, day === 1 ? 9 : 13, `Day ${day}의 문제 수가 올바르지 않습니다.`);
  assert.equal(sessions.at(-1).name, "마무리 일상 회화", `Day ${day}에 마무리 회화가 필요합니다.`);
  tasks.filter(task => task.kind === "pattern").forEach(task => {
    assert.equal(task.ex, task.p.examples[task.exIdx], `Day ${day} 패턴 ${task.p.num}의 목표 문장과 예문이 일치해야 합니다.`);
  });
}

assert.doesNotMatch(app, /연결이 지연되어 다음 문제로 넘어갑니다/, "연결 지연 때문에 문제를 자동으로 건너뛰면 안 됩니다.");
assert.doesNotMatch(app, /koreanPatternMeaning|basicTrainingPrompt|prompt\.isFallback/, "문법 표기를 임시 안내문으로 쓰면 안 됩니다.");
assert.match(app, /error\.promptRetry = true/, "정확한 훈련 안내를 받지 못하면 같은 문제를 재시도해야 합니다.");
assert.match(app, /정확한 안내를 다시 준비하고 있어요/, "재시도 상태를 사용자에게 보여줘야 합니다.");
assert.match(app, /일상 회화 요청 실패 - 기본 질문으로 진행/, "일상 회화도 요청 실패 시 계속 진행해야 합니다.");
console.log("Curriculum and connection fallback tests passed");
