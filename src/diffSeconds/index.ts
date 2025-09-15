/**
 * Calculate the difference in complete seconds between two dates.
 *
 * Returns the number of complete seconds between the earlier and later date.
 * Ignores milliseconds - only counts full second boundaries crossed.
 *
 * @param dateLeft - The first date or timestamp
 * @param dateRight - The second date or timestamp
 * @returns The difference in complete seconds (negative if dateLeft is before dateRight)
 *
 * @example
 * ```typescript
 * const date1 = new Date(2024, 5, 15, 14, 30, 45, 999); // June 15, 2024 14:30:45.999
 * const date2 = new Date(2024, 5, 15, 14, 30, 43, 0);   // June 15, 2024 14:30:43.000
 * diffSeconds(date1, date2); // 2 (complete seconds)
 *
 * const date3 = new Date(2024, 5, 15, 14, 30, 45, 0);   // June 15, 2024 14:30:45.000
 * const date4 = new Date(2024, 5, 15, 14, 30, 45, 999); // June 15, 2024 14:30:45.999
 * diffSeconds(date3, date4); // 0 (same second)
 *
 * const date5 = new Date(2024, 5, 15, 14, 31, 0);  // June 15, 2024 14:31:00
 * const date6 = new Date(2024, 5, 15, 14, 30, 30); // June 15, 2024 14:30:30
 * diffSeconds(date5, date6); // 30
 * ```
 */
export function diffSeconds(dateLeft: Date | number, dateRight: Date | number): number {
  const dtLeft = new Date(dateLeft);
  const dtRight = new Date(dateRight);
  // Create dates at the start of each second for comparison
  const leftSecond = new Date(
    dtLeft.getFullYear(),
    dtLeft.getMonth(),
    dtLeft.getDate(),
    dtLeft.getHours(),
    dtLeft.getMinutes(),
    dtLeft.getSeconds()
  );
  const rightSecond = new Date(
    dtRight.getFullYear(),
    dtRight.getMonth(),
    dtRight.getDate(),
    dtRight.getHours(),
    dtRight.getMinutes(),
    dtRight.getSeconds()
  );

  const diffTime = leftSecond.getTime() - rightSecond.getTime();
  const millisecondsPerSecond = 1000;
  return Math.round(diffTime / millisecondsPerSecond);
}