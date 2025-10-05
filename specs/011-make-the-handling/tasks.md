# Tasks: Consistent Argument Validation for clamp Function

**Input**: Design documents from `/specs/011-make-the-handling/`
**Prerequisites**: plan.md, research.md, data-model.md, contracts/, quickstart.md

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → Tech stack: TypeScript 5.9.2, Vitest 3.2.4
   → Structure: Single library (src/, tests/)
2. Load design documents:
   ✓ data-model.md: clamp function entity with validation rules
   ✓ contracts/: validation-order.contract.md + validation-order.test.ts
   ✓ research.md: Validate-before-convert pattern decision
   ✓ quickstart.md: 4-step validation workflow
3. Generate tasks by category:
   → Setup: None needed (existing project)
   → Tests: Contract test for validation order (TDD)
   → Core: Refactor clamp function implementation
   → Integration: None needed (single function)
   → Polish: Regression tests, quality gates
4. Apply task rules:
   → Contract test file [P] = parallel-capable (new file)
   → Implementation = sequential (modifies src/clamp/index.ts)
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001-T005)
6. Dependencies: T001 (tests) → T002 (impl) → T003+ (validation)
7. Parallel execution: Only T001 can run parallel (new file)
8. Validation:
   ✓ Contract has test (validation-order.test.ts)
   ✓ Entity has implementation task (clamp function)
   ✓ Tests before implementation (T001 → T002)
