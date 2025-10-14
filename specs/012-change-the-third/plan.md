# Implementation Plan: compare()関数の第3引数をオプションオブジェクトに変更

**Branch**: `012-change-the-third` | **Date**: 2025-01-14 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/Users/t0k0sh1/Workspace/chronia/specs/012-change-the-third/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → Loaded successfully
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → All technical details resolved through codebase analysis
3. Fill the Constitution Check section based on the content of the constitution document.
   → Constitution file is template-only, no project-specific principles defined yet
4. Evaluate Constitution Check section below
   → No violations (constitution not yet ratified)
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → Technical decisions documented
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, CLAUDE.md
   → API contracts generated
   → Data model defined
   → Quickstart guide created
7. Re-evaluate Constitution Check section
   → No violations
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
   → Task planning strategy documented
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 9. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
この機能は、`compare()`関数の第3引数を文字列(`"ASC" | "DESC"`)からオプションオブジェクト(`CompareOptions`)に変更します。これは破壊的変更ですが、v1.0.0リリース前のため、現在のバージョンで実施可能です。変更により、APIの拡張性が向上し、将来的にロケール対応やカスタム比較関数などの追加オプションをサポートしやすくなります。

## Technical Context
**Language/Version**: TypeScript 5.9+
**Primary Dependencies**: Vitest 3.2.4 (testing), tsup 8.5.0 (build), ESLint 9.35.0 (linting)
**Storage**: N/A (pure function library)
**Testing**: Vitest with table-driven tests (`it.each`)
**Target Platform**: Node.js 18+ (ESM/CJS dual module support)
**Project Type**: single (library with src/ and tests/ directories)
**Performance Goals**: Maintain current performance (<120ms for 10k sorts), no degradation from string to object parameter
**Constraints**:
- Error handling policy: No exceptions, return NaN for invalid inputs
- Backward compatibility: NOT maintained (breaking change, but pre-v1.0.0)
- TypeScript strict mode enabled
- Must work with Array.sort() (return -1, 0, 1)
**Scale/Scope**: Single function refactoring with ~70 existing test cases

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Status**: ✅ PASS (Constitution file is template-only, no project-specific principles ratified yet)

**Note**: The constitution file at `.specify/memory/constitution.md` contains only placeholder templates. No project-specific principles have been defined. Therefore, no violations can exist at this time.

**Recommendation**: Consider defining project-specific constitutional principles (e.g., TDD mandatory, error handling without exceptions, backward compatibility policy) after v1.0.0 release.

## Project Structure

### Documentation (this feature)
```
specs/012-change-the-third/
├── spec.md              # Feature specification (completed)
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
│   └── compare-options.contract.ts
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
src/
├── compare/
│   └── index.ts         # Function to be modified
├── types/
│   └── index.ts         # CompareOptions type definition
├── _lib/
│   └── validators.ts    # Shared validation utilities
└── index.ts             # Main entry point

tests/
├── compare.test.ts      # Existing test file (~70 tests)
└── contract/
    └── compare-options.test.ts  # New contract tests
```

**Structure Decision**: Option 1 (single project) - This is a library with standard src/ and tests/ structure.

## Phase 0: Outline & Research

### Technical Decisions

#### 1. Parameter Design: Required with Default Value
**Decision**: Make the third parameter `options` required but provide a default value `{ order: "ASC" }`

**Rationale**:
- User explicitly requested: "optionsは必須かつデフォルト値ありにします"
- TypeScript allows required parameters with default values: `options: CompareOptions = { order: "ASC" }`
- This ensures all call sites have explicit options object in signatures while maintaining ergonomic usage
- Type safety: TypeScript enforces options object shape at compile time
- Runtime safety: Default value prevents undefined errors

**Implementation**:
```typescript
export function compare(
  date1: Date | number,
  date2: Date | number,
  options: CompareOptions = { order: "ASC" }
): number
```

**Alternatives considered**:
- Optional parameter (`options?: CompareOptions`): Rejected - user requested required parameter
- No default value: Rejected - user requested default value for ergonomics

#### 2. CompareOptions Type Definition
**Decision**: Define interface with optional `order` property

**Rationale**:
- Allows `{}` to be valid (defaults to ASC per FR-004)
- Extensible for future options (locale, custom compareFn, etc.)
- Type-safe at compile time
- Follows established patterns in date libraries (date-fns, Day.js)

**Implementation**:
```typescript
export interface CompareOptions {
  order?: "ASC" | "DESC";
}
```

**Alternatives considered**:
- Required `order` property: Rejected - reduces flexibility, breaks FR-004 (empty object support)
- Union type `{ order: "ASC" } | { order: "DESC" }`: Rejected - overly restrictive, complicates future extensions

#### 3. Backward Compatibility Strategy
**Decision**: Complete breaking change, no migration path

**Rationale**:
- User explicitly stated: "破壊的変更を許容します" (breaking changes are acceptable)
- v1.0.0 not yet released (package.json shows 1.0.0 but not published)
- README.md states: "Breaking changes may occur at any time without prior notice" during v0.x
- Simpler implementation without dual API support
- Cleaner codebase without deprecated code paths

