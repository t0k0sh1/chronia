# createFormatter

## Overview

The `createFormatter` function creates a pre-compiled formatter for efficient repeated formatting of dates. It tokenizes the pattern once and returns a reusable function, providing significant performance benefits when formatting many dates with the same pattern.

## Signature

```typescript
function createFormatter(
  pattern: string,
  locale?: Locale,
): (date: Date) => string;
```

## Parameters

| Parameter | Type                | Description                                                                                                 |
| --------- | ------------------- | ----------------------------------------------------------------------------------------------------------- |
| `pattern` | `string`            | The format pattern using Unicode tokens (e.g., `yyyy-MM-dd HH:mm:ss`)                                       |
| `locale`  | `Locale` (optional) | Optional localization object for locale-specific formatting of month names, weekdays, day periods, and eras |

## Return Value

| Type                     | Description                                                         |
| ------------------------ | ------------------------------------------------------------------- |
| `(date: Date) => string` | A function that formats Date objects using the pre-compiled pattern |

## Description

The `createFormatter` function pre-compiles a format pattern into an optimized internal representation, returning a formatter function that can be reused for multiple dates. This approach avoids the overhead of pattern tokenization on every call, making it ideal for scenarios where you need to format many dates with the same pattern.

### Specification

- **Pattern Pre-compilation**: The pattern is tokenized once during `createFormatter` call
- **Locale Binding**: If a locale is provided, it becomes the default for all formatting operations
- **Type Safety**: Throws `TypeError` if the pattern is not a string

### Behavior Notes

- Pattern tokenization occurs once, not on every format call
- The returned function accepts only `Date` objects (not timestamps or strings)
- For supported format tokens, see the [`format`](./format.md) documentation
- Invalid dates produce undefined behavior (same as `format`)
- The locale can be bound at creation time for consistent localized formatting

## Use Cases

- **Batch Formatting**: Format large arrays of dates with the same pattern efficiently. Particularly useful in data processing pipelines, report generation, or CSV exports.
- **API Response Preparation**: Create a formatter once and reuse it across multiple API endpoints that return dates in the same format.
- **Table/List Rendering**: In UI applications, pre-compile formatters for date columns to improve rendering performance.
- **Log Processing**: When generating or processing log files with consistent timestamp formats.

## Usage Examples

### Basic Usage

```typescript
import { createFormatter } from "chronia";

// Create a pre-compiled formatter
const formatDate = createFormatter("yyyy-MM-dd");

// Reuse for multiple dates
const date1 = new Date(2024, 0, 15);
const date2 = new Date(2024, 5, 20);
const date3 = new Date(2024, 11, 31);

formatDate(date1); // Returns: "2024-01-15"
formatDate(date2); // Returns: "2024-06-20"
formatDate(date3); // Returns: "2024-12-31"
```

### Batch Formatting

```typescript
import { createFormatter } from "chronia";

const dates = [
  new Date(2024, 0, 1),
  new Date(2024, 1, 14),
  new Date(2024, 2, 17),
  new Date(2024, 3, 1),
  new Date(2024, 4, 27),
];

// Pre-compile for efficiency
const formatDateTime = createFormatter("yyyy-MM-dd HH:mm:ss");

// Format all dates
const formatted = dates.map(formatDateTime);
// Returns: [
//   "2024-01-01 00:00:00",
//   "2024-02-14 00:00:00",
//   "2024-03-17 00:00:00",
//   "2024-04-01 00:00:00",
//   "2024-05-27 00:00:00"
// ]
```

### With Locale Binding

```typescript
import { createFormatter } from "chronia";
import { ja } from "chronia/locale/ja";
import { fr } from "chronia/locale/fr";

// Create locale-specific formatters
const formatJapanese = createFormatter("yyyy'年'M'月'd'日' (EEEE)", ja);
const formatFrench = createFormatter("EEEE d MMMM yyyy", fr);

const date = new Date(2024, 0, 15);

formatJapanese(date); // Returns: "2024年1月15日 (月曜日)"
formatFrench(date); // Returns: "lundi 15 janvier 2024"
```

### API Response Preparation

```typescript
import { createFormatter } from "chronia";

// Create formatters once at module level
const formatISODate = createFormatter("yyyy-MM-dd'T'HH:mm:ss.SSS");
const formatDisplayDate = createFormatter("MMM dd, yyyy");

interface User {
  id: string;
  createdAt: Date;
  lastLogin: Date;
}

interface UserResponse {
  id: string;
  createdAt: string;
  lastLogin: string;
  displayDate: string;
}

function serializeUser(user: User): UserResponse {
  return {
    id: user.id,
    createdAt: formatISODate(user.createdAt),
    lastLogin: formatISODate(user.lastLogin),
    displayDate: formatDisplayDate(user.createdAt),
  };
}

// Efficiently serialize many users
function serializeUsers(users: User[]): UserResponse[] {
  return users.map(serializeUser);
}
```

### Table Column Formatting

```typescript
import { createFormatter } from "chronia";

// Pre-compile formatters for different column types
const formatters = {
  date: createFormatter("yyyy-MM-dd"),
  time: createFormatter("HH:mm:ss"),
  dateTime: createFormatter("yyyy-MM-dd HH:mm"),
  shortDate: createFormatter("MM/dd"),
};

interface TableRow {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

function renderTableRow(row: TableRow) {
  return {
    id: row.id,
    created: formatters.dateTime(row.createdAt),
    updated: formatters.dateTime(row.updatedAt),
    dateOnly: formatters.date(row.createdAt),
  };
}
```

### Performance Comparison

```typescript
import { format, createFormatter } from "chronia";

const dates = Array.from({ length: 10000 }, (_, i) => new Date(2024, 0, 1 + i));

const pattern = "yyyy-MM-dd HH:mm:ss";

// Without pre-compilation (pattern tokenized 10000 times)
const withoutPrecompile = dates.map((d) => format(d, pattern));

// With pre-compilation (pattern tokenized once)
const formatDate = createFormatter(pattern);
const withPrecompile = dates.map(formatDate);

// The pre-compiled version is significantly faster for large datasets
```

## See Also

- [`format`](./format.md) - Format a single date (useful when pattern varies)
- [`createParser`](../parsing/createParser.md) - Create a pre-compiled parser
- [`parse`](../parsing/parse.md) - Parse a date string
