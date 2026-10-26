import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const patternsCode = fs.readFileSync(new URL("../web/patterns.js", import.meta.url), "utf8");
const editablePatternsCode = fs.readFileSync(new URL("../Pattern/현재_학습패턴.txt", import.meta.url), "utf8");
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
vm.runInContext(`${taskCode}\nglobalThis.__tasks = { TOTAL_DAYS, dayPatterns, buildSessions, buildDayTasks, isPhrasalPattern, migrateProgressForTwoDayReview, REMOVED_LEGACY_PATTERN_NUMS, REMOVED_CURATED_PATTERN_NUMS, mapLegacyDayToCurated, mapCuratedDayToDeduped };`, context);

const { TOTAL_DAYS, dayPatterns, buildSessions, buildDayTasks, isPhrasalPattern, migrateProgressForTwoDayReview, REMOVED_LEGACY_PATTERN_NUMS, REMOVED_CURATED_PATTERN_NUMS, mapLegacyDayToCurated, mapCuratedDayToDeduped } = context.__tasks;
const patterns = context.__patterns;
const previousReviewNums = { phrasal: null, regular: null };

assert.equal(editablePatternsCode.trim(), patternsCode.trim(), "편집용 TXT와 실제 앱 패턴이 달라서는 안 됩니다.");
assert.equal(patterns.length, 190, "중복을 정리한 실용 패턴은 190개여야 합니다.");
assert.equal(TOTAL_DAYS, 95, "모든 패턴을 하루 2개씩 95일에 배정해야 합니다.");
assert.equal(REMOVED_LEGACY_PATTERN_NUMS.length, 46, "중복·낮은 우선순위 패턴 46개만 제외해야 합니다.");
assert.ok(REMOVED_LEGACY_PATTERN_NUMS.every(n => n % 2 === 1), "기존 둘째 패턴은 삭제하면 안 됩니다.");
assert.equal(new Set(REMOVED_LEGACY_PATTERN_NUMS).size, 46, "제외 번호가 중복되면 안 됩니다.");
assert.equal(JSON.stringify(REMOVED_CURATED_PATTERN_NUMS), JSON.stringify([43, 56, 58, 66, 100, 112, 117, 134, 163, 167, 172, 185, 191, 203]), "기능이 중복되는 14개만 추가로 제외해야 합니다.");
assert.equal(mapCuratedDayToDeduped(27), 26, "학습 중인 패턴을 건너뛰지 않도록 이전 Day로 위치를 옮겨야 합니다.");
assert.equal(mapLegacyDayToCurated(1), 1, "첫째 날은 그대로 시작해야 합니다.");
assert.equal(mapLegacyDayToCurated(4), 3, "삭제된 패턴 이전의 학습 위치로 옮겨야 합니다.");
assert.equal(mapLegacyDayToCurated(125), 95, "마지막 날은 새 마지막 날로 옮겨야 합니다.");
const removedTitles = ["I'm wondering whether", "Do you mind if", "I wouldn't mind", "I don't feel like", "Are you free", "Can we move", "I can work with", "You're welcome to", "Is there a chance you could", "Would you consider", "I can't wait to", "I was hoping you could", "I wonder if", "I'd rather not"];
removedTitles.forEach(title => assert.ok(!patterns.some(pattern => pattern.title.startsWith(title)), `${title}는 중복 학습하지 않아야 합니다.`));
assert.ok(patterns.some(pattern => pattern.title.startsWith("Would it be okay if")), "사용자가 선호한 허락 요청 표현은 남겨야 합니다.");
assert.ok(patterns.some(pattern => pattern.title.startsWith("Would you mind + -ing")), "상대에게 행동을 부탁하는 다른 용법은 남겨야 합니다.");
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
  assert.equal(tasks.length, day === 1 ? 9 : day === 2 ? 13 : 15, `Day ${day}의 문제 수가 올바르지 않습니다.`);
  assert.equal(JSON.stringify(sessions.map(session => session.name)), JSON.stringify([
    "세션1 패턴 연습", "세션2 상황 연습",
    ...(day > 1 ? ["세션3 어제 복습"] : []),
    ...(day > 2 ? ["세션4 2일 전 복습"] : []),
    ...(day > 1 ? [day > 2 ? "세션5 전체 복습" : "세션4 전체 복습"] : []),
    "마무리 일상 회화",
  ]), `Day ${day} 세션 순서가 올바르지 않습니다.`);
  assert.equal(sessions.at(-1).name, "마무리 일상 회화", `Day ${day}에 마무리 회화가 필요합니다.`);
  const situationTasks = sessions.find(session => session.name === "세션2 상황 연습").tasks;
  situationTasks.forEach(task => {
    assert.equal(task.showSituation, false, `Day ${day} 세션2는 상황 설명을 표시하면 안 됩니다.`);
    assert.equal(task.shadowPauseMs, 1000, `Day ${day} 세션2는 쉐도잉 시간을 1초 보장해야 합니다.`);
  });
  if (day > 1) {
    const previousTasks = sessions.find(session => session.name === "세션3 어제 복습").tasks;
    assert.equal(previousTasks.length, 2, `Day ${day} 어제 복습은 패턴별로 한 문제여야 합니다.`);
    previousTasks.forEach(task => assert.equal(task.shadowPauseMs, 1000, `Day ${day} 세션3는 쉐도잉 시간을 1초 보장해야 합니다.`));
    if (day > 2) {
      const twoDaysAgoTasks = sessions.find(session => session.name === "세션4 2일 전 복습").tasks;
      assert.equal(twoDaysAgoTasks.length, 2, `Day ${day} 2일 전 복습은 패턴별로 한 문제여야 합니다.`);
      twoDaysAgoTasks.forEach((task, index) => {
        assert.equal(task.p.num, dayPatterns(day - 2)[index].num, `Day ${day} 2일 전 패턴이 올바르지 않습니다.`);
        assert.equal(task.exIdx, 0, `Day ${day} 2일 전 복습은 첫 예문 하나만 사용해야 합니다.`);
        assert.equal(task.trainingLevel, 2, `Day ${day} 2일 전 복습은 어제 복습과 같은 단계여야 합니다.`);
        assert.equal(task.showTarget, true, `Day ${day} 2일 전 복습은 목표 문장을 보여줘야 합니다.`);
        assert.equal(task.shadowPauseMs, 1000, `Day ${day} 2일 전 복습은 쉐도잉 시간을 1초 보장해야 합니다.`);
      });
    }
    const reviewTasks = sessions.find(session => session.name === (day > 2 ? "세션5 전체 복습" : "세션4 전체 복습")).tasks;
    assert.equal(reviewTasks.length, 2, `Day ${day} 전체 복습은 두 문제여야 합니다.`);
    assert.notEqual(isPhrasalPattern(reviewTasks[0].p), isPhrasalPattern(reviewTasks[1].p), `Day ${day} 전체 복습은 구동사와 일반 패턴을 하나씩 골라야 합니다.`);
    reviewTasks.forEach(task => {
      const type = isPhrasalPattern(task.p) ? "phrasal" : "regular";
      const olderOfType = patterns.slice(0, Math.max(0, day - 3) * 2)
        .filter(p => isPhrasalPattern(p) === isPhrasalPattern(task.p));
      if (olderOfType.length) {
        assert.ok(!previousTasks.some(previous => previous.p.num === task.p.num), `Day ${day} 전체 복습은 어제 복습과 겹치면 안 됩니다.`);
        if (day > 2) assert.ok(!sessions.find(session => session.name === "세션4 2일 전 복습").tasks.some(previous => previous.p.num === task.p.num), `Day ${day} 전체 복습은 2일 전 복습과 겹치면 안 됩니다.`);
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
  .find(session => session.name === (day > 2 ? "세션5 전체 복습" : "세션4 전체 복습")).tasks.map(task => task.p.num);
assert.equal(JSON.stringify(reviewNums(2)), JSON.stringify([1, 2]), "첫 전체 복습은 첫 구동사와 일반 패턴을 골라야 합니다.");
assert.equal(JSON.stringify(reviewNums(3)), JSON.stringify([1, 2]), "Day 3은 전일 패턴 대신 Day 1 패턴을 복습해야 합니다.");
assert.ok(reviewNums(4).every(num => num <= 4), "Day 4 전체 복습은 전일 패턴 5·6을 제외해야 합니다.");
assert.match(taskCode, /reviewPicks_v5_/, "최근 복습과 겹치는 기존 선택값을 재사용하면 안 됩니다.");

assert.equal(migrateProgressForTwoDayReview({ day: 2, pos: 10 }).pos, 10, "Day 2 위치는 이동하면 안 됩니다.");
assert.equal(migrateProgressForTwoDayReview({ day: 3, pos: 9 }).pos, 9, "어제 복습 중인 위치는 이동하면 안 됩니다.");
assert.equal(migrateProgressForTwoDayReview({ day: 3, pos: 10 }).pos, 12, "전체 복습 중인 위치는 새 세션만큼 이동해야 합니다.");
assert.equal(migrateProgressForTwoDayReview({ day: 3, pos: 13 }).pos, 15, "완료 위치도 새 문제 수에 맞춰야 합니다.");
assert.equal(migrateProgressForTwoDayReview({ day: 3, session: 3, index: 0 }).session, 4, "기존 세션별 저장 형식도 이동해야 합니다.");

const migrationStorage = new Map([
  ["curriculumVersion", "250-master-patterns-v3"],
  ["progress", JSON.stringify({ day: 4, pos: 5 })],
  ["promptCache", JSON.stringify({ old: "stale" })],
  ["reviewPicks_v4_4", "[1,2]"],
]);
const migrationContext = vm.createContext({
  localStorage: {
    getItem: key => migrationStorage.get(key) ?? null,
    setItem: (key, value) => migrationStorage.set(key, String(value)),
    removeItem: key => migrationStorage.delete(key),
    key: index => [...migrationStorage.keys()][index] ?? null,
    get length() { return migrationStorage.size; },
  },
});
vm.runInContext(patternsCode + taskCode + app.slice(0, app.indexOf("/* ==================== 음성: TTS")), migrationContext);
assert.equal(JSON.parse(migrationStorage.get("progress")).day, 3, "기존 학습 위치를 새 Day로 옮겨야 합니다.");
assert.equal(JSON.parse(migrationStorage.get("progress")).pos, 0, "재배열된 Day의 첫 문제부터 안전하게 시작해야 합니다.");
assert.equal(migrationStorage.get("curriculumVersion"), "190-practical-patterns-v2", "새 패턴 버전이 저장되어야 합니다.");
assert.ok(!migrationStorage.has("promptCache"), "예전 패턴의 AI 안내 캐시는 재사용하면 안 됩니다.");
assert.ok(!migrationStorage.has("reviewPicks_v4_4"), "예전 전체 복습 선택은 재사용하면 안 됩니다.");

const curatedStorage = new Map([
  ["curriculumVersion", "204-practical-patterns-v1"],
  ["progress", JSON.stringify({ day: 27, pos: 4 })],
  ["promptCache", JSON.stringify({ old: "stale" })],
  ["reviewPicks_v5_27", "[53,54]"],
]);
const curatedContext = vm.createContext({
  localStorage: {
    getItem: key => curatedStorage.get(key) ?? null,
    setItem: (key, value) => curatedStorage.set(key, String(value)),
    removeItem: key => curatedStorage.delete(key),
    key: index => [...curatedStorage.keys()][index] ?? null,
    get length() { return curatedStorage.size; },
  },
});
vm.runInContext(patternsCode + taskCode + app.slice(0, app.indexOf("/* ==================== 음성: TTS")), curatedContext);
assert.equal(JSON.parse(curatedStorage.get("progress")).day, 26, "기존 Day 27 학습 위치를 새 패턴 순서에 맞춰 옮겨야 합니다.");
assert.equal(JSON.parse(curatedStorage.get("progress")).pos, 0, "재배열된 Day의 첫 문제부터 다시 시작해야 합니다.");
assert.ok(!curatedStorage.has("promptCache"), "재배열 전의 AI 안내 캐시는 지워야 합니다.");
assert.ok(!curatedStorage.has("reviewPicks_v5_27"), "이전 번호로 저장된 복습 선택은 지워야 합니다.");
assert.ok(!patterns.some(pattern => /^(?:Bump into|Catch up|Fall out with)/.test(pattern.title)), "낮은 우선순위 핵심 패턴은 다시 등장하면 안 됩니다.");

assert.doesNotMatch(app, /연결이 지연되어 다음 문제로 넘어갑니다/, "연결 지연 때문에 문제를 자동으로 건너뛰면 안 됩니다.");
assert.doesNotMatch(app, /koreanPatternMeaning|basicTrainingPrompt|prompt\.isFallback/, "문법 표기를 임시 안내문으로 쓰면 안 됩니다.");
assert.match(app, /error\.promptRetry = true/, "정확한 훈련 안내를 받지 못하면 같은 문제를 재시도해야 합니다.");
assert.match(app, /정확한 안내를 다시 준비하고 있어요/, "재시도 상태를 사용자에게 보여줘야 합니다.");
assert.match(app, /일상 회화 요청 실패 - 기본 질문으로 진행/, "일상 회화도 요청 실패 시 계속 진행해야 합니다.");
assert.match(app, /waitCancellable\(shadowPauseMs\)/, "세션별 쉐도잉 대기는 취소 가능해야 합니다.");
console.log("Curriculum and connection fallback tests passed");
