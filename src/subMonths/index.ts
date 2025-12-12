import type { DateInput } from "../types";
import { addMonths } from "../addMonths";
import { isValidNumber } from "../_lib/validators";

/**
 * Subtract the specified number of months from the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified number of months subtracted. Fractional months are truncated toward zero.
 * Preserves time components (hours, minutes, seconds, milliseconds). When the day of month
 * doesn't exist in the target month, the result becomes the last day of that month.
 *
 * @param date - The base date as a Date object, timestamp (number), or ISO 8601 string
 * @param amount - The number of months to subtract (can be negative to add)
 * @returns A new Date object with the months subtracted, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Subtract positive months
 * const result = subMonths(new Date(2020, 3, 15), 3);
 * // Returns: 2020-01-15
 *
 * // Add months (negative amount)
 * const result = subMonths(new Date(2020, 3, 15), -2);
 * // Returns: 2020-05-15
 *
 * // Works with ISO 8601 strings
 * const result = subMonths("2020-04-15", 3);
 * // Returns: 2020-01-15
 *
 * // Fractional amounts are truncated
 * const result = subMonths(new Date(2020, 3, 15), 1.9);
 * // Returns: 2020-02-15 (1.9 truncated to 1)
 *
 * // Month-end overflow handling (Mar 31 → Feb 28/29)
 * const result = subMonths(new Date(2025, 2, 31), 1);
 * // Returns: 2025-02-28 (Feb doesn't have 31 days)
 *
 * // Leap year handling
 * const result = subMonths(new Date(2024, 2, 31), 1);
 * // Returns: 2024-02-29 (2024 is a leap year)
 *
 * // Invalid inputs return Invalid Date
 * const result = subMonths(new Date("invalid"), 3);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Fractions are truncated using Math.trunc (1.9 → 1, -1.9 → -1)
 * - Preserves time components (hours, minutes, seconds, milliseconds)
 * - Month-end overflow: if original day doesn't exist in target month, returns last day of that month
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity, invalid strings
 * - Always returns a new Date instance (does not mutate input)
 */
export function subMonths(date: DateInput, amount: number): Date {
  if (!isValidNumber(amount)) {
    return new Date(NaN);
  }
  return addMonths(date, -amount);
}