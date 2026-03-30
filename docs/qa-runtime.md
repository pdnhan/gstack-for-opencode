# QA Runtime

## Purpose

Define the runtime branching rules for `/qa` after `browser status` is called.

This makes the workflow executable and honest. It prevents the agent from claiming strong QA coverage when the browser backend is weak or unavailable.

## Required First Step

Always call the `browser` tool with:

```text
operation: status
```

Read these fields from the result:

- `available`
- `exitCode`
- `capabilities`
- `stdout`
- `stderr`

## Decision Table

## Full

Choose full mode when all of these are true:

- `available` is `true`
- `exitCode` is `0`
- capabilities contain:
  - `goto`
  - `click`
  - `fill`
  - `snapshot`
  - `console`
  - `screenshot`
  - `is`

In full mode, `/qa` may:

- run diff-aware route testing
- exercise interactive flows
- collect structured evidence
- fix bugs and re-verify them

## Limited

Choose limited mode when full mode is not available but all of these are true:

- `available` is `true`
- `exitCode` is `0`
- capabilities contain:
  - `goto`
  - `console`
  - `screenshot`
- capabilities contain at least one of:
  - `snapshot`
  - `text`

In limited mode, `/qa` may:

- run smoke testing
- check page load and top-level navigation
- capture screenshots
- report console-driven failures

In limited mode, `/qa` should not fix bugs by default.

## Blocked

Choose blocked mode when any of these are true:

- `available` is `false`
- `exitCode` is non-zero
- the backend misses the limited-mode capability threshold

In blocked mode, `/qa` must stop and report:

- why execution is blocked
- which capability or backend condition failed
- the next setup step

## Reporting Contract

Every `/qa` run should state:

- adapter status
- runtime mode: full, limited, or blocked
- tested scope
- coverage gaps

## Current Backend Example

With the current `gstack` browse bridge backend, a healthy `status` result should qualify for full mode because the configured capability list includes the full interactive set used by the QA workflow.
