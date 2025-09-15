import { diffMinutes } from "../diffMinutes";

/**
 * Check if two dates are in the same minute.
 *
 * Returns true if both dates fall within the same minute,
 * regardless of seconds or milliseconds.
 *
 * @param dateLeft - The first date or timestamp
 * @param dateRight - The second date or timestamp
 * @returns True if both dates are in the same minute, false otherwise
 *
 * @example
 * ```typescript
 * const date1 = new Date(2024, 5, 15, 14, 30, 0);   // June 15, 2024 14:30:00
 * const date2 = new Date(2024, 5, 15, 14, 30, 59);  // June 15, 2024 14:30:59
 * isSameMinute(date1, date2); // true
 *
 * const date3 = new Date(2024, 5, 15, 14, 30, 59);  // June 15, 2024 14:30:59
 * const date4 = new Date(2024, 5, 15, 14, 31, 0);   // June 15, 2024 14:31:00
 * isSameMinute(date3, date4); // false
 *
 * const date5 = new Date(2024, 5, 15, 14, 30, 15, 500); // June 15, 2024 14:30:15.500
 * const date6 = new Date(2024, 5, 15, 14, 30, 45, 800); // June 15, 2024 14:30:45.800
 * isSameMinute(date5, date6); // true
 *
 * const date7 = new Date(2024, 5, 15, 14, 30);      // June 15, 2024 14:30
 * const date8 = new Date(2024, 5, 15, 15, 30);      // June 15, 2024 15:30
 * isSameMinute(date7, date8); // false (different hours)
 * ```
 */
export function isSameMinute(dateLeft: Date | number, dateRight: Date | number): boolean {
  return diffMinutes(dateLeft, dateRight) === 0;
}