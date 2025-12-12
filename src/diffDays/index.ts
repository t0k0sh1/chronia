import type { DateInput } from "../types";
import { isValidDateInput } from "../_lib/validators";
import { toDate } from "../_lib/toDate";

/**
 * Calculate the difference in calendar days between two dates.
 *
 * This function calculates the number of full calendar days between two dates by
 * comparing them at midnight. Time components are ignored to ensure accurate
 * calendar day counting.
 *
 * @param dateLeft - The first date as a Date object, timestamp (number), or ISO 8601 string
 * @param dateRight - The second date as a Date object, timestamp (number), or ISO 8601 string
 * @returns The difference in calendar days (negative if dateLeft is before dateRight), or NaN if any input is invalid
 *
 * @example
 * ```typescript
 * // Basic calendar day difference
 * const result = diffDays(new Date(2024, 5, 15), new Date(2024, 5, 14));
 * // Returns: 1
 *
 * // Time components are ignored (same calendar day)
 * const result = diffDays(new Date(2024, 5, 15, 23, 59), new Date(2024, 5, 15, 0, 0));
 * // Returns: 0
 *
 * // Works with timestamps
 * const timestamp1 = new Date(2024, 5, 20).getTime();
 * const timestamp2 = new Date(2024, 5, 15).getTime();
 * const result = diffDays(timestamp1, timestamp2);
 * // Returns: 5
 *
 * // Works with ISO 8601 strings
 * const result = diffDays("2024-06-20", "2024-06-15");
 * // Returns: 5
 *
 * // Negative result when first date is earlier
 * const result = diffDays(new Date(2024, 5, 10), new Date(2024, 5, 15));
 * // Returns: -5
 *
 * // Invalid inputs return NaN
 * const result = diffDays(new Date("invalid"), new Date(2024, 5, 15));
 * // Returns: NaN
 * ```
 *
 * @remarks
 * - Compares dates at midnight for accurate calendar day counting
 * - Time components (hours, minutes, seconds, milliseconds) are ignored
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Returns NaN for: Invalid Date, NaN, Infinity, -Infinity
 * - Handles leap years, month boundaries, and year boundaries correctly
 * - Uses Math.round to ensure integer results
 */
export function diffDays(dateLeft: DateInput, dateRight: DateInput): number {
  // Calculation functions return NaN for invalid inputs (graceful error handling)
  // This differs from boolean functions (return false) and comparison functions (throw errors)
  if (!isValidDateInput(dateLeft) || !isValidDateInput(dateRight)) return NaN;

  const dtLeft = toDate(dateLeft);
  const dtRight = toDate(dateRight);
  // Create dates at midnight for calendar day comparison
  const leftMidnight = new Date(
    dtLeft.getFullYear(),
    dtLeft.getMonth(),
    dtLeft.getDate()
  );
  const rightMidnight = new Date(
    dtRight.getFullYear(),
    dtRight.getMonth(),
    dtRight.getDate()
  );

  const diffTime = leftMidnight.getTime() - rightMidnight.getTime();
  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  return Math.round(diffTime / millisecondsPerDay);
}
