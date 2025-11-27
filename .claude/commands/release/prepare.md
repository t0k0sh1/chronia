---
description: Prepare release with version bump, CHANGELOG, and PR creation
allowed-tools: Bash, Read, Write, Edit, AskUserQuestion
argument-hint: (no arguments, interactive)
---

# Release Preparation Command

Execute the following steps to prepare a new release:

## Step 1: Prerequisites Check

Before starting, verify:
- Current branch is `main`
- No uncommitted changes (`git status` is clean)
- pnpm dependencies are installed

Use the Bash tool to check:
```bash
git rev-parse --abbrev-ref HEAD
git status --porcelain
```

If not on main branch or there are uncommitted changes, abort with error message.

## Step 2: Version Type Selection

Use AskUserQuestion to prompt the user:
- Question: "Which version type do you want to release?"
- Options:
  - major: "Major version (breaking changes)"
  - minor: "Minor version (new features)"
  - patch: "Patch version (bug fixes)"

## Step 3: Load Configuration

Read `.kiro/settings/release.json` to load configuration:
- branchPrefix (default: "release/")
- tagPrefix (default: "v")
- changelog.includedTypes (default: ["feat", "fix", "docs"])
- changelog.sections (default: {"feat": "Added", "fix": "Fixed", "docs": "Changed"})

If file doesn't exist, use default configuration.

## Step 4: Calculate New Version

1. Read current version from `package.json`
2. Use `pnpm version <major|minor|patch> --no-git-tag-version` to update package.json
3. Read the new version from package.json after update
4. Store new version as `vX.Y.Z` (e.g., "v1.2.3")

## Step 5: Create Release Branch

1. Create branch name: `{branchPrefix}v{newVersion}` (e.g., "release/v1.2.3")
2. Check if branch already exists:
   ```bash
   git rev-parse --verify release/vX.Y.Z
   ```
3. If branch exists, abort with error: "Branch release/vX.Y.Z already exists. Please delete it first or use a different version."
4. Create and checkout branch:
   ```bash
   git checkout -b release/vX.Y.Z
   ```

## Step 6: Parse Commit History

1. Get the last release tag:
   ```bash
   git describe --tags --abbrev=0 2>/dev/null || echo ""
   ```
2. If no tag exists, use entire history (from first commit to HEAD)
3. Parse commits from last tag to HEAD:
   ```bash
   git log <last_tag>..HEAD --pretty=format:"%s"
   ```
   (If no last tag, use just `git log HEAD --pretty=format:"%s"`)

## Step 7: Classify Commits

For each commit message, classify by Conventional Commits type:
- `feat:` or `feat(...)` → "Added" section
- `fix:` or `fix(...)` → "Fixed" section
- `docs:` or `docs(...)` → "Changed" section
- Other types (`chore`, `refactor`, `test`, `style`, `perf`, `ci`, `build`) → **EXCLUDE from CHANGELOG**

Group commits by section (Added/Changed/Fixed).

## Step 8: Generate CHANGELOG Entry

1. Read current `CHANGELOG.md` (if exists)
2. Read template from `.kiro/settings/templates/changelog.md`
3. Generate new version section:
   - Replace `{{VERSION}}` with new version (e.g., "1.2.3")
   - Replace `{{DATE}}` with current date (YYYY-MM-DD format)
   - Populate sections (Added/Changed/Fixed) with classified commits
   - Remove empty sections
4. If CHANGELOG.md exists:
   - Replace `## [Unreleased]` section with new version section
   - Keep existing version sections below
5. If CHANGELOG.md doesn't exist:
   - Create new file using template structure
   - Add header and Unreleased section
   - Add new version section

Format for each commit entry:
```markdown
- `functionName` - Brief description (if commit mentions function)
- Brief description (for general commits)
```

## Step 9: Validation

Run all validation commands in sequence:
```bash
pnpm lint
pnpm lint:docs
pnpm build
pnpm test
```

If ANY command fails:
1. Display error message with command output
2. Suggest rollback:
   ```
   エラーが発生しました。以下のコマンドでブランチを削除できます:
   git checkout main
   git branch -D release/vX.Y.Z
   ```
3. Abort execution

## Step 10: Commit and Push

If all validations pass:

1. Stage changed files:
   ```bash
   git add package.json CHANGELOG.md
   ```

2. Create commit with message:
   ```bash
   git commit -m "chore(release): prepare vX.Y.Z"
   ```

3. Push branch to remote:
   ```bash
   git push -u origin release/vX.Y.Z
   ```

## Step 11: Create Pull Request

1. Generate PR body:
   ```markdown
   ## Release vX.Y.Z

   This PR prepares the release for version X.Y.Z.

   ### Changes

   [Copy the CHANGELOG entry for this version]

   ### Checklist

   - [x] Version bumped in package.json
   - [x] CHANGELOG.md updated
   - [x] All tests passing
   - [x] Build successful
   - [ ] PR approved and merged
   - [ ] Release created with `/release:publish`
   ```

2. Create PR using GitHub CLI:
   ```bash
   gh pr create --title "release: vX.Y.Z" --body "<generated-body>" --base main --head release/vX.Y.Z
   ```

3. Capture and display PR URL

## Step 12: Output Success Message

Display:
```
✅ Release preparation completed successfully!

New version: vX.Y.Z
Branch: release/vX.Y.Z
PR: <PR_URL>

Next steps:
1. Review and merge the PR
2. Run `/release:publish` to create the GitHub release
```

## Error Scenarios

Handle these error cases:

1. **Not on main branch**:
   ```
   Error: Must be on main branch to prepare release.
   Current branch: <branch_name>

   Switch to main: git checkout main
   ```

2. **Uncommitted changes**:
   ```
   Error: You have uncommitted changes.

   Commit or stash your changes before preparing release:
   git status
   ```

3. **Branch already exists**:
   ```
   Error: Branch release/vX.Y.Z already exists.

   Delete existing branch: git branch -D release/vX.Y.Z
   Or choose a different version type.
   ```

4. **Validation failure**:
   ```
   Error: Validation failed - <command> returned non-zero exit code

   <Error output>

   Fix the errors and try again. To rollback:
   git checkout main
   git branch -D release/vX.Y.Z
   ```

5. **GitHub CLI error**:
   ```
   Error: Failed to create PR

   <Error output>

   Create PR manually at: https://github.com/t0k0sh1/chronia/pull/new/release/vX.Y.Z
   ```
