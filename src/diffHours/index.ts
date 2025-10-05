import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Calculate the difference in complete hours between two dates.
 *
 * This function calculates the number of complete hours between two dates by
 * comparing them at the start of each hour. Minutes, seconds, and milliseconds
 * are ignored to ensure accurate hour counting.
 *
 * @param dateLeft - The first date as a Date object or timestamp (number)
 * @param dateRight - The second date as a Date object or timestamp (number)
 * @returns The difference in complete hours (negative if dateLeft is before dateRight), or NaN if any input is invalid
 *
 * @example
 * ```typescript
 * // Basic hour difference
 * const result = diffHours(new Date(2024, 5, 15, 14, 30), new Date(2024, 5, 15, 12, 0));
 * // Returns: 2
 *
 * // Minutes/seconds are ignored (same hour)
 * const result = diffHours(new Date(2024, 5, 15, 14, 59), new Date(2024, 5, 15, 14, 0));
 * // Returns: 0
 *
 * // Works with timestamps
 * const timestamp1 = new Date(2024, 5, 15, 16, 0).getTime();
 * const timestamp2 = new Date(2024, 5, 15, 14, 0).getTime();
 * const result = diffHours(timestamp1, timestamp2);
 * // Returns: 2
 *
 * // Negative result when first date is earlier
 * const result = diffHours(new Date(2024, 5, 15, 10, 30), new Date(2024, 5, 15, 14, 30));
 * // Returns: -4
 *
 * // Invalid inputs return NaN
 * const result = diffHours(new Date("invalid"), new Date(2024, 5, 15, 14, 0));
 * // Returns: NaN
 * ```
 *
 * @remarks
 * - Compares dates at the start of each hour for accurate hour counting
 * - Minutes, seconds, and milliseconds are ignored
 * - Accepts both Date objects and numeric timestamps
 * - Returns NaN for: Invalid Date, NaN, Infinity, -Infinity
 * - Handles day, month, and year boundaries correctly
 * - Uses Math.round to ensure integer results
 */
export function diffHours(
  dateLeft: Date | number,
  dateRight: Date | number,
): number {
  // Calculation functions return NaN for invalid inputs (graceful error handling)
  // This differs from boolean functions (return false) and comparison functions (throw errors)
  if (!isValidDateOrNumber(dateLeft) || !isValidDateOrNumber(dateRight))
    return NaN;

  const dtLeft = new Date(dateLeft);
  const dtRight = new Date(dateRight);
  // Create dates at the start of each hour for comparison
  const leftHour = new Date(
    dtLeft.getFullYear(),
    dtLeft.getMonth(),
    dtLeft.getDate(),
    dtLeft.getHours(),
  );
  const rightHour = new Date(
    dtRight.getFullYear(),
    dtRight.getMonth(),
    dtRight.getDate(),
    dtRight.getHours(),
  );

  const diffTime = leftHour.getTime() - rightHour.getTime();
  const millisecondsPerHour = 1000 * 60 * 60;

  return Math.round(diffTime / millisecondsPerHour);
}

