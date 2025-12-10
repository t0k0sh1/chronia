# Date Boundary Functions

## Overview

Chronia provides a comprehensive suite of date boundary functions that return the start and end points of time periods. These functions allow you to normalize dates to period boundaries (day, month, year), create date ranges, and perform time-based calculations with precision. All functions support both Date objects and numeric timestamps, handle invalid inputs gracefully, and return new Date instances without mutating the input.

## Available Functions

### Start-of-Period Functions

| Function                            | Description                        | Boundary Point                               |
| ----------------------------------- | ---------------------------------- | -------------------------------------------- |
| [`startOfDay`](./startOfDay.md)     | Returns the beginning of the day   | 00:00:00.000 of the same date                |
| [`startOfMonth`](./startOfMonth.md) | Returns the first day of the month | Day 1 at 00:00:00.000 of the same month/year |
| [`startOfYear`](./startOfYear.md)   | Returns the first day of the year  | January 1st at 00:00:00.000 of the same year |

### End-of-Period Functions

| Function                        | Description                          | Boundary Point                                  |
| ------------------------------- | ------------------------------------ | ----------------------------------------------- |
| [`endOfDay`](./endOfDay.md)     | Returns the last moment of the day   | 23:59:59.999 of the same date                   |
| [`endOfMonth`](./endOfMonth.md) | Returns the last moment of the month | Last day at 23:59:59.999 of the same month/year |
| [`endOfYear`](./endOfYear.md)   | Returns the last moment of the year  | December 31st at 23:59:59.999 of the same year  |

## Common Features

All boundary functions in this category share the following characteristics:

### Type Flexibility

All functions accept both Date objects and numeric timestamps:

```typescript
import { startOfDay, endOfMonth } from "chronia";

// Date objects
startOfDay(new Date(2024, 5, 15, 14, 30)); // June 15, 2024 00:00:00.000
endOfMonth(new Date(2024, 5, 15)); // June 30, 2024 23:59:59.999

// Timestamps
startOfDay(1718461800000); // Start of day for this timestamp
endOfMonth(Date.now()); // End of current month

// Mixed types work seamlessly
const dayStart = startOfDay(Date.now());
const monthEnd = endOfMonth(dayStart);
```

### Immutability

All functions return new Date instances without mutating the input:

```typescript
import { startOfDay } from "chronia";

const original = new Date(2024, 5, 15, 14, 30, 45);
const dayStart = startOfDay(original);

console.log(original); // Thu Jun 15 2024 14:30:45 (unchanged)
console.log(dayStart); // Thu Jun 15 2024 00:00:00.000 (new instance)
```

### Invalid Date Handling

All functions validate inputs and return Invalid Date for invalid inputs without throwing exceptions:

```typescript
import { startOfDay, endOfYear } from "chronia";

startOfDay(new Date("invalid")); // Invalid Date
startOfDay(NaN); // Invalid Date
startOfDay(Infinity); // Invalid Date

endOfYear(new Date("invalid")); // Invalid Date
endOfYear(-Infinity); // Invalid Date
```

### Automatic Period Handling

Functions automatically handle varying period lengths:

```typescript
import { endOfMonth } from "chronia";

// 31-day month (January)
endOfMonth(new Date(2024, 0, 10)); // January 31, 2024 23:59:59.999

// 30-day month (April)
endOfMonth(new Date(2024, 3, 10)); // April 30, 2024 23:59:59.999

// February in leap year
endOfMonth(new Date(2024, 1, 10)); // February 29, 2024 23:59:59.999

// February in non-leap year
endOfMonth(new Date(2023, 1, 10)); // February 28, 2023 23:59:59.999
```

## Choosing the Right Function

### By Period Granularity

**Day Boundaries** (`startOfDay`, `endOfDay`):

- Use for: Daily ranges, same-day comparisons, date-only operations
- Granularity: Day level (ignores time within the day)
- Ideal for: Event calendars, daily reports, day-based filtering

