import { Formatter } from "../../../types";

export const formatSecond: Formatter = (date, token) => {
  const secondsStr = String(date.getSeconds());
  switch (token) {
    case "ss":
      return secondsStr.padStart(2, "0");
    case "s":
    default:
      return secondsStr;
  }
};
