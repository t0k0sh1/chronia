# Tasks: Improvement of isValid

**Input**: Design documents from `/specs/007-improvement-of-isvalid/`
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
- TypeScript utility library with Vitest testing

## Phase 3.1: Setup & Baseline
- [x] T001 Verify current isValid implementation and create baseline
- [x] T002 Run existing isValid tests to establish performance baseline
- [x] T003 [P] Backup current implementation for rollback safety

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [x] T004 [P] Contract test internal validator usage in specs/007-improvement-of-isvalid/contracts/internal-validator-usage.test.ts
- [x] T005 [P] Contract test performance optimization in specs/007-improvement-of-isvalid/contracts/performance-optimization.test.ts
- [x] T006 Verify contract tests FAIL with current implementation
- [x] T007 Validate that all existing isValid tests still pass

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [x] T008 Import isValidDateOrNumber validator in src/isValid/index.ts
- [x] T009 Replace current validation logic with isValidDateOrNumber call in src/isValid/index.ts
- [x] T010 Update JSDoc comments to reflect internal implementation change
- [x] T011 Verify contract tests now PASS after implementation

## Phase 3.4: Integration & Validation
- [x] T012 Run full isValid test suite to ensure backward compatibility
- [x] T013 Run performance benchmarks to measure improvement
- [x] T014 Execute quickstart validation steps from quickstart.md
- [x] T015 Verify no regressions in other library functions

## Phase 3.5: Quality Assurance & Polish
- [x] T016 [P] Run ESLint on modified files
- [x] T017 [P] Run TypeScript type checking
- [x] T018 [P] Run full test suite to ensure no regressions
- [x] T019 Build project to verify compilation success
- [x] T020 Generate updated documentation with TypeDoc
- [x] T021 Final validation against functional requirements

## Dependencies
- Setup tasks (T001-T003) must complete first
- Contract tests (T004-T005) before verification (T006-T007)
- Tests must fail (T006) before implementation (T008-T011)
- Implementation (T008-T011) before validation (T012-T015)
- All core work before quality assurance (T016-T021)

## Parallel Example
```bash
# Launch T004-T005 together (different contract test files):
Task: "Contract test internal validator usage in specs/007-improvement-of-isvalid/contracts/internal-validator-usage.test.ts"
Task: "Contract test performance optimization in specs/007-improvement-of-isvalid/contracts/performance-optimization.test.ts"

# Launch T016-T018 together (independent quality checks):
Task: "Run ESLint on modified files"
Task: "Run TypeScript type checking"
Task: "Run full test suite to ensure no regressions"
```

## Notes
- Implementation involves single file modification (src/isValid/index.ts)
- Contract tests are already created and should fail initially
- Performance improvement expected for invalid numeric inputs (NaN, Infinity)
- Zero breaking changes to public API required
- All existing test cases must continue to pass

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - internal-validator-usage.test.ts → T004 contract test
   - performance-optimization.test.ts → T005 contract test

2. **From Data Model**:
   - IsValidFunction entity → implementation task T008-T010
   - InternalValidator entity → import and usage tasks

3. **From Research**:
   - Performance optimization → measurement tasks T013
   - Backward compatibility → validation tasks T012, T015

4. **From Quickstart**:
   - Validation steps → quickstart execution task T014
   - Success criteria → final validation task T021

## Validation Checklist
*GATE: Checked before completion*

- [x] All contracts have corresponding tests (T004-T005)
- [x] All entities have implementation tasks (T008-T010)
- [x] All tests come before implementation (Phase 3.2 before 3.3)
- [x] Parallel tasks truly independent (different files or operations)
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task

## Completion Criteria
- All contract tests pass after implementation
- All existing isValid tests continue to pass
- Performance improvement measurable for invalid numeric inputs
- ESLint and TypeScript checks pass
- Build succeeds without errors
- Functional requirements FR-001 through FR-007 satisfied