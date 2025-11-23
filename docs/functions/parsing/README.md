# Date Parsing Functions

## Overview

Chronia provides a powerful and flexible date parsing system that converts date strings into Date objects using customizable format patterns. The parsing functions support Unicode format tokens (matching those used in formatting), localization, reference dates for missing components, and comprehensive error handling that never throws exceptions. This makes it ideal for user input validation, API data processing, and file import/export workflows.

## Available Functions

### String to Date Parsing

| Function | Description |
|----------|-------------|
| [`parse`](./parse.md) | Parses a date string into a Date object according to a specified format pattern |

## Common Features

All parsing functions in this category share the following characteristics:

### Unicode Format Token Support

The `parse` function uses the same Unicode format tokens as the `format` function, ensuring consistency and predictable round-trip conversions between Date objects and strings:

```typescript
import { parse, format } from 'chronia';

const pattern = "yyyy-MM-dd HH:mm:ss";
const original = new Date(2024, 0, 15, 14, 30, 45);

// Format to string
const formatted = format(original, pattern);
// Returns: "2024-01-15 14:30:45"

// Parse back to Date
const parsed = parse(formatted, pattern);
// Returns: Date(2024, 0, 15, 14, 30, 45)

// Verify round-trip equality
original.getTime() === parsed.getTime();  // true
```

**Supported Token Categories:**
- **Year**: `y`, `yy`, `yyy`, `yyyy`
- **Month**: `M`, `MM`, `MMM`, `MMMM`, `MMMMM`
- **Day**: `d`, `dd`
- **Hour**: `H`, `HH` (24-hour), `h`, `hh` (12-hour)
- **Minute**: `m`, `mm`
- **Second**: `s`, `ss`
- **Millisecond**: `S`, `SS`, `SSS`
- **Day Period**: `a`, `aa`, `aaa`, `aaaa`, `aaaaa` (AM/PM)
- **Era**: `G`, `GG`, `GGG`, `GGGG`, `GGGGG` (AD/BC)
- **Weekday**: `E`, `EE`, `EEE`, `EEEE`, `EEEEE`
- **Day of Year**: `D`, `DD`, `DDD`

### Pattern Matching

Patterns must exactly match the input string structure, including delimiters, spacing, and literal text:

```typescript
import { parse } from 'chronia';

// Exact match required
parse("2024-01-15", "yyyy-MM-dd");           // ✓ Valid
parse("2024-01-15", "yyyy/MM/dd");           // ✗ Invalid (delimiter mismatch)
parse("2024-01-15extra", "yyyy-MM-dd");      // ✗ Invalid (extra characters)

// Literal text in patterns (enclosed in single quotes)
parse("Year 2024, Month 01", "'Year' yyyy', Month' MM");  // ✓ Valid
parse("2024-01-15T14:30:00", "yyyy-MM-dd'T'HH:mm:ss");    // ✓ Valid

// Escaped single quote (two single quotes)
parse("It's 2024", "'It''s' yyyy");          // ✓ Valid
```

### Flexible Input Formats

The parser supports various date string formats commonly found in different regional conventions and data sources:

```typescript
import { parse } from 'chronia';

// ISO 8601 format
parse("2024-01-15", "yyyy-MM-dd");

// US format (MM/dd/yyyy)
parse("01/15/2024", "MM/dd/yyyy");

// European format (dd.MM.yyyy)
parse("15.01.2024", "dd.MM.yyyy");

// Variable padding (single or double digits)
parse("1/5/2024", "M/d/yyyy");

// With time components
parse("15/01/2024 14:30", "dd/MM/yyyy HH:mm");
parse("01/15/2024 2:30 PM", "MM/dd/yyyy h:mm a");
```

### Localization Support

Parse date strings containing localized month names, weekday names, and day periods:

```typescript
import { parse } from 'chronia';
import { enUS } from 'chronia/locale/en-US';
import { ja } from 'chronia/locale/ja';

// English month names
parse("January 15, 2024", "MMMM dd, yyyy", { locale: enUS });

// Japanese date format
parse("2024年1月15日", "yyyy'年'M'月'd'日'", { locale: ja });

// Localized day periods (AM/PM)
parse("2:30 PM", "h:mm a", { locale: enUS });
```

