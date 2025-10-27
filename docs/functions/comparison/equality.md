# Equality Comparison Functions

## Overview

Equality comparison functions check if two dates represent the same moment or fall within the same time unit. The library provides two approaches: `isEqual` for flexible unit-based exact equality, and specialized `isSame*` functions for common calendar unit comparisons. All functions return `false` for invalid inputs.

## Functions

### `isEqual(a: Date | number, b: Date | number, options?: ComparisonOptions): boolean`

Checks if two dates are equal with configurable granularity.

**Parameters:**
- `a` - The first date (Date object or timestamp)
- `b` - The second date (Date object or timestamp)
- `options.unit` - Comparison granularity (default: "millisecond")

**Key Behavior:**
- Default: Exact millisecond-precision equality
- With `unit` option: Compares at specified granularity (truncates before comparing)
- Most flexible equality function

**Examples:**
```typescript
// Exact millisecond equality (default)
const date1 = new Date(2025, 0, 1, 12, 0, 0);
const date2 = new Date(2025, 0, 1, 12, 0, 0);
isEqual(date1, date2);
// Returns: true

// Day-level equality (ignores time)
isEqual(
  new Date(2025, 0, 1, 9, 0),
  new Date(2025, 0, 1, 17, 0),
  { unit: "day" }
);
// Returns: true (same day, different times)

// Year-level equality
isEqual(
  new Date(2025, 0, 1),
  new Date(2025, 11, 31),
  { unit: "year" }
);
// Returns: true (same year)

// Works with timestamps
const timestamp = Date.now();
isEqual(timestamp, new Date(timestamp));
// Returns: true
```

### `isSameYear(dateLeft: Date | number, dateRight: Date | number): boolean`

Checks if two dates are in the same calendar year.

**Implementation:** Uses `diffYears() === 0`

**Key Behavior:**
- Ignores month, day, and time components
- Compares calendar years only

**Examples:**
```typescript
isSameYear(new Date(2024, 0, 1), new Date(2024, 11, 31));
// Returns: true

isSameYear(new Date(2024, 11, 31), new Date(2025, 0, 1));
// Returns: false (different years)
```

### `isSameMonth(dateLeft: Date | number, dateRight: Date | number): boolean`

Checks if two dates are in the same calendar month of the same year.

**Implementation:** Uses `diffMonths() === 0`

**Key Behavior:**
- Compares both year AND month
- Ignores day and time components
- Same month in different years returns `false`

**Examples:**
```typescript
isSameMonth(new Date(2024, 5, 1), new Date(2024, 5, 30));
// Returns: true (both in June 2024)

isSameMonth(new Date(2024, 5, 30), new Date(2024, 6, 1));
// Returns: false (June vs July)

// Same month, different years
isSameMonth(new Date(2024, 5, 15), new Date(2025, 5, 15));
// Returns: false (June 2024 vs June 2025)
```

### `isSameDay(dateLeft: Date | number, dateRight: Date | number): boolean`

Checks if two dates are on the same calendar day.

**Implementation:** Uses `diffDays() === 0`

**Key Behavior:**
- Compares year, month, AND day
- Ignores time components (hours, minutes, seconds, milliseconds)
- Based on local timezone calendar day

**Examples:**
```typescript
isSameDay(
  new Date(2024, 5, 15, 0, 0),
  new Date(2024, 5, 15, 23, 59)
);
// Returns: true (same day, different times)

isSameDay(
  new Date(2024, 5, 15, 23, 59),
  new Date(2024, 5, 16, 0, 0)
);
// Returns: false (consecutive days)
```

### `isSameHour(dateLeft: Date | number, dateRight: Date | number): boolean`

Checks if two dates are in the same hour.

**Implementation:** Uses `diffHours() === 0`

**Key Behavior:**
- Compares year, month, day, AND hour
- Ignores minute, second, and millisecond components
- Based on local timezone

**Examples:**
```typescript
isSameHour(
  new Date(2024, 5, 15, 14, 0),
  new Date(2024, 5, 15, 14, 59)
);
// Returns: true (14:00-14:59)

isSameHour(
  new Date(2024, 5, 15, 14, 59),
  new Date(2024, 5, 15, 15, 0)
);
// Returns: false (different hours)
```

### `isSameMinute(dateLeft: Date | number, dateRight: Date | number): boolean`

Checks if two dates are in the same minute.

**Implementation:** Uses `diffMinutes() === 0`

**Key Behavior:**
- Compares year, month, day, hour, AND minute
- Ignores second and millisecond components

**Examples:**
```typescript
isSameMinute(
  new Date(2024, 5, 15, 14, 30, 0),
  new Date(2024, 5, 15, 14, 30, 59)
);
// Returns: true (14:30:00-14:30:59)

isSameMinute(
  new Date(2024, 5, 15, 14, 30, 59),
  new Date(2024, 5, 15, 14, 31, 0)
);
// Returns: false (different minutes)
```

