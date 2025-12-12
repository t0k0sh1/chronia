# startOfYear

## Overview

The `startOfYear` function returns a new Date object set to the first moment of the year (January 1st at 00:00:00.000) for the given date. It provides a reliable way to get year boundaries in Chronia's consistent API surface.

## Signature

```typescript
function startOfYear(date: DateInput): Date;
```

## Parameters

| Parameter | Type        | Description                                                                     |
| --------- | ----------- | ------------------------------------------------------------------------------- |
| `date`    | `DateInput` | A Date object, numeric timestamp, or ISO 8601 string representing the base date |

## Return Value

| Type   | Description                                                                                                    |
| ------ | -------------------------------------------------------------------------------------------------------------- |
| `Date` | A new Date object set to January 1st at 00:00:00.000 of the same year, or Invalid Date if the input is invalid |

## Description

The `startOfYear` function calculates the start of the year for a given date by creating a new Date object set to January 1st at midnight (00:00:00.000). The function preserves the year from the input date while resetting the month to January (0), the day to 1, and all time components (hours, minutes, seconds, milliseconds) to zero.

### Specification

#### Returns a valid Date when:

- The argument is a valid `Date` object (not Invalid Date)
- The argument is a finite numeric timestamp, including:
  - Positive timestamps (dates after Unix epoch)
  - Zero (`0`, representing January 1, 1970, 00:00:00 UTC)
  - Negative timestamps (dates before Unix epoch)

The returned Date will be set to:

- Month: `0` (January)
- Day: `1`
- Hours: `0`
- Minutes: `0`
- Seconds: `0`
- Milliseconds: `0`
- Year: Same as the input date's year

#### Returns Invalid Date when:

- The argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The argument is `NaN`
- The argument is `Infinity`
- The argument is `-Infinity`

### Behavior Notes

- Always returns a new Date instance; the input is never mutated
- Validates input before processing using Chronia's internal validation utilities
- Works correctly with leap years (e.g., February 29th in leap years)
- Works with dates from any year, including dates before 1970 (negative timestamps)
- Type-safe with TypeScript, accepting only `Date | number`
- Performance-optimized for high-frequency date calculations

## Use Cases

- **Year Boundary Calculations**: Calculate the first day of a year for date range queries or filtering. Useful when generating reports, analytics, or filtering data by year boundaries.
- **Year-based Grouping**: Group dates by year by normalizing all dates to their year start. Essential for aggregating data in yearly buckets or creating year-based summaries.
- **Time Period Comparison**: Compare dates by their year start to determine if they belong to the same year. Helps identify whether two dates fall within the same calendar year.
- **Calendar Display**: Generate calendar views starting from January 1st. Particularly useful for rendering year-view calendars or year pickers in UI components.
- **Date Range Creation**: Create date ranges that span entire years starting from January 1st. Common in financial reporting, academic year calculations, and subscription management.

## Usage Examples

### Year Boundary Calculations

```typescript
import { startOfYear } from "chronia";

// Get start of year from mid-year date
const midYear = new Date(2024, 5, 15, 14, 30, 45);
const yearStart = startOfYear(midYear);
// Returns: Date(2024, 0, 1, 0, 0, 0, 0) - January 1, 2024 00:00:00.000

// Works with last day of year
const endOfYear = new Date(2024, 11, 31, 23, 59, 59);
const yearStart2 = startOfYear(endOfYear);
// Returns: Date(2024, 0, 1, 0, 0, 0, 0) - January 1, 2024 00:00:00.000

// Works with timestamps
const timestamp = Date.now(); // e.g., 1700000000000
const yearStart3 = startOfYear(timestamp);
// Returns: January 1st of the timestamp's year at 00:00:00.000
```

### Year-based Grouping

```typescript
import { startOfYear } from "chronia";

interface Event {
  date: Date;
  name: string;
}

function groupEventsByYear(events: Event[]): Map<number, Event[]> {
  const grouped = new Map<number, Event[]>();

  for (const event of events) {
    const yearStart = startOfYear(event.date);
    const year = yearStart.getFullYear();

    if (!grouped.has(year)) {
      grouped.set(year, []);
    }
    grouped.get(year)!.push(event);
  }

  return grouped;
}

// Usage
const events: Event[] = [
  { date: new Date(2024, 3, 15), name: "Event A" },
  { date: new Date(2024, 8, 20), name: "Event B" },
  { date: new Date(2023, 11, 10), name: "Event C" },
];

const grouped = groupEventsByYear(events);
// Returns: Map {
//   2024 => [{ date: ..., name: 'Event A' }, { date: ..., name: 'Event B' }],
//   2023 => [{ date: ..., name: 'Event C' }]
// }
```

### Time Period Comparison

```typescript
import { startOfYear } from "chronia";

function isSameYear(date1: Date, date2: Date): boolean {
  const year1Start = startOfYear(date1);
  const year2Start = startOfYear(date2);
  return year1Start.getTime() === year2Start.getTime();
}

// Check if dates are in the same year
const date1 = new Date(2024, 0, 15);
const date2 = new Date(2024, 11, 25);
const date3 = new Date(2023, 6, 10);

isSameYear(date1, date2); // Returns: true (both in 2024)
isSameYear(date1, date3); // Returns: false (2024 vs 2023)
```

### Date Range Creation

```typescript
import { startOfYear } from "chronia";

function getYearRange(date: Date): { start: Date; end: Date } {
  const start = startOfYear(date);
  const end = new Date(start.getFullYear(), 11, 31, 23, 59, 59, 999);

  return { start, end };
}

// Get full year range
const range = getYearRange(new Date(2024, 5, 15));
// Returns: {
//   start: Date(2024, 0, 1, 0, 0, 0, 0),      // January 1, 2024 00:00:00.000
//   end: Date(2024, 11, 31, 23, 59, 59, 999)  // December 31, 2024 23:59:59.999
// }
```

### Handling Leap Years

```typescript
import { startOfYear } from "chronia";

// Works correctly with leap year dates
const leapYearDate = new Date(2024, 1, 29); // February 29, 2024 (leap year)
const yearStart = startOfYear(leapYearDate);
// Returns: Date(2024, 0, 1, 0, 0, 0, 0) - January 1, 2024 00:00:00.000

// Works with dates before 1970
const oldDate = new Date(1950, 6, 15);
const oldYearStart = startOfYear(oldDate);
// Returns: Date(1950, 0, 1, 0, 0, 0, 0) - January 1, 1950 00:00:00.000
```

### Error Handling

```typescript
import { startOfYear } from "chronia";

// Invalid inputs return Invalid Date
const invalid1 = startOfYear(NaN);
// Returns: Invalid Date

const invalid2 = startOfYear(Infinity);
// Returns: Invalid Date

const invalid3 = startOfYear(new Date("invalid"));
// Returns: Invalid Date

// Check for valid results
function safeStartOfYear(date: Date | number): Date | null {
  const result = startOfYear(date);
  return isNaN(result.getTime()) ? null : result;
}

safeStartOfYear(new Date(2024, 5, 15)); // Returns: Date(2024, 0, 1, ...)
safeStartOfYear(NaN); // Returns: null
```
