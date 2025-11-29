import { tokenize } from "../_lib/tokenize";
import { formatters } from "../_lib/formatters";
import { Locale } from "../types";

/**
 * Format a Date object according to a format pattern.
 *
 * This function converts Date objects to formatted strings using Unicode format tokens.
 * Supports the same token syntax as the parse() function for consistency. Includes support
 * for localized formatting of month names, weekdays, day periods, and eras.
 *
 * @param date - The Date object to format
 * @param pattern - The format pattern using Unicode tokens (e.g., "yyyy-MM-dd HH:mm:ss")
 * @param locale - Optional localization object for locale-specific formatting
 * @returns Formatted date string
 *
 * @example
 * ```typescript
 * const date = new Date(2024, 0, 15, 14, 30, 45, 123);
 *
 * // Basic date formatting
 * format(date, "yyyy-MM-dd"); // "2024-01-15"
 * format(date, "dd/MM/yyyy"); // "15/01/2024"
 *
 * // Date and time combined
 * format(date, "yyyy-MM-dd HH:mm:ss"); // "2024-01-15 14:30:45"
 * format(date, "dd/MM/yyyy HH:mm"); // "15/01/2024 14:30"
 *
 * // 12-hour format with AM/PM
 * format(date, "h:mm a"); // "2:30 PM"
 * format(date, "hh:mm:ss a"); // "02:30:45 PM"
 *
 * // With milliseconds
 * format(date, "HH:mm:ss.SSS"); // "14:30:45.123"
 *
 * // Year variations
 * format(date, "y"); // "2024"
 * format(date, "yy"); // "24"
 * format(date, "yyy"); // "024"
 * format(date, "yyyy"); // "2024"
 *
 * // Month variations
 * format(date, "M"); // "1"
 * format(date, "MM"); // "01"
 * format(date, "MMM"); // "Jan" (abbreviated)
 * format(date, "MMMM"); // "January" (full name)
 * format(date, "MMMMM"); // "J" (narrow)
 *
 * // Weekday formatting
 * format(date, "E"); // "Mon"
 * format(date, "EEE"); // "Mon"
 * format(date, "EEEE"); // "Monday"
 * format(date, "EEEEE"); // "M"
 *
 * // Day period variations
 * format(date, "h:mm a"); // "2:30 PM"
 * format(date, "h:mm aa"); // "2:30 PM"
 * format(date, "h:mm aaa"); // "2:30 PM"
 * format(date, "h:mm aaaa"); // "2:30 P.M."
 * format(date, "h:mm aaaaa"); // "2:30 p"
 *
 * // Era formatting
 * const bcDate = new Date(-100, 0, 1); // 101 BC
 * format(bcDate, "yyyy G"); // "0101 BC"
 * format(bcDate, "yyyy GGGG"); // "0101 Before Christ"
 * format(bcDate, "yyyy GGGGG"); // "0101 B"
 *
 * // Day of year
 * format(date, "DDD"); // "015" (15th day of year)
 *
 * // Literal text in pattern (enclosed in quotes)
 * format(date, "'Year' yyyy', Month' MM"); // "Year 2024, Month 01"
 *
 * // Escaped single quote in pattern
 * format(date, "'It''s' yyyy"); // "It's 2024"
 *
 * // Complex formatting
 * format(date, "EEEE, MMMM dd, yyyy 'at' h:mm a");
 * // "Monday, January 15, 2024 at 2:30 PM"
 *
 * // ISO 8601-like format
 * format(date, "yyyy-MM-dd'T'HH:mm:ss"); // "2024-01-15T14:30:45"
 *
 * // Localized formatting (English)
 * import { enUS } from "./i18n/en-US";
 * format(date, "MMMM dd, yyyy", enUS); // "January 15, 2024"
 *
 * // Localized formatting (Japanese)
 * import { ja } from "./i18n/ja";
 * format(date, "yyyy'年'M'月'd'日'", ja); // "2024年1月15日"
 * ```
 *
 * @remarks
 * **Supported Format Tokens:**
 * - **Year**: y (variable), yy (2-digit), yyy (3-digit), yyyy (4-digit)
 * - **Month**: M (1-12), MM (01-12), MMM (Jan/Feb/...), MMMM (January/February/...), MMMMM (J/F/M/...)
 * - **Day**: d (1-31), dd (01-31)
 * - **Hour**: H (0-23), HH (00-23), h (1-12), hh (01-12)
 * - **Minute**: m (0-59), mm (00-59)
 * - **Second**: s (0-59), ss (00-59)
 * - **Millisecond**: S (0-9), SS (00-99), SSS (000-999)
 * - **Day Period**: a/aa/aaa (AM/PM), aaaa (A.M./P.M.), aaaaa (a/p)
 * - **Era**: G/GG/GGG (AD/BC), GGGG (Anno Domini/Before Christ), GGGGG (A/B)
 * - **Weekday**: E/EE/EEE (Mon/Tue/...), EEEE (Monday/Tuesday/...), EEEEE (M/T/W/...)
 * - **Day of Year**: D (1-366), DD (01-366), DDD (001-366)
 *
 * **Formatting Behavior:**
 * - Literal text must be enclosed in single quotes ('text')
 * - Use '' (two single quotes) to represent a literal single quote character
 * - Tokens are case-sensitive (e.g., 'MM' vs 'mm')
 * - Leading zeros are added based on token length (e.g., 'MM' → '01', 'M' → '1')
 * - Invalid dates return the string "Invalid Date" (consistent with date-fns)
 * - All formatting uses the Date object's local timezone (as provided by JavaScript's Date API)
 * - No timezone conversion is performed; the formatted output reflects the Date object's timezone
 *
 * **Year Formatting:**
 * - yy: Last 2 digits of year (2024 → "24", 1999 → "99")
 * - yyy: Last 3 digits with zero padding (2024 → "024", 999 → "999")
 * - yyyy: Full year with zero padding to 4 digits (2024 → "2024", 99 → "0099")
 * - y: Variable length, no padding (2024 → "2024", 99 → "99")
 * - BC years are represented as positive after adjustment (100 BC formats as "0100" with yyyy)
 *
 * **12-Hour Format:**
 * - Use h/hh tokens for 12-hour display (1-12)
 * - Combine with day period token (a/aa/aaa/aaaa/aaaaa) to show AM/PM
 * - 00:00 displays as "12:00 AM" (midnight)
 * - 12:00 displays as "12:00 PM" (noon)
 * - 13:00 displays as "1:00 PM", etc.
 *
 * **Millisecond Formatting:**
 * - S: Displays 1 digit (123ms → "1", 500ms → "5")
 * - SS: Displays 2 digits (123ms → "12", 500ms → "50")
 * - SSS: Displays 3 digits (123ms → "123", 500ms → "500")
 *
 * **Day of Year Formatting:**
 * - Counts days from January 1st (1-indexed)
 * - Respects leap years (366 days vs 365 days)
 * - Example: February 1st → Day 32
 *
 * **Localization:**
 * - Provide locale object to format localized text (month/weekday names, day periods, eras)
 * - Without locale, falls back to English formatting
 * - Locale affects: MMM/MMMM/MMMMM, E/EE/EEE/EEEE/EEEEE, a/aa/aaa/aaaa/aaaaa, G/GG/GGG/GGGG/GGGGG
 *
 * **Common Patterns:**
 * - ISO 8601-like: "yyyy-MM-dd'T'HH:mm:ss" or "yyyy-MM-dd'T'HH:mm:ss.SSS"
 * - US format: "MM/dd/yyyy" or "M/d/yyyy h:mm a"
 * - European format: "dd/MM/yyyy" or "dd.MM.yyyy HH:mm"
 * - Japanese format: "yyyy'年'M'月'd'日'" or "yyyy/MM/dd"
 *
 * **Performance Considerations:**
 * - Pattern tokenization occurs on every call (no caching)
 * - Complex patterns with many tokens may be slower
 * - Localized formatting (with locale option) is slightly slower than English-only
 * - For formatting many dates with same pattern, consider reusing the pattern string
 *
 * **Relationship with parse():**
 * - format() and parse() use the same token syntax for consistency
 * - parse(format(date, pattern), pattern) should produce equivalent date (if pattern includes all components)
 * - Use format() to convert Date → string, parse() to convert string → Date
 */
export function format(date: Date, pattern: string, locale?: Locale): string {
  // Return "Invalid Date" for invalid dates (consistent with date-fns)
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const tokens = tokenize(pattern);
  let result = "";

  for (const token of tokens) {
    const handler = formatters[token[0]];
    if (handler) {
      result += handler(date, token, locale);
    } else {
      // Handle escaped quotes and literal text
      if (token === "''") {
        // Two consecutive quotes → single quote character
        result += "'";
      } else if (token.startsWith("'") && token.endsWith("'")) {
        // Literal text enclosed in quotes: remove outer quotes and unescape inner quotes
        result += token.slice(1, -1).replace(/''/g, "'");
      } else {
        // Other tokens (like punctuation) are added as-is
        result += token;
      }
    }
  }

  return result;
}
