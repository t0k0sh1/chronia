import { truncateToUnit } from "../_lib/truncateToUnit";
import { isValidDateOrNumber } from "../_lib/validators";
import { ComparisonOptions } from "../types";

/**
 * Check if the first date is before or equal to the second date.
 *
 * This function compares two dates and returns true if the first date is chronologically
 * before or equal to the second date. The comparison can be performed at different granularities
 * (year, month, day, hour, minute, second, or millisecond).
 *
 * @param a - The first date as a Date object or timestamp (number)
 * @param b - The second date as a Date object or timestamp (number)
 * @param options - Configuration options with default {}
 * @param options.unit - The unit of comparison (year, month, day, hour, minute, second, millisecond). Defaults to "millisecond"
 * @returns True if date `a` is before or equal to date `b`, false otherwise or if either date is invalid
 *
 * @example
 * ```typescript
 * // Basic comparison (millisecond precision)
 * const result = isBeforeOrEqual(new Date(2025, 0, 1), new Date(2025, 0, 2));
 * // Returns: true
 *
 * // Equality returns true
 * const date = new Date(2025, 0, 1);
 * const result2 = isBeforeOrEqual(date, date);
 * // Returns: true
 *
 * // Compare at day granularity
 * const result3 = isBeforeOrEqual(
 *   new Date(2025, 0, 1, 0, 0),
 *   new Date(2025, 0, 1, 23, 59),
 *   { unit: "day" }
 * );
 * // Returns: true (same day)
 *
 * // Works with timestamps
 * const result4 = isBeforeOrEqual(Date.now() - 1000, Date.now());
 * // Returns: true (1 second ago is before current time)
 *
 * // Invalid dates return false
 * const result5 = isBeforeOrEqual(new Date("invalid"), new Date(2025, 0, 1));
 * // Returns: false
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Returns false for any invalid input (Invalid Date, NaN, Infinity, -Infinity)
 * - Accepts both Date objects and numeric timestamps
 * - Includes equality in the comparison (a <= b)
 * - When using unit-based comparison, dates are truncated to the specified unit before comparing
 * - Unit comparison example: comparing by "day" ignores hours, minutes, seconds, and milliseconds
 */
export function isBeforeOrEqual(
  a: Date | number,
  b: Date | number,
  options: ComparisonOptions = {},
): boolean {
  // Early validation for fast-fail behavior and code consistency across functions
  // Slight overhead of Date construction is acceptable for clarity and uniform validation
  if (!isValidDateOrNumber(a) || !isValidDateOrNumber(b)) return false;

  const dtA = new Date(a);
  const dtB = new Date(b);

  const unit = options?.unit ?? "millisecond";

  if (unit === "millisecond") {
    return dtA.getTime() <= dtB.getTime();
  }

  const aTruncated = truncateToUnit(dtA, unit);
  const bTruncated = truncateToUnit(dtB, unit);
  return aTruncated.getTime() <= bTruncated.getTime();
}