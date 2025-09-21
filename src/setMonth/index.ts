/**
 * Set the month of the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified month set.
 * - If the input date or month is invalid, returns `Invalid Date`.
 * - Fractions in `month` are truncated (e.g., 1.9 → 1, -1.9 → -1).
 * - Month is 0-indexed (0 = January, 11 = December).
 * - Day adjustment: if the original day doesn't exist in the target month
 *   (e.g., Jan 31 → Feb), adjusts to the last valid day of the month.
 *
 * @param date - The original date or timestamp.
 * @param month - The month to set (0-11, fractions are truncated).
 * @returns A new `Date` object with the month set, or `Invalid Date` if input is invalid.
 */
export function setMonth(date: Date | number, month: number): Date {
  if (!(date instanceof Date || typeof date === "number")) {
    return new Date(NaN);
  }
  if (!(typeof month === "number")) {
    return new Date(NaN);
  }

  const dt = new Date(date);

  if (isNaN(dt.getTime())) {
    return new Date(NaN);
  }

  const monthToSet = Math.trunc(month);

  // Store the original day to detect if it was adjusted
  const originalDay = dt.getDate();

  // Set the month, which may adjust the day if it's invalid for that month
  dt.setMonth(monthToSet);

  // If the day was adjusted (e.g., Jan 31 -> Feb 31 becomes Mar 3),
  // we need to go back to the last day of the target month
  if (dt.getDate() !== originalDay && originalDay > 28) {
    // Set to day 0 of the next month (= last day of target month)
    dt.setDate(0);
  }

  return dt;
}