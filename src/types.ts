/**
 * Width option for locale data formatting.
 *
 * Specifies the width/length of locale-specific strings:
 * - "narrow": Shortest possible representation (e.g., "M" for Monday, "Jan")
 * - "abbr": Abbreviated form (e.g., "Mon" for Monday, "Jan" for January)
 * - "wide": Full form (e.g., "Monday", "January")
 */
export type LocaleWidth = "narrow" | "abbr" | "wide";

/**
 * Data-driven locale structure for internationalization.
 *
 * Provides localized strings for date/time components indexed by value.
 * All data is stored as readonly arrays to ensure immutability and prevent
 * accidental modifications to locale data.
 *
 * The structure separates data (this type) from access logic, allowing:
 * - Improved readability: all locale data is visible in one place
 * - Better maintainability: data and logic are decoupled
 * - Enhanced extensibility: new locales can be added without modifying format/parse functions
 * - Type safety: invalid width specifications are caught at compile time
 */
export type Locale = {
  /**
   * Era names (BC/AD) indexed by era value.
   *
   * Arrays contain localized representations of eras:
   * - Index 0: Before Christ (BC) representation
   * - Index 1: Anno Domini (AD) representation
   *
   * Each width provides the appropriate verbosity level:
   * - "narrow": Shortest form (e.g., "B" for BC, "A" for AD)
   * - "abbr": Abbreviated form (e.g., "BC", "AD")
   * - "wide": Full form (e.g., "Before Christ", "Anno Domini")
   *
   * @example
   * ```typescript
   * const enUS: Locale = {
   *   era: {
   *     narrow: ["B", "A"],
   *     abbr: ["BC", "AD"],
   *     wide: ["Before Christ", "Anno Domini"],
   *   },
   *   // ...
   * };
   * ```
   */
  era: {
    /** Shortest era representation (2 elements: BC, AD) */
    narrow: readonly [string, string];
    /** Abbreviated era representation (2 elements: BC, AD) */
    abbr: readonly [string, string];
    /** Full era representation (2 elements: BC, AD) */
    wide: readonly [string, string];
  };

  /**
   * Month names indexed by month value (0-based).
   *
   * Arrays contain localized month names for each month:
   * - Index 0: January
   * - Index 1: February
   * - ... through ...
   * - Index 11: December
   *
   * Each width provides the appropriate verbosity level:
   * - "narrow": Shortest form (e.g., "J" for January, "F" for February)
   * - "abbr": Abbreviated form (e.g., "Jan", "Feb")
   * - "wide": Full form (e.g., "January", "February")
   *
   * @example
   * ```typescript
   * const enUS: Locale = {
   *   month: {
   *     narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
   *     abbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
   *     wide: ["January", "February", ..., "December"],
   *   },
   *   // ...
   * };
   * ```
   */
  month: {
    /** Shortest month representation (12 elements: Jan-Dec) */
    narrow: readonly string[];
    /** Abbreviated month representation (12 elements: Jan-Dec) */
    abbr: readonly string[];
    /** Full month representation (12 elements: Jan-Dec) */
    wide: readonly string[];
  };

  /**
   * Weekday names indexed by weekday value (0-based, Sunday first).
   *
   * Arrays contain localized weekday names for each day:
   * - Index 0: Sunday
   * - Index 1: Monday
   * - ... through ...
   * - Index 6: Saturday
   *
   * Each width provides the appropriate verbosity level:
   * - "narrow": Shortest form (e.g., "S" for Sunday, "M" for Monday)
   * - "abbr": Abbreviated form (e.g., "Sun", "Mon")
   * - "wide": Full form (e.g., "Sunday", "Monday")
   *
   * @example
   * ```typescript
   * const enUS: Locale = {
   *   weekday: {
   *     narrow: ["S", "M", "T", "W", "T", "F", "S"],
   *     abbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
   *     wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
   *   },
   *   // ...
   * };
   * ```
   */
  weekday: {
    /** Shortest weekday representation (7 elements: Sun-Sat) */
    narrow: readonly string[];
    /** Abbreviated weekday representation (7 elements: Sun-Sat) */
    abbr: readonly string[];
    /** Full weekday representation (7 elements: Sun-Sat) */
    wide: readonly string[];
  };

  /**
   * Day period names (AM/PM) indexed by period value.
   *
   * Arrays contain localized representations of day periods:
   * - Index 0: Morning/Ante Meridiem (AM)
   * - Index 1: Afternoon/Evening/Post Meridiem (PM)
   *
   * Each width provides the appropriate verbosity level:
   * - "narrow": Shortest form (e.g., "a" for AM, "p" for PM)
   * - "abbr": Abbreviated form (e.g., "AM", "PM")
   * - "wide": Full form (e.g., "AM (morning)", "PM (afternoon)")
   *
   * @example
   * ```typescript
   * const enUS: Locale = {
   *   dayPeriod: {
   *     narrow: ["a", "p"],
   *     abbr: ["AM", "PM"],
   *     wide: ["AM (morning)", "PM (afternoon)"],
   *   },
   *   // ...
   * };
   * ```
   */
  dayPeriod: {
    /** Shortest day period representation (2 elements: AM, PM) */
    narrow: readonly [string, string];
    /** Abbreviated day period representation (2 elements: AM, PM) */
    abbr: readonly [string, string];
    /** Full day period representation (2 elements: AM, PM) */
    wide: readonly [string, string];
  };
};

