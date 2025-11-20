# Date Arithmetic Functions

## Overview

Chronia provides a comprehensive suite of date arithmetic functions that allow you to add, subtract, and calculate differences between dates with precision and flexibility. All functions support both Date objects and numeric timestamps, maintain immutability, and handle invalid inputs gracefully by returning Invalid Date or NaN.

## Available Functions

### Addition Functions

| Function | Description |
|----------|-------------|
| [`addYears`](./addYears.md) | Adds a specified number of years to a date |
| [`addMonths`](./addMonths.md) | Adds a specified number of months to a date |
| [`addDays`](./addDays.md) | Adds a specified number of days to a date |
| [`addHours`](./addHours.md) | Adds a specified number of hours to a date |
| [`addMinutes`](./addMinutes.md) | Adds a specified number of minutes to a date |
| [`addSeconds`](./addSeconds.md) | Adds a specified number of seconds to a date |
| [`addMilliseconds`](./addMilliseconds.md) | Adds a specified number of milliseconds to a date |

### Subtraction Functions

| Function | Description |
|----------|-------------|
| [`subYears`](./subYears.md) | Subtracts a specified number of years from a date |
| [`subMonths`](./subMonths.md) | Subtracts a specified number of months from a date |
| [`subDays`](./subDays.md) | Subtracts a specified number of days from a date |
| [`subHours`](./subHours.md) | Subtracts a specified number of hours from a date |
| [`subMinutes`](./subMinutes.md) | Subtracts a specified number of minutes from a date |
| [`subSeconds`](./subSeconds.md) | Subtracts a specified number of seconds from a date |
| [`subMilliseconds`](./subMilliseconds.md) | Subtracts a specified number of milliseconds from a date |

### Difference Functions

| Function | Description | Return Value |
|----------|-------------|--------------|
| [`diffYears`](./diffYears.md) | Calculates the difference in complete years between two dates | Integer or `NaN` |
| [`diffMonths`](./diffMonths.md) | Calculates the difference in complete months between two dates | Integer or `NaN` |
| [`diffDays`](./diffDays.md) | Calculates the difference in complete days between two dates | Integer or `NaN` |
| [`diffHours`](./diffHours.md) | Calculates the difference in complete hours between two dates | Integer or `NaN` |
| [`diffMinutes`](./diffMinutes.md) | Calculates the difference in complete minutes between two dates | Integer or `NaN` |
| [`diffSeconds`](./diffSeconds.md) | Calculates the difference in complete seconds between two dates | Integer or `NaN` |
| [`diffMilliseconds`](./diffMilliseconds.md) | Calculates the difference in milliseconds between two dates | Integer or `NaN` |

## Common Features

All arithmetic functions in this category share the following characteristics:

### Type Flexibility

All functions accept both Date objects and numeric timestamps:

```typescript
import { addDays, diffHours } from 'chronia';

// Date objects
addDays(new Date(2025, 0, 1), 7);  // Returns: Date for January 8, 2025
diffHours(new Date(2025, 0, 1, 14, 0), new Date(2025, 0, 1, 10, 0));  // Returns: 4

// Timestamps
addDays(1704067200000, 7);  // Returns: Date for January 8, 2025
diffHours(1704117600000, 1704103200000);  // Returns: 4

// Mixed types
addDays(new Date(2025, 0, 1), 7);
diffHours(new Date(2025, 0, 1, 14, 0), 1704103200000);
```

### Immutability

Add and subtract functions always return new Date objects without modifying the original:

```typescript
import { addMonths } from 'chronia';

const original = new Date(2025, 0, 15);
const result = addMonths(original, 3);

console.log(original);  // Date: January 15, 2025 (unchanged)
console.log(result);    // Date: April 15, 2025 (new object)
```

### Input Validation

All functions validate inputs and return Invalid Date (for add/sub) or NaN (for diff) for invalid inputs without throwing exceptions:

