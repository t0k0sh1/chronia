
# Implementation Plan: Moving Validators Test Code

**Branch**: `008-moving-validators-s` | **Date**: 2025-09-27 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/008-moving-validators-s/spec.md`

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
Reorganize validator test files from source directory to the standard tests directory structure. Move `src/_lib/validators.test.ts` to `tests/_lib/validators.test.ts` while maintaining all test functionality and updating import paths. This improves consistency with other library components and enhances test discoverability and maintainability.

## Technical Context
**Language/Version**: TypeScript 5.x, Node.js 18+
**Primary Dependencies**: Vitest (testing), ESLint (linting), TypeDoc (documentation)
**Storage**: N/A
**Testing**: Vitest with table-driven tests
**Target Platform**: Cross-platform (Node.js, browsers, ESM/CJS)
**Project Type**: single - TypeScript utility library
**Performance Goals**: Maintain existing test execution performance
**Constraints**: Zero breaking changes to test functionality, maintain test coverage
**Scale/Scope**: Single test file reorganization within existing utility library

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**No active constitution found** - proceeding with standard best practices:
- ✅ Maintain existing test functionality
- ✅ Follow established project patterns
- ✅ Preserve test coverage and quality
- ✅ Maintain consistency with other test files

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
1. **✅ Current state analysis**:
   - Analyzed existing test file at `src/_lib/validators.test.ts`
   - Confirmed 281 lines with 48 comprehensive test cases
   - Verified import pattern using relative path `./validators`

2. **✅ Target structure research**:
   - Identified established pattern in `tests/_lib/` directory
   - Found existing precedent with `truncateToUnit.test.ts`
   - Confirmed target path should be `tests/_lib/validators.test.ts`

3. **✅ Migration strategy analysis**:
   - Simple file move with import path update required
   - Import path needs change to `../../src/_lib/validators`
   - Zero risk to test functionality, only location change

**Output**: ✅ research.md with analysis and migration strategy

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **✅ Data model extraction** → `data-model.md`:
   - TestFile entity with path and content fields
   - SourceFile entity with export definitions
   - DirectoryStructure entity with patterns
   - TestRunner entity with configuration

2. **✅ Contract tests generation**:
   - `contracts/file-move-validation.test.ts`: Validates file moved correctly
   - `contracts/test-functionality-preservation.test.ts`: Validates test functionality
   - Tests designed to FAIL before implementation

3. **✅ Validation scenarios** from requirements:
   - File system operations validation
   - Import path resolution verification
   - Test functionality preservation
   - Pattern compliance checking

4. **✅ Quickstart guide**:
   - Step-by-step move validation process
   - Pre/post implementation verification
   - Success criteria and rollback plan

5. **⚠️ Agent file update**:
   - CLAUDE.md already contains test organization guidelines
   - Recent update added test file organization section
   - No additional updates needed for this simple reorganization

**Output**: ✅ data-model.md, ✅ contracts/*, ✅ quickstart.md, ⚠️ agent file (current)

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Simple file system operation tasks
- Contract test validation before/after
- File move with import path updates
- Comprehensive validation steps

**Ordering Strategy**:
- T001-T002: Setup and baseline verification
- T003-T004: Contract tests (must fail initially)
- T005-T006: File system operations (move and update)
- T007-T009: Validation and integration testing

**Estimated Output**: 8-10 focused tasks for this file reorganization

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
- [x] Phase 2: Task planning approach described (/plan command)
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
