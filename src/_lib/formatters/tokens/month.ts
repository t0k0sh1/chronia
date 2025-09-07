import { Formatter } from "../types";

export const formatMonth: Formatter = (date, token) => {
  const monthStr = String(date.getMonth() + 1); // 1–12
  switch (token) {
    case "MM":
      return monthStr.padStart(2, "0");
    case "M":
    default:
      return monthStr;
  }
};
