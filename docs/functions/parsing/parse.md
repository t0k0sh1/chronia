# parse

## Overview

The `parse` function converts a date string into a Date object according to a specified format pattern. It uses Unicode format tokens (matching those used in `format()`) to parse date strings with support for localization, reference dates for missing components, and comprehensive error handling that returns Invalid Date objects instead of throwing exceptions.

## Signature

```typescript
function parse(
  dateString: string,
  pattern: string,
  options?: {
    locale?: Locale;
    referenceDate?: Date;
  }
): Date
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `dateString` | `string` | The date string to parse |
| `pattern` | `string` | The format pattern using Unicode tokens (e.g., `"yyyy-MM-dd HH:mm:ss"`) |
| `options` | `object` (optional) | Optional parsing configuration |
| `options.locale` | `Locale` (optional) | Localization object for parsing locale-specific text (month names, day periods, weekdays) |
| `options.referenceDate` | `Date` (optional) | Reference date for missing components (defaults to current date) |

## Return Value

| Type | Description |
|------|-------------|
| `Date` | Returns a valid `Date` object if parsing succeeds, or an Invalid Date object (with `NaN` time value) if parsing fails |

## Description

The `parse` function parses date strings using flexible format patterns with Unicode tokens, providing the inverse operation to `format()`. It validates arguments before processing, supports localized parsing, and handles missing date components by using a reference date. The function never throws exceptions, instead returning an Invalid Date object when parsing fails, allowing developers to check validity using `isValid()`.

### Specification

#### Returns valid `Date` object when:
- The `dateString` exactly matches the `pattern` structure
- All parsed values are within valid ranges (e.g., month 1-12, day 1-31)
- The pattern contains supported Unicode tokens
- Literal text in the pattern matches the corresponding positions in `dateString`
- No extra characters remain after parsing completes
- 12-hour format includes both hour token (`h`/`hh`) and day period token (`a`/`aa`/`aaa`/`aaaa`/`aaaaa`)

#### Returns Invalid Date object when:
- The `dateString` does not match the `pattern` structure
- Parsed values are out of valid ranges (e.g., month 13, day 32)
- Literal text in the pattern doesn't match the input string
- Extra characters exist after the expected end of the input
- The pattern contains unsupported tokens
- Required components for 12-hour format are missing

### Behavior Notes

- **No Exceptions**: Never throws errors; invalid inputs return Invalid Date objects
- **Pattern Matching**: Pattern must exactly match input structure including delimiters, spacing, and literal text
- **Missing Components**: Date components not specified in pattern use values from `referenceDate` (or current date)
- **Time Defaults**: Time components default to `00:00:00.000` when not specified in pattern
- **Literal Text**: Enclosed in single quotes (`'text'`); use `''` (two quotes) for a literal single quote character
- **Year Handling**: Supports years 0-99 via `setFullYear()` to avoid JavaScript's automatic 1900 offset
- **BC Years**: Represented as negative numbers (e.g., 100 BC → -99)
- **Localization**: Provides locale option to parse localized month names, weekday names, and day periods
- **Performance**: Pattern tokenization occurs on every call; reuse pattern strings for better performance when parsing many dates
- **Validation**: Use `isValid()` to check if parsing succeeded
- **Consistency**: Uses same token syntax as `format()` for predictable round-trip conversions

### Supported Parse Tokens

#### Year Tokens
- `y`: Variable length, parses all consecutive digits
- `yy`: Two-digit year (50-99 → 1950-1999, 00-49 → 2000-2049)
- `yyy`: Exactly 3 digits required
- `yyyy`: 1-4 digits accepted (supports years like 1 AD or 999)

#### Month Tokens
- `M`: 1-12 (single or double digit)
- `MM`: 01-12 (zero-padded)
- `MMM`: Jan/Feb/Mar/... (abbreviated, localized)
- `MMMM`: January/February/March/... (full name, localized)
- `MMMMM`: J/F/M/... (narrow, localized)

#### Day Tokens
- `d`: 1-31 (single or double digit)
- `dd`: 01-31 (zero-padded)

#### Hour Tokens
- `H`: 0-23 (24-hour format, single or double digit)
- `HH`: 00-23 (24-hour format, zero-padded)
- `h`: 1-12 (12-hour format, single or double digit)
- `hh`: 01-12 (12-hour format, zero-padded)

#### Minute Tokens
- `m`: 0-59 (single or double digit)
- `mm`: 00-59 (zero-padded)

#### Second Tokens
- `s`: 0-59 (single or double digit)
- `ss`: 00-59 (zero-padded)

#### Millisecond Tokens
- `S`: 0-9 (1 digit, multiplied by 100)
- `SS`: 00-99 (2 digits, multiplied by 10)
- `SSS`: 000-999 (3 digits, used as-is)

#### Day Period Tokens
- `a`/`aa`/`aaa`: AM/PM (case-insensitive, localized)
- `aaaa`: A.M./P.M. (localized)
- `aaaaa`: a/p (narrow, localized)

#### Era Tokens
- `G`/`GG`/`GGG`: AD/BC (abbreviated, localized)
- `GGGG`: Anno Domini/Before Christ (full name, localized)
- `GGGGG`: A/B (narrow, localized)

#### Weekday Tokens
- `E`/`EE`/`EEE`: Mon/Tue/Wed/... (abbreviated, localized)
- `EEEE`: Monday/Tuesday/Wednesday/... (full name, localized)
- `EEEEE`: M/T/W/... (narrow, localized)

#### Day of Year Tokens
- `D`: 1-366 (single, double, or triple digit)
- `DD`: 01-366 (zero-padded to 2-3 digits)
- `DDD`: 001-366 (zero-padded to 3 digits)

### Special Parsing Behaviors

#### Two-Digit Year (yy)
- Values 50-99 map to 1950-1999
- Values 00-49 map to 2000-2049

#### 12-Hour Format Conversion
- Requires both hour token (`h`/`hh`) and day period token (`a`/`aa`/`aaa`/`aaaa`/`aaaaa`)
- 12 AM converts to 00:00 (midnight)
- 12 PM remains 12:00 (noon)
- 1-11 AM remains 1-11 hours
- 1-11 PM converts to 13-23 hours
- Day period is case-insensitive

#### Millisecond Scaling
- `S` token: Single digit multiplied by 100 (e.g., 5 → 500ms)
- `SS` token: Two digits multiplied by 10 (e.g., 50 → 500ms)
- `SSS` token: Three digits used as-is (e.g., 500 → 500ms)

#### Day of Year Calculation
- Automatically calculates month and day from day-of-year value
- Respects leap years (366 days vs 365 days)
- Example: Day 32 in 2024 → February 1st

#### Weekday Parsing
- Weekday tokens are parsed but don't affect the resulting date
- Can be used for format validation
- Parser doesn't validate that weekday matches the actual date

## Use Cases

- **User Input Parsing**: Parse date strings entered by users in various formats (ISO 8601, US format, European format, etc.). Handles different regional date formats and provides consistent validation across your application.

- **API Data Processing**: Parse date strings received from external APIs or services that return dates in specific string formats. Particularly useful when dealing with non-ISO date formats or legacy systems.

- **Form Validation**: Validate and convert date input from forms where users enter dates as text. Supports multiple input formats and provides clear feedback through Invalid Date returns when input is malformed.

- **File Import/Export**: Parse dates from CSV files, log files, or other text-based data formats where dates are stored as strings. Enables consistent date handling across different data sources.

- **Localized Date Parsing**: Parse dates in user-preferred locales, handling localized month names, weekday names, and day periods. Essential for international applications supporting multiple languages.

- **Legacy System Integration**: Parse dates from legacy systems or databases that store dates as strings in custom formats. Provides flexibility to handle non-standard date formats without regex parsing.

- **Round-Trip Conversions**: Convert dates to strings using `format()` and back to Date objects using `parse()` with the same pattern, ensuring data integrity in serialization/deserialization workflows.

## Usage Examples

### Basic Date Parsing

```typescript
import { parse } from 'chronia';

