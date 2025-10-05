import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Get the month of the given date.
 *
 * This function validates arguments before processing and returns the month
 * (1-12, where January is 1 and December is 12) of the given date. Returns NaN for invalid input.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @returns The month as a number (1-12), or NaN if invalid
 *
 * @example
 * ```typescript
 * // Get month from Date object
 * const result = getMonth(new Date(2024, 5, 15)); // June
 * // Returns: 6
 *
 * // Get month from timestamp
 * const result2 = getMonth(1704067200000); // 2024-01-01
 * // Returns: 1
 *
 * // Leap year February
 * const result3 = getMonth(new Date(2024, 1, 29));
 * // Returns: 2
 *
 * // December
 * const result4 = getMonth(new Date(2024, 11, 25));
 * // Returns: 12
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
 * - Uses 1-based indexing (1-12) unlike JavaScript's native getMonth() (0-11)
 */
export function getMonth(date: Date | number): number {
  // Validate arguments before conversion (consistent with library patterns)
  if (!isValidDateOrNumber(date)) {
    return NaN;
  }

  // Convert input to Date object after validation
  const dateObj = typeof date === "number" ? new Date(date) : date;
  // JavaScript's getMonth() returns 0-11, we want 1-12
  return dateObj.getMonth() + 1;
}