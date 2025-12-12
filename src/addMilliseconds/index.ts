import type { DateInput } from "../types";
import { isValidDateInput, isValidNumber } from "../_lib/validators";
import { toDate } from "../_lib/toDate";

/**
 * Add the specified number of milliseconds to the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified number of milliseconds added. Fractional milliseconds are truncated toward zero.
 *
 * @param date - The base date as a Date object, timestamp (number), or ISO 8601 string
 * @param amount - The number of milliseconds to add (can be negative to subtract)
 * @returns A new Date object with the milliseconds added, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Add positive milliseconds
 * const result = addMilliseconds(new Date(2020, 0, 1, 12, 0, 0, 0), 500);
 * // Returns: 2020-01-01T12:00:00.500
 *
 * // Subtract milliseconds (negative amount)
 * const result = addMilliseconds(new Date(2020, 0, 1, 12, 0, 0, 500), -300);
 * // Returns: 2020-01-01T12:00:00.200
 *
 * // Works with ISO 8601 strings
 * const result = addMilliseconds("2020-01-01T12:00:00.000", 500);
 * // Returns: 2020-01-01T12:00:00.500
 *
 * // Fractional amounts are truncated
 * const result = addMilliseconds(new Date(2020, 0, 1, 12, 0, 0, 0), 1.9);
 * // Returns: 2020-01-01T12:00:00.001 (1.9 truncated to 1)
 *
 * // Crossing second boundary
 * const result = addMilliseconds(new Date(2020, 0, 1, 12, 0, 0, 999), 1);
 * // Returns: 2020-01-01T12:00:01.000
 *
 * // Invalid inputs return Invalid Date
 * const result = addMilliseconds(new Date("invalid"), 500);
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
export function addMilliseconds(date: DateInput, amount: number): Date {
  if (!isValidDateInput(date) || !isValidNumber(amount))
    return new Date(NaN);

  const dt = toDate(date);

  const millisecondsToAdd = Math.trunc(amount);
  dt.setMilliseconds(dt.getMilliseconds() + millisecondsToAdd);
  return dt;
}

