import type { TZ } from "../types";

/**
 * Pacific Standard Time (PST) / Pacific Daylight Time (PDT)
 *
 * IANA timezone name: America/Los_Angeles
 * UTC offset: -08:00 (PST in winter) / -07:00 (PDT in summer)
 *
 * This timezone automatically handles the transition between PST and PDT
 * based on daylight saving time rules. DST typically runs from the second
 * Sunday in March to the first Sunday in November.
 */
export const PST: TZ = {
  ianaName: "America/Los_Angeles",
  identifier: "PST",
} as const;
