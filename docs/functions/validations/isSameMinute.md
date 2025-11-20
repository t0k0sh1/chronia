# isSameMinute

## Overview

The `isSameMinute` function checks whether two dates fall within the same minute, ignoring seconds and milliseconds. It provides a precise temporal comparison that is useful for minute-level date equality checks in Chronia's consistent API surface.

## Signature

```typescript
function isSameMinute(dateLeft: Date | number, dateRight: Date | number): boolean
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `dateLeft` | `Date \| number` | The first date as a Date object or numeric timestamp |
| `dateRight` | `Date \| number` | The second date as a Date object or numeric timestamp |

## Return Value

| Type | Description |
|------|-------------|
| `boolean` | Returns `true` if both dates are in the same minute, `false` otherwise |

## Description

The `isSameMinute` function determines whether two dates share the same minute by comparing their year, month, day, hour, and minute components. The function leverages Chronia's `diffMinutes` utility internally, which normalizes both dates to the start of their respective minutes before comparison, ensuring that seconds and milliseconds do not affect the result.

### Specification

#### Returns `true` when:
- Both dates have the same year, month, day, hour, and minute
- Seconds and milliseconds may differ between the two dates
- Both arguments are valid Date objects or finite numeric timestamps

#### Returns `false` when:
- The dates differ in year, month, day, hour, or minute
- Either argument is an Invalid Date object (e.g., `new Date('invalid')`)
- Either argument is `NaN`
- Either argument is `Infinity` or `-Infinity`
- The dates have the same minute of the hour but different hours (e.g., 14:30 vs 15:30)

### Behavior Notes

- No exceptions are thrown; invalid values return `false`
- Uses `diffMinutes` internally to determine if the minute difference is exactly zero
- Seconds and milliseconds are completely ignored in the comparison
- Type-safe with TypeScript, accepting only `Date | number`
- Handles DST (Daylight Saving Time) transitions correctly
- Consistent with Chronia's validation logic used across the library
- Performance-optimized for high-frequency comparison scenarios

## Use Cases

- **Event Scheduling**: Compare timestamps to determine if two events occurred or are scheduled for the same minute. Useful for calendar applications where minute-level precision is required but second-level differences are irrelevant.
- **Time-Based Grouping**: Group logs, messages, or activities that occurred within the same minute for aggregation or display purposes. Particularly helpful for chat applications or activity feeds.
- **Temporal Validation**: Verify that two date inputs represent the same point in time at minute precision, useful for form validation where users select times.
- **Data Deduplication**: Identify and filter duplicate entries that share the same minute timestamp, helping to prevent redundant processing of time-series data.

## Usage Examples

### Event Scheduling

```typescript
import { isSameMinute } from 'chronia';

// Check if two meeting times are in the same minute
const meeting1 = new Date(2024, 5, 15, 14, 30, 0);
const meeting2 = new Date(2024, 5, 15, 14, 30, 45);

isSameMinute(meeting1, meeting2);  // Returns: true

// Different minutes return false
const meeting3 = new Date(2024, 5, 15, 14, 31, 0);
isSameMinute(meeting1, meeting3);  // Returns: false

// Works with timestamps
const timestamp1 = new Date(2024, 5, 15, 14, 30, 15, 500).getTime();
const timestamp2 = new Date(2024, 5, 15, 14, 30, 45, 800).getTime();
isSameMinute(timestamp1, timestamp2);  // Returns: true
```

### Time-Based Grouping

```typescript
import { isSameMinute } from 'chronia';

interface LogEntry {
  timestamp: Date;
  message: string;
}

// Group log entries by minute
function groupLogsByMinute(logs: LogEntry[]): LogEntry[][] {
  const groups: LogEntry[][] = [];

  for (const log of logs) {
    const group = groups.find(g => isSameMinute(g[0].timestamp, log.timestamp));
    if (group) {
      group.push(log);
    } else {
      groups.push([log]);
    }
  }

  return groups;
}

const logs = [
  { timestamp: new Date(2024, 5, 15, 14, 30, 5), message: 'Error occurred' },
  { timestamp: new Date(2024, 5, 15, 14, 30, 32), message: 'Retry attempted' },
  { timestamp: new Date(2024, 5, 15, 14, 31, 10), message: 'Success' },
];

groupLogsByMinute(logs);
// Returns: Two groups - first with 2 entries (14:30), second with 1 entry (14:31)
```

### Temporal Validation

```typescript
import { isSameMinute } from 'chronia';

// Validate that start and end times are not in the same minute
function validateTimeRange(start: Date, end: Date): boolean {
  if (isSameMinute(start, end)) {
    console.log('Start and end times must be in different minutes');
    return false;
  }
  return true;
}

const start = new Date(2024, 5, 15, 14, 30, 0);
const end = new Date(2024, 5, 15, 14, 30, 59);

validateTimeRange(start, end);  // Returns: false (same minute)

const validEnd = new Date(2024, 5, 15, 14, 31, 0);
validateTimeRange(start, validEnd);  // Returns: true (different minutes)
```

### Data Deduplication

```typescript
import { isSameMinute } from 'chronia';

interface Activity {
  userId: string;
  timestamp: Date;
  action: string;
}

// Remove duplicate activities within the same minute for the same user
function deduplicateActivities(activities: Activity[]): Activity[] {
  return activities.filter((activity, index, arr) => {
    const duplicate = arr.slice(0, index).find(
      prev => prev.userId === activity.userId &&
              isSameMinute(prev.timestamp, activity.timestamp)
    );
    return !duplicate;
  });
}

const activities = [
  { userId: 'user1', timestamp: new Date(2024, 5, 15, 14, 30, 10), action: 'click' },
  { userId: 'user1', timestamp: new Date(2024, 5, 15, 14, 30, 45), action: 'click' },
  { userId: 'user1', timestamp: new Date(2024, 5, 15, 14, 31, 5), action: 'click' },
];

deduplicateActivities(activities);
// Returns: Two activities - one at 14:30 and one at 14:31 (duplicate removed)

// Invalid dates return false
isSameMinute(new Date('invalid'), new Date(2024, 5, 15, 14, 30));  // Returns: false
```
