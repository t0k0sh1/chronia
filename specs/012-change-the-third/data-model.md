# Data Model: CompareOptions

**Feature**: compare() function API refactoring
**Date**: 2025-01-14
**Status**: Design Complete

## Overview
This document defines the data model for the `CompareOptions` interface, which replaces the third string parameter of the `compare()` function.

## Entity: CompareOptions

### Purpose
Configuration object for specifying comparison behavior in the `compare()` function.

### Type Definition
```typescript
/**
 * Options for configuring the compare() function behavior.
 *
 * @property order - Sort order for comparison results.
 *                   "ASC" (default) for ascending order (-1, 0, 1).
 *                   "DESC" for descending order (1, 0, -1).
 *                   Case-insensitive at runtime.
 */
export interface CompareOptions {
  /**
   * Sort order for comparison results.
   * @default "ASC"
   */
  order?: "ASC" | "DESC";
}
```

### Location in Codebase
- **Primary definition**: `src/types/index.ts` (exported from types module)
- **Re-exported from**: `src/index.ts` (main entry point)
- **Used in**: `src/compare/index.ts` (function parameter type)

### Properties

#### `order?: "ASC" | "DESC"`
- **Type**: Optional union of literal strings
- **Default value**: `"ASC"` (ascending order)
- **Valid values**:
  - `"ASC"`: Ascending order (earlier dates first)
  - `"DESC"`: Descending order (later dates first)
- **Invalid values**: Any other string defaults to `"ASC"` at runtime
- **Case sensitivity**: Type requires uppercase, but runtime accepts case-insensitive values (FR-006)

## Validation Rules

### Compile-Time Validation (TypeScript)
```typescript
// Valid at compile time
const valid1: CompareOptions = { order: "ASC" };
const valid2: CompareOptions = { order: "DESC" };
const valid3: CompareOptions = {}; // order is optional

// Invalid at compile time (TypeScript errors)
const invalid1: CompareOptions = { order: "asc" }; // Type error: must be uppercase
const invalid2: CompareOptions = { order: "invalid" }; // Type error: not in union
const invalid3: CompareOptions = { unknown: true }; // Type error: excess property
```

### Runtime Validation
The `compare()` function applies these runtime rules:

| Input | Normalized Order | Behavior | Spec Reference |
|-------|-----------------|----------|----------------|
| `{ order: "DESC" }` | `"DESC"` | Descending order | FR-002 |
| `{ order: "desc" }` | `"DESC"` | Case-insensitive normalization | FR-006 |
| `{ order: "Desc" }` | `"DESC"` | Case-insensitive normalization | FR-006 |
| `{ order: "ASC" }` | `"ASC"` | Ascending order | FR-002 |
| `{ order: "asc" }` | `"ASC"` | Case-insensitive normalization | FR-006 |
| `{ order: "invalid" as any }` | `"ASC"` | Invalid → default | FR-005 |
| `{}` | `"ASC"` | Empty object → default | FR-004 |
| `{ order: "DESC", extra: true } as any` | `"DESC"` | Ignore unknown properties | FR-012 |
| `undefined` | `"ASC"` | Undefined → default | FR-003, FR-011 |
| `null as any` | `"ASC"` | Null → default | FR-011 |

### Validation Logic (Pseudo-code)
```typescript
function normalizeOptions(options: CompareOptions = { order: "ASC" }): "ASC" | "DESC" {
  // Handle null/undefined gracefully (FR-011)
  if (options === null || options === undefined) {
    return "ASC";
  }

  // Handle missing or invalid order property (FR-004, FR-005)
  if (!options.order || typeof options.order !== "string") {
    return "ASC";
  }

  // Case-insensitive normalization (FR-006)
  const upperOrder = options.order.toUpperCase();

  // Only "DESC" changes behavior, everything else defaults to "ASC" (FR-005)
  return upperOrder === "DESC" ? "DESC" : "ASC";
}
```

## State Transitions
N/A - `CompareOptions` is an immutable configuration object with no state transitions.

## Relationships

### Used By
- **Function**: `compare(date1, date2, options)`
  - Relationship: Required parameter with default value
  - Usage: Configuration for comparison behavior
  - Lifecycle: Created at call site, used once per comparison

### Extends
- None (standalone interface)

### Implemented By
- Runtime objects passed to `compare()` function
- Literal objects: `{ order: "DESC" }`
- Default value: `{ order: "ASC" }`

## Future Extensibility

### Potential Additional Properties
The interface is designed for future extension without breaking changes:

