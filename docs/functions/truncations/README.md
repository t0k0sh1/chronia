# Date Truncation Functions

## Overview

Chronia provides a comprehensive suite of date truncation functions that normalize dates to specific time unit boundaries by "zeroing out" all smaller time components. These functions are essential for date grouping, comparison at specific granularities, time-series bucketing, and normalizing dates when precision below a certain level is irrelevant or should be removed.

All truncation functions accept both Date objects and numeric timestamps, handle invalid inputs gracefully by returning Invalid Date, and always return new Date instances without mutating the original input.

## Available Functions

| Function                                    | Description                                                | Precision Level | Time Components Zeroed                                        |
| ------------------------------------------- | ---------------------------------------------------------- | --------------- | ------------------------------------------------------------- |
| [`truncYear`](./truncYear.md)               | Truncates to January 1st at 00:00:00.000 of the same year  | Year            | Month → 1, Day → 1, Hours, Minutes, Seconds, Milliseconds → 0 |
| [`truncMonth`](./truncMonth.md)             | Truncates to the 1st day at 00:00:00.000 of the same month | Month           | Day → 1, Hours, Minutes, Seconds, Milliseconds → 0            |
| [`truncDay`](./truncDay.md)                 | Truncates to 00:00:00.000 (midnight) of the same day       | Day             | Hours, Minutes, Seconds, Milliseconds → 0                     |
| [`truncHour`](./truncHour.md)               | Truncates to the start of the hour (:00:00.000)            | Hour            | Minutes, Seconds, Milliseconds → 0                            |
| [`truncMinute`](./truncMinute.md)           | Truncates to the start of the minute (:00.000)             | Minute          | Seconds, Milliseconds → 0                                     |
| [`truncSecond`](./truncSecond.md)           | Truncates to the start of the second (.000)                | Second          | Milliseconds → 0                                              |
| [`truncMillisecond`](./truncMillisecond.md) | Returns the date unchanged (no precision loss)             | Millisecond     | None (identity operation)                                     |

## Common Features

All truncation functions in this category share the following characteristics:

### Type Flexibility

All functions accept both Date objects and numeric timestamps:

```typescript
import { truncDay, truncHour } from "chronia";

// Date objects
truncDay(new Date(2024, 5, 15, 14, 30, 45)); // June 15, 2024 00:00:00.000
truncHour(new Date(2024, 5, 15, 14, 30, 45)); // June 15, 2024 14:00:00.000

// Timestamps
truncDay(1718462445000); // June 15, 2024 00:00:00.000 (local time)
truncHour(1718462445000); // June 15, 2024 14:00:00.000 (local time)

// Mixed usage in data processing
const events = [
  new Date(2024, 5, 15, 14, 30),
  1718462445000,
  new Date(2024, 5, 16, 9, 15),
];
const normalized = events.map((e) => truncDay(e));
```

### Immutability

All truncation functions return new Date instances and never mutate the input:

```typescript
import { truncDay } from "chronia";

const original = new Date(2024, 5, 15, 14, 30, 45, 123);
const truncated = truncDay(original);

console.log(original.getTime() !== truncated.getTime()); // true
console.log(original.getHours()); // 14 (unchanged)
console.log(truncated.getHours()); // 0 (truncated)
```

### Invalid Input Handling

All functions validate inputs and return Invalid Date for invalid inputs without throwing exceptions:

```typescript
import { truncDay, truncHour, truncMonth } from "chronia";

truncDay(new Date("invalid")); // Invalid Date
truncHour(NaN); // Invalid Date
truncMonth(Infinity); // Invalid Date
truncDay(-Infinity); // Invalid Date
```

### Consistent Validation

All functions use Chronia's internal validation logic to ensure consistency with other library functions:

```typescript
import { truncDay, isValid } from "chronia";

const date = new Date(2024, 5, 15, 14, 30);
const truncated = truncDay(date);

// Truncation preserves validity
isValid(date); // true
isValid(truncated); // true

// Invalid inputs remain invalid
const invalid = truncDay(new Date("invalid"));
isValid(invalid); // false
```

## Understanding Truncation

### What is Truncation?

Truncation is the process of removing precision from a date by setting all time components smaller than a specified unit to their minimum values (typically 0 or 1). This effectively "rounds down" or "floors" the date to the start of the specified time unit.

**Visual Example - Truncating to Day:**

