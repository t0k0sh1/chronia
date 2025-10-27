# Constants and TypeScript Types

## Overview

Chronia exports constants and TypeScript type definitions for use in type-safe date/time operations.

## Constants

### `MIN_DATE` and `MAX_DATE`

Minimum and maximum representable dates in JavaScript.

```typescript
import { MIN_DATE, MAX_DATE } from "chronia";

console.log(MIN_DATE);  // Date(-8640000000000000) ≈ -271821-04-20
console.log(MAX_DATE);  // Date(8640000000000000) ≈ 275760-09-13
```

**Usage:**
- `isBetween` uses these for open-ended intervals (null start/end)
- Representing "infinite" past/future in date ranges
- Validating date bounds

```typescript
import { isBetween, MIN_DATE, MAX_DATE } from "chronia";

// All dates after Jan 1, 2024
isBetween(
  someDate,
  { start: new Date(2024, 0, 1), end: MAX_DATE }
);
```

## TypeScript Types

### `Locale`

Localization configuration for formatting and parsing.

```typescript
interface Locale {
  months: {
    abbreviated: string[];  // ["Jan", "Feb", ...]
    wide: string[];         // ["January", "February", ...]
    narrow: string[];       // ["J", "F", ...]
  };
  weekdays: {
    abbreviated: string[];  // ["Sun", "Mon", ...]
    wide: string[];         // ["Sunday", "Monday", ...]
    narrow: string[];       // ["S", "M", ...]
  };
  dayPeriods: {
    am: string;            // "AM"
    pm: string;            // "PM"
  };
  eras: {
    narrow: string[];      // ["B", "A"]
    abbreviated: string[]; // ["BC", "AD"]
    wide: string[];        // ["Before Christ", "Anno Domini"]
  };
}
```

**Usage:**
```typescript
import { format, Locale } from "chronia";
import { enLocale, jaLocale } from "chronia/i18n";

const customLocale: Locale = {
  // ... custom locale definition
};

format(date, "MMMM", customLocale);
```

### `Interval`

Represents a time interval with start and end boundaries.

```typescript
interface Interval {
  start: Date | number | null;
  end: Date | number | null;
}
```

**Usage:**
```typescript
import { isBetween, Interval } from "chronia";

const interval: Interval = {
  start: new Date(2024, 0, 1),
  end: new Date(2024, 11, 31)
};

isBetween(someDate, interval);

// Open-ended intervals
const futureInterval: Interval = {
  start: new Date(2024, 0, 1),
  end: null  // No upper bound
};
```

### `TimeUnit`

Enumeration of time units for comparisons and operations.

```typescript
type TimeUnit =
  | "year"
  | "month"
  | "day"
  | "hour"
  | "minute"
  | "second"
  | "millisecond";
```

**Usage:**
```typescript
import { isEqual, TimeUnit } from "chronia";

const unit: TimeUnit = "day";
isEqual(date1, date2, { unit });
```

### `BoundsType`

Boundary inclusion mode for interval checking.

```typescript
type BoundsType = "()" | "[]" | "[)" | "(]";
```

**Meaning:**
- `"()"`: Both boundaries excluded
- `"[]"`: Both boundaries included
- `"[)"`: Start included, end excluded
- `"(]"`: Start excluded, end included

**Usage:**
```typescript
import { isBetween, BoundsType } from "chronia";

const bounds: BoundsType = "[]";
isBetween(date, interval, { bounds });
```

### `BetweenOption`

Options for `isBetween` function.

```typescript
interface BetweenOption {
  bounds?: BoundsType;
}
```

### `ComparisonOptions`

Options for comparison functions.

```typescript
interface ComparisonOptions {
  unit?: TimeUnit;
}
```

**Usage:**
```typescript
import { isAfter, ComparisonOptions } from "chronia";

const options: ComparisonOptions = { unit: "day" };
isAfter(date1, date2, options);
```

### `CompareOptions`

Options for `compare` function.

```typescript
interface CompareOptions {
  order?: "ASC" | "DESC";
}
```

**Usage:**
```typescript
import { compare, CompareOptions } from "chronia";

const options: CompareOptions = { order: "DESC" };
dates.sort((a, b) => compare(a, b, options));
```

## AI Guidance

**Recommend exporting types when:**
- User is building TypeScript applications
- Creating type-safe wrappers around Chronia
- Implementing custom locales
- Building strongly-typed date utilities

**Common patterns:**
```typescript
// Type-safe interval creation
const createInterval = (
  start: Date | number,
  end: Date | number
): Interval => ({
  start,
  end
});

// Type-safe comparison with units
const compareDates = (
  a: Date,
  b: Date,
  unit: TimeUnit
): boolean => {
  return isEqual(a, b, { unit });
};

// Type-safe locale usage
const formatLocalized = (
  date: Date,
  pattern: string,
  locale: Locale
): string => {
  return format(date, pattern, locale);
};
```

## Built-in Locales

Chronia provides two built-in locales:

```typescript
import { enLocale, jaLocale } from "chronia/i18n";

// English (default)
format(date, "MMMM d, yyyy", enLocale);
// "January 15, 2024"

// Japanese
format(date, "MMMM d, yyyy", jaLocale);
// "1月 15, 2024"
```

## Creating Custom Locales

```typescript
import { Locale } from "chronia";

const customLocale: Locale = {
  months: {
    abbreviated: [/* 12 month abbreviations */],
    wide: [/* 12 full month names */],
    narrow: [/* 12 single-letter month codes */]
  },
  weekdays: {
    abbreviated: [/* 7 weekday abbreviations */],
    wide: [/* 7 full weekday names */],
    narrow: [/* 7 single-letter weekday codes */]
  },
  dayPeriods: {
    am: "AM",
    pm: "PM"
  },
  eras: {
    narrow: ["B", "A"],
    abbreviated: ["BC", "AD"],
    wide: ["Before Christ", "Anno Domini"]
  }
};
```

## Related

- **Formatting**: `format`, `parse` use Locale type
- **Comparison**: `isAfter`, `isBefore`, `isEqual` use ComparisonOptions
- **Intervals**: `isBetween` uses Interval and BetweenOption types
- **Sorting**: `compare` uses CompareOptions
