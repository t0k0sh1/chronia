import { tokenize } from "../_lib/tokenize";
import { formatters } from "../_lib/formatters";
import { Locale } from "../types";

/**
 * Format a Date object according to a format pattern.
 *
 * Supports Unicode format patterns with various tokens for year, month, day,
 * hour, minute, second, millisecond, era, and weekday formatting.
 * Includes support for localized formatting via optional Locale parameter.
 *
 * @param date - The Date object to format
 * @param pattern - The format pattern using Unicode tokens (e.g., "yyyy-MM-dd HH:mm:ss")
 * @param locale - Optional localization object for locale-specific formatting
 * @returns Formatted date string
 *
 * @example
 * ```typescript
 * const date = new Date(2024, 0, 15, 14, 30, 0);
 *
 * // Basic formatting
 * format(date, "yyyy-MM-dd"); // "2024-01-15"
 * format(date, "dd/MM/yyyy HH:mm"); // "15/01/2024 14:30"
 *
 * // With literals
 * format(date, "'Today is' EEEE, MMMM do"); // "Today is Monday, January 15th"
 *
 * // 12-hour format
 * format(date, "h:mm a"); // "2:30 PM"
 * ```
 *
 * @example Format tokens:
 * - **Year**: y (1), yy (01), yyyy (2024)
 * - **Month**: M (1), MM (01), MMM (Jan), MMMM (January)
 * - **Day**: d (1), dd (01)
 * - **Hour**: H (0-23), HH (00-23), h (1-12), hh (01-12)
 * - **Minute**: m (0), mm (00)
 * - **Second**: s (0), ss (00)
 * - **Millisecond**: S (1), SS (12), SSS (123)
 * - **Day Period**: a (AM/PM), aa (AM/PM), aaa (AM/PM)
 * - **Era**: G (AD), GG (AD), GGG (AD), GGGG (Anno Domini)
 * - **Weekday**: E/EE/EEE (Mon), EEEE (Monday)
 * - **Day of Year**: D (1), DD (01), DDD (001)
 */
export function format(date: Date, pattern: string, locale?: Locale): string {
  const tokens = tokenize(pattern);
  let result = "";

  for (const token of tokens) {
    const handler = formatters[token[0]];
    if (handler) {
      result += handler(date, token, locale);
    } else {
      result += token.replace(/''/g, "'").replace(/^'|'$/g, "");
    }
  }

  return result;
}
