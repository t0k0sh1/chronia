import type { DateInput } from "../types";
import { isValidDateInput } from "../_lib/validators";
import { toDate } from "../_lib/toDate";

/**
 * Get the month of the given date.
 *
 * This function validates arguments before processing and returns the month
 * (0-11, where January is 0 and December is 11) of the given date. Returns NaN for invalid input.
 *
 * @param date - The base date as a Date object, timestamp (number), or ISO 8601 string
 * @returns The month as a number (0-11, where 0 is January and 11 is December), or NaN if invalid
 *
 * @example
 * ```typescript
 * // Get month from Date object
 * const result = getMonth(new Date(2024, 5, 15)); // June
 * // Returns: 5
 *
 * // Get month from timestamp
 * const result2 = getMonth(1704067200000); // 2024-01-01
 * // Returns: 0
 *
 * // Get month from ISO 8601 string
 * const result3 = getMonth("2024-06-15");
 * // Returns: 5
 *
 * // Leap year February
 * const result4 = getMonth(new Date(2024, 1, 29));
 * // Returns: 1
 *
 * // December
 * const result5 = getMonth(new Date(2024, 11, 25));
 * // Returns: 11
 *
 * // Invalid date returns NaN
 * const result6 = getMonth(new Date("invalid"));
 * // Returns: NaN
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Returns NaN for: Invalid Date, NaN, Infinity, -Infinity, invalid strings
 * - Returns the month in the local timezone
 * - Uses 0-based indexing (0-11), same as JavaScript's native getMonth()
 */
export function getMonth(date: DateInput): number {
  // Validate arguments before conversion (consistent with library patterns)
  if (!isValidDateInput(date)) {
    return NaN;
  }

  // Convert input to Date object after validation
  const dateObj = toDate(date);
  return dateObj.getMonth();
}