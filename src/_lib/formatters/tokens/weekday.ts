import { Formatter } from "../../../types";
import { getWeekdayName } from "../../localeHelpers";

export const formatWeekday: Formatter = (date, token, locale) => {
  const weekday = date.getDay(); // 0 = Sunday, 6 = Saturday

  switch (token) {
    case "EEE":
      return getWeekdayName(locale, weekday, "abbr");
    case "EEEE":
      return getWeekdayName(locale, weekday, "wide");
    case "EEEEE":
      return getWeekdayName(locale, weekday, "narrow");
    default: // E, EE, or unknown tokens
      return getWeekdayName(locale, weekday, "abbr");
  }
};
