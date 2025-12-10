# isBefore

## Overview

The `isBefore` function checks if the first date is strictly before the second date. It provides flexible date comparison with optional unit-based granularity, allowing you to compare dates at different time scales (year, month, day, hour, minute, second, or millisecond).

## Signature

```typescript
function isBefore(
  a: Date | number,
  b: Date | number,
  options?: ComparisonOptions,
): boolean;
```

## Parameters

| Parameter      | Type                | Description                                                                                                                             |
| -------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `a`            | `Date \| number`    | The first date as a Date object or numeric timestamp                                                                                    |
| `b`            | `Date \| number`    | The second date as a Date object or numeric timestamp                                                                                   |
| `options`      | `ComparisonOptions` | Optional configuration object                                                                                                           |
| `options.unit` | `TimeUnit`          | The unit of comparison: `"year"`, `"month"`, `"day"`, `"hour"`, `"minute"`, `"second"`, or `"millisecond"`. Defaults to `"millisecond"` |

## Return Value

| Type      | Description                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------ |
| `boolean` | Returns `true` if date `a` is strictly before date `b`, `false` otherwise or if either date is invalid |

## Description

The `isBefore` function determines whether the first date occurs chronologically before the second date. It supports both precise millisecond-level comparison and coarser-grained comparisons by truncating dates to a specified unit before comparing.

### Specification

#### Returns `true` when:

- Date `a` is chronologically before date `b` at the specified granularity
- Both dates are valid (not Invalid Date, not `NaN`, not `Infinity`, not `-Infinity`)
- When using unit-based comparison, the truncated value of `a` is less than the truncated value of `b`
- Works with both Date objects and numeric timestamps

#### Returns `false` when:

- Date `a` is equal to date `b` (strict comparison - equality is not "before")
- Date `a` is after date `b`
- Either date `a` or date `b` is invalid (Invalid Date, `NaN`, `Infinity`, `-Infinity`)
- When using unit-based comparison, the truncated values are equal or `a` is greater

### Behavior Notes

- **Strict comparison**: Equality returns `false` - this function checks if `a` is strictly before `b`, not before-or-equal
- **Input validation**: Invalid dates return `false` immediately without throwing exceptions
- **Type flexibility**: Accepts both Date objects and numeric timestamps for both parameters
- **Unit truncation**: When a `unit` is specified, dates are truncated to that unit before comparison
  - Example: Comparing by `"day"` ignores hours, minutes, seconds, and milliseconds
  - Example: Comparing by `"year"` ignores months, days, and all time components
- **Performance**: Optimized for the common case of millisecond-precision comparison
- **Consistency**: Uses the same validation logic as other Chronia comparison functions

## Use Cases

- **Date Validation**: Verify that a start date is before an end date when validating date ranges or time periods. Essential for form validation, event scheduling, and data integrity checks.
- **Timeline Sorting**: Sort events, tasks, or records chronologically by comparing their timestamps. Particularly useful when implementing custom sorting logic for collections of dated items.
- **Access Control**: Check if the current time is before a deadline or expiration date to control feature access, validate tokens, or enforce time-based permissions.
- **Scheduling Logic**: Determine if an event or task should be scheduled by comparing it against other dates. Useful for calendar applications, reminder systems, and automated workflows.
- **Historical Filtering**: Filter datasets to include only records before a certain date, such as retrieving historical data or creating time-based reports.
- **Unit-Based Comparison**: Compare dates at specific granularities (e.g., same year, same month) without needing to manually normalize dates. Simplifies logic for grouping by time periods or checking if dates fall in the same time window.

## Usage Examples

### Date Validation

```typescript
import { isBefore } from "chronia";

// Validate date range
function isValidDateRange(start: Date, end: Date): boolean {
  return isBefore(start, end);
}

// Example usage
const startDate = new Date(2025, 0, 1); // January 1, 2025
const endDate = new Date(2025, 11, 31); // December 31, 2025

isValidDateRange(startDate, endDate); // Returns: true
isValidDateRange(endDate, startDate); // Returns: false

// Equality returns false (strict comparison)
const sameDate = new Date(2025, 0, 1);
isBefore(sameDate, sameDate); // Returns: false
```

### Timeline Sorting

