import type { DateInput } from "../types";
import { compareDateTimes } from "../_lib/compareDates";

/**
 * Checks if the given date is in the future relative to the current time.
 *
 * This function determines whether a date or timestamp occurs after the current moment.
 * It performs a strict comparison at millisecond precision, returning `true` only when
 * the given date is strictly after the current time. If the date equals the current time
 * (same millisecond), it returns `false` because the date is in the present, not the future.
 *
 * @param date - The date to check (Date object, numeric timestamp, or ISO 8601 string)
 *
 * @returns `true` if the date is strictly in the future, `false` otherwise
 *   - Returns `true` when date > Date.now() (strictly in the future)
 *   - Returns `false` when date <= Date.now() (past or present)
 *   - Returns `false` for invalid inputs (Invalid Date, NaN, Infinity, -Infinity)
 *
 * @example
 * ```typescript
 * // Future date (assuming current time is 2025-01-15T00:00:00Z)
 * isFuture(new Date(2025, 0, 20));
 * // Returns: true
 *
 * // Past date
 * isFuture(new Date(2024, 11, 1));
 * // Returns: false
 *
 * // Current time (exactly now)
 * isFuture(Date.now());
 * // Returns: false (present, not future)
 *
 * // Future timestamp
 * isFuture(Date.now() + 1000);
 * // Returns: true (1 second in the future)
 *
 * // Invalid Date
 * isFuture(new Date(NaN));
 * // Returns: false
 *
 * // Invalid timestamp: NaN
 * isFuture(NaN);
 * // Returns: false
 *
 * // Invalid timestamp: Infinity
 * isFuture(Infinity);
 * // Returns: false
 *
 * // Future ISO 8601 string
 * isFuture("2030-01-01");
 * // Returns: true (assuming current year is before 2030)
 * ```
 *
 * @remarks
 * - This function uses `Date.now()` to obtain the current time at invocation
 * - Comparison is performed at millisecond precision using `compareDateTimes` helper
 * - Never throws exceptions; returns `false` for invalid inputs
 * - Pure function (no side effects, but depends on current system time)
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings for flexibility
 * - Returns `false` when date equals current time (not strictly in the future)
 *
 * @see {@link isPast} - Check if a date is in the past
 * @see {@link isAfter} - Check if one date is after another date
 */
export function isFuture(date: DateInput): boolean {
  return compareDateTimes(date, Date.now()) === 1;
}
