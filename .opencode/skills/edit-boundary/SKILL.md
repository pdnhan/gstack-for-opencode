---
name: edit-boundary
description: This skill should be used when the user asks to freeze edits, restrict edits to one folder, unlock edits, remove a freeze boundary, or constrain file changes to a specific module during a session.
license: MIT
compatibility: opencode
---
## Purpose

Provide an OpenCode-native edit-boundary contract inspired by `gstack`'s `freeze` and `unfreeze` skills.

The goal is to keep edits inside an explicitly chosen directory until the user widens the boundary again.

## Core Contract

- one explicit directory boundary
- edits outside the boundary are out of bounds by policy
- reads and search remain unrestricted
- the boundary can be cleared later

## State Model

Store the current boundary in a simple repo-local session file:

```text
.opencode/safety/freeze-dir.txt
```

The stored value should be a normalized path with a trailing slash when possible.

## Freeze Behavior

When freeze mode is enabled:

1. resolve the provided path to a clear absolute or repo-root-relative boundary
2. normalize it with a trailing slash
3. persist it in `.opencode/safety/freeze-dir.txt`
4. tell the user that edits outside the boundary are blocked by the active safety policy

## Unfreeze Behavior

When unfreeze is requested:

1. check whether `.opencode/safety/freeze-dir.txt` exists
2. if it exists, report the previous boundary and remove the file
3. if it does not exist, say no boundary was set

## Important Notes

- this is an edit-scope policy, not a full security boundary
- reads, grep, glob, and reasoning are still allowed everywhere
- stronger automatic enforcement can be layered later with hook or tool-wrapper support

## Final Output Contract

When freezing:

- state the active boundary
- explain that edits outside it are out of bounds
- explain how to change or clear it later

When unfreezing:

- state the boundary that was cleared, if any
- confirm that edits are unrestricted again
