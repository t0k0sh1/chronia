# Tasks: compare()関数の第3引数をオプションオブジェクトに変更

**Input**: Design documents from `/Users/t0k0sh1/Workspace/chronia/specs/012-change-the-third/`
**Prerequisites**: plan.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅, quickstart.md ✅

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → Tech stack: TypeScript 5.9+, Vitest 3.2.4, tsup 8.5.0
   → Project structure: Single library (src/, tests/)
2. Load design documents:
   → data-model.md: CompareOptions interface
   → contracts/: 10 behavioral contracts
   → research.md: 6 technical decisions
   → quickstart.md: 5 implementation phases
3. Generate tasks by category:
   → Setup: Type definition, exports
   → Tests: 10 contract tests (TDD)
   → Core: Function signature, validation logic
   → Integration: Update 70+ existing tests
   → Polish: Documentation, lint, build
4. Apply task rules:
   → Contract tests [P] (different test cases)
   → Test migration [P] (different test categories)
   → Documentation [P] (different files)
5. Number tasks sequentially (T001-T024)
6. TDD order: Tests FIRST, then implementation
7. Validate: All contracts tested, all tests updated
8. Return: SUCCESS (24 tasks ready)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
**Single library project** at repository root:
- `src/` - Source code
- `tests/` - Test files
- `README.md`, `CHANGELOG.md` - Documentation

---

## Phase 3.1: Setup & Type Definitions

### T001: Define CompareOptions Interface
**File**: `src/types/index.ts`
**Action**: Add CompareOptions interface definition
**Details**:
```typescript
/**
 * Options for configuring the compare() function behavior.
 */
export interface CompareOptions {
  /**
   * Sort order for comparison results.
   * @default "ASC"
   */
  order?: "ASC" | "DESC";
}
```
**Verification**: TypeScript compiles without errors
**Dependencies**: None
**Status**: [x]

---

### T002: Export CompareOptions from Main Entry
**File**: `src/index.ts`
**Action**: Add type export for CompareOptions
**Details**:
```typescript
export type { CompareOptions } from "./types";
```
**Verification**: `npm run build` succeeds, type is exported
**Dependencies**: T001
**Status**: [x]

---

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**

### T003 [P]: Contract Test - Default Behavior (Omitted Parameter)
**File**: `tests/contract/compare-options.test.ts`
**Action**: Write test for Contract 1 (default ascending order when options omitted)
**Details**:
- Test `compare(earlier, later)` returns `-1`
- Test matches `compare(earlier, later, { order: "ASC" })`
**Verification**: Test file created, tests FAIL (implementation not updated yet)
**Dependencies**: T002
**Parallel Group**: Contract Tests (T003-T012)
*Status**: [x]

---

### T004 [P]: Contract Test - Default Behavior (Empty Options)
**File**: `tests/contract/compare-options.test.ts`
**Action**: Write test for Contract 2 (empty object defaults to ASC)
**Details**:
- Test `compare(earlier, later, {})` returns `-1`
- Test matches omitted parameter behavior
**Verification**: Tests FAIL (implementation not updated yet)
**Dependencies**: T002
**Parallel Group**: Contract Tests (T003-T012)
*Status**: [x]

---

### T005 [P]: Contract Test - Explicit Ascending Order
**File**: `tests/contract/compare-options.test.ts`
**Action**: Write test for Contract 3 (explicit ASC order)
**Details**:
- Test `compare(earlier, later, { order: "ASC" })` returns `-1`
- Test `compare(later, earlier, { order: "ASC" })` returns `1`
- Test `compare(date, date, { order: "ASC" })` returns `0`
**Verification**: Tests FAIL (implementation not updated yet)
**Dependencies**: T002
**Parallel Group**: Contract Tests (T003-T012)
*Status**: [x]

---

