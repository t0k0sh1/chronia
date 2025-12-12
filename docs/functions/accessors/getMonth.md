# getMonth

## Overview

The `getMonth` function extracts the month component from a given Date object or timestamp, returning a zero-based month index (0-11) where January is 0 and December is 11.

## Signature

```typescript
function getMonth(date: DateInput): number;
```

## Parameters

| Parameter | Type        | Description                                                                          |
| --------- | ----------- | ------------------------------------------------------------------------------------ |
| `date`    | `DateInput` | A Date object, numeric timestamp, or ISO 8601 string from which to extract the month |

## Return Value

| Type     | Description                                                                                                                           |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `number` | The month as a zero-based index (0-11), where 0 represents January and 11 represents December. Returns `NaN` if the input is invalid. |

## Description

The `getMonth` function extracts the month component from a Date object or numeric timestamp. It validates the input before processing and returns the month in the local timezone using JavaScript's zero-based month indexing convention.

### Specification

#### Returns a number (0-11) when:

- The argument is a valid `Date` object representing any valid date
- The argument is a finite numeric timestamp, including:
  - Positive timestamps (dates after Unix epoch)
  - Zero (`0`, representing January 1, 1970, 00:00:00 UTC)
  - Negative timestamps (dates before Unix epoch)
- Month 0 = January, Month 1 = February, ..., Month 11 = December

#### Returns `NaN` when:

- The argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The argument is `NaN`
- The argument is `Infinity`
- The argument is `-Infinity`

### Behavior Notes

- Validates arguments before processing to ensure consistency with library patterns
- Accepts both Date objects and numeric timestamps for flexibility
- Returns the month in the local timezone (not UTC)
- Uses JavaScript's native zero-based indexing (0-11) for months
- No exceptions are thrown; invalid values return `NaN` for safe error handling
- Type-safe with TypeScript, accepting only `Date | number`

## Use Cases

- **Date Component Extraction**: Extract the month from a date for display, comparison, or calculation purposes. Useful when you need to work with individual date components rather than complete date objects.
- **Date Filtering**: Filter or group data by month, such as organizing records by month or selecting entries from a specific month.
- **Calendar Operations**: Build calendar interfaces or month-based navigation where you need to determine which month a date falls into.
- **Validation Logic**: Verify that dates fall within expected month ranges, such as checking if a date is in a particular quarter or season.
- **Data Analysis**: Aggregate or analyze data by month, such as computing monthly statistics or generating month-based reports.

## Usage Examples

### Date Component Extraction

```typescript
import { getMonth } from "chronia";

// Get month from Date object
const date = new Date(2024, 5, 15); // June 15, 2024
getMonth(date); // Returns: 5

// Get month from timestamp
const timestamp = 1704067200000; // January 1, 2024
getMonth(timestamp); // Returns: 0

// Different months
getMonth(new Date(2024, 0, 1)); // January - Returns: 0
getMonth(new Date(2024, 11, 31)); // December - Returns: 11
```

### Date Filtering

```typescript
import { getMonth } from "chronia";

// Filter dates by month
const dates = [
  new Date(2024, 0, 15), // January
  new Date(2024, 5, 20), // June
  new Date(2024, 11, 25), // December
];

// Get all June dates
const juneDates = dates.filter((date) => getMonth(date) === 5);
// Returns: [new Date(2024, 5, 20)]

// Group by quarter
function getQuarter(date: Date | number): number {
  const month = getMonth(date);
  return Math.floor(month / 3) + 1;
}

getQuarter(new Date(2024, 0, 1)); // Q1 - Returns: 1
getQuarter(new Date(2024, 5, 15)); // Q2 - Returns: 2
```

### Calendar Operations

```typescript
import { getMonth } from "chronia";

// Build month navigation
function getMonthName(date: Date | number): string {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = getMonth(date);
  return monthNames[monthIndex];
}

getMonthName(new Date(2024, 5, 15)); // Returns: 'June'

// Check if date is in current month
function isCurrentMonth(date: Date | number): boolean {
  const now = new Date();
  return getMonth(date) === getMonth(now);
}
```

### Validation Logic

```typescript
import { getMonth } from "chronia";

// Validate date falls in expected range
function isSummerMonth(date: Date | number): boolean {
  const month = getMonth(date);
  // June (5), July (6), August (7)
  return month >= 5 && month <= 7;
}

isSummerMonth(new Date(2024, 6, 4)); // July - Returns: true
isSummerMonth(new Date(2024, 0, 1)); // January - Returns: false

// Handle invalid dates safely
const invalidDate = new Date("invalid");
const month = getMonth(invalidDate);
if (isNaN(month)) {
  console.log("Invalid date provided");
}
// Logs: 'Invalid date provided'
```

### Data Analysis

```typescript
import { getMonth } from "chronia";

// Aggregate sales by month
interface Sale {
  date: Date;
  amount: number;
}

function aggregateSalesByMonth(sales: Sale[]): Map<number, number> {
  const monthlyTotals = new Map<number, number>();

  for (const sale of sales) {
    const month = getMonth(sale.date);
    const currentTotal = monthlyTotals.get(month) || 0;
    monthlyTotals.set(month, currentTotal + sale.amount);
  }

  return monthlyTotals;
}

const sales = [
  { date: new Date(2024, 0, 15), amount: 100 },
  { date: new Date(2024, 0, 20), amount: 150 },
  { date: new Date(2024, 1, 10), amount: 200 },
];

const monthlyTotals = aggregateSalesByMonth(sales);
// Returns: Map { 0 => 250, 1 => 200 }
```
