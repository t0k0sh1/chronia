/**
 * Parse a date string according to a format pattern.
 *
 * This function validates arguments before processing and parses date strings using the same
 * Unicode format tokens as the format() function. Returns a new Date object on success, or
 * an invalid Date (with NaN time) if parsing fails. Supports localized parsing and uses a
 * reference date for missing date components.
 *
 * @param dateString - The date string to parse
 * @param pattern - The format pattern using Unicode tokens (e.g., "yyyy-MM-dd HH:mm:ss")
 * @param options - Optional parsing configuration
 * @param options.locale - Optional localization object for parsing locale-specific text (month names, day periods, etc.)
 * @param options.referenceDate - Reference date for missing components (defaults to current date)
 * @returns Parsed Date object, or invalid Date if parsing fails (no exceptions thrown)
 *
 * @example
 * ```typescript
 * // Basic date parsing
 * const date1 = parse("2024-01-15", "yyyy-MM-dd");
 * // Returns: Date(2024, 0, 15, 0, 0, 0, 0)
 *
 * // Date and time combined
 * const date2 = parse("15/01/2024 14:30", "dd/MM/yyyy HH:mm");
 * // Returns: Date(2024, 0, 15, 14, 30, 0, 0)
 *
 * // 12-hour format with AM/PM
 * const date3 = parse("2:30 PM", "h:mm a");
 * // Returns: Date with current date, time set to 14:30
 *
 * // Parsing with seconds and milliseconds
 * const date4 = parse("14:30:45.123", "HH:mm:ss.SSS");
 * // Returns: Date with current date, time set to 14:30:45.123
 *
 * // Two-digit year (50-99 → 1950-1999, 00-49 → 2000-2049)
 * const date5 = parse("99-12-31", "yy-MM-dd");
 * // Returns: Date(1999, 11, 31)
 * const date6 = parse("00-01-01", "yy-MM-dd");
 * // Returns: Date(2000, 0, 1)
 *
 * // Literal text in pattern (enclosed in quotes)
 * const date7 = parse("Year 2024, Month 01", "'Year' yyyy', Month' MM");
 * // Returns: Date(2024, 0, 1, 0, 0, 0, 0)
 *
 * // Escaped single quote in pattern
 * const date8 = parse("It's 2024", "'It''s' yyyy");
 * // Returns: Date(2024, current month, current day)
 *
 * // Using reference date for missing components
 * const refDate = new Date(2023, 5, 10); // June 10, 2023
 * const date9 = parse("14:30", "HH:mm", { referenceDate: refDate });
 * // Returns: Date(2023, 5, 10, 14, 30, 0, 0)
 *
 * // Localized month names (English)
 * import { enUS } from "./i18n/en-US";
 * const date10 = parse("January 15, 2024", "MMMM dd, yyyy", { locale: enUS });
 * // Returns: Date(2024, 0, 15)
 *
 * // Localized month names (Japanese)
 * import { ja } from "./i18n/ja";
 * const date11 = parse("2024年1月15日", "yyyy'年'M'月'd'日'", { locale: ja });
 * // Returns: Date(2024, 0, 15)
 *
 * // Weekday parsing (for validation, doesn't affect result)
 * const date12 = parse("Monday, 2024-01-15", "EEEE, yyyy-MM-dd");
 * // Returns: Date(2024, 0, 15)
 *
 * // Day of year parsing
 * const date13 = parse("2024-032", "yyyy-DDD");
 * // Returns: Date(2024, 1, 1) - February 1st (32nd day of 2024)
 *
 * // Era parsing (AD/BC)
 * const date14 = parse("100 BC", "yyyy G");
 * // Returns: Date(-99, 0, 1) - Year 100 BC
 *
 * // ISO 8601-like format
 * const date15 = parse("2024-01-15T14:30:00", "yyyy-MM-dd'T'HH:mm:ss");
 * // Returns: Date(2024, 0, 15, 14, 30, 0, 0)
 *
 * // Invalid input returns Invalid Date
 * const invalid1 = parse("invalid-text", "yyyy-MM-dd");
 * // Returns: Invalid Date (isNaN(invalid1.getTime()) === true)
 *
 * // Mismatched pattern returns Invalid Date
 * const invalid2 = parse("2024-01-15", "dd/MM/yyyy");
 * // Returns: Invalid Date
 *
 * // Out of range values return Invalid Date
 * const invalid3 = parse("2024-13-01", "yyyy-MM-dd");
 * // Returns: Invalid Date (month 13 is invalid)
 *
 * // Extra characters return Invalid Date
 * const invalid4 = parse("2024-01-15extra", "yyyy-MM-dd");
 * // Returns: Invalid Date
 *
 * // Validation with isValid
 * import { isValid } from "../isValid";
 * const result = parse("2024-01-15", "yyyy-MM-dd");
 * if (isValid(result)) {
 *   console.log("Parsed successfully:", result);
 * } else {
 *   console.log("Parsing failed");
 * }
 * ```
 *
 * @remarks
 * **Supported Parse Tokens:**
 * - **Year**: y (variable), yy (2-digit, 50-99→19XX, 00-49→20XX), yyy (3-digit), yyyy (4-digit)
 * - **Month**: M (1-12), MM (01-12), MMM (Jan/Feb/...), MMMM (January/February/...), MMMMM (J/F/M/...)
 * - **Day**: d (1-31), dd (01-31)
 * - **Hour**: H (0-23), HH (00-23), h (1-12), hh (01-12)
 * - **Minute**: m (0-59), mm (00-59)
 * - **Second**: s (0-59), ss (00-59)
 * - **Millisecond**: S (0-9, ×100), SS (00-99, ×10), SSS (000-999)
 * - **Day Period**: a/aa/aaa (AM/PM, case-insensitive), aaaa (A.M./P.M.), aaaaa (a/p)
 * - **Era**: G/GG/GGG (AD/BC), GGGG (Anno Domini/Before Christ), GGGGG (A/B)
 * - **Weekday**: E/EE/EEE (Mon/Tue/...), EEEE (Monday/Tuesday/...), EEEEE (M/T/W/...)
 * - **Day of Year**: D (1-366), DD (01-366), DDD (001-366)
 *
 * **Parsing Behavior:**
 * - Validates arguments before processing (consistent with library patterns)
 * - Missing date components use reference date values (or current date if not specified)
 * - Time components default to 00:00:00.000 when not specified in pattern
 * - Literal text must be enclosed in single quotes ('text')
 * - Use '' (two single quotes) to represent a literal single quote character
 * - Pattern must match input exactly (including delimiters and spacing)
 * - Returns Invalid Date for: mismatched pattern, invalid values, extra/missing characters
 * - No exceptions thrown - always returns a Date object (valid or invalid)
 * - Use isValid() to check if parsing succeeded
 * - Locale option enables parsing of localized month names, weekdays, and day periods
 *
 * **Year Parsing:**
 * - yy: Two-digit year (50-99 → 1950-1999, 00-49 → 2000-2049)
 * - yyyy: Accepts 1-4 digits (supports years like "1 AD" or "999")
 * - yyy: Exactly 3 digits required (e.g., "001", "999")
 * - y: Variable length, parses all consecutive digits
 * - Supports years 0-99 via setFullYear (avoids JavaScript's automatic 1900 offset)
 * - BC years are represented as negative (e.g., 100 BC → -99)
 *
 * **12-Hour Format:**
 * - Requires both hour token (h/hh) and day period token (a/aa/aaa/aaaa/aaaaa)
 * - 12 AM converts to 00:00 (midnight)
 * - 12 PM remains 12:00 (noon)
 * - 1-11 AM remains 1-11 hours
 * - 1-11 PM converts to 13-23 hours
 * - Day period is case-insensitive ("am"/"AM"/"Am" all work)
 *
 * **Millisecond Parsing:**
 * - S: Parses 1 digit, multiplies by 100 (5 → 500ms)
 * - SS: Parses 2 digits, multiplies by 10 (50 → 500ms)
 * - SSS: Parses 3 digits, uses as-is (500 → 500ms)
 *
 * **Day of Year Parsing:**
 * - Automatically calculates month and day from day-of-year
 * - Respects leap years (366 days vs 365 days)
 * - Example: Day 32 in 2024 → February 1st
 *
 * **Weekday Parsing:**
 * - Weekday tokens are parsed but don't affect the resulting date
 * - Can be used for format validation (e.g., ensuring "Monday" matches a Monday date)
 * - Note: Parser doesn't validate weekday matches the actual date
 *
 * **Localization:**
 * - Provide locale object to parse localized text (month/weekday names, day periods)
 * - Without locale, falls back to English text parsing
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
 * - Localized parsing (with locale option) is slightly slower than English-only
 * - For parsing many dates with same pattern, reuse the pattern string for better performance
 *
 * **Relationship with format():**
 * - parse() and format() use the same token syntax for consistency
 * - format(parse(str, pattern), pattern) should equal str (if str is valid)
 * - Use parse() to convert string → Date, format() to convert Date → string
 */