```typescript
// Future possibilities (not implemented in this feature)
export interface CompareOptions {
  order?: "ASC" | "DESC";

  // Future: Locale-aware comparison
  locale?: Locale;

  // Future: Custom comparison function
  compareFn?: (a: Date, b: Date) => number;

  // Future: Null/undefined handling strategy
  nullHandling?: "first" | "last" | "error";
}
```

### Extension Strategy
- New properties should be optional (backward compatible)
- Default behavior should match current behavior (when property omitted)
- Unknown properties at runtime should be ignored (FR-012)

## Constraints

### Design Constraints
1. **Optional properties only**: All properties must be optional to allow `{}` as valid input (FR-004)
2. **No required properties**: Would break empty object support
3. **Immutable**: Options objects should not be mutated by `compare()` function
4. **Serializable**: Must be JSON-serializable for future logging/debugging

### Technical Constraints
1. **TypeScript strict mode**: Must pass all strict checks
2. **No runtime dependencies**: Pure TypeScript types, no validation libraries
3. **Tree-shakable**: Type definitions don't add runtime overhead
4. **Backward compatible with future extensions**: New properties don't break old code

## Examples

### Basic Usage
```typescript
import { compare, CompareOptions } from "chronia";

// Explicit ascending order
const options1: CompareOptions = { order: "ASC" };
compare(date1, date2, options1); // -1, 0, or 1

// Explicit descending order
const options2: CompareOptions = { order: "DESC" };
compare(date1, date2, options2); // 1, 0, or -1

// Default behavior (empty object)
compare(date1, date2, {}); // Same as { order: "ASC" }

// Default behavior (parameter omitted)
compare(date1, date2); // Same as { order: "ASC" }
```

### Array Sorting
```typescript
// Ascending sort (default)
dates.sort((a, b) => compare(a, b));

// Descending sort (explicit)
dates.sort((a, b) => compare(a, b, { order: "DESC" }));

// Reusable options
const descendingOptions: CompareOptions = { order: "DESC" };
dates.sort((a, b) => compare(a, b, descendingOptions));
```

### Runtime Case-Insensitive
```typescript
// TypeScript will error, but works at runtime (not recommended)
// @ts-expect-error - Runtime accepts case-insensitive
compare(date1, date2, { order: "desc" }); // Works as "DESC"

// Correct way (uppercase in TypeScript)
compare(date1, date2, { order: "DESC" }); // Type-safe
```

### Error Handling
```typescript
// Invalid order value (runtime default to ASC)
// @ts-expect-error - TypeScript catches invalid value
compare(date1, date2, { order: "invalid" }); // Treated as "ASC"

// Unknown properties ignored (runtime)
// @ts-expect-error - TypeScript catches excess property
compare(date1, date2, { order: "DESC", unknown: true }); // "DESC" used, unknown ignored
```

## Type Export Strategy

### Public API
```typescript
// src/types/index.ts
export interface CompareOptions {
  order?: "ASC" | "DESC";
}

// src/index.ts (main entry point)
export { CompareOptions } from "./types";
export { compare } from "./compare";
```

### Usage by Consumers
```typescript
// Named import (recommended)
import { compare, CompareOptions } from "chronia";

// Type-only import (for type annotations)
import type { CompareOptions } from "chronia";

// Inline type (not recommended, loses type safety)
const options = { order: "DESC" };
compare(date1, date2, options); // Type inferred as { order: string }
```

## Testing Strategy

### Unit Tests for Type Definition
- Type checking tests (compile-time only)
- No runtime tests for interface itself (tested via `compare()` function)

### Integration Tests for Runtime Behavior
See `contracts/compare-options.contract.ts` for:
- Default value behavior
- Case-insensitive order values
- Invalid order values
- Empty options object
- Null/undefined options
- Unknown properties handling

## Validation Against Requirements

| Requirement | Validation |
|-------------|------------|
| FR-001: Accept options object | ✅ Interface defined, accepted by `compare()` |
| FR-002: Support ASC/DESC | ✅ `order` property with literal union type |
| FR-003: Default to ASC when omitted | ✅ Optional property with default value |
| FR-004: Default to ASC when empty | ✅ Optional `order` property allows `{}` |
| FR-005: Default to ASC for invalid | ✅ Runtime validation normalizes invalid → ASC |
| FR-006: Case-insensitive handling | ✅ Runtime normalization via `toUpperCase()` |
| FR-010: Type safety maintained | ✅ TypeScript interface with strict types |
| FR-011: Handle null/undefined | ✅ Runtime validation checks for null/undefined |
| FR-012: Ignore unknown properties | ✅ Runtime ignores non-`order` properties |

---
**Data Model Complete**: CompareOptions interface fully specified and validated against all requirements.
