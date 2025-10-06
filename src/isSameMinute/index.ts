import { diffMinutes } from "../diffMinutes";

/**
 * Check if two dates are in the same minute.
 *
 * This function compares two dates and returns true if they fall within the same minute,
 * regardless of seconds or milliseconds.
 *
 * @param dateLeft - The first date as a Date object or timestamp (number)
 * @param dateRight - The second date as a Date object or timestamp (number)
 * @returns True if both dates are in the same minute, false otherwise or if either date is invalid
 *
 * @example
 * ```typescript
 * // Same minute, different seconds
 * const result = isSameMinute(
 *   new Date(2024, 5, 15, 14, 30, 0),
 *   new Date(2024, 5, 15, 14, 30, 59)
 * );
 * // Returns: true
 *
 * // Different minutes
 * const result2 = isSameMinute(
 *   new Date(2024, 5, 15, 14, 30, 59),
 *   new Date(2024, 5, 15, 14, 31, 0)
 * );
 * // Returns: false
 *
 * // Same minute, different seconds and milliseconds
 * const result3 = isSameMinute(
 *   new Date(2024, 5, 15, 14, 30, 15, 500),
 *   new Date(2024, 5, 15, 14, 30, 45, 800)
 * );
 * // Returns: true
 *
 * // Same minute of hour, different hours
 * const result4 = isSameMinute(
 *   new Date(2024, 5, 15, 14, 30),
 *   new Date(2024, 5, 15, 15, 30)
 * );
 * // Returns: false (different hours)
 *
 * // Invalid dates return false
 * const result5 = isSameMinute(new Date("invalid"), new Date(2024, 5, 15, 14, 30));
 * // Returns: false
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Returns false for any invalid input (Invalid Date, NaN, Infinity, -Infinity)
 * - Accepts both Date objects and numeric timestamps
 * - Ignores second and millisecond components in the comparison
 * - Requires year, month, day, hour, AND minute to match
 * - Uses diffMinutes internally to determine if the minute difference is zero
 * - Handles DST transitions correctly
 */
export function isSameMinute(dateLeft: Date | number, dateRight: Date | number): boolean {
  return diffMinutes(dateLeft, dateRight) === 0;
}