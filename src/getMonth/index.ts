/**
 * Get the month of the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns the month as 1-12 (January is 1, December is 12).
 * - If the date is invalid, returns `NaN`.
 *
 * @param date - The Date or timestamp.
 * @returns The month as a number (1-12), or `NaN` if invalid.
 */
export function getMonth(date: Date | number): number {
  const d = new Date(date);
  // JavaScript's getMonth() returns 0-11, we want 1-12
  return d.getMonth() + 1;
}