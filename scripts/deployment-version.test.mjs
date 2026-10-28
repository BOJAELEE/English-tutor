import assert from "node:assert/strict";
import fs from "node:fs";

const version = fs.readFileSync(new URL("../web/version.js", import.meta.url), "utf8");
const index = fs.readFileSync(new URL("../web/index.html", import.meta.url), "utf8");
const app = fs.readFileSync(new URL("../web/app.js", import.meta.url), "utf8");
const worker = fs.readFileSync(new URL("../web/sw.js", import.meta.url), "utf8");
const workflow = fs.readFileSync(new URL("../.github/workflows/deploy.yml", import.meta.url), "utf8");

assert.match(version, /^self\.APP_VERSION = "v\d+";\s*$/, "배포 버전 형식이 올바르지 않습니다.");
assert.ok(index.indexOf('src="version.js"') < index.indexOf('src="app.js"'), "앱 실행 전에 버전을 먼저 불러와야 합니다.");
assert.match(worker, /importScripts\("version\.js"\)/, "서비스워커가 앱 버전을 읽어야 합니다.");
assert.match(worker, /const CACHE = "et-" \+ self\.APP_VERSION/, "버전 변경 시 새 캐시를 만들어야 합니다.");
assert.match(workflow, /path:\s*web/, "배포 작업은 web 폴더를 올려야 합니다.");
assert.match(index, /id="btn-home-day-prev"/, "홈 화면에 이전 Day 버튼이 필요합니다.");
assert.match(index, /id="btn-home-day-next"/, "홈 화면에 다음 Day 버튼이 필요합니다.");
assert.match(index, /id="btn-retry" class="ctl-btn hidden"/, "안내 실패 시 사용할 수동 재시도 버튼이 필요합니다.");
assert.match(app, /function moveHomeDay\(direction\)/, "홈 화면 Day 이동 처리가 필요합니다.");
assert.match(app, /LS\.progress = \{ day, pos: 0 \}/, "Day 이동 시 해당 Day의 첫 문제부터 시작해야 합니다.");
console.log("Deployment version checks passed");
