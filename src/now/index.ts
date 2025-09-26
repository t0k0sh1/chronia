/**
 * Get the current date and time.
 *
 * Returns a new Date object representing the current moment.
 * This function provides a consistent way to get the current time
 * across the chronia library ecosystem.
 *
 * @returns {Date} Current date and time as Date object
 *
 * @example
 * ```typescript
 * import { now } from 'chronia';
 *
 * const currentTime = now();
 * console.log(currentTime); // 2025-01-21T10:30:45.123Z
 *
 * // Use with other chronia functions
 * const tomorrow = addDays(now(), 1);
 * const oneHourAgo = subHours(now(), 1);
 * const formatted = format(now(), 'yyyy-MM-dd HH:mm:ss');
 * ```
 */
export function now(): Date {
  return new Date();
}