### `isSameSecond(dateLeft: Date | number, dateRight: Date | number): boolean`

Checks if two dates are in the same second.

**Implementation:** Uses `diffSeconds() === 0`

**Key Behavior:**
- Compares year, month, day, hour, minute, AND second
- Ignores millisecond component

**Examples:**
```typescript
isSameSecond(
  new Date(2024, 5, 15, 14, 30, 45, 0),
  new Date(2024, 5, 15, 14, 30, 45, 999)
);
// Returns: true (14:30:45.000-14:30:45.999)

isSameSecond(
  new Date(2024, 5, 15, 14, 30, 45, 999),
  new Date(2024, 5, 15, 14, 30, 46, 0)
);
// Returns: false (different seconds)
```

## Usage Patterns

### Date Deduplication
```typescript
import { isEqual } from "chronia";

function removeDuplicateDates(dates: Date[]): Date[] {
  return dates.filter((date, index, self) =>
    index === self.findIndex(d => isEqual(d, date))
  );
}
```

### Calendar Unit Grouping
```typescript
import { isSameDay, isSameMonth } from "chronia";

// Group events by day
function groupByDay(events: Event[]): Map<string, Event[]> {
  const groups = new Map<string, Event[]>();

  events.forEach(event => {
    const key = format(event.date, "yyyy-MM-dd");
    const existing = groups.get(key) || [];
    groups.set(key, [...existing, event]);
  });

  return groups;
}

// Check if event is today
function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}
```

### Unit-Based Caching
```typescript
import { isEqual } from "chronia";

class DateCache<T> {
  private cache = new Map<number, T>();

  set(date: Date, value: T, unit: TimeUnit = "millisecond"): void {
    const key = this.getKey(date, unit);
    this.cache.set(key, value);
  }

  get(date: Date, unit: TimeUnit = "millisecond"): T | undefined {
    const key = this.getKey(date, unit);
    return this.cache.get(key);
  }

  private getKey(date: Date, unit: TimeUnit): number {
    const truncated = truncateToUnit(date, unit);
    return truncated.getTime();
  }
}
```

### Filtering by Time Unit
```typescript
import { isSameMonth, isSameYear } from "chronia";

// Get all events in a specific month
function getEventsForMonth(events: Event[], targetMonth: Date): Event[] {
  return events.filter(e => isSameMonth(e.date, targetMonth));
}

// Get all events in a specific year
function getEventsForYear(events: Event[], targetYear: Date): Event[] {
  return events.filter(e => isSameYear(e.date, targetYear));
}
```

### Conditional Logic Based on Time Units
```typescript
import { isSameDay, isSameHour } from "chronia";

function getRateLimitKey(userId: string, now: Date, unit: "hour" | "day"): string {
  if (unit === "day") {
    return `${userId}:${format(now, "yyyy-MM-dd")}`;
  } else {
    return `${userId}:${format(now, "yyyy-MM-dd-HH")}`;
  }
}

function isWithinRateLimitWindow(lastRequest: Date, now: Date, unit: "hour" | "day"): boolean {
  if (unit === "day") {
    return isSameDay(lastRequest, now);
  } else {
    return isSameHour(lastRequest, now);
  }
}
```

## AI Guidance

### When to Recommend Each Function

**Recommend `isEqual` when:**
- User needs flexible comparison at different granularities
- Dynamic unit selection is required
- Need to compare with millisecond precision (default)
- Building generic comparison utilities

**Recommend `isSameYear` when:**
- User mentions "same year", "in YYYY"
- Building annual statistics or reports
- Grouping data by calendar year

**Recommend `isSameMonth` when:**
- User mentions "same month", "in YYYY-MM"
- Building monthly reports or calendars
- Grouping data by calendar month

**Recommend `isSameDay` when:**
- User mentions "same day", "today", "on YYYY-MM-DD"
- Most common use case for calendar applications
- Checking if dates are on the same calendar day

**Recommend `isSameHour` when:**
- User needs hourly granularity (e.g., hourly analytics)
- Building time-based rate limiting (hourly quotas)

**Recommend `isSameMinute` when:**
- User needs minute-level precision (e.g., meeting scheduling)
- Timestamp truncation to minute

**Recommend `isSameSecond` when:**
- User needs second-level precision (e.g., event logging)
- Timestamp truncation to second

### Function Selection Logic

**Use `isSame*` functions when:**
1. Unit is known at compile time (e.g., always checking same day)
2. Code clarity is priority (more semantic than `isEqual` with options)
3. Performance: slightly faster than `isEqual` with unit option

**Use `isEqual` when:**
1. Unit is determined at runtime
2. Need millisecond precision (default)
3. Building generic/reusable comparison logic

### Equivalence Patterns

These are equivalent:
```typescript
// Using isEqual with unit
isEqual(date1, date2, { unit: "day" });

// Using isSameDay
isSameDay(date1, date2);
```

**AI Guidance:** For known units, recommend the specific `isSame*` function for clarity. For dynamic units, recommend `isEqual`.

