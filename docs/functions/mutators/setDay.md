# setDay

## Overview

The `setDay` function sets the day of the month for a given date, returning a new Date object with the specified day while preserving all other date and time components. It provides input validation and handles edge cases like day overflow and fractional values.

## Signature

```typescript
function setDay(date: Date | number, day: number): Date
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `date` | `Date \| number` | The base date as a Date object or numeric timestamp |
| `day` | `number` | The day of the month to set (1-31, fractions are truncated toward zero) |

## Return Value

| Type | Description |
|------|-------------|
| `Date` | A new Date object with the specified day set, or Invalid Date if any input is invalid |

## Description

The `setDay` function creates a new Date instance with the day of the month set to the specified value. It validates all inputs before processing and handles fractional day values by truncating them toward zero using `Math.trunc`. The function preserves the year, month, and all time components (hours, minutes, seconds, milliseconds) from the original date.

### Specification

#### Returns a valid Date when:
- The `date` argument is a valid Date object or finite numeric timestamp
- The `day` argument is a finite number (not `NaN`, `Infinity`, or `-Infinity`)
- The resulting date is valid after setting the day

#### Returns Invalid Date when:
- The `date` argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The `date` argument is `NaN`, `Infinity`, or `-Infinity`
- The `day` argument is `NaN`, `Infinity`, or `-Infinity`

#### Day Value Behavior:
- **Valid days (1-31)**: Sets the day directly to the specified value
- **Fractional days**: Truncated toward zero (e.g., `15.9 → 15`, `-15.9 → -15`)
- **Day overflow**: Values beyond the month's maximum roll over to the next month (e.g., January 32 → February 1)
- **Day underflow**: Values of 0 or negative roll back to the previous month (e.g., day 0 → last day of previous month)

### Behavior Notes

- No mutations: Always returns a new Date instance; the original date is never modified
- Input validation: Uses Chronia's internal validators (`isValidDateOrNumber`, `isValidNumber`) for consistency across the library
- Error handling: Returns Invalid Date instead of throwing exceptions, allowing for graceful error handling
- Fractional truncation: Uses `Math.trunc` which truncates toward zero, distinct from `Math.floor` which always rounds down
- Time preservation: Hours, minutes, seconds, and milliseconds are preserved from the original date
- Rollover support: JavaScript's native Date rollover behavior is maintained, allowing dates like January 32 to automatically become February 1

## Use Cases

- **Date Manipulation**: Set specific days of the month while maintaining other date components. Useful when building date pickers, calendars, or scheduling interfaces where users need to change just the day component.
- **Batch Date Processing**: Process collections of dates to set them all to a specific day of the month. For example, setting all dates in an array to the 1st of their respective months for billing cycles or report generation.
- **Conditional Date Adjustment**: Dynamically adjust dates based on business logic. For instance, setting payment due dates to the 15th of each month, or adjusting delivery dates to specific days based on customer preferences.
- **Date Normalization**: Standardize dates to specific days for comparison or grouping. Particularly useful when you need to compare dates at the month level by normalizing all dates to the first day of their respective months.

## Usage Examples

### Date Manipulation

```typescript
import { setDay } from 'chronia';

// Set to first day of month
const firstDay = setDay(new Date(2025, 0, 15), 1);
// Returns: Date object representing 2025-01-01

// Set to last day of January
const lastDay = setDay(new Date(2025, 0, 15), 31);
// Returns: Date object representing 2025-01-31

// Using timestamp instead of Date object
const fromTimestamp = setDay(1705334400000, 10);
// Returns: Date object with day set to 10
```

### Batch Date Processing

```typescript
import { setDay } from 'chronia';

// Normalize all dates to first of the month
const dates = [
  new Date(2025, 0, 5),
  new Date(2025, 0, 15),
  new Date(2025, 0, 25),
];

const normalized = dates.map(date => setDay(date, 1));
// Returns: Array of dates all set to January 1, 2025
```

### Handling Day Overflow

```typescript
import { setDay } from 'chronia';

// Day overflow causes rollover to next month
const overflow = setDay(new Date(2025, 0, 15), 32);
// Returns: Date object representing 2025-02-01 (January 32 → February 1)

// Day underflow rolls back to previous month
const underflow = setDay(new Date(2025, 0, 15), 0);
// Returns: Date object representing 2024-12-31 (January 0 → December 31, 2024)

// Negative day values
const negative = setDay(new Date(2025, 0, 15), -1);
// Returns: Date object representing 2024-12-30
```

### Handling Fractional and Invalid Values

```typescript
import { setDay, isValid } from 'chronia';

// Fractional day is truncated toward zero
const fractional = setDay(new Date(2025, 0, 15), 15.9);
// Returns: Date object representing 2025-01-15 (not 2025-01-16)

// Negative fractional value
const negativeFractional = setDay(new Date(2025, 0, 15), -15.9);
// Returns: Date object with day set to -15 (rolls back to previous month)

// Invalid date input
const invalidDate = setDay(new Date('invalid'), 15);
// Returns: Invalid Date

// Invalid day input (NaN)
const invalidDay = setDay(new Date(2025, 0, 15), NaN);
// Returns: Invalid Date

// Check validity before using
const result = setDay(new Date(2025, 0, 15), 20);
if (isValid(result)) {
  console.log('Day set successfully:', result);
}
```

### Conditional Date Adjustment

```typescript
import { setDay } from 'chronia';

// Set payment due dates to the 15th of each month
function setPaymentDueDate(invoiceDate: Date): Date {
  return setDay(invoiceDate, 15);
}

const invoice = new Date(2025, 0, 5);
const dueDate = setPaymentDueDate(invoice);
// Returns: Date object representing 2025-01-15

// Adjust dates based on business rules
function adjustToBusinessDay(date: Date, preferredDay: number): Date {
  const adjusted = setDay(date, preferredDay);
  // Additional logic could check if it's a weekend and adjust further
  return adjusted;
}
```
