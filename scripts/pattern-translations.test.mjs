import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import crypto from "node:crypto";

const read = name => fs.readFileSync(new URL(name, import.meta.url), "utf8");
const patternsCode = read("../web/patterns.js");
const app = read("../web/app.js");
const jsonStart = app.indexOf("function parseJson");
const jsonEnd = app.indexOf("/* 세션1:", jsonStart);
const trainingStart = app.indexOf("/* 훈련 안내문");
const trainingEnd = app.indexOf("/* 교정 */", trainingStart);
const cache = {};
const requests = [];
const context = vm.createContext({
  LS: { cache, cacheSet: (key, value) => { cache[key] = value; } },
  callLLM: async request => {
    requests.push(request);
    return JSON.stringify({ situation: "상대와 이야기를 나누고 있어요.", target_en: "An invented answer.", target_ko: "내일은 무조건 그 일을 할 거야." });
  },
  state: { skip: false, back: false, quit: false }, console,
});
vm.runInContext(patternsCode +
  "const MAX_TRAINING_SITUATION_LENGTH = 28; const MAX_TRAINING_REASON_LENGTH = 35; const TRAINING_REQUEST_TIMEOUT_MS = 30000; const TRAINING_PROMPT_SYSTEM = ''; const SYSTEM_PROMPT = '';" +
  app.slice(jsonStart, jsonEnd) + app.slice(trainingStart, trainingEnd) +
  "globalThis.test = { patterns: PATTERNS, getTrainingPrompt, parseTrainingPrompt, trainingPromptText };", context);
const { patterns, getTrainingPrompt, parseTrainingPrompt, trainingPromptText } = context.test;

assert.equal(patterns.length, 190);
assert.equal(patterns.flatMap(p => p.examples_ko).length, 570);
// v46의 번호·제목·설명·영어 예문·순서를 그대로 유지한다.
const originalData = patterns.map(({ examples_ko, ...original }) => original);
assert.equal(crypto.createHash("sha256").update(JSON.stringify(originalData)).digest("hex"),
  "6b569a745dd6ce02f03b221e868e1bf993afd61c89509cae8b184a9de182b088",
  "번역을 추가하면서 기존 영어 예문이나 패턴을 바꾸면 안 됩니다.");
assert.equal(read("../Pattern/현재_학습패턴.txt").trim(), patternsCode.trim(), "편집용 TXT도 같은 고정 번역을 포함해야 합니다.");

