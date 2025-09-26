import { truncateToUnit } from "../_lib/truncateToUnit";
import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Truncate a date to the start of the month.
 *
 * Sets the date to the 1st day of the month at 00:00:00.000.
 *
 * @param date - The date or timestamp to truncate
 * @returns New Date object truncated to the start of the month
 *
 * @example
 * ```typescript
 * const date = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
 * const truncated = truncMonth(date); // June 1, 2024 00:00:00.000
 * ```
 */
export function truncMonth(date: Date | number): Date {
  if (!isValidDateOrNumber(date)) {
    return new Date(NaN);
  }
  const dt = new Date(date);
  return truncateToUnit(dt, "month");
}