**Migration guide** (for documentation):
```typescript
// Before (old API - no longer supported)
compare(date1, date2, "DESC")

// After (new API)
compare(date1, date2, { order: "DESC" })

// Default behavior unchanged
compare(date1, date2) // Still ASC by default
```

**Alternatives considered**:
- Dual API support (string | object): Rejected - adds complexity, user accepted breaking change
- Deprecation warnings: Rejected - no need since pre-v1.0.0

#### 4. Validation Strategy
**Decision**: Reuse existing validation logic, add options object validation

**Rationale**:
- Existing `isValidDateOrNumber()` validation works perfectly
- Add minimal validation for options object structure
- Follow existing error handling policy (return NaN, no exceptions)
- Case-insensitive order value handling (FR-006)

**Implementation approach**:
```typescript
// Validate dates (existing logic)
if (!isValidDateOrNumber(date1) || !isValidDateOrNumber(date2)) return NaN;

// Validate and normalize options
const normalizedOrder = options?.order?.toUpperCase() === "DESC" ? "DESC" : "ASC";
```

**Alternatives considered**:
- Strict validation with exceptions: Rejected - violates project error handling policy
- No case-insensitive handling: Rejected - breaks FR-006 requirement

#### 5. Test Migration Strategy
**Decision**: Update existing 70+ tests systematically

**Rationale**:
- Table-driven tests (`it.each`) are easy to update in bulk
- Update test cases to use new API: `compare(a, b, "DESC")` → `compare(a, b, { order: "DESC" })`
- Keep all existing test coverage
- Add new tests for edge cases (null options, empty object, unknown properties)

**Test categories to update**:
1. Contract tests - Update order parameter calls
2. Basic comparison scenarios - Update DESC order tests
3. Array.sort() integration - Update DESC order lambda
4. Error handling - Add options validation tests
5. Edge cases - Add new options-specific edge cases
6. Mixed input types - Update to use options object
7. Performance tests - Verify no degradation

**Alternatives considered**:
- Rewrite all tests from scratch: Rejected - unnecessary, existing tests are comprehensive
- Keep old tests with @ts-expect-error: Rejected - clutters codebase, breaks at runtime

#### 6. Documentation Update Strategy
**Decision**: Update JSDoc, README.md, and generate TypeDoc

**Rationale**:
- JSDoc must reflect new signature for IDE IntelliSense
- README.md examples must show new API
- TypeDoc generates updated API documentation
- CHANGELOG.md must document breaking change

**Files to update**:
- src/compare/index.ts - JSDoc comments and examples
- README.md - Update compare() examples in "Core Functions" and "Comparison" sections
- CHANGELOG.md - Add breaking change entry for next version

**Alternatives considered**:
- Document both old and new APIs: Rejected - confusing, old API no longer works
- Minimal documentation: Rejected - users need clear migration guidance

### Research Output
All technical decisions have been documented above. No external research required - all information derived from existing codebase analysis and feature specification.

**Output**: research.md (will be generated in next step)

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

### Data Model
**Entity**: `CompareOptions`
- Purpose: Configuration object for compare() function
- Fields:
  - `order?: "ASC" | "DESC"` - Optional sort order (default: "ASC")
- Validation rules:
  - Order value is case-insensitive at runtime (FR-006)
  - Invalid order values default to "ASC" (FR-005)
  - Unknown properties are ignored (FR-012)
  - null/undefined options default to { order: "ASC" } (FR-011)
- State transitions: N/A (immutable configuration object)

### API Contracts

#### Function Signature Contract
```typescript
/**
 * Compare two Date objects or timestamps with configurable sort order.
 *
 * @param date1 - The first Date object or timestamp
 * @param date2 - The second Date object or timestamp
 * @param options - Comparison options with default { order: "ASC" }
 * @returns -1 if date1 < date2, 1 if date1 > date2, 0 if equal (adjusted for order)
 *          Returns NaN if inputs are invalid
 */
export function compare(
  date1: Date | number,
  date2: Date | number,
  options: CompareOptions = { order: "ASC" }
): number;

export interface CompareOptions {
  order?: "ASC" | "DESC";
}
```

#### Behavior Contracts

**Contract 1: Default Behavior (FR-003, FR-004)**
- Input: `compare(date1, date2)` OR `compare(date1, date2, {})`
- Expected: Ascending order comparison (same as `compare(date1, date2, { order: "ASC" })`)
- Test: Omitted parameter and empty object both produce ASC order

**Contract 2: Explicit Ascending Order (FR-002)**
- Input: `compare(date1, date2, { order: "ASC" })`
- Expected: date1 < date2 → -1, date1 > date2 → 1, date1 === date2 → 0
- Test: Explicit ASC matches default behavior

