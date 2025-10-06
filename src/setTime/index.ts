import { isValidDateOrNumber, isValidNumber } from "../_lib/validators";

/**
 * Set the complete timestamp of the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified timestamp. Unlike other setters that modify components (year, month, etc.),
 * setTime replaces the entire timestamp value.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param time - The timestamp in milliseconds since Unix epoch (January 1, 1970, 00:00:00 UTC)
 * @returns A new Date object with the timestamp set, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Set to a specific timestamp (Date input)
 * const result = setTime(new Date(), 1704067200000);
 * // Returns: 2024-01-01T00:00:00.000Z
 *
 * // Set to a specific timestamp (number input)
 * const result2 = setTime(1609459200000, 1704067200000);
 * // Returns: 2024-01-01T00:00:00.000Z
 *
 * // Set to Unix epoch
 * const result3 = setTime(new Date(), 0);
 * // Returns: 1970-01-01T00:00:00.000Z
 *
 * // Set to negative timestamp (before epoch)
 * const result4 = setTime(new Date(), -86400000);
 * // Returns: 1969-12-31T00:00:00.000Z
 *
 * // Fractional milliseconds are preserved
 * const result5 = setTime(new Date(), 1.5);
 * // Returns: timestamp with 1.5 milliseconds (truncated by Date API)
 *
 * // Invalid timestamp returns Invalid Date
 * const result6 = setTime(new Date(), NaN);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts Date objects or numeric timestamps as the first argument (consistent with other setters)
 * - Returns Invalid Date for: Invalid Date input, NaN, Infinity, -Infinity
 * - Valid timestamp range: -8.64e15 to 8.64e15 milliseconds
 * - Timestamps outside this range create Invalid Date
 * - Always returns a new Date instance (does not mutate input)
 * - This function replaces all date/time components at once (unlike setYear, setMonth, etc.)
 */
export function setTime(date: Date | number, time: number): Date {
  if (!isValidDateOrNumber(date)) {
    return new Date(NaN);
  }
  if (!isValidNumber(time)) {
    return new Date(NaN);
  }

  const newDate = new Date(date);
  newDate.setTime(time);
  return newDate;
}