/**
 * Add the specified number of milliseconds to the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified number of milliseconds added.
 * - If the input date or amount is invalid, returns `Invalid Date`.
 * - Fractions in `amount` are truncated (e.g., 1.9 → 1, -1.9 → -1).
 *
 * @param date - The original date or timestamp.
 * @param amount - The number of milliseconds to add (fractions are truncated).
 * @returns A new `Date` object with the milliseconds added, or `Invalid Date` if input is invalid.
 */
export function addMilliseconds(date: Date | number, amount: number): Date {
  if (!(date instanceof Date || typeof date === "number")) {
    return new Date(NaN);
  }
  if (!(typeof amount === "number")) {
    return new Date(NaN);
  }

  const dt = new Date(date);

  if (isNaN(dt.getTime())) {
    return new Date(NaN);
  }

  const millisecondsToAdd = Math.trunc(amount);
  dt.setMilliseconds(dt.getMilliseconds() + millisecondsToAdd);
  return dt;
}