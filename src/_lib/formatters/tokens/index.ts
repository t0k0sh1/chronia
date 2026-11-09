import { formatEra } from "./era";
import { formatYear } from "./year";
import { formatMonth } from "./month";
import { formatDay } from "./day";
import { formatHour } from "./hour";
import { formatMinute } from "./minute";
import { formatSecond } from "./second";
import { formatMillisecond } from "./millisecond";
import { formatDayPeriod } from "./dayPeriod";
import { formatDayOfYear } from "./dayOfYear";
import { formatWeekday } from "./weekday";

export const tokens: {
  formatEra: typeof formatEra;
  formatYear: typeof formatYear;
  formatMonth: typeof formatMonth;
  formatHour: typeof formatHour;
  formatMinute: typeof formatMinute;
  formatDay: typeof formatDay;
  formatSecond: typeof formatSecond;
  formatMillisecond: typeof formatMillisecond;
  formatDayPeriod: typeof formatDayPeriod;
  formatDayOfYear: typeof formatDayOfYear;
  formatWeekday: typeof formatWeekday;
} = {
  formatEra,
  formatYear,
  formatMonth,
  formatHour,
  formatMinute,
  formatDay,
  formatSecond,
  formatMillisecond,
  formatDayPeriod,
  formatDayOfYear,
  formatWeekday,
};
