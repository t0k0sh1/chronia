import { truncateToUnit } from "../_lib/truncateToUnit";

/**
 * Truncate a date to the start of the minute.
 *
 * Sets the seconds and milliseconds to 0 while keeping the same date, hour, and minute.
 *
 * @param date - The date or timestamp to truncate
 * @returns New Date object truncated to the start of the minute
 *
 * @example
 * ```typescript
 * const date = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
 * const truncated = truncMinute(date); // June 15, 2024 14:30:00.000
 * ```
 */
export function truncMinute(date: Date | number): Date {
  const dt = new Date(date);
  return truncateToUnit(dt, "minute");
}