---
description: Execute spec tasks using TDD methodology
allowed-tools: Bash, Read, Write, Edit, MultiEdit, Grep, Glob, LS, WebFetch, WebSearch
argument-hint: <feature-name> [task-numbers]
---

# Implementation Task Executor

<background_information>

- **Mission**: Execute implementation tasks using Test-Driven Development methodology based on approved specifications
- **Success Criteria**:
  - All tests written before implementation code
  - Code passes all tests with no regressions
  - Tasks marked as completed in tasks.md
  - Implementation aligns with design and requirements

</background_information>

<instructions>
## Core Task
Execute implementation tasks for feature **$1** using Test-Driven Development.

## Execution Steps

### Step 1: Load Context

**Read all necessary context**:

- `.kiro/specs/$1/spec.json`, `requirements.md`, `design.md`, `tasks.md`
- **Entire `.kiro/steering/` directory** for complete project memory

**Validate approvals**:

- Verify tasks are approved in spec.json (stop if not, see Safety & Fallback)

### Step 2: Select Tasks

**Determine which tasks to execute**:

- If `$2` provided: Execute specified task numbers (e.g., "1.1" or "1,2,3")
- Otherwise: Execute all pending tasks (unchecked `- [ ]` in tasks.md)

### Step 3: Execute with TDD

**Guidelines**: Follow `docs/guidelines/test-driven-development.md` for TDD methodology and `docs/guidelines/function-implementation.md` for implementation patterns.

For each selected task, follow the Red-Green-Refactor TDD cycle:

#### Preparation & Analysis

Before writing tests:

- Analyze function signature and documentation
- **Perform equivalence partitioning**: Identify valid and invalid input classes
- **Identify boundary values**: Determine boundaries between partitions
- Review design.md for implementation requirements

#### Task Type 1: Implementation Tasks

For implementation tasks, follow this sequence:

**1. RED - Write Failing Tests**:

- Write tests in `tests/` directory
- **Test Priority Order** (edge cases first, happy path last):
  1. **Edge Cases & Boundaries** (Highest Priority): Test boundary values, calendar boundaries, special dates
  2. **Invalid Inputs** (High Priority): Test all error conditions comprehensively (NaN, Infinity, Invalid Date, out-of-range)
  3. **Options** (Medium Priority): Test configurable behavior if function has options
  4. **Happy Path** (Minimum Necessary): One representative value per equivalence class only
- Run `pnpm test` to verify tests fail (no implementation yet)

**2. GREEN - Implement Minimal Code**:

- Implement the minimal core logic to make tests pass
- Add appropriate error handling and input validation
- Focus on making tests pass, not on perfection
- Run `pnpm test` to verify all tests pass

**3. REFACTOR - Clean Up**:

- Improve code structure and readability
- Remove duplication
- Apply design patterns where appropriate
- Consider performance implications
- Run `pnpm test` to ensure tests still pass after refactoring

**4. COVERAGE - Verify Comprehensiveness**:

- Run `pnpm test:coverage` to verify comprehensive coverage
- Ensure 100% coverage target is met
- Add missing tests for any uncovered code paths
- Verify implementation satisfies all documented requirements

**5. MARK COMPLETE**:

- Update checkbox from `- [ ]` to `- [x]` in tasks.md

#### Task Type 2: Test Tasks

For test verification tasks (separate from implementation):

**1. VERIFY - Validate Quality**:

- Run `pnpm test` to verify all tests pass
- Check both new tests and existing test cases
- Ensure no regressions in existing functionality
- Verify code coverage is maintained or improved

**2. MARK COMPLETE**:

- Update checkbox from `- [ ]` to `- [x]` in tasks.md

## Critical Constraints

**TDD Principles**:

- **RED first**: Always write failing tests before implementation code
- **GREEN minimal**: Implement just enough to pass tests
- **REFACTOR safely**: Improve code while keeping tests green
- **Edge cases priority**: Focus testing effort on boundaries, not normal cases
- **Equivalence partitioning**: Use systematic test design, not ad-hoc examples

**Quality Standards**:

- **Task Scope**: Implement only what the specific task requires
- **Test Coverage**: All new code must have comprehensive tests (100% target)
- **No Regressions**: Existing tests must continue to pass
- **Design Alignment**: Implementation must follow design.md specifications
- **Test Categories**: Follow priority order (edge cases > errors > options > happy path)
</instructions>

## Tool Guidance

**Context Loading**:

- **Read first**: Load all spec files and steering directory before implementation
- Review design.md for function signatures and implementation requirements

**TDD Workflow**:

- **Test first**: Write tests in `tests/` directory before implementation code
- **Run tests**: Use `pnpm test` to verify RED → GREEN → REFACTOR cycle
- **Coverage check**: Use `pnpm test:coverage` to verify comprehensive coverage

**External Resources**:

- Use **WebSearch/WebFetch** for library documentation when needed
- Reference `docs/guidelines/test-driven-development.md` for TDD best practices

## Output Description

Provide brief summary in the language specified in spec.json:

1. **Tasks Executed**: Task numbers and test results
2. **Status**: Completed tasks marked in tasks.md, remaining tasks count

**Format**: Concise (under 150 words)

## Safety & Fallback

### Error Scenarios

**Tasks Not Approved or Missing Spec Files**:

- **Stop Execution**: All spec files must exist and tasks must be approved
- **Suggested Action**: "Complete previous phases: `/kiro:spec-requirements`, `/kiro:spec-design`, `/kiro:spec-tasks`"

**Test Failures**:

- **Stop Implementation**: Fix failing tests before continuing
- **Action**: Debug and fix, then re-run

### Task Execution

**Execute specific task(s)**:

- `/kiro:spec-impl $1 1.1` - Single task
- `/kiro:spec-impl $1 1,2,3` - Multiple tasks

**Execute all pending**:

- `/kiro:spec-impl $1` - All unchecked tasks
