---
name: starting-implementation
description: When implementing new file creation, editing, or deletion, this guideline provides procedures to verify whether the actual start requirements are met. If the start requirements are not met, it provides steps to take action to ensure they are satisfied.
---

This skill provides guidelines for procedures to verify whether implementation requirements are met when starting to create, edit, or delete files, and to take appropriate actions to ensure requirements are met when they are not.

## Instructions

1. Run `git branch --show-current` to obtain the **current branch name**
2. If the **current branch name** is `main` or `master`, inform the user that they are starting work on the `main` branch
3. Run `git status --porcelain` to check for **uncommitted changes**
   - If the output contains 0 lines: Set **uncommitted changes** to `false`
   - If the output contains 1 or more lines: Set **uncommitted changes** to `true`
4. If the **current branch name** is not `main` or `master` and **uncommitted changes** is `true`, inform the user that uncommitted changes exist and ask them to choose whether to switch branches immediately.
5. If the **current branch name** is `main` or `master`, or the user chooses to switch branches, create and switch to a branch using `git switch -c <branch name>` with a branch name appropriate for the changes.
