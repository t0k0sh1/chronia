import type { DateInput } from "../types";
import { isValidDateInput } from "../_lib/validators";
import { toDate } from "../_lib/toDate";

/**
 * Get the timestamp of the given date.
 *
 * This function validates arguments before processing and returns the timestamp
 * (milliseconds since Unix epoch) of the given date. Returns NaN for invalid input.
 *
 * @param date - The base date as a Date object, timestamp (number), or ISO 8601 string
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
 * // Get timestamp from ISO 8601 string
 * const result3 = getTime("2024-01-01T00:00:00.000Z");
 * // Returns: 1704067200000
 *
 * // Unix epoch
 * const result4 = getTime(new Date(0));
 * // Returns: 0
 *
 * // Negative timestamp (before epoch)
 * const result5 = getTime(new Date("1969-12-31T00:00:00.000Z"));
 * // Returns: -86400000
 *
 * // Invalid date returns NaN
 * const result6 = getTime(new Date("invalid"));
 * // Returns: NaN
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Returns NaN for: Invalid Date, NaN, Infinity, -Infinity, invalid strings
 * - Returns timestamp in milliseconds since Unix epoch (1970-01-01T00:00:00.000Z)
 * - For numeric input, returns the value as-is if valid
 */
export function getTime(date: DateInput): number {
  // Validate arguments before conversion (consistent with library patterns)
  if (!isValidDateInput(date)) {
    return NaN;
  }

  // Convert input to Date object after validation
  const dateObj = toDate(date);
  return dateObj.getTime();
}