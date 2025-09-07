import { Formatter } from "../types";
import { tokens } from "./tokens";

export const formatters: { [token: string]: Formatter } = {
  G: tokens.formatEra,
  y: tokens.formatYear,
  M: tokens.formatMonth,
  d: tokens.formatDay,
  H: tokens.formatHour,
  h: tokens.formatHour,
  m: tokens.formatMinute,
  s: tokens.formatSecond,
  S: tokens.formatMillisecond,
  a: tokens.formatDayPeriod,
  D: tokens.formatDayOfYear,
  E: tokens.formatWeekday,
};
