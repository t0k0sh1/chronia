/**
 * Add the specified number of days to the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified number of days added. Fractional days are truncated toward zero.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param amount - The number of days to add (can be negative to subtract)
 * @returns A new Date object with the days added, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Add positive days
 * const result = addDays(new Date(2025, 0, 1), 5);
 * // Returns: 2025-01-06
 *
 * // Subtract days (negative amount)
 * const result = addDays(new Date(2025, 0, 10), -3);
 * // Returns: 2025-01-07
 *
 * // Works with timestamps
 * const timestamp = Date.now();
 * const result = addDays(timestamp, 7);
 * // Returns: Date 7 days from now
 *
 * // Fractional amounts are truncated
 * const result = addDays(new Date(2025, 0, 1), 1.9);
 * // Returns: 2025-01-02 (1.9 truncated to 1)
 *
 * // Invalid inputs return Invalid Date
 * const result = addDays(new Date("invalid"), 5);
 * // Returns: Invalid Date
 *
 * const result = addDays(new Date(2025, 0, 1), NaN);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (1.9 → 1, -1.9 → -1)
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Always returns a new Date instance (does not mutate input)
 */
declare function addDays(date: Date | number, amount: number): Date;

/**
 * Add the specified number of hours to the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified number of hours added. Fractional hours are truncated toward zero.
 * Minutes, seconds, and milliseconds are preserved.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param amount - The number of hours to add (can be negative to subtract)
 * @returns A new Date object with the hours added, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Add positive hours
 * const result = addHours(new Date(2020, 5, 15, 12, 0, 0), 3);
 * // Returns: 2020-06-15 15:00:00
 *
 * // Subtract hours (negative amount)
 * const result = addHours(new Date(2025, 8, 10, 15, 30, 0), -5);
 * // Returns: 2025-09-10 10:30:00
 *
 * // Fractional amounts are truncated
 * const result = addHours(new Date(2020, 0, 1, 12, 0, 0), 1.9);
 * // Returns: 2020-01-01 13:00:00 (1.9 truncated to 1)
 *
 * // Crosses day boundary
 * const result = addHours(new Date(2020, 0, 1, 23, 0, 0), 2);
 * // Returns: 2020-01-02 01:00:00
 *
 * // Invalid inputs return Invalid Date
 * const result = addHours(new Date("invalid"), 3);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (1.9 → 1, -1.9 → -1)
 * - Preserves minutes, seconds, and milliseconds
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Always returns a new Date instance (does not mutate input)
 */
declare function addHours(date: Date | number, amount: number): Date;

/**
 * Add the specified number of milliseconds to the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified number of milliseconds added. Fractional milliseconds are truncated toward zero.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param amount - The number of milliseconds to add (can be negative to subtract)
 * @returns A new Date object with the milliseconds added, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Add positive milliseconds
 * const result = addMilliseconds(new Date(2020, 0, 1, 12, 0, 0, 0), 500);
 * // Returns: 2020-01-01T12:00:00.500
 *
 * // Subtract milliseconds (negative amount)
 * const result = addMilliseconds(new Date(2020, 0, 1, 12, 0, 0, 500), -300);
 * // Returns: 2020-01-01T12:00:00.200
 *
 * // Fractional amounts are truncated
 * const result = addMilliseconds(new Date(2020, 0, 1, 12, 0, 0, 0), 1.9);
 * // Returns: 2020-01-01T12:00:00.001 (1.9 truncated to 1)
 *
 * // Crossing second boundary
 * const result = addMilliseconds(new Date(2020, 0, 1, 12, 0, 0, 999), 1);
 * // Returns: 2020-01-01T12:00:01.000
 *
 * // Invalid inputs return Invalid Date
 * const result = addMilliseconds(new Date("invalid"), 500);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (1.9 → 1, -1.9 → -1)
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Always returns a new Date instance (does not mutate input)
 */
declare function addMilliseconds(date: Date | number, amount: number): Date;

/**
 * Add the specified number of minutes to the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified number of minutes added. Fractional minutes are truncated toward zero.
 * Preserves seconds and milliseconds.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param amount - The number of minutes to add (can be negative to subtract)
 * @returns A new Date object with the minutes added, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Add positive minutes
 * const result = addMinutes(new Date(2020, 0, 1, 12, 30, 0), 15);
 * // Returns: 2020-01-01T12:45:00
 *
 * // Subtract minutes (negative amount)
 * const result = addMinutes(new Date(2020, 0, 1, 12, 30, 0), -15);
 * // Returns: 2020-01-01T12:15:00
 *
 * // Fractional amounts are truncated
 * const result = addMinutes(new Date(2020, 0, 1, 12, 0, 0), 1.9);
 * // Returns: 2020-01-01T12:01:00 (1.9 truncated to 1)
 *
 * // Crossing hour boundary
 * const result = addMinutes(new Date(2020, 0, 1, 12, 45, 0), 30);
 * // Returns: 2020-01-01T13:15:00
 *
 * // Invalid inputs return Invalid Date
 * const result = addMinutes(new Date("invalid"), 30);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (1.9 → 1, -1.9 → -1)
 * - Preserves seconds and milliseconds
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Always returns a new Date instance (does not mutate input)
 */
declare function addMinutes(date: Date | number, amount: number): Date;

/**
 * Add the specified number of months to the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified number of months added. Fractional months are truncated toward zero.
 * Preserves time components (hours, minutes, seconds, milliseconds). When the day of month
 * doesn't exist in the target month, the result becomes the last day of that month.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param amount - The number of months to add (can be negative to subtract)
 * @returns A new Date object with the months added, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Add positive months
 * const result = addMonths(new Date(2020, 0, 15), 3);
 * // Returns: 2020-04-15
 *
 * // Subtract months (negative amount)
 * const result = addMonths(new Date(2020, 5, 15), -2);
 * // Returns: 2020-04-15
 *
 * // Fractional amounts are truncated
 * const result = addMonths(new Date(2020, 0, 15), 1.9);
 * // Returns: 2020-02-15 (1.9 truncated to 1)
 *
 * // Month-end overflow handling (Jan 31 → Feb 28/29)
 * const result = addMonths(new Date(2025, 0, 31), 1);
 * // Returns: 2025-02-28 (Feb doesn't have 31 days)
 *
 * // Leap year handling
 * const result = addMonths(new Date(2024, 0, 31), 1);
 * // Returns: 2024-02-29 (2024 is a leap year)
 *
 * // Invalid inputs return Invalid Date
 * const result = addMonths(new Date("invalid"), 3);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (1.9 → 1, -1.9 → -1)
 * - Preserves time components (hours, minutes, seconds, milliseconds)
 * - Month-end overflow: if original day doesn't exist in target month, returns last day of that month
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Always returns a new Date instance (does not mutate input)
 */
declare function addMonths(date: Date | number, amount: number): Date;

/**
 * Add the specified number of seconds to the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified number of seconds added. Fractional seconds are truncated toward zero.
 * Preserves milliseconds.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param amount - The number of seconds to add (can be negative to subtract)
 * @returns A new Date object with the seconds added, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Add positive seconds
 * const result = addSeconds(new Date(2020, 0, 1, 12, 30, 30), 15);
 * // Returns: 2020-01-01T12:30:45
 *
 * // Subtract seconds (negative amount)
 * const result = addSeconds(new Date(2020, 0, 1, 12, 30, 30), -15);
 * // Returns: 2020-01-01T12:30:15
 *
 * // Fractional amounts are truncated
 * const result = addSeconds(new Date(2020, 0, 1, 12, 0, 0), 1.9);
 * // Returns: 2020-01-01T12:00:01 (1.9 truncated to 1)
 *
 * // Crossing minute boundary
 * const result = addSeconds(new Date(2020, 0, 1, 12, 30, 45), 30);
 * // Returns: 2020-01-01T12:31:15
 *
 * // Invalid inputs return Invalid Date
 * const result = addSeconds(new Date("invalid"), 30);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (1.9 → 1, -1.9 → -1)
 * - Preserves milliseconds
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Always returns a new Date instance (does not mutate input)
 */
declare function addSeconds(date: Date | number, amount: number): Date;

