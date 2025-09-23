# Tasks: Compare Function Implementation

**Input**: Design documents from `/specs/003-compare/`
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
- [x] T001 Verify TypeScript and Vitest configuration for compare function implementation
- [x] T002 Run existing tests to ensure baseline is passing with `npm test`

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [x] T003 [P] Contract test for compare function in tests/compare.test.ts based on contracts/compare.contract.ts
- [x] T004 [P] Basic comparison scenarios in tests/compare.test.ts (ascending/descending order)
- [x] T005 [P] Array.sort() integration tests in tests/compare.test.ts
- [x] T006 [P] Error handling tests for invalid arguments in tests/compare.test.ts
- [x] T007 [P] Edge case tests for date boundaries and precision in tests/compare.test.ts
- [x] T008 [P] Performance comparison tests vs native Date comparison in tests/compare.test.ts
- [x] T009 Compatibility tests verifying correct -1/0/1 return values for Array.sort()

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [ ] T010 Create src/compare/index.ts directory and function implementation with TypeScript signature and JSDoc
- [ ] T011 Add input validation for Date objects and order parameter in src/compare/index.ts
- [ ] T012 Implement core comparison logic using Date.getTime() in src/compare/index.ts
- [ ] T013 Add RangeError handling for invalid inputs in src/compare/index.ts
- [ ] T014 Export compare function from src/index.ts
- [ ] T015 Add TypeScript type definitions for function signature if needed

## Phase 3.4: Integration
- [ ] T016 Verify all tests pass with `npm test`
- [ ] T017 Verify TypeScript compilation with `npm run build`
- [ ] T018 Test ESM build output in dist/
- [ ] T019 Test CJS build output in dist/

## Phase 3.5: Polish
- [ ] T020 Run linter with `npm run lint` and fix any issues
- [ ] T021 [P] Verify quickstart examples from quickstart.md work correctly
- [ ] T022 [P] Performance validation comparing against native Date operations
- [ ] T023 Documentation review and JSDoc completeness check

## Dependencies
- Setup (T001-T002) must complete first
- Tests (T003-T009) before implementation (T010-T015)
- All implementation before integration (T016-T019)
- Integration before polish (T020-T023)

## Parallel Example
```
# Launch T003-T008 together (different test scenarios):
Task: "Contract test for compare function in tests/compare.test.ts"
Task: "Basic comparison scenarios in tests/compare.test.ts"
Task: "Array.sort() integration tests in tests/compare.test.ts"
Task: "Error handling tests for invalid arguments in tests/compare.test.ts"
Task: "Edge case tests for date boundaries in tests/compare.test.ts"
Task: "Performance comparison tests in tests/compare.test.ts"

# Note: T010-T015 are sequential (same file modifications)
```

## Notes
- [P] tasks = different files or independent test scenarios
- Verify tests fail before implementing (TDD approach)
- Commit after each task completion
- Follow existing chronia library patterns for consistency

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - compare.contract.ts → compare contract test task [P]
   - Each test scenario → separate test task [P]
   - Contract implementation → single implementation task

2. **From Data Model**:
   - Compare function signature → implementation task
   - Validation rules → input validation tasks
   - Error conditions → error handling tasks

3. **From User Stories (Quickstart)**:
   - Basic comparison usage → basic test scenarios [P]
   - Array.sort() usage → integration tests [P]
   - Error handling examples → error tests [P]

4. **Ordering**:
   - Setup → Tests → Implementation → Integration → Polish
   - Single function can be developed incrementally

## Validation Checklist
*GATE: Checked by main() before returning*

- [x] All contracts have corresponding tests (T003)
- [x] All function features have implementation tasks (T010-T015)
- [x] All tests come before implementation (T003-T009 before T010-T015)
- [x] Parallel tasks truly independent (different test scenarios)
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task (tests are different scenarios)