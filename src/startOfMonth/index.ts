import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Get the start of the month for the given date.
 *
 * This function returns a new Date object set to the first day of the month at 00:00:00.000
 * for the given date. The year and month remain the same while the day is set to 1 and
 * all time components are reset to zero.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @returns A new Date object set to the first day of the month at 00:00:00.000, or Invalid Date if input is invalid
 *
 * @example
 * ```typescript
 * // Get start of month from mid-month
 * const result = startOfMonth(new Date(2024, 5, 15, 14, 30, 45));
 * // Returns: June 1, 2024 00:00:00.000
 *
 * // Works with last day of month
 * const result2 = startOfMonth(new Date(2024, 5, 30, 23, 59, 59));
 * // Returns: June 1, 2024 00:00:00.000
 *
 * // Works with timestamps
 * const timestamp = Date.now();
 * const result3 = startOfMonth(timestamp);
 * // Returns: First day of current month at 00:00:00.000
 *
 * // Handles leap year February
 * const result4 = startOfMonth(new Date(2024, 1, 29));
 * // Returns: February 1, 2024 00:00:00.000
 *
 * // Invalid inputs return Invalid Date
 * const result5 = startOfMonth(NaN);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Always returns a new Date instance (does not mutate input)
 * - Sets day to 1 and resets hours, minutes, seconds, and milliseconds to 0
 */
export function startOfMonth(date: Date | number): Date {
  if (!isValidDateOrNumber(date)) {
    return new Date(NaN);
  }
  const dt = new Date(date);
  return new Date(
    dt.getFullYear(),
    dt.getMonth(),
    1, // First day of the month
    0, // 00:00:00.000
    0,
    0,
    0
  );
}