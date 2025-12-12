import type { DateInput } from "../types";
import { isValidDateInput } from "../_lib/validators";
import { toDate } from "../_lib/toDate";

/**
 * Get the full year of the given date.
 *
 * This function validates arguments before processing and returns the full year
 * (e.g., 2025) of the given date. Returns NaN for invalid input.
 *
 * @param date - The base date as a Date object, timestamp (number), or ISO 8601 string
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
 * // Get year from ISO 8601 string
 * const result3 = getYear("2025-01-15");
 * // Returns: 2025
 *
 * // Leap year
 * const result4 = getYear(new Date(2024, 1, 29));
 * // Returns: 2024
 *
 * // Historic date
 * const result5 = getYear(new Date(1776, 6, 4));
 * // Returns: 1776
 *
 * // Invalid date returns NaN
 * const result6 = getYear(new Date("invalid"));
 * // Returns: NaN
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Returns NaN for: Invalid Date, NaN, Infinity, -Infinity, invalid strings
 * - Returns the year in the local timezone
 * - Supports negative years (BC dates)
 */
export function getYear(date: DateInput): number {
  // Validate arguments before conversion (consistent with library patterns)
  if (!isValidDateInput(date)) {
    return NaN;
  }

  // Convert input to Date object after validation
  const dateObj = toDate(date);
  return dateObj.getFullYear();
}

