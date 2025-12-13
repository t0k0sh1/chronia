# createParser

## Overview

The `createParser` function creates a pre-compiled parser for efficient repeated parsing of date strings. It tokenizes the pattern once and returns a reusable function, providing significant performance benefits when parsing many date strings with the same pattern.

## Signature

```typescript
function createParser(
  pattern: string,
  defaultOptions?: { locale?: Locale; referenceDate?: Date },
): (
  dateString: string,
  options?: { locale?: Locale; referenceDate?: Date },
) => Date;
```

## Parameters

| Parameter                      | Type                | Description                                                             |
| ------------------------------ | ------------------- | ----------------------------------------------------------------------- |
| `pattern`                      | `string`            | The format pattern using Unicode tokens (e.g., `"yyyy-MM-dd HH:mm:ss"`) |
| `defaultOptions`               | `object` (optional) | Optional default parsing configuration                                  |
| `defaultOptions.locale`        | `Locale` (optional) | Default localization object for parsing locale-specific text            |
| `defaultOptions.referenceDate` | `Date` (optional)   | Default reference date for missing components                           |

## Return Value

| Type                                     | Description                                                        |
| ---------------------------------------- | ------------------------------------------------------------------ |
| `(dateString: string, options?) => Date` | A function that parses date strings using the pre-compiled pattern |

## Description

The `createParser` function pre-compiles a format pattern into an optimized internal representation, returning a parser function that can be reused for multiple date strings. This approach avoids the overhead of pattern tokenization on every call, making it ideal for scenarios where you need to parse many date strings with the same pattern.

### Specification

- **Pattern Pre-compilation**: The pattern is tokenized once during `createParser` call
- **Default Options**: Default locale and reference date can be set at creation time
- **Option Override**: Per-call options override the defaults set during creation
- **Type Safety**: Throws `TypeError` if the pattern is not a string

### Behavior Notes

- Pattern tokenization occurs once, not on every parse call
- The returned function accepts date strings and optional override options
- For supported parse tokens, see the [`parse`](./parse.md) documentation
- Invalid inputs return an Invalid Date object (same as `parse`)
- Default options are merged with per-call options, with per-call taking precedence
- Missing date components use values from the reference date (defaults to current date)

## Use Cases

- **Batch Parsing**: Parse large arrays of date strings with the same pattern efficiently. Particularly useful in data import pipelines, log processing, or CSV parsing.
- **API Request Processing**: Create a parser once and reuse it across multiple API endpoints that receive dates in the same format.
- **Form Validation**: Pre-compile parsers for expected date input formats to validate and convert user input efficiently.
- **Log Analysis**: When processing log files with consistent timestamp formats.

## Usage Examples

### Basic Usage

```typescript
import { createParser, isValid } from "chronia";

// Create a pre-compiled parser
const parseDate = createParser("yyyy-MM-dd");

// Reuse for multiple date strings
const date1 = parseDate("2024-01-15");
const date2 = parseDate("2024-06-20");
const date3 = parseDate("2024-12-31");

// All return valid Date objects
isValid(date1); // Returns: true
isValid(date2); // Returns: true
isValid(date3); // Returns: true
```

### Batch Parsing

```typescript
import { createParser, isValid } from "chronia";

const dateStrings = [
  "2024-01-01",
  "2024-02-14",
  "2024-03-17",
  "2024-04-01",
  "2024-05-27",
];

// Pre-compile for efficiency
const parseDate = createParser("yyyy-MM-dd");

// Parse all date strings
const dates = dateStrings.map(parseDate);

// Validate all dates
const allValid = dates.every(isValid);
// Returns: true
```

### With Default Options

```typescript
import { createParser } from "chronia";
import { ja } from "chronia/locale/ja";

// Create parser with default locale and reference date
const referenceDate = new Date(2024, 0, 1);
const parseJapaneseDate = createParser("yyyy'年'M'月'd'日'", {
  locale: ja,
  referenceDate,
});

// Parse Japanese date strings
const date1 = parseJapaneseDate("2024年1月15日");
const date2 = parseJapaneseDate("2024年6月20日");

// Both use the default locale set at creation time
```

### Option Override at Parse Time

