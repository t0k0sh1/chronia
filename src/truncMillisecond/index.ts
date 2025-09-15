import { truncateToUnit } from "../_lib/truncateToUnit";

/**
 * Truncate a date to the millisecond.
 *
 * Returns the same date without any truncation since millisecond is the smallest unit.
 * This function is provided for API consistency.
 *
 * @param date - The date to truncate
 * @returns New Date object (identical to the input)
 *
 * @example
 * ```typescript
 * const date = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
 * const truncated = truncMillisecond(date); // June 15, 2024 14:30:45.123 (same)
 * ```
 */
export function truncMillisecond(date: Date): Date {
  return truncateToUnit(date, "millisecond");
}