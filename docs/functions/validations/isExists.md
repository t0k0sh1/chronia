# isExists

## Overview

The `isExists` function validates whether a given year, month, and day combination represents a valid date that actually exists in the Gregorian calendar. It provides precise date existence validation with 1-based month indexing, making it ideal for validating user input or parsed date components.

## Signature

```typescript
function isExists(year: number, month: number, day: number): boolean
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `year` | `number` | The year value (fractional values use their integer part) |
| `month` | `number` | The month value (1-12, where 1 = January and 12 = December) |
| `day` | `number` | The day value (1 to the maximum day for the given month) |

## Return Value

| Type | Description |
|------|-------------|
| `boolean` | Returns `true` if the date combination represents a valid existing date, `false` otherwise |

## Description

The `isExists` function determines whether the specified year, month, and day combination represents a date that actually exists in the Gregorian calendar. Unlike JavaScript's Date constructor, it uses 1-based month indexing (1 = January, 12 = December) for more intuitive API usage. The function implements comprehensive leap year validation following the Gregorian calendar rules and handles edge cases gracefully without throwing exceptions.

### Specification

#### Returns `true` when:
- All three parameters are valid finite numbers (not `NaN` or `Infinity`)
- Month is in the valid range (1-12)
- Day is in the valid range for the specified month:
  - January, March, May, July, August, October, December: 1-31
  - April, June, September, November: 1-30
  - February in common years: 1-28
  - February in leap years: 1-29
- Leap years are correctly identified using the Gregorian calendar rules:
  - Years divisible by 400: leap year (e.g., 2000, 2400)
  - Years divisible by 100 but not 400: not a leap year (e.g., 1900, 2100)
  - Years divisible by 4 but not 100: leap year (e.g., 2024, 2028)
  - All other years: not a leap year (e.g., 2023, 2025)
- Fractional input values use their integer part (e.g., `2024.9` is treated as `2024`)
- Negative years are valid (representing BCE dates)
- Year 0 is valid (ISO 8601 year zero)

#### Returns `false` when:
- Any parameter is `NaN`, `Infinity`, or `-Infinity`
- Month is outside the range 1-12 (e.g., `0`, `13`, `-1`)
- Day is outside the valid range for the specified month:
  - Day is less than 1 or greater than 31
  - February 30 or 31 in any year
  - Day 31 in months with only 30 days (April, June, September, November)
  - February 29 in common years (non-leap years)

### Behavior Notes

- Uses 1-based month indexing: `isExists(2024, 1, 15)` represents January 15, 2024
- This differs from JavaScript's Date constructor which uses 0-based months
- No exceptions are thrown; invalid inputs return `false`
- Fractional values are truncated to integers using `Math.trunc()`
- Performance-optimized with early exit for invalid inputs
- Type-safe with TypeScript, accepting only numeric parameters
- Immutable: does not modify any input values
- Leap year calculation follows the precise Gregorian calendar algorithm

## Use Cases

- **User Input Validation**: Validate date components from separate input fields (year, month, day) before creating a Date object. Prevents creation of invalid dates like April 31 or February 30.
- **Date Component Parsing**: Verify that parsed date strings represent actual dates. Useful when parsing custom date formats or legacy data where month/day values might be swapped or invalid.
- **Form Validation**: Validate date picker inputs or custom date entry forms before submission. Provides instant feedback to users about impossible dates like February 29 in non-leap years.
- **Data Quality Checks**: Filter or flag invalid dates in imported data, CSV files, or database records. Ensures data integrity when processing date information from external sources.
- **Calendar Applications**: Validate date selections in scheduling or calendar applications. Prevents users from selecting non-existent dates that could cause errors in date calculations.

## Usage Examples

### User Input Validation

```typescript
import { isExists } from 'chronia';

// Validate date components from a form
function validateDateInput(year: number, month: number, day: number): string | null {
  if (!isExists(year, month, day)) {
    return 'Please enter a valid date';
  }
  return null;
}

// Valid dates
isExists(2024, 2, 29);  // Returns: true - leap year, February has 29 days
isExists(2024, 4, 30);  // Returns: true - April has 30 days
isExists(2024, 12, 31); // Returns: true - December has 31 days
isExists(2024, 1, 1);   // Returns: true - January 1 is valid

// Invalid dates
isExists(2023, 2, 29);  // Returns: false - common year, February has only 28 days
isExists(2024, 2, 30);  // Returns: false - February never has 30 days
isExists(2024, 4, 31);  // Returns: false - April has only 30 days
isExists(2024, 13, 1);  // Returns: false - month must be 1-12
isExists(2024, 0, 1);   // Returns: false - month must be 1-12
isExists(2024, 1, 0);   // Returns: false - day must be at least 1
```

### Date Component Parsing

```typescript
import { isExists } from 'chronia';

