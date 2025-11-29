# Internationalization (i18n)

Chronia provides built-in internationalization support through a data-driven Locale system. This guide explains how to use locales for formatting and parsing dates, and how to create custom locales.

---

## What is a Locale?

A **Locale** is a data structure that contains localized strings for date/time components:

- **Era names** (BC/AD)
- **Month names** (January, February, ...)
- **Weekday names** (Monday, Tuesday, ...)
- **Day period names** (AM/PM)

Each component provides three width options:

- **`narrow`**: Shortest form (e.g., "J" for January, "M" for Monday)
- **`abbr`**: Abbreviated form (e.g., "Jan", "Mon")
- **`wide`**: Full form (e.g., "January", "Monday")

---

## Built-in Locales

Chronia includes two built-in locales:

### American English (`enUS`)

The default locale used when no locale is explicitly specified.

```typescript
import { enUS } from 'chronia/i18n';
import { format } from 'chronia';

const date = new Date(2025, 0, 15);
format(date, 'MMMM d, yyyy', { locale: enUS }); // "January 15, 2025"
```

### Japanese (`ja`)

```typescript
import { ja } from 'chronia/i18n';
import { format } from 'chronia';

const date = new Date(2025, 0, 15);
format(date, 'yyyy年M月d日', { locale: ja }); // "2025年1月15日"
```

---

## Using Locales

### Formatting with Locales

The `format` function accepts an optional `locale` parameter:

```typescript
import { format } from 'chronia';
import { enUS, ja } from 'chronia/i18n';

const date = new Date(2025, 0, 15, 14, 30);

// English (default)
format(date, 'EEEE, MMMM d, yyyy');
// "Wednesday, January 15, 2025"

// English (explicit)
format(date, 'EEEE, MMMM d, yyyy', { locale: enUS });
// "Wednesday, January 15, 2025"

// Japanese
format(date, 'yyyy年M月d日 (E) a h:mm', { locale: ja });
// "2025年1月15日 (水) 午後 2:30"
```

### Parsing with Locales

The `parse` function also accepts an optional `locale` parameter:

```typescript
import { parse } from 'chronia';
import { enUS, ja } from 'chronia/i18n';

// English
parse('January 15, 2025', 'MMMM d, yyyy', { locale: enUS });
// Date(2025, 0, 15)

// Japanese
parse('2025年1月15日', 'yyyy年M月d日', { locale: ja });
// Date(2025, 0, 15)
```

### Default Locale Behavior

When no locale is specified, Chronia uses American English (`enUS`) as the default:

```typescript
import { format } from 'chronia';

const date = new Date(2025, 0, 15);

// These are equivalent
format(date, 'MMMM d, yyyy');
format(date, 'MMMM d, yyyy', { locale: enUS });
```

---

## Width Options

Each locale data component supports three width levels:

### Narrow

The shortest possible representation:

```typescript
import { format } from 'chronia';
import { enUS, ja } from 'chronia/i18n';

const date = new Date(2025, 0, 15);

// Month (narrow)
format(date, 'MMMMM', { locale: enUS }); // "J" (January)
format(date, 'MMMMM', { locale: ja });    // "1"

// Weekday (narrow)
format(date, 'EEEEE', { locale: enUS }); // "W" (Wednesday)
format(date, 'EEEEE', { locale: ja });    // "水"
```

### Abbreviated

Medium-length representation:

```typescript
// Month (abbreviated)
format(date, 'MMM', { locale: enUS }); // "Jan"
format(date, 'MMM', { locale: ja });    // "1月"

// Weekday (abbreviated)
format(date, 'EEE', { locale: enUS }); // "Wed"
format(date, 'EEE', { locale: ja });    // "水"
```

### Wide

Full representation:

```typescript
// Month (wide)
format(date, 'MMMM', { locale: enUS }); // "January"
format(date, 'MMMM', { locale: ja });    // "1月"

// Weekday (wide)
format(date, 'EEEE', { locale: enUS }); // "Wednesday"
format(date, 'EEEE', { locale: ja });    // "水曜日"
```

