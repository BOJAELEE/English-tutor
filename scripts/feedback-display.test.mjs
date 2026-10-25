import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const app = fs.readFileSync(new URL("../web/app.js", import.meta.url), "utf8");
const start = app.indexOf("function sanitizeFeedback");
const end = app.indexOf("async function checkPattern", start);
assert.ok(start >= 0 && end > start, "피드백 정리 함수를 찾을 수 있어야 합니다.");

const context = vm.createContext({});
vm.runInContext(app.slice(start, end) + "globalThis.__sanitizeFeedback = sanitizeFeedback;", context);

const feedback = '"happen to"를 사용하면 "I happen to have an extra phone charger"는 우연히 충전기를 가지고 있다는 뜻입니다.';
assert.equal(context.__sanitizeFeedback(feedback), feedback, "설명은 길어도 문장 중간에서 잘리지 않아야 합니다.");
assert.equal(context.__sanitizeFeedback("좋아요."), "좋아요.");
console.log("Feedback display tests passed");
