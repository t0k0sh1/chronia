import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Get the end of the year for the given date.
 *
 * This function returns a new Date object set to December 31st at 23:59:59.999 of the same year
 * for the given date. The year remains the same while the month is set to December (11), the day
 * to 31, and all time components are set to their maximum values.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @returns A new Date object set to December 31st at 23:59:59.999, or Invalid Date if input is invalid
 *
 * @example
 * ```typescript
 * // Get end of year from mid-year
 * const result = endOfYear(new Date(2024, 5, 15, 14, 30, 45));
 * // Returns: December 31, 2024 23:59:59.999
 *
 * // Works with first day of year
 * const result2 = endOfYear(new Date(2024, 0, 1, 0, 0, 0));
 * // Returns: December 31, 2024 23:59:59.999
 *
 * // Works with timestamps
 * const timestamp = Date.now();
 * const result3 = endOfYear(timestamp);
 * // Returns: December 31st of current year at 23:59:59.999
 *
 * // Works regardless of leap year
 * const result4 = endOfYear(new Date(2024, 1, 29));
 * // Returns: December 31, 2024 23:59:59.999
 *
 * // Invalid inputs return Invalid Date
 * const result5 = endOfYear(new Date("invalid"));
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Always returns a new Date instance (does not mutate input)
 * - Sets month to 11 (December), day to 31, hours to 23, minutes to 59, seconds to 59, and milliseconds to 999
 */
export function endOfYear(date: Date | number): Date {
  if (!isValidDateOrNumber(date)) {
    return new Date(NaN);
  }
  const dt = new Date(date);
  return new Date(
    dt.getFullYear(),
    11, // December (month 11)
    31, // Last day of the year
    23, // 23:59:59.999
    59,
    59,
    999
  );
}