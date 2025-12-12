import type { DateInput } from "../types";
import { isValidDateInput, isValidNumber } from "../_lib/validators";
import { toDate } from "../_lib/toDate";

/**
 * Set the year of the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified year set. Fractional years are truncated toward zero.
 *
 * @param date - The base date as a Date object, timestamp (number), or ISO 8601 string
 * @param year - The year to set (can be negative for BC dates)
 * @returns A new Date object with the year set, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Set year to future year
 * const result = setYear(new Date(2025, 0, 15), 2030);
 * // Returns: 2030-01-15
 *
 * // Set year to past year
 * const result2 = setYear(new Date(2025, 0, 15), 2020);
 * // Returns: 2020-01-15
 *
 * // Leap year adjustment (Feb 29 → Feb 28)
 * const result3 = setYear(new Date(2020, 1, 29), 2021);
 * // Returns: 2021-02-28 (non-leap year)
 *
 * // Fractional year is truncated
 * const result4 = setYear(new Date(2025, 0, 15), 2023.9);
 * // Returns: 2023-01-15
 *
 * // Set year from ISO 8601 string
 * const result5 = setYear("2025-01-15", 2030);
 * // Returns: 2030-01-15
 *
 * // Invalid date returns Invalid Date
 * const result6 = setYear(new Date("invalid"), 2025);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Fractions are truncated using Math.trunc (2023.9 → 2023, -2023.9 → -2023)
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Preserves month, day, and time components (hours, minutes, seconds, milliseconds)
 * - Special handling: When the source date is Feb 29 and the target year is not a leap year, the result becomes Feb 28
 * - Always returns a new Date instance (does not mutate input)
 */
export function setYear(date: DateInput, year: number): Date {
  if (!isValidDateInput(date)) {
    return new Date(NaN);
  }
  if (!isValidNumber(year)) {
    return new Date(NaN);
  }

  const dt = toDate(date);

  const yearToSet = Math.trunc(year);

  const originalMonth = dt.getMonth();
  const originalDay = dt.getDate();

  dt.setFullYear(yearToSet);

  // Handle leap year adjustment for Feb 29
  if (originalMonth === 1 && originalDay === 29 && dt.getMonth() !== 1) {
    dt.setMonth(1, 28);
  }

  return dt;
}