import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Calculate the difference in complete minutes between two dates.
 *
 * This function calculates the number of complete minutes between two dates by
 * comparing them at the start of each minute. Seconds and milliseconds are
 * ignored to ensure accurate minute counting.
 *
 * @param dateLeft - The first date as a Date object or timestamp (number)
 * @param dateRight - The second date as a Date object or timestamp (number)
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
 * - Accepts both Date objects and numeric timestamps
 * - Returns NaN for: Invalid Date, NaN, Infinity, -Infinity
 * - Handles hour, day, month, and year boundaries correctly
 * - Uses Math.round to ensure integer results
 */
export function diffMinutes(
  dateLeft: Date | number,
  dateRight: Date | number,
): number {
  // Calculation functions return NaN for invalid inputs (graceful error handling)
  // This differs from boolean functions (return false) and comparison functions (throw errors)
  if (!isValidDateOrNumber(dateLeft) || !isValidDateOrNumber(dateRight))
    return NaN;

  const dtLeft = new Date(dateLeft);
  const dtRight = new Date(dateRight);
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

