import { MIN_DATE, MAX_DATE } from "../constants";
import { Interval } from "../types";

/**
 * Check if a date is strictly between two boundary dates.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns `false` if the date or interval is invalid.
 * - If start is null, uses MIN_DATE as the lower bound.
 * - If end is null, uses MAX_DATE as the upper bound.
 * - Uses strict comparison: start < date < end (boundaries are excluded).
 *
 * @param date - The date to check (Date object or timestamp).
 * @param interval - Interval object with start and end boundaries.
 * @returns True if date is strictly between the boundaries, false otherwise.
 */
export function isBetween(date: Date | number, interval: Interval): boolean {
  if (!(date instanceof Date || typeof date === "number")) {
    return false;
  }

  if (typeof interval !== "object" || interval === null) {
    return false;
  }

  const { start, end } = interval;

  // Validate start parameter
  if (start !== null && !(start instanceof Date || typeof start === "number")) {
    return false;
  }

  // Validate end parameter
  if (end !== null && !(end instanceof Date || typeof end === "number")) {
    return false;
  }

  const dt = new Date(date);
  if (isNaN(dt.getTime())) return false;

  const dateTime = dt.getTime();

  // Determine effective start boundary
  let effectiveStart: Date;
  if (start === null) {
    effectiveStart = MIN_DATE;
  } else {
    effectiveStart = new Date(start);
    if (isNaN(effectiveStart.getTime())) return false;
  }

  // Determine effective end boundary
  let effectiveEnd: Date;
  if (end === null) {
    effectiveEnd = MAX_DATE;
  } else {
    effectiveEnd = new Date(end);
    if (isNaN(effectiveEnd.getTime())) return false;
  }

  // Check strict comparison: start < date < end
  return dateTime > effectiveStart.getTime() && dateTime < effectiveEnd.getTime();
}