import type { DateInput } from "../types";
import { addHours } from "../addHours";
import { isValidNumber } from "../_lib/validators";

/**
 * Subtract the specified number of hours from the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified number of hours subtracted. Fractional hours are truncated toward zero.
 * Minutes, seconds, and milliseconds are preserved.
 *
 * @param date - The base date as a Date object, timestamp (number), or ISO 8601 string
 * @param amount - The number of hours to subtract (can be negative to add)
 * @returns A new Date object with the hours subtracted, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Subtract positive hours
 * const result = subHours(new Date(2025, 0, 15, 18, 0, 0), 5);
 * // Returns: 2025-01-15 13:00:00
 *
 * // Add hours (negative amount)
 * const result = subHours(new Date(2025, 0, 15, 10, 30, 0), -3);
 * // Returns: 2025-01-15 13:30:00
 *
 * // Works with ISO 8601 strings
 * const result = subHours("2025-01-15T18:00:00", 5);
 * // Returns: 2025-01-15 13:00:00
 *
 * // Fractional amounts are truncated
 * const result = subHours(new Date(2025, 0, 15, 15, 0, 0), 1.9);
 * // Returns: 2025-01-15 14:00:00 (1.9 truncated to 1)
 *
 * // Crosses day boundary
 * const result = subHours(new Date(2025, 0, 15, 2, 0, 0), 4);
 * // Returns: 2025-01-14 22:00:00
 *
 * // Invalid inputs return Invalid Date
 * const result = subHours(new Date("invalid"), 3);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Fractions are truncated using Math.trunc (1.9 → 1, -1.9 → -1)
 * - Preserves minutes, seconds, and milliseconds
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity, invalid strings
 * - Always returns a new Date instance (does not mutate input)
 */
export function subHours(date: DateInput, amount: number): Date {
  if (!isValidNumber(amount)) {
    return new Date(NaN);
  }
  return addHours(date, -amount);
}