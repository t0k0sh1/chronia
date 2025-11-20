# Date Validation and Comparison Functions

## Overview

Chronia provides a comprehensive suite of date validation and comparison functions that allow you to validate dates, compare dates with precision and flexibility, and check if dates represent the same point in time at various granularities. All functions support both Date objects and numeric timestamps, and handle invalid inputs gracefully.

## Available Functions

### Date Validation

| Function | Description |
|----------|-------------|
| [`isValid`](./isValid.md) | Checks if a Date object or timestamp is valid |

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

### Validation vs Comparison vs Same-Time

**Validation Functions** (`isValid`):
- Use to check if a date or timestamp is valid
- Ideal for: input validation, error checking, data sanitization

**Comparison Functions** (`isBefore`, `isAfter`, `isBeforeOrEqual`, `isAfterOrEqual`, `isEqual`):
- Use to compare the chronological order of two dates
- Support optional unit-based granularity
- Ideal for: sorting, range validation, timeline operations

**Same-Time Functions** (`isSameYear`, `isSameMonth`, `isSameDay`, etc.):
- Use to check if two dates represent the same time at a specific granularity
- Fixed granularity (no options parameter)
- Ideal for: grouping, filtering, same-day/month/year checks

### Strict vs Inclusive Comparisons

**Strict Comparisons** (`isBefore`, `isAfter`):
- Use when you need to exclude the boundary condition
- Equality returns `false`
- Ideal for: exclusive ranges, strict ordering

**Inclusive Comparisons** (`isBeforeOrEqual`, `isAfterOrEqual`):
- Use when you need to include the boundary condition
- Equality returns `true`
- Ideal for: deadlines, minimum requirements, range validation

### Use Case Guide

| Scenario | Recommended Function | Reason |
|----------|---------------------|--------|
| Validate user input | `isValid(date)` | Check if date is valid |
| Check if event has passed | `isBefore(event, now())` | Strict past check |
| Check if deadline has been met | `isBeforeOrEqual(submission, deadline)` | Includes deadline day |
| Validate age requirement | `isAfterOrEqual(birthdate, minDate)` | Includes exact age |
| Check future events | `isAfter(event, now())` | Strict future check |
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
