# setMinutes

## Overview

The `setMinutes` function sets the minutes component of a given date to a specified value. It returns a new Date instance with the updated minutes while preserving all other date/time components.

## Signature

```typescript
function setMinutes(date: Date | number, minutes: number): Date;
```

## Parameters

| Parameter | Type             | Description                                                                                  |
| --------- | ---------------- | -------------------------------------------------------------------------------------------- |
| `date`    | `Date \| number` | The base date as a Date object or numeric timestamp                                          |
| `minutes` | `number`         | The minutes value to set (typically 0-59, but values outside this range will cause rollover) |

## Return Value

| Type   | Description                                                                                                      |
| ------ | ---------------------------------------------------------------------------------------------------------------- |
| `Date` | A new Date object with the minutes component set to the specified value, or Invalid Date if any input is invalid |

## Description

The `setMinutes` function modifies the minutes component of a date while leaving all other components (year, month, day, hour, seconds, milliseconds) unchanged. It validates both arguments before processing and returns a new Date instance without mutating the original input.

### Specification

#### Returns a valid Date when:

- The `date` argument is a valid Date object (not Invalid Date)
- The `date` argument is a finite numeric timestamp, including:
  - Positive timestamps (dates after Unix epoch)
  - Zero (`0`, representing January 1, 1970, 00:00:00 UTC)
  - Negative timestamps (dates before Unix epoch)
- The `minutes` argument is a finite number (not `NaN`, `Infinity`, or `-Infinity`)
- Fractional minutes are automatically truncated toward zero (e.g., `45.9` becomes `45`, `-45.9` becomes `-45`)
- Minutes outside the typical 0-59 range cause rollover:
  - `60` rolls over to the next hour at minute 0
  - `-1` rolls back to the previous hour at minute 59
  - Large values continue to roll over accordingly

#### Returns Invalid Date when:

- The `date` argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The `date` argument is `NaN`, `Infinity`, or `-Infinity`
- The `minutes` argument is `NaN`, `Infinity`, or `-Infinity`

### Behavior Notes

- No exceptions are thrown; invalid inputs return Invalid Date
- Always returns a new Date instance and never mutates the input date
- Uses `Math.trunc()` to handle fractional minutes, truncating toward zero
- Preserves the original date's year, month, day, hour, seconds, and milliseconds
- Follows Chronia's consistent validation pattern using internal validators
- Type-safe with TypeScript, accepting `Date | number` for the date parameter
- Performance-optimized for frequent date transformations

## Use Cases

- **Time Normalization**: Set minutes to a standard value (e.g., `0` or `30`) when normalizing times to specific intervals. Useful for scheduling systems that operate on half-hour or hourly blocks.
- **Meeting Schedulers**: Adjust meeting times to start at specific minute marks (e.g., on the hour or half-hour) while preserving the date and hour components.
- **Time Rounding**: Round times to the nearest quarter-hour or half-hour by setting minutes to `0`, `15`, `30`, or `45`. Common in booking and reservation systems.
- **Timestamp Manipulation**: Create new timestamps with specific minute values for testing, data generation, or API requests that require precise time values.
- **Calendar Applications**: Update event times when users modify the minutes portion of a date/time picker while keeping other components intact.

## Usage Examples

### Time Normalization

```typescript
import { setMinutes } from "chronia";

// Normalize to start of the hour
const dateTime = new Date(2025, 0, 15, 12, 37, 45);
const normalized = setMinutes(dateTime, 0);
// Returns: 2025-01-15 12:00:45

// Normalize to half-hour mark
const halfHour = setMinutes(new Date(2025, 0, 15, 14, 23, 10), 30);
// Returns: 2025-01-15 14:30:10
```

### Meeting Schedulers

```typescript
import { setMinutes } from "chronia";

// Schedule meeting to start at :00
function scheduleOnHour(proposedTime: Date): Date {
  return setMinutes(proposedTime, 0);
}

const proposed = new Date(2025, 0, 20, 15, 47, 0);
const scheduled = scheduleOnHour(proposed);
// Returns: 2025-01-20 15:00:00

// Works with timestamps too
const timestamp = Date.now();
const hourStart = setMinutes(timestamp, 0);
```

### Time Rounding

```typescript
import { setMinutes } from "chronia";

// Round to nearest quarter-hour
function roundToQuarterHour(date: Date): Date {
  const currentMinutes = date.getMinutes();
  const rounded = Math.round(currentMinutes / 15) * 15;
  return setMinutes(date, rounded);
}

const time1 = new Date(2025, 0, 15, 10, 7, 30);
roundToQuarterHour(time1); // Returns: 2025-01-15 10:00:30 (7 rounds to 0)

const time2 = new Date(2025, 0, 15, 10, 38, 30);
roundToQuarterHour(time2); // Returns: 2025-01-15 10:45:30 (38 rounds to 45)
```

### Handling Edge Cases

```typescript
import { setMinutes } from "chronia";

// Fractional minutes are truncated
const fractional = setMinutes(new Date(2025, 0, 15, 12, 30, 45), 45.9);
// Returns: 2025-01-15 12:45:45 (45.9 truncated to 45)

// Minutes rollover to next hour
const rollover = setMinutes(new Date(2025, 0, 15, 12, 30, 45), 60);
// Returns: 2025-01-15 13:00:45 (hour incremented)

// Negative minutes roll back to previous hour
const negative = setMinutes(new Date(2025, 0, 15, 12, 30, 45), -1);
// Returns: 2025-01-15 11:59:45 (hour decremented)

// Invalid inputs return Invalid Date
const invalid = setMinutes(new Date("invalid"), 30);
// Returns: Invalid Date

const nanMinutes = setMinutes(new Date(), NaN);
// Returns: Invalid Date
```

### Timestamp Manipulation

```typescript
import { setMinutes } from "chronia";

// Create specific timestamps for testing
function createTestTimestamp(hour: number, minute: number): number {
  const base = new Date(2025, 0, 1, hour, 0, 0);
  return setMinutes(base, minute).getTime();
}

const testTime1 = createTestTimestamp(9, 15); // 9:15 AM
const testTime2 = createTestTimestamp(14, 45); // 2:45 PM

// Works seamlessly with numeric timestamps
const now = Date.now();
const atMinute15 = setMinutes(now, 15);
```
