import type { DateInput } from "../types";
import { isValidDateInput, isValidNumber } from "../_lib/validators";
import { toDate } from "../_lib/toDate";

/**
 * Set the seconds of the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified seconds set. Fractional seconds are truncated toward zero.
 *
 * @param date - The base date as a Date object, timestamp (number), or ISO 8601 string
 * @param seconds - The seconds to set (0-59 for normal range, other values will roll over)
 * @returns A new Date object with the seconds set, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Set seconds to 30
 * const result = setSeconds(new Date(2025, 0, 15, 12, 30, 45), 30);
 * // Returns: 2025-01-15 12:30:30
 *
 * // Set seconds to 0 (start of minute)
 * const result2 = setSeconds(new Date(2025, 0, 15, 12, 30, 45), 0);
 * // Returns: 2025-01-15 12:30:00
 *
 * // Seconds rollover to next minute
 * const result3 = setSeconds(new Date(2025, 0, 15, 12, 30, 45), 60);
 * // Returns: 2025-01-15 12:31:00
 *
 * // Fractional seconds are truncated
 * const result4 = setSeconds(new Date(2025, 0, 15, 12, 30, 45), 30.9);
 * // Returns: 2025-01-15 12:30:30
 *
 * // Set seconds from ISO 8601 string
 * const result5 = setSeconds("2025-01-15T12:30:45", 15);
 * // Returns: 2025-01-15 12:30:15
 *
 * // Invalid date returns Invalid Date
 * const result6 = setSeconds(new Date("invalid"), 30);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Fractions are truncated using Math.trunc (30.9 → 30, -30.9 → -30)
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Preserves year, month, day, hours, minutes, and milliseconds components
 * - Seconds outside 0-59 range cause rollover to adjacent minutes (60 → next minute, -1 → previous minute)
 * - Always returns a new Date instance (does not mutate input)
 */
export function setSeconds(date: DateInput, seconds: number): Date {
  if (!isValidDateInput(date)) {
    return new Date(NaN);
  }
  if (!isValidNumber(seconds)) {
    return new Date(NaN);
  }

  const dt = toDate(date);

  const secondsToSet = Math.trunc(seconds);

  dt.setSeconds(secondsToSet);

  return dt;
}