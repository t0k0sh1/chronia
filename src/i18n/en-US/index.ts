import { Locale } from "../../types";

export const enUS: Locale = {
  era: (era, options) => {
    if (options?.width === "narrow") return era ? "A" : "B";
    if (options?.width === "wide") return era ? "Anno Domini" : "Before Christ";
    return era ? "AD" : "BC";
  },
  month: (month, options) => {
    const months = {
      narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      abbreviated: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      wide: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
    return months[options?.width || "abbreviated"][month];
  },
  weekday: (weekday, options) => {
    const weekdays = {
      narrow: ["S", "M", "T", "W", "T", "F", "S"],
      abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      wide: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    };
    return weekdays[options?.width || "abbreviated"][weekday];
  },
  dayPeriod: (period, options) => {
    if (options?.width === "narrow") return period === "am" ? "a" : "p";
    if (options?.width === "wide")
      return period === "am" ? "AM (morning)" : "PM (afternoon)";
    return period === "am" ? "AM" : "PM";
  },
};
