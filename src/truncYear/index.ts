import type { DateInput } from "../types";
import { truncateToUnit } from "../_lib/truncateToUnit";
import { isValidDateInput } from "../_lib/validators";
import { toDate } from "../_lib/toDate";

/**
 * Truncate a date to the start of the year.
 *
 * This function sets the date to January 1st at 00:00:00.000 of the same year,
 * effectively removing all time components and resetting the month and day to January 1st.
 *
 * @param date - The base date as a Date object, timestamp (number), or ISO 8601 string
 * @returns A new Date object truncated to the start of the year, or Invalid Date if input is invalid
 *
 * @example
 * ```typescript
 * // Basic truncation
 * const result = truncYear(new Date(2024, 5, 15, 14, 30, 45, 123));
 * // Returns: January 1, 2024 00:00:00.000
 *
 * // Already at start of year
 * const result2 = truncYear(new Date(2024, 0, 1, 0, 0, 0, 0));
 * // Returns: January 1, 2024 00:00:00.000 (unchanged)
 *
 * // Works with timestamps
 * const timestamp = Date.now();
 * const result3 = truncYear(timestamp);
 * // Returns: Date at January 1st of current year at 00:00:00.000
 *
 * // Works with ISO 8601 strings
 * const result4 = truncYear("2024-06-15");
 * // Returns: January 1, 2024 00:00:00.000
 *
 * // Invalid inputs return Invalid Date
 * const result5 = truncYear(new Date("invalid"));
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity, invalid strings
 * - Always returns a new Date instance (does not mutate input)
 * - Handles leap years correctly
 */
export function truncYear(date: DateInput): Date {
  if (!isValidDateInput(date)) {
    return new Date(NaN);
  }
  const dt = toDate(date);
  return truncateToUnit(dt, "year");
}