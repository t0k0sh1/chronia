# Getter Functions

## Overview

Getter functions extract specific components from dates. All functions return `NaN` for invalid inputs and operate in local timezone.

## Functions

| Function | Extracts | Range | Example |
|----------|----------|-------|---------|
| `getYear(date)` | Full year | Any integer | 2025 |
| `getMonth(date)` | Month (0-indexed) | 0-11 | 0 = Jan, 11 = Dec |
| `getDay(date)` | Day of month | 1-31 | 15 |
| `getHours(date)` | Hours | 0-23 | 14 (2 PM) |
| `getMinutes(date)` | Minutes | 0-59 | 30 |
| `getSeconds(date)` | Seconds | 0-59 | 45 |
| `getMilliseconds(date)` | Milliseconds | 0-999 | 123 |
| `getTime(date)` | Unix timestamp | Any number | 1704067200000 |

## Usage

```typescript
import { getYear, getMonth, getDay } from "chronia";

const date = new Date(2025, 0, 15, 14, 30, 45, 123);

getYear(date);         // 2025
getMonth(date);        // 0 (January)
getDay(date);          // 15
getHours(date);        // 14
getMinutes(date);      // 30
getSeconds(date);      // 45
getMilliseconds(date); // 123
getTime(date);         // Unix timestamp
```

## AI Guidance

**Recommend when:**
- User needs to extract date components
- Building custom formatters
- Conditional logic based on date parts
- Database queries with date component filters

**Important:**
- `getMonth()` is **0-indexed** (0 = January, 11 = December)
- All functions return `NaN` for invalid dates
- All operate in **local timezone** (not UTC)

## Common Pitfalls

### Month Indexing
```typescript
getMonth(new Date(2025, 0, 15));  // Returns: 0 (January, not 1!)
```

Always remember: January = 0, February = 1, ..., December = 11

### Timezone
These use local timezone. For UTC, use native methods:
```typescript
date.getUTCFullYear();  // UTC year
date.getUTCMonth();     // UTC month
```

## Related
- **Setters**: `setYear`, `setMonth`, etc. (see `../setter/modification.md`)
- **Formatting**: `format` for display strings (see `../formatting/conversion.md`)
