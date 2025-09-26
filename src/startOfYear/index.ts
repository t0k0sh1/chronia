import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Get the start of the year for the given date.
 *
 * Returns a new Date object set to January 1st at 00:00:00.000 of the same year.
 *
 * @param date - The original date or timestamp
 * @returns New Date object representing the start of the year
 *
 * @example
 * ```typescript
 * const date = new Date(2024, 5, 15, 14, 30, 45); // June 15, 2024 14:30:45
 * const start = startOfYear(date); // January 1, 2024 00:00:00.000
 *
 * const lastDayOfYear = new Date(2024, 11, 31, 23, 59, 59); // December 31, 2024 23:59:59
 * const yearStart = startOfYear(lastDayOfYear); // January 1, 2024 00:00:00.000
 * ```
 */
export function startOfYear(date: Date | number): Date {
  if (!isValidDateOrNumber(date)) {
    return new Date(NaN);
  }
  const dt = new Date(date);
  return new Date(
    dt.getFullYear(),
    0, // January (month 0)
    1, // First day of the year
    0, // 00:00:00.000
    0,
    0,
    0
  );
}