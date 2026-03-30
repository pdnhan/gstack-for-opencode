---
name: qa-report-only
description: This skill should be used when the user asks to QA a site without fixing anything, produce a QA report only, test but do not fix, or find browser-visible bugs and return evidence only.
license: MIT
compatibility: opencode
---
## Purpose

Provide an OpenCode-native report-only QA workflow modeled after the core `gstack` `qa-only` behavior.

Use the same browser-first discipline as `/qa`, but never edit code or enter a fix loop.

## Core Contract

- test in the browser when the adapter is available
- classify runtime as full, limited, or blocked using the same thresholds as `/qa`
- document issues with severity and evidence
- never fix bugs

## Runtime Decision Table

Use the same runtime branching contract as `/qa`.

### Full mode

Requires:

- `available: true`
- backend `exitCode` is `0`
- capabilities include `goto`, `click`, `fill`, `snapshot`, `console`, `screenshot`, and `is`

What full mode allows:

- interactive flow testing
- diff-aware route testing
- screenshot-backed bug reporting

### Limited mode

Requires:

- `available: true`
- backend `exitCode` is `0`
- capabilities include `goto`, `console`, `screenshot`
- capabilities include at least one of `snapshot` or `text`

What limited mode allows:

- smoke testing
- screenshot and console evidence capture
- report-only top-level verification

### Blocked mode

Enter blocked mode when:

- the adapter reports `available: false`
- backend `exitCode` is non-zero
- required limited-mode capabilities are missing

Blocked mode must stop with a clear explanation of what prevented browser-backed QA.

## Workflow

### 1. Confirm adapter status

- call `browser` with `status`
- classify the run as full, limited, or blocked
- report the runtime decision explicitly

### 2. Establish scope

Determine:

- target URL or local app URL
- branch and changed area
- execution mode: diff-aware, full, or quick
- any auth blockers

### 3. Explore like a user

Look for:

- broken navigation
- form failures
- empty, loading, and error-state bugs
- visual breakage
- console or runtime errors
- regressions adjacent to the changed workflow

### 4. Document immediately

For each issue, record:

- severity
- location or flow
- expected behavior
- actual behavior
- evidence from the browser session

### 5. Stop at report

Never enter a fix loop.

If the issue is obvious and fixable, still report it only. Point the user to `/qa` if they want the test-fix-verify loop.

## Report Format

Use this structure:

```text
QA REPORT
Mode: ...
Target: ...
Scope: ...
Adapter: available | missing
Runtime: full | limited | blocked
Report only: true

Findings:
- [severity] location or flow: issue, impact, evidence

Coverage gaps:
- what could not be tested and why

Status: DONE | DONE_WITH_CONCERNS | BLOCKED | NEEDS_CONTEXT
```

If no issues are found, say what was tested and what remains unverified.

## Relationship To `/qa`

- use `/qa-only` when the user wants findings only
- use `/qa` when the user wants test, fix, and re-verify behavior

Keep the distinction strict.
