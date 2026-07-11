import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { kstDateString, isHoliday } from "./holiday-utils.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const holidayData = JSON.parse(
  readFileSync(join(__dirname, "..", "..", "data", "kr-holidays.json"), "utf8")
);

test("kstDateString converts UTC midnight to KST date (9 hours ahead)", () => {
  // 2026-07-12T00:00:00Z (UTC) -> 2026-07-12T09:00:00 KST
  assert.equal(kstDateString(new Date("2026-07-12T00:00:00Z")), "2026-07-12");
});

test("kstDateString rolls over to next day near midnight UTC", () => {
  // 2026-07-12T15:30:00Z (UTC) -> 2026-07-13T00:30:00 KST
  assert.equal(kstDateString(new Date("2026-07-12T15:30:00Z")), "2026-07-13");
});

test("isHoliday returns true for a known 2026 holiday (Chuseok)", () => {
  assert.equal(isHoliday("2026-09-25", holidayData), true);
});

test("isHoliday returns true for a substitute holiday (개천절 대체공휴일)", () => {
  assert.equal(isHoliday("2026-10-05", holidayData), true);
});

test("isHoliday returns false for a plain weekday", () => {
  assert.equal(isHoliday("2026-07-13", holidayData), false);
});

test("isHoliday returns false for a date not in the list at all (2028)", () => {
  assert.equal(isHoliday("2028-01-01", holidayData), false);
});
