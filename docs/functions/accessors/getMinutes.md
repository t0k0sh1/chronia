# getMinutes

## Overview

The `getMinutes` function extracts the minutes component (0-59) from a given Date object or timestamp. It provides validated access to the minutes value in the local timezone, following Chronia's consistent API surface.

## Signature

```typescript
function getMinutes(date: DateInput): number;
```

## Parameters

| Parameter | Type        | Description                                                                            |
| --------- | ----------- | -------------------------------------------------------------------------------------- |
| `date`    | `DateInput` | A Date object, numeric timestamp, or ISO 8601 string from which to extract the minutes |

## Return Value

| Type     | Description                                                                      |
| -------- | -------------------------------------------------------------------------------- |
| `number` | Returns the minutes component (0-59) for valid dates, or `NaN` for invalid input |

## Description

The `getMinutes` function extracts the minutes component from the provided Date object or timestamp. It validates the input before processing and returns the minutes value in the local timezone, ensuring consistent behavior across the library.

### Specification

#### Returns a number between `0` and `59` when:

- The argument is a valid `Date` object (not Invalid Date)
- The argument is a finite numeric timestamp, including:
  - Positive timestamps (dates after Unix epoch)
  - Zero (`0`, representing January 1, 1970, 00:00:00 UTC)
  - Negative timestamps (dates before Unix epoch)

#### Returns `NaN` when:

- The argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The argument is `NaN`
- The argument is `Infinity`
- The argument is `-Infinity`

### Behavior Notes

- Validates arguments before processing using Chronia's internal validation utilities
- No exceptions are thrown; invalid values return `NaN`
- Returns minutes in the **local timezone**, not UTC
- For UTC minutes, use the native `Date.getUTCMinutes()` method
- Type-safe with TypeScript, accepting only `Date | number`
- Performance-optimized with single validation check

## Use Cases

- **Time Component Extraction**: Extract the minutes portion of a date-time for display or calculation purposes. Useful when you need to show or work with just the minutes component without the full time.
- **Time-Based Filtering**: Filter or group data by the minutes within an hour. For example, finding all events that occurred in the first 15 minutes of any hour.
- **Schedule Validation**: Validate that appointments or tasks are scheduled at specific minute intervals. Particularly useful when enforcing scheduling constraints like 15-minute or 30-minute intervals.
- **Time Formatting**: Build custom time format strings by extracting individual components. Allows precise control over how time values are displayed to users.
- **Time Calculations**: Calculate duration or time differences at the minute level. Essential for time tracking, scheduling, and analytics features.

## Usage Examples

### Time Component Extraction

```typescript
import { getMinutes } from "chronia";

// Extract minutes from Date object
const date = new Date(2025, 0, 15, 14, 30, 45);
getMinutes(date); // Returns: 30

// Extract minutes from timestamp
getMinutes(1704067200000); // 2024-01-01 00:00:00
// Returns: 0

// Minutes at the end of an hour
getMinutes(new Date(2024, 11, 31, 23, 59, 59));
// Returns: 59

// Minutes at the start of an hour
getMinutes(new Date(2024, 5, 15, 8, 0, 0));
// Returns: 0
```

### Time-Based Filtering

```typescript
import { getMinutes } from "chronia";

// Filter events occurring in first 15 minutes of any hour
const events = [
  new Date(2025, 0, 15, 14, 5, 0),
  new Date(2025, 0, 15, 14, 30, 0),
  new Date(2025, 0, 15, 15, 10, 0),
  new Date(2025, 0, 15, 15, 45, 0),
];

const firstQuarter = events.filter((event) => getMinutes(event) < 15);
// Returns: [Date(14:05:00), Date(15:10:00)]
```

### Schedule Validation

```typescript
import { getMinutes } from "chronia";

// Validate that appointment is on a 15-minute interval
function isValidAppointmentTime(date: Date): boolean {
  const minutes = getMinutes(date);
  return minutes % 15 === 0;
}

isValidAppointmentTime(new Date(2025, 0, 15, 14, 0, 0));
// Returns: true (0 is divisible by 15)

isValidAppointmentTime(new Date(2025, 0, 15, 14, 30, 0));
// Returns: true (30 is divisible by 15)

isValidAppointmentTime(new Date(2025, 0, 15, 14, 37, 0));
// Returns: false (37 is not divisible by 15)
```

### Time Formatting

```typescript
import { getMinutes } from "chronia";

// Build custom time format with zero-padding
function formatTime(date: Date | number): string {
  const minutes = getMinutes(date);

  if (isNaN(minutes)) {
    return "Invalid time";
  }

  const hours =
    typeof date === "number" ? new Date(date).getHours() : date.getHours();
  const paddedMinutes = String(minutes).padStart(2, "0");

  return `${hours}:${paddedMinutes}`;
}

formatTime(new Date(2025, 0, 15, 9, 5, 0));
// Returns: '9:05'

formatTime(new Date(2025, 0, 15, 14, 30, 0));
// Returns: '14:30'

formatTime(new Date("invalid"));
// Returns: 'Invalid time'
```

### Time Calculations

```typescript
import { getMinutes } from "chronia";

// Calculate minutes until next hour
function minutesUntilNextHour(date: Date): number {
  const currentMinutes = getMinutes(date);

  if (isNaN(currentMinutes)) {
    return NaN;
  }

  return 60 - currentMinutes;
}

minutesUntilNextHour(new Date(2025, 0, 15, 14, 45, 0));
// Returns: 15 (15 minutes until 15:00)

minutesUntilNextHour(new Date(2025, 0, 15, 14, 0, 0));
// Returns: 60 (at the start of the hour)

// Group data by 10-minute intervals
function get10MinuteInterval(date: Date): number {
  const minutes = getMinutes(date);
  return Math.floor(minutes / 10) * 10;
}

get10MinuteInterval(new Date(2025, 0, 15, 14, 37, 0));
// Returns: 30 (37 minutes falls in 30-39 interval)
```
