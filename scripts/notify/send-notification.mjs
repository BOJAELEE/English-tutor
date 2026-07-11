import webpush from "web-push";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { kstDateString, isHoliday } from "./holiday-utils.mjs";

export async function run({ today, holidayData, env, webpushSend }) {
  if (isHoliday(today, holidayData)) {
    return { sent: false, reason: "holiday", date: today };
  }

  const { VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, PUSH_SUBSCRIPTION } = env;
  const missing = ["VAPID_PUBLIC_KEY", "VAPID_PRIVATE_KEY", "PUSH_SUBSCRIPTION"]
    .filter(k => !env[k]);
  if (missing.length > 0) {
    throw new Error("필요한 환경변수가 설정되지 않았습니다: " + missing.join(", "));
  }

  const subscription = JSON.parse(PUSH_SUBSCRIPTION);
  const payload = JSON.stringify({ title: "영어회화 연습 시작", body: "영어회화 연습 시작" });
  await webpushSend(subscription, payload, {
    publicKey: VAPID_PUBLIC_KEY,
    privateKey: VAPID_PRIVATE_KEY,
  });
  return { sent: true, date: today };
}

async function realWebpushSend(subscription, payload, keys) {
  webpush.setVapidDetails("mailto:donravetop@gmail.com", keys.publicKey, keys.privateKey);
  await webpush.sendNotification(subscription, payload);
}

async function main() {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const holidayData = JSON.parse(
    readFileSync(join(__dirname, "..", "..", "data", "kr-holidays.json"), "utf8")
  );
  const today = kstDateString(new Date());
  const result = await run({
    today,
    holidayData,
    env: process.env,
    webpushSend: realWebpushSend,
  });
  console.log(JSON.stringify(result));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
