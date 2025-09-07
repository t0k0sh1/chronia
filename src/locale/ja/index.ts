import { Localize } from "../../_lib/types";

export const ja: Localize = {
  era: (era, options) => {
    if (options?.width === "narrow") return era ? "西" : "紀";
    if (options?.width === "wide") return era ? "西暦" : "紀元前";
    return era ? "AD" : "BC"; // fallback
  },
  month: (month, options) => {
    const months = [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ];
    return months[month];
  },
  weekday: (weekday, options) => {
    const days = ["日", "月", "火", "水", "木", "金", "土"];
    return days[weekday];
  },
  dayPeriod: (period, options) => {
    if (options?.width === "narrow") return period === "am" ? "午前" : "午後";
    if (options?.width === "wide") return period === "am" ? "午前" : "午後";
    return period === "am" ? "AM" : "PM"; // fallback
  },
};
