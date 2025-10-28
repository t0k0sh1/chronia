import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Get the month of the given date.
 *
 * This function validates arguments before processing and returns the month
 * (0-11, where January is 0 and December is 11) of the given date. Returns NaN for invalid input.
 *
 * @param date - The base date as a Date object or timestamp (number)
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
 * // Leap year February
 * const result3 = getMonth(new Date(2024, 1, 29));
 * // Returns: 1
 *
 * // December
 * const result4 = getMonth(new Date(2024, 11, 25));
 * // Returns: 11
 *
 * // Invalid date returns NaN
 * const result5 = getMonth(new Date("invalid"));
 * // Returns: NaN
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Returns NaN for: Invalid Date, NaN, Infinity, -Infinity
 * - Returns the month in the local timezone
 * - Uses 0-based indexing (0-11), same as JavaScript's native getMonth()
 */
export function getMonth(date: Date | number): number {
  // Validate arguments before conversion (consistent with library patterns)
  if (!isValidDateOrNumber(date)) {
    return NaN;
  }

  // Convert input to Date object after validation
  const dateObj = typeof date === "number" ? new Date(date) : date;
  return dateObj.getMonth();
}