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

## Step 4: Calculate New Version (Pre-check)

1. Read current version from `package.json`
2. Calculate the new version number based on user's selection (major/minor/patch):
   - major: X+1.0.0 (e.g., 1.5.0 → 2.0.0)
   - minor: X.Y+1.0 (e.g., 1.5.0 → 1.6.0)
   - patch: X.Y.Z+1 (e.g., 1.5.0 → 1.5.1)
3. Store new version as `vX.Y.Z` (e.g., "v1.6.0")
4. **Do NOT modify package.json yet** - modification happens after branch creation

## Step 5: Create Release Branch

1. Create branch name: `{branchPrefix}{newVersion}` (e.g., "release/v1.6.0")
2. Check if branch already exists:
   ```bash
   git rev-parse --verify release/vX.Y.Z 2>/dev/null
   ```
3. If branch exists (exit code 0), abort with error: "Branch release/vX.Y.Z already exists. Please delete it first or use a different version."
4. Create and checkout branch:
   ```bash
   git checkout -b release/vX.Y.Z
   ```
5. **Now on the new branch**, update package.json with new version:
   ```bash
   pnpm version <major|minor|patch> --no-git-tag-version
   ```
6. Verify the version was updated correctly

**Rationale**: By creating the branch first, we ensure that if branch creation fails, the main branch's package.json remains unchanged. This prevents leaving the repository in an inconsistent state.

## Step 6: Read Unreleased CHANGELOG Entries

**Important**: This workflow follows the "Keep a Changelog" philosophy. Developers manually maintain the `[Unreleased]` section during development (guided by `function-docs-writer` agent). During release preparation, we promote that content to a versioned section.

1. Read current `CHANGELOG.md`
2. Extract the content of the `## [Unreleased]` section:
   ```bash
   awk '/^## \[Unreleased\]/ {flag=1; next} /^## / {flag=0} flag' CHANGELOG.md
   ```
3. Store the extracted content (this will become the new version's content)
4. If CHANGELOG.md doesn't exist or `[Unreleased]` section is empty:
   - Issue a warning: "No unreleased changes found in CHANGELOG.md"
   - Suggest: "Please ensure changes are documented in the [Unreleased] section before preparing a release"
   - Optionally, you may still proceed with an empty release (user decision)

## Step 7: (Reserved for Future Use)

This step was previously used for commit parsing. It is now reserved for future enhancements.

**Note**: If you need to supplement the CHANGELOG with commit-based entries (e.g., for changes not manually documented), you can:
1. Parse commit history as before (git log)
2. Classify by Conventional Commits type
3. Add these entries to the extracted Unreleased content
4. Clearly mark auto-generated entries for review

## Step 8: Generate CHANGELOG Entry

1. Read template from `.kiro/settings/templates/changelog.md`
2. Create new version section using the extracted `[Unreleased]` content:
   - Replace `{{VERSION}}` with new version (e.g., "1.2.3")
   - Replace `{{DATE}}` with current date (YYYY-MM-DD format)
   - Use the content extracted from `[Unreleased]` section in Step 6
3. Update CHANGELOG.md:
   - Replace the `## [Unreleased]` section with:
     - New empty `## [Unreleased]` section (with empty subsections: Added/Changed/Fixed/Removed)
     - Followed by the new version section (e.g., `## [1.2.3] - 2024-12-01`)
   - Keep all existing version sections below
4. If CHANGELOG.md doesn't exist:
   - Create new file using template structure
   - Add header
   - Add empty `## [Unreleased]` section
   - Add new version section

**Result**: The manually maintained `[Unreleased]` entries are preserved and promoted to the release version, and a fresh empty `[Unreleased]` section is created for future development.

## Step 8.5: Generate RELEASE.md

1. Extract the newly created version section from CHANGELOG.md:
   ```bash
   awk '/^## / && f {exit} /^## \['"$newVersion"'\]/ {f=1} f' CHANGELOG.md > RELEASE.md
   ```

2. Check if extraction was successful and create fallback if needed:
   ```bash
   if [ ! -s RELEASE.md ]; then
     echo "⚠️  Warning: Failed to extract CHANGELOG entry for RELEASE.md"
     echo "Creating default content..."
     printf "# Release v%s\n\nSee CHANGELOG.md for details.\n" "$newVersion" > RELEASE.md
   fi
   ```

3. Verify RELEASE.md was created successfully:
   ```bash
   test -f RELEASE.md && echo "✓ RELEASE.md created" || echo "✗ RELEASE.md creation failed"
   ```

**Purpose**: This ensures RELEASE.md contains the exact content that will be published when the release is created.

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
   git add package.json CHANGELOG.md RELEASE.md
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
   - [x] RELEASE.md created
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
