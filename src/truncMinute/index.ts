import { truncateToUnit } from "../_lib/truncateToUnit";
import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Truncate a date to the start of the minute.
 *
 * This function sets the seconds and milliseconds to 0 while keeping the same date, hour, and minute,
 * effectively removing all time components below the minute level.
 *
 * @param date - The base date as a Date object or timestamp (number)
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
 * // End of minute
 * const result4 = truncMinute(new Date(2024, 5, 15, 14, 30, 59, 999));
 * // Returns: June 15, 2024 14:30:00.000
 *
 * // Invalid inputs return Invalid Date
 * const result5 = truncMinute(new Date("invalid"));
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Always returns a new Date instance (does not mutate input)
 * - Works correctly across all 60 minutes of an hour
 */
export function truncMinute(date: Date | number): Date {
  if (!isValidDateOrNumber(date)) {
    return new Date(NaN);
  }
  const dt = new Date(date);
  return truncateToUnit(dt, "minute");
}