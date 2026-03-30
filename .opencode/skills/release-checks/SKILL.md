---
name: release-checks
description: This skill should be used when the user asks to ship a branch, prepare a PR, push code for review, merge base into a feature branch before release, or run a release-readiness workflow before landing changes.
license: MIT
compatibility: opencode
---
## Purpose

Provide an OpenCode-native shipping workflow inspired by `gstack`'s `ship` skill.

The goal is to move from "branch has changes" to "branch is ready to land" with explicit checks, minimal ambiguity, and a clear output.

## Core Contract

- never ship from the base branch
- inspect the branch state first
- verify readiness before commit or PR creation
- merge or rebase with the base branch before final verification when needed
- use gitmoji commit messages for workflow-created commits

## Workflow Order

Use this order:

1. branch and base-branch check
2. branch state review
3. readiness checks
4. commit preparation
5. PR or ship output

## 1. Branch And Base Check

Confirm:

- current branch name
- likely base branch or default branch
- whether the current branch is safe to ship from

If currently on the base branch, stop and report that shipping must happen from a feature branch.

## 2. Branch State Review

Inspect:

- working tree status
- diff versus base branch
- recent commits on the branch

Determine what is actually being shipped, not what the user vaguely intended to ship.

## 3. Readiness Checks

Check for:

- merge state relative to base branch
- test results or test commands that should be run
- review readiness, especially eng-review readiness when available
- release blockers such as conflicts, obviously failing branch-owned tests, or missing release notes context

Be direct about what is blocking versus what is advisory.

## 4. Commit Preparation

When the workflow creates a commit, it must load the `gitmoji commits` skill first.

Required commit format:

```text
<gitmoji> <type>: <description>
```

Examples:

- `✨ feat: add shipping workflow`
- `🐛 fix: resolve branch merge failure`
- `🔧 chore: prepare release metadata`

Never create a commit without the gitmoji prefix.

Choose the gitmoji and type based on the actual change:

- feature work: `✨ feat:`
- bug fix: `🐛 fix:`
- refactor: `♻️ refactor:`
- tests: `✅ test:`
- docs: `📚 docs:`
- build or release plumbing: `📦️ build:` or `🔧 chore:`
- release prep: `🎉 chore:`

## 5. PR Or Ship Output

Prefer one of these concrete outputs:

- PR-ready summary
- PR URL, if the environment supports PR creation
- explicit blocked status with the exact blocker

Avoid hand-wavy "you can now ship" endings.

## Output Format

Use this structure:

```text
SHIP REPORT
Branch: ...
Base: ...
Readiness: ready | blocked | needs-attention

Checks:
- ...

Commit:
- gitmoji message used, if any

PR:
- URL or creation status

Blockers:
- ...

Status: DONE | DONE_WITH_CONCERNS | BLOCKED | NEEDS_CONTEXT
```

If no commit or PR was created, say exactly why.

## Port Notes From gstack

This skill preserves the important parts of `gstack`'s `ship` workflow:

- branch safety checks
- branch diff awareness
- readiness and verification focus
- concrete shipping output instead of vague guidance

This OpenCode port intentionally simplifies the large host-specific automation tree.

The key adaptation is explicit integration with the `gitmoji commits` skill for all workflow-created commits.
