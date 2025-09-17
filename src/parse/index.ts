/**
 * Parse a date string according to a format pattern.
 *
 * Parses date strings using the same Unicode format tokens as the format() function.
 * Returns a new Date object on success, or an invalid Date (with NaN time) if parsing fails.
 * Supports localized parsing and uses a reference date for missing components.
 *
 * @param dateString - The date string to parse
 * @param pattern - The format pattern using Unicode tokens (e.g., "yyyy-MM-dd HH:mm:ss")
 * @param options - Optional parsing configuration
 * @param options.locale - Optional localization object for parsing locale-specific text
 * @param options.referenceDate - Reference date for missing components (defaults to current date)
 * @returns Parsed Date object, or invalid Date if parsing fails
 *
 * @example
 * ```typescript
 * // Basic parsing
 * parse("2024-01-15", "yyyy-MM-dd"); // Date(2024, 0, 15)
 * parse("15/01/2024 14:30", "dd/MM/yyyy HH:mm"); // Date(2024, 0, 15, 14, 30)
 *
 * // 12-hour format
 * parse("2:30 PM", "h:mm a"); // Uses current date, sets time to 14:30
 *
 * // With literals
 * parse("Year 2024, Month 01", "'Year' yyyy, 'Month' MM"); // Date(2024, 0, 1)
 *
 * // Using reference date for missing components
 * const refDate = new Date(2023, 5, 10); // June 10, 2023
 * parse("14:30", "HH:mm", { referenceDate: refDate }); // Date(2023, 5, 10, 14, 30)
 *
 * // Localized parsing
 * import { enUS } from "./i18n/en-US";
 * parse("January 15, 2024", "MMMM dd, yyyy", { locale: enUS });
 *
 * // Invalid parsing
 * parse("invalid", "yyyy-MM-dd"); // Invalid Date (isNaN(date.getTime()) === true)
 * ```
 *
 * @example Supported parse tokens (same as format):
 * - **Year**: y (variable), yy (2-digit), yyy (3-digit), yyyy (4-digit)
 * - **Month**: M (1-12), MM (01-12), MMM (Jan), MMMM (January)
 * - **Day**: d (1-31), dd (01-31)
 * - **Hour**: H (0-23), HH (00-23), h (1-12), hh (01-12)
 * - **Minute**: m (0-59), mm (00-59)
 * - **Second**: s (0-59), ss (00-59)
 * - **Millisecond**: S (0-9), SS (00-99), SSS (000-999)
 * - **Day Period**: a/aa/aaa (AM/PM)
 * - **Era**: G/GG/GGG (AD/BC), GGGG (Anno Domini/Before Christ)
 * - **Weekday**: E/EE/EEE (Mon), EEEE (Monday)
 * - **Day of Year**: D (1-366), DD (01-366), DDD (001-366)
 *
 * @throws Does not throw errors - returns invalid Date instead
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
      } else if (token === "''") {
        // Special case: double quote becomes single quote
        literalText = "'";
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