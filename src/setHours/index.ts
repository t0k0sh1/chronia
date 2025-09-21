/**
 * Set the hours of the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified hours set.
 * - If the input date or hours is invalid, returns `Invalid Date`.
 * - Fractions in `hours` are truncated (e.g., 14.9 → 14, -14.9 → -14).
 * - Hours values outside 0-23 will cause date to roll over to adjacent days.
 *
 * @param date - The original date or timestamp.
 * @param hours - The hours to set (0-23, fractions are truncated).
 * @returns A new `Date` object with the hours set, or `Invalid Date` if input is invalid.
 */
export function setHours(date: Date | number, hours: number): Date {
  if (!(date instanceof Date || typeof date === "number")) {
    return new Date(NaN);
  }
  if (!(typeof hours === "number")) {
    return new Date(NaN);
  }

  const dt = new Date(date);

  if (isNaN(dt.getTime())) {
    return new Date(NaN);
  }

  const hoursToSet = Math.trunc(hours);

  dt.setHours(hoursToSet);

  return dt;
}