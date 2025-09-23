# Implementation Plan: getTime/setTime Implementation

**Branch**: `002-gettime-settime` | **Date**: 2025-09-23 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-gettime-settime/spec.md`

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
Implement getTime() and setTime() utility functions that provide timestamp extraction and Date object modification capabilities, maintaining full compatibility with JavaScript's native Date.prototype methods while integrating seamlessly with the chronia date utility library.

## Technical Context
**Language/Version**: TypeScript 5.x (based on existing codebase)
**Primary Dependencies**: Vitest (testing framework), no external runtime dependencies
**Storage**: N/A
**Testing**: Vitest with table-driven tests
**Target Platform**: Node.js and browsers (dual ESM/CJS build)
**Project Type**: single - TypeScript utility library
**Performance Goals**: Maintain native Date performance - O(1) operations for timestamp conversion
**Constraints**: Full compatibility with JavaScript Date.prototype.getTime() and Date.prototype.setTime()
**Scale/Scope**: Two utility functions with comprehensive timestamp handling

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Based on template constitution (no specific constraints):
- ✅ Single responsibility - each function has one clear purpose
- ✅ Minimal dependencies - no new external dependencies
- ✅ TDD approach - will write tests first
- ✅ Compatibility - maintains JavaScript Date API compatibility
- ✅ Simple implementation - straightforward timestamp operations

## Project Structure

### Documentation (this feature)
```
specs/002-gettime-settime/
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
├── getTime/
│   └── index.ts         # getTime function implementation
├── setTime/
│   └── index.ts         # setTime function implementation
└── index.ts             # Export updates

tests/
├── getTime.test.ts      # getTime test cases
└── setTime.test.ts      # setTime test cases
```

**Structure Decision**: Option 1 - Single project (TypeScript utility library)

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - No NEEDS CLARIFICATION items remain
   - Research timestamp handling patterns in JavaScript

2. **Generate and dispatch research agents**:
   ```
   Task: "Research JavaScript Date timestamp best practices"
   Task: "Find edge case handling patterns for Date.prototype.getTime/setTime"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: Direct implementation maintaining native compatibility
   - Rationale: Leverage existing JavaScript Date behavior for reliability
   - Alternatives considered: Custom timestamp validation vs native behavior

**Output**: research.md with timestamp handling patterns confirmed

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** → `data-model.md`:
   - Date object representation
   - Timestamp value types and ranges
   - Error handling for invalid inputs

2. **Generate API contracts** from functional requirements:
   - Function signatures: `getTime(date: Date): number` and `setTime(date: Date, time: number): Date`
   - Input validation contracts
   - Return value specifications

3. **Generate contract tests** from contracts:
   - Test file structure for both functions
   - Edge case tests for invalid inputs
   - Compatibility tests with native Date methods

4. **Extract test scenarios** from user stories:
   - Timestamp extraction scenarios
   - Date modification scenarios
   - Edge case and error handling scenarios

5. **Update agent file incrementally** (O(1) operation):
   - Run `.specify/scripts/bash/update-agent-context.sh claude`
   - Add getTime/setTime function information
   - Document timestamp handling patterns

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, CLAUDE.md updates

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `.specify/templates/tasks-template.md` as base
- Generate tasks from Phase 1 design docs (contracts, data model, quickstart)
- Function implementation tasks for getTime and setTime [P]
- Test creation tasks for each function [P]
- Integration and validation tasks

**Ordering Strategy**:
- TDD order: Tests before implementation
- Independent functions can be developed in parallel
- Integration after both functions complete

**Estimated Output**: 8-12 numbered, ordered tasks in tasks.md

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)
**Phase 4**: Implementation (execute tasks.md following constitutional principles)
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

No violations - implementation follows all constitutional principles.

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
- [x] Complexity deviations documented (none)

---
*Based on Constitution v2.1.1 - See `/memory/constitution.md`*