### T006 [P]: Contract Test - Explicit Descending Order
**File**: `tests/contract/compare-options.test.ts`
**Action**: Write test for Contract 4 (DESC order inverts results)
**Details**:
- Test `compare(earlier, later, { order: "DESC" })` returns `1`
- Test `compare(later, earlier, { order: "DESC" })` returns `-1`
- Test equal dates return `0`
- Verify inversion property: `DESC = -ASC`
**Verification**: Tests FAIL (implementation not updated yet)
**Dependencies**: T002
**Parallel Group**: Contract Tests (T003-T012)
*Status**: [x]

---

### T007 [P]: Contract Test - Case-Insensitive Order Values
**File**: `tests/contract/compare-options.test.ts`
**Action**: Write test for Contract 5 (case-insensitive order handling)
**Details**:
- Test `{ order: "desc" }` works as "DESC" (with @ts-expect-error)
- Test `{ order: "asc" }` works as "ASC" (with @ts-expect-error)
- Test mixed case `{ order: "Desc" }` works as "DESC"
**Verification**: Tests FAIL (implementation not updated yet)
**Dependencies**: T002
**Parallel Group**: Contract Tests (T003-T012)
*Status**: [x]

---

### T008 [P]: Contract Test - Invalid Order Values Default to ASC
**File**: `tests/contract/compare-options.test.ts`
**Action**: Write test for Contract 6 (invalid values → ASC)
**Details**:
- Test `{ order: "invalid" }` returns ASC behavior (with @ts-expect-error)
- Test empty string defaults to ASC
- Verify matches explicit ASC behavior
**Verification**: Tests FAIL (implementation not updated yet)
**Dependencies**: T002
**Parallel Group**: Contract Tests (T003-T012)
*Status**: [x]

---

### T009 [P]: Contract Test - Null/Undefined Options Default to ASC
**File**: `tests/contract/compare-options.test.ts`
**Action**: Write test for Contract 7 (null/undefined → ASC)
**Details**:
- Test `compare(date1, date2, null)` returns ASC (with @ts-expect-error)
- Test `compare(date1, date2, undefined)` returns ASC
- Verify matches default behavior
**Verification**: Tests FAIL (implementation not updated yet)
**Dependencies**: T002
**Parallel Group**: Contract Tests (T003-T012)
*Status**: [x]

---

### T010 [P]: Contract Test - Unknown Properties Ignored
**File**: `tests/contract/compare-options.test.ts`
**Action**: Write test for Contract 8 (extra properties ignored)
**Details**:
- Test `{ order: "DESC", unknown: true }` uses DESC (with @ts-expect-error)
- Test multiple extra properties ignored
- Verify matches clean options behavior
**Verification**: Tests FAIL (implementation not updated yet)
**Dependencies**: T002
**Parallel Group**: Contract Tests (T003-T012)
*Status**: [x]

---

### T011 [P]: Contract Test - Invalid Date Inputs Return NaN
**File**: `tests/contract/compare-options.test.ts`
**Action**: Write test for Contract 9 (maintains error handling)
**Details**:
- Test invalid first date returns NaN
- Test invalid second date returns NaN
- Test both invalid returns NaN
- Verify with all options variants (ASC, DESC, empty)
**Verification**: Tests FAIL (implementation not updated yet)
**Dependencies**: T002
**Parallel Group**: Contract Tests (T003-T012)
*Status**: [x]

---

### T012 [P]: Contract Test - Array.sort() Compatibility
**File**: `tests/contract/compare-options.test.ts`
**Action**: Write test for Contract 10 (sorting works correctly)
**Details**:
- Test ascending sort with default options
- Test descending sort with `{ order: "DESC" }`
- Verify sorted order is correct
**Verification**: Tests FAIL (implementation not updated yet)
**Dependencies**: T002
**Parallel Group**: Contract Tests (T003-T012)
*Status**: [x]

---

