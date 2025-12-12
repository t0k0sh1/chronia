import type { DateInput } from "../types";
import { isValidDateInput } from "../_lib/validators";
import { toDate } from "../_lib/toDate";

/**
 * Return the latest (maximum) date from the given dates.
 *
 * Takes one or more Date objects, timestamps, or ISO 8601 strings and returns the latest one.
 * If any date is invalid, returns an Invalid Date.
 *
 * @param dates - One or more dates, timestamps, or ISO 8601 strings to compare
 * @returns The latest date, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * const date1 = new Date(2024, 5, 15); // June 15, 2024
 * const date2 = new Date(2024, 5, 10); // June 10, 2024
 * const date3 = new Date(2024, 5, 20); // June 20, 2024
 * const latest = max(date1, date2, date3); // June 20, 2024
 *
 * const timestamp1 = Date.now();
 * const timestamp2 = timestamp1 + 1000;
 * const maxTimestamp = max(timestamp1, timestamp2); // later timestamp
 *
 * const mixed = max(new Date(2024, 5, 15), 1718409600000); // mixed Date and timestamp
 *
 * // Works with ISO 8601 strings
 * const maxString = max("2024-06-15", "2024-06-10", "2024-06-20"); // June 20, 2024
 *
 * const invalidDate = new Date('invalid');
 * const validDate = new Date(2024, 5, 15);
 * const maxResult = max(invalidDate, validDate); // Invalid Date
 * ```
 */
export function max(...dates: DateInput[]): Date {
  if (dates.length === 0) return new Date(NaN);

  // Convert all inputs to Date objects and check validity
  const dateObjects: Date[] = [];
  for (const date of dates) {
    if (!isValidDateInput(date)) {
      return new Date(NaN);
    }
    dateObjects.push(toDate(date));
  }

  let maxDate = dateObjects[0];
  for (let i = 1; i < dateObjects.length; i++) {
    if (dateObjects[i].getTime() > maxDate.getTime()) {
      maxDate = dateObjects[i];
    }
  }

  return new Date(maxDate.getTime());
}