9. Return: SUCCESS (5 tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Project Type**: Single TypeScript library
- **Source**: `src/` at repository root
- **Tests**: `tests/` at repository root
- **Specs**: `specs/011-make-the-handling/`

## Phase 3.1: Setup
*No setup tasks required - existing TypeScript project with all dependencies*

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**

- [x] **T001** [P] Copy contract test to project test directory
  - **Action**: Copy `specs/011-make-the-handling/contracts/validation-order.test.ts` to `tests/contracts/validation-order.test.ts`
  - **Purpose**: Add contract tests that enforce validate-before-convert pattern
  - **File**: `tests/contracts/validation-order.test.ts` (new file)
  - **Expected Result**: Tests fail because current implementation validates AFTER conversion
  - **Validation**: Run `npm test tests/contracts/validation-order.test.ts` - should FAIL
  - **Contract Rules Tested**:
    - TC-1: Invalid Date rejected before conversion
    - TC-2: NaN rejected before conversion
    - TC-3: Infinity/-Infinity rejected before conversion
    - TC-4: Valid arguments pass validation, then convert
    - TC-5: Mixed invalid arguments fail fast

## Phase 3.3: Core Implementation (ONLY after tests are failing)

- [x] **T002** Refactor clamp function to validate before convert
  - **Action**: Modify `src/clamp/index.ts` to validate arguments BEFORE converting to Date objects
  - **File**: `src/clamp/index.ts`
  - **Current Pattern** (WRONG - lines 48-56):
    ```typescript
    // Convert first (lines 48-51)
    const dateObj = typeof date === "number" ? new Date(date) : date;
    const minDateObj = typeof minDate === "number" ? new Date(minDate) : minDate;
    const maxDateObj = typeof maxDate === "number" ? new Date(maxDate) : maxDate;

    // Validate after (line 55)
    if (!isValidDateOrNumber(dateObj) || !isValidDateOrNumber(minDateObj) || !isValidDateOrNumber(maxDateObj)) {
      return new Date(NaN);
    }
    ```
  - **Target Pattern** (CORRECT - following addDays):
    ```typescript
    // Validate FIRST (on original arguments)
    if (!isValidDateOrNumber(date) || !isValidDateOrNumber(minDate) || !isValidDateOrNumber(maxDate)) {
      return new Date(NaN);
    }

    // Convert AFTER validation passes
    const dateObj = typeof date === "number" ? new Date(date) : date;
    const minDateObj = typeof minDate === "number" ? new Date(minDate) : minDate;
    const maxDateObj = typeof maxDate === "number" ? new Date(maxDate) : maxDate;
    ```
  - **Key Changes**:
    1. Move validation block (lines 55-57) BEFORE conversion block (lines 48-51)
    2. Change validation to use original arguments: `date`, `minDate`, `maxDate` (not `dateObj`, etc.)
    3. Keep conversion logic unchanged, just reorder
  - **Import**: Ensure `isValidDateOrNumber` is imported from `../_lib/validators`
  - **Expected Result**: Contract tests (T001) now PASS
  - **Validation**: Run `npm test tests/contracts/validation-order.test.ts` - should PASS

## Phase 3.4: Integration
*No integration tasks required - single function refactoring*

## Phase 3.5: Polish & Validation

- [x] **T003** Run existing clamp tests to verify no regressions
  - **Action**: Execute existing test suite for clamp function
  - **Command**: `npm test tests/clamp.test.ts`
  - **Expected Result**: All existing tests PASS (behavior unchanged)
  - **Validates**:
    - Returns same date when within range
    - Returns min when date < min
    - Returns max when date > max
    - Works with timestamps
    - Works with Date objects
    - Handles invalid inputs correctly
  - **If Fails**: Review implementation - public behavior must be identical

- [x] **T004** Run full test suite to ensure no library-wide regressions
  - **Action**: Execute complete test suite (all 75+ test files)
  - **Command**: `npm test`
  - **Expected Result**: All tests PASS
  - **Validates**: No unintended side effects from refactoring
  - **If Fails**: Identify affected tests and review changes

- [x] **T005** Run quality gates (lint, build)
  - **Action**: Verify code quality and build integrity
  - **Commands**:
    ```bash
    npm run lint        # ESLint - should PASS
    npm run build       # TypeScript build - should PASS
    ```
  - **Expected Results**:
    - Linting: No errors (double quotes, no unused imports)
    - Build: Successful ESM/CJS bundle generation
  - **If Lint Fails**: Fix style issues (use `npm run lint -- --fix` for auto-fixes)
  - **If Build Fails**: Fix TypeScript errors

## Dependencies

### Linear Flow (Sequential)
```
T001 (Contract Tests - MUST FAIL)
  ↓
T002 (Implementation - Makes Tests PASS)
  ↓
T003 (Regression Tests)
  ↓
T004 (Full Test Suite)
  ↓
T005 (Quality Gates)
```

### Dependency Rules
- **T001** has no dependencies (can run first)
- **T002** requires T001 to FAIL (validates TDD red phase)
- **T003** requires T002 complete (validates implementation)
- **T004** requires T003 PASS (validates no regressions)
- **T005** requires T004 PASS (final quality check)

### Blocking Dependencies
- T001 blocks T002 (tests must exist and fail first)
- T002 blocks T003 (implementation must be complete)
- T003 blocks T004 (clamp tests must pass)
- T004 blocks T005 (all tests must pass)

## Parallel Example

### Only T001 Can Be Parallel (Independent File)
```bash
# T001 creates a new file, so it can run in parallel with other feature work
# (if working on multiple features)

# However, within this feature, tasks are sequential due to TDD dependencies
```

### Why Other Tasks Are NOT Parallel
- **T002**: Modifies same file as current implementation
- **T003-T005**: Depend on T002 completion (validation tasks)

## Notes
- **TDD Critical**: T001 tests MUST FAIL before T002 implementation
- **Single File**: All tasks modify or test `src/clamp/index.ts` (no parallelism)
- **Verification**: Run tests after each task to confirm progress
- **Commit Strategy**: Commit after T002 (working implementation) and T005 (quality verified)

## Task Validation Checklist
*GATE: All criteria met*

- [x] All contracts have corresponding tests (validation-order.test.ts → T001)
- [x] All entities have implementation tasks (clamp function → T002)
- [x] All tests come before implementation (T001 → T002)
- [x] Parallel tasks truly independent (only T001 is [P], creates new file)
- [x] Each task specifies exact file path (all paths included)
- [x] No task modifies same file as another [P] task (T001 is only [P])

## Execution Commands Summary

```bash
# T001: Copy contract test
mkdir -p tests/contracts
cp specs/011-make-the-handling/contracts/validation-order.test.ts tests/contracts/validation-order.test.ts
npm test tests/contracts/validation-order.test.ts  # Should FAIL

# T002: Refactor implementation
# (Edit src/clamp/index.ts - move validation before conversion)
npm test tests/contracts/validation-order.test.ts  # Should PASS

# T003: Regression tests
npm test tests/clamp.test.ts  # Should PASS

# T004: Full test suite
npm test  # All should PASS

# T005: Quality gates
npm run lint    # Should PASS
npm run build   # Should PASS
```

## Success Criteria

All tasks complete when:
1. ✅ Contract tests exist and initially failed (T001)
2. ✅ Contract tests now pass after implementation (T002)
3. ✅ Existing clamp tests still pass (T003)
4. ✅ Full test suite passes (T004)
5. ✅ Linting and build succeed (T005)
6. ✅ Implementation validates arguments BEFORE conversion (code review)

## References

- **Specification**: `specs/011-make-the-handling/spec.md`
- **Implementation Plan**: `specs/011-make-the-handling/plan.md`
- **Research**: `specs/011-make-the-handling/research.md`
- **Data Model**: `specs/011-make-the-handling/data-model.md`
- **Contract**: `specs/011-make-the-handling/contracts/validation-order.contract.md`
- **Quickstart**: `specs/011-make-the-handling/quickstart.md`
