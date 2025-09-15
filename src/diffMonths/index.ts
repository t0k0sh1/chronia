/**
 * Calculate the difference in calendar months between two dates.
 *
 * Returns the number of full months between the earlier and later date.
 * Only considers year and month values, ignoring days and time components.
 *
 * @param dateLeft - The first date or timestamp
 * @param dateRight - The second date or timestamp
 * @returns The difference in months (negative if dateLeft is before dateRight)
 *
 * @example
 * ```typescript
 * const date1 = new Date(2024, 5, 15);  // June 15, 2024
 * const date2 = new Date(2024, 2, 1);   // March 1, 2024
 * diffMonths(date1, date2); // 3
 *
 * const date3 = new Date(2024, 0, 31);  // January 31, 2024
 * const date4 = new Date(2023, 11, 1);  // December 1, 2023
 * diffMonths(date3, date4); // 1
 *
 * const date5 = new Date(2025, 2, 1);   // March 1, 2025
 * const date6 = new Date(2024, 2, 31);  // March 31, 2024
 * diffMonths(date5, date6); // 12
 * ```
 */
export function diffMonths(dateLeft: Date | number, dateRight: Date | number): number {
  const dtLeft = new Date(dateLeft);
  const dtRight = new Date(dateRight);
  const yearDiff = dtLeft.getFullYear() - dtRight.getFullYear();
  const monthDiff = dtLeft.getMonth() - dtRight.getMonth();
  return yearDiff * 12 + monthDiff;
}