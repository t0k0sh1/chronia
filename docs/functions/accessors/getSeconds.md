# getSeconds

## Overview

The `getSeconds` function extracts the seconds component (0-59) from a given Date object or timestamp. It provides a reliable way to access the seconds value with built-in validation, consistent with Chronia's API design.

## Signature

```typescript
function getSeconds(date: DateInput): number;
```

## Parameters

| Parameter | Type        | Description                                                                            |
| --------- | ----------- | -------------------------------------------------------------------------------------- |
| `date`    | `DateInput` | A Date object, numeric timestamp, or ISO 8601 string from which to extract the seconds |

## Return Value

| Type     | Description                                                                       |
| -------- | --------------------------------------------------------------------------------- |
| `number` | Returns the seconds (0-59) of the provided date, or `NaN` if the input is invalid |

## Description

The `getSeconds` function retrieves the seconds component from the provided Date object or timestamp, returning a value between 0 and 59. It validates the input before processing to ensure consistent behavior across the Chronia library.

### Specification

#### Returns a number (0-59) when:

- The argument is a valid `Date` object
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
- Returns the seconds in the local timezone
- No exceptions are thrown; invalid values return `NaN`
- Numeric timestamps are converted to Date objects internally after validation
- Seconds value is always in the range 0-59 for valid dates
- Performance-optimized with early validation checks
- Type-safe with TypeScript, accepting only `Date | number`

## Use Cases

- **Time Component Extraction**: Extract the seconds component from a date/time value for display or calculation purposes. Useful when you need to show or process only the seconds portion of a timestamp.
- **Time Comparison**: Compare the seconds of different dates to determine if they share the same second value. Particularly useful in scheduling or time-based filtering scenarios.
- **Time Formatting**: Build custom time format strings by extracting individual time components. Combine with other accessor functions to create specific display formats.
- **Validation Workflows**: Verify that dates fall within specific second ranges or validate time precision requirements. The built-in validation ensures you can safely process the result.
- **Time-based Calculations**: Use the seconds value as input for calculations or algorithms that operate on time components, such as progress bars or countdown timers.

## Usage Examples

### Time Component Extraction

```typescript
import { getSeconds } from "chronia";

// Extract seconds from Date object
const date = new Date(2025, 0, 15, 10, 30, 45);
getSeconds(date); // Returns: 45

// Extract seconds from timestamp
const timestamp = 1704067245000; // 2024-01-01T00:00:45Z
getSeconds(timestamp); // Returns: 45

// Start of minute (0 seconds)
const startOfMinute = new Date(2024, 0, 1, 10, 30, 0);
getSeconds(startOfMinute); // Returns: 0

// End of minute (59 seconds)
const endOfMinute = new Date(2024, 0, 1, 10, 30, 59);
getSeconds(endOfMinute); // Returns: 59
```

### Time Comparison

```typescript
import { getSeconds } from "chronia";

// Compare seconds of two dates
function hasSameSecond(date1: Date, date2: Date): boolean {
  return getSeconds(date1) === getSeconds(date2);
}

const time1 = new Date(2024, 0, 1, 10, 30, 45);
const time2 = new Date(2024, 5, 15, 14, 22, 45);
hasSameSecond(time1, time2); // Returns: true (both at 45 seconds)

const time3 = new Date(2024, 0, 1, 10, 30, 30);
hasSameSecond(time1, time3); // Returns: false (45 vs 30 seconds)
```

### Time Formatting

```typescript
import { getSeconds, getMinutes, getHours } from "chronia";

// Build custom time format
function formatTime(date: Date | number): string {
  const hours = getHours(date);
  const minutes = getMinutes(date);
  const seconds = getSeconds(date);

  if (isNaN(seconds)) {
    return "Invalid time";
  }

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

formatTime(new Date(2024, 0, 1, 9, 5, 7)); // Returns: '09:05:07'
formatTime(new Date(2024, 0, 1, 14, 30, 45)); // Returns: '14:30:45'
```

### Validation Workflows

```typescript
import { getSeconds } from "chronia";

// Validate time precision (seconds must be 0)
function isRoundedToMinute(date: Date | number): boolean {
  const seconds = getSeconds(date);
  return !isNaN(seconds) && seconds === 0;
}

isRoundedToMinute(new Date(2024, 0, 1, 10, 30, 0)); // Returns: true
isRoundedToMinute(new Date(2024, 0, 1, 10, 30, 45)); // Returns: false

// Handle invalid dates gracefully
const invalidDate = new Date("invalid");
isRoundedToMinute(invalidDate); // Returns: false (NaN !== 0)
```

### Time-based Calculations

```typescript
import { getSeconds } from "chronia";

// Calculate progress within current minute
function getMinuteProgress(date: Date | number): number {
  const seconds = getSeconds(date);

  if (isNaN(seconds)) {
    return 0;
  }

  return (seconds / 60) * 100; // Percentage through the minute
}

getMinuteProgress(new Date(2024, 0, 1, 10, 30, 0)); // Returns: 0 (start)
getMinuteProgress(new Date(2024, 0, 1, 10, 30, 30)); // Returns: 50 (halfway)
getMinuteProgress(new Date(2024, 0, 1, 10, 30, 45)); // Returns: 75
getMinuteProgress(new Date(2024, 0, 1, 10, 30, 59)); // Returns: 98.33... (almost complete)
```