### T013: Verify All Contract Tests Fail
**Action**: Run contract tests and confirm all FAIL
**Command**: `npm test tests/contract/compare-options.test.ts`
**Expected Result**: All tests fail (implementation not changed yet)
**Details**: This validates that tests are correctly written and will catch implementation issues
**Verification**: See test failure output showing "Expected: -1, Received: NaN" or similar
**Dependencies**: T003-T012 all complete
*Status**: [x]

---

## Phase 3.3: Core Implementation (ONLY after tests are failing)

### T014: Update compare() Function Signature
**File**: `src/compare/index.ts`
**Action**: Change third parameter from string to CompareOptions
**Details**:
- Import CompareOptions: `import { CompareOptions } from "../types";`
- Update signature: `options: CompareOptions = { order: "ASC" }`
- Remove old `order?: "ASC" | "DESC"` parameter
**Verification**: TypeScript shows errors in tests (expected), function compiles
**Dependencies**: T001, T002, T013
*Status**: [x]

---

### T015: Update Order Normalization Logic
**File**: `src/compare/index.ts`
**Action**: Extract order from options object instead of direct parameter
**Details**:
- Change validation logic to check `options?.order` instead of `order`
- Update normalization: `const upperOrder = options.order.toUpperCase();`
- Maintain case-insensitive behavior
- Maintain default to ASC for invalid values
**Verification**: Contract tests T003-T012 START PASSING
**Dependencies**: T014
*Status**: [x]

---

### T016: Update JSDoc Examples in compare()
**File**: `src/compare/index.ts`
**Action**: Update all JSDoc `@example` sections to use options object
**Details**:
- Replace `compare(date1, date2, "DESC")` → `compare(date1, date2, { order: "DESC" })`
- Replace `compare(date1, date2, "ASC")` → `compare(date1, date2, { order: "ASC" })`
- Update parameter description for `@param options`
- Remove notes about string parameter case-insensitivity (moved to order property)
**Verification**: TypeDoc builds without errors
**Dependencies**: T015
*Status**: [x]

---

### T017: Verify All Contract Tests Pass
**Action**: Run contract tests and confirm all PASS
**Command**: `npm test tests/contract/compare-options.test.ts`
**Expected Result**: All 10 contract test groups pass (30+ individual assertions)
**Verification**: See green test output, no failures
**Dependencies**: T015, T016
*Status**: [x]

---

## Phase 3.4: Integration - Update Existing Tests

### T018 [P]: Update Contract Tests Section
**File**: `tests/compare.test.ts`
**Action**: Update "Contract tests" section (lines ~6-83)
**Details**:
- Update `it.each` table: change `order: "DESC" as const` to `order` used in options object
- Update test calls: `compare(date1, date2, order)` → `compare(date1, date2, { order })`
- Update default behavior tests to use empty object or omit parameter
**Verification**: Tests pass
**Dependencies**: T017
**Parallel Group**: Test Migration (T018-T022)
*Status**: [x]

---

### T019 [P]: Update Basic Comparison & Array.sort() Tests
**File**: `tests/compare.test.ts`
**Action**: Update sections "Basic comparison scenarios" and "Array.sort() integration" (lines ~86-195)
**Details**:
- Update `compare(a, b, "DESC")` → `compare(a, b, { order: "DESC" })`
- Update lambda in sort: `.sort((a, b) => compare(a, b, "DESC"))` → `.sort((a, b) => compare(a, b, { order: "DESC" }))`
- Keep default calls without third argument unchanged
**Verification**: Tests pass
**Dependencies**: T017
**Parallel Group**: Test Migration (T018-T022)
*Status**: [x]

---

### T020 [P]: Update Error Handling Tests
**File**: `tests/compare.test.ts`
**Action**: Update "Error handling" section (lines ~198-342)
**Details**:
- Update order parameter tests to use options object
- Update case-insensitive tests with `@ts-expect-error` comments
- Keep invalid order value tests, update to use `{ order: "invalid" as any }`
- Update null/undefined tests to pass options object
**Verification**: Tests pass, @ts-expect-error comments prevent TypeScript errors
**Dependencies**: T017
**Parallel Group**: Test Migration (T018-T022)
*Status**: [x]