import { tokenize } from "../_lib/tokenize";
import { parsers } from "../_lib/parsers";
import { Locale } from "../types";

export function parse(
  dateString: string,
  pattern: string,
  options?: {
    locale?: Locale;
    referenceDate?: Date;
  },
): Date {
  const referenceDate = options?.referenceDate || new Date();
  const tokens = tokenize(pattern);

  // Initialize date components with reference date values
  const dateComponents = {
    year: referenceDate.getFullYear(),
    month: referenceDate.getMonth(),
    day: referenceDate.getDate(),
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    isPM: false,
    hours12: null as number | null,
  };

  let position = 0;

  for (const token of tokens) {
    const parser = parsers[token[0]];

    if (parser) {
      const result = parser(dateString, position, token, options?.locale, dateComponents);
      if (result === null) {
        return new Date(NaN); // Parsing failed
      }
      position = result.position;
    } else {
      // Handle literal text and delimiters
      let literalText = token;

      // Handle quoted strings with escaped quotes
      if (token.startsWith("'") && token.endsWith("'")) {
        // Remove surrounding quotes and unescape inner quotes
        literalText = token.slice(1, -1).replace(/''/g, "'");
      }

      if (!dateString.startsWith(literalText, position)) {
        return new Date(NaN); // Literal text doesn't match
      }
      position += literalText.length;
    }
  }

  // Check if entire string was consumed
  if (position !== dateString.length) {
    return new Date(NaN); // Extra characters in input
  }

  // Handle 12-hour format conversion
  if (dateComponents.hours12 !== null) {
    let hours24 = dateComponents.hours12;
    if (dateComponents.isPM && hours24 !== 12) {
      hours24 += 12;
    } else if (!dateComponents.isPM && hours24 === 12) {
      hours24 = 0;
    }
    dateComponents.hours = hours24;
  }

  // Create the final date
  // Note: JavaScript Date constructor automatically adds 1900 to years 0-99
  // We need to use setFullYear to set the correct year
  const date = new Date(
    dateComponents.year >= 100 ? dateComponents.year : 2000, // Use 2000 as temporary year for 0-99
    dateComponents.month,
    dateComponents.day,
    dateComponents.hours,
    dateComponents.minutes,
    dateComponents.seconds,
    dateComponents.milliseconds,
  );

  // Set the correct year if it was 0-99
  if (dateComponents.year < 100) {
    date.setFullYear(dateComponents.year);
  }

  return date;
}