import { Formatter } from "../../types";

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
}

export const formatDayOfYear: Formatter = (date, token) => {
  const dayOfYear = getDayOfYear(date);
  switch (token) {
    case "D":
      return String(dayOfYear);
    case "DD":
      return String(dayOfYear).padStart(2, "0");
    case "DDD":
      return String(dayOfYear).padStart(3, "0");
    default:
      return String(dayOfYear);
  }
};