---

## Creating Custom Locales

You can create custom locales by implementing the `Locale` type:

### Locale Type Definition

```typescript
// Type definitions (exported from 'chronia')
type Locale = {
  era: {
    narrow: readonly [string, string];  // BC, AD
    abbr: readonly [string, string];
    wide: readonly [string, string];
  };
  month: {
    narrow: readonly string[];  // 12 elements (Jan-Dec)
    abbr: readonly string[];
    wide: readonly string[];
  };
  weekday: {
    narrow: readonly string[];  // 7 elements (Sun-Sat)
    abbr: readonly string[];
    wide: readonly string[];
  };
  dayPeriod: {
    narrow: readonly [string, string];  // AM, PM
    abbr: readonly [string, string];
    wide: readonly [string, string];
  };
};
```

### Custom Locale Example: British English

```typescript
import { Locale } from 'chronia';

export const enGB: Locale = {
  era: {
    narrow: ["B", "A"],
    abbr: ["BC", "AD"],
    wide: ["Before Christ", "Anno Domini"],
  },
  month: {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  },
  weekday: {
    narrow: ["S", "M", "T", "W", "T", "F", "S"],
    abbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  },
  dayPeriod: {
    narrow: ["a", "p"],
    abbr: ["am", "pm"],
    wide: ["am", "pm"],
  },
};
```

### Custom Locale Example: French

```typescript
import { Locale } from 'chronia';

export const fr: Locale = {
  era: {
    narrow: ["av. J.-C.", "ap. J.-C."],
    abbr: ["av. J.-C.", "ap. J.-C."],
    wide: ["avant Jésus-Christ", "après Jésus-Christ"],
  },
  month: {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbr: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
    wide: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
  },
  weekday: {
    narrow: ["D", "L", "M", "M", "J", "V", "S"],
    abbr: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
    wide: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
  },
  dayPeriod: {
    narrow: ["AM", "PM"],
    abbr: ["AM", "PM"],
    wide: ["AM", "PM"],
  },
};
```

---

## Locale Data Structure Requirements

When creating a custom locale, ensure the following:

### Required Properties

All four properties must be defined:

- `era` - Era names (BC/AD)
- `month` - Month names
- `weekday` - Weekday names
- `dayPeriod` - Day period names (AM/PM)

### Required Widths

Each property must provide all three widths:

- `narrow` - Shortest form
- `abbr` - Abbreviated form
- `wide` - Full form

### Array Elements

Each array must contain the exact number of elements:

- `era`: **2 elements** (BC, AD)
- `month`: **12 elements** (January to December, 0-indexed)
- `weekday`: **7 elements** (Sunday to Saturday, 0-indexed)
- `dayPeriod`: **2 elements** (AM, PM)

### Immutability

All arrays should be marked as `readonly` using `as const`:

```typescript
// Correct
narrow: ["B", "A"] as const

// Incorrect (not readonly)
narrow: ["B", "A"]
```

---

## Index Mapping

### Month Index (0-11)

Month arrays use 0-based indexing:

| Index | Month     |
|-------|-----------|
| 0     | January   |
| 1     | February  |
| 2     | March     |
| ...   | ...       |
| 11    | December  |

### Weekday Index (0-6)

Weekday arrays use 0-based indexing starting with Sunday:

| Index | Weekday   |
|-------|-----------|
| 0     | Sunday    |
| 1     | Monday    |
| 2     | Tuesday   |
| ...   | ...       |
| 6     | Saturday  |

### Era Index (0-1)

Era arrays use 0-based indexing:

| Index | Era |
|-------|-----|
| 0     | BC  |
| 1     | AD  |

### Day Period Index (0-1)

Day period arrays use 0-based indexing:

| Index | Period |
|-------|--------|
| 0     | AM     |
| 1     | PM     |

