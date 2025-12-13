/**
 * Internal validation utilities for the chronia library.
 * These functions are for internal use only and are not exported in the public API.
 */


// ========================================
// Date Type Validation
// ========================================

/**
 * Checks if a value is a Date object instance.
 *
 * This is an internal utility function that performs a simple instanceof check
 * without validating whether the Date is valid or Invalid Date. Use this when
 * you only need to verify that a value is a Date object, regardless of its validity.
 *
 * This function is analogous to `isNumber` for the number type.
 *
 * @internal
 * @param value - Any value to check
 * @returns true if value is a Date instance, false otherwise
 *
 * @example
 * ```typescript
 * isDateInstance(new Date()); // true
 * isDateInstance(new Date('invalid')); // true (Invalid Date is still a Date instance)
 * isDateInstance(123456789); // false
 * isDateInstance('2025-01-01'); // false
 * isDateInstance(null); // false
 * ```
 */
export function isDateInstance(value: unknown): value is Date {
  return value instanceof Date;
}

/**
 * Validates if a value is a valid Date instance (not Invalid Date)
 *
 * This function is analogous to `isValidNumber` for the number type.
 *
 * Date validity is evaluated using local timezone semantics of JavaScript Date objects.
 *
 * @internal
 * @param value - Any value to validate
 * @returns true if value is a valid Date, false otherwise
 *
 * @example
 * ```typescript
 * isValidDate(new Date()); // true
 * isValidDate(new Date('2024-01-01')); // true
 * isValidDate(new Date('invalid')); // false
 * isValidDate(123456789); // false
 * isValidDate(null); // false
 * ```
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


// ========================================
// Number Type Validation
// ========================================

/**
 * Checks if a value is a number type.
 *
 * This is an internal utility function that performs a type-only check
 * without validating whether the number is finite. Use this when you only need
 * to verify that a value is a number, including NaN and Infinity. For finite
 * number validation, use `isValidNumber` instead.
 *
 * @internal
 * @param value - Any value to check
 * @returns true if value is a number type, false otherwise
 *
 * @example
 * ```typescript
 * isNumber(42); // true
 * isNumber(0); // true
 * isNumber(-3.14); // true
 * isNumber(NaN); // true (NaN is still a number type)
 * isNumber(Infinity); // true
 * isNumber(-Infinity); // true
 * isNumber("123"); // false
 * isNumber(null); // false
 * isNumber(undefined); // false
 * ```
 */
export function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

/**
 * Validates if a value is a finite number
 *
 * For checking only the number type (including NaN/Infinity), use `isNumber` instead.
 *
 * @internal
 * @param value - Any value to validate
 * @returns true if value is a finite number, false otherwise
 *
 * @example
 * ```typescript
 * isValidNumber(42); // true
 * isValidNumber(3.14); // true
 * isValidNumber(0); // true
 * isValidNumber(NaN); // false
 * isValidNumber(Infinity); // false
 * isValidNumber("123"); // false
 * isValidNumber(null); // false
 * ```
 */
export function isValidNumber(value: unknown): value is number {
  // Check if it's a number type and is finite
  // isFinite() handles NaN, Infinity, and -Infinity in one check
  return typeof value === "number" && isFinite(value);
}


// ========================================
// String Type Validation
// ========================================

/**
 * Validates if a value is a valid date string parseable by Date.parse().
 *
 * Uses JavaScript's Date.parse() internally. Note that Date.parse() behavior
 * is implementation-dependent and may accept formats beyond ISO 8601.
 * Empty strings and whitespace-only strings are considered invalid.
 *
 * Recommended formats (ISO 8601):
 * - YYYY-MM-DD (e.g., "2024-01-15")
 * - YYYY-MM-DDTHH:mm:ss (e.g., "2024-01-15T14:30:00")
 * - YYYY-MM-DDTHH:mm:ss.sss (e.g., "2024-01-15T14:30:00.000")
 * - YYYY-MM-DDTHH:mm:ssZ (e.g., "2024-01-15T14:30:00Z")
 * - YYYY-MM-DDTHH:mm:ss+HH:mm (e.g., "2024-01-15T14:30:00+09:00")
 *
 * @internal
 * @param value - Any value to validate
 * @returns true if value is a string parseable by Date.parse(), false otherwise
 *
 * @example
 * ```typescript
 * isValidDateString("2024-01-15"); // true
 * isValidDateString("2024-01-15T14:30:00Z"); // true
 * isValidDateString("2024-01-15T14:30:00+09:00"); // true
 * isValidDateString(""); // false
 * isValidDateString("invalid"); // false
 * isValidDateString(123); // false
 * ```
 */
export function isValidDateString(value: unknown): value is string {
  if (typeof value !== "string") {
    return false;
  }
  // Empty string or whitespace-only is not a valid date
  if (value.trim() === "") {
    return false;
  }
  // Use Date.parse to check if the string is parseable
  const timestamp = Date.parse(value);
  return !isNaN(timestamp);
}


// ========================================
// Compound Type Validation
// ========================================

/**
 * Validates if a value is either a valid Date or a finite number
 *
 * @internal
 * @param value - Any value to validate
 * @returns true if value is either a valid Date or finite number, false otherwise
 *
 * @example
 * ```typescript
 * isValidDateOrNumber(new Date()); // true
 * isValidDateOrNumber(42); // true
 * isValidDateOrNumber(3.14); // true
 * isValidDateOrNumber(new Date('invalid')); // false
 * isValidDateOrNumber(NaN); // false
 * isValidDateOrNumber(Infinity); // false
 * isValidDateOrNumber("123"); // false
 * ```
 */
export function isValidDateOrNumber(value: unknown): value is Date | number {
  // Use OR logic: passes if either validator passes
  return isValidDate(value) || isValidNumber(value);
}

/**
 * Validates if a value is a valid DateInput (Date, finite number, or valid ISO 8601 string)
 *
 * This is the primary validation function for date input values throughout the library.
 *
 * @internal
 * @param value - Any value to validate
 * @returns true if value is a valid Date, finite number, or valid ISO 8601 string, false otherwise
 *
 * @example
 * ```typescript
 * isValidDateInput(new Date()); // true
 * isValidDateInput(42); // true
 * isValidDateInput("2024-01-15"); // true
 * isValidDateInput("2024-01-15T14:30:00Z"); // true
 * isValidDateInput(new Date('invalid')); // false
 * isValidDateInput(NaN); // false
 * isValidDateInput("invalid"); // false
 * isValidDateInput(""); // false
 * ```
 */
export function isValidDateInput(
  value: unknown,
): value is Date | number | string {
  return isValidDate(value) || isValidNumber(value) || isValidDateString(value);
}
