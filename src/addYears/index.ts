/**
 * Add the specified number of years to the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified number of years added.
 * - If the input date or amount is invalid, returns `Invalid Date`.
 * - Fractions in `amount` are truncated (e.g., 1.9 → 1, -1.9 → -1).
 * - Leap year adjustment: if the original date is Feb 29 and the target year
 *   is not a leap year, the result becomes Feb 28.
 *
 * @param date - The original date or timestamp.
 * @param amount - The number of years to add (fractions are truncated).
 * @returns A new `Date` object with the years added, or `Invalid Date` if input is invalid.
 */
export function addYears(date: Date | number, amount: number): Date {
  const dt = new Date(date);

  // Validate input: must be a valid date and a finite number
  if (isNaN(dt.getTime()) || !isFinite(amount)) {
    return new Date(NaN);
  }

  // Store original components to handle leap year edge cases
  const originalDay = dt.getDate();
  const originalMonth = dt.getMonth();
  const isOriginallyFeb29 = originalMonth === 1 && originalDay === 29;

  // Truncate fractions and add the years
  const yearToAdd = Math.trunc(amount);
  dt.setFullYear(dt.getFullYear() + yearToAdd);

  // Adjust for leap year (Feb 29 → Feb 28 when target year is not a leap year)
  if (isOriginallyFeb29 && dt.getMonth() !== 1) {
    dt.setMonth(1, 28);
  }

  return dt;
}

