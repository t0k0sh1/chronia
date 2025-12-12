# truncDay

## Overview

The `truncDay` function truncates a date to the start of the day by setting the time components to 00:00:00.000 while preserving the date portion. It provides a consistent way to normalize dates to day boundaries in Chronia's API.

## Signature

```typescript
function truncDay(date: DateInput): Date;
```

## Parameters

| Parameter | Type        | Description                                                                              |
| --------- | ----------- | ---------------------------------------------------------------------------------------- |
| `date`    | `DateInput` | A Date object, numeric timestamp, or ISO 8601 string to truncate to the start of the day |

## Return Value

| Type   | Description                                                                                    |
| ------ | ---------------------------------------------------------------------------------------------- |
| `Date` | A new Date object set to 00:00:00.000 of the same day, or Invalid Date if the input is invalid |

## Description

The `truncDay` function removes all time components (hours, minutes, seconds, and milliseconds) from a date, effectively resetting it to the beginning of the day (00:00:00.000). This is useful for date comparisons, grouping operations, and normalizing dates when time components are irrelevant.

### Specification

#### Returns a valid Date when:

- The input is a valid `Date` object (not Invalid Date)
- The input is a finite numeric timestamp, including:
  - Positive timestamps (dates after Unix epoch)
  - Zero (`0`, representing January 1, 1970, 00:00:00 UTC)
  - Negative timestamps (dates before Unix epoch)

The returned Date will have:

- Same year, month, and day as the input
- Hours set to `0`
- Minutes set to `0`
- Seconds set to `0`
- Milliseconds set to `0`

#### Returns Invalid Date when:

- The input is an Invalid Date object (e.g., `new Date('invalid')`)
- The input is `NaN`
- The input is `Infinity`
- The input is `-Infinity`

### Behavior Notes

- **Immutability**: Always returns a new Date instance; the input date is never mutated
- **Validation**: Input is validated using the same validation logic as other Chronia functions for consistency
- **DST Safety**: Preserves the date correctly across Daylight Saving Time transitions
- **Type Safety**: TypeScript ensures only `Date | number` types are accepted
- **Error Handling**: Invalid inputs result in Invalid Date rather than throwing exceptions
- **Time Zone**: Operates in the local time zone; the date components are preserved as they appear in local time

## Use Cases

- **Date Comparison**: Normalize dates to day boundaries for accurate day-level comparisons without time interference. Essential when comparing if two dates fall on the same day regardless of their time components.
- **Date Grouping**: Group events or records by day by truncating timestamps to midnight. Useful in analytics, reporting, and data aggregation scenarios where time-of-day is irrelevant.
- **Range Queries**: Create consistent start-of-day boundaries for date range queries in databases or filtering operations. Ensures that "from date" parameters include the entire day from 00:00:00.
- **Calendar Operations**: Reset time components when working with calendar-based logic where only the date matters, such as vacation days, deadlines, or scheduling that operates on whole-day increments.
- **Data Normalization**: Standardize date values from various sources that may have different time components but represent the same logical day.

## Usage Examples

### Date Comparison

```typescript
import { truncDay } from "chronia";

// Compare if two dates are on the same day
function isSameDay(date1: Date, date2: Date): boolean {
  const day1 = truncDay(date1);
  const day2 = truncDay(date2);
  return day1.getTime() === day2.getTime();
}

const morning = new Date(2024, 5, 15, 8, 30, 0);
const evening = new Date(2024, 5, 15, 18, 45, 0);
const nextDay = new Date(2024, 5, 16, 8, 30, 0);

isSameDay(morning, evening); // Returns: true
isSameDay(morning, nextDay); // Returns: false
```

### Date Grouping

```typescript
import { truncDay } from "chronia";

interface Event {
  timestamp: Date;
  description: string;
}

// Group events by day
function groupEventsByDay(events: Event[]): Map<string, Event[]> {
  const grouped = new Map<string, Event[]>();

  for (const event of events) {
    const dayKey = truncDay(event.timestamp).toISOString();
    if (!grouped.has(dayKey)) {
      grouped.set(dayKey, []);
    }
    grouped.get(dayKey)!.push(event);
  }

  return grouped;
}

const events = [
  { timestamp: new Date(2024, 5, 15, 9, 0), description: "Morning meeting" },
  { timestamp: new Date(2024, 5, 15, 14, 30), description: "Afternoon call" },
  { timestamp: new Date(2024, 5, 16, 10, 0), description: "Next day event" },
];

const grouped = groupEventsByDay(events);
// Returns: Map with 2 entries (June 15 and June 16)
```

### Range Queries

```typescript
import { truncDay } from "chronia";

// Create a date range filter with precise day boundaries
function filterByDateRange(
  items: Array<{ date: Date }>,
  startDate: Date,
  endDate: Date,
): Array<{ date: Date }> {
  const start = truncDay(startDate);
  const end = truncDay(endDate);

  return items.filter((item) => {
    const itemDay = truncDay(item.date);
    return itemDay >= start && itemDay <= end;
  });
}

// Usage
const items = [
  { date: new Date(2024, 5, 14, 23, 59) }, // June 14 late night
  { date: new Date(2024, 5, 15, 0, 1) }, // June 15 just after midnight
  { date: new Date(2024, 5, 16, 12, 0) }, // June 16 noon
  { date: new Date(2024, 5, 17, 0, 0) }, // June 17 midnight
];

const filtered = filterByDateRange(
  items,
  new Date(2024, 5, 15, 10, 0), // Start: June 15 10:00
  new Date(2024, 5, 16, 14, 0), // End: June 16 14:00
);
// Returns: 2 items (June 15 and June 16)
```

### Calendar Operations

```typescript
import { truncDay } from "chronia";

// Calculate number of days between two dates
function daysBetween(date1: Date, date2: Date): number {
  const day1 = truncDay(date1);
  const day2 = truncDay(date2);
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((day2.getTime() - day1.getTime()) / msPerDay);
}

// Check if a date is today
function isToday(date: Date): boolean {
  const today = truncDay(new Date());
  const checkDate = truncDay(date);
  return today.getTime() === checkDate.getTime();
}

// Examples
const start = new Date(2024, 5, 15, 14, 30);
const end = new Date(2024, 5, 20, 9, 15);

daysBetween(start, end); // Returns: 5

const now = new Date();
isToday(now); // Returns: true
isToday(new Date(2024, 5, 15, 23, 59, 59)); // Returns: false (unless today is June 15, 2024)
```

### Data Normalization

```typescript
import { truncDay } from "chronia";

// Normalize timestamps from different sources
function normalizeTimestamps(dates: Array<Date | number>): Date[] {
  return dates.map((date) => truncDay(date));
}

// Works with both Date objects and timestamps
const mixed = [
  new Date(2024, 5, 15, 14, 30, 45, 123), // Date with full time
  1718467200000, // Timestamp (milliseconds)
  new Date(2024, 5, 17, 23, 59, 59, 999), // End of day
];

const normalized = normalizeTimestamps(mixed);
// Returns: Array of 3 Dates, all set to 00:00:00.000
// [
//   June 15, 2024 00:00:00.000,
//   June 15, 2024 00:00:00.000,
//   June 17, 2024 00:00:00.000
// ]

// Invalid inputs are handled gracefully
truncDay(new Date("invalid")); // Returns: Invalid Date
truncDay(NaN); // Returns: Invalid Date
truncDay(Infinity); // Returns: Invalid Date
```
