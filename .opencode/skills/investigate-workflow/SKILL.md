---
name: investigate-workflow
description: This skill should be used when the user asks to debug a bug, investigate an error, find the root cause of a failure, explain why something is broken, or fix unexpected behavior without guessing.
license: MIT
compatibility: opencode
---
## Purpose

Provide an OpenCode-native version of the core `gstack` debugging contract.

The key behavior to preserve is simple: no fixes without root cause investigation first.

## Core Rule

Do not propose or apply a code change until a concrete root-cause hypothesis exists.

The hypothesis should be specific enough to test.

Good:

- "The settings page fails because the route now expects a session object that is only populated in middleware for authenticated note routes."

Bad:

- "Auth seems broken somewhere."

## Investigation Phases

### 1. Collect symptoms

Gather the exact user-observed behavior.

Look for:

- error messages
- stack traces
- reproduction steps
- environment or branch context

If context is missing, ask for the smallest missing detail.

### 2. Trace the code path

Read the affected path from symptom to likely source.

Use code search to identify:

- where the failing behavior starts
- where state or data enters the flow
- where the observed result can diverge from expected behavior

### 3. Check recent changes

Look for regressions near the affected area.

Recent diffs and commits matter because many bugs are not random, they are newly introduced behavior.

### 4. Form one hypothesis

State one root-cause hypothesis at a time.

A good hypothesis includes:

- what is wrong
- where it is wrong
- why that creates the observed symptom

### 5. Verify the hypothesis

Before fixing, confirm the hypothesis with the strongest available evidence.

This can include:

- reproducing the bug deterministically
- tracing the branch or condition that fails
- validating the wrong state or missing data at the suspected point
- running a targeted test or command

If the hypothesis does not hold, discard it and return to evidence gathering.

## Implementation Rules

When the root cause is confirmed:

1. fix the cause, not the symptom
2. keep the diff minimal
3. avoid unrelated cleanup
4. add a regression test when code is changed
5. verify the original bug scenario again

## Escalation Rules

Stop and say so when:

- the bug cannot be reproduced and evidence remains weak
- three plausible hypotheses have failed
- the blast radius suggests an architectural issue, not a local bug
- the required fix is security-sensitive and confidence is low

## Debug Report Format

Use this structure when reporting results:

```text
DEBUG REPORT
Symptom: ...
Root cause hypothesis: ...
Evidence: ...
Fix: ...
Verification: ...
Regression test: ...
Status: DONE | DONE_WITH_CONCERNS | BLOCKED | NEEDS_CONTEXT
```

If no fix was made, still provide the strongest current hypothesis and the missing step needed to verify it.

## Port Notes From gstack

This skill preserves the parts of `gstack`'s `investigate` workflow that matter most:

- the iron law against symptom-fixing
- phased investigation
- minimal, verified fixes
- explicit status reporting

This OpenCode port intentionally excludes host-specific telemetry, freeze hooks, and shell bootstrap behavior.
