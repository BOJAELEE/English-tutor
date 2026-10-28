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
  "const MAX_TRAINING_SITUATION_LENGTH = 28; const MAX_TRAINING_REASON_LENGTH = 35;" + app.slice(jsonStart, jsonEnd) + app.slice(trainingStart, trainingEnd)
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
assert.equal(
  context.__parseTrainingPrompt(JSON.stringify({ ...expected, reason_ko: "come over는 누군가가 다른 사람의 집을 방문하는 상황을 매우 구체적으로 설명할 때 사용하는 표현입니다." }), true, true, true),
  null,
  "긴 설명은 문장 중간을 자르지 말고 새로 생성해야 합니다."
);
assert.equal(
  context.__parseTrainingPrompt(JSON.stringify({ ...expected, reason_ko: "come over는 집에 놀러 갈 때 씁니다…" }), true, true, true),
  null,
  "말줄임표로 끝난 설명은 완전한 문장이 아닙니다."
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
assert.match(app, /reason_ko는 35자 이내의 한국어 설명 속에 근거가 되는 짧은 영어 표현/, "단어별 설명은 짧은 영어 표현을 인용해야 합니다.");

const examples = [
  "Do you want to come over for dinner?",
  "A few friends are coming over tonight.",
  "Thanks for coming over on such short notice.",
];
const requests = [];
const tokenBudgets = [];
const savedKeys = [];
let exampleIndex = 0;
const cache = { training_v10_short_t1_reason_v3_p1_e0: { ...expected, target_en: examples[0], reason_ko: "기존의 긴 설명" } };
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
  "const MAX_TRAINING_SITUATION_LENGTH = 28; const MAX_TRAINING_REASON_LENGTH = 35; const TRAINING_REQUEST_TIMEOUT_MS = 30000; const TRAINING_PROMPT_SYSTEM = ''; const SYSTEM_PROMPT = '';"
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
assert.ok(requests.every(request => request.includes("35자 이내")), "세션1의 설명은 짧게 요청해야 합니다.");
assert.ok(requests.every(request => request.includes("긴 절은 인용하지 마세요")), "설명이 정답 문장을 길게 반복하면 안 됩니다.");
assert.ok(requests.every(request => request.includes("문장을 자르거나 말줄임표를 쓰지 마세요")), "짧은 설명을 새 문장으로 작성해야 합니다.");
assert.ok(savedKeys.every(key => key.includes("_reason_v6")), "설명 실패를 분리한 안내는 이전 캐시와 구분해야 합니다.");

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
  "const MAX_TRAINING_SITUATION_LENGTH = 28; const MAX_TRAINING_REASON_LENGTH = 35; const TRAINING_REQUEST_TIMEOUT_MS = 30000; const TRAINING_PROMPT_SYSTEM = ''; const SYSTEM_PROMPT = '';"
    + app.slice(jsonStart, jsonEnd) + app.slice(trainingStart, trainingTextStart)
    + "globalThis.__getTrainingPrompt = getTrainingPrompt;",
  retryContext
);
await retryContext.__getTrainingPrompt({ num: 1, title: "Come over (놀러 오다).", examples }, 0, true, true, true);
assert.equal(retryRequests.length, 2, "안내문 형식 오류에는 같은 예문을 한 번 더 요청해야 합니다.");
assert.match(retryRequests[1], /이전 응답/, "재요청은 무엇을 고칠지 명시해야 합니다.");

