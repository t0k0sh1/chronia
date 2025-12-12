# diffSeconds

## Overview

The `diffSeconds` function calculates the difference in complete seconds between two dates. It provides accurate second-level time difference calculation while ignoring milliseconds, making it ideal for time tracking and duration measurement scenarios.

## Signature

```typescript
function diffSeconds(dateLeft: DateInput, dateRight: DateInput): number;
```

## Parameters

| Parameter   | Type        | Description                                                             |
| ----------- | ----------- | ----------------------------------------------------------------------- |
| `dateLeft`  | `DateInput` | The first date as a Date object, numeric timestamp, or ISO 8601 string  |
| `dateRight` | `DateInput` | The second date as a Date object, numeric timestamp, or ISO 8601 string |

## Return Value

| Type     | Description                                                                                                                                                |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `number` | The difference in complete seconds. Returns a positive number if `dateLeft` is after `dateRight`, negative if before, and `NaN` if either input is invalid |

## Description

The `diffSeconds` function determines the number of complete seconds between two dates by comparing them at the start of each second. This approach ensures accurate second counting by ignoring milliseconds, which prevents fractional second differences from affecting the result.

### Specification

#### Returns a positive number when:

- `dateLeft` represents a later time than `dateRight`
- Both inputs are valid Date objects or finite numeric timestamps
- The difference is calculated in complete seconds (milliseconds ignored)

#### Returns a negative number when:

- `dateLeft` represents an earlier time than `dateRight`
- Both inputs are valid Date objects or finite numeric timestamps

#### Returns zero (`0`) when:

- Both dates fall within the same second
- The dates are identical at the second precision level
- Millisecond differences exist but are ignored

#### Returns `NaN` when:

- Either argument is an Invalid Date object (e.g., `new Date('invalid')`)
- Either argument is `NaN`
- Either argument is `Infinity`
- Either argument is `-Infinity`

### Behavior Notes

- Compares dates at the start of each second by reconstructing Date objects with year, month, day, hour, minute, and second components only
- Milliseconds are completely ignored in the calculation to ensure accurate second counting
- Uses `Math.round()` to ensure integer results, though the calculation inherently produces integers
- Returns `NaN` for invalid inputs rather than throwing errors, following a graceful error handling pattern
- Handles all time boundaries correctly (minute, hour, day, month, year transitions)
- Accepts both Date objects and numeric timestamps for maximum flexibility
- Type-safe with TypeScript, accepting only `Date | number`

## Use Cases

- **Time Tracking**: Calculate elapsed time in seconds between two events or timestamps. Useful for measuring performance, user activity duration, or process execution time without millisecond precision.
- **Duration Measurement**: Determine the length of time intervals in complete seconds. Ideal for countdown timers, session duration tracking, or measuring how long operations take.
- **Timeout Calculations**: Check if a certain number of seconds have passed since a specific time. Common in session management, cache expiration logic, or rate limiting implementations.
- **Scheduling and Delays**: Calculate time differences for scheduling tasks or implementing delays measured in seconds. Useful when coordinating events that require second-level precision.
- **Data Analysis**: Compare timestamps in logs or datasets to analyze time-based patterns. Helps identify time gaps, measure intervals between events, or aggregate data by time periods.

## Usage Examples

### Time Tracking

```typescript
import { diffSeconds } from "chronia";

// Calculate elapsed time
const startTime = new Date(2024, 5, 15, 14, 30, 40);
const endTime = new Date(2024, 5, 15, 14, 30, 45);
const elapsed = diffSeconds(endTime, startTime); // Returns: 5

// Track operation duration
const operationStart = Date.now();
// ... perform operation ...
const operationEnd = Date.now();
const duration = diffSeconds(operationEnd, operationStart);

// Milliseconds are ignored (same second)
const time1 = new Date(2024, 5, 15, 14, 30, 45, 999);
const time2 = new Date(2024, 5, 15, 14, 30, 45, 0);
const diff = diffSeconds(time1, time2); // Returns: 0
```

### Duration Measurement

```typescript
import { diffSeconds } from "chronia";

// Measure session length
function getSessionDuration(loginTime: Date, logoutTime: Date): number {
  return diffSeconds(logoutTime, loginTime);
}

const login = new Date(2024, 5, 15, 9, 0, 0);
const logout = new Date(2024, 5, 15, 17, 30, 0);
const sessionSeconds = getSessionDuration(login, logout); // Returns: 30600 (8.5 hours)

// Calculate countdown
const now = new Date();
const deadline = new Date(2024, 11, 31, 23, 59, 59);
const remainingSeconds = diffSeconds(deadline, now);
```

### Timeout Calculations

```typescript
import { diffSeconds } from "chronia";

// Check session timeout
function isSessionExpired(
  lastActivityTime: Date,
  timeoutSeconds: number,
): boolean {
  const now = new Date();
  const secondsSinceActivity = diffSeconds(now, lastActivityTime);
  return secondsSinceActivity > timeoutSeconds;
}

const lastActivity = new Date(2024, 5, 15, 14, 25, 0);
const expired = isSessionExpired(lastActivity, 300); // 5-minute timeout

// Rate limiting check
function canMakeRequest(
  lastRequestTime: number,
  cooldownSeconds: number,
): boolean {
  const secondsSinceRequest = diffSeconds(Date.now(), lastRequestTime);
  return secondsSinceRequest >= cooldownSeconds;
}
```

### Scheduling and Delays

```typescript
import { diffSeconds } from "chronia";

// Calculate time until event
function getSecondsUntilEvent(eventTime: Date): number {
  return diffSeconds(eventTime, new Date());
}

const nextEvent = new Date(2024, 5, 15, 15, 0, 0);
const secondsRemaining = getSecondsUntilEvent(nextEvent);

// Negative result when first date is earlier
const past = new Date(2024, 5, 15, 14, 30, 40);
const future = new Date(2024, 5, 15, 14, 30, 45);
const diff = diffSeconds(past, future); // Returns: -5
```

### Data Analysis

```typescript
import { diffSeconds } from "chronia";

// Analyze log entries
interface LogEntry {
  timestamp: Date;
  message: string;
}

function analyzeLogGaps(logs: LogEntry[]): number[] {
  const gaps: number[] = [];
  for (let i = 1; i < logs.length; i++) {
    const gap = diffSeconds(logs[i].timestamp, logs[i - 1].timestamp);
    gaps.push(gap);
  }
  return gaps;
}

// Invalid input handling
const validDate = new Date(2024, 5, 15, 14, 30, 45);
const invalidDate = new Date("invalid");
const result = diffSeconds(validDate, invalidDate); // Returns: NaN

// Check for invalid result
if (isNaN(result)) {
  console.log("Invalid date provided");
}
```
