import { isValidDateOrNumber, isValidNumber } from "../_lib/validators";

/**
 * Set the minutes of the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified minutes set. Fractional minutes are truncated toward zero.
 *
 * @param date - The base date as a Date object or timestamp (number)
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
 * // Invalid date returns Invalid Date
 * const result5 = setMinutes(new Date("invalid"), 30);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (45.9 → 45, -45.9 → -45)
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Preserves year, month, day, hour, seconds, and milliseconds components
 * - Values outside 0-59 cause rollover: 60 → next hour, -1 → previous hour
 * - Always returns a new Date instance (does not mutate input)
 */
export function setMinutes(date: Date | number, minutes: number): Date {
  if (!isValidDateOrNumber(date)) {
    return new Date(NaN);
  }
  if (!isValidNumber(minutes)) {
    return new Date(NaN);
  }

  const dt = new Date(date);

  const minutesToSet = Math.trunc(minutes);

  dt.setMinutes(minutesToSet);

  return dt;
}