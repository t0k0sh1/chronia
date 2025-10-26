# Boundary Functions

## Overview

Boundary functions return the start or end of a time period. All preserve timezone and return Invalid Date for invalid inputs.

## Functions

| Function | Returns | Time Set To |
|----------|---------|-------------|
| `startOfYear(date)` | Jan 1, 00:00:00.000 | Midnight |
| `endOfYear(date)` | Dec 31, 23:59:59.999 | Last millisecond |
| `startOfMonth(date)` | 1st day, 00:00:00.000 | Midnight |
| `endOfMonth(date)` | Last day, 23:59:59.999 | Last millisecond |
| `startOfDay(date)` | Same day, 00:00:00.000 | Midnight |
| `endOfDay(date)` | Same day, 23:59:59.999 | Last millisecond |

## Usage

```typescript
import { startOfDay, endOfDay, startOfMonth, endOfMonth } from "chronia";

const date = new Date(2024, 5, 15, 14, 30, 45);

startOfDay(date);   // 2024-06-15 00:00:00.000
endOfDay(date);     // 2024-06-15 23:59:59.999
startOfMonth(date); // 2024-06-01 00:00:00.000
endOfMonth(date);   // 2024-06-30 23:59:59.999
startOfYear(date);  // 2024-01-01 00:00:00.000
endOfYear(date);    // 2024-12-31 23:59:59.999
```

## Common Patterns

### Date Ranges
```typescript
import { startOfMonth, endOfMonth, isBetween } from "chronia";

const monthStart = startOfMonth(new Date());
const monthEnd = endOfMonth(new Date());

// Check if date is in current month
const isThisMonth = isBetween(
  someDate,
  { start: monthStart, end: monthEnd },
  { bounds: "[]" }
);
```

### Database Queries
```typescript
// Get all events today
const today = new Date();
const events = await db.events.findMany({
  where: {
    date: {
      gte: startOfDay(today),
      lte: endOfDay(today)
    }
  }
});
```

## AI Guidance

**Recommend when:**
- User mentions "beginning of", "end of", "first day", "last day"
- Building date range queries
- Calendar view boundaries
- Filtering by period (day/month/year)

**Combinations:**
- With `isBetween` for range checks
- With `format` for display
- With `diff*` for period lengths

## Common Pitfalls

### End-of-Period Precision
```typescript
endOfDay(date);  // Returns 23:59:59.999, not 24:00:00

// For exclusive upper bound:
startOfDay(addDays(date, 1));  // Next day 00:00:00
```

### Month/Year Boundaries
```typescript
endOfMonth(new Date(2024, 1, 15));  // Feb 29, 23:59:59.999 (leap year)
endOfMonth(new Date(2025, 1, 15));  // Feb 28, 23:59:59.999 (non-leap)
```

## Related
- **Truncation**: `truncDay`, `truncMonth`, etc. (see `../truncation/units.md`)
- **Comparison**: `isBetween` (see `../comparison/relational.md`)
- **Arithmetic**: `add*`, `sub*` for period navigation