/**
 * Add the specified number of years to the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified number of years added. Fractional years are truncated toward zero.
 * Preserves month, day, and time components. When the source date is Feb 29 and the target
 * year is not a leap year, the result becomes Feb 28.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param amount - The number of years to add (can be negative to subtract)
 * @returns A new Date object with the years added, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Add positive years
 * const result = addYears(new Date(2020, 0, 15), 3);
 * // Returns: 2023-01-15
 *
 * // Subtract years (negative amount)
 * const result = addYears(new Date(2020, 0, 15), -3);
 * // Returns: 2017-01-15
 *
 * // Fractional amounts are truncated
 * const result = addYears(new Date(2020, 0, 1), 1.9);
 * // Returns: 2021-01-01 (1.9 truncated to 1)
 *
 * // Leap year to non-leap year (Feb 29 → Feb 28)
 * const result = addYears(new Date(2020, 1, 29), 1);
 * // Returns: 2021-02-28 (2021 is not a leap year)
 *
 * // Leap year to leap year (Feb 29 → Feb 29)
 * const result = addYears(new Date(2020, 1, 29), 4);
 * // Returns: 2024-02-29 (2024 is a leap year)
 *
 * // Invalid inputs return Invalid Date
 * const result = addYears(new Date("invalid"), 3);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (1.9 → 1, -1.9 → -1)
 * - Preserves month, day, and time components (hours, minutes, seconds, milliseconds)
 * - Leap year adjustment: Feb 29 → Feb 28 when target year is not a leap year
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Always returns a new Date instance (does not mutate input)
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
 * This function validates arguments before processing and returns the day of the month
 * (1-31) of the given date. Returns NaN for invalid input.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @returns The day of the month as a number (1-31), or NaN if invalid
 *
 * @example
 * ```typescript
 * // Get day from Date object
 * const result = getDay(new Date(2025, 0, 15));
 * // Returns: 15
 *
 * // Get day from timestamp
 * const result2 = getDay(1704067200000); // 2024-01-01
 * // Returns: 1
 *
 * // Leap day
 * const result3 = getDay(new Date(2024, 1, 29));
 * // Returns: 29
 *
 * // End of month
 * const result4 = getDay(new Date(2024, 0, 31));
 * // Returns: 31
 *
 * // Invalid date returns NaN
 * const result5 = getDay(new Date("invalid"));
 * // Returns: NaN
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Returns NaN for: Invalid Date, NaN, Infinity, -Infinity
 * - Returns the day in the local timezone
 * - Day values range from 1 to 31 depending on the month
 */
declare function getDay(date: Date | number): number;

/**
 * Get the hours of the given date.
 *
 * This function validates arguments before processing and returns the hours
 * (0-23) of the given date in 24-hour format. Returns NaN for invalid input.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @returns The hours as a number (0-23), or NaN if invalid
 *
 * @example
 * ```typescript
 * // Get hours from Date object
 * const result = getHours(new Date(2025, 0, 15, 14, 30));
 * // Returns: 14
 *
 * // Get hours from timestamp
 * const result2 = getHours(1704110400000); // 2024-01-01 12:00:00
 * // Returns: 12
 *
 * // Midnight (start of day)
 * const result3 = getHours(new Date(2024, 0, 1, 0, 0, 0));
 * // Returns: 0
 *
 * // End of day
 * const result4 = getHours(new Date(2024, 0, 1, 23, 59, 59));
 * // Returns: 23
 *
 * // Invalid date returns NaN
 * const result5 = getHours(new Date("invalid"));
 * // Returns: NaN
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Returns NaN for: Invalid Date, NaN, Infinity, -Infinity
 * - Returns the hours in the local timezone (not UTC)
 * - Hours are in 24-hour format (0-23)
 */
declare function getHours(date: Date | number): number;

/**
 * Get the milliseconds of the given date.
 *
 * This function validates arguments before processing and returns the milliseconds
 * component (0-999) of the given date. Returns NaN for invalid input.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @returns The milliseconds as a number (0-999), or NaN if invalid
 *
 * @example
 * ```typescript
 * // Get milliseconds from Date object
 * const result = getMilliseconds(new Date(2024, 0, 15, 12, 30, 45, 123));
 * // Returns: 123
 *
 * // Get milliseconds from timestamp
 * const result2 = getMilliseconds(1704067200500); // 500ms past epoch
 * // Returns: 500
 *
 * // Start of second (0 milliseconds)
 * const result3 = getMilliseconds(new Date(2024, 0, 1, 0, 0, 0, 0));
 * // Returns: 0
 *
 * // End of second (999 milliseconds)
 * const result4 = getMilliseconds(new Date(2024, 0, 1, 0, 0, 0, 999));
 * // Returns: 999
 *
 * // Invalid date returns NaN
 * const result5 = getMilliseconds(new Date("invalid"));
 * // Returns: NaN
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Returns NaN for: Invalid Date, NaN, Infinity, -Infinity
 * - Returns milliseconds in the range 0-999
 * - Works with dates in any timezone (returns local time component)
 */
declare function getMilliseconds(date: Date | number): number;

/**
 * Get the minutes of the given date.
 *
 * This function validates arguments before processing and returns the minutes (0-59)
 * of the given date. Returns NaN for invalid input.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @returns The minutes as a number (0-59), or NaN if invalid
 *
 * @example
 * ```typescript
 * // Get minutes from Date object
 * const result = getMinutes(new Date(2025, 0, 15, 14, 30, 45));
 * // Returns: 30
 *
 * // Get minutes from timestamp
 * const result2 = getMinutes(1704067200000); // 2024-01-01 00:00:00
 * // Returns: 0
 *
 * // Minutes at the end of an hour
 * const result3 = getMinutes(new Date(2024, 11, 31, 23, 59, 59));
 * // Returns: 59
 *
 * // Minutes at the start of an hour
 * const result4 = getMinutes(new Date(2024, 5, 15, 8, 0, 0));
 * // Returns: 0
 *
 * // Invalid date returns NaN
 * const result5 = getMinutes(new Date("invalid"));
 * // Returns: NaN
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Returns NaN for: Invalid Date, NaN, Infinity, -Infinity
 * - Returns the minutes in the local timezone
 * - Always returns a value between 0 and 59 for valid dates
 */
declare function getMinutes(date: Date | number): number;

/**
 * Get the month of the given date.
 *
 * This function validates arguments before processing and returns the month
 * (1-12, where January is 1 and December is 12) of the given date. Returns NaN for invalid input.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @returns The month as a number (1-12), or NaN if invalid
 *
 * @example
 * ```typescript
 * // Get month from Date object
 * const result = getMonth(new Date(2024, 5, 15)); // June
 * // Returns: 6
 *
 * // Get month from timestamp
 * const result2 = getMonth(1704067200000); // 2024-01-01
 * // Returns: 1
 *
 * // Leap year February
 * const result3 = getMonth(new Date(2024, 1, 29));
 * // Returns: 2
 *
 * // December
 * const result4 = getMonth(new Date(2024, 11, 25));
 * // Returns: 12
 *
 * // Invalid date returns NaN
 * const result5 = getMonth(new Date("invalid"));
 * // Returns: NaN
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Returns NaN for: Invalid Date, NaN, Infinity, -Infinity
 * - Returns the month in the local timezone
 * - Uses 1-based indexing (1-12) unlike JavaScript's native getMonth() (0-11)
 */
declare function getMonth(date: Date | number): number;

/**
 * Get the seconds of the given date.
 *
 * This function validates arguments before processing and returns the seconds (0-59)
 * of the given date. Returns NaN for invalid input.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @returns The seconds as a number (0-59), or NaN if invalid
 *
 * @example
 * ```typescript
 * // Get seconds from Date object
 * const result = getSeconds(new Date(2025, 0, 15, 10, 30, 45));
 * // Returns: 45
 *
 * // Get seconds from timestamp
 * const result2 = getSeconds(1704067245000); // 2024-01-01T00:00:45Z
 * // Returns: 45
 *
 * // Start of minute
 * const result3 = getSeconds(new Date(2024, 0, 1, 10, 30, 0));
 * // Returns: 0
 *
 * // End of minute
 * const result4 = getSeconds(new Date(2024, 0, 1, 10, 30, 59));
 * // Returns: 59
 *
 * // Invalid date returns NaN
 * const result5 = getSeconds(new Date("invalid"));
 * // Returns: NaN
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Returns NaN for: Invalid Date, NaN, Infinity, -Infinity
 * - Returns the seconds in the local timezone
 * - Seconds are always in the range 0-59
 */
