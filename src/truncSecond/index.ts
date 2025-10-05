import { truncateToUnit } from "../_lib/truncateToUnit";
import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Truncate a date to the start of the second.
 *
 * This function sets the milliseconds to 0 while keeping the same date, hour, minute, and second,
 * effectively removing all time components below the second level.
 *
 * @param date - The base date as a Date object or timestamp (number)
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
 * // End of second
 * const result4 = truncSecond(new Date(2024, 5, 15, 14, 30, 45, 999));
 * // Returns: June 15, 2024 14:30:45.000
 *
 * // Invalid inputs return Invalid Date
 * const result5 = truncSecond(new Date("invalid"));
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Always returns a new Date instance (does not mutate input)
 * - Works correctly across all 60 seconds of a minute
 */
export function truncSecond(date: Date | number): Date {
  if (!isValidDateOrNumber(date)) {
    return new Date(NaN);
  }
  const dt = new Date(date);
  return truncateToUnit(dt, "second");
}