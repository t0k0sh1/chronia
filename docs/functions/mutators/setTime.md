# setTime

## Overview

The `setTime` function sets the complete timestamp of a given date, replacing the entire date/time value at once. Unlike other setters that modify individual components (year, month, day, etc.), `setTime` replaces the entire timestamp with a new value.

## Signature

```typescript
function setTime(date: Date | number, time: number): Date;
```

## Parameters

| Parameter | Type             | Description                                                                         |
| --------- | ---------------- | ----------------------------------------------------------------------------------- |
| `date`    | `Date \| number` | The base date as a Date object or numeric timestamp (milliseconds since Unix epoch) |
| `time`    | `number`         | The new timestamp in milliseconds since Unix epoch (January 1, 1970, 00:00:00 UTC)  |

## Return Value

| Type   | Description                                                                             |
| ------ | --------------------------------------------------------------------------------------- |
| `Date` | A new Date object with the specified timestamp, or Invalid Date if any input is invalid |

## Description

The `setTime` function replaces the entire timestamp of a date with a new value. This function is part of Chronia's transformation utilities and provides a validated, immutable way to set a date's complete timestamp value.

### Specification

#### Returns a valid Date when:

- The `date` argument is a valid Date object (not Invalid Date)
- The `date` argument is a finite numeric timestamp
- The `time` argument is a finite number within the valid timestamp range (-8.64e15 to 8.64e15 milliseconds)
- The resulting timestamp after setting is within the valid range

#### Returns Invalid Date when:

- The `date` argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The `date` argument is `NaN`, `Infinity`, or `-Infinity`
- The `time` argument is `NaN`, `Infinity`, or `-Infinity`
- The `time` argument is outside the valid timestamp range (-8.64e15 to 8.64e15 milliseconds)

### Behavior Notes

- **Immutability**: Always returns a new Date instance; does not mutate the input date
- **Validation**: Validates both arguments before processing using Chronia's internal validation utilities
- **Consistent API**: Accepts Date objects or numeric timestamps as the first argument, consistent with other Chronia transformation functions
- **Error Handling**: Returns Invalid Date for invalid inputs instead of throwing exceptions
- **Timestamp Range**: Valid timestamps must be within -8.64e15 to 8.64e15 milliseconds (approximately -271821 to 275760 CE)
- **Fractional Milliseconds**: Fractional millisecond values are accepted but may be truncated by JavaScript's Date API
- **Total Replacement**: Unlike component-specific setters (e.g., `setYear`, `setMonth`), this function replaces all date/time components at once

## Use Cases

- **Timestamp Normalization**: Convert dates to specific known timestamps for testing or data processing. Useful when you need to ensure all dates in a collection share the same timestamp value.
- **Time Synchronization**: Set multiple date objects to a synchronized timestamp value. Particularly useful in distributed systems or when aligning events to a common reference point.
- **Date Reset**: Reset a date object to a specific point in time (e.g., Unix epoch) while maintaining the same Date object pattern in your code. Useful for initialization or baseline scenarios.
- **Timestamp Copying**: Copy the timestamp from one date calculation to another date object. Enables timestamp transfer between different date instances in your application logic.
- **Historical Date Creation**: Create dates with negative timestamps representing dates before the Unix epoch (January 1, 1970). Useful for historical data processing or timeline applications.

## Usage Examples

### Timestamp Normalization

```typescript
import { setTime } from "chronia";

// Set to a specific timestamp using Date input
const date = new Date(2023, 5, 15, 10, 30, 0);
const normalized = setTime(date, 1704067200000);
// Returns: 2024-01-01T00:00:00.000Z

// Set to a specific timestamp using number input
const timestamp = 1609459200000;
const normalized2 = setTime(timestamp, 1704067200000);
// Returns: 2024-01-01T00:00:00.000Z

// Original date remains unchanged
console.log(date.getTime());
// Returns: original timestamp (immutable behavior)
```

### Time Synchronization

```typescript
import { setTime } from "chronia";

// Synchronize multiple dates to the same timestamp
const referenceTime = Date.now();
const dates = [
  new Date(2023, 0, 1),
  new Date(2023, 6, 15),
  new Date(2024, 11, 31),
];

const synchronized = dates.map((date) => setTime(date, referenceTime));
// Returns: Array of dates all set to the same timestamp
```

### Date Reset

```typescript
import { setTime } from "chronia";

// Reset to Unix epoch (January 1, 1970, 00:00:00 UTC)
const anyDate = new Date(2025, 10, 22);
const epoch = setTime(anyDate, 0);
// Returns: 1970-01-01T00:00:00.000Z

// Reset to a specific baseline timestamp
const baseline = 1609459200000; // 2021-01-01T00:00:00.000Z
const reset = setTime(new Date(), baseline);
// Returns: 2021-01-01T00:00:00.000Z
```

### Historical Date Creation

```typescript
import { setTime } from "chronia";

// Create a date before Unix epoch (negative timestamp)
const oneDayBeforeEpoch = setTime(new Date(), -86400000);
// Returns: 1969-12-31T00:00:00.000Z

// Create a historical date (one week before epoch)
const oneWeekBeforeEpoch = setTime(new Date(), -7 * 24 * 60 * 60 * 1000);
// Returns: 1969-12-25T00:00:00.000Z
```

### Error Handling

```typescript
import { setTime } from "chronia";

// Invalid date input returns Invalid Date
const invalid1 = setTime(new Date("invalid"), 1704067200000);
// Returns: Invalid Date

// Invalid timestamp returns Invalid Date
const invalid2 = setTime(new Date(), NaN);
// Returns: Invalid Date

// Infinity returns Invalid Date
const invalid3 = setTime(new Date(), Infinity);
// Returns: Invalid Date

// Check for invalid results
function safeSetTime(date: Date | number, time: number): Date | null {
  const result = setTime(date, time);
  return isNaN(result.getTime()) ? null : result;
}
```