**Month Boundaries** (`startOfMonth`, `endOfMonth`):

- Use for: Monthly ranges, billing cycles, month-based reports
- Granularity: Month level (handles varying month lengths)
- Ideal for: Monthly analytics, subscription billing, month navigation

**Year Boundaries** (`startOfYear`, `endOfYear`):

- Use for: Annual ranges, fiscal year calculations, yearly reports
- Granularity: Year level (handles leap years)
- Ideal for: Annual summaries, year-over-year comparisons, fiscal calculations

### By Boundary Type

**Start Functions** (`startOfDay`, `startOfMonth`, `startOfYear`):

- Return the first moment of the period (00:00:00.000)
- Use when you need the beginning boundary for ranges or normalization
- Common patterns: Range start points, period grouping keys, forward calculations

**End Functions** (`endOfDay`, `endOfMonth`, `endOfYear`):

- Return the last moment of the period (23:59:59.999)
- Use when you need the ending boundary for inclusive ranges or deadlines
- Common patterns: Range end points, deadline setting, backward calculations

### Use Case Guide

| Scenario                  | Recommended Functions             | Reason                                  |
| ------------------------- | --------------------------------- | --------------------------------------- |
| Create a day range        | `startOfDay` + `endOfDay`         | Inclusive boundaries for a single day   |
| Create a month range      | `startOfMonth` + `endOfMonth`     | Inclusive boundaries for a full month   |
| Create a year range       | `startOfYear` + `endOfYear`       | Inclusive boundaries for a full year    |
| Group events by day       | `startOfDay`                      | Normalize all times to day boundary     |
| Group events by month     | `startOfMonth`                    | Normalize all dates to month boundary   |
| Group events by year      | `startOfYear`                     | Normalize all dates to year boundary    |
| Set end-of-day deadline   | `endOfDay`                        | Include all time until 23:59:59.999     |
| Set end-of-month deadline | `endOfMonth`                      | Include all days until last moment      |
| Check if date is today    | `startOfDay` + comparison         | Compare day boundaries                  |
| Monthly billing cutoff    | `endOfMonth`                      | Process through last moment of month    |
| Fiscal year end           | `endOfYear`                       | Calculate year-end boundaries           |
| Calendar month view       | `startOfMonth` + day calculations | Start from first day of displayed month |

## Quick Reference: Period Boundaries

Given a date `2024-06-15 14:30:45.123`:

| Function       | Result                  | Time Component                |
| -------------- | ----------------------- | ----------------------------- |
| `startOfDay`   | 2024-06-15 00:00:00.000 | Resets time to midnight       |
| `endOfDay`     | 2024-06-15 23:59:59.999 | Sets time to last millisecond |
| `startOfMonth` | 2024-06-01 00:00:00.000 | First day of June             |
| `endOfMonth`   | 2024-06-30 23:59:59.999 | Last day of June (30 days)    |
| `startOfYear`  | 2024-01-01 00:00:00.000 | First day of 2024             |
| `endOfYear`    | 2024-12-31 23:59:59.999 | Last day of 2024              |

## Common Patterns

### Creating Inclusive Date Ranges

**Day Range:**

```typescript
import { startOfDay, endOfDay } from "chronia";

function getDayRange(date: Date): { start: Date; end: Date } {
  return {
    start: startOfDay(date),
    end: endOfDay(date),
  };
}

const range = getDayRange(new Date(2024, 5, 15));
// Returns: {
//   start: June 15, 2024 00:00:00.000,
//   end: June 15, 2024 23:59:59.999
// }
```

**Month Range:**

```typescript
import { startOfMonth, endOfMonth } from "chronia";

function getMonthRange(date: Date): { start: Date; end: Date } {
  return {
    start: startOfMonth(date),
    end: endOfMonth(date),
  };
}

const range = getMonthRange(new Date(2024, 5, 15));
// Returns: {
//   start: June 1, 2024 00:00:00.000,
//   end: June 30, 2024 23:59:59.999
// }
```

