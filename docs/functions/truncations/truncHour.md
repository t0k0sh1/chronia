# truncHour

## Overview

The `truncHour` function truncates a date to the start of the hour by setting minutes, seconds, and milliseconds to 0, while preserving the date and hour components.

## Signature

```typescript
function truncHour(date: Date | number): Date;
```

## Parameters

| Parameter | Type             | Description                                                             |
| --------- | ---------------- | ----------------------------------------------------------------------- |
| `date`    | `Date \| number` | A Date object or numeric timestamp to truncate to the start of the hour |

## Return Value

| Type   | Description                                                                                                                                      |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Date` | A new Date object truncated to the start of the hour (with minutes, seconds, and milliseconds set to 0), or Invalid Date if the input is invalid |

## Description

The `truncHour` function removes all time components below the hour level from a given date, effectively returning a new date representing the start of that hour. This is useful for time-based grouping, rounding, or normalization operations where you need hour-level precision.

### Specification

#### Returns a Date at the start of the hour when:

- The argument is a valid `Date` object
  - Minutes, seconds, and milliseconds are set to 0
  - Hour, day, month, and year remain unchanged
- The argument is a finite numeric timestamp
  - The timestamp is converted to a Date
  - Minutes, seconds, and milliseconds are set to 0
  - Hour, day, month, and year remain unchanged

#### Returns Invalid Date when:

- The argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The argument is `NaN`
- The argument is `Infinity`
- The argument is `-Infinity`

### Behavior Notes

- **Immutability**: Always returns a new Date instance; the input is never mutated
- **Validation**: Uses Chronia's internal validation logic to ensure consistency with other library functions
- **Error Handling**: Invalid inputs return Invalid Date rather than throwing exceptions
- **Type Safety**: TypeScript ensures only `Date | number` types are accepted
- **Time Zone**: Operates in the local time zone of the JavaScript environment
- **Performance**: Efficient operation using native Date methods via internal `truncateToUnit` utility

## Use Cases

- **Time-Based Grouping**: Group events or data points by hour for analytics or reporting. For example, aggregating user activity by hour to identify peak usage times.
- **Time Normalization**: Standardize timestamps to hourly boundaries for consistent comparisons. Useful when comparing events that occurred within the same hour regardless of exact minute/second.
- **Scheduling Operations**: Calculate hourly intervals or determine the start of an hour for cron-like scheduling tasks, appointment booking systems, or periodic job execution.
- **Data Bucketing**: Create hourly buckets for time-series data visualization or statistical analysis. Essential for charts and graphs that display data at hourly granularity.
- **Cache Keys**: Generate hour-based cache keys for data that should be cached on an hourly basis, ensuring cache entries align with hourly boundaries.

## Usage Examples

### Time-Based Grouping

```typescript
import { truncHour } from "chronia";

// Group events by hour
const events = [
  { timestamp: new Date(2024, 5, 15, 14, 30, 45), action: "login" },
  { timestamp: new Date(2024, 5, 15, 14, 45, 20), action: "view" },
  { timestamp: new Date(2024, 5, 15, 15, 10, 30), action: "purchase" },
];

const groupedByHour = events.reduce(
  (acc, event) => {
    const hourKey = truncHour(event.timestamp).toISOString();
    if (!acc[hourKey]) acc[hourKey] = [];
    acc[hourKey].push(event);
    return acc;
  },
  {} as Record<string, typeof events>,
);

// Result: Events grouped by hour boundaries
// "2024-06-15T14:00:00.000Z": [login, view]
// "2024-06-15T15:00:00.000Z": [purchase]
```

### Time Normalization

```typescript
import { truncHour } from "chronia";

// Normalize timestamps for comparison
const timestamp1 = new Date(2024, 5, 15, 14, 30, 45, 123);
const timestamp2 = new Date(2024, 5, 15, 14, 45, 20, 456);

const hour1 = truncHour(timestamp1); // Returns: June 15, 2024 14:00:00.000
const hour2 = truncHour(timestamp2); // Returns: June 15, 2024 14:00:00.000

// Check if events occurred in the same hour
const sameHour = hour1.getTime() === hour2.getTime(); // Returns: true
```

### Scheduling Operations

```typescript
import { truncHour } from "chronia";

// Calculate next hourly interval
function getNextHourlySlot(date: Date): Date {
  const currentHour = truncHour(date);
  return new Date(currentHour.getTime() + 60 * 60 * 1000); // Add 1 hour
}

const now = new Date(2024, 5, 15, 14, 30, 45);
const nextSlot = getNextHourlySlot(now); // Returns: June 15, 2024 15:00:00.000

// Generate hourly time slots
function generateHourlySlots(start: Date, count: number): Date[] {
  const startHour = truncHour(start);
  return Array.from(
    { length: count },
    (_, i) => new Date(startHour.getTime() + i * 60 * 60 * 1000),
  );
}

const slots = generateHourlySlots(now, 3);
// Returns: [14:00, 15:00, 16:00] on June 15, 2024
```

### Data Bucketing

```typescript
import { truncHour } from "chronia";

// Create hourly buckets for time-series data
interface DataPoint {
  value: number;
  timestamp: Date;
}

function bucketByHour(data: DataPoint[]): Map<string, number[]> {
  const buckets = new Map<string, number[]>();

  for (const point of data) {
    const hourKey = truncHour(point.timestamp).toISOString();
    if (!buckets.has(hourKey)) {
      buckets.set(hourKey, []);
    }
    buckets.get(hourKey)!.push(point.value);
  }

  return buckets;
}

// Calculate hourly averages
function calculateHourlyAverages(
  data: DataPoint[],
): Array<{ hour: Date; average: number }> {
  const buckets = bucketByHour(data);
  return Array.from(buckets.entries()).map(([hourStr, values]) => ({
    hour: new Date(hourStr),
    average: values.reduce((sum, v) => sum + v, 0) / values.length,
  }));
}
```

### Cache Keys

```typescript
import { truncHour } from "chronia";

// Generate hour-based cache keys
function getHourlyCacheKey(prefix: string, date: Date = new Date()): string {
  const hourTimestamp = truncHour(date).getTime();
  return `${prefix}:${hourTimestamp}`;
}

// Cache with hourly expiration
const cacheKey = getHourlyCacheKey("analytics"); // Returns: 'analytics:1718460000000'

// Invalidate cache at hour boundaries
function shouldInvalidateCache(cachedDate: Date, currentDate: Date): boolean {
  return truncHour(cachedDate).getTime() !== truncHour(currentDate).getTime();
}

const cached = new Date(2024, 5, 15, 14, 30, 0);
const current = new Date(2024, 5, 15, 15, 5, 0);
const shouldInvalidate = shouldInvalidateCache(cached, current); // Returns: true
```