```typescript
import { addDays, diffDays } from 'chronia';

// Invalid date input
addDays(new Date('invalid'), 5);  // Returns: Invalid Date
diffDays(new Date('invalid'), new Date(2025, 0, 1));  // Returns: NaN

// Invalid amount input
addDays(new Date(2025, 0, 1), NaN);  // Returns: Invalid Date
diffDays(new Date(2025, 0, 1), NaN);  // Returns: NaN

// Infinity
addDays(new Date(2025, 0, 1), Infinity);  // Returns: Invalid Date
diffDays(Infinity, new Date(2025, 0, 1));  // Returns: NaN
```

### Fractional Amount Handling

Add and subtract functions truncate fractional amounts toward zero using `Math.trunc()`:

```typescript
import { addDays, addHours } from 'chronia';

const baseDate = new Date(2025, 0, 1);

addDays(baseDate, 2.9);   // Adds 2 days (2.9 → 2)
addDays(baseDate, -2.9);  // Subtracts 2 days (-2.9 → -2)
addDays(baseDate, 0.5);   // Adds 0 days (0.5 → 0, no change)

addHours(baseDate, 3.7);  // Adds 3 hours (3.7 → 3)
```

### Negative Amount Support

Add functions accept negative amounts (effectively subtracting), and subtract functions accept negative amounts (effectively adding):

```typescript
import { addMonths, subMonths } from 'chronia';

const date = new Date(2025, 3, 15);  // April 15, 2025

addMonths(date, -3);  // Returns: January 15, 2025 (same as subMonths(date, 3))
subMonths(date, -3);  // Returns: July 15, 2025 (same as addMonths(date, 3))
```

### Month-End Overflow Handling

Month and year arithmetic functions handle month-end overflow by adjusting to the last valid day of the target month:

```typescript
import { addMonths, subMonths } from 'chronia';

// March 31 + 1 month → April 30 (April has 30 days)
const march31 = new Date(2025, 2, 31);
addMonths(march31, 1);  // Returns: April 30, 2025

// March 31 - 1 month → February 28 (non-leap year)
subMonths(march31, 1);  // Returns: February 28, 2025

// March 31, 2024 - 1 month → February 29, 2024 (leap year)
const march31_2024 = new Date(2024, 2, 31);
subMonths(march31_2024, 1);  // Returns: February 29, 2024
```

## Choosing the Right Function

### Addition vs Subtraction vs Difference

**Addition Functions** (`addYears`, `addMonths`, `addDays`, etc.):
- Use to calculate future or past dates from a base date
- Return a new Date object
- Accept negative amounts to subtract
- Ideal for: scheduling, deadline calculation, date range generation

**Subtraction Functions** (`subYears`, `subMonths`, `subDays`, etc.):
- Use to calculate past or future dates from a base date
- Return a new Date object
- Accept negative amounts to add
- Ideal for: historical lookups, relative date calculation, billing cycles

**Difference Functions** (`diffYears`, `diffMonths`, `diffDays`, etc.):
- Use to calculate the time span between two dates
- Return a number (positive, negative, zero, or NaN)
- Positive if first date is after second, negative if before
- Ideal for: time span calculation, duration display, analytics

### Unit Selection Guide

| Scenario | Recommended Function | Reason |
|----------|---------------------|--------|
| Schedule event 7 days from now | `addDays(now, 7)` | Day-level precision |
| Calculate age in years | `diffYears(now, birthdate)` | Year-level granularity |
| Billing cycle (monthly) | `addMonths(startDate, 1)` | Month-based periods |
| Meeting reminder (15 minutes before) | `subMinutes(meetingTime, 15)` | Minute-level precision |
| Session timeout (30 seconds) | `addSeconds(sessionStart, 30)` | Second-level precision |
| Performance measurement | `diffMilliseconds(endTime, startTime)` | Millisecond accuracy |
| Quarterly report dates | `addMonths(startDate, 3)` | Quarter = 3 months |
| Time-sensitive cache expiry | `addMinutes(now, 5)` | Minute-based expiry |
| Historical data (1 year ago) | `subYears(now, 1)` | Year-based lookback |
| Event duration in hours | `diffHours(endTime, startTime)` | Hour-based duration |

