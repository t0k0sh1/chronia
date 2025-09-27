
# Implementation Plan: Improvements to Input Validation for clamp, compare, is*, and diff* Functions

**Branch**: `009-improvements-to-input` | **Date**: 2025-09-27 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/009-improvements-to-input/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Fill the Constitution Check section based on the content of the constitution document.
4. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, `GEMINI.md` for Gemini CLI, `QWEN.md` for Qwen Code or `AGENTS.md` for opencode).
7. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
Standardize input validation across all clamp, compare, is*, and diff* functions in the chronia library by implementing the existing internal validator functions (isValidDate, isValidNumber, isValidDateOrNumber). This refactoring improves code consistency and maintainability while preserving exact external behavior and ensuring zero breaking changes to the public API.

## Technical Context
**Language/Version**: TypeScript 5.x, Node.js 18+
**Primary Dependencies**: Vitest (testing), ESLint (linting), TypeDoc (documentation)
**Storage**: N/A (utility library)
**Testing**: Vitest with comprehensive test suites for validation logic
**Target Platform**: Cross-platform (Node.js, browsers, ESM/CJS)
**Project Type**: single - TypeScript utility library
**Performance Goals**: <5% regression in function execution time, maintain sub-millisecond validation
**Constraints**: Zero breaking changes, backward compatibility, existing test compatibility
**Scale/Scope**: ~25 functions across 4 categories (clamp, compare, is*, diff*), existing comprehensive test suites

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**No active constitution found** - proceeding with standard best practices:
- ✅ Maintain existing test-driven development approach
- ✅ Preserve backward compatibility and external behavior
- ✅ Follow established TypeScript library patterns
- ✅ Ensure comprehensive validation without performance degradation

## Project Structure

### Documentation (this feature)
```
specs/[###-feature]/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
# Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure]
```

**Structure Decision**: [DEFAULT to Option 1 unless Technical Context indicates web/mobile app]

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:
   ```
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Generate contract tests** from contracts:
   - One test file per endpoint
   - Assert request/response schemas
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:
   - Each story → integration test scenario
   - Quickstart test = story validation steps

5. **Update agent file incrementally** (O(1) operation):
   - Run `.specify/scripts/bash/update-agent-context.sh claude`
     **IMPORTANT**: Execute it exactly as specified above. Do not add or remove any arguments.
   - If exists: Add only NEW tech from current plan
   - Preserve manual additions between markers
   - Update recent changes (keep last 3)
   - Keep under 150 lines for token efficiency
   - Output to repository root

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, agent-specific file

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Category-based implementation approach for 4 function types (comparison, boolean, calculation, range)
- Contract tests first (TDD approach) - must fail before implementation
- Function-by-function validation replacement within each category
- Comprehensive testing and validation after each category

**Ordering Strategy**:
- Phase 1: Contract test creation and verification (must fail)
- Phase 2: Comparison functions (1 function - compare)
- Phase 3: Boolean functions (13 functions - is* family) [P] for independent functions
- Phase 4: Calculation functions (7 functions - diff* family) [P] for independent functions
- Phase 5: Range functions (1 function - clamp)
- Phase 6: Integration testing and performance validation

**Function Categorization**:
- **Comparison**: compare (RangeError behavior)
- **Boolean**: isAfter, isBefore, isEqual, isAfterOrEqual, isBeforeOrEqual, isSame* functions (return false behavior)
- **Calculation**: diffDays, diffMinutes, diffSeconds, diffHours, diffMilliseconds, diffMonths, diffYears (graceful handling)
- **Range**: clamp (Invalid Date behavior)

**Implementation Tasks per Function**:
1. Update import statements to include appropriate validators
2. Replace manual isNaN checks with internal validator calls
3. Maintain exact current error handling behavior
4. Verify function signature preservation
5. Run existing tests to ensure zero regressions

**Parallel Execution Opportunities**:
- [P] All boolean functions can be updated simultaneously (independent files)
- [P] All calculation functions can be updated simultaneously (independent files)
- [P] Contract tests can be created in parallel
- [P] Performance tests can run in parallel with functional tests

**Estimated Output**: 35-40 numbered, ordered tasks covering:
- 2 contract test tasks
- 22 function implementation tasks (1 per target function)
- 8 validation and testing tasks
- 5 performance and quality assurance tasks

**Dependencies**:
- Contract tests must be created and verified to fail before any implementation
- Comparison and range functions (single instances) block their categories
- Boolean and calculation functions can proceed in parallel within their categories
- Integration testing requires all implementations complete
- Performance validation requires baseline establishment

**Success Criteria per Task**:
- Each implementation task: Function uses internal validators + all existing tests pass
- Each validation task: Contract tests pass + performance within 5% + no breaking changes
- Overall completion: 100% internal validator adoption + zero behavioral changes

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |


## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented (none required)

---
*Based on Constitution v2.1.1 - See `/memory/constitution.md`*
