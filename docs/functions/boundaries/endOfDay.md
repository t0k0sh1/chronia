# endOfDay

## Overview

The `endOfDay` function returns a new Date object set to the last moment of the day (23:59:59.999) for a given date. It preserves the calendar date while setting all time components to their maximum values.

## Signature

```typescript
function endOfDay(date: Date | number): Date
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `date` | `Date \| number` | The base date as a Date object or numeric timestamp |

## Return Value

| Type | Description |
|------|-------------|
| `Date` | A new Date object set to 23:59:59.999 of the same date, or Invalid Date if input is invalid |

## Description

The `endOfDay` function takes a date input and returns a new Date object representing the last millisecond of that calendar day. The function sets the hours to 23, minutes to 59, seconds to 59, and milliseconds to 999, effectively creating a timestamp for 23:59:59.999 on the same date.

### Specification

#### Returns a valid Date set to 23:59:59.999 when:
- The argument is a valid `Date` object
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

- Always returns a new Date instance; the input is never mutated
- Uses Chronia's internal validation utilities for consistent error handling across the library
- No exceptions are thrown; invalid inputs return Invalid Date
- Type-safe with TypeScript, accepting only `Date | number`
- The returned Date maintains the same calendar date (year, month, day) as the input
- Works correctly across month, year, and DST boundaries

## Use Cases

- **Time Range Boundaries**: Define the end boundary for date ranges when querying data or filtering by date. Useful for creating inclusive date ranges where you need to capture all events through the end of a specific day.
- **Daily Aggregations**: Calculate end-of-day timestamps for daily reporting, analytics, or data aggregation tasks. Ensures consistency when grouping data by day.
- **Deadline Management**: Set precise end-of-day deadlines for tasks, submissions, or time-sensitive operations. Guarantees that deadlines include the entire day rather than stopping at midnight.
- **Date Normalization**: Normalize various timestamps from throughout a day to a single end-of-day reference point for comparison or grouping purposes.
- **Business Logic**: Implement business rules that require operations to complete by end of day, such as same-day processing cutoffs or daily batch operations.

## Usage Examples

### Time Range Boundaries

```typescript
import { endOfDay } from 'chronia';

// Create an inclusive date range for a specific day
function getEventsForDay(targetDate: Date, events: Array<{timestamp: Date}>) {
  const dayEnd = endOfDay(targetDate);

  return events.filter(event =>
    event.timestamp <= dayEnd
  );
}

// Example: Get end of a specific day
const june15 = new Date(2024, 5, 15, 14, 30, 45, 123);
const endOfJune15 = endOfDay(june15);
// Returns: Date object for June 15, 2024 23:59:59.999

// Works with any time of day
const morning = new Date(2024, 5, 15, 6, 0, 0, 0);
endOfDay(morning);
// Returns: Date object for June 15, 2024 23:59:59.999
```

### Daily Aggregations

```typescript
import { endOfDay } from 'chronia';

// Calculate daily statistics with precise boundaries
function getDailyStats(data: Array<{timestamp: number, value: number}>, day: Date) {
  const dayEnd = endOfDay(day).getTime();

  return data
    .filter(item => item.timestamp <= dayEnd)
    .reduce((sum, item) => sum + item.value, 0);
}

// Works with timestamps
const today = Date.now();
const endOfToday = endOfDay(today);
// Returns: End of today at 23:59:59.999
```

### Deadline Management

```typescript
import { endOfDay } from 'chronia';

// Set end-of-day deadline for task completion
interface Task {
  id: string;
  dueDate: Date;
  completedAt?: Date;
}

function isTaskOverdue(task: Task, currentTime: Date = new Date()): boolean {
  const deadline = endOfDay(task.dueDate);
  return currentTime > deadline && !task.completedAt;
}

// Check if task is still within the due date
const task = {
  id: '123',
  dueDate: new Date(2024, 5, 30)
};

const deadline = endOfDay(task.dueDate);
// Returns: June 30, 2024 23:59:59.999
// Task is due any time before this moment
```

### Date Normalization

```typescript
import { endOfDay } from 'chronia';

// Normalize multiple timestamps from the same day
function normalizeToEndOfDay(timestamps: number[]): Date[] {
  return timestamps.map(ts => endOfDay(ts));
}

// All times on the same day normalize to the same end-of-day
const timestamps = [
  new Date(2024, 5, 15, 8, 0).getTime(),
  new Date(2024, 5, 15, 14, 30).getTime(),
  new Date(2024, 5, 15, 20, 45).getTime()
];

const normalized = normalizeToEndOfDay(timestamps);
// All three return: June 15, 2024 23:59:59.999
```

### Error Handling

```typescript
import { endOfDay } from 'chronia';

// Handle invalid inputs gracefully
function safeEndOfDay(date: Date | number): Date | null {
  const result = endOfDay(date);
  return isNaN(result.getTime()) ? null : result;
}

// Valid input
safeEndOfDay(new Date(2024, 5, 15));
// Returns: Date object for June 15, 2024 23:59:59.999

// Invalid input
safeEndOfDay(new Date('invalid'));
// Returns: null (after detecting Invalid Date)

// Invalid number input
safeEndOfDay(NaN);
// Returns: null (after detecting NaN)
```
