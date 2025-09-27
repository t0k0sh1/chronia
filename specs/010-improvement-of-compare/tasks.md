# Tasks: Compare Function Enhancement

**Input**: Design documents from `/specs/010-improvement-of-compare/`
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
- TypeScript utility library structure with Vitest testing

## Phase 3.1: Setup & Baseline
- [x] T001 Verify current compare function behavior and create baseline performance measurements
- [x] T002 [P] Run existing tests to establish baseline: `npm test tests/compare.test.ts`
- [x] T003 [P] Run linting to ensure code quality standards: `npm run lint`

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [x] T004 Contract test for enhanced compare function in specs/010-improvement-of-compare/contracts/enhanced-compare.test.ts
- [x] T005 [P] Integration test for mixed input types (Date + number) in tests/enhanced-compare-integration.test.ts
- [x] T006 [P] Performance benchmark test for 10k date array sorting in tests/enhanced-compare-performance.test.ts
- [x] T007 [P] Backward compatibility test suite in tests/enhanced-compare-compatibility.test.ts

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [x] T008 Update compare function signature to accept Date | number inputs in src/compare/index.ts
- [x] T009 Implement input type validation using isValidDateOrNumber in src/compare/index.ts
- [x] T010 Add case-insensitive order parameter handling in src/compare/index.ts
- [x] T011 Implement default parameter behavior (ASC when omitted) in src/compare/index.ts
- [x] T012 Update JSDoc documentation with new signature and examples in src/compare/index.ts

## Phase 3.4: Integration & Validation
- [ ] T013 Verify all contract tests pass after implementation
- [ ] T014 Run performance benchmarks and validate <100ms target for 10k dates
- [ ] T015 [P] Run all existing tests to ensure backward compatibility maintained
- [ ] T016 [P] Validate error handling for edge cases (invalid dates, timestamps, order params)

## Phase 3.5: Documentation & Polish
- [ ] T017 [P] Update README.md with enhanced compare function examples showing Date | number usage
- [ ] T018 [P] Update API documentation: run `npx typedoc` to regenerate docs with new signature
- [ ] T019 [P] Add usage examples for case-insensitive order parameters in documentation
- [ ] T020 [P] Performance optimization review - validate minimal overhead for validation logic
- [ ] T021 Clean up any temporary test files and verify dist build includes updates

## Dependencies
- Setup (T001-T003) must complete before tests
- Contract tests (T004-T007) before implementation (T008-T012)
- T008 blocks T009-T012 (same file modifications)
- Implementation (T008-T012) before integration validation (T013-T016)
- All implementation complete before documentation (T017-T021)

## Parallel Example
```bash
# Launch T002-T003 together (independent verification):
Task: "Run existing tests to establish baseline: npm test tests/compare.test.ts"
Task: "Run linting to ensure code quality standards: npm run lint"

# Launch T005-T007 together (different test files):
Task: "Integration test for mixed input types in tests/enhanced-compare-integration.test.ts"
Task: "Performance benchmark test for 10k dates in tests/enhanced-compare-performance.test.ts"
Task: "Backward compatibility test suite in tests/enhanced-compare-compatibility.test.ts"

# Launch T015-T016 together (independent validation):
Task: "Run all existing tests to ensure backward compatibility maintained"
Task: "Validate error handling for edge cases"

# Launch T017-T020 together (different documentation files):
Task: "Update README.md with enhanced compare function examples"
Task: "Update API documentation: run npx typedoc"
Task: "Add usage examples for case-insensitive order parameters"
Task: "Performance optimization review"
```

## Notes
- [P] tasks = different files, no dependencies
- Verify tests fail before implementing (T004-T007 must fail initially)
- All changes confined to src/compare/index.ts for core implementation
- Maintain backward compatibility - existing function calls must work unchanged
- Performance target: <100ms sort time for 10,000 mixed Date/number array

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - enhanced-compare.test.ts → T004 contract test task
   - Integration scenarios → T005-T007 test tasks [P]

2. **From Data Model**:
   - Enhanced function signature → T008-T012 implementation tasks
   - Input validation requirements → T009 validation task
   - Error handling specifications → T016 validation task

3. **From Research**:
   - Performance requirements → T006, T014 performance tasks
   - Backward compatibility → T007, T015 compatibility tasks
   - Documentation updates → T017-T019 documentation tasks [P]

4. **From Quickstart**:
   - Validation steps → T013-T016 verification tasks
   - Success criteria → T021 cleanup task

## Validation Checklist
*GATE: Checked before task execution begins*

- [x] All contracts have corresponding tests (T004 for enhanced-compare.test.ts)
- [x] Function signature enhancement has implementation tasks (T008-T012)
- [x] All tests come before implementation (T004-T007 before T008-T012)
- [x] Parallel tasks truly independent (different files or independent operations)
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task
- [x] Performance requirements have validation tasks (T006, T014)
- [x] Backward compatibility explicitly tested (T007, T015)
- [x] Documentation updates included (T017-T019)

## Completion Criteria
- All 21 tasks completed successfully
- Enhanced compare function accepts Date | number inputs
- Case-insensitive order parameters supported
- Performance targets met (<100ms for 10k dates)
- Zero breaking changes to existing API
- Documentation updated with new examples
- All tests passing