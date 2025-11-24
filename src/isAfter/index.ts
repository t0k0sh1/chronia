import { compareDateTimes } from "../_lib/compareDates";
import { truncateToUnit } from "../_lib/truncateToUnit";
import { isValidDateOrNumber } from "../_lib/validators";
import { ComparisonOptions } from "../types";

/**
 * Check if the first date is strictly after the second date.
 *
 * This function compares two dates and returns true if the first date is chronologically
 * after the second date. The comparison can be performed at different granularities
 * (year, month, day, hour, minute, second, or millisecond).
 *
 * @param a - The first date as a Date object or timestamp (number)
 * @param b - The second date as a Date object or timestamp (number)
 * @param [options={}] - Configuration options.
 * @param [options.unit="millisecond"] - The unit of comparison (year, month, day, hour, minute, second, millisecond).
 * @returns True if date `a` is after date `b`, false otherwise or if either date is invalid
 *
 * @example
 * ```typescript
 * // Basic comparison (millisecond precision)
 * const result = isAfter(new Date(2025, 0, 2), new Date(2025, 0, 1));
 * // Returns: true
 *
 * // Compare at year granularity
 * const result2 = isAfter(
 *   new Date(2025, 0, 1),
 *   new Date(2024, 11, 31),
 *   { unit: "year" }
 * );
 * // Returns: true
 *
 * // Works with timestamps
 * const result3 = isAfter(Date.now(), Date.now() - 1000);
 * // Returns: true (current time is after 1 second ago)
 *
 * // Equality returns false (not strictly after)
 * const date = new Date(2025, 0, 1);
 * const result4 = isAfter(date, date);
 * // Returns: false
 *
 * // Invalid dates return false
 * const result5 = isAfter(new Date("invalid"), new Date(2025, 0, 1));
 * // Returns: false
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Returns false for any invalid input (Invalid Date, NaN, Infinity, -Infinity)
 * - Accepts both Date objects and numeric timestamps
 * - Equality is not considered "after" (strict comparison)
 * - When using unit-based comparison, dates are truncated to the specified unit before comparing
 * - Unit comparison example: comparing by "day" ignores hours, minutes, seconds, and milliseconds
 */
export function isAfter(
  a: Date | number,
  b: Date | number,
  options: ComparisonOptions = {},
): boolean {
  const unit = options?.unit ?? "millisecond";

  if (unit === "millisecond") {
    return compareDateTimes(a, b) === 1;
  }

  // Unit-based comparison requires validation and Date objects
  if (!isValidDateOrNumber(a) || !isValidDateOrNumber(b)) return false;
  const dtA = new Date(a);
  const dtB = new Date(b);
  const aTruncated = truncateToUnit(dtA, unit);
  const bTruncated = truncateToUnit(dtB, unit);
  return aTruncated.getTime() > bTruncated.getTime();
}

