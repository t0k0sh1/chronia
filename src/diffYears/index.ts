import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Calculate the difference in calendar years between two dates.
 *
 * Returns the number of full years between the earlier and later date.
 * Only considers year values, ignoring months, days, and time components.
 *
 * @param dateLeft - The first date or timestamp
 * @param dateRight - The second date or timestamp
 * @returns The difference in years (negative if dateLeft is before dateRight)
 *
 * @example
 * ```typescript
 * const date1 = new Date(2024, 0, 1);  // January 1, 2024
 * const date2 = new Date(2020, 11, 31); // December 31, 2020
 * diffYears(date1, date2); // 4
 *
 * const date3 = new Date(2024, 11, 31); // December 31, 2024
 * const date4 = new Date(2024, 0, 1);   // January 1, 2024
 * diffYears(date3, date4); // 0 (same calendar year)
 * ```
 */
export function diffYears(dateLeft: Date | number, dateRight: Date | number): number {
  if (!isValidDateOrNumber(dateLeft) || !isValidDateOrNumber(dateRight)) {
    return NaN;
  }

  const dtLeft = new Date(dateLeft);
  const dtRight = new Date(dateRight);
  return dtLeft.getFullYear() - dtRight.getFullYear();
}