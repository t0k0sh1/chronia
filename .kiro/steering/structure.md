# Project Structure

## Organization Philosophy

**Function-per-file Modular Design** - Each public function lives in its own directory under `src/`, with corresponding test files mirroring the structure under `tests/`. Internal utilities are isolated in `_lib/` and not exported. This enables aggressive tree-shaking and clear separation of concerns.

## Directory Patterns

### Public Functions
**Location**: `/src/{functionName}/index.ts`
**Purpose**: Exported utility functions (70 total: arithmetic, comparison, getters, setters, etc.)
**Example**:
```typescript
// src/addDays/index.ts
export function addDays(date: Date | number, amount: number): Date { ... }
```

### Internal Utilities
**Location**: `/src/_lib/`
**Purpose**: Private helpers not exposed in public API (validators, tokenizers, formatters/parsers)
**Example**:
- `_lib/validators.ts` - Input validation (`isValidDateOrNumber`, `isValidNumber`)
- `_lib/tokenize.ts` - Pattern tokenization for format/parse
- `_lib/formatters/tokens/` - Format token handlers (year, month, day, etc.)
- `_lib/parsers/tokens/` - Parse token handlers (year, month, day, etc.)

### Internationalization
**Location**: `/src/i18n/{locale}/index.ts`
**Purpose**: Locale definitions for localized formatting (month names, weekdays, eras, day periods)
**Example**:
- `i18n/en-US/` - English locale
- `i18n/ja/` - Japanese locale

### Tests
**Location**: `/tests/{functionName}.test.ts`
**Purpose**: Vitest test files mirroring source structure
**Example**:
- `tests/addDays.test.ts` - Tests for `src/addDays/index.ts`
- `tests/_lib/validators.test.ts` - Tests for `src/_lib/validators.ts`

### Documentation
**Location**: `/docs/`
**Purpose**: AI-optimized documentation (function categories, guidelines, troubleshooting)
**Example**:
- `docs/functions/arithmetic/addition.md` - Detailed docs for add* functions
- `docs/guidelines/error-handling.md` - Error handling patterns

## Naming Conventions

- **Files**: camelCase for function names (`addDays`, `format`), kebab-case for utilities (`_lib/truncateToUnit`)
- **Functions**: camelCase verbs (`addDays`, `isAfter`, `format`)
- **Types**: PascalCase (`Locale`, `Interval`, `TimeUnit`)
- **Constants**: SCREAMING_SNAKE_CASE (exported from `constants.ts`)

## Import Organization

```typescript
// Internal utilities (relative imports within _lib)
import { tokenize } from "../_lib/tokenize";

// Public exports (relative imports from function directories)
import { isValidDateOrNumber } from "../_lib/validators";

// Types (relative imports)
import { Locale } from "../types";
```

**No Path Aliases** - Project does not use path aliases (`@/`); all imports are relative.

## Code Organization Principles

- **Single Responsibility** - Each file exports one primary function
- **No Circular Dependencies** - Internal utilities are leaf nodes; public functions depend on utilities, not vice versa
- **Validation at Entry** - All public functions validate inputs using `_lib/validators` before processing
- **Immutability** - All functions return new objects (Date instances are never mutated)
- **Stateless Functions** - No module-level state; all inputs passed as parameters

---
_Generated from codebase: 2025-11-20_
