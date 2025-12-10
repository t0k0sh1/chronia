# format

## Overview

The `format` function converts a Date object to a formatted string using Unicode format tokens. It provides flexible date and time formatting with support for localization, allowing you to create custom date string representations for display purposes.

## Signature

```typescript
function format(date: Date, pattern: string, locale?: Locale): string;
```

## Parameters

| Parameter | Type                | Description                                                                                                 |
| --------- | ------------------- | ----------------------------------------------------------------------------------------------------------- |
| `date`    | `Date`              | The Date object to format                                                                                   |
| `pattern` | `string`            | The format pattern using Unicode tokens (e.g., "yyyy-MM-dd HH:mm:ss")                                       |
| `locale`  | `Locale` (optional) | Optional localization object for locale-specific formatting of month names, weekdays, day periods, and eras |

## Return Value

| Type     | Description                                              |
| -------- | -------------------------------------------------------- |
| `string` | Formatted date string according to the specified pattern |

## Description

The `format` function transforms Date objects into human-readable strings by applying a pattern-based formatting system. It uses the same token syntax as the `parse()` function to ensure consistency across the Chronia API. The function supports extensive customization through Unicode format tokens and optional localization for internationalized applications.

### Specification

#### Supported Format Tokens:

**Year Tokens:**

- `y`: Variable length, no padding (e.g., 2024 → "2024", 99 → "99")
- `yy`: Last 2 digits of year (e.g., 2024 → "24", 1999 → "99")
- `yyy`: Last 3 digits with zero padding (e.g., 2024 → "024", 999 → "999")
- `yyyy`: Full year with zero padding to 4 digits (e.g., 2024 → "2024", 99 → "0099")

**Month Tokens:**

- `M`: Month number without padding (1-12)
- `MM`: Month number with zero padding (01-12)
- `MMM`: Abbreviated month name (e.g., "Jan", "Feb")
- `MMMM`: Full month name (e.g., "January", "February")
- `MMMMM`: Narrow month name (e.g., "J", "F", "M")

**Day Tokens:**

- `d`: Day of month without padding (1-31)
- `dd`: Day of month with zero padding (01-31)

**Hour Tokens:**

- `H`: Hour in 24-hour format without padding (0-23)
- `HH`: Hour in 24-hour format with zero padding (00-23)
- `h`: Hour in 12-hour format without padding (1-12)
- `hh`: Hour in 12-hour format with zero padding (01-12)

**Minute Tokens:**

- `m`: Minute without padding (0-59)
- `mm`: Minute with zero padding (00-59)

**Second Tokens:**

- `s`: Second without padding (0-59)
- `ss`: Second with zero padding (00-59)

**Millisecond Tokens:**

- `S`: First digit of milliseconds (0-9)
- `SS`: First two digits of milliseconds (00-99)
- `SSS`: Full milliseconds (000-999)

**Day Period Tokens:**

- `a`, `aa`, `aaa`: "AM" or "PM"
- `aaaa`: "A.M." or "P.M."
- `aaaaa`: "a" or "p"

**Era Tokens:**

- `G`, `GG`, `GGG`: "AD" or "BC"
- `GGGG`: "Anno Domini" or "Before Christ"
- `GGGGG`: "A" or "B"

**Weekday Tokens:**

- `E`, `EE`, `EEE`: Abbreviated weekday name (e.g., "Mon", "Tue")
- `EEEE`: Full weekday name (e.g., "Monday", "Tuesday")
- `EEEEE`: Narrow weekday name (e.g., "M", "T", "W")

**Day of Year Tokens:**

- `D`: Day of year without padding (1-366)
- `DD`: Day of year with zero padding (01-366)
- `DDD`: Day of year with zero padding to 3 digits (001-366)

#### Pattern Syntax Rules:

- **Literal text** must be enclosed in single quotes (e.g., `'at'`, `'Year'`)
- **Two single quotes** (`''`) represent a literal single quote character in the output
- **Tokens are case-sensitive** (e.g., `MM` for month vs `mm` for minutes)
- **Leading zeros** are added based on token length (e.g., `MM` → "01", `M` → "1")
- **Unrecognized characters** outside of quotes are passed through as-is

### Behavior Notes

- No exceptions are thrown for invalid dates; behavior is undefined for Invalid Date objects
- Pattern tokenization occurs on every call with no internal caching
- Tokens are processed sequentially from left to right through the pattern string
- Localized formatting (month names, weekday names, day periods, eras) falls back to English when no locale is provided
- The 12-hour format treats midnight (00:00) as "12:00 AM" and noon (12:00) as "12:00 PM"
- BC years are represented as positive numbers after internal adjustment (e.g., 100 BC formats as "0100" with `yyyy`)
- Day of year counting is 1-indexed starting from January 1st and respects leap years
- Complex patterns with many tokens may have slower performance than simple patterns
- Type-safe with TypeScript, accepting only `Date` objects for the date parameter

## Use Cases

- **Display Formatting**: Convert Date objects to human-readable strings for UI display. Particularly useful when showing dates in tables, cards, or forms where users need to understand date values at a glance.
- **Date String Standardization**: Ensure consistent date formatting across your application by using standardized patterns. Prevents inconsistent date displays and makes the codebase more maintainable.
- **Localized Date Display**: Format dates according to user locale preferences for international applications. Supports displaying month names, weekday names, and other locale-specific components in the user's language.
- **API Response Formatting**: Convert Date objects to specific string formats required by external APIs or data exports. Common in scenarios where you need ISO 8601 format, CSV exports, or custom API date string formats.
- **Log Timestamps**: Generate formatted timestamp strings for logging and debugging purposes. Helps create readable log files with consistent date/time representations.

