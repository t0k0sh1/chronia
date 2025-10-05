import { diffDays } from "../diffDays";

/**
 * Check if two dates are on the same calendar day.
 *
 * This function compares two dates and returns true if they fall on the same calendar day,
 * regardless of time components.
 *
 * @param dateLeft - The first date as a Date object or timestamp (number)
 * @param dateRight - The second date as a Date object or timestamp (number)
 * @returns True if both dates are on the same day, false otherwise or if either date is invalid
 *
 * @example
 * ```typescript
 * // Same day, different times
 * const result = isSameDay(
 *   new Date(2024, 5, 15, 0, 0),
 *   new Date(2024, 5, 15, 23, 59)
 * );
 * // Returns: true
 *
 * // Different days
 * const result2 = isSameDay(
 *   new Date(2024, 5, 15, 23, 59),
 *   new Date(2024, 5, 16, 0, 0)
 * );
 * // Returns: false
 *
 * // Same day, different times (with seconds)
 * const result3 = isSameDay(
 *   new Date(2024, 5, 15, 14, 30, 45),
 *   new Date(2024, 5, 15, 9, 15, 20)
 * );
 * // Returns: true
 *
 * // Works with timestamps
 * const today = new Date(2024, 5, 15);
 * const result4 = isSameDay(today.getTime(), today);
 * // Returns: true
 *
 * // Invalid dates return false
 * const result5 = isSameDay(new Date("invalid"), new Date(2024, 5, 15));
 * // Returns: false
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Returns false for any invalid input (Invalid Date, NaN, Infinity, -Infinity)
 * - Accepts both Date objects and numeric timestamps
 * - Ignores hour, minute, second, and millisecond components in the comparison
 * - Compares based on local timezone calendar day
 * - Uses diffDays internally to determine if the day difference is zero
 * - Handles DST transitions and leap years correctly
 */
export function isSameDay(dateLeft: Date | number, dateRight: Date | number): boolean {
  return diffDays(dateLeft, dateRight) === 0;
}