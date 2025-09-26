# Tasks: README.md最新化

**Input**: Design documents from `/specs/006-readme-md/`
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
- **Documentation**: `README.md` at repository root
- **Validation**: `specs/006-readme-md/contracts/` for test files

## Phase 3.1: Setup & Analysis
- [ ] T001 Analyze current README.md structure and create backup copy
- [ ] T002 Extract all current code examples from README.md for validation
- [ ] T003 [P] Create test file specs/006-readme-md/test-examples.ts for example validation

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [ ] T004 [P] Create contract test for documentation validation in specs/006-readme-md/contracts/documentation-validation.test.ts
- [ ] T005 [P] Create test for new function examples in specs/006-readme-md/contracts/new-functions.test.ts
- [ ] T006 [P] Create test for bundle size accuracy in specs/006-readme-md/contracts/bundle-size.test.ts
- [ ] T007 [P] Create test for import statement validation in specs/006-readme-md/contracts/imports.test.ts

## Phase 3.3: Core Documentation Updates (ONLY after tests are failing)
### New Function Documentation
- [ ] T008 Add `compare` function documentation to Date Comparison section in README.md
- [ ] T009 Add `now` function documentation to Core Functions section in README.md
- [ ] T010 Add `setTime` and `getTime` documentation to new Date Component Setting section in README.md
- [ ] T011 Add `setMilliseconds` documentation to Date Component Setting section in README.md
- [ ] T012 Add `isBetween` function documentation to Date Comparison section in README.md
- [ ] T013 Add `constants` (MIN_DATE, MAX_DATE) documentation to new Constants section in README.md

### Example Updates
- [ ] T014 Update Quick Start section to include `now()` and `compare` examples in README.md
- [ ] T015 Add TypeScript examples showing `Date | number` parameter flexibility in README.md
- [ ] T016 Update TypeScript Support section with new type imports (BetweenOption) in README.md

### Metrics Updates
- [ ] T017 Update Bundle Size section with current metrics (21KB vs old 17.5KB) in README.md
- [ ] T018 Update Features list to mention new comparison and timing functions in README.md

## Phase 3.4: Integration & Validation
- [ ] T019 Validate all code examples compile and run correctly
- [ ] T020 Cross-reference documentation with generated TypeDoc API docs
- [ ] T021 Verify all 72 exported functions are documented
- [ ] T022 Check import statements match actual exports from src/index.ts

## Phase 3.5: Polish & Finalization
- [ ] T023 [P] Run prettier on README.md for consistent formatting
- [ ] T024 [P] Update table of contents if structure changed
- [ ] T025 [P] Create migration guide for users upgrading (if needed)
- [ ] T026 Validate documentation against quickstart.md scenarios
- [ ] T027 Final review comparing against spec.md requirements

## Dependencies
- Setup tasks (T001-T003) must complete first
- Tests (T004-T007) before documentation updates (T008-T018)
- Core updates (T008-T013) can be done sequentially (same file)
- Example updates (T014-T016) depend on function documentation
- Validation (T019-T022) after all documentation updates
- Polish tasks (T023-T027) can run after validation

## Parallel Example
```
# Launch T004-T007 together (different test files):
Task: "Create contract test for documentation validation in specs/006-readme-md/contracts/documentation-validation.test.ts"
Task: "Create test for new function examples in specs/006-readme-md/contracts/new-functions.test.ts"
Task: "Create test for bundle size accuracy in specs/006-readme-md/contracts/bundle-size.test.ts"
Task: "Create test for import statement validation in specs/006-readme-md/contracts/imports.test.ts"

# Launch T023-T025 together (independent polish tasks):
Task: "Run prettier on README.md for consistent formatting"
Task: "Update table of contents if structure changed"
Task: "Create migration guide for users upgrading"
```

## Notes
- All README.md edits (T008-T018) must be sequential (same file)
- Contract tests can run in parallel (different files)
- Verify tests fail before implementing documentation changes
- Commit after each task group for easy rollback
- Use exact function signatures from research.md

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - documentation-validation.ts → T004 contract test
   - Each validation requirement → specific test task

2. **From Data Model**:
   - FunctionDocumentation entity → documentation tasks (T008-T013)
   - DocumentSection entity → section organization tasks

3. **From Research**:
   - 7 new functions → 7 documentation tasks
   - Bundle size findings → T017 update task
   - Function signatures → exact documentation content

4. **From Quickstart**:
   - Each validation step → integration test task
   - Example code → validation task T019

## Validation Checklist
*GATE: Checked before completion*

- [x] All contracts have corresponding tests (T004-T007)
- [x] All new functions have documentation tasks (T008-T013)
- [x] All tests come before implementation (Phase 3.2 before 3.3)
- [x] Parallel tasks truly independent (different files)
- [x] Each task specifies exact file path
- [x] No parallel tasks modify README.md simultaneously

## Completion Criteria
- All 72 exported functions documented
- All examples are executable
- Bundle size accurately reported (21KB)
- All contract tests passing
- Quickstart validation successful