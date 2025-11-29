import { Formatter } from "../../../types";

export const formatMillisecond: Formatter = (date, token) => {
  const millis = date.getMilliseconds();
  switch (token) {
    case "SSS":
      return String(millis).padStart(3, "0");
    case "SS":
      // date-fns: SS represents tens of milliseconds (0-99)
      return String(Math.floor(millis / 10)).padStart(2, "0");
    case "S":
      // date-fns: S represents hundreds of milliseconds (0-9)
      return String(Math.floor(millis / 100));
    default:
      return String(Math.floor(millis / 100));
  }
};
