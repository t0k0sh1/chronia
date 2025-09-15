import { diffDays } from "../diffDays";

/**
 * Check if two dates are on the same calendar day.
 *
 * Returns true if both dates fall on the same calendar day,
 * regardless of time components.
 *
 * @param dateLeft - The first date
 * @param dateRight - The second date
 * @returns True if both dates are on the same day, false otherwise
 *
 * @example
 * ```typescript
 * const date1 = new Date(2024, 5, 15, 0, 0);    // June 15, 2024 00:00
 * const date2 = new Date(2024, 5, 15, 23, 59);  // June 15, 2024 23:59
 * isSameDay(date1, date2); // true
 *
 * const date3 = new Date(2024, 5, 15, 23, 59);  // June 15, 2024 23:59
 * const date4 = new Date(2024, 5, 16, 0, 0);    // June 16, 2024 00:00
 * isSameDay(date3, date4); // false
 *
 * const date5 = new Date(2024, 5, 15, 14, 30, 45); // June 15, 2024 14:30:45
 * const date6 = new Date(2024, 5, 15, 9, 15, 20);  // June 15, 2024 09:15:20
 * isSameDay(date5, date6); // true
 *
 * const date7 = new Date(2024, 5, 15);   // June 15, 2024
 * const date8 = new Date(2024, 5, 14);   // June 14, 2024
 * isSameDay(date7, date8); // false
 * ```
 */
export function isSameDay(dateLeft: Date, dateRight: Date): boolean {
  return diffDays(dateLeft, dateRight) === 0;
}