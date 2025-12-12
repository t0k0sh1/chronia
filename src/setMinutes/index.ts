import type { DateInput } from "../types";
import { isValidDateInput, isValidNumber } from "../_lib/validators";
import { toDate } from "../_lib/toDate";

/**
 * Set the minutes of the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified minutes set. Fractional minutes are truncated toward zero.
 *
 * @param date - The base date as a Date object, timestamp (number), or ISO 8601 string
 * @param minutes - The minutes to set (typically 0-59, but values outside this range will cause rollover)
 * @returns A new Date object with the minutes set, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Set minutes to standard value
 * const result = setMinutes(new Date(2025, 0, 15, 12, 30, 45), 45);
 * // Returns: 2025-01-15 12:45:45
 *
 * // Set minutes to boundary value
 * const result2 = setMinutes(new Date(2025, 0, 15, 12, 30, 45), 0);
 * // Returns: 2025-01-15 12:00:45
 *
 * // Fractional minutes are truncated
 * const result3 = setMinutes(new Date(2025, 0, 15, 12, 30, 45), 45.9);
 * // Returns: 2025-01-15 12:45:45
 *
 * // Minutes outside 0-59 roll over to adjacent hours
 * const result4 = setMinutes(new Date(2025, 0, 15, 12, 30, 45), 60);
 * // Returns: 2025-01-15 13:00:45 (rolls over to next hour)
 *
 * // Set minutes from ISO 8601 string
 * const result5 = setMinutes("2025-01-15T12:30:45", 15);
 * // Returns: 2025-01-15 12:15:45
 *
 * // Invalid date returns Invalid Date
 * const result6 = setMinutes(new Date("invalid"), 30);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Fractions are truncated using Math.trunc (45.9 → 45, -45.9 → -45)
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Preserves year, month, day, hour, seconds, and milliseconds components
 * - Values outside 0-59 cause rollover: 60 → next hour, -1 → previous hour
 * - Always returns a new Date instance (does not mutate input)
 */
export function setMinutes(date: DateInput, minutes: number): Date {
  if (!isValidDateInput(date)) {
    return new Date(NaN);
  }
  if (!isValidNumber(minutes)) {
    return new Date(NaN);
  }

  const dt = toDate(date);

  const minutesToSet = Math.trunc(minutes);

  dt.setMinutes(minutesToSet);

  return dt;
}