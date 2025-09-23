/**
 * Compare two Date objects chronologically.
 *
 * @param date1 - The first Date object to compare
 * @param date2 - The second Date object to compare
 * @param order - Optional sort order: "ASC" for ascending (default) or "DESC" for descending
 * @returns -1 if date1 < date2, 1 if date1 > date2, 0 if equal (adjusted for order)
 *
 * @throws {RangeError} When arguments are not valid Date objects or order is invalid
 *
 * @example
 * compare(new Date('2024-01-01'), new Date('2024-01-02')); // -1 (ascending)
 * compare(new Date('2024-01-01'), new Date('2024-01-02'), 'DESC'); // 1 (descending)
 * compare(new Date('2024-01-01'), new Date('2024-01-01')); // 0 (equal)
 *
 * @example
 * // Sort dates in ascending order
 * dates.sort(compare);
 *
 * @example
 * // Sort dates in descending order
 * dates.sort((a, b) => compare(a, b, 'DESC'));
 */
export function compare(
  date1: Date,
  date2: Date,
  order: "ASC" | "DESC" = "ASC"
): number {
  // T011: Input validation for Date objects and order parameter
  if (!(date1 instanceof Date)) {
    throw new RangeError("First argument must be a Date object");
  }

  if (!(date2 instanceof Date)) {
    throw new RangeError("Second argument must be a Date object");
  }

  // T013: RangeError handling for invalid inputs
  const timestamp1 = date1.getTime();
  if (isNaN(timestamp1)) {
    throw new RangeError("First date is invalid");
  }

  const timestamp2 = date2.getTime();
  if (isNaN(timestamp2)) {
    throw new RangeError("Second date is invalid");
  }

  if (order !== "ASC" && order !== "DESC") {
    throw new RangeError("Order must be 'ASC' or 'DESC'");
  }

  // T012: Core comparison logic using Date.getTime()
  const diff = timestamp1 - timestamp2;

  if (diff === 0) {
    return 0;
  }

  const result = Math.sign(diff);

  // Apply order adjustment for descending sort
  return order === "DESC" ? -result : result;
}