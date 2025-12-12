# truncYear

## Overview

The `truncYear` function truncates a given date to the start of its year, setting it to January 1st at 00:00:00.000 of the same year. This provides a consistent way to normalize dates to year boundaries within the Chronia library.

## Signature

```typescript
function truncYear(date: DateInput): Date;
```

## Parameters

| Parameter | Type        | Description                                                                               |
| --------- | ----------- | ----------------------------------------------------------------------------------------- |
| `date`    | `DateInput` | A Date object, numeric timestamp, or ISO 8601 string to truncate to the start of the year |

## Return Value

| Type   | Description                                                                                                    |
| ------ | -------------------------------------------------------------------------------------------------------------- |
| `Date` | A new Date object set to January 1st at 00:00:00.000 of the same year, or Invalid Date if the input is invalid |

## Description

The `truncYear` function removes all time components (hours, minutes, seconds, milliseconds) and resets the month and day to January 1st, effectively truncating the date to the start of the year. This function always creates a new Date instance and never mutates the original input.

### Specification

#### Returns a valid Date when:

- The argument is a valid `Date` object with any date/time within a year
- The argument is a finite numeric timestamp, including:
  - Positive timestamps (dates after Unix epoch)
  - Zero (`0`, representing January 1, 1970, 00:00:00 UTC)
  - Negative timestamps (dates before Unix epoch)
- The returned Date is set to January 1st at 00:00:00.000 of the input date's year
- Dates already at the start of the year remain at January 1st, 00:00:00.000

#### Returns Invalid Date when:

- The argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The argument is `NaN`
- The argument is `Infinity`
- The argument is `-Infinity`

### Behavior Notes

- Validates input using Chronia's internal `isValidDateOrNumber` validator for consistency
- Always returns a new Date instance; the original date is never modified
- Handles leap years correctly (e.g., February 29th in leap years is truncated to January 1st)
- No exceptions are thrown; invalid inputs return Invalid Date
- Type-safe with TypeScript, accepting only `Date | number`
- Uses the internal `truncateToUnit` utility with `"year"` as the unit parameter

## Use Cases

- **Temporal Aggregation**: Group dates by year for analytics, reporting, or data visualization. Useful when you need to roll up data to annual periods regardless of the specific month or day.
- **Date Range Filtering**: Find the start of a year to construct date ranges for queries or filters. Enables filtering data for an entire year by using the year start as a boundary.
- **Normalization**: Standardize dates to year boundaries for comparison or storage. Ensures that dates from different times within the year are treated equivalently.
- **Calendar Operations**: Calculate year-based periods or intervals in scheduling applications. Helps determine fiscal years, academic years, or other year-based time periods.
- **Data Cleanup**: Remove precision from dates when only year-level granularity is needed. Useful when storing or displaying data that doesn't require month or day information.

## Usage Examples

### Temporal Aggregation

```typescript
import { truncYear } from "chronia";

// Group transactions by year
interface Transaction {
  date: Date;
  amount: number;
}

function groupByYear(transactions: Transaction[]): Map<string, Transaction[]> {
  const groups = new Map<string, Transaction[]>();

  transactions.forEach((transaction) => {
    const yearStart = truncYear(transaction.date);
    const key = yearStart.toISOString();

    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(transaction);
  });

  return groups;
}

// Basic truncation
const midYear = new Date(2024, 5, 15, 14, 30, 45, 123);
truncYear(midYear); // Returns: January 1, 2024 00:00:00.000

// End of year
const endOfYear = new Date(2024, 11, 31, 23, 59, 59, 999);
truncYear(endOfYear); // Returns: January 1, 2024 00:00:00.000
```

### Date Range Filtering

```typescript
import { truncYear } from "chronia";

// Create a year range filter
function getYearRange(date: Date): { start: Date; end: Date } {
  const start = truncYear(date);
  const end = new Date(start);
  end.setFullYear(end.getFullYear() + 1);
  end.setMilliseconds(-1); // Last millisecond of the year

  return { start, end };
}

const currentDate = new Date(2024, 7, 15);
const range = getYearRange(currentDate);
// range.start: January 1, 2024 00:00:00.000
// range.end: December 31, 2024 23:59:59.999
```

### Normalization

```typescript
import { truncYear } from "chronia";

// Normalize dates for comparison
function isSameYear(date1: Date, date2: Date): boolean {
  const year1 = truncYear(date1);
  const year2 = truncYear(date2);
  return year1.getTime() === year2.getTime();
}

const date1 = new Date(2024, 2, 15);
const date2 = new Date(2024, 8, 20);
isSameYear(date1, date2); // Returns: true

// Works with timestamps
const timestamp = Date.now();
const yearStart = truncYear(timestamp);
// Returns: January 1st of current year at 00:00:00.000
```

### Handling Edge Cases

```typescript
import { truncYear } from "chronia";

// Already at start of year
const alreadyStart = new Date(2024, 0, 1, 0, 0, 0, 0);
truncYear(alreadyStart); // Returns: January 1, 2024 00:00:00.000 (unchanged)

// Leap year handling
const leapDay = new Date(2024, 2, 29, 12, 0, 0, 0);
truncYear(leapDay); // Returns: January 1, 2024 00:00:00.000

// Invalid inputs return Invalid Date
const invalid = truncYear(new Date("invalid"));
console.log(isNaN(invalid.getTime())); // true

const nanResult = truncYear(NaN);
console.log(isNaN(nanResult.getTime())); // true

// Original date is never modified
const original = new Date(2024, 5, 15, 14, 30, 45, 123);
const truncated = truncYear(original);
console.log(original.getTime() !== truncated.getTime()); // true
```
