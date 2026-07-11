import { test } from "node:test";
import assert from "node:assert/strict";
import { run } from "./send-notification.mjs";

const holidayData = { holidays: [{ date: "2026-10-05", name: "개천절 대체공휴일" }] };

test("run skips sending on a holiday", async () => {
  let called = false;
  const result = await run({
    today: "2026-10-05",
    holidayData,
    env: { VAPID_PUBLIC_KEY: "pub", VAPID_PRIVATE_KEY: "priv", PUSH_SUBSCRIPTION: "{}" },
    webpushSend: async () => { called = true; },
  });
  assert.equal(result.sent, false);
  assert.equal(result.reason, "holiday");
  assert.equal(called, false);
});

test("run sends on a non-holiday weekday with correct payload", async () => {
  let capturedArgs = null;
  const result = await run({
    today: "2026-10-06",
    holidayData,
    env: { VAPID_PUBLIC_KEY: "pub", VAPID_PRIVATE_KEY: "priv", PUSH_SUBSCRIPTION: '{"endpoint":"https://example.com/x"}' },
    webpushSend: async (subscription, payload, keys) => {
      capturedArgs = { subscription, payload, keys };
    },
  });
  assert.equal(result.sent, true);
  assert.deepEqual(capturedArgs.subscription, { endpoint: "https://example.com/x" });
  const payload = JSON.parse(capturedArgs.payload);
  assert.equal(payload.title, "영어회화 연습 시작");
  assert.equal(payload.body, "영어회화 연습 시작");
  assert.equal(capturedArgs.keys.publicKey, "pub");
  assert.equal(capturedArgs.keys.privateKey, "priv");
});

test("run throws a clear error when a required env var is missing", async () => {
  await assert.rejects(
    () => run({
      today: "2026-10-06",
      holidayData,
      env: { VAPID_PUBLIC_KEY: "pub", VAPID_PRIVATE_KEY: "", PUSH_SUBSCRIPTION: "{}" },
      webpushSend: async () => {},
    }),
    /VAPID_PRIVATE_KEY/
  );
});
