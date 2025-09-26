/**
 * Type Validation Functions Contract
 * Internal utilities for the chronia library
 */

/**
 * Validates if a value is a valid Date instance (not Invalid Date)
 *
 * @param value - Any value to validate
 * @returns true if value is a valid Date, false otherwise
 *
 * @example
 * isValidDate(new Date()) // true
 * isValidDate(new Date('invalid')) // false
 * isValidDate(42) // false
 * isValidDate(null) // false
 */
export declare function isValidDate(value: unknown): value is Date;

/**
 * Validates if a value is a finite number
 *
 * @param value - Any value to validate
 * @returns true if value is a finite number, false otherwise
 *
 * @example
 * isValidNumber(42) // true
 * isValidNumber(3.14) // true
 * isValidNumber(NaN) // false
 * isValidNumber(Infinity) // false
 * isValidNumber('42') // false
 */
export declare function isValidNumber(value: unknown): value is number;

/**
 * Validates if a value is either a valid Date or a finite number
 *
 * @param value - Any value to validate
 * @returns true if value is either a valid Date or finite number, false otherwise
 *
 * @example
 * isValidDateOrNumber(new Date()) // true
 * isValidDateOrNumber(42) // true
 * isValidDateOrNumber(new Date('invalid')) // false
 * isValidDateOrNumber(NaN) // false
 * isValidDateOrNumber(null) // false
 */
export declare function isValidDateOrNumber(value: unknown): value is Date | number;

/**
 * Internal validation functions interface
 */
export interface ValidationFunctions {
  isValidDate: typeof isValidDate;
  isValidNumber: typeof isValidNumber;
  isValidDateOrNumber: typeof isValidDateOrNumber;
}