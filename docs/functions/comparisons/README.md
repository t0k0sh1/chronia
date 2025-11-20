# Date Comparison Utilities

## Overview

Chronia provides a comprehensive suite of date comparison utilities that allow you to find extremes (minimum and maximum), compare dates for sorting, and constrain dates within ranges. All functions support both Date objects and numeric timestamps, and handle invalid inputs gracefully.

## Available Functions

| Function | Description | Return Type |
|----------|-------------|-------------|
| [`max`](./max.md) | Returns the latest (maximum) date from a set of dates | `Date` |
| [`min`](./min.md) | Returns the earliest (minimum) date from a set of dates | `Date` |
| [`compare`](./compare.md) | Compares two dates chronologically, returning -1, 0, or 1 | `number` |
| [`clamp`](./clamp.md) | Constrains a date to fall within a specified range | `Date` |

## Common Features

All comparison functions in this category share the following characteristics:

### Type Flexibility

All functions accept both Date objects and numeric timestamps:

```typescript
import { max, min, compare, clamp } from 'chronia';

// Date objects
max(new Date(2025, 0, 1), new Date(2025, 0, 2));  // Returns: Jan 2, 2025
min(new Date(2025, 0, 1), new Date(2025, 0, 2));  // Returns: Jan 1, 2025

// Timestamps
max(1704067200000, 1704153600000);  // Returns: Date for later timestamp
compare(1704067200000, 1704153600000);  // Returns: -1

// Mixed types
clamp(new Date(2025, 0, 15), 1704067200000, new Date(2025, 0, 31));  // Works seamlessly
```

### Input Validation

All functions validate inputs and handle invalid dates gracefully:

```typescript
import { max, min, compare, clamp } from 'chronia';

// Invalid dates return Invalid Date
max(new Date('invalid'), new Date(2025, 0, 1));  // Returns: Invalid Date
min(new Date(2025, 0, 1), NaN);  // Returns: Invalid Date

// compare returns NaN for invalid inputs
compare(new Date('invalid'), new Date(2025, 0, 1));  // Returns: NaN

// clamp returns Invalid Date if any input is invalid
clamp(new Date(2025, 0, 15), new Date('invalid'), new Date(2025, 0, 31));  // Returns: Invalid Date
```

### Immutability

All functions return new Date objects without mutating inputs:

```typescript
import { max, clamp } from 'chronia';

const date1 = new Date(2025, 0, 1);
const date2 = new Date(2025, 0, 2);

const result = max(date1, date2);
// result is a new Date object, date1 and date2 remain unchanged

const clamped = clamp(date1, new Date(2024, 0, 1), new Date(2024, 11, 31));
// clamped is a new Date object, date1 remains unchanged
```

## Choosing the Right Function

### Finding Extremes

**Use `max`** when you need to:
- Find the latest date in a collection
- Determine the most recent activity or update
- Establish the end boundary of a date range
- Identify peak dates in time series data

**Use `min`** when you need to:
- Find the earliest date in a collection
- Determine the oldest record or first occurrence
- Establish the start boundary of a date range
- Identify the most urgent deadline

### Comparison and Sorting

**Use `compare`** when you need to:
- Sort arrays of dates in ascending or descending order
- Implement custom date ordering logic
- Determine temporal relationships between dates
- Build comparison-based algorithms

### Range Validation

**Use `clamp`** when you need to:
- Constrain dates to valid boundaries
- Enforce date picker limits in UI
- Normalize dates from external sources
- Prevent dates from exceeding allowed ranges

## Use Case Guide

| Scenario | Recommended Function | Example |
|----------|---------------------|---------|
| Find most recent update | `max(dates)` | `max(lastModified, lastSync, lastBackup)` |
| Find earliest event | `min(dates)` | `min(event1.date, event2.date, event3.date)` |
| Sort events chronologically | `compare(a, b)` | `events.sort((a, b) => compare(a.date, b.date))` |
| Sort by most recent first | `compare(a, b, { order: 'DESC' })` | `logs.sort((a, b) => compare(a.ts, b.ts, { order: 'DESC' }))` |
| Enforce date picker limits | `clamp(date, min, max)` | `clamp(userDate, minAllowed, maxAllowed)` |
| Validate birth date | `clamp(input, oldestValid, today)` | Prevent future or impossibly old dates |
| Find date range boundaries | `min(...dates)` and `max(...dates)` | `[min(...dates), max(...dates)]` |
| Merge date ranges | `min(range1.start, range2.start)` | Combine multiple ranges |
| Determine which event is earlier | `compare(event1, event2)` | Returns -1 if event1 is earlier |

