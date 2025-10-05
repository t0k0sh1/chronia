import { addMinutes } from "../addMinutes";
import { isValidNumber } from "../_lib/validators";

/**
 * Subtract the specified number of minutes from the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified number of minutes subtracted. Fractional minutes are truncated toward zero.
 * Preserves seconds and milliseconds.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param amount - The number of minutes to subtract (can be negative to add)
 * @returns A new Date object with the minutes subtracted, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Subtract positive minutes
 * const result = subMinutes(new Date(2020, 0, 1, 12, 30, 0), 15);
 * // Returns: 2020-01-01T12:15:00
 *
 * // Add minutes (negative amount)
 * const result = subMinutes(new Date(2020, 0, 1, 12, 30, 0), -15);
 * // Returns: 2020-01-01T12:45:00
 *
 * // Fractional amounts are truncated
 * const result = subMinutes(new Date(2020, 0, 1, 12, 30, 0), 1.9);
 * // Returns: 2020-01-01T12:29:00 (1.9 truncated to 1)
 *
 * // Crossing hour boundary
 * const result = subMinutes(new Date(2020, 0, 1, 12, 15, 0), 30);
 * // Returns: 2020-01-01T11:45:00
 *
 * // Invalid inputs return Invalid Date
 * const result = subMinutes(new Date("invalid"), 30);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (1.9 → 1, -1.9 → -1)
 * - Preserves seconds and milliseconds
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Always returns a new Date instance (does not mutate input)
 */
export function subMinutes(date: Date | number, amount: number): Date {
  if (!isValidNumber(amount)) {
    return new Date(NaN);
  }
  return addMinutes(date, -amount);
}