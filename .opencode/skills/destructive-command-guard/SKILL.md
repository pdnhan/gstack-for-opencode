---
name: destructive-command-guard
description: This skill should be used when the user asks to be careful, enable safety mode, use prod mode, guard destructive commands, or work in a shared or production-like environment where accidental deletion or reset would be costly.
license: MIT
compatibility: opencode
---
## Purpose

Provide an OpenCode-native destructive-command safety contract inspired by `gstack`'s `careful` skill.

The goal is to make risky commands explicit and user-approved instead of casually running them.

## Core Contract

- warn before destructive commands
- require explicit confirmation when blast radius is meaningful
- explain the concrete risk in plain language
- allow only a small set of safe cleanup exceptions without interruption

## Protected Command Classes

Warn before commands or actions in these categories:

- recursive deletion such as `rm -rf`, `rm -r`, or similar destructive file removal
- destructive SQL such as `DROP TABLE`, `DROP DATABASE`, or `TRUNCATE`
- git history or worktree destruction such as `git push --force`, `git reset --hard`, `git checkout .`, or `git restore .`
- cluster or infra deletion such as `kubectl delete`
- destructive container cleanup such as `docker rm -f` or `docker system prune`

When the exact command is visible, name it directly.

## Safe Cleanup Exceptions

These should usually be allowed without heavy interruption when clearly scoped:

- deleting local build artifacts like `node_modules`, `.next`, `dist`, `coverage`, `.cache`, `build`, `.turbo`, or `__pycache__`

If the command touches anything beyond well-known disposable artifacts, treat it as risky again.

## Warning Format

When a risky command is about to run, provide:

- the command or action class
- what could be lost or changed
- whether the effect is reversible
- what confirmation is needed to continue

Example structure:

```text
CAREFUL MODE WARNING
Command: git reset --hard HEAD~2
Risk: deletes uncommitted work and rewrites local state
Reversible: only if the lost work exists elsewhere
Action: ask for explicit confirmation before continuing
```

## Decision Rules

### Allow

Allow when:

- the command is clearly non-destructive, or
- it is a safe cleanup exception with obvious limited blast radius

### Warn

Warn when:

- the command is destructive but the user appears to understand the context
- the blast radius is meaningful but specific

### Block And Ask

Block and require explicit confirmation when:

- the action is irreversible or close to irreversible
- the target environment looks shared or production-like
- the blast radius is ambiguous
- the command combines multiple destructive operations

## OpenCode Port Note

Upstream `gstack` uses a shell hook to intercept commands automatically.

This OpenCode port preserves the same safety contract at the workflow layer. Stronger automatic interception can be added later if repo-level tool hooks or command wrappers are introduced.

## Final Output Contract

When careful mode is enabled, make the session posture clear:

- destructive commands will be warned on
- irreversible actions require explicit confirmation
- safe cleanup exceptions remain lightweight

Do not silently disable or weaken the guardrails once enabled.
