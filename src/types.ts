/**
 * Localization interface for formatting date/time components.
 *
 * Provides methods to localize various date/time components based on locale-specific formats.
 * Each method accepts an optional width parameter to control the output format:
 * - "narrow": Shortest possible representation (e.g., "M" for Monday)
 * - "abbreviated": Short form (e.g., "Mon" for Monday)
 * - "wide": Full form (e.g., "Monday")
 */
export type Localize = {
  /**
   * Format era (BC/AD).
   *
   * @param era - 0 for BC (Before Christ), 1 for AD (Anno Domini)
   * @param options.width - Format width: "narrow", "abbreviated", or "wide"
   * @returns Localized era string
   */
  era: (
    era: 0 | 1,
    options?: { width: "narrow" | "abbreviated" | "wide" },
  ) => string;
  /**
   * Format month name.
   *
   * @param month - Month index (0-11, where 0 is January)
   * @param options.width - Format width: "narrow", "abbreviated", or "wide"
   * @returns Localized month name
   */
  month: (
    month: number,
    options?: { width: "narrow" | "abbreviated" | "wide" },
  ) => string;
  /**
   * Format weekday name.
   *
   * @param weekday - Weekday index (0-6, where 0 is Sunday)
   * @param options.width - Format width: "narrow", "abbreviated", or "wide"
   * @returns Localized weekday name
   */
  weekday: (
    weekday: number,
    options?: { width: "narrow" | "abbreviated" | "wide" },
  ) => string;
  /**
   * Format day period (AM/PM).
   *
   * @param period - "am" for morning, "pm" for afternoon/evening
   * @param options.width - Format width: "narrow", "abbreviated", or "wide"
   * @returns Localized day period string
   */
  dayPeriod: (
    period: "am" | "pm",
    options?: { width: "narrow" | "abbreviated" | "wide" },
  ) => string;
};

/**
 * Token formatter function for date formatting.
 *
 * Processes a specific format token (e.g., "yyyy", "MM", "dd") and returns
 * the corresponding formatted string for the given date.
 *
 * @param date - The date to format
 * @param token - The format token to process
 * @param localize - Optional localization object for locale-specific formatting
 * @returns Formatted string representation of the date component
 */
export type Formatter = (
  date: Date,
  token: string,
  localize?: Localize,
) => string;

/**
 * Parser result containing the new position and any parsed data.
 */
export type ParseResult = {
  position: number;
} | null;

/**
 * Date components being built during parsing.
 */
export type DateComponents = {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  isPM: boolean;
  hours12: number | null;
};

/**
 * Token parser function for date parsing.
 *
 * Parses a specific format token from the input string and updates
 * the date components accordingly.
 *
 * @param input - The input string being parsed
 * @param position - Current position in the input string
 * @param token - The format token to parse
 * @param localize - Optional localization object for parsing localized text
 * @param dateComponents - Date components being built
 * @returns ParseResult with new position, or null if parsing fails
 */
export type Parser = (
  input: string,
  position: number,
  token: string,
  localize: Localize | undefined,
  dateComponents: DateComponents,
) => ParseResult;

/**
 * Time unit for date/time operations.
 *
 * Used in various date manipulation and comparison functions to specify
 * the granularity of the operation.
 *
 * - "year": Year level operations
 * - "month": Month level operations
 * - "day": Day level operations
 * - "hour": Hour level operations
 * - "minute": Minute level operations
 * - "second": Second level operations
 * - "millisecond": Millisecond level operations
 */
export type TimeUnit =
  | "year"
  | "month"
  | "day"
  | "hour"
  | "minute"
  | "second"
  | "millisecond";