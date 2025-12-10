# diffYears

## Overview

The `diffYears` function calculates the difference in calendar years between two dates. It provides a simple year-based calculation that ignores months, days, and time components, focusing solely on the year values.

## Signature

```typescript
function diffYears(dateLeft: Date | number, dateRight: Date | number): number;
```

## Parameters

| Parameter   | Type             | Description                                           |
| ----------- | ---------------- | ----------------------------------------------------- |
| `dateLeft`  | `Date \| number` | The first date as a Date object or numeric timestamp  |
| `dateRight` | `Date \| number` | The second date as a Date object or numeric timestamp |

## Return Value

| Type     | Description                                                                                                       |
| -------- | ----------------------------------------------------------------------------------------------------------------- |
| `number` | The difference in calendar years (negative if `dateLeft` is before `dateRight`), or `NaN` if any input is invalid |

## Description

The `diffYears` function determines the number of full calendar years between two dates by comparing only their year components. This function is part of Chronia's suite of difference calculation utilities and provides a simplified year-based comparison that ignores all finer temporal granularity.

The calculation is straightforward: `dateLeft.getFullYear() - dateRight.getFullYear()`. This means that regardless of the month, day, or time values, only the year difference is computed.

### Specification

#### Returns a positive number when:

- `dateLeft` has a year value greater than `dateRight`
- For example: `diffYears(new Date(2024, 0, 1), new Date(2020, 11, 31))` returns `4`

#### Returns `0` when:

- Both dates fall within the same calendar year
- For example: `diffYears(new Date(2024, 11, 31), new Date(2024, 0, 1))` returns `0`

#### Returns a negative number when:

- `dateLeft` has a year value less than `dateRight`
- For example: `diffYears(new Date(2020, 5, 15), new Date(2024, 5, 15))` returns `-4`

#### Returns `NaN` when:

- Either `dateLeft` or `dateRight` is an Invalid Date object (e.g., `new Date('invalid')`)
- Either argument is `NaN`
- Either argument is `Infinity` or `-Infinity`
- For example: `diffYears(new Date("invalid"), new Date(2024, 5, 15))` returns `NaN`

### Behavior Notes

- **Granularity**: Only year values are considered; months, days, hours, minutes, seconds, and milliseconds are completely ignored in the calculation
- **Error Handling**: Returns `NaN` for invalid inputs rather than throwing exceptions, following Chronia's graceful error handling pattern for calculation functions
- **Flexibility**: Accepts both Date objects and numeric timestamps interchangeably
- **Century/Millennium Boundaries**: Correctly handles calculations across century and millennium boundaries
- **Validation**: Uses Chronia's internal `isValidDateOrNumber` validator to ensure input validity before performing calculations
- **Symmetry**: The result is symmetric: `diffYears(a, b) === -diffYears(b, a)`

## Use Cases

- **Age Calculation**: Calculate a person's age in years based on their birth date, regardless of the specific birth month or day. Useful for quick age approximations where exact age isn't critical.
- **Year-Based Filtering**: Filter or categorize data based on year differences. For example, identifying records that are more than 5 years old or grouping data into year-based buckets.
- **Simple Time Span Analysis**: Determine the number of years spanned by a project, subscription, or event without worrying about month/day precision. Ideal for high-level reporting and analytics.
- **Historical Comparisons**: Compare dates from historical records or timelines where only the year component matters. Useful in historical data analysis or archival systems.
- **Performance Optimization**: When precise date differences aren't required, using year-only calculations can be more performant than complex date arithmetic that considers all components.

## Usage Examples

### Age Calculation

```typescript
import { diffYears } from "chronia";

// Calculate approximate age (ignores birth month/day)
const birthDate = new Date(1990, 5, 15); // June 15, 1990
const today = new Date(2024, 10, 22); // November 22, 2024
const age = diffYears(today, birthDate);
// Returns: 34

// Works with timestamps
const birthTimestamp = new Date(1990, 5, 15).getTime();
const currentTimestamp = Date.now();
const ageFromTimestamp = diffYears(currentTimestamp, birthTimestamp);
// Returns: 34 (as of 2024)
```

### Year-Based Filtering

```typescript
import { diffYears } from "chronia";

interface Record {
  id: string;
  createdAt: Date;
  data: any;
}

// Filter records older than 5 years
function filterOldRecords(records: Record[]): Record[] {
  const now = new Date();
  return records.filter((record) => {
    const yearDiff = diffYears(now, record.createdAt);
    return yearDiff > 5;
  });
}

// Example usage
const records: Record[] = [
  { id: "1", createdAt: new Date(2015, 3, 10), data: {} },
  { id: "2", createdAt: new Date(2023, 7, 20), data: {} },
  { id: "3", createdAt: new Date(2018, 11, 5), data: {} },
];

const oldRecords = filterOldRecords(records);
// Returns records from 2015 and 2018 (as of 2024)
```

### Simple Time Span Analysis

```typescript
import { diffYears } from "chronia";

// Calculate project duration in years
const projectStart = new Date(2019, 0, 1);
const projectEnd = new Date(2024, 11, 31);
const projectYears = diffYears(projectEnd, projectStart);
// Returns: 5

// Same year calculation
const sameYearStart = new Date(2024, 0, 1);
const sameYearEnd = new Date(2024, 11, 31);
const duration = diffYears(sameYearEnd, sameYearStart);
// Returns: 0 (both in same year)
```

### Historical Comparisons

```typescript
import { diffYears } from "chronia";

// Compare historical events
const eventA = new Date(1776, 6, 4); // July 4, 1776
const eventB = new Date(1969, 6, 20); // July 20, 1969
const yearsBetween = diffYears(eventB, eventA);
// Returns: 193

// Handles century boundaries
const year1899 = new Date(1899, 11, 31);
const year1900 = new Date(1900, 0, 1);
const centuryDiff = diffYears(year1900, year1899);
// Returns: 1
```

### Error Handling

```typescript
import { diffYears } from "chronia";

// Invalid date handling
const invalidDate = new Date("invalid");
const validDate = new Date(2024, 5, 15);

const result1 = diffYears(invalidDate, validDate);
// Returns: NaN

const result2 = diffYears(validDate, invalidDate);
// Returns: NaN

// Check for valid result
function safeYearDiff(date1: Date, date2: Date): number | null {
  const diff = diffYears(date1, date2);
  return isNaN(diff) ? null : diff;
}

const safeDiff = safeYearDiff(invalidDate, validDate);
// Returns: null
```