// ISO 8601-like format
const date1 = parse("2024-01-15", "yyyy-MM-dd");
// Returns: Date(2024, 0, 15, 0, 0, 0, 0)

// US format
const date2 = parse("01/15/2024", "MM/dd/yyyy");
// Returns: Date(2024, 0, 15, 0, 0, 0, 0)

// European format
const date3 = parse("15.01.2024", "dd.MM.yyyy");
// Returns: Date(2024, 0, 15, 0, 0, 0, 0)

// Variable padding
const date4 = parse("1/5/2024", "M/d/yyyy");
// Returns: Date(2024, 0, 5, 0, 0, 0, 0)
```

### Date and Time Parsing

```typescript
import { parse } from 'chronia';

// Date with 24-hour time
const date1 = parse("15/01/2024 14:30", "dd/MM/yyyy HH:mm");
// Returns: Date(2024, 0, 15, 14, 30, 0, 0)

// Date with 12-hour time and AM/PM
const date2 = parse("01/15/2024 2:30 PM", "MM/dd/yyyy h:mm a");
// Returns: Date(2024, 0, 15, 14, 30, 0, 0)

// Time with seconds and milliseconds
const date3 = parse("2024-01-15T14:30:45.123", "yyyy-MM-dd'T'HH:mm:ss.SSS");
// Returns: Date(2024, 0, 15, 14, 30, 45, 123)

// Time only (uses current date)
const date4 = parse("14:30:00", "HH:mm:ss");
// Returns: Date with current date, time set to 14:30:00
```

### Using Reference Date

```typescript
import { parse } from 'chronia';

// Parse time only with specific reference date
const refDate = new Date(2023, 5, 10); // June 10, 2023
const date1 = parse("14:30", "HH:mm", { referenceDate: refDate });
// Returns: Date(2023, 5, 10, 14, 30, 0, 0)

// Parse partial date (month and day only)
const date2 = parse("01-15", "MM-dd", { referenceDate: refDate });
// Returns: Date(2023, 0, 15, 0, 0, 0, 0) - Uses year from refDate
```

### Localized Parsing

```typescript
import { parse } from 'chronia';
import { enUS } from 'chronia/locale/en-US';
import { ja } from 'chronia/locale/ja';

