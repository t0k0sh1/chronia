import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Get the seconds of the given date.
 *
 * This function validates arguments before processing and returns the seconds (0-59)
 * of the given date. Returns NaN for invalid input.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @returns The seconds as a number (0-59), or NaN if invalid
 *
 * @example
 * ```typescript
 * // Get seconds from Date object
 * const result = getSeconds(new Date(2025, 0, 15, 10, 30, 45));
 * // Returns: 45
 *
 * // Get seconds from timestamp
 * const result2 = getSeconds(1704067245000); // 2024-01-01T00:00:45Z
 * // Returns: 45
 *
 * // Start of minute
 * const result3 = getSeconds(new Date(2024, 0, 1, 10, 30, 0));
 * // Returns: 0
 *
 * // End of minute
 * const result4 = getSeconds(new Date(2024, 0, 1, 10, 30, 59));
 * // Returns: 59
 *
 * // Invalid date returns NaN
 * const result5 = getSeconds(new Date("invalid"));
 * // Returns: NaN
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Returns NaN for: Invalid Date, NaN, Infinity, -Infinity
 * - Returns the seconds in the local timezone
 * - Seconds are always in the range 0-59
 */
export function getSeconds(date: Date | number): number {
  // Validate arguments before conversion (consistent with library patterns)
  if (!isValidDateOrNumber(date)) {
    return NaN;
  }

  // Convert input to Date object after validation
  const dateObj = typeof date === "number" ? new Date(date) : date;
  return dateObj.getSeconds();
}