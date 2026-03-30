---
name: qa-playbook
description: This skill should be used when the user asks to QA a site, test a web app, find bugs in an interface, verify a feature in the browser, or test and fix application behavior like a real user.
license: MIT
compatibility: opencode
---
## Purpose

Provide an OpenCode-native version of the core `gstack` QA workflow.

The parts worth preserving are:

- browser-first testing
- diff-aware scope when testing branch work
- structured issue documentation with severity
- iterative fix and re-verify behavior when environment support exists

## Capability Boundary

This workflow assumes access to a browser automation surface.

Examples:

- a configured MCP browser server
- a custom OpenCode tool that can navigate, click, inspect, and capture evidence

If no browser adapter is available, do not fake QA. State clearly that browser-backed verification is blocked and describe the missing adapter.

The expected repo-owned entrypoint is the `browser` tool.

Before QA begins, call `browser` with a status-style operation and inspect the returned capability list.

Use the runtime decision table below.

## Runtime Decision Table

### Full mode

Enter full mode only when all of these are true:

- `available: true`
- backend `exitCode` is `0`
- capabilities include `goto`, `click`, `fill`, `snapshot`, `console`, `screenshot`, and `is`

What full mode allows:

- diff-aware route testing
- interactive flow testing
- issue fixing and re-verification
- structured evidence capture for each bug

### Limited mode

Enter limited mode when full mode is unavailable but all of these are true:

- `available: true`
- backend `exitCode` is `0`
- capabilities include `goto`, `console`, `screenshot`
- capabilities include at least one of `snapshot` or `text`

What limited mode allows:

- smoke testing page load and top-level navigation
- screenshot evidence capture
- console-error driven issue reporting
- partial diff-aware verification when route coverage is still inferable

What limited mode does not allow by default:

- confident interactive bug fixing
- deep form workflow verification
- strong assertions about untested interactions

### Blocked mode

Enter blocked mode when any of these are true:

- the adapter reports `available: false`
- backend `exitCode` is non-zero
- required limited-mode capabilities are missing

Blocked mode requires a clear stop with:

- the adapter status summary
- the missing capability or backend failure
- the next setup step

## Modes

### Diff-aware

Use this when the user invokes QA without a URL and the current branch contains feature work.

Process:

1. inspect the branch diff and recent commits
2. identify likely affected routes, screens, or flows
3. infer the test plan from changed code and intent
4. test those flows first

If no obvious UI route is found, still perform a smoke pass on the app entry points when browser access exists.

### Full

Use when the user provides a URL or asks for broad application coverage.

Test the main navigation, core user journeys, forms, empty states, and visible errors.

### Quick

Use for a fast smoke test.

Focus on:

- app loads
- major navigation works
- no obvious console or runtime errors
- no obviously broken interactions on top-level pages

## QA Process

### 1. Establish scope

Determine:

- target URL or local app URL
- branch and changed area
- auth requirements
- execution mode: diff-aware, full, or quick

### 2. Confirm adapter availability

Before claiming QA execution, confirm the browser adapter is actually available.

Expected check:

- call the `browser` tool with the `status` operation
- verify the adapter reports `available: true`
- verify the backend `exitCode` is `0`
- classify the run as full, limited, or blocked using the runtime decision table above

If missing, stop and report:

- what is missing
- what could not be verified
- the next setup step

### 3. Explore like a user

Test actual behavior, not source code assumptions.

Look for:

- broken navigation
- form failures
- empty, loading, and error state bugs
- visible layout breakage
- console or runtime errors surfaced during interactions
- regressions adjacent to the changed workflow

### 4. Document immediately

For each issue, record:

- severity
- location or flow
- what was expected
- what actually happened
- evidence available from the browser session

### 5. Fix loop, when environment allows

If the run is in full mode and browser-backed verification and code-editing are both available:

1. fix the issue minimally
2. verify the specific flow again
3. check for regressions nearby
4. record fix status as verified, best-effort, reverted, or deferred

If the run is limited or blocked, do not enter the fix loop unless the user explicitly accepts best-effort behavior.

## Severity Guidance

- Critical: blocks a core workflow, loses data, or makes the app unusable
- High: major feature broken, strong user-facing regression
- Medium: partial breakage, confusing behavior, or important polish gap
- Low: cosmetic or minor issue that does not materially block use

## QA Report Format

Use this structure:

```text
QA REPORT
Mode: ...
Target: ...
Scope: ...
Adapter: available | missing
Runtime: full | limited | blocked

Findings:
- [severity] location or flow: issue, impact, evidence

Fixes:
- issue id: verified | best-effort | reverted | deferred

Coverage gaps:
- what could not be tested and why

Status: DONE | DONE_WITH_CONCERNS | BLOCKED | NEEDS_CONTEXT
```

If no issues are found, say what was tested and call out residual risk or untested areas.

## Port Notes From gstack

This skill keeps the heart of `gstack`'s `qa` workflow:

- browser-first testing
- diff-aware testing for feature branches
- structured issue capture
- fix-and-reverify loops

This OpenCode port intentionally excludes `gstack`-specific browse binaries, telemetry, one-time bootstrap scripts, and host-specific git/CI automation. Those belong in optional adapters, not in the core workflow definition.
