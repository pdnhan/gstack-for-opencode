---
name: browser-cookie-setup
description: This skill should be used when the user asks to import browser cookies, authenticate the browser session, login to a site for QA, or prepare the browser adapter for authenticated pages.
license: MIT
compatibility: opencode
---
## Purpose

Provide the authenticated browser-session setup workflow for `gstack-for-opencode`.

This is the OpenCode-native equivalent of `gstack`'s cookie import setup flow.

## Core Contract

- use the repo-owned `browser` tool
- check adapter status first
- determine whether cookie import is needed
- use cookie import operations only if the adapter supports them
- verify cookie visibility after import when possible

## Required First Step

Call:

```text
operation: status
```

Read:

- `available`
- `exitCode`
- `capabilities`

If the adapter is unavailable or unhealthy, stop and report the blocker.

## Capability Requirements

For the full cookie import flow, the adapter should support:

- `cookie-import`
- `cookies`

Helpful supporting operations:

- `status`
- `goto`
- `screenshot`

If `cookie-import` is missing, the workflow is blocked and should say so directly.

## Setup Flow

### 1. Check whether import is needed

Determine whether the current browser session already appears usable for authenticated tasks.

Signals that import may not be needed:

- adapter is connected to a real browser session with persistent state
- cookies are already present for the relevant domain

If import is clearly unnecessary, report that and stop.

### 2. Trigger cookie import

Use the adapter's `cookie-import` operation.

The exact backend behavior may vary:

- picker UI in a browser
- direct domain import
- browser-specific import command

The workflow should report what user action, if any, is still required.

### 3. Verify cookies

If the adapter supports `cookies`, run it and summarize the result.

Verification does not require exposing cookie values. Domain-level counts or visibility is enough.

### 4. Optional authenticated smoke check

If the target site is known and the adapter supports navigation, do a small follow-up browser check to confirm the session is now usable.

## Blocked States

Report blocked mode when:

- the adapter is missing or unhealthy
- `cookie-import` is not in `capabilities`
- the backend requires manual user action that has not happened yet
- the adapter cannot verify cookies after import

When blocked, report:

- what was attempted
- what capability is missing
- the next useful step

## Output Format

Use this structure:

```text
COOKIE SETUP REPORT
Adapter: available | missing
Needed: yes | no
Operations:
- ...

Verification:
- ...

Blockers:
- ...

Status: DONE | DONE_WITH_CONCERNS | BLOCKED | NEEDS_CONTEXT
```

## Relationship To Browser Workflows

- use `/setup-browser-cookies` to prepare authenticated browser state
- use `/browse` for direct browser tasks
- use `/qa` and `/qa-only` once the browser session is ready

Keep this workflow focused on session preparation, not general QA execution.
