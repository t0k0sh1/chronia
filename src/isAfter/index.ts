import { truncateToUnit } from "../_lib/truncateToUnit";

export function isAfter(
  a: Date,
  b: Date,
  opts?: {
    unit?:
      | "year"
      | "month"
      | "day"
      | "hour"
      | "minute"
      | "second"
      | "millisecond";
  },
): boolean {
  const unit = opts?.unit ?? "millisecond";
  const aTruncated = truncateToUnit(a, unit);
  const bTruncated = truncateToUnit(b, unit);
  return aTruncated.getTime() > bTruncated.getTime();
}