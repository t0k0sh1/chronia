import type { DateInput } from "../types";
import { isValidDateInput } from "../_lib/validators";
import { toDate } from "../_lib/toDate";

/**
 * Calculate the difference in complete seconds between two dates.
 *
 * This function calculates the number of complete seconds between two dates by
 * comparing them at the start of each second. Milliseconds are ignored to
 * ensure accurate second counting.
 *
 * @param dateLeft - The first date as a Date object, timestamp (number), or ISO 8601 string
 * @param dateRight - The second date as a Date object, timestamp (number), or ISO 8601 string
 * @returns The difference in complete seconds (negative if dateLeft is before dateRight), or NaN if any input is invalid
 *
 * @example
 * ```typescript
 * // Basic second difference
 * const result = diffSeconds(new Date(2024, 5, 15, 14, 30, 45), new Date(2024, 5, 15, 14, 30, 43));
 * // Returns: 2
 *
 * // Milliseconds are ignored (same second)
 * const result = diffSeconds(new Date(2024, 5, 15, 14, 30, 45, 999), new Date(2024, 5, 15, 14, 30, 45, 0));
 * // Returns: 0
 *
 * // Works with timestamps
 * const timestamp1 = new Date(2024, 5, 15, 14, 31, 0).getTime();
 * const timestamp2 = new Date(2024, 5, 15, 14, 30, 30).getTime();
 * const result = diffSeconds(timestamp1, timestamp2);
 * // Returns: 30
 *
 * // Works with ISO 8601 strings
 * const result = diffSeconds("2024-06-15T14:31:00", "2024-06-15T14:30:30");
 * // Returns: 30
 *
 * // Negative result when first date is earlier
 * const result = diffSeconds(new Date(2024, 5, 15, 14, 30, 40), new Date(2024, 5, 15, 14, 30, 45));
 * // Returns: -5
 *
 * // Invalid inputs return NaN
 * const result = diffSeconds(new Date("invalid"), new Date(2024, 5, 15, 14, 30, 45));
 * // Returns: NaN
 * ```
 *
 * @remarks
 * - Compares dates at the start of each second for accurate second counting
 * - Milliseconds are ignored
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Returns NaN for: Invalid Date, NaN, Infinity, -Infinity
 * - Handles minute, hour, day, month, and year boundaries correctly
 * - Uses Math.round to ensure integer results
 */
export function diffSeconds(
  dateLeft: DateInput,
  dateRight: DateInput,
): number {
  // Calculation functions return NaN for invalid inputs (graceful error handling)
  // This differs from boolean functions (return false) and comparison functions (throw errors)
  if (!isValidDateInput(dateLeft) || !isValidDateInput(dateRight))
    return NaN;

  const dtLeft = toDate(dateLeft);
  const dtRight = toDate(dateRight);
  // Create dates at the start of each second for comparison
  const leftSecond = new Date(
    dtLeft.getFullYear(),
    dtLeft.getMonth(),
    dtLeft.getDate(),
    dtLeft.getHours(),
    dtLeft.getMinutes(),
    dtLeft.getSeconds(),
  );
  const rightSecond = new Date(
    dtRight.getFullYear(),
    dtRight.getMonth(),
    dtRight.getDate(),
    dtRight.getHours(),
    dtRight.getMinutes(),
    dtRight.getSeconds(),
  );

  const diffTime = leftSecond.getTime() - rightSecond.getTime();
  const millisecondsPerSecond = 1000;

  return Math.round(diffTime / millisecondsPerSecond);
}

