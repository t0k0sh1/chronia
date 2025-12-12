# isSameSecond

## Overview

The `isSameSecond` function checks whether two dates fall within the same second, ignoring milliseconds. It provides a precise way to compare dates at second-level granularity in Chronia's comparison API.

## Signature

```typescript
function isSameSecond(dateLeft: DateInput, dateRight: DateInput): boolean;
```

## Parameters

| Parameter   | Type        | Description                                                             |
| ----------- | ----------- | ----------------------------------------------------------------------- |
| `dateLeft`  | `DateInput` | The first date as a Date object, numeric timestamp, or ISO 8601 string  |
| `dateRight` | `DateInput` | The second date as a Date object, numeric timestamp, or ISO 8601 string |

## Return Value

| Type      | Description                                                                                         |
| --------- | --------------------------------------------------------------------------------------------------- |
| `boolean` | Returns `true` if both dates are in the same second, `false` otherwise or if either date is invalid |

## Description

The `isSameSecond` function determines whether two dates represent the same second by comparing their year, month, day, hour, minute, and second components. The millisecond component is ignored in the comparison, making it useful for second-level precision comparisons.

### Specification

#### Returns `true` when:

- Both dates have identical year, month, day, hour, minute, and second components
- The millisecond components may differ
- Both arguments are valid dates (as Date objects or numeric timestamps)
- Works with any combination of Date objects and timestamps

#### Returns `false` when:

- The dates differ in any component (year, month, day, hour, minute, or second)
- Either argument is an Invalid Date object (e.g., `new Date('invalid')`)
- Either argument is `NaN`
- Either argument is `Infinity`
- Either argument is `-Infinity`

### Behavior Notes

- Uses `diffSeconds` internally to calculate the second difference
- Returns `false` for any invalid input, ensuring type-safe comparisons
- Milliseconds are completely ignored in the comparison
- Handles DST (Daylight Saving Time) transitions correctly
- No exceptions are thrown; invalid values return `false`
- Accepts both Date objects and numeric timestamps interchangeably
- Performance-optimized for high-frequency comparison scenarios

## Use Cases

- **Time Synchronization**: Verify that events or logs occurred in the same second across different systems. Useful for correlating distributed system events where second-level precision is sufficient.
- **Deduplication**: Identify duplicate timestamps in datasets where millisecond differences should be ignored. Particularly useful when processing data from sources with varying timestamp precision.
- **Interval Detection**: Check if two operations or events happened within the same second window. Helps in rate limiting, throttling, or detecting rapid consecutive actions.
- **Animation and Timing**: Synchronize animations or timed events that need to trigger within the same second but may have slight millisecond variations. Useful in scenarios where frame-perfect timing isn't required but second-level coordination is needed.

## Usage Examples

### Time Synchronization

```typescript
import { isSameSecond } from "chronia";

// Check if events happened in the same second
const event1Time = new Date(2024, 5, 15, 14, 30, 45, 123);
const event2Time = new Date(2024, 5, 15, 14, 30, 45, 789);

isSameSecond(event1Time, event2Time); // Returns: true

// Different seconds
const event3Time = new Date(2024, 5, 15, 14, 30, 46, 0);
isSameSecond(event1Time, event3Time); // Returns: false

// Works with timestamps
const timestamp1 = new Date(2024, 5, 15, 14, 30, 45, 0).getTime();
const timestamp2 = new Date(2024, 5, 15, 14, 30, 45, 999).getTime();
isSameSecond(timestamp1, timestamp2); // Returns: true
```

### Deduplication

```typescript
import { isSameSecond } from "chronia";

interface LogEntry {
  timestamp: Date;
  message: string;
}

// Remove duplicate log entries from the same second
function deduplicateLogs(logs: LogEntry[]): LogEntry[] {
  const seen = new Set<number>();

  return logs.filter((log) => {
    const secondKey = Math.floor(log.timestamp.getTime() / 1000);

    if (seen.has(secondKey)) {
      return false;
    }

    seen.add(secondKey);
    return true;
  });
}

// Alternative: Check if specific entries are duplicates
function areDuplicateEntries(log1: LogEntry, log2: LogEntry): boolean {
  return (
    isSameSecond(log1.timestamp, log2.timestamp) &&
    log1.message === log2.message
  );
}

const log1 = {
  timestamp: new Date(2024, 5, 15, 14, 30, 45, 100),
  message: "Error",
};
const log2 = {
  timestamp: new Date(2024, 5, 15, 14, 30, 45, 900),
  message: "Error",
};
areDuplicateEntries(log1, log2); // Returns: true
```

### Interval Detection

```typescript
import { isSameSecond } from "chronia";

// Rate limiting: check if requests are too close
class RateLimiter {
  private lastRequest: Date | null = null;

  canMakeRequest(currentTime: Date): boolean {
    if (!this.lastRequest) {
      this.lastRequest = currentTime;
      return true;
    }

    // Allow only one request per second
    if (isSameSecond(this.lastRequest, currentTime)) {
      return false;
    }

    this.lastRequest = currentTime;
    return true;
  }
}

const limiter = new RateLimiter();
const time1 = new Date(2024, 5, 15, 14, 30, 45, 100);
const time2 = new Date(2024, 5, 15, 14, 30, 45, 500);
const time3 = new Date(2024, 5, 15, 14, 30, 46, 0);

limiter.canMakeRequest(time1); // Returns: true
limiter.canMakeRequest(time2); // Returns: false (same second)
limiter.canMakeRequest(time3); // Returns: true (different second)
```

### Animation and Timing

```typescript
import { isSameSecond } from "chronia";

// Synchronize multiple timers that should trigger together
class TimerCoordinator {
  private scheduledTime: Date;

  constructor(scheduledTime: Date) {
    this.scheduledTime = scheduledTime;
  }

  shouldTrigger(currentTime: Date): boolean {
    return isSameSecond(this.scheduledTime, currentTime);
  }
}

// Multiple animations triggered in the same second
const coordinator1 = new TimerCoordinator(new Date(2024, 5, 15, 14, 30, 45, 0));
const coordinator2 = new TimerCoordinator(
  new Date(2024, 5, 15, 14, 30, 45, 500),
);

const checkTime = new Date(2024, 5, 15, 14, 30, 45, 250);
coordinator1.shouldTrigger(checkTime); // Returns: true
coordinator2.shouldTrigger(checkTime); // Returns: true

// Different second - won't trigger
const laterTime = new Date(2024, 5, 15, 14, 30, 46, 0);
coordinator1.shouldTrigger(laterTime); // Returns: false
```