---

## Best Practices

### 1. Follow Existing Locale Structure

When creating a new locale, use the existing `enUS` or `ja` locales as templates:

```typescript
// Reference existing locale
import { enUS } from 'chronia/i18n';

// Create new locale with same structure
export const myLocale: Locale = {
  era: {
    narrow: [...],
    abbr: [...],
    wide: [...]
  },
  // ... copy structure from enUS
};
```

### 2. Provide Culturally Appropriate Data

Ensure data matches the target culture:

```typescript
// Japanese locale uses numeric month representation
month: {
  narrow: ["1", "2", "3", ...],
  abbr: ["1月", "2月", "3月", ...],
  wide: ["1月", "2月", "3月", ...]
}

// English locale uses alphabetic month names
month: {
  narrow: ["J", "F", "M", ...],
  abbr: ["Jan", "Feb", "Mar", ...],
  wide: ["January", "February", "March", ...]
}
```

### 3. Handle Width Variations

Some locales may use the same value for multiple widths:

```typescript
// Japanese weekday: narrow and abbr are identical
weekday: {
  narrow: ["日", "月", "火", "水", "木", "金", "土"],
  abbr: ["日", "月", "火", "水", "木", "金", "土"],  // Same as narrow
  wide: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"]
}
```

### 4. Maintain Readonly Arrays

Always use `readonly` to ensure immutability:

```typescript
// Correct
era: {
  narrow: ["B", "A"] as const,
  // or
  narrow: readonly ["B", "A"]
}

// This prevents accidental mutation
locale.era.narrow[0] = "X";  // TypeScript error
```

---

## Extensibility

Chronia's data-driven locale architecture allows adding new locales without modifying the library's core code:

### Future Locale Support

The current architecture supports adding:

- **English variants**: British English (`en-GB`), Australian English (`en-AU`), Canadian English (`en-CA`)
- **Other languages**: French (`fr`), German (`de`), Spanish (`es`), Chinese (`zh`), etc.

### No Code Changes Required

When adding a new locale:

1. ✅ Create locale data file
2. ✅ Export from `chronia/i18n`
3. ❌ **No changes to `format()` or `parse()` functions**
4. ❌ **No changes to token handlers**

The locale system automatically handles new locales through the data-driven design.

---

## Reference Locales

### Reference: American English (`enUS`)

See the complete definition: [`src/i18n/en-US/index.ts`](../../src/i18n/en-US/index.ts)

```typescript
export const enUS: Locale = {
  era: {
    narrow: ["B", "A"],
    abbr: ["BC", "AD"],
    wide: ["Before Christ", "Anno Domini"],
  },
  month: {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  },
  weekday: {
    narrow: ["S", "M", "T", "W", "T", "F", "S"],
    abbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  },
  dayPeriod: {
    narrow: ["a", "p"],
    abbr: ["AM", "PM"],
    wide: ["a.m.", "p.m."],
  },
};
```

### Reference: Japanese (`ja`)

See the complete definition: [`src/i18n/ja/index.ts`](../../src/i18n/ja/index.ts)

```typescript
export const ja: Locale = {
  era: {
    narrow: ["BC", "AD"],
    abbr: ["紀元前", "西暦"],
    wide: ["紀元前", "西暦"],
  },
  month: {
    narrow: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    abbr: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    wide: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
  },
  weekday: {
    narrow: ["日", "月", "火", "水", "木", "金", "土"],
    abbr: ["日", "月", "火", "水", "木", "金", "土"],
    wide: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
  },
  dayPeriod: {
    narrow: ["午前", "午後"],
    abbr: ["午前", "午後"],
    wide: ["午前", "午後"],
  },
};
```

---

## See Also

- [Formatting Guide](../functions/formatting/) - Using `format()` with locales
- [Parsing Guide](../functions/parsing/) - Using `parse()` with locales
- [Type Definitions](../../src/types.ts) - Complete `Locale` type definition
