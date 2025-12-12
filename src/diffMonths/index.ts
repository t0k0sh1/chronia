import type { DateInput } from "../types";
import { isValidDateInput } from "../_lib/validators";
import { toDate } from "../_lib/toDate";

/**
 * Calculate the difference in calendar months between two dates.
 *
 * This function calculates the number of full calendar months between two dates.
 * Only year and month values are considered; days and time components are ignored.
 *
 * @param dateLeft - The first date as a Date object, timestamp (number), or ISO 8601 string
 * @param dateRight - The second date as a Date object, timestamp (number), or ISO 8601 string
 * @returns The difference in calendar months (negative if dateLeft is before dateRight), or NaN if any input is invalid
 *
 * @example
 * ```typescript
 * // Basic month difference
 * const result = diffMonths(new Date(2024, 5, 15), new Date(2024, 2, 1));
 * // Returns: 3
 *
 * // Days are ignored (same month)
 * const result = diffMonths(new Date(2024, 5, 30), new Date(2024, 5, 1));
 * // Returns: 0
 *
 * // Works with timestamps
 * const timestamp1 = new Date(2025, 2, 1).getTime();
 * const timestamp2 = new Date(2024, 2, 31).getTime();
 * const result = diffMonths(timestamp1, timestamp2);
 * // Returns: 12
 *
 * // Works with ISO 8601 strings
 * const result = diffMonths("2025-03-01", "2024-03-31");
 * // Returns: 12
 *
 * // Negative result when first date is earlier
 * const result = diffMonths(new Date(2024, 2, 15), new Date(2024, 5, 15));
 * // Returns: -3
 *
 * // Invalid inputs return NaN
 * const result = diffMonths(new Date("invalid"), new Date(2024, 5, 15));
 * // Returns: NaN
 * ```
 *
 * @remarks
 * - Considers only year and month values for calculation
 * - Days and time components (hours, minutes, seconds, milliseconds) are ignored
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Returns NaN for: Invalid Date, NaN, Infinity, -Infinity
 * - Handles year boundaries correctly
 * - Calculation: (yearDiff * 12) + monthDiff
 */
export function diffMonths(dateLeft: DateInput, dateRight: DateInput): number {
  // Calculation functions return NaN for invalid inputs (graceful error handling)
  // This differs from boolean functions (return false) and comparison functions (throw errors)
  if (!isValidDateInput(dateLeft) || !isValidDateInput(dateRight)) {
    return NaN;
  }

  const dtLeft = toDate(dateLeft);
  const dtRight = toDate(dateRight);
  const yearDiff = dtLeft.getFullYear() - dtRight.getFullYear();
  const monthDiff = dtLeft.getMonth() - dtRight.getMonth();
  return yearDiff * 12 + monthDiff;
}