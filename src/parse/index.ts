/**
 * Parse a date string according to a format pattern.
 *
 * This function parses date strings using the same Unicode format tokens as the format() function.
 * Returns a new Date object on success, or an invalid Date (with NaN time) if parsing fails.
 * Supports localized parsing and uses a reference date for missing date components.
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
 * // Returns: Date(2024, 0, 15)
 *
 * // Date and time combined
 * const date2 = parse("15/01/2024 14:30", "dd/MM/yyyy HH:mm");
 * // Returns: Date(2024, 0, 15, 14, 30)
 *
 * // 12-hour format with AM/PM
 * const date3 = parse("2:30 PM", "h:mm a");
 * // Returns: Date with current date, time set to 14:30
 *
 * // Literal text in pattern (enclosed in quotes)
 * const date4 = parse("Year 2024, Month 01", "'Year' yyyy', Month' MM");
 * // Returns: Date(2024, 0, 1)
 *
 * // Using reference date for missing components
 * const refDate = new Date(2023, 5, 10); // June 10, 2023
 * const date5 = parse("14:30", "HH:mm", { referenceDate: refDate });
 * // Returns: Date(2023, 5, 10, 14, 30)
 *
 * // Localized month names
 * import { enUS } from "./i18n/en-US";
 * const date6 = parse("January 15, 2024", "MMMM dd, yyyy", { locale: enUS });
 * // Returns: Date(2024, 0, 15)
 *
 * // Invalid input returns Invalid Date
 * const invalid = parse("invalid-text", "yyyy-MM-dd");
 * // Returns: Invalid Date (isNaN(invalid.getTime()) === true)
 * ```
 *
 * @remarks
 * **Supported Parse Tokens:**
 * - **Year**: y (variable), yy (2-digit, 50-99→19XX, 00-49→20XX), yyy (3-digit), yyyy (4-digit)
 * - **Month**: M (1-12), MM (01-12), MMM (Jan/Feb/...), MMMM (January/February/...)
 * - **Day**: d (1-31), dd (01-31)
 * - **Hour**: H (0-23), HH (00-23), h (1-12), hh (01-12)
 * - **Minute**: m (0-59), mm (00-59)
 * - **Second**: s (0-59), ss (00-59)
 * - **Millisecond**: S (0-9, ×100), SS (00-99, ×10), SSS (000-999)
 * - **Day Period**: a/aa/aaa (AM/PM, case-insensitive)
 * - **Era**: G/GG/GGG (AD/BC), GGGG (Anno Domini/Before Christ)
 * - **Weekday**: E/EE/EEE (Mon/Tue/...), EEEE (Monday/Tuesday/...), EEEEE (M/T/...)
 * - **Day of Year**: D (1-366), DD (01-366), DDD (001-366)
 *
 * **Parsing Behavior:**
 * - Missing date components use reference date values (or current date if not specified)
 * - Time components default to 00:00:00.000 when not specified in pattern
 * - Literal text must be enclosed in single quotes ('text')
 * - Use '' to represent a literal single quote character
 * - Pattern must match input exactly (including delimiters and spacing)
 * - Returns Invalid Date for: mismatched pattern, invalid values, extra/missing characters
 * - No exceptions thrown - always returns a Date object (valid or invalid)
 * - Locale option enables parsing of localized month names, weekdays, and day periods
 *
 * **Year Parsing:**
 * - yy: Two-digit year (50-99 → 1950-1999, 00-49 → 2000-2049)
 * - yyyy: Accepts 1-4 digits (supports years like "1 AD" or "999")
 * - y: Variable length, parses all consecutive digits
 * - Supports years 0-99 via setFullYear (avoids JavaScript's automatic 1900 offset)
 *
 * **12-Hour Format:**
 * - Requires both hour token (h/hh) and day period token (a/aa/aaa)
 * - 12 AM converts to 00:00 (midnight)
 * - 12 PM remains 12:00 (noon)
 * - 1-11 AM remains 1-11 hours
 * - 1-11 PM converts to 13-23 hours
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

  // Validate the date
  if (isNaN(date.getTime())) {
    return new Date(NaN);
  }

  return date;
}