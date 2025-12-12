/**
 * Internal helper to convert DateInput values to Date objects.
 * This module is for internal use only and is not exported in the public API.
 */

import type { DateInput } from "../types";
import {
  isValidDate,
  isValidNumber,
  isValidDateString,
} from "./validators";

/**
 * Converts a DateInput value to a Date object.
 *
 * This is an internal helper function that handles the conversion of
 * Date objects, Unix timestamps (numbers), and ISO 8601 strings to Date objects.
 *
 * @internal
 * @param value - A Date object, Unix timestamp, or ISO 8601 string
 * @returns A new Date object, or Invalid Date if the input is invalid
 *
 * @example
 * ```typescript
 * // From Date object (creates a copy)
 * toDate(new Date(2024, 0, 15)); // Date: 2024-01-15
 *
 * // From timestamp
 * toDate(1705276800000); // Date: 2024-01-15T00:00:00.000Z
 *
 * // From ISO 8601 string
 * toDate("2024-01-15"); // Date: 2024-01-15
 * toDate("2024-01-15T14:30:00Z"); // Date: 2024-01-15T14:30:00.000Z
 * toDate("2024-01-15T14:30:00+09:00"); // Date with timezone offset
 *
 * // Invalid input returns Invalid Date
 * toDate("invalid"); // Invalid Date
 * toDate(NaN); // Invalid Date
 * ```
 */
export function toDate(value: DateInput): Date {
  // Handle Date objects - create a copy to avoid mutation
  if (isValidDate(value)) {
    return new Date(value.getTime());
  }

  // Handle numeric timestamps
  if (isValidNumber(value)) {
    return new Date(value);
  }

  // Handle ISO 8601 strings
  if (isValidDateString(value)) {
    return new Date(value);
  }

  // Return Invalid Date for any other input
  return new Date(NaN);
}
