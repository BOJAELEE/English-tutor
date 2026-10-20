import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const app = fs.readFileSync(new URL("../web/app.js", import.meta.url), "utf8");
const start = app.indexOf("async function runGuidedPatternTask");
const end = app.indexOf("async function runPatternTask", start);
assert.ok(start >= 0 && end > start, "공통 훈련 흐름을 찾을 수 있어야 합니다.");

async function run(level, recognition = { text: "앞부분만 잘못 인식된 내용" }) {
  const spoken = [];
  const displayed = [];
  const checked = [];
  const prompt = {
    situation: "친구에게 평소 습관을 설명해요.",
    target_ko: "나는 보통 일요일에 장을 봐.",
    core_meaning: "일요일 장보기 습관",
    reason_ko: "평소 습관을 말할 때 빈도를 함께 전하는 표현입니다.",
  };
  const context = vm.createContext({
    state: { skip: false, back: false, quit: false },
    ui: {
      main: text => displayed.push(text),
      sub: text => displayed.push(text),
      trainingPrompt: () => {},
    },
    step: fn => fn(),
    getTrainingPrompt: async (...args) => {
      assert.equal(args[4], level === 1, "세션1만 설명을 준비해야 합니다.");
      return prompt;
    },
    trainingPromptText: () => "말할 문장: 나는 보통 일요일에 장을 봐.",
    speak: async (text, lang) => { spoken.push({ text, lang }); },
    listenWithRetry: async () => recognition,
    checkPattern: async (...args) => {
      checked.push(args);
      return { feedback_ko: "틀렸어요.", model_en: "Wrong answer." };
    },
    sanitizeFeedback: text => text,
    listenUntilResumed: async () => ({}),
    waitCancellable: async () => {},
    console,
  });
  vm.runInContext(app.slice(start, end) + "globalThis.__run = runGuidedPatternTask;", context);
  await context.__run({
    p: { num: 1, title: "tend to", examples: ["I tend to shop on Sundays."] },
    ex: "I tend to shop on Sundays.",
    exIdx: 0,
    trainingLevel: level,
    showTarget: true,
  });
  return { spoken, displayed, checked };
}

const session1 = await run(1);
assert.equal(session1.checked.length, 0, "세션1은 음성인식 원문을 채점하면 안 됩니다.");
assert.ok(session1.displayed.some(text => text.includes("평소 습관을 말할 때")));
assert.ok(session1.spoken.some(item => item.text.includes("평소 습관을 말할 때")));
assert.ok(session1.displayed.every(text => !text.includes("앞부분만 잘못 인식된 내용")));
assert.ok(session1.displayed.every(text => !text.includes("틀렸어요")));
assert.ok(session1.displayed.some(text => text.includes("최종 문장:\nI tend to shop on Sundays.")));

const unheard = await run(1, null);
assert.equal(unheard.checked.length, 0, "음성인식 결과가 없어도 세션1은 채점하면 안 됩니다.");
assert.ok(unheard.displayed.some(text => text.includes("평소 습관을 말할 때")));

const session2 = await run(2);
assert.equal(session2.checked.length, 1, "다른 세션의 채점은 유지해야 합니다.");
assert.ok(session2.displayed.some(text => text.includes("틀렸어요")));
console.log("Session 1 explanation tests passed");