const timeTerms = [
  [/\bSundays?\b/i, /일요일/], [/\bMondays?\b/i, /월요일/], [/\bTuesdays?\b/i, /화요일/],
  [/\bThursdays?\b/i, /목요일/], [/\bFridays?\b/i, /금요일/], [/\bSaturdays?\b/i, /토요일/],
  [/\btomorrow\b/i, /내일/], [/\btoday\b/i, /오늘/], [/\btonight\b/i, /오늘.*(?:밤|저녁)/],
  [/\blast night\b/i, /어젯밤/], [/\blast week\b/i, /지난주/], [/\blast year\b/i, /작년/],
  [/\bnext year\b/i, /내년/], [/\bnext month\b/i, /다음 달/], [/\bnext week\b/i, /다음 주/],
  [/\bnext semester\b/i, /다음 학기/], [/\bthis weekend\b/i, /이번 주말/],
];
for (const p of patterns) {
  assert.equal(p.examples_ko.length, p.examples.length, `패턴 ${p.num}의 번역 수가 일치해야 합니다.`);
  for (const [index, en] of p.examples.entries()) {
    const ko = p.examples_ko[index];
    const label = `패턴 ${p.num} 예문 ${index + 1}`;
    assert.ok(typeof ko === "string" && /[가-힣]/.test(ko), `${label}: 한국어 번역이 필요합니다.`);
    assert.equal(ko.trim(), ko);
    assert.ok(!ko.includes("…") && !ko.includes("..."), `${label}: 번역을 자르면 안 됩니다.`);
    assert.ok(!ko.includes(en) && !ko.includes(p.title), `${label}: 영어 정답이나 패턴명이 번역에 들어가면 안 됩니다.`);
    assert.ok((ko.match(/[A-Za-z]+/g) || []).every(word => ["L", "M"].includes(word)), `${label}: 치수 외의 영어 힌트를 넣으면 안 됩니다.`);
    if (en.endsWith("?")) assert.ok(ko.endsWith("?"), `${label}: 질문을 진술로 바꾸면 안 됩니다.`);
    for (const [englishTerm, koreanTerm] of timeTerms) {
      if (englishTerm.test(en)) assert.match(ko, koreanTerm, `${label}: 시간 표현 ${englishTerm}를 빠뜨리면 안 됩니다.`);
    }
    for (const number of en.match(/\b\d+\b/g) || []) assert.ok(ko.includes(number), `${label}: 숫자 ${number}를 보존해야 합니다.`);

    const prompt = await getTrainingPrompt(p, index, true);
    assert.equal(prompt.target_en, en);
    assert.equal(prompt.target_ko, ko, `${label}: AI가 잘못 번역해도 고정 번역만 사용해야 합니다.`);
    assert.ok(trainingPromptText(prompt, true).includes(ko));
    assert.ok(!trainingPromptText(prompt, true).includes(en));
    assert.ok(!trainingPromptText(prompt, true).includes(p.title));
    const key = `training_v11_fixed_ko_t1_p${p.num}_e${index}`;
    cache[key].target_ko = "캐시에서 의미가 바뀐 번역";
    assert.equal((await getTrainingPrompt(p, index, true)).target_ko, ko, `${label}: 캐시가 고정 번역을 덮어쓰면 안 됩니다.`);
    const requestCount = requests.length;
    assert.equal((await getTrainingPrompt(p, index, true, false)).target_ko, ko);
    assert.equal(requests.length, requestCount, "상황과 설명이 없으면 번역을 위한 AI 요청을 보내면 안 됩니다.");
  }
}
assert.equal(requests.length, 570, "캐시나 상황 없는 모드가 불필요하게 안내를 재생성하면 안 됩니다.");
assert.ok(requests.every(request => request.includes("검수된 한국어 목표 문장")));
assert.ok(requests.every(request => !request.includes('"target_ko"')), "한국어 번역 생성을 AI에 맡기면 안 됩니다.");

const matchAll = (num, regex) => patterns[num - 1].examples_ko.forEach(ko => assert.match(ko, regex, `패턴 ${num}의 핵심 뉘앙스를 유지해야 합니다.`));
matchAll(5, /느낌이 들어/);
matchAll(7, /편이야/);
matchAll(11, /마침/);
matchAll(16, /기대하진 않겠어/);
matchAll(24, /기로 되어 있었는데/);
matchAll(36, /확신은 들지 않아/);
matchAll(52, /도 괜찮을까요/);
matchAll(68, /전부터/);
matchAll(78, /점점 익숙해지고/);
matchAll(80, /익숙해/);
matchAll(86, /했을 텐데|왔을 텐데|줬을 텐데/);
matchAll(88, /동의하는지는 잘 모르겠어/);
matchAll(93, /어야 했어/);
matchAll(94, /막 .*려던 참에/);
matchAll(115, /아마 .*까지는/);
matchAll(124, /막 .*려는 참이야/);
matchAll(128, /계획이야/);
matchAll(131, /까 생각 중이야/);
matchAll(143, /수 있을지 알아볼게요/);
matchAll(149, /전에는/);
matchAll(155, /아직 .*지 못했어|아직 .*지 않았어/);
matchAll(164, /분명/);
matchAll(188, /지도 몰라/);
matchAll(189, /지도 몰라/);
assert.match(patterns[1].examples_ko[1], /엘리베이터에서 떨어진/);
assert.match(patterns[41].examples_ko[2], /월 단위로 갱신하는 임대 계약/);
assert.match(patterns[75].examples_ko[0], /수도.*포함.*전기.*아니라/);
assert.match(patterns[140].examples_ko[2], /음식과 함께/);
assert.doesNotMatch(patterns[140].examples_ko[2], /식후|식전/, "with food를 식후나 식전으로 바꾸면 안 됩니다.");
assert.match(patterns[171].examples_ko[1], /공유하지 않아/);
assert.match(patterns[183].examples_ko[2], /목요일에나/);
assert.ok(patterns[185].examples_ko.every(ko => ko.includes("거의 확실")), "pretty sure를 확정 사실로 바꾸면 안 됩니다.");