---

### T021 [P]: Update Edge Cases & Compatibility Tests
**File**: `tests/compare.test.ts`
**Action**: Update "Edge cases", "Mixed Input Type Integration", "Real-world Scenarios", "Backward Compatibility" sections (lines ~345-770)
**Details**:
- Update all DESC order usage to `{ order: "DESC" }`
- Update lambda functions in sort operations
- Update case-insensitive tests with @ts-expect-error
- Keep ASC explicit tests, change to `{ order: "ASC" }`
**Verification**: Tests pass
**Dependencies**: T017
**Parallel Group**: Test Migration (T018-T022)
*Status**: [x]

---

### T022 [P]: Update Performance Tests (Skipped)
**File**: `tests/compare.test.ts`
**Action**: Update "Enhanced Performance Tests" section (lines ~772-882, describe.skip)
**Details**:
- Update all DESC order usage in skipped tests
- Update `@ts-expect-error` comments for case-insensitive tests
- Keep tests skipped (describe.skip remains)
**Verification**: Tests parse without TypeScript errors (not executed due to skip)
**Dependencies**: T017
**Parallel Group**: Test Migration (T018-T022)
*Status**: [x]

---

### T023: Verify All Tests Pass
**Action**: Run complete test suite
**Command**: `npm test`
**Expected Result**: All tests pass (~74 existing + 30+ new contract tests)
**Details**: Validates all test migrations completed successfully
**Verification**: See test summary showing all green
**Dependencies**: T018-T022 all complete
*Status**: [x]

---

## Phase 3.5: Polish - Documentation & Build

### T024 [P]: Update README.md Examples
**File**: `README.md`
**Action**: Update compare() examples in "Comparison" section (lines ~227-236)
**Details**:
- Update existing examples to show both ascending (default) and descending usage
- Add example: `dates.sort((a, b) => compare(a, b, { order: "DESC" }));`
- Keep default usage unchanged: `dates.sort(compare);`
**Verification**: Examples are syntactically correct and demonstrate new API
**Dependencies**: T023
**Parallel Group**: Documentation (T024-T026)
*Status**: [x]

---

### T025 [P]: Add CHANGELOG.md Breaking Change Entry
**File**: `CHANGELOG.md`
**Action**: Add breaking change documentation
**Details**:
```markdown
## [Unreleased]

### BREAKING CHANGES

#### compare() function signature changed

The third parameter of `compare()` has been changed from a string (`"ASC" | "DESC"`) to an options object (`CompareOptions`).

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
- Replace all `compare(date1, date2, "DESC")` with `compare(date1, date2, { order: "DESC" })`
- Replace all `compare(date1, date2, "ASC")` with `compare(date1, date2, { order: "ASC" })` or omit for default
- TypeScript compiler will show type errors at all call sites that need updates

**Rationale:** Options object provides better extensibility for future features (locale support, custom comparison functions, etc.) and follows industry-standard patterns from date-fns, Day.js, and Luxon.
```
**Verification**: CHANGELOG.md updated with clear breaking change documentation
**Dependencies**: T023
**Parallel Group**: Documentation (T024-T026)
*Status**: [x]

---

### T026 [P]: Generate TypeDoc Documentation
**Action**: Build API documentation
**Command**: `npx typedoc`
**Expected Result**: Documentation builds successfully with updated compare() signature
**Details**: Validates JSDoc updates are correct and generates updated API docs
**Verification**: No TypeDoc errors, docs/index.html shows new signature
**Dependencies**: T016 (JSDoc updates), T023
**Parallel Group**: Documentation (T024-T026)
*Status**: [x]

---

### T027: Run Lint and Fix Issues
**Action**: Lint codebase and auto-fix
**Commands**:
```bash
npm run lint
# If errors, try auto-fix:
npm run lint -- --fix
```
**Expected Result**: No linting errors
**Details**: Ensures code style compliance
**Verification**: Lint passes with zero errors
**Dependencies**: T024, T025, T026
*Status**: [x]

