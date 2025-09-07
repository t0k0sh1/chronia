import { Formatter } from "../../types";

export const formatWeekday: Formatter = (date, token, localize) => {
  const weekday = date.getDay(); // 0 = Sunday, 6 = Saturday

  if (localize) {
    switch (token) {
      case "E":
      case "EE":
      case "EEE":
        return localize.weekday(weekday, { width: "abbreviated" });
      case "EEEE":
        return localize.weekday(weekday, { width: "wide" });
      case "EEEEE":
        return localize.weekday(weekday, { width: "narrow" });
      default:
        return localize.weekday(weekday, { width: "abbreviated" });
    }
  }

  // fallback 英語
  const abbreviated = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const wide = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const narrow = ["S", "M", "T", "W", "T", "F", "S"];

  switch (token) {
    case "EEEE":
      return wide[weekday];
    case "EEEEE":
      return narrow[weekday];
    default: // E, EE, EEE
      return abbreviated[weekday];
  }
};