**Contract 3: Descending Order (FR-002)**
- Input: `compare(date1, date2, { order: "DESC" })`
- Expected: Reverses sign (date1 < date2 → 1, date1 > date2 → -1, equal → 0)
- Test: DESC inverts ASC results

**Contract 4: Case-Insensitive Order (FR-006)**
- Input: `compare(date1, date2, { order: "asc" })` OR `{ order: "Desc" }`
- Expected: Treated as "ASC" or "DESC" respectively
- Test: Lowercase/mixed case order values work correctly

**Contract 5: Invalid Order Value (FR-005)**
- Input: `compare(date1, date2, { order: "INVALID" })`
- Expected: Defaults to "ASC"
- Test: Unknown order values produce ASC behavior

**Contract 6: Null/Undefined Options (FR-011)**
- Input: `compare(date1, date2, null)` OR `compare(date1, date2, undefined)`
- Expected: Defaults to { order: "ASC" }
- Test: null/undefined options produce ASC behavior

**Contract 7: Unknown Properties (FR-012)**
- Input: `compare(date1, date2, { order: "ASC", unknown: true })`
- Expected: Ignores unknown properties, uses order value
- Test: Extra properties don't cause errors

**Contract 8: Date Validation (FR-007, FR-008)**
- Input: Invalid Date objects or non-number timestamps
- Expected: Returns NaN
- Test: Maintains existing validation behavior

### Contract Tests
Contract tests will be created in `tests/contract/compare-options.test.ts` covering all 8 contracts above. Tests must fail initially (no implementation yet per TDD).

### Integration Test Scenarios
From user stories in spec.md:

**Scenario 1: Descending Sort**
- Given: Two dates to compare
- When: `compare(date1, date2, { order: "DESC" })`
- Then: Returns descending comparison result

**Scenario 2: Default Ascending**
- Given: Two dates to compare
- When: `compare(date1, date2)` (no third argument)
- Then: Returns ascending comparison result (default)

**Scenario 3: Explicit Ascending**
- Given: Developer provides explicit ASC order
- When: `compare(date1, date2, { order: "ASC" })`
- Then: Returns ascending comparison result

**Scenario 4: Empty Options Object**
- Given: Developer provides empty options
- When: `compare(date1, date2, {})`
- Then: Returns ascending comparison result (default)

**Scenario 5: Legacy API Rejection**
- Given: Developer uses old string-based API
- When: TypeScript compilation with `compare(date1, date2, "DESC")`
- Then: Type error occurs (breaking change)

### Agent Context Update
Will execute `.specify/scripts/bash/update-agent-context.sh claude` to update CLAUDE.md with:
- New CompareOptions type
- Updated compare() signature
- Breaking change note
- Test update strategy

**Output**: data-model.md, /contracts/*, failing contract tests, quickstart.md, CLAUDE.md updated

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
1. Load `.specify/templates/tasks-template.md` as base
2. Generate tasks from Phase 1 design docs (contracts, data model, quickstart)
3. Task breakdown:
   - Type definition tasks (CompareOptions interface)
   - Contract test tasks (8 contracts → 8 test tasks) [P]
   - Implementation tasks (function signature, validation logic, normalization)
   - Existing test migration tasks (update 70+ tests)
   - Documentation tasks (JSDoc, README, CHANGELOG)
   - Build verification tasks (lint, test, build)

**Ordering Strategy**:
- TDD order: Contract tests first [P]
- Type definitions before tests (needed for compilation)
- Implementation after tests fail
- Test migration after implementation works
- Documentation after tests pass
- Build verification last

**Parallel Execution Opportunities** [P]:
- Contract test writing (independent test files)
- Documentation updates (JSDoc, README, CHANGELOG independent)
- Test migration (can split by test category)

**Estimated Output**: ~20-25 numbered, ordered tasks in tasks.md:
1. Define CompareOptions type
2-9. Write contract tests (8 contracts, parallel)
10. Implement options parameter handling
11. Implement order validation and normalization
12-18. Update existing test categories (7 categories)
19. Update JSDoc comments
20. Update README.md examples
21. Update CHANGELOG.md
22. Run lint and fix issues
23. Run all tests and verify passing
24. Build and verify output

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)
**Phase 4**: Implementation (execute tasks.md following TDD principles)
**Phase 5**: Validation (all tests pass, lint clean, build successful, quickstart validated)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

No complexity violations - constitution not yet ratified with project-specific principles.

## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [x] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS (no constitution ratified yet)
- [x] Post-Design Constitution Check: PASS (no violations)
- [x] All NEEDS CLARIFICATION resolved (all technical details determined)
- [x] Complexity deviations documented (N/A - no violations)

**Phase 0 Artifacts**:
- [x] research.md generated

**Phase 1 Artifacts**:
- [x] data-model.md generated
- [x] contracts/compare-options.contract.md generated
- [x] quickstart.md generated
- [x] CLAUDE.md updated

**Phase 3 Artifacts**:
- [x] tasks.md generated (29 tasks ready for execution)

---
*Based on Constitution v2.1.1 template - See `.specify/memory/constitution.md`*
