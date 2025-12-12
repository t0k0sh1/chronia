import type { DateInput } from "../types";
import { MIN_DATE, MAX_DATE } from "../constants";
import { Interval, BetweenOption } from "../types";
import { isValidDateInput } from "../_lib/validators";
import { toDate } from "../_lib/toDate";

/**
 * Check if a date falls between two boundary dates with configurable inclusion.
 *
 * This function checks whether a date falls within an interval defined by start and end boundaries.
 * The inclusion of boundaries can be controlled using mathematical interval notation.
 *
 * @param date - The date to check as a Date object, timestamp (number), or ISO 8601 string
 * @param interval - Interval object with start and end boundaries (can be null for open-ended intervals)
 * @param [options={}] - Configuration options for boundary inclusion.
 * @param [options.bounds="()"] - Boundary inclusion mode: "()" excludes both, "[]" includes both, "[)" includes start only, "(]" includes end only.
 * @returns True if date is between the boundaries according to the bounds configuration, false otherwise
 *
 * @example
 * ```typescript
 * // Default behavior (exclusive boundaries)
 * const result = isBetween(
 *   new Date(2024, 5, 15),
 *   { start: new Date(2024, 5, 10), end: new Date(2024, 5, 20) }
 * );
 * // Returns: true
 *
 * // Inclusive boundaries
 * const result2 = isBetween(
 *   new Date(2024, 5, 10),
 *   { start: new Date(2024, 5, 10), end: new Date(2024, 5, 20) },
 *   { bounds: "[]" }
 * );
 * // Returns: true (boundary is included)
 *
 * // Open-ended interval (null end uses MAX_DATE)
 * const result3 = isBetween(
 *   new Date(2025, 0, 1),
 *   { start: new Date(2024, 0, 1), end: null }
 * );
 * // Returns: true (any date after start)
 *
 * // Works with timestamps
 * const result4 = isBetween(
 *   Date.now(),
 *   { start: Date.now() - 1000, end: Date.now() + 1000 }
 * );
 * // Returns: true (within 1 second window)
 *
 * // Invalid inputs return false
 * const result5 = isBetween(new Date("invalid"), { start: new Date(2024, 0, 1), end: new Date(2024, 11, 31) });
 * // Returns: false
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Returns false for any invalid input (Invalid Date, NaN, Infinity, -Infinity, or invalid interval)
 * - Accepts Date objects, numeric timestamps, and ISO 8601 strings
 * - If start is null, uses MIN_DATE as the lower bound
 * - If end is null, uses MAX_DATE as the upper bound
 * - Boundary inclusion is controlled by the `bounds` option using mathematical interval notation:
 *   - "()" - Both boundaries excluded (default, for backward compatibility)
 *   - "[]" - Both boundaries included
 *   - "[)" - Start included, end excluded
 *   - "(]" - Start excluded, end included
 * - Invalid bounds values default to "()" behavior
 */
export function isBetween(
  date: DateInput,
  interval: Interval,
  options: BetweenOption = {},
): boolean {
  if (!isValidDateInput(date)) return false;

  if (typeof interval !== "object" || interval === null) {
    return false;
  }

  const { start, end } = interval;

  // Validate start parameter
  if (start !== null && !isValidDateInput(start)) {
    return false;
  }

  // Validate end parameter
  if (end !== null && !isValidDateInput(end)) {
    return false;
  }

  const dt = toDate(date);

  const dateTime = dt.getTime();

  // Determine effective start boundary
  let effectiveStart: Date;
  if (start === null) {
    effectiveStart = MIN_DATE;
  } else {
    effectiveStart = toDate(start);
  }

  // Determine effective end boundary
  let effectiveEnd: Date;
  if (end === null) {
    effectiveEnd = MAX_DATE;
  } else {
    effectiveEnd = toDate(end);
  }

  // Get the bounds option, defaulting to "()" for backward compatibility
  const bounds = options?.bounds ?? "()";
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

