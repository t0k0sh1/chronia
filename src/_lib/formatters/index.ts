import { Formatter } from "./types";
import { formatEra } from "./tokens/era";
import { formatYear } from "./tokens/year";
import { formatMonth } from "./tokens/month";
import { formatDay } from "./tokens/day";
import { formatHour } from "./tokens/hour";
import { formatMinute } from "./tokens/minute";
import { formatSecond } from "./tokens/second";
import { formatMillisecond } from "./tokens/millisecond";
import { formatDayPeriod } from "./tokens/dayPeriod";
import { formatDayOfYear } from "./tokens/dayOfYear";
import { formatWeekday } from "./tokens/weekday";

export const formatters: { [token: string]: Formatter } = {
  G: formatEra,
  y: formatYear,
  M: formatMonth,
  d: formatDay,
  H: formatHour,
  h: formatHour,
  m: formatMinute,
  s: formatSecond,
  S: formatMillisecond,
  a: formatDayPeriod,
  D: formatDayOfYear,
  E: formatWeekday,
};