## Common Pitfalls

### 1. `isSameMonth` Requires Same Year

**❌ Incorrect Assumption:**
```typescript
// User expects: "Are both dates in June?"
isSameMonth(new Date(2024, 5, 15), new Date(2025, 5, 15));
// Returns: false (NOT what user expected!)
// June 2024 ≠ June 2025
```

**✅ Correct Approach:**
```typescript
// Check if both are in the same month (any year)
function isSameMonthOfYear(d1: Date, d2: Date): boolean {
  return d1.getMonth() === d2.getMonth();
}

// Or use custom logic
const sameMonthNumber =
  new Date(2024, 5, 15).getMonth() === new Date(2025, 5, 15).getMonth();
// Returns: true (both are month 5, i.e., June)
```

**AI Guidance:** Clarify that `isSameMonth` checks **both year and month**. If user only cares about month number, suggest direct `getMonth()` comparison.

### 2. Millisecond Precision Default

**❌ Unexpected Inequality:**
```typescript
const date1 = new Date(2025, 0, 1, 12, 0, 0, 0);
const date2 = new Date(2025, 0, 1, 12, 0, 0, 1);  // 1ms later

isEqual(date1, date2);
// Returns: false (different by 1 millisecond!)
```

**✅ Correct Approach:**
```typescript
// If milliseconds don't matter, use unit option
isEqual(date1, date2, { unit: "second" });
// Returns: true (same second)

// Or use isSameSecond
isSameSecond(date1, date2);
// Returns: true
```

**AI Guidance:** Remind users that default equality is **millisecond-precise**. For date/time applications, recommend specifying appropriate unit.

### 3. Timezone Considerations for Calendar Units

**⚠️ Local Timezone Dependency:**
```typescript
// These dates may or may not be the same day depending on timezone
const utcDate = new Date(Date.UTC(2024, 0, 1, 0, 0, 0));
const localDate = new Date(2024, 0, 1, 0, 0, 0);

isSameDay(utcDate, localDate);
// Result depends on local timezone offset!
```

**AI Guidance:** All `isSame*` functions use **local timezone** for calendar unit determination. For UTC comparisons, convert dates to UTC first or work with timestamps.

### 4. Comparison vs. Equality Confusion

**❌ Wrong Function Choice:**
```typescript
// User wants: "Is date1 on or after date2?"
isEqual(date1, date2);  // WRONG - only checks exact equality
```

**✅ Correct Functions:**
```typescript
// For "on or after", use comparison function
isAfterOrEqual(date1, date2);

// For "exactly the same", use equality function
isEqual(date1, date2);
```

**AI Guidance:** Clarify that equality functions check **exact sameness** at a given granularity, not relational order (before/after).

### 5. `isSame*` Implementation Understanding

**Understanding internals helps debugging:**
```typescript
// These are equivalent:
isSameDay(date1, date2);
diffDays(date1, date2) === 0;

// NOT the same as:
isEqual(date1, date2, { unit: "day" });
```

While functionally similar for most cases, `isSame*` uses `diff*` functions (which may have different edge case behavior than truncation-based comparison).

**AI Guidance:** For most use cases, the difference is negligible. Recommend `isSame*` for clarity.

## Error Handling Reference

All equality functions return `false` for invalid inputs:
```typescript
isEqual(new Date("invalid"), new Date(2025, 0, 1));
// Returns: false

isSameDay(NaN, new Date());
// Returns: false
```

**Validation Pattern:**
```typescript
import { isValid, isEqual } from "chronia";

// Distinguish errors from valid inequality
if (!isValid(date1) || !isValid(date2)) {
  console.error("Invalid date inputs");
} else {
  const areEqual = isEqual(date1, date2);
  // Now false means "not equal", not "error"
}
```

## Performance Considerations

- **`isEqual` with unit**: Slightly slower than `isSame*` due to truncation overhead
- **`isSame*` functions**: Optimized for specific units using `diff*` functions
- **Millisecond equality**: Fastest (direct timestamp comparison)

For performance-critical code with known units, prefer `isSame*` functions.

## Relationship to Other Functions

### Truncation
All `isSame*` behaviors can be replicated using `trunc*` and comparison:
```typescript
// These are conceptually similar:
isSameDay(date1, date2);

// vs.
const day1 = truncDay(date1);
const day2 = truncDay(date2);
isEqual(day1, day2);  // Exact timestamp equality after truncation
```

### Difference
`isSame*` functions internally use `diff*`:
```typescript
// Implementation pattern
function isSameDay(d1, d2) {
  return diffDays(d1, d2) === 0;
}
```

## Related Functions

- **Relational comparison**: `isAfter`, `isBefore`, `isBetween` (see `relational.md`)
- **Difference calculation**: `diffDays`, `diffHours`, etc. (see `../difference/calculations.md`)
- **Truncation**: `truncDay`, `truncHour`, etc. (see `../truncation/units.md`)
- **Validation**: `isValid` (see `validation.md`)
