import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Get the start of the year for the given date.
 *
 * This function returns a new Date object set to January 1st at 00:00:00.000 of the same year
 * for the given date. The year remains the same while the month is set to January (0), the day
 * to 1, and all time components are reset to zero.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @returns A new Date object set to January 1st at 00:00:00.000, or Invalid Date if input is invalid
 *
 * @example
 * ```typescript
 * // Get start of year from mid-year
 * const result = startOfYear(new Date(2024, 5, 15, 14, 30, 45));
 * // Returns: January 1, 2024 00:00:00.000
 *
 * // Works with last day of year
 * const result2 = startOfYear(new Date(2024, 11, 31, 23, 59, 59));
 * // Returns: January 1, 2024 00:00:00.000
 *
 * // Works with timestamps
 * const timestamp = Date.now();
 * const result3 = startOfYear(timestamp);
 * // Returns: January 1st of current year at 00:00:00.000
 *
 * // Handles leap years
 * const result4 = startOfYear(new Date(2024, 1, 29));
 * // Returns: January 1, 2024 00:00:00.000
 *
 * // Invalid inputs return Invalid Date
 * const result5 = startOfYear(Infinity);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Always returns a new Date instance (does not mutate input)
 * - Sets month to 0 (January), day to 1, and resets hours, minutes, seconds, and milliseconds to 0
 */
export function startOfYear(date: Date | number): Date {
  if (!isValidDateOrNumber(date)) {
    return new Date(NaN);
  }
  const dt = new Date(date);
  return new Date(
    dt.getFullYear(),
    0, // January (month 0)
    1, // First day of the year
    0, // 00:00:00.000
    0,
    0,
    0
  );
}