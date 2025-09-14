/**
 * Get the milliseconds of the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns the milliseconds (0-999).
 * - If the date is invalid, returns `NaN`.
 *
 * @param date - The Date or timestamp.
 * @returns The milliseconds as a number (0-999), or `NaN` if invalid.
 */
export function getMilliseconds(date: Date | number): number {
  return new Date(date).getMilliseconds();
}