import { MIN_DATE, MAX_DATE } from "../constants";
import { Interval, BetweenOption } from "../types";
import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Check if a date falls between two boundary dates with configurable inclusion.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns `false` if the date or interval is invalid.
 * - If start is null, uses MIN_DATE as the lower bound.
 * - If end is null, uses MAX_DATE as the upper bound.
 * - Boundary inclusion is controlled by the `bounds` option using mathematical interval notation.
 *
 * @param date - The date to check (Date object or timestamp).
 * @param interval - Interval object with start and end boundaries.
 * @param opts - Optional configuration for boundary inclusion.
 * @returns True if date is between the boundaries according to the bounds configuration.
 *
 * @example
 * // Default behavior (exclusive boundaries)
 * isBetween(new Date('2024-06-15'), {
 *   start: new Date('2024-06-10'),
 *   end: new Date('2024-06-20')
 * }); // true
 *
 * @example
 * // Inclusive boundaries
 * isBetween(new Date('2024-06-10'), {
 *   start: new Date('2024-06-10'),
 *   end: new Date('2024-06-20')
 * }, { bounds: "[]" }); // true
 */
export function isBetween(date: Date | number, interval: Interval, opts?: BetweenOption): boolean {
  if (!isValidDateOrNumber(date)) {
    return false;
  }

  if (typeof interval !== "object" || interval === null) {
    return false;
  }

  const { start, end } = interval;

  // Validate start parameter
  if (start !== null && !isValidDateOrNumber(start)) {
    return false;
  }

  // Validate end parameter
  if (end !== null && !isValidDateOrNumber(end)) {
    return false;
  }

  const dt = new Date(date);

  const dateTime = dt.getTime();

  // Determine effective start boundary
  let effectiveStart: Date;
  if (start === null) {
    effectiveStart = MIN_DATE;
  } else {
    effectiveStart = new Date(start);
  }

  // Determine effective end boundary
  let effectiveEnd: Date;
  if (end === null) {
    effectiveEnd = MAX_DATE;
  } else {
    effectiveEnd = new Date(end);
  }

  // Get the bounds option, defaulting to "()" for backward compatibility
  const bounds = opts?.bounds ?? "()";
  const startTime = effectiveStart.getTime();
  const endTime = effectiveEnd.getTime();

  // Check based on bounds configuration
  switch (bounds) {
    case "[]": // Both boundaries included
      return dateTime >= startTime && dateTime <= endTime;
    case "[)": // Start included, end excluded
      return dateTime >= startTime && dateTime < endTime;
    case "(]": // Start excluded, end included
      return dateTime > startTime && dateTime <= endTime;
    case "()": // Both boundaries excluded (default)
    default:
      // For invalid bounds values, default to "()"
      return dateTime > startTime && dateTime < endTime;
  }
}