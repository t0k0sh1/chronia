# Chronia Documentation

Welcome to the Chronia documentation! This comprehensive guide covers everything you need to know about using and contributing to Chronia, a modern TypeScript date/time utility library.

---

## What is Chronia?

Chronia is a modern, lightweight TypeScript date/time utility library with comprehensive formatting, parsing, and manipulation capabilities. It provides:

- 🚀 **TypeScript-first** – Strict typings with TypeScript 5.9+
- 📦 **Lightweight** – ESM/CJS dual modules, fully tree-shakable
- 🌍 **Internationalization** – Built-in locale support
- 📅 **Comprehensive Utilities** – 60+ functions for date operations
- 🎯 **Consistent API** – Unified support for `Date` objects, timestamps, and ISO 8601 strings
- ✅ **Safe Error Handling** – No exceptions; graceful degradation
- ⚡ **Well-tested** – 2900+ automated test cases

---

## Documentation Navigation

### For Users

#### Getting Started

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Core Concepts](#core-concepts)

#### Function Reference

- [Function Categories](#function-categories)
- [Browse by Category](#browse-functions-by-category)
- [Common Use Cases](#common-use-cases)

#### Advanced Topics

- [Internationalization](#internationalization)
- [Performance Tips](#performance-tips)
- [Migration Guide](#migration-guide)

#### API Reference

- [Type Definitions](#type-definitions)
- [Error Handling](#error-handling)

---

## Installation

Chronia requires **Node.js v18 to v24**.

```bash
# Using pnpm (recommended)
pnpm add chronia

# Using npm
npm install chronia

# Using yarn
yarn add chronia
```

---

## Quick Start

### Basic Usage

```typescript
import { format, addDays, isBefore } from "chronia";

// Format dates
const today = new Date();
format(today, "yyyy-MM-dd"); // '2025-01-23'

// Date arithmetic
const nextWeek = addDays(today, 7);

// Date comparison
isBefore(today, nextWeek); // true
```

### Working with Timestamps and Strings

Chronia functions accept `Date` objects, numeric timestamps, and ISO 8601 strings:

```typescript
import { isValid, getYear, addDays } from "chronia";

// Date object
isValid(new Date(2025, 0, 1)); // true

// Timestamp
isValid(1704067200000); // true
getYear(1704067200000); // 2025

// ISO 8601 string
isValid("2025-01-01"); // true
addDays("2025-01-01", 7); // January 8, 2025
getYear("2025-01-15T14:30:00Z"); // 2025
```

### Error Handling

Chronia never throws exceptions. Invalid inputs return predictable values:

```typescript
import { isValid, getYear, addDays } from "chronia";

// Validation functions return false
isValid(new Date("invalid")); // false
isValid(NaN); // false

// Accessor functions return NaN
getYear(NaN); // NaN

// Transformation functions return Invalid Date
const result = addDays(NaN, 5);
isValid(result); // false
```

---

## Core Concepts

### Type Flexibility

All Chronia functions accept `DateInput` (`Date | number | string`) for date parameters:

```typescript
type DateInput = Date | number | string;

function isValid(date: DateInput): boolean;
function format(date: DateInput, pattern: string): string;
function addDays(date: DateInput, amount: number): Date;
```

This provides flexibility while maintaining type safety. ISO 8601 strings are automatically parsed:

```typescript
// All these are equivalent
addDays(new Date(2025, 0, 1), 7);
addDays(1735689600000, 7);
addDays("2025-01-01", 7);
addDays("2025-01-01T00:00:00Z", 7);
```

### Immutability

Transformation functions always return new Date objects:

```typescript
const original = new Date(2025, 0, 1);
const modified = addDays(original, 5);

original.getTime() !== modified.getTime(); // true - original unchanged
```

### Options Pattern

Functions with configurable behavior use an options parameter:

```typescript
import { isBefore } from "chronia";

const morning = new Date(2025, 0, 1, 9, 0);
const evening = new Date(2025, 0, 1, 17, 0);

// Default: millisecond precision
isBefore(morning, evening); // true

// Custom: day precision
isBefore(morning, evening, { unit: "day" }); // false (same day)
```

---

## Function Categories

Chronia organizes its 60+ functions into 11 logical categories:

### [Validations](./functions/validations/)

Validate dates and compare date values

- `isValid`, `isBefore`, `isAfter`, `isEqual`, `isSameDay`, etc.
- **Use for**: Input validation, date comparisons, chronological ordering

### [Accessors](./functions/accessors/)

Extract components from dates

- `getYear`, `getMonth`, `getDay`, `getHours`, etc.
- **Use for**: Reading date components, extracting values

### [Arithmetic](./functions/arithmetic/)

Add, subtract, and calculate date differences

- `addYears`, `addMonths`, `addDays`, `subHours`, `diffDays`, etc.
- **Use for**: Date calculations, scheduling, time intervals

### [Boundaries](./functions/boundaries/)

Get start/end of time periods

- `startOfDay`, `endOfMonth`, `startOfYear`, etc.
- **Use for**: Date ranges, period boundaries, calendar operations

### [Comparisons](./functions/comparisons/)

Compare and sort dates

- `max`, `min`, `compare`, `clamp`
- **Use for**: Finding earliest/latest dates, sorting, range validation

### [Formatting](./functions/formatting/)

Convert dates to strings

- `format` with customizable patterns
- **Use for**: Display formatting, localization, string conversion

### [Parsing](./functions/parsing/)

Convert strings to dates

- `parse` with pattern matching
- **Use for**: User input parsing, string-to-date conversion

### [Mutators](./functions/mutators/)

Set date components (immutably)

- `setYear`, `setMonth`, `setDay`, `setHours`, etc.
- **Use for**: Creating dates with specific components

### [Truncations](./functions/truncations/)

Truncate dates to specific units

- `truncToYear`, `truncToMonth`, `truncToDay`, etc.
- **Use for**: Date normalization, grouping by period

### [Utilities](./functions/utilities/)

Utility functions

- `now` - Get current timestamp
- **Use for**: Current time, testing, timestamps

### [Comparisons (Advanced)](./functions/comparisons/)

Utility functions for date comparison

- `max`, `min`, `compare`, `clamp`
- **Use for**: Array operations, sorting, range operations

---

## Browse Functions by Category

### Basic Operations

- [Validations →](./functions/validations/)
- [Accessors →](./functions/accessors/)
- [Utilities →](./functions/utilities/)

### Date Manipulation

- [Arithmetic →](./functions/arithmetic/)
- [Mutators →](./functions/mutators/)
- [Truncations →](./functions/truncations/)

### Advanced Features

- [Formatting →](./functions/formatting/)
- [Parsing →](./functions/parsing/)
- [Boundaries →](./functions/boundaries/)
- [Comparisons →](./functions/comparisons/)

---

## Common Use Cases

### Input Validation

```typescript
import { isValid } from "chronia";

function processDate(input: string): Date | null {
  const date = new Date(input);
  return isValid(date) ? date : null;
}
```

### Date Formatting

```typescript
import { format } from "chronia";

const date = new Date(2025, 0, 23);
format(date, "yyyy-MM-dd"); // '2025-01-23'
format(date, "MMMM d, yyyy"); // 'January 23, 2025'
format(date, "MMM d, yyyy HH:mm"); // 'Jan 23, 2025 00:00'
```

### Date Arithmetic

```typescript
import { addDays, addMonths, diffDays } from "chronia";

const today = new Date(2025, 0, 23);
const nextWeek = addDays(today, 7);
const nextMonth = addMonths(today, 1);

diffDays(today, nextWeek); // 7
```

### Date Comparison

```typescript
import { isBefore, isAfter, isSameDay } from "chronia";

const date1 = new Date(2025, 0, 1);
const date2 = new Date(2025, 0, 15);

isBefore(date1, date2); // true
isAfter(date1, date2); // false
isSameDay(date1, date2); // false
```

### Date Ranges

```typescript
import { startOfMonth, endOfMonth } from "chronia";

const date = new Date(2025, 0, 15);
const monthStart = startOfMonth(date); // 2025-01-01 00:00:00
const monthEnd = endOfMonth(date); // 2025-01-31 23:59:59
```

### Sorting Dates

```typescript
import { compare, max, min } from "chronia";

const dates = [
  new Date(2025, 0, 15),
  new Date(2025, 0, 1),
  new Date(2025, 0, 30),
];

dates.sort(compare); // Sort chronologically
const latest = max(dates); // 2025-01-30
const earliest = min(dates); // 2025-01-01
```

---

## Internationalization

Chronia supports localization for formatting and parsing:

```typescript
import { format } from "chronia";

const date = new Date(2025, 0, 23);

// English (default)
format(date, "MMMM d, yyyy"); // 'January 23, 2025'

// Japanese
format(date, "yyyy年M月d日", { locale: "ja" }); // '2025年1月23日'
```

**Supported Locales**:

- `en` - English (default)
- `ja` - Japanese

---

## Performance Tips

### Use Timestamps for Performance-Critical Code

Timestamps are fastest, followed by Date objects, then strings:

```typescript
// Fastest - direct timestamp
isValid(1704067200000);

// Fast - Date object
isValid(new Date(2025, 0, 1));

// Slower - requires string parsing
isValid("2025-01-01");
```

### Choose Appropriate Comparison Units

Millisecond comparisons are fastest:

```typescript
// Fastest - millisecond comparison
isBefore(date1, date2);

// Slower - requires truncation
isBefore(date1, date2, { unit: "day" });
```

### Avoid Repeated Date Conversions

Cache converted values when possible:

```typescript
// Less efficient
for (const event of events) {
  if (isBefore(event.date, new Date())) {
    // Process past event
  }
}

// More efficient
const now = new Date();
for (const event of events) {
  if (isBefore(event.date, now)) {
    // Process past event
  }
}
```

---

## Type Definitions

### Core Types

```typescript
// Flexible date input type - accepts Date objects, timestamps, or ISO 8601 strings
type DateInput = Date | number | string;

type TimeUnit =
  | "year"
  | "month"
  | "day"
  | "hour"
  | "minute"
  | "second"
  | "millisecond";
type Locale = "en" | "ja";

interface ComparisonOptions {
  unit?: TimeUnit;
}

interface FormatOptions {
  locale?: Locale;
}
```

### Supported ISO 8601 Formats

Chronia supports standard ISO 8601 date/time formats:

| Format               | Example                     |
| -------------------- | --------------------------- |
| Date only            | `2025-01-15`                |
| Date and time        | `2025-01-15T14:30:00`       |
| With milliseconds    | `2025-01-15T14:30:00.000`   |
| UTC (Z suffix)       | `2025-01-15T14:30:00Z`      |
| With timezone offset | `2025-01-15T14:30:00+09:00` |
| Year and month only  | `2025-01`                   |

### Function Signatures

All date functions follow consistent patterns:

```typescript
// Validation functions return boolean
function isValid(date: DateInput): boolean;

// Accessor functions return number (or NaN for invalid input)
function getYear(date: DateInput): number;

// Transformation functions return Date
function addDays(date: DateInput, amount: number): Date;

// Comparison functions return boolean
function isBefore(
  a: DateInput,
  b: DateInput,
  options?: ComparisonOptions,
): boolean;
```

---

## Error Handling

### Error Handling Philosophy

Chronia follows a **no-exceptions** philosophy:

- **Validation functions** return `false` for invalid input
- **Accessor functions** return `NaN` for invalid input
- **Transformation functions** return `Invalid Date` for invalid input

### Handling Invalid Inputs

```typescript
import { isValid, getYear, addDays } from "chronia";

// Always validate before processing
const date = new Date(userInput);
if (!isValid(date)) {
  console.error("Invalid date provided");
  return;
}

// Safe to use
const year = getYear(date);
const nextWeek = addDays(date, 7);
```

---

## Migration Guide

### From date-fns

```typescript
// date-fns
import { format, addDays, isBefore } from "date-fns";

// Chronia (same API)
import { format, addDays, isBefore } from "chronia";
```

### From moment.js

```typescript
// moment.js
moment(date).format("YYYY-MM-DD");
moment(date).add(7, "days");

// Chronia
format(date, "yyyy-MM-dd");
addDays(date, 7);
```

### From Day.js

```typescript
// Day.js
dayjs(date).format("YYYY-MM-DD");
dayjs(date).add(7, "day");

// Chronia
format(date, "yyyy-MM-dd");
addDays(date, 7);
```

---

## License

Chronia is [MIT licensed](../LICENSE).

---

## Acknowledgments

Chronia is inspired by excellent date libraries like date-fns, moment.js, and Day.js. We thank the JavaScript community for their continued innovation in date/time handling.

---

**Happy coding with Chronia! 📅**
