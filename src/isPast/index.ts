import { compareDateTimes } from "../_lib/compareDates";

/**
 * Checks if the given date is in the past relative to the current time.
 *
 * This function determines whether a date or timestamp occurs before the current moment.
 * It performs a strict comparison at millisecond precision, returning `true` only when
 * the given date is strictly before the current time. If the date equals the current time
 * (same millisecond), it returns `false` because the date is in the present, not the past.
 *
 * @param date - The date to check (Date object or numeric timestamp)
 *
 * @returns `true` if the date is strictly in the past, `false` otherwise
 *   - Returns `true` when date < Date.now() (strictly in the past)
 *   - Returns `false` when date >= Date.now() (future or present)
 *   - Returns `false` for invalid inputs (Invalid Date, NaN, Infinity, -Infinity)
 *
 * @example
 * ```typescript
 * // Past date (assuming current time is 2025-01-15T00:00:00Z)
 * isPast(new Date(2024, 11, 1));
 * // Returns: true
 *
 * // Future date
 * isPast(new Date(2025, 0, 20));
 * // Returns: false
 *
 * // Current time (exactly now)
 * isPast(Date.now());
 * // Returns: false (present, not past)
 *
 * // Past timestamp
 * isPast(Date.now() - 1000);
 * // Returns: true (1 second in the past)
 *
 * // Invalid Date
 * isPast(new Date(NaN));
 * // Returns: false
 *
 * // Invalid timestamp: NaN
 * isPast(NaN);
 * // Returns: false
 *
 * // Invalid timestamp: Infinity
 * isPast(Infinity);
 * // Returns: false
 * ```
 *
 * @remarks
 * - This function uses `Date.now()` to obtain the current time at invocation
 * - Comparison is performed at millisecond precision using `compareDateTimes` helper
 * - Never throws exceptions; returns `false` for invalid inputs
 * - Pure function (no side effects, but depends on current system time)
 * - Accepts both Date objects and numeric timestamps for flexibility
 * - Returns `false` when date equals current time (not strictly in the past)
 *
 * @see {@link isFuture} - Check if a date is in the future
 * @see {@link isBefore} - Check if one date is before another date
 */
export function isPast(date: Date | number): boolean {
  // compareDateTimes handles validation and returns:
  // - -1 if date < now (strictly past)
  // - 0 if date === now (present)
  // - 1 if date > now (future)
  // - false if invalid input
  return compareDateTimes(date, Date.now()) === -1;
}
