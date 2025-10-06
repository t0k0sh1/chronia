import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Get the full year of the given date.
 *
 * This function validates arguments before processing and returns the full year
 * (e.g., 2025) of the given date. Returns NaN for invalid input.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @returns The year as a number, or NaN if invalid
 *
 * @example
 * ```typescript
 * // Get year from Date object
 * const result = getYear(new Date(2025, 0, 15));
 * // Returns: 2025
 *
 * // Get year from timestamp
 * const result2 = getYear(1704067200000); // 2024-01-01
 * // Returns: 2024
 *
 * // Leap year
 * const result3 = getYear(new Date(2024, 1, 29));
 * // Returns: 2024
 *
 * // Historic date
 * const result4 = getYear(new Date(1776, 6, 4));
 * // Returns: 1776
 *
 * // Invalid date returns NaN
 * const result5 = getYear(new Date("invalid"));
 * // Returns: NaN
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Returns NaN for: Invalid Date, NaN, Infinity, -Infinity
 * - Returns the year in the local timezone
 * - Supports negative years (BC dates)
 */
export function getYear(date: Date | number): number {
  // Validate arguments before conversion (consistent with library patterns)
  if (!isValidDateOrNumber(date)) {
    return NaN;
  }

  // Convert input to Date object after validation
  const dateObj = typeof date === "number" ? new Date(date) : date;
  return dateObj.getFullYear();
}