**Year Range:**

```typescript
import { startOfYear, endOfYear } from "chronia";

function getYearRange(date: Date): { start: Date; end: Date } {
  return {
    start: startOfYear(date),
    end: endOfYear(date),
  };
}

const range = getYearRange(new Date(2024, 5, 15));
// Returns: {
//   start: January 1, 2024 00:00:00.000,
//   end: December 31, 2024 23:59:59.999
// }
```

### Data Filtering by Period

**Filter events by day:**

```typescript
import { startOfDay, endOfDay } from "chronia";

interface Event {
  timestamp: Date;
  name: string;
}

function getEventsForDay(events: Event[], targetDate: Date): Event[] {
  const dayStart = startOfDay(targetDate);
  const dayEnd = endOfDay(targetDate);

  return events.filter(
    (event) => event.timestamp >= dayStart && event.timestamp <= dayEnd,
  );
}
```

**Filter transactions by month:**

```typescript
import { startOfMonth, endOfMonth } from "chronia";

interface Transaction {
  date: Date;
  amount: number;
}

function getMonthlyTransactions(
  transactions: Transaction[],
  targetMonth: Date,
): Transaction[] {
  const monthStart = startOfMonth(targetMonth);
  const monthEnd = endOfMonth(targetMonth);

  return transactions.filter(
    (tx) => tx.date >= monthStart && tx.date <= monthEnd,
  );
}
```

### Period Grouping and Aggregation

**Group by day:**

```typescript
import { startOfDay } from "chronia";

interface DataPoint {
  timestamp: Date;
  value: number;
}

function aggregateByDay(data: DataPoint[]): Map<number, number> {
  const dailyTotals = new Map<number, number>();

  for (const point of data) {
    const dayKey = startOfDay(point.timestamp).getTime();
    const currentTotal = dailyTotals.get(dayKey) || 0;
    dailyTotals.set(dayKey, currentTotal + point.value);
  }

  return dailyTotals;
}

// Events at different times on the same day are grouped together
const data = [
  { timestamp: new Date(2024, 5, 15, 9, 0), value: 100 },
  { timestamp: new Date(2024, 5, 15, 14, 30), value: 200 },
  { timestamp: new Date(2024, 5, 16, 10, 0), value: 150 },
];

const totals = aggregateByDay(data);
// Map with two entries: June 15 (300) and June 16 (150)
```

**Group by month:**

```typescript
import { startOfMonth } from "chronia";

interface Transaction {
  date: Date;
  amount: number;
}

function groupByMonth(transactions: Transaction[]): Map<string, number> {
  const monthlyTotals = new Map<string, number>();

  for (const transaction of transactions) {
    const monthKey = startOfMonth(transaction.date).toISOString();
    const currentTotal = monthlyTotals.get(monthKey) || 0;
    monthlyTotals.set(monthKey, currentTotal + transaction.amount);
  }

  return monthlyTotals;
}
```

**Group by year:**

```typescript
import { startOfYear } from "chronia";

interface Event {
  date: Date;
  name: string;
}

function groupEventsByYear(events: Event[]): Map<number, Event[]> {
  const grouped = new Map<number, Event[]>();

  for (const event of events) {
    const yearStart = startOfYear(event.date);
    const year = yearStart.getFullYear();

    if (!grouped.has(year)) {
      grouped.set(year, []);
    }
    grouped.get(year)!.push(event);
  }

  return grouped;
}
```

### Deadline Management

**Day-level deadline:**

```typescript
import { endOfDay } from "chronia";

interface Task {
  id: string;
  dueDate: Date;
  completedAt?: Date;
}

function isTaskOverdue(task: Task, currentTime: Date = new Date()): boolean {
  const deadline = endOfDay(task.dueDate);
  return currentTime > deadline && !task.completedAt;
}

// Task is considered on time if completed by 23:59:59.999 on the due date
const task = { id: "123", dueDate: new Date(2024, 5, 30) };
const deadline = endOfDay(task.dueDate);
// Returns: June 30, 2024 23:59:59.999
```

