# compare

## Overview

The `compare` function compares two Date objects or timestamps chronologically with configurable sort order. It provides a flexible comparison utility suitable for sorting operations and custom ordering logic in the Chronia library.

## Signature

```typescript
function compare(
  date1: Date | number,
  date2: Date | number,
  options?: CompareOptions
): number
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `date1` | `Date \| number` | The first Date object or timestamp to compare |
| `date2` | `Date \| number` | The second Date object or timestamp to compare |
| `options` | `CompareOptions` | Optional comparison options. Defaults to `{ order: "ASC" }` |

### CompareOptions

| Property | Type | Description |
|----------|------|-------------|
| `order` | `"ASC" \| "DESC"` | Sort order for comparison results. Defaults to `"ASC"` (ascending) |

## Return Value

| Type | Description |
|------|-------------|
| `number` | Returns `-1` if `date1` is before `date2`, `1` if `date1` is after `date2`, or `0` if they are equal. The result is inverted when `order` is set to `"DESC"`. Returns `NaN` if either input is invalid |

## Description

The `compare` function performs chronological comparison of two dates or timestamps, making it ideal for sorting operations and custom date ordering. It accepts both Date objects and numeric timestamps, automatically handling type conversion and validation.

### Specification

#### Returns `-1` when:
- `date1` is chronologically before `date2` (with `order: "ASC"` or default)
- `date1` is chronologically after `date2` (with `order: "DESC"`)

#### Returns `1` when:
- `date1` is chronologically after `date2` (with `order: "ASC"` or default)
- `date1` is chronologically before `date2` (with `order: "DESC"`)

#### Returns `0` when:
- Both dates represent the exact same moment in time (equal timestamps)
- Equality is independent of the `order` setting

#### Returns `NaN` when:
- Either `date1` or `date2` is an Invalid Date object (e.g., `new Date('invalid')`)
- Either input is `NaN`, `Infinity`, or `-Infinity`

### Behavior Notes

- **Flexible Input**: Accepts both Date objects and numeric timestamps, including mixed types
- **Type Validation**: Uses `isValidDateOrNumber` for early validation, returning `NaN` for invalid inputs
- **Case-Insensitive Order**: The `order` property is normalized to uppercase, though TypeScript enforces exact casing
- **Default Options**: When `options` is omitted or empty, defaults to ascending order (`"ASC"`)
- **JavaScript Flexibility**: While TypeScript requires the options object, the runtime implementation supports passing order as a direct string for JavaScript users (not recommended for TypeScript)
- **Timestamp Comparison**: Internally converts all dates to timestamps using `Date.getTime()` for precise comparison
- **No Exceptions**: Invalid inputs return `NaN` rather than throwing errors, enabling graceful error handling
- **Array.sort Compatible**: The return values (`-1`, `0`, `1`) are directly compatible with JavaScript's `Array.sort()` method

## Use Cases

- **Array Sorting**: Sort arrays of dates in either ascending or descending chronological order. The function's return signature is specifically designed to work seamlessly with JavaScript's native `Array.sort()` method.
- **Custom Ordering Logic**: Implement custom date ordering in data structures or UI components where chronological sorting is needed. Particularly useful when building calendars, timelines, or event lists.
- **Date Prioritization**: Determine which of two dates should take precedence in scheduling, expiration logic, or timestamp-based operations. The configurable order allows flexible priority schemes.
- **Temporal Relationships**: Establish the temporal relationship between two dates or events, enabling conditional logic based on chronological ordering. Useful for deadline checking, event sequencing, and time-based workflows.

## Usage Examples

### Array Sorting (Ascending)

```typescript
import { compare } from 'chronia';

const dates = [
  new Date('2024-03-15'),
  new Date('2024-01-10'),
  new Date('2024-02-20')
];

// Sort in ascending order (oldest to newest)
dates.sort(compare);
// Results in: [2024-01-10, 2024-02-20, 2024-03-15]

// Or explicitly specify ascending order
dates.sort((a, b) => compare(a, b, { order: 'ASC' }));
// Results in: [2024-01-10, 2024-02-20, 2024-03-15]
```

### Array Sorting (Descending)

```typescript
import { compare } from 'chronia';

const timestamps = [
  new Date('2024-01-01').getTime(),
  new Date('2024-12-31').getTime(),
  new Date('2024-06-15').getTime()
];

// Sort in descending order (newest to oldest)
timestamps.sort((a, b) => compare(a, b, { order: 'DESC' }));
// Results in: [2024-12-31, 2024-06-15, 2024-01-01]
```

### Basic Comparison

```typescript
import { compare } from 'chronia';

// Compare Date objects (ascending order by default)
compare(new Date('2024-01-01'), new Date('2024-01-02'));  // Returns: -1
compare(new Date('2024-01-02'), new Date('2024-01-01'));  // Returns: 1
compare(new Date('2024-01-01'), new Date('2024-01-01'));  // Returns: 0

// Compare with descending order
compare(new Date('2024-01-01'), new Date('2024-01-02'), { order: 'DESC' });  // Returns: 1
compare(new Date('2024-01-02'), new Date('2024-01-01'), { order: 'DESC' });  // Returns: -1
```

### Mixed Type Comparison

```typescript
import { compare } from 'chronia';

const date = new Date('2024-01-01');
const timestamp = new Date('2024-01-02').getTime();

// Compare Date object with timestamp
compare(date, timestamp);  // Returns: -1

// Compare timestamp with Date object
compare(timestamp, date);  // Returns: 1
```

### Date Prioritization

```typescript
import { compare } from 'chronia';

function getEarlierDeadline(deadline1: Date, deadline2: Date): Date {
  const result = compare(deadline1, deadline2);
  return result <= 0 ? deadline1 : deadline2;
}

function getLatestUpdate(update1: Date, update2: Date): Date {
  const result = compare(update1, update2, { order: 'DESC' });
  return result <= 0 ? update1 : update2;
}

// Usage
const earlier = getEarlierDeadline(
  new Date('2024-03-15'),
  new Date('2024-03-20')
);  // Returns: 2024-03-15

const latest = getLatestUpdate(
  new Date('2024-01-10'),
  new Date('2024-01-15')
);  // Returns: 2024-01-15
```

### Invalid Input Handling

```typescript
import { compare } from 'chronia';

// Invalid Date objects return NaN
compare(new Date('invalid'), new Date('2024-01-01'));  // Returns: NaN
compare(new Date('2024-01-01'), new Date('invalid'));  // Returns: NaN

// NaN inputs return NaN
compare(NaN, new Date('2024-01-01'));  // Returns: NaN

// Graceful handling in sorting
const mixedDates = [
  new Date('2024-01-01'),
  new Date('invalid'),
  new Date('2024-03-01')
];

// Filter invalid dates before sorting
const validDates = mixedDates.filter(d => !isNaN(compare(d, d)));
validDates.sort(compare);  // Sorts only valid dates
```
