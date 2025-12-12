import type { DateInput } from "../types";
import { truncateToUnit } from "../_lib/truncateToUnit";
import { isValidDateInput } from "../_lib/validators";
import { toDate } from "../_lib/toDate";

/**
 * Truncate a date to the start of the day.
 *
 * This function sets the time to 00:00:00.000 while keeping the same date,
 * effectively removing all time components below the day level.
 *
 * @param date - The base date as a Date object, timestamp (number), or ISO 8601 string
 * @returns A new Date object truncated to the start of the day, or Invalid Date if input is invalid
 *
 * @example
 * ```typescript
 * // Basic truncation
 * const result = truncDay(new Date(2024, 5, 15, 14, 30, 45, 123));
 * // Returns: June 15, 2024 00:00:00.000
 *
 * // Already at start of day
 * const result2 = truncDay(new Date(2024, 5, 15, 0, 0, 0, 0));
 * // Returns: June 15, 2024 00:00:00.000 (unchanged)
 *
 * // Works with timestamps
 * const timestamp = Date.now();
 * const result3 = truncDay(timestamp);
 * // Returns: Date at 00:00:00.000 of current day
 *
 * // Works with ISO 8601 strings
 * const result4 = truncDay("2024-06-15T14:30:00");
 * // Returns: June 15, 2024 00:00:00.000
 *
 * // Invalid inputs return Invalid Date
 * const result5 = truncDay(new Date("invalid"));
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity, invalid strings
 * - Always returns a new Date instance (does not mutate input)
 * - Preserves the date across DST transitions
 */
export function truncDay(date: DateInput): Date {
  if (!isValidDateInput(date)) {
    return new Date(NaN);
  }
  const dt = toDate(date);
  return truncateToUnit(dt, "day");
}