// Parse and validate date string
function parseCustomDate(dateStr: string): Date | null {
  const match = dateStr.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!match) return null;

  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);

  if (!isExists(year, month, day)) {
    return null;
  }

  // Safe to create Date (adjust month to 0-based for JavaScript Date)
  return new Date(year, month - 1, day);
}

parseCustomDate('2024-02-29');  // Returns: Date object for Feb 29, 2024
parseCustomDate('2023-02-29');  // Returns: null (invalid date)
parseCustomDate('2024-04-31');  // Returns: null (April has only 30 days)
```

### Form Validation

```typescript
import { isExists } from 'chronia';

// Real-time date validation for separate input fields
function validateDateFields(yearInput: string, monthInput: string, dayInput: string): {
  valid: boolean;
  error?: string;
} {
  const year = parseInt(yearInput, 10);
  const month = parseInt(monthInput, 10);
  const day = parseInt(dayInput, 10);

  // Check for NaN from invalid input
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return { valid: false, error: 'Please enter valid numbers' };
  }

  // Basic range checks before calling isExists
  if (month < 1 || month > 12) {
    return { valid: false, error: 'Month must be between 1 and 12' };
  }

  if (day < 1) {
    return { valid: false, error: 'Day must be at least 1' };
  }

  // Use isExists for complex validation (leap years, month-specific day limits)
  if (!isExists(year, month, day)) {
    if (month === 2 && day === 29) {
      return { valid: false, error: `${year} is not a leap year` };
    }
    return { valid: false, error: 'This date does not exist' };
  }

  return { valid: true };
}

validateDateFields('2024', '2', '29');  // Returns: { valid: true }
validateDateFields('2023', '2', '29');  // Returns: { valid: false, error: '2023 is not a leap year' }
validateDateFields('2024', '13', '1');  // Returns: { valid: false, error: 'Month must be between 1 and 12' }
validateDateFields('2024', '1', '0');   // Returns: { valid: false, error: 'Day must be at least 1' }
```

### Data Quality Checks

```typescript
import { isExists } from 'chronia';

interface DateRecord {
  year: number;
  month: number;
  day: number;
  description: string;
}

// Filter valid dates from imported data
function filterValidDates(records: DateRecord[]): DateRecord[] {
  return records.filter(record =>
    isExists(record.year, record.month, record.day)
  );
}

const importedData = [
  { year: 2024, month: 1, day: 15, description: 'Event 1' },    // Valid
  { year: 2024, month: 2, day: 30, description: 'Event 2' },    // Invalid
  { year: 2024, month: 4, day: 31, description: 'Event 3' },    // Invalid
  { year: 2024, month: 12, day: 25, description: 'Event 4' },   // Valid
];

const validDates = filterValidDates(importedData);
// Returns: [
//   { year: 2024, month: 1, day: 15, description: 'Event 1' },
//   { year: 2024, month: 12, day: 25, description: 'Event 4' }
// ]
```

### Leap Year Edge Cases

```typescript
import { isExists } from 'chronia';

// Demonstrate Gregorian calendar leap year rules
function testLeapYearRules() {
  // 400-year rule: divisible by 400 is a leap year
  isExists(2000, 2, 29);  // Returns: true
  isExists(2400, 2, 29);  // Returns: true

  // 100-year rule: divisible by 100 (but not 400) is not a leap year
  isExists(1900, 2, 29);  // Returns: false
  isExists(2100, 2, 29);  // Returns: false

  // 4-year rule: divisible by 4 (but not 100) is a leap year
  isExists(2024, 2, 29);  // Returns: true
  isExists(2028, 2, 29);  // Returns: true

  // Common years: not divisible by 4
  isExists(2023, 2, 29);  // Returns: false
  isExists(2025, 2, 29);  // Returns: false
  isExists(2026, 2, 29);  // Returns: false
}
```

### Invalid Input Handling

```typescript
import { isExists } from 'chronia';

// Graceful handling of invalid inputs
isExists(NaN, 1, 1);         // Returns: false - NaN year
isExists(2024, NaN, 1);      // Returns: false - NaN month
isExists(2024, 1, NaN);      // Returns: false - NaN day
isExists(Infinity, 1, 1);    // Returns: false - Infinity year
isExists(2024, Infinity, 1); // Returns: false - Infinity month
isExists(2024, 1, Infinity); // Returns: false - Infinity day

// Fractional values use integer part
isExists(2024.9, 1, 15);     // Returns: true - treated as 2024/1/15
isExists(2024, 1.7, 15);     // Returns: true - treated as 2024/1/15
isExists(2024, 1, 15.3);     // Returns: true - treated as 2024/1/15
isExists(2024.5, 2.9, 29.1); // Returns: true - treated as 2024/2/29

// Negative and special values
isExists(-2024, 1, 1);       // Returns: true - valid BCE date
isExists(0, 1, 1);           // Returns: true - year 0 is valid
isExists(2024, -1, 1);       // Returns: false - negative month
isExists(2024, 1, -1);       // Returns: false - negative day
```
