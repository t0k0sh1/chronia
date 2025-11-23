# max

## Overview

The `max` function returns the latest (maximum) date from a given set of dates or timestamps. It provides a reliable way to find the most recent date in Chronia's consistent API surface.

## Signature

```typescript
function max(...dates: (Date | number)[]): Date
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `...dates` | `(Date \| number)[]` | One or more Date objects or numeric timestamps to compare |

## Return Value

| Type | Description |
|------|-------------|
| `Date` | Returns the latest date from the provided inputs, or an Invalid Date if any input is invalid or no arguments are provided |

## Description

The `max` function determines which of the provided dates or timestamps is the most recent and returns it as a Date object. It accepts a variadic number of arguments, allowing you to compare any number of dates in a single call. The function converts all numeric timestamps to Date objects internally before performing comparisons.

### Specification

#### Returns a valid `Date` when:
- One or more valid Date objects or timestamps are provided
- All inputs are valid dates or finite numeric timestamps
- The returned Date represents the chronologically latest point in time among the inputs

#### Returns an Invalid Date when:
- No arguments are provided (empty input)
- Any of the provided dates is an Invalid Date
- Any of the provided timestamps produces an Invalid Date (e.g., `NaN`, `Infinity`)

### Behavior Notes

- Short-circuit validation: If any input is invalid, the function immediately returns an Invalid Date without comparing the remaining values
- All numeric timestamps are converted to Date objects before comparison
- Returns a new Date object (not a reference to any input Date)
- Performance-optimized for comparing large sets of dates
- Type-safe with TypeScript, accepting only `Date | number` variadic arguments
- Comparison is based on millisecond timestamps using `getTime()`

## Use Cases

- **Date Range Calculation**: Find the end date in a collection of dates to establish boundaries for date ranges, reporting periods, or data analysis windows.
- **Latest Record Selection**: Identify the most recent timestamp when processing records, logs, or events to determine the latest activity or update in a system.
- **Validation and Bounds Checking**: Determine the maximum allowed date from a set of constraints or policies to enforce business rules or data integrity.
- **Time Series Analysis**: Find peak dates or the latest data point in time series data for trend analysis, forecasting, or data visualization.
- **Merge Operations**: Combine dates from multiple sources and select the most recent value, useful in data synchronization or conflict resolution scenarios.

## Usage Examples

### Date Range Calculation

```typescript
import { max } from 'chronia';

// Find the latest date to establish a range end
const startDates = [
  new Date(2024, 0, 1),   // January 1, 2024
  new Date(2024, 5, 15),  // June 15, 2024
  new Date(2024, 3, 10)   // April 10, 2024
];

const rangeEnd = max(...startDates);  // Returns: June 15, 2024

// With a single date
const singleDate = max(new Date(2024, 11, 31));  // Returns: December 31, 2024
```

### Latest Record Selection

```typescript
import { max } from 'chronia';

// Find the most recent update timestamp
const userUpdates = {
  profile: Date.now() - 86400000,  // 1 day ago
  settings: Date.now() - 3600000,  // 1 hour ago
  password: Date.now() - 604800000 // 1 week ago
};

const lastActivity = max(
  userUpdates.profile,
  userUpdates.settings,
  userUpdates.password
);  // Returns: most recent timestamp (settings)

// Mixed Date objects and timestamps
const lastModified = max(
  new Date(2024, 5, 1),
  1718409600000,
  new Date(2024, 5, 30)
);  // Returns: the latest among these dates
```

### Validation and Bounds Checking

```typescript
import { max } from 'chronia';

// Determine maximum allowed date
const systemConstraints = [
  new Date(2024, 11, 31),  // End of year
  new Date(2025, 2, 1),    // Fiscal year end
  new Date(2024, 6, 1)     // Mid-year checkpoint
];

const maxAllowedDate = max(...systemConstraints);  // Returns: March 1, 2025

// Invalid date handling
const invalidInput = max(
  new Date(2024, 5, 15),
  new Date('invalid'),
  new Date(2024, 5, 20)
);  // Returns: Invalid Date

// Empty input handling
const noInput = max();  // Returns: Invalid Date
```

### Time Series Analysis

```typescript
import { max } from 'chronia';

// Find the latest data point in a time series
const dataPoints = [
  { value: 100, timestamp: new Date(2024, 0, 1) },
  { value: 150, timestamp: new Date(2024, 3, 1) },
  { value: 120, timestamp: new Date(2024, 6, 1) }
];

const latestDataPoint = max(
  ...dataPoints.map(dp => dp.timestamp)
);  // Returns: July 1, 2024

// Working with numeric timestamps
const timestamps = [1704067200000, 1712016000000, 1719792000000];
const peakDate = max(...timestamps);  // Returns: latest timestamp as Date
```

### Merge Operations

```typescript
import { max } from 'chronia';

// Conflict resolution: choose the most recent version
interface Document {
  id: string;
  lastModified: Date;
  content: string;
}

function resolveConflict(local: Document, remote: Document): Document {
  const newerDate = max(local.lastModified, remote.lastModified);

  return newerDate.getTime() === local.lastModified.getTime()
    ? local
    : remote;
}

// Synchronization scenario
const localDoc = {
  id: '123',
  lastModified: new Date(2024, 5, 15, 10, 30),
  content: 'Local changes'
};

const remoteDoc = {
  id: '123',
  lastModified: new Date(2024, 5, 15, 14, 45),
  content: 'Remote changes'
};

const winner = resolveConflict(localDoc, remoteDoc);  // Returns: remoteDoc
```
