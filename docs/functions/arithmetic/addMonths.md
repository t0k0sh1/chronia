# addMonths

## Overview

The `addMonths` function adds a specified number of months to a given date. It handles month-end overflow intelligently, preserves time components, and returns a new Date instance without mutating the original input.

## Signature

```typescript
function addMonths(date: Date | number, amount: number): Date
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `date` | `Date \| number` | The base date as a Date object or numeric timestamp |
| `amount` | `number` | The number of months to add (can be negative to subtract, fractional values are truncated toward zero) |

## Return Value

| Type | Description |
|------|-------------|
| `Date` | A new Date object with the specified number of months added. Returns Invalid Date if any input is invalid |

## Description

The `addMonths` function performs month arithmetic on dates while handling edge cases intelligently. It validates inputs before processing and ensures that month-end dates are handled correctly when the target month has fewer days than the original date.

### Specification

#### Returns a valid Date when:
- The `date` argument is a valid `Date` object (not Invalid Date)
- The `date` argument is a finite numeric timestamp, including:
  - Positive timestamps (dates after Unix epoch)
  - Zero (`0`, representing January 1, 1970, 00:00:00 UTC)
  - Negative timestamps (dates before Unix epoch)
- The `amount` argument is a finite number (positive, negative, or zero)

#### Returns Invalid Date when:
- The `date` argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The `date` argument is `NaN`, `Infinity`, or `-Infinity`
- The `amount` argument is `NaN`, `Infinity`, or `-Infinity`

#### Month Arithmetic Behavior:
- **Fractional months**: Truncated toward zero using `Math.trunc`
  - `1.9` becomes `1`
  - `-1.9` becomes `-1`
- **Month-end overflow**: When the original day doesn't exist in the target month, the result becomes the last day of that month
  - January 31 + 1 month → February 28 (or 29 in leap years)
  - March 31 + 1 month → April 30
- **Time preservation**: Hours, minutes, seconds, and milliseconds are preserved from the original date
- **Year boundary**: Automatically handles year transitions
  - December 15, 2024 + 2 months → February 15, 2025

### Behavior Notes

- **Immutability**: Always returns a new Date instance; the original input is never mutated
- **Validation-first**: Validates all arguments before processing to ensure consistent error handling
- **Type safety**: TypeScript enforces `Date | number` for date and `number` for amount parameters
- **No exceptions**: Invalid inputs return Invalid Date rather than throwing errors, consistent with Chronia's API design
- **Performance**: Optimized for common use cases with minimal overhead
- **Leap year aware**: Correctly handles leap years when calculating month-end overflow

## Use Cases

- **Date Range Calculations**: Calculate future or past dates for subscription billing cycles, payment due dates, or contract renewal dates. Particularly useful when working with monthly intervals where month-end handling is critical.
- **Calendar Navigation**: Implement "next month" and "previous month" navigation in calendar interfaces, date pickers, and scheduling applications where users need to move forward or backward by months.
- **Data Aggregation**: Generate monthly date boundaries for aggregating time-series data, creating monthly reports, or partitioning data by month. Handle edge cases like different month lengths automatically.
- **Expiration Dates**: Calculate expiration dates for subscriptions, trials, or time-limited offers that expire after a specific number of months. Ensures correct behavior across month boundaries and leap years.
- **Historical Analysis**: Perform retrospective analysis by subtracting months to find corresponding dates in the past, useful for year-over-year comparisons or historical trend analysis.

## Usage Examples

### Date Range Calculations

```typescript
import { addMonths } from 'chronia';

// Calculate subscription renewal date
const subscriptionStart = new Date(2025, 0, 31); // Jan 31, 2025
const renewalDate = addMonths(subscriptionStart, 3);
// Returns: 2025-04-30 (April doesn't have 31 days)

// Calculate payment due date with time preservation
const invoiceDate = new Date(2025, 2, 15, 14, 30, 0); // Mar 15, 2025, 2:30 PM
const dueDate = addMonths(invoiceDate, 1);
// Returns: 2025-04-15 14:30:00 (time preserved)
```

### Calendar Navigation

```typescript
import { addMonths } from 'chronia';

// Next month navigation
function goToNextMonth(currentDate: Date): Date {
  return addMonths(currentDate, 1);
}

// Previous month navigation
function goToPreviousMonth(currentDate: Date): Date {
  return addMonths(currentDate, -1);
}

const today = new Date(2025, 5, 15); // Jun 15, 2025
goToNextMonth(today);      // Returns: 2025-07-15
goToPreviousMonth(today);  // Returns: 2025-05-15
```

### Data Aggregation

```typescript
import { addMonths } from 'chronia';

// Generate monthly boundaries for reporting
function generateMonthlyBoundaries(startDate: Date, monthCount: number): Date[] {
  const boundaries: Date[] = [startDate];

  for (let i = 1; i <= monthCount; i++) {
    boundaries.push(addMonths(startDate, i));
  }

  return boundaries;
}

const reportStart = new Date(2025, 0, 1); // Jan 1, 2025
const quarterlyBoundaries = generateMonthlyBoundaries(reportStart, 3);
// Returns: [2025-01-01, 2025-02-01, 2025-03-01, 2025-04-01]
```

### Fractional Amount Handling

```typescript
import { addMonths } from 'chronia';

// Fractional months are truncated toward zero
const baseDate = new Date(2025, 0, 15); // Jan 15, 2025

addMonths(baseDate, 1.9);   // Returns: 2025-02-15 (1.9 → 1)
addMonths(baseDate, 2.1);   // Returns: 2025-03-15 (2.1 → 2)
addMonths(baseDate, -1.9);  // Returns: 2024-12-15 (-1.9 → -1)

// Zero months returns the same date
addMonths(baseDate, 0);     // Returns: 2025-01-15
```

### Month-End Overflow Handling

```typescript
import { addMonths } from 'chronia';

// Month-end edge cases
const jan31 = new Date(2025, 0, 31);  // Jan 31, 2025

addMonths(jan31, 1);  // Returns: 2025-02-28 (Feb has 28 days in 2025)
addMonths(jan31, 2);  // Returns: 2025-03-31 (Mar has 31 days)
addMonths(jan31, 3);  // Returns: 2025-04-30 (Apr has 30 days)

// Leap year handling
const jan31_2024 = new Date(2024, 0, 31);  // Jan 31, 2024 (leap year)
addMonths(jan31_2024, 1);  // Returns: 2024-02-29 (2024 is a leap year)
```

### Error Handling

```typescript
import { addMonths } from 'chronia';

// Invalid date inputs return Invalid Date
addMonths(new Date('invalid'), 3);  // Returns: Invalid Date
addMonths(NaN, 3);                  // Returns: Invalid Date

// Invalid amount inputs return Invalid Date
addMonths(new Date(2025, 0, 15), NaN);       // Returns: Invalid Date
addMonths(new Date(2025, 0, 15), Infinity);  // Returns: Invalid Date

// Defensive programming with validation
function safeAddMonths(date: Date | number, amount: number): Date | null {
  const result = addMonths(date, amount);
  return isNaN(result.getTime()) ? null : result;
}
```