// English month names
const date1 = parse("January 15, 2024", "MMMM dd, yyyy", { locale: enUS });
// Returns: Date(2024, 0, 15)

// Japanese date format
const date2 = parse("2024年1月15日", "yyyy'年'M'月'd'日'", { locale: ja });
// Returns: Date(2024, 0, 15)

// Weekday with date (English)
const date3 = parse("Monday, 2024-01-15", "EEEE, yyyy-MM-dd", { locale: enUS });
// Returns: Date(2024, 0, 15)
```

### Literal Text in Patterns

```typescript
import { parse } from 'chronia';

// Literal text in pattern
const date1 = parse("Year 2024, Month 01", "'Year' yyyy', Month' MM");
// Returns: Date(2024, 0, 1, 0, 0, 0, 0)

// Escaped single quote
const date2 = parse("It's 2024", "'It''s' yyyy");
// Returns: Date(2024, current month, current day)

// ISO 8601 with T separator
const date3 = parse("2024-01-15T14:30:00", "yyyy-MM-dd'T'HH:mm:ss");
// Returns: Date(2024, 0, 15, 14, 30, 0, 0)
```

### Special Format Parsing

```typescript
import { parse } from 'chronia';

// Two-digit year parsing
const date1 = parse("99-12-31", "yy-MM-dd");
// Returns: Date(1999, 11, 31) - 99 maps to 1999

const date2 = parse("00-01-01", "yy-MM-dd");
// Returns: Date(2000, 0, 1) - 00 maps to 2000

// Day of year
const date3 = parse("2024-032", "yyyy-DDD");
// Returns: Date(2024, 1, 1) - February 1st (32nd day of 2024)

// Era parsing (BC dates)
const date4 = parse("100 BC", "yyyy G");
// Returns: Date(-99, 0, 1) - Year 100 BC
```

### Error Handling and Validation

```typescript
import { parse, isValid } from 'chronia';

// Invalid input returns Invalid Date
const invalid1 = parse("invalid-text", "yyyy-MM-dd");
// Returns: Invalid Date (isNaN(invalid1.getTime()) === true)

// Mismatched pattern
const invalid2 = parse("2024-01-15", "dd/MM/yyyy");
// Returns: Invalid Date

// Out of range values
const invalid3 = parse("2024-13-01", "yyyy-MM-dd");
// Returns: Invalid Date (month 13 is invalid)

// Extra characters
const invalid4 = parse("2024-01-15extra", "yyyy-MM-dd");
// Returns: Invalid Date

// Proper validation pattern
function parseUserDate(input: string): Date | null {
  const parsed = parse(input, "yyyy-MM-dd");
  return isValid(parsed) ? parsed : null;
}

const result = parseUserDate("2024-01-15");
if (result) {
  console.log("Parsed successfully:", result);
} else {
  console.log("Parsing failed");
}
```

### Form Validation

```typescript
import { parse, isValid, format } from 'chronia';

function validateAndFormatDate(input: string, inputFormat: string): string {
  const parsed = parse(input, inputFormat);

  if (!isValid(parsed)) {
    return 'Invalid date';
  }

  return format(parsed, 'yyyy-MM-dd');
}

// Various input formats normalized to ISO format
validateAndFormatDate("01/15/2024", "MM/dd/yyyy");
// Returns: '2024-01-15'

validateAndFormatDate("15.01.2024", "dd.MM.yyyy");
// Returns: '2024-01-15'

validateAndFormatDate("not-a-date", "yyyy-MM-dd");
// Returns: 'Invalid date'
```

### API Data Processing

```typescript
import { parse, isValid } from 'chronia';

interface ApiResponse {
  id: string;
  createdAt: string;  // Format: "dd/MM/yyyy HH:mm:ss"
  updatedAt: string;  // Format: "dd/MM/yyyy HH:mm:ss"
}

function processApiResponse(response: ApiResponse) {
  const created = parse(response.createdAt, "dd/MM/yyyy HH:mm:ss");
  const updated = parse(response.updatedAt, "dd/MM/yyyy HH:mm:ss");

  if (!isValid(created) || !isValid(updated)) {
    throw new Error("Invalid date format in API response");
  }

  return {
    id: response.id,
    createdAt: created,
    updatedAt: updated,
  };
}

// Process API data
const apiData = {
  id: "123",
  createdAt: "15/01/2024 14:30:00",
  updatedAt: "15/01/2024 16:45:00",
};

const processed = processApiResponse(apiData);
// Returns: { id: "123", createdAt: Date(...), updatedAt: Date(...) }
```

### Round-Trip Conversion

```typescript
import { parse, format } from 'chronia';

const pattern = "yyyy-MM-dd HH:mm:ss";
const original = new Date(2024, 0, 15, 14, 30, 45);

// Convert to string and back to Date
const formatted = format(original, pattern);
// Returns: "2024-01-15 14:30:45"

const parsed = parse(formatted, pattern);
// Returns: Date(2024, 0, 15, 14, 30, 45)

// Verify round-trip equality
original.getTime() === parsed.getTime();
// Returns: true
```
