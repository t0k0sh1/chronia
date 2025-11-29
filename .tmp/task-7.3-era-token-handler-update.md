# Task 7.3: Era Token Handler Update

## Overview
Updated era token handlers to use the new data-driven Locale structure and localeHelpers.getEraName function, removing hardcoded English data.

## Changes Made

### 1. Formatter Token Handler (`src/_lib/formatters/tokens/era.ts`)

**Before:**
- Used `locale.era(era, { width })` method-based API
- Had hardcoded English fallback ("AD"/"BC")
- Conditional locale checking

**After:**
- Uses `getEraName(locale, era, width)` helper function
- Removed hardcoded English data
- getEraName handles defaultLocale fallback internally
- Simplified logic with no conditional locale checking

### 2. Parser Token Handler (`src/_lib/parsers/tokens/era.ts`)

**Before:**
- Used `locale.era(era, { width })` method-based API
- Had complex English fallback logic for "AD"/"BC"/"CE"/"BCE"
- Supported case-insensitive matching with uppercase conversion

**After:**
- Uses `getEraName(locale, era, width)` helper function
- Removed dependency on locale being defined
- Maintains backward compatibility with additional English variants:
  - "CE", "BCE" (not in default en-US locale)
  - Case-insensitive variants ("ad", "bc", "Ad", "Bc", etc.)
- Improved longest-match-first algorithm by combining locale data and fallback variants

### 3. Default Locale Import Fix (`src/_lib/defaultLocale.ts`)

**Fixed:** Import path from `../i18n/en-US/index` to `../i18n/en-US` (TypeScript auto-resolves index.ts)

### 4. Test Updates

**Updated test mocks** in:
- `tests/_lib/formatters/tokens/era.test.ts`
- `tests/_lib/parsers/tokens/era.test.ts`

Changed from method-based Locale structure:
```typescript
era: (era, options) => {...}
```

To data-driven Locale structure:
```typescript
era: {
  narrow: ["B", "A"],
  abbr: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"],
}
```

## Test Results

### Era-Specific Tests
- ✅ `tests/_lib/formatters/tokens/era.test.ts` - 8/8 tests passing
- ✅ `tests/_lib/parsers/tokens/era.test.ts` - 17/17 tests passing

### Build & Lint
- ✅ `pnpm lint` - No errors
- ✅ `pnpm build` - Successful compilation

## Implementation Details

### Formatter
- Maps token patterns to width:
  - `G`, `GG`, `GGG` → "abbr"
  - `GGGG` → "wide"
  - `GGGGG` → "narrow"
- Era value calculation: `rawYear > 0 ? 1 : 0`
- Uses `getEraName(locale, era, width)` for all cases

### Parser
- Collects all era variants from locale (wide, abbr, narrow)
- Adds additional English fallback variants for compatibility:
  - AD variants: "CE", "ce", "Ce", "cE", "ad", "Ad", "aD"
  - BC variants: "BCE", "bce", etc., "bc", "Bc", "bC"
- Sorts by length (longest first) to prefer longer matches
- Tries BC/BCE before AD/CE to handle "BCE" vs "BC" correctly
- Maintains year conversion logic: `year = -year + 1` for BC dates

## Benefits

1. **Consistency:** Uses centralized localeHelpers instead of duplicated logic
2. **Maintainability:** Locale data and access logic are separated
3. **Extensibility:** Easy to add new locales without modifying token handlers
4. **Backward Compatibility:** Maintains support for "CE"/"BCE" and case-insensitive parsing
5. **Type Safety:** TypeScript enforces valid width and era values

## No-Exceptions Policy

✅ Maintained: No exceptions are thrown. Invalid inputs return empty string (formatter) or null (parser).
