import { Formatter } from "../../types";

export const formatMinute: Formatter = (date, token) => {
  const minutesStr = String(date.getMinutes());
  switch (token) {
    case "mm":
      return minutesStr.padStart(2, "0");
    case "m":
    default:
      return minutesStr;
  }
};
