"use strict";

const PATTERNS_PER_DAY = 2;
const TOTAL_DAYS = Math.ceil(PATTERNS.length / PATTERNS_PER_DAY);
const REMOVED_LEGACY_PATTERN_NUMS = [
  5, 15, 23, 25, 29, 35, 39, 43, 45, 49, 53, 57, 59, 61, 63, 71,
  91, 95, 99, 101, 103, 105, 111, 113, 119, 121, 123, 125, 129, 131, 133,
  143, 145, 147, 149, 153, 163, 171, 175, 189, 191, 193, 195, 197, 223, 237,
];
const REMOVED_CURATED_PATTERN_NUMS = [43, 56, 58, 66, 100, 112, 117, 134, 163, 167, 172, 185, 191, 203];

function mapCuratedDayToDeduped(day) {
  const completed = Math.max(0, (day - 1) * PATTERNS_PER_DAY);
  const retainedBefore = completed - REMOVED_CURATED_PATTERN_NUMS.filter(num => num <= completed).length;
  return Math.min(TOTAL_DAYS, Math.floor(retainedBefore / PATTERNS_PER_DAY) + 1);
}

function mapLegacyDayToCurated(day) {
  const completed = Math.max(0, (day - 1) * PATTERNS_PER_DAY);
  const retainedBefore = completed - REMOVED_LEGACY_PATTERN_NUMS.filter(num => num <= completed).length;
  return mapCuratedDayToDeduped(Math.floor(retainedBefore / PATTERNS_PER_DAY) + 1);
}

/* ==================== 하루 커리큘럼 로직 (DOM 비의존, 테스트 가능) ==================== */

function dayPatterns(day) {
  const start = (day - 1) * PATTERNS_PER_DAY;
  return PATTERNS.slice(start, start + PATTERNS_PER_DAY);
}

/* 전체 복습은 최근 복습과 겹치지 않는 이전 패턴에서 날짜별로 고른다. */
function getReviewPicks(day, pool) {
  const key = "reviewPicks_v5_" + day;
  let cachedNums = null;
  try { cachedNums = JSON.parse(localStorage.getItem(key)); } catch {}
  if (Array.isArray(cachedNums)) {
    const found = cachedNums.map(n => pool.find(p => p.num === n)).filter(Boolean);
    if (found.length === 2 && isPhrasalPattern(found[0]) !== isPhrasalPattern(found[1])) return found;
  }
  const yesterday = new Set(dayPatterns(day - 1).map(p => p.num));
  const twoDaysAgo = new Set(day > 2 ? dayPatterns(day - 2).map(p => p.num) : []);
  const older = patterns => {
    const eligible = patterns.filter(p => !yesterday.has(p.num) && !twoDaysAgo.has(p.num));
    if (eligible.length) return eligible;
    const beforeYesterday = patterns.filter(p => !yesterday.has(p.num));
    return beforeYesterday.length ? beforeYesterday : patterns;
  };
  const phrasal = older(pool.filter(isPhrasalPattern));
  const regular = older(pool.filter(p => !isPhrasalPattern(p)));
  const previousPicks = day > 2
    ? getReviewPicks(day - 1, PATTERNS.slice(0, (day - 2) * PATTERNS_PER_DAY))
    : [];
  const pick = (patterns, offset) => {
    const fresh = patterns.filter(p => !previousPicks.some(previous => previous.num === p.num));
    const choices = fresh.length ? fresh : patterns;
    return choices[Math.floor(((day * 0.618033988749895 + offset) % 1) * choices.length)];
  };
  const picks = phrasal.length && regular.length
    ? [pick(phrasal, 0), pick(regular, 0.5)]
    : pool.slice(0, Math.min(2, pool.length));
  localStorage.setItem(key, JSON.stringify(picks.map(p => p.num)));
  return picks;
}

function isPhrasalPattern(p) {
  const englishTitle = p.title.split("(")[0];
  return /\b(?:away|back|by|down|in|into|off|on|out|over|through|together|up|with)\b/i.test(englishTitle);
}

function buildSessions(day) {
  const today = dayPatterns(day);
  const patternTasks = (patterns, trainingLevel, showTarget) => patterns.flatMap(p =>
    p.examples.map((ex, exIdx) => ({ kind: "pattern", p, ex, exIdx, trainingLevel, showTarget }))
  );
  const oneExampleTasks = (patterns, trainingLevel, showTarget, shadowPauseMs = 0) => patterns.map(p =>
    ({ kind: "pattern", p, ex: p.examples[0], exIdx: 0, trainingLevel, showTarget, shadowPauseMs })
  );
  const s1 = patternTasks(today, 1, true);
  const s2 = today.map(p => ({ kind: "situation", p, trainingLevel: 2, showTarget: true, showSituation: false, shadowPauseMs: 1000 }));
  const sessions = [
    { name: "세션1 패턴 연습", tasks: s1 },
    { name: "세션2 상황 연습", tasks: s2 },
  ];
  if (day > 1) {
    const prev = dayPatterns(day - 1);
    sessions.push({ name: "세션3 어제 복습", tasks: oneExampleTasks(prev, 2, true, 1000) });
    if (day > 2) {
      const twoDaysAgo = dayPatterns(day - 2);
      sessions.push({ name: "세션4 2일 전 복습", tasks: oneExampleTasks(twoDaysAgo, 2, true, 1000) });
    }
    const pool = PATTERNS.slice(0, (day - 1) * PATTERNS_PER_DAY);
    const picks = getReviewPicks(day, pool);
    sessions.push({ name: day > 2 ? "세션5 전체 복습" : "세션4 전체 복습", tasks: oneExampleTasks(picks, 2, true) });
  }
  sessions.push({ name: "마무리 일상 회화", tasks: [{ kind: "conversation", patterns: today }] });
  return sessions;
}

function migrateProgressForTwoDayReview(progress) {
  if (!progress || progress.day < 3) return progress;
  if (typeof progress.pos === "number") {
    return progress.pos >= 10 ? { ...progress, pos: progress.pos + 2 } : progress;
  }
  if (typeof progress.session === "number" && progress.session >= 3) {
    return { ...progress, session: progress.session + 1 };
  }
  return progress;
}

/* 오늘 할 일을 세션 이름표를 붙여 평평한 배열로 반환 */
function buildDayTasks(day) {
  return buildSessions(day).flatMap(s => s.tasks.map(t => ({ ...t, sessionName: s.name })));
}

/* 위치 이동 계산 (순수 함수, day-1의 마지막 문제까지 자유롭게 뒤로 이동 가능) */
function advancePos(day, pos, direction) {
  if (direction === "back") {
    if (pos > 0) return { day, pos: pos - 1 };
    if (day > 1) return { day: day - 1, pos: buildDayTasks(day - 1).length - 1 };
    return { day, pos };
  }
  return { day, pos: pos + 1 };
}
