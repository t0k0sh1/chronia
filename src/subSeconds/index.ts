import { addSeconds } from "../addSeconds";
import { isValidNumber } from "../_lib/validators";

/**
 * Subtract the specified number of seconds from the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified number of seconds subtracted. Fractional seconds are truncated toward zero.
 * Preserves milliseconds.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param amount - The number of seconds to subtract (can be negative to add)
 * @returns A new Date object with the seconds subtracted, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Subtract positive seconds
 * const result = subSeconds(new Date(2020, 0, 1, 12, 30, 45), 15);
 * // Returns: 2020-01-01T12:30:30
 *
 * // Add seconds (negative amount)
 * const result = subSeconds(new Date(2020, 0, 1, 12, 30, 30), -15);
 * // Returns: 2020-01-01T12:30:45
 *
 * // Fractional amounts are truncated
 * const result = subSeconds(new Date(2020, 0, 1, 12, 0, 30), 1.9);
 * // Returns: 2020-01-01T12:00:29 (1.9 truncated to 1)
 *
 * // Crossing minute boundary
 * const result = subSeconds(new Date(2020, 0, 1, 12, 31, 15), 30);
 * // Returns: 2020-01-01T12:30:45
 *
 * // Invalid inputs return Invalid Date
 * const result = subSeconds(new Date("invalid"), 30);
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
export function subSeconds(date: Date | number, amount: number): Date {
  if (!isValidNumber(amount)) {
    return new Date(NaN);
  }
  return addSeconds(date, -amount);
}