import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Get the hours of the given date.
 *
 * This function validates arguments before processing and returns the hours
 * (0-23) of the given date in 24-hour format. Returns NaN for invalid input.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @returns The hours as a number (0-23), or NaN if invalid
 *
 * @example
 * ```typescript
 * // Get hours from Date object
 * const result = getHours(new Date(2025, 0, 15, 14, 30));
 * // Returns: 14
 *
 * // Get hours from timestamp
 * const result2 = getHours(1704110400000); // 2024-01-01 12:00:00
 * // Returns: 12
 *
 * // Midnight (start of day)
 * const result3 = getHours(new Date(2024, 0, 1, 0, 0, 0));
 * // Returns: 0
 *
 * // End of day
 * const result4 = getHours(new Date(2024, 0, 1, 23, 59, 59));
 * // Returns: 23
 *
 * // Invalid date returns NaN
 * const result5 = getHours(new Date("invalid"));
 * // Returns: NaN
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Returns NaN for: Invalid Date, NaN, Infinity, -Infinity
 * - Returns the hours in the local timezone (not UTC)
 * - Hours are in 24-hour format (0-23)
 */
export function getHours(date: Date | number): number {
  // Validate arguments before conversion (consistent with library patterns)
  if (!isValidDateOrNumber(date)) {
    return NaN;
  }

  // Convert input to Date object after validation
  const dateObj = typeof date === "number" ? new Date(date) : date;
  return dateObj.getHours();
}