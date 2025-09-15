/**
 * Get the end of the day for the given date.
 *
 * Returns a new Date object set to 23:59:59.999 of the same date.
 *
 * @param date - The original date or timestamp
 * @returns New Date object representing the end of the day
 *
 * @example
 * ```typescript
 * const date = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
 * const end = endOfDay(date); // June 15, 2024 23:59:59.999
 *
 * const earlyMorning = new Date(2024, 5, 15, 0, 0, 0, 0); // June 15, 2024 00:00:00.000
 * const dayEnd = endOfDay(earlyMorning); // June 15, 2024 23:59:59.999
 * ```
 */
export function endOfDay(date: Date | number): Date {
  const dt = new Date(date);
  return new Date(
    dt.getFullYear(),
    dt.getMonth(),
    dt.getDate(),
    23, // 23:59:59.999
    59,
    59,
    999
  );
}