import type { DateInput } from "../types";
import { isValidDateInput } from "../_lib/validators";

/**
 * Check if the given value is a valid Date, timestamp, or ISO 8601 string.
 *
 * This function checks if a Date object is valid (not Invalid Date), if a timestamp is a finite number,
 * or if a string is a valid ISO 8601 date string. It returns false for Invalid Date, NaN, Infinity,
 * -Infinity values, and invalid date strings.
 *
 * @param date - The Date object, timestamp (number), or ISO 8601 string to validate
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
 *
 * // Valid ISO 8601 string
 * const result6 = isValid("2025-01-15");
 * // Returns: true
 *
 * // Invalid string
 * const result7 = isValid("not-a-date");
 * // Returns: false
 * ```
 *
 * @remarks
 * - Validates arguments using internal validation utilities for optimal performance
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - Returns false for: Invalid Date, NaN, Infinity, -Infinity, invalid strings
 * - Returns true for all finite numeric timestamps, including 0 (Unix epoch) and negative values
 * - Uses the same validation logic as other library functions for consistency
 */
export function isValid(date: DateInput): boolean {
  return isValidDateInput(date);
}
