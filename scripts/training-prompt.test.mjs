import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const app = fs.readFileSync(new URL("../web/app.js", import.meta.url), "utf8");
const jsonStart = app.indexOf("function parseJson");
const jsonEnd = app.indexOf("/* 세션1:", jsonStart);
const trainingStart = app.indexOf("/* 훈련 안내문", jsonEnd);
const trainingEnd = app.indexOf("async function getTrainingPrompt", trainingStart);
const trainingTextStart = app.indexOf("function trainingPromptText", trainingEnd);

assert.ok(jsonStart >= 0 && jsonEnd > jsonStart, "JSON 파서 구간을 찾을 수 있어야 합니다.");
assert.ok(trainingStart >= 0 && trainingEnd > trainingStart, "훈련 안내 파서 구간을 찾을 수 있어야 합니다.");
assert.ok(trainingTextStart > trainingEnd, "훈련 안내 생성 구간을 찾을 수 있어야 합니다.");

const context = vm.createContext({});
vm.runInContext(
  "const MAX_TRAINING_SITUATION_LENGTH = 28;" + app.slice(jsonStart, jsonEnd) + app.slice(trainingStart, trainingEnd)
    + "globalThis.__parseTrainingPrompt = parseTrainingPrompt;",
  context
);

const target = "I tend to do my grocery shopping on Sundays.";
const expected = {
  target_en: target,
  situation: "일요일마다 장을 보는 평소 습관을 말하는 상황입니다.",
  target_ko: "나는 보통 일요일에 장을 봐.",
  core_meaning: "일요일 장보기 습관",
};

const fromJson = context.__parseTrainingPrompt(JSON.stringify(expected), true);
assert.equal(fromJson.target_en, target, "JSON 안내문에서 목표 원문을 보존해야 합니다.");
assert.equal(fromJson.target_ko, expected.target_ko, "JSON 안내문의 한국어 문장을 읽어야 합니다.");

const withReason = { ...expected, reason_ko: "tend to는 반복되는 습관을 말할 때 씁니다." };
assert.equal(
  context.__parseTrainingPrompt(JSON.stringify(withReason), true, true, true).reason_ko,
  withReason.reason_ko,
  "세션1 안내문에는 답변 후 보여줄 짧은 설명이 있어야 합니다."
);
assert.equal(
  context.__parseTrainingPrompt(JSON.stringify(expected), true, true, true),
  null,
  "세션1은 설명이 없는 이전 캐시를 사용하면 안 됩니다."
);
assert.equal(
  context.__parseTrainingPrompt(JSON.stringify({ ...expected, reason_ko: "이 표현이 뜻을 전달합니다." }), true, true, true),
  null,
  "세션1의 설명은 실제 영어 단어를 짚어야 합니다."
);

const fromText = context.__parseTrainingPrompt(
  `- 원문: ${target}\n- 상황: 일요일마다 장을 보는 평소 습관을 말하는 상황입니다.\n- 문장: 나는 보통 일요일에 장을 봐.\n- 핵심: 일요일 장보기 습관`,
  true
);
assert.equal(fromText.target_en, target, "기존 네 줄 형식도 계속 읽어야 합니다.");

const withoutSituation = {
  ...expected,
  situation: "",
};
assert.equal(
  context.__parseTrainingPrompt(JSON.stringify(withoutSituation), true, false).target_ko,
  expected.target_ko,
  "상황을 표시하지 않는 세션은 빈 상황 안내를 허용해야 합니다."
);
assert.equal(
  context.__parseTrainingPrompt(JSON.stringify(withoutSituation), true),
  null,
  "상황을 표시하는 세션은 빈 상황 안내를 허용하면 안 됩니다."
);

const tooLong = {
  ...expected,
  situation: "친구가 주말마다 외식하는지 물어보고 가족의 식습관까지 자세히 설명하는 상황입니다.",
};
assert.equal(context.__parseTrainingPrompt(JSON.stringify(tooLong), true), null, "긴 상황 설명은 저장하면 안 됩니다.");

assert.match(app, /const TRAINING_REQUEST_TIMEOUT_MS = 30000/, "훈련 안내에는 별도 대기 시간이 필요합니다.");
assert.match(app, /const MAX_TRAINING_SITUATION_LENGTH = 28/, "상황 설명의 최대 길이가 필요합니다.");
assert.match(app, /training_v10_short_t/, "기존의 긴 안내 캐시는 재사용하면 안 됩니다.");
assert.match(app, /_nosituation/, "상황 없는 세션은 별도 캐시를 사용해야 합니다.");
assert.match(app, /요청한 경우에만 reason_ko도 포함/, "세션1의 이유 필드를 시스템 안내가 허용해야 합니다.");
assert.match(app, /reason_ko는 한국어 설명 속에 근거가 되는 영어 단어/, "단어별 설명에는 실제 영어 단어 인용이 필요합니다.");

