---
description: Generate implementation tasks for a specification
allowed-tools: Read, Write, Edit, MultiEdit, Glob, Grep
argument-hint: <feature-name> [-y] [--sequential]
---

# Implementation Tasks Generator

<background_information>
- **Mission**: Generate detailed, actionable implementation tasks that translate technical design into executable work items
- **Success Criteria**:
  - All requirements mapped to specific tasks
  - Tasks properly sized (1-3 hours each)
  - Clear task progression with proper hierarchy
  - Natural language descriptions focused on capabilities
</background_information>

<instructions>
## Core Task
Generate implementation tasks for feature **$1** based on approved requirements and design.

## Execution Steps

### Step 1: Load Context

**Read all necessary context**:
- `.kiro/specs/$1/spec.json`, `requirements.md`, `design.md`
- `.kiro/specs/$1/tasks.md` (if exists, for merge mode)
- **Entire `.kiro/steering/` directory** for complete project memory

**Validate approvals**:
- If `-y` flag provided ($2 == "-y"): Auto-approve requirements and design in spec.json
- Otherwise: Verify both approved (stop if not, see Safety & Fallback)
- Determine sequential mode based on presence of `--sequential`

### Step 2: Generate Implementation Tasks

**Load generation rules and template**:
- Read `.kiro/settings/rules/tasks-generation.md` for principles
- If `sequential` is **false**: Read `.kiro/settings/rules/tasks-parallel-analysis.md` for parallel judgement criteria
- Read `.kiro/settings/templates/specs/tasks.md` for format (supports `(P)` markers)

**Generate task list following all rules**:
- Use language specified in spec.json
- Map all requirements to tasks
- When documenting requirement coverage, list numeric requirement IDs only (comma-separated) without descriptive suffixes, parentheses, translations, or free-form labels
- Ensure all design components included
- Verify task progression is logical and incremental
- Collapse single-subtask structures by promoting them to major tasks and avoid duplicating details on container-only major tasks (use template patterns accordingly)
- Apply `(P)` markers to tasks that satisfy parallel criteria (omit markers in sequential mode)
- Mark optional test coverage subtasks with `- [ ]*` only when they strictly cover acceptance criteria already satisfied by core implementation and can be deferred post-MVP
- If existing tasks.md found, merge with new content

**Assign appropriate agents to tasks**:
Each task must specify which agent should execute it. Follow CLAUDE.md's Code Development Workflow:
- **Phase 1 (Design)**: Use `function-interface-designer` for interface definition tasks
- **Phase 2 (Implementation)**: Use `function-implementer` for implementation and testing tasks
- **Phase 3 (Documentation)**: Use `function-docs-writer` for documentation tasks (required when code is modified)
- **Phase 4 (Quality Check)**: Use `code-reviewer` for code review tasks (required when code is modified)
- **Phase 5 (PBT Validation)**: Use `pbt-spec-validator` for property-based testing (required when functions are created or modified)
  - Guidelines: `docs/guidelines/property-based-testing.md`
  - Input: `.kiro/specs/$1/requirements.md`
  - Output: PBT tests in `.kiro/specs/$1/<function-name>.pbt.test.ts`
- **Phase 6 (Commit & PR)**: Use `commit-pr-validator` for final validation, commit, and PR creation

**Include mandatory final tasks**:
1. **Linting & Build Verification Task** (if code was modified):
   - Add after all implementation tasks are complete
   - Task description: "Run linting and build checks to verify code quality and compilation"
   - Commands: `pnpm lint`, `pnpm lint:docs`, `pnpm build`
   - Execution: Direct Bash execution or use `function-implementer` agent
   - Requirements: All implementation tasks completed
   - If linting or build fails: Fix issues and re-run verification

2. **Documentation Tasks** (if code was modified):
   - Add after linting and build verification passes
   - Task description: "Create comprehensive documentation for all new/modified functions"
   - Agent: `function-docs-writer`
   - Individual function documentation using Function Documentation Workflow
   - Category README updates using Category README Workflow
   - Verification: Run `pnpm lint:docs` to validate documentation quality
   - Requirements: All implementation and linting tasks completed

3. **Code Review Task** (if code was modified):
   - Add after documentation tasks are complete
   - Task description: "Run code review to verify code quality, security, documentation, and adherence to guidelines"
   - Agent: `code-reviewer`
   - Requirements: Linting, build, and documentation must be complete
   - Include iterative fix process: If issues found, use `function-implementer` to fix, then re-review until clean

4. **Property-Based Testing Task** (if functions were created or modified):
   - Add after code review passes
   - Task description: "Validate implementation against specification using property-based testing"
   - Agent: `pbt-spec-validator`
   - Guidelines: Follow `docs/guidelines/property-based-testing.md` for PBT methodology
   - Input: `.kiro/specs/$1/requirements.md` (specification requirements)
   - Purpose: Requirements-based acceptance testing using fast-check to verify implementation satisfies specification properties
   - Test Location: `.kiro/specs/$1/<function-name>.pbt.test.ts`
   - Verification: Run `pnpm test:pbt` to validate all properties pass
   - Requirements: Code review must pass, specification must exist in requirements.md

5. **Commit & PR Task** (always required):
   - Add as the final task
   - Task description: "Create git commit and pull request with comprehensive description"
   - Agent: `commit-pr-validator`
   - Requirements: All previous tasks completed, all quality checks passed

### Step 3: Finalize

