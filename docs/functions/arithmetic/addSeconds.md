# addSeconds

## Overview

The `addSeconds` function adds a specified number of seconds to a given date, returning a new Date object with the updated time. It provides a safe, validated way to perform second-based time calculations within Chronia's consistent API surface.

## Signature

```typescript
function addSeconds(date: Date | number, amount: number): Date;
```

## Parameters

| Parameter | Type             | Description                                                        |
| --------- | ---------------- | ------------------------------------------------------------------ |
| `date`    | `Date \| number` | The base date as a Date object or numeric timestamp                |
| `amount`  | `number`         | The number of seconds to add (can be negative to subtract seconds) |

## Return Value

| Type   | Description                                                                                           |
| ------ | ----------------------------------------------------------------------------------------------------- |
| `Date` | A new Date object with the specified number of seconds added, or Invalid Date if any input is invalid |

## Description

The `addSeconds` function performs second-based date arithmetic by adding the specified number of seconds to the provided date. It validates all inputs before processing and always returns a new Date instance without mutating the original input. Fractional seconds are truncated toward zero, and milliseconds are preserved from the original date.

### Specification

#### Returns a valid `Date` when:

- The `date` argument is a valid `Date` object
- The `date` argument is a finite numeric timestamp (positive, zero, or negative)
- The `amount` argument is a finite number (including negative values for subtraction)
- Fractional `amount` values are truncated toward zero (e.g., `1.9` becomes `1`, `-1.9` becomes `-1`)

#### Returns Invalid Date when:

- The `date` argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The `date` argument is `NaN`, `Infinity`, or `-Infinity`
- The `amount` argument is `NaN`, `Infinity`, or `-Infinity`

### Behavior Notes

- Validates arguments before processing using Chronia's internal validation utilities
- Fractional amounts are truncated using `Math.trunc()`, not rounded
- Milliseconds from the original date are preserved in the result
- The function never mutates the input date; it always returns a new Date instance
- Invalid inputs result in Invalid Date rather than throwing exceptions
- Handles minute, hour, and day boundary crossings automatically
- Type-safe with TypeScript, accepting only `Date | number` for date and `number` for amount

## Use Cases

- **Time Calculations**: Add or subtract seconds for countdown timers, session timeouts, or time-based animations. Particularly useful when working with short time intervals where second precision is required.
- **API Response Adjustment**: Adjust timestamps received from APIs by adding or subtracting seconds to account for delays, network latency, or timezone corrections at the second level.
- **Cache Expiration**: Calculate cache expiration times by adding a specific number of seconds to the current time, useful for short-lived cache entries or rate limiting windows.
- **Time Window Operations**: Create time windows by adding seconds to a base timestamp, such as creating 30-second polling intervals or defining short-duration access windows.
- **Time Series Data**: Process time series data where measurements occur at second intervals, allowing precise manipulation of data point timestamps.

## Usage Examples

### Time Calculations

```typescript
import { addSeconds } from "chronia";

// Add 15 seconds to a specific time
const baseTime = new Date(2020, 0, 1, 12, 30, 30);
const result = addSeconds(baseTime, 15);
// Returns: 2020-01-01T12:30:45

// Subtract seconds using negative amount
const earlier = addSeconds(baseTime, -15);
// Returns: 2020-01-01T12:30:15

// Crossing minute boundary
const crossMinute = addSeconds(new Date(2020, 0, 1, 12, 30, 45), 30);
// Returns: 2020-01-01T12:31:15

// Using numeric timestamp
const timestamp = new Date(2020, 0, 1, 12, 0, 0).getTime();
const fromTimestamp = addSeconds(timestamp, 90);
// Returns: 2020-01-01T12:01:30
```

### API Response Adjustment

```typescript
import { addSeconds } from "chronia";

// Adjust API timestamp for network delay
function adjustForLatency(apiTimestamp: number, latencySeconds: number): Date {
  return addSeconds(apiTimestamp, latencySeconds);
}

const serverTime = new Date("2025-01-01T12:00:00Z").getTime();
const adjustedTime = adjustForLatency(serverTime, 2);
// Returns: 2025-01-01T12:00:02Z
```

### Cache Expiration

```typescript
import { addSeconds } from "chronia";

// Set cache expiration time
function createCacheEntry<T>(data: T, ttlSeconds: number) {
  return {
    data,
    expiresAt: addSeconds(Date.now(), ttlSeconds),
  };
}

// Create a cache entry that expires in 30 seconds
const cacheEntry = createCacheEntry({ userId: 123 }, 30);
// cacheEntry.expiresAt will be 30 seconds from now

// Check if cache is still valid
function isCacheValid(expiresAt: Date): boolean {
  return Date.now() < expiresAt.getTime();
}
```

### Time Window Operations

```typescript
import { addSeconds } from "chronia";

// Create polling interval timestamps
function createPollingSchedule(
  startTime: Date,
  intervalSeconds: number,
  count: number,
): Date[] {
  const schedule: Date[] = [startTime];

  for (let i = 1; i < count; i++) {
    schedule.push(addSeconds(startTime, intervalSeconds * i));
  }

  return schedule;
}

const start = new Date(2025, 0, 1, 12, 0, 0);
const pollTimes = createPollingSchedule(start, 30, 5);
// Returns: [12:00:00, 12:00:30, 12:01:00, 12:01:30, 12:02:00]
```

### Fractional Handling

```typescript
import { addSeconds } from "chronia";

// Fractional amounts are truncated, not rounded
const base = new Date(2020, 0, 1, 12, 0, 0);

const truncated1 = addSeconds(base, 1.9);
// Returns: 2020-01-01T12:00:01 (1.9 truncated to 1)

const truncated2 = addSeconds(base, -1.9);
// Returns: 2020-01-01T11:59:59 (-1.9 truncated to -1)

// Milliseconds are preserved
const withMillis = new Date(2020, 0, 1, 12, 0, 0, 500);
const preserved = addSeconds(withMillis, 5);
// Returns: 2020-01-01T12:00:05.500 (500ms preserved)
```

### Error Handling

```typescript
import { addSeconds } from "chronia";

// Invalid date inputs return Invalid Date
const invalidDate = addSeconds(new Date("invalid"), 30);
console.log(isNaN(invalidDate.getTime())); // Returns: true

// Invalid amount inputs return Invalid Date
const invalidAmount = addSeconds(new Date(), NaN);
console.log(isNaN(invalidAmount.getTime())); // Returns: true

// Safe validation pattern
function safeAddSeconds(date: Date | number, amount: number): Date | null {
  const result = addSeconds(date, amount);
  return isNaN(result.getTime()) ? null : result;
}

const safeResult = safeAddSeconds(new Date(), 60);
// Returns: Date object or null
```