declare function getSeconds(date: Date | number): number;

/**
 * Get the timestamp of the given date.
 *
 * This function validates arguments before processing and returns the timestamp
 * (milliseconds since Unix epoch) of the given date. Returns NaN for invalid input.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @returns The timestamp in milliseconds since Unix epoch (1970-01-01), or NaN if invalid
 *
 * @example
 * ```typescript
 * // Get timestamp from Date object
 * const result = getTime(new Date("2024-01-01T00:00:00.000Z"));
 * // Returns: 1704067200000
 *
 * // Get timestamp from numeric input (returns as-is if valid)
 * const result2 = getTime(1704067200000);
 * // Returns: 1704067200000
 *
 * // Unix epoch
 * const result3 = getTime(new Date(0));
 * // Returns: 0
 *
 * // Negative timestamp (before epoch)
 * const result4 = getTime(new Date("1969-12-31T00:00:00.000Z"));
 * // Returns: -86400000
 *
 * // Invalid date returns NaN
 * const result5 = getTime(new Date("invalid"));
 * // Returns: NaN
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Returns NaN for: Invalid Date, NaN, Infinity, -Infinity
 * - Returns timestamp in milliseconds since Unix epoch (1970-01-01T00:00:00.000Z)
 * - For numeric input, returns the value as-is if valid
 */
declare function getTime(date: Date | number): number;

/**
 * Get the full year of the given date.
 *
 * This function validates arguments before processing and returns the full year
 * (e.g., 2025) of the given date. Returns NaN for invalid input.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @returns The year as a number, or NaN if invalid
 *
 * @example
 * ```typescript
 * // Get year from Date object
 * const result = getYear(new Date(2025, 0, 15));
 * // Returns: 2025
 *
 * // Get year from timestamp
 * const result2 = getYear(1704067200000); // 2024-01-01
 * // Returns: 2024
 *
 * // Leap year
 * const result3 = getYear(new Date(2024, 1, 29));
 * // Returns: 2024
 *
 * // Historic date
 * const result4 = getYear(new Date(1776, 6, 4));
 * // Returns: 1776
 *
 * // Invalid date returns NaN
 * const result5 = getYear(new Date("invalid"));
 * // Returns: NaN
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Returns NaN for: Invalid Date, NaN, Infinity, -Infinity
 * - Returns the year in the local timezone
 * - Supports negative years (BC dates)
 */
declare function getYear(date: Date | number): number;

/**
 * Set the year of the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified year set. Fractional years are truncated toward zero.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param year - The year to set (can be negative for BC dates)
 * @returns A new Date object with the year set, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Set year to future year
 * const result = setYear(new Date(2025, 0, 15), 2030);
 * // Returns: 2030-01-15
 *
 * // Set year to past year
 * const result2 = setYear(new Date(2025, 0, 15), 2020);
 * // Returns: 2020-01-15
 *
 * // Leap year adjustment (Feb 29 → Feb 28)
 * const result3 = setYear(new Date(2020, 1, 29), 2021);
 * // Returns: 2021-02-28 (non-leap year)
 *
 * // Fractional year is truncated
 * const result4 = setYear(new Date(2025, 0, 15), 2023.9);
 * // Returns: 2023-01-15
 *
 * // Invalid date returns Invalid Date
 * const result5 = setYear(new Date("invalid"), 2025);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (2023.9 → 2023, -2023.9 → -2023)
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Preserves month, day, and time components (hours, minutes, seconds, milliseconds)
 * - Special handling: When the source date is Feb 29 and the target year is not a leap year, the result becomes Feb 28
 * - Always returns a new Date instance (does not mutate input)
 */
declare function setYear(date: Date | number, year: number): Date;

/**
 * Set the month of the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified month set. Fractional months are truncated toward zero.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param month - The month to set (0-indexed: 0 = January, 11 = December)
 * @returns A new Date object with the month set, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Set month to June
 * const result = setMonth(new Date(2025, 0, 15), 5);
 * // Returns: 2025-06-15
 *
 * // Set month to January
 * const result2 = setMonth(new Date(2025, 5, 15), 0);
 * // Returns: 2025-01-15
 *
 * // Day overflow adjustment (Jan 31 → Feb 28)
 * const result3 = setMonth(new Date(2025, 0, 31), 1);
 * // Returns: 2025-02-28 (non-leap year)
 *
 * // Fractional month is truncated
 * const result4 = setMonth(new Date(2025, 0, 15), 5.9);
 * // Returns: 2025-06-15
 *
 * // Invalid date returns Invalid Date
 * const result5 = setMonth(new Date("invalid"), 5);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (5.9 → 5, -1.9 → -1)
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Preserves year, day, and time components (hours, minutes, seconds, milliseconds)
 * - Special handling: When the original day doesn't exist in the target month (e.g., Jan 31 → Feb), adjusts to the last valid day of the month (Feb 28 or 29)
 * - Always returns a new Date instance (does not mutate input)
 */
declare function setMonth(date: Date | number, month: number): Date;

/**
 * Set the day of the month of the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified day set. Fractional days are truncated toward zero.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param day - The day to set (1-31, fractions are truncated)
 * @returns A new Date object with the day set, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Set day to 1st
 * const result = setDay(new Date(2025, 0, 15), 1);
 * // Returns: 2025-01-01
 *
 * // Set day to last day of month
 * const result2 = setDay(new Date(2025, 0, 15), 31);
 * // Returns: 2025-01-31
 *
 * // Day overflow (Jan 32 → Feb 1)
 * const result3 = setDay(new Date(2025, 0, 15), 32);
 * // Returns: 2025-02-01
 *
 * // Fractional day is truncated
 * const result4 = setDay(new Date(2025, 0, 15), 15.9);
 * // Returns: 2025-01-15
 *
 * // Invalid date returns Invalid Date
 * const result5 = setDay(new Date("invalid"), 15);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (15.9 → 15, -15.9 → -15)
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Preserves year, month, and time components (hours, minutes, seconds, milliseconds)
 * - Rollover behavior: Day values outside valid range cause date to roll over to adjacent months (e.g., Jan 32 → Feb 1, day 0 → last day of previous month)
 * - Always returns a new Date instance (does not mutate input)
 */
declare function setDay(date: Date | number, day: number): Date;

/**
 * Set the hours of the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified hours set. Fractional hours are truncated toward zero.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param hours - The hours to set (0-23, fractions are truncated)
 * @returns A new Date object with the hours set, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Set hours to a specific time
 * const result = setHours(new Date(2025, 0, 15, 12, 30, 45), 18);
 * // Returns: 2025-01-15 18:30:45
 *
 * // Set hours to midnight
 * const result2 = setHours(new Date(2025, 0, 15, 12, 30, 45), 0);
 * // Returns: 2025-01-15 00:30:45
 *
 * // Hours rollover to next day
 * const result3 = setHours(new Date(2025, 0, 15, 12, 30, 45), 24);
 * // Returns: 2025-01-16 00:30:45
 *
 * // Fractional hours are truncated
 * const result4 = setHours(new Date(2025, 0, 15, 12, 30, 45), 14.9);
 * // Returns: 2025-01-15 14:30:45
 *
 * // Invalid date returns Invalid Date
 * const result5 = setHours(new Date("invalid"), 12);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (14.9 → 14, -14.9 → -14)
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Preserves date, minutes, seconds, and milliseconds components
 * - Hours outside 0-23 will cause date rollover (e.g., 24 → next day, -1 → previous day)
 * - Always returns a new Date instance (does not mutate input)
 */
declare function setHours(date: Date | number, hours: number): Date;

