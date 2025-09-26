# Implementation Plan: README.md最新化

**Branch**: `006-readme-md` | **Date**: 2025-09-26 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/006-readme-md/spec.md`

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
Update README.md documentation to include all currently exported functions, with a focus on newly added functions (compare, now, setTime, getTime, setMilliseconds, isBetween, constants). Ensure all examples work with the current API and accurately reflect the library's capabilities.

## Technical Context
**Language/Version**: TypeScript 5.9+ / Node.js 18+
**Primary Dependencies**: Vitest (testing), TypeDoc (documentation)
**Storage**: N/A (documentation only)
**Testing**: Documentation validation through example testing
**Target Platform**: GitHub README (Markdown)
**Project Type**: single (library documentation)
**Performance Goals**: N/A (documentation task)
**Constraints**: Must maintain backward compatibility in documentation structure
**Scale/Scope**: ~500 lines of documentation, 7 new functions to document

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Since no formal constitution is defined, using general documentation best practices:
- ✅ Clear and concise documentation
- ✅ Working code examples
- ✅ Comprehensive API coverage
- ✅ User-focused content

## Project Structure

### Documentation (this feature)
```
specs/006-readme-md/
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
```

**Structure Decision**: Option 1 (Single project) - This is a library documentation update

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - Current bundle size metrics
   - Complete list of exported functions
   - Function signatures for new additions

2. **Generate and dispatch research agents**:
   ```
   Task: Research current bundle size from dist/ directory
   Task: Analyze src/index.ts for complete export list
   Task: Extract function signatures from new implementations
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: Document structure and sections to update
   - Rationale: Ensure comprehensive coverage
   - Alternatives considered: Different organization approaches

**Output**: research.md with all documentation requirements identified

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** → `data-model.md`:
   - Function documentation entries
   - Example code blocks
   - API reference structure

2. **Generate API contracts** from functional requirements:
   - Documentation format specification
   - Example validation criteria
   - Section organization rules

3. **Generate contract tests** from contracts:
   - Example code validation
   - Import statement verification
   - Function signature accuracy

4. **Extract test scenarios** from user stories:
   - Developer finding function documentation
   - Following quick start guide
   - Using TypeScript examples

5. **Update agent file incrementally** (O(1) operation):
   - Run `.specify/scripts/bash/update-agent-context.sh claude`
   - Add README update context
   - Note documentation-only task

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, CLAUDE.md update

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Analyze current README.md structure
- Identify sections needing updates
- Generate tasks for each new function documentation
- Create tasks for example updates
- Add validation tasks

**Ordering Strategy**:
- Analyze current exports first
- Document new functions second
- Update examples third
- Validate all changes last

**Estimated Output**: 15-20 numbered, ordered tasks in tasks.md

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)
**Phase 4**: Implementation (execute tasks.md following constitutional principles)
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

No violations - this is a straightforward documentation update.

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