/**
 * Set the day of the month of the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified day of the month set.
 * - If the input date or day is invalid, returns `Invalid Date`.
 * - Fractions in `day` are truncated (e.g., 15.9 → 15, -15.9 → -15).
 * - Day values outside the valid range will cause date to roll over to adjacent months
 *   (e.g., setting day 32 in January results in February 1).
 *
 * @param date - The original date or timestamp.
 * @param day - The day of the month to set (1-31, fractions are truncated).
 * @returns A new `Date` object with the day set, or `Invalid Date` if input is invalid.
 */
export function setDay(date: Date | number, day: number): Date {
  if (!(date instanceof Date || typeof date === "number")) {
    return new Date(NaN);
  }
  if (!(typeof day === "number")) {
    return new Date(NaN);
  }

  const dt = new Date(date);

  if (isNaN(dt.getTime())) {
    return new Date(NaN);
  }

  const dayToSet = Math.trunc(day);

  dt.setDate(dayToSet);

  return dt;
}