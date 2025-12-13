# Date Formatting Functions

## Overview

Chronia provides a comprehensive date formatting system that allows you to convert Date objects into human-readable strings using flexible pattern-based syntax. The formatting functions support extensive customization through Unicode format tokens and optional localization, making it easy to create consistent, locale-aware date displays across your application.

## Available Functions

| Function                                  | Description                                                                                           |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [`format`](./format.md)                   | Converts a Date object to a formatted string using Unicode format tokens with optional locale support |
| [`createFormatter`](./createFormatter.md) | Creates a pre-compiled formatter for efficient repeated formatting with the same pattern              |

## Common Features

All formatting functions in this category share the following characteristics:

### Type Flexibility

All functions accept both Date objects and numeric timestamps:

```typescript
import { format } from "chronia";

// Date objects
format(new Date(2024, 0, 15, 14, 30, 0), "yyyy-MM-dd"); // "2024-01-15"

// Timestamps
format(1705329000000, "yyyy-MM-dd"); // "2024-01-15"

// Both produce the same output
```

### Pattern-Based Formatting

All formatting functions use Unicode format tokens that provide granular control over output format:

```typescript
import { format } from "chronia";

const date = new Date(2024, 0, 15, 14, 30, 45, 123);

// Date only
format(date, "yyyy-MM-dd"); // "2024-01-15"

// Date and time
format(date, "yyyy-MM-dd HH:mm:ss"); // "2024-01-15 14:30:45"

// With milliseconds
format(date, "HH:mm:ss.SSS"); // "14:30:45.123"

// 12-hour format
format(date, "h:mm a"); // "2:30 PM"

// Full text format
format(date, "EEEE, MMMM dd, yyyy"); // "Monday, January 15, 2024"
```

### Locale Support

All formatting functions support optional locale objects for internationalized date display:

```typescript
import { format } from "chronia";
import { enUS } from "chronia/locale/en-US";
import { ja } from "chronia/locale/ja";

const date = new Date(2024, 0, 15, 14, 30, 0);

// English
format(date, "EEEE, MMMM dd, yyyy", enUS);
// "Monday, January 15, 2024"

// Japanese
format(date, "yyyy'年'M'月'd'日' (EEEE)", ja);
// "2024年1月15日 (月曜日)"
```

## Format Token Reference

### Quick Reference Table

| Category        | Token            | Example Output | Description                    |
| --------------- | ---------------- | -------------- | ------------------------------ |
| **Year**        | `y`              | `2024`         | Variable length, no padding    |
|                 | `yy`             | `24`           | Last 2 digits                  |
|                 | `yyy`            | `024`          | Last 3 digits with padding     |
|                 | `yyyy`           | `2024`         | Full year with 4-digit padding |
| **Month**       | `M`              | `1`            | Month number (1-12)            |
|                 | `MM`             | `01`           | Month with zero padding        |
|                 | `MMM`            | `Jan`          | Abbreviated month name         |
|                 | `MMMM`           | `January`      | Full month name                |
|                 | `MMMMM`          | `J`            | Narrow month name              |
| **Day**         | `d`              | `5`            | Day of month (1-31)            |
|                 | `dd`             | `05`           | Day with zero padding          |
| **Hour**        | `H`              | `14`           | 24-hour format (0-23)          |
|                 | `HH`             | `14`           | 24-hour with zero padding      |
|                 | `h`              | `2`            | 12-hour format (1-12)          |
|                 | `hh`             | `02`           | 12-hour with zero padding      |
| **Minute**      | `m`              | `5`            | Minute (0-59)                  |
|                 | `mm`             | `05`           | Minute with zero padding       |
| **Second**      | `s`              | `7`            | Second (0-59)                  |
|                 | `ss`             | `07`           | Second with zero padding       |
| **Millisecond** | `S`              | `1`            | First digit (0-9)              |
|                 | `SS`             | `12`           | First two digits (00-99)       |
|                 | `SSS`            | `123`          | Full milliseconds (000-999)    |
| **Day Period**  | `a`, `aa`, `aaa` | `PM`           | AM/PM                          |
|                 | `aaaa`           | `P.M.`         | With periods                   |
|                 | `aaaaa`          | `p`            | Narrow form                    |
| **Weekday**     | `E`, `EE`, `EEE` | `Mon`          | Abbreviated                    |
|                 | `EEEE`           | `Monday`       | Full name                      |
|                 | `EEEEE`          | `M`            | Narrow form                    |
| **Era**         | `G`, `GG`, `GGG` | `AD`           | Abbreviated                    |
|                 | `GGGG`           | `Anno Domini`  | Full form                      |
|                 | `GGGGG`          | `A`            | Narrow form                    |
| **Day of Year** | `D`              | `15`           | Day of year (1-366)            |
|                 | `DD`             | `15`           | With 2-digit padding           |
|                 | `DDD`            | `015`          | With 3-digit padding           |

