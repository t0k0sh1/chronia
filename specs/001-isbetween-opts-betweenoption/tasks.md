# Tasks: isBetween with BetweenOption

**Input**: Design documents from `/specs/001-isbetween-opts-betweenoption/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: DB, middleware, logging
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests?
   → All entities have models?
   → All endpoints implemented?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Single project**: `src/`, `tests/` at repository root
- Paths shown below for TypeScript utility library structure

## Phase 3.1: Setup
- [x] T001 Verify TypeScript and Vitest configuration in tsconfig.json and vite.config.ts
- [x] T002 Run existing tests to ensure baseline is passing with `npm test`

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [x] T003 [P] Add BetweenOption type tests in tests/isBetween.test.ts for "()" bounds mode (default/backward compatibility)
- [x] T004 [P] Add BetweenOption type tests in tests/isBetween.test.ts for "[]" bounds mode (inclusive)
- [x] T005 [P] Add BetweenOption type tests in tests/isBetween.test.ts for "[)" bounds mode (start-inclusive)
- [x] T006 [P] Add BetweenOption type tests in tests/isBetween.test.ts for "(]" bounds mode (end-inclusive)
- [x] T007 Add edge case tests in tests/isBetween.test.ts for invalid bounds values
- [x] T008 Add backward compatibility tests in tests/isBetween.test.ts verifying existing behavior unchanged

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [x] T009 Add BoundsType and BetweenOption type definitions in src/types.ts
- [x] T010 Export new types (BoundsType, BetweenOption) from src/index.ts
- [x] T011 Update isBetween function signature in src/isBetween/index.ts to accept optional BetweenOption parameter
- [x] T012 Implement bounds logic in src/isBetween/index.ts with switch statement for all four bounds modes
- [x] T013 Add JSDoc documentation for BetweenOption parameter in src/isBetween/index.ts

## Phase 3.4: Integration
- [x] T014 Verify all tests pass with `npm test`
- [x] T015 Verify TypeScript compilation with `npm run build`
- [x] T016 Test ESM build output in dist/esm/
- [x] T017 Test CJS build output in dist/cjs/

## Phase 3.5: Polish
- [x] T018 Run linter with `npm run lint` and fix any issues
- [x] T019 Verify quickstart examples from quickstart.md work correctly
- [x] T020 Update function documentation with example usage of BetweenOption
- [x] T021 Performance validation - ensure no regression from original implementation

## Dependencies
- Setup (T001-T002) must complete first
- Tests (T003-T008) before implementation (T009-T013)
- T009 blocks T010, T011, T012
- T011 must complete before T012
- All implementation before integration (T014-T017)
- Integration before polish (T018-T021)

## Parallel Example
```
# Launch T003-T006 together (different test scenarios):
Task: "Add BetweenOption tests for '()' bounds in tests/isBetween.test.ts"
Task: "Add BetweenOption tests for '[]' bounds in tests/isBetween.test.ts"
Task: "Add BetweenOption tests for '[)' bounds in tests/isBetween.test.ts"
Task: "Add BetweenOption tests for '(]' bounds in tests/isBetween.test.ts"

# Note: While these modify the same file, they add different test cases
# and can be conceptually developed in parallel, then merged
```

## Notes
- [P] tasks = different logical units, minimal dependencies
- Verify tests fail before implementing (TDD approach)
- Commit after each task completion
- Maintain backward compatibility throughout

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - Contract specification → test scenarios for each bounds mode
   - Behavioral contracts → implementation requirements

2. **From Data Model**:
   - BoundsType → type definition task
   - BetweenOption → type definition and export tasks

3. **From User Stories**:
   - Each boundary mode → dedicated test suite
   - Quickstart scenarios → validation tasks

4. **Ordering**:
   - Setup → Tests → Types → Implementation → Integration → Polish
   - Type definitions before function implementation

## Validation Checklist
*GATE: Checked by main() before returning*

- [x] All contracts have corresponding tests (T003-T008)
- [x] All entities have type definition tasks (T009-T010)
- [x] All tests come before implementation (T003-T008 before T009-T013)
- [x] Parallel tasks truly independent (test scenarios)
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task (tests are additive)