import { diffMonths } from "../diffMonths";

/**
 * Check if two dates are in the same calendar month.
 *
 * Returns true if both dates fall within the same calendar month and year,
 * regardless of day or time components.
 *
 * @param dateLeft - The first date or timestamp
 * @param dateRight - The second date or timestamp
 * @returns True if both dates are in the same month and year, false otherwise
 *
 * @example
 * ```typescript
 * const date1 = new Date(2024, 5, 1);    // June 1, 2024
 * const date2 = new Date(2024, 5, 30);   // June 30, 2024
 * isSameMonth(date1, date2); // true
 *
 * const date3 = new Date(2024, 5, 30);   // June 30, 2024
 * const date4 = new Date(2024, 6, 1);    // July 1, 2024
 * isSameMonth(date3, date4); // false
 *
 * const date5 = new Date(2024, 5, 15, 14, 30); // June 15, 2024 14:30
 * const date6 = new Date(2024, 5, 20, 9, 45);  // June 20, 2024 09:45
 * isSameMonth(date5, date6); // true
 *
 * const date7 = new Date(2024, 5, 15);   // June 15, 2024
 * const date8 = new Date(2023, 5, 15);   // June 15, 2023
 * isSameMonth(date7, date8); // false (different years)
 * ```
 */
export function isSameMonth(dateLeft: Date | number, dateRight: Date | number): boolean {
  return diffMonths(dateLeft, dateRight) === 0;
}