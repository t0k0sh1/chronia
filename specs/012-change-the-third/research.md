# Research: compare()関数の第3引数をオプションオブジェクトに変更

**Date**: 2025-01-14
**Feature**: compare() function API refactoring
**Status**: Complete

## Overview
This document consolidates research findings and technical decisions for refactoring the `compare()` function's third parameter from a string (`"ASC" | "DESC"`) to an options object (`CompareOptions`).

## Research Questions

### 1. Parameter Design: Optional vs Required with Default

**Question**: Should the `options` parameter be optional (`options?: CompareOptions`) or required with a default value (`options: CompareOptions = { order: "ASC" }`)?

**Research Findings**:
- User requirement: "optionsは必須かつデフォルト値ありにします" (options is required with default value)
- TypeScript supports required parameters with default values
- This pattern is used in established libraries (e.g., `Array.prototype.toSorted()` in ES2023)

**Decision**: **Required with default value**
```typescript
function compare(
  date1: Date | number,
  date2: Date | number,
  options: CompareOptions = { order: "ASC" }
): number
```

**Rationale**:
- **Type Safety**: Required parameter enforces options object shape at all call sites
- **Ergonomics**: Default value maintains convenience (`compare(a, b)` still works)
- **Future Extensions**: Required parameter with defaults makes adding new options easier
- **User Intent**: Explicitly requested by user

**Alternatives Considered**:
| Alternative | Pros | Cons | Rejected Because |
|-------------|------|------|------------------|
| Optional parameter (`options?:`) | More common pattern | Allows undefined, less explicit | User requested required |
| No default value | Forces explicit options | Breaks ergonomics | User requested default value |
| Overloaded signatures | Type flexibility | Complex, hard to maintain | Over-engineering |

### 2. CompareOptions Type Structure

**Question**: Should `order` be required or optional in `CompareOptions`?

**Research Findings**:
- Feature spec FR-004: "optionsオブジェクトが空の場合、システムはデフォルトで昇順（\"ASC\"）にしなければならない"
- This requires accepting `{}` as valid input
- date-fns pattern: options properties are generally optional
- Day.js pattern: options use optional properties with defaults

**Decision**: **Optional `order` property**
```typescript
interface CompareOptions {
  order?: "ASC" | "DESC";
}
```

**Rationale**:
- **Specification Compliance**: Must support empty object `{}`
- **Flexibility**: Allows partial options objects
- **Extensibility**: New properties can be added without breaking changes
- **Industry Pattern**: Matches established date library patterns

**Alternatives Considered**:
| Alternative | Pros | Cons | Rejected Because |
|-------------|------|------|------------------|
| Required `order` | More explicit | Breaks FR-004, less flexible | Violates spec |
| Union type `{ order: "ASC" } \| { order: "DESC" }` | Precise typing | Can't represent `{}`, complex | Violates FR-004 |
| Discriminated union | Type narrowing | Over-complex for simple option | Over-engineering |

### 3. Backward Compatibility Strategy

**Question**: Should we maintain backward compatibility with the old string parameter API?

**Research Findings**:
- User statement: "破壊的変更を許容します" (breaking changes are acceptable)
- Current package.json version: 1.0.0
- README.md states: "This library is currently in the **v0.1.x** stage. Breaking changes may occur at any time without prior notice."
- Actual status: v1.0.0 not yet published to npm
- SemVer policy: Pre-1.0.0 releases allow breaking changes without major version bump

**Decision**: **No backward compatibility** (complete breaking change)

**Rationale**:
- **User Approval**: Explicitly approved breaking changes
- **Pre-Release Status**: Not yet published to npm, no real-world users to break
- **Code Cleanliness**: Avoiding dual API support keeps code simple
- **Clearer Intent**: Single API surface is easier to document and maintain

**Migration Path** (for documentation):
```typescript
// Old API (no longer supported)
compare(date1, date2, "DESC")

// New API
compare(date1, date2, { order: "DESC" })

// Default remains the same
compare(date1, date2) // ASC (default)
```

**Alternatives Considered**:
| Alternative | Pros | Cons | Rejected Because |
|-------------|------|------|------------------|
| Dual API (`string \| object`) | No breaking change | Complex validation, type narrowing | User approved breaking |
| Deprecation warnings | Gradual migration | Adds runtime overhead, complexity | Pre-1.0.0 status |
| Version guard (v2.0.0) | SemVer compliant | Unnecessary delay | Not yet published |

### 4. Options Validation Strategy

**Question**: How should we validate and handle invalid options values?

