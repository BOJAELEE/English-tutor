"use strict";

const PATTERNS_PER_DAY = 2;
const TOTAL_DAYS = Math.ceil(PATTERNS.length / PATTERNS_PER_DAY);

/* ==================== 하루 커리큘럼 로직 (DOM 비의존, 테스트 가능) ==================== */

function dayPatterns(day) {
  const start = (day - 1) * PATTERNS_PER_DAY;
  return PATTERNS.slice(start, start + PATTERNS_PER_DAY);
}

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
  const patternTasks = (patterns, trainingLevel, showTarget) => patterns.flatMap(p =>
    p.examples.map((ex, exIdx) => ({ kind: "pattern", p, ex, exIdx, trainingLevel, showTarget }))
  );
  const s1 = patternTasks(today, 1, true);
  const s2 = today.map(p => ({ kind: "situation", p, trainingLevel: 2, showTarget: true }));
  const sessions = [
    { name: "세션1 패턴 연습", tasks: s1 },
    { name: "세션2 상황 연습", tasks: s2 },
  ];
  if (day > 1) {
    const prev = dayPatterns(day - 1);
    sessions.push({ name: "세션3 어제 복습", tasks: patternTasks(prev, 2, true) });
    const pool = PATTERNS.slice(0, (day - 1) * PATTERNS_PER_DAY);
    const picks = getReviewPicks(day, pool);
    sessions.push({ name: "세션4 전체 복습", tasks: patternTasks(picks, 2, false) });
  }
  sessions.push({ name: "마무리 일상 회화", tasks: [{ kind: "conversation", patterns: today }] });
  return sessions;
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
