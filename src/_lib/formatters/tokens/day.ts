import { Formatter } from "../types";

export const formatDay: Formatter = (date, token) => {
  const dayStr = String(date.getDate());
  switch (token) {
    case "dd":
      return dayStr.padStart(2, "0");
    case "d":
    default:
      return dayStr;
  }
};
