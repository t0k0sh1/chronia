import { Formatter } from "../../types";

export const formatDayPeriod: Formatter = (date, token, localize) => {
  const hours = date.getHours();
  const period: "am" | "pm" = hours < 12 ? "am" : "pm";

  if (localize) {
    switch (token) {
      case "a": // abbreviated
      case "aa":
      case "aaa":
        return localize.dayPeriod(period, { width: "abbreviated" });
      case "aaaa": // wide
        return localize.dayPeriod(period, { width: "wide" });
      case "aaaaa": // narrow
        return localize.dayPeriod(period, { width: "narrow" });
      default:
        return localize.dayPeriod(period, { width: "abbreviated" });
    }
  }

  // fallback
  return period === "am" ? "AM" : "PM";
};
