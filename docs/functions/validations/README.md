# Date Validation and Comparison Functions

## Overview

Chronia provides a comprehensive suite of date validation and comparison functions that allow you to validate dates, compare dates with precision and flexibility, and check if dates represent the same point in time at various granularities. All functions support both Date objects and numeric timestamps, and handle invalid inputs gracefully.

## Available Functions

### Date Validation

| Function | Description |
|----------|-------------|
| [`isValid`](./isValid.md) | Checks if a Date object or timestamp is valid |

### Current Time Comparison

| Function | Description | Equality Behavior |
|----------|-------------|-------------------|
| [`isFuture`](./isFuture.md) | Checks if a date is strictly in the future relative to current time | Returns `false` for current moment |
| [`isPast`](./isPast.md) | Checks if a date is strictly in the past relative to current time | Returns `false` for current moment |

### Date Comparison

| Function | Description | Equality Behavior |
|----------|-------------|-------------------|
| [`isBefore`](./isBefore.md) | Checks if the first date is strictly before the second date | Returns `false` for equal dates |
| [`isAfter`](./isAfter.md) | Checks if the first date is strictly after the second date | Returns `false` for equal dates |
| [`isBeforeOrEqual`](./isBeforeOrEqual.md) | Checks if the first date is before or equal to the second date | Returns `true` for equal dates |
| [`isAfterOrEqual`](./isAfterOrEqual.md) | Checks if the first date is after or equal to the second date | Returns `true` for equal dates |
| [`isEqual`](./isEqual.md) | Checks if two dates represent the same point in time | Returns `true` only for equal dates |

### Same-Time Validation

| Function | Description | Granularity |
|----------|-------------|-------------|
| [`isSameYear`](./isSameYear.md) | Checks if two dates are in the same year | Year only (ignores month, day, time) |
| [`isSameMonth`](./isSameMonth.md) | Checks if two dates are in the same month and year | Month and year (ignores day, time) |
| [`isSameDay`](./isSameDay.md) | Checks if two dates are on the same day | Day, month, and year (ignores time) |
| [`isSameHour`](./isSameHour.md) | Checks if two dates are in the same hour | Hour, day, month, and year (ignores minutes, seconds) |
| [`isSameMinute`](./isSameMinute.md) | Checks if two dates are in the same minute | Minute, hour, day, month, and year (ignores seconds) |
| [`isSameSecond`](./isSameSecond.md) | Checks if two dates are in the same second | Second and all larger units (ignores milliseconds) |

## Common Features

All validation and comparison functions in this category share the following characteristics:

### Type Flexibility

All functions accept both Date objects and numeric timestamps:

```typescript
import { isBefore, isValid } from 'chronia';

// Date objects
isBefore(new Date(2025, 0, 1), new Date(2025, 0, 2));  // true
isValid(new Date(2025, 0, 1));  // true

// Timestamps
isBefore(1704067200000, 1704153600000);  // true
isValid(1704067200000);  // true

// Mixed types
isBefore(new Date(2025, 0, 1), 1704153600000);  // true
```

### Input Validation

All functions validate inputs and return `false` for invalid dates without throwing exceptions:

```typescript
import { isEqual, isValid, isSameDay } from 'chronia';

isValid(new Date('invalid'));  // false
isEqual(new Date('invalid'), new Date(2025, 0, 1));  // false
isSameDay(NaN, new Date(2025, 0, 1));  // false
```

### Unit-Based Granularity

Comparison functions (`isBefore`, `isAfter`, `isBeforeOrEqual`, `isAfterOrEqual`, `isEqual`) support optional unit-based comparison, allowing you to compare dates at different time scales:

**Supported Units:**
- `"year"` - Compare only years
- `"month"` - Compare up to months
- `"day"` - Compare up to days
- `"hour"` - Compare up to hours
- `"minute"` - Compare up to minutes
- `"second"` - Compare up to seconds
- `"millisecond"` - Compare exact timestamps (default)

**Example:**

```typescript
import { isEqual } from 'chronia';

// Same day, different times
const morning = new Date(2025, 0, 1, 9, 0, 0);
const evening = new Date(2025, 0, 1, 17, 0, 0);

isEqual(morning, evening);  // false (different timestamps)
isEqual(morning, evening, { unit: 'day' });  // true (same day)
isEqual(morning, evening, { unit: 'hour' });  // false (different hours)
```

## Choosing the Right Function

