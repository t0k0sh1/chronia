import { L as Locale } from '../types-BJmXVUwP.js';

declare const enUS: Locale;

/**
 * Japanese locale data.
 *
 * Note: In Japanese, narrow and abbreviated forms are often identical for
 * certain components (weekday, dayPeriod), which is a characteristic of
 * the language.
 *
 * @remarks Era Notation
 * This locale uses "AD" (Anno Domini) for the narrow era format, following
 * international standards (ISO, Unicode CLDR). Note that date-fns v4.1.0
 * uses "AC" in its Japanese locale, which is non-standard. Chronia prioritizes
 * correctness over compatibility in this case.
 */
declare const ja: Locale;

/**
 * Chinese (Simplified) locale data.
 *
 * Note: In Chinese, abbreviated and wide forms are often identical for
 * certain components (era, dayPeriod), which is a characteristic of
 * the language.
 */
declare const zhCN: Locale;

/**
 * Korean locale data.
 *
 * Note: In Korean, narrow and abbreviated forms are often identical for
 * weekdays and dayPeriod, which is a characteristic of the language.
 */
declare const ko: Locale;

/**
 * Spanish locale data.
 *
 * Based on CLDR data for Spanish (Spain).
 */
declare const es: Locale;

/**
 * French locale data.
 *
 * Based on CLDR data for French (France).
 */
declare const fr: Locale;

/**
 * German locale data.
 *
 * Based on CLDR data for German (Germany).
 */
declare const de: Locale;

/**
 * Portuguese (Brazil) locale data.
 *
 * Based on CLDR data for Portuguese (Brazil).
 */
declare const ptBR: Locale;

/**
 * Russian locale data.
 *
 * Based on CLDR data for Russian (Russia).
 */
declare const ru: Locale;

/**
 * Arabic locale data.
 *
 * Based on CLDR data for Arabic.
 *
 * Note: Arabic is a right-to-left (RTL) language. The locale data contains
 * standard Unicode strings; RTL display handling is the responsibility of
 * the UI layer. Applications should apply appropriate CSS styles
 * (`direction: rtl`) or use platform-specific RTL rendering.
 */
declare const ar: Locale;

declare const it: Locale;

declare const nl: Locale;

declare const pl: Locale;

declare const pt: Locale;

declare const sv: Locale;

declare const tr: Locale;

/**
 * Chinese (Traditional - Taiwan) locale data.
 *
 * Note: Taiwan uses "西元" (Western calendar) for era naming, which differs
 * from zh-CN's "公元" (Common Era). Weekday abbreviations use "週" instead
 * of "周" (Simplified Chinese variant).
 */
declare const zhTW: Locale;

/**
 * Chinese (Traditional - Hong Kong) locale data.
 *
 * Note: Hong Kong uses "公元" (Common Era) for era naming, similar to zh-CN.
 * Weekday abbreviations use "週" (Traditional Chinese variant) instead of "周".
 */
declare const zhHK: Locale;

/**
 * Vietnamese locale data.
 *
 * Note: Vietnamese uses Latin script with diacritics. Weekdays use "Thứ"
 * (ordinal) prefix except for Sunday which is "Chủ Nhật" (Lord's Day).
 * Day periods use abbreviated forms "SA" (sáng - morning) and "CH"
 * (chiều - afternoon).
 */
declare const vi: Locale;

/**
 * Indonesian locale data.
 *
 * Note: Indonesian uses Latin script with Western-influenced month and
 * weekday names. Era uses "Sebelum Masehi" (Before Christ) and "Masehi"
 * (Common Era/AD).
 */
declare const id: Locale;

/**
 * Malay locale data.
 *
 * Note: Malay uses Latin script with some differences from Indonesian.
 * Era uses "Sebelum Masihi" (Before Christ) and "Masihi" (Common Era).
 * Day periods use "PG" (pagi - morning) and "PTG" (petang - evening).
 */
declare const ms: Locale;

/**
 * Thai locale data.
 *
 * Note: Thai uses Thai script. This implementation uses the Gregorian calendar
 * era (ค.ศ. = คริสต์ศักราช) rather than Buddhist Era (พ.ศ. = พุทธศักราช)
 * for consistency with international standards.
 */
declare const th: Locale;

/**
 * Hindi locale data.
 *
 * Note: Hindi uses Devanagari script. Era uses "ईसा-पूर्व" (Before Christ)
 * and "ईसवी सन" (Anno Domini/Common Era). Day periods use "पूर्वाह्न"
 * (forenoon/AM) and "अपराह्न" (afternoon/PM).
 */
declare const hi: Locale;

/**
 * English (United Kingdom) locale data.
 *
 * Note: British English uses the same month names, weekday names, and day
 * periods as American English. Date format differences (DD/MM/YYYY vs
 * MM/DD/YYYY) are handled at the format pattern level, not in locale data.
 */
declare const enGB: Locale;

/**
 * English (Australia) locale data.
 *
 * Note: Australian English uses the same month names, weekday names, and day
 * periods as American English. Date format differences (DD/MM/YYYY vs
 * MM/DD/YYYY) are handled at the format pattern level, not in locale data.
 */
declare const enAU: Locale;

/**
 * English (Canada) locale data.
 *
 * Note: Canadian English uses the same month names, weekday names, and day
 * periods as American English. Date format differences are handled at the
 * format pattern level, not in locale data.
 */
declare const enCA: Locale;

/**
 * Danish locale data.
 *
 * Based on CLDR data for Danish (Denmark).
 */
declare const da: Locale;

/**
 * Finnish locale data.
 *
 * Based on CLDR data for Finnish (Finland).
 */
declare const fi: Locale;

/**
 * Norwegian Bokmål locale data.
 *
 * Based on CLDR data for Norwegian Bokmål (Norway).
 */
declare const nb: Locale;

/**
 * Czech locale data.
 *
 * Based on CLDR data for Czech (Czech Republic).
 */
declare const cs: Locale;

/**
 * Greek locale data.
 *
 * Based on CLDR data for Greek (Greece).
 */
declare const el: Locale;

/**
 * Hebrew locale data.
 *
 * Based on CLDR data for Hebrew (Israel).
 * Note: Hebrew is a right-to-left (RTL) language.
 */
declare const he: Locale;

/**
 * Hungarian locale data.
 *
 * Based on CLDR data for Hungarian (Hungary).
 */
declare const hu: Locale;

/**
 * Romanian locale data.
 *
 * Based on CLDR data for Romanian (Romania).
 */
declare const ro: Locale;

/**
 * Ukrainian locale data.
 *
 * Based on CLDR data for Ukrainian (Ukraine).
 */
declare const uk: Locale;

/**
 * Slovak locale data.
 *
 * Based on CLDR data for Slovak (Slovakia).
 */
declare const sk: Locale;

/**
 * Bulgarian locale data.
 *
 * Based on CLDR data for Bulgarian (Bulgaria).
 */
declare const bg: Locale;

/**
 * Croatian locale data.
 *
 * Based on CLDR data for Croatian (Croatia).
 */
declare const hr: Locale;

/**
 * Serbian locale data.
 *
 * Based on CLDR data for Serbian (Serbia, Cyrillic script).
 */
declare const sr: Locale;

export { ar, bg, cs, da, de, el, enAU, enCA, enGB, enUS, es, fi, fr, he, hi, hr, hu, id, it, ja, ko, ms, nb, nl, pl, pt, ptBR, ro, ru, sk, sr, sv, th, tr, uk, vi, zhCN, zhHK, zhTW };