### Pattern Syntax Rules

- **Literal text** must be enclosed in single quotes: `'at'`, `'Year'`
- **Two single quotes** (`''`) represent a literal single quote in output
- **Tokens are case-sensitive**: `MM` (month) vs `mm` (minutes)
- **Leading zeros** are added based on token length: `MM` → `"01"`, `M` → `"1"`
- **Unrecognized characters** outside quotes pass through as-is

## Use Case Examples

### Standard Date Formats

```typescript
import { format } from "chronia";

const date = new Date(2024, 0, 15, 14, 30, 45);

// ISO 8601-like formats
format(date, "yyyy-MM-dd"); // "2024-01-15"
format(date, "yyyy-MM-dd'T'HH:mm:ss"); // "2024-01-15T14:30:45"

// Common regional formats
format(date, "MM/dd/yyyy"); // "01/15/2024" (US)
format(date, "dd/MM/yyyy"); // "15/01/2024" (UK/EU)
format(date, "dd.MM.yyyy"); // "15.01.2024" (German)

// Human-readable formats
format(date, "MMMM dd, yyyy"); // "January 15, 2024"
format(date, "dd MMMM yyyy"); // "15 January 2024"
format(date, "EEEE, MMMM dd, yyyy"); // "Monday, January 15, 2024"
```

### Time Formats

```typescript
import { format } from "chronia";

const date = new Date(2024, 0, 15, 14, 30, 45, 123);

// 24-hour formats
format(date, "HH:mm"); // "14:30"
format(date, "HH:mm:ss"); // "14:30:45"
format(date, "HH:mm:ss.SSS"); // "14:30:45.123"

// 12-hour formats
format(date, "h:mm a"); // "2:30 PM"
format(date, "hh:mm:ss a"); // "02:30:45 PM"
format(date, "h:mm aaaa"); // "2:30 P.M."

// Combined date and time
format(date, "yyyy-MM-dd HH:mm:ss"); // "2024-01-15 14:30:45"
format(date, "MMM dd, yyyy 'at' h:mm a"); // "Jan 15, 2024 at 2:30 PM"
```

### Localized Formatting

```typescript
import { format } from "chronia";
import { enUS } from "chronia/locale/en-US";
import { ja } from "chronia/locale/ja";
import { de } from "chronia/locale/de";
import { fr } from "chronia/locale/fr";

const date = new Date(2024, 0, 15, 14, 30, 0);

// English (US)
format(date, "EEEE, MMMM dd, yyyy 'at' h:mm a", enUS);
// "Monday, January 15, 2024 at 2:30 PM"

// Japanese
format(date, "yyyy'年'M'月'd'日' (EEEE) HH:mm", ja);
// "2024年1月15日 (月曜日) 14:30"

// German
format(date, "EEEE, dd. MMMM yyyy 'um' HH:mm 'Uhr'", de);
// "Montag, 15. Januar 2024 um 14:30 Uhr"

// French
format(date, "EEEE dd MMMM yyyy 'à' HH'h'mm", fr);
// "lundi 15 janvier 2024 à 14h30"
```

### API and Data Export Formats

```typescript
import { format } from "chronia";

const date = new Date(2024, 0, 15, 14, 30, 45, 123);

// ISO 8601-style for APIs
format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS");
// "2024-01-15T14:30:45.123"

// CSV export format
format(date, "yyyy-MM-dd HH:mm:ss");
// "2024-01-15 14:30:45"

// Database-friendly formats
format(date, "yyyy-MM-dd HH:mm:ss.SSS");
// "2024-01-15 14:30:45.123"

// Filename-safe timestamp
format(date, "yyyyMMdd_HHmmss");
// "20240115_143045"
```

### Logging and Debugging

```typescript
import { format } from "chronia";

// Application logging
const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS");
console.log(`[${timestamp}] Application started`);
// [2024-01-15 14:30:45.123] Application started

// Debug format with milliseconds
const debugFormat = "HH:mm:ss.SSS";
console.debug(`[${format(new Date(), debugFormat)}] Request received`);
// [14:30:45.123] Request received

// Audit log format
const auditFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS";
const logEntry = {
  timestamp: format(new Date(), auditFormat),
  action: "user.login",
  userId: "12345",
};
```

