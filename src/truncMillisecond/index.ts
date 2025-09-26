import { truncateToUnit } from "../_lib/truncateToUnit";
import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Truncate a date to the millisecond.
 *
 * Returns the same date without any truncation since millisecond is the smallest unit.
 * This function is provided for API consistency.
 *
 * @param date - The date or timestamp to truncate
 * @returns New Date object (identical to the input)
 *
 * @example
 * ```typescript
 * const date = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
 * const truncated = truncMillisecond(date); // June 15, 2024 14:30:45.123 (same)
 * ```
 */
export function truncMillisecond(date: Date | number): Date {
  if (!isValidDateOrNumber(date)) {
    return new Date(NaN);
  }
  const dt = new Date(date);
  return truncateToUnit(dt, "millisecond");
}