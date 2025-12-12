import type { DateInput } from "../types";
import { addMilliseconds } from "../addMilliseconds";
import { isValidNumber } from "../_lib/validators";

/**
 * Subtract the specified number of milliseconds from the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified number of milliseconds subtracted. Fractional milliseconds are truncated toward zero.
 *
 * @param date - The base date as a Date object, timestamp (number), or ISO 8601 string
 * @param amount - The number of milliseconds to subtract (can be negative to add)
 * @returns A new Date object with the milliseconds subtracted, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Subtract positive milliseconds
 * const result = subMilliseconds(new Date(2020, 0, 1, 12, 0, 0, 500), 300);
 * // Returns: 2020-01-01T12:00:00.200
 *
 * // Add milliseconds (negative amount)
 * const result = subMilliseconds(new Date(2020, 0, 1, 12, 0, 0, 200), -300);
 * // Returns: 2020-01-01T12:00:00.500
 *
 * // Works with ISO 8601 strings
 * const result = subMilliseconds("2020-01-01T12:00:00.500", 300);
 * // Returns: 2020-01-01T12:00:00.200
 *
 * // Fractional amounts are truncated
 * const result = subMilliseconds(new Date(2020, 0, 1, 12, 0, 0, 100), 1.9);
 * // Returns: 2020-01-01T12:00:00.099 (1.9 truncated to 1)
 *
 * // Crossing second boundary backward
 * const result = subMilliseconds(new Date(2020, 0, 1, 12, 0, 1, 0), 1);
 * // Returns: 2020-01-01T12:00:00.999
 *
 * // Invalid inputs return Invalid Date
 * const result = subMilliseconds(new Date("invalid"), 500);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Fractions are truncated using Math.trunc (1.9 → 1, -1.9 → -1)
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity, invalid strings
 * - Always returns a new Date instance (does not mutate input)
 */
export function subMilliseconds(date: DateInput, amount: number): Date {
  if (!isValidNumber(amount)) {
    return new Date(NaN);
  }
  return addMilliseconds(date, -amount);
}