### User Interface Display

```typescript
import { format } from "chronia";

// Blog post timestamp
function formatBlogDate(date: Date): string {
  return format(date, "MMMM dd, yyyy 'at' h:mm a");
}
// "January 15, 2024 at 2:30 PM"

// Event date display
function formatEventDate(date: Date): string {
  return format(date, "EEEE, MMMM dd, yyyy");
}
// "Monday, January 15, 2024"

// Short date for tables
function formatTableDate(date: Date): string {
  return format(date, "MM/dd/yy");
}
// "01/15/24"

// Relative date with time
function formatMessageTime(date: Date): string {
  return format(date, "h:mm a");
}
// "2:30 PM"
```

## Common Patterns

### Building a Date Formatter Utility

```typescript
import { format } from "chronia";

class DateFormatter {
  // Standard formats
  static readonly ISO = "yyyy-MM-dd'T'HH:mm:ss";
  static readonly US_DATE = "MM/dd/yyyy";
  static readonly EU_DATE = "dd/MM/yyyy";
  static readonly HUMAN_READABLE = "EEEE, MMMM dd, yyyy";
  static readonly TIME_ONLY = "HH:mm:ss";
  static readonly TIMESTAMP = "yyyy-MM-dd HH:mm:ss.SSS";

  static toISO(date: Date): string {
    return format(date, this.ISO);
  }

  static toUSDate(date: Date): string {
    return format(date, this.US_DATE);
  }

  static toEUDate(date: Date): string {
    return format(date, this.EU_DATE);
  }

  static toHumanReadable(date: Date): string {
    return format(date, this.HUMAN_READABLE);
  }

  static toTimestamp(date: Date): string {
    return format(date, this.TIMESTAMP);
  }
}

// Usage
const date = new Date(2024, 0, 15, 14, 30, 45);
DateFormatter.toISO(date); // "2024-01-15T14:30:45"
DateFormatter.toUSDate(date); // "01/15/2024"
DateFormatter.toHumanReadable(date); // "Monday, January 15, 2024"
```

### Localized Date Formatter

```typescript
import { format } from "chronia";
import type { Locale } from "chronia";

class LocalizedFormatter {
  constructor(private locale: Locale) {}

  formatFull(date: Date): string {
    return format(date, "EEEE, MMMM dd, yyyy 'at' h:mm a", this.locale);
  }

  formatDate(date: Date): string {
    return format(date, "MMMM dd, yyyy", this.locale);
  }

  formatTime(date: Date): string {
    return format(date, "h:mm a", this.locale);
  }

  formatShort(date: Date): string {
    return format(date, "MM/dd/yy", this.locale);
  }
}

// Usage
import { enUS, ja } from "chronia/locale";

const enFormatter = new LocalizedFormatter(enUS);
const jaFormatter = new LocalizedFormatter(ja);

const date = new Date(2024, 0, 15, 14, 30, 0);

enFormatter.formatFull(date);
// "Monday, January 15, 2024 at 2:30 PM"

jaFormatter.formatFull(date);
// Different output based on Japanese locale
```

### API Response Formatter

```typescript
import { format } from "chronia";

interface ApiTimestamps {
  createdAt: string;
  updatedAt: string;
}

function formatApiTimestamps(created: Date, updated: Date): ApiTimestamps {
  const apiFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS";

  return {
    createdAt: format(created, apiFormat),
    updatedAt: format(updated, apiFormat),
  };
}

// Usage
const timestamps = formatApiTimestamps(
  new Date(2024, 0, 1, 10, 0, 0),
  new Date(2024, 0, 15, 14, 30, 45, 123),
);
// {
//   createdAt: "2024-01-01T10:00:00.000",
//   updatedAt: "2024-01-15T14:30:45.123"
// }
```

### Conditional Formatting

```typescript
import { format } from "chronia";

function formatDateSmart(date: Date, includeTime: boolean = false): string {
  const dateFormat = "yyyy-MM-dd";
  const dateTimeFormat = "yyyy-MM-dd HH:mm:ss";

  return format(date, includeTime ? dateTimeFormat : dateFormat);
}

// Usage
const date = new Date(2024, 0, 15, 14, 30, 45);

formatDateSmart(date); // "2024-01-15"
formatDateSmart(date, true); // "2024-01-15 14:30:45"
```

### File Naming with Timestamps

```typescript
import { format } from "chronia";

function generateFilename(prefix: string, extension: string): string {
  const timestamp = format(new Date(), "yyyyMMdd_HHmmss");
  return `${prefix}_${timestamp}.${extension}`;
}

// Usage
generateFilename("report", "pdf");
// "report_20240115_143045.pdf"

generateFilename("backup", "zip");
// "backup_20240115_143045.zip"
```

