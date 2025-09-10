export function truncateToUnit(
  date: Date,
  unit: "year" | "month" | "day" | "hour" | "minute" | "second" | "millisecond",
): Date {
  const d = new Date(date);

  switch (unit) {
    case "year":
      d.setMonth(0, 1);
      d.setHours(0, 0, 0, 0);
      break;
    case "month":
      d.setDate(1);
      d.setHours(0, 0, 0, 0);
      break;
    case "day":
      d.setHours(0, 0, 0, 0);
      break;
    case "hour":
      d.setMinutes(0, 0, 0);
      break;
    case "minute":
      d.setSeconds(0, 0);
      break;
    case "second":
      d.setMilliseconds(0);
      break;
    case "millisecond":
      // do nothing
      break;
  }

  return d;
}
