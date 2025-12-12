import type { DateInput } from "../types";
import { isValidDateInput } from "../_lib/validators";
import { toDate } from "../_lib/toDate";

/**
 * Get the start of the day for the given date.
 *
 * This function returns a new Date object set to the beginning of the day (00:00:00.000)
 * for the given date. The date remains the same while all time components are reset to zero.
 *
 * @param date - The base date as a Date object, timestamp (number), or ISO 8601 string
 * @returns A new Date object set to 00:00:00.000 of the same date, or Invalid Date if input is invalid
 *
 * @example
 * ```typescript
 * // Get start of day from afternoon
 * const result = startOfDay(new Date(2024, 5, 15, 14, 30, 45, 123));
 * // Returns: June 15, 2024 00:00:00.000
 *
 * // Works with end of day time
 * const result2 = startOfDay(new Date(2024, 5, 15, 23, 59, 59, 999));
 * // Returns: June 15, 2024 00:00:00.000
 *
 * // Works with timestamps
 * const timestamp = Date.now();
 * const result3 = startOfDay(timestamp);
 * // Returns: Start of today (00:00:00.000)
 *
 * // Works with ISO 8601 strings
 * const result4 = startOfDay("2024-06-15T14:30:00");
 * // Returns: June 15, 2024 00:00:00.000
 *
 * // Invalid inputs return Invalid Date
 * const result5 = startOfDay(new Date("invalid"));
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity, invalid strings
 * - Always returns a new Date instance (does not mutate input)
 * - Preserves the date while resetting hours, minutes, seconds, and milliseconds to 0
 */
export function startOfDay(date: DateInput): Date {
  if (!isValidDateInput(date)) return new Date(NaN);

  const dt = toDate(date);

  return new Date(
    dt.getFullYear(),
    dt.getMonth(),
    dt.getDate(),
    0, // 00:00:00.000
    0,
    0,
    0,
  );
}