const lengthRetryRequests = [];
const lengthRetryContext = vm.createContext({
  LS: { cache: {}, cacheSet: () => {} },
  callLLM: async request => {
    lengthRetryRequests.push(request);
    const reason_ko = lengthRetryRequests.length === 1
      ? "come over는 누군가가 다른 사람의 집을 방문하는 상황을 매우 구체적으로 설명할 때 사용하는 표현입니다."
      : "come over는 집에 놀러 갈 때 씁니다.";
    return JSON.stringify({ ...expected, target_en: examples[0], reason_ko });
  },
  state: { skip: false, back: false, quit: false },
  console,
});
vm.runInContext(
  "const MAX_TRAINING_SITUATION_LENGTH = 28; const MAX_TRAINING_REASON_LENGTH = 35; const TRAINING_REQUEST_TIMEOUT_MS = 30000; const TRAINING_PROMPT_SYSTEM = ''; const SYSTEM_PROMPT = '';"
    + app.slice(jsonStart, jsonEnd) + app.slice(trainingStart, trainingTextStart)
    + "globalThis.__getTrainingPrompt = getTrainingPrompt;",
  lengthRetryContext
);
const rewritten = await lengthRetryContext.__getTrainingPrompt({ num: 1, title: "Come over (놀러 오다).", examples }, 0, true, true, true);
assert.equal(lengthRetryRequests.length, 2, "35자 초과 설명은 같은 문제에서 짧은 새 문장으로 다시 작성해야 합니다.");
assert.equal(rewritten.reason_ko, "come over는 집에 놀러 갈 때 씁니다.", "완성된 새 문장을 사용해야 합니다.");
assert.match(lengthRetryRequests[1], /잘라내지 말고/, "재요청도 문장 중간을 자르지 않도록 안내해야 합니다.");
assert.doesNotMatch(lengthRetryRequests[1], /"target_en"/, "설명 재작성 때문에 정상 질문 전체를 다시 생성하면 안 됩니다.");

