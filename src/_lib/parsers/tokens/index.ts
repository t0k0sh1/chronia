import { parseEra } from "./era";
import { parseYear } from "./year";
import { parseMonth } from "./month";
import { parseDay } from "./day";
import { parseHour } from "./hour";
import { parseHour12 } from "./hour12";
import { parseMinute } from "./minute";
import { parseSecond } from "./second";
import { parseMillisecond } from "./millisecond";
import { parseDayPeriod } from "./dayPeriod";
import { parseDayOfYear } from "./dayOfYear";
import { parseWeekday } from "./weekday";

export const tokens = {
  parseEra,
  parseYear,
  parseMonth,
  parseDay,
  parseHour,
  parseHour12,
  parseMinute,
  parseSecond,
  parseMillisecond,
  parseDayPeriod,
  parseDayOfYear,
  parseWeekday,
};