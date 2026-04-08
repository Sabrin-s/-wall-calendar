/**
 * Returns number of days in a given month/year.
 */
export function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Returns the 0-based weekday of the 1st of the month (0=Sunday).
 */
export function firstWeekdayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

/**
 * Serialise a date to a compact string key.
 */
export function toKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/**
 * Parse a key back to { year, month (0-based), day }.
 */
export function fromKey(key) {
  const [y, m, d] = key.split("-").map(Number);
  return { year: y, month: m - 1, day: d };
}

/**
 * Compare two keys as dates. Returns negative, 0, or positive.
 */
export function compareKeys(a, b) {
  return new Date(...Object.values(fromKey(a)).map((v, i) => i === 1 ? v : v))
    - new Date(...Object.values(fromKey(b)).map((v, i) => i === 1 ? v : v));
}

/**
 * Returns true if dayKey is strictly between startKey and endKey.
 */
export function isBetween(dayKey, startKey, endKey) {
  if (!startKey || !endKey) return false;
  const [lo, hi] = compareKeys(startKey, endKey) <= 0
    ? [startKey, endKey]
    : [endKey, startKey];
  return dayKey > lo && dayKey < hi;
}

/**
 * Nice short format: "Apr 3"
 */
export function shortDate(key) {
  const { year, month, day } = fromKey(key);
  return new Date(year, month, day).toLocaleDateString("en-US", {
    month: "short", day: "numeric",
  });
}

/**
 * Number of calendar days between two keys (inclusive).
 */
export function daysBetween(startKey, endKey) {
  const a = fromKey(startKey), b = fromKey(endKey);
  const diff = Math.abs(
    new Date(b.year, b.month, b.day) - new Date(a.year, a.month, a.day)
  );
  return Math.round(diff / 86_400_000) + 1;
}

/**
 * Today's key.
 */
export function todayKey() {
  const n = new Date();
  return toKey(n.getFullYear(), n.getMonth(), n.getDate());
}

/**
 * Holiday lookup key: "M-D" (no zero-padding).
 */
export function holidayKey(month, day) {
  return `${month + 1}-${day}`;
}
