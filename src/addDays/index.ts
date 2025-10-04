import { isValidDateOrNumber, isValidNumber } from "../_lib/validators";

/**
 * Add the specified number of days to the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified number of days added.
 * - If the input date or amount is invalid, returns `Invalid Date`.
 * - Fractions in `amount` are truncated (e.g., 1.9 → 1, -1.9 → -1).
 *
 * @param date - The original date or timestamp.
 * @param amount - The number of days to add (fractions are truncated).
 * @returns A new `Date` object with the days added, or `Invalid Date` if input is invalid.
 */
export function addDays(date: Date | number, amount: number): Date {
  if (!isValidDateOrNumber(date) || !isValidNumber(amount))
    return new Date(NaN);

  const dt = new Date(date);
  const daysToAdd = Math.trunc(amount);

  dt.setDate(dt.getDate() + daysToAdd);
  return dt;
}
