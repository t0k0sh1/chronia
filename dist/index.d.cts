/**
 * Add the specified number of days to the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified number of days added.
 * - If the input date or amount is invalid, returns `Invalid Date`.
 * - Fractions in `amount` are truncated (e.g., 1.9 → 1, -1.9 → -1).
 *
 * @param date - The original date or timestamp.
 * @param amount - The number of days to add (fractions are truncated).
 * @returns A new `Date` object with the days added, or `Invalid Date` if input is invalid.
 */
declare function addDays(date: Date | number, amount: number): Date;

/**
 * Add the specified number of hours to the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified number of hours added.
 * - If the input date or amount is invalid, returns `Invalid Date`.
 * - Fractions in `amount` are truncated (e.g., 1.9 → 1, -1.9 → -1).
 *
 * @param date - The original date or timestamp.
 * @param amount - The number of hours to add (fractions are truncated).
 * @returns A new `Date` object with the hours added, or `Invalid Date` if input is invalid.
 */
declare function addHours(date: Date | number, amount: number): Date;

/**
 * Add the specified number of milliseconds to the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified number of milliseconds added.
 * - If the input date or amount is invalid, returns `Invalid Date`.
 * - Fractions in `amount` are truncated (e.g., 1.9 → 1, -1.9 → -1).
 *
 * @param date - The original date or timestamp.
 * @param amount - The number of milliseconds to add (fractions are truncated).
 * @returns A new `Date` object with the milliseconds added, or `Invalid Date` if input is invalid.
 */
declare function addMilliseconds(date: Date | number, amount: number): Date;

/**
 * Add the specified number of minutes to the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified number of minutes added.
 * - If the input date or amount is invalid, returns `Invalid Date`.
 * - Fractions in `amount` are truncated (e.g., 1.9 → 1, -1.9 → -1).
 *
 * @param date - The original date or timestamp.
 * @param amount - The number of minutes to add (fractions are truncated).
 * @returns A new `Date` object with the minutes added, or `Invalid Date` if input is invalid.
 */
declare function addMinutes(date: Date | number, amount: number): Date;

/**
 * Add the specified number of months to the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` with the specified months added.
 * - If the input date or amount is invalid, returns `Invalid Date`.
 * - Fractions in `amount` are truncated (e.g., 1.9 → 1, -1.9 → -1).
 * - Handles month-end adjustment: if the original day does not exist in the target month,
 *   the result becomes the last day of that month.
 *
 * @param date - The original date or timestamp.
 * @param amount - The number of months to add (fractions are truncated).
 * @returns A new `Date` object with the months added, or `Invalid Date` if input is invalid.
 */
declare function addMonths(date: Date | number, amount: number): Date;

/**
 * Add the specified number of seconds to the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified number of seconds added.
 * - If the input date or amount is invalid, returns `Invalid Date`.
 * - Fractions in `amount` are truncated (e.g., 1.9 → 1, -1.9 → -1).
 *
 * @param date - The original date or timestamp.
 * @param amount - The number of seconds to add (fractions are truncated).
 * @returns A new `Date` object with the seconds added, or `Invalid Date` if input is invalid.
 */
declare function addSeconds(date: Date | number, amount: number): Date;

/**
 * Add the specified number of years to the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified number of years added.
 * - If the input date or amount is invalid, returns `Invalid Date`.
 * - Fractions in `amount` are truncated (e.g., 1.9 → 1, -1.9 → -1).
 * - Leap year adjustment: if the original date is Feb 29 and the target year
 *   is not a leap year, the result becomes Feb 28.
 *
 * @param date - The original date or timestamp.
 * @param amount - The number of years to add (fractions are truncated).
 * @returns A new `Date` object with the years added, or `Invalid Date` if input is invalid.
 */
declare function addYears(date: Date | number, amount: number): Date;

/**
 * Localization interface for formatting date/time components.
 *
 * Provides methods to localize various date/time components based on locale-specific formats.
 * Each method accepts an optional width parameter to control the output format:
 * - "narrow": Shortest possible representation (e.g., "M" for Monday)
 * - "abbreviated": Short form (e.g., "Mon" for Monday)
 * - "wide": Full form (e.g., "Monday")
 */
type Locale = {
    /**
     * Format era (BC/AD).
     *
     * @param era - 0 for BC (Before Christ), 1 for AD (Anno Domini)
     * @param options.width - Format width: "narrow", "abbreviated", or "wide"
     * @returns Localized era string
     */
    era: (era: 0 | 1, options?: {
        width: "narrow" | "abbreviated" | "wide";
    }) => string;
    /**
     * Format month name.
     *
     * @param month - Month index (0-11, where 0 is January)
     * @param options.width - Format width: "narrow", "abbreviated", or "wide"
     * @returns Localized month name
     */
    month: (month: number, options?: {
        width: "narrow" | "abbreviated" | "wide";
    }) => string;
    /**
     * Format weekday name.
     *
     * @param weekday - Weekday index (0-6, where 0 is Sunday)
     * @param options.width - Format width: "narrow", "abbreviated", or "wide"
     * @returns Localized weekday name
     */
    weekday: (weekday: number, options?: {
        width: "narrow" | "abbreviated" | "wide";
    }) => string;
    /**
     * Format day period (AM/PM).
     *
     * @param period - "am" for morning, "pm" for afternoon/evening
     * @param options.width - Format width: "narrow", "abbreviated", or "wide"
     * @returns Localized day period string
     */
    dayPeriod: (period: "am" | "pm", options?: {
        width: "narrow" | "abbreviated" | "wide";
    }) => string;
};
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
type TimeUnit = "year" | "month" | "day" | "hour" | "minute" | "second" | "millisecond";
/**
 * Date interval with optional start and end boundaries.
 *
 * Used in date range operations to define a time interval with optional boundaries.
 * Either boundary can be null to indicate an open interval in that direction.
 *
 * - start: The start boundary of the interval (null means no lower bound)
 * - end: The end boundary of the interval (null means no upper bound)
 */
