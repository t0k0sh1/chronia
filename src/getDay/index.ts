/**
 * Get the day of the month from the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns the day of the month (1-31).
 * - If the date is invalid, returns `NaN`.
 *
 * @param date - The Date or timestamp.
 * @returns The day of the month as a number (1-31), or `NaN` if invalid.
 */
export function getDay(date: Date | number): number {
  return new Date(date).getDate();
}