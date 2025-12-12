# setSeconds

## Overview

The `setSeconds` function sets the seconds component of a given Date object or timestamp, returning a new Date instance with the updated value. It provides validation and handles fractional values and rollover behavior consistently with Chronia's API design.

## Signature

```typescript
function setSeconds(date: DateInput, seconds: number): Date;
```

## Parameters

| Parameter | Type        | Description                                                                     |
| --------- | ----------- | ------------------------------------------------------------------------------- |
| `date`    | `DateInput` | A Date object, numeric timestamp, or ISO 8601 string representing the base date |
| `seconds` | `number`    | The seconds value to set (0-59 for normal range, other values will roll over)   |

## Return Value

| Type   | Description                                                                                                      |
| ------ | ---------------------------------------------------------------------------------------------------------------- |
| `Date` | A new Date object with the seconds component set to the specified value, or Invalid Date if any input is invalid |

## Description

The `setSeconds` function creates a new Date object by setting the seconds component of the provided date to the specified value. It validates both arguments before processing and handles fractional seconds by truncating them toward zero. The function preserves all other time components (year, month, day, hours, minutes, and milliseconds) while updating only the seconds.

### Specification

#### Returns a valid Date when:

- The `date` argument is a valid `Date` object (not Invalid Date)
- The `date` argument is a finite numeric timestamp, including:
  - Positive timestamps (dates after Unix epoch)
  - Zero (`0`, representing January 1, 1970, 00:00:00 UTC)
  - Negative timestamps (dates before Unix epoch)
- The `seconds` argument is a finite number (including negative values, zero, or values > 59)
- Fractional `seconds` values are provided (truncated toward zero using `Math.trunc`)

#### Returns Invalid Date when:

- The `date` argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The `date` argument is `NaN`, `Infinity`, or `-Infinity`
- The `seconds` argument is `NaN`, `Infinity`, or `-Infinity`

#### Rollover Behavior:

- Seconds values >= 60 roll over to the next minute (e.g., 60 seconds → 1 minute, 0 seconds)
- Negative seconds values roll back to the previous minute (e.g., -1 seconds → previous minute, 59 seconds)
- Rollover may cascade to affect minutes, hours, days, months, and years

### Behavior Notes

- No exceptions are thrown; invalid inputs return Invalid Date
- Fractional seconds are truncated using `Math.trunc` (30.9 → 30, -30.9 → -30)
- Always returns a new Date instance (immutable pattern; does not mutate input)
- Uses the same validation logic as other Chronia functions for consistency
- Preserves all time components except seconds (year, month, day, hours, minutes, milliseconds remain unchanged)
- Type-safe with TypeScript, accepting only `Date | number` for date and `number` for seconds

## Use Cases

- **Time Normalization**: Reset seconds to zero or a specific value when standardizing timestamps. Useful for creating timestamps at the start of each minute or aligning times to specific second intervals.
- **Time Adjustment**: Modify the seconds component of a date without affecting other time components. Particularly useful when you need to set precise times based on user input or external data sources.
- **Scheduled Events**: Set specific second values for timed operations or scheduled tasks. Enables precise control over when events should trigger within a given minute.
- **Time Calculations**: Combine with other date manipulation functions to perform complex time calculations. Allows for granular control over time components in multi-step date transformations.
- **Testing and Mocking**: Create specific timestamps for testing purposes where exact second values are required. Useful for reproducible tests that depend on precise timing.

## Usage Examples

### Time Normalization

```typescript
import { setSeconds } from "chronia";

// Reset seconds to 0 (start of minute)
const now = new Date(2025, 0, 15, 12, 30, 45, 500);
const normalized = setSeconds(now, 0);
// Returns: 2025-01-15 12:30:00.500 (milliseconds preserved)

// Set to 30 seconds
const halfMinute = setSeconds(new Date(2025, 0, 15, 12, 30, 45), 30);
// Returns: 2025-01-15 12:30:30

// Using numeric timestamp
const timestamp = 1705324245000; // Some timestamp
const updated = setSeconds(timestamp, 0);
// Returns: Date with seconds set to 0
```

### Time Adjustment

```typescript
import { setSeconds } from "chronia";

// Update specific second value
function setSecondsFromInput(baseDate: Date, userSeconds: number): Date {
  return setSeconds(baseDate, userSeconds);
}

const base = new Date(2025, 0, 15, 12, 30, 45);
const result = setSecondsFromInput(base, 15);
// Returns: 2025-01-15 12:30:15
```

### Rollover Behavior

```typescript
import { setSeconds } from "chronia";

const baseDate = new Date(2025, 0, 15, 12, 30, 45);

// Seconds roll over to next minute
const overflow = setSeconds(baseDate, 60);
// Returns: 2025-01-15 12:31:00

// Negative seconds roll back to previous minute
const underflow = setSeconds(baseDate, -1);
// Returns: 2025-01-15 12:29:59

// Large values cascade through time components
const largeValue = setSeconds(baseDate, 3600); // 60 minutes worth of seconds
// Returns: 2025-01-15 13:30:00
```

### Fractional Seconds Handling

```typescript
import { setSeconds } from "chronia";

const baseDate = new Date(2025, 0, 15, 12, 30, 45);

// Positive fractional values truncated toward zero
const fraction1 = setSeconds(baseDate, 30.9);
// Returns: 2025-01-15 12:30:30 (not 31)

// Negative fractional values truncated toward zero
const fraction2 = setSeconds(baseDate, -30.9);
// Returns: 2025-01-15 12:29:30 (not 29)

// Very small fractions become 0
const fraction3 = setSeconds(baseDate, 0.9);
// Returns: 2025-01-15 12:30:00
```

### Input Validation

```typescript
import { setSeconds } from "chronia";

// Invalid date input returns Invalid Date
const invalid1 = setSeconds(new Date("invalid"), 30);
// Returns: Invalid Date

// Invalid seconds input returns Invalid Date
const invalid2 = setSeconds(new Date(2025, 0, 15), NaN);
// Returns: Invalid Date

// Infinity returns Invalid Date
const invalid3 = setSeconds(new Date(2025, 0, 15), Infinity);
// Returns: Invalid Date

// Check for validity
function safeSetSeconds(date: Date, seconds: number): Date | null {
  const result = setSeconds(date, seconds);
  return isNaN(result.getTime()) ? null : result;
}
```
