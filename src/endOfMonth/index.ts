import type { DateInput } from "../types";
import { isValidDateInput } from "../_lib/validators";
import { toDate } from "../_lib/toDate";

/**
 * Get the end of the month for the given date.
 *
 * This function returns a new Date object set to the last day of the month at 23:59:59.999
 * for the given date. The year and month remain the same while the day is set to the last day
 * of that month and all time components are set to their maximum values. Automatically handles
 * different month lengths and leap years.
 *
 * @param date - The base date as a Date object, timestamp (number), or ISO 8601 string
 * @returns A new Date object set to the last day of the month at 23:59:59.999, or Invalid Date if input is invalid
 *
 * @example
 * ```typescript
 * // Get end of month from mid-month
 * const result = endOfMonth(new Date(2024, 5, 15, 14, 30, 45));
 * // Returns: June 30, 2024 23:59:59.999 (30 days)
 *
 * // Works with first day of month
 * const result2 = endOfMonth(new Date(2024, 0, 1, 0, 0, 0));
 * // Returns: January 31, 2024 23:59:59.999 (31 days)
 *
 * // Works with timestamps
 * const timestamp = Date.now();
 * const result3 = endOfMonth(timestamp);
 * // Returns: Last day of current month at 23:59:59.999
 *
 * // Works with ISO 8601 strings
 * const result4 = endOfMonth("2024-02-15");
 * // Returns: February 29, 2024 23:59:59.999 (leap year)
 *
 * // Invalid inputs return Invalid Date
 * const result5 = endOfMonth(-Infinity);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity, invalid strings
 * - Always returns a new Date instance (does not mutate input)
 * - Automatically handles different month lengths (28, 29, 30, or 31 days)
 * - Correctly handles leap years for February
 */
export function endOfMonth(date: DateInput): Date {
  if (!isValidDateInput(date)) {
    return new Date(NaN);
  }
  const dt = toDate(date);
  return new Date(
    dt.getFullYear(),
    dt.getMonth() + 1, // Next month
    0, // 0th day of next month = last day of current month
    23, // 23:59:59.999
    59,
    59,
    999
  );
}