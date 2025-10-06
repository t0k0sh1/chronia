import { truncateToUnit } from "../_lib/truncateToUnit";
import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Truncate a date to the start of the year.
 *
 * This function sets the date to January 1st at 00:00:00.000 of the same year,
 * effectively removing all time components and resetting the month and day to January 1st.
 *
 * @param date - The base date as a Date object or timestamp (number)
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
 * // End of year
 * const result4 = truncYear(new Date(2024, 11, 31, 23, 59, 59, 999));
 * // Returns: January 1, 2024 00:00:00.000
 *
 * // Invalid inputs return Invalid Date
 * const result5 = truncYear(new Date("invalid"));
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Always returns a new Date instance (does not mutate input)
 * - Handles leap years correctly
 */
export function truncYear(date: Date | number): Date {
  if (!isValidDateOrNumber(date)) {
    return new Date(NaN);
  }
  const dt = new Date(date);
  return truncateToUnit(dt, "year");
}