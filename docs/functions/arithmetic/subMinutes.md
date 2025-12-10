# subMinutes

## Overview

The `subMinutes` function subtracts a specified number of minutes from a given date, returning a new Date object. It provides a convenient way to perform minute-based date arithmetic while handling validation and edge cases consistently with Chronia's API patterns.

## Signature

```typescript
function subMinutes(date: Date | number, amount: number): Date;
```

## Parameters

| Parameter | Type             | Description                                                                               |
| --------- | ---------------- | ----------------------------------------------------------------------------------------- |
| `date`    | `Date \| number` | The base date as a Date object or numeric timestamp from which minutes will be subtracted |
| `amount`  | `number`         | The number of minutes to subtract (can be negative to effectively add minutes)            |

## Return Value

| Type   | Description                                                                                                |
| ------ | ---------------------------------------------------------------------------------------------------------- |
| `Date` | A new Date object with the specified number of minutes subtracted, or Invalid Date if any input is invalid |

## Description

The `subMinutes` function performs minute-based date arithmetic by subtracting the specified number of minutes from the provided date. It validates all inputs before processing and always returns a new Date instance without mutating the original input. The function intelligently handles fractional minutes by truncating toward zero, and seamlessly manages boundary crossings across hours, days, months, and years.

### Specification

#### Returns a valid `Date` when:

- The `date` argument is a valid Date object or finite numeric timestamp
- The `amount` argument is a finite number (including zero and negative values)
- Positive `amount` values subtract minutes from the date
- Negative `amount` values effectively add minutes to the date (e.g., `subMinutes(date, -15)` adds 15 minutes)
- Zero `amount` returns a new Date with the same time as the input
- Fractional `amount` values are truncated toward zero using `Math.trunc`:
  - `1.9` becomes `1` (subtracts 1 minute)
  - `-1.9` becomes `-1` (adds 1 minute)
- Seconds and milliseconds from the original date are preserved
- Automatically handles boundary crossings:
  - Hour boundaries (e.g., 12:15 minus 30 minutes becomes 11:45)
  - Day boundaries (e.g., 00:15 minus 30 minutes becomes previous day 23:45)
  - Month boundaries (e.g., February 1st 00:15 minus 30 minutes becomes January 31st 23:45)
  - Year boundaries (e.g., January 1st 00:15 minus 30 minutes becomes previous year December 31st 23:45)

#### Returns Invalid Date when:

- The `date` argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The `date` argument is `NaN`
- The `amount` argument is `NaN`
- The `amount` argument is `Infinity` or `-Infinity`

### Behavior Notes

- No exceptions are thrown; all invalid inputs return Invalid Date
- Internally delegates to `addMinutes` with a negated amount for consistent behavior
- Validates the `amount` parameter before processing to ensure it's a valid finite number
- Always returns a new Date instance, preserving immutability
- Type-safe with TypeScript, accepting only `Date | number` for the date parameter
- Handles large minute values (e.g., 10,000 minutes) by correctly calculating the resulting date across multiple days
- Uses the same validation logic as other Chronia transformation functions for consistency

## Use Cases

- **Time Calculations**: Calculate past times by subtracting minutes from a reference point. Useful for determining when an event started based on its duration, or for scheduling applications that need to work backward from a deadline.
- **Meeting Scheduling**: Determine start times when given end times and durations. For example, if a meeting ends at 3:00 PM and lasts 45 minutes, calculate that it started at 2:15 PM.
- **Countdown Timers**: Update countdown displays by subtracting elapsed time. Particularly useful in UI components that show remaining time by periodically subtracting minutes from an initial timestamp.
- **Historical Data Processing**: Calculate timestamps for historical records or logs by working backward from known reference points. Useful when reconstructing timelines or processing event sequences.
- **Time Window Calculations**: Define time ranges by subtracting durations from boundary points. For example, creating a 30-minute window before an appointment for preparation time or buffer periods.

## Usage Examples

### Time Calculations

