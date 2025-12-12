import type { DateInput } from "../types";
import { isValidDateInput, isValidNumber } from "../_lib/validators";
import { toDate } from "../_lib/toDate";

/**
 * Set the day of the month of the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified day set. Fractional days are truncated toward zero.
 *
 * @param date - The base date as a Date object, timestamp (number), or ISO 8601 string
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
 * // Set day from ISO 8601 string
 * const result5 = setDay("2025-01-15", 20);
 * // Returns: 2025-01-20
 *
 * // Invalid date returns Invalid Date
 * const result6 = setDay(new Date("invalid"), 15);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Fractions are truncated using Math.trunc (15.9 → 15, -15.9 → -15)
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Preserves year, month, and time components (hours, minutes, seconds, milliseconds)
 * - Rollover behavior: Day values outside valid range cause date to roll over to adjacent months (e.g., Jan 32 → Feb 1, day 0 → last day of previous month)
 * - Always returns a new Date instance (does not mutate input)
 */
export function setDay(date: DateInput, day: number): Date {
  if (!isValidDateInput(date) || !isValidNumber(day)) {
    return new Date(NaN);
  }

  const dt = toDate(date);

  const dayToSet = Math.trunc(day);

  dt.setDate(dayToSet);

  return dt;
}