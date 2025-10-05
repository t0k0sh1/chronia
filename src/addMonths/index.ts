import { isValidDateOrNumber, isValidNumber } from "../_lib/validators";

/**
 * Add the specified number of months to the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified number of months added. Fractional months are truncated toward zero.
 * Preserves time components (hours, minutes, seconds, milliseconds). When the day of month
 * doesn't exist in the target month, the result becomes the last day of that month.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param amount - The number of months to add (can be negative to subtract)
 * @returns A new Date object with the months added, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Add positive months
 * const result = addMonths(new Date(2020, 0, 15), 3);
 * // Returns: 2020-04-15
 *
 * // Subtract months (negative amount)
 * const result = addMonths(new Date(2020, 5, 15), -2);
 * // Returns: 2020-04-15
 *
 * // Fractional amounts are truncated
 * const result = addMonths(new Date(2020, 0, 15), 1.9);
 * // Returns: 2020-02-15 (1.9 truncated to 1)
 *
 * // Month-end overflow handling (Jan 31 → Feb 28/29)
 * const result = addMonths(new Date(2025, 0, 31), 1);
 * // Returns: 2025-02-28 (Feb doesn't have 31 days)
 *
 * // Leap year handling
 * const result = addMonths(new Date(2024, 0, 31), 1);
 * // Returns: 2024-02-29 (2024 is a leap year)
 *
 * // Invalid inputs return Invalid Date
 * const result = addMonths(new Date("invalid"), 3);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (1.9 → 1, -1.9 → -1)
 * - Preserves time components (hours, minutes, seconds, milliseconds)
 * - Month-end overflow: if original day doesn't exist in target month, returns last day of that month
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Always returns a new Date instance (does not mutate input)
 */
export function addMonths(date: Date | number, amount: number): Date {
  if (!isValidDateOrNumber(date) || !isValidNumber(amount))
    return new Date(NaN);

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
