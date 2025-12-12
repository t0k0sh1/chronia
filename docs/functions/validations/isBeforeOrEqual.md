# isBeforeOrEqual

## Overview

The `isBeforeOrEqual` function checks if the first date is before or equal to the second date. It provides flexible date comparison with optional unit-based granularity, allowing you to compare dates at different time scales (year, month, day, hour, minute, second, or millisecond). Unlike `isBefore`, this function returns `true` when the dates are equal.

## Signature

```typescript
function isBeforeOrEqual(
  a: DateInput,
  b: DateInput,
  options?: ComparisonOptions,
): boolean;
```

## Parameters

| Parameter      | Type                | Description                                                                                                                             |
| -------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `a`            | `DateInput`         | The first date as a Date object, numeric timestamp, or ISO 8601 string                                                                  |
| `b`            | `DateInput`         | The second date as a Date object, numeric timestamp, or ISO 8601 string                                                                 |
| `options`      | `ComparisonOptions` | Optional configuration object                                                                                                           |
| `options.unit` | `TimeUnit`          | The unit of comparison: `"year"`, `"month"`, `"day"`, `"hour"`, `"minute"`, `"second"`, or `"millisecond"`. Defaults to `"millisecond"` |

## Return Value

| Type      | Description                                                                                               |
| --------- | --------------------------------------------------------------------------------------------------------- |
| `boolean` | Returns `true` if date `a` is before or equal to date `b`, `false` otherwise or if either date is invalid |

## Description

The `isBeforeOrEqual` function determines whether the first date occurs chronologically before or at the same time as the second date. It supports both precise millisecond-level comparison and coarser-grained comparisons by truncating dates to a specified unit before comparing. This function is the inclusive variant of `isBefore`, making it ideal for range validation and deadline checks.

### Specification

#### Returns `true` when:

- Date `a` is chronologically before date `b` at the specified granularity
- Date `a` is exactly equal to date `b` (inclusive comparison)
- Both dates are valid (not Invalid Date, not `NaN`, not `Infinity`, not `-Infinity`)
- When using unit-based comparison, the truncated value of `a` is less than or equal to the truncated value of `b`
- Works with both Date objects and numeric timestamps

#### Returns `false` when:

- Date `a` is after date `b`
- Either date `a` or date `b` is invalid (Invalid Date, `NaN`, `Infinity`, `-Infinity`)
- When using unit-based comparison, the truncated value of `a` is greater than the truncated value of `b`

### Behavior Notes

- **Inclusive comparison**: Equality returns `true` - this is the key difference from `isBefore` which returns `false` for equal dates
- **Input validation**: Invalid dates return `false` immediately without throwing exceptions
- **Type flexibility**: Accepts both Date objects and numeric timestamps for both parameters
- **Unit truncation**: When a `unit` is specified, dates are truncated to that unit before comparison
  - Example: Comparing by `"day"` ignores hours, minutes, seconds, and milliseconds
  - Example: Comparing by `"year"` ignores months, days, and all time components
- **Performance**: Optimized for the common case of millisecond-precision comparison
- **Consistency**: Uses the same validation logic as other Chronia comparison functions
- **Comparison logic**: Uses `<=` operator internally, making it suitable for range validation where boundaries are inclusive

## Use Cases

- **Deadline Validation**: Verify that a submission date is on or before a deadline when validating time-sensitive operations. Essential for forms, contest entries, payment processing, and time-limited offers where the deadline itself is valid.
- **Range Validation**: Validate that a date falls within an inclusive date range (start <= date <= end). Particularly useful for booking systems, reservation calendars, and availability checks where boundary dates are included.
- **Permission Checks**: Determine if a user can perform an action by checking if the current time is at or before an expiration date. Used for license validation, trial period checks, and access control where the expiration date itself is still valid.
- **Sorting and Ordering**: Implement stable sorting for dates where equal dates maintain their original order. Useful for maintaining chronological order while preserving insertion order for simultaneous events.
- **Sequential Validation**: Ensure events occur in the correct chronological sequence, allowing for simultaneous events. Important for workflow validation, multi-step processes, and event timelines where concurrent actions are permitted.
- **Period Grouping**: Group dates into time periods by checking if they fall on or before period boundaries. Simplifies logic for creating time-based reports, analytics dashboards, and historical data categorization.

## Usage Examples

### Deadline Validation

```typescript
import { isBeforeOrEqual } from "chronia";

// Check if submission is on or before deadline
function isSubmissionValid(submissionDate: Date, deadline: Date): boolean {
  return isBeforeOrEqual(submissionDate, deadline);
}

// Example usage
const deadline = new Date(2025, 0, 31, 23, 59, 59); // January 31, 2025, 23:59:59
const submission1 = new Date(2025, 0, 31, 23, 59, 59); // Exactly at deadline
const submission2 = new Date(2025, 0, 30); // Before deadline
const submission3 = new Date(2025, 1, 1); // After deadline

isSubmissionValid(submission1, deadline); // Returns: true (equality is valid)
isSubmissionValid(submission2, deadline); // Returns: true (before deadline)
isSubmissionValid(submission3, deadline); // Returns: false (late submission)

// Compare with timestamps
const now = Date.now();
const deadlineTimestamp = now + 3600000; // 1 hour from now

isBeforeOrEqual(now, deadlineTimestamp); // Returns: true
```