const fixed = { target_en: patterns[123].examples[0], target_ko: patterns[123].examples_ko[0] };
assert.equal(parseTrainingPrompt('상황: 외출을 앞두고 이야기하고 있어요.\n문장: 한참 뒤에 출발할 계획이에요.', true, true, false, fixed).target_ko, fixed.target_ko, "텍스트 응답도 고정 번역으로 교체해야 합니다.");
assert.equal(parseTrainingPrompt(JSON.stringify({ situation: "about to로 대답하는 상황이에요." }), true, true, false, fixed), null, "상황에서 영어 패턴을 미리 알려주면 안 됩니다.");

const reviewCache = new Map();
context.localStorage = {
  getItem: key => reviewCache.get(key) ?? null,
  setItem: (key, value) => reviewCache.set(key, String(value)),
};
vm.runInContext(read("../web/day-tasks.js"), context);
for (let day = 1; day <= 95; day++) {
  for (const task of context.buildDayTasks(day).filter(task => task.p)) {
    const index = task.exIdx ?? 0;
    const prompt = await getTrainingPrompt(task.p, index, task.showTarget, task.showSituation !== false);
    assert.equal(prompt.target_en, task.p.examples[index], `Day ${day} ${task.sessionName}: 영어 목표가 정확해야 합니다.`);
    assert.equal(prompt.target_ko, task.p.examples_ko[index], `Day ${day} ${task.sessionName}: 같은 예문의 고정 번역을 써야 합니다.`);
  }
}

// 실제 화면 렌더러와 안내 TTS를 사용해 답변 전에 영어가 노출되지 않는지 검증한다.
class Element {
  children = [];
  set textContent(text) { this.text = String(text); this.children = []; }
  get textContent() { return (this.text || "") + this.children.map(child => child.textContent).join(""); }
  append(...children) { this.children.push(...children); }
}
const elements = { "status-main": new Element(), "status-sub": new Element() };
let activeTask;
let answered = false;
let answerCount = 0;
let englishSpoken = 0;
Object.assign(context, {
  $: id => elements[id], document: { createElement: () => new Element() }, step: fn => fn(),
  speak: async (text, lang) => {
    if (!answered) assert.ok(!/[A-Za-z]{2,}/.test(text), "답변 전 안내 음성에 영어 단어나 패턴이 있으면 안 됩니다.");
    else if (lang === "en-US") englishSpoken++;
  },
  listenWithRetry: async () => {
    assert.ok(elements["status-main"].textContent.includes(activeTask.p.examples_ko[activeTask.exIdx]));
    assert.ok(!elements["status-main"].textContent.includes(activeTask.ex));
    assert.ok(!elements["status-main"].textContent.includes(activeTask.p.title));
    answered = true; answerCount++;
    return { text: "잘못 인식된 문장" };
  },
  listenUntilResumed: async () => ({}), waitCancellable: async () => {},
});
const guidedStart = app.indexOf("async function runGuidedPatternTask");
vm.runInContext(app.slice(app.indexOf("const ui = {"), app.indexOf("/* ==================== 학습 엔진")) +
  app.slice(guidedStart, app.indexOf("async function runPatternTask", guidedStart)) +
  "globalThis.run = runGuidedPatternTask;", context);
for (const p of patterns) {
  for (const exIdx of [0, 1, 2]) {
    answered = false;
    activeTask = { p, exIdx, ex: p.examples[exIdx], trainingLevel: 2, showTarget: true, answerOnly: true };
    await context.run(activeTask);
  }
}
assert.equal(answerCount, 570);
assert.equal(englishSpoken, 570, "기존 답변 후 최종 문장 재생 횟수는 유지해야 합니다.");
console.log("570 fixed translations, nuance/time checks, cache precedence and pre-answer screen/TTS tests passed");
