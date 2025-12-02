import type { TZ } from "../types";

/**
 * Eastern Standard Time (EST) / Eastern Daylight Time (EDT)
 *
 * IANA timezone name: America/New_York
 * UTC offset: -05:00 (EST in winter) / -04:00 (EDT in summer)
 *
 * This timezone automatically handles the transition between EST and EDT
 * based on daylight saving time rules. DST typically runs from the second
 * Sunday in March to the first Sunday in November.
 */
export const EST: TZ = {
  ianaName: "America/New_York",
  identifier: "EST",
} as const;
