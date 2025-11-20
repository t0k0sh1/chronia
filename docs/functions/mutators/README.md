# Date Mutator Functions

## Overview

Chronia provides a comprehensive suite of immutable date transformation functions that allow you to set individual date and time components. Despite being called "mutators", these functions never modify the original date object; instead, they always return a new Date instance with the specified component updated. All functions support both Date objects and numeric timestamps, validate inputs thoroughly, and handle edge cases gracefully.

## Available Functions

### Component Setters

| Function | Description | Valid Range |
|----------|-------------|-------------|
| [`setYear`](./setYear.md) | Sets the year component | Any finite number (including negative for BC dates) |
| [`setMonth`](./setMonth.md) | Sets the month component (0-indexed) | 0-11 (January-December), values outside roll over |
| [`setDay`](./setDay.md) | Sets the day of the month | 1-31 (varies by month), values outside roll over |
| [`setHours`](./setHours.md) | Sets the hours component | 0-23, values outside roll over |
| [`setMinutes`](./setMinutes.md) | Sets the minutes component | 0-59, values outside roll over |
| [`setSeconds`](./setSeconds.md) | Sets the seconds component | 0-59, values outside roll over |
| [`setMilliseconds`](./setMilliseconds.md) | Sets the milliseconds component | 0-999, values outside roll over |
| [`setTime`](./setTime.md) | Sets the complete timestamp | -8.64e15 to 8.64e15 milliseconds |

## Common Features

All mutator functions in this category share the following characteristics:

### Immutability

All functions return new Date instances without mutating the original input:

```typescript
import { setYear, setMonth } from 'chronia';

const original = new Date(2025, 0, 15, 12, 30, 45);

// Set year returns a new Date
const newDate = setYear(original, 2026);
console.log(original.getFullYear());  // 2025 (unchanged)
console.log(newDate.getFullYear());   // 2026 (new instance)

// Works with all mutator functions
const updated = setMonth(original, 5);
console.log(original.getMonth());  // 0 (unchanged)
console.log(updated.getMonth());   // 5 (new instance)
```

### Type Flexibility

All functions accept both Date objects and numeric timestamps:

```typescript
import { setDay, setHours } from 'chronia';

// Date objects
setDay(new Date(2025, 0, 15), 20);     // Returns: 2025-01-20
setHours(new Date(2025, 0, 15), 14);   // Returns: 2025-01-15 14:00

// Timestamps
setDay(1704067200000, 20);    // Returns: Date with day set to 20
setHours(1704067200000, 14);  // Returns: Date with hours set to 14

// Mixed types
const timestamp = Date.now();
const newDate = setDay(timestamp, 1);  // Works seamlessly
```

### Input Validation

All functions validate inputs and return Invalid Date for invalid inputs without throwing exceptions:

```typescript
import { setYear, setMonth, setDay } from 'chronia';

// Invalid date returns Invalid Date
setYear(new Date('invalid'), 2025);  // Returns: Invalid Date
setMonth(NaN, 5);                     // Returns: Invalid Date

// Invalid component value returns Invalid Date
setDay(new Date(2025, 0, 15), NaN);       // Returns: Invalid Date
setHours(new Date(2025, 0, 15), Infinity); // Returns: Invalid Date

// Check validity
import { isValid } from 'chronia';
const result = setMonth(new Date(2025, 0, 15), 5);
if (isValid(result)) {
  console.log('Month set successfully');
}
```

### Fractional Value Handling

All component setters truncate fractional values toward zero using `Math.trunc`:

```typescript
import { setDay, setHours, setMinutes } from 'chronia';

// Positive fractional values truncated down
setDay(new Date(2025, 0, 15), 20.9);      // Returns: day 20 (not 21)
setHours(new Date(2025, 0, 15), 14.9);    // Returns: hour 14 (not 15)
setMinutes(new Date(2025, 0, 15), 45.9);  // Returns: minute 45 (not 46)

// Negative fractional values truncated toward zero
setDay(new Date(2025, 0, 15), -5.9);      // Returns: -5 (not -6)
setHours(new Date(2025, 0, 15), -2.9);    // Returns: -2 (not -3)
```

### Rollover Behavior

Values outside the typical range automatically roll over to adjacent time units:

