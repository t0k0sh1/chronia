import { Parser } from "../../types";
import { tokens } from "./tokens";

export const parsers: { [token: string]: Parser } = {
  G: tokens.parseEra,
  y: tokens.parseYear,
  M: tokens.parseMonth,
  d: tokens.parseDay,
  H: tokens.parseHour,
  h: tokens.parseHour12,
  m: tokens.parseMinute,
  s: tokens.parseSecond,
  S: tokens.parseMillisecond,
  a: tokens.parseDayPeriod,
  D: tokens.parseDayOfYear,
  E: tokens.parseWeekday,
};