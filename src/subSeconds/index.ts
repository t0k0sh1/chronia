import { addSeconds } from "../addSeconds";
import { isValidNumber } from "../_lib/validators";

/**
 * Subtract the specified number of seconds from the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified number of seconds subtracted.
 * - If the input date or amount is invalid, returns `Invalid Date`.
 * - Fractions in `amount` are truncated (e.g., 1.9 → 1, -1.9 → -1).
 *
 * @param date - The original date or timestamp.
 * @param amount - The number of seconds to subtract (fractions are truncated).
 * @returns A new `Date` object with the seconds subtracted, or `Invalid Date` if input is invalid.
 */
export function subSeconds(date: Date | number, amount: number): Date {
  if (!isValidNumber(amount)) {
    return new Date(NaN);
  }
  return addSeconds(date, -amount);
}