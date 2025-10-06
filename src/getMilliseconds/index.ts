import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Get the milliseconds of the given date.
 *
 * This function validates arguments before processing and returns the milliseconds
 * component (0-999) of the given date. Returns NaN for invalid input.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @returns The milliseconds as a number (0-999), or NaN if invalid
 *
 * @example
 * ```typescript
 * // Get milliseconds from Date object
 * const result = getMilliseconds(new Date(2024, 0, 15, 12, 30, 45, 123));
 * // Returns: 123
 *
 * // Get milliseconds from timestamp
 * const result2 = getMilliseconds(1704067200500); // 500ms past epoch
 * // Returns: 500
 *
 * // Start of second (0 milliseconds)
 * const result3 = getMilliseconds(new Date(2024, 0, 1, 0, 0, 0, 0));
 * // Returns: 0
 *
 * // End of second (999 milliseconds)
 * const result4 = getMilliseconds(new Date(2024, 0, 1, 0, 0, 0, 999));
 * // Returns: 999
 *
 * // Invalid date returns NaN
 * const result5 = getMilliseconds(new Date("invalid"));
 * // Returns: NaN
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Returns NaN for: Invalid Date, NaN, Infinity, -Infinity
 * - Returns milliseconds in the range 0-999
 * - Works with dates in any timezone (returns local time component)
 */
export function getMilliseconds(date: Date | number): number {
  // Validate arguments before conversion (consistent with library patterns)
  if (!isValidDateOrNumber(date)) {
    return NaN;
  }

  // Convert input to Date object after validation
  const dateObj = typeof date === "number" ? new Date(date) : date;
  return dateObj.getMilliseconds();
}