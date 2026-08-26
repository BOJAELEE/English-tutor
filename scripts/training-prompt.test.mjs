import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const app = fs.readFileSync(new URL("../web/app.js", import.meta.url), "utf8");
const jsonStart = app.indexOf("function parseJson");
const jsonEnd = app.indexOf("/* 세션1:", jsonStart);
const trainingStart = app.indexOf("/* 훈련 안내문", jsonEnd);
const trainingEnd = app.indexOf("async function getTrainingPrompt", trainingStart);

assert.ok(jsonStart >= 0 && jsonEnd > jsonStart, "JSON 파서 구간을 찾을 수 있어야 합니다.");
assert.ok(trainingStart >= 0 && trainingEnd > trainingStart, "훈련 안내 파서 구간을 찾을 수 있어야 합니다.");

const context = vm.createContext({});
vm.runInContext(
  app.slice(jsonStart, jsonEnd) + app.slice(trainingStart, trainingEnd)
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

const fromText = context.__parseTrainingPrompt(
  `- 원문: ${target}\n- 상황: 일요일마다 장을 보는 평소 습관을 말하는 상황입니다.\n- 문장: 나는 보통 일요일에 장을 봐.\n- 핵심: 일요일 장보기 습관`,
  true
);
assert.equal(fromText.target_en, target, "기존 네 줄 형식도 계속 읽어야 합니다.");

assert.match(app, /const TRAINING_REQUEST_TIMEOUT_MS = 30000/, "훈련 안내에는 별도 대기 시간이 필요합니다.");
assert.match(app, /responseJson: true/, "훈련 안내 요청은 JSON 응답을 요청해야 합니다.");
assert.match(app, /function fetchWithTimeout\(url, options = \{\}, timeoutMs = LLM_REQUEST_TIMEOUT_MS\)/, "요청별 시간 제한을 전달할 수 있어야 합니다.");
assert.match(app, /async function callClaude[\s\S]*?\}, options\.timeoutMs\);/, "Claude 훈련 안내에 별도 시간 제한을 적용해야 합니다.");
assert.doesNotMatch(app, /basicTrainingPrompt|koreanPatternMeaning|prompt\.isFallback/, "문법 표기를 임시 안내로 만들면 안 됩니다.");
console.log("Training prompt format tests passed");
