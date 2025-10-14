import { isValidDateOrNumber } from "../_lib/validators";
import type { CompareOptions } from "../types";

/**
 * Compare two Date objects or timestamps chronologically with configurable sort order.
 *
 * @param date1 - The first Date object or timestamp to compare
 * @param date2 - The second Date object or timestamp to compare
 * @param options - Comparison options with default { order: "ASC" }
 * @returns -1 if date1 < date2, 1 if date1 > date2, 0 if equal (adjusted for order)
 *          Returns NaN if inputs are invalid
 *
 * @example
 * // Compare Date objects with default ascending order
 * compare(new Date('2024-01-01'), new Date('2024-01-02')); // -1 (ascending)
 * compare(new Date('2024-01-01'), new Date('2024-01-01')); // 0 (equal)
 *
 * @example
 * // Compare with explicit descending order
 * compare(new Date('2024-01-01'), new Date('2024-01-02'), { order: 'DESC' }); // 1 (descending)
 *
 * @example
 * // Compare timestamps
 * const timestamp1 = new Date('2024-01-01').getTime();
 * const timestamp2 = new Date('2024-01-02').getTime();
 * compare(timestamp1, timestamp2); // -1 (ascending)
 * compare(timestamp1, timestamp2, { order: 'DESC' }); // 1 (descending)
 *
 * @example
 * // Compare mixed Date and timestamp inputs
 * compare(new Date('2024-01-01'), new Date('2024-01-02').getTime()); // -1
 * compare(timestamp1, new Date('2024-01-02')); // -1
 *
 * @example
 * // Sort dates in ascending order (default)
 * dates.sort(compare);
 *
 * @example
 * // Sort dates in descending order
 * dates.sort((a, b) => compare(a, b, { order: 'DESC' }));
 *
 * @example
 * // Empty options object defaults to ascending order
 * compare(date1, date2, {}); // Same as compare(date1, date2)
 *
 * @example
 * // Order property is case-insensitive at runtime
 * // These work at runtime even though TypeScript will show type errors:
 * // compare(date1, date2, { order: 'desc' }); // treated as 'DESC'
 * // compare(date1, date2, { order: 'asc' });  // treated as 'ASC'
 * // compare(date1, date2, { order: 'xyz' });  // treated as 'ASC' (default)
 */
export function compare(
  date1: Date | number,
  date2: Date | number,
  options: CompareOptions = { order: "ASC" },
): number {
  // Validate inputs early for NaN cases
  if (!isValidDateOrNumber(date1) || !isValidDateOrNumber(date2)) return NaN;

  // Convert Validated inputs directly to Date objects
  const dateLeft = new Date(date1);
  const dateRight = new Date(date2);

  // Options normalization (case-insensitive order, default to ASC for invalid values)
  // Handle both legacy string argument (for JS compatibility) and new options object
  // Use type assertion to allow runtime flexibility while maintaining TypeScript types
  const opts = options as CompareOptions | string | undefined | null;

  // Extract order value from either string or options object
  let orderValue: string | undefined;
  if (typeof opts === "string") {
    orderValue = opts; // Legacy string API
  } else if (opts && typeof opts === "object" && "order" in opts) {
    orderValue = opts.order; // New options object API
  }

  // Normalize order value (case-insensitive, defaults to ASC for invalid values)
  const normalizedOrder: "ASC" | "DESC" =
    typeof orderValue === "string" && orderValue.toUpperCase() === "DESC"
      ? "DESC"
      : "ASC";

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

