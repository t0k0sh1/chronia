import { Locale, LocaleWidth } from "../types";
import { defaultLocale } from "./defaultLocale";

/**
 * Get month name from locale data.
 *
 * Retrieves the localized name of a specific month from the provided locale,
 * with automatic fallback to the default locale (en-US) if the locale is undefined.
 *
 * @param locale - The locale object containing localized month names, or undefined
 *                 to use the default locale (en-US)
 * @param month - The month index (0-11, where 0 is January and 11 is December)
 * @param width - The formatting width for the month name:
 *               - "narrow": Shortest form (e.g., "J" for January)
 *               - "abbr": Abbreviated form (e.g., "Jan") - default
 *               - "wide": Full form (e.g., "January")
 *
 * @returns The localized month name string in the specified format
 *
 * @example
 * ```typescript
 * import { getMonthName } from "./localeHelpers";
 * import { enUS } from "../i18n/en-US";
 *
 * // With explicit locale
 * getMonthName(enUS, 0, "abbr");   // Returns: "Jan"
 * getMonthName(enUS, 0, "wide");   // Returns: "January"
 * getMonthName(enUS, 0, "narrow"); // Returns: "J"
 *
 * // With undefined locale (uses default en-US)
 * getMonthName(undefined, 0, "abbr");   // Returns: "Jan"
 * ```
 *
 * @precondition
 * - month must be within range [0, 11]
 * - The provided locale (if not undefined) must be a valid Locale object
 * - width must be one of "narrow", "abbr", or "wide" (enforced by TypeScript)
 *
 * @postcondition
 * - Returns a non-empty string from the locale's month data
 * - If locale is undefined, uses defaultLocale automatically
 *
 * @invariant
 * - Always returns a valid string from the locale's month[width] array
 * - The default locale always contains valid month data
 */
export function getMonthName(
  locale: Locale | undefined,
  month: number,
  width: LocaleWidth = "abbr"
): string {
  const targetLocale = locale || defaultLocale;
  return targetLocale.month[width][month];
}

/**
 * Get weekday name from locale data.
 *
 * Retrieves the localized name of a specific weekday from the provided locale,
 * with automatic fallback to the default locale (en-US) if the locale is undefined.
 *
 * @param locale - The locale object containing localized weekday names, or undefined
 *                 to use the default locale (en-US)
 * @param weekday - The weekday index (0-6, where 0 is Sunday and 6 is Saturday)
 * @param width - The formatting width for the weekday name:
 *               - "narrow": Shortest form (e.g., "S" for Sunday)
 *               - "abbr": Abbreviated form (e.g., "Sun") - default
 *               - "wide": Full form (e.g., "Sunday")
 *
 * @returns The localized weekday name string in the specified format
 *
 * @example
 * ```typescript
 * import { getWeekdayName } from "./localeHelpers";
 * import { enUS } from "../i18n/en-US";
 *
 * // With explicit locale
 * getWeekdayName(enUS, 0, "abbr");   // Returns: "Sun"
 * getWeekdayName(enUS, 0, "wide");   // Returns: "Sunday"
 * getWeekdayName(enUS, 0, "narrow"); // Returns: "S"
 *
 * // With undefined locale (uses default en-US)
 * getWeekdayName(undefined, 0, "abbr");   // Returns: "Sun"
 * ```
 *
 * @precondition
 * - weekday must be within range [0, 6]
 * - The provided locale (if not undefined) must be a valid Locale object
 * - width must be one of "narrow", "abbr", or "wide" (enforced by TypeScript)
 *
 * @postcondition
 * - Returns a non-empty string from the locale's weekday data
 * - If locale is undefined, uses defaultLocale automatically
 *
 * @invariant
 * - Always returns a valid string from the locale's weekday[width] array
 * - The default locale always contains valid weekday data
 */
export function getWeekdayName(
  locale: Locale | undefined,
  weekday: number,
  width: LocaleWidth = "abbr"
): string {
  const targetLocale = locale || defaultLocale;
  return targetLocale.weekday[width][weekday];
}

