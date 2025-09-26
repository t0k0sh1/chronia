# Tasks: now関数の実装

**Input**: Design documents from `/specs/005-now/`
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
- This is a library project with functions in `src/functionName/`

## Phase 3.1: Setup
- [x] T001 Create directory structure for now function in src/now/
- [x] T002 Create test file structure in tests/now.test.ts

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [x] T003 [P] Write contract test for now() return type validation in tests/now.test.ts
- [x] T004 [P] Write test for valid Date object verification in tests/now.test.ts
- [x] T005 [P] Write test for current time range validation in tests/now.test.ts
- [x] T006 [P] Write test for time progression in consecutive calls in tests/now.test.ts
- [x] T007 Run tests to verify they fail (no implementation exists yet)

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [x] T008 Implement now() function in src/now/index.ts with JSDoc documentation
- [x] T009 Add now function export to src/index.ts
- [x] T010 Run tests to verify all now function tests pass

## Phase 3.4: Integration
- [x] T011 [P] Write integration test with addDays function in tests/now.test.ts
- [x] T012 [P] Write integration test with subHours function in tests/now.test.ts
- [x] T013 [P] Write integration test with format function in tests/now.test.ts
- [x] T014 Verify now function appears in built ESM/CJS output

## Phase 3.5: Polish
- [x] T015 [P] Add performance benchmark test in tests/now.test.ts
- [x] T016 [P] Verify JSDoc documentation is complete and accurate
- [x] T017 Run npm run lint to ensure code style compliance
- [x] T018 Run npm run build to ensure ESM/CJS builds work correctly
- [x] T019 Run npx typedoc to update documentation

## Dependencies
- Setup (T001-T002) must complete first
- Tests (T003-T007) before implementation (T008-T010)
- Implementation (T008-T010) before integration (T011-T014)
- Integration before polish (T015-T019)
- T003, T004, T005, T006 can run in parallel (same test file but different test cases)
- T011, T012, T013 can run in parallel (different integration tests)

## Parallel Example
```
# After basic setup, write all core tests together:
Task: "Write contract test for now() return type validation in tests/now.test.ts"
Task: "Write test for valid Date object verification in tests/now.test.ts"
Task: "Write test for current time range validation in tests/now.test.ts"
Task: "Write test for time progression in consecutive calls in tests/now.test.ts"
```

## Notes
- Tests must be comprehensive including edge cases from contract
- now() function is pure with no side effects
- Performance tests should verify <1ms execution time
- Function must be compatible with existing chronia library patterns

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - now.ts contract → comprehensive test tasks
   - Function signature → implementation task

2. **From Data Model**:
   - CurrentDate entity → test and implementation tasks
   - Validation rules → test cases for each scenario

3. **From Quickstart**:
   - Usage examples → integration test scenarios
   - Implementation steps → setup and implementation tasks
   - Performance tests → benchmark tasks

4. **Ordering**:
   - Setup → Tests → Implementation → Integration → Polish
   - TDD strictly enforced

## Validation Checklist
*GATE: Checked by main() before returning*

- [x] All contracts have corresponding tests
- [x] All entities have model tasks
- [x] All tests come before implementation
- [x] Parallel tasks truly independent
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task