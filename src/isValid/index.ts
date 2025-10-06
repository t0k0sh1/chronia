import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Check if the given value is a valid Date or timestamp.
 *
 * This function validates whether a Date object or timestamp represents a valid date.
 * It returns false for Invalid Date, NaN, Infinity, and -Infinity values.
 *
 * @param date - The Date object or timestamp (number) to validate
 * @returns True if the date is valid, false otherwise
 *
 * @example
 * ```typescript
 * // Valid Date object
 * const result = isValid(new Date(2025, 0, 1));
 * // Returns: true
 *
 * // Valid timestamp
 * const result2 = isValid(Date.now());
 * // Returns: true
 *
 * // Zero timestamp (Unix epoch)
 * const result3 = isValid(0);
 * // Returns: true
 *
 * // Invalid Date
 * const result4 = isValid(new Date("invalid"));
 * // Returns: false
 *
 * // Invalid timestamp
 * const result5 = isValid(NaN);
 * // Returns: false
 * ```
 *
 * @remarks
 * - Validates arguments using internal validation utilities for optimal performance
 * - Accepts both Date objects and numeric timestamps
 * - Returns false for: Invalid Date, NaN, Infinity, -Infinity
 * - Returns true for all finite numeric timestamps, including 0 (Unix epoch) and negative values
 * - Uses the same validation logic as other library functions for consistency
 */
export function isValid(date: Date | number): boolean {
  return isValidDateOrNumber(date);
}
