import type { DateInput } from "../types";
import { truncateToUnit } from "../_lib/truncateToUnit";
import { isValidDateInput } from "../_lib/validators";
import { toDate } from "../_lib/toDate";

/**
 * Truncate a date to the millisecond.
 *
 * This function returns the same date without any truncation since millisecond is the smallest unit
 * supported by JavaScript Date objects. It is provided for API consistency with other truncation functions.
 *
 * @param date - The base date as a Date object, timestamp (number), or ISO 8601 string
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
 * // Works with ISO 8601 strings
 * const result4 = truncMillisecond("2024-06-15T14:30:45.123");
 * // Returns: June 15, 2024 14:30:45.123 (unchanged)
 *
 * // Invalid inputs return Invalid Date
 * const result5 = truncMillisecond(new Date("invalid"));
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity, invalid strings
 * - Always returns a new Date instance (does not mutate input)
 * - Provided for API consistency even though no truncation occurs
 * - Maintains millisecond precision (0-999)
 */
export function truncMillisecond(date: DateInput): Date {
  if (!isValidDateInput(date)) {
    return new Date(NaN);
  }
  const dt = toDate(date);
  return truncateToUnit(dt, "millisecond");
}