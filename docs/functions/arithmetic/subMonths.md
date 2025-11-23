# subMonths

## Overview

The `subMonths` function subtracts a specified number of months from the given date. It provides a reliable way to perform month-based date arithmetic with proper handling of month-end overflow, leap years, and fractional amounts.

## Signature

```typescript
function subMonths(date: Date | number, amount: number): Date
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `date` | `Date \| number` | The base date as a Date object or numeric timestamp |
| `amount` | `number` | The number of months to subtract (can be negative to add months) |

## Return Value

| Type | Description |
|------|-------------|
| `Date` | A new Date object with the specified number of months subtracted, or Invalid Date if any input is invalid |

## Description

The `subMonths` function performs month-based date arithmetic by subtracting a specified number of months from the provided date. It internally uses the `addMonths` function with a negated amount, ensuring consistent behavior across the library. The function handles edge cases such as month-end overflow (e.g., March 31 → February 28/29) and preserves all time components.

### Specification

#### Returns a valid Date when:
- Both `date` and `amount` are valid
- `date` is a valid Date object or finite numeric timestamp
- `amount` is a finite number (including zero, positive, and negative values)
- Fractional `amount` values are truncated toward zero (e.g., `1.9` → `1`, `-1.9` → `-1`)

#### Returns Invalid Date when:
- `date` is an Invalid Date object (e.g., `new Date('invalid')`)
- `date` is `NaN`, `Infinity`, or `-Infinity`
- `amount` is `NaN`, `Infinity`, or `-Infinity`

#### Month-end overflow behavior:
- When the original day of the month doesn't exist in the target month, the result becomes the last day of that month
- Example: March 31 minus 1 month → February 28 (or 29 in leap years)
- This prevents invalid dates like "February 31"

### Behavior Notes

- **Validation**: Both `date` and `amount` are validated before processing; invalid inputs return Invalid Date without throwing exceptions
- **Immutability**: Always returns a new Date instance; the original date is never mutated
- **Fractional handling**: Uses `Math.trunc()` to truncate fractional amounts toward zero
- **Time preservation**: All time components (hours, minutes, seconds, milliseconds) are preserved from the original date
- **Negative amounts**: Passing a negative `amount` effectively adds months (e.g., `subMonths(date, -3)` adds 3 months)
- **Type safety**: TypeScript-enforced to accept only `Date | number` for date and `number` for amount
- **Implementation**: Internally delegates to `addMonths(date, -amount)` for consistent behavior

## Use Cases

- **Relative Date Calculation**: Calculate past dates relative to a given date, such as "3 months ago" for date range filters or historical data queries.
- **Billing Cycles**: Determine previous billing dates or subscription periods by subtracting months from the current date, useful in financial applications.
- **Timeline Navigation**: Navigate backward through time-based data by month intervals, such as viewing previous months in a calendar or dashboard.
- **Date Range Generation**: Create historical date ranges for reports or analytics by subtracting months to establish start dates.
- **Lease and Contract Dates**: Calculate dates like "6 months before expiration" or "3 months prior to renewal" for contract management systems.

## Usage Examples

### Relative Date Calculation

```typescript
import { subMonths } from 'chronia';

// Calculate "3 months ago"
const today = new Date(2025, 3, 15);  // April 15, 2025
const threeMonthsAgo = subMonths(today, 3);
// Returns: Date representing January 15, 2025

// Calculate using timestamp
const timestamp = Date.now();
const oneMonthAgo = subMonths(timestamp, 1);
// Returns: Date representing one month before current time
```

### Billing Cycles

```typescript
import { subMonths } from 'chronia';

function getPreviousBillingDate(currentBillingDate: Date): Date {
  return subMonths(currentBillingDate, 1);
}

// Monthly billing cycle
const currentBilling = new Date(2025, 2, 31);  // March 31, 2025
const previousBilling = getPreviousBillingDate(currentBilling);
// Returns: February 28, 2025 (Feb doesn't have 31 days)

// Quarterly billing
const quarterlyBilling = new Date(2025, 3, 1);  // April 1, 2025
const lastQuarter = subMonths(quarterlyBilling, 3);
// Returns: January 1, 2025
```

### Timeline Navigation

```typescript
import { subMonths } from 'chronia';

// Navigate calendar backward
function navigateMonthsBackward(currentMonth: Date, steps: number): Date {
  return subMonths(currentMonth, steps);
}

const currentMonth = new Date(2025, 11, 1);  // December 2025
const sixMonthsBack = navigateMonthsBackward(currentMonth, 6);
// Returns: June 1, 2025

// Time-preserving navigation
const exactTime = new Date(2025, 5, 15, 14, 30, 45, 123);
const twoMonthsBack = subMonths(exactTime, 2);
// Returns: April 15, 2025, 14:30:45.123 (time preserved)
```

### Handling Edge Cases

```typescript
import { subMonths } from 'chronia';

// Fractional months are truncated
const date1 = new Date(2025, 5, 15);
const result1 = subMonths(date1, 2.9);
// Returns: April 15, 2025 (2.9 truncated to 2)

// Negative amount adds months
const date2 = new Date(2025, 0, 15);
const result2 = subMonths(date2, -3);
// Returns: April 15, 2025 (adding 3 months)

// Month-end overflow handling
const marchEnd = new Date(2025, 2, 31);  // March 31, 2025
const febResult = subMonths(marchEnd, 1);
// Returns: February 28, 2025

// Leap year handling
const marchEnd2024 = new Date(2024, 2, 31);  // March 31, 2024
const febResult2024 = subMonths(marchEnd2024, 1);
// Returns: February 29, 2024 (2024 is a leap year)

// Invalid inputs
const invalidDate = subMonths(new Date('invalid'), 3);
// Returns: Invalid Date

const invalidAmount = subMonths(new Date(2025, 0, 15), NaN);
// Returns: Invalid Date
```

### Date Range Generation

```typescript
import { subMonths } from 'chronia';

// Generate last N months for a report
function generateMonthlyRange(endDate: Date, monthCount: number): Date[] {
  const months: Date[] = [];
  for (let i = 0; i < monthCount; i++) {
    months.push(subMonths(endDate, i));
  }
  return months.reverse();
}

const today = new Date(2025, 3, 1);  // April 1, 2025
const lastSixMonths = generateMonthlyRange(today, 6);
// Returns: [Nov 2024, Dec 2024, Jan 2025, Feb 2025, Mar 2025, Apr 2025]

// Create a date range filter
const endDate = new Date(2025, 11, 31);  // December 31, 2025
const startDate = subMonths(endDate, 12);  // 12 months earlier
// startDate: December 31, 2024
```
