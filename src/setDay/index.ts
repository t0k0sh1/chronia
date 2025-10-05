import { isValidDateOrNumber, isValidNumber } from "../_lib/validators";

/**
 * Set the day of the month of the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified day set. Fractional days are truncated toward zero.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param day - The day to set (1-31, fractions are truncated)
 * @returns A new Date object with the day set, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Set day to 1st
 * const result = setDay(new Date(2025, 0, 15), 1);
 * // Returns: 2025-01-01
 *
 * // Set day to last day of month
 * const result2 = setDay(new Date(2025, 0, 15), 31);
 * // Returns: 2025-01-31
 *
 * // Day overflow (Jan 32 → Feb 1)
 * const result3 = setDay(new Date(2025, 0, 15), 32);
 * // Returns: 2025-02-01
 *
 * // Fractional day is truncated
 * const result4 = setDay(new Date(2025, 0, 15), 15.9);
 * // Returns: 2025-01-15
 *
 * // Invalid date returns Invalid Date
 * const result5 = setDay(new Date("invalid"), 15);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (15.9 → 15, -15.9 → -15)
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Preserves year, month, and time components (hours, minutes, seconds, milliseconds)
 * - Rollover behavior: Day values outside valid range cause date to roll over to adjacent months (e.g., Jan 32 → Feb 1, day 0 → last day of previous month)
 * - Always returns a new Date instance (does not mutate input)
 */
export function setDay(date: Date | number, day: number): Date {
  if (!isValidDateOrNumber(date) || !isValidNumber(day)) {
    return new Date(NaN);
  }

  const dt = new Date(date);

  const dayToSet = Math.trunc(day);

  dt.setDate(dayToSet);

  return dt;
}