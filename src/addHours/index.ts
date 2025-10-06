import { isValidDateOrNumber, isValidNumber } from "../_lib/validators";

/**
 * Add the specified number of hours to the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified number of hours added. Fractional hours are truncated toward zero.
 * Minutes, seconds, and milliseconds are preserved.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param amount - The number of hours to add (can be negative to subtract)
 * @returns A new Date object with the hours added, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Add positive hours
 * const result = addHours(new Date(2020, 5, 15, 12, 0, 0), 3);
 * // Returns: 2020-06-15 15:00:00
 *
 * // Subtract hours (negative amount)
 * const result = addHours(new Date(2025, 8, 10, 15, 30, 0), -5);
 * // Returns: 2025-09-10 10:30:00
 *
 * // Fractional amounts are truncated
 * const result = addHours(new Date(2020, 0, 1, 12, 0, 0), 1.9);
 * // Returns: 2020-01-01 13:00:00 (1.9 truncated to 1)
 *
 * // Crosses day boundary
 * const result = addHours(new Date(2020, 0, 1, 23, 0, 0), 2);
 * // Returns: 2020-01-02 01:00:00
 *
 * // Invalid inputs return Invalid Date
 * const result = addHours(new Date("invalid"), 3);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (1.9 → 1, -1.9 → -1)
 * - Preserves minutes, seconds, and milliseconds
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Always returns a new Date instance (does not mutate input)
 */
export function addHours(date: Date | number, amount: number): Date {
  if (!isValidDateOrNumber(date) || !isValidNumber(amount))
    return new Date(NaN);

  const dt = new Date(date);
  const hoursToAdd = Math.trunc(amount);

  dt.setHours(dt.getHours() + hoursToAdd);
  return dt;
}

