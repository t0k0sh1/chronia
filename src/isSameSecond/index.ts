import { diffSeconds } from "../diffSeconds";

/**
 * Check if two dates are in the same second.
 *
 * Returns true if both dates fall within the same second,
 * regardless of milliseconds.
 *
 * @param dateLeft - The first date or timestamp
 * @param dateRight - The second date or timestamp
 * @returns True if both dates are in the same second, false otherwise
 *
 * @example
 * ```typescript
 * const date1 = new Date(2024, 5, 15, 14, 30, 45, 0);   // June 15, 2024 14:30:45.000
 * const date2 = new Date(2024, 5, 15, 14, 30, 45, 999); // June 15, 2024 14:30:45.999
 * isSameSecond(date1, date2); // true
 *
 * const date3 = new Date(2024, 5, 15, 14, 30, 45, 999); // June 15, 2024 14:30:45.999
 * const date4 = new Date(2024, 5, 15, 14, 30, 46, 0);   // June 15, 2024 14:30:46.000
 * isSameSecond(date3, date4); // false
 *
 * const date5 = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
 * const date6 = new Date(2024, 5, 15, 14, 30, 45, 456); // June 15, 2024 14:30:45.456
 * isSameSecond(date5, date6); // true
 *
 * const date7 = new Date(2024, 5, 15, 14, 30, 45);      // June 15, 2024 14:30:45
 * const date8 = new Date(2024, 5, 15, 14, 31, 45);      // June 15, 2024 14:31:45
 * isSameSecond(date7, date8); // false (different minutes)
 * ```
 */
export function isSameSecond(dateLeft: Date | number, dateRight: Date | number): boolean {
  return diffSeconds(dateLeft, dateRight) === 0;
}