### Range Validation

```typescript
import { isBeforeOrEqual } from "chronia";

// Check if date is within inclusive range
function isDateInRange(date: Date, start: Date, end: Date): boolean {
  return isBeforeOrEqual(start, date) && isBeforeOrEqual(date, end);
}

// Validate booking dates
function isBookingValid(
  checkIn: Date,
  checkOut: Date,
  availableFrom: Date,
  availableTo: Date,
): boolean {
  return (
    isBeforeOrEqual(availableFrom, checkIn) &&
    isBeforeOrEqual(checkOut, availableTo)
  );
}

// Example usage
const rangeStart = new Date(2025, 0, 1); // January 1, 2025
const rangeEnd = new Date(2025, 0, 31); // January 31, 2025
const testDate1 = new Date(2025, 0, 1); // Boundary: start date
const testDate2 = new Date(2025, 0, 15); // Middle of range
const testDate3 = new Date(2025, 0, 31); // Boundary: end date

isDateInRange(testDate1, rangeStart, rangeEnd); // Returns: true (start boundary included)
isDateInRange(testDate2, rangeStart, rangeEnd); // Returns: true (within range)
isDateInRange(testDate3, rangeStart, rangeEnd); // Returns: true (end boundary included)
```

### Permission Checks

```typescript
import { isBeforeOrEqual } from "chronia";

// Check if license is still valid
function isLicenseValid(expirationDate: Date): boolean {
  // License is valid until the end of expiration date
  return isBeforeOrEqual(Date.now(), expirationDate);
}

// Check if trial period is active
function isTrialActive(trialEndDate: Date): boolean {
  const now = new Date();
  return isBeforeOrEqual(now, trialEndDate);
}

// Validate access with grace period
function hasAccess(userLastActive: Date, gracePeriodEnd: Date): boolean {
  // User has access if they were active on or before grace period end
  return isBeforeOrEqual(userLastActive, gracePeriodEnd);
}

// Example usage
const licenseExpiry = new Date(2025, 11, 31); // December 31, 2025
isLicenseValid(licenseExpiry); // Returns: true if today is on or before Dec 31, 2025

const trialEnd = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 14 days from now
isTrialActive(trialEnd); // Returns: true (trial still active)

// Exact expiration date is still valid
const exactExpiry = new Date(2025, 0, 15);
const checkDate = new Date(2025, 0, 15);
isBeforeOrEqual(checkDate, exactExpiry); // Returns: true (same date is valid)
```

### Sorting and Ordering

```typescript
import { isBeforeOrEqual } from "chronia";

interface Task {
  id: string;
  dueDate: Date;
  priority: number;
}

// Sort tasks by due date (stable sort maintaining order for equal dates)
function sortTasksByDueDate(tasks: Task[]): Task[] {
  return tasks.sort((a, b) => {
    if (
      isBeforeOrEqual(a.dueDate, b.dueDate) &&
      !isBeforeOrEqual(b.dueDate, a.dueDate)
    ) {
      return -1; // a is strictly before b
    }
    if (
      isBeforeOrEqual(b.dueDate, a.dueDate) &&
      !isBeforeOrEqual(a.dueDate, b.dueDate)
    ) {
      return 1; // b is strictly before a
    }
    return 0; // Equal dates - maintain original order
  });
}

// Find tasks due on or before a date
function getTasksDueByDate(tasks: Task[], deadline: Date): Task[] {
  return tasks.filter((task) => isBeforeOrEqual(task.dueDate, deadline));
}

// Example usage
const tasks: Task[] = [
  { id: "1", dueDate: new Date(2025, 0, 20), priority: 1 },
  { id: "2", dueDate: new Date(2025, 0, 15), priority: 2 },
  { id: "3", dueDate: new Date(2025, 0, 15), priority: 1 }, // Same date as task 2
];

const sorted = sortTasksByDueDate(tasks);
// Returns: [task 2, task 3, task 1] - tasks with same date maintain order

const today = new Date(2025, 0, 18);
const dueTasks = getTasksDueByDate(tasks, today);
// Returns: [task 2, task 3] - both due on Jan 15 (on or before Jan 18)
```

### Sequential Validation