**Research Findings**:
- Current project policy: "This library **does not use exceptions** for error reporting"
- Error return values: Date → Invalid Date, number → NaN, boolean → false
- Feature spec FR-005: "orderプロパティに無効な値が含まれている場合、システムはデフォルトで昇順（\"ASC\"）にしなければならない"
- Feature spec FR-006: "システムは大文字小文字を区別しないorder値を処理しなければならない"
- Feature spec FR-011: "システムは第3パラメータとして`null`および`undefined`を処理し、昇順をデフォルトにしなければならない"
- Feature spec FR-012: "システムはoptionsオブジェクト内の未知のプロパティをエラーをスローせずに無視しなければならない"

**Decision**: **Lenient validation with defaults**
```typescript
// Pseudo-code for validation logic
const normalizedOrder =
  options?.order?.toUpperCase() === "DESC"
    ? "DESC"
    : "ASC";
```

**Rationale**:
- **Policy Compliance**: No exceptions thrown
- **Graceful Degradation**: Invalid values default to safe behavior (ASC)
- **Case Insensitivity**: Handles various casing (FR-006)
- **Permissive**: Ignores unknown properties (FR-012)
- **Null Safety**: Handles null/undefined gracefully (FR-011)

**Validation Rules**:
| Input | Normalized Output | Reason |
|-------|------------------|--------|
| `{ order: "DESC" }` | `"DESC"` | Valid uppercase |
| `{ order: "desc" }` | `"DESC"` | Case-insensitive (FR-006) |
| `{ order: "ASC" }` | `"ASC"` | Valid uppercase |
| `{ order: "asc" }` | `"ASC"` | Case-insensitive (FR-006) |
| `{ order: "invalid" }` | `"ASC"` | Invalid → default (FR-005) |
| `{}` | `"ASC"` | Empty → default (FR-004) |
| `{ order: "DESC", extra: true }` | `"DESC"` | Ignore extra props (FR-012) |
| `null` | `"ASC"` | Null → default (FR-011) |
| `undefined` | `"ASC"` | Undefined → default (FR-011) |

**Alternatives Considered**:
| Alternative | Pros | Cons | Rejected Because |
|-------------|------|------|------------------|
| Strict validation with exceptions | Clear error reporting | Violates project policy | No-exception policy |
| Strict typing only (no runtime) | TypeScript safety | Runtime type issues in JS | Need runtime safety |
| Case-sensitive only | Simpler logic | Violates FR-006 | Spec requirement |

### 5. Test Migration Strategy

**Question**: How should we update existing 70+ test cases?

**Research Findings**:
- Current test structure: Vitest with `it.each()` table-driven tests
- Test categories: Contract (8 tests), Basic scenarios (12), Array.sort integration (4), Error handling (20+), Edge cases (10+), Performance (skipped), Compatibility (15), Mixed types (7), Real-world (3)
- Total: ~74 test cases
- Many tests use DESC order parameter: `compare(a, b, "DESC")`

**Decision**: **Systematic update of all existing tests**

**Migration Steps**:
1. Find and replace string literals in test calls
   - `compare(a, b, "DESC")` → `compare(a, b, { order: "DESC" })`
   - `compare(a, b, "ASC")` → `compare(a, b, { order: "ASC" })`
2. Update `it.each` table data structures where order is specified
3. Add new test cases for options-specific behavior:
   - Empty object `{}` defaults to ASC
   - Case-insensitive order values
   - Invalid order values default to ASC
   - Unknown properties are ignored
   - Null/undefined options default to ASC
4. Keep all existing coverage intact (no test removal)

**Rationale**:
- **Preserve Coverage**: All existing edge cases remain tested
- **Efficiency**: Table-driven tests make bulk updates easier
- **TDD Compliance**: Tests updated to fail, then implementation fixes them
- **Comprehensive**: New tests cover new behavior (options validation)

**Estimated Impact**:
- ~40 tests need parameter updates (DESC order usage)
- ~5 new test cases for options-specific behavior
- No test removal (all current coverage preserved)

**Alternatives Considered**:
| Alternative | Pros | Cons | Rejected Because |
|-------------|------|------|------------------|
| Rewrite all tests | Fresh start, clean slate | Huge effort, risk of losing coverage | Unnecessary |
| Keep old tests with `@ts-expect-error` | No test changes | Clutters code, runtime breaks | Breaks at runtime |
| Minimal updates only | Less work | Loses validation coverage | Need comprehensive tests |

### 6. Documentation Update Requirements

**Question**: What documentation needs updating for this breaking change?

**Research Findings**:
- Current documentation locations:
  - JSDoc in `src/compare/index.ts` (extensive inline docs)
  - README.md "Comparison" section (line 227-236)
  - TypeDoc generated docs (not in repo, built from JSDoc)
  - CHANGELOG.md (version history)

**Decision**: **Complete documentation update**

