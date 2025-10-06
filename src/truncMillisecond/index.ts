import { truncateToUnit } from "../_lib/truncateToUnit";
import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Truncate a date to the millisecond.
 *
 * This function returns the same date without any truncation since millisecond is the smallest unit
 * supported by JavaScript Date objects. It is provided for API consistency with other truncation functions.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @returns A new Date object with the same value, or Invalid Date if input is invalid
 *
 * @example
 * ```typescript
 * // No truncation (millisecond is smallest unit)
 * const result = truncMillisecond(new Date(2024, 5, 15, 14, 30, 45, 123));
 * // Returns: June 15, 2024 14:30:45.123 (unchanged)
 *
 * // Returns new object with same value
 * const result2 = truncMillisecond(new Date(2024, 11, 31, 23, 59, 59, 999));
 * // Returns: December 31, 2024 23:59:59.999 (unchanged)
 *
 * // Works with timestamps
 * const timestamp = Date.now();
 * const result3 = truncMillisecond(timestamp);
 * // Returns: Date with same timestamp value
 *
 * // Unix epoch
 * const result4 = truncMillisecond(new Date(0));
 * // Returns: January 1, 1970 00:00:00.000
 *
 * // Invalid inputs return Invalid Date
 * const result5 = truncMillisecond(new Date("invalid"));
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Always returns a new Date instance (does not mutate input)
 * - Provided for API consistency even though no truncation occurs
 * - Maintains millisecond precision (0-999)
 */
export function truncMillisecond(date: Date | number): Date {
  if (!isValidDateOrNumber(date)) {
    return new Date(NaN);
  }
  const dt = new Date(date);
  return truncateToUnit(dt, "millisecond");
}