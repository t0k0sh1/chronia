import { Formatter } from "../types";

export const formatYear: Formatter = (date, token) => {
  const rawYear = date.getFullYear();
  const displayYear = rawYear > 0 ? rawYear : Math.abs(rawYear) + 1;
  const yearStr = String(displayYear);

  switch (token) {
    case "yyyy":
      return yearStr.padStart(4, "0");
    case "yy":
      return yearStr.slice(-2).padStart(2, "0");
    case "y":
    default:
      return yearStr;
  }
};
