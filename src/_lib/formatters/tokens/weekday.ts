import { Formatter } from "../../../types";

export const formatWeekday: Formatter = (date, token, locale) => {
  const weekday = date.getDay(); // 0 = Sunday, 6 = Saturday

  if (locale) {
    switch (token) {
      case "E":
      case "EE":
      case "EEE":
        return locale.weekday(weekday, { width: "abbreviated" });
      case "EEEE":
        return locale.weekday(weekday, { width: "wide" });
      case "EEEEE":
        return locale.weekday(weekday, { width: "narrow" });
      default:
        return locale.weekday(weekday, { width: "abbreviated" });
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
