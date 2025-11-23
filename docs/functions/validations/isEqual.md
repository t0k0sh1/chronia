# isEqual

## Overview

The `isEqual` function checks if two dates represent the same point in time. It provides flexible date comparison with optional unit-based granularity, allowing you to compare dates at different time scales (year, month, day, hour, minute, second, or millisecond).

## Signature

```typescript
function isEqual(a: Date | number, b: Date | number, options?: ComparisonOptions): boolean
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `a` | `Date \| number` | The first date as a Date object or numeric timestamp |
| `b` | `Date \| number` | The second date as a Date object or numeric timestamp |
| `options` | `ComparisonOptions` | Optional configuration object |
| `options.unit` | `TimeUnit` | The unit of comparison: `"year"`, `"month"`, `"day"`, `"hour"`, `"minute"`, `"second"`, or `"millisecond"`. Defaults to `"millisecond"` |

## Return Value

| Type | Description |
|------|-------------|
| `boolean` | Returns `true` if date `a` equals date `b`, `false` otherwise or if either date is invalid |

## Description

The `isEqual` function determines whether two dates represent the same point in time. It supports both precise millisecond-level comparison and coarser-grained comparisons by truncating dates to a specified unit before comparing.

### Specification

#### Returns `true` when:
- Date `a` and date `b` represent the exact same point in time at the specified granularity
- Both dates are valid (not Invalid Date, not `NaN`, not `Infinity`, not `-Infinity`)
- When using unit-based comparison, the truncated value of `a` equals the truncated value of `b`
- Works with both Date objects and numeric timestamps
- Two dates with identical timestamps (at millisecond precision or specified unit)

#### Returns `false` when:
- Date `a` and date `b` represent different points in time
- Either date `a` or date `b` is invalid (Invalid Date, `NaN`, `Infinity`, `-Infinity`)
- When using unit-based comparison, the truncated values are different
- Any validation check fails on either input

### Behavior Notes

- **Equality semantics**: Uses strict equality (`===`) for timestamp comparison after optional unit truncation
- **Input validation**: Invalid dates return `false` immediately without throwing exceptions
- **Type flexibility**: Accepts both Date objects and numeric timestamps for both parameters, allowing mixed comparisons (Date vs timestamp)
- **Unit truncation**: When a `unit` is specified, dates are truncated to that unit before comparison
  - Example: Comparing by `"day"` ignores hours, minutes, seconds, and milliseconds
  - Example: Comparing by `"year"` ignores months, days, and all time components
- **Performance**: Optimized for the common case of millisecond-precision comparison with fast-path for exact timestamp equality
- **Consistency**: Uses the same validation logic as other Chronia comparison functions

## Use Cases

- **Duplicate Detection**: Identify duplicate timestamps or events by comparing dates for exact equality. Essential for deduplication logic, preventing double-booking, and ensuring data uniqueness in collections.
- **Cache Validation**: Check if cached data timestamp matches the source timestamp to determine cache validity. Useful for implementing cache invalidation strategies and ensuring data freshness.
- **Test Assertions**: Verify that date calculations or transformations produce the expected result in unit tests. Particularly useful when testing date manipulation functions or validating date-related business logic.
- **Same-Day Checks**: Determine if two dates fall on the same day without caring about the time by using `{ unit: "day" }`. Common in scheduling applications, daily report generation, and grouping events by date.
- **Synchronization**: Compare timestamps from different sources to verify synchronization or detect drift. Useful in distributed systems, data replication, and audit logging.
- **Unit-Based Equality**: Compare dates at specific granularities (e.g., same year, same month) without needing to manually normalize dates. Simplifies logic for time-based grouping, bucketing, and period comparison.

## Usage Examples

### Duplicate Detection

```typescript
import { isEqual } from 'chronia';

// Check for duplicate events
interface Event {
  id: string;
  timestamp: Date;
  name: string;
}

function hasDuplicateTimestamp(events: Event[]): boolean {
  for (let i = 0; i < events.length; i++) {
    for (let j = i + 1; j < events.length; j++) {
      if (isEqual(events[i].timestamp, events[j].timestamp)) {
        return true;
      }
    }
  }
  return false;
}

// Remove duplicate timestamps
function removeDuplicateTimestamps(dates: Date[]): Date[] {
  return dates.filter((date, index) =>
    dates.findIndex(d => isEqual(d, date)) === index
  );
}

// Example usage
const event1 = new Date(2025, 0, 15, 10, 0, 0);
const event2 = new Date(2025, 0, 15, 10, 0, 0);

isEqual(event1, event2);  // Returns: true (exact same timestamp)

const dates = [
  new Date(2025, 0, 1),
  new Date(2025, 0, 2),
  new Date(2025, 0, 1),  // Duplicate
];
removeDuplicateTimestamps(dates);  // Returns: [Jan 1, Jan 2]
```

### Cache Validation

```typescript
import { isEqual } from 'chronia';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// Validate cache by comparing timestamps
function isCacheValid<T>(
  cache: CacheEntry<T>,
  sourceTimestamp: number
): boolean {
  return isEqual(cache.timestamp, sourceTimestamp);
}

// Check if cache is stale
function isCacheStale<T>(
  cache: CacheEntry<T>,
  sourceTimestamp: Date
): boolean {
  return !isEqual(cache.timestamp, sourceTimestamp);
}