---

### T028: Build ESM and CJS Modules
**Action**: Build library for distribution
**Command**: `npm run build`
**Expected Result**: dist/ directory contains index.js (ESM) and index.cjs (CJS)
**Details**: Validates TypeScript compilation and module bundling
**Verification**: Build succeeds, both module formats generated
**Dependencies**: T027
*Status**: [x]

---

### T029: Manual Verification Against Quickstart
**Action**: Execute manual tests from quickstart.md
**Details**:
- Test 1: Default behavior (omitted and empty object)
- Test 2: Explicit order (ASC and DESC)
- Test 3: Array sorting (ascending and descending)
- All tests should pass with new API
**Commands**: See quickstart.md "Testing the Feature" section
**Verification**: All manual tests produce expected output
**Dependencies**: T028
*Status**: [x]

---

## Dependencies Graph

```
Setup & Types:
T001 → T002 → [Contract Tests]

Contract Tests (Parallel):
T002 → T003, T004, T005, T006, T007, T008, T009, T010, T011, T012 → T013

Implementation:
T013 → T014 → T015 → T016 → T017

Test Migration (Parallel):
T017 → T018, T019, T020, T021, T022 → T023

Documentation (Parallel):
T023 → T024, T025, T026 → T027

Build & Verify:
T027 → T028 → T029
```

## Parallel Execution Examples

### Parallel Group 1: Contract Tests (T003-T012)
```bash
# All contract tests can be written in parallel (different test cases in same file)
# However, since they're in the same file, sequential execution is safer
# Mark as [P] for conceptual parallelism (independent test cases)
```

### Parallel Group 2: Test Migration (T018-T022)
```bash
# Different sections of the same file
# Can be edited in parallel if using version control merge strategies
# Or execute sequentially to avoid conflicts
```

### Parallel Group 3: Documentation (T024-T026)
```bash
# Different files - true parallelism possible
npm run build  # T026 (in background)
# Edit README.md (T024)
# Edit CHANGELOG.md (T025)
```

## Validation Checklist
*GATE: All must be checked before considering tasks complete*

- [x] All contracts have corresponding tests (10 contracts → T003-T012)
- [x] All entities have model tasks (CompareOptions → T001)
- [x] All tests come before implementation (T003-T013 before T014-T017)
- [x] Parallel tasks truly independent (verified for each [P] task)
- [x] Each task specifies exact file path (all tasks include file paths)
- [x] No task modifies same file as another [P] task (verified)

## Notes

### TDD Enforcement
- **Phase 3.2 MUST complete before Phase 3.3**: Tests must be written and failing before any implementation changes
- T013 is a gate task to verify tests are failing
- T017 is a gate task to verify tests now pass

### Breaking Change Communication
- TypeScript compiler will catch all old API usage
- Users will see clear type errors: `Type 'string' is not assignable to type 'CompareOptions'`
- CHANGELOG.md provides migration guide
- No runtime support for old API (clean break)

### Test Coverage
- Existing tests: ~74 tests (all must be updated and pass)
- New contract tests: ~30+ assertions across 10 test groups
- Total coverage: 100+ test assertions

### Performance Validation
- No performance degradation expected (one additional property access)
- Performance tests remain skipped (CI stability)
- Manual validation via T029

### Estimated Effort
- Setup & Types: 15 minutes (T001-T002)
- Contract Tests: 2 hours (T003-T013, TDD is time-intensive)
- Implementation: 30 minutes (T014-T017, simple refactoring)
- Test Migration: 1.5 hours (T018-T023, bulk find-replace with verification)
- Documentation: 45 minutes (T024-T026)
- Build & Verify: 15 minutes (T027-T029)
- **Total**: ~5 hours

---

**Tasks Complete**: 29 tasks ready for execution following TDD principles. All contracts tested, all existing tests migrated, complete documentation updates.
