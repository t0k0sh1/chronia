import { isValidDateOrNumber, isValidNumber } from "../_lib/validators";

/**
 * Add the specified number of minutes to the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified number of minutes added. Fractional minutes are truncated toward zero.
 * Preserves seconds and milliseconds.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param amount - The number of minutes to add (can be negative to subtract)
 * @returns A new Date object with the minutes added, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Add positive minutes
 * const result = addMinutes(new Date(2020, 0, 1, 12, 30, 0), 15);
 * // Returns: 2020-01-01T12:45:00
 *
 * // Subtract minutes (negative amount)
 * const result = addMinutes(new Date(2020, 0, 1, 12, 30, 0), -15);
 * // Returns: 2020-01-01T12:15:00
 *
 * // Fractional amounts are truncated
 * const result = addMinutes(new Date(2020, 0, 1, 12, 0, 0), 1.9);
 * // Returns: 2020-01-01T12:01:00 (1.9 truncated to 1)
 *
 * // Crossing hour boundary
 * const result = addMinutes(new Date(2020, 0, 1, 12, 45, 0), 30);
 * // Returns: 2020-01-01T13:15:00
 *
 * // Invalid inputs return Invalid Date
 * const result = addMinutes(new Date("invalid"), 30);
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
export function addMinutes(date: Date | number, amount: number): Date {
  if (!isValidDateOrNumber(date) || !isValidNumber(amount))
    return new Date(NaN);

  const dt = new Date(date);
  const minutesToAdd = Math.trunc(amount);

  dt.setMinutes(dt.getMinutes() + minutesToAdd);
  return dt;
}