// Example usage
const cache = {
  data: { user: 'John' },
  timestamp: Date.now(),
};

const sourceTime = new Date();
isCacheValid(cache, sourceTime.getTime());  // Returns: true (if timestamps match)

// After some time passes
setTimeout(() => {
  isCacheStale(cache, new Date());  // Returns: true (different timestamps)
}, 1000);
```

### Test Assertions

```typescript
import { isEqual } from 'chronia';

// Test date manipulation functions
function testDateAddition(): void {
  const startDate = new Date(2025, 0, 1, 12, 0, 0);
  const expectedDate = new Date(2025, 0, 1, 13, 0, 0);

  // Assume addHours is a function that adds hours to a date
  const result = addHours(startDate, 1);

  if (!isEqual(result, expectedDate)) {
    throw new Error('Date addition test failed');
  }
}

// Test timestamp equality
function testTimestampConversion(): void {
  const date = new Date(2025, 0, 15, 10, 30, 0);
  const timestamp = date.getTime();
  const reconstructed = new Date(timestamp);

  if (!isEqual(date, reconstructed)) {
    throw new Error('Timestamp conversion test failed');
  }
}

// Example usage with mixed types
const originalDate = new Date(2025, 0, 1);
const timestamp = originalDate.getTime();

isEqual(originalDate, timestamp);  // Returns: true (Date vs number)
isEqual(timestamp, originalDate);  // Returns: true (number vs Date)
```

### Same-Day Checks

```typescript
import { isEqual } from 'chronia';

// Check if two events occur on the same day
function isSameDay(date1: Date, date2: Date): boolean {
  return isEqual(date1, date2, { unit: 'day' });
}

// Group events by day
interface Event {
  name: string;
  timestamp: Date;
}

function groupEventsByDay(events: Event[]): Event[][] {
  const groups: Event[][] = [];

  for (const event of events) {
    const existingGroup = groups.find(group =>
      isEqual(group[0].timestamp, event.timestamp, { unit: 'day' })
    );

    if (existingGroup) {
      existingGroup.push(event);
    } else {
      groups.push([event]);
    }
  }

  return groups;
}

// Example usage
const morning = new Date(2025, 0, 15, 9, 0, 0);   // January 15, 2025, 09:00
const evening = new Date(2025, 0, 15, 18, 0, 0);  // January 15, 2025, 18:00

isSameDay(morning, evening);  // Returns: true (same day, different times)
isEqual(morning, evening);    // Returns: false (different times)

// Check if today
function isToday(date: Date): boolean {
  return isEqual(date, new Date(), { unit: 'day' });
}

isToday(new Date());  // Returns: true
```

### Synchronization

```typescript
import { isEqual } from 'chronia';

interface SyncRecord {
  id: string;
  lastModified: number;
  data: unknown;
}

// Check if local and remote records are synchronized
function isSynchronized(local: SyncRecord, remote: SyncRecord): boolean {
  return local.id === remote.id &&
         isEqual(local.lastModified, remote.lastModified);
}

// Find records that need synchronization
function findOutOfSync(
  local: SyncRecord[],
  remote: SyncRecord[]
): SyncRecord[] {
  return local.filter(localRecord => {
    const remoteRecord = remote.find(r => r.id === localRecord.id);
    return !remoteRecord ||
           !isEqual(localRecord.lastModified, remoteRecord.lastModified);
  });
}

// Example usage
const localRecord = {
  id: '123',
  lastModified: Date.now(),
  data: { value: 'local' },
};

const remoteRecord = {
  id: '123',
  lastModified: Date.now(),
  data: { value: 'remote' },
};

isSynchronized(localRecord, remoteRecord);  // Returns: true (if timestamps match)
```

### Unit-Based Equality

```typescript
import { isEqual } from 'chronia';

// Check if dates are in the same year
const date1 = new Date(2025, 0, 1);   // January 1, 2025
const date2 = new Date(2025, 11, 31); // December 31, 2025

isEqual(date1, date2, { unit: 'year' });  // Returns: true (both in 2025)
isEqual(date1, date2);                    // Returns: false (different days)

// Check if dates are in the same month
const jan15 = new Date(2025, 0, 15);  // January 15, 2025
const jan30 = new Date(2025, 0, 30);  // January 30, 2025

isEqual(jan15, jan30, { unit: 'month' });  // Returns: true (both in January 2025)

// Check if dates are in the same hour
const time1 = new Date(2025, 0, 15, 9, 15, 0);  // 09:15:00
const time2 = new Date(2025, 0, 15, 9, 45, 0);  // 09:45:00

isEqual(time1, time2, { unit: 'hour' });  // Returns: true (both at 9:00 hour)
isEqual(time1, time2);                    // Returns: false (different minutes)

// Compare at second granularity
const precise1 = new Date(2025, 0, 15, 9, 30, 15, 123);  // .123 milliseconds
const precise2 = new Date(2025, 0, 15, 9, 30, 15, 456);  // .456 milliseconds

isEqual(precise1, precise2, { unit: 'second' });  // Returns: true (same second)
isEqual(precise1, precise2);                      // Returns: false (different milliseconds)

// Invalid dates return false
isEqual(new Date('invalid'), new Date(2025, 0, 1));  // Returns: false
isEqual(NaN, new Date());                            // Returns: false
```