```typescript
import { setMonth, setDay, setHours, setMinutes } from 'chronia';

// Month rollover
setMonth(new Date(2025, 0, 15), 12);   // Returns: 2026-01-15 (next year)
setMonth(new Date(2025, 0, 15), -1);   // Returns: 2024-12-15 (previous year)

// Day rollover
setDay(new Date(2025, 0, 15), 32);     // Returns: 2025-02-01 (next month)
setDay(new Date(2025, 0, 15), 0);      // Returns: 2024-12-31 (previous month)

// Hour rollover
setHours(new Date(2025, 0, 15, 12), 24);   // Returns: 2025-01-16 00:00 (next day)
setHours(new Date(2025, 0, 15, 12), -1);   // Returns: 2025-01-14 23:00 (previous day)

// Minute rollover
setMinutes(new Date(2025, 0, 15, 12, 30), 60);   // Returns: 2025-01-15 13:00 (next hour)
setMinutes(new Date(2025, 0, 15, 12, 30), -1);   // Returns: 2025-01-15 11:59 (previous hour)
```

### Component Preservation

Each setter preserves all other date/time components:

```typescript
import { setYear, setMonth, setDay } from 'chronia';

const dateTime = new Date(2025, 0, 15, 14, 30, 45, 500);

// Set year preserves month, day, and time
const newYear = setYear(dateTime, 2026);
// Returns: 2026-01-15 14:30:45.500

// Set month preserves year, day, and time
const newMonth = setMonth(dateTime, 5);
// Returns: 2025-06-15 14:30:45.500

// Set day preserves year, month, and time
const newDay = setDay(dateTime, 20);
// Returns: 2025-01-20 14:30:45.500
```

## Choosing the Right Function

### Component-Specific vs Complete Replacement

**Component Setters** (`setYear`, `setMonth`, `setDay`, `setHours`, `setMinutes`, `setSeconds`, `setMilliseconds`):
- Modify a single date/time component
- Preserve all other components
- Handle rollover automatically
- Ideal for: incremental updates, user input processing, date adjustments

**Complete Replacement** (`setTime`):
- Replaces the entire timestamp at once
- Does not preserve any components
- No rollover behavior (direct timestamp assignment)
- Ideal for: timestamp synchronization, copying timestamps, resetting to specific points in time

### Use Case Guide

| Scenario | Recommended Function | Reason |
|----------|---------------------|--------|
| Change year of a date | `setYear(date, year)` | Preserves month, day, and time |
| Move to different month | `setMonth(date, month)` | Handles day overflow automatically |
| Set specific day of month | `setDay(date, day)` | Preserves year, month, and time |
| Set business hours | `setHours(date, hours)` | Preserves date and other time components |
| Round to specific minute | `setMinutes(date, minutes)` | Useful for time normalization |
| Reset milliseconds for comparison | `setMilliseconds(date, 0)` | Enables second-level comparisons |
| Normalize to start of hour | `setMinutes(setSeconds(setMilliseconds(date, 0), 0), 0)` | Combine multiple setters |
| Copy timestamp from one date to another | `setTime(target, source.getTime())` | Complete timestamp replacement |
| Reset to Unix epoch | `setTime(date, 0)` | Sets to 1970-01-01 00:00:00 UTC |
| Synchronize multiple dates | `dates.map(d => setTime(d, referenceTime))` | Align all to same timestamp |

## Common Patterns

### Date Normalization

```typescript
import { setDay, setHours, setMinutes, setSeconds, setMilliseconds } from 'chronia';

// Normalize to first day of month
function startOfMonth(date: Date): Date {
  return setDay(date, 1);
}

// Normalize to start of day
function startOfDay(date: Date): Date {
  let result = setHours(date, 0);
  result = setMinutes(result, 0);
  result = setSeconds(result, 0);
  result = setMilliseconds(result, 0);
  return result;
}

// Normalize to start of hour
function startOfHour(date: Date): Date {
  let result = setMinutes(date, 0);
  result = setSeconds(result, 0);
  result = setMilliseconds(result, 0);
  return result;
}

const date = new Date(2025, 0, 15, 14, 37, 45, 500);
startOfMonth(date);  // Returns: 2025-01-01 14:37:45.500
startOfDay(date);    // Returns: 2025-01-15 00:00:00.000
startOfHour(date);   // Returns: 2025-01-15 14:00:00.000
```