## Common Patterns

### Finding Date Range Boundaries

```typescript
import { min, max } from 'chronia';

// Find the start and end of a collection of dates
const events = [
  new Date(2025, 0, 15),
  new Date(2025, 2, 20),
  new Date(2024, 11, 5),
  new Date(2025, 1, 10),
];

const dateRange = {
  start: min(...events),  // Returns: Dec 5, 2024
  end: max(...events)     // Returns: Mar 20, 2025
};
```

### Sorting Events Chronologically

```typescript
import { compare } from 'chronia';

interface Event {
  name: string;
  date: Date;
}

const events: Event[] = [
  { name: 'Conference', date: new Date(2025, 5, 15) },
  { name: 'Workshop', date: new Date(2025, 3, 10) },
  { name: 'Webinar', date: new Date(2025, 7, 20) },
];

// Sort by earliest first (ascending)
const ascending = events.sort((a, b) => compare(a.date, b.date));

// Sort by latest first (descending)
const descending = events.sort((a, b) => compare(a.date, b.date, { order: 'DESC' }));
```

### Constraining User Input

```typescript
import { clamp } from 'chronia';

// Date picker with min/max constraints
function validateDateSelection(userDate: Date): Date {
  const today = new Date();
  const minDate = new Date(2020, 0, 1);  // Start of 2020
  const maxDate = new Date(today.getFullYear() + 5, 11, 31);  // 5 years from now

  return clamp(userDate, minDate, maxDate);
}

// User selects far future date
const selectedDate = new Date(2050, 0, 1);
const validDate = validateDateSelection(selectedDate);
// Returns: maxDate (5 years from today)
```

### Finding Most Recent Activity

```typescript
import { max } from 'chronia';

interface UserActivity {
  lastLogin: Date;
  lastProfileUpdate: Date;
  lastPasswordChange: Date;
}

function getLastActivity(activity: UserActivity): Date {
  return max(
    activity.lastLogin,
    activity.lastProfileUpdate,
    activity.lastPasswordChange
  );
}
```

### Finding Next Deadline

```typescript
import { min } from 'chronia';

interface Task {
  title: string;
  dueDate: Date;
  completed: boolean;
}

function getNextDeadline(tasks: Task[]): Date | null {
  const pendingTasks = tasks.filter(t => !t.completed);
  if (pendingTasks.length === 0) return null;

  return min(...pendingTasks.map(t => t.dueDate));
}
```

### Merging Date Ranges

```typescript
import { min, max } from 'chronia';

interface DateRange {
  start: Date;
  end: Date;
}

function mergeRanges(...ranges: DateRange[]): DateRange {
  return {
    start: min(...ranges.map(r => r.start)),
    end: max(...ranges.map(r => r.end))
  };
}

const range1 = { start: new Date(2025, 0, 1), end: new Date(2025, 2, 31) };
const range2 = { start: new Date(2025, 1, 1), end: new Date(2025, 5, 30) };
const merged = mergeRanges(range1, range2);
// Returns: { start: Jan 1, 2025, end: Jun 30, 2025 }
```

### Scheduling with Time Windows

```typescript
import { clamp, compare } from 'chronia';

// Ensure event falls within business hours
function scheduleWithinBusinessHours(requestedTime: Date): Date {
  const today = new Date(requestedTime);
  const businessStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0);
  const businessEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 17, 0);

  return clamp(requestedTime, businessStart, businessEnd);
}

// User requests 7 AM meeting
const requested = new Date(2025, 0, 15, 7, 0);
const scheduled = scheduleWithinBusinessHours(requested);
// Returns: 9:00 AM on same day (clamped to business start)
```

### Conflict Resolution

