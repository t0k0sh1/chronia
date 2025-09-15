/**
 * Return the earliest (minimum) date from the given dates.
 *
 * Takes one or more Date objects or timestamps and returns the earliest one.
 * If any date is invalid, returns an Invalid Date.
 *
 * @param dates - One or more dates or timestamps to compare
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
 * const singleDate = new Date(2024, 5, 15);
 * const result = min(singleDate); // June 15, 2024
 *
 * const invalidDate = new Date('invalid');
 * const validDate = new Date(2024, 5, 15);
 * const minResult = min(invalidDate, validDate); // Invalid Date
 * ```
 */
export function min(...dates: (Date | number)[]): Date {
  if (dates.length === 0) {
    throw new Error('min requires at least one date argument');
  }

  // Convert all inputs to Date objects and check validity
  const dateObjects: Date[] = [];
  for (const date of dates) {
    const dateObj = typeof date === 'number' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) {
      return new Date(NaN);
    }
    dateObjects.push(dateObj);
  }

  let minDate = dateObjects[0];
  for (let i = 1; i < dateObjects.length; i++) {
    if (dateObjects[i].getTime() < minDate.getTime()) {
      minDate = dateObjects[i];
    }
  }

  return new Date(minDate.getTime());
}