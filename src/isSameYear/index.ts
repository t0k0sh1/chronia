import type { DateInput } from "../types";
import { diffYears } from "../diffYears";

/**
 * Check if two dates are in the same calendar year.
 *
 * This function compares two dates and returns true if they fall within the same calendar year,
 * regardless of month, day, or time components.
 *
 * @param dateLeft - The first date as a Date object, timestamp (number), or ISO 8601 string
 * @param dateRight - The second date as a Date object, timestamp (number), or ISO 8601 string
 * @returns True if both dates are in the same year, false otherwise or if either date is invalid
 *
 * @example
 * ```typescript
 * // Same year, different months
 * const result = isSameYear(new Date(2024, 0, 1), new Date(2024, 11, 31));
 * // Returns: true
 *
 * // Different years
 * const result2 = isSameYear(new Date(2024, 11, 31), new Date(2025, 0, 1));
 * // Returns: false
 *
 * // Same year, different times
 * const result3 = isSameYear(
 *   new Date(2024, 5, 15, 14, 30),
 *   new Date(2024, 8, 20, 9, 45)
 * );
 * // Returns: true
 *
 * // Works with timestamps
 * const result4 = isSameYear(Date.now(), Date.now());
 * // Returns: true
 *
 * // Invalid dates return false
 * const result5 = isSameYear(new Date("invalid"), new Date(2024, 0, 1));
 * // Returns: false
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Returns false for any invalid input (Invalid Date, NaN, Infinity, -Infinity)
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Ignores month, day, and time components in the comparison
 * - Uses diffYears internally to determine if the year difference is zero
 * - Handles leap years, BC dates, and century boundaries correctly
 */
export function isSameYear(dateLeft: DateInput, dateRight: DateInput): boolean {
  return diffYears(dateLeft, dateRight) === 0;
}