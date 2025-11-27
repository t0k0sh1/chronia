---
description: Create GitHub release after version check
allowed-tools: Bash, Read, AskUserQuestion
argument-hint: [--pre-release] (optional)
---

# Release Publishing Command

Execute the following steps to create a GitHub release:

## Step 1: Parse Arguments

Check if `--pre-release` flag is provided in arguments:
- If present, set `isPreRelease = true`
- Otherwise, set `isPreRelease = false`

## Step 2: Prerequisites Check

Verify:
- Current branch is `main` (after PR merge)
- No uncommitted changes

Use the Bash tool:
```bash
git rev-parse --abbrev-ref HEAD
git status --porcelain
```

If not on main or there are uncommitted changes, abort with error.

## Step 3: Load Configuration

Read `.kiro/settings/release.json` to load configuration:
- tagPrefix (default: "v")

If file doesn't exist, use default configuration.

## Step 4: Read Current Version

Read version from `package.json`:
```bash
node -p "require('./package.json').version"
```

Store as `currentVersion` (e.g., "1.2.3")

## Step 5: Check Version on npm Registry

Check if version already exists on npmjs:
```bash
pnpm view chronia@X.Y.Z version 2>/dev/null
```

- Exit code 0 → Version exists on npm
- Exit code 1 → Version does NOT exist on npm

If version EXISTS (exit code 0):
```
❌ Error: Version X.Y.Z is already published on npm.

このバージョンは既にリリース済みです。
リリース準備ブランチの作成を忘れている可能性があります。

Next steps:
1. Run `/release:prepare` to create a new release branch
2. Merge the release PR
3. Then run `/release:publish` again
```
Abort execution.

## Step 6: User Confirmation

If version does NOT exist on npm, use AskUserQuestion:
- Question: "本当にリリースを作成しますか? (v{currentVersion})"
- Options:
  - yes: "はい、リリースを作成します"
  - no: "いいえ、キャンセルします"

If user selects "no", abort with message: "リリース作成をキャンセルしました。"

## Step 7: Create Git Tag

If user confirms:

1. Create tag name: `{tagPrefix}{currentVersion}` (e.g., "v1.2.3")

2. Check if tag already exists:
   ```bash
   git rev-parse --verify v{currentVersion} 2>/dev/null
   ```

3. If tag exists (exit code 0):
   ```
   ❌ Error: Tag v{currentVersion} already exists.

   To delete the existing tag:
   git tag -d v{currentVersion}
   git push --delete origin v{currentVersion}

   Then run `/release:publish` again.
   ```
   Abort execution.

4. Create annotated tag:
   ```bash
   git tag -a v{currentVersion} -m "Release v{currentVersion}"
   ```

5. Push tag to remote:
   ```bash
   git push origin v{currentVersion}
   ```

## Step 8: Verify RELEASE.md

1. Check if RELEASE.md exists in project root:
   ```bash
   test -f RELEASE.md && echo "exists" || echo "missing"
   ```

2. If RELEASE.md exists:
   - Read and display its content for user verification:
     ```bash
     cat RELEASE.md
     ```
   - Proceed to Step 9

3. If RELEASE.md does NOT exist:
   ```bash
   ❌ Error: RELEASE.md not found

   RELEASE.md should have been created during release preparation.

   Possible causes:
   - Release PR was not created with `/release:prepare`
   - RELEASE.md was accidentally deleted
   - Release branch was not properly merged

   Solutions:
   1. Check if release PR was merged: gh pr list --state merged
   2. Re-run `/release:prepare` if needed
   3. Manually create RELEASE.md with release notes:
      awk '/^## / && f {exit} /^## \['"$currentVersion"'\]/ {f=1} f' CHANGELOG.md > RELEASE.md
   ```
   Abort execution.

**Rationale**: Since `/release:prepare` now creates RELEASE.md as part of the release PR, `/release:publish` should simply use the existing file rather than regenerating it. This ensures the release notes are reviewed as part of the PR process.

## Step 9: Create GitHub Release

1. Prepare gh CLI command:
   - Base command: `gh release create v{currentVersion} --title "v{currentVersion}" --notes-file RELEASE.md`
   - If `isPreRelease == true`, add `--prerelease` flag

2. Execute command:
   ```bash
   gh release create v{currentVersion} --title "v{currentVersion}" --notes-file RELEASE.md [--prerelease]
   ```

3. If command fails:
   ```
   ❌ Error: Failed to create GitHub release

   <Error output>

   The tag v{currentVersion} was created. To rollback:
   git tag -d v{currentVersion}
   git push --delete origin v{currentVersion}

   Then fix the issue and run `/release:publish` again.
   ```
   Abort execution.

## Step 10: Output Success Message

If GitHub release is created successfully:

```
✅ GitHub release created successfully!

Version: v{currentVersion}
Tag: v{currentVersion}
Release URL: <release_url>

The npm Publish Workflow will automatically publish to npmjs.
Monitor the workflow at: https://github.com/t0k0sh1/chronia/actions
```

## Error Scenarios

Handle these error cases:

1. **Not on main branch**:
   ```
   Error: Must be on main branch to publish release.
   Current branch: <branch_name>

   Switch to main: git checkout main
   Merge release PR first: gh pr merge <pr_number>
   ```

2. **Version already published on npm**:
   ```
   Error: Version X.Y.Z is already published on npm.

   このバージョンは既にリリース済みです。
   リリース準備ブランチの作成を忘れている可能性があります。

   Check published versions: pnpm view chronia versions
   ```

3. **Tag already exists**:
   ```
   Error: Tag vX.Y.Z already exists.

   View existing tag: git show vX.Y.Z
   Delete tag if needed:
     git tag -d vX.Y.Z
     git push --delete origin vX.Y.Z
   ```

4. **RELEASE.md not found**:
   ```bash
   Error: RELEASE.md not found in project root

   RELEASE.md should exist after merging the release PR.

   Check if the release PR was properly prepared:
     gh pr list --state merged --limit 5

   If needed, manually create RELEASE.md with:
     awk '/^## / && f {exit} /^## \['"$currentVersion"'\]/ {f=1} f' CHANGELOG.md > RELEASE.md
   ```

5. **GitHub CLI error**:
   ```
   Error: Failed to create GitHub release

   <Error output>

   The tag vX.Y.Z was pushed. To rollback:
     git tag -d vX.Y.Z
     git push --delete origin vX.Y.Z

   Common issues:
   - GitHub CLI not authenticated: gh auth login
   - Network connectivity issues
   - Repository permissions
   ```

6. **GitHub CLI not installed**:
   ```
   Error: GitHub CLI (gh) is not installed

   Install instructions:
   - macOS: brew install gh
   - Linux: https://github.com/cli/cli#installation
   - Windows: https://github.com/cli/cli#installation

   After installation, authenticate: gh auth login
   ```
