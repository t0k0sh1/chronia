import { Formatter } from "../../../types";

export const formatDayPeriod: Formatter = (date, token, locale) => {
  const hours = date.getHours();
  const period: "am" | "pm" = hours < 12 ? "am" : "pm";

  if (locale) {
    switch (token) {
      case "a": // abbreviated
      case "aa":
      case "aaa":
        return locale.dayPeriod(period, { width: "abbreviated" });
      case "aaaa": // wide
        return locale.dayPeriod(period, { width: "wide" });
      case "aaaaa": // narrow
        return locale.dayPeriod(period, { width: "narrow" });
      default:
        return locale.dayPeriod(period, { width: "abbreviated" });
    }
  }

  // fallback
  return period === "am" ? "AM" : "PM";
};