```typescript
import { createParser } from "chronia";
import { enUS } from "chronia/locale/en-US";
import { fr } from "chronia/locale/fr";

// Create parser with default English locale
const parseMonthName = createParser("MMMM dd, yyyy", { locale: enUS });

// Parse with default locale (English)
const date1 = parseMonthName("January 15, 2024");
// Returns: Date(2024, 0, 15)

// Override locale for specific parse call
const date2 = parseMonthName("janvier 15, 2024", { locale: fr });
// Returns: Date(2024, 0, 15)
```

### CSV Data Import

```typescript
import { createParser, isValid } from "chronia";

interface CsvRow {
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface ParsedRow {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Pre-compile parsers once
const parseDateTime = createParser("yyyy-MM-dd HH:mm:ss");

function parseCsvRow(row: CsvRow): ParsedRow | null {
  const createdAt = parseDateTime(row.createdAt);
  const updatedAt = parseDateTime(row.updatedAt);

  if (!isValid(createdAt) || !isValid(updatedAt)) {
    return null;
  }

  return {
    id: row.id,
    createdAt,
    updatedAt,
  };
}

// Efficiently parse many rows
function parseCsvData(rows: CsvRow[]): ParsedRow[] {
  return rows.map(parseCsvRow).filter((row): row is ParsedRow => row !== null);
}
```

### Log File Processing

```typescript
import { createParser, isValid, isBetween } from "chronia";

interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
}

// Pre-compile parser for log timestamp format
const parseLogTimestamp = createParser("yyyy-MM-dd'T'HH:mm:ss.SSS");

function parseLogEntries(
  entries: LogEntry[],
): { timestamp: Date; level: string; message: string }[] {
  return entries
    .map((entry) => ({
      timestamp: parseLogTimestamp(entry.timestamp),
      level: entry.level,
      message: entry.message,
    }))
    .filter((entry) => isValid(entry.timestamp));
}

// Filter logs by date range
function filterLogsByDateRange(
  entries: LogEntry[],
  start: Date,
  end: Date,
): { timestamp: Date; level: string; message: string }[] {
  return parseLogEntries(entries).filter((entry) =>
    isBetween(entry.timestamp, { start, end }, { bounds: "[]" }),
  );
}
```

### Form Input Validation

```typescript
import { createParser, isValid, format } from "chronia";

// Create parsers for different input formats
const parsers = {
  iso: createParser("yyyy-MM-dd"),
  us: createParser("MM/dd/yyyy"),
  eu: createParser("dd.MM.yyyy"),
};

function parseUserDate(
  input: string,
  inputFormat: "iso" | "us" | "eu",
): Date | null {
  const parser = parsers[inputFormat];
  const parsed = parser(input);
  return isValid(parsed) ? parsed : null;
}

function normalizeToIso(
  input: string,
  inputFormat: "iso" | "us" | "eu",
): string | null {
  const date = parseUserDate(input, inputFormat);
  return date ? format(date, "yyyy-MM-dd") : null;
}

// Examples
normalizeToIso("01/15/2024", "us"); // Returns: "2024-01-15"
normalizeToIso("15.01.2024", "eu"); // Returns: "2024-01-15"
normalizeToIso("2024-01-15", "iso"); // Returns: "2024-01-15"
normalizeToIso("invalid", "iso"); // Returns: null
```

### Performance Comparison

```typescript
import { parse, createParser } from "chronia";

const dateStrings = Array.from(
  { length: 10000 },
  (_, i) =>
    `2024-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
);

const pattern = "yyyy-MM-dd";

// Without pre-compilation (pattern tokenized 10000 times)
const withoutPrecompile = dateStrings.map((s) => parse(s, pattern));

// With pre-compilation (pattern tokenized once)
const parseDate = createParser(pattern);
const withPrecompile = dateStrings.map(parseDate);

// The pre-compiled version is significantly faster for large datasets
```

## See Also

- [`parse`](./parse.md) - Parse a single date string (useful when pattern varies)
- [`createFormatter`](../formatting/createFormatter.md) - Create a pre-compiled formatter
- [`format`](../formatting/format.md) - Format a date to a string
- [`isValid`](../validations/isValid.md) - Check if parsing succeeded
