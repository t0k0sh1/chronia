import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Get the timestamp of the given date.
 *
 * This function validates arguments before processing and returns the timestamp
 * (milliseconds since Unix epoch) of the given date. Returns NaN for invalid input.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @returns The timestamp in milliseconds since Unix epoch (1970-01-01), or NaN if invalid
 *
 * @example
 * ```typescript
 * // Get timestamp from Date object
 * const result = getTime(new Date("2024-01-01T00:00:00.000Z"));
 * // Returns: 1704067200000
 *
 * // Get timestamp from numeric input (returns as-is if valid)
 * const result2 = getTime(1704067200000);
 * // Returns: 1704067200000
 *
 * // Unix epoch
 * const result3 = getTime(new Date(0));
 * // Returns: 0
 *
 * // Negative timestamp (before epoch)
 * const result4 = getTime(new Date("1969-12-31T00:00:00.000Z"));
 * // Returns: -86400000
 *
 * // Invalid date returns NaN
 * const result5 = getTime(new Date("invalid"));
 * // Returns: NaN
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Returns NaN for: Invalid Date, NaN, Infinity, -Infinity
 * - Returns timestamp in milliseconds since Unix epoch (1970-01-01T00:00:00.000Z)
 * - For numeric input, returns the value as-is if valid
 */
export function getTime(date: Date | number): number {
  // Validate arguments before conversion (consistent with library patterns)
  if (!isValidDateOrNumber(date)) {
    return NaN;
  }

  // Convert input to Date object after validation
  const dateObj = typeof date === "number" ? new Date(date) : date;
  return dateObj.getTime();
}