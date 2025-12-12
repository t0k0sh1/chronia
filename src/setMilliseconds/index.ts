import type { DateInput } from "../types";
import { isValidDateInput, isValidNumber } from "../_lib/validators";
import { toDate } from "../_lib/toDate";

/**
 * Set the milliseconds of the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified milliseconds set. Fractional milliseconds are truncated toward zero.
 *
 * @param date - The base date as a Date object, timestamp (number), or ISO 8601 string
 * @param milliseconds - The milliseconds to set (typically 0-999, fractions are truncated)
 * @returns A new Date object with the milliseconds set, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Set milliseconds to a typical value
 * const result = setMilliseconds(new Date(2025, 0, 15, 12, 30, 45, 123), 500);
 * // Returns: 2025-01-15 12:30:45.500
 *
 * // Set milliseconds to minimum value
 * const result2 = setMilliseconds(new Date(2025, 0, 15, 12, 30, 45, 123), 0);
 * // Returns: 2025-01-15 12:30:45.000
 *
 * // Rollover to next second with value >= 1000
 * const result3 = setMilliseconds(new Date(2025, 0, 15, 12, 30, 45, 500), 1000);
 * // Returns: 2025-01-15 12:30:46.000
 *
 * // Fractional milliseconds are truncated
 * const result4 = setMilliseconds(new Date(2025, 0, 15, 12, 30, 45, 123), 500.9);
 * // Returns: 2025-01-15 12:30:45.500
 *
 * // Set milliseconds from ISO 8601 string
 * const result5 = setMilliseconds("2025-01-15T12:30:45.123Z", 500);
 * // Returns: 2025-01-15 12:30:45.500
 *
 * // Invalid date returns Invalid Date
 * const result6 = setMilliseconds(new Date("invalid"), 500);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Fractions are truncated using Math.trunc (500.9 → 500, -500.9 → -500)
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Preserves year, month, day, and time components (hours, minutes, seconds)
 * - Special handling: Values outside 0-999 cause rollover to adjacent seconds (1000 → next second, -1 → previous second)
 * - Always returns a new Date instance (does not mutate input)
 */
export function setMilliseconds(date: DateInput, milliseconds: number): Date {
  if (!isValidDateInput(date)) {
    return new Date(NaN);
  }
  if (!isValidNumber(milliseconds)) {
    return new Date(NaN);
  }

  const dt = toDate(date);

  const millisecondsToSet = Math.trunc(milliseconds);

  dt.setMilliseconds(millisecondsToSet);

  return dt;
}