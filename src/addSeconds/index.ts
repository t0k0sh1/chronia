/**
 * Add the specified number of seconds to the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified number of seconds added.
 * - If the input date or amount is invalid, returns `Invalid Date`.
 * - Fractions in `amount` are truncated (e.g., 1.9 → 1, -1.9 → -1).
 *
 * @param date - The original date or timestamp.
 * @param amount - The number of seconds to add (fractions are truncated).
 * @returns A new `Date` object with the seconds added, or `Invalid Date` if input is invalid.
 */
export function addSeconds(date: Date | number, amount: number): Date {
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

  const secondsToAdd = Math.trunc(amount);
  dt.setSeconds(dt.getSeconds() + secondsToAdd);
  return dt;
}