import { truncateToUnit } from "../_lib/truncateToUnit";
import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Truncate a date to the start of the hour.
 *
 * This function sets the minutes, seconds, and milliseconds to 0 while keeping the same date and hour,
 * effectively removing all time components below the hour level.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @returns A new Date object truncated to the start of the hour, or Invalid Date if input is invalid
 *
 * @example
 * ```typescript
 * // Basic truncation
 * const result = truncHour(new Date(2024, 5, 15, 14, 30, 45, 123));
 * // Returns: June 15, 2024 14:00:00.000
 *
 * // Already at start of hour
 * const result2 = truncHour(new Date(2024, 5, 15, 14, 0, 0, 0));
 * // Returns: June 15, 2024 14:00:00.000 (unchanged)
 *
 * // Works with timestamps
 * const timestamp = Date.now();
 * const result3 = truncHour(timestamp);
 * // Returns: Date at XX:00:00.000 of current hour
 *
 * // End of hour
 * const result4 = truncHour(new Date(2024, 5, 15, 14, 59, 59, 999));
 * // Returns: June 15, 2024 14:00:00.000
 *
 * // Invalid inputs return Invalid Date
 * const result5 = truncHour(new Date("invalid"));
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Always returns a new Date instance (does not mutate input)
 * - Works correctly across all 24 hours of the day
 */
export function truncHour(date: Date | number): Date {
  if (!isValidDateOrNumber(date)) {
    return new Date(NaN);
  }
  const dt = new Date(date);
  return truncateToUnit(dt, "hour");
}