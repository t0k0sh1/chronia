import { c as TZ } from '../types-NwmfnHjU.cjs';

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
declare const UTC: TZ;

/**
 * Japan Standard Time (JST)
 *
 * IANA timezone name: Asia/Tokyo
 * UTC offset: +09:00 (no DST)
 *
 * Japan does not observe Daylight Saving Time, maintaining a constant
 * offset of UTC+9 throughout the year.
 */
declare const JST: TZ;

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
declare const EST: TZ;

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
declare const PST: TZ;

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
declare const GMT: TZ;

export { EST, GMT, JST, PST, UTC };
