import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Clamp a date within a specified range.
 *
 * Takes a date and ensures it falls within the specified minimum and maximum bounds.
 * If the date is before the minimum, returns the minimum.
 * If the date is after the maximum, returns the maximum.
 * If any date is invalid, returns an Invalid Date.
 *
 * @param date - The date to clamp
 * @param minDate - The minimum allowed date
 * @param maxDate - The maximum allowed date
 * @returns The clamped date, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * const minDate = new Date(2024, 5, 10); // June 10, 2024
 * const maxDate = new Date(2024, 5, 20); // June 20, 2024
 *
 * const earlyDate = new Date(2024, 5, 5); // June 5, 2024
 * const clampedEarly = clamp(earlyDate, minDate, maxDate); // June 10, 2024
 *
 * const lateDate = new Date(2024, 5, 25); // June 25, 2024
 * const clampedLate = clamp(lateDate, minDate, maxDate); // June 20, 2024
 *
 * const normalDate = new Date(2024, 5, 15); // June 15, 2024
 * const clampedNormal = clamp(normalDate, minDate, maxDate); // June 15, 2024
 *
 * // Works with timestamps too
 * const timestamp = Date.now();
 * const minTimestamp = timestamp - 1000;
 * const maxTimestamp = timestamp + 1000;
 * const clampedTimestamp = clamp(timestamp, minTimestamp, maxTimestamp);
 *
 * // Returns Invalid Date if any input is invalid
 * const invalidDate = new Date('invalid');
 * const validMin = new Date(2024, 5, 10);
 * const validMax = new Date(2024, 5, 20);
 * const result = clamp(invalidDate, validMin, validMax); // Invalid Date
 * ```
 */
export function clamp(
  date: Date | number,
  minDate: Date | number,
  maxDate: Date | number
): Date {
  // Validate all inputs using internal validator
  if (!isValidDateOrNumber(date) || !isValidDateOrNumber(minDate) || !isValidDateOrNumber(maxDate)) {
    return new Date(NaN);
  }

  // Convert all inputs to Date objects
  const dateObj = typeof date === "number" ? new Date(date) : date;
  const minDateObj = typeof minDate === "number" ? new Date(minDate) : minDate;
  const maxDateObj = typeof maxDate === "number" ? new Date(maxDate) : maxDate;

  // Ensure min <= max, swap if necessary
  const actualMin = minDateObj.getTime() <= maxDateObj.getTime() ? minDateObj : maxDateObj;
  const actualMax = minDateObj.getTime() <= maxDateObj.getTime() ? maxDateObj : minDateObj;

  const dateTime = dateObj.getTime();
  const minTime = actualMin.getTime();
  const maxTime = actualMax.getTime();

  // Clamp the date within the range
  if (dateTime < minTime) {
    return new Date(minTime);
  } else if (dateTime > maxTime) {
    return new Date(maxTime);
  } else {
    return new Date(dateTime);
  }
}