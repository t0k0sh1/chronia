import type { DateInput } from "../types";
import { isValidDateInput } from "../_lib/validators";
import { toDate } from "../_lib/toDate";

/**
 * Get the day of the month from the given date.
 *
 * This function validates arguments before processing and returns the day of the month
 * (1-31) of the given date. Returns NaN for invalid input.
 *
 * @param date - The base date as a Date object, timestamp (number), or ISO 8601 string
 * @returns The day of the month as a number (1-31), or NaN if invalid
 *
 * @example
 * ```typescript
 * // Get day from Date object
 * const result = getDay(new Date(2025, 0, 15));
 * // Returns: 15
 *
 * // Get day from timestamp
 * const result2 = getDay(1704067200000); // 2024-01-01
 * // Returns: 1
 *
 * // Get day from ISO 8601 string
 * const result3 = getDay("2025-01-15");
 * // Returns: 15
 *
 * // Leap day
 * const result4 = getDay(new Date(2024, 1, 29));
 * // Returns: 29
 *
 * // End of month
 * const result5 = getDay(new Date(2024, 0, 31));
 * // Returns: 31
 *
 * // Invalid date returns NaN
 * const result6 = getDay(new Date("invalid"));
 * // Returns: NaN
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Returns NaN for: Invalid Date, NaN, Infinity, -Infinity, invalid strings
 * - Returns the day in the local timezone
 * - Day values range from 1 to 31 depending on the month
 */
export function getDay(date: DateInput): number {
  // Validate arguments before conversion (consistent with library patterns)
  if (!isValidDateInput(date)) {
    return NaN;
  }

  // Convert input to Date object after validation
  const dateObj = toDate(date);
  return dateObj.getDate();
}