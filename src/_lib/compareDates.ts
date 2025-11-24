/**
 * Internal utility for comparing two dates at millisecond precision.
 * This is a shared helper function used by comparison functions (isAfter, isBefore, isFuture, isPast).
 *
 * @internal
 */

import { isValidDateOrNumber } from "./validators";

/**
 * Compares two dates or timestamps at millisecond precision.
 *
 * This is an internal helper function that provides common date comparison logic
 * for multiple public comparison functions. It handles input validation and returns
 * a numeric comparison result or false for invalid inputs.
 *
 * @param a - The first date to compare (Date object or numeric timestamp)
 * @param b - The second date to compare (Date object or numeric timestamp)
 *
 * @returns A comparison result indicating the relationship between the two dates:
 *   - `1` if a > b (a is after b)
 *   - `-1` if a < b (a is before b)
 *   - `0` if a === b (same millisecond)
 *   - `false` if either input is invalid (Invalid Date, NaN, Infinity, -Infinity, or wrong type)
 *
 * @example
 * ```typescript
 * // Date a is after Date b
 * compareDateTimes(new Date(2025, 0, 2), new Date(2025, 0, 1));
 * // Returns: 1
 *
 * // Date a is before Date b
 * compareDateTimes(1704067200000, 1704153600000);
 * // Returns: -1
 *
 * // Dates are exactly equal
 * compareDateTimes(new Date(2025, 0, 1), new Date(2025, 0, 1));
 * // Returns: 0
 *
 * // Invalid input: Invalid Date
 * compareDateTimes(new Date(NaN), new Date(2025, 0, 1));
 * // Returns: false
 *
 * // Invalid input: NaN
 * compareDateTimes(NaN, 1704067200000);
 * // Returns: false
 *
 * // Invalid input: Infinity
 * compareDateTimes(Infinity, new Date(2025, 0, 1));
 * // Returns: false
 * ```
 *
 * @remarks
 * - This function is for internal use only and is not exported from the public API
 * - Uses `isValidDateOrNumber()` from validators.ts for input validation
 * - Never throws exceptions; returns `false` for any invalid input
 * - Performs comparison at millisecond precision using `getTime()`
 * - Pure function with no side effects (immutable)
 * - Accepts both Date objects and numeric timestamps for flexibility
 *
 * @see {@link isValidDateOrNumber} - Used for input validation
 */
export function compareDateTimes(
  a: Date | number,
  b: Date | number
): 1 | -1 | 0 | false {
  // 1. Validate inputs using isValidDateOrNumber
  if (!isValidDateOrNumber(a) || !isValidDateOrNumber(b)) {
    return false;
  }

  // 2. Convert both inputs to Date objects to ensure they're within valid range
  const dateA = new Date(a);
  const dateB = new Date(b);

  // 3. Validate that conversion produced valid dates
  // Invalid dates have NaN as their time value
  const timeA = dateA.getTime();
  const timeB = dateB.getTime();

  if (!isFinite(timeA) || !isFinite(timeB)) {
    return false;
  }

  // 4. Compare timestamps and return appropriate result
  if (timeA > timeB) return 1;
  if (timeA < timeB) return -1;
  return 0;
}