### Time Rounding

```typescript
import { setMinutes, setSeconds } from 'chronia';

// Round to nearest 15 minutes
function roundToQuarterHour(date: Date): Date {
  const minutes = date.getMinutes();
  const rounded = Math.round(minutes / 15) * 15;
  return setMinutes(date, rounded);
}

// Round to nearest hour
function roundToHour(date: Date): Date {
  const minutes = date.getMinutes();
  const hours = date.getHours() + (minutes >= 30 ? 1 : 0);
  let result = setHours(date, hours);
  result = setMinutes(result, 0);
  return result;
}

const time = new Date(2025, 0, 15, 14, 38, 30);
roundToQuarterHour(time);  // Returns: 2025-01-15 14:45:00
roundToHour(time);         // Returns: 2025-01-15 15:00:00
```

### Date Arithmetic

```typescript
import { setMonth, setDay, setYear } from 'chronia';

// Add months with proper overflow handling
function addMonths(date: Date, months: number): Date {
  const currentMonth = date.getMonth();
  return setMonth(date, currentMonth + months);
}

// Add years
function addYears(date: Date, years: number): Date {
  const currentYear = date.getFullYear();
  return setYear(date, currentYear + years);
}

// Move to first day of next month
function firstDayOfNextMonth(date: Date): Date {
  const nextMonth = addMonths(date, 1);
  return setDay(nextMonth, 1);
}

const date = new Date(2025, 0, 31);
addMonths(date, 1);           // Returns: 2025-02-28 (handles day overflow)
addYears(date, 2);            // Returns: 2027-01-31
firstDayOfNextMonth(date);    // Returns: 2025-02-01
```

### Recurring Events

```typescript
import { setYear, setMonth, setDay } from 'chronia';

// Generate annual recurring dates
function generateAnnualDates(baseDate: Date, years: number[]): Date[] {
  return years.map(year => setYear(baseDate, year));
}

// Generate monthly recurring dates
function generateMonthlyDates(baseDate: Date, count: number): Date[] {
  return Array.from({ length: count }, (_, i) => {
    const currentMonth = baseDate.getMonth();
    return setMonth(baseDate, currentMonth + i);
  });
}

// Birthday in multiple years
const birthday = new Date(1990, 5, 15);
const nextFiveYears = [2025, 2026, 2027, 2028, 2029];
generateAnnualDates(birthday, nextFiveYears);
// Returns: [2025-06-15, 2026-06-15, 2027-06-15, 2028-06-15, 2029-06-15]

// Monthly payment due dates
const firstPayment = new Date(2025, 0, 15);
generateMonthlyDates(firstPayment, 12);
// Returns: 12 dates, one for each month of 2025 (handles day overflow)
```

### Timestamp Synchronization

```typescript
import { setTime } from 'chronia';

// Synchronize multiple dates to a reference time
function synchronizeDates(dates: Date[], referenceTime: number): Date[] {
  return dates.map(date => setTime(date, referenceTime));
}

// Copy timestamp from one date to multiple others
function copyTimestamp(source: Date, targets: Date[]): Date[] {
  const timestamp = source.getTime();
  return targets.map(target => setTime(target, timestamp));
}

const reference = Date.now();
const dates = [
  new Date(2023, 0, 1),
  new Date(2024, 5, 15),
  new Date(2025, 11, 31)
];

synchronizeDates(dates, reference);
// Returns: All dates set to the same timestamp
```

### Edge Case Handling

```typescript
import { setMonth, setDay, setYear } from 'chronia';

// Handle leap year edge cases
function safeSetYear(date: Date, year: number): Date {
  // February 29 → non-leap year automatically becomes February 28
  return setYear(date, year);
}

// Handle month day overflow
function safeSetMonth(date: Date, month: number): Date {
  // January 31 → February automatically becomes February 28/29
  return setMonth(date, month);
}

// Handle invalid day of month
function safeSetDay(date: Date, day: number): Date {
  // Day 32 automatically rolls to next month
  return setDay(date, day);
}

const leapDay = new Date(2020, 1, 29);  // Feb 29, 2020
safeSetYear(leapDay, 2021);  // Returns: 2021-02-28 (auto-adjusted)

const jan31 = new Date(2025, 0, 31);
safeSetMonth(jan31, 1);  // Returns: 2025-02-28 (auto-adjusted)

const anyDate = new Date(2025, 0, 15);
safeSetDay(anyDate, 32);  // Returns: 2025-02-01 (rolled over)
```

