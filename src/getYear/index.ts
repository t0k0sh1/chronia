/**
 * Get the full year of the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns the full year (e.g., 2025).
 * - If the date is invalid, returns `NaN`.
 *
 * @param date - The Date or timestamp.
 * @returns The year as a number, or `NaN` if invalid.
 */
export function getYear(date: Date | number): number {
  return new Date(date).getFullYear();
}

