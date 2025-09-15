/**
 * Get the start of the month for the given date.
 *
 * Returns a new Date object set to the first day of the month at 00:00:00.000.
 *
 * @param date - The original date
 * @returns New Date object representing the start of the month
 *
 * @example
 * ```typescript
 * const date = new Date(2024, 5, 15, 14, 30, 45); // June 15, 2024 14:30:45
 * const start = startOfMonth(date); // June 1, 2024 00:00:00.000
 *
 * const lastDayOfMonth = new Date(2024, 5, 30, 23, 59, 59); // June 30, 2024 23:59:59
 * const monthStart = startOfMonth(lastDayOfMonth); // June 1, 2024 00:00:00.000
 * ```
 */
export function startOfMonth(date: Date): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    1, // First day of the month
    0, // 00:00:00.000
    0,
    0,
    0
  );
}