/**
 * Set the minutes of the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified minutes set. Fractional minutes are truncated toward zero.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param minutes - The minutes to set (typically 0-59, but values outside this range will cause rollover)
 * @returns A new Date object with the minutes set, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Set minutes to standard value
 * const result = setMinutes(new Date(2025, 0, 15, 12, 30, 45), 45);
 * // Returns: 2025-01-15 12:45:45
 *
 * // Set minutes to boundary value
 * const result2 = setMinutes(new Date(2025, 0, 15, 12, 30, 45), 0);
 * // Returns: 2025-01-15 12:00:45
 *
 * // Fractional minutes are truncated
 * const result3 = setMinutes(new Date(2025, 0, 15, 12, 30, 45), 45.9);
 * // Returns: 2025-01-15 12:45:45
 *
 * // Minutes outside 0-59 roll over to adjacent hours
 * const result4 = setMinutes(new Date(2025, 0, 15, 12, 30, 45), 60);
 * // Returns: 2025-01-15 13:00:45 (rolls over to next hour)
 *
 * // Invalid date returns Invalid Date
 * const result5 = setMinutes(new Date("invalid"), 30);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (45.9 → 45, -45.9 → -45)
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Preserves year, month, day, hour, seconds, and milliseconds components
 * - Values outside 0-59 cause rollover: 60 → next hour, -1 → previous hour
 * - Always returns a new Date instance (does not mutate input)
 */
declare function setMinutes(date: Date | number, minutes: number): Date;

/**
 * Set the seconds of the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified seconds set. Fractional seconds are truncated toward zero.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param seconds - The seconds to set (0-59 for normal range, other values will roll over)
 * @returns A new Date object with the seconds set, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Set seconds to 30
 * const result = setSeconds(new Date(2025, 0, 15, 12, 30, 45), 30);
 * // Returns: 2025-01-15 12:30:30
 *
 * // Set seconds to 0 (start of minute)
 * const result2 = setSeconds(new Date(2025, 0, 15, 12, 30, 45), 0);
 * // Returns: 2025-01-15 12:30:00
 *
 * // Seconds rollover to next minute
 * const result3 = setSeconds(new Date(2025, 0, 15, 12, 30, 45), 60);
 * // Returns: 2025-01-15 12:31:00
 *
 * // Fractional seconds are truncated
 * const result4 = setSeconds(new Date(2025, 0, 15, 12, 30, 45), 30.9);
 * // Returns: 2025-01-15 12:30:30
 *
 * // Invalid date returns Invalid Date
 * const result5 = setSeconds(new Date("invalid"), 30);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (30.9 → 30, -30.9 → -30)
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Preserves year, month, day, hours, minutes, and milliseconds components
 * - Seconds outside 0-59 range cause rollover to adjacent minutes (60 → next minute, -1 → previous minute)
 * - Always returns a new Date instance (does not mutate input)
 */
declare function setSeconds(date: Date | number, seconds: number): Date;

/**
 * Set the complete timestamp of the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified timestamp. Unlike other setters that modify components (year, month, etc.),
 * setTime replaces the entire timestamp value.
 *
 * @param date - The base date as a Date object
 * @param time - The timestamp in milliseconds since Unix epoch (January 1, 1970, 00:00:00 UTC)
 * @returns A new Date object with the timestamp set, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Set to a specific timestamp
 * const result = setTime(new Date(), 1704067200000);
 * // Returns: 2024-01-01T00:00:00.000Z
 *
 * // Set to Unix epoch
 * const result2 = setTime(new Date(), 0);
 * // Returns: 1970-01-01T00:00:00.000Z
 *
 * // Set to negative timestamp (before epoch)
 * const result3 = setTime(new Date(), -86400000);
 * // Returns: 1969-12-31T00:00:00.000Z
 *
 * // Fractional milliseconds are preserved
 * const result4 = setTime(new Date(), 1.5);
 * // Returns: timestamp with 1.5 milliseconds (truncated by Date API)
 *
 * // Invalid timestamp returns Invalid Date
 * const result5 = setTime(new Date(), NaN);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts only Date objects (not numeric timestamps) as the first argument
 * - Returns Invalid Date for: Invalid Date input, NaN, Infinity, -Infinity
 * - Valid timestamp range: -8.64e15 to 8.64e15 milliseconds
 * - Timestamps outside this range create Invalid Date
 * - Always returns a new Date instance (does not mutate input)
 * - This function replaces all date/time components at once (unlike setYear, setMonth, etc.)
 */
declare function setTime(date: Date, time: number): Date;

/**
 * Set the milliseconds of the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified milliseconds set. Fractional milliseconds are truncated toward zero.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param milliseconds - The milliseconds to set (typically 0-999, fractions are truncated)
 * @returns A new Date object with the milliseconds set, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Set milliseconds to a typical value
 * const result = setMilliseconds(new Date(2025, 0, 15, 12, 30, 45, 123), 500);
 * // Returns: 2025-01-15 12:30:45.500
 *
 * // Set milliseconds to minimum value
 * const result2 = setMilliseconds(new Date(2025, 0, 15, 12, 30, 45, 123), 0);
 * // Returns: 2025-01-15 12:30:45.000
 *
 * // Rollover to next second with value >= 1000
 * const result3 = setMilliseconds(new Date(2025, 0, 15, 12, 30, 45, 500), 1000);
 * // Returns: 2025-01-15 12:30:46.000
 *
 * // Fractional milliseconds are truncated
 * const result4 = setMilliseconds(new Date(2025, 0, 15, 12, 30, 45, 123), 500.9);
 * // Returns: 2025-01-15 12:30:45.500
 *
 * // Invalid date returns Invalid Date
 * const result5 = setMilliseconds(new Date("invalid"), 500);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (500.9 → 500, -500.9 → -500)
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Preserves year, month, day, and time components (hours, minutes, seconds)
 * - Special handling: Values outside 0-999 cause rollover to adjacent seconds (1000 → next second, -1 → previous second)
 * - Always returns a new Date instance (does not mutate input)
 */
declare function setMilliseconds(date: Date | number, milliseconds: number): Date;

/**
 * Check if the first date is strictly after the second date.
 *
 * This function compares two dates and returns true if the first date is chronologically
 * after the second date. The comparison can be performed at different granularities
 * (year, month, day, hour, minute, second, or millisecond).
 *
 * @param a - The first date as a Date object or timestamp (number)
 * @param b - The second date as a Date object or timestamp (number)
 * @param opts - Optional configuration object
 * @param opts.unit - The unit of comparison (year, month, day, hour, minute, second, millisecond). Defaults to "millisecond"
 * @returns True if date `a` is after date `b`, false otherwise or if either date is invalid
 *
 * @example
 * ```typescript
 * // Basic comparison (millisecond precision)
 * const result = isAfter(new Date(2025, 0, 2), new Date(2025, 0, 1));
 * // Returns: true
 *
 * // Compare at year granularity
 * const result2 = isAfter(
 *   new Date(2025, 0, 1),
 *   new Date(2024, 11, 31),
 *   { unit: "year" }
 * );
 * // Returns: true
 *
 * // Works with timestamps
 * const result3 = isAfter(Date.now(), Date.now() - 1000);
 * // Returns: true (current time is after 1 second ago)
 *
 * // Equality returns false (not strictly after)
 * const date = new Date(2025, 0, 1);
 * const result4 = isAfter(date, date);
 * // Returns: false
 *
 * // Invalid dates return false
 * const result5 = isAfter(new Date("invalid"), new Date(2025, 0, 1));
 * // Returns: false
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Returns false for any invalid input (Invalid Date, NaN, Infinity, -Infinity)
 * - Accepts both Date objects and numeric timestamps
 * - Equality is not considered "after" (strict comparison)
 * - When using unit-based comparison, dates are truncated to the specified unit before comparing
 * - Unit comparison example: comparing by "day" ignores hours, minutes, seconds, and milliseconds
 */
declare function isAfter(a: Date | number, b: Date | number, opts?: {
    unit?: TimeUnit;
}): boolean;

