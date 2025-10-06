import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Get the minutes of the given date.
 *
 * This function validates arguments before processing and returns the minutes (0-59)
 * of the given date. Returns NaN for invalid input.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @returns The minutes as a number (0-59), or NaN if invalid
 *
 * @example
 * ```typescript
 * // Get minutes from Date object
 * const result = getMinutes(new Date(2025, 0, 15, 14, 30, 45));
 * // Returns: 30
 *
 * // Get minutes from timestamp
 * const result2 = getMinutes(1704067200000); // 2024-01-01 00:00:00
 * // Returns: 0
 *
 * // Minutes at the end of an hour
 * const result3 = getMinutes(new Date(2024, 11, 31, 23, 59, 59));
 * // Returns: 59
 *
 * // Minutes at the start of an hour
 * const result4 = getMinutes(new Date(2024, 5, 15, 8, 0, 0));
 * // Returns: 0
 *
 * // Invalid date returns NaN
 * const result5 = getMinutes(new Date("invalid"));
 * // Returns: NaN
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Returns NaN for: Invalid Date, NaN, Infinity, -Infinity
 * - Returns the minutes in the local timezone
 * - Always returns a value between 0 and 59 for valid dates
 */
export function getMinutes(date: Date | number): number {
  // Validate arguments before conversion (consistent with library patterns)
  if (!isValidDateOrNumber(date)) {
    return NaN;
  }

  // Convert input to Date object after validation
  const dateObj = typeof date === "number" ? new Date(date) : date;
  return dateObj.getMinutes();
}