import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const read = path => fs.readFileSync(new URL(path, import.meta.url), "utf8");
const patternsCode = read("../web/patterns.js");
const tasksCode = read("../web/day-tasks.js");
const app = read("../web/app.js");
const index = read("../web/index.html");
const plain = value => JSON.parse(JSON.stringify(value));

function storageFor(entries = []) {
  const values = new Map(entries);
  return {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: key => values.delete(key),
    key: index => [...values.keys()][index] ?? null,
    get length() { return values.size; },
  };
}

function curriculum(storage = storageFor()) {
  const context = vm.createContext({ localStorage: storage });
  vm.runInContext(patternsCode + tasksCode + `
    globalThis.test = { dayPatterns, buildSessions, buildDayTasks, advancePos, isPhrasalPattern, setEnabledPatternNums, remapProgressForSelection,
      get patterns() { return PATTERNS; }, get active() { return ACTIVE_PATTERNS; }, get days() { return TOTAL_DAYS; } };
  `, context);
  return context.test;
}

const storage = storageFor();
const tasks = curriculum(storage);
assert.equal(tasks.days, 95, "설정하지 않은 기존 사용자는 전체 190개를 그대로 학습해야 합니다.");
const all = plain(tasks.patterns);
const remap = (progress, before, after, anchor) => plain(tasks.remapProgressForSelection(progress, before, after, anchor));
assert.deepEqual(remap({ day: 31, pos: 4 }, all, all.slice(2)), { day: 30, pos: 0 }, "앞의 패턴을 해제하면 현재 패턴에 맞게 Day가 앞당겨져야 합니다.");
assert.deepEqual(remap({ day: 30, pos: 4 }, all.slice(2), all), { day: 31, pos: 0 }, "앞의 패턴을 다시 선택하면 같은 패턴의 Day가 뒤로 이동해야 합니다.");
assert.deepEqual(remap({ day: 31, pos: 3 }, all, all.filter(p => p.num !== 61), 62), { day: 31, pos: 0 }, "현재 둘째 패턴이 새 Day의 첫 패턴이 되어도 건너뛰면 안 됩니다.");
assert.deepEqual(remap({ day: 31, pos: 0 }, all, [all[0], all[62], all[189]]), { day: 1, pos: 0 }, "현재 패턴이 해제되면 다음 남은 패턴이 있는 Day로 이동해야 합니다.");
assert.deepEqual(remap({ day: 95, pos: 0 }, all, [all[0]]), { day: 1, pos: 0 }, "현재 이후 패턴이 모두 해제되면 마지막 유효 Day로 맞춰야 합니다.");
assert.deepEqual(remap({ day: 31, pos: 0 }, all, []), { day: 1, pos: 0 });