### Reference Date for Missing Components

When the pattern doesn't specify certain date components, the parser uses values from a reference date (defaults to current date):

```typescript
import { parse } from 'chronia';

// Time only - uses current date
const time = parse("14:30", "HH:mm");
// Returns: Date with today's date, time set to 14:30:00

// Specific reference date
const refDate = new Date(2023, 5, 10);  // June 10, 2023
const partial = parse("14:30", "HH:mm", { referenceDate: refDate });
// Returns: Date(2023, 5, 10, 14, 30, 0, 0)

// Month and day only - uses year from reference date
parse("01-15", "MM-dd", { referenceDate: refDate });
// Returns: Date(2023, 0, 15, 0, 0, 0, 0)
```

**Default Values for Missing Components:**
- **Year, Month, Day**: Taken from `referenceDate` (or current date if not specified)
- **Hour, Minute, Second, Millisecond**: Default to `00:00:00.000`

### No-Exception Error Handling

The parser never throws exceptions. Instead, it returns an Invalid Date object when parsing fails, allowing developers to validate results using `isValid()`:

```typescript
import { parse, isValid } from 'chronia';

// Invalid input returns Invalid Date
const invalid = parse("not-a-date", "yyyy-MM-dd");
// Returns: Invalid Date (isNaN(invalid.getTime()) === true)

// Validation pattern
function parseUserInput(input: string): Date | null {
  const parsed = parse(input, "yyyy-MM-dd");
  return isValid(parsed) ? parsed : null;
}

const result = parseUserInput("2024-01-15");
if (result) {
  console.log("Valid date:", result);
} else {
  console.log("Invalid date");
}
```

**Parsing Fails When:**
- Input string doesn't match pattern structure
- Parsed values are out of valid ranges (e.g., month 13, day 32)
- Literal text in pattern doesn't match input
- Extra characters exist after expected input
- Pattern contains unsupported tokens
- Required components for 12-hour format are missing

### Validation and Range Checking

The parser automatically validates parsed values to ensure they represent valid dates:

```typescript
import { parse, isValid } from 'chronia';

// Out of range values return Invalid Date
parse("2024-13-01", "yyyy-MM-dd");   // Invalid (month 13)
parse("2024-01-32", "yyyy-MM-dd");   // Invalid (day 32)
parse("2024-02-30", "yyyy-MM-dd");   // Invalid (Feb 30)
parse("2024-01-01 25:00", "yyyy-MM-dd HH:mm");  // Invalid (hour 25)

// Always validate after parsing
const date = parse("2024-02-30", "yyyy-MM-dd");
if (!isValid(date)) {
  console.log("Invalid date: February 30 does not exist");
}
```

## Choosing the Right Format Pattern

### Common Format Patterns

| Pattern | Example Input | Description |
|---------|---------------|-------------|
| `"yyyy-MM-dd"` | `"2024-01-15"` | ISO 8601 date (recommended for APIs) |
| `"MM/dd/yyyy"` | `"01/15/2024"` | US date format |
| `"dd/MM/yyyy"` | `"15/01/2024"` | European date format |
| `"yyyy-MM-dd HH:mm:ss"` | `"2024-01-15 14:30:45"` | ISO 8601 datetime |
| `"dd/MM/yyyy HH:mm"` | `"15/01/2024 14:30"` | European datetime |
| `"MM/dd/yyyy h:mm a"` | `"01/15/2024 2:30 PM"` | US datetime with AM/PM |
| `"MMMM dd, yyyy"` | `"January 15, 2024"` | Long date format (English) |
| `"yyyy-MM-dd'T'HH:mm:ss.SSS"` | `"2024-01-15T14:30:45.123"` | ISO 8601 with milliseconds |
| `"HH:mm:ss"` | `"14:30:45"` | Time only |
| `"yyyy-DDD"` | `"2024-032"` | Year and day of year |

### Pattern Selection Guidelines

**For API Responses:**
- Use ISO 8601 formats: `"yyyy-MM-dd"` or `"yyyy-MM-dd'T'HH:mm:ss"`
- Predictable, unambiguous, internationally recognized
- Easy round-trip with `format()` function

