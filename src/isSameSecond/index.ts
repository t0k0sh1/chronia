import type { DateInput } from "../types";
import { diffSeconds } from "../diffSeconds";

/**
 * Check if two dates are in the same second.
 *
 * This function compares two dates and returns true if they fall within the same second,
 * regardless of milliseconds.
 *
 * @param dateLeft - The first date as a Date object, timestamp (number), or ISO 8601 string
 * @param dateRight - The second date as a Date object, timestamp (number), or ISO 8601 string
 * @returns True if both dates are in the same second, false otherwise or if either date is invalid
 *
 * @example
 * ```typescript
 * // Same second, different milliseconds
 * const result = isSameSecond(
 *   new Date(2024, 5, 15, 14, 30, 45, 0),
 *   new Date(2024, 5, 15, 14, 30, 45, 999)
 * );
 * // Returns: true
 *
 * // Different seconds
 * const result2 = isSameSecond(
 *   new Date(2024, 5, 15, 14, 30, 45, 999),
 *   new Date(2024, 5, 15, 14, 30, 46, 0)
 * );
 * // Returns: false
 *
 * // Same second, different milliseconds
 * const result3 = isSameSecond(
 *   new Date(2024, 5, 15, 14, 30, 45, 123),
 *   new Date(2024, 5, 15, 14, 30, 45, 456)
 * );
 * // Returns: true
 *
 * // Same second of minute, different minutes
 * const result4 = isSameSecond(
 *   new Date(2024, 5, 15, 14, 30, 45),
 *   new Date(2024, 5, 15, 14, 31, 45)
 * );
 * // Returns: false (different minutes)
 *
 * // Invalid dates return false
 * const result5 = isSameSecond(new Date("invalid"), new Date(2024, 5, 15, 14, 30, 45));
 * // Returns: false
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Returns false for any invalid input (Invalid Date, NaN, Infinity, -Infinity)
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Ignores millisecond component in the comparison
 * - Requires year, month, day, hour, minute, AND second to match
 * - Uses diffSeconds internally to determine if the second difference is zero
 * - Handles DST transitions correctly
 */
export function isSameSecond(dateLeft: DateInput, dateRight: DateInput): boolean {
  return diffSeconds(dateLeft, dateRight) === 0;
}