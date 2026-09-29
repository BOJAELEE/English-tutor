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
vm.runInContext(`${taskCode}\nglobalThis.__tasks = { TOTAL_DAYS, dayPatterns, buildSessions, buildDayTasks, isPhrasalPattern };`, context);

const { TOTAL_DAYS, dayPatterns, buildSessions, buildDayTasks, isPhrasalPattern } = context.__tasks;
const patterns = context.__patterns;
const previousReviewNums = { phrasal: null, regular: null };

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
  const situationTasks = sessions.find(session => session.name === "세션2 상황 연습").tasks;
  situationTasks.forEach(task => {
    assert.equal(task.showSituation, false, `Day ${day} 세션2는 상황 설명을 표시하면 안 됩니다.`);
    assert.equal(task.shadowPauseMs, 1000, `Day ${day} 세션2는 쉐도잉 시간을 1초 보장해야 합니다.`);
  });
  if (day > 1) {
    const previousTasks = sessions.find(session => session.name === "세션3 어제 복습").tasks;
    previousTasks.forEach(task => assert.equal(task.shadowPauseMs, 1000, `Day ${day} 세션3는 쉐도잉 시간을 1초 보장해야 합니다.`));
    const reviewTasks = sessions.find(session => session.name === "세션4 전체 복습").tasks;
    assert.equal(reviewTasks.length, 2, `Day ${day} 전체 복습은 두 문제여야 합니다.`);
    assert.notEqual(isPhrasalPattern(reviewTasks[0].p), isPhrasalPattern(reviewTasks[1].p), `Day ${day} 전체 복습은 구동사와 일반 패턴을 하나씩 골라야 합니다.`);
    reviewTasks.forEach(task => {
      const type = isPhrasalPattern(task.p) ? "phrasal" : "regular";
      const olderOfType = patterns.slice(0, (day - 2) * 2)
        .filter(p => isPhrasalPattern(p) === isPhrasalPattern(task.p));
      if (olderOfType.length) {
        assert.ok(!previousTasks.some(previous => previous.p.num === task.p.num), `Day ${day} 전체 복습은 어제 복습과 겹치면 안 됩니다.`);
      }
      if (olderOfType.length > 1) {
        assert.notEqual(task.p.num, previousReviewNums[type], `Day ${day} 전체 복습은 직전 날의 같은 ${type} 패턴을 반복하면 안 됩니다.`);
      }
      previousReviewNums[type] = task.p.num;
    });
  }
  tasks.filter(task => task.kind === "pattern").forEach(task => {
    assert.equal(task.ex, task.p.examples[task.exIdx], `Day ${day} 패턴 ${task.p.num}의 목표 문장과 예문이 일치해야 합니다.`);
  });
}

const reviewNums = day => buildSessions(day)
  .find(session => session.name === "세션4 전체 복습").tasks.map(task => task.p.num);
assert.equal(JSON.stringify(reviewNums(2)), JSON.stringify([1, 2]), "첫 전체 복습은 첫 구동사와 일반 패턴을 골라야 합니다.");
assert.equal(JSON.stringify(reviewNums(3)), JSON.stringify([1, 2]), "Day 3은 전일 패턴 대신 Day 1 패턴을 복습해야 합니다.");
assert.ok(reviewNums(4).every(num => num <= 4), "Day 4 전체 복습은 전일 패턴 5·6을 제외해야 합니다.");
assert.match(taskCode, /reviewPicks_v4_/, "전일 복습과 겹치는 기존 선택값을 재사용하면 안 됩니다.");

assert.doesNotMatch(app, /연결이 지연되어 다음 문제로 넘어갑니다/, "연결 지연 때문에 문제를 자동으로 건너뛰면 안 됩니다.");
assert.doesNotMatch(app, /koreanPatternMeaning|basicTrainingPrompt|prompt\.isFallback/, "문법 표기를 임시 안내문으로 쓰면 안 됩니다.");
assert.match(app, /error\.promptRetry = true/, "정확한 훈련 안내를 받지 못하면 같은 문제를 재시도해야 합니다.");
assert.match(app, /정확한 안내를 다시 준비하고 있어요/, "재시도 상태를 사용자에게 보여줘야 합니다.");
assert.match(app, /일상 회화 요청 실패 - 기본 질문으로 진행/, "일상 회화도 요청 실패 시 계속 진행해야 합니다.");
assert.match(app, /waitCancellable\(shadowPauseMs\)/, "세션별 쉐도잉 대기는 취소 가능해야 합니다.");
console.log("Curriculum and connection fallback tests passed");