for (const nums of [[], [61], [1, 61, 190], [1, 2, 10, 60, 62, 80, 110], all.filter(tasks.isPhrasalPattern).map(p => p.num), all.filter(p => !tasks.isPhrasalPattern(p)).map(p => p.num)]) {
  storage.setItem("reviewPicks_v5_31", "[1,2]");
  const changed = tasks.setEnabledPatternNums(nums);
  if (changed) assert.equal(storage.getItem("reviewPicks_v5_31"), null, "선택 변경 후 이전 복습 기록을 남기면 안 됩니다.");
  assert.equal(tasks.days, Math.ceil(nums.length / 2));
  const selected = new Set(nums);
  const taught = [];
  for (let day = 1; day <= tasks.days; day++) {
    const today = tasks.dayPatterns(day);
    assert.ok(today.length === 1 || today.length === 2);
    if (day > 1) assert.deepEqual(plain(tasks.advancePos(day, 0, "back")), { day: day - 1, pos: tasks.buildDayTasks(day - 1).length - 1 }, "이전 이동은 새 구성의 이전 Day 마지막 문제로 이동해야 합니다.");
    taught.push(...today.map(p => p.num));
    for (const task of tasks.buildDayTasks(day)) {
      if (task.p) assert.ok(selected.has(task.p.num), `Day ${day}에 해제한 패턴 ${task.p.num}을 출제하면 안 됩니다.`);
      if (task.patterns) assert.ok(task.patterns.every(p => selected.has(p.num)), "일상회화에도 선택한 패턴만 전달해야 합니다.");
      if (task.ex) assert.equal(task.ex, task.p.examples[task.exIdx]);
    }
    const review = tasks.buildSessions(day).find(s => s.name.includes("전체 복습"));
    if (review) {
      assert.equal(review.tasks.length, 2, "구동사만 또는 일반 패턴만 선택해도 복습 두 개를 제공해야 합니다.");
      assert.equal(new Set(review.tasks.map(t => t.p.num)).size, 2, "같은 패턴을 중복 출제하면 안 됩니다.");
    }
  }
  assert.deepEqual(plain(taught), [...nums].sort((a, b) => a - b), "선택한 패턴은 기존 순서대로 빠짐없이 한 번씩 배정되어야 합니다.");
  assert.deepEqual(plain(tasks.buildSessions(0)), []);
  assert.deepEqual(plain(tasks.buildSessions(tasks.days + 1)), [], "없는 Day에서는 회화만 임의로 출제하면 안 됩니다.");
  assert.deepEqual(plain(curriculum(storage).active.map(p => p.num)), [...nums].sort((a, b) => a - b), "다시 열어도 선택을 유지해야 합니다.");
  assert.equal(tasks.setEnabledPatternNums(nums), false, "동일 선택을 저장하면 커리큘럼을 초기화하면 안 됩니다.");
  assert.deepEqual(plain(tasks.active.map(p => p.num)), [...nums].sort((a, b) => a - b));
}

// 실제 설정 이벤트를 실행해 미저장 취소, Day 이동, 재시작 및 빈 선택을 검증한다.
class Element {
  constructor(tag = "div") {
    this.tag = tag;
    this.children = [];
    this.dataset = {};
    this.attributes = {};
    this.value = "";
    this.disabled = false;
    const classes = new Set();
    this.classList = {
      toggle: (name, on) => on ? classes.add(name) : classes.delete(name),
      add: name => classes.add(name), remove: name => classes.delete(name), contains: name => classes.has(name),
    };
  }
  set textContent(value) { this.text = String(value); this.children = []; }
  get textContent() { return (this.text || "") + this.children.map(child => child.textContent).join(""); }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  appendChild(child) { this.children.push(child); }
  append(...children) { this.children.push(...children); }
  querySelector(tag) { return this.children.find(child => child.tag === tag) || this.children.map(child => child.querySelector(tag)).find(Boolean); }
}

