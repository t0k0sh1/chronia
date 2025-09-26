import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Get the start of the day for the given date.
 *
 * Returns a new Date object set to 00:00:00.000 of the same date.
 *
 * @param date - The original date or timestamp
 * @returns New Date object representing the start of the day
 *
 * @example
 * ```typescript
 * const date = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
 * const start = startOfDay(date); // June 15, 2024 00:00:00.000
 *
 * const lateEvening = new Date(2024, 5, 15, 23, 59, 59, 999); // June 15, 2024 23:59:59.999
 * const dayStart = startOfDay(lateEvening); // June 15, 2024 00:00:00.000
 * ```
 */
export function startOfDay(date: Date | number): Date {
  if (!isValidDateOrNumber(date)) {
    return new Date(NaN);
  }
  const dt = new Date(date);
  return new Date(
    dt.getFullYear(),
    dt.getMonth(),
    dt.getDate(),
    0, // 00:00:00.000
    0,
    0,
    0
  );
}