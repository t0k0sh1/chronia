import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Get the end of the day for the given date.
 *
 * This function returns a new Date object set to the last moment of the day (23:59:59.999)
 * for the given date. The date remains the same while all time components are set to their
 * maximum values.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @returns A new Date object set to 23:59:59.999 of the same date, or Invalid Date if input is invalid
 *
 * @example
 * ```typescript
 * // Get end of day from afternoon
 * const result = endOfDay(new Date(2024, 5, 15, 14, 30, 45, 123));
 * // Returns: June 15, 2024 23:59:59.999
 *
 * // Works with start of day time
 * const result2 = endOfDay(new Date(2024, 5, 15, 0, 0, 0, 0));
 * // Returns: June 15, 2024 23:59:59.999
 *
 * // Works with timestamps
 * const timestamp = Date.now();
 * const result3 = endOfDay(timestamp);
 * // Returns: End of today (23:59:59.999)
 *
 * // Handles month boundaries
 * const result4 = endOfDay(new Date(2024, 5, 30, 9, 15));
 * // Returns: June 30, 2024 23:59:59.999
 *
 * // Invalid inputs return Invalid Date
 * const result5 = endOfDay(new Date(NaN));
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Always returns a new Date instance (does not mutate input)
 * - Sets hours to 23, minutes to 59, seconds to 59, and milliseconds to 999
 */
export function endOfDay(date: Date | number): Date {
  if (!isValidDateOrNumber(date)) {
    return new Date(NaN);
  }
  const dt = new Date(date);
  return new Date(
    dt.getFullYear(),
    dt.getMonth(),
    dt.getDate(),
    23, // 23:59:59.999
    59,
    59,
    999
  );
}