import { isValidDateOrNumber, isValidNumber } from "../_lib/validators";

/**
 * Set the hours of the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified hours set. Fractional hours are truncated toward zero.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param hours - The hours to set (0-23, fractions are truncated)
 * @returns A new Date object with the hours set, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Set hours to a specific time
 * const result = setHours(new Date(2025, 0, 15, 12, 30, 45), 18);
 * // Returns: 2025-01-15 18:30:45
 *
 * // Set hours to midnight
 * const result2 = setHours(new Date(2025, 0, 15, 12, 30, 45), 0);
 * // Returns: 2025-01-15 00:30:45
 *
 * // Hours rollover to next day
 * const result3 = setHours(new Date(2025, 0, 15, 12, 30, 45), 24);
 * // Returns: 2025-01-16 00:30:45
 *
 * // Fractional hours are truncated
 * const result4 = setHours(new Date(2025, 0, 15, 12, 30, 45), 14.9);
 * // Returns: 2025-01-15 14:30:45
 *
 * // Invalid date returns Invalid Date
 * const result5 = setHours(new Date("invalid"), 12);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (14.9 → 14, -14.9 → -14)
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Preserves date, minutes, seconds, and milliseconds components
 * - Hours outside 0-23 will cause date rollover (e.g., 24 → next day, -1 → previous day)
 * - Always returns a new Date instance (does not mutate input)
 */
export function setHours(date: Date | number, hours: number): Date {
  if (!isValidDateOrNumber(date)) {
    return new Date(NaN);
  }
  if (!isValidNumber(hours)) {
    return new Date(NaN);
  }

  const dt = new Date(date);

  const hoursToSet = Math.trunc(hours);

  dt.setHours(hoursToSet);

  return dt;
}