import { isValidDate, isValidNumber } from "../_lib/validators";

/**
 * Set the timestamp value of a Date object.
 *
 * @param date - The Date object to create a copy from
 * @param time - The timestamp in milliseconds since Unix epoch
 * @returns A new Date object with the specified timestamp, or invalid Date for invalid arguments
 *
 * @example
 * const date = new Date();
 * const newDate = setTime(date, 1704067200000); // Creates new date set to 2024-01-01
 *
 * @example
 * const date = new Date();
 * const invalidDate = setTime(date, NaN); // Creates new invalid date
 *
 * @example
 * const invalidDate = setTime('not a date', 1704067200000); // Returns new Date(NaN)
 *
 * @remarks
 * This function creates a new Date object without modifying the original.
 * The returned Date object has the specified timestamp, handling invalid values
 * (NaN, Infinity, out-of-range) by creating invalid dates.
 * For invalid arguments, returns a new Date(NaN).
 */
export function setTime(date: Date, time: number): Date {
  if (!isValidDate(date)) {
    return new Date(NaN);
  }
  if (!isValidNumber(time)) {
    return new Date(NaN);
  }

  const newDate = new Date(date);
  newDate.setTime(time);
  return newDate;
}