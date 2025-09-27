import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Calculate the difference in calendar days between two dates.
 *
 * Returns the number of full days between the earlier and later date.
 * Ignores time components (hours, minutes, seconds, milliseconds).
 * Uses midnight of each date for calculation to ensure calendar day accuracy.
 *
 * @param dateLeft - The first date
 * @param dateRight - The second date
 * @returns The difference in days (negative if dateLeft is before dateRight)
 *
 * @example
 * ```typescript
 * const date1 = new Date(2024, 5, 15, 23, 59); // June 15, 2024 23:59
 * const date2 = new Date(2024, 5, 14, 0, 0);   // June 14, 2024 00:00
 * diffDays(date1, date2); // 1 (calendar day difference)
 *
 * const date3 = new Date(2024, 5, 15, 0, 0);   // June 15, 2024 00:00
 * const date4 = new Date(2024, 5, 15, 23, 59); // June 15, 2024 23:59
 * diffDays(date3, date4); // 0 (same calendar day)
 *
 * const date5 = new Date(2024, 0, 1);  // January 1, 2024
 * const date6 = new Date(2023, 11, 31); // December 31, 2023
 * diffDays(date5, date6); // 1
 * ```
 */
export function diffDays(dateLeft: Date | number, dateRight: Date | number): number {
  // Calculation functions return NaN for invalid inputs (graceful error handling)
  // This differs from boolean functions (return false) and comparison functions (throw errors)
  if (!isValidDateOrNumber(dateLeft) || !isValidDateOrNumber(dateRight)) {
    return NaN;
  }

  const dtLeft = new Date(dateLeft);
  const dtRight = new Date(dateRight);
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