import { isValidDateOrNumber, isValidNumber } from "../_lib/validators";

/**
 * Add the specified number of years to the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified number of years added.
 * - If the input date or amount is invalid, returns `Invalid Date`.
 * - Fractions in `amount` are truncated (e.g., 1.9 → 1, -1.9 → -1).
 * - Leap year adjustment: if the original date is Feb 29 and the target year
 *   is not a leap year, the result becomes Feb 28.
 *
 * @param date - The original date or timestamp.
 * @param amount - The number of years to add (fractions are truncated).
 * @returns A new `Date` object with the years added, or `Invalid Date` if input is invalid.
 */
export function addYears(date: Date | number, amount: number): Date {
  if (!isValidDateOrNumber(date)) {
    return new Date(NaN);
  }
  if (!isValidNumber(amount)) {
    return new Date(NaN);
  }

  const dt = new Date(date);
  const yearToAdd = Math.trunc(amount);
  const originalMonth = dt.getMonth();
  const originalDay = dt.getDate();

  dt.setFullYear(dt.getFullYear() + yearToAdd);

  if (originalMonth === 1 && originalDay === 29 && dt.getMonth() !== 1) {
    dt.setMonth(1, 28);
  }

  return dt;
}
