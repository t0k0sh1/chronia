import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Get the day of the month from the given date.
 *
 * This function validates arguments before processing and returns the day of the month
 * (1-31) of the given date. Returns NaN for invalid input.
 *
 * @param date - The base date as a Date object or timestamp (number)
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
 * // Leap day
 * const result3 = getDay(new Date(2024, 1, 29));
 * // Returns: 29
 *
 * // End of month
 * const result4 = getDay(new Date(2024, 0, 31));
 * // Returns: 31
 *
 * // Invalid date returns NaN
 * const result5 = getDay(new Date("invalid"));
 * // Returns: NaN
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Returns NaN for: Invalid Date, NaN, Infinity, -Infinity
 * - Returns the day in the local timezone
 * - Day values range from 1 to 31 depending on the month
 */
export function getDay(date: Date | number): number {
  // Validate arguments before conversion (consistent with library patterns)
  if (!isValidDateOrNumber(date)) {
    return NaN;
  }

  // Convert input to Date object after validation
  const dateObj = typeof date === "number" ? new Date(date) : date;
  return dateObj.getDate();
}