```typescript
import { max } from 'chronia';

interface Document {
  id: string;
  content: string;
  lastModified: Date;
}

function resolveConflict(local: Document, remote: Document): Document {
  const newerDate = max(local.lastModified, remote.lastModified);

  // Keep the document with the most recent modification
  return newerDate.getTime() === local.lastModified.getTime()
    ? local
    : remote;
}
```

## Performance Considerations

- **Variadic functions** (`max`, `min`): Performance scales linearly with the number of arguments. For very large datasets, consider using reduce operations.
- **Early validation**: All functions validate inputs early for fast-fail behavior.
- **Timestamp comparison**: Internally uses `getTime()` for efficient numeric comparison.
- **No unnecessary allocations**: Functions minimize object creation during comparisons.
- **Array.sort compatibility**: `compare` is optimized for use with JavaScript's native `Array.sort()` method.

## Type Definitions

```typescript
type CompareOptions = {
  order?: 'ASC' | 'DESC';
};

// Function signatures
function max(...dates: (Date | number)[]): Date;
function min(...dates: (Date | number)[]): Date;
function compare(date1: Date | number, date2: Date | number, options?: CompareOptions): number;
function clamp(date: Date | number, minDate: Date | number, maxDate: Date | number): Date;
```

## Error Handling

All comparison functions follow a consistent error handling pattern:

- **No exceptions thrown**: Invalid inputs return Invalid Date (for Date-returning functions) or `NaN` (for `compare`)
- **Invalid Date**: Returns Invalid Date or `NaN`
- **NaN**: Returns Invalid Date or `NaN`
- **Infinity / -Infinity**: Returns Invalid Date or `NaN`
- **Empty arguments** (for `max`/`min`): Returns Invalid Date
- **Non-date, non-number inputs**: TypeScript prevents at compile time

### Error Handling Examples

```typescript
import { max, min, compare, clamp } from 'chronia';

// Handling invalid dates
const invalid = new Date('invalid');
const valid = new Date(2025, 0, 1);

max(invalid, valid);  // Returns: Invalid Date
min(invalid, valid);  // Returns: Invalid Date
compare(invalid, valid);  // Returns: NaN
clamp(valid, invalid, valid);  // Returns: Invalid Date

// Checking for errors
import { isValid } from 'chronia';

const result = max(date1, date2, date3);
if (!isValid(result)) {
  console.error('One or more invalid dates provided');
}

const comparison = compare(dateA, dateB);
if (isNaN(comparison)) {
  console.error('Invalid dates in comparison');
}
```

## Quick Reference: Function Return Values

| Function | Valid Input | Invalid Input | Empty Input |
|----------|-------------|---------------|-------------|
| `max` | Latest date as `Date` | Invalid `Date` | Invalid `Date` |
| `min` | Earliest date as `Date` | Invalid `Date` | Invalid `Date` |
| `compare` | `-1`, `0`, or `1` | `NaN` | N/A (requires 2 args) |
| `clamp` | Clamped date as `Date` | Invalid `Date` | N/A (requires 3 args) |

## Integration with Other Chronia Functions

Comparison utilities work seamlessly with other Chronia functions:

### With Validation Functions

```typescript
import { isValid, isBefore, isAfter, max, min } from 'chronia';

// Validate before finding extremes
const dates = [date1, date2, date3].filter(isValid);
const latest = dates.length > 0 ? max(...dates) : null;

// Use with comparison functions
const start = min(date1, date2);
const end = max(date1, date2);
if (isValid(start) && isValid(end)) {
  const isInRange = isAfter(testDate, start) && isBefore(testDate, end);
}
```

### With Boundary Functions

```typescript
import { startOfDay, endOfDay, clamp } from 'chronia';

// Clamp to current day boundaries
const today = new Date();
const dayStart = startOfDay(today);
const dayEnd = endOfDay(today);
const clampedToToday = clamp(userDate, dayStart, dayEnd);
```

## See Also

- [Date Validations](../validations/) - Validation and comparison functions (`isBefore`, `isAfter`, `isEqual`, `isValid`)
- [Date Boundaries](../boundaries/) - Start and end of time periods (`startOfDay`, `endOfDay`, etc.)
- [Date Arithmetic](../arithmetic/) - Date manipulation and calculations
- [Chronia Types](../../types.md) - Type definitions used across the library
