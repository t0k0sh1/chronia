import { truncateToUnit } from "../_lib/truncateToUnit";
import { TimeUnit } from "../_lib/types";

/**
 * Check if date `a` is before or equal to date `b`.
 *
 * - Returns `false` if either date is invalid.
 * - Comparison can be truncated to a given unit (default: millisecond).
 *
 * @param a - First date to compare.
 * @param b - Second date to compare.
 * @param opts.unit - Comparison unit (year, month, day, hour, minute, second, millisecond).
 */
export function isBeforeOrEqual(
  a: Date,
  b: Date,
  opts?: {
    unit?: TimeUnit;
  },
): boolean {
  if (isNaN(a.getTime()) || isNaN(b.getTime())) return false;

  const unit = opts?.unit ?? "millisecond";

  if (unit === "millisecond") {
    return a.getTime() <= b.getTime();
  }

  const aTruncated = truncateToUnit(a, unit);
  const bTruncated = truncateToUnit(b, unit);
  return aTruncated.getTime() <= bTruncated.getTime();
}