function settingsApp(storage) {
  const elements = Object.fromEntries([...index.matchAll(/id="([^"]+)"/g)].map(([, id]) => [id, new Element()]));
  const context = vm.createContext({
    localStorage: storage, speechSynthesis: { getVoices: () => [] }, window: {}, navigator: {}, self: { APP_VERSION: "v46" },
    document: { getElementById: id => elements[id], createElement: tag => new Element(tag), addEventListener: () => {} },
    location: { search: "" }, URLSearchParams, console, confirm: () => true,
    fetch: () => { throw new Error("패턴 선택에 AI 통신이 발생하면 안 됩니다."); },
  });
  vm.runInContext(patternsCode + tasksCode + app, context);
  return {
    elements, click: id => elements[id].onclick(),
    toggle(num, checked) {
      const row = elements["pattern-selection-list"].children.find(row => Number(row.dataset.patternNum) === num);
      const checkbox = row.querySelector("input");
      checkbox.checked = checked;
      checkbox.onchange();
    },
  };
}

const uiStorage = storageFor([
  ["curriculumVersion", "190-practical-patterns-v2"], ["twoDayReviewProgressV1", "1"],
  ["progress", JSON.stringify({ day: 31, pos: 3 })], ["promptCache", "{\"valid\":true}"],
]);
const ui = settingsApp(uiStorage);
ui.click("btn-settings");
assert.equal(ui.elements["pattern-selection-list"].children.length, 190);
ui.click("tab-settings-patterns");
assert.equal(ui.elements["tab-settings-patterns"].attributes["aria-pressed"], "true");
assert.ok(ui.elements["settings-general"].classList.contains("hidden"));
ui.toggle(1, false);
ui.click("btn-settings-close");
assert.equal(uiStorage.getItem("enabledPatternNums_v1"), null, "저장하지 않고 닫으면 기존 선택을 유지해야 합니다.");
assert.deepEqual(JSON.parse(uiStorage.getItem("progress")), { day: 31, pos: 3 });

ui.click("btn-settings");
ui.toggle(1, false);
ui.toggle(2, false);
assert.match(ui.elements["pattern-selection-summary"].textContent, /188.*94일.*Day 30/);
ui.click("btn-settings-save");
assert.deepEqual(JSON.parse(uiStorage.getItem("progress")), { day: 30, pos: 0 });
assert.equal(ui.elements["home-day"].textContent, "Day 30");
assert.match(ui.elements["home-plan"].innerHTML, /패턴 61\./);
assert.equal(uiStorage.getItem("promptCache"), "{\"valid\":true}", "패턴별 정상 안내 캐시는 선택 변경만으로 지우지 않아야 합니다.");

ui.click("btn-settings");
ui.click("btn-patterns-all");
assert.match(ui.elements["pattern-selection-summary"].textContent, /190.*95일.*Day 31/);
ui.click("btn-settings-save");
assert.deepEqual(JSON.parse(uiStorage.getItem("progress")), { day: 31, pos: 0 });

uiStorage.setItem("progress", JSON.stringify({ day: 31, pos: 4 }));
ui.click("btn-settings");
ui.click("btn-settings-save");
assert.deepEqual(JSON.parse(uiStorage.getItem("progress")), { day: 31, pos: 4 }, "일반 설정만 저장할 때 문제 위치를 잃으면 안 됩니다.");

ui.click("btn-settings");
ui.click("btn-patterns-none");
assert.equal(ui.elements["input-day"].disabled, true);
ui.click("btn-settings-save");
assert.equal(ui.elements["btn-start"].disabled, true);
assert.equal(ui.elements["btn-home-day-next"].disabled, true);
assert.equal(ui.elements["btn-home-day-prev"].disabled, true);
assert.equal(ui.elements["home-day"].textContent, "선택한 패턴 없음");
const reloaded = settingsApp(uiStorage);
assert.equal(reloaded.elements["btn-start"].disabled, true, "재실행해도 모두 해제 상태를 유지해야 합니다.");
reloaded.click("btn-settings");
reloaded.toggle(61, true);
reloaded.click("btn-settings-save");
assert.equal(reloaded.elements["btn-start"].disabled, false);
assert.equal(reloaded.elements["home-day"].textContent, "Day 1");
assert.match(reloaded.elements["home-plan"].innerHTML, /패턴 61\./);
assert.equal(curriculum(uiStorage).buildDayTasks(1).length, 5, "하나만 선택하면 예문 3개, 상황 1개, 회화 1개여야 합니다.");
reloaded.click("btn-settings");
reloaded.toggle(1, true);
reloaded.toggle(190, true);
reloaded.click("tab-settings-general");
reloaded.elements["input-day"].value = "2";
reloaded.click("btn-settings-save");
assert.deepEqual(JSON.parse(uiStorage.getItem("progress")), { day: 2, pos: 0 }, "재계산된 Day 범위 안에서 수동 이동도 유지해야 합니다.");
assert.equal(curriculum(uiStorage).buildDayTasks(2).length, 9, "홀수 개의 마지막 Day도 남은 한 패턴만 정상 출제해야 합니다.");
console.log("Pattern selection, all-session exclusion, Day remapping and settings event tests passed");
