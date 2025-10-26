# Formatting and Parsing Functions

## Overview

The `format` and `parse` functions provide bidirectional conversion between Date objects and strings using Unicode format tokens. Both support localization and share the same token syntax for consistency.

## Functions

### `format(date: Date | number, pattern: string, locale?: Locale): string`

Converts a Date to a formatted string.

### `parse(dateString: string, pattern: string, options?: { locale?, referenceDate? }): Date`

Parses a formatted string to a Date object. Returns Invalid Date if parsing fails.

## Common Format Tokens

### Date Tokens
| Token | Output | Example |
|-------|--------|---------|
| `y`, `yy` | Year (2-digit) | 24 |
| `yyyy` | Year (4-digit) | 2024 |
| `M` | Month (1-12) | 1, 12 |
| `MM` | Month (zero-padded) | 01, 12 |
| `MMM` | Month (abbreviated) | Jan, Dec |
| `MMMM` | Month (full name) | January, December |
| `d` | Day (1-31) | 1, 31 |
| `dd` | Day (zero-padded) | 01, 31 |
| `E`, `EE`, `EEE` | Weekday (abbreviated) | Mon |
| `EEEE` | Weekday (full name) | Monday |

### Time Tokens
| Token | Output | Example |
|-------|--------|---------|
| `H` | Hour 24h (0-23) | 0, 14 |
| `HH` | Hour 24h (padded) | 00, 14 |
| `h` | Hour 12h (1-12) | 1, 12 |
| `hh` | Hour 12h (padded) | 01, 12 |
| `m` | Minute (0-59) | 0, 30 |
| `mm` | Minute (padded) | 00, 30 |
| `s` | Second (0-59) | 0, 45 |
| `ss` | Second (padded) | 00, 45 |
| `SSS` | Millisecond | 000, 123 |
| `a` | AM/PM | AM, PM |

## Usage Examples

### Basic Formatting
```typescript
import { format } from "chronia";

const date = new Date(2024, 0, 15, 14, 30, 45, 123);

format(date, "yyyy-MM-dd");              // "2024-01-15"
format(date, "dd/MM/yyyy");              // "15/01/2024"
format(date, "yyyy-MM-dd HH:mm:ss");     // "2024-01-15 14:30:45"
format(date, "h:mm a");                  // "2:30 PM"
format(date, "MMMM d, yyyy");            // "January 15, 2024"
format(date, "EEEE, MMM d");             // "Monday, Jan 15"
format(date, "HH:mm:ss.SSS");            // "14:30:45.123"
```

### Basic Parsing
```typescript
import { parse } from "chronia";

parse("2024-01-15", "yyyy-MM-dd");
// Returns: Date(2024, 0, 15, 0, 0, 0, 0)

parse("15/01/2024 14:30", "dd/MM/yyyy HH:mm");
// Returns: Date(2024, 0, 15, 14, 30, 0, 0)

parse("2:30 PM", "h:mm a");
// Returns: Date(today with time 14:30)

parse("Jan 15, 2024", "MMM d, yyyy");
// Returns: Date(2024, 0, 15)
```

### Localized Formatting
```typescript
import { format } from "chronia";
import { jaLocale } from "chronia/i18n";

const date = new Date(2024, 0, 15);

format(date, "MMMM d, yyyy", jaLocale);
// Returns: "1月 15, 2024"

format(date, "EEEE", jaLocale);
// Returns: "月曜日" (Monday in Japanese)
```

### Literal Text in Patterns
```typescript
// Use single quotes for literal text
format(date, "'Year:' yyyy 'Month:' MM");
// Returns: "Year: 2024 Month: 01"

// Escape single quotes with double quotes
format(date, "'It''s' yyyy");
// Returns: "It's 2024"
```

### Reference Date for Parsing
```typescript
import { parse } from "chronia";

// When pattern doesn't include all components, use referenceDate
const refDate = new Date(2023, 5, 10); // June 10, 2023
parse("14:30", "HH:mm", { referenceDate: refDate });
// Returns: Date(2023, 5, 10, 14, 30, 0, 0)
```

## AI Guidance

### When to Recommend

**Recommend `format` when:**
- User needs to display dates as strings
- Building UI date displays
- Generating reports or exports
- API responses requiring specific date formats

