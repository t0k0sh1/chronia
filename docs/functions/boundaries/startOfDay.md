# startOfDay

## Overview

The `startOfDay` function returns a new Date object set to the beginning of the day (00:00:00.000) for a given date. It resets all time components to zero while preserving the date, providing a reliable way to normalize dates to day boundaries in Chronia's consistent API surface.

## Signature

```typescript
function startOfDay(date: Date | number): Date
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `date` | `Date \| number` | The base date as a Date object or numeric timestamp |

## Return Value

| Type | Description |
|------|-------------|
| `Date` | A new Date object set to 00:00:00.000 of the same date, or Invalid Date if the input is invalid |

## Description

The `startOfDay` function takes a Date object or numeric timestamp and returns a new Date instance representing the start of that day. All time components (hours, minutes, seconds, and milliseconds) are set to zero, while the year, month, and date remain unchanged. The function leverages Chronia's internal validation utilities to ensure consistency across the library.

### Specification

#### Returns a Date set to 00:00:00.000 when:
- The argument is a valid `Date` object with any time during the day
- The argument is a finite numeric timestamp, including:
  - Positive timestamps (dates after Unix epoch)
  - Zero (`0`, representing January 1, 1970, 00:00:00 UTC)
  - Negative timestamps (dates before Unix epoch)

#### Returns Invalid Date when:
- The argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The argument is `NaN`
- The argument is `Infinity`
- The argument is `-Infinity`

### Behavior Notes

- Always returns a new Date instance; does not mutate the input
- Validates arguments before processing using `isValidDateOrNumber` for consistency with other Chronia functions
- Preserves the original date while resetting time components to zero
- Works correctly across month and year boundaries
- Type-safe with TypeScript, accepting only `Date | number`
- No exceptions are thrown; invalid inputs return Invalid Date

## Use Cases

- **Date Normalization**: Normalize dates to day boundaries for consistent date comparisons and grouping. Particularly useful when comparing dates where time components should be ignored.
- **Range Calculations**: Establish the starting point for date range calculations or time-based queries. Often used in conjunction with `endOfDay` to create complete day ranges.
- **Data Aggregation**: Group timestamps by day in analytics or reporting applications. Ensures all events within the same calendar day are treated as occurring at the same normalized time.
- **Calendar Applications**: Display events at the day level without time-of-day granularity. Useful for day-view calendars or scheduling interfaces where exact times are not relevant.
- **Time Window Creation**: Create consistent time windows for batch processing or scheduled tasks that should run once per day regardless of the exact execution time.

## Usage Examples

### Date Normalization

```typescript
import { startOfDay } from 'chronia';

// Normalize afternoon date to start of day
const afternoon = new Date(2024, 5, 15, 14, 30, 45, 123);
const dayStart = startOfDay(afternoon);
// Returns: Sat Jun 15 2024 00:00:00.000

// Normalize end of day to start of day
const endOfDay = new Date(2024, 5, 15, 23, 59, 59, 999);
const normalized = startOfDay(endOfDay);
// Returns: Sat Jun 15 2024 00:00:00.000

// Works with timestamps
const timestamp = Date.now();
const todayStart = startOfDay(timestamp);
// Returns: Start of today (00:00:00.000)
```

### Date Comparisons

```typescript
import { startOfDay } from 'chronia';

// Compare dates ignoring time
function isSameDay(date1: Date, date2: Date): boolean {
  return startOfDay(date1).getTime() === startOfDay(date2).getTime();
}

const morning = new Date(2024, 5, 15, 8, 0, 0);
const evening = new Date(2024, 5, 15, 20, 0, 0);
const nextDay = new Date(2024, 5, 16, 8, 0, 0);

isSameDay(morning, evening);  // Returns: true
isSameDay(morning, nextDay);  // Returns: false
```

### Range Calculations

```typescript
import { startOfDay } from 'chronia';

// Create a day range for filtering events
function getEventsForDay(events: Event[], date: Date): Event[] {
  const dayStart = startOfDay(date);
  const dayEnd = new Date(dayStart);
  dayEnd.setDate(dayEnd.getDate() + 1);  // Next day start

  return events.filter(event =>
    event.timestamp >= dayStart && event.timestamp < dayEnd
  );
}

// Get start of a specific date regardless of input time
const userInput = new Date(2024, 5, 15, 15, 30);
const rangeStart = startOfDay(userInput);
// Returns: Sat Jun 15 2024 00:00:00.000
```

### Data Aggregation

```typescript
import { startOfDay } from 'chronia';

// Group events by day
interface Event {
  timestamp: Date;
  value: number;
}

function aggregateByDay(events: Event[]): Map<number, number> {
  const dailyTotals = new Map<number, number>();

  for (const event of events) {
    const dayKey = startOfDay(event.timestamp).getTime();
    const currentTotal = dailyTotals.get(dayKey) || 0;
    dailyTotals.set(dayKey, currentTotal + event.value);
  }

  return dailyTotals;
}

// Events at different times on the same day are grouped together
const events = [
  { timestamp: new Date(2024, 5, 15, 9, 0), value: 100 },
  { timestamp: new Date(2024, 5, 15, 14, 30), value: 200 },
  { timestamp: new Date(2024, 5, 16, 10, 0), value: 150 },
];

const totals = aggregateByDay(events);
// Map with two entries: June 15 (300) and June 16 (150)
```

### Invalid Input Handling

```typescript
import { startOfDay } from 'chronia';

// Handles invalid dates gracefully
const invalidDate = new Date('invalid');
const result = startOfDay(invalidDate);
// Returns: Invalid Date

// Check validity before using
function safeStartOfDay(date: Date | number): Date | null {
  const result = startOfDay(date);
  return isNaN(result.getTime()) ? null : result;
}

safeStartOfDay(new Date(2024, 5, 15));  // Returns: Sat Jun 15 2024 00:00:00.000
safeStartOfDay(NaN);                     // Returns: null
safeStartOfDay(Infinity);                // Returns: null
```
