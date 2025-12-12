import type { DateInput } from "../types";
import { isValidDateInput } from "../_lib/validators";
import { toDate } from "../_lib/toDate";

/**
 * Return the earliest (minimum) date from the given dates.
 *
 * Takes one or more Date objects, timestamps, or ISO 8601 strings and returns the earliest one.
 * If any date is invalid, returns an Invalid Date.
 *
 * @param dates - One or more dates, timestamps, or ISO 8601 strings to compare
 * @returns The earliest date, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * const date1 = new Date(2024, 5, 15); // June 15, 2024
 * const date2 = new Date(2024, 5, 10); // June 10, 2024
 * const date3 = new Date(2024, 5, 20); // June 20, 2024
 * const earliest = min(date1, date2, date3); // June 10, 2024
 *
 * const timestamp1 = Date.now();
 * const timestamp2 = timestamp1 + 1000;
 * const minTimestamp = min(timestamp1, timestamp2); // earlier timestamp
 *
 * const mixed = min(new Date(2024, 5, 15), 1718409600000); // mixed Date and timestamp
 *
 * // Works with ISO 8601 strings
 * const minString = min("2024-06-15", "2024-06-10", "2024-06-20"); // June 10, 2024
 *
 * const invalidDate = new Date('invalid');
 * const validDate = new Date(2024, 5, 15);
 * const minResult = min(invalidDate, validDate); // Invalid Date
 * ```
 */
export function min(...dates: DateInput[]): Date {
  if (dates.length === 0) return new Date(NaN);

  // Convert all inputs to Date objects and check validity
  const dateObjects: Date[] = [];
  for (const date of dates) {
    if (!isValidDateInput(date)) {
      return new Date(NaN);
    }
    dateObjects.push(toDate(date));
  }

  let minDate = dateObjects[0];
  for (let i = 1; i < dateObjects.length; i++) {
    if (dateObjects[i].getTime() < minDate.getTime()) {
      minDate = dateObjects[i];
    }
  }

  return new Date(minDate.getTime());
}

