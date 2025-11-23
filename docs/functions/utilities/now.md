# now

## Overview

The `now` function returns the current date and time as a Date object. It provides a consistent and convenient way to obtain the current moment across the Chronia library ecosystem.

## Signature

```typescript
function now(): Date
```

## Parameters

This function takes no parameters.

## Return Value

| Type | Description |
|------|-------------|
| `Date` | A new Date object representing the current date and time |

## Description

The `now` function creates and returns a new Date object initialized to the current moment. It serves as a simple, clean interface for obtaining the current time, making it ideal for use with other Chronia functions that operate on Date objects.

### Specification

#### Returns:

- A new `Date` object set to the current date and time
- The returned Date object includes full timestamp precision (milliseconds)
- Each call to `now()` creates a fresh Date object reflecting the time at the moment of invocation

### Behavior Notes

- No exceptions are thrown; the function always returns a valid Date object
- The returned Date object represents the system's current local time
- Successive calls to `now()` will return different Date objects with incrementing timestamps
- The function is a thin wrapper around JavaScript's `new Date()` constructor for consistency within the Chronia API
- Type-safe with TypeScript, returning a guaranteed `Date` type

## Use Cases

- **Timestamping**: Capture the current moment for logging, record creation, or event tracking. Useful for adding timestamps to database records, log entries, or user actions.
- **Relative Time Calculations**: Use as a reference point for date arithmetic operations. Combine with Chronia's date manipulation functions to calculate future or past dates relative to the current moment.
- **Time-Based Comparisons**: Establish the current time as a baseline for comparing against other dates. Useful for determining if dates are in the past or future, or calculating time differences.
- **Default Values**: Provide current date/time as a default when no specific date is provided. Common in forms, APIs, and data initialization where "now" is the sensible default.
- **Interval Measurements**: Mark start or end points for measuring elapsed time. Useful in performance monitoring, duration tracking, or time-limited operations.

## Usage Examples

### Timestamping

```typescript
import { now } from 'chronia';

// Create a timestamp for a new record
interface LogEntry {
  message: string;
  timestamp: Date;
}

function createLogEntry(message: string): LogEntry {
  return {
    message,
    timestamp: now()
  };
}

const entry = createLogEntry('User logged in');
// entry.timestamp contains the current date/time
```

### Relative Time Calculations

```typescript
import { now, addDays, subHours, addMonths } from 'chronia';

// Calculate future dates relative to now
const tomorrow = addDays(now(), 1);
const nextWeek = addDays(now(), 7);
const nextMonth = addMonths(now(), 1);

// Calculate past dates relative to now
const oneHourAgo = subHours(now(), 1);
const yesterday = addDays(now(), -1);

// Combining with other operations
const deadline = addDays(now(), 30); // 30 days from now
```

### Time-Based Comparisons

```typescript
import { now, isBefore, isAfter, differenceInDays } from 'chronia';

// Check if a date is in the past or future
function isExpired(expirationDate: Date): boolean {
  return isBefore(expirationDate, now());
}

// Calculate days until an event
function daysUntilEvent(eventDate: Date): number {
  return differenceInDays(eventDate, now());
}

// Check if within a time window
function isCurrentlyActive(startDate: Date, endDate: Date): boolean {
  const current = now();
  return isAfter(current, startDate) && isBefore(current, endDate);
}
```

### Default Values and Formatting

```typescript
import { now, format } from 'chronia';

// Provide current date as default
function scheduleTask(task: string, scheduledFor?: Date): void {
  const executeAt = scheduledFor ?? now();
  console.log(`Task "${task}" scheduled for ${executeAt}`);
}

// Format current time for display
const currentTime = format(now(), 'yyyy-MM-dd HH:mm:ss');
console.log(`Current time: ${currentTime}`);
// Output: "Current time: 2025-01-22 10:30:45"

// Create human-readable timestamps
const timestamp = format(now(), 'MMM dd, yyyy at hh:mm a');
console.log(timestamp);
// Output: "Jan 22, 2025 at 10:30 AM"
```

### Interval Measurements

```typescript
import { now, differenceInMilliseconds, differenceInSeconds } from 'chronia';

// Measure operation duration
async function measurePerformance<T>(
  operation: () => Promise<T>
): Promise<{ result: T; duration: number }> {
  const startTime = now();
  const result = await operation();
  const endTime = now();

  const duration = differenceInMilliseconds(endTime, startTime);

  return { result, duration };
}

// Usage
const { result, duration } = await measurePerformance(async () => {
  // Some async operation
  return fetch('https://api.example.com/data');
});

console.log(`Operation completed in ${duration}ms`);
```
