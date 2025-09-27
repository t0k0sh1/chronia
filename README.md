# Chronia

![npm version](https://badge.fury.io/js/chronia.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/t0k0sh1/chronia/ci.yaml)
![snyk](https://snyk.io/test/github/t0k0sh1/chronia/badge.svg)
![Bundle size](https://badgen.net/bundlephobia/minzip/chronia)
![Node Current](https://img.shields.io/node/v/chronia)
![NPM Downloads](https://img.shields.io/npm/dm/chronia)

A modern, lightweight TypeScript date/time utility library with comprehensive formatting, parsing, and manipulation capabilities.

> **Note**  
> This library is currently in the **v0.1.x** stage.  
> Breaking changes may occur at any time without prior notice.  
> A stable API will be introduced starting from v0.2.0.

## Features

- 🚀 **Modern TypeScript** - Built with TypeScript 5.9+ for excellent type safety
- 📦 **Lightweight** - Tree-shakable ESM/CJS dual module support
- 🌍 **Internationalization** - Built-in locale support (English, Japanese)
- 🎯 **Unicode Patterns** - Standard Unicode date format patterns
- ⚡ **Fast & Reliable** - Extensively tested with 1700+ test cases
- 🔧 **Date Arithmetic** - Add/subtract days, months, years, hours, minutes, seconds
- 📅 **Formatting** - Flexible date formatting with Unicode tokens
- 🔍 **Parsing** - Robust date string parsing with error handling
- 📊 **Comparison** - Date comparison utilities (before, after, equal, sorting, ranges)
- 🎯 **Min/Max/Clamp** - Find minimum, maximum, and clamp dates within ranges
- 🔄 **Date Differences** - Calculate differences between dates in various units
- 📅 **Period Utilities** - Start/end of periods and date truncation
- 📐 **Same Period Checks** - Check if dates are in same year, month, day, etc.
- 📈 **Date Ranges** - Timestamp and Date object interoperability
- ⏰ **Current Time** - Semantic current time access and timestamp utilities
- ✅ **Validation** - Date validation and component extraction

## Installation

```bash
npm install chronia
```

## Quick Start

```typescript
import {
  format,
  parse,
  addDays,
  isAfter,
  min,
  max,
  clamp,
  now,
  compare,
} from "chronia";

// Format dates
const date = new Date(2024, 0, 15, 14, 30, 0);
format(date, "yyyy-MM-dd HH:mm:ss"); // "2024-01-15 14:30:00"
format(date, "EEEE, MMMM dd"); // "Monday, January 15"

// Parse date strings
const parsed = parse("2024-01-15", "yyyy-MM-dd");
const withTime = parse("15/01/2024 14:30", "dd/MM/yyyy HH:mm");

// Date arithmetic - works with both Date objects and timestamps
const tomorrow = addDays(date, 1);
const nextWeek = addDays(Date.now(), 7); // timestamp input

// Date comparisons
isAfter(tomorrow, date); // true

// Current time
const currentTime = now();
const formatted = format(now(), "yyyy-MM-dd HH:mm");

// Sort dates chronologically
const dates = [tomorrow, date, nextWeek];
dates.sort(compare); // Sorted in chronological order

// Min/Max/Clamp utilities
const earliest = min(date, tomorrow, nextWeek); // Returns earliest date
const latest = max(date, tomorrow, nextWeek); // Returns latest date
const clamped = clamp(date, tomorrow, nextWeek); // Clamp within range
```

## Core Functions

### Current Time

Get the current date and time:

```typescript
import { now } from "chronia";

// Get current date and time
const currentTime = now();
console.log(currentTime); // Current Date object

// Use with other functions
const formatted = format(now(), "yyyy-MM-dd HH:mm:ss");
const tomorrow = addDays(now(), 1);
const isRecent = isAfter(now(), new Date(2000, 0, 1)); // Check if current time is after Jan 1, 2000

// Equivalent to new Date(), but more semantic
const timestamp1 = now().getTime();
const timestamp2 = new Date().getTime();
// Both give same result, but now() expresses intent more clearly
```

### Formatting

Format dates using Unicode date format patterns:

```typescript
import { format } from "chronia";

const date = new Date(2024, 0, 15, 14, 30, 45, 123);

// Basic patterns
format(date, "yyyy-MM-dd"); // "2024-01-15"
format(date, "dd/MM/yyyy"); // "15/01/2024"
format(date, "MM/dd/yyyy"); // "01/15/2024"

// Time patterns
format(date, "HH:mm:ss"); // "14:30:45"
format(date, "h:mm:ss a"); // "2:30:45 PM"
format(date, "HH:mm:ss.SSS"); // "14:30:45.123"

// Combined patterns
format(date, "yyyy-MM-dd HH:mm:ss"); // "2024-01-15 14:30:45"
format(date, "EEEE, MMMM dd, yyyy"); // "Monday, January 15, 2024"

// Literals and custom text
format(date, "'Today is' EEEE"); // "Today is Monday"
format(date, "yyyy年MM月dd日"); // "2024年01月15日"
```

#### Format Tokens

The following tokens are supported for formatting dates and times:

| Pattern          | Description           | Example           |
| ---------------- | --------------------- | ----------------- |
| `y`              | Year (variable)       | 1, 12, 123, 2024  |
| `yy`             | Year (2-digit)        | 01, 99, 24        |
| `yyyy`           | Year (4-digit)        | 0001, 2024        |
| `M`              | Month                 | 1, 12             |
| `MM`             | Month (2-digit)       | 01, 12            |
| `MMM`            | Month (short)         | Jan, Dec          |
| `MMMM`           | Month (full)          | January, December |
| `d`              | Day                   | 1, 31             |
| `dd`             | Day (2-digit)         | 01, 31            |
| `H`              | Hour (0-23)           | 0, 23             |
| `HH`             | Hour (2-digit, 0-23)  | 00, 23            |
| `h`              | Hour (1-12)           | 1, 12             |
| `hh`             | Hour (2-digit, 1-12)  | 01, 12            |
| `m`              | Minute                | 0, 59             |
| `mm`             | Minute (2-digit)      | 00, 59            |
| `s`              | Second                | 0, 59             |
| `ss`             | Second (2-digit)      | 00, 59            |
| `S`              | Millisecond (1-digit) | 1, 9              |
| `SS`             | Millisecond (2-digit) | 12, 99            |
| `SSS`            | Millisecond (3-digit) | 123, 999          |
| `a`              | AM/PM                 | AM, PM            |
| `E`, `EE`, `EEE` | Weekday (short)       | Mon, Tue          |
| `EEEE`           | Weekday (full)        | Monday, Tuesday   |
| `D`              | Day of year           | 1, 365            |
| `DD`             | Day of year (2-digit) | 01, 365           |
| `DDD`            | Day of year (3-digit) | 001, 365          |
| `G`              | Era                   | AD, BC            |

These tokens can be combined in any order to create custom format patterns.
Use single quotes to escape literal text within patterns.

### Parsing

Parse date strings using the same format patterns:

```typescript
import { parse } from "chronia";

// Basic parsing
parse("2024-01-15", "yyyy-MM-dd");
parse("15/01/2024", "dd/MM/yyyy");
parse("Jan 15, 2024", "MMM dd, yyyy");

// Time parsing
parse("14:30:45", "HH:mm:ss");
parse("2:30 PM", "h:mm a");

// Combined date and time
parse("2024-01-15 14:30:45", "yyyy-MM-dd HH:mm:ss");
parse("15/01/2024 2:30 PM", "dd/MM/yyyy h:mm a");

// With reference date for missing components
const refDate = new Date(2023, 5, 10); // June 10, 2023
parse("14:30", "HH:mm", { referenceDate: refDate }); // June 10, 2023 14:30

// Error handling
const invalid = parse("invalid-date", "yyyy-MM-dd");
console.log(isNaN(invalid.getTime())); // true
```

### Date Arithmetic

Add or subtract time units. All functions accept both Date objects and timestamps:

```typescript
import {
  addDays,
  addMonths,
  addYears,
  addHours,
  addMinutes,
  addSeconds,
  addMilliseconds,
  subDays,
  subMonths,
  subYears,
  subHours,
  subMinutes,
  subSeconds,
  subMilliseconds,
} from "chronia";

const date = new Date(2024, 0, 15);
const timestamp = Date.now();

// Add time units - works with Date objects or timestamps
addDays(date, 7); // Add 7 days to Date object
addDays(timestamp, 7); // Add 7 days to timestamp
addMonths(date, 3); // Add 3 months
addYears(date, 1); // Add 1 year
addHours(date, 5); // Add 5 hours
addMinutes(date, 30); // Add 30 minutes
addSeconds(date, 45); // Add 45 seconds

// Subtract time units - works with Date objects or timestamps
subDays(date, 7); // Subtract 7 days from Date object
subDays(timestamp, 7); // Subtract 7 days from timestamp
subMonths(date, 3); // Subtract 3 months
subYears(date, 1); // Subtract 1 year
subHours(date, 5); // Subtract 5 hours
subMinutes(date, 30); // Subtract 30 minutes
subSeconds(date, 45); // Subtract 45 seconds
```

### Min/Max/Clamp Operations

Find minimum, maximum, and clamp dates within ranges:

```typescript
import { min, max, clamp } from "chronia";

const date1 = new Date(2024, 0, 15);
const date2 = new Date(2024, 0, 20);
const date3 = new Date(2024, 0, 10);
const timestamp = Date.now();

// Find minimum and maximum dates
const earliest = min(date1, date2, date3, timestamp); // Returns earliest
const latest = max(date1, date2, date3, timestamp); // Returns latest

// Clamp a date within a range
const minDate = new Date(2024, 0, 10);
const maxDate = new Date(2024, 0, 20);
const dateToClamp = new Date(2024, 0, 25);

const clamped = clamp(dateToClamp, minDate, maxDate); // Returns maxDate (2024-01-20)

// Works with timestamps too
const clampedTimestamp = clamp(timestamp, minDate.getTime(), maxDate.getTime());
```

### Date Comparison

Compare dates with intuitive functions:

```typescript
import {
  isAfter,
  isBefore,
  isEqual,
  isAfterOrEqual,
  isBeforeOrEqual,
} from "chronia";

const date1 = new Date(2024, 0, 15);
const date2 = new Date(2024, 0, 20);
const timestamp = Date.now();

// All comparison functions accept Date objects or timestamps
isAfter(date2, date1); // true
isAfter(timestamp, date1); // Compare timestamp with Date
isBefore(date1, date2); // true
isEqual(date1, date1); // true
isAfterOrEqual(date2, date1); // true
isBeforeOrEqual(date1, date2); // true
```

#### Sorting with Compare

For sorting dates chronologically, use the `compare` function:

```typescript
import { compare } from "chronia";

const dates = [
  new Date(2024, 0, 20),
  new Date(2024, 0, 15),
  new Date(2024, 0, 10),
];

// Sort in ascending order (chronological)
dates.sort(compare);
// Result: [2024-01-10, 2024-01-15, 2024-01-20]

// Sort in descending order (reverse chronological)
dates.sort((a, b) => compare(a, b, "DESC"));
// Result: [2024-01-20, 2024-01-15, 2024-01-10]

// Works with timestamps too
const timestamps = [Date.now(), Date.now() - 86400000, Date.now() + 86400000];
timestamps.sort(compare);
```

#### Range Checking

Check if a date falls within a specific range:

```typescript
import { isBetween } from "chronia";

const target = new Date(2024, 0, 15);
const start = new Date(2024, 0, 10);
const end = new Date(2024, 0, 20);

// Check if date is between start and end (inclusive by default)
isBetween(target, start, end); // true

// Exclusive boundaries
isBetween(target, start, end, { bounds: "open" }); // true (excludes endpoints)
isBetween(start, start, end, { bounds: "open" }); // false (start equals boundary)

// Mixed boundaries
isBetween(target, start, end, { bounds: "left-open" }); // true (excludes start, includes end)
isBetween(target, start, end, { bounds: "right-open" }); // true (includes start, excludes end)

// Works with timestamps
const now = Date.now();
const hourAgo = now - 60 * 60 * 1000;
const hourFromNow = now + 60 * 60 * 1000;
isBetween(Date.now(), hourAgo, hourFromNow); // true
```

### Date Differences

Calculate differences between dates in various units:

```typescript
import {
  diffYears,
  diffMonths,
  diffDays,
  diffHours,
  diffMinutes,
  diffSeconds,
  diffMilliseconds,
} from "chronia";

const start = new Date(2024, 0, 15);
const end = new Date(2024, 6, 20);
const timestamp = Date.now();

// Calculate differences - works with Date objects or timestamps
diffYears(end, start); // 0 (same year)
diffMonths(end, start); // 6 (months difference)
diffDays(end, start); // ~186 (days difference)
diffHours(timestamp, start); // Hours since start
diffMinutes(end, timestamp); // Minutes between end and now
diffSeconds(end, start); // Seconds difference
diffMilliseconds(end, start); // Milliseconds difference
```

### Period Start/End and Truncation

Get start/end of periods and truncate dates to specific units:

```typescript
import {
  startOfYear,
  endOfYear,
  startOfMonth,
  endOfMonth,
  startOfDay,
  endOfDay,
  truncYear,
  truncMonth,
  truncDay,
  truncHour,
  truncMinute,
  truncSecond,
} from "chronia";

const date = new Date(2024, 5, 15, 14, 30, 45, 123);
const timestamp = Date.now();

// Period start/end - works with Date objects or timestamps
startOfYear(date); // 2024-01-01 00:00:00.000
endOfYear(date); // 2024-12-31 23:59:59.999
startOfMonth(timestamp); // First day of current month
endOfMonth(date); // Last day of June 2024
startOfDay(date); // 2024-06-15 00:00:00.000
endOfDay(date); // 2024-06-15 23:59:59.999

// Truncation - works with Date objects or timestamps
truncYear(date); // 2024-01-01 00:00:00.000
truncMonth(date); // 2024-06-01 00:00:00.000
truncDay(date); // 2024-06-15 00:00:00.000
truncHour(date); // 2024-06-15 14:00:00.000
truncMinute(date); // 2024-06-15 14:30:00.000
truncSecond(date); // 2024-06-15 14:30:45.000
```

### Same Period Checks

Check if dates are in the same year, month, day, etc:

```typescript
import {
  isSameYear,
  isSameMonth,
  isSameDay,
  isSameHour,
  isSameMinute,
  isSameSecond,
} from "chronia";

const date1 = new Date(2024, 5, 15, 14, 30, 45);
const date2 = new Date(2024, 8, 20, 16, 45, 30);
const timestamp = Date.now();

// Same period checks - works with Date objects or timestamps
isSameYear(date1, date2); // true (both 2024)
isSameYear(date1, timestamp); // Compare with current timestamp
isSameMonth(date1, date2); // false (June vs September)
isSameDay(date1, date2); // false (15th vs 20th)
isSameHour(date1, date2); // false (14 vs 16)
isSameMinute(date1, date2); // false (30 vs 45)
isSameSecond(date1, date2); // false (45 vs 30)
```

### Date Component Extraction

Extract specific components from dates. All functions accept Date objects or timestamps:

```typescript
import {
  getYear,
  getMonth,
  getDay,
  getHours,
  getMinutes,
  getSeconds,
  getMilliseconds,
} from "chronia";

const date = new Date(2024, 0, 15, 14, 30, 45, 123);
const timestamp = Date.now();

// Extract components - works with Date objects or timestamps
getYear(date); // 2024
getYear(timestamp); // Current year
getMonth(date); // 0 (January, 0-indexed)
getDay(date); // 15
getHours(date); // 14
getMinutes(date); // 30
getSeconds(date); // 45
getMilliseconds(date); // 123
```

### Date Component Setting

Set specific timestamp values and work with Unix timestamps:

```typescript
import { setTime, getTime } from "chronia";

// Get timestamp from date (like Date.prototype.getTime)
const date = new Date(2024, 0, 15, 14, 30, 45);
const timestamp = getTime(date); // 1705332645000

// Set date to specific timestamp (creates new Date)
const newDate = setTime(new Date(), timestamp);
// newDate is now 2024-01-15 14:30:45

// Works with timestamps too
const currentTimestamp = getTime(Date.now());
const dateFromTimestamp = setTime(new Date(), currentTimestamp);

// Useful for copying timestamps between dates
const sourceDate = new Date(2024, 0, 15);
const targetDate = setTime(new Date(), getTime(sourceDate));
// targetDate has same timestamp as sourceDate
```

#### Setting Milliseconds

Set milliseconds component of a date:

```typescript
import { setMilliseconds } from "chronia";

// Set milliseconds to specific value
const date = new Date(2024, 0, 15, 14, 30, 45, 0);
const withMs = setMilliseconds(date, 123);
// withMs is 2024-01-15 14:30:45.123

// Works with timestamps too
const timestamp = Date.now();
const withSpecificMs = setMilliseconds(timestamp, 500);
// Sets milliseconds to 500
```

### Date Validation

```typescript
import { isValid } from "chronia";

// Works with Date objects or timestamps
isValid(new Date(2024, 0, 15)); // true
isValid(new Date("invalid")); // false
isValid(new Date(NaN)); // false
isValid(Date.now()); // true
isValid(NaN); // false
```

## Universal Date/Timestamp Support

**Important Feature**: Almost all Chronia functions accept both Date objects and number timestamps for maximum flexibility:

```typescript
import { addDays, diffDays, isAfter, min, startOfDay } from "chronia";

const date = new Date(2024, 0, 15);
const timestamp = Date.now();

// All of these work identically:
addDays(date, 7); // Date object input
addDays(timestamp, 7); // Timestamp input
diffDays(date, timestamp); // Mixed inputs
isAfter(timestamp, date); // Mixed inputs
min(date, timestamp); // Mixed inputs
startOfDay(timestamp); // Timestamp input

// Only format() and parse() require specific types
```

## Internationalization

Chronia supports locale-specific formatting and parsing:

```typescript
import { format, parse } from "chronia";
import { enUS } from "chronia/locale/en-US";
import { ja } from "chronia/locale/ja";

const date = new Date(2024, 0, 15);

// English
format(date, "EEEE, MMMM dd", enUS); // "Monday, January 15"
parse("January 15, 2024", "MMMM dd, yyyy", { locale: enUS });

// Japanese
format(date, "EEEE, MMMM dd", ja); // "月曜日, 1月 15日"
parse("月曜日, 1月 15日", "EEEE, MMMM dd", { locale: ja });
```

### Available Locales

- `en-US` - English (United States)
- `ja` - Japanese

## TypeScript Support

Chronia is built with TypeScript and provides excellent type safety:

```typescript
import {
  format,
  parse,
  addDays,
  min,
  max,
  clamp,
  diffDays,
  now,
  compare,
  setTime,
  getTime,
  isBetween,
  Locale,
  BetweenOption,
} from "chronia";

// All functions are fully typed with Date | number support
const date: Date = new Date();
const timestamp: number = Date.now();
const formatted: string = format(date, "yyyy-MM-dd");
const parsed: Date = parse("2024-01-15", "yyyy-MM-dd");

// Arithmetic functions accept Date | number
const future: Date = addDays(date, 7);
const futureFromTimestamp: Date = addDays(timestamp, 7);

// Utility functions with flexible typing
const earliest: Date = min(date, timestamp, future);
const latest: Date = max(date, timestamp);
const clamped: Date = clamp(date, timestamp, future);
const difference: number = diffDays(date, timestamp);

// New functions also support Date | number flexibility
const currentTime: Date = now();
const comparison: number = compare(date, timestamp);
const timestampValue: number = getTime(date);
const dateFromTimestamp: Date = setTime(new Date(), timestamp);

// Range checking with options
const options: BetweenOption = { bounds: "open" };
const inRange: boolean = isBetween(timestamp, date, future, options);

// Custom localization
const customLocale: Locale = {
  era: (era, options) => (era ? "CE" : "BCE"),
  month: (month, options) => `Month ${month + 1}`,
  weekday: (weekday, options) => `Day ${weekday}`,
  dayPeriod: (period, options) => (period === "am" ? "Morning" : "Evening"),
};
```

## Browser Support

- Modern browsers with ES2020 support
- Node.js 18+
- TypeScript 5.0+

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass: `npm test`
5. Run linting: `npm run lint`
6. Submit a pull request

## Constants

Chronia provides useful date constants for common date range operations:

```typescript
import { MIN_DATE, MAX_DATE } from "chronia";

// JavaScript date limits
console.log(MIN_DATE); // Jan 01, 271821 BC
console.log(MAX_DATE); // Sep 13, 275760 AD

// Useful for default values and validation
function clampDate(date: Date) {
  return clamp(date, MIN_DATE, MAX_DATE);
}

// Check if date is within valid JavaScript range
function isValidJSDate(date: Date): boolean {
  return isBetween(date, MIN_DATE, MAX_DATE);
}

// Initialize date ranges with safe defaults
const dateRange = {
  start: MIN_DATE,
  end: MAX_DATE,
};
```

These constants represent the theoretical limits of JavaScript Date objects, useful for:

- Default values in date range inputs
- Validation of date boundaries
- Safe fallbacks for date operations
- Testing edge cases in date logic

## API Reference

For detailed API documentation with examples, visit our [TypeDoc documentation](https://t0k0sh1.github.io/chronia/).

---

Made with ❤️ by [Takashi Yamashina](https://github.com/t0k0sh1)
