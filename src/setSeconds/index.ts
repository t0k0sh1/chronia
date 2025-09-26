import { isValidDateOrNumber, isValidNumber } from "../_lib/validators";

/**
 * Set the seconds of the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified seconds set.
 * - If the input date or seconds is invalid, returns `Invalid Date`.
 * - Fractions in `seconds` are truncated (e.g., 30.9 → 30, -30.9 → -30).
 * - Seconds values outside 0-59 will cause date to roll over to adjacent minutes.
 *
 * @param date - The original date or timestamp.
 * @param seconds - The seconds to set (0-59, fractions are truncated).
 * @returns A new `Date` object with the seconds set, or `Invalid Date` if input is invalid.
 */
export function setSeconds(date: Date | number, seconds: number): Date {
  if (!isValidDateOrNumber(date)) {
    return new Date(NaN);
  }
  if (!isValidNumber(seconds)) {
    return new Date(NaN);
  }

  const dt = new Date(date);

  const secondsToSet = Math.trunc(seconds);

  dt.setSeconds(secondsToSet);

  return dt;
}