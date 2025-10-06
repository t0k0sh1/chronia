import { isValidDateOrNumber, isValidNumber } from "../_lib/validators";

/**
 * Add the specified number of years to the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified number of years added. Fractional years are truncated toward zero.
 * Preserves month, day, and time components. When the source date is Feb 29 and the target
 * year is not a leap year, the result becomes Feb 28.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param amount - The number of years to add (can be negative to subtract)
 * @returns A new Date object with the years added, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Add positive years
 * const result = addYears(new Date(2020, 0, 15), 3);
 * // Returns: 2023-01-15
 *
 * // Subtract years (negative amount)
 * const result = addYears(new Date(2020, 0, 15), -3);
 * // Returns: 2017-01-15
 *
 * // Fractional amounts are truncated
 * const result = addYears(new Date(2020, 0, 1), 1.9);
 * // Returns: 2021-01-01 (1.9 truncated to 1)
 *
 * // Leap year to non-leap year (Feb 29 → Feb 28)
 * const result = addYears(new Date(2020, 1, 29), 1);
 * // Returns: 2021-02-28 (2021 is not a leap year)
 *
 * // Leap year to leap year (Feb 29 → Feb 29)
 * const result = addYears(new Date(2020, 1, 29), 4);
 * // Returns: 2024-02-29 (2024 is a leap year)
 *
 * // Invalid inputs return Invalid Date
 * const result = addYears(new Date("invalid"), 3);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (1.9 → 1, -1.9 → -1)
 * - Preserves month, day, and time components (hours, minutes, seconds, milliseconds)
 * - Leap year adjustment: Feb 29 → Feb 28 when target year is not a leap year
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Always returns a new Date instance (does not mutate input)
 */
export function addYears(date: Date | number, amount: number): Date {
  if (!isValidDateOrNumber(date) || !isValidNumber(amount))
    return new Date(NaN);

  const dt = new Date(date);
  const yearToAdd = Math.trunc(amount);
  const originalMonth = dt.getMonth();
  const originalDay = dt.getDate();

  dt.setFullYear(dt.getFullYear() + yearToAdd);

  if (originalMonth === 1 && originalDay === 29 && dt.getMonth() !== 1) {
    dt.setMonth(1, 28);
  }

  return dt;
}
