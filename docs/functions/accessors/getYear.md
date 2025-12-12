# getYear

## Overview

The `getYear` function retrieves the full year (e.g., 2025) from a given Date object or timestamp, providing a reliable way to extract year information in Chronia's consistent API surface.

## Signature

```typescript
function getYear(date: DateInput): number;
```

## Parameters

| Parameter | Type        | Description                                                                         |
| --------- | ----------- | ----------------------------------------------------------------------------------- |
| `date`    | `DateInput` | A Date object, numeric timestamp, or ISO 8601 string from which to extract the year |

## Return Value

| Type     | Description                                                              |
| -------- | ------------------------------------------------------------------------ |
| `number` | The full year as a number (e.g., 2025), or `NaN` if the input is invalid |

## Description

The `getYear` function extracts the full year from the provided Date object or timestamp in the local timezone. It validates the input before processing to ensure consistency with Chronia's error handling patterns, returning `NaN` for invalid inputs rather than throwing exceptions.

### Specification

#### Returns the full year when:

- The argument is a valid `Date` object
- The argument is a finite numeric timestamp, including:
  - Positive timestamps (dates after Unix epoch)
  - Zero (`0`, representing January 1, 1970, 00:00:00 UTC)
  - Negative timestamps (dates before Unix epoch)
- The year can be any valid JavaScript date year, including:
  - Modern years (e.g., 2025)
  - Historic years (e.g., 1776)
  - Negative years (BC dates, represented as negative numbers)

#### Returns `NaN` when:

- The argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The argument is `NaN`
- The argument is `Infinity`
- The argument is `-Infinity`

### Behavior Notes

- No exceptions are thrown; invalid values return `NaN` for consistent error handling
- Uses Chronia's internal validation utilities (`isValidDateOrNumber`) to ensure consistency across the library
- Returns the year in the local timezone context
- Type-safe with TypeScript, accepting only `Date | number` input types
- Supports the full range of JavaScript date values, including historic and future dates
- Internally converts numeric timestamps to Date objects after validation

## Use Cases

- **Date Component Extraction**: Extract the year component from dates for display, filtering, or comparison purposes. Essential for building date pickers, calendars, or year-based navigation.
- **Age Calculation**: Calculate age or time periods by extracting years from birth dates or event dates. Useful in user profile systems or eligibility checking.
- **Data Grouping**: Group records by year for analytics, reporting, or archival purposes. Common in business intelligence dashboards and time-series analysis.
- **Validation and Range Checking**: Verify that dates fall within expected year ranges, such as checking if a date is in the current year or within a valid historical period.
- **Timestamp Analysis**: Extract year information from Unix timestamps received from APIs or databases without manually converting to Date objects first.

## Usage Examples

### Date Component Extraction

```typescript
import { getYear } from "chronia";

// Get year from Date object
const date = new Date(2025, 0, 15); // January 15, 2025
const year = getYear(date);
// Returns: 2025

// Get year from timestamp
const timestamp = 1704067200000; // 2024-01-01 00:00:00 UTC
const year2 = getYear(timestamp);
// Returns: 2024

// Current year
const currentYear = getYear(new Date());
// Returns: 2025 (as of 2025)
```

### Age Calculation

```typescript
import { getYear } from "chronia";

function calculateAge(birthDate: Date): number {
  const birthYear = getYear(birthDate);
  const currentYear = getYear(new Date());
  return currentYear - birthYear;
}

// Calculate age
const birthDate = new Date(1990, 5, 15);
const age = calculateAge(birthDate);
// Returns: 35 (if current year is 2025)
```

### Data Grouping

```typescript
import { getYear } from "chronia";

interface Transaction {
  date: Date;
  amount: number;
}

function groupByYear(transactions: Transaction[]): Map<number, Transaction[]> {
  const grouped = new Map<number, Transaction[]>();

  for (const transaction of transactions) {
    const year = getYear(transaction.date);
    if (isNaN(year)) continue; // Skip invalid dates

    if (!grouped.has(year)) {
      grouped.set(year, []);
    }
    grouped.get(year)!.push(transaction);
  }

  return grouped;
}

// Group transactions by year
const transactions = [
  { date: new Date(2024, 0, 1), amount: 100 },
  { date: new Date(2024, 5, 1), amount: 200 },
  { date: new Date(2025, 0, 1), amount: 150 },
];
const groupedByYear = groupByYear(transactions);
// Returns: Map { 2024 => [...2 transactions], 2025 => [...1 transaction] }
```

### Validation and Range Checking

```typescript
import { getYear } from "chronia";

function isCurrentYear(date: Date | number): boolean {
  const year = getYear(date);
  if (isNaN(year)) return false;

  const currentYear = getYear(new Date());
  return year === currentYear;
}

function isValidBirthYear(date: Date | number): boolean {
  const year = getYear(date);
  if (isNaN(year)) return false;

  const currentYear = getYear(new Date());
  return year >= 1900 && year <= currentYear;
}

// Check if date is in current year
isCurrentYear(new Date(2025, 0, 15)); // Returns: true
isCurrentYear(new Date(2024, 0, 15)); // Returns: false

// Validate birth year range
isValidBirthYear(new Date(1990, 5, 15)); // Returns: true
isValidBirthYear(new Date(1850, 0, 1)); // Returns: false
```

### Timestamp Analysis

```typescript
import { getYear } from "chronia";

// Handle timestamps from API
function processApiResponse(response: { createdAt: number }): string {
  const year = getYear(response.createdAt);

  if (isNaN(year)) {
    return "Unknown date";
  }

  return `Created in ${year}`;
}

// Process API timestamp
const apiData = { createdAt: 1609459200000 }; // 2021-01-01
const message = processApiResponse(apiData);
// Returns: "Created in 2021"
```

### Edge Cases

```typescript
import { getYear } from "chronia";

// Leap year
getYear(new Date(2024, 1, 29)); // Returns: 2024

// Historic date
getYear(new Date(1776, 6, 4)); // Returns: 1776

// Unix epoch
getYear(0); // Returns: 1970

// Invalid date returns NaN
getYear(new Date("invalid")); // Returns: NaN
getYear(NaN); // Returns: NaN
getYear(Infinity); // Returns: NaN

// Check for invalid result
const year = getYear(new Date("invalid"));
if (isNaN(year)) {
  console.log("Invalid date provided");
}
```