**Month-level deadline:**

```typescript
import { endOfMonth } from "chronia";

function setMonthEndDeadline(date: Date = new Date()): Date {
  return endOfMonth(date);
}

// Set deadline to end of current month
const monthEndDeadline = setMonthEndDeadline();
// Returns: Last moment of current month
```

### Calendar Navigation

**Navigate months:**

```typescript
import { startOfMonth } from "chronia";

function navigateMonth(currentDate: Date, direction: "prev" | "next"): Date {
  const offset = direction === "next" ? 1 : -1;
  const targetDate = new Date(currentDate);
  targetDate.setMonth(targetDate.getMonth() + offset);

  return startOfMonth(targetDate);
}

const current = new Date(2024, 5, 15); // June 15, 2024
const nextMonth = navigateMonth(current, "next");
// Returns: July 1, 2024 00:00:00.000

const prevMonth = navigateMonth(current, "prev");
// Returns: May 1, 2024 00:00:00.000
```

### Same-Period Comparison

**Check if dates are on the same day:**

```typescript
import { startOfDay } from "chronia";

function isSameDay(date1: Date, date2: Date): boolean {
  return startOfDay(date1).getTime() === startOfDay(date2).getTime();
}

const morning = new Date(2024, 5, 15, 8, 0, 0);
const evening = new Date(2024, 5, 15, 20, 0, 0);
const nextDay = new Date(2024, 5, 16, 8, 0, 0);

isSameDay(morning, evening); // true (same day, different times)
isSameDay(morning, nextDay); // false (different days)
```

**Check if dates are in the same year:**

```typescript
import { startOfYear } from "chronia";

function isSameYear(date1: Date, date2: Date): boolean {
  const year1Start = startOfYear(date1);
  const year2Start = startOfYear(date2);
  return year1Start.getTime() === year2Start.getTime();
}

const date1 = new Date(2024, 0, 15);
const date2 = new Date(2024, 11, 25);
const date3 = new Date(2023, 6, 10);

isSameYear(date1, date2); // true (both in 2024)
isSameYear(date1, date3); // false (2024 vs 2023)
```

### Billing and Subscriptions

**Monthly billing cycle:**

```typescript
import { startOfMonth, endOfMonth } from "chronia";

interface Subscription {
  startDate: Date;
  billingDay: number;
}

function getCurrentBillingPeriod(subscription: Subscription): {
  start: Date;
  end: Date;
} {
  const now = new Date();
  const currentMonthStart = startOfMonth(now);
  const currentMonthEnd = endOfMonth(now);

  return {
    start: currentMonthStart,
    end: currentMonthEnd,
  };
}

function getNextBillingDate(subscription: Subscription): Date {
  const now = new Date();
  const currentMonthStart = startOfMonth(now);

  // If current month's billing date hasn't passed yet
  if (now < currentMonthStart) {
    return currentMonthStart;
  }

  // Otherwise, next month's billing date
  const nextMonth = new Date(currentMonthStart);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  return nextMonth;
}
```

## Performance Considerations

- **Minimal overhead**: All functions perform simple date component manipulations
- **No complex calculations**: Uses native Date constructor and setter methods
- **Early validation**: Invalid inputs are detected immediately for fast-fail behavior
- **Optimized for high frequency**: Suitable for use in loops and data processing pipelines
- **Memory efficient**: Always returns new instances but doesn't accumulate unnecessary objects

## Best Practices

### 1. Validate Results When Necessary

```typescript
import { endOfDay } from "chronia";

function safeEndOfDay(date: Date | number): Date | null {
  const result = endOfDay(date);
  return isNaN(result.getTime()) ? null : result;
}
```

### 2. Use for Database Queries