## Use Case Examples

### Scheduling and Deadlines

```typescript
import { addDays, addHours, subMinutes } from 'chronia';

// Schedule a task 7 days from now
const taskDeadline = addDays(new Date(), 7);

// Set meeting 2 hours from now
const meetingTime = addHours(new Date(), 2);

// Send reminder 15 minutes before meeting
const reminderTime = subMinutes(meetingTime, 15);
```

### Billing and Subscriptions

```typescript
import { addMonths, subMonths, diffMonths } from 'chronia';

// Next billing date (monthly subscription)
const nextBilling = addMonths(lastBillingDate, 1);

// Calculate months subscribed
const monthsSubscribed = diffMonths(new Date(), subscriptionStartDate);

// Find billing date 3 months ago
const pastBilling = subMonths(new Date(), 3);
```

### Date Range Generation

```typescript
import { addDays, subDays } from 'chronia';

// Generate a 7-day range for a weekly report
function generateWeekRange(endDate: Date): Date[] {
  const range: Date[] = [];
  for (let i = 6; i >= 0; i--) {
    range.push(subDays(endDate, i));
  }
  return range;
}

const weekRange = generateWeekRange(new Date());
// Returns: [7 days ago, 6 days ago, ..., today]
```

### Time Tracking and Duration

```typescript
import { diffHours, diffMinutes } from 'chronia';

// Calculate work hours
const workStart = new Date(2025, 0, 15, 9, 0);
const workEnd = new Date(2025, 0, 15, 17, 30);
const hoursWorked = diffHours(workEnd, workStart);  // Returns: 8

// Calculate meeting duration in minutes
const meetingStart = new Date(2025, 0, 15, 14, 0);
const meetingEnd = new Date(2025, 0, 15, 15, 30);
const duration = diffMinutes(meetingEnd, meetingStart);  // Returns: 90
```

### Historical Data Analysis

```typescript
import { subMonths, subYears, diffDays } from 'chronia';

// Get data from the last 6 months
const sixMonthsAgo = subMonths(new Date(), 6);

// Year-over-year comparison
const lastYear = subYears(new Date(), 1);

// Calculate days since event
const daysSinceEvent = diffDays(new Date(), eventDate);
```

### Age Calculation

```typescript
import { diffYears } from 'chronia';

// Calculate age in years
function calculateAge(birthdate: Date): number {
  return diffYears(new Date(), birthdate);
}

const birthdate = new Date(1990, 5, 15);
const age = calculateAge(birthdate);  // Returns: 34 (as of 2025)
```

### Performance Measurement

```typescript
import { diffMilliseconds } from 'chronia';

// Measure execution time
const startTime = new Date();

// ... perform operation ...

const endTime = new Date();
const executionTime = diffMilliseconds(endTime, startTime);
console.log(`Operation took ${executionTime}ms`);
```

### Relative Time Display

```typescript
import { diffMinutes, diffHours, diffDays } from 'chronia';

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const minutes = diffMinutes(now, date);
  const hours = diffHours(now, date);
  const days = diffDays(now, date);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

const posted = new Date(2025, 0, 15, 10, 30);
console.log(formatRelativeTime(posted));  // "3 hours ago"
```

## Common Patterns

### Safe Arithmetic with Validation

```typescript
import { addDays, isValid } from 'chronia';

function safeAddDays(date: Date | number, days: number): Date | null {
  const result = addDays(date, days);
  return isValid(result) ? result : null;
}

const validResult = safeAddDays(new Date(), 7);  // Returns: Date 7 days from now
const invalidResult = safeAddDays(new Date('invalid'), 7);  // Returns: null
```

### Date Range Validation

