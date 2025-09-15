import { truncateToUnit } from "../_lib/truncateToUnit";
import { TimeUnit } from "../types";

/**
 * Check if date `a` is strictly after date `b`.
 *
 * - Returns `false` if either date is invalid.
 * - Comparison can be truncated to a given unit (default: millisecond).
 * - Equality is not considered "after".
 *
 * @param a - First date or timestamp to compare.
 * @param b - Second date or timestamp to compare.
 * @param opts.unit - Comparison unit (year, month, day, hour, minute, second, millisecond).
 */
export function isAfter(
  a: Date | number,
  b: Date | number,
  opts?: {
    unit?: TimeUnit;
  },
): boolean {
  const dtA = new Date(a);
  const dtB = new Date(b);
  if (isNaN(dtA.getTime()) || isNaN(dtB.getTime())) return false;

  const unit = opts?.unit ?? "millisecond";

  if (unit === "millisecond") {
    return dtA.getTime() > dtB.getTime();
  }

  const aTruncated = truncateToUnit(dtA, unit);
  const bTruncated = truncateToUnit(dtB, unit);
  return aTruncated.getTime() > bTruncated.getTime();
}

