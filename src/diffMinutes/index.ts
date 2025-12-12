import type { DateInput } from "../types";
import { isValidDateInput } from "../_lib/validators";
import { toDate } from "../_lib/toDate";

/**
 * Calculate the difference in complete minutes between two dates.
 *
 * This function calculates the number of complete minutes between two dates by
 * comparing them at the start of each minute. Seconds and milliseconds are
 * ignored to ensure accurate minute counting.
 *
 * @param dateLeft - The first date as a Date object, timestamp (number), or ISO 8601 string
 * @param dateRight - The second date as a Date object, timestamp (number), or ISO 8601 string
 * @returns The difference in complete minutes (negative if dateLeft is before dateRight), or NaN if any input is invalid
 *
 * @example
 * ```typescript
 * // Basic minute difference
 * const result = diffMinutes(new Date(2024, 5, 15, 14, 30), new Date(2024, 5, 15, 14, 28));
 * // Returns: 2
 *
 * // Seconds are ignored (same minute)
 * const result = diffMinutes(new Date(2024, 5, 15, 14, 30, 59), new Date(2024, 5, 15, 14, 30, 0));
 * // Returns: 0
 *
 * // Works with timestamps
 * const timestamp1 = new Date(2024, 5, 15, 15, 0).getTime();
 * const timestamp2 = new Date(2024, 5, 15, 14, 45).getTime();
 * const result = diffMinutes(timestamp1, timestamp2);
 * // Returns: 15
 *
 * // Works with ISO 8601 strings
 * const result = diffMinutes("2024-06-15T15:00:00", "2024-06-15T14:45:00");
 * // Returns: 15
 *
 * // Negative result when first date is earlier
 * const result = diffMinutes(new Date(2024, 5, 15, 14, 25), new Date(2024, 5, 15, 14, 30));
 * // Returns: -5
 *
 * // Invalid inputs return NaN
 * const result = diffMinutes(new Date("invalid"), new Date(2024, 5, 15, 14, 30));
 * // Returns: NaN
 * ```
 *
 * @remarks
 * - Compares dates at the start of each minute for accurate minute counting
 * - Seconds and milliseconds are ignored
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Returns NaN for: Invalid Date, NaN, Infinity, -Infinity
 * - Handles hour, day, month, and year boundaries correctly
 * - Uses Math.round to ensure integer results
 */
export function diffMinutes(
  dateLeft: DateInput,
  dateRight: DateInput,
): number {
  // Calculation functions return NaN for invalid inputs (graceful error handling)
  // This differs from boolean functions (return false) and comparison functions (throw errors)
  if (!isValidDateInput(dateLeft) || !isValidDateInput(dateRight))
    return NaN;

  const dtLeft = toDate(dateLeft);
  const dtRight = toDate(dateRight);
  // Create dates at the start of each minute for comparison
  const leftMinute = new Date(
    dtLeft.getFullYear(),
    dtLeft.getMonth(),
    dtLeft.getDate(),
    dtLeft.getHours(),
    dtLeft.getMinutes(),
  );
  const rightMinute = new Date(
    dtRight.getFullYear(),
    dtRight.getMonth(),
    dtRight.getDate(),
    dtRight.getHours(),
    dtRight.getMinutes(),
  );

  const diffTime = leftMinute.getTime() - rightMinute.getTime();
  const millisecondsPerMinute = 1000 * 60;

  return Math.round(diffTime / millisecondsPerMinute);
}

