---
name: browse-playbook
description: This skill should be used when the user asks to open a page in the browser, inspect a site, take a screenshot, verify page state, capture browser evidence, or run direct browser actions outside the full QA workflow.
license: MIT
compatibility: opencode
---
## Purpose

Provide the first-class direct browser workflow for `gstack-for-opencode`.

This is the OpenCode-native equivalent of the part of `gstack` that gives the agent eyes.

## Core Contract

- use the repo-owned `browser` tool as the entrypoint
- call `status` first
- perform explicit browser operations
- capture evidence whenever making claims about browser state
- stop clearly if the adapter is missing, unhealthy, or blocked by auth or unsupported capabilities

## Required First Step

Call the `browser` tool with:

```text
operation: status
```

Read:

- `available`
- `exitCode`
- `capabilities`
- `stdout`
- `stderr`

If `available` is false or `exitCode` is non-zero, stop and report the blocker.

## Common Browser Operations

Use only the operations supported by the active adapter.

Common high-value operations:

- `goto`
- `reload`
- `back`
- `forward`
- `click`
- `fill`
- `select`
- `hover`
- `press`
- `scroll`
- `snapshot`
- `text`
- `links`
- `forms`
- `console`
- `network`
- `is`
- `screenshot`
- `responsive`

## Workflow Patterns

### Navigation and sanity check

Use when the user wants a page opened or a quick state check.

Suggested sequence:

1. `status`
2. `goto`
3. `snapshot` or `text`
4. `screenshot`

### Evidence capture

Use when the user asks for proof of page state or a bug.

Suggested sequence:

1. `status`
2. `goto`
3. relevant interaction operations
4. `console`
5. `snapshot`
6. `screenshot`

### State verification

Use when the user asks whether something is visible, enabled, checked, or otherwise present.

Suggested sequence:

1. `status`
2. `goto`
3. optional interaction
4. `is`
5. `snapshot` or `screenshot`

## Evidence Standard

When claiming that something happened in the browser, include at least one of:

- adapter output from `snapshot`, `text`, or `is`
- console output
- screenshot capture confirmation

Avoid unsupported claims like "the page looks fine" without evidence.

## Blocked States

Report blocked mode clearly when:

- browser adapter config is missing
- backend exits non-zero
- required operation is not in `capabilities`
- auth, MFA, CAPTCHA, or similar barriers prevent progress

When blocked, report:

- what blocked execution
- what was attempted
- the next useful step

## Output Format

Use this structure:

```text
BROWSE REPORT
Target: ...
Adapter: available | missing
Operations:
- ...

Evidence:
- ...

Blockers:
- ...

Status: DONE | DONE_WITH_CONCERNS | BLOCKED | NEEDS_CONTEXT
```

## Relationship To QA

- use `/browse` for direct browser tasks
- use `/qa` for test-fix-reverify flows
- use `/qa-only` for report-only browser QA

Keep `/browse` focused on browser interaction and evidence capture rather than full QA process management.
