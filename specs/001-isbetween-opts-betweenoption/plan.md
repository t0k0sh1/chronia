# Implementation Plan: isBetween with BetweenOption

**Branch**: `001-isbetween-opts-betweenoption` | **Date**: 2025-09-23 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-isbetween-opts-betweenoption/spec.md`

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
Add configurable boundary inclusion/exclusion control to the existing `isBetween` function through a new optional `BetweenOption` parameter with a `bounds` property using mathematical interval notation ("()", "[]", "[)", "(]").

## Technical Context
**Language/Version**: TypeScript 5.x (based on existing codebase)
**Primary Dependencies**: Vitest (testing framework), no external runtime dependencies
**Storage**: N/A
**Testing**: Vitest with table-driven tests
**Target Platform**: Node.js and browsers (dual ESM/CJS build)
**Project Type**: single - TypeScript utility library
**Performance Goals**: Maintain current performance - millisecond precision date comparisons
**Constraints**: Backward compatibility required (default to "()" behavior)
**Scale/Scope**: Single function enhancement with type definition update

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Based on codebase patterns and CLAUDE.md guidance:
- ✅ Single responsibility - isBetween function has one clear purpose
- ✅ Minimal dependencies - no new external dependencies
- ✅ TDD approach - will write tests first
- ✅ Backward compatible - maintains existing API with optional parameter
- ✅ Simple implementation - straightforward boundary logic

## Project Structure

### Documentation (this feature)
```
specs/001-isbetween-opts-betweenoption/
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
├── isBetween/
│   └── index.ts         # Function implementation
├── types.ts             # Add BetweenOption type
└── index.ts             # Export updates if needed

tests/
└── isBetween.test.ts    # Comprehensive test cases
```

**Structure Decision**: Option 1 - Single project (TypeScript utility library)

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - No NEEDS CLARIFICATION items remain (all resolved in spec)
   - Research existing boundary notation patterns in date libraries

2. **Generate and dispatch research agents**:
   ```
   Task: "Research interval notation conventions in date/time libraries"
   Task: "Find TypeScript type definition best practices for options objects"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: Mathematical interval notation with "bounds" property
   - Rationale: Industry standard, intuitive for developers familiar with math notation
   - Alternatives considered: includeStart/includeEnd boolean flags

**Output**: research.md with interval notation patterns confirmed

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** → `data-model.md`:
   - BetweenOption type with bounds property
   - BoundsType literal union: "()" | "[]" | "[)" | "(]"
   - Extended Interval type to include optional opts

2. **Generate API contracts** from functional requirements:
   - Function signature: `isBetween(date: Date | number, interval: Interval, opts?: BetweenOption): boolean`
   - Type definitions for BetweenOption
   - Backward compatibility maintained

3. **Generate contract tests** from contracts:
   - Test file structure for all 4 boundary modes
   - Edge case tests for invalid bounds values
   - Backward compatibility tests (no opts provided)

4. **Extract test scenarios** from user stories:
   - Inclusive boundary test scenarios
   - Exclusive boundary test scenarios
   - Mixed boundary test scenarios
   - Default behavior verification

5. **Update agent file incrementally** (O(1) operation):
   - Run `.specify/scripts/bash/update-agent-context.sh claude`
   - Add BetweenOption type information
   - Document bounds notation pattern

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, CLAUDE.md updates

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `.specify/templates/tasks-template.md` as base
- Generate tasks from Phase 1 design docs (contracts, data model, quickstart)
- Type definition task for BetweenOption [P]
- Test creation tasks for each boundary mode [P]
- Implementation task for boundary logic
- Documentation update task

**Ordering Strategy**:
- TDD order: Tests before implementation
- Type definitions before implementation
- Documentation after implementation

**Estimated Output**: 8-10 numbered, ordered tasks in tasks.md

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