```
Original:   June 15, 2024 14:30:45.123
           └──year──┘ └─month─┘ └──day──┘ └──hour──┘ └──min──┘ └──sec──┘ └─ms─┘
                                          ↓
Truncated:  June 15, 2024 00:00:00.000
           └──preserved───┘               └──zeroed out────────┘
```

**Visual Example - Truncating to Hour:**

```
Original:   June 15, 2024 14:30:45.123
           └──year──┘ └─month─┘ └──day──┘ └──hour──┘ └──min──┘ └──sec──┘ └─ms─┘
                                                      ↓
Truncated:  June 15, 2024 14:00:00.000
           └──────preserved──────────┘               └──zeroed──┘
```

### Truncation Hierarchy

Truncation functions form a hierarchy from coarsest to finest granularity:

```
truncYear       →  YYYY-01-01 00:00:00.000
  truncMonth    →  YYYY-MM-01 00:00:00.000
    truncDay    →  YYYY-MM-DD 00:00:00.000
      truncHour →  YYYY-MM-DD HH:00:00.000
        truncMinute → YYYY-MM-DD HH:MM:00.000
          truncSecond → YYYY-MM-DD HH:MM:SS.000
            truncMillisecond → YYYY-MM-DD HH:MM:SS.mmm (no change)
```

Each level preserves all larger units and zeros out all smaller units.

## Choosing the Right Function

### By Use Case

| Use Case                            | Recommended Function                    | Reason                              |
| ----------------------------------- | --------------------------------------- | ----------------------------------- |
| Group by year (annual reports)      | `truncYear(date)`                       | Normalizes all dates to January 1st |
| Group by month (monthly analytics)  | `truncMonth(date)`                      | Normalizes to 1st of each month     |
| Group by day (daily summaries)      | `truncDay(date)`                        | Removes time-of-day differences     |
| Group by hour (hourly metrics)      | `truncHour(date)`                       | Creates hourly buckets              |
| Group by minute (minute-level logs) | `truncMinute(date)`                     | Second-level noise removed          |
| Remove subsecond precision          | `truncSecond(date)`                     | Database compatibility              |
| Compare if same day                 | `truncDay(date1) === truncDay(date2)`   | Day-level equality                  |
| Compare if same hour                | `truncHour(date1) === truncHour(date2)` | Hour-level equality                 |
| Date range start boundary           | `truncDay(startDate)`                   | Ensures full day inclusion          |
| Billing cycle start                 | `truncMonth(signupDate)`                | Monthly billing alignment           |
| Cache key generation                | `truncHour(now)` or `truncDay(now)`     | Time-based cache invalidation       |

### Truncation vs Same-Time Validation

**Truncation Functions** (`truncYear`, `truncMonth`, `truncDay`, etc.):

- Transform dates to specific boundaries
- Return new Date instances
- Used for normalization, grouping, and bucketing
- Ideal when you need the actual boundary date for further calculations

**Same-Time Validation Functions** (`isSameYear`, `isSameMonth`, `isSameDay`, etc.):

- Compare if two dates fall within the same time unit
- Return boolean values
- Used for filtering and conditional logic
- Ideal when you only need to know if dates match at a granularity

**Example Comparison:**

```typescript
import { truncDay, isSameDay } from "chronia";

const date1 = new Date(2024, 5, 15, 9, 30);
const date2 = new Date(2024, 5, 15, 17, 45);

// Truncation approach - get the boundary date
const day1 = truncDay(date1); // June 15, 2024 00:00:00.000
const day2 = truncDay(date2); // June 15, 2024 00:00:00.000
const same = day1.getTime() === day2.getTime(); // true

// Same-time validation approach - direct comparison
const same2 = isSameDay(date1, date2); // true

// Use truncation when you need the boundary date
const dayStart = truncDay(date1); // Can use this for range queries

// Use same-time validation when you only need true/false
if (isSameDay(event, today)) {
  // Handle today's event
}
```

## Common Patterns

### Date Grouping and Aggregation

