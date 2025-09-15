/**
 * Get the end of the year for the given date.
 *
 * Returns a new Date object set to December 31st at 23:59:59.999 of the same year.
 *
 * @param date - The original date or timestamp
 * @returns New Date object representing the end of the year
 *
 * @example
 * ```typescript
 * const date = new Date(2024, 5, 15, 14, 30, 45); // June 15, 2024 14:30:45
 * const end = endOfYear(date); // December 31, 2024 23:59:59.999
 *
 * const firstDayOfYear = new Date(2024, 0, 1, 0, 0, 0); // January 1, 2024 00:00:00
 * const yearEnd = endOfYear(firstDayOfYear); // December 31, 2024 23:59:59.999
 * ```
 */
export function endOfYear(date: Date | number): Date {
  const dt = new Date(date);
  return new Date(
    dt.getFullYear(),
    11, // December (month 11)
    31, // Last day of the year
    23, // 23:59:59.999
    59,
    59,
    999
  );
}