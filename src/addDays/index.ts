import { isValidDateOrNumber, isValidNumber } from "../_lib/validators";

/**
 * Add the specified number of days to the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified number of days added. Fractional days are truncated toward zero.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param amount - The number of days to add (can be negative to subtract)
 * @returns A new Date object with the days added, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Add positive days
 * const result = addDays(new Date(2025, 0, 1), 5);
 * // Returns: 2025-01-06
 *
 * // Subtract days (negative amount)
 * const result = addDays(new Date(2025, 0, 10), -3);
 * // Returns: 2025-01-07
 *
 * // Works with timestamps
 * const timestamp = Date.now();
 * const result = addDays(timestamp, 7);
 * // Returns: Date 7 days from now
 *
 * // Fractional amounts are truncated
 * const result = addDays(new Date(2025, 0, 1), 1.9);
 * // Returns: 2025-01-02 (1.9 truncated to 1)
 *
 * // Invalid inputs return Invalid Date
 * const result = addDays(new Date("invalid"), 5);
 * // Returns: Invalid Date
 *
 * const result = addDays(new Date(2025, 0, 1), NaN);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (1.9 → 1, -1.9 → -1)
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Always returns a new Date instance (does not mutate input)
 */
export function addDays(date: Date | number, amount: number): Date {
  if (!isValidDateOrNumber(date) || !isValidNumber(amount))
    return new Date(NaN);

  const dt = new Date(date);
  const daysToAdd = Math.trunc(amount);

  dt.setDate(dt.getDate() + daysToAdd);
  return dt;
}
