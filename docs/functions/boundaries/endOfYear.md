# endOfYear

## Overview

The `endOfYear` function returns a new Date object representing the last moment of the year (December 31st at 23:59:59.999) for a given date. It provides a reliable way to obtain year-end boundaries in Chronia's consistent API surface.

## Signature

```typescript
function endOfYear(date: DateInput): Date;
```

## Parameters

| Parameter | Type        | Description                                                                     |
| --------- | ----------- | ------------------------------------------------------------------------------- |
| `date`    | `DateInput` | A Date object, numeric timestamp, or ISO 8601 string representing the base date |

## Return Value

| Type   | Description                                                                                                      |
| ------ | ---------------------------------------------------------------------------------------------------------------- |
| `Date` | A new Date object set to December 31st at 23:59:59.999 of the same year, or Invalid Date if the input is invalid |

## Description

The `endOfYear` function calculates the final moment of the year for the provided Date object or timestamp. It sets the returned date to December 31st with all time components set to their maximum values (23:59:59.999), while preserving the year from the input date. This function is useful for date range calculations, year-based filtering, and time boundary operations.

### Specification

#### Returns a Date set to December 31st, 23:59:59.999 when:

- The argument is a valid `Date` object (not Invalid Date)
- The argument is a finite numeric timestamp, including:
  - Positive timestamps (dates after Unix epoch)
  - Zero (`0`, representing January 1, 1970, 00:00:00 UTC)
  - Negative timestamps (dates before Unix epoch)
- The year from the input date is preserved
- Month is set to 11 (December)
- Day is set to 31
- Hours set to 23, minutes to 59, seconds to 59, milliseconds to 999

#### Returns Invalid Date when:

- The argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The argument is `NaN`
- The argument is `Infinity`
- The argument is `-Infinity`

### Behavior Notes

- Input validation is performed before processing using Chronia's internal validators for consistency
- No exceptions are thrown; invalid inputs return Invalid Date
- Always returns a new Date instance without mutating the input
- Works correctly for all years, including leap years and non-leap years
- Type-safe with TypeScript, accepting only `Date | number`
- Consistent with other Chronia boundary functions (e.g., `startOfYear`, `endOfMonth`)

## Use Cases

- **Year Range Queries**: Define the end boundary for year-based date ranges in database queries or filtering operations. Useful when you need to include all dates up to and including the last moment of a specific year.
- **Year-based Reporting**: Calculate the end date for annual reports, financial year-end calculations, or any yearly data aggregation where you need the precise final moment of the year.
- **Time Period Calculations**: Determine if a date falls within a specific year by comparing against both the start and end of that year. Essential for period validation and date range checks.
- **Calendar Operations**: Generate year boundaries for calendar views, timeline visualizations, or scheduling applications that need to display or calculate based on full year periods.
- **Data Validation**: Verify that dates fall within expected yearly boundaries, useful for validating user input or ensuring data integrity in year-constrained scenarios.

## Usage Examples

### Year Range Queries

```typescript
import { endOfYear, startOfYear } from "chronia";

// Get full year range for 2024
const yearStart = startOfYear(new Date(2024, 5, 15));
const yearEnd = endOfYear(new Date(2024, 5, 15));
// yearStart: January 1, 2024 00:00:00.000
// yearEnd: December 31, 2024 23:59:59.999

// Check if a date is within a specific year
function isInYear(date: Date, year: number): boolean {
  const referenceDate = new Date(year, 0, 1);
  const start = startOfYear(referenceDate);
  const end = endOfYear(referenceDate);
  const time = date.getTime();
  return time >= start.getTime() && time <= end.getTime();
}

isInYear(new Date(2024, 11, 31, 23, 59, 59), 2024); // Returns: true
isInYear(new Date(2025, 0, 1, 0, 0, 0), 2024); // Returns: false
```

### Year-based Reporting

```typescript
import { endOfYear } from "chronia";

// Calculate financial year end
function getFiscalYearEnd(date: Date): Date {
  return endOfYear(date);
}

const fiscalYearEnd = getFiscalYearEnd(new Date(2024, 3, 15));
// Returns: December 31, 2024 23:59:59.999

// Works with timestamps
const timestamp = Date.now();
const yearEnd = endOfYear(timestamp);
// Returns: December 31st of current year at 23:59:59.999
```

### Time Period Calculations

```typescript
import { endOfYear } from "chronia";

// Filter events that occur in a specific year
interface Event {
  name: string;
  date: Date;
}

function getEventsInYear(events: Event[], year: number): Event[] {
  const yearEndDate = endOfYear(new Date(year, 0, 1));
  const yearEndTime = yearEndDate.getTime();

  return events.filter(
    (event) =>
      event.date.getFullYear() === year && event.date.getTime() <= yearEndTime,
  );
}

// Works regardless of leap year
const leapYearEnd = endOfYear(new Date(2024, 1, 29));
// Returns: December 31, 2024 23:59:59.999

const normalYearEnd = endOfYear(new Date(2023, 5, 15));
// Returns: December 31, 2023 23:59:59.999
```

### Data Validation

```typescript
import { endOfYear, isValid } from "chronia";

// Safe year-end calculation with validation
function safeEndOfYear(date: Date | number): Date | null {
  const result = endOfYear(date);
  return isValid(result) ? result : null;
}

// Valid date
safeEndOfYear(new Date(2024, 5, 15)); // Returns: December 31, 2024 23:59:59.999

// Invalid date
safeEndOfYear(new Date("invalid")); // Returns: null

// Calculate remaining days in year
function daysRemainingInYear(date: Date): number {
  const end = endOfYear(date);
  if (!isValid(end)) {
    return -1;
  }
  const diffMs = end.getTime() - date.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

daysRemainingInYear(new Date(2024, 0, 1)); // Returns: 365 (leap year)
daysRemainingInYear(new Date(2023, 0, 1)); // Returns: 364
```
