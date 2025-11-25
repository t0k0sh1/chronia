import { isDateInstance } from "../_lib/validators";

/**
 * Check if the given value is a Date object instance.
 *
 * This function performs a type check to determine if a value is a Date object,
 * regardless of whether the Date is valid or invalid. It returns true for any
 * Date instance, including Invalid Date objects (e.g., `new Date("invalid")`).
 *
 * To check if a Date is both a Date instance AND has a valid date value,
 * use `isValid()` instead.
 *
 * @param value - The value to check (can be any type)
 * @returns True if the value is a Date instance, false otherwise
 *
 * @example
 * ```typescript
 * // Valid Date object
 * const result = isDate(new Date(2025, 0, 1));
 * // Returns: true
 *
 * // Invalid Date object (still a Date instance!)
 * const result2 = isDate(new Date("invalid"));
 * // Returns: true
 *
 * // Timestamp (number)
 * const result3 = isDate(Date.now());
 * // Returns: false
 *
 * // Date string
 * const result4 = isDate("2025-01-01");
 * // Returns: false
 *
 * // Null or undefined
 * const result5 = isDate(null);
 * // Returns: false
 *
 * // Using as a type guard
 * function processValue(value: unknown) {
 *   if (isDate(value)) {
 *     // TypeScript knows 'value' is Date here
 *     console.log(value.getTime());
 *   }
 * }
 * ```
 *
 * @remarks
 * - This function only checks if the value is an instance of Date (type checking)
 * - Returns true even for Invalid Date objects (they are still Date instances)
 * - Does NOT check if the Date has a valid date value (use `isValid()` for that)
 * - Works as a TypeScript type guard with return type `value is Date`
 * - Never throws exceptions, always returns a boolean
 * - For checking valid dates (both type and validity), use: `isDate(value) && isValid(value)`
 */
export function isDate(value: unknown): value is Date {
  return isDateInstance(value);
}
