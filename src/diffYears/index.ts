import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Calculate the difference in calendar years between two dates.
 *
 * This function calculates the number of full calendar years between two dates.
 * Only year values are considered; months, days, and time components are ignored.
 *
 * @param dateLeft - The first date as a Date object or timestamp (number)
 * @param dateRight - The second date as a Date object or timestamp (number)
 * @returns The difference in calendar years (negative if dateLeft is before dateRight), or NaN if any input is invalid
 *
 * @example
 * ```typescript
 * // Basic year difference
 * const result = diffYears(new Date(2024, 0, 1), new Date(2020, 11, 31));
 * // Returns: 4
 *
 * // Months/days are ignored (same year)
 * const result = diffYears(new Date(2024, 11, 31), new Date(2024, 0, 1));
 * // Returns: 0
 *
 * // Works with timestamps
 * const timestamp1 = new Date(2025, 0, 1).getTime();
 * const timestamp2 = new Date(2020, 0, 1).getTime();
 * const result = diffYears(timestamp1, timestamp2);
 * // Returns: 5
 *
 * // Negative result when first date is earlier
 * const result = diffYears(new Date(2020, 5, 15), new Date(2024, 5, 15));
 * // Returns: -4
 *
 * // Invalid inputs return NaN
 * const result = diffYears(new Date("invalid"), new Date(2024, 5, 15));
 * // Returns: NaN
 * ```
 *
 * @remarks
 * - Considers only year values for calculation
 * - Months, days, and time components (hours, minutes, seconds, milliseconds) are ignored
 * - Accepts both Date objects and numeric timestamps
 * - Returns NaN for: Invalid Date, NaN, Infinity, -Infinity
 * - Handles century and millennium boundaries correctly
 * - Calculation: dateLeft.getFullYear() - dateRight.getFullYear()
 */
export function diffYears(dateLeft: Date | number, dateRight: Date | number): number {
  // Calculation functions return NaN for invalid inputs (graceful error handling)
  // This differs from boolean functions (return false) and comparison functions (throw errors)
  if (!isValidDateOrNumber(dateLeft) || !isValidDateOrNumber(dateRight)) {
    return NaN;
  }

  const dtLeft = new Date(dateLeft);
  const dtRight = new Date(dateRight);
  return dtLeft.getFullYear() - dtRight.getFullYear();
}