/**
 * Token formatter function for date formatting.
 *
 * Processes a specific format token (e.g., "yyyy", "MM", "dd") and returns
 * the corresponding formatted string for the given date.
 *
 * @param date - The date to format
 * @param token - The format token to process
 * @param locale - Optional localization object for locale-specific formatting
 * @returns Formatted string representation of the date component
 */
export type Formatter = (
  date: Date,
  token: string,
  locale?: Locale,
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
  _initialDay: number; // Track initial day value to detect explicit day parsing
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
 * @param locale - Optional localization object for parsing localized text
 * @param dateComponents - Date components being built
 * @returns ParseResult with new position, or null if parsing fails
 */
export type Parser = (
  input: string,
  position: number,
  token: string,
  locale: Locale | undefined,
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

/**
 * Date interval with optional start and end boundaries.
 *
 * Used in date range operations to define a time interval with optional boundaries.
 * Either boundary can be null to indicate an open interval in that direction.
 *
 * - start: The start boundary of the interval (null means no lower bound)
 * - end: The end boundary of the interval (null means no upper bound)
 */
export type Interval = {
  /**
   * The start boundary of the interval.
   * If null, the interval has no lower bound (extends to MIN_DATE).
   */
  start: Date | number | null;
  /**
   * The end boundary of the interval.
   * If null, the interval has no upper bound (extends to MAX_DATE).
   */
  end: Date | number | null;
};

/**
 * Mathematical interval notation for boundary inclusion/exclusion.
 * - "()" : Both boundaries excluded (open interval)
 * - "[]" : Both boundaries included (closed interval)
 * - "[)" : Start included, end excluded (left-closed, right-open)
 * - "(]" : Start excluded, end included (left-open, right-closed)
 */
export type BoundsType = "()" | "[]" | "[)" | "(]";

/**
 * Configuration options for the isBetween function.
 * Controls how boundary dates are treated in the comparison.
 */
export type BetweenOption = {
  /**
   * Specifies boundary inclusion using mathematical interval notation.
   * Defaults to "()" for backward compatibility.
   *
   * @default "()"
   */
  bounds?: BoundsType;
};

/**
 * Options for configuring the compare() function behavior.
 */
export interface CompareOptions {
  /**
   * Sort order for comparison results.
   * @default "ASC"
   */
  order?: "ASC" | "DESC";
}

/**
 * Options for configuring date comparison functions with unit granularity.
 */
export type ComparisonOptions = {
  /**
   * The unit of comparison (year, month, day, hour, minute, second, millisecond).
   * @default "millisecond"
   */
  unit?: TimeUnit;
};