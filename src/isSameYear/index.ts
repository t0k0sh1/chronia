import { diffYears } from "../diffYears";

/**
 * Check if two dates are in the same calendar year.
 *
 * Returns true if both dates fall within the same calendar year,
 * regardless of month, day, or time components.
 *
 * @param dateLeft - The first date
 * @param dateRight - The second date
 * @returns True if both dates are in the same year, false otherwise
 *
 * @example
 * ```typescript
 * const date1 = new Date(2024, 0, 1);    // January 1, 2024
 * const date2 = new Date(2024, 11, 31);  // December 31, 2024
 * isSameYear(date1, date2); // true
 *
 * const date3 = new Date(2024, 11, 31);  // December 31, 2024
 * const date4 = new Date(2025, 0, 1);    // January 1, 2025
 * isSameYear(date3, date4); // false
 *
 * const date5 = new Date(2024, 5, 15, 14, 30); // June 15, 2024 14:30
 * const date6 = new Date(2024, 8, 20, 9, 45);  // September 20, 2024 09:45
 * isSameYear(date5, date6); // true
 * ```
 */
export function isSameYear(dateLeft: Date, dateRight: Date): boolean {
  return diffYears(dateLeft, dateRight) === 0;
}