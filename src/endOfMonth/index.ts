/**
 * Get the end of the month for the given date.
 *
 * Returns a new Date object set to the last day of the month at 23:59:59.999.
 *
 * @param date - The original date
 * @returns New Date object representing the end of the month
 *
 * @example
 * ```typescript
 * const date = new Date(2024, 5, 15, 14, 30, 45); // June 15, 2024 14:30:45
 * const end = endOfMonth(date); // June 30, 2024 23:59:59.999
 *
 * const firstDayOfMonth = new Date(2024, 1, 1, 0, 0, 0); // February 1, 2024 00:00:00
 * const monthEnd = endOfMonth(firstDayOfMonth); // February 29, 2024 23:59:59.999 (leap year)
 * ```
 */
export function endOfMonth(date: Date): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth() + 1, // Next month
    0, // 0th day of next month = last day of current month
    23, // 23:59:59.999
    59,
    59,
    999
  );
}