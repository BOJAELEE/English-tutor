export function kstDateString(date) {
  const kst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
}

export function isHoliday(dateStr, holidayData) {
  return holidayData.holidays.some(h => h.date === dateStr);
}