/**
 * Check if the first date is after or equal to the second date.
 *
 * This function compares two dates and returns true if the first date is chronologically
 * after or equal to the second date. The comparison can be performed at different granularities
 * (year, month, day, hour, minute, second, or millisecond).
 *
 * @param a - The first date as a Date object or timestamp (number)
 * @param b - The second date as a Date object or timestamp (number)
 * @param opts - Optional configuration object
 * @param opts.unit - The unit of comparison (year, month, day, hour, minute, second, millisecond). Defaults to "millisecond"
 * @returns True if date `a` is after or equal to date `b`, false otherwise or if either date is invalid
 *
 * @example
 * ```typescript
 * // Basic comparison (millisecond precision)
 * const result = isAfterOrEqual(new Date(2025, 0, 2), new Date(2025, 0, 1));
 * // Returns: true
 *
 * // Equality returns true
 * const date = new Date(2025, 0, 1);
 * const result2 = isAfterOrEqual(date, date);
 * // Returns: true
 *
 * // Compare at day granularity
 * const result3 = isAfterOrEqual(
 *   new Date(2025, 0, 1, 23, 59),
 *   new Date(2025, 0, 1, 0, 0),
 *   { unit: "day" }
 * );
 * // Returns: true (same day)
 *
 * // Works with timestamps
 * const result4 = isAfterOrEqual(Date.now(), Date.now() - 1000);
 * // Returns: true (current time is after 1 second ago)
 *
 * // Invalid dates return false
 * const result5 = isAfterOrEqual(new Date("invalid"), new Date(2025, 0, 1));
 * // Returns: false
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Returns false for any invalid input (Invalid Date, NaN, Infinity, -Infinity)
 * - Accepts both Date objects and numeric timestamps
 * - Includes equality in the comparison (a >= b)
 * - When using unit-based comparison, dates are truncated to the specified unit before comparing
 * - Unit comparison example: comparing by "day" ignores hours, minutes, seconds, and milliseconds
 */
declare function isAfterOrEqual(a: Date | number, b: Date | number, opts?: {
    unit?: TimeUnit;
}): boolean;

/**
 * Check if the first date is strictly before the second date.
 *
 * This function compares two dates and returns true if the first date is chronologically
 * before the second date. The comparison can be performed at different granularities
 * (year, month, day, hour, minute, second, or millisecond).
 *
 * @param a - The first date as a Date object or timestamp (number)
 * @param b - The second date as a Date object or timestamp (number)
 * @param opts - Optional configuration object
 * @param opts.unit - The unit of comparison (year, month, day, hour, minute, second, millisecond). Defaults to "millisecond"
 * @returns True if date `a` is before date `b`, false otherwise or if either date is invalid
 *
 * @example
 * ```typescript
 * // Basic comparison (millisecond precision)
 * const result = isBefore(new Date(2025, 0, 1), new Date(2025, 0, 2));
 * // Returns: true
 *
 * // Compare at year granularity
 * const result2 = isBefore(
 *   new Date(2024, 11, 31),
 *   new Date(2025, 0, 1),
 *   { unit: "year" }
 * );
 * // Returns: true
 *
 * // Works with timestamps
 * const result3 = isBefore(Date.now() - 1000, Date.now());
 * // Returns: true (1 second ago is before current time)
 *
 * // Equality returns false (not strictly before)
 * const date = new Date(2025, 0, 1);
 * const result4 = isBefore(date, date);
 * // Returns: false
 *
 * // Invalid dates return false
 * const result5 = isBefore(new Date("invalid"), new Date(2025, 0, 1));
 * // Returns: false
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Returns false for any invalid input (Invalid Date, NaN, Infinity, -Infinity)
 * - Accepts both Date objects and numeric timestamps
 * - Equality is not considered "before" (strict comparison)
 * - When using unit-based comparison, dates are truncated to the specified unit before comparing
 * - Unit comparison example: comparing by "day" ignores hours, minutes, seconds, and milliseconds
 */
declare function isBefore(a: Date | number, b: Date | number, opts?: {
    unit?: TimeUnit;
}): boolean;

/**
 * Check if the first date is before or equal to the second date.
 *
 * This function compares two dates and returns true if the first date is chronologically
 * before or equal to the second date. The comparison can be performed at different granularities
 * (year, month, day, hour, minute, second, or millisecond).
 *
 * @param a - The first date as a Date object or timestamp (number)
 * @param b - The second date as a Date object or timestamp (number)
 * @param opts - Optional configuration object
 * @param opts.unit - The unit of comparison (year, month, day, hour, minute, second, millisecond). Defaults to "millisecond"
 * @returns True if date `a` is before or equal to date `b`, false otherwise or if either date is invalid
 *
 * @example
 * ```typescript
 * // Basic comparison (millisecond precision)
 * const result = isBeforeOrEqual(new Date(2025, 0, 1), new Date(2025, 0, 2));
 * // Returns: true
 *
 * // Equality returns true
 * const date = new Date(2025, 0, 1);
 * const result2 = isBeforeOrEqual(date, date);
 * // Returns: true
 *
 * // Compare at day granularity
 * const result3 = isBeforeOrEqual(
 *   new Date(2025, 0, 1, 0, 0),
 *   new Date(2025, 0, 1, 23, 59),
 *   { unit: "day" }
 * );
 * // Returns: true (same day)
 *
 * // Works with timestamps
 * const result4 = isBeforeOrEqual(Date.now() - 1000, Date.now());
 * // Returns: true (1 second ago is before current time)
 *
 * // Invalid dates return false
 * const result5 = isBeforeOrEqual(new Date("invalid"), new Date(2025, 0, 1));
 * // Returns: false
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Returns false for any invalid input (Invalid Date, NaN, Infinity, -Infinity)
 * - Accepts both Date objects and numeric timestamps
 * - Includes equality in the comparison (a <= b)
 * - When using unit-based comparison, dates are truncated to the specified unit before comparing
 * - Unit comparison example: comparing by "day" ignores hours, minutes, seconds, and milliseconds
 */
declare function isBeforeOrEqual(a: Date | number, b: Date | number, opts?: {
    unit?: TimeUnit;
}): boolean;

/**
 * Check if a date falls between two boundary dates with configurable inclusion.
 *
 * This function checks whether a date falls within an interval defined by start and end boundaries.
 * The inclusion of boundaries can be controlled using mathematical interval notation.
 *
 * @param date - The date to check as a Date object or timestamp (number)
 * @param interval - Interval object with start and end boundaries (can be null for open-ended intervals)
 * @param opts - Optional configuration for boundary inclusion
 * @param opts.bounds - Boundary inclusion mode: "()" excludes both, "[]" includes both, "[)" includes start only, "(]" includes end only. Defaults to "()"
 * @returns True if date is between the boundaries according to the bounds configuration, false otherwise
 *
 * @example
 * ```typescript
 * // Default behavior (exclusive boundaries)
 * const result = isBetween(
 *   new Date(2024, 5, 15),
 *   { start: new Date(2024, 5, 10), end: new Date(2024, 5, 20) }
 * );
 * // Returns: true
 *
 * // Inclusive boundaries
 * const result2 = isBetween(
 *   new Date(2024, 5, 10),
 *   { start: new Date(2024, 5, 10), end: new Date(2024, 5, 20) },
 *   { bounds: "[]" }
 * );
 * // Returns: true (boundary is included)
 *
 * // Open-ended interval (null end uses MAX_DATE)
 * const result3 = isBetween(
 *   new Date(2025, 0, 1),
 *   { start: new Date(2024, 0, 1), end: null }
 * );
 * // Returns: true (any date after start)
 *
 * // Works with timestamps
 * const result4 = isBetween(
 *   Date.now(),
 *   { start: Date.now() - 1000, end: Date.now() + 1000 }
 * );
 * // Returns: true (within 1 second window)
 *
 * // Invalid inputs return false
 * const result5 = isBetween(new Date("invalid"), { start: new Date(2024, 0, 1), end: new Date(2024, 11, 31) });
 * // Returns: false
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Returns false for any invalid input (Invalid Date, NaN, Infinity, -Infinity, or invalid interval)
 * - Accepts both Date objects and numeric timestamps
 * - If start is null, uses MIN_DATE as the lower bound
 * - If end is null, uses MAX_DATE as the upper bound
 * - Boundary inclusion is controlled by the `bounds` option using mathematical interval notation:
 *   - "()" - Both boundaries excluded (default, for backward compatibility)
 *   - "[]" - Both boundaries included
 *   - "[)" - Start included, end excluded
 *   - "(]" - Start excluded, end included
 * - Invalid bounds values default to "()" behavior
 */
declare function isBetween(date: Date | number, interval: Interval, opts?: BetweenOption): boolean;

