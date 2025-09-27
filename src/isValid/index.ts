import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Check if the given value is a valid Date or timestamp.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns `true` if the resulting Date is valid, otherwise `false`.
 * - Uses internal validation utilities for optimal performance.
 *
 * @param date - The Date object or timestamp to validate.
 * @returns `true` if valid, `false` if invalid.
 */
export function isValid(date: Date | number): boolean {
  return isValidDateOrNumber(date);
}

