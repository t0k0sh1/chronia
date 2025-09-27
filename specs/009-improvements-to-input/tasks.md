# Tasks: Improvements to Input Validation for clamp, compare, is*, and diff* Functions

**Input**: Design documents from `/specs/009-improvements-to-input/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → Extract: TypeScript 5.x, Vitest, ESLint, utility library structure
2. Load optional design documents:
   → data-model.md: Extract validator functions and function categories
   → contracts/: validation-standardization.test.ts, validator-usage.test.ts
   → research.md: Current validation patterns, standardization strategy
3. Generate tasks by category:
   → Setup: baseline verification, contract test preparation
   → Tests: contract tests (must fail before implementation)
   → Core: function-by-function validator implementation
   → Integration: comprehensive testing, performance validation
   → Polish: quality assurance, final validation
4. Apply task rules:
   → Different function files = mark [P] for parallel
   → Contract tests = [P] (independent test files)
   → Implementation within categories = [P] (independent source files)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph: Tests → Implementation → Validation
7. Create parallel execution examples for efficient implementation
8. Validate task completeness: All 22 target functions covered
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Single project**: `src/`, `tests/` at repository root
- TypeScript utility library with standard directory structure

## Phase 3.1: Setup & Baseline
- [ ] T001 Verify current validation patterns and establish baseline performance metrics
- [ ] T002 [P] Run existing test suite to document current behavior (all tests must pass)
- [ ] T003 [P] Create performance baseline measurements for target functions

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [ ] T004 [P] Contract test validation standardization in specs/009-improvements-to-input/contracts/validation-standardization.test.ts
- [ ] T005 [P] Contract test validator usage in specs/009-improvements-to-input/contracts/validator-usage.test.ts
- [ ] T006 Verify contract tests FAIL with current implementation (expected behavior)

## Phase 3.3: Core Implementation - Comparison Functions
- [ ] T007 Update compare function in src/compare/index.ts to use isValidDate validator (maintain RangeError behavior)

## Phase 3.4: Core Implementation - Boolean Functions (Parallel Execution)
- [ ] T008 [P] Update isAfter function in src/isAfter/index.ts to use isValidDateOrNumber validator
- [ ] T009 [P] Update isBefore function in src/isBefore/index.ts to use isValidDateOrNumber validator
- [ ] T010 [P] Update isEqual function in src/isEqual/index.ts to use isValidDateOrNumber validator
- [ ] T011 [P] Update isAfterOrEqual function in src/isAfterOrEqual/index.ts to use isValidDateOrNumber validator
- [ ] T012 [P] Update isBeforeOrEqual function in src/isBeforeOrEqual/index.ts to use isValidDateOrNumber validator
- [ ] T013 [P] Update isSameDay function in src/isSameDay/index.ts to use isValidDateOrNumber validator
- [ ] T014 [P] Update isSameHour function in src/isSameHour/index.ts to use isValidDateOrNumber validator
- [ ] T015 [P] Update isSameMinute function in src/isSameMinute/index.ts to use isValidDateOrNumber validator
- [ ] T016 [P] Update isSameSecond function in src/isSameSecond/index.ts to use isValidDateOrNumber validator
- [ ] T017 [P] Update isSameMonth function in src/isSameMonth/index.ts to use isValidDateOrNumber validator
- [ ] T018 [P] Update isSameYear function in src/isSameYear/index.ts to use isValidDateOrNumber validator
- [ ] T019 [P] Update isBetween function in src/isBetween/index.ts to use isValidDateOrNumber validator

## Phase 3.5: Core Implementation - Calculation Functions (Parallel Execution)
- [ ] T020 [P] Update diffDays function in src/diffDays/index.ts to use isValidDateOrNumber validator
- [ ] T021 [P] Update diffHours function in src/diffHours/index.ts to use isValidDateOrNumber validator
- [ ] T022 [P] Update diffMinutes function in src/diffMinutes/index.ts to use isValidDateOrNumber validator
- [ ] T023 [P] Update diffSeconds function in src/diffSeconds/index.ts to use isValidDateOrNumber validator
- [ ] T024 [P] Update diffMilliseconds function in src/diffMilliseconds/index.ts to use isValidDateOrNumber validator
- [ ] T025 [P] Update diffMonths function in src/diffMonths/index.ts to use isValidDateOrNumber validator
- [ ] T026 [P] Update diffYears function in src/diffYears/index.ts to use isValidDateOrNumber validator

## Phase 3.6: Core Implementation - Range Functions
- [ ] T027 Update clamp function in src/clamp/index.ts to use isValidDateOrNumber validator (maintain Invalid Date behavior)

## Phase 3.7: Integration & Validation
- [ ] T028 Run all existing test suites to verify zero regressions across all functions
- [ ] T029 Verify contract tests now PASS after all implementations complete
- [ ] T030 [P] Run performance tests to confirm <5% regression requirement met
- [ ] T031 [P] Execute quickstart validation steps from quickstart.md

## Phase 3.8: Quality Assurance & Polish
- [ ] T032 [P] Run ESLint to ensure code quality standards maintained
- [ ] T033 [P] Run TypeScript type checking to verify import resolution
- [ ] T034 [P] Verify all manual isNaN patterns have been replaced with internal validators
- [ ] T035 Validate that all target functions now use standardized internal validators
- [ ] T036 Final validation against all functional requirements and success criteria

## Dependencies
- Setup (T001-T003) must complete before tests
- Contract tests (T004-T005) before verification (T006)
- Tests must fail (T006) before any implementation (T007-T027)
- Comparison (T007) can run independently
- Boolean functions (T008-T019) can run in parallel within their phase
- Calculation functions (T020-T026) can run in parallel within their phase
- Range function (T027) can run independently
- Integration testing (T028-T031) requires all implementation complete
- Quality assurance (T032-T036) requires all previous phases complete

## Parallel Example
```bash
# Launch T004-T005 together (different contract test files):
Task: "Contract test validation standardization in specs/009-improvements-to-input/contracts/validation-standardization.test.ts"
Task: "Contract test validator usage in specs/009-improvements-to-input/contracts/validator-usage.test.ts"

