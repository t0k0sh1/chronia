# truncMonth

## Overview

The `truncMonth` function truncates a given date to the start of the month, setting it to the 1st day at 00:00:00.000. It provides a consistent way to normalize dates to month boundaries within the Chronia library.

## Signature

```typescript
function truncMonth(date: Date | number): Date
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `date` | `Date \| number` | A Date object or numeric timestamp to truncate to the start of the month |

## Return Value

| Type | Description |
|------|-------------|
| `Date` | A new Date object set to the 1st day of the month at 00:00:00.000, or Invalid Date if the input is invalid |

## Description

The `truncMonth` function normalizes a date to the beginning of its month by setting the day to 1 and all time components (hours, minutes, seconds, milliseconds) to 0. This is useful when you need to perform month-based comparisons, grouping, or calculations without concern for the specific day or time within the month.

### Specification

#### Returns a Date set to the 1st day of the month at 00:00:00.000 when:
- The argument is a valid `Date` object
- The argument is a finite numeric timestamp
- The input date can be from any day of the month (1st to 28th/29th/30th/31st)
- The input date can have any time components
- Works correctly with leap years (February in leap years)

#### Returns Invalid Date when:
- The argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The argument is `NaN`
- The argument is `Infinity`
- The argument is `-Infinity`

### Behavior Notes

- Always returns a new Date instance; the original input is never mutated
- Validates arguments before processing using Chronia's internal validation utilities
- No exceptions are thrown; invalid values return Invalid Date
- Time zone is preserved from the input date (operates in local time)
- Correctly handles edge cases like dates already at the start of the month
- Type-safe with TypeScript, accepting only `Date | number`

## Use Cases

- **Month-based Comparisons**: Normalize dates to month boundaries before comparing whether two dates fall within the same month, eliminating differences caused by specific days or times.
- **Time Series Grouping**: Group events or data points by month in analytics or reporting systems. Truncating dates to month boundaries enables efficient aggregation and bucketing.
- **Billing Cycles**: Calculate the start of billing periods that align with calendar months. Particularly useful in subscription services or monthly invoicing systems.
- **Date Range Queries**: Generate the start date for month-based date range filters in database queries or API calls, ensuring consistency in month boundary definitions.
- **Calendar Views**: Render calendar interfaces where month boundaries need to be precisely defined, such as monthly planners or scheduling applications.

## Usage Examples

### Month-based Comparisons

```typescript
import { truncMonth } from 'chronia';

// Check if two dates are in the same month
function isSameMonth(date1: Date, date2: Date): boolean {
  const month1 = truncMonth(date1);
  const month2 = truncMonth(date2);
  return month1.getTime() === month2.getTime();
}

// Different days, same month
const june15 = new Date(2024, 5, 15, 14, 30, 45);
const june28 = new Date(2024, 5, 28, 9, 15, 30);
isSameMonth(june15, june28);  // Returns: true

// Different months
const june15_2024 = new Date(2024, 5, 15);
const july15_2024 = new Date(2024, 6, 15);
isSameMonth(june15_2024, july15_2024);  // Returns: false
```

### Time Series Grouping

```typescript
import { truncMonth } from 'chronia';

interface Event {
  date: Date;
  value: number;
}

// Group events by month
function groupByMonth(events: Event[]): Map<number, Event[]> {
  const grouped = new Map<number, Event[]>();

  events.forEach(event => {
    const monthStart = truncMonth(event.date);
    const key = monthStart.getTime();

    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)!.push(event);
  });

  return grouped;
}

// Example usage
const events: Event[] = [
  { date: new Date(2024, 5, 15), value: 100 },
  { date: new Date(2024, 5, 28), value: 200 },
  { date: new Date(2024, 6, 5), value: 150 },
];

const byMonth = groupByMonth(events);
// Returns: Map with 2 entries (June 2024 and July 2024)
```

### Billing Cycles

```typescript
import { truncMonth } from 'chronia';

// Calculate billing period start for a subscription
function getBillingPeriodStart(signupDate: Date): Date {
  // Billing starts at the beginning of the signup month
  return truncMonth(signupDate);
}

// User signed up on June 15, 2024 at 2:30 PM
const signupDate = new Date(2024, 5, 15, 14, 30, 0);
const billingStart = getBillingPeriodStart(signupDate);
// Returns: June 1, 2024 00:00:00.000

// Calculate next billing period
function getNextBillingPeriod(currentPeriod: Date): Date {
  const next = new Date(currentPeriod);
  next.setMonth(next.getMonth() + 1);
  return truncMonth(next);
}

const nextBilling = getNextBillingPeriod(billingStart);
// Returns: July 1, 2024 00:00:00.000
```

### Date Range Queries

```typescript
import { truncMonth } from 'chronia';

// Generate month range for database query
function getMonthDateRange(date: Date): { start: Date; end: Date } {
  const start = truncMonth(date);
  const end = new Date(start);
  end.setMonth(end.getMonth() + 1);
  end.setMilliseconds(-1);

  return { start, end };
}

// Get date range for June 2024
const someJuneDate = new Date(2024, 5, 15);
const range = getMonthDateRange(someJuneDate);
// Returns: {
//   start: June 1, 2024 00:00:00.000,
//   end: June 30, 2024 23:59:59.999
// }
```

### Edge Cases and Validation

```typescript
import { truncMonth } from 'chronia';

// Basic truncation
const midMonth = new Date(2024, 5, 15, 14, 30, 45, 123);
const truncated = truncMonth(midMonth);
// Returns: June 1, 2024 00:00:00.000

// Already at start of month (idempotent)
const alreadyTruncated = new Date(2024, 5, 1, 0, 0, 0, 0);
truncMonth(alreadyTruncated);
// Returns: June 1, 2024 00:00:00.000 (no change)

// End of month
const endOfMonth = new Date(2024, 5, 30, 23, 59, 59, 999);
truncMonth(endOfMonth);
// Returns: June 1, 2024 00:00:00.000

// Works with timestamps
const timestamp = new Date(2024, 5, 15).getTime();
truncMonth(timestamp);
// Returns: June 1, 2024 00:00:00.000

// Leap year handling
const leapYearFeb = new Date(2024, 1, 29, 12, 30);
truncMonth(leapYearFeb);
// Returns: February 1, 2024 00:00:00.000

// Invalid inputs return Invalid Date
truncMonth(new Date('invalid'));  // Returns: Invalid Date
truncMonth(NaN);                  // Returns: Invalid Date
truncMonth(Infinity);             // Returns: Invalid Date
```
