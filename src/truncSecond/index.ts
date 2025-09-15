import { truncateToUnit } from "../_lib/truncateToUnit";

/**
 * Truncate a date to the start of the second.
 *
 * Sets the milliseconds to 0 while keeping the same date, hour, minute, and second.
 *
 * @param date - The date or timestamp to truncate
 * @returns New Date object truncated to the start of the second
 *
 * @example
 * ```typescript
 * const date = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
 * const truncated = truncSecond(date); // June 15, 2024 14:30:45.000
 * ```
 */
export function truncSecond(date: Date | number): Date {
  const dt = new Date(date);
  return truncateToUnit(dt, "second");
}