```typescript
import { startOfDay, endOfDay } from "chronia";

// SQL-like query with date boundaries
function queryEventsByDay(date: Date) {
  const start = startOfDay(date);
  const end = endOfDay(date);

  return db.query(
    "SELECT * FROM events WHERE timestamp >= ? AND timestamp <= ?",
    [start, end],
  );
}
```

### 3. Combine with Comparison Functions

```typescript
import { startOfMonth, endOfMonth } from "chronia";
import { isAfterOrEqual, isBeforeOrEqual } from "chronia";

function isInMonth(date: Date, targetMonth: Date): boolean {
  const monthStart = startOfMonth(targetMonth);
  const monthEnd = endOfMonth(targetMonth);

  return isAfterOrEqual(date, monthStart) && isBeforeOrEqual(date, monthEnd);
}
```

### 4. Cache Boundaries for Repeated Use

```typescript
import { startOfDay, endOfDay } from "chronia";

// Cache boundaries if checking multiple dates against the same period
function filterEventsByDay(events: Event[], targetDay: Date): Event[] {
  const dayStart = startOfDay(targetDay); // Calculate once
  const dayEnd = endOfDay(targetDay); // Calculate once

  return events.filter(
    (event) => event.timestamp >= dayStart && event.timestamp <= dayEnd,
  );
}
```

## Error Handling

All boundary functions follow a consistent error handling pattern:

- **No exceptions thrown**: Invalid inputs return Invalid Date instead of throwing errors
- **Invalid Date**: Returns Invalid Date
- **NaN**: Returns Invalid Date
- **Infinity / -Infinity**: Returns Invalid Date
- **Non-date, non-number inputs**: TypeScript prevents at compile time

**Safe usage pattern:**

```typescript
import { startOfMonth } from "chronia";

function processMonth(date: Date | number): void {
  const monthStart = startOfMonth(date);

  if (isNaN(monthStart.getTime())) {
    console.error("Invalid date provided");
    return;
  }

  // Proceed with valid monthStart
}
```

## Type Definitions

```typescript
// All boundary functions accept Date or number
type DateInput = Date | number;

// All boundary functions return Date
type DateOutput = Date;

// Function signatures
function startOfDay(date: DateInput): DateOutput;
function startOfMonth(date: DateInput): DateOutput;
function startOfYear(date: DateInput): DateOutput;
function endOfDay(date: DateInput): DateOutput;
function endOfMonth(date: DateInput): DateOutput;
function endOfYear(date: DateInput): DateOutput;
```

## See Also

- [Date Validations](../validations/) - Validate and compare dates with precision
- [Chronia Types](../../types.md) - Type definitions used across the library
- [Getting Started Guide](../../getting-started.md) - Introduction to Chronia

## Related Patterns

### Combining Boundaries with Validations

```typescript
import { startOfMonth, endOfMonth } from "chronia";
import { isSameMonth } from "chronia";

// Alternative to isSameMonth using boundaries
function isSameMonthAlt(date1: Date, date2: Date): boolean {
  return startOfMonth(date1).getTime() === startOfMonth(date2).getTime();
}

// Both approaches are valid, but isSameMonth is more explicit
```

### Using Boundaries for Period Arithmetic

```typescript
import { startOfMonth, endOfMonth } from "chronia";

function addMonths(date: Date, count: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + count);
  return startOfMonth(result); // Normalize to month start
}

function subtractMonths(date: Date, count: number): Date {
  return addMonths(date, -count);
}
```

### Combining Multiple Boundaries

```typescript
import { startOfDay, endOfDay, startOfMonth, endOfMonth } from "chronia";

// Get all complete days in a month
function getMonthDays(date: Date): Date[] {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const days: Date[] = [];

  for (
    let day = new Date(monthStart);
    day <= monthEnd;
    day.setDate(day.getDate() + 1)
  ) {
    days.push(startOfDay(new Date(day)));
  }

  return days;
}
```
