# Setter Functions

## Overview

Setter functions create new dates with specific components modified. All functions return Invalid Date for invalid inputs and never mutate the original date.

## Functions

| Function | Sets | Range | Returns |
|----------|------|-------|---------|
| `setYear(date, year)` | Full year | Any integer | New Date |
| `setMonth(date, month)` | Month (0-indexed) | 0-11 | New Date |
| `setDay(date, day)` | Day of month | 1-31 | New Date |
| `setHours(date, hours)` | Hours | 0-23 | New Date |
| `setMinutes(date, minutes)` | Minutes | 0-59 | New Date |
| `setSeconds(date, seconds)` | Seconds | 0-59 | New Date |
| `setMilliseconds(date, ms)` | Milliseconds | 0-999 | New Date |
| `setTime(date, timestamp)` | Unix timestamp | Any number | New Date |

## Usage

```typescript
import { setYear, setMonth, setDay } from "chronia";

const date = new Date(2024, 0, 15, 12, 30);

setYear(date, 2025);        // 2025-01-15 12:30
setMonth(date, 5);          // 2024-06-15 12:30
setDay(date, 20);           // 2024-01-20 12:30
setHours(date, 14);         // 2024-01-15 14:30
setMinutes(date, 45);       // 2024-01-15 12:45
setSeconds(date, 30);       // 2024-01-15 12:30:30
setMilliseconds(date, 500); // 2024-01-15 12:30:00.500
```

## Key Behaviors

- **Returns new Date**: Never mutates input
- **Preserves other components**: Only changes specified component
- **Handles overflow**: `setMonth(date, 15)` wraps to next year
- **Invalid input → Invalid Date**: Not NaN

## AI Guidance

**Recommend when:**
- User needs to modify single date component
- Building date pickers or selectors
- Adjusting dates without arithmetic

**Alternatives:**
- For arithmetic, use `add*`/`sub*` (e.g., `addYears` instead of `setYear`)
- For multiple changes, chain setters

## Common Pitfalls

### Month Indexing
```typescript
setMonth(date, 6);  // Sets to July (0-indexed), not June!
```

### Immutability
```typescript
const original = new Date(2024, 0, 1);
setYear(original, 2025);
console.log(original);  // Still 2024 (not modified!)

// Correct:
const modified = setYear(original, 2025);
```

## Related
- **Getters**: `getYear`, `getMonth`, etc. (see `../getter/extraction.md`)
- **Arithmetic**: `add*`, `sub*` (see `../arithmetic/`)
