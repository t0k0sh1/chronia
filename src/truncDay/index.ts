import { truncateToUnit } from "../_lib/truncateToUnit";

/**
 * Truncate a date to the start of the day.
 *
 * Sets the time to 00:00:00.000 while keeping the same date.
 *
 * @param date - The date or timestamp to truncate
 * @returns New Date object truncated to the start of the day
 *
 * @example
 * ```typescript
 * const date = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
 * const truncated = truncDay(date); // June 15, 2024 00:00:00.000
 * ```
 */
export function truncDay(date: Date | number): Date {
  const dt = new Date(date);
  return truncateToUnit(dt, "day");
}