import { diffHours } from "../diffHours";

/**
 * Check if two dates are in the same hour.
 *
 * Returns true if both dates fall within the same hour,
 * regardless of minutes, seconds, or milliseconds.
 *
 * @param dateLeft - The first date
 * @param dateRight - The second date
 * @returns True if both dates are in the same hour, false otherwise
 *
 * @example
 * ```typescript
 * const date1 = new Date(2024, 5, 15, 14, 0, 0);   // June 15, 2024 14:00:00
 * const date2 = new Date(2024, 5, 15, 14, 59, 59); // June 15, 2024 14:59:59
 * isSameHour(date1, date2); // true
 *
 * const date3 = new Date(2024, 5, 15, 14, 59, 59); // June 15, 2024 14:59:59
 * const date4 = new Date(2024, 5, 15, 15, 0, 0);   // June 15, 2024 15:00:00
 * isSameHour(date3, date4); // false
 *
 * const date5 = new Date(2024, 5, 15, 14, 30, 45); // June 15, 2024 14:30:45
 * const date6 = new Date(2024, 5, 15, 14, 15, 20); // June 15, 2024 14:15:20
 * isSameHour(date5, date6); // true
 *
 * const date7 = new Date(2024, 5, 15, 14, 30);     // June 15, 2024 14:30
 * const date8 = new Date(2024, 5, 16, 14, 30);     // June 16, 2024 14:30
 * isSameHour(date7, date8); // false (different days)
 * ```
 */
export function isSameHour(dateLeft: Date, dateRight: Date): boolean {
  return diffHours(dateLeft, dateRight) === 0;
}