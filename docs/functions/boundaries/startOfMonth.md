# startOfMonth

## Overview

The `startOfMonth` function returns a new Date object set to the first day of the month at 00:00:00.000 for the given date, preserving the year and month while resetting the day and time components.

## Signature

```typescript
function startOfMonth(date: Date | number): Date;
```

## Parameters

| Parameter | Type             | Description                                         |
| --------- | ---------------- | --------------------------------------------------- |
| `date`    | `Date \| number` | The base date as a Date object or numeric timestamp |

## Return Value

| Type   | Description                                                                                                  |
| ------ | ------------------------------------------------------------------------------------------------------------ |
| `Date` | A new Date object set to the first day of the month at 00:00:00.000, or Invalid Date if the input is invalid |

## Description

The `startOfMonth` function calculates the start of the month for a given date by creating a new Date object with the day set to 1 and all time components (hours, minutes, seconds, milliseconds) reset to zero. This function is part of Chronia's date manipulation utilities and follows the library's consistent validation and immutability patterns.

### Specification

#### Returns a valid Date set to the first day of the month when:

- The argument is a valid `Date` object representing any day within a month
- The argument is a finite numeric timestamp representing any valid date
- The input date can be at any time of day (all time components are reset)
- The input date can be any day of the month (1st through last day)
- Works correctly with all months, including February in leap years

#### Returns Invalid Date when:

- The argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The argument is `NaN`
- The argument is `Infinity`
- The argument is `-Infinity`

### Behavior Notes

- The function does not mutate the input; it always returns a new Date instance
- Uses Chronia's internal `isValidDateOrNumber` validator for consistent error handling
- Invalid inputs result in Invalid Date rather than throwing exceptions
- The returned Date has the same year and month as the input, with day set to 1
- All time components (hours, minutes, seconds, milliseconds) are explicitly set to 0
- Type-safe with TypeScript, accepting only `Date | number`
- Works correctly across month boundaries and different year lengths

## Use Cases

- **Month Boundary Calculations**: Calculate the beginning of a month for date range queries or comparisons. Useful for determining if a date falls within a specific month or for generating month-based reports.
- **Date Range Generation**: Create the starting point for month-based date ranges in calendars, scheduling systems, or analytics dashboards where month-level granularity is required.
- **Data Aggregation**: Group or filter data by month by normalizing dates to the start of their respective months. Essential for monthly summaries, billing cycles, or time-series analysis.
- **Calendar Navigation**: Implement month navigation features in calendar interfaces by determining the first day to display for any given month reference date.
- **Billing and Subscription Systems**: Calculate billing cycle start dates when subscriptions or services are billed on a monthly basis, regardless of the signup date within the month.

## Usage Examples

### Month Boundary Calculations

```typescript
import { startOfMonth } from "chronia";

// Get start of month from mid-month date
const midMonth = new Date(2024, 5, 15, 14, 30, 45, 123);
const monthStart = startOfMonth(midMonth);
// Returns: Date(2024, 5, 1, 0, 0, 0, 0) - June 1, 2024 00:00:00.000

// Get start of month from last day
const lastDay = new Date(2024, 5, 30, 23, 59, 59, 999);
const monthStart2 = startOfMonth(lastDay);
// Returns: Date(2024, 5, 1, 0, 0, 0, 0) - June 1, 2024 00:00:00.000

// Works with timestamps
const timestamp = 1717516800000; // June 4, 2024 20:00:00 UTC
const monthStart3 = startOfMonth(timestamp);
// Returns: June 1, 2024 00:00:00.000 (in local timezone)
```

### Date Range Generation

```typescript
import { startOfMonth } from "chronia";

// Generate month range for queries
function getMonthRange(referenceDate: Date): { start: Date; end: Date } {
  const start = startOfMonth(referenceDate);
  const end = new Date(start);
  end.setMonth(end.getMonth() + 1);
  end.setMilliseconds(-1); // Last millisecond of the month

  return { start, end };
}

const range = getMonthRange(new Date(2024, 5, 15));
// Returns: {
//   start: June 1, 2024 00:00:00.000,
//   end: June 30, 2024 23:59:59.999
// }
```

### Data Aggregation

```typescript
import { startOfMonth } from "chronia";

// Group transactions by month
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

const transactions = [
  { date: new Date(2024, 5, 5), amount: 100 },
  { date: new Date(2024, 5, 15), amount: 200 },
  { date: new Date(2024, 6, 3), amount: 150 },
];

const totals = groupByMonth(transactions);
// Returns: Map {
//   '2024-06-01T00:00:00.000Z' => 300,
//   '2024-07-01T00:00:00.000Z' => 150
// }
```

### Calendar Navigation

```typescript
import { startOfMonth } from "chronia";

// Navigate to previous/next month
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

### Billing and Subscription Systems

```typescript
import { startOfMonth } from "chronia";

// Calculate next billing date
function getNextBillingDate(subscriptionStart: Date): Date {
  const now = new Date();
  const currentMonthStart = startOfMonth(now);
  const subscriptionMonthStart = startOfMonth(subscriptionStart);

  // If current month's billing date hasn't passed yet
  if (now < currentMonthStart) {
    return currentMonthStart;
  }

  // Otherwise, next month's billing date
  const nextMonth = new Date(currentMonthStart);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  return nextMonth;
}

const subscriptionDate = new Date(2024, 4, 15); // Subscribed May 15, 2024
const nextBilling = getNextBillingDate(subscriptionDate);
// Returns: First day of next month at 00:00:00.000
```
