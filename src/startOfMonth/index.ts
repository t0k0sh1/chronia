import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Get the start of the month for the given date.
 *
 * Returns a new Date object set to the first day of the month at 00:00:00.000.
 *
 * @param date - The original date or timestamp
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
export function startOfMonth(date: Date | number): Date {
  if (!isValidDateOrNumber(date)) {
    return new Date(NaN);
  }
  const dt = new Date(date);
  return new Date(
    dt.getFullYear(),
    dt.getMonth(),
    1, // First day of the month
    0, // 00:00:00.000
    0,
    0,
    0
  );
}