**For User Input:**
- Match regional conventions (US: `MM/dd/yyyy`, Europe: `dd/MM/yyyy`)
- Consider flexible patterns (e.g., `M/d/yyyy` accepts both `1/5/2024` and `01/05/2024`)
- Validate with `isValid()` after parsing

**For File Imports:**
- Match the exact format in the source files
- Use literal text for fixed delimiters: `"yyyy'-'MM'-'dd"`
- Handle both padded and unpadded values when possible

**For Legacy Systems:**
- Match legacy format exactly
- Use reference dates when components are missing
- Test edge cases thoroughly

## Use Case Guide

| Scenario | Pattern Example | Notes |
|----------|----------------|-------|
| Parse ISO 8601 dates | `"yyyy-MM-dd"` | Standard API format |
| Parse US form input | `"MM/dd/yyyy"` | Common in US applications |
| Parse European dates | `"dd.MM.yyyy"` or `"dd/MM/yyyy"` | Common in European applications |
| Parse log timestamps | `"yyyy-MM-dd HH:mm:ss"` | Common in server logs |
| Parse user-friendly dates | `"MMMM dd, yyyy"` | Requires locale for month names |
| Parse 12-hour time | `"h:mm a"` | Must include day period token |
| Parse time only | `"HH:mm:ss"` | Uses current date or reference date |
| Parse day of year | `"yyyy-DDD"` | Useful for scientific data |
| Parse with timezone (T separator) | `"yyyy-MM-dd'T'HH:mm:ss"` | ISO 8601 format |

## Common Patterns

### Input Validation and Error Handling

```typescript
import { parse, isValid } from 'chronia';

function parseAndValidate(input: string, pattern: string): Date {
  const parsed = parse(input, pattern);

  if (!isValid(parsed)) {
    throw new Error(`Invalid date format. Expected: ${pattern}`);
  }

  return parsed;
}

// Usage
try {
  const date = parseAndValidate("2024-01-15", "yyyy-MM-dd");
  console.log("Parsed successfully:", date);
} catch (error) {
  console.error(error.message);
}
```

### Multi-Format Parsing

```typescript
import { parse, isValid } from 'chronia';

function parseFlexibleDate(input: string): Date | null {
  const patterns = [
    "yyyy-MM-dd",
    "MM/dd/yyyy",
    "dd/MM/yyyy",
    "dd.MM.yyyy",
    "MMMM dd, yyyy",
  ];

  for (const pattern of patterns) {
    const parsed = parse(input, pattern);
    if (isValid(parsed)) {
      return parsed;
    }
  }

  return null;  // No format matched
}

// Accepts various formats
parseFlexibleDate("2024-01-15");        // ISO format
parseFlexibleDate("01/15/2024");        // US format
parseFlexibleDate("15.01.2024");        // European format
parseFlexibleDate("January 15, 2024");  // Long format
```

### Form Input Normalization

```typescript
import { parse, isValid, format } from 'chronia';

function normalizeUserDate(input: string, inputFormat: string): string | null {
  const parsed = parse(input, inputFormat);

  if (!isValid(parsed)) {
    return null;
  }

  // Always output in ISO format
  return format(parsed, "yyyy-MM-dd");
}

// Convert various formats to standard ISO format
normalizeUserDate("01/15/2024", "MM/dd/yyyy");
// Returns: "2024-01-15"

normalizeUserDate("15.01.2024", "dd.MM.yyyy");
// Returns: "2024-01-15"

normalizeUserDate("invalid", "yyyy-MM-dd");
// Returns: null
```

### API Response Processing

```typescript
import { parse, isValid } from 'chronia';

interface ApiRecord {
  id: string;
  createdAt: string;  // Format: "dd/MM/yyyy HH:mm:ss"
  updatedAt: string;
}

function parseApiRecord(record: ApiRecord) {
  const pattern = "dd/MM/yyyy HH:mm:ss";
  const created = parse(record.createdAt, pattern);
  const updated = parse(record.updatedAt, pattern);

  if (!isValid(created) || !isValid(updated)) {
    throw new Error("Invalid date format in API response");
  }

  return {
    id: record.id,
    createdAt: created,
    updatedAt: updated,
  };
}
```

