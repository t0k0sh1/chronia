/**
 * Get the minutes of the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns the minutes (0-59).
 * - If the date is invalid, returns `NaN`.
 *
 * @param date - The Date or timestamp.
 * @returns The minutes as a number (0-59), or `NaN` if invalid.
 */
export function getMinutes(date: Date | number): number {
  return new Date(date).getMinutes();
}