/**
 * Get era name from locale data.
 *
 * Retrieves the localized name of a specific era (BC or AD) from the provided locale,
 * with automatic fallback to the default locale (en-US) if the locale is undefined.
 *
 * @param locale - The locale object containing localized era names, or undefined
 *                 to use the default locale (en-US)
 * @param era - The era value (0 = Before Christ/BC, 1 = Anno Domini/AD)
 * @param width - The formatting width for the era name:
 *               - "narrow": Shortest form (e.g., "B" for BC, "A" for AD)
 *               - "abbr": Abbreviated form (e.g., "BC", "AD") - default
 *               - "wide": Full form (e.g., "Before Christ", "Anno Domini")
 *
 * @returns The localized era name string in the specified format
 *
 * @example
 * ```typescript
 * import { getEraName } from "./localeHelpers";
 * import { enUS } from "../i18n/en-US";
 *
 * // With explicit locale
 * getEraName(enUS, 0, "abbr");   // Returns: "BC"
 * getEraName(enUS, 1, "abbr");   // Returns: "AD"
 * getEraName(enUS, 1, "wide");   // Returns: "Anno Domini"
 *
 * // With undefined locale (uses default en-US)
 * getEraName(undefined, 0, "abbr");   // Returns: "BC"
 * ```
 *
 * @precondition
 * - era must be either 0 (BC) or 1 (AD) - enforced by TypeScript union type
 * - The provided locale (if not undefined) must be a valid Locale object
 * - width must be one of "narrow", "abbr", or "wide" (enforced by TypeScript)
 *
 * @postcondition
 * - Returns a non-empty string from the locale's era data
 * - If locale is undefined, uses defaultLocale automatically
 *
 * @invariant
 * - Always returns a valid string from the locale's era[width] array (2 elements)
 * - The default locale always contains valid era data
 * - Era values are strictly constrained to 0 | 1
 */
export function getEraName(
  locale: Locale | undefined,
  era: 0 | 1,
  width: LocaleWidth = "abbr"
): string {
  const targetLocale = locale || defaultLocale;
  return targetLocale.era[width][era];
}

/**
 * Get day period name from locale data.
 *
 * Retrieves the localized name of a day period (AM or PM) from the provided locale,
 * with automatic fallback to the default locale (en-US) if the locale is undefined.
 *
 * @param locale - The locale object containing localized day period names, or undefined
 *                 to use the default locale (en-US)
 * @param period - The day period value ("am" for morning, "pm" for afternoon/evening)
 * @param width - The formatting width for the day period name:
 *               - "narrow": Shortest form (e.g., "a" for AM, "p" for PM)
 *               - "abbr": Abbreviated form (e.g., "AM", "PM") - default
 *               - "wide": Full form (e.g., "AM (morning)", "PM (afternoon)")
 *
 * @returns The localized day period name string in the specified format
 *
 * @example
 * ```typescript
 * import { getDayPeriod } from "./localeHelpers";
 * import { enUS } from "../i18n/en-US";
 *
 * // With explicit locale
 * getDayPeriod(enUS, "am", "abbr");   // Returns: "AM"
 * getDayPeriod(enUS, "pm", "abbr");   // Returns: "PM"
 * getDayPeriod(enUS, "am", "wide");   // Returns: "AM (morning)"
 *
 * // With undefined locale (uses default en-US)
 * getDayPeriod(undefined, "am", "abbr");   // Returns: "AM"
 * ```
 *
 * @precondition
 * - period must be either "am" or "pm" - enforced by TypeScript union type
 * - The provided locale (if not undefined) must be a valid Locale object
 * - width must be one of "narrow", "abbr", or "wide" (enforced by TypeScript)
 *
 * @postcondition
 * - Returns a non-empty string from the locale's dayPeriod data
 * - If locale is undefined, uses defaultLocale automatically
 * - The period value is converted to array index (0 for "am", 1 for "pm") internally
 *
 * @invariant
 * - Always returns a valid string from the locale's dayPeriod[width] array (2 elements)
 * - The default locale always contains valid day period data
 * - Period values are strictly constrained to "am" | "pm"
 * - Array indexing is consistent: 0 = am, 1 = pm
 */
export function getDayPeriod(
  locale: Locale | undefined,
  period: "am" | "pm",
  width: LocaleWidth = "abbr"
): string {
  const targetLocale = locale || defaultLocale;
  const periodIndex = period === "am" ? 0 : 1;
  return targetLocale.dayPeriod[width][periodIndex];
}
