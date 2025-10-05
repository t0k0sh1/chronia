import { truncateToUnit } from "../_lib/truncateToUnit";
import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Truncate a date to the start of the month.
 *
 * This function sets the date to the 1st day of the month at 00:00:00.000,
 * effectively removing all time components and resetting the day to 1.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @returns A new Date object truncated to the start of the month, or Invalid Date if input is invalid
 *
 * @example
 * ```typescript
 * // Basic truncation
 * const result = truncMonth(new Date(2024, 5, 15, 14, 30, 45, 123));
 * // Returns: June 1, 2024 00:00:00.000
 *
 * // Already at start of month
 * const result2 = truncMonth(new Date(2024, 5, 1, 0, 0, 0, 0));
 * // Returns: June 1, 2024 00:00:00.000 (unchanged)
 *
 * // Works with timestamps
 * const timestamp = Date.now();
 * const result3 = truncMonth(timestamp);
 * // Returns: Date at 1st day of current month at 00:00:00.000
 *
 * // End of month
 * const result4 = truncMonth(new Date(2024, 5, 30, 23, 59, 59, 999));
 * // Returns: June 1, 2024 00:00:00.000
 *
 * // Invalid inputs return Invalid Date
 * const result5 = truncMonth(new Date("invalid"));
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Always returns a new Date instance (does not mutate input)
 * - Handles leap years correctly (February in leap years)
 */
export function truncMonth(date: Date | number): Date {
  if (!isValidDateOrNumber(date)) {
    return new Date(NaN);
  }
  const dt = new Date(date);
  return truncateToUnit(dt, "month");
}