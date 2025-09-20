import { addYears } from "../addYears";

/**
 * Subtract the specified number of years from the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified number of years subtracted.
 * - If the input date or amount is invalid, returns `Invalid Date`.
 * - Fractions in `amount` are truncated (e.g., 1.9 → 1, -1.9 → -1).
 * - Leap year adjustment: if the original date is Feb 29 and the target year
 *   is not a leap year, the result becomes Feb 28.
 *
 * @param date - The original date or timestamp.
 * @param amount - The number of years to subtract (fractions are truncated).
 * @returns A new `Date` object with the years subtracted, or `Invalid Date` if input is invalid.
 */
export function subYears(date: Date | number, amount: number): Date {
  if (!(date instanceof Date || typeof date === "number")) {
    return new Date(NaN);
  }
  if (!(typeof amount === "number")) {
    return new Date(NaN);
  }
  return addYears(date, -amount);
}