import { Formatter } from "../../../types";
import { getDayPeriod } from "../../localeHelpers";

export const formatDayPeriod: Formatter = (date, token, locale) => {
  const hours = date.getHours();
  const period: "am" | "pm" = hours < 12 ? "am" : "pm";

  switch (token) {
    case "a": // short (AM/PM)
    case "aa":
      return getDayPeriod(locale, period, "abbr");
    case "aaa": // abbreviated (am/pm - lowercase for date-fns compatibility)
      return getDayPeriod(locale, period, "abbr").toLowerCase();
    case "aaaa": // wide
      return getDayPeriod(locale, period, "wide");
    case "aaaaa": // narrow
      return getDayPeriod(locale, period, "narrow");
    default:
      return getDayPeriod(locale, period, "abbr");
  }
};