```typescript
import { truncDay, truncMonth, truncHour } from "chronia";

interface Event {
  timestamp: Date;
  value: number;
}

// Group by day
function groupByDay(events: Event[]): Map<string, Event[]> {
  const groups = new Map<string, Event[]>();

  for (const event of events) {
    const dayKey = truncDay(event.timestamp).toISOString();
    if (!groups.has(dayKey)) {
      groups.set(dayKey, []);
    }
    groups.get(dayKey)!.push(event);
  }

  return groups;
}

// Calculate monthly totals
function calculateMonthlyTotals(events: Event[]): Map<string, number> {
  const totals = new Map<string, number>();

  for (const event of events) {
    const monthKey = truncMonth(event.timestamp).toISOString();
    const current = totals.get(monthKey) || 0;
    totals.set(monthKey, current + event.value);
  }

  return totals;
}

// Create hourly buckets for time-series chart
function createHourlyBuckets(
  events: Event[],
  start: Date,
  hours: number,
): Array<{ hour: Date; values: number[] }> {
  const buckets: Array<{ hour: Date; values: number[] }> = [];
  const startHour = truncHour(start);

  for (let i = 0; i < hours; i++) {
    const hourStart = new Date(startHour.getTime() + i * 60 * 60 * 1000);
    const hourEnd = new Date(hourStart.getTime() + 60 * 60 * 1000);

    const values = events
      .filter((e) => e.timestamp >= hourStart && e.timestamp < hourEnd)
      .map((e) => e.value);

    buckets.push({ hour: hourStart, values });
  }

  return buckets;
}
```

### Date Range Boundaries

```typescript
import { truncDay, truncMonth, truncYear } from "chronia";

// Create inclusive day range
function getDayRange(date: Date): { start: Date; end: Date } {
  const start = truncDay(date);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  end.setMilliseconds(-1); // Last millisecond of the day

  return { start, end };
}

// Example: June 15, 2024
const range = getDayRange(new Date(2024, 5, 15, 14, 30));
// {
//   start: June 15, 2024 00:00:00.000,
//   end: June 15, 2024 23:59:59.999
// }

// Create month range
function getMonthRange(date: Date): { start: Date; end: Date } {
  const start = truncMonth(date);
  const end = new Date(start);
  end.setMonth(end.getMonth() + 1);
  end.setMilliseconds(-1);

  return { start, end };
}

// Create year range
function getYearRange(date: Date): { start: Date; end: Date } {
  const start = truncYear(date);
  const end = new Date(start);
  end.setFullYear(end.getFullYear() + 1);
  end.setMilliseconds(-1);

  return { start, end };
}
```

### Comparison at Specific Granularity

```typescript
import { truncDay, truncMonth, truncYear } from "chronia";

// Check if two dates are the same day
function isSameDay(date1: Date, date2: Date): boolean {
  return truncDay(date1).getTime() === truncDay(date2).getTime();
}

// Check if two dates are in the same month
function isSameMonth(date1: Date, date2: Date): boolean {
  return truncMonth(date1).getTime() === truncMonth(date2).getTime();
}

// Check if two dates are in the same year
function isSameYear(date1: Date, date2: Date): boolean {
  return truncYear(date1).getTime() === truncYear(date2).getTime();
}

// Usage
const date1 = new Date(2024, 5, 15, 9, 30);
const date2 = new Date(2024, 5, 15, 17, 45);
const date3 = new Date(2024, 5, 20, 12, 0);

isSameDay(date1, date2); // true (same day, different times)
isSameDay(date1, date3); // false (different days)
isSameMonth(date1, date3); // true (same month)
```

### Data Normalization for Storage

```typescript
import { truncSecond, truncDay } from "chronia";

// Normalize timestamps for database storage (no millisecond support)
function prepareDateForDB(date: Date): Date {
  return truncSecond(date);
}

// Normalize date-only fields (no time component needed)
function prepareDateOnlyForDB(date: Date): Date {
  return truncDay(date);
}

interface UserProfile {
  createdAt: Date;
  birthDate: Date;
  lastLoginAt: Date;
}

function normalizeUserProfile(profile: UserProfile): UserProfile {
  return {
    createdAt: truncSecond(profile.createdAt), // Keep time precision
    birthDate: truncDay(profile.birthDate), // Date only
    lastLoginAt: truncSecond(profile.lastLoginAt), // Keep time precision
  };
}
```

### Time-Based Cache Keys

