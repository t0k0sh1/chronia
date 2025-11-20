# isSameDay

## Overview

The `isSameDay` function checks whether two given dates fall on the same calendar day, ignoring time components. It provides a reliable way to compare dates by calendar day in Chronia's consistent API surface.

## Signature

```typescript
function isSameDay(dateLeft: Date | number, dateRight: Date | number): boolean
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `dateLeft` | `Date \| number` | The first date as a Date object or numeric timestamp |
| `dateRight` | `Date \| number` | The second date as a Date object or numeric timestamp |

## Return Value

| Type | Description |
|------|-------------|
| `boolean` | Returns `true` if both dates are on the same calendar day, `false` otherwise |

## Description

The `isSameDay` function determines whether two dates represent the same calendar day by comparing them at midnight, effectively ignoring all time components (hours, minutes, seconds, milliseconds). It leverages Chronia's `diffDays` function internally, returning `true` when the day difference is exactly zero.

### Specification

#### Returns `true` when:
- Both dates fall on the same calendar day in the local timezone, regardless of time components
- Both dates are valid and the day difference is exactly zero
- The dates can be different Date objects or timestamps representing the same calendar day

#### Returns `false` when:
- The dates fall on different calendar days
- Either date is an Invalid Date object (e.g., `new Date('invalid')`)
- Either argument is `NaN`
- Either argument is `Infinity` or `-Infinity`
- Either date fails validation checks

### Behavior Notes

- No exceptions are thrown; invalid values return `false`
- Uses `diffDays` internally to calculate the calendar day difference
- Time components are completely ignored in the comparison
- Compares based on local timezone calendar day
- Handles DST (Daylight Saving Time) transitions correctly
- Handles leap years and month/year boundaries correctly
- Type-safe with TypeScript, accepting only `Date | number`
- Performance-optimized by delegating to `diffDays`

## Use Cases

- **Date Equality Checks**: Compare two dates to determine if they represent the same day, ignoring time differences. Particularly useful when you need to check if events, appointments, or records occurred on the same day.
- **Event Filtering**: Filter events, logs, or records that occurred on a specific day. Useful when displaying daily summaries or grouping data by calendar day.
- **Time-Independent Comparisons**: Determine if two timestamps or Date objects refer to the same calendar day without worrying about precise time matching. Essential for date-based business logic where time of day is irrelevant.
- **Date Range Boundaries**: Check if a date falls on the start or end day of a date range. Useful for validating whether a date is within inclusive date boundaries.

## Usage Examples

### Date Equality Checks

```typescript
import { isSameDay } from 'chronia';

// Same day, different times
const morning = new Date(2024, 5, 15, 9, 0, 0);
const evening = new Date(2024, 5, 15, 23, 59, 59);
isSameDay(morning, evening);  // Returns: true

// Different days
const today = new Date(2024, 5, 15, 23, 59);
const tomorrow = new Date(2024, 5, 16, 0, 0);
isSameDay(today, tomorrow);  // Returns: false

// Same day check with seconds and milliseconds
const time1 = new Date(2024, 5, 15, 14, 30, 45, 123);
const time2 = new Date(2024, 5, 15, 9, 15, 20, 987);
isSameDay(time1, time2);  // Returns: true
```

### Event Filtering

```typescript
import { isSameDay } from 'chronia';

interface Event {
  name: string;
  timestamp: Date;
}

const events: Event[] = [
  { name: 'Morning meeting', timestamp: new Date(2024, 5, 15, 9, 0) },
  { name: 'Lunch', timestamp: new Date(2024, 5, 15, 12, 30) },
  { name: 'Presentation', timestamp: new Date(2024, 5, 16, 14, 0) },
];

const targetDate = new Date(2024, 5, 15);

// Filter events that occurred on target date
const todaysEvents = events.filter(event =>
  isSameDay(event.timestamp, targetDate)
);
// Returns: [{ name: 'Morning meeting', ... }, { name: 'Lunch', ... }]
```

### Time-Independent Comparisons

```typescript
import { isSameDay } from 'chronia';

// Works with timestamps (numbers)
const date1 = new Date(2024, 5, 15, 10, 30);
const timestamp = date1.getTime();
isSameDay(date1, timestamp);  // Returns: true

// Compare user input with current date
function isToday(userDate: Date): boolean {
  return isSameDay(userDate, new Date());
}

const userInput = new Date(2024, 5, 15);
isToday(userInput);  // Returns: true if today is June 15, 2024

// Invalid dates return false
isSameDay(new Date('invalid'), new Date(2024, 5, 15));  // Returns: false
isSameDay(new Date(2024, 5, 15), NaN);  // Returns: false
```

### Date Range Boundaries

```typescript
import { isSameDay } from 'chronia';

interface DateRange {
  start: Date;
  end: Date;
}

function isOnRangeBoundary(date: Date, range: DateRange): boolean {
  return isSameDay(date, range.start) || isSameDay(date, range.end);
}

const range = {
  start: new Date(2024, 5, 1),
  end: new Date(2024, 5, 30),
};

const checkDate = new Date(2024, 5, 1, 15, 30);
isOnRangeBoundary(checkDate, range);  // Returns: true

// Check if date falls on the first day of a range
function isRangeStart(date: Date, range: DateRange): boolean {
  return isSameDay(date, range.start);
}

isRangeStart(checkDate, range);  // Returns: true
```