```typescript
import { isBeforeOrEqual } from "chronia";

interface Event {
  name: string;
  startTime: Date;
  endTime: Date;
}

// Validate that events occur in sequence (allowing simultaneous events)
function areEventsInSequence(events: Event[]): boolean {
  for (let i = 1; i < events.length; i++) {
    const prevEnd = events[i - 1].endTime;
    const currentStart = events[i].startTime;

    // Current event must start on or after previous event ends
    if (!isBeforeOrEqual(prevEnd, currentStart)) {
      return false;
    }
  }
  return true;
}

// Check if event is valid (start is before or at the same time as end)
function isEventValid(event: Event): boolean {
  return isBeforeOrEqual(event.startTime, event.endTime);
}

// Example usage
const events: Event[] = [
  {
    name: "Morning Session",
    startTime: new Date(2025, 0, 15, 9, 0),
    endTime: new Date(2025, 0, 15, 12, 0),
  },
  {
    name: "Lunch Break",
    startTime: new Date(2025, 0, 15, 12, 0), // Starts exactly when morning ends
    endTime: new Date(2025, 0, 15, 13, 0),
  },
  {
    name: "Afternoon Session",
    startTime: new Date(2025, 0, 15, 13, 0),
    endTime: new Date(2025, 0, 15, 17, 0),
  },
];

areEventsInSequence(events); // Returns: true (sequential with no gaps)

// Instantaneous event (start equals end)
const instantEvent: Event = {
  name: "Notification",
  startTime: new Date(2025, 0, 15, 10, 0),
  endTime: new Date(2025, 0, 15, 10, 0), // Same time
};

isEventValid(instantEvent); // Returns: true (equality is valid)
```

### Period Grouping

```typescript
import { isBeforeOrEqual } from "chronia";

// Group dates by quarter boundaries
function getQuarterEndDate(year: number, quarter: 1 | 2 | 3 | 4): Date {
  const month = quarter * 3 - 1; // 2, 5, 8, 11 (Mar, Jun, Sep, Dec)
  return new Date(year, month + 1, 0); // Last day of the quarter
}

function isInQuarter(
  date: Date,
  year: number,
  quarter: 1 | 2 | 3 | 4,
): boolean {
  const quarterStart = new Date(year, (quarter - 1) * 3, 1);
  const quarterEnd = getQuarterEndDate(year, quarter);

  return (
    isBeforeOrEqual(quarterStart, date) && isBeforeOrEqual(date, quarterEnd)
  );
}

// Group sales by month using day-level comparison
function groupSalesByMonth(sales: Array<{ date: Date; amount: number }>) {
  const grouped = new Map<string, number>();

  sales.forEach((sale) => {
    const monthEnd = new Date(
      sale.date.getFullYear(),
      sale.date.getMonth() + 1,
      0,
    );
    const monthKey = `${sale.date.getFullYear()}-${sale.date.getMonth() + 1}`;

    if (isBeforeOrEqual(sale.date, monthEnd, { unit: "day" })) {
      grouped.set(monthKey, (grouped.get(monthKey) || 0) + sale.amount);
    }
  });

  return grouped;
}

// Example usage
const testDate = new Date(2025, 2, 31); // March 31, 2025
isInQuarter(testDate, 2025, 1); // Returns: true (Q1 includes Jan-Mar)

const sales = [
  { date: new Date(2025, 0, 15), amount: 100 },
  { date: new Date(2025, 0, 31), amount: 150 }, // Last day of January
  { date: new Date(2025, 1, 1), amount: 200 },
];

const monthlySales = groupSalesByMonth(sales);
// Returns: Map { '2025-1' => 250, '2025-2' => 200 }
```

### Unit-Based Comparison

```typescript
import { isBeforeOrEqual } from "chronia";

// Compare dates at year granularity
const dec31 = new Date(2024, 11, 31, 23, 59, 59); // December 31, 2024, 23:59:59
const jan1 = new Date(2025, 0, 1, 0, 0, 0); // January 1, 2025, 00:00:00

isBeforeOrEqual(dec31, jan1, { unit: "year" }); // Returns: true (2024 <= 2025)

// Same year comparison
const sameYear1 = new Date(2025, 0, 1);
const sameYear2 = new Date(2025, 11, 31);

isBeforeOrEqual(sameYear1, sameYear2, { unit: "year" }); // Returns: true (2025 <= 2025)

// Compare dates at day granularity (ignores time)
const morning = new Date(2025, 0, 15, 9, 0, 0); // January 15, 2025, 09:00
const evening = new Date(2025, 0, 15, 18, 0, 0); // January 15, 2025, 18:00

isBeforeOrEqual(morning, evening, { unit: "day" }); // Returns: true (same day)
isBeforeOrEqual(morning, evening); // Returns: true (different times)

// Compare dates at hour granularity
const time1 = new Date(2025, 0, 15, 9, 30, 0); // 09:30:00
const time2 = new Date(2025, 0, 15, 9, 45, 0); // 09:45:00

isBeforeOrEqual(time1, time2, { unit: "hour" }); // Returns: true (same hour)
isBeforeOrEqual(time1, time2); // Returns: true (different minutes)

// Boundary case: exactly equal dates
const exact1 = new Date(2025, 0, 15, 12, 0, 0);
const exact2 = new Date(2025, 0, 15, 12, 0, 0);

isBeforeOrEqual(exact1, exact2); // Returns: true (equal)
isBeforeOrEqual(exact1, exact2, { unit: "month" }); // Returns: true (same month)
```