### Validation vs Current Time Comparison vs Date Comparison vs Same-Time

**Validation Functions** (`isValid`):
- Use to check if a date or timestamp is valid
- Ideal for: input validation, error checking, data sanitization

**Current Time Comparison Functions** (`isFuture`, `isPast`):
- Use to compare a date against the current moment (Date.now())
- No second date parameter required - automatically uses current time
- Strict comparison - returns `false` for the exact current moment
- Ideal for: deadline validation, session expiry, event filtering, cache validation

**Comparison Functions** (`isBefore`, `isAfter`, `isBeforeOrEqual`, `isAfterOrEqual`, `isEqual`):
- Use to compare the chronological order of two dates
- Requires both dates as parameters
- Support optional unit-based granularity
- Ideal for: sorting, range validation, timeline operations

**Same-Time Functions** (`isSameYear`, `isSameMonth`, `isSameDay`, etc.):
- Use to check if two dates represent the same time at a specific granularity
- Fixed granularity (no options parameter)
- Ideal for: grouping, filtering, same-day/month/year checks

### Current Time Comparison vs Two-Date Comparison

**When to use Current Time Comparison** (`isFuture`, `isPast`):
- When checking against the current moment
- When you don't have a second date to compare
- When implementing time-based business logic (expiry, deadlines, upcoming events)
- Example: "Has this session expired?" → `isPast(session.expiresAt)`
- Example: "Is this event still upcoming?" → `isFuture(event.date)`

**When to use Two-Date Comparison** (`isBefore`, `isAfter`, etc.):
- When comparing two specific dates
- When the reference date is not the current time
- When implementing relative date logic
- Example: "Is eventA before eventB?" → `isBefore(eventA, eventB)`
- Example: "Was this submitted before the deadline?" → `isBeforeOrEqual(submission, deadline)`

### Strict vs Inclusive Comparisons

**Strict Comparisons** (`isBefore`, `isAfter`, `isFuture`, `isPast`):
- Use when you need to exclude the boundary condition
- Equality returns `false`
- Ideal for: exclusive ranges, strict ordering, future/past distinction

**Inclusive Comparisons** (`isBeforeOrEqual`, `isAfterOrEqual`):
- Use when you need to include the boundary condition
- Equality returns `true`
- Ideal for: deadlines, minimum requirements, range validation

### Use Case Guide

| Scenario | Recommended Function | Reason |
|----------|---------------------|--------|
| Validate user input | `isValid(date)` | Check if date is valid |
| Check if session expired | `isPast(session.expiresAt)` | Current time-based expiry check |
| Check if event is upcoming | `isFuture(event.date)` | Current time-based future check |
| Filter upcoming events | `events.filter(e => isFuture(e.date))` | Simple future filtering |
| Filter past events | `events.filter(e => isPast(e.date))` | Simple past filtering |
| Validate cache expiration | `isFuture(cache.expiresAt)` | Check if cache is still valid |
| Check if deadline passed | `isPast(deadline)` | Strict past check against now |
| Check if event has passed | `isBefore(event, now())` | Strict past check with explicit now |
| Check if deadline has been met | `isBeforeOrEqual(submission, deadline)` | Includes deadline day |
| Validate age requirement | `isAfterOrEqual(birthdate, minDate)` | Includes exact age |
| Check future events | `isAfter(event, now())` | Strict future check with explicit now |
| Detect duplicate timestamps | `isEqual(date1, date2)` | Exact equality |
| Group events by day | `isSameDay(date1, date2)` | Same-day check |
| Group events by month | `isSameMonth(date1, date2)` | Same-month check |
| Sort chronologically | `isBefore(a, b)` or `isAfter(a, b)` | Strict ordering |
| Range validation (inclusive) | `isAfterOrEqual(date, start) && isBeforeOrEqual(date, end)` | Inclusive boundaries |
| Range validation (exclusive) | `isAfter(date, start) && isBefore(date, end)` | Exclusive boundaries |

## Quick Reference: Comparison Matrix

Given two dates `a` and `b`:

| Relationship | `isBefore` | `isAfter` | `isBeforeOrEqual` | `isAfterOrEqual` | `isEqual` |
|--------------|------------|-----------|-------------------|------------------|-----------|
| `a < b` | `true` | `false` | `true` | `false` | `false` |
| `a > b` | `false` | `true` | `false` | `true` | `false` |
| `a === b` | `false` | `false` | `true` | `true` | `true` |

