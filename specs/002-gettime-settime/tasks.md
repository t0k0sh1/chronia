# Tasks: getTime/setTime Implementation

**Input**: Design documents from `/specs/002-gettime-settime/`
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
- [ ] T001 Verify TypeScript and Vitest configuration for getTime/setTime implementation
- [ ] T002 Run existing tests to ensure baseline is passing with `npm test`

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [ ] T003 [P] Contract test for getTime function in tests/getTime.test.ts based on contracts/getTime.contract.ts
- [ ] T004 [P] Contract test for setTime function in tests/setTime.test.ts based on contracts/setTime.contract.ts
- [ ] T005 [P] Integration test for timestamp extraction scenarios in tests/getTime.test.ts
- [ ] T006 [P] Integration test for date modification scenarios in tests/setTime.test.ts
- [ ] T007 [P] Edge case tests for invalid dates and timestamps in tests/getTime.test.ts
- [ ] T008 [P] Edge case tests for boundary values and special cases in tests/setTime.test.ts
- [ ] T009 Compatibility tests verifying native Date.prototype behavior matches our implementation

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [ ] T010 [P] Implement getTime function in src/getTime/index.ts with TypeScript signature and JSDoc
- [ ] T011 [P] Implement setTime function in src/setTime/index.ts with TypeScript signature and JSDoc
- [ ] T012 Export getTime and setTime functions from src/index.ts
- [ ] T013 Add TypeScript type definitions for function signatures if needed

## Phase 3.4: Integration
- [ ] T014 Verify all tests pass with `npm test`
- [ ] T015 Verify TypeScript compilation with `npm run build`
- [ ] T016 Test ESM build output in dist/
- [ ] T017 Test CJS build output in dist/

## Phase 3.5: Polish
- [ ] T018 Run linter with `npm run lint` and fix any issues
- [ ] T019 [P] Verify quickstart examples from quickstart.md work correctly
- [ ] T020 [P] Performance validation comparing against native Date.prototype methods
- [ ] T021 Documentation review and JSDoc completeness check

## Dependencies
- Setup (T001-T002) must complete first
- Tests (T003-T009) before implementation (T010-T013)
- All implementation before integration (T014-T017)
- Integration before polish (T018-T021)

## Parallel Example
```
# Launch T003-T006 together (different test scenarios):
Task: "Contract test for getTime function in tests/getTime.test.ts"
Task: "Contract test for setTime function in tests/setTime.test.ts"
Task: "Integration test for timestamp extraction in tests/getTime.test.ts"
Task: "Integration test for date modification in tests/setTime.test.ts"

# Launch T010-T011 together (independent function implementations):
Task: "Implement getTime function in src/getTime/index.ts"
Task: "Implement setTime function in src/setTime/index.ts"
```

## Notes
- [P] tasks = different files or independent logical units
- Verify tests fail before implementing (TDD approach)
- Commit after each task completion
- Maintain compatibility with JavaScript Date.prototype methods

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - getTime.contract.ts → getTime contract test task [P]
   - setTime.contract.ts → setTime contract test task [P]
   - Each contract → implementation task [P]

2. **From Data Model**:
   - getTime function signature → implementation task [P]
   - setTime function signature → implementation task [P]
   - Type definitions → export tasks

3. **From User Stories (Quickstart)**:
   - Timestamp extraction scenarios → integration tests [P]
   - Date modification scenarios → integration tests [P]
   - Usage examples → validation tasks

4. **Ordering**:
   - Setup → Tests → Implementation → Integration → Polish
   - Independent functions can be developed in parallel

## Validation Checklist
*GATE: Checked by main() before returning*

- [x] All contracts have corresponding tests (T003-T004)
- [x] All function signatures have implementation tasks (T010-T011)
- [x] All tests come before implementation (T003-T009 before T010-T013)
- [x] Parallel tasks truly independent (different files/functions)
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task (separate function directories)