import { L as Locale } from '../types-YhpkQnbO.js';

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

export { enUS, ja };