**Write and update**:
- Create/update `.kiro/specs/$1/tasks.md`
- Update spec.json metadata:
  - Set `phase: "tasks-generated"`
  - Set `approvals.tasks.generated: true, approved: false`
  - Set `approvals.requirements.approved: true`
  - Set `approvals.design.approved: true`
  - Update `updated_at` timestamp

## Critical Constraints
- **Follow rules strictly**: All principles in tasks-generation.md are mandatory
- **Natural Language**: Describe what to do, not code structure details
- **Complete Coverage**: ALL requirements must map to tasks
- **Maximum 2 Levels**: Major tasks and sub-tasks only (no deeper nesting)
- **Sequential Numbering**: Major tasks increment (1, 2, 3...), never repeat
- **Task Integration**: Every task must connect to the system (no orphaned work)
- **Agent Assignment**: Every task MUST specify which agent executes it (function-interface-designer, function-implementer, code-reviewer, pbt-spec-validator, function-docs-writer, or commit-pr-validator)
- **Workflow Compliance**: Tasks MUST follow CLAUDE.md's 6-phase workflow in order
- **Mandatory Linting & Build**: Linting and build verification task is REQUIRED when code is modified (runs after all implementation tasks)
- **Mandatory Review**: Code review task is REQUIRED when code is modified (runs after linting and build pass)
- **Mandatory PBT**: Property-based testing task is REQUIRED when functions are created or modified
- **Mandatory Documentation**: Documentation tasks are REQUIRED when code is modified
- **Final PR Task**: Commit & PR task is ALWAYS the final task
</instructions>

## Tool Guidance
- **Read first**: Load all context, rules, and templates before generation
- **Write last**: Generate tasks.md only after complete analysis and verification

## Output Description

Provide brief summary in the language specified in spec.json:

1. **Status**: Confirm tasks generated at `.kiro/specs/$1/tasks.md`
2. **Task Summary**:
   - Total: X major tasks, Y sub-tasks
   - All Z requirements covered
   - Average task size: 1-3 hours per sub-task
   - Agent assignments: Appropriate agents assigned to each task
3. **Quality Validation**:
   - ✅ All requirements mapped to tasks
   - ✅ Task dependencies verified
   - ✅ Testing tasks included (TDD in Phase 2, PBT in Phase 5)
   - ✅ Linting & build verification task included (if code modifications present)
     - Runs after all implementation tasks
     - Executes: `pnpm lint`, `pnpm lint:docs`, `pnpm build`
   - ✅ Documentation tasks included (if code modifications present)
     - Runs after linting and build pass (Phase 3)
     - Uses `function-docs-writer` agent
   - ✅ Code review task included (if code modifications present)
     - Runs after documentation is complete (Phase 4)
   - ✅ Property-based testing task included (if functions created/modified)
     - Uses `pbt-spec-validator` agent
     - Follows `docs/guidelines/property-based-testing.md`
     - Input: `.kiro/specs/$1/requirements.md`
     - Runs after code review passes (Phase 5)
   - ✅ Commit & PR task included as final step
4. **Workflow Compliance**:
   - Tasks follow CLAUDE.md's 6-phase workflow
   - Appropriate agents assigned (function-interface-designer, function-implementer, function-docs-writer, code-reviewer, pbt-spec-validator, commit-pr-validator)
5. **Next Action**: Review tasks and proceed when ready

**Format**: Concise (under 250 words)

## Safety & Fallback

### Error Scenarios

**Requirements or Design Not Approved**:
- **Stop Execution**: Cannot proceed without approved requirements and design
- **User Message**: "Requirements and design must be approved before task generation"
- **Suggested Action**: "Run `/kiro:spec-tasks $1 -y` to auto-approve both and proceed"

**Missing Requirements or Design**:
- **Stop Execution**: Both documents must exist
- **User Message**: "Missing requirements.md or design.md at `.kiro/specs/$1/`"
- **Suggested Action**: "Complete requirements and design phases first"

**Incomplete Requirements Coverage**:
- **Warning**: "Not all requirements mapped to tasks. Review coverage."
- **User Action Required**: Confirm intentional gaps or regenerate tasks

**Template/Rules Missing**:
- **User Message**: "Template or rules files missing in `.kiro/settings/`"
- **Fallback**: Use inline basic structure with warning
- **Suggested Action**: "Check repository setup or restore template files"
- **Missing Numeric Requirement IDs**:
  - **Stop Execution**: All requirements in requirements.md MUST have numeric IDs. If any requirement lacks a numeric ID, stop and request that requirements.md be fixed before generating tasks.

### Next Phase: Implementation

**Before Starting Implementation**:
- **IMPORTANT**: Clear conversation history and free up context before running `/kiro:spec-impl`
- This applies when starting first task OR switching between tasks
- Fresh context ensures clean state and proper task focus

**If Tasks Approved**:
- Execute specific task: `/kiro:spec-impl $1 1.1` (recommended: clear context between each task)
- Execute multiple tasks: `/kiro:spec-impl $1 1.1,1.2` (use cautiously, clear context between tasks)
- Without arguments: `/kiro:spec-impl $1` (executes all pending tasks - NOT recommended due to context bloat)

**If Modifications Needed**:
- Provide feedback and re-run `/kiro:spec-tasks $1`
- Existing tasks used as reference (merge mode)

**Note**: The implementation phase will guide you through executing tasks with appropriate context and validation.
