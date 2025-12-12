# setMilliseconds

## Overview

The `setMilliseconds` function creates a new Date object with the milliseconds component set to a specified value while preserving all other date and time components. It provides a type-safe, immutable way to modify the milliseconds field of a date.

## Signature

```typescript
function setMilliseconds(date: DateInput, milliseconds: number): Date;
```

## Parameters

| Parameter      | Type        | Description                                                           |
| -------------- | ----------- | --------------------------------------------------------------------- |
| `date`         | `DateInput` | The base date as a Date object, numeric timestamp, or ISO 8601 string |
| `milliseconds` | `number`    | The milliseconds value to set (fractions are truncated toward zero)   |

## Return Value

| Type   | Description                                                                                                 |
| ------ | ----------------------------------------------------------------------------------------------------------- |
| `Date` | A new Date object with the milliseconds set to the specified value, or Invalid Date if any input is invalid |

## Description

The `setMilliseconds` function sets the milliseconds component of a date to a specified value. It validates both the date and milliseconds arguments before processing, ensuring type safety and preventing invalid operations. The function always returns a new Date instance without mutating the original input.

### Specification

#### Returns a valid Date when:

- The `date` argument is a valid Date object (not Invalid Date)
- The `date` argument is a finite numeric timestamp (including positive, zero, or negative values)
- The `milliseconds` argument is a finite number
- Fractional `milliseconds` values are automatically truncated toward zero (e.g., `500.9` becomes `500`, `-500.9` becomes `-500`)
- Values outside the typical 0-999 range cause rollover to adjacent seconds:
  - `1000` or higher rolls forward to the next second
  - Negative values roll backward to the previous second

#### Returns Invalid Date when:

- The `date` argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The `date` argument is `NaN`, `Infinity`, or `-Infinity`
- The `milliseconds` argument is `NaN`, `Infinity`, or `-Infinity`

### Behavior Notes

- No exceptions are thrown; invalid inputs result in Invalid Date
- Uses the same validation logic as other Chronia functions for consistency
- Fractional milliseconds are truncated using `Math.trunc` (not rounded)
- The original date/timestamp is never modified; a new Date instance is always returned
- Preserves all other date components: year, month, day, hours, minutes, seconds
- Type-safe with TypeScript, accepting only `Date | number` for date and `number` for milliseconds
- Rollover behavior matches JavaScript's native `Date.prototype.setMilliseconds()` specification

## Use Cases

- **Precise Timestamp Control**: Set exact millisecond precision for timestamps in logging, performance monitoring, or event tracking systems where millisecond-level accuracy is required.
- **Time Normalization**: Normalize dates to specific millisecond values (e.g., `0`) when comparing or grouping dates by second, making time-based comparisons more predictable.
- **Animation and Timing**: Synchronize animation frames or timed events to specific millisecond values within a second, useful in game development or media playback scenarios.
- **Testing and Mocking**: Create deterministic dates with controlled millisecond values for unit tests, ensuring reproducible test results when testing time-sensitive logic.
- **Data Processing**: Adjust millisecond components of dates from external sources or APIs while preserving other time components, particularly when processing batches of timestamps.

## Usage Examples

### Precise Timestamp Control

```typescript
import { setMilliseconds } from "chronia";

// Set milliseconds to a specific value
const baseDate = new Date(2025, 0, 15, 12, 30, 45, 123);
const result = setMilliseconds(baseDate, 500);
// Returns: 2025-01-15T12:30:45.500Z

// Using a numeric timestamp
const timestamp = Date.now();
const normalized = setMilliseconds(timestamp, 250);
// Returns: New Date with milliseconds set to 250

// Original date is not modified
console.log(baseDate.getMilliseconds()); // Returns: 123
console.log(result.getMilliseconds()); // Returns: 500
```

### Time Normalization

```typescript
import { setMilliseconds } from "chronia";

// Normalize to zero milliseconds for second-level comparisons
function normalizeToSecond(date: Date | number): Date {
  return setMilliseconds(date, 0);
}

const date1 = new Date(2025, 0, 15, 12, 30, 45, 123);
const date2 = new Date(2025, 0, 15, 12, 30, 45, 987);

const normalized1 = normalizeToSecond(date1); // Returns: 2025-01-15T12:30:45.000Z
const normalized2 = normalizeToSecond(date2); // Returns: 2025-01-15T12:30:45.000Z

// Now dates can be compared at second precision
console.log(normalized1.getTime() === normalized2.getTime()); // Returns: true
```

### Animation and Timing

```typescript
import { setMilliseconds } from "chronia";

// Synchronize to specific millisecond marks within a second
function snapToFrame(date: Date, frameRate: number = 60): Date {
  const msPerFrame = 1000 / frameRate; // ~16.67ms for 60fps
  const currentMs = date.getMilliseconds();
  const snappedMs = Math.floor(currentMs / msPerFrame) * msPerFrame;
  return setMilliseconds(date, snappedMs);
}

const timestamp = new Date(2025, 0, 15, 12, 30, 45, 789);
const frameAligned = snapToFrame(timestamp);
// Returns: Date with milliseconds aligned to 60fps frame boundary
```

### Testing and Mocking

```typescript
import { setMilliseconds } from "chronia";

// Create deterministic dates for testing
function createTestDate(milliseconds: number): Date {
  const baseDate = new Date(2025, 0, 1, 0, 0, 0, 0);
  return setMilliseconds(baseDate, milliseconds);
}

// Test with controlled millisecond values
const testDate1 = createTestDate(0); // Returns: 2025-01-01T00:00:00.000Z
const testDate2 = createTestDate(500); // Returns: 2025-01-01T00:00:00.500Z
const testDate3 = createTestDate(999); // Returns: 2025-01-01T00:00:00.999Z
```

### Edge Cases and Validation

```typescript
import { setMilliseconds } from "chronia";

// Fractional milliseconds are truncated
const date = new Date(2025, 0, 15, 12, 30, 45, 123);
const result1 = setMilliseconds(date, 500.9); // Returns: ...45.500Z (not 501)
const result2 = setMilliseconds(date, -500.9); // Returns: ...44.500Z (rollback with truncation)

// Rollover to next second with value >= 1000
const result3 = setMilliseconds(date, 1000); // Returns: 2025-01-15T12:30:46.000Z
const result4 = setMilliseconds(date, 1250); // Returns: 2025-01-15T12:30:46.250Z

// Rollback to previous second with negative values
const result5 = setMilliseconds(date, -1); // Returns: 2025-01-15T12:30:44.999Z
const result6 = setMilliseconds(date, -500); // Returns: 2025-01-15T12:30:44.500Z

// Invalid inputs return Invalid Date
const invalid1 = setMilliseconds(new Date("invalid"), 500); // Returns: Invalid Date
const invalid2 = setMilliseconds(new Date(2025, 0, 1), NaN); // Returns: Invalid Date
const invalid3 = setMilliseconds(NaN, 500); // Returns: Invalid Date
const invalid4 = setMilliseconds(Infinity, 500); // Returns: Invalid Date
```
