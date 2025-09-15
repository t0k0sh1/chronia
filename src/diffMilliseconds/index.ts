/**
 * Calculate the difference in milliseconds between two dates.
 *
 * Returns the exact difference in milliseconds between two dates.
 * This is the most precise difference calculation.
 *
 * @param dateLeft - The first date or timestamp
 * @param dateRight - The second date or timestamp
 * @returns The difference in milliseconds (negative if dateLeft is before dateRight)
 *
 * @example
 * ```typescript
 * const date1 = new Date(2024, 5, 15, 14, 30, 45, 500); // June 15, 2024 14:30:45.500
 * const date2 = new Date(2024, 5, 15, 14, 30, 45, 100); // June 15, 2024 14:30:45.100
 * diffMilliseconds(date1, date2); // 400
 *
 * const date3 = new Date(2024, 5, 15, 14, 30, 46, 0);   // June 15, 2024 14:30:46.000
 * const date4 = new Date(2024, 5, 15, 14, 30, 45, 0);   // June 15, 2024 14:30:45.000
 * diffMilliseconds(date3, date4); // 1000
 *
 * const date5 = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
 * const date6 = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
 * diffMilliseconds(date5, date6); // 0 (exact same time)
 * ```
 */
export function diffMilliseconds(dateLeft: Date | number, dateRight: Date | number): number {
  const dtLeft = new Date(dateLeft);
  const dtRight = new Date(dateRight);
  return dtLeft.getTime() - dtRight.getTime();
}