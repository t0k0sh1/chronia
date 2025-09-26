import { isValidDateOrNumber, isValidNumber } from "../_lib/validators";

/**
 * Add the specified number of hours to the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified number of hours added.
 * - If the input date or amount is invalid, returns `Invalid Date`.
 * - Fractions in `amount` are truncated (e.g., 1.9 → 1, -1.9 → -1).
 *
 * @param date - The original date or timestamp.
 * @param amount - The number of hours to add (fractions are truncated).
 * @returns A new `Date` object with the hours added, or `Invalid Date` if input is invalid.
 */
export function addHours(date: Date | number, amount: number): Date {
  if (!isValidDateOrNumber(date)) {
    return new Date(NaN);
  }
  if (!isValidNumber(amount)) {
    return new Date(NaN);
  }

  const dt = new Date(date);

  const hoursToAdd = Math.trunc(amount);
  dt.setHours(dt.getHours() + hoursToAdd);
  return dt;
}