/**
 * Check if two dates are equal.
 *
 * This function compares two dates and returns true if they represent the same point in time.
 * The comparison can be performed at different granularities (year, month, day, hour, minute,
 * second, or millisecond).
 *
 * @param a - The first date as a Date object or timestamp (number)
 * @param b - The second date as a Date object or timestamp (number)
 * @param opts - Optional configuration object
 * @param opts.unit - The unit of comparison (year, month, day, hour, minute, second, millisecond). Defaults to "millisecond"
 * @returns True if date `a` is equal to date `b`, false otherwise or if either date is invalid
 *
 * @example
 * ```typescript
 * // Basic comparison (millisecond precision)
 * const date1 = new Date(2025, 0, 1, 12, 0, 0);
 * const date2 = new Date(2025, 0, 1, 12, 0, 0);
 * const result = isEqual(date1, date2);
 * // Returns: true
 *
 * // Compare at day granularity
 * const result2 = isEqual(
 *   new Date(2025, 0, 1, 9, 0),
 *   new Date(2025, 0, 1, 17, 0),
 *   { unit: "day" }
 * );
 * // Returns: true (same day, different times)
 *
 * // Works with timestamps
 * const timestamp = Date.now();
 * const result3 = isEqual(timestamp, new Date(timestamp));
 * // Returns: true
 *
 * // Different dates return false
 * const result4 = isEqual(new Date(2025, 0, 1), new Date(2025, 0, 2));
 * // Returns: false
 *
 * // Invalid dates return false
 * const result5 = isEqual(new Date("invalid"), new Date(2025, 0, 1));
 * // Returns: false
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Returns false for any invalid input (Invalid Date, NaN, Infinity, -Infinity)
 * - Accepts both Date objects and numeric timestamps
 * - When using unit-based comparison, dates are truncated to the specified unit before comparing
 * - Unit comparison example: comparing by "day" ignores hours, minutes, seconds, and milliseconds
 * - Two dates with the same timestamp are always equal (at millisecond precision)
 */
declare function isEqual(a: Date | number, b: Date | number, opts?: {
    unit?: TimeUnit;
}): boolean;

/**
 * Check if the given value is a valid Date or timestamp.
 *
 * This function validates whether a Date object or timestamp represents a valid date.
 * It returns false for Invalid Date, NaN, Infinity, and -Infinity values.
 *
 * @param date - The Date object or timestamp (number) to validate
 * @returns True if the date is valid, false otherwise
 *
 * @example
 * ```typescript
 * // Valid Date object
 * const result = isValid(new Date(2025, 0, 1));
 * // Returns: true
 *
 * // Valid timestamp
 * const result2 = isValid(Date.now());
 * // Returns: true
 *
 * // Zero timestamp (Unix epoch)
 * const result3 = isValid(0);
 * // Returns: true
 *
 * // Invalid Date
 * const result4 = isValid(new Date("invalid"));
 * // Returns: false
 *
 * // Invalid timestamp
 * const result5 = isValid(NaN);
 * // Returns: false
 * ```
 *
 * @remarks
 * - Validates arguments using internal validation utilities for optimal performance
 * - Accepts both Date objects and numeric timestamps
 * - Returns false for: Invalid Date, NaN, Infinity, -Infinity
 * - Returns true for all finite numeric timestamps, including 0 (Unix epoch) and negative values
 * - Uses the same validation logic as other library functions for consistency
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
 * This function validates arguments before processing and returns a new Date instance
 * with the specified number of days subtracted. Fractional days are truncated toward zero.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param amount - The number of days to subtract (can be negative to add)
 * @returns A new Date object with the days subtracted, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Subtract positive days
 * const result = subDays(new Date(2025, 0, 10), 5);
 * // Returns: 2025-01-05
 *
 * // Add days (negative amount)
 * const result = subDays(new Date(2025, 0, 10), -3);
 * // Returns: 2025-01-13
 *
 * // Works with timestamps
 * const timestamp = Date.now();
 * const result = subDays(timestamp, 7);
 * // Returns: Date 7 days ago from now
 *
 * // Fractional amounts are truncated
 * const result = subDays(new Date(2025, 0, 5), 1.9);
 * // Returns: 2025-01-04 (1.9 truncated to 1)
 *
 * // Invalid inputs return Invalid Date
 * const result = subDays(new Date("invalid"), 5);
 * // Returns: Invalid Date
 *
 * const result = subDays(new Date(2025, 0, 1), NaN);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (1.9 → 1, -1.9 → -1)
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Always returns a new Date instance (does not mutate input)
 */
declare function subDays(date: Date | number, amount: number): Date;

/**
 * Subtract the specified number of hours from the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified number of hours subtracted. Fractional hours are truncated toward zero.
 * Minutes, seconds, and milliseconds are preserved.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param amount - The number of hours to subtract (can be negative to add)
 * @returns A new Date object with the hours subtracted, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Subtract positive hours
 * const result = subHours(new Date(2025, 0, 15, 18, 0, 0), 5);
 * // Returns: 2025-01-15 13:00:00
 *
 * // Add hours (negative amount)
 * const result = subHours(new Date(2025, 0, 15, 10, 30, 0), -3);
 * // Returns: 2025-01-15 13:30:00
 *
 * // Fractional amounts are truncated
 * const result = subHours(new Date(2025, 0, 15, 15, 0, 0), 1.9);
 * // Returns: 2025-01-15 14:00:00 (1.9 truncated to 1)
 *
 * // Crosses day boundary
 * const result = subHours(new Date(2025, 0, 15, 2, 0, 0), 4);
 * // Returns: 2025-01-14 22:00:00
 *
 * // Invalid inputs return Invalid Date
 * const result = subHours(new Date("invalid"), 3);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (1.9 → 1, -1.9 → -1)
 * - Preserves minutes, seconds, and milliseconds
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Always returns a new Date instance (does not mutate input)
 */
declare function subHours(date: Date | number, amount: number): Date;

/**
 * Subtract the specified number of milliseconds from the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified number of milliseconds subtracted. Fractional milliseconds are truncated toward zero.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param amount - The number of milliseconds to subtract (can be negative to add)
 * @returns A new Date object with the milliseconds subtracted, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Subtract positive milliseconds
 * const result = subMilliseconds(new Date(2020, 0, 1, 12, 0, 0, 500), 300);
 * // Returns: 2020-01-01T12:00:00.200
 *
 * // Add milliseconds (negative amount)
 * const result = subMilliseconds(new Date(2020, 0, 1, 12, 0, 0, 200), -300);
 * // Returns: 2020-01-01T12:00:00.500
 *
 * // Fractional amounts are truncated
 * const result = subMilliseconds(new Date(2020, 0, 1, 12, 0, 0, 100), 1.9);
 * // Returns: 2020-01-01T12:00:00.099 (1.9 truncated to 1)
 *
 * // Crossing second boundary backward
 * const result = subMilliseconds(new Date(2020, 0, 1, 12, 0, 1, 0), 1);
 * // Returns: 2020-01-01T12:00:00.999
 *
 * // Invalid inputs return Invalid Date
 * const result = subMilliseconds(new Date("invalid"), 500);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (1.9 → 1, -1.9 → -1)
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Always returns a new Date instance (does not mutate input)
 */
declare function subMilliseconds(date: Date | number, amount: number): Date;

/**
 * Subtract the specified number of minutes from the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified number of minutes subtracted. Fractional minutes are truncated toward zero.
 * Preserves seconds and milliseconds.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param amount - The number of minutes to subtract (can be negative to add)
 * @returns A new Date object with the minutes subtracted, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Subtract positive minutes
 * const result = subMinutes(new Date(2020, 0, 1, 12, 30, 0), 15);
 * // Returns: 2020-01-01T12:15:00
 *
 * // Add minutes (negative amount)
 * const result = subMinutes(new Date(2020, 0, 1, 12, 30, 0), -15);
 * // Returns: 2020-01-01T12:45:00
 *
 * // Fractional amounts are truncated
 * const result = subMinutes(new Date(2020, 0, 1, 12, 30, 0), 1.9);
 * // Returns: 2020-01-01T12:29:00 (1.9 truncated to 1)
 *
 * // Crossing hour boundary
 * const result = subMinutes(new Date(2020, 0, 1, 12, 15, 0), 30);
 * // Returns: 2020-01-01T11:45:00
 *
 * // Invalid inputs return Invalid Date
 * const result = subMinutes(new Date("invalid"), 30);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (1.9 → 1, -1.9 → -1)
 * - Preserves seconds and milliseconds
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Always returns a new Date instance (does not mutate input)
 */
