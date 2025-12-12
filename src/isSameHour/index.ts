import type { DateInput } from "../types";
import { diffHours } from "../diffHours";

/**
 * Check if two dates are in the same hour.
 *
 * This function compares two dates and returns true if they fall within the same hour,
 * regardless of minutes, seconds, or milliseconds.
 *
 * @param dateLeft - The first date as a Date object, timestamp (number), or ISO 8601 string
 * @param dateRight - The second date as a Date object, timestamp (number), or ISO 8601 string
 * @returns True if both dates are in the same hour, false otherwise or if either date is invalid
 *
 * @example
 * ```typescript
 * // Same hour, different minutes
 * const result = isSameHour(
 *   new Date(2024, 5, 15, 14, 0, 0),
 *   new Date(2024, 5, 15, 14, 59, 59)
 * );
 * // Returns: true
 *
 * // Different hours
 * const result2 = isSameHour(
 *   new Date(2024, 5, 15, 14, 59, 59),
 *   new Date(2024, 5, 15, 15, 0, 0)
 * );
 * // Returns: false
 *
 * // Same hour, different minutes and seconds
 * const result3 = isSameHour(
 *   new Date(2024, 5, 15, 14, 30, 45),
 *   new Date(2024, 5, 15, 14, 15, 20)
 * );
 * // Returns: true
 *
 * // Same hour of day, different days
 * const result4 = isSameHour(
 *   new Date(2024, 5, 15, 14, 30),
 *   new Date(2024, 5, 16, 14, 30)
 * );
 * // Returns: false (different days)
 *
 * // Invalid dates return false
 * const result5 = isSameHour(new Date("invalid"), new Date(2024, 5, 15, 14, 0));
 * // Returns: false
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Returns false for any invalid input (Invalid Date, NaN, Infinity, -Infinity)
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Ignores minute, second, and millisecond components in the comparison
 * - Requires year, month, day, AND hour to match
 * - Uses diffHours internally to determine if the hour difference is zero
 * - Handles DST transitions correctly
 */
export function isSameHour(dateLeft: DateInput, dateRight: DateInput): boolean {
  return diffHours(dateLeft, dateRight) === 0;
}