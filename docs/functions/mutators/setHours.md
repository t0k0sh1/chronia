# setHours

## Overview

The `setHours` function creates a new Date object with the hours component set to a specified value while preserving all other time components (minutes, seconds, milliseconds, and date).

## Signature

```typescript
function setHours(date: DateInput, hours: number): Date;
```

## Parameters

| Parameter | Type        | Description                                                                            |
| --------- | ----------- | -------------------------------------------------------------------------------------- |
| `date`    | `DateInput` | The base date as a Date object, numeric timestamp, or ISO 8601 string                  |
| `hours`   | `number`    | The hours to set (typically 0-23, though out-of-range values will cause date rollover) |

## Return Value

| Type   | Description                                                                                          |
| ------ | ---------------------------------------------------------------------------------------------------- |
| `Date` | A new Date object with the hours set to the specified value, or Invalid Date if any input is invalid |

## Description

The `setHours` function provides a functional approach to modifying the hours component of a date. It validates all inputs before processing and always returns a new Date instance without mutating the original input, making it safe for use in immutable programming patterns.

### Specification

#### Returns a valid `Date` when:

- The `date` argument is a valid `Date` object (not Invalid Date)
- The `date` argument is a finite numeric timestamp
- The `hours` argument is a finite number
- The resulting date calculation produces a valid date

#### Returns `Invalid Date` when:

- The `date` argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The `date` argument is `NaN`, `Infinity`, or `-Infinity`
- The `hours` argument is `NaN`, `Infinity`, or `-Infinity`

### Behavior Notes

- **Immutability**: Always returns a new Date instance; the original date is never mutated
- **Validation**: Validates both arguments before processing using Chronia's internal validation utilities for consistency across the library
- **Truncation**: Fractional hours are truncated toward zero using `Math.trunc` (e.g., `14.9` becomes `14`, `-14.9` becomes `-14`)
- **Rollover**: Hours outside the typical 0-23 range will cause automatic date rollover
  - `24` rolls to the next day at hour `0`
  - `-1` rolls to the previous day at hour `23`
  - This follows standard JavaScript Date behavior
- **Preservation**: Preserves all other time components (minutes, seconds, milliseconds) and the date component
- **No exceptions**: Returns Invalid Date for invalid inputs rather than throwing errors

## Use Cases

- **Time Normalization**: Set specific hours for dates when building time-based features like appointment schedulers or calendar applications. Useful when you need to standardize times across different dates.
- **Deadline Setting**: Create deadline timestamps by setting business hours (e.g., set 5 PM as the cutoff time) on a given date. Commonly used in task management and project tracking systems.
- **Time Zone Adjustments**: Adjust hours when working with time zone conversions or when displaying dates in different time zones. Particularly useful when combined with timezone offset calculations.
- **Daily Event Scheduling**: Generate recurring daily events at specific hours. For example, setting daily reminders, notifications, or automated tasks to trigger at consistent times.
- **Data Transformation**: Transform date data by standardizing the hours component while preserving other time details. Useful in data processing pipelines where time normalization is required.

## Usage Examples

### Time Normalization

```typescript
import { setHours } from "chronia";

// Set hours to a specific time
const morning = setHours(new Date(2025, 0, 15, 12, 30, 45), 9);
// Returns: 2025-01-15 09:30:45

// Set to midnight (start of day)
const midnight = setHours(new Date(2025, 0, 15, 12, 30, 45), 0);
// Returns: 2025-01-15 00:30:45

// Set to end of business day
const endOfDay = setHours(new Date(2025, 0, 15, 12, 30, 45), 17);
// Returns: 2025-01-15 17:30:45
```

### Deadline Setting

```typescript
import { setHours } from "chronia";

// Create a 5 PM deadline for today
const today = new Date();
const deadline = setHours(today, 17);

// Create a 9 AM start time for a specific date
const projectStart = setHours(new Date(2025, 5, 1), 9);
// Returns: 2025-06-01 09:00:00 (preserves existing minutes/seconds)

// Set midnight deadline for submission
const submissionDeadline = setHours(new Date(2025, 2, 31), 0);
// Returns: 2025-03-31 00:00:00
```

### Hours Rollover Behavior

```typescript
import { setHours } from "chronia";

// Hours beyond 23 roll to the next day
const nextDay = setHours(new Date(2025, 0, 15, 12, 30, 45), 24);
// Returns: 2025-01-16 00:30:45

const twoDaysLater = setHours(new Date(2025, 0, 15, 12, 30, 45), 48);
// Returns: 2025-01-17 00:30:45

// Negative hours roll to the previous day
const previousDay = setHours(new Date(2025, 0, 15, 12, 30, 45), -1);
// Returns: 2025-01-14 23:30:45
```

### Fractional Hours Handling

```typescript
import { setHours } from "chronia";

// Fractional hours are truncated toward zero
const truncatedPositive = setHours(new Date(2025, 0, 15, 12, 30, 45), 14.9);
// Returns: 2025-01-15 14:30:45 (14.9 → 14)

const truncatedNegative = setHours(new Date(2025, 0, 15, 12, 30, 45), -14.9);
// Returns: 2025-01-13 10:30:45 (-14.9 → -14, then rolls back)

// Use Math.ceil or Math.floor if you need different rounding behavior
const rounded = setHours(new Date(2025, 0, 15, 12, 30, 45), Math.ceil(14.1));
// Returns: 2025-01-15 15:30:45
```

### Error Handling

```typescript
import { setHours } from "chronia";

// Invalid date input returns Invalid Date
const invalidDate = setHours(new Date("invalid"), 12);
// Returns: Invalid Date

// Invalid hours input returns Invalid Date
const invalidHours = setHours(new Date(2025, 0, 15), NaN);
// Returns: Invalid Date

const infiniteHours = setHours(new Date(2025, 0, 15), Infinity);
// Returns: Invalid Date

// Defensive programming pattern
function safeSetHours(date: Date | number, hours: number): Date | null {
  const result = setHours(date, hours);
  return isNaN(result.getTime()) ? null : result;
}
```

### Data Transformation

```typescript
import { setHours } from "chronia";

// Normalize all dates in an array to the same hour
const timestamps = [
  new Date(2025, 0, 15, 8, 30),
  new Date(2025, 0, 16, 14, 45),
  new Date(2025, 0, 17, 20, 15),
];

const normalized = timestamps.map((date) => setHours(date, 12));
// All dates now have hours set to 12, preserving their original dates and minutes

// Using with numeric timestamps
const timestamp = Date.now();
const noon = setHours(timestamp, 12);
// Returns: Date object with hours set to 12
```
