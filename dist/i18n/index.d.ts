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

export { ar, de, enUS, es, fr, ja, ko, ptBR, ru, zhCN };