```typescript
import { subMinutes } from "chronia";

// Subtract 15 minutes from noon
const result = subMinutes(new Date(2025, 0, 15, 12, 0, 0), 15);
// Returns: 2025-01-15T11:45:00

// Work with timestamps
const timestamp = new Date(2025, 0, 15, 12, 45, 0).getTime();
const earlier = subMinutes(timestamp, 30);
// Returns: 2025-01-15T12:15:00

// Negative amount adds minutes (equivalent to addMinutes)
const later = subMinutes(new Date(2025, 0, 15, 12, 30, 0), -15);
// Returns: 2025-01-15T12:45:00
```

### Meeting Scheduling

```typescript
import { subMinutes } from "chronia";

// Calculate meeting start time from end time
function calculateMeetingStart(endTime: Date, durationMinutes: number): Date {
  return subMinutes(endTime, durationMinutes);
}

const meetingEnd = new Date(2025, 0, 15, 15, 0, 0); // 3:00 PM
const duration = 45;
const meetingStart = calculateMeetingStart(meetingEnd, duration);
// Returns: 2025-01-15T14:15:00 (2:15 PM)

// Calculate preparation time window
const eventTime = new Date(2025, 0, 20, 10, 0, 0);
const prepStart = subMinutes(eventTime, 30);
// Returns: 2025-01-20T09:30:00
```

### Boundary Crossings

```typescript
import { subMinutes } from "chronia";

// Cross hour boundary
const crossHour = subMinutes(new Date(2025, 0, 15, 13, 15, 0), 30);
// Returns: 2025-01-15T12:45:00

// Cross day boundary
const crossDay = subMinutes(new Date(2025, 0, 15, 0, 15, 0), 30);
// Returns: 2025-01-14T23:45:00

// Cross month boundary
const crossMonth = subMinutes(new Date(2025, 1, 1, 0, 15, 0), 30);
// Returns: 2025-01-31T23:45:00

// Cross year boundary
const crossYear = subMinutes(new Date(2025, 0, 1, 0, 15, 0), 30);
// Returns: 2024-12-31T23:45:00

// Seconds and milliseconds are preserved
const preserved = subMinutes(new Date(2025, 0, 15, 12, 45, 30, 500), 15);
// Returns: 2025-01-15T12:30:30.500
```

### Fractional Amounts and Edge Cases

```typescript
import { subMinutes } from "chronia";

// Fractional amounts are truncated toward zero
const fractional1 = subMinutes(new Date(2025, 0, 15, 12, 30, 0), 1.9);
// Returns: 2025-01-15T12:29:00 (1.9 truncated to 1)

const fractional2 = subMinutes(new Date(2025, 0, 15, 12, 30, 0), -1.9);
// Returns: 2025-01-15T12:31:00 (-1.9 truncated to -1)

// Subtracting zero returns same time (new instance)
const sameTime = subMinutes(new Date(2025, 0, 15, 10, 30, 0), 0);
// Returns: 2025-01-15T10:30:00

// Large values are handled correctly
const largeValue = subMinutes(new Date(2025, 0, 15, 12, 0, 0), 10000);
// Returns: 2025-01-08T13:20:00 (almost 7 days earlier)
```

### Input Validation

```typescript
import { subMinutes } from "chronia";

// Invalid date returns Invalid Date
const invalidDate = subMinutes(new Date("invalid"), 30);
// Returns: Invalid Date

// NaN amount returns Invalid Date
const nanAmount = subMinutes(new Date(2025, 0, 15, 12, 0, 0), NaN);
// Returns: Invalid Date

// Infinity returns Invalid Date
const infinityAmount = subMinutes(new Date(2025, 0, 15, 12, 0, 0), Infinity);
// Returns: Invalid Date

// Safe usage with validation
function safeSubMinutes(date: Date | number, minutes: number): Date | null {
  const result = subMinutes(date, minutes);
  return isNaN(result.getTime()) ? null : result;
}

const safe = safeSubMinutes(new Date(2025, 0, 15, 12, 0, 0), 30);
// Returns: valid Date object

const unsafe = safeSubMinutes(new Date("invalid"), 30);
// Returns: null
```
