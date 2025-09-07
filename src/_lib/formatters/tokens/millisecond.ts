import { Formatter } from "../../types";

export const formatMillisecond: Formatter = (date, token) => {
  const millisStr = String(date.getMilliseconds());
  switch (token) {
    case "SSS":
      return millisStr.padStart(3, "0");
    case "SS":
      return millisStr.padStart(2, "0").slice(0, 2);
    case "S":
    default:
      return millisStr.slice(0, 1);
  }
};