```typescript
import { truncHour, truncDay } from "chronia";

// Generate hour-based cache key
function getHourlyCacheKey(prefix: string, date: Date = new Date()): string {
  const hourTimestamp = truncHour(date).getTime();
  return `${prefix}:${hourTimestamp}`;
}

// Generate daily cache key
function getDailyCacheKey(prefix: string, date: Date = new Date()): string {
  const dayTimestamp = truncDay(date).getTime();
  return `${prefix}:${dayTimestamp}`;
}

// Cache invalidation check
function shouldInvalidateCache(
  cachedDate: Date,
  currentDate: Date,
  granularity: "hour" | "day",
): boolean {
  if (granularity === "hour") {
    return truncHour(cachedDate).getTime() !== truncHour(currentDate).getTime();
  }
  return truncDay(cachedDate).getTime() !== truncDay(currentDate).getTime();
}

// Usage
const analyticsKey = getHourlyCacheKey("analytics"); // 'analytics:1718460000000'
const reportKey = getDailyCacheKey("report"); // 'report:1718409600000'
```

### Scheduling and Intervals

```typescript
import { truncHour, truncDay, truncMinute } from "chronia";

// Calculate next hourly interval
function getNextHourlySlot(date: Date): Date {
  const currentHour = truncHour(date);
  return new Date(currentHour.getTime() + 60 * 60 * 1000);
}

// Generate hourly time slots
function generateHourlySlots(start: Date, count: number): Date[] {
  const startHour = truncHour(start);
  return Array.from(
    { length: count },
    (_, i) => new Date(startHour.getTime() + i * 60 * 60 * 1000),
  );
}

// Generate daily time slots
function generateDailySlots(start: Date, count: number): Date[] {
  const startDay = truncDay(start);
  return Array.from({ length: count }, (_, i) => {
    const slot = new Date(startDay);
    slot.setDate(slot.getDate() + i);
    return slot;
  });
}

// Check if it's time to run a scheduled task (hourly)
function shouldRunHourlyTask(lastRun: Date, now: Date = new Date()): boolean {
  return truncHour(lastRun).getTime() !== truncHour(now).getTime();
}

// Usage
const now = new Date(2024, 5, 15, 14, 30);
const nextHour = getNextHourlySlot(now); // June 15, 2024 15:00:00.000
const slots = generateHourlySlots(now, 3); // [14:00, 15:00, 16:00]
const days = generateDailySlots(now, 7); // 7 days starting from June 15
```

### Filtering and Querying

```typescript
import { truncDay, truncMonth } from "chronia";

interface Transaction {
  date: Date;
  amount: number;
}

// Get all transactions for a specific day
function getTransactionsForDay(
  transactions: Transaction[],
  targetDay: Date,
): Transaction[] {
  const dayStart = truncDay(targetDay);
  const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);

  return transactions.filter((t) => t.date >= dayStart && t.date < dayEnd);
}

// Get all transactions for a specific month
function getTransactionsForMonth(
  transactions: Transaction[],
  targetMonth: Date,
): Transaction[] {
  const monthStart = truncMonth(targetMonth);
  const monthEnd = new Date(monthStart);
  monthEnd.setMonth(monthEnd.getMonth() + 1);

  return transactions.filter((t) => t.date >= monthStart && t.date < monthEnd);
}

// Check if transaction occurred today
function isTransactionToday(transaction: Transaction): boolean {
  const today = truncDay(new Date());
  const transactionDay = truncDay(transaction.date);
  return today.getTime() === transactionDay.getTime();
}
```

## Performance Considerations

- **Millisecond truncation** (`truncMillisecond`) is the fastest as it's essentially a no-op
- **Second truncation** (`truncSecond`) only sets milliseconds to 0 - minimal overhead
- **Minute/Hour truncation** sets 2-3 components - still very efficient
- **Day/Month/Year truncation** sets more components but performance impact is negligible for typical use cases
- All functions validate inputs early for fast-fail behavior on invalid dates
- Truncation is significantly faster than string parsing or complex date arithmetic
- For high-frequency operations (millions of calls), consider caching truncated values when the same dates are processed repeatedly

## Edge Cases and Special Behaviors

### Leap Years

All truncation functions handle leap years correctly:

```typescript
import { truncMonth, truncDay, truncYear } from "chronia";

// Leap day (February 29, 2024)
const leapDay = new Date(2024, 1, 29, 14, 30);

truncDay(leapDay); // February 29, 2024 00:00:00.000
truncMonth(leapDay); // February 1, 2024 00:00:00.000
truncYear(leapDay); // January 1, 2024 00:00:00.000
```

### Daylight Saving Time Transitions

Truncation functions operate in local time and handle DST transitions correctly:

