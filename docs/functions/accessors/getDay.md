# getDay

## Overview

The `getDay` function extracts the day of the month (1-31) from a given Date object or timestamp. It provides validated date access with consistent error handling across Chronia's API surface.

## Signature

```typescript
function getDay(date: Date | number): number
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `date` | `Date \| number` | A Date object or numeric timestamp from which to extract the day |

## Return Value

| Type | Description |
|------|-------------|
| `number` | The day of the month (1-31), or `NaN` if the input is invalid |

## Description

The `getDay` function extracts and returns the day of the month from the provided date. It validates the input before processing and returns the day in the local timezone. The function accepts both Date objects and numeric timestamps for flexibility.

### Specification

#### Returns a number (1-31) when:
- The argument is a valid `Date` object with a valid date
- The argument is a finite numeric timestamp representing a valid date
- The day value corresponds to the actual day of the month (1-31) depending on the month and year

#### Returns `NaN` when:
- The argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The argument is `NaN`
- The argument is `Infinity`
- The argument is `-Infinity`
- The argument is any other invalid date value

### Behavior Notes

- Input validation occurs before date conversion for consistency with Chronia's patterns
- Uses the same validation logic (`isValidDateOrNumber`) as other Chronia functions
- Returns the day in the **local timezone**, not UTC
- Day values range from 1 to 31 depending on the month (28-31 for February, 30 or 31 for other months)
- No exceptions are thrown; invalid inputs consistently return `NaN`
- Type-safe with TypeScript, accepting only `Date | number`

## Use Cases

- **Date Display**: Extract the day component for formatted date displays in user interfaces. Useful when you need to show only the day portion of a date separately from month and year.
- **Date Calculations**: Determine the current day of the month for date arithmetic operations. Helpful when calculating deadlines, due dates, or scheduling events based on day-of-month rules.
- **Date Validation**: Check if a date falls on a specific day of the month. Common in business logic that needs to identify specific days like the 1st, 15th, or last day of the month.
- **Calendar Components**: Build calendar UIs that need to display or highlight specific days. Essential for implementing date pickers, event calendars, and scheduling interfaces.
- **Data Processing**: Extract day values from date collections for analysis or grouping. Useful when aggregating data by day-of-month patterns or generating reports.

## Usage Examples

### Date Display

```typescript
import { getDay } from 'chronia';

// Extract day from Date object
const date = new Date(2025, 0, 15);
const day = getDay(date);  // Returns: 15

// Display formatted date component
console.log(`Day: ${day}`);  // Output: "Day: 15"

// Get day from timestamp (note: uses local timezone)
const timestamp = 1704067200000; // 2024-01-01T00:00:00.000Z in UTC
const day2 = getDay(timestamp);  // Returns: 1 (may vary by timezone)
```

### Date Calculations

```typescript
import { getDay } from 'chronia';

// Check if we're in the first half of the month
function isFirstHalfOfMonth(date: Date | number): boolean {
  const day = getDay(date);
  return day <= 15;
}

const date1 = new Date(2025, 0, 10);
isFirstHalfOfMonth(date1);  // Returns: true

const date2 = new Date(2025, 0, 20);
isFirstHalfOfMonth(date2);  // Returns: false

// Calculate days until end of month
function daysUntilMonthEnd(date: Date, daysInMonth: number): number {
  const day = getDay(date);
  return daysInMonth - day;
}
```

### Date Validation

```typescript
import { getDay } from 'chronia';

// Check if date is the first day of the month
function isFirstDayOfMonth(date: Date | number): boolean {
  return getDay(date) === 1;
}

isFirstDayOfMonth(new Date(2025, 0, 1));   // Returns: true
isFirstDayOfMonth(new Date(2025, 0, 15));  // Returns: false

// Check if date is a specific billing day
function isBillingDay(date: Date | number): boolean {
  const day = getDay(date);
  return day === 1 || day === 15;  // Bills on 1st and 15th
}

isBillingDay(new Date(2025, 0, 1));   // Returns: true
isBillingDay(new Date(2025, 0, 15));  // Returns: true
isBillingDay(new Date(2025, 0, 10));  // Returns: false
```

### Edge Cases

```typescript
import { getDay } from 'chronia';

// Leap day handling
const leapDay = new Date(2024, 1, 29);  // February 29, 2024
getDay(leapDay);  // Returns: 29

// End of month variations
const jan31 = new Date(2025, 0, 31);  // January 31
getDay(jan31);  // Returns: 31

const feb28 = new Date(2025, 1, 28);  // February 28, 2025 (non-leap)
getDay(feb28);  // Returns: 28

// Invalid date handling
const invalid = new Date('invalid');
getDay(invalid);  // Returns: NaN

// Safe usage with validation
function safeGetDay(date: Date | number): number | null {
  const day = getDay(date);
  return isNaN(day) ? null : day;
}

safeGetDay(new Date(2025, 0, 15));  // Returns: 15
safeGetDay(new Date('invalid'));    // Returns: null
```

### Calendar Components

```typescript
import { getDay } from 'chronia';

// Generate calendar grid for current month
function generateMonthDays(year: number, month: number): number[] {
  const days: number[] = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    days.push(getDay(date));
  }

  return days;
}

// Returns: [1, 2, 3, ..., 31] for January
const januaryDays = generateMonthDays(2025, 0);

// Highlight specific day in calendar
function isHighlightedDay(date: Date, targetDay: number): boolean {
  return getDay(date) === targetDay;
}

const today = new Date(2025, 0, 15);
isHighlightedDay(today, 15);  // Returns: true
```
