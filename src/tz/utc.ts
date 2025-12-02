import type { TZ } from "../types";

/**
 * Coordinated Universal Time (UTC)
 *
 * IANA timezone name: UTC
 * UTC offset: +00:00 (no DST)
 *
 * UTC is the primary time standard by which the world regulates clocks and time.
 * It does not observe Daylight Saving Time and maintains a constant offset of zero.
 *
 * This constant uses "UTC" as the IANA name, which is equivalent to "Etc/UTC"
 * but more commonly recognized and preferred in modern applications.
 */
export const UTC: TZ = {
  ianaName: "UTC",
  identifier: "UTC",
} as const;