declare function subMinutes(date: Date | number, amount: number): Date;

/**
 * Subtract the specified number of months from the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified number of months subtracted. Fractional months are truncated toward zero.
 * Preserves time components (hours, minutes, seconds, milliseconds). When the day of month
 * doesn't exist in the target month, the result becomes the last day of that month.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param amount - The number of months to subtract (can be negative to add)
 * @returns A new Date object with the months subtracted, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Subtract positive months
 * const result = subMonths(new Date(2020, 3, 15), 3);
 * // Returns: 2020-01-15
 *
 * // Add months (negative amount)
 * const result = subMonths(new Date(2020, 3, 15), -2);
 * // Returns: 2020-05-15
 *
 * // Fractional amounts are truncated
 * const result = subMonths(new Date(2020, 3, 15), 1.9);
 * // Returns: 2020-02-15 (1.9 truncated to 1)
 *
 * // Month-end overflow handling (Mar 31 → Feb 28/29)
 * const result = subMonths(new Date(2025, 2, 31), 1);
 * // Returns: 2025-02-28 (Feb doesn't have 31 days)
 *
 * // Leap year handling
 * const result = subMonths(new Date(2024, 2, 31), 1);
 * // Returns: 2024-02-29 (2024 is a leap year)
 *
 * // Invalid inputs return Invalid Date
 * const result = subMonths(new Date("invalid"), 3);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (1.9 → 1, -1.9 → -1)
 * - Preserves time components (hours, minutes, seconds, milliseconds)
 * - Month-end overflow: if original day doesn't exist in target month, returns last day of that month
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Always returns a new Date instance (does not mutate input)
 */
declare function subMonths(date: Date | number, amount: number): Date;

/**
 * Subtract the specified number of seconds from the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified number of seconds subtracted. Fractional seconds are truncated toward zero.
 * Preserves milliseconds.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param amount - The number of seconds to subtract (can be negative to add)
 * @returns A new Date object with the seconds subtracted, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Subtract positive seconds
 * const result = subSeconds(new Date(2020, 0, 1, 12, 30, 45), 15);
 * // Returns: 2020-01-01T12:30:30
 *
 * // Add seconds (negative amount)
 * const result = subSeconds(new Date(2020, 0, 1, 12, 30, 30), -15);
 * // Returns: 2020-01-01T12:30:45
 *
 * // Fractional amounts are truncated
 * const result = subSeconds(new Date(2020, 0, 1, 12, 0, 30), 1.9);
 * // Returns: 2020-01-01T12:00:29 (1.9 truncated to 1)
 *
 * // Crossing minute boundary
 * const result = subSeconds(new Date(2020, 0, 1, 12, 31, 15), 30);
 * // Returns: 2020-01-01T12:30:45
 *
 * // Invalid inputs return Invalid Date
 * const result = subSeconds(new Date("invalid"), 30);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (1.9 → 1, -1.9 → -1)
 * - Preserves milliseconds
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Always returns a new Date instance (does not mutate input)
 */
declare function subSeconds(date: Date | number, amount: number): Date;

/**
 * Subtract the specified number of years from the given date.
 *
 * This function validates arguments before processing and returns a new Date instance
 * with the specified number of years subtracted. Fractional years are truncated toward zero.
 * Preserves month, day, and time components. When the source date is Feb 29 and the target
 * year is not a leap year, the result becomes Feb 28.
 *
 * @param date - The base date as a Date object or timestamp (number)
 * @param amount - The number of years to subtract (can be negative to add)
 * @returns A new Date object with the years subtracted, or Invalid Date if any input is invalid
 *
 * @example
 * ```typescript
 * // Subtract positive years
 * const result = subYears(new Date(2020, 0, 15), 3);
 * // Returns: 2017-01-15
 *
 * // Add years (negative amount)
 * const result = subYears(new Date(2020, 0, 15), -3);
 * // Returns: 2023-01-15
 *
 * // Fractional amounts are truncated
 * const result = subYears(new Date(2020, 0, 1), 1.9);
 * // Returns: 2019-01-01 (1.9 truncated to 1)
 *
 * // Leap year to non-leap year (Feb 29 → Feb 28)
 * const result = subYears(new Date(2024, 1, 29), 1);
 * // Returns: 2023-02-28 (2023 is not a leap year)
 *
 * // Leap year to leap year (Feb 29 → Feb 29)
 * const result = subYears(new Date(2024, 1, 29), 4);
 * // Returns: 2020-02-29 (2020 is a leap year)
 *
 * // Invalid inputs return Invalid Date
 * const result = subYears(new Date("invalid"), 3);
 * // Returns: Invalid Date
 * ```
 *
 * @remarks
 * - Validates arguments before conversion (consistent with library patterns)
 * - Accepts both Date objects and numeric timestamps
 * - Fractions are truncated using Math.trunc (1.9 → 1, -1.9 → -1)
 * - Preserves month, day, and time components (hours, minutes, seconds, milliseconds)
 * - Leap year adjustment: Feb 29 → Feb 28 when target year is not a leap year
 * - Returns Invalid Date for: Invalid Date, NaN, Infinity, -Infinity
 * - Always returns a new Date instance (does not mutate input)
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
 * This function compares two dates and returns true if they fall within the same calendar year,
 * regardless of month, day, or time components.
 *
 * @param dateLeft - The first date as a Date object or timestamp (number)
 * @param dateRight - The second date as a Date object or timestamp (number)
 * @returns True if both dates are in the same year, false otherwise or if either date is invalid
 *
 * @example
 * ```typescript
 * // Same year, different months
 * const result = isSameYear(new Date(2024, 0, 1), new Date(2024, 11, 31));
 * // Returns: true
 *
 * // Different years
 * const result2 = isSameYear(new Date(2024, 11, 31), new Date(2025, 0, 1));
 * // Returns: false
 *
 * // Same year, different times
 * const result3 = isSameYear(
 *   new Date(2024, 5, 15, 14, 30),
 *   new Date(2024, 8, 20, 9, 45)
 * );
 * // Returns: true
 *
 * // Works with timestamps
 * const result4 = isSameYear(Date.now(), Date.now());
 * // Returns: true
 *
 * // Invalid dates return false
 * const result5 = isSameYear(new Date("invalid"), new Date(2024, 0, 1));
 * // Returns: false
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Returns false for any invalid input (Invalid Date, NaN, Infinity, -Infinity)
 * - Accepts both Date objects and numeric timestamps
 * - Ignores month, day, and time components in the comparison
 * - Uses diffYears internally to determine if the year difference is zero
 * - Handles leap years, BC dates, and century boundaries correctly
 */
declare function isSameYear(dateLeft: Date | number, dateRight: Date | number): boolean;

/**
 * Check if two dates are in the same calendar month and year.
 *
 * This function compares two dates and returns true if they fall within the same calendar month
 * and year, regardless of day or time components.
 *
 * @param dateLeft - The first date as a Date object or timestamp (number)
 * @param dateRight - The second date as a Date object or timestamp (number)
 * @returns True if both dates are in the same month and year, false otherwise or if either date is invalid
 *
 * @example
 * ```typescript
 * // Same month and year, different days
 * const result = isSameMonth(new Date(2024, 5, 1), new Date(2024, 5, 30));
 * // Returns: true
 *
 * // Different months
 * const result2 = isSameMonth(new Date(2024, 5, 30), new Date(2024, 6, 1));
 * // Returns: false
 *
 * // Same month and year, different times
 * const result3 = isSameMonth(
 *   new Date(2024, 5, 15, 14, 30),
 *   new Date(2024, 5, 20, 9, 45)
 * );
 * // Returns: true
 *
 * // Same month, different years
 * const result4 = isSameMonth(new Date(2024, 5, 15), new Date(2023, 5, 15));
 * // Returns: false (different years)
 *
 * // Invalid dates return false
 * const result5 = isSameMonth(new Date("invalid"), new Date(2024, 5, 1));
 * // Returns: false
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Returns false for any invalid input (Invalid Date, NaN, Infinity, -Infinity)
 * - Accepts both Date objects and numeric timestamps
 * - Ignores day and time components in the comparison
 * - Requires both month AND year to match (June 2024 ≠ June 2023)
 * - Uses diffMonths internally to determine if the month difference is zero
 * - Handles month boundaries and leap years correctly
 */