## Choosing the Right Format Pattern

### By Use Case

| Use Case           | Recommended Pattern           | Example Output                |
| ------------------ | ----------------------------- | ----------------------------- |
| ISO 8601 API       | `"yyyy-MM-dd'T'HH:mm:ss"`     | `2024-01-15T14:30:45`         |
| US Date            | `"MM/dd/yyyy"`                | `01/15/2024`                  |
| EU Date            | `"dd/MM/yyyy"`                | `15/01/2024`                  |
| Database Timestamp | `"yyyy-MM-dd HH:mm:ss.SSS"`   | `2024-01-15 14:30:45.123`     |
| Log Timestamp      | `"yyyy-MM-dd HH:mm:ss"`       | `2024-01-15 14:30:45`         |
| Human Readable     | `"EEEE, MMMM dd, yyyy"`       | `Monday, January 15, 2024`    |
| Blog Post          | `"MMMM dd, yyyy 'at' h:mm a"` | `January 15, 2024 at 2:30 PM` |
| Short Date         | `"MM/dd/yy"`                  | `01/15/24`                    |
| Time Only          | `"HH:mm:ss"`                  | `14:30:45`                    |
| 12-Hour Time       | `"h:mm a"`                    | `2:30 PM`                     |
| Filename           | `"yyyyMMdd_HHmmss"`           | `20240115_143045`             |

### By Region

| Region         | Date Format            | Example         |
| -------------- | ---------------------- | --------------- |
| United States  | `"MM/dd/yyyy"`         | `01/15/2024`    |
| United Kingdom | `"dd/MM/yyyy"`         | `15/01/2024`    |
| ISO Standard   | `"yyyy-MM-dd"`         | `2024-01-15`    |
| Japan          | `"yyyy'年'M'月'd'日'"` | `2024年1月15日` |
| Germany        | `"dd.MM.yyyy"`         | `15.01.2024`    |
| China          | `"yyyy-MM-dd"`         | `2024-01-15`    |

## Performance Considerations

- **Simple patterns** (e.g., `"yyyy-MM-dd"`) are faster than complex patterns with many tokens
- **Localized formatting** adds minimal overhead when locale objects are pre-imported
- **Pattern tokenization** occurs on every call, so caching frequently used patterns in utility functions is recommended
- **Literal text** in patterns (enclosed in quotes) has no performance impact
- For high-frequency formatting, consider memoizing results when dates don't change

## Localization Best Practices

### Loading Locales Efficiently

```typescript
import { format } from "chronia";

// Import only the locales you need
import { enUS } from "chronia/locale/en-US";
import { ja } from "chronia/locale/ja";

// Create a locale map for your application
const LOCALES = {
  "en-US": enUS,
  ja: ja,
} as const;

function formatWithUserLocale(
  date: Date,
  pattern: string,
  localeCode: string,
): string {
  const locale = LOCALES[localeCode as keyof typeof LOCALES] || enUS;
  return format(date, pattern, locale);
}
```

### Locale-Specific Patterns

```typescript
import { format } from "chronia";
import type { Locale } from "chronia";

const LOCALE_PATTERNS = {
  "en-US": "MMMM dd, yyyy 'at' h:mm a",
  ja: "yyyy'年'M'月'd'日' HH:mm",
  de: "dd. MMMM yyyy 'um' HH:mm 'Uhr'",
  fr: "dd MMMM yyyy 'à' HH'h'mm",
} as const;

function formatByLocale(
  date: Date,
  localeCode: keyof typeof LOCALE_PATTERNS,
  locale: Locale,
): string {
  const pattern = LOCALE_PATTERNS[localeCode];
  return format(date, pattern, locale);
}
```

## Error Handling

```typescript
import { format, isValid } from "chronia";

function safeFormat(date: Date, pattern: string): string {
  // Validate date before formatting
  if (!isValid(date)) {
    return "Invalid Date";
  }

  return format(date, pattern);
}

// Usage
safeFormat(new Date(2024, 0, 15), "yyyy-MM-dd"); // "2024-01-15"
safeFormat(new Date("invalid"), "yyyy-MM-dd"); // "Invalid Date"
```

## See Also

- [Date Parsing](../parsing/) - Parse date strings into Date objects (inverse operation)
- [Date Validation](../validations/) - Validate dates before formatting
- [Chronia Types](../../types.md) - Type definitions including Locale type
- [format function](./format.md) - Detailed documentation for the format function
