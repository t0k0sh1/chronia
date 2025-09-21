/**
 * Set the milliseconds of the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified milliseconds set.
 * - If the input date or milliseconds is invalid, returns `Invalid Date`.
 * - Fractions in `milliseconds` are truncated (e.g., 500.9 → 500, -500.9 → -500).
 * - Milliseconds values outside 0-999 will cause date to roll over to adjacent seconds.
 *
 * @param date - The original date or timestamp.
 * @param milliseconds - The milliseconds to set (0-999, fractions are truncated).
 * @returns A new `Date` object with the milliseconds set, or `Invalid Date` if input is invalid.
 */
export function setMilliseconds(date: Date | number, milliseconds: number): Date {
  if (!(date instanceof Date || typeof date === "number")) {
    return new Date(NaN);
  }
  if (!(typeof milliseconds === "number")) {
    return new Date(NaN);
  }

  const dt = new Date(date);

  if (isNaN(dt.getTime())) {
    return new Date(NaN);
  }

  const millisecondsToSet = Math.trunc(milliseconds);

  dt.setMilliseconds(millisecondsToSet);

  return dt;
}