declare function isSameMonth(dateLeft: Date | number, dateRight: Date | number): boolean;

/**
 * Check if two dates are on the same calendar day.
 *
 * This function compares two dates and returns true if they fall on the same calendar day,
 * regardless of time components.
 *
 * @param dateLeft - The first date as a Date object or timestamp (number)
 * @param dateRight - The second date as a Date object or timestamp (number)
 * @returns True if both dates are on the same day, false otherwise or if either date is invalid
 *
 * @example
 * ```typescript
 * // Same day, different times
 * const result = isSameDay(
 *   new Date(2024, 5, 15, 0, 0),
 *   new Date(2024, 5, 15, 23, 59)
 * );
 * // Returns: true
 *
 * // Different days
 * const result2 = isSameDay(
 *   new Date(2024, 5, 15, 23, 59),
 *   new Date(2024, 5, 16, 0, 0)
 * );
 * // Returns: false
 *
 * // Same day, different times (with seconds)
 * const result3 = isSameDay(
 *   new Date(2024, 5, 15, 14, 30, 45),
 *   new Date(2024, 5, 15, 9, 15, 20)
 * );
 * // Returns: true
 *
 * // Works with timestamps
 * const today = new Date(2024, 5, 15);
 * const result4 = isSameDay(today.getTime(), today);
 * // Returns: true
 *
 * // Invalid dates return false
 * const result5 = isSameDay(new Date("invalid"), new Date(2024, 5, 15));
 * // Returns: false
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Returns false for any invalid input (Invalid Date, NaN, Infinity, -Infinity)
 * - Accepts both Date objects and numeric timestamps
 * - Ignores hour, minute, second, and millisecond components in the comparison
 * - Compares based on local timezone calendar day
 * - Uses diffDays internally to determine if the day difference is zero
 * - Handles DST transitions and leap years correctly
 */
declare function isSameDay(dateLeft: Date | number, dateRight: Date | number): boolean;

/**
 * Check if two dates are in the same hour.
 *
 * This function compares two dates and returns true if they fall within the same hour,
 * regardless of minutes, seconds, or milliseconds.
 *
 * @param dateLeft - The first date as a Date object or timestamp (number)
 * @param dateRight - The second date as a Date object or timestamp (number)
 * @returns True if both dates are in the same hour, false otherwise or if either date is invalid
 *
 * @example
 * ```typescript
 * // Same hour, different minutes
 * const result = isSameHour(
 *   new Date(2024, 5, 15, 14, 0, 0),
 *   new Date(2024, 5, 15, 14, 59, 59)
 * );
 * // Returns: true
 *
 * // Different hours
 * const result2 = isSameHour(
 *   new Date(2024, 5, 15, 14, 59, 59),
 *   new Date(2024, 5, 15, 15, 0, 0)
 * );
 * // Returns: false
 *
 * // Same hour, different minutes and seconds
 * const result3 = isSameHour(
 *   new Date(2024, 5, 15, 14, 30, 45),
 *   new Date(2024, 5, 15, 14, 15, 20)
 * );
 * // Returns: true
 *
 * // Same hour of day, different days
 * const result4 = isSameHour(
 *   new Date(2024, 5, 15, 14, 30),
 *   new Date(2024, 5, 16, 14, 30)
 * );
 * // Returns: false (different days)
 *
 * // Invalid dates return false
 * const result5 = isSameHour(new Date("invalid"), new Date(2024, 5, 15, 14, 0));
 * // Returns: false
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Returns false for any invalid input (Invalid Date, NaN, Infinity, -Infinity)
 * - Accepts both Date objects and numeric timestamps
 * - Ignores minute, second, and millisecond components in the comparison
 * - Requires year, month, day, AND hour to match
 * - Uses diffHours internally to determine if the hour difference is zero
 * - Handles DST transitions correctly
 */
declare function isSameHour(dateLeft: Date | number, dateRight: Date | number): boolean;

/**
 * Check if two dates are in the same minute.
 *
 * This function compares two dates and returns true if they fall within the same minute,
 * regardless of seconds or milliseconds.
 *
 * @param dateLeft - The first date as a Date object or timestamp (number)
 * @param dateRight - The second date as a Date object or timestamp (number)
 * @returns True if both dates are in the same minute, false otherwise or if either date is invalid
 *
 * @example
 * ```typescript
 * // Same minute, different seconds
 * const result = isSameMinute(
 *   new Date(2024, 5, 15, 14, 30, 0),
 *   new Date(2024, 5, 15, 14, 30, 59)
 * );
 * // Returns: true
 *
 * // Different minutes
 * const result2 = isSameMinute(
 *   new Date(2024, 5, 15, 14, 30, 59),
 *   new Date(2024, 5, 15, 14, 31, 0)
 * );
 * // Returns: false
 *
 * // Same minute, different seconds and milliseconds
 * const result3 = isSameMinute(
 *   new Date(2024, 5, 15, 14, 30, 15, 500),
 *   new Date(2024, 5, 15, 14, 30, 45, 800)
 * );
 * // Returns: true
 *
 * // Same minute of hour, different hours
 * const result4 = isSameMinute(
 *   new Date(2024, 5, 15, 14, 30),
 *   new Date(2024, 5, 15, 15, 30)
 * );
 * // Returns: false (different hours)
 *
 * // Invalid dates return false
 * const result5 = isSameMinute(new Date("invalid"), new Date(2024, 5, 15, 14, 30));
 * // Returns: false
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Returns false for any invalid input (Invalid Date, NaN, Infinity, -Infinity)
 * - Accepts both Date objects and numeric timestamps
 * - Ignores second and millisecond components in the comparison
 * - Requires year, month, day, hour, AND minute to match
 * - Uses diffMinutes internally to determine if the minute difference is zero
 * - Handles DST transitions correctly
 */
declare function isSameMinute(dateLeft: Date | number, dateRight: Date | number): boolean;

/**
 * Check if two dates are in the same second.
 *
 * This function compares two dates and returns true if they fall within the same second,
 * regardless of milliseconds.
 *
 * @param dateLeft - The first date as a Date object or timestamp (number)
 * @param dateRight - The second date as a Date object or timestamp (number)
 * @returns True if both dates are in the same second, false otherwise or if either date is invalid
 *
 * @example
 * ```typescript
 * // Same second, different milliseconds
 * const result = isSameSecond(
 *   new Date(2024, 5, 15, 14, 30, 45, 0),
 *   new Date(2024, 5, 15, 14, 30, 45, 999)
 * );
 * // Returns: true
 *
 * // Different seconds
 * const result2 = isSameSecond(
 *   new Date(2024, 5, 15, 14, 30, 45, 999),
 *   new Date(2024, 5, 15, 14, 30, 46, 0)
 * );
 * // Returns: false
 *
 * // Same second, different milliseconds
 * const result3 = isSameSecond(
 *   new Date(2024, 5, 15, 14, 30, 45, 123),
 *   new Date(2024, 5, 15, 14, 30, 45, 456)
 * );
 * // Returns: true
 *
 * // Same second of minute, different minutes
 * const result4 = isSameSecond(
 *   new Date(2024, 5, 15, 14, 30, 45),
 *   new Date(2024, 5, 15, 14, 31, 45)
 * );
 * // Returns: false (different minutes)
 *
 * // Invalid dates return false
 * const result5 = isSameSecond(new Date("invalid"), new Date(2024, 5, 15, 14, 30, 45));
 * // Returns: false
 * ```
 *
 * @remarks
 * - Validates arguments before processing (consistent with library patterns)
 * - Returns false for any invalid input (Invalid Date, NaN, Infinity, -Infinity)
 * - Accepts both Date objects and numeric timestamps
 * - Ignores millisecond component in the comparison
 * - Requires year, month, day, hour, minute, AND second to match
 * - Uses diffSeconds internally to determine if the second difference is zero
 * - Handles DST transitions correctly
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
