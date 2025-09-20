/**
 * Add the specified number of minutes to the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified number of minutes added.
 * - If the input date or amount is invalid, returns `Invalid Date`.
 * - Fractions in `amount` are truncated (e.g., 1.9 → 1, -1.9 → -1).
 *
 * @param date - The original date or timestamp.
 * @param amount - The number of minutes to add (fractions are truncated).
 * @returns A new `Date` object with the minutes added, or `Invalid Date` if input is invalid.
 */
export function addMinutes(date: Date | number, amount: number): Date {
  if (!(date instanceof Date || typeof date === "number")) {
    return new Date(NaN);
  }
  if (!(typeof amount === "number")) {
    return new Date(NaN);
  }

  const dt = new Date(date);

  if (isNaN(dt.getTime())) {
    return new Date(NaN);
  }

  const minutesToAdd = Math.trunc(amount);
  dt.setMinutes(dt.getMinutes() + minutesToAdd);
  return dt;
}