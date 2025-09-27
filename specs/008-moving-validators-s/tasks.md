# Tasks: Moving Validators Test Code

**Input**: Design documents from `/specs/008-moving-validators-s/`
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
- TypeScript utility library with standard directory structure

## Phase 3.1: Setup & Baseline
- [x] T001 Verify current test file location and establish baseline
- [x] T002 Ensure target directory structure exists at tests/_lib/
- [x] T003 Run existing validator tests to establish performance baseline

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [x] T004 [P] Contract test file move validation in specs/008-moving-validators-s/contracts/file-move-validation.test.ts
- [x] T005 [P] Contract test functionality preservation in specs/008-moving-validators-s/contracts/test-functionality-preservation.test.ts
- [x] T006 Verify contract tests FAIL with current file location
- [x] T007 Validate that existing validator tests pass in current location

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [ ] T008 Create target directory tests/_lib/ if it doesn't exist
- [ ] T009 Move test file from src/_lib/validators.test.ts to tests/_lib/validators.test.ts
- [ ] T010 Update import statement in moved test file from "./validators" to "../../src/_lib/validators"
- [ ] T011 Verify contract tests now PASS after file move

## Phase 3.4: Integration & Validation
- [ ] T012 Run moved validator tests to ensure functionality is maintained
- [ ] T013 Execute full test suite to verify no regressions
- [ ] T014 Validate test discovery and execution from new location
- [ ] T015 Execute quickstart validation steps from quickstart.md

## Phase 3.5: Quality Assurance & Cleanup
- [ ] T016 [P] Run ESLint to ensure code quality standards
- [ ] T017 [P] Run TypeScript type checking to verify import resolution
- [ ] T018 [P] Verify test coverage metrics are maintained
- [ ] T019 Remove any leftover references to old test file location
- [ ] T020 Final validation against all functional requirements

## Dependencies
- Setup tasks (T001-T003) must complete first
- Contract tests (T004-T005) before verification (T006-T007)
- Tests must fail (T006) before implementation (T008-T011)
- Implementation (T008-T011) before validation (T012-T015)
- All core work before quality assurance (T016-T020)

## Parallel Example
```bash
# Launch T004-T005 together (different contract test files):
Task: "Contract test file move validation in specs/008-moving-validators-s/contracts/file-move-validation.test.ts"
Task: "Contract test functionality preservation in specs/008-moving-validators-s/contracts/test-functionality-preservation.test.ts"

# Launch T016-T018 together (independent quality checks):
Task: "Run ESLint to ensure code quality standards"
Task: "Run TypeScript type checking to verify import resolution"
Task: "Verify test coverage metrics are maintained"
```

## Notes
- File move operation is atomic and straightforward
- Contract tests are already created and should fail initially
- Only single import statement needs updating
- No changes to test logic or functionality required
- Zero risk to existing test coverage
- Follows established pattern for _lib test files

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - file-move-validation.test.ts → T004 contract test
   - test-functionality-preservation.test.ts → T005 contract test

2. **From Data Model**:
   - TestFile entity → file move tasks T008-T010
   - DirectoryStructure entity → directory verification T002, T008

3. **From Research**:
   - Current state analysis → baseline verification T001, T003
   - Migration strategy → implementation tasks T009-T010
   - Validation approach → verification tasks T012-T015

4. **From Quickstart**:
   - Validation steps → quickstart execution task T015
   - Success criteria → final validation task T020

## Validation Checklist
*GATE: Checked before completion*

- [x] All contracts have corresponding tests (T004-T005)
- [x] All entities have implementation tasks (T008-T010)
- [x] All tests come before implementation (Phase 3.2 before 3.3)
- [x] Parallel tasks truly independent (different files or operations)
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task

## Completion Criteria
- Validator test file moved from src/_lib/ to tests/_lib/
- All validator tests continue to pass (48 test cases)
- Import path correctly updated to ../../src/_lib/validators
- Contract tests pass after implementation
- Test discovery works automatically from new location
- No regressions in other tests or functionality
- Follows established test directory patterns