async function requestWithResponses(responses, cache = {}, state = {}, pattern = { num: 1, title: "Come over (놀러 오다).", examples }, exIdx = 0) {
  const requests = [];
  const options = [];
  const saved = [];
  const testContext = vm.createContext({
    LS: { cache, cacheSet: (key, value) => saved.push({ key, value }) },
    callLLM: async (request, _tokens, _system, requestOptions) => {
      requests.push(request);
      options.push(requestOptions);
      assert.ok(requests.length <= responses.length, "정해진 요청 수를 초과하면 안 됩니다.");
      const response = responses[requests.length - 1];
      if (response instanceof Error) throw response;
      return JSON.stringify(response);
    },
    state,
    console: { warn: () => {} },
  });
  vm.runInContext(
    "const MAX_TRAINING_SITUATION_LENGTH = 28; const MAX_TRAINING_REASON_LENGTH = 35; const TRAINING_REQUEST_TIMEOUT_MS = 30000; const TRAINING_PROMPT_SYSTEM = ''; const SYSTEM_PROMPT = '';"
      + app.slice(jsonStart, jsonEnd) + app.slice(trainingStart, trainingTextStart)
      + "globalThis.__getTrainingPrompt = getTrainingPrompt;",
    testContext
  );
  const result = await testContext.__getTrainingPrompt(pattern, exIdx, true, true, true);
  return { result, requests, saved, options };
}
const longReason = { ...expected, target_en: examples[0], reason_ko: "come over는 누군가가 다른 사람의 집을 방문하는 상황을 매우 구체적으로 설명할 때 사용하는 표현입니다." };
for (const failedRewrite of [{ reason_ko: longReason.reason_ko }, {}, new Error("API 시간 초과")]) {
  const failed = await requestWithResponses([longReason, failedRewrite]);
  assert.equal(failed.requests.length, 2, "설명은 한 번만 다시 작성해야 합니다.");
  assert.equal(failed.result.target_en, examples[0], "정상 질문을 유지해야 합니다.");
  assert.equal(failed.result.target_ko, expected.target_ko);
  assert.equal(failed.result.reason_ko, "", "재작성 실패 시 긴 설명을 자르거나 재생하지 말고 생략해야 합니다.");
  assert.equal(failed.saved.length, 1, "정상 질문은 설명 실패 뒤에도 저장해야 합니다.");
  assert.equal(failed.options[1].retryTransient, false, "설명 재작성 요청은 통신 실패에도 반복하지 않아야 합니다.");
  assert.equal(failed.options[1].timeoutMs, 10000, "선택적인 설명 때문에 오래 기다리면 안 됩니다.");
}
const patternContext = vm.createContext({});
vm.runInContext(fs.readFileSync(new URL("../web/patterns.js", import.meta.url), "utf8") + ";globalThis.__patterns=PATTERNS;", patternContext);
const day28Pattern = patternContext.__patterns[54];
assert.equal(day28Pattern.title, "Hang up (전화를 끊다).");
const day28 = await requestWithResponses([
  { ...expected, target_en: day28Pattern.examples[1], reason_ko: "before I could explain은 설명할 기회도 없었다는 뜻을 나타내므로 씁니다." },
  { reason_ko: "before I could explain은 설명할 기회도 없었다는 뜻을 나타내므로 씁니다." },
], {}, {}, day28Pattern, 1);
assert.equal(day28.requests.length, 2, "Day 28 두 번째 문제의 설명 실패가 무한 반복되면 안 됩니다.");
assert.equal(day28.result.target_en, "She hung up before I could explain.");
assert.equal(day28.result.reason_ko, "");
const cachedBase = { training_v10_short_t1_reason_v6_p1_e0: { ...longReason, reason_ko: "" } };
const restored = await requestWithResponses([{ reason_ko: "come over는 집에 놀러 갈 때 씁니다." }], cachedBase);
assert.equal(restored.requests.length, 1, "캐시된 정상 질문은 유지하고 빠진 설명만 다시 준비해야 합니다.");
assert.doesNotMatch(restored.requests[0], /"target_en"/);
await assert.rejects(requestWithResponses([{}, {}]), error => error.promptRetry === true, "질문 자체가 잘못된 경우에만 수동 재시도를 요청해야 합니다.");
await assert.rejects(requestWithResponses([longReason, Object.assign(new Error("취소"), { cancelled: true })]), error => error.cancelled === true, "제어 버튼 취소를 설명 생략으로 숨기면 안 됩니다.");
const llmStart = app.indexOf("async function callLLM(");
const llmEnd = app.indexOf("/* 키에서", llmStart);
let transportAttempts = 0;
const llmContext = vm.createContext({
  SYSTEM_PROMPT: "", LS: { engine: "claude" },
  callClaude: async () => { transportAttempts++; throw Object.assign(new Error("일시 오류"), { status: 429 }); },
  waitBeforeLlmRetry: async () => {},
});
vm.runInContext(app.slice(llmStart, llmEnd) + ";globalThis.__call=callLLM;", llmContext);
await assert.rejects(llmContext.__call("설명", 160, "", { retryTransient: false }));
assert.equal(transportAttempts, 1, "설명 재작성의 재시도 금지 옵션을 실제 통신 경로도 지켜야 합니다.");
transportAttempts = 0;
await assert.rejects(llmContext.__call("질문", 600));
assert.equal(transportAttempts, 2, "기존 질문 통신의 일시 오류 재시도는 유지해야 합니다.");
assert.match(app, /responseJson: true/, "훈련 안내 요청은 JSON 응답을 요청해야 합니다.");
assert.match(app, /function fetchWithTimeout\(url, options = \{\}, timeoutMs = LLM_REQUEST_TIMEOUT_MS\)/, "요청별 시간 제한을 전달할 수 있어야 합니다.");
assert.match(app, /async function callClaude[\s\S]*?\}, options\.timeoutMs\);/, "Claude 훈련 안내에 별도 시간 제한을 적용해야 합니다.");
assert.doesNotMatch(app, /basicTrainingPrompt|koreanPatternMeaning|prompt\.isFallback/, "문법 표기를 임시 안내로 만들면 안 됩니다.");
console.log("Training prompt format tests passed");
