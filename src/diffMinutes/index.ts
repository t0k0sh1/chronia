/**
 * Calculate the difference in complete minutes between two dates.
 *
 * Returns the number of complete minutes between the earlier and later date.
 * Ignores seconds and milliseconds - only counts full minute boundaries crossed.
 *
 * @param dateLeft - The first date or timestamp
 * @param dateRight - The second date or timestamp
 * @returns The difference in complete minutes (negative if dateLeft is before dateRight)
 *
 * @example
 * ```typescript
 * const date1 = new Date(2024, 5, 15, 14, 30, 59); // June 15, 2024 14:30:59
 * const date2 = new Date(2024, 5, 15, 14, 28, 0);  // June 15, 2024 14:28:00
 * diffMinutes(date1, date2); // 2 (complete minutes)
 *
 * const date3 = new Date(2024, 5, 15, 14, 30, 0);  // June 15, 2024 14:30:00
 * const date4 = new Date(2024, 5, 15, 14, 30, 59); // June 15, 2024 14:30:59
 * diffMinutes(date3, date4); // 0 (same minute)
 *
 * const date5 = new Date(2024, 5, 15, 15, 0);  // June 15, 2024 15:00
 * const date6 = new Date(2024, 5, 15, 14, 45); // June 15, 2024 14:45
 * diffMinutes(date5, date6); // 15
 * ```
 */
export function diffMinutes(dateLeft: Date | number, dateRight: Date | number): number {
  const dtLeft = new Date(dateLeft);
  const dtRight = new Date(dateRight);
  // Create dates at the start of each minute for comparison
  const leftMinute = new Date(
    dtLeft.getFullYear(),
    dtLeft.getMonth(),
    dtLeft.getDate(),
    dtLeft.getHours(),
    dtLeft.getMinutes()
  );
  const rightMinute = new Date(
    dtRight.getFullYear(),
    dtRight.getMonth(),
    dtRight.getDate(),
    dtRight.getHours(),
    dtRight.getMinutes()
  );

  const diffTime = leftMinute.getTime() - rightMinute.getTime();
  const millisecondsPerMinute = 1000 * 60;
  return Math.round(diffTime / millisecondsPerMinute);
}