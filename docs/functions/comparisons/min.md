# min

## Overview

The `min` function returns the earliest (minimum) date from a given set of dates or timestamps. It provides a simple and reliable way to find the minimum value among multiple date values in Chronia's consistent API surface.

## Signature

```typescript
function min(...dates: DateInput[]): Date;
```

## Parameters

| Parameter  | Type          | Description                                                                                                               |
| ---------- | ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `...dates` | `DateInput[]` | One or more Date objects, numeric timestamps, or ISO 8601 strings to compare. Accepts any number of arguments (variadic). |

## Return Value

| Type   | Description                                                                                                                                                                |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Date` | Returns a new Date object representing the earliest date among the inputs. Returns Invalid Date (`new Date(NaN)`) if any input is invalid or if no arguments are provided. |

## Description

The `min` function determines which date among the provided arguments represents the earliest point in time. It accepts a flexible combination of Date objects and numeric timestamps, making it versatile for various date comparison scenarios.

### Specification

#### Returns a valid Date representing the earliest date when:

- One or more valid Date objects are provided
- One or more finite numeric timestamps are provided (positive, zero, or negative)
- A mix of valid Date objects and numeric timestamps are provided
- All inputs represent valid dates/times

#### Returns Invalid Date (`new Date(NaN)`) when:

- No arguments are provided (empty call: `min()`)
- Any of the input dates is an Invalid Date object (e.g., `new Date('invalid')`)
- Any of the input timestamps is `NaN`
- Any of the input timestamps is `Infinity` or `-Infinity`

### Behavior Notes

- Returns a **new Date object** rather than a reference to one of the input dates, ensuring immutability
- Performs **fail-fast validation**: immediately returns Invalid Date if any single input is invalid, without comparing remaining dates
- Accepts **variadic arguments** (`...dates`), allowing flexible usage with any number of dates
- Internally converts all numeric timestamps to Date objects for consistent comparison
- Uses `getTime()` for comparison, ensuring accurate timestamp-based ordering
- Type-safe with TypeScript, accepting only `Date | number` arguments
- No mutation of input dates; all inputs remain unchanged

## Use Cases

- **Finding Earliest Events**: Determine the earliest date from a collection of event dates, deadlines, or timestamps. Useful in scheduling applications, project management tools, or event planning systems.
- **Date Range Validation**: Find the start boundary of a date range by comparing multiple potential start dates. Particularly useful when merging date ranges or determining the earliest possible start time.
- **Historical Data Analysis**: Identify the oldest timestamp in a dataset for historical analysis, audit logs, or time-series data processing.
- **Deadline Management**: Determine the most urgent deadline from multiple tasks or projects by finding the earliest due date.
- **Data Aggregation**: Compute minimum dates when aggregating temporal data from multiple sources, such as finding the earliest record creation time across distributed systems.

## Usage Examples

### Finding Earliest Events

```typescript
import { min } from "chronia";

// Compare multiple event dates
const event1 = new Date(2024, 5, 15); // June 15, 2024
const event2 = new Date(2024, 5, 10); // June 10, 2024
const event3 = new Date(2024, 5, 20); // June 20, 2024
const earliestEvent = min(event1, event2, event3);
// Returns: Date object for June 10, 2024

// Mixed Date objects and timestamps
const eventDate = new Date(2024, 5, 15);
const eventTimestamp = 1718409600000; // June 15, 2024, 00:00:00 UTC
const earliest = min(eventDate, eventTimestamp, Date.now());
// Returns: The earliest among the three dates
```

### Date Range Validation

```typescript
import { min } from "chronia";

// Find the earliest start date for a merged range
function mergeRanges(range1: { start: Date }, range2: { start: Date }) {
  return {
    start: min(range1.start, range2.start),
  };
}

const range1 = { start: new Date(2024, 0, 1) };
const range2 = { start: new Date(2024, 0, 15) };
const merged = mergeRanges(range1, range2);
// Returns: { start: Date object for Jan 1, 2024 }
```

### Historical Data Analysis

```typescript
import { min } from "chronia";

// Find the oldest record in a dataset
interface Record {
  id: string;
  createdAt: Date;
}

function findOldestRecord(records: Record[]): Date | null {
  if (records.length === 0) return null;

  const dates = records.map((r) => r.createdAt);
  return min(...dates);
}

const records = [
  { id: "1", createdAt: new Date(2024, 0, 15) },
  { id: "2", createdAt: new Date(2024, 0, 5) },
  { id: "3", createdAt: new Date(2024, 0, 10) },
];
const oldest = findOldestRecord(records);
// Returns: Date object for Jan 5, 2024
```

### Deadline Management

```typescript
import { min } from "chronia";

// Find the most urgent deadline
interface Task {
  name: string;
  dueDate: Date;
}

function getNextDeadline(tasks: Task[]): Date | null {
  if (tasks.length === 0) return null;

  const dueDates = tasks.map((t) => t.dueDate);
  return min(...dueDates);
}

const tasks = [
  { name: "Project A", dueDate: new Date(2024, 6, 1) },
  { name: "Project B", dueDate: new Date(2024, 5, 25) },
  { name: "Project C", dueDate: new Date(2024, 6, 15) },
];
const nextDeadline = getNextDeadline(tasks);
// Returns: Date object for June 25, 2024
```

### Data Aggregation

```typescript
import { min } from "chronia";

// Aggregate minimum dates from multiple sources
const serverLogs = [
  { timestamp: 1718409600000 },
  { timestamp: 1718496000000 },
  { timestamp: 1718323200000 },
];

const timestamps = serverLogs.map((log) => log.timestamp);
const earliestLog = min(...timestamps);
// Returns: Date object for the earliest timestamp

// Handle invalid dates gracefully
const validDate = new Date(2024, 5, 15);
const invalidDate = new Date("invalid");
const result = min(validDate, invalidDate);
// Returns: Invalid Date (new Date(NaN))

// Single date comparison
const singleDate = new Date(2024, 5, 15);
const result2 = min(singleDate);
// Returns: New Date object for June 15, 2024

// Empty call
const empty = min();
// Returns: Invalid Date (new Date(NaN))
```
