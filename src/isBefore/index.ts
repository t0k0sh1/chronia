import type { DateInput } from "../types";
import { compareDateTimes } from "../_lib/compareDates";
import { truncateToUnit } from "../_lib/truncateToUnit";
import { isValidDateInput } from "../_lib/validators";
import { toDate } from "../_lib/toDate";
import { ComparisonOptions } from "../types";

/**
 * Check if the first date is strictly before the second date.
 *
 * This function compares two dates and returns true if the first date is chronologically
 * before the second date. The comparison can be performed at different granularities
 * (year, month, day, hour, minute, second, or millisecond).
 *
 * @param a - The first date as a Date object, timestamp (number), or ISO 8601 string
 * @param b - The second date as a Date object, timestamp (number), or ISO 8601 string
 * @param [options={}] - Configuration options.
 * @param [options.unit="millisecond"] - The unit of comparison (year, month, day, hour, minute, second, millisecond).
 * @returns True if date `a` is before date `b`, false otherwise or if either date is invalid
 *
 * @example
 * ```typescript
 * // Basic comparison (millisecond precision)
 * const result = isBefore(new Date(2025, 0, 1), new Date(2025, 0, 2));
 * // Returns: true
 *
 * // Compare at year granularity
 * const result2 = isBefore(
 *   new Date(2024, 11, 31),
 *   new Date(2025, 0, 1),
 *   { unit: "year" }
 * );
 * // Returns: true
 *
 * // Works with timestamps
 * const result3 = isBefore(Date.now() - 1000, Date.now());
 * // Returns: true (1 second ago is before current time)
 *
 * // Equality returns false (not strictly before)
 * const date = new Date(2025, 0, 1);
 * const result4 = isBefore(date, date);
 * // Returns: false
 *
 * // Invalid dates return false
 * const result5 = isBefore(new Date("invalid"), new Date(2025, 0, 1));
 * // Returns: false
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Returns false for any invalid input (Invalid Date, NaN, Infinity, -Infinity)
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Equality is not considered "before" (strict comparison)
 * - When using unit-based comparison, dates are truncated to the specified unit before comparing
 * - Unit comparison example: comparing by "day" ignores hours, minutes, seconds, and milliseconds
 */
export function isBefore(
  a: DateInput,
  b: DateInput,
  options: ComparisonOptions = {},
): boolean {
  const unit = options?.unit ?? "millisecond";

  if (unit === "millisecond") {
    return compareDateTimes(a, b) === -1;
  }

  // Unit-based comparison still needs validation and Date objects
  if (!isValidDateInput(a) || !isValidDateInput(b)) return false;
  const dtA = toDate(a);
  const dtB = toDate(b);
  const aTruncated = truncateToUnit(dtA, unit);
  const bTruncated = truncateToUnit(dtB, unit);
  return aTruncated.getTime() < bTruncated.getTime();
}
