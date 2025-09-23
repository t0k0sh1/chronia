/**
 * Extract timestamp value from a Date object.
 *
 * @param date - The Date object to extract timestamp from
 * @returns The number of milliseconds since Unix epoch, or NaN for invalid dates or invalid arguments
 *
 * @example
 * getTime(new Date('2024-01-01')); // 1704067200000
 * getTime(new Date('invalid')); // NaN
 * getTime('not a date'); // NaN
 *
 * @remarks
 * This function provides the same behavior as Date.prototype.getTime(),
 * returning the timestamp in milliseconds since the Unix epoch (1970-01-01T00:00:00.000Z).
 * For invalid dates or invalid arguments, it returns NaN.
 */
export function getTime(date: Date): number {
  if (!(date instanceof Date)) {
    return NaN;
  }
  return date.getTime();
}