```typescript
import { isBefore } from "chronia";

interface Event {
  name: string;
  timestamp: number;
}

// Sort events chronologically
function sortEventsByDate(events: Event[]): Event[] {
  return events.sort((a, b) => {
    if (isBefore(a.timestamp, b.timestamp)) return -1;
    if (isBefore(b.timestamp, a.timestamp)) return 1;
    return 0;
  });
}

// Example usage
const events: Event[] = [
  { name: "Meeting", timestamp: new Date(2025, 0, 15).getTime() },
  { name: "Deadline", timestamp: new Date(2025, 0, 10).getTime() },
  { name: "Launch", timestamp: new Date(2025, 0, 20).getTime() },
];

const sorted = sortEventsByDate(events);
// Returns: [Deadline (Jan 10), Meeting (Jan 15), Launch (Jan 20)]
```

### Access Control

```typescript
import { isBefore } from "chronia";

// Check if access token is still valid
function isTokenValid(expirationDate: Date): boolean {
  return isBefore(Date.now(), expirationDate);
}

// Check if feature is available before deadline
function isFeatureAvailable(deadlineTimestamp: number): boolean {
  const now = Date.now();
  return isBefore(now, deadlineTimestamp);
}

// Example usage
const tokenExpiry = new Date(2025, 11, 31); // December 31, 2025
isTokenValid(tokenExpiry); // Returns: true (if current date is before Dec 31, 2025)

const featureDeadline = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days from now
isFeatureAvailable(featureDeadline); // Returns: true
```

### Scheduling Logic

```typescript
import { isBefore } from "chronia";

// Check if event should be scheduled
function shouldScheduleEvent(eventDate: Date, minDate: Date): boolean {
  return !isBefore(eventDate, minDate);
}

// Find next upcoming event
function getNextEvent(
  events: Date[],
  referenceDate: Date = new Date(),
): Date | null {
  const upcomingEvents = events
    .filter((event) => !isBefore(event, referenceDate))
    .sort((a, b) => a.getTime() - b.getTime());

  return upcomingEvents.length > 0 ? upcomingEvents[0] : null;
}

// Example usage
const today = new Date(2025, 0, 15);
const eventDate = new Date(2025, 0, 20);
const pastDate = new Date(2025, 0, 1);

shouldScheduleEvent(eventDate, today); // Returns: true
shouldScheduleEvent(pastDate, today); // Returns: false
```

### Historical Filtering

```typescript
import { isBefore } from "chronia";

interface Record {
  id: string;
  createdAt: Date;
  data: unknown;
}

// Filter records before a specific date
function getRecordsBeforeDate(records: Record[], cutoffDate: Date): Record[] {
  return records.filter((record) => isBefore(record.createdAt, cutoffDate));
}

// Get records from last year
function getLastYearRecords(records: Record[]): Record[] {
  const startOfThisYear = new Date(new Date().getFullYear(), 0, 1);
  return records.filter((record) =>
    isBefore(record.createdAt, startOfThisYear),
  );
}

// Example usage
const records: Record[] = [
  { id: "1", createdAt: new Date(2024, 5, 1), data: {} },
  { id: "2", createdAt: new Date(2025, 0, 15), data: {} },
  { id: "3", createdAt: new Date(2024, 11, 31), data: {} },
];

const cutoff = new Date(2025, 0, 1); // January 1, 2025
const historical = getRecordsBeforeDate(records, cutoff);
// Returns: records with id '1' and '3' (both from 2024)
```

### Unit-Based Comparison

```typescript
import { isBefore } from "chronia";

// Compare dates at year granularity
const date1 = new Date(2024, 11, 31, 23, 59, 59); // December 31, 2024, 23:59:59
const date2 = new Date(2025, 0, 1, 0, 0, 0); // January 1, 2025, 00:00:00

isBefore(date1, date2, { unit: "year" }); // Returns: true (2024 < 2025)

// Compare dates at month granularity
const jan15 = new Date(2025, 0, 15); // January 15, 2025
const feb1 = new Date(2025, 1, 1); // February 1, 2025

isBefore(jan15, feb1, { unit: "month" }); // Returns: true (Jan < Feb)

// Compare dates at day granularity (ignores time)
const morning = new Date(2025, 0, 15, 9, 0, 0); // January 15, 2025, 09:00
const evening = new Date(2025, 0, 15, 18, 0, 0); // January 15, 2025, 18:00

isBefore(morning, evening, { unit: "day" }); // Returns: false (same day)
isBefore(morning, evening); // Returns: true (different times)

// Compare dates at hour granularity
const time1 = new Date(2025, 0, 15, 9, 30, 0); // 09:30:00
const time2 = new Date(2025, 0, 15, 9, 45, 0); // 09:45:00

isBefore(time1, time2, { unit: "hour" }); // Returns: false (same hour)
isBefore(time1, time2); // Returns: true (different minutes)
```
