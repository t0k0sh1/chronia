# Tasks: Type Validation Functions

**Input**: Design documents from `/specs/004-type-validators/`
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
- This is a library project with internal utilities in `src/_lib/`

## Phase 3.1: Setup
- [x] T001 Create validators.ts file structure in src/_lib/validators.ts
- [x] T002 Create test file structure in src/_lib/validators.test.ts

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [x] T003 Write comprehensive tests for isValidDate function in src/_lib/validators.test.ts
- [x] T004 Write comprehensive tests for isValidNumber function in src/_lib/validators.test.ts
- [x] T005 Write comprehensive tests for isValidDateOrNumber function in src/_lib/validators.test.ts
- [x] T006 Run tests to verify they fail (no implementation exists yet)

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [x] T007 Implement isValidDate function in src/_lib/validators.ts
- [x] T008 Implement isValidNumber function in src/_lib/validators.ts
- [x] T009 Implement isValidDateOrNumber function in src/_lib/validators.ts
- [x] T010 Run tests to verify all validators pass their tests

## Phase 3.4: Integration with Existing Code
- [x] T011 Update src/addDays/index.ts to use new validators
- [x] T012 Update src/addMonths/index.ts to use new validators
- [x] T013 Update src/addYears/index.ts to use new validators
- [x] T014 Update src/setTime/index.ts to use new validators
- [x] T015 Update src/compare/index.ts to use new validators (for strict validation)
- [x] T016 Verify all existing tests still pass after integration

## Phase 3.5: Polish
- [x] T017 Add performance benchmark tests in src/_lib/validators.bench.ts
- [x] T018 Run performance tests to verify <1ms per validation
- [x] T019 Add JSDoc comments with examples to all validator functions
- [x] T020 Update TypeScript type definitions to ensure proper type guard inference
- [x] T021 Run npm run build to ensure ESM and CJS builds work correctly
- [x] T022 Run npx typedoc to update documentation

## Dependencies
- Setup (T001-T002) must complete first
- Tests (T003-T006) before implementation (T007-T010)
- Implementation (T007-T010) before integration (T011-T016)
- Integration before polish (T017-T022)
- T003, T004, T005 can't run in parallel (same test file)
- T007, T008, T009 can't run in parallel (same implementation file)
- T011-T015 can run in parallel (different files)

## Parallel Example
```
# After implementation is complete, update existing functions in parallel:
Task: "Update src/addDays/index.ts to use new validators"
Task: "Update src/addMonths/index.ts to use new validators"
Task: "Update src/addYears/index.ts to use new validators"
Task: "Update src/setTime/index.ts to use new validators"
Task: "Update src/compare/index.ts to use new validators"
```

## Notes
- Tests must be comprehensive including all edge cases from spec
- Each validator function is pure with no side effects
- Type guards must work correctly for TypeScript inference
- Performance is critical - validators will be called frequently
- These are internal utilities - not exported in public API

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - validators.ts contract → comprehensive test tasks
   - Each function signature → implementation task

2. **From Data Model**:
   - Each validation function → test and implementation tasks
   - Truth table → test cases for each scenario

3. **From Quickstart**:
   - Usage examples → test scenarios
   - Integration examples → update existing functions
   - Performance tests → benchmark tasks

4. **Ordering**:
   - Setup → Tests → Implementation → Integration → Polish
   - TDD strictly enforced

## Validation Checklist
*GATE: Checked by main() before returning*

- [x] All three validators have test tasks
- [x] All three validators have implementation tasks
- [x] Tests come before implementation (TDD)
- [x] Integration tasks update existing functions
- [x] Each task specifies exact file path
- [x] No parallel tasks modify the same file