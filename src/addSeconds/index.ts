import { isValidDateOrNumber, isValidNumber } from "../_lib/validators";

/**
 * Add the specified number of seconds to the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified number of seconds added. Fractional seconds are truncated toward zero.
 * Preserves milliseconds.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param amount - The number of seconds to add (can be negative to subtract)
 * @returns A new Date object with the seconds added, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Add positive seconds
 * const result = addSeconds(new Date(2020, 0, 1, 12, 30, 30), 15);
 * // Returns: 2020-01-01T12:30:45
 *
 * // Subtract seconds (negative amount)
 * const result = addSeconds(new Date(2020, 0, 1, 12, 30, 30), -15);
 * // Returns: 2020-01-01T12:30:15
 *
 * // Fractional amounts are truncated
 * const result = addSeconds(new Date(2020, 0, 1, 12, 0, 0), 1.9);
 * // Returns: 2020-01-01T12:00:01 (1.9 truncated to 1)
 *
 * // Crossing minute boundary
 * const result = addSeconds(new Date(2020, 0, 1, 12, 30, 45), 30);
 * // Returns: 2020-01-01T12:31:15
 *
 * // Invalid inputs return Invalid Date
 * const result = addSeconds(new Date("invalid"), 30);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (1.9 → 1, -1.9 → -1)
 * - Preserves milliseconds
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Always returns a new Date instance (does not mutate input)
 */
export function addSeconds(date: Date | number, amount: number): Date {
  if (!isValidDateOrNumber(date) || !isValidNumber(amount))
    return new Date(NaN);

  const dt = new Date(date);
  const secondsToAdd = Math.trunc(amount);

  dt.setSeconds(dt.getSeconds() + secondsToAdd);
  return dt;
}

