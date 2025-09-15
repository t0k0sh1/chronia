/**
 * Calculate the difference in complete hours between two dates.
 *
 * Returns the number of complete hours between the earlier and later date.
 * Ignores minutes, seconds, and milliseconds - only counts full hour boundaries crossed.
 *
 * @param dateLeft - The first date
 * @param dateRight - The second date
 * @returns The difference in complete hours (negative if dateLeft is before dateRight)
 *
 * @example
 * ```typescript
 * const date1 = new Date(2024, 5, 15, 14, 59, 59); // June 15, 2024 14:59:59
 * const date2 = new Date(2024, 5, 15, 12, 0, 0);   // June 15, 2024 12:00:00
 * diffHours(date1, date2); // 2 (complete hours)
 *
 * const date3 = new Date(2024, 5, 15, 14, 30);     // June 15, 2024 14:30
 * const date4 = new Date(2024, 5, 15, 14, 59);     // June 15, 2024 14:59
 * diffHours(date3, date4); // 0 (same hour)
 *
 * const date5 = new Date(2024, 5, 16, 2, 0);  // June 16, 2024 02:00
 * const date6 = new Date(2024, 5, 15, 23, 0); // June 15, 2024 23:00
 * diffHours(date5, date6); // 3
 * ```
 */
export function diffHours(dateLeft: Date, dateRight: Date): number {
  // Create dates at the start of each hour for comparison
  const leftHour = new Date(
    dateLeft.getFullYear(),
    dateLeft.getMonth(),
    dateLeft.getDate(),
    dateLeft.getHours()
  );
  const rightHour = new Date(
    dateRight.getFullYear(),
    dateRight.getMonth(),
    dateRight.getDate(),
    dateRight.getHours()
  );

  const diffTime = leftHour.getTime() - rightHour.getTime();
  const millisecondsPerHour = 1000 * 60 * 60;
  return Math.round(diffTime / millisecondsPerHour);
}