import type { DateInput } from "../types";
import { truncateToUnit } from "../_lib/truncateToUnit";
import { isValidDateInput } from "../_lib/validators";
import { toDate } from "../_lib/toDate";

/**
 * Truncate a date to the start of the minute.
 *
 * This function sets the seconds and milliseconds to 0 while keeping the same date, hour, and minute,
 * effectively removing all time components below the minute level.
 *
 * @param date - The base date as a Date object, timestamp (number), or ISO 8601 string
 * @returns A new Date object truncated to the start of the minute, or Invalid Date if input is invalid
 *
 * @example
 * ```typescript
 * // Basic truncation
 * const result = truncMinute(new Date(2024, 5, 15, 14, 30, 45, 123));
 * // Returns: June 15, 2024 14:30:00.000
 *
 * // Already at start of minute
 * const result2 = truncMinute(new Date(2024, 5, 15, 14, 30, 0, 0));
 * // Returns: June 15, 2024 14:30:00.000 (unchanged)
 *
 * // Works with timestamps
 * const timestamp = Date.now();
 * const result3 = truncMinute(timestamp);
 * // Returns: Date at XX:XX:00.000 of current minute
 *
 * // Works with ISO 8601 strings
 * const result4 = truncMinute("2024-06-15T14:30:45");
 * // Returns: June 15, 2024 14:30:00.000
 *
 * // Invalid inputs return Invalid Date
 * const result5 = truncMinute(new Date("invalid"));
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity, invalid strings
 * - Always returns a new Date instance (does not mutate input)
 * - Works correctly across all 60 minutes of an hour
 */
export function truncMinute(date: DateInput): Date {
  if (!isValidDateInput(date)) {
    return new Date(NaN);
  }
  const dt = toDate(date);
  return truncateToUnit(dt, "minute");
}