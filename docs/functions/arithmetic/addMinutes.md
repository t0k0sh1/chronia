# addMinutes

## Overview

The `addMinutes` function adds a specified number of minutes to a given date, returning a new Date object with the adjusted time. It supports both positive and negative minute values and works with Date objects or numeric timestamps.

## Signature

```typescript
function addMinutes(date: Date | number, amount: number): Date;
```

## Parameters

| Parameter | Type             | Description                                                |
| --------- | ---------------- | ---------------------------------------------------------- |
| `date`    | `Date \| number` | The base date as a Date object or numeric timestamp        |
| `amount`  | `number`         | The number of minutes to add (can be negative to subtract) |

## Return Value

| Type   | Description                                                                                 |
| ------ | ------------------------------------------------------------------------------------------- |
| `Date` | A new Date object with the specified minutes added, or Invalid Date if any input is invalid |

## Description

The `addMinutes` function performs minute-based time manipulation on a given date. It validates both inputs before processing and returns a new Date instance, preserving the original date object. The function handles fractional minutes by truncating them toward zero, and it maintains the seconds and milliseconds components of the original date.

### Specification

#### Returns a valid Date when:

- The `date` argument is a valid Date object (not Invalid Date)
- The `date` argument is a finite numeric timestamp, including:
  - Positive timestamps (dates after Unix epoch)
  - Zero (`0`, representing January 1, 1970, 00:00:00 UTC)
  - Negative timestamps (dates before Unix epoch)
- The `amount` argument is a finite number (can be positive, negative, or zero)
- Fractional `amount` values are truncated using `Math.trunc`:
  - `1.9` becomes `1`
  - `-1.9` becomes `-1`

#### Returns Invalid Date when:

- The `date` argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The `date` argument is `NaN`, `Infinity`, or `-Infinity`
- The `amount` argument is `NaN`, `Infinity`, or `-Infinity`

### Behavior Notes

- **Immutability**: Always returns a new Date instance; does not mutate the input date
- **Validation**: Validates all arguments before processing using internal validators
- **Fractional handling**: Uses `Math.trunc()` to truncate fractional minutes toward zero
- **Time preservation**: Preserves seconds and milliseconds from the original date
- **Boundary crossing**: Automatically handles hour, day, month, and year boundary crossings
- **Error handling**: No exceptions thrown; invalid inputs return Invalid Date
- **Type safety**: TypeScript ensures only `Date | number` for date and `number` for amount

## Use Cases

- **Time Scheduling**: Add or subtract minutes from appointment times, meeting schedules, or event timestamps. Useful for calculating buffer times between events or adjusting scheduled times.
- **Duration Calculations**: Calculate future or past times based on minute offsets. Commonly used in countdown timers, expiration calculations, or time-based workflows.
- **Time Zone Adjustments**: Apply minute-level time zone offsets when working with UTC conversions or custom time zones that have non-hour offsets (e.g., UTC+5:30).
- **User Input Processing**: Process user-specified time adjustments in applications where users can shift times by minutes, such as calendar applications or reminder systems.
- **Data Transformation**: Transform timestamps in data processing pipelines where minute-level precision is required, such as log analysis or time-series data manipulation.

## Usage Examples

### Time Scheduling

```typescript
import { addMinutes } from "chronia";

// Add 15 minutes to appointment time
const appointmentStart = new Date(2025, 0, 15, 14, 30, 0);
const appointmentEnd = addMinutes(appointmentStart, 45);
// Returns: 2025-01-15T15:15:00

// Add buffer time between meetings
const meeting1End = new Date(2025, 0, 15, 10, 0, 0);
const meeting2Start = addMinutes(meeting1End, 15);
// Returns: 2025-01-15T10:15:00

// Subtract minutes to calculate start time
const eventEnd = new Date(2025, 0, 15, 18, 0, 0);
const eventStart = addMinutes(eventEnd, -90);
// Returns: 2025-01-15T16:30:00
```

### Duration Calculations

```typescript
import { addMinutes } from "chronia";

// Calculate expiration time (30 minutes from now)
const now = new Date();
const expiresAt = addMinutes(now, 30);

// Calculate time 2 hours ago (negative minutes)
const twoHoursAgo = addMinutes(new Date(), -120);

// Fractional minutes are truncated
const base = new Date(2025, 0, 1, 12, 0, 0);
const result = addMinutes(base, 5.9);
// Returns: 2025-01-01T12:05:00 (5.9 truncated to 5)
```

### Boundary Crossing

```typescript
import { addMinutes } from "chronia";

// Crossing hour boundary
const time1 = new Date(2025, 0, 1, 23, 45, 30, 500);
const time2 = addMinutes(time1, 30);
// Returns: 2025-01-02T00:15:30.500
// Note: Seconds and milliseconds are preserved

// Crossing day boundary
const endOfDay = new Date(2025, 0, 31, 23, 50, 0);
const nextDay = addMinutes(endOfDay, 20);
// Returns: 2025-02-01T00:10:00

// Crossing month and year boundaries
const yearEnd = new Date(2025, 11, 31, 23, 55, 0);
const newYear = addMinutes(yearEnd, 10);
// Returns: 2026-01-01T00:05:00
```

### Time Zone Adjustments

```typescript
import { addMinutes } from "chronia";

// Convert UTC to India Standard Time (UTC+5:30)
const utcTime = new Date("2025-01-15T12:00:00Z");
const istTime = addMinutes(utcTime, 330); // 5.5 hours = 330 minutes
// Returns: 2025-01-15T17:30:00

// Apply custom time zone offset
const baseTime = new Date("2025-01-15T10:00:00Z");
const offset = -345; // UTC-5:45 (Nepal Time)
const localTime = addMinutes(baseTime, offset);
// Returns: 2025-01-15T04:15:00
```

### Input Validation

```typescript
import { addMinutes } from "chronia";

// Handle invalid date inputs
const invalidDate = new Date("invalid");
const result1 = addMinutes(invalidDate, 30);
// Returns: Invalid Date

// Handle invalid amount inputs
const validDate = new Date(2025, 0, 1, 12, 0, 0);
const result2 = addMinutes(validDate, NaN);
// Returns: Invalid Date

// Validate before processing
function safeAddMinutes(date: Date | number, minutes: number): Date | null {
  const result = addMinutes(date, minutes);
  return isNaN(result.getTime()) ? null : result;
}

const safe1 = safeAddMinutes(new Date(2025, 0, 1), 30);
// Returns: valid Date object

const safe2 = safeAddMinutes(new Date("invalid"), 30);
// Returns: null
```
