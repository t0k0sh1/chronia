import type { Locale } from "../types";
import { enUS } from "../i18n/en-US";

/**
 * Default locale used when no locale is explicitly provided.
 *
 * American English (en-US) is selected as the default locale because it is:
 * - The primary language of the JavaScript ecosystem
 * - Widely understood globally
 * - A stable baseline for locale fallbacks in formatting and parsing operations
 *
 * **Fallback Behavior**:
 * This constant is used in locale resolution chains. When a function needs a locale
 * but none is specified, defaultLocale serves as the last fallback before attempting
 * language negotiation or accepting graceful defaults.
 *
 * **Future Locales**:
 * Other English variants (en-GB, en-AU, en-CA, etc.) may be supported in the future.
 * Users can explicitly select alternative English locales by importing and using them directly:
 *
 * ```typescript
 * // Import alternative English locale
 * import { enGB } from 'chronia/i18n/en-GB';
 *
 * // Use in formatting with specific locale
 * formatDate(date, pattern, { locale: enGB });
 * ```
 *
 * @constant
 * @type {Locale}
 *
 * @example
 * ```typescript
 * import { defaultLocale } from 'chronia/_lib/defaultLocale';
 *
 * // Access locale data for month names
 * const monthNames = defaultLocale.month.wide;
 * // ['January', 'February', ..., 'December']
 * ```
 *
 * @see {@link Locale} - Type definition for locale objects
 */
export const defaultLocale: Locale = enUS;