```typescript
import { truncDay } from "chronia";

// DST transition (Spring forward - March 10, 2024 in US)
const dstDate = new Date(2024, 2, 10, 14, 30);
truncDay(dstDate); // March 10, 2024 00:00:00.000 (local time)
```

### Month-End Dates

Functions correctly handle months with different numbers of days:

```typescript
import { truncMonth } from "chronia";

// 31-day month
truncMonth(new Date(2024, 0, 31)); // January 1, 2024 00:00:00.000

// 30-day month
truncMonth(new Date(2024, 3, 30)); // April 1, 2024 00:00:00.000

// 28-day month (non-leap year)
truncMonth(new Date(2023, 1, 28)); // February 1, 2023 00:00:00.000

// 29-day month (leap year)
truncMonth(new Date(2024, 1, 29)); // February 1, 2024 00:00:00.000
```

### Idempotency

Truncation functions are idempotent - truncating an already-truncated date returns the same value:

```typescript
import { truncDay } from "chronia";

const date = new Date(2024, 5, 15, 14, 30);
const truncated1 = truncDay(date); // June 15, 2024 00:00:00.000
const truncated2 = truncDay(truncated1); // June 15, 2024 00:00:00.000

truncated1.getTime() === truncated2.getTime(); // true
```

## Type Definitions

```typescript
type DateInput = Date | number;

function truncYear(date: DateInput): Date;
function truncMonth(date: DateInput): Date;
function truncDay(date: DateInput): Date;
function truncHour(date: DateInput): Date;
function truncMinute(date: DateInput): Date;
function truncSecond(date: DateInput): Date;
function truncMillisecond(date: DateInput): Date;
```

## Error Handling

All truncation functions follow a consistent error handling pattern:

- **No exceptions thrown**: Invalid inputs return Invalid Date instead of throwing errors
- **Invalid Date objects**: Return Invalid Date
- **NaN**: Returns Invalid Date
- **Infinity / -Infinity**: Returns Invalid Date
- **Non-date, non-number inputs**: TypeScript prevents at compile time

**Checking for Invalid Results:**

```typescript
import { truncDay, isValid } from "chronia";

function safeTruncate(date: Date | number): Date | null {
  const result = truncDay(date);
  return isValid(result) ? result : null;
}

// Usage
const invalid = safeTruncate(new Date("invalid")); // null
const valid = safeTruncate(new Date(2024, 5, 15)); // June 15, 2024 00:00:00.000
```

## Relationship with Other Chronia Functions

### Truncation + Validation

```typescript
import { truncDay, isValid, isSameDay } from "chronia";

// Validate before truncating (optional - truncation handles invalid inputs)
function safeTruncateDay(date: Date): Date | null {
  if (!isValid(date)) return null;
  return truncDay(date);
}

// Use with same-day validation
const date1 = new Date(2024, 5, 15, 9, 30);
const date2 = new Date(2024, 5, 15, 17, 45);

// Option 1: Use isSameDay directly
isSameDay(date1, date2); // true

// Option 2: Truncate and compare
truncDay(date1).getTime() === truncDay(date2).getTime(); // true
```

### Truncation + Comparison

```typescript
import { truncDay, isBefore, isAfter } from "chronia";

// Compare dates at day-level granularity
function isBeforeDay(date1: Date, date2: Date): boolean {
  return isBefore(truncDay(date1), truncDay(date2));
}

function isAfterDay(date1: Date, date2: Date): boolean {
  return isAfter(truncDay(date1), truncDay(date2));
}

const morning = new Date(2024, 5, 15, 9, 0);
const evening = new Date(2024, 5, 16, 17, 0);

isBeforeDay(morning, evening); // true
```

### Truncation + Boundaries

Truncation functions are conceptually similar to "start of" boundary functions. While boundary functions don't exist yet in the documented API, truncation serves this purpose:

```typescript
import { truncDay, truncMonth, truncYear } from "chronia";

// These are effectively "start of" functions
const startOfDay = truncDay(new Date()); // Equivalent to startOfDay()
const startOfMonth = truncMonth(new Date()); // Equivalent to startOfMonth()
const startOfYear = truncYear(new Date()); // Equivalent to startOfYear()
```

## See Also

- [Date Validation](../validations/) - Validate dates and compare at specific granularities
- [Chronia Types](../../types.md) - Type definitions used across the library