type Interval = {
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
type BoundsType = "()" | "[]" | "[)" | "(]";
/**
 * Configuration options for the isBetween function.
 * Controls how boundary dates are treated in the comparison.
 */
type BetweenOption = {
    /**
     * Specifies boundary inclusion using mathematical interval notation.
     * Defaults to "()" for backward compatibility.
     *
     * @default "()"
     */
    bounds?: BoundsType;
};

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
 * format(date, "'Today is' EEEE, MMMM dd"); // "Today is Monday, January 15"
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
declare function format(date: Date, pattern: string, locale?: Locale): string;

/**
 * Get the day of the month from the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns the day of the month (1-31).
 * - If the date is invalid, returns `NaN`.
 *
 * @param date - The Date or timestamp.
 * @returns The day of the month as a number (1-31), or `NaN` if invalid.
 */
declare function getDay(date: Date | number): number;

/**
 * Get the hours of the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns the hours (0-23) in 24-hour format.
 * - If the date is invalid, returns `NaN`.
 *
 * @param date - The Date or timestamp.
 * @returns The hours as a number (0-23), or `NaN` if invalid.
 */
declare function getHours(date: Date | number): number;

/**
 * Get the milliseconds of the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns the milliseconds (0-999).
 * - If the date is invalid, returns `NaN`.
 *
 * @param date - The Date or timestamp.
 * @returns The milliseconds as a number (0-999), or `NaN` if invalid.
 */
declare function getMilliseconds(date: Date | number): number;

/**
 * Get the minutes of the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns the minutes (0-59).
 * - If the date is invalid, returns `NaN`.
 *
 * @param date - The Date or timestamp.
 * @returns The minutes as a number (0-59), or `NaN` if invalid.
 */
declare function getMinutes(date: Date | number): number;

/**
 * Get the month of the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns the month as 1-12 (January is 1, December is 12).
 * - If the date is invalid, returns `NaN`.
 *
 * @param date - The Date or timestamp.
 * @returns The month as a number (1-12), or `NaN` if invalid.
 */
declare function getMonth(date: Date | number): number;

/**
 * Get the seconds of the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns the seconds (0-59).
 * - If the date is invalid, returns `NaN`.
 *
 * @param date - The Date or timestamp.
 * @returns The seconds as a number (0-59), or `NaN` if invalid.
 */
declare function getSeconds(date: Date | number): number;

/**
 * Extract timestamp value from a Date object.
 *
 * @param date - The Date object to extract timestamp from
 * @returns The number of milliseconds since Unix epoch, or NaN for invalid dates or invalid arguments
 *
 * @example
 * getTime(new Date('2024-01-01')); // 1704067200000
 * getTime(new Date('invalid')); // NaN
 * getTime('not a date'); // NaN
 *
 * @remarks
 * This function provides the same behavior as Date.prototype.getTime(),
 * returning the timestamp in milliseconds since the Unix epoch (1970-01-01T00:00:00.000Z).
 * For invalid dates or invalid arguments, it returns NaN.
 */
declare function getTime(date: Date): number;

/**
 * Get the full year of the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns the full year (e.g., 2025).
 * - If the date is invalid, returns `NaN`.
 *
 * @param date - The Date or timestamp.
 * @returns The year as a number, or `NaN` if invalid.
 */
declare function getYear(date: Date | number): number;

/**
 * Set the year of the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified year set.
 * - If the input date or year is invalid, returns `Invalid Date`.
 * - Fractions in `year` are truncated (e.g., 2023.9 → 2023, -2023.9 → -2023).
 * - Leap year adjustment: if the original date is Feb 29 and the target year
 *   is not a leap year, the result becomes Feb 28.
 *
 * @param date - The original date or timestamp.
 * @param year - The year to set (fractions are truncated).
 * @returns A new `Date` object with the year set, or `Invalid Date` if input is invalid.
 */
declare function setYear(date: Date | number, year: number): Date;

/**
 * Set the month of the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified month set.
 * - If the input date or month is invalid, returns `Invalid Date`.
 * - Fractions in `month` are truncated (e.g., 1.9 → 1, -1.9 → -1).
 * - Month is 0-indexed (0 = January, 11 = December).
 * - Day adjustment: if the original day doesn't exist in the target month
 *   (e.g., Jan 31 → Feb), adjusts to the last valid day of the month.
 *
 * @param date - The original date or timestamp.
 * @param month - The month to set (0-11, fractions are truncated).
 * @returns A new `Date` object with the month set, or `Invalid Date` if input is invalid.
 */
declare function setMonth(date: Date | number, month: number): Date;

/**
 * Set the day of the month of the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified day of the month set.
 * - If the input date or day is invalid, returns `Invalid Date`.
 * - Fractions in `day` are truncated (e.g., 15.9 → 15, -15.9 → -15).
 * - Day values outside the valid range will cause date to roll over to adjacent months
 *   (e.g., setting day 32 in January results in February 1).
 *
 * @param date - The original date or timestamp.
 * @param day - The day of the month to set (1-31, fractions are truncated).
 * @returns A new `Date` object with the day set, or `Invalid Date` if input is invalid.
 */
declare function setDay(date: Date | number, day: number): Date;

/**
 * Set the hours of the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified hours set.
 * - If the input date or hours is invalid, returns `Invalid Date`.
 * - Fractions in `hours` are truncated (e.g., 14.9 → 14, -14.9 → -14).
 * - Hours values outside 0-23 will cause date to roll over to adjacent days.
 *
 * @param date - The original date or timestamp.
 * @param hours - The hours to set (0-23, fractions are truncated).
 * @returns A new `Date` object with the hours set, or `Invalid Date` if input is invalid.
 */
declare function setHours(date: Date | number, hours: number): Date;

/**
 * Set the minutes of the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified minutes set.
 * - If the input date or minutes is invalid, returns `Invalid Date`.
 * - Fractions in `minutes` are truncated (e.g., 30.9 → 30, -30.9 → -30).
 * - Minutes values outside 0-59 will cause date to roll over to adjacent hours.
 *
 * @param date - The original date or timestamp.
 * @param minutes - The minutes to set (0-59, fractions are truncated).
 * @returns A new `Date` object with the minutes set, or `Invalid Date` if input is invalid.
 */
declare function setMinutes(date: Date | number, minutes: number): Date;

/**
 * Set the seconds of the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified seconds set.
 * - If the input date or seconds is invalid, returns `Invalid Date`.
 * - Fractions in `seconds` are truncated (e.g., 30.9 → 30, -30.9 → -30).
 * - Seconds values outside 0-59 will cause date to roll over to adjacent minutes.
 *
 * @param date - The original date or timestamp.
 * @param seconds - The seconds to set (0-59, fractions are truncated).
 * @returns A new `Date` object with the seconds set, or `Invalid Date` if input is invalid.
 */
declare function setSeconds(date: Date | number, seconds: number): Date;

/**
 * Set the timestamp value of a Date object.
 *
 * @param date - The Date object to create a copy from
 * @param time - The timestamp in milliseconds since Unix epoch
 * @returns A new Date object with the specified timestamp, or invalid Date for invalid arguments
 *
 * @example
 * const date = new Date();
 * const newDate = setTime(date, 1704067200000); // Creates new date set to 2024-01-01
 *
 * @example
 * const date = new Date();
 * const invalidDate = setTime(date, NaN); // Creates new invalid date
 *
 * @example
 * const invalidDate = setTime('not a date', 1704067200000); // Returns new Date(NaN)
 *
 * @remarks
 * This function creates a new Date object without modifying the original.
 * The returned Date object has the specified timestamp, handling invalid values
 * (NaN, Infinity, out-of-range) by creating invalid dates.
 * For invalid arguments, returns a new Date(NaN).
 */
declare function setTime(date: Date, time: number): Date;

/**
 * Set the milliseconds of the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified milliseconds set.
 * - If the input date or milliseconds is invalid, returns `Invalid Date`.
 * - Fractions in `milliseconds` are truncated (e.g., 500.9 → 500, -500.9 → -500).
 * - Milliseconds values outside 0-999 will cause date to roll over to adjacent seconds.
 *
 * @param date - The original date or timestamp.
 * @param milliseconds - The milliseconds to set (0-999, fractions are truncated).
 * @returns A new `Date` object with the milliseconds set, or `Invalid Date` if input is invalid.
 */
declare function setMilliseconds(date: Date | number, milliseconds: number): Date;

/**
 * Check if date `a` is strictly after date `b`.
 *
 * - Returns `false` if either date is invalid.
 * - Comparison can be truncated to a given unit (default: millisecond).
 * - Equality is not considered "after".
 *
 * @param a - First date or timestamp to compare.
 * @param b - Second date or timestamp to compare.
 * @param opts.unit - Comparison unit (year, month, day, hour, minute, second, millisecond).
 */
declare function isAfter(a: Date | number, b: Date | number, opts?: {
    unit?: TimeUnit;
}): boolean;

/**
 * Check if date `a` is after or equal to date `b`.
 *
 * - Returns `false` if either date is invalid.
 * - Comparison can be truncated to a given unit (default: millisecond).
 *
 * @param a - First date or timestamp to compare.
 * @param b - Second date or timestamp to compare.
 * @param opts.unit - Comparison unit (year, month, day, hour, minute, second, millisecond).
 */
declare function isAfterOrEqual(a: Date | number, b: Date | number, opts?: {
    unit?: TimeUnit;
}): boolean;

/**
 * Check if date `a` is strictly before date `b`.
 *
 * - Returns `false` if either date is invalid.
 * - Comparison can be truncated to a given unit (default: millisecond).
 * - Equality is not considered "before".
 *
 * @param a - First date or timestamp to compare.
 * @param b - Second date or timestamp to compare.
 * @param opts.unit - Comparison unit (year, month, day, hour, minute, second, millisecond).
 */
declare function isBefore(a: Date | number, b: Date | number, opts?: {
    unit?: TimeUnit;
}): boolean;

/**
 * Check if date `a` is before or equal to date `b`.
 *
 * - Returns `false` if either date is invalid.
 * - Comparison can be truncated to a given unit (default: millisecond).
 *
 * @param a - First date or timestamp to compare.
 * @param b - Second date or timestamp to compare.
 * @param opts.unit - Comparison unit (year, month, day, hour, minute, second, millisecond).
 */
declare function isBeforeOrEqual(a: Date | number, b: Date | number, opts?: {
    unit?: TimeUnit;
}): boolean;

/**
 * Check if a date falls between two boundary dates with configurable inclusion.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns `false` if the date or interval is invalid.
 * - If start is null, uses MIN_DATE as the lower bound.
 * - If end is null, uses MAX_DATE as the upper bound.
 * - Boundary inclusion is controlled by the `bounds` option using mathematical interval notation.
 *
 * @param date - The date to check (Date object or timestamp).
 * @param interval - Interval object with start and end boundaries.
 * @param opts - Optional configuration for boundary inclusion.
 * @returns True if date is between the boundaries according to the bounds configuration.
 *
 * @example
 * // Default behavior (exclusive boundaries)
 * isBetween(new Date('2024-06-15'), {
 *   start: new Date('2024-06-10'),
 *   end: new Date('2024-06-20')
 * }); // true
 *
 * @example
 * // Inclusive boundaries
 * isBetween(new Date('2024-06-10'), {
 *   start: new Date('2024-06-10'),
 *   end: new Date('2024-06-20')
 * }, { bounds: "[]" }); // true
 */
declare function isBetween(date: Date | number, interval: Interval, opts?: BetweenOption): boolean;

/**
 * Check if date `a` is equal to date `b`.
 *
 * - Returns `false` if either date is invalid.
 * - Comparison can be truncated to a given unit (default: millisecond).
 *
 * @param a - First date or timestamp to compare.
 * @param b - Second date or timestamp to compare.
 * @param opts.unit - Comparison unit (year, month, day, hour, minute, second, millisecond).
 */
declare function isEqual(a: Date | number, b: Date | number, opts?: {
    unit?: TimeUnit;
}): boolean;

/**
 * Check if the given value is a valid Date or timestamp.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns `true` if the resulting Date is valid, otherwise `false`.
 * - Uses internal validation utilities for optimal performance.
 *
 * @param date - The Date object or timestamp to validate.
 * @returns `true` if valid, `false` if invalid.
 */
declare function isValid(date: Date | number): boolean;

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

declare function parse(dateString: string, pattern: string, options?: {
    locale?: Locale;
    referenceDate?: Date;
}): Date;

/**
 * Subtract the specified number of days from the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified number of days subtracted.
 * - If the input date or amount is invalid, returns `Invalid Date`.
 * - Fractions in `amount` are truncated (e.g., 1.9 → 1, -1.9 → -1).
 *
 * @param date - The original date or timestamp.
 * @param amount - The number of days to subtract (fractions are truncated).
 * @returns A new `Date` object with the days subtracted, or `Invalid Date` if input is invalid.
 */
declare function subDays(date: Date | number, amount: number): Date;

/**
 * Subtract the specified number of hours from the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified number of hours subtracted.
 * - If the input date or amount is invalid, returns `Invalid Date`.
 * - Fractions in `amount` are truncated (e.g., 1.9 → 1, -1.9 → -1).
 *
 * @param date - The original date or timestamp.
 * @param amount - The number of hours to subtract (fractions are truncated).
 * @returns A new `Date` object with the hours subtracted, or `Invalid Date` if input is invalid.
 */
declare function subHours(date: Date | number, amount: number): Date;

/**
 * Subtract the specified number of milliseconds from the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified number of milliseconds subtracted.
 * - If the input date or amount is invalid, returns `Invalid Date`.
 * - Fractions in `amount` are truncated (e.g., 1.9 → 1, -1.9 → -1).
 *
 * @param date - The original date or timestamp.
 * @param amount - The number of milliseconds to subtract (fractions are truncated).
 * @returns A new `Date` object with the milliseconds subtracted, or `Invalid Date` if input is invalid.
 */
declare function subMilliseconds(date: Date | number, amount: number): Date;

/**
 * Subtract the specified number of minutes from the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified number of minutes subtracted.
 * - If the input date or amount is invalid, returns `Invalid Date`.
 * - Fractions in `amount` are truncated (e.g., 1.9 → 1, -1.9 → -1).
 *
 * @param date - The original date or timestamp.
 * @param amount - The number of minutes to subtract (fractions are truncated).
 * @returns A new `Date` object with the minutes subtracted, or `Invalid Date` if input is invalid.
 */
declare function subMinutes(date: Date | number, amount: number): Date;

/**
 * Subtract the specified number of months from the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified number of months subtracted.
 * - If the input date or amount is invalid, returns `Invalid Date`.
 * - Fractions in `amount` are truncated (e.g., 1.9 → 1, -1.9 → -1).
 * - Month-end adjustment: if the original date has a day that doesn't exist
 *   in the target month (e.g., Mar 31 - 1 month), adjusts to the last valid day.
 *
 * @param date - The original date or timestamp.
 * @param amount - The number of months to subtract (fractions are truncated).
 * @returns A new `Date` object with the months subtracted, or `Invalid Date` if input is invalid.
 */
declare function subMonths(date: Date | number, amount: number): Date;

/**
 * Subtract the specified number of seconds from the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified number of seconds subtracted.
 * - If the input date or amount is invalid, returns `Invalid Date`.
 * - Fractions in `amount` are truncated (e.g., 1.9 → 1, -1.9 → -1).
 *
 * @param date - The original date or timestamp.
 * @param amount - The number of seconds to subtract (fractions are truncated).
 * @returns A new `Date` object with the seconds subtracted, or `Invalid Date` if input is invalid.
 */
declare function subSeconds(date: Date | number, amount: number): Date;

/**
 * Subtract the specified number of years from the given date.
 *
 * - Accepts a `Date` object or a timestamp (number).
 * - Returns a new `Date` instance with the specified number of years subtracted.
 * - If the input date or amount is invalid, returns `Invalid Date`.
 * - Fractions in `amount` are truncated (e.g., 1.9 → 1, -1.9 → -1).
 * - Leap year adjustment: if the original date is Feb 29 and the target year
 *   is not a leap year, the result becomes Feb 28.
 *
 * @param date - The original date or timestamp.
 * @param amount - The number of years to subtract (fractions are truncated).
 * @returns A new `Date` object with the years subtracted, or `Invalid Date` if input is invalid.
 */
declare function subYears(date: Date | number, amount: number): Date;

/**
 * Truncate a date to the start of the day.
 *
 * Sets the time to 00:00:00.000 while keeping the same date.
 *
 * @param date - The date or timestamp to truncate
 * @returns New Date object truncated to the start of the day
 *
 * @example
 * ```typescript
 * const date = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
 * const truncated = truncDay(date); // June 15, 2024 00:00:00.000
 * ```
 */
declare function truncDay(date: Date | number): Date;

/**
 * Truncate a date to the start of the hour.
 *
 * Sets the minutes, seconds, and milliseconds to 0 while keeping the same date and hour.
 *
 * @param date - The date or timestamp to truncate
 * @returns New Date object truncated to the start of the hour
 *
 * @example
 * ```typescript
 * const date = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
 * const truncated = truncHour(date); // June 15, 2024 14:00:00.000
 * ```
 */
declare function truncHour(date: Date | number): Date;

/**
 * Truncate a date to the millisecond.
 *
 * Returns the same date without any truncation since millisecond is the smallest unit.
 * This function is provided for API consistency.
 *
 * @param date - The date or timestamp to truncate
 * @returns New Date object (identical to the input)
 *
 * @example
 * ```typescript
 * const date = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
 * const truncated = truncMillisecond(date); // June 15, 2024 14:30:45.123 (same)
 * ```
 */
declare function truncMillisecond(date: Date | number): Date;

/**
 * Truncate a date to the start of the minute.
 *
 * Sets the seconds and milliseconds to 0 while keeping the same date, hour, and minute.
 *
 * @param date - The date or timestamp to truncate
 * @returns New Date object truncated to the start of the minute
 *
 * @example
 * ```typescript
 * const date = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
 * const truncated = truncMinute(date); // June 15, 2024 14:30:00.000
 * ```
 */
declare function truncMinute(date: Date | number): Date;

/**
 * Truncate a date to the start of the month.
 *
 * Sets the date to the 1st day of the month at 00:00:00.000.
 *
 * @param date - The date or timestamp to truncate
 * @returns New Date object truncated to the start of the month
 *
 * @example
 * ```typescript
 * const date = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
 * const truncated = truncMonth(date); // June 1, 2024 00:00:00.000
 * ```
 */
declare function truncMonth(date: Date | number): Date;

/**
 * Truncate a date to the start of the second.
 *
 * Sets the milliseconds to 0 while keeping the same date, hour, minute, and second.
 *
 * @param date - The date or timestamp to truncate
 * @returns New Date object truncated to the start of the second
 *
 * @example
 * ```typescript
 * const date = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
 * const truncated = truncSecond(date); // June 15, 2024 14:30:45.000
 * ```
 */
declare function truncSecond(date: Date | number): Date;

/**
 * Truncate a date to the start of the year.
 *
 * Sets the date to January 1st at 00:00:00.000 of the same year.
 *
 * @param date - The date or timestamp to truncate
 * @returns New Date object truncated to the start of the year
 *
 * @example
 * ```typescript
 * const date = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
 * const truncated = truncYear(date); // January 1, 2024 00:00:00.000
 * ```
 */
declare function truncYear(date: Date | number): Date;

/**
 * Calculate the difference in calendar days between two dates.
 *
 * Returns the number of full days between the earlier and later date.
 * Ignores time components (hours, minutes, seconds, milliseconds).
 * Uses midnight of each date for calculation to ensure calendar day accuracy.
 *
 * @param dateLeft - The first date
 * @param dateRight - The second date
 * @returns The difference in days (negative if dateLeft is before dateRight)
 *
 * @example
 * ```typescript
 * const date1 = new Date(2024, 5, 15, 23, 59); // June 15, 2024 23:59
 * const date2 = new Date(2024, 5, 14, 0, 0);   // June 14, 2024 00:00
 * diffDays(date1, date2); // 1 (calendar day difference)
 *
 * const date3 = new Date(2024, 5, 15, 0, 0);   // June 15, 2024 00:00
 * const date4 = new Date(2024, 5, 15, 23, 59); // June 15, 2024 23:59
 * diffDays(date3, date4); // 0 (same calendar day)
 *
 * const date5 = new Date(2024, 0, 1);  // January 1, 2024
 * const date6 = new Date(2023, 11, 31); // December 31, 2023
 * diffDays(date5, date6); // 1
 * ```
 */
declare function diffDays(dateLeft: Date | number, dateRight: Date | number): number;

/**
 * Calculate the difference in complete hours between two dates.
 *
 * Returns the number of complete hours between the earlier and later date.
 * Ignores minutes, seconds, and milliseconds - only counts full hour boundaries crossed.
 *
 * @param dateLeft - The first date or timestamp
 * @param dateRight - The second date or timestamp
 * @returns The difference in complete hours (negative if dateLeft is before dateRight)
 *
 * @example
 * ```typescript
 * const date1 = new Date(2024, 5, 15, 14, 59, 59); // June 15, 2024 14:59:59
 * const date2 = new Date(2024, 5, 15, 12, 0, 0);   // June 15, 2024 12:00:00
 * diffHours(date1, date2); // 2 (complete hours)
 *
 * const date3 = new Date(2024, 5, 15, 14, 30);     // June 15, 2024 14:30
 * const date4 = new Date(2024, 5, 15, 14, 59);     // June 15, 2024 14:59
 * diffHours(date3, date4); // 0 (same hour)
 *
 * const date5 = new Date(2024, 5, 16, 2, 0);  // June 16, 2024 02:00
 * const date6 = new Date(2024, 5, 15, 23, 0); // June 15, 2024 23:00
 * diffHours(date5, date6); // 3
 * ```
 */
declare function diffHours(dateLeft: Date | number, dateRight: Date | number): number;

/**
 * Calculate the difference in milliseconds between two dates.
 *
 * Returns the exact difference in milliseconds between two dates.
 * This is the most precise difference calculation.
 *
 * @param dateLeft - The first date or timestamp
 * @param dateRight - The second date or timestamp
 * @returns The difference in milliseconds (negative if dateLeft is before dateRight)
 *
 * @example
 * ```typescript
 * const date1 = new Date(2024, 5, 15, 14, 30, 45, 500); // June 15, 2024 14:30:45.500
 * const date2 = new Date(2024, 5, 15, 14, 30, 45, 100); // June 15, 2024 14:30:45.100
 * diffMilliseconds(date1, date2); // 400
 *
 * const date3 = new Date(2024, 5, 15, 14, 30, 46, 0);   // June 15, 2024 14:30:46.000
 * const date4 = new Date(2024, 5, 15, 14, 30, 45, 0);   // June 15, 2024 14:30:45.000
 * diffMilliseconds(date3, date4); // 1000
 *
 * const date5 = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
 * const date6 = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
 * diffMilliseconds(date5, date6); // 0 (exact same time)
 * ```
 */
declare function diffMilliseconds(dateLeft: Date | number, dateRight: Date | number): number;

/**
 * Calculate the difference in complete minutes between two dates.
 *
 * Returns the number of complete minutes between the earlier and later date.
 * Ignores seconds and milliseconds - only counts full minute boundaries crossed.
 *
 * @param dateLeft - The first date or timestamp
 * @param dateRight - The second date or timestamp
 * @returns The difference in complete minutes (negative if dateLeft is before dateRight)
 *
 * @example
 * ```typescript
 * const date1 = new Date(2024, 5, 15, 14, 30, 59); // June 15, 2024 14:30:59
 * const date2 = new Date(2024, 5, 15, 14, 28, 0);  // June 15, 2024 14:28:00
 * diffMinutes(date1, date2); // 2 (complete minutes)
 *
 * const date3 = new Date(2024, 5, 15, 14, 30, 0);  // June 15, 2024 14:30:00
 * const date4 = new Date(2024, 5, 15, 14, 30, 59); // June 15, 2024 14:30:59
 * diffMinutes(date3, date4); // 0 (same minute)
 *
 * const date5 = new Date(2024, 5, 15, 15, 0);  // June 15, 2024 15:00
 * const date6 = new Date(2024, 5, 15, 14, 45); // June 15, 2024 14:45
 * diffMinutes(date5, date6); // 15
 * ```
 */
declare function diffMinutes(dateLeft: Date | number, dateRight: Date | number): number;

/**
 * Calculate the difference in calendar months between two dates.
 *
 * Returns the number of full months between the earlier and later date.
 * Only considers year and month values, ignoring days and time components.
 *
 * @param dateLeft - The first date or timestamp
 * @param dateRight - The second date or timestamp
 * @returns The difference in months (negative if dateLeft is before dateRight)
 *
 * @example
 * ```typescript
 * const date1 = new Date(2024, 5, 15);  // June 15, 2024
 * const date2 = new Date(2024, 2, 1);   // March 1, 2024
 * diffMonths(date1, date2); // 3
 *
 * const date3 = new Date(2024, 0, 31);  // January 31, 2024
 * const date4 = new Date(2023, 11, 1);  // December 1, 2023
 * diffMonths(date3, date4); // 1
 *
 * const date5 = new Date(2025, 2, 1);   // March 1, 2025
 * const date6 = new Date(2024, 2, 31);  // March 31, 2024
 * diffMonths(date5, date6); // 12
 * ```
 */
declare function diffMonths(dateLeft: Date | number, dateRight: Date | number): number;

/**
 * Calculate the difference in complete seconds between two dates.
 *
 * Returns the number of complete seconds between the earlier and later date.
 * Ignores milliseconds - only counts full second boundaries crossed.
 *
 * @param dateLeft - The first date or timestamp
 * @param dateRight - The second date or timestamp
 * @returns The difference in complete seconds (negative if dateLeft is before dateRight)
 *
 * @example
 * ```typescript
 * const date1 = new Date(2024, 5, 15, 14, 30, 45, 999); // June 15, 2024 14:30:45.999
 * const date2 = new Date(2024, 5, 15, 14, 30, 43, 0);   // June 15, 2024 14:30:43.000
 * diffSeconds(date1, date2); // 2 (complete seconds)
 *
 * const date3 = new Date(2024, 5, 15, 14, 30, 45, 0);   // June 15, 2024 14:30:45.000
 * const date4 = new Date(2024, 5, 15, 14, 30, 45, 999); // June 15, 2024 14:30:45.999
 * diffSeconds(date3, date4); // 0 (same second)
 *
 * const date5 = new Date(2024, 5, 15, 14, 31, 0);  // June 15, 2024 14:31:00
 * const date6 = new Date(2024, 5, 15, 14, 30, 30); // June 15, 2024 14:30:30
 * diffSeconds(date5, date6); // 30
 * ```
 */
declare function diffSeconds(dateLeft: Date | number, dateRight: Date | number): number;

/**
 * Calculate the difference in calendar years between two dates.
 *
 * Returns the number of full years between the earlier and later date.
 * Only considers year values, ignoring months, days, and time components.
 *
 * @param dateLeft - The first date or timestamp
 * @param dateRight - The second date or timestamp
 * @returns The difference in years (negative if dateLeft is before dateRight)
 *
 * @example
 * ```typescript
 * const date1 = new Date(2024, 0, 1);  // January 1, 2024
 * const date2 = new Date(2020, 11, 31); // December 31, 2020
 * diffYears(date1, date2); // 4
 *
 * const date3 = new Date(2024, 11, 31); // December 31, 2024
 * const date4 = new Date(2024, 0, 1);   // January 1, 2024
 * diffYears(date3, date4); // 0 (same calendar year)
 * ```
 */
declare function diffYears(dateLeft: Date | number, dateRight: Date | number): number;

/**
 * Get the end of the month for the given date.
 *
 * Returns a new Date object set to the last day of the month at 23:59:59.999.
 *
 * @param date - The original date or timestamp
 * @returns New Date object representing the end of the month
 *
 * @example
 * ```typescript
 * const date = new Date(2024, 5, 15, 14, 30, 45); // June 15, 2024 14:30:45
 * const end = endOfMonth(date); // June 30, 2024 23:59:59.999
 *
 * const firstDayOfMonth = new Date(2024, 1, 1, 0, 0, 0); // February 1, 2024 00:00:00
 * const monthEnd = endOfMonth(firstDayOfMonth); // February 29, 2024 23:59:59.999 (leap year)
 * ```
 */
declare function endOfMonth(date: Date | number): Date;

/**
 * Get the start of the month for the given date.
 *
 * Returns a new Date object set to the first day of the month at 00:00:00.000.
 *
 * @param date - The original date or timestamp
 * @returns New Date object representing the start of the month
 *
 * @example
 * ```typescript
 * const date = new Date(2024, 5, 15, 14, 30, 45); // June 15, 2024 14:30:45
 * const start = startOfMonth(date); // June 1, 2024 00:00:00.000
 *
 * const lastDayOfMonth = new Date(2024, 5, 30, 23, 59, 59); // June 30, 2024 23:59:59
 * const monthStart = startOfMonth(lastDayOfMonth); // June 1, 2024 00:00:00.000
 * ```
 */
declare function startOfMonth(date: Date | number): Date;

/**
 * Get the end of the year for the given date.
 *
 * Returns a new Date object set to December 31st at 23:59:59.999 of the same year.
 *
 * @param date - The original date or timestamp
 * @returns New Date object representing the end of the year
 *
 * @example
 * ```typescript
 * const date = new Date(2024, 5, 15, 14, 30, 45); // June 15, 2024 14:30:45
 * const end = endOfYear(date); // December 31, 2024 23:59:59.999
 *
 * const firstDayOfYear = new Date(2024, 0, 1, 0, 0, 0); // January 1, 2024 00:00:00
 * const yearEnd = endOfYear(firstDayOfYear); // December 31, 2024 23:59:59.999
 * ```
 */
declare function endOfYear(date: Date | number): Date;

/**
 * Get the start of the year for the given date.
 *
 * Returns a new Date object set to January 1st at 00:00:00.000 of the same year.
 *
 * @param date - The original date or timestamp
 * @returns New Date object representing the start of the year
 *
 * @example
 * ```typescript
 * const date = new Date(2024, 5, 15, 14, 30, 45); // June 15, 2024 14:30:45
 * const start = startOfYear(date); // January 1, 2024 00:00:00.000
 *
 * const lastDayOfYear = new Date(2024, 11, 31, 23, 59, 59); // December 31, 2024 23:59:59
 * const yearStart = startOfYear(lastDayOfYear); // January 1, 2024 00:00:00.000
 * ```
 */
declare function startOfYear(date: Date | number): Date;

/**
 * Get the end of the day for the given date.
 *
 * Returns a new Date object set to 23:59:59.999 of the same date.
 *
 * @param date - The original date or timestamp
 * @returns New Date object representing the end of the day
 *
 * @example
 * ```typescript
 * const date = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
 * const end = endOfDay(date); // June 15, 2024 23:59:59.999
 *
 * const earlyMorning = new Date(2024, 5, 15, 0, 0, 0, 0); // June 15, 2024 00:00:00.000
 * const dayEnd = endOfDay(earlyMorning); // June 15, 2024 23:59:59.999
 * ```
 */
declare function endOfDay(date: Date | number): Date;

/**
 * Get the start of the day for the given date.
 *
 * Returns a new Date object set to 00:00:00.000 of the same date.
 *
 * @param date - The original date or timestamp
 * @returns New Date object representing the start of the day
 *
 * @example
 * ```typescript
 * const date = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
 * const start = startOfDay(date); // June 15, 2024 00:00:00.000
 *
 * const lateEvening = new Date(2024, 5, 15, 23, 59, 59, 999); // June 15, 2024 23:59:59.999
 * const dayStart = startOfDay(lateEvening); // June 15, 2024 00:00:00.000
 * ```
 */
declare function startOfDay(date: Date | number): Date;

/**
 * Check if two dates are in the same calendar year.
 *
 * Returns true if both dates fall within the same calendar year,
 * regardless of month, day, or time components.
 *
 * @param dateLeft - The first date or timestamp
 * @param dateRight - The second date or timestamp
 * @returns True if both dates are in the same year, false otherwise
 *
 * @example
 * ```typescript
 * const date1 = new Date(2024, 0, 1);    // January 1, 2024
 * const date2 = new Date(2024, 11, 31);  // December 31, 2024
 * isSameYear(date1, date2); // true
 *
 * const date3 = new Date(2024, 11, 31);  // December 31, 2024
 * const date4 = new Date(2025, 0, 1);    // January 1, 2025
 * isSameYear(date3, date4); // false
 *
 * const date5 = new Date(2024, 5, 15, 14, 30); // June 15, 2024 14:30
 * const date6 = new Date(2024, 8, 20, 9, 45);  // September 20, 2024 09:45
 * isSameYear(date5, date6); // true
 * ```
 */
declare function isSameYear(dateLeft: Date | number, dateRight: Date | number): boolean;

/**
 * Check if two dates are in the same calendar month.
 *
 * Returns true if both dates fall within the same calendar month and year,
 * regardless of day or time components.
 *
 * @param dateLeft - The first date or timestamp
 * @param dateRight - The second date or timestamp
 * @returns True if both dates are in the same month and year, false otherwise
 *
 * @example
 * ```typescript
 * const date1 = new Date(2024, 5, 1);    // June 1, 2024
 * const date2 = new Date(2024, 5, 30);   // June 30, 2024
 * isSameMonth(date1, date2); // true
 *
 * const date3 = new Date(2024, 5, 30);   // June 30, 2024
 * const date4 = new Date(2024, 6, 1);    // July 1, 2024
 * isSameMonth(date3, date4); // false
 *
 * const date5 = new Date(2024, 5, 15, 14, 30); // June 15, 2024 14:30
 * const date6 = new Date(2024, 5, 20, 9, 45);  // June 20, 2024 09:45
 * isSameMonth(date5, date6); // true
 *
 * const date7 = new Date(2024, 5, 15);   // June 15, 2024
 * const date8 = new Date(2023, 5, 15);   // June 15, 2023
 * isSameMonth(date7, date8); // false (different years)
 * ```
 */
declare function isSameMonth(dateLeft: Date | number, dateRight: Date | number): boolean;

/**
 * Check if two dates are on the same calendar day.
 *
 * Returns true if both dates fall on the same calendar day,
 * regardless of time components.
 *
 * @param dateLeft - The first date or timestamp
 * @param dateRight - The second date or timestamp
 * @returns True if both dates are on the same day, false otherwise
 *
 * @example
 * ```typescript
 * const date1 = new Date(2024, 5, 15, 0, 0);    // June 15, 2024 00:00
 * const date2 = new Date(2024, 5, 15, 23, 59);  // June 15, 2024 23:59
 * isSameDay(date1, date2); // true
 *
 * const date3 = new Date(2024, 5, 15, 23, 59);  // June 15, 2024 23:59
 * const date4 = new Date(2024, 5, 16, 0, 0);    // June 16, 2024 00:00
 * isSameDay(date3, date4); // false
 *
 * const date5 = new Date(2024, 5, 15, 14, 30, 45); // June 15, 2024 14:30:45
 * const date6 = new Date(2024, 5, 15, 9, 15, 20);  // June 15, 2024 09:15:20
 * isSameDay(date5, date6); // true
 *
 * const date7 = new Date(2024, 5, 15);   // June 15, 2024
 * const date8 = new Date(2024, 5, 14);   // June 14, 2024
 * isSameDay(date7, date8); // false
 * ```
 */
declare function isSameDay(dateLeft: Date | number, dateRight: Date | number): boolean;

/**
 * Check if two dates are in the same hour.
 *
 * Returns true if both dates fall within the same hour,
 * regardless of minutes, seconds, or milliseconds.
 *
 * @param dateLeft - The first date or timestamp
 * @param dateRight - The second date or timestamp
 * @returns True if both dates are in the same hour, false otherwise
 *
 * @example
 * ```typescript
 * const date1 = new Date(2024, 5, 15, 14, 0, 0);   // June 15, 2024 14:00:00
 * const date2 = new Date(2024, 5, 15, 14, 59, 59); // June 15, 2024 14:59:59
 * isSameHour(date1, date2); // true
 *
 * const date3 = new Date(2024, 5, 15, 14, 59, 59); // June 15, 2024 14:59:59
 * const date4 = new Date(2024, 5, 15, 15, 0, 0);   // June 15, 2024 15:00:00
 * isSameHour(date3, date4); // false
 *
 * const date5 = new Date(2024, 5, 15, 14, 30, 45); // June 15, 2024 14:30:45
 * const date6 = new Date(2024, 5, 15, 14, 15, 20); // June 15, 2024 14:15:20
 * isSameHour(date5, date6); // true
 *
 * const date7 = new Date(2024, 5, 15, 14, 30);     // June 15, 2024 14:30
 * const date8 = new Date(2024, 5, 16, 14, 30);     // June 16, 2024 14:30
 * isSameHour(date7, date8); // false (different days)
 * ```
 */
declare function isSameHour(dateLeft: Date | number, dateRight: Date | number): boolean;

/**
 * Check if two dates are in the same minute.
 *
 * Returns true if both dates fall within the same minute,
 * regardless of seconds or milliseconds.
 *
 * @param dateLeft - The first date or timestamp
 * @param dateRight - The second date or timestamp
 * @returns True if both dates are in the same minute, false otherwise
 *
 * @example
 * ```typescript
 * const date1 = new Date(2024, 5, 15, 14, 30, 0);   // June 15, 2024 14:30:00
 * const date2 = new Date(2024, 5, 15, 14, 30, 59);  // June 15, 2024 14:30:59
 * isSameMinute(date1, date2); // true
 *
 * const date3 = new Date(2024, 5, 15, 14, 30, 59);  // June 15, 2024 14:30:59
 * const date4 = new Date(2024, 5, 15, 14, 31, 0);   // June 15, 2024 14:31:00
 * isSameMinute(date3, date4); // false
 *
 * const date5 = new Date(2024, 5, 15, 14, 30, 15, 500); // June 15, 2024 14:30:15.500
 * const date6 = new Date(2024, 5, 15, 14, 30, 45, 800); // June 15, 2024 14:30:45.800
 * isSameMinute(date5, date6); // true
 *
 * const date7 = new Date(2024, 5, 15, 14, 30);      // June 15, 2024 14:30
 * const date8 = new Date(2024, 5, 15, 15, 30);      // June 15, 2024 15:30
 * isSameMinute(date7, date8); // false (different hours)
 * ```
 */
declare function isSameMinute(dateLeft: Date | number, dateRight: Date | number): boolean;

/**
 * Check if two dates are in the same second.
 *
 * Returns true if both dates fall within the same second,
 * regardless of milliseconds.
 *
 * @param dateLeft - The first date or timestamp
 * @param dateRight - The second date or timestamp
 * @returns True if both dates are in the same second, false otherwise
 *
 * @example
 * ```typescript
 * const date1 = new Date(2024, 5, 15, 14, 30, 45, 0);   // June 15, 2024 14:30:45.000
 * const date2 = new Date(2024, 5, 15, 14, 30, 45, 999); // June 15, 2024 14:30:45.999
 * isSameSecond(date1, date2); // true
 *
 * const date3 = new Date(2024, 5, 15, 14, 30, 45, 999); // June 15, 2024 14:30:45.999
 * const date4 = new Date(2024, 5, 15, 14, 30, 46, 0);   // June 15, 2024 14:30:46.000
 * isSameSecond(date3, date4); // false
 *
 * const date5 = new Date(2024, 5, 15, 14, 30, 45, 123); // June 15, 2024 14:30:45.123
 * const date6 = new Date(2024, 5, 15, 14, 30, 45, 456); // June 15, 2024 14:30:45.456
 * isSameSecond(date5, date6); // true
 *
 * const date7 = new Date(2024, 5, 15, 14, 30, 45);      // June 15, 2024 14:30:45
 * const date8 = new Date(2024, 5, 15, 14, 31, 45);      // June 15, 2024 14:31:45
 * isSameSecond(date7, date8); // false (different minutes)
 * ```
 */
declare function isSameSecond(dateLeft: Date | number, dateRight: Date | number): boolean;

/**
 * Return the earliest (minimum) date from the given dates.
 *
 * Takes one or more Date objects or timestamps and returns the earliest one.
 * If any date is invalid, returns an Invalid Date.
 *
 * @param dates - One or more dates or timestamps to compare
 * @returns The earliest date, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * const date1 = new Date(2024, 5, 15); // June 15, 2024
 * const date2 = new Date(2024, 5, 10); // June 10, 2024
 * const date3 = new Date(2024, 5, 20); // June 20, 2024
 * const earliest = min(date1, date2, date3); // June 10, 2024
 *
 * const timestamp1 = Date.now();
 * const timestamp2 = timestamp1 + 1000;
 * const minTimestamp = min(timestamp1, timestamp2); // earlier timestamp
 *
 * const mixed = min(new Date(2024, 5, 15), 1718409600000); // mixed Date and timestamp
 *
 * const singleDate = new Date(2024, 5, 15);
 * const result = min(singleDate); // June 15, 2024
 *
 * const invalidDate = new Date('invalid');
 * const validDate = new Date(2024, 5, 15);
 * const minResult = min(invalidDate, validDate); // Invalid Date
 * ```
 */
declare function min(...dates: (Date | number)[]): Date;

/**
 * Return the latest (maximum) date from the given dates.
 *
 * Takes one or more Date objects or timestamps and returns the latest one.
 * If any date is invalid, returns an Invalid Date.
 *
 * @param dates - One or more dates or timestamps to compare
 * @returns The latest date, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * const date1 = new Date(2024, 5, 15); // June 15, 2024
 * const date2 = new Date(2024, 5, 10); // June 10, 2024
 * const date3 = new Date(2024, 5, 20); // June 20, 2024
 * const latest = max(date1, date2, date3); // June 20, 2024
 *
 * const timestamp1 = Date.now();
 * const timestamp2 = timestamp1 + 1000;
 * const maxTimestamp = max(timestamp1, timestamp2); // later timestamp
 *
 * const mixed = max(new Date(2024, 5, 15), 1718409600000); // mixed Date and timestamp
 *
 * const singleDate = new Date(2024, 5, 15);
 * const result = max(singleDate); // June 15, 2024
 *
 * const invalidDate = new Date('invalid');
 * const validDate = new Date(2024, 5, 15);
 * const maxResult = max(invalidDate, validDate); // Invalid Date
 * ```
 */
declare function max(...dates: (Date | number)[]): Date;

/**
 * Get the current date and time.
 *
 * Returns a new Date object representing the current moment.
 * This function provides a consistent way to get the current time
 * across the chronia library ecosystem.
 *
 * @returns {Date} Current date and time as Date object
 *
 * @example
 * ```typescript
 * import { now } from 'chronia';
 *
 * const currentTime = now();
 * console.log(currentTime); // 2025-01-21T10:30:45.123Z
 *
 * // Use with other chronia functions
 * const tomorrow = addDays(now(), 1);
 * const oneHourAgo = subHours(now(), 1);
 * const formatted = format(now(), 'yyyy-MM-dd HH:mm:ss');
 * ```
 */
declare function now(): Date;

/**
 * Clamp a date within a specified range.
 *
 * Takes a date and ensures it falls within the specified minimum and maximum bounds.
 * If the date is before the minimum, returns the minimum.
 * If the date is after the maximum, returns the maximum.
 * If any date is invalid, returns an Invalid Date.
 *
 * @param date - The date to clamp
 * @param minDate - The minimum allowed date
 * @param maxDate - The maximum allowed date
 * @returns The clamped date, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * const minDate = new Date(2024, 5, 10); // June 10, 2024
 * const maxDate = new Date(2024, 5, 20); // June 20, 2024
 *
 * const earlyDate = new Date(2024, 5, 5); // June 5, 2024
 * const clampedEarly = clamp(earlyDate, minDate, maxDate); // June 10, 2024
 *
 * const lateDate = new Date(2024, 5, 25); // June 25, 2024
 * const clampedLate = clamp(lateDate, minDate, maxDate); // June 20, 2024
 *
 * const normalDate = new Date(2024, 5, 15); // June 15, 2024
 * const clampedNormal = clamp(normalDate, minDate, maxDate); // June 15, 2024
 *
 * // Works with timestamps too
 * const timestamp = Date.now();
 * const minTimestamp = timestamp - 1000;
 * const maxTimestamp = timestamp + 1000;
 * const clampedTimestamp = clamp(timestamp, minTimestamp, maxTimestamp);
 *
 * // Returns Invalid Date if any input is invalid
 * const invalidDate = new Date('invalid');
 * const validMin = new Date(2024, 5, 10);
 * const validMax = new Date(2024, 5, 20);
 * const result = clamp(invalidDate, validMin, validMax); // Invalid Date
 * ```
 */
declare function clamp(date: Date | number, minDate: Date | number, maxDate: Date | number): Date;

/**
 * Compare two Date objects or timestamps chronologically.
 *
 * @param date1 - The first Date object or timestamp to compare
 * @param date2 - The second Date object or timestamp to compare
 * @param order - Optional sort order: "ASC" for ascending (default) or "DESC" for descending
 * @returns -1 if date1 < date2, 1 if date1 > date2, 0 if equal (adjusted for order)
 *
 * @throws {RangeError} When arguments are not valid Date objects/timestamps
 *
 * @example
 * // Compare Date objects (existing behavior)
 * compare(new Date('2024-01-01'), new Date('2024-01-02')); // -1 (ascending)
 * compare(new Date('2024-01-01'), new Date('2024-01-02'), 'DESC'); // 1 (descending)
 * compare(new Date('2024-01-01'), new Date('2024-01-01')); // 0 (equal)
 *
 * @example
 * // Compare timestamps (new feature)
 * const timestamp1 = new Date('2024-01-01').getTime();
 * const timestamp2 = new Date('2024-01-02').getTime();
 * compare(timestamp1, timestamp2); // -1 (ascending)
 * compare(timestamp1, timestamp2, 'DESC'); // 1 (descending)
 *
 * @example
 * // Compare mixed Date and timestamp inputs
 * compare(new Date('2024-01-01'), new Date('2024-01-02').getTime()); // -1
 * compare(timestamp1, new Date('2024-01-02')); // -1
 *
 * @example
 * // Sort dates in ascending order
 * dates.sort(compare);
 *
 * @example
 * // Sort mixed arrays
 * mixed.sort((a, b) => compare(a, b, 'DESC'));
 *
 * @example
 * // Order parameter is case-insensitive at runtime (though TypeScript types are strict)
 * // These work at runtime even though TypeScript will show type errors:
 * // compare(date1, date2, 'desc'); // treated as 'DESC'
 * // compare(date1, date2, 'asc');  // treated as 'ASC'
 * // compare(date1, date2, 'xyz');  // treated as 'ASC' (default)
 */
declare function compare(date1: Date | number, date2: Date | number, order?: "ASC" | "DESC"): number;

/**
 * Date constants for the minimum and maximum representable dates in JavaScript.
 *
 * JavaScript Date objects can represent dates from January 1, 271821 BC
 * to September 13, 275760 AD, based on the ECMAScript specification which
 * uses a time value range of -8,640,000,000,000,000 to 8,640,000,000,000,000
 * milliseconds relative to the Unix epoch (January 1, 1970 00:00:00 UTC).
 */
/**
 * The minimum date that can be represented by a JavaScript Date object.
 * Corresponds to April 20, 271821 BC.
 */
declare const MIN_DATE: Date;
/**
 * The maximum date that can be represented by a JavaScript Date object.
 * Corresponds to September 13, 275760 AD.
 */
declare const MAX_DATE: Date;

export { type BetweenOption, type BoundsType, type Interval, type Locale, MAX_DATE, MIN_DATE, type TimeUnit, addDays, addHours, addMilliseconds, addMinutes, addMonths, addSeconds, addYears, clamp, compare, diffDays, diffHours, diffMilliseconds, diffMinutes, diffMonths, diffSeconds, diffYears, endOfDay, endOfMonth, endOfYear, format, getDay, getHours, getMilliseconds, getMinutes, getMonth, getSeconds, getTime, getYear, isAfter, isAfterOrEqual, isBefore, isBeforeOrEqual, isBetween, isEqual, isSameDay, isSameHour, isSameMinute, isSameMonth, isSameSecond, isSameYear, isValid, max, min, now, parse, setDay, setHours, setMilliseconds, setMinutes, setMonth, setSeconds, setTime, setYear, startOfDay, startOfMonth, startOfYear, subDays, subHours, subMilliseconds, subMinutes, subMonths, subSeconds, subYears, truncDay, truncHour, truncMillisecond, truncMinute, truncMonth, truncSecond, truncYear };