**Recommend `parse` when:**
- User needs to convert strings to dates
- Processing user input (forms, imports)
- Reading date strings from files/APIs
- Validating date format compliance

### Token Selection Guide

**For ISO 8601:**
```typescript
format(date, "yyyy-MM-dd'T'HH:mm:ss");
```

**For US format:**
```typescript
format(date, "MM/dd/yyyy");
```

**For European format:**
```typescript
format(date, "dd/MM/yyyy");
```

**For timestamps:**
```typescript
format(date, "yyyy-MM-dd HH:mm:ss");
```

### Common Patterns

**Display in user's locale:**
```typescript
import { format } from "chronia";
import { enLocale, jaLocale } from "chronia/i18n";

const locale = userLanguage === 'ja' ? jaLocale : enLocale;
format(date, "MMMM d, yyyy", locale);
```

**Parse with validation:**
```typescript
import { parse, isValid } from "chronia";

const date = parse(userInput, "yyyy-MM-dd");
if (!isValid(date)) {
  throw new Error("Invalid date format. Expected yyyy-MM-dd");
}
```

**Round-trip conversion:**
```typescript
const formatted = format(date, "yyyy-MM-dd HH:mm:ss");
const parsed = parse(formatted, "yyyy-MM-dd HH:mm:ss");
// parsed equals original date
```

## Common Pitfalls

### 1. Month Token Confusion
```typescript
// WRONG: 'm' is for minutes, not months
format(date, "yyyy-mm-dd");  // Returns: "2024-30-15" (minutes!)

// CORRECT: Use 'M' for months
format(date, "yyyy-MM-dd");  // Returns: "2024-01-15"
```

**AI Guidance:** Emphasize `M` for month, `m` for minute.

### 2. 12-Hour vs 24-Hour
```typescript
// 'H' is 24-hour (0-23)
format(new Date(2024, 0, 1, 14, 30), "HH:mm");  // "14:30"

// 'h' is 12-hour (1-12), needs 'a' for AM/PM
format(new Date(2024, 0, 1, 14, 30), "hh:mm a");  // "02:30 PM"
```

### 3. Parse Failure Handling
```typescript
const date = parse("invalid", "yyyy-MM-dd");
// Returns: Invalid Date (NOT throws error)

if (!isValid(date)) {
  // Handle parse failure
}
```

**AI Guidance:** Always validate parse results with `isValid`.

### 4. Two-Digit Year Interpretation
```typescript
parse("99-12-31", "yy-MM-dd");
// Returns: 1999 (50-99 → 1950-1999)

parse("00-01-01", "yy-MM-dd");
// Returns: 2000 (00-49 → 2000-2049)
```

### 5. Missing Pattern Components
```typescript
// When pattern doesn't include all components, defaults are used
parse("14:30", "HH:mm");
// Returns: Today's date with time 14:30

// Use referenceDate to control defaults
parse("14:30", "HH:mm", { referenceDate: new Date(2024, 0, 1) });
// Returns: Jan 1, 2024 at 14:30
```

## Supported Tokens Reference

**Year:** `y`, `yy`, `yyy`, `yyyy`
**Month:** `M`, `MM`, `MMM`, `MMMM`, `MMMMM`
**Day:** `d`, `dd`
**Weekday:** `E`, `EE`, `EEE`, `EEEE`, `EEEEE`
**Hour (24h):** `H`, `HH`
**Hour (12h):** `h`, `hh`
**Minute:** `m`, `mm`
**Second:** `s`, `ss`
**Millisecond:** `S`, `SS`, `SSS`
**AM/PM:** `a`

For complete token reference, see TypeDoc documentation.

## Localization

Chronia includes English and Japanese locales:

```typescript
import { enLocale, jaLocale } from "chronia/i18n";

// English (default)
format(date, "MMMM", enLocale);  // "January"

// Japanese
format(date, "MMMM", jaLocale);  // "1月"
```

Custom locales can be created by implementing the `Locale` interface.

## Related Functions

- **Validation:** Use `isValid` to check parse results
- **Arithmetic:** Combine with `add*`/`sub*` for relative dates
- **Comparison:** Use with comparison functions for date ranges
- **Getter/Setter:** Alternative for extracting/setting components