**Files to Update**:
1. **src/compare/index.ts** (JSDoc):
   - Update function signature in comments
   - Update all `@example` sections to use options object
   - Update `@param` for third parameter
   - Remove notes about case-insensitive string parameters
   - Add notes about case-insensitive order property
   - Add examples for empty object, unknown properties

2. **README.md**:
   - Update "Comparison" section code examples
   - Show new API: `compare(date1, date2, { order: "DESC" })`
   - Update Array.sort examples: `dates.sort((a, b) => compare(a, b, { order: "DESC" }))`

3. **CHANGELOG.md**:
   - Add breaking change entry for next version
   - Document migration path clearly
   - Note: Options parameter is required with default value

4. **TypeDoc** (auto-generated):
   - Will update automatically from JSDoc changes
   - No manual intervention needed

**Rationale**:
- **User Guidance**: Breaking changes require clear migration docs
- **Discoverability**: Updated JSDoc appears in IDE IntelliSense
- **Completeness**: All examples must work with new API
- **Version History**: CHANGELOG tracks breaking changes for users

**Documentation Template for Breaking Change**:
```markdown
## [Next Version] - TBD

### BREAKING CHANGES

#### compare() function signature changed

The third parameter of `compare()` has been changed from a string to an options object.

**Before:**
```typescript
compare(date1, date2, "DESC")
```

**After:**
```typescript
compare(date1, date2, { order: "DESC" })
```

The default behavior (ascending order) remains unchanged when the third parameter is omitted.

**Migration Guide:**
- Replace `"DESC"` with `{ order: "DESC" }`
- Replace `"ASC"` with `{ order: "ASC" }` (or omit for default)
- TypeScript will show type errors at all call sites needing updates
```

**Alternatives Considered**:
| Alternative | Pros | Cons | Rejected Because |
|-------------|------|------|------------------|
| Document both APIs | Covers migration period | Confusing, old API broken | Clean break preferred |
| Minimal docs | Less work | Users struggle with migration | Poor UX |
| README only | Quick update | JSDoc out of sync | Need inline docs |

## Performance Analysis

### Current Performance Baseline
From existing performance tests (skipped by default):
- 10,000 Date sorts: <120ms
- 10,000 timestamp sorts: <120ms
- 10,000 mixed sorts: <120ms
- 10,000 individual comparisons: <120ms

### Expected Impact of Options Object

**Theoretical Overhead**:
```typescript
// Old implementation
if (order?.toUpperCase() === "DESC") { ... }

// New implementation
if (options?.order?.toUpperCase() === "DESC") { ... }
```

**Analysis**:
- Added: One additional property access (`options.order` vs direct `order`)
- Property access cost: ~1-2ns on modern JavaScript engines
- Overall impact: Negligible (<1% overhead for 10k operations)
- Object creation: Default value `{ order: "ASC" }` created once per function definition (not per call)

**Conclusion**: No measurable performance degradation expected. Existing performance tests will verify this.

## Type Safety Analysis

### TypeScript Strictness
Current tsconfig.json enables:
- `strict: true`
- All strict checks enabled

### Type Coverage

**Before (string parameter)**:
```typescript
compare(date1, date2, "DESC") // Type: "ASC" | "DESC" | undefined
```

**After (options object)**:
```typescript
compare(date1, date2, { order: "DESC" }) // Type: CompareOptions
```

**Benefits**:
1. **Autocomplete**: IDE suggests `{ order: }` structure
2. **Property Safety**: Typos in property names caught at compile time
3. **Future Extensions**: Adding new options doesn't break existing signatures
4. **Documentation**: Interface definition serves as inline docs

**Potential Issues**:
- **None identified**: TypeScript migration is straightforward
- Existing call sites will show type errors (expected for breaking change)
- Errors guide users to correct migration

## Summary of Decisions

| Decision Point | Chosen Approach | Key Rationale |
|----------------|----------------|---------------|
| Parameter design | Required with default value | User request, type safety, ergonomics |
| Options structure | Optional order property | FR-004 compliance, extensibility |
| Backward compatibility | None (breaking change) | User approval, pre-1.0.0 status |
| Validation strategy | Lenient with defaults | No-exception policy, graceful degradation |
| Test migration | Systematic update of all tests | Preserve coverage, TDD compliance |
| Documentation | Complete update (JSDoc, README, CHANGELOG) | Clear migration, discoverability |
| Performance | No optimization needed | Negligible overhead expected |
| Type safety | Leverage strict TypeScript | Catch errors at compile time |

## Next Steps (Phase 1)
1. Generate data-model.md (CompareOptions interface definition)
2. Create contract tests in tests/contract/compare-options.test.ts
3. Generate quickstart.md (step-by-step validation guide)
4. Update CLAUDE.md with context about this change

---
**Research Complete**: All technical questions resolved. Ready for Phase 1 (Design & Contracts).
