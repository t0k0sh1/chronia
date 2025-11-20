# subDays

## Overview

The `subDays` function subtracts a specified number of days from a given date, returning a new Date object. It provides a convenient way to perform date arithmetic with automatic validation and consistent behavior across Chronia's API.

## Signature

```typescript
function subDays(date: Date | number, amount: number): Date
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `date` | `Date \| number` | The base date as a Date object or numeric timestamp from which days will be subtracted |
| `amount` | `number` | The number of days to subtract (can be negative to add days instead) |

## Return Value

| Type | Description |
|------|-------------|
| `Date` | A new Date object with the specified number of days subtracted, or Invalid Date if any input is invalid |

## Description

The `subDays` function performs date arithmetic by subtracting a specified number of days from a given date. It validates all inputs before processing and leverages the `addDays` function internally by negating the amount, ensuring consistent behavior across the library's date manipulation functions.

### Specification

#### Returns a new valid Date when:
- The `date` argument is a valid Date object
- The `date` argument is a finite numeric timestamp (positive, zero, or negative)
- The `amount` argument is a finite number (including integers and decimals)
- Fractional day amounts are truncated toward zero using `Math.trunc` (e.g., 1.9 → 1, -1.9 → -1)

#### Returns Invalid Date when:
- The `date` argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The `date` argument is `NaN`
- The `date` argument is `Infinity` or `-Infinity`
- The `amount` argument is `NaN`
- The `amount` argument is `Infinity` or `-Infinity`

### Behavior Notes

- **Immutability**: Always returns a new Date instance; the original date is never mutated
- **Validation**: Validates both `date` and `amount` parameters before processing
- **Fractional handling**: Uses `Math.trunc` to truncate fractional days toward zero (1.9 becomes 1, -1.9 becomes -1)
- **Negative amounts**: Passing a negative amount effectively adds days (e.g., `subDays(date, -3)` adds 3 days)
- **Implementation**: Internally uses `addDays(date, -amount)` for consistent behavior
- **Error handling**: Returns Invalid Date for invalid inputs rather than throwing exceptions
- **Type safety**: TypeScript ensures only `Date | number` types are accepted for the date parameter

## Use Cases

- **Past Date Calculation**: Calculate dates in the past relative to a reference date. Useful for determining deadlines, expiration dates, or historical dates based on a known starting point.
- **Date Range Operations**: Create date ranges by subtracting days from an end date. Commonly used in analytics, reporting, and filtering data within specific time windows.
- **Countdown Logic**: Implement countdown features or calculate remaining days by subtracting elapsed days. Helpful in subscription management, trial periods, or event scheduling.
- **Business Logic**: Handle business rules requiring date calculations, such as payment due dates, notice periods, or scheduling operations a specific number of days before an event.
- **Bidirectional Arithmetic**: Use negative amounts to add days when subtraction logic is more intuitive for the use case. Provides flexibility in date manipulation without switching between different functions.

## Usage Examples

### Past Date Calculation

```typescript
import { subDays } from 'chronia';

// Calculate a date 5 days ago
const today = new Date(2025, 0, 10);  // January 10, 2025
const fiveDaysAgo = subDays(today, 5);
// Returns: Date object representing January 5, 2025

// Works with timestamps
const timestamp = Date.now();
const oneWeekAgo = subDays(timestamp, 7);
// Returns: Date object representing 7 days ago from now

// Calculate historical date
const projectStart = new Date(2025, 5, 1);  // June 1, 2025
const twoWeeksEarlier = subDays(projectStart, 14);
// Returns: Date object representing May 18, 2025
```

### Date Range Operations

```typescript
import { subDays } from 'chronia';

// Create a 30-day date range ending today
const endDate = new Date(2025, 0, 31);  // January 31, 2025
const startDate = subDays(endDate, 30);
// Returns: Date object representing January 1, 2025

// Filter logs from the last 7 days
function getRecentLogs(logs: Array<{ date: Date; message: string }>) {
  const sevenDaysAgo = subDays(new Date(), 7);
  return logs.filter(log => log.date >= sevenDaysAgo);
}
```

### Countdown Logic

```typescript
import { subDays } from 'chronia';

// Calculate remaining trial days
function calculateTrialRemaining(startDate: Date, trialLength: number, elapsed: number): Date {
  const trialEnd = subDays(startDate, -trialLength);  // Negative to add
  return subDays(trialEnd, elapsed);
}

const subscriptionStart = new Date(2025, 0, 1);
const remainingDate = calculateTrialRemaining(subscriptionStart, 30, 10);
// Returns: Date representing 20 days into the trial
```

### Business Logic

```typescript
import { subDays } from 'chronia';

// Calculate payment due date (invoice date minus grace period)
function calculateDueDate(invoiceDate: Date, gracePeriod: number): Date {
  return subDays(invoiceDate, -gracePeriod);  // Negative to add grace period
}

const invoice = new Date(2025, 0, 15);  // January 15, 2025
const dueDate = calculateDueDate(invoice, 30);
// Returns: Date object representing February 14, 2025

// Notice period calculation
function getLastWorkingDay(resignationDate: Date, noticeDays: number): Date {
  return subDays(resignationDate, -noticeDays);
}

const resignation = new Date(2025, 0, 1);
const lastDay = getLastWorkingDay(resignation, 14);
// Returns: Date object representing January 15, 2025
```

### Bidirectional Arithmetic

```typescript
import { subDays } from 'chronia';

// Use negative amounts to add days
const baseDate = new Date(2025, 0, 10);  // January 10, 2025

// Subtract days
const past = subDays(baseDate, 5);
// Returns: January 5, 2025

// Add days using negative amount
const future = subDays(baseDate, -5);
// Returns: January 15, 2025

// Fractional amounts are truncated
const truncated = subDays(baseDate, 3.9);
// Returns: January 7, 2025 (3.9 truncated to 3)
```

### Error Handling

```typescript
import { subDays } from 'chronia';

// Invalid date input
const invalidResult = subDays(new Date('invalid'), 5);
// Returns: Invalid Date

// Invalid amount (NaN)
const nanResult = subDays(new Date(2025, 0, 1), NaN);
// Returns: Invalid Date

// Invalid amount (Infinity)
const infinityResult = subDays(new Date(2025, 0, 1), Infinity);
// Returns: Invalid Date

// Validate result before use
function safeDateSubtraction(date: Date, days: number): Date | null {
  const result = subDays(date, days);
  return isNaN(result.getTime()) ? null : result;
}

const safeResult = safeDateSubtraction(new Date(2025, 0, 10), 5);
// Returns: Date object representing January 5, 2025

const safeInvalid = safeDateSubtraction(new Date('invalid'), 5);
// Returns: null
```
