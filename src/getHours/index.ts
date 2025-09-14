/**
 * Get the hours of the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns the hours (0-23) in 24-hour format.
 * - If the date is invalid, returns `NaN`.
 *
 * @param date - The Date or timestamp.
 * @returns The hours as a number (0-23), or `NaN` if invalid.
 */
export function getHours(date: Date | number): number {
  return new Date(date).getHours();
}