## Special Considerations

### Leap Year Handling

`setYear` and `setMonth` automatically handle leap year edge cases:

```typescript
import { setYear, setMonth } from 'chronia';

// Leap day to non-leap year
const leapDay = new Date(2020, 1, 29);  // Feb 29, 2020
setYear(leapDay, 2021);  // Returns: 2021-02-28 (adjusted)
setYear(leapDay, 2024);  // Returns: 2024-02-29 (preserved)

// January 31 to February
const jan31 = new Date(2025, 0, 31);
setMonth(jan31, 1);      // Returns: 2025-02-28 (adjusted)
setMonth(jan31, 2);      // Returns: 2025-03-31 (preserved)
```

### Negative Values and BC Dates

Negative values are supported and follow JavaScript's Date specification:

```typescript
import { setYear, setMonth, setDay } from 'chronia';

// Negative years represent BC dates
setYear(new Date(2025, 0, 15), -100);  // Returns: Year -100 (100 BC)

// Negative months roll back
setMonth(new Date(2025, 0, 15), -1);   // Returns: 2024-12-15

// Negative days roll back
setDay(new Date(2025, 0, 15), -1);     // Returns: 2024-12-30
```

### Large Values and Cascading Rollover

Large values cascade through adjacent units:

```typescript
import { setMonth, setHours, setMinutes } from 'chronia';

// 13 months = 1 year + 1 month
setMonth(new Date(2025, 0, 15), 13);  // Returns: 2026-02-15

// 25 hours = 1 day + 1 hour
setHours(new Date(2025, 0, 15, 12), 25);  // Returns: 2025-01-16 01:00

// 120 minutes = 2 hours
setMinutes(new Date(2025, 0, 15, 12, 30), 120);  // Returns: 2025-01-15 14:00
```

## Performance Considerations

- **Direct component setters** are highly efficient as they only modify one component
- **setTime** is the fastest when you need to replace the entire timestamp
- **Multiple setters** can be chained, but each creates a new Date instance
- **Validation overhead** is minimal and ensures safe operations
- **Rollover calculations** are handled by JavaScript's native Date implementation

## Type Definitions

```typescript
type DateInput = Date | number;

function setYear(date: DateInput, year: number): Date;
function setMonth(date: DateInput, month: number): Date;
function setDay(date: DateInput, day: number): Date;
function setHours(date: DateInput, hours: number): Date;
function setMinutes(date: DateInput, minutes: number): Date;
function setSeconds(date: DateInput, seconds: number): Date;
function setMilliseconds(date: DateInput, milliseconds: number): Date;
function setTime(date: DateInput, time: number): Date;
```

## Error Handling

All mutator functions follow a consistent error handling pattern:

- **No exceptions thrown**: Invalid inputs return Invalid Date instead of throwing errors
- **Invalid Date input**: Returns Invalid Date
- **NaN component**: Returns Invalid Date
- **Infinity / -Infinity**: Returns Invalid Date
- **Out-of-range timestamps** (setTime only): Returns Invalid Date
- **Non-date, non-number inputs**: TypeScript prevents at compile time

```typescript
import { setYear, setMonth, isValid } from 'chronia';

// Defensive programming pattern
function safeSetYear(date: Date, year: number): Date | null {
  const result = setYear(date, year);
  return isValid(result) ? result : null;
}

// Validation before use
const result = setMonth(new Date(2025, 0, 15), 5);
if (isValid(result)) {
  console.log('Month set successfully:', result);
} else {
  console.error('Failed to set month');
}
```

## See Also

- [Date Accessors](../accessors/) - Get individual date/time components (getYear, getMonth, etc.)
- [Date Validations](../validations/) - Validate and compare dates
- [Date Boundaries](../boundaries/) - Start and end of time periods (startOfDay, endOfMonth, etc.)
- [Chronia Types](../../types.md) - Type definitions used across the library
