import type { DateInput } from "../types";
import { diffMonths } from "../diffMonths";

/**
 * Check if two dates are in the same calendar month and year.
 *
 * This function compares two dates and returns true if they fall within the same calendar month
 * and year, regardless of day or time components.
 *
 * @param dateLeft - The first date as a Date object, timestamp (number), or ISO 8601 string
 * @param dateRight - The second date as a Date object, timestamp (number), or ISO 8601 string
 * @returns True if both dates are in the same month and year, false otherwise or if either date is invalid
 *
 * @example
 * ```typescript
 * // Same month and year, different days
 * const result = isSameMonth(new Date(2024, 5, 1), new Date(2024, 5, 30));
 * // Returns: true
 *
 * // Different months
 * const result2 = isSameMonth(new Date(2024, 5, 30), new Date(2024, 6, 1));
 * // Returns: false
 *
 * // Same month and year, different times
 * const result3 = isSameMonth(
 *   new Date(2024, 5, 15, 14, 30),
 *   new Date(2024, 5, 20, 9, 45)
 * );
 * // Returns: true
 *
 * // Same month, different years
 * const result4 = isSameMonth(new Date(2024, 5, 15), new Date(2023, 5, 15));
 * // Returns: false (different years)
 *
 * // Invalid dates return false
 * const result5 = isSameMonth(new Date("invalid"), new Date(2024, 5, 1));
 * // Returns: false
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Returns false for any invalid input (Invalid Date, NaN, Infinity, -Infinity)
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Ignores day and time components in the comparison
 * - Requires both month AND year to match (June 2024 ≠ June 2023)
 * - Uses diffMonths internally to determine if the month difference is zero
 * - Handles month boundaries and leap years correctly
 */
export function isSameMonth(dateLeft: DateInput, dateRight: DateInput): boolean {
  return diffMonths(dateLeft, dateRight) === 0;
}