import { addMonths } from "../addMonths";

/**
 * Subtract the specified number of months from the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified number of months subtracted.
 * - If the input date or amount is invalid, returns `Invalid Date`.
 * - Fractions in `amount` are truncated (e.g., 1.9 → 1, -1.9 → -1).
 * - Month-end adjustment: if the original date has a day that doesn't exist
 *   in the target month (e.g., Mar 31 - 1 month), adjusts to the last valid day.
 *
 * @param date - The original date or timestamp.
 * @param amount - The number of months to subtract (fractions are truncated).
 * @returns A new `Date` object with the months subtracted, or `Invalid Date` if input is invalid.
 */
export function subMonths(date: Date | number, amount: number): Date {
  return addMonths(date, -amount);
}