/**
 * Set the minutes of the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified minutes set.
 * - If the input date or minutes is invalid, returns `Invalid Date`.
 * - Fractions in `minutes` are truncated (e.g., 30.9 → 30, -30.9 → -30).
 * - Minutes values outside 0-59 will cause date to roll over to adjacent hours.
 *
 * @param date - The original date or timestamp.
 * @param minutes - The minutes to set (0-59, fractions are truncated).
 * @returns A new `Date` object with the minutes set, or `Invalid Date` if input is invalid.
 */
export function setMinutes(date: Date | number, minutes: number): Date {
  if (!(date instanceof Date || typeof date === "number")) {
    return new Date(NaN);
  }
  if (!(typeof minutes === "number")) {
    return new Date(NaN);
  }

  const dt = new Date(date);

  if (isNaN(dt.getTime())) {
    return new Date(NaN);
  }

  const minutesToSet = Math.trunc(minutes);

  dt.setMinutes(minutesToSet);

  return dt;
}