## Common Patterns

### Input Validation

```typescript
import { isValid } from 'chronia';

function processDate(date: Date | number): void {
  if (!isValid(date)) {
    throw new Error('Invalid date provided');
  }
  // Process valid date
}
```

### Session Expiry Checking

```typescript
import { isPast } from 'chronia';

interface Session {
  token: string;
  expiresAt: Date;
}

function isSessionValid(session: Session): boolean {
  // Session is valid if expiration time is still in the future
  return !isPast(session.expiresAt);
}

function validateSession(session: Session): void {
  if (isPast(session.expiresAt)) {
    throw new Error('Session has expired');
  }
  // Proceed with valid session
}
```

### Upcoming Events Filtering

```typescript
import { isFuture } from 'chronia';

interface Event {
  id: string;
  name: string;
  date: Date;
}

function getUpcomingEvents(events: Event[]): Event[] {
  return events.filter(event => isFuture(event.date));
}

function hasUpcomingEvents(events: Event[]): boolean {
  return events.some(event => isFuture(event.date));
}
```

### Cache Validation

```typescript
import { isFuture } from 'chronia';

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

function getCachedData<T>(cache: CacheEntry<T>): T | null {
  // Return data only if cache hasn't expired
  if (isFuture(cache.expiresAt)) {
    return cache.data;
  }
  return null;
}

function isCacheValid<T>(cache: CacheEntry<T>): boolean {
  return isFuture(cache.expiresAt);
}
```

### Range Validation

**Inclusive range** (both boundaries included):

```typescript
import { isAfterOrEqual, isBeforeOrEqual } from 'chronia';

function isWithinRange(date: Date, start: Date, end: Date): boolean {
  return isAfterOrEqual(date, start) && isBeforeOrEqual(date, end);
}
```

**Exclusive range** (boundaries excluded):

```typescript
import { isAfter, isBefore } from 'chronia';

function isBetween(date: Date, start: Date, end: Date): boolean {
  return isAfter(date, start) && isBefore(date, end);
}
```

### Timeline Sorting

```typescript
import { isBefore } from 'chronia';

const events = [
  { name: 'Event C', date: new Date(2025, 2, 1) },
  { name: 'Event A', date: new Date(2025, 0, 1) },
  { name: 'Event B', date: new Date(2025, 1, 1) },
];

const sorted = events.sort((a, b) =>
  isBefore(a.date, b.date) ? -1 : 1
);
```

### Same-Day Event Grouping

```typescript
import { isSameDay } from 'chronia';

const events = [
  new Date(2025, 0, 1, 9, 0),
  new Date(2025, 0, 1, 14, 0),
  new Date(2025, 0, 2, 10, 0),
];

const todayEvents = events.filter(event =>
  isSameDay(event, new Date(2025, 0, 1))
);
// Returns first two events
```

### Monthly Report Filtering

```typescript
import { isSameMonth } from 'chronia';

function getMonthlyTransactions(transactions: Transaction[], targetMonth: Date) {
  return transactions.filter(tx =>
    isSameMonth(tx.date, targetMonth)
  );
}
```

### Deadline Validation

```typescript
import { isBeforeOrEqual } from 'chronia';

function isSubmittedOnTime(submissionDate: Date, deadline: Date): boolean {
  // Includes submissions on the deadline day
  return isBeforeOrEqual(submissionDate, deadline);
}
```

## Performance Considerations

- **Millisecond comparison** is the fastest as it requires no unit truncation
- **Unit-based comparison** involves truncation overhead but is still highly efficient
- **isSame* functions** are optimized for their specific granularity
- All functions validate inputs early for fast-fail behavior
- Input validation has minimal overhead compared to the comparison operation

## Type Definitions

```typescript
type TimeUnit = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond';

interface ComparisonOptions {
  unit?: TimeUnit;
}
```

## Error Handling

All validation and comparison functions follow a consistent error handling pattern:

- **No exceptions thrown**: Invalid inputs return `false` instead of throwing errors
- **Invalid Date**: Returns `false`
- **NaN**: Returns `false`
- **Infinity / -Infinity**: Returns `false`
- **Non-date, non-number inputs**: TypeScript prevents at compile time

## See Also

- [Date Comparisons](../comparisons/) - Comparison utility functions (max, min, compare, clamp)
- [Date Boundaries](../boundaries/) - Start and end of time periods
- [Chronia Types](../../types.md) - Type definitions used across the library