### CSV Import with Date Columns

```typescript
import { parse, isValid } from 'chronia';

interface CsvRow {
  name: string;
  date: string;  // Format: "MM/dd/yyyy"
  amount: number;
}

function parseCsvRow(row: CsvRow) {
  const date = parse(row.date, "MM/dd/yyyy");

  if (!isValid(date)) {
    console.warn(`Invalid date in row: ${row.name}`);
    return null;
  }

  return {
    name: row.name,
    date,
    amount: row.amount,
  };
}

// Process CSV data
const csvData = [
  { name: "Transaction 1", date: "01/15/2024", amount: 100 },
  { name: "Transaction 2", date: "01/20/2024", amount: 200 },
];

const parsed = csvData.map(parseCsvRow).filter(Boolean);
```

### Time-Only Parsing with Context

```typescript
import { parse, format } from 'chronia';

function parseAppointmentTime(
  timeStr: string,
  appointmentDate: Date
): Date {
  // Parse time using appointment date as reference
  return parse(timeStr, "HH:mm", { referenceDate: appointmentDate });
}

// Usage
const appointmentDate = new Date(2024, 0, 15);  // Jan 15, 2024
const appointment = parseAppointmentTime("14:30", appointmentDate);
// Returns: Date(2024, 0, 15, 14, 30, 0, 0)

console.log(format(appointment, "yyyy-MM-dd HH:mm"));
// Output: "2024-01-15 14:30"
```

### Localized Date Parsing

```typescript
import { parse, isValid } from 'chronia';
import { enUS } from 'chronia/locale/en-US';
import { ja } from 'chronia/locale/ja';
import { de } from 'chronia/locale/de';

function parseLocalizedDate(
  dateStr: string,
  pattern: string,
  locale: Locale
): Date | null {
  const parsed = parse(dateStr, pattern, { locale });
  return isValid(parsed) ? parsed : null;
}

// English
parseLocalizedDate("January 15, 2024", "MMMM dd, yyyy", enUS);

// Japanese
parseLocalizedDate("2024年1月15日", "yyyy'年'M'月'd'日'", ja);

// German
parseLocalizedDate("15. Januar 2024", "dd. MMMM yyyy", de);
```

### Batch Date Parsing

```typescript
import { parse, isValid } from 'chronia';

function parseBatchDates(
  dateStrings: string[],
  pattern: string
): { valid: Date[]; invalid: string[] } {
  const valid: Date[] = [];
  const invalid: string[] = [];

  for (const dateStr of dateStrings) {
    const parsed = parse(dateStr, pattern);
    if (isValid(parsed)) {
      valid.push(parsed);
    } else {
      invalid.push(dateStr);
    }
  }

  return { valid, invalid };
}

// Process batch of date strings
const dates = ["2024-01-15", "2024-02-30", "2024-03-20", "invalid"];
const result = parseBatchDates(dates, "yyyy-MM-dd");

console.log(`Valid: ${result.valid.length}, Invalid: ${result.invalid.length}`);
// Output: Valid: 2, Invalid: 2
```

### Round-Trip Conversion Testing

```typescript
import { parse, format } from 'chronia';

function testRoundTrip(date: Date, pattern: string): boolean {
  const formatted = format(date, pattern);
  const parsed = parse(formatted, pattern);
  return date.getTime() === parsed.getTime();
}

// Verify pattern preserves date information
const date = new Date(2024, 0, 15, 14, 30, 45, 123);

testRoundTrip(date, "yyyy-MM-dd HH:mm:ss.SSS");  // true
testRoundTrip(date, "yyyy-MM-dd HH:mm:ss");      // false (loses milliseconds)
testRoundTrip(date, "yyyy-MM-dd");               // false (loses time)
```

## Performance Considerations

- **Pattern Tokenization**: Occurs on every `parse()` call. For better performance when parsing many dates with the same pattern, consider caching the pattern string or processing dates in batches.
- **Locale Loading**: Locale data is loaded once and reused. Provide locale object in options for localized parsing.
- **Validation Overhead**: Input validation has minimal overhead. The parser validates early for fast-fail behavior on invalid inputs.
- **Reference Date**: Creating reference dates has negligible performance impact. Defaults to current date when not specified.
- **Error Handling**: No exception throwing means no try-catch overhead. Check validity with `isValid()` after parsing.

