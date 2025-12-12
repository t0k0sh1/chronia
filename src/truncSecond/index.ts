import type { DateInput } from "../types";
import { truncateToUnit } from "../_lib/truncateToUnit";
import { isValidDateInput } from "../_lib/validators";
import { toDate } from "../_lib/toDate";

/**
 * Truncate a date to the start of the second.
 *
 * This function sets the milliseconds to 0 while keeping the same date, hour, minute, and second,
 * effectively removing all time components below the second level.
 *
 * @param date - The base date as a Date object, timestamp (number), or ISO 8601 string
 * @returns A new Date object truncated to the start of the second, or Invalid Date if input is invalid
 *
 * @example
 * ```typescript
 * // Basic truncation
 * const result = truncSecond(new Date(2024, 5, 15, 14, 30, 45, 123));
 * // Returns: June 15, 2024 14:30:45.000
 *
 * // Already at start of second
 * const result2 = truncSecond(new Date(2024, 5, 15, 14, 30, 45, 0));
 * // Returns: June 15, 2024 14:30:45.000 (unchanged)
 *
 * // Works with timestamps
 * const timestamp = Date.now();
 * const result3 = truncSecond(timestamp);
 * // Returns: Date at XX:XX:XX.000 of current second
 *
 * // Works with ISO 8601 strings
 * const result4 = truncSecond("2024-06-15T14:30:45.999");
 * // Returns: June 15, 2024 14:30:45.000
 *
 * // Invalid inputs return Invalid Date
 * const result5 = truncSecond(new Date("invalid"));
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity, invalid strings
 * - Always returns a new Date instance (does not mutate input)
 * - Works correctly across all 60 seconds of a minute
 */
export function truncSecond(date: DateInput): Date {
  if (!isValidDateInput(date)) {
    return new Date(NaN);
  }
  const dt = toDate(date);
  return truncateToUnit(dt, "second");
}