const examples = [
  "Do you want to come over for dinner?",
  "A few friends are coming over tonight.",
  "Thanks for coming over on such short notice.",
];
const requests = [];
const tokenBudgets = [];
const savedKeys = [];
let exampleIndex = 0;
const cache = { training_v10_short_t1_reason_p1_e0: { ...expected, target_en: examples[0], reason_ko: "기존의 모호한 설명" } };
const promptContext = vm.createContext({
  LS: { cache, cacheSet: (key, value) => { savedKeys.push(key); cache[key] = value; } },
  callLLM: async (request, maxTokens) => {
    requests.push(request);
    tokenBudgets.push(maxTokens);
    return JSON.stringify({ ...expected, target_en: examples[exampleIndex], reason_ko: "come over는 상대방 집에 놀러 갈 때 씁니다." });
  },
  state: { skip: false, back: false, quit: false },
  console,
});
vm.runInContext(
  "const MAX_TRAINING_SITUATION_LENGTH = 28; const TRAINING_REQUEST_TIMEOUT_MS = 30000; const TRAINING_PROMPT_SYSTEM = '';"
    + app.slice(jsonStart, jsonEnd) + app.slice(trainingStart, trainingTextStart)
    + "globalThis.__getTrainingPrompt = getTrainingPrompt;",
  promptContext
);
for (exampleIndex = 0; exampleIndex < examples.length; exampleIndex++) {
  await promptContext.__getTrainingPrompt({ num: 1, title: "Come over (놀러 오다).", examples }, exampleIndex, true, true, true);
}
assert.equal(requests.length, 3, "기존의 모호한 설명 캐시 대신 세 예문을 새로 준비해야 합니다.");
assert.ok(tokenBudgets.every(count => count >= 600), "설명까지 포함한 안내문이 잘리지 않도록 응답 길이를 확보해야 합니다.");
assert.match(requests[0], /패턴의 핵심 영어 단어/, "첫 예문은 패턴 핵심 단어의 선택 이유를 묻습니다.");
for (const request of requests.slice(1)) {
  assert.match(request, /패턴 외의 핵심 영어 단어/, "나머지 두 예문은 문장을 구성하는 단어의 선택 이유를 묻습니다.");
}
assert.ok(savedKeys.every(key => key.includes("_reason_v2")), "새 설명은 이전 캐시와 구분해야 합니다.");

const retryRequests = [];
const retryContext = vm.createContext({
  LS: { cache: {}, cacheSet: () => {} },
  callLLM: async request => {
    retryRequests.push(request);
    if (retryRequests.length === 1) return "{}";
    return JSON.stringify({ ...expected, target_en: examples[0], reason_ko: "come over는 상대방 집에 놀러 갈 때 씁니다." });
  },
  state: { skip: false, back: false, quit: false },
  console,
});
vm.runInContext(
  "const MAX_TRAINING_SITUATION_LENGTH = 28; const TRAINING_REQUEST_TIMEOUT_MS = 30000; const TRAINING_PROMPT_SYSTEM = '';"
    + app.slice(jsonStart, jsonEnd) + app.slice(trainingStart, trainingTextStart)
    + "globalThis.__getTrainingPrompt = getTrainingPrompt;",
  retryContext
);
await retryContext.__getTrainingPrompt({ num: 1, title: "Come over (놀러 오다).", examples }, 0, true, true, true);
assert.equal(retryRequests.length, 2, "안내문 형식 오류에는 같은 예문을 한 번 더 요청해야 합니다.");
assert.match(retryRequests[1], /이전 응답/, "재요청은 무엇을 고칠지 명시해야 합니다.");
assert.match(app, /responseJson: true/, "훈련 안내 요청은 JSON 응답을 요청해야 합니다.");
assert.match(app, /function fetchWithTimeout\(url, options = \{\}, timeoutMs = LLM_REQUEST_TIMEOUT_MS\)/, "요청별 시간 제한을 전달할 수 있어야 합니다.");
assert.match(app, /async function callClaude[\s\S]*?\}, options\.timeoutMs\);/, "Claude 훈련 안내에 별도 시간 제한을 적용해야 합니다.");
assert.doesNotMatch(app, /basicTrainingPrompt|koreanPatternMeaning|prompt\.isFallback/, "문법 표기를 임시 안내로 만들면 안 됩니다.");
console.log("Training prompt format tests passed");
