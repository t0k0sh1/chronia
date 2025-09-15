/**
 * Return the latest (maximum) date from the given dates.
 *
 * Takes one or more Date objects or timestamps and returns the latest one.
 * If any date is invalid, returns an Invalid Date.
 *
 * @param dates - One or more dates or timestamps to compare
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
 * const singleDate = new Date(2024, 5, 15);
 * const result = max(singleDate); // June 15, 2024
 *
 * const invalidDate = new Date('invalid');
 * const validDate = new Date(2024, 5, 15);
 * const maxResult = max(invalidDate, validDate); // Invalid Date
 * ```
 */
export function max(...dates: (Date | number)[]): Date {
  if (dates.length === 0) {
    throw new Error("max requires at least one date argument");
  }

  // Convert all inputs to Date objects and check validity
  const dateObjects: Date[] = [];
  for (const date of dates) {
    const dateObj = typeof date === "number" ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) {
      return new Date(NaN);
    }
    dateObjects.push(dateObj);
  }

  let maxDate = dateObjects[0];
  for (let i = 1; i < dateObjects.length; i++) {
    if (dateObjects[i].getTime() > maxDate.getTime()) {
      maxDate = dateObjects[i];
    }
  }

  return new Date(maxDate.getTime());
}