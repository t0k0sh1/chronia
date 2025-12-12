import type { DateInput } from "../types";
import { isValidDateInput } from "../_lib/validators";
import { toDate } from "../_lib/toDate";

/**
 * Calculate the difference in milliseconds between two dates.
 *
 * This function calculates the exact difference in milliseconds between two dates.
 * This is the most precise time difference calculation available, equivalent to
 * subtracting the results of getTime().
 *
 * @param dateLeft - The first date as a Date object, timestamp (number), or ISO 8601 string
 * @param dateRight - The second date as a Date object, timestamp (number), or ISO 8601 string
 * @returns The difference in milliseconds (negative if dateLeft is before dateRight), or NaN if any input is invalid
 *
 * @example
 * ```typescript
 * // Basic millisecond difference
 * const result = diffMilliseconds(new Date(2024, 5, 15, 14, 30, 45, 500), new Date(2024, 5, 15, 14, 30, 45, 100));
 * // Returns: 400
 *
 * // Exact same time returns 0
 * const result = diffMilliseconds(new Date(2024, 5, 15, 14, 30, 45, 123), new Date(2024, 5, 15, 14, 30, 45, 123));
 * // Returns: 0
 *
 * // Works with timestamps
 * const timestamp1 = new Date(2024, 5, 15, 14, 30, 46, 0).getTime();
 * const timestamp2 = new Date(2024, 5, 15, 14, 30, 45, 0).getTime();
 * const result = diffMilliseconds(timestamp1, timestamp2);
 * // Returns: 1000
 *
 * // Works with ISO 8601 strings
 * const result = diffMilliseconds("2024-06-15T14:30:46.000Z", "2024-06-15T14:30:45.000Z");
 * // Returns: 1000
 *
 * // Negative result when first date is earlier
 * const result = diffMilliseconds(new Date(2024, 5, 15, 14, 30, 45, 100), new Date(2024, 5, 15, 14, 30, 45, 500));
 * // Returns: -400
 *
 * // Invalid inputs return NaN
 * const result = diffMilliseconds(new Date("invalid"), new Date(2024, 5, 15, 14, 30, 45, 0));
 * // Returns: NaN
 * ```
 *
 * @remarks
 * - Returns exact millisecond difference (no rounding or truncation)
 * - Equivalent to: dateLeft.getTime() - dateRight.getTime()
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Returns NaN for: Invalid Date, NaN, Infinity, -Infinity
 * - Most precise time difference function in the library
 * - Useful for performance measurements and precise time calculations
 */
export function diffMilliseconds(
  dateLeft: DateInput,
  dateRight: DateInput,
): number {
  // Calculation functions return NaN for invalid inputs (graceful error handling)
  // This differs from boolean functions (return false) and comparison functions (throw errors)
  if (!isValidDateInput(dateLeft) || !isValidDateInput(dateRight))
    return NaN;

  const dtLeft = toDate(dateLeft);
  const dtRight = toDate(dateRight);

  return dtLeft.getTime() - dtRight.getTime();
}