```typescript
import { diffDays, addDays } from 'chronia';

// Check if date is within a range
function isWithinDays(date: Date, referenceDate: Date, maxDays: number): boolean {
  const diff = Math.abs(diffDays(date, referenceDate));
  return diff <= maxDays;
}

const today = new Date(2025, 0, 15);
const eventDate = new Date(2025, 0, 20);
isWithinDays(eventDate, today, 7);  // Returns: true (5 days difference)
```

### Chaining Operations

```typescript
import { addMonths, addDays } from 'chronia';

// Calculate date 3 months and 15 days from now
const baseDate = new Date(2025, 0, 1);
const targetDate = addDays(addMonths(baseDate, 3), 15);
// Returns: April 16, 2025 (Jan 1 + 3 months + 15 days)
```

### Iterating Over Date Ranges

```typescript
import { addDays, diffDays } from 'chronia';

// Iterate through each day in a range
function forEachDay(startDate: Date, endDate: Date, callback: (date: Date) => void): void {
  const totalDays = diffDays(endDate, startDate);
  for (let i = 0; i <= totalDays; i++) {
    callback(addDays(startDate, i));
  }
}

const start = new Date(2025, 0, 1);
const end = new Date(2025, 0, 7);
forEachDay(start, end, (date) => {
  console.log(date.toISOString());
});
// Logs each day from January 1-7, 2025
```

### Duration Formatting

```typescript
import { diffDays, diffHours, diffMinutes } from 'chronia';

function formatDuration(startDate: Date, endDate: Date): string {
  const days = diffDays(endDate, startDate);
  const hours = diffHours(endDate, startDate) % 24;
  const minutes = diffMinutes(endDate, startDate) % 60;

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);

  return parts.join(' ') || '0m';
}

const start = new Date(2025, 0, 1, 10, 0);
const end = new Date(2025, 0, 3, 14, 30);
console.log(formatDuration(start, end));  // "2d 4h 30m"
```

## Performance Considerations

- **Millisecond operations** (`addMilliseconds`, `diffMilliseconds`) are the fastest as they involve simple addition/subtraction
- **Hour/minute/second operations** have minimal overhead with direct time component manipulation
- **Day operations** are highly efficient with native Date methods
- **Month/year operations** involve additional logic for overflow handling but remain performant
- **Difference functions** perform truncation to the start of the unit before calculation for accuracy
- All functions validate inputs early for fast-fail behavior
- Input validation overhead is minimal compared to the arithmetic operation itself

## Type Definitions

```typescript
// All add/sub functions follow this signature pattern:
function add<Unit>(date: Date | number, amount: number): Date
function sub<Unit>(date: Date | number, amount: number): Date

// All diff functions follow this signature pattern:
function diff<Unit>(dateLeft: Date | number, dateRight: Date | number): number
```

## Error Handling

All arithmetic functions follow a consistent error handling pattern:

### Addition and Subtraction Functions

- **No exceptions thrown**: Invalid inputs return Invalid Date instead of throwing errors
- **Invalid Date input**: Returns Invalid Date
- **NaN amount**: Returns Invalid Date
- **Infinity / -Infinity**: Returns Invalid Date
- **Fractional amounts**: Truncated toward zero using `Math.trunc()`
- **Original date preserved**: Always returns a new Date object

### Difference Functions

- **No exceptions thrown**: Invalid inputs return `NaN` instead of throwing errors
- **Invalid Date input**: Returns `NaN`
- **NaN input**: Returns `NaN`
- **Infinity / -Infinity input**: Returns `NaN`
- **Result sign**:
  - Positive: `dateLeft` is after `dateRight`
  - Negative: `dateLeft` is before `dateRight`
  - Zero: Both dates are in the same unit period

## See Also

- [Date Validation](../validations/) - Validation and comparison functions (isValid, isBefore, isAfter, isSame*)
- [Date Boundaries](../boundaries/) - Start and end of time periods (startOfDay, endOfMonth, etc.)
- [Date Formatting](../formatting/) - Format dates for display
- [Chronia Types](../../types.md) - Type definitions used across the library
