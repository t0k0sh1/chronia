/**
 * Set the year of the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified year set.
 * - If the input date or year is invalid, returns `Invalid Date`.
 * - Fractions in `year` are truncated (e.g., 2023.9 → 2023, -2023.9 → -2023).
 * - Leap year adjustment: if the original date is Feb 29 and the target year
 *   is not a leap year, the result becomes Feb 28.
 *
 * @param date - The original date or timestamp.
 * @param year - The year to set (fractions are truncated).
 * @returns A new `Date` object with the year set, or `Invalid Date` if input is invalid.
 */
export function setYear(date: Date | number, year: number): Date {
  if (!(date instanceof Date || typeof date === "number")) {
    return new Date(NaN);
  }
  if (!(typeof year === "number")) {
    return new Date(NaN);
  }

  const dt = new Date(date);

  if (isNaN(dt.getTime())) {
    return new Date(NaN);
  }

  const yearToSet = Math.trunc(year);

  const originalMonth = dt.getMonth();
  const originalDay = dt.getDate();

  dt.setFullYear(yearToSet);

  // Handle leap year adjustment for Feb 29
  if (originalMonth === 1 && originalDay === 29 && dt.getMonth() !== 1) {
    dt.setMonth(1, 28);
  }

  return dt;
}