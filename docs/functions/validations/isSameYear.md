# isSameYear

## Overview

The `isSameYear` function checks if two dates fall within the same calendar year, ignoring month, day, and time components. It provides a simple boolean comparison for year equality across Chronia's consistent API surface.

## Signature

```typescript
function isSameYear(dateLeft: Date | number, dateRight: Date | number): boolean
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `dateLeft` | `Date \| number` | The first date as a Date object or numeric timestamp |
| `dateRight` | `Date \| number` | The second date as a Date object or numeric timestamp |

## Return Value

| Type | Description |
|------|-------------|
| `boolean` | Returns `true` if both dates are in the same calendar year, `false` otherwise or if either date is invalid |

## Description

The `isSameYear` function compares two dates to determine if they belong to the same calendar year. It leverages Chronia's `diffYears` function internally, checking whether the year difference between the two dates equals zero. All other date components (month, day, time) are completely ignored in the comparison.

### Specification

#### Returns `true` when:
- Both dates are valid and their year components are identical
- The dates may be in different months, days, or times within that year
- Works with any combination of Date objects and numeric timestamps
- Handles dates before Unix epoch (negative timestamps)
- Works correctly across leap years and century boundaries

#### Returns `false` when:
- The dates are in different calendar years
- Either `dateLeft` is an Invalid Date object (e.g., `new Date('invalid')`)
- Either `dateRight` is an Invalid Date object
- Either date parameter is `NaN`
- Either date parameter is `Infinity` or `-Infinity`

### Behavior Notes

- No exceptions are thrown; invalid inputs silently return `false`
- Uses `diffYears` internally, which performs validation via `isValidDateOrNumber`
- Only the year component affects the result; all other components are ignored
- Performance-optimized with simple year extraction and comparison
- Type-safe with TypeScript, accepting only `Date | number`
- Consistent with Chronia's boolean function pattern (return `false` for invalid inputs)

## Use Cases

- **Date Range Validation**: Verify that start and end dates of a period fall within the same fiscal or calendar year. Useful for annual reports, year-to-date calculations, or yearly budget tracking.
- **Data Grouping**: Group records or events by year when the exact month/day doesn't matter. Common in analytics dashboards showing yearly trends or filtering data by year.
- **Business Logic Rules**: Enforce rules that require operations to occur within the same year. For example, checking if two transactions happened in the same tax year or if milestones occurred in the same calendar year.
- **UI State Management**: Determine whether to show year headers in date lists or calendars. Helps decide when to display year separators in chronological listings.
- **Temporal Proximity Checks**: Quick validation that two dates are at least year-aligned before performing more expensive date comparisons or calculations.

## Usage Examples

### Date Range Validation

```typescript
import { isSameYear } from 'chronia';

// Validate year-to-date range
function isValidYTDRange(start: Date, end: Date): boolean {
  return isSameYear(start, end);
}

// Same year, different months
isSameYear(new Date(2024, 0, 1), new Date(2024, 11, 31));  // Returns: true

// Different years (year boundary)
isSameYear(new Date(2024, 11, 31), new Date(2025, 0, 1));  // Returns: false

// Same year, ignoring time components
isSameYear(
  new Date(2024, 5, 15, 14, 30, 0),
  new Date(2024, 5, 15, 9, 45, 30)
);  // Returns: true
```

### Data Grouping

```typescript
import { isSameYear } from 'chronia';

interface Event {
  title: string;
  date: Date;
}

// Group events by year
function shouldGroupTogether(event1: Event, event2: Event): boolean {
  return isSameYear(event1.date, event2.date);
}

// Filter events from a specific year
function getEventsFromSameYear(events: Event[], referenceDate: Date): Event[] {
  return events.filter(event => isSameYear(event.date, referenceDate));
}

const events: Event[] = [
  { title: 'Q1 Review', date: new Date(2024, 2, 15) },
  { title: 'Q4 Review', date: new Date(2024, 11, 20) },
  { title: 'New Year', date: new Date(2025, 0, 1) }
];

getEventsFromSameYear(events, new Date(2024, 6, 1));
// Returns: [{ title: 'Q1 Review', ... }, { title: 'Q4 Review', ... }]
```

### Business Logic Rules

```typescript
import { isSameYear } from 'chronia';

interface Transaction {
  amount: number;
  date: Date;
}

// Check if transactions are in same tax year
function areInSameTaxYear(tx1: Transaction, tx2: Transaction): boolean {
  return isSameYear(tx1.date, tx2.date);
}

// Validate annual contribution limit
function canAddContribution(
  existingContributions: Transaction[],
  newContribution: Transaction
): boolean {
  const yearTotal = existingContributions
    .filter(tx => isSameYear(tx.date, newContribution.date))
    .reduce((sum, tx) => sum + tx.amount, 0);

  return yearTotal + newContribution.amount <= 10000;
}
```

### UI State Management

```typescript
import { isSameYear } from 'chronia';

interface DateListItem {
  date: Date;
  content: string;
}

// Determine if year header should be shown
function shouldShowYearHeader(item: DateListItem, previousItem: DateListItem | null): boolean {
  if (!previousItem) return true;
  return !isSameYear(item.date, previousItem.date);
}

// Build list with year headers
function buildDateListWithHeaders(items: DateListItem[]): Array<{ type: 'header' | 'item', value: string | DateListItem }> {
  const result: Array<{ type: 'header' | 'item', value: string | DateListItem }> = [];

  items.forEach((item, index) => {
    const prev = index > 0 ? items[index - 1] : null;

    if (shouldShowYearHeader(item, prev)) {
      result.push({
        type: 'header',
        value: item.date.getFullYear().toString()
      });
    }

    result.push({ type: 'item', value: item });
  });

  return result;
}
```

### Temporal Proximity Checks

```typescript
import { isSameYear } from 'chronia';

// Quick year alignment check before detailed comparison
function areDatesRelated(date1: Date, date2: Date): boolean {
  // Fast year check first
  if (!isSameYear(date1, date2)) {
    return false;
  }

  // More expensive checks only if same year
  const monthDiff = Math.abs(date1.getMonth() - date2.getMonth());
  return monthDiff <= 3;  // Within same quarter
}

// Works with timestamps
const now = Date.now();
const earlier = new Date(2024, 0, 1).getTime();
isSameYear(now, earlier);  // Returns: true or false depending on current year

// Invalid dates return false
isSameYear(new Date('invalid'), new Date(2024, 0, 1));  // Returns: false
isSameYear(NaN, new Date(2024, 0, 1));  // Returns: false
```
