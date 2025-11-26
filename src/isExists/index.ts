import { isValidNumber } from "../_lib/validators";

/**
 * Validates whether the given year, month, and day combination represents a valid date.
 *
 * This function checks if the specified date actually exists in the Gregorian calendar.
 * It validates that the month is between 1-12, the day is within the valid range for
 * the given month (accounting for leap years), and all values are valid finite numbers.
 *
 * Note: This function uses 1-based month indexing (1 = January, 12 = December),
 * which differs from JavaScript's Date constructor that uses 0-based indexing (0 = January).
 *
 * @param year - The year value (should be an integer; decimal values will use their integer part)
 * @param month - The month value (1-12, where 1 = January and 12 = December)
 * @param day - The day value (1 to the maximum day for the given month)
 * @returns True if the date combination represents a valid existing date, false otherwise
 *
 * @remarks
 * - Invalid inputs (NaN, Infinity, non-finite numbers) return false
 * - Month must be in range 1-12; any value outside this range returns false
 * - Day must be in range 1-31 depending on the month
 * - February has 28 days in common years and 29 days in leap years
 * - Leap years follow the Gregorian calendar rules:
 *   - Divisible by 400: leap year
 *   - Divisible by 100: not a leap year
 *   - Divisible by 4: leap year
 *   - Otherwise: not a leap year
 * - Uses 1-based month indexing: `isExists(2024, 1, 15)` for January 15, 2024
 * - Does not throw exceptions; returns false for any invalid input
 *
 * @example
 * ```typescript
 * // Valid dates
 * isExists(2024, 2, 29);  // true - leap year, February has 29 days
 * isExists(2024, 4, 30);  // true - April has 30 days
 * isExists(2024, 12, 31); // true - December has 31 days
 *
 * // Invalid dates
 * isExists(2023, 2, 29);  // false - common year, February has only 28 days
 * isExists(2024, 2, 30);  // false - February never has 30 days
 * isExists(2024, 4, 31);  // false - April has only 30 days
 * isExists(2024, 13, 1);  // false - month must be 1-12
 * isExists(2024, 0, 1);   // false - month must be 1-12
 *
 * // Invalid input values
 * isExists(NaN, 1, 1);         // false - NaN is not a valid number
 * isExists(2024, Infinity, 1); // false - Infinity is not a valid number
 * isExists(2024.5, 1, 1);      // true - fractional year truncated to 2024
 * ```
 *
 * @preconditions
 * - year, month, and day should be valid finite numbers
 * - month should be 1-12
 * - day should be 1 to the maximum day for the given month
 *
 * @postconditions
 * - Always returns a boolean value
 * - Never throws an exception
 * - Returns false for any invalid input
 * - Immutable: does not modify any input values
 */
export function isExists(year: number, month: number, day: number): boolean {
  // Validate that all inputs are finite numbers
  if (!isValidNumber(year) || !isValidNumber(month) || !isValidNumber(day)) {
    return false;
  }

  // Truncate to integers (fractional values use integer part only)
  const y = Math.trunc(year);
  const m = Math.trunc(month);
  const d = Math.trunc(day);

  // Validate month range (1-12)
  if (m < 1 || m > 12) {
    return false;
  }

  // Validate day range (1 to max days in month)
  const daysInMonth = getDaysInMonth(m, isLeapYear(y));
  if (d < 1 || d > daysInMonth) {
    return false;
  }

  return true;
}

/**
 * Days in each month (January to December) for non-leap years.
 * February is adjusted to 29 days in leap years by getDaysInMonth function.
 */
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * Determines whether the given year is a leap year according to the Gregorian calendar.
 *
 * @internal
 * @param year - The year to check (should be a finite number)
 * @returns True if the year is a leap year, false otherwise
 *
 * @remarks
 * Leap year rules:
 * - Years divisible by 400 are leap years
 * - Years divisible by 100 (but not 400) are not leap years
 * - Years divisible by 4 (but not 100) are leap years
 * - All other years are not leap years
 *
 * @example
 * ```typescript
 * isLeapYear(2024); // true - divisible by 4, not a century year
 * isLeapYear(2000); // true - divisible by 400
 * isLeapYear(1900); // false - divisible by 100 but not 400
 * isLeapYear(2023); // false - not divisible by 4
 * ```
 */
function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

/**
 * Returns the number of days in the specified month.
 *
 * @internal
 * @param month - The month (1-12)
 * @param isLeapYearValue - Whether the year is a leap year
 * @returns The number of days in the month (28, 29, 30, or 31)
 *
 * @remarks
 * - January, March, May, July, August, October, December: 31 days
 * - April, June, September, November: 30 days
 * - February: 28 days in common years, 29 days in leap years
 * - This function assumes the month is already validated (1-12)
 *
 * @example
 * ```typescript
 * getDaysInMonth(1, false);   // 31 - January
 * getDaysInMonth(2, false);   // 28 - February (common year)
 * getDaysInMonth(2, true);    // 29 - February (leap year)
 * getDaysInMonth(4, false);   // 30 - April
 * getDaysInMonth(12, false);  // 31 - December
 * ```
 */
function getDaysInMonth(month: number, isLeapYearValue: boolean): number {
  if (month === 2 && isLeapYearValue) {
    return 29;
  }

  return DAYS_IN_MONTH[month - 1];
}
