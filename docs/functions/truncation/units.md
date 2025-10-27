# Truncation Functions

## Overview

Truncation functions zero out time components below a specified unit. Used for normalizing dates to specific granularities.

## Functions

| Function | Zeros Out | Result Example |
|----------|-----------|----------------|
| `truncYear(date)` | Month, day, time | 2024-01-01 00:00:00.000 |
| `truncMonth(date)` | Day, time | 2024-06-01 00:00:00.000 |
| `truncDay(date)` | Time | 2024-06-15 00:00:00.000 |
| `truncHour(date)` | Minutes, seconds, ms | 2024-06-15 14:00:00.000 |
| `truncMinute(date)` | Seconds, ms | 2024-06-15 14:30:00.000 |
| `truncSecond(date)` | Milliseconds | 2024-06-15 14:30:45.000 |
| `truncMillisecond(date)` | Nothing (no-op) | Same as input |

## Usage

```typescript
import { truncDay, truncHour, truncMinute } from "chronia";

const date = new Date(2024, 5, 15, 14, 30, 45, 123);

truncDay(date);         // 2024-06-15 00:00:00.000
truncHour(date);        // 2024-06-15 14:00:00.000
truncMinute(date);      // 2024-06-15 14:30:00.000
truncSecond(date);      // 2024-06-15 14:30:45.000
truncMillisecond(date); // 2024-06-15 14:30:45.123 (unchanged)
```

## Common Patterns

### Grouping by Time Unit
```typescript
import { truncDay } from "chronia";

// Group events by day
const eventsByDay = events.reduce((acc, event) => {
  const key = truncDay(event.date).toISOString();
  acc[key] = acc[key] || [];
  acc[key].push(event);
  return acc;
}, {});
```

### Comparison at Granularity
```typescript
import { truncDay, isEqual } from "chronia";

// Check if two dates are on the same day
const sameDay = isEqual(
  truncDay(date1),
  truncDay(date2)
);

// Equivalent to:
isSameDay(date1, date2);
```

### Cache Keys
```typescript
import { truncHour } from "chronia";

// Hour-level cache key
const cacheKey = `data:${truncHour(now).getTime()}`;
```

## AI Guidance

**Recommend when:**
- User needs to normalize dates to specific granularity
- Grouping/bucketing by time unit
- Building cache keys
- Custom comparison logic

**Alternatives:**
- `startOf*` functions provide similar behavior for day/month/year
- `isEqual` with `{ unit }` option may be clearer than truncating + comparing

## Relationship to Other Functions

### vs. `startOf*`
```typescript
// These are equivalent:
truncDay(date);
startOfDay(date);

// truncYear is like startOfYear
// truncMonth is like startOfMonth
```

### Internal Usage
Many functions use truncation:
- `isEqual` with unit option
- `diff*` functions for unit-based calculations

## Common Pitfalls

### Month Indexing (for `truncYear`)
```typescript
truncYear(date);  // Always returns January 1 (month 0)
```

### Not the Same as Rounding
```typescript
// Truncation (floors)
truncHour(new Date(2024, 0, 1, 14, 59));
// Returns: 14:00:00 (not 15:00:00)
```

## Related
- **Boundary**: `startOf*`, `endOf*` (see `../boundary/periods.md`)
- **Comparison**: `isEqual` with `unit` option (see `../comparison/equality.md`)
- **Getter**: `get*` for extracting components (see `../getter/extraction.md`)
