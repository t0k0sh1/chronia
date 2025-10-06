import { isValidDateOrNumber, isValidNumber } from "../_lib/validators";

/**
 * Set the month of the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified month set. Fractional months are truncated toward zero.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param month - The month to set (0-indexed: 0 = January, 11 = December)
 * @returns A new Date object with the month set, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Set month to June
 * const result = setMonth(new Date(2025, 0, 15), 5);
 * // Returns: 2025-06-15
 *
 * // Set month to January
 * const result2 = setMonth(new Date(2025, 5, 15), 0);
 * // Returns: 2025-01-15
 *
 * // Day overflow adjustment (Jan 31 → Feb 28)
 * const result3 = setMonth(new Date(2025, 0, 31), 1);
 * // Returns: 2025-02-28 (non-leap year)
 *
 * // Fractional month is truncated
 * const result4 = setMonth(new Date(2025, 0, 15), 5.9);
 * // Returns: 2025-06-15
 *
 * // Invalid date returns Invalid Date
 * const result5 = setMonth(new Date("invalid"), 5);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (5.9 → 5, -1.9 → -1)
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Preserves year, day, and time components (hours, minutes, seconds, milliseconds)
 * - Special handling: When the original day doesn't exist in the target month (e.g., Jan 31 → Feb), adjusts to the last valid day of the month (Feb 28 or 29)
 * - Always returns a new Date instance (does not mutate input)
 */
export function setMonth(date: Date | number, month: number): Date {
  if (!isValidDateOrNumber(date)) {
    return new Date(NaN);
  }
  if (!isValidNumber(month)) {
    return new Date(NaN);
  }

  const dt = new Date(date);

  const monthToSet = Math.trunc(month);

  // Store the original day to detect if it was adjusted
  const originalDay = dt.getDate();

  // Set the month, which may adjust the day if it's invalid for that month
  dt.setMonth(monthToSet);

  // If the day was adjusted (e.g., Jan 31 -> Feb 31 becomes Mar 3),
  // we need to go back to the last day of the target month
  if (dt.getDate() !== originalDay && originalDay > 28) {
    // Set to day 0 of the next month (= last day of target month)
    dt.setDate(0);
  }

  return dt;
}