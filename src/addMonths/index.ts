import { isValidDateOrNumber, isValidNumber } from "../_lib/validators";

/**
 * Add the specified number of months to the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` with the specified months added.
 * - If the input date or amount is invalid, returns `Invalid Date`.
 * - Fractions in `amount` are truncated (e.g., 1.9 → 1, -1.9 → -1).
 * - Handles month-end adjustment: if the original day does not exist in the target month,
 *   the result becomes the last day of that month.
 *
 * @param date - The original date or timestamp.
 * @param amount - The number of months to add (fractions are truncated).
 * @returns A new `Date` object with the months added, or `Invalid Date` if input is invalid.
 */
export function addMonths(date: Date | number, amount: number): Date {
  if (!isValidDateOrNumber(date)) {
    return new Date(NaN);
  }
  if (!isValidNumber(amount)) {
    return new Date(NaN);
  }

  const dt = new Date(date);
  const originalDay = dt.getDate();

  const monthsToAdd = Math.trunc(amount);
  dt.setMonth(dt.getMonth() + monthsToAdd);

  // Adjust for month-end: if overflowed, set to the last day of the intended month
  if (dt.getDate() !== originalDay) {
    dt.setDate(0);
  }

  return dt;
}
