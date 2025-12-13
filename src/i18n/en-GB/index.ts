import { Locale } from "../../types";

/**
 * English (United Kingdom) locale data.
 *
 * Note: British English uses the same month names, weekday names, and day
 * periods as American English. Date format differences (DD/MM/YYYY vs
 * MM/DD/YYYY) are handled at the format pattern level, not in locale data.
 */
export const enGB: Locale = {
  era: {
    narrow: ["B", "A"] as const,
    abbr: ["BC", "AD"] as const,
    wide: ["Before Christ", "Anno Domini"] as const,
  },

  month: {
    narrow: [
      "J",
      "F",
      "M",
      "A",
      "M",
      "J",
      "J",
      "A",
      "S",
      "O",
      "N",
      "D",
    ] as const,
    abbr: [
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
    ] as const,
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
    ] as const,
  },

  weekday: {
    narrow: ["S", "M", "T", "W", "T", "F", "S"] as const,
    abbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const,
    wide: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ] as const,
  },

  dayPeriod: {
    narrow: ["a", "p"] as const,
    abbr: ["AM", "PM"] as const,
    wide: ["a.m.", "p.m."] as const,
  },
};
