import type { TZ } from "../types";

/**
 * Japan Standard Time (JST)
 *
 * IANA timezone name: Asia/Tokyo
 * UTC offset: +09:00 (no DST)
 *
 * Japan does not observe Daylight Saving Time, maintaining a constant
 * offset of UTC+9 throughout the year.
 */
export const JST: TZ = {
  ianaName: "Asia/Tokyo",
  identifier: "JST",
} as const;