# Launch T008-T019 together (Boolean functions - all independent files):
Task: "Update isAfter function in src/isAfter/index.ts to use isValidDateOrNumber validator"
Task: "Update isBefore function in src/isBefore/index.ts to use isValidDateOrNumber validator"
Task: "Update isEqual function in src/isEqual/index.ts to use isValidDateOrNumber validator"
[... and 9 more boolean function tasks]

# Launch T020-T026 together (Calculation functions - all independent files):
Task: "Update diffDays function in src/diffDays/index.ts to use isValidDateOrNumber validator"
Task: "Update diffHours function in src/diffHours/index.ts to use isValidDateOrNumber validator"
[... and 5 more diff function tasks]

# Launch T032-T034 together (Quality checks - independent operations):
Task: "Run ESLint to ensure code quality standards maintained"
Task: "Run TypeScript type checking to verify import resolution"
Task: "Verify all manual isNaN patterns have been replaced with internal validators"
```

## Notes
- Function categories have different error handling behaviors that must be preserved
- Each function implementation must maintain exact current external behavior
- Import statements need to include appropriate validators from ../\_lib/validators
- Manual isNaN(date.getTime()) patterns should be replaced with internal validator calls
- Performance regression must stay within 5% of baseline measurements

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - validation-standardization.test.ts → T004 contract test
   - validator-usage.test.ts → T005 contract test

2. **From Data Model**:
   - ValidatorFunction entities → import and usage tasks
   - FunctionCategory entities → category-specific implementation approaches
   - FunctionImplementation entities → individual function update tasks

3. **From Research**:
   - Current validation patterns → baseline and replacement tasks
   - Performance considerations → performance validation tasks
   - Error handling behavior → behavior preservation requirements

4. **From Quickstart**:
   - Validation steps → quickstart execution task T032
   - Success criteria → final validation task T037

## Validation Checklist
*GATE: Checked before completion*

- [x] All contracts have corresponding tests (T004-T005)
- [x] All function entities have implementation tasks (T007-T028)
- [x] All tests come before implementation (T004-T006 before T007-T028)
- [x] Parallel tasks truly independent (different files or independent operations)
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task

## Completion Criteria
- All 21 target functions use internal validators (isValidDate, isValidNumber, isValidDateOrNumber)
- Zero behavioral changes to public API
- All existing tests continue to pass
- Performance regression <5% of baseline
- Contract tests pass after implementation
- ESLint and TypeScript validation succeed

## Target Functions Summary
- **1 Comparison function**: compare
- **12 Boolean functions**: isAfter, isBefore, isEqual, isAfterOrEqual, isBeforeOrEqual, isSameDay, isSameHour, isSameMinute, isSameSecond, isSameMonth, isSameYear, isBetween
- **7 Calculation functions**: diffDays, diffHours, diffMinutes, diffSeconds, diffMilliseconds, diffMonths, diffYears
- **1 Range function**: clamp
- **Total**: 21 functions (excluding isValid which already uses internal validators)