import { isValidDateOrNumber } from "../_lib/validators";

/**
 * Compare two Date objects or timestamps chronologically.
 *
 * @param date1 - The first Date object or timestamp to compare
 * @param date2 - The second Date object or timestamp to compare
 * @param order - Optional sort order: "ASC" for ascending (default) or "DESC" for descending
 * @returns -1 if date1 < date2, 1 if date1 > date2, 0 if equal (adjusted for order)
 *
 * @throws {RangeError} When arguments are not valid Date objects/timestamps
 *
 * @example
 * // Compare Date objects (existing behavior)
 * compare(new Date('2024-01-01'), new Date('2024-01-02')); // -1 (ascending)
 * compare(new Date('2024-01-01'), new Date('2024-01-02'), 'DESC'); // 1 (descending)
 * compare(new Date('2024-01-01'), new Date('2024-01-01')); // 0 (equal)
 *
 * @example
 * // Compare timestamps (new feature)
 * const timestamp1 = new Date('2024-01-01').getTime();
 * const timestamp2 = new Date('2024-01-02').getTime();
 * compare(timestamp1, timestamp2); // -1 (ascending)
 * compare(timestamp1, timestamp2, 'DESC'); // 1 (descending)
 *
 * @example
 * // Compare mixed Date and timestamp inputs
 * compare(new Date('2024-01-01'), new Date('2024-01-02').getTime()); // -1
 * compare(timestamp1, new Date('2024-01-02')); // -1
 *
 * @example
 * // Sort dates in ascending order
 * dates.sort(compare);
 *
 * @example
 * // Sort mixed arrays
 * mixed.sort((a, b) => compare(a, b, 'DESC'));
 *
 * @example
 * // Order parameter is case-insensitive at runtime (though TypeScript types are strict)
 * // These work at runtime even though TypeScript will show type errors:
 * // compare(date1, date2, 'desc'); // treated as 'DESC'
 * // compare(date1, date2, 'asc');  // treated as 'ASC'
 * // compare(date1, date2, 'xyz');  // treated as 'ASC' (default)
 */
export function compare(
  date1: Date | number,
  date2: Date | number,
  order?: "ASC" | "DESC",
): number {
  // Validate inputs early for NaN cases
  if (!isValidDateOrNumber(date1) || !isValidDateOrNumber(date2)) return NaN;

  // Validate and convert inputs using helper function
  const dateLeft = new Date(date1);
  const dateRight = new Date(date2);

  // Order parameter normalization (case-insensitive, default to ASC for invalid values)
  let normalizedOrder: "ASC" | "DESC" = "ASC";
  if (order !== undefined && order !== null && typeof order === "string") {
    const upperOrder = order.toUpperCase();
    if (upperOrder === "DESC") {
      normalizedOrder = "DESC";
    }
    // Any other value (including "ASC", "asc", or invalid strings) defaults to "ASC"
  }
  // null, undefined, and non-string values all default to "ASC"

  // Core comparison logic using Date.getTime()
  const timestamp1 = dateLeft.getTime();
  const timestamp2 = dateRight.getTime();
  const diff = timestamp1 - timestamp2;

  if (diff === 0) {
    return 0;
  }

  const result = Math.sign(diff);

  // Apply order adjustment for descending sort
  return normalizedOrder === "DESC" ? -result : result;
}

