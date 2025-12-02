import type { TZ } from "../types";

/**
 * Greenwich Mean Time (GMT) / British Summer Time (BST)
 *
 * IANA timezone name: Europe/London
 * UTC offset: +00:00 (GMT in winter) / +01:00 (BST in summer)
 *
 * This timezone observes Daylight Saving Time as British Summer Time (BST)
 * during summer months. GMT does not observe DST itself, but the Europe/London
 * timezone automatically transitions to BST (UTC+1) from the last Sunday in
 * March to the last Sunday in October.
 *
 * Note: True GMT (without DST) can be represented using the UTC constant or
 * the IANA timezone "Etc/GMT".
 */
export const GMT: TZ = {
  ianaName: "Europe/London",
  identifier: "GMT",
} as const;
