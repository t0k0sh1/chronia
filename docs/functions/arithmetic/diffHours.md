# diffHours

## Overview

The `diffHours` function calculates the difference in complete hours between two dates, ignoring minutes, seconds, and milliseconds. It provides a reliable way to determine the hour-level time span between two points in time.

## Signature

```typescript
function diffHours(dateLeft: Date | number, dateRight: Date | number): number
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `dateLeft` | `Date \| number` | The first date as a Date object or numeric timestamp |
| `dateRight` | `Date \| number` | The second date as a Date object or numeric timestamp |

## Return Value

| Type | Description |
|------|-------------|
| `number` | The difference in complete hours. Returns a positive value if `dateLeft` is after `dateRight`, negative if before, `0` if both dates are in the same hour, or `NaN` if any input is invalid |

## Description

The `diffHours` function determines the number of complete hours between two dates by comparing them at the start of each hour. This ensures accurate hour counting regardless of the minute, second, or millisecond values in the input dates.

### Specification

#### Returns a positive number when:
- `dateLeft` is after `dateRight` by one or more complete hours
- Both inputs are valid Date objects or finite numeric timestamps
- The difference represents the number of complete hours elapsed

#### Returns `0` when:
- Both dates fall within the same hour (regardless of minute/second differences)
- Both dates are identical

#### Returns a negative number when:
- `dateLeft` is before `dateRight` by one or more complete hours
- Both inputs are valid Date objects or finite numeric timestamps
- The sign indicates the direction of time difference

#### Returns `NaN` when:
- Either argument is an Invalid Date object (e.g., `new Date('invalid')`)
- Either argument is `NaN`
- Either argument is `Infinity` or `-Infinity`

### Behavior Notes

- **Hour-based comparison**: The function creates new Date objects at the start of each hour (with minutes, seconds, and milliseconds set to 0) before calculating the difference
- **Graceful error handling**: Returns `NaN` for invalid inputs instead of throwing exceptions, consistent with other calculation functions in Chronia
- **Timestamp support**: Accepts both Date objects and numeric timestamps (milliseconds since Unix epoch)
- **Integer results**: Uses `Math.round()` to ensure the result is always an integer
- **Cross-boundary accuracy**: Correctly handles differences across day, month, and year boundaries
- **Type-safe**: TypeScript enforces that only `Date | number` types are accepted

## Use Cases

- **Time Span Calculation**: Calculate the number of hours between two events or timestamps, useful for analytics, billing systems, or time tracking applications where hour-level granularity is sufficient.
- **Scheduling and Planning**: Determine if sufficient hours have elapsed between scheduled events, such as verifying minimum rest periods or spacing between appointments.
- **Data Aggregation**: Group or filter time-series data by hour intervals, useful when minute-level precision is unnecessary and hour-based bucketing simplifies analysis.
- **Duration Display**: Convert time differences into human-readable hour counts for user interfaces, such as "Posted 3 hours ago" or "Expires in 2 hours".
- **Service Level Agreements (SLA)**: Verify response times or resolution times measured in hours, ensuring compliance with hour-based SLA requirements.

## Usage Examples

### Time Span Calculation

```typescript
import { diffHours } from 'chronia';

// Calculate hours between two specific times
const meeting1 = new Date(2024, 5, 15, 14, 30);
const meeting2 = new Date(2024, 5, 15, 12, 0);
diffHours(meeting1, meeting2);  // Returns: 2

// Minutes and seconds are ignored (both in same hour)
const time1 = new Date(2024, 5, 15, 14, 59, 59);
const time2 = new Date(2024, 5, 15, 14, 0, 0);
diffHours(time1, time2);  // Returns: 0

// Calculate hours until deadline
const now = new Date(2024, 5, 15, 10, 0);
const deadline = new Date(2024, 5, 15, 17, 0);
diffHours(deadline, now);  // Returns: 7
```

### Scheduling and Planning

```typescript
import { diffHours } from 'chronia';

// Verify minimum rest period (8 hours)
function hasMinimumRest(shiftEnd: Date, nextShiftStart: Date): boolean {
  const hoursBetween = diffHours(nextShiftStart, shiftEnd);
  return hoursBetween >= 8;
}

const shiftEnd = new Date(2024, 5, 15, 22, 0);
const nextShift = new Date(2024, 5, 16, 7, 0);
hasMinimumRest(shiftEnd, nextShift);  // Returns: true (9 hours)
```

### Working with Timestamps

```typescript
import { diffHours } from 'chronia';

// Using numeric timestamps
const timestamp1 = new Date(2024, 5, 15, 16, 0).getTime();
const timestamp2 = new Date(2024, 5, 15, 14, 0).getTime();
diffHours(timestamp1, timestamp2);  // Returns: 2

// Mixed Date and timestamp
const date = new Date(2024, 5, 15, 10, 30);
const timestamp = new Date(2024, 5, 15, 14, 30).getTime();
diffHours(date, timestamp);  // Returns: -4
```

### Duration Display

```typescript
import { diffHours } from 'chronia';

// Format relative time for UI
function formatRelativeTime(eventDate: Date): string {
  const now = new Date();
  const hoursDiff = diffHours(now, eventDate);

  if (hoursDiff === 0) {
    return 'Less than 1 hour ago';
  } else if (hoursDiff === 1) {
    return '1 hour ago';
  } else if (hoursDiff > 1 && hoursDiff < 24) {
    return `${hoursDiff} hours ago`;
  } else {
    return 'More than a day ago';
  }
}

const posted = new Date(2024, 5, 15, 10, 0);
const now = new Date(2024, 5, 15, 13, 0);
// Assuming now is current time
console.log(formatRelativeTime(posted));  // Returns: "3 hours ago"
```

### Error Handling

```typescript
import { diffHours } from 'chronia';

// Invalid inputs return NaN
diffHours(new Date('invalid'), new Date(2024, 5, 15, 14, 0));  // Returns: NaN
diffHours(NaN, new Date(2024, 5, 15, 14, 0));  // Returns: NaN
diffHours(Infinity, new Date(2024, 5, 15, 14, 0));  // Returns: NaN

// Safe validation before use
function calculateHoursDiff(date1: Date | number, date2: Date | number): number | null {
  const diff = diffHours(date1, date2);
  return isNaN(diff) ? null : diff;
}

const result = calculateHoursDiff(new Date('invalid'), new Date());
console.log(result);  // Returns: null
```

### Cross-Boundary Calculations

```typescript
import { diffHours } from 'chronia';

// Across day boundary
const yesterday = new Date(2024, 5, 14, 20, 0);
const today = new Date(2024, 5, 15, 4, 0);
diffHours(today, yesterday);  // Returns: 8

// Across month boundary
const endOfMonth = new Date(2024, 4, 31, 22, 0);
const startOfMonth = new Date(2024, 5, 1, 2, 0);
diffHours(startOfMonth, endOfMonth);  // Returns: 4

// Across year boundary
const newYearsEve = new Date(2023, 11, 31, 20, 0);
const newYear = new Date(2024, 0, 1, 3, 0);
diffHours(newYear, newYearsEve);  // Returns: 7
```
