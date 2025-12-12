import type { DateInput } from "../types";
import { addDays } from "../addDays";
import { isValidNumber } from "../_lib/validators";

/**
 * Subtract the specified number of days from the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified number of days subtracted. Fractional days are truncated toward zero.
 *
 * @param date - The base date as a Date object, timestamp (number), or ISO 8601 string
 * @param amount - The number of days to subtract (can be negative to add)
 * @returns A new Date object with the days subtracted, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Subtract positive days
 * const result = subDays(new Date(2025, 0, 10), 5);
 * // Returns: 2025-01-05
 *
 * // Add days (negative amount)
 * const result = subDays(new Date(2025, 0, 10), -3);
 * // Returns: 2025-01-13
 *
 * // Works with timestamps
 * const timestamp = Date.now();
 * const result = subDays(timestamp, 7);
 * // Returns: Date 7 days ago from now
 *
 * // Works with ISO 8601 strings
 * const result = subDays("2025-01-10", 5);
 * // Returns: 2025-01-05
 *
 * // Fractional amounts are truncated
 * const result = subDays(new Date(2025, 0, 5), 1.9);
 * // Returns: 2025-01-04 (1.9 truncated to 1)
 *
 * // Invalid inputs return Invalid Date
 * const result = subDays(new Date("invalid"), 5);
 * // Returns: Invalid Date
 *
 * const result = subDays(new Date(2025, 0, 1), NaN);
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
export function subDays(date: DateInput, amount: number): Date {
  if (!isValidNumber(amount)) {
    return new Date(NaN);
  }
  return addDays(date, -amount);
}