## Special Parsing Features

### Two-Digit Year Handling

The `yy` token implements a sliding window for two-digit years:

```typescript
import { parse } from 'chronia';

// 50-99 map to 1950-1999
parse("99-12-31", "yy-MM-dd");  // Date(1999, 11, 31)
parse("75-06-15", "yy-MM-dd");  // Date(1975, 5, 15)

// 00-49 map to 2000-2049
parse("00-01-01", "yy-MM-dd");  // Date(2000, 0, 1)
parse("25-06-15", "yy-MM-dd");  // Date(2025, 5, 15)

// Use yyyy for unambiguous years
parse("2099-12-31", "yyyy-MM-dd");  // Date(2099, 11, 31)
```

### 12-Hour Format Parsing

12-hour format requires both hour (`h`/`hh`) and day period (`a`) tokens:

```typescript
import { parse } from 'chronia';

// Valid 12-hour format
parse("2:30 PM", "h:mm a");      // 14:30 (2:30 PM)
parse("12:00 AM", "hh:mm a");    // 00:00 (midnight)
parse("12:00 PM", "hh:mm a");    // 12:00 (noon)

// Day period is case-insensitive
parse("2:30 pm", "h:mm a");      // 14:30
parse("2:30 PM", "h:mm a");      // 14:30

// Missing day period returns Invalid Date
parse("2:30", "h:mm");           // Invalid (no day period for 12-hour)
```

### Day of Year Parsing

Parse dates using day-of-year notation:

```typescript
import { parse, format } from 'chronia';

// Day 32 = February 1st
const date1 = parse("2024-032", "yyyy-DDD");
format(date1, "yyyy-MM-dd");  // "2024-02-01"

// Day 366 in leap year
const date2 = parse("2024-366", "yyyy-DDD");
format(date2, "yyyy-MM-dd");  // "2024-12-31"

// Day 366 in non-leap year (invalid)
parse("2023-366", "yyyy-DDD");  // Invalid Date
```

### Era (BC/AD) Parsing

Parse dates with BC/AD era indicators:

```typescript
import { parse } from 'chronia';

// AD years
parse("2024 AD", "yyyy G");  // Date(2024, 0, 1)

// BC years (negative year numbers)
parse("100 BC", "yyyy G");   // Date(-99, 0, 1) - Year 100 BC
```

## Error Handling

All parsing operations return Invalid Date objects instead of throwing exceptions:

```typescript
import { parse, isValid } from 'chronia';

// Pattern mismatch
const invalid1 = parse("2024-01-15", "MM/dd/yyyy");
isValid(invalid1);  // false

// Out of range values
const invalid2 = parse("2024-13-01", "yyyy-MM-dd");
isValid(invalid2);  // false

// Extra characters
const invalid3 = parse("2024-01-15extra", "yyyy-MM-dd");
isValid(invalid3);  // false

// Invalid input
const invalid4 = parse("not-a-date", "yyyy-MM-dd");
isValid(invalid4);  // false

// Safe validation pattern
function safeParse(input: string, pattern: string): Date | null {
  const parsed = parse(input, pattern);
  return isValid(parsed) ? parsed : null;
}
```

## Type Definitions

```typescript
interface Locale {
  months: {
    abbreviated: string[];
    wide: string[];
    narrow: string[];
  };
  weekdays: {
    abbreviated: string[];
    wide: string[];
    narrow: string[];
  };
  dayPeriods: {
    am: string;
    pm: string;
    narrow: { am: string; pm: string };
  };
  eras: {
    abbreviated: string[];
    wide: string[];
    narrow: string[];
  };
}

interface ParseOptions {
  locale?: Locale;
  referenceDate?: Date;
}
```

## See Also

- [Date Formatting](../formatting/) - Format Date objects into strings
- [Date Validation](../validations/) - Validate dates with `isValid()`
- [Chronia Types](../../types.md) - Type definitions used across the library
- [Locale Support](../../locale.md) - Localization options and locale objects
