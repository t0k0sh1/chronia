import type { DateInput } from "../types";
import { truncateToUnit } from "../_lib/truncateToUnit";
import { isValidDateInput } from "../_lib/validators";
import { toDate } from "../_lib/toDate";
import { ComparisonOptions } from "../types";

/**
 * Check if two dates are equal.
 *
 * This function compares two dates and returns true if they represent the same point in time.
 * The comparison can be performed at different granularities (year, month, day, hour, minute,
 * second, or millisecond).
 *
 * @param a - The first date as a Date object, timestamp (number), or ISO 8601 string
 * @param b - The second date as a Date object, timestamp (number), or ISO 8601 string
 * @param [options={}] - Configuration options.
 * @param [options.unit="millisecond"] - The unit of comparison (year, month, day, hour, minute, second, millisecond).
 * @returns True if date `a` is equal to date `b`, false otherwise or if either date is invalid
 *
 * @example
 * ```typescript
 * // Basic comparison (millisecond precision)
 * const date1 = new Date(2025, 0, 1, 12, 0, 0);
 * const date2 = new Date(2025, 0, 1, 12, 0, 0);
 * const result = isEqual(date1, date2);
 * // Returns: true
 *
 * // Compare at day granularity
 * const result2 = isEqual(
 *   new Date(2025, 0, 1, 9, 0),
 *   new Date(2025, 0, 1, 17, 0),
 *   { unit: "day" }
 * );
 * // Returns: true (same day, different times)
 *
 * // Works with timestamps
 * const timestamp = Date.now();
 * const result3 = isEqual(timestamp, new Date(timestamp));
 * // Returns: true
 *
 * // Different dates return false
 * const result4 = isEqual(new Date(2025, 0, 1), new Date(2025, 0, 2));
 * // Returns: false
 *
 * // Invalid dates return false
 * const result5 = isEqual(new Date("invalid"), new Date(2025, 0, 1));
 * // Returns: false
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Returns false for any invalid input (Invalid Date, NaN, Infinity, -Infinity)
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - When using unit-based comparison, dates are truncated to the specified unit before comparing
 * - Unit comparison example: comparing by "day" ignores hours, minutes, seconds, and milliseconds
 * - Two dates with the same timestamp are always equal (at millisecond precision)
 */
export function isEqual(
  a: DateInput,
  b: DateInput,
  options: ComparisonOptions = {},
): boolean {
  // Early validation for fast-fail behavior and code consistency across functions
  // Slight overhead of Date construction is acceptable for clarity and uniform validation
  if (!isValidDateInput(a) || !isValidDateInput(b)) return false;

  const dtA = toDate(a);
  const dtB = toDate(b);

  const unit = options?.unit ?? "millisecond";

  if (unit === "millisecond") {
    return dtA.getTime() === dtB.getTime();
  }

  const aTruncated = truncateToUnit(dtA, unit);
  const bTruncated = truncateToUnit(dtB, unit);
  return aTruncated.getTime() === bTruncated.getTime();
}