## Usage Examples

### Display Formatting

```typescript
import { format } from "chronia";

const date = new Date(2024, 0, 15, 14, 30, 45, 123);

// Basic date formats
format(date, "yyyy-MM-dd"); // Returns: "2024-01-15"
format(date, "dd/MM/yyyy"); // Returns: "15/01/2024"
format(date, "MM/dd/yyyy"); // Returns: "01/15/2024"

// Date and time combined
format(date, "yyyy-MM-dd HH:mm:ss"); // Returns: "2024-01-15 14:30:45"
format(date, "dd/MM/yyyy HH:mm"); // Returns: "15/01/2024 14:30"

// 12-hour format with AM/PM
format(date, "h:mm a"); // Returns: "2:30 PM"
format(date, "hh:mm:ss a"); // Returns: "02:30:45 PM"

// With milliseconds
format(date, "HH:mm:ss.SSS"); // Returns: "14:30:45.123"
```

### Date String Standardization

```typescript
import { format } from "chronia";

// Consistent ISO 8601-like format across application
const standardFormat = "yyyy-MM-dd'T'HH:mm:ss";

const dates = [
  new Date(2024, 0, 15, 9, 0, 0),
  new Date(2024, 5, 20, 14, 30, 0),
  new Date(2024, 11, 31, 23, 59, 59),
];

const formatted = dates.map((date) => format(date, standardFormat));
// Returns: [
//   "2024-01-15T09:00:00",
//   "2024-06-20T14:30:00",
//   "2024-12-31T23:59:59"
// ]
```

### Localized Date Display

```typescript
import { format } from "chronia";
import { enUS } from "chronia/locale/en-US";
import { ja } from "chronia/locale/ja";

const date = new Date(2024, 0, 15, 14, 30, 0);

// English localized formatting
format(date, "EEEE, MMMM dd, yyyy 'at' h:mm a", enUS);
// Returns: "Monday, January 15, 2024 at 2:30 PM"

// Japanese localized formatting
format(date, "yyyy'年'M'月'd'日' HH:mm", ja);
// Returns: "2024年1月15日 14:30"

// Month names in different locales
format(date, "MMMM", enUS); // Returns: "January"
format(date, "MMMM", ja); // Returns: "1月" (Japanese)
```

### API Response Formatting

```typescript
import { format } from "chronia";

interface ApiResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
}

function prepareApiResponse(
  id: string,
  created: Date,
  updated: Date,
): ApiResponse {
  // Format dates to ISO 8601 format for API
  return {
    id,
    createdAt: format(created, "yyyy-MM-dd'T'HH:mm:ss.SSS"),
    updatedAt: format(updated, "yyyy-MM-dd'T'HH:mm:ss.SSS"),
  };
}

const response = prepareApiResponse(
  "user-123",
  new Date(2024, 0, 1, 10, 0, 0, 0),
  new Date(2024, 0, 15, 14, 30, 45, 123),
);
// Returns: {
//   id: "user-123",
//   createdAt: "2024-01-01T10:00:00.000",
//   updatedAt: "2024-01-15T14:30:45.123"
// }
```

### Log Timestamps

```typescript
import { format } from "chronia";

class Logger {
  private formatTimestamp(date: Date): string {
    return format(date, "yyyy-MM-dd HH:mm:ss.SSS");
  }

  log(message: string): void {
    const timestamp = this.formatTimestamp(new Date());
    console.log(`[${timestamp}] ${message}`);
  }

  error(message: string, error: Error): void {
    const timestamp = this.formatTimestamp(new Date());
    console.error(`[${timestamp}] ERROR: ${message}`, error);
  }
}

const logger = new Logger();
logger.log("Application started");
// Console output: [2024-01-15 14:30:45.123] Application started

logger.error("Failed to connect", new Error("Connection refused"));
// Console output: [2024-01-15 14:30:45.456] ERROR: Failed to connect Error: Connection refused
```

### Advanced Pattern Examples

```typescript
import { format } from "chronia";

const date = new Date(2024, 0, 15, 14, 30, 45, 123);

// Year variations
format(date, "y"); // Returns: "2024"
format(date, "yy"); // Returns: "24"
format(date, "yyy"); // Returns: "024"
format(date, "yyyy"); // Returns: "2024"

// Month variations
format(date, "M"); // Returns: "1"
format(date, "MM"); // Returns: "01"
format(date, "MMM"); // Returns: "Jan"
format(date, "MMMM"); // Returns: "January"
format(date, "MMMMM"); // Returns: "J"

// Weekday formatting
format(date, "E"); // Returns: "Mon"
format(date, "EEEE"); // Returns: "Monday"
format(date, "EEEEE"); // Returns: "M"

// Day period variations
format(date, "h:mm a"); // Returns: "2:30 PM"
format(date, "h:mm aaaa"); // Returns: "2:30 P.M."
format(date, "h:mm aaaaa"); // Returns: "2:30 p"

// Era formatting (BC dates)
const bcDate = new Date(-100, 0, 1);
format(bcDate, "yyyy G"); // Returns: "0101 BC"
format(bcDate, "yyyy GGGG"); // Returns: "0101 Before Christ"
format(bcDate, "yyyy GGGGG"); // Returns: "0101 B"

// Day of year
format(date, "DDD"); // Returns: "015" (15th day of year)

// Literal text with escaped quotes
format(date, "'Year' yyyy', Month' MM"); // Returns: "Year 2024, Month 01"
format(date, "'It''s' yyyy"); // Returns: "It's 2024"

// Complex real-world format
format(date, "EEEE, MMMM dd, yyyy 'at' h:mm a");
// Returns: "Monday, January 15, 2024 at 2:30 PM"
```
