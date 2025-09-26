/**
 * Internal validation utilities for the chronia library.
 * These functions are for internal use only and are not exported in the public API.
 */

/**
 * Validates if a value is a valid Date instance (not Invalid Date)
 *
 * @param value - Any value to validate
 * @returns true if value is a valid Date, false otherwise
 */
export function isValidDate(value: unknown): value is Date {
  // First check if it's a Date instance using instanceof
  if (!(value instanceof Date)) {
    return false;
  }

  // Then check if it's a valid date (not Invalid Date)
  // Invalid Date has NaN as its time value
  return !isNaN(value.getTime());
}

/**
 * Validates if a value is a finite number
 *
 * @param value - Any value to validate
 * @returns true if value is a finite number, false otherwise
 */
export function isValidNumber(value: unknown): value is number {
  // Check if it's a number type and is finite
  // isFinite() handles NaN, Infinity, and -Infinity in one check
  return typeof value === "number" && isFinite(value);
}

/**
 * Validates if a value is either a valid Date or a finite number
 *
 * @param value - Any value to validate
 * @returns true if value is either a valid Date or finite number, false otherwise
 */
export function isValidDateOrNumber(value: unknown): value is Date | number {
  // Use OR logic: passes if either validator passes
  return isValidDate(value) || isValidNumber(value);
}