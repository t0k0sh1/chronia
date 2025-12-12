import type { DateInput } from "../types";
import { addYears } from "../addYears";
import { isValidNumber } from "../_lib/validators";

/**
 * Subtract the specified number of years from the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified number of years subtracted. Fractional years are truncated toward zero.
 * Preserves month, day, and time components. When the source date is Feb 29 and the target
 * year is not a leap year, the result becomes Feb 28.
 *
 * @param date - The base date as a Date object, timestamp (number), or ISO 8601 string
 * @param amount - The number of years to subtract (can be negative to add)
 * @returns A new Date object with the years subtracted, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Subtract positive years
 * const result = subYears(new Date(2020, 0, 15), 3);
 * // Returns: 2017-01-15
 *
 * // Add years (negative amount)
 * const result = subYears(new Date(2020, 0, 15), -3);
 * // Returns: 2023-01-15
 *
 * // Works with ISO 8601 strings
 * const result = subYears("2020-01-15", 3);
 * // Returns: 2017-01-15
 *
 * // Fractional amounts are truncated
 * const result = subYears(new Date(2020, 0, 1), 1.9);
 * // Returns: 2019-01-01 (1.9 truncated to 1)
 *
 * // Leap year to non-leap year (Feb 29 → Feb 28)
 * const result = subYears(new Date(2024, 1, 29), 1);
 * // Returns: 2023-02-28 (2023 is not a leap year)
 *
 * // Leap year to leap year (Feb 29 → Feb 29)
 * const result = subYears(new Date(2024, 1, 29), 4);
 * // Returns: 2020-02-29 (2020 is a leap year)
 *
 * // Invalid inputs return Invalid Date
 * const result = subYears(new Date("invalid"), 3);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Fractions are truncated using Math.trunc (1.9 → 1, -1.9 → -1)
 * - Preserves month, day, and time components (hours, minutes, seconds, milliseconds)
 * - Leap year adjustment: Feb 29 → Feb 28 when target year is not a leap year
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity, invalid strings
 * - Always returns a new Date instance (does not mutate input)
 */
export function subYears(date: DateInput, amount: number): Date {
  if (!isValidNumber(amount)) {
    return new Date(NaN);
  }
  return addYears(date, -amount);
}