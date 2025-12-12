# truncSecond

## Overview

The `truncSecond` function truncates a date to the start of the second by setting milliseconds to 0 while preserving all other time components. This provides a clean way to remove subsecond precision from dates in Chronia's consistent API surface.

## Signature

```typescript
function truncSecond(date: DateInput): Date;
```

## Parameters

| Parameter | Type        | Description                                                                                 |
| --------- | ----------- | ------------------------------------------------------------------------------------------- |
| `date`    | `DateInput` | A Date object, numeric timestamp, or ISO 8601 string to truncate to the start of the second |

## Return Value

| Type   | Description                                                                                                             |
| ------ | ----------------------------------------------------------------------------------------------------------------------- |
| `Date` | A new Date object truncated to the start of the second (milliseconds set to 0), or Invalid Date if the input is invalid |

## Description

The `truncSecond` function removes all time components below the second level by setting the milliseconds to 0. This is useful when you need second-level precision without subsecond granularity. The function always returns a new Date instance without mutating the input.

### Specification

#### Returns a valid Date when:

- The argument is a valid `Date` object (not Invalid Date)
- The argument is a finite numeric timestamp, including:
  - Positive timestamps (dates after Unix epoch)
  - Zero (`0`, representing January 1, 1970, 00:00:00.000 UTC)
  - Negative timestamps (dates before Unix epoch)
- The returned Date has:
  - Same year, month, day, hour, minute, and second as input
  - Milliseconds set to `0`

#### Returns Invalid Date when:

- The argument is an Invalid Date object (e.g., `new Date('invalid')`)
- The argument is `NaN`
- The argument is `Infinity`
- The argument is `-Infinity`

### Behavior Notes

- Validates input before processing using Chronia's internal validation utilities
- Always returns a new Date instance (immutable operation - does not mutate input)
- No exceptions are thrown; invalid values return Invalid Date
- Works correctly across all 60 seconds of any minute
- Type-safe with TypeScript, accepting only `Date | number`
- Consistent with other Chronia truncation functions (`truncYear`, `truncMonth`, `truncDay`, `truncHour`, `truncMinute`)

## Use Cases

- **Timestamp Normalization**: Remove subsecond precision from timestamps when second-level granularity is sufficient. Useful for comparing events that should be grouped by second or when subsecond precision is noise.
- **Database Storage**: Prepare dates for storage in databases that don't support millisecond precision. Ensures consistent data representation across systems with varying timestamp precision capabilities.
- **Time-based Grouping**: Group events or data points by second for aggregation or analysis. Particularly useful in logging, metrics collection, and time-series data processing.
- **Precision Reduction**: Intentionally reduce date precision to avoid false precision in calculations or displays. Helps prevent misleading precision when subsecond accuracy is not meaningful or available.

## Usage Examples

### Timestamp Normalization

```typescript
import { truncSecond } from "chronia";

// Remove milliseconds from a date
const dateWithMs = new Date(2024, 5, 15, 14, 30, 45, 123);
const normalized = truncSecond(dateWithMs);
// Returns: June 15, 2024 14:30:45.000

// Already at start of second (no change)
const exactSecond = new Date(2024, 5, 15, 14, 30, 45, 0);
const result = truncSecond(exactSecond);
// Returns: June 15, 2024 14:30:45.000 (unchanged)

// Works with timestamps
const timestamp = Date.now(); // e.g., 1718462445789
const truncated = truncSecond(timestamp);
// Returns: Date at current second with 000 milliseconds
```

### Database Storage

```typescript
import { truncSecond } from "chronia";

interface LogEntry {
  timestamp: Date;
  message: string;
}

function createLogEntry(message: string): LogEntry {
  // Truncate to second for consistency with database precision
  return {
    timestamp: truncSecond(new Date()),
    message,
  };
}

const log1 = createLogEntry("User logged in");
// Returns: { timestamp: Date (at XX:XX:XX.000), message: 'User logged in' }

// Preparing dates for systems without millisecond support
const userAction = {
  performedAt: truncSecond(new Date(2024, 5, 15, 14, 30, 45, 999)),
};
// Returns: { performedAt: June 15, 2024 14:30:45.000 }
```

### Time-based Grouping

```typescript
import { truncSecond } from "chronia";

interface Event {
  timestamp: Date;
  type: string;
}

function groupEventsBySecond(events: Event[]): Map<number, Event[]> {
  const groups = new Map<number, Event[]>();

  for (const event of events) {
    // Truncate to second to group events within same second
    const secondKey = truncSecond(event.timestamp).getTime();

    if (!groups.has(secondKey)) {
      groups.set(secondKey, []);
    }
    groups.get(secondKey)!.push(event);
  }

  return groups;
}

const events: Event[] = [
  { timestamp: new Date(2024, 5, 15, 14, 30, 45, 100), type: "click" },
  { timestamp: new Date(2024, 5, 15, 14, 30, 45, 500), type: "scroll" },
  { timestamp: new Date(2024, 5, 15, 14, 30, 46, 200), type: "click" },
];

const grouped = groupEventsBySecond(events);
// Returns: Map with 2 entries:
//   1718462445000 => [{ click event at .100 }, { scroll event at .500 }]
//   1718462446000 => [{ click event at .200 }]
```

### Precision Reduction

```typescript
import { truncSecond } from "chronia";

// Handle Invalid Date inputs gracefully
const invalidDate = new Date("invalid");
const result = truncSecond(invalidDate);
// Returns: Invalid Date

// Handle edge cases
truncSecond(NaN); // Returns: Invalid Date
truncSecond(Infinity); // Returns: Invalid Date

// End of second truncation
const endOfSecond = new Date(2024, 5, 15, 14, 30, 45, 999);
const truncated = truncSecond(endOfSecond);
// Returns: June 15, 2024 14:30:45.000 (999ms removed)

// Reduce precision for display purposes
function displayTimestamp(date: Date): string {
  const secondPrecision = truncSecond(date);
  return secondPrecision.toISOString();
}

displayTimestamp(new Date(2024, 5, 15, 14, 30, 45, 789));
// Returns: ISO string with .000Z ending
```
