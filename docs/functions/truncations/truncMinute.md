# truncMinute

## Overview

The `truncMinute` function truncates a given Date object or timestamp to the start of its minute by setting seconds and milliseconds to 0. It provides a clean way to normalize dates to minute-level precision in Chronia's consistent API surface.

## Signature

```typescript
function truncMinute(date: Date | number): Date
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `date` | `Date \| number` | A Date object or numeric timestamp to truncate to the start of the minute |

## Return Value

| Type | Description |
|------|-------------|
| `Date` | A new Date object truncated to the start of the minute (seconds and milliseconds set to 0), or Invalid Date if input is invalid |

## Description

The `truncMinute` function sets the seconds and milliseconds components to 0 while preserving the year, month, day, hour, and minute components of the input date. This effectively removes all time precision below the minute level, creating a normalized date at the exact start of that minute.

### Specification

#### Returns a valid Date when:
- The argument is a valid `Date` object, with seconds and milliseconds set to 0
- The argument is a finite numeric timestamp, converted to a Date with seconds and milliseconds set to 0
- This includes:
  - Dates already at the start of a minute (returned unchanged at the same timestamp)
  - Dates at any second within the minute (truncated to the start)
  - Dates at the end of a minute (59 seconds, 999 milliseconds)
  - Positive timestamps (dates after Unix epoch)
  - Zero (`0`, representing January 1, 1970, 00:00:00.000 UTC)
  - Negative timestamps (dates before Unix epoch)

#### Returns Invalid Date when:
- The argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The argument is `NaN`
- The argument is `Infinity`
- The argument is `-Infinity`

### Behavior Notes

- Always returns a new Date instance; the original input is never mutated
- Validates arguments before processing using Chronia's internal validation utilities
- No exceptions are thrown; invalid values return Invalid Date
- Works correctly across all 60 minutes of an hour
- Operates in local time (respects the system's timezone)
- Type-safe with TypeScript, accepting only `Date | number`
- Performance-optimized using internal `truncateToUnit` helper function

## Use Cases

- **Time Normalization**: Normalize timestamps to minute precision for bucketing or grouping operations. Particularly useful when aggregating data by minute intervals or creating time-series charts with minute-level granularity.
- **Timestamp Comparison**: Compare dates at minute precision by removing second and millisecond noise. Useful when checking if two events occurred in the same minute regardless of their exact second.
- **Data Bucketing**: Group events or records by minute for analytics, logging, or reporting purposes. Essential for time-based aggregation where minute-level precision is sufficient.
- **API Response Normalization**: Standardize date outputs in APIs where second-level precision is unnecessary or should be hidden from clients. Helps maintain consistent data formats and reduces payload verbosity.
- **Scheduled Task Alignment**: Align timestamps to minute boundaries for cron-like scheduling systems or time-based triggers that operate on minute intervals.

## Usage Examples

### Time Normalization

```typescript
import { truncMinute } from 'chronia';

// Truncate to start of minute
const date = new Date(2024, 5, 15, 14, 30, 45, 123);
const result = truncMinute(date);
// Returns: June 15, 2024 14:30:00.000

// Already at start of minute
const exactMinute = new Date(2024, 5, 15, 14, 30, 0, 0);
const result2 = truncMinute(exactMinute);
// Returns: June 15, 2024 14:30:00.000 (unchanged)

// End of minute
const endOfMinute = new Date(2024, 5, 15, 14, 30, 59, 999);
const result3 = truncMinute(endOfMinute);
// Returns: June 15, 2024 14:30:00.000
```

### Timestamp Comparison

```typescript
import { truncMinute } from 'chronia';

// Check if two dates are in the same minute
function isSameMinute(date1: Date, date2: Date): boolean {
  const trunc1 = truncMinute(date1);
  const trunc2 = truncMinute(date2);
  return trunc1.getTime() === trunc2.getTime();
}

const event1 = new Date(2024, 5, 15, 14, 30, 15, 500);
const event2 = new Date(2024, 5, 15, 14, 30, 45, 200);
isSameMinute(event1, event2);  // Returns: true

const event3 = new Date(2024, 5, 15, 14, 31, 0, 0);
isSameMinute(event1, event3);  // Returns: false
```

### Data Bucketing

```typescript
import { truncMinute } from 'chronia';

interface LogEntry {
  timestamp: Date;
  message: string;
}

// Group log entries by minute
function groupLogsByMinute(logs: LogEntry[]): Map<number, LogEntry[]> {
  const grouped = new Map<number, LogEntry[]>();

  for (const log of logs) {
    const minuteKey = truncMinute(log.timestamp).getTime();
    if (!grouped.has(minuteKey)) {
      grouped.set(minuteKey, []);
    }
    grouped.get(minuteKey)!.push(log);
  }

  return grouped;
}

const logs: LogEntry[] = [
  { timestamp: new Date(2024, 5, 15, 14, 30, 10), message: 'Event A' },
  { timestamp: new Date(2024, 5, 15, 14, 30, 45), message: 'Event B' },
  { timestamp: new Date(2024, 5, 15, 14, 31, 5), message: 'Event C' },
];

const grouped = groupLogsByMinute(logs);
// Returns: Map with 2 entries (one for 14:30, one for 14:31)
```

### Works with Timestamps

```typescript
import { truncMinute } from 'chronia';

// Works with numeric timestamps
const timestamp = Date.now();
const result = truncMinute(timestamp);
// Returns: Date at XX:XX:00.000 of current minute

// Example with specific timestamp
const specificTimestamp = 1718462445123; // Some timestamp
const truncated = truncMinute(specificTimestamp);
// Returns: Date truncated to start of that minute
```

### Invalid Input Handling

```typescript
import { truncMinute } from 'chronia';

// Invalid Date returns Invalid Date
const invalid = truncMinute(new Date('invalid'));
// Returns: Invalid Date

// NaN returns Invalid Date
const nanResult = truncMinute(NaN);
// Returns: Invalid Date

// Infinity returns Invalid Date
const infResult = truncMinute(Infinity);
// Returns: Invalid Date

// Check validity before use
function safeTruncate(date: Date | number): Date | null {
  const result = truncMinute(date);
  return isNaN(result.getTime()) ? null : result;
}
```
