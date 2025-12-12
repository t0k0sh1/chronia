# subSeconds

## Overview

The `subSeconds` function subtracts a specified number of seconds from a given date, returning a new Date object. It provides a safe and type-checked way to perform second-level date arithmetic while preserving milliseconds and handling edge cases consistently with Chronia's validation patterns.

## Signature

```typescript
function subSeconds(date: DateInput, amount: number): Date;
```

## Parameters

| Parameter | Type        | Description                                                                                          |
| --------- | ----------- | ---------------------------------------------------------------------------------------------------- |
| `date`    | `DateInput` | The base date as a Date object, numeric timestamp, or ISO 8601 string from which to subtract seconds |
| `amount`  | `number`    | The number of seconds to subtract (can be negative to add seconds instead)                           |

## Return Value

| Type   | Description                                                                                                |
| ------ | ---------------------------------------------------------------------------------------------------------- |
| `Date` | A new Date object with the specified number of seconds subtracted, or Invalid Date if any input is invalid |

## Description

The `subSeconds` function subtracts a specified number of seconds from a date by internally negating the amount and delegating to `addSeconds`. This ensures consistent behavior and validation across the library. The function validates both the date and amount arguments before processing, returning Invalid Date for any invalid inputs.

### Specification

#### Returns a valid Date when:

- The `date` argument is a valid Date object (not Invalid Date)
- The `date` argument is a finite numeric timestamp (positive, zero, or negative)
- The `amount` argument is a finite number (not NaN, Infinity, or -Infinity)
- Fractional seconds in `amount` are truncated toward zero using `Math.trunc` (e.g., 1.9 → 1, -1.9 → -1)
- Milliseconds from the original date are preserved in the result

#### Returns Invalid Date when:

- The `date` argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The `date` argument is `NaN`, `Infinity`, or `-Infinity`
- The `amount` argument is `NaN`, `Infinity`, or `-Infinity`

#### Special behaviors:

- Negative `amount` values add seconds instead of subtracting (e.g., `subSeconds(date, -15)` adds 15 seconds)
- The function automatically handles boundary crossings (minutes, hours, days, months, years)
- The result crosses boundaries as needed (e.g., subtracting 30 seconds from 12:31:15 yields 12:30:45)

### Behavior Notes

- Implements validation-first pattern consistent with other Chronia functions
- Does not mutate the input date; always returns a new Date instance
- Delegates to `addSeconds` with negated amount for consistent implementation
- Uses `Math.trunc` to truncate fractional seconds toward zero (same as `addSeconds`)
- Type-safe with TypeScript, accepting only `Date | number` for date and `number` for amount
- No exceptions are thrown; invalid inputs result in Invalid Date return value
- Preserves the original date's millisecond precision

## Use Cases

- **Time Calculations**: Calculate past times by subtracting seconds from a reference date. Useful for computing timestamps for events that occurred a specific number of seconds ago, such as cache expiration times or activity timestamps.
- **Countdown Timers**: Implement countdown functionality by repeatedly subtracting seconds from a target time. Common in scenarios like session timeouts, temporary access windows, or timed challenges.
- **Time Travel in Tests**: Create test dates by subtracting seconds from known dates. Helps in unit testing time-dependent logic by generating predictable past timestamps without hardcoding specific dates.
- **Interval Calculations**: Calculate start times by subtracting durations from end times. Useful when you know when something ended and need to determine when it started based on a known duration.
- **Rate Limiting**: Calculate when a rate-limited action will be available by subtracting the rate limit interval from the current time. Helps implement time-based throttling and cooldown mechanisms.

## Usage Examples

### Time Calculations

```typescript
import { subSeconds } from "chronia";

// Calculate a time 15 seconds in the past
const now = new Date(2025, 10, 22, 14, 30, 45);
const fifteenSecondsAgo = subSeconds(now, 15);
// Returns: 2025-11-22T14:30:30

// Subtract seconds from a timestamp
const timestamp = 1700000000000; // Numeric timestamp
const earlier = subSeconds(timestamp, 60);
// Returns: Date representing 60 seconds before the timestamp

// Calculate cache expiration (30 seconds ago)
const cacheTime = subSeconds(new Date(), 30);
// Returns: Date representing 30 seconds before current time
```

### Countdown Timers

```typescript
import { subSeconds } from "chronia";

// Implement a simple countdown
let countdown = new Date(2025, 10, 22, 12, 0, 0);

function tick() {
  countdown = subSeconds(countdown, 1);
  console.log(countdown);
}

// Session timeout calculation
const sessionStart = new Date();
const sessionDuration = 3600; // 1 hour in seconds
const currentTime = new Date();
const elapsed = Math.floor(
  (currentTime.getTime() - sessionStart.getTime()) / 1000,
);
const timeRemaining = subSeconds(sessionStart, elapsed - sessionDuration);
```

### Crossing Boundaries

```typescript
import { subSeconds } from "chronia";

// Crossing minute boundary
const time1 = new Date(2025, 10, 22, 12, 31, 15);
const result1 = subSeconds(time1, 30);
// Returns: 2025-11-22T12:30:45

// Crossing hour boundary
const time2 = new Date(2025, 10, 22, 13, 0, 10);
const result2 = subSeconds(time2, 20);
// Returns: 2025-11-22T12:59:50

// Crossing day boundary
const time3 = new Date(2025, 10, 23, 0, 0, 30);
const result3 = subSeconds(time3, 60);
// Returns: 2025-11-22T23:59:30
```

### Negative Amounts (Adding Seconds)

```typescript
import { subSeconds } from "chronia";

// Using negative amount to add seconds
const base = new Date(2025, 10, 22, 12, 30, 30);
const future = subSeconds(base, -15);
// Returns: 2025-11-22T12:30:45 (15 seconds added)

// Equivalent to addSeconds
import { addSeconds } from "chronia";
const same = addSeconds(base, 15);
// Returns: 2025-11-22T12:30:45 (same result)
```

### Fractional Seconds Handling

```typescript
import { subSeconds } from "chronia";

// Positive fractional amounts are truncated toward zero
const date1 = new Date(2025, 10, 22, 12, 0, 30);
const result1 = subSeconds(date1, 1.9);
// Returns: 2025-11-22T12:00:29 (1.9 truncated to 1)

const result2 = subSeconds(date1, 1.1);
// Returns: 2025-11-22T12:00:29 (1.1 truncated to 1)

// Negative fractional amounts are also truncated toward zero
const result3 = subSeconds(date1, -1.9);
// Returns: 2025-11-22T12:00:31 (-1.9 truncated to -1, so adds 1 second)
```

### Error Handling

```typescript
import { subSeconds } from "chronia";

// Invalid date input
const invalid1 = subSeconds(new Date("invalid"), 30);
// Returns: Invalid Date

// Invalid amount (NaN)
const invalid2 = subSeconds(new Date(), NaN);
// Returns: Invalid Date

// Invalid amount (Infinity)
const invalid3 = subSeconds(new Date(), Infinity);
// Returns: Invalid Date

// Validate results before use
function safeSubSeconds(date: Date | number, amount: number): Date | null {
  const result = subSeconds(date, amount);
  return isNaN(result.getTime()) ? null : result;
}
```

### Preserving Milliseconds

```typescript
import { subSeconds } from "chronia";

// Milliseconds are preserved
const dateWithMs = new Date(2025, 10, 22, 12, 30, 45, 750);
const result = subSeconds(dateWithMs, 10);
// Returns: 2025-11-22T12:30:35.750 (milliseconds preserved)

console.log(result.getMilliseconds()); // 750
```
