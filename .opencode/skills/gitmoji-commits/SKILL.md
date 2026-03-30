---
name: gitmoji commits
description: Require gitmoji-formatted commit messages and help choose an accurate gitmoji for shipping workflows.
license: MIT
compatibility: opencode
---
## Purpose

Provide a small, repo-local gitmoji policy for workflows that create commits, especially `/ship`.

## Rules

- when a workflow creates a commit, the message must start with a gitmoji
- pick the gitmoji that best matches the reason for the change, not just the files touched
- keep the rest of the message concise and readable

## Common Gitmojis

- `:sparkles:` new feature
- `:bug:` bug fix
- `:recycle:` refactor
- `:memo:` docs
- `:white_check_mark:` tests
- `:wrench:` tooling or config
- `:art:` formatting or structure improvements
- `:rocket:` release or deploy-oriented change

## Commit Format

Use this shape:

```text
:gitmoji: short imperative summary
```

Examples:

```text
:memo: add contributor and architecture docs
:wrench: add CI verification for workflow pack structure
```

## Selection Guidance

- prefer one gitmoji, not multiple
- optimize for the primary purpose of the commit
- if the change is mostly docs plus a small script, use `:memo:` only when docs are the main reason for the commit
- if a workflow fixes runtime behavior and updates docs secondarily, choose the runtime-oriented gitmoji
