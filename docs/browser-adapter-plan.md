# Browser Adapter Plan

## Goal

Make `/qa` executable in OpenCode with real browser-backed verification.

This plan is based on cross-checking the `gstack` browser and QA workflows. The important behavior to preserve is:

- persistent browser session state
- page navigation and interaction
- page inspection and state verification
- screenshot and evidence capture
- diff-aware QA flows that can verify changed routes

This plan does not attempt to port `gstack`'s compiled browse binary architecture directly.

## What gstack's browser layer actually provides

From `gstack`'s `browse` and `qa` workflows, the browser layer needs to support:

- `goto` style navigation
- click, fill, select, hover, press, scroll, upload
- page text, HTML, forms, and links inspection
- console and network error inspection
- screenshots, responsive screenshots, and annotated evidence
- page state assertions such as visible, enabled, checked, and focused
- persistent cookies and session state
- optional user handoff for auth and CAPTCHA style blockers

For `gstack-for-opencode`, these are the requirements that matter. Telemetry, side panels, and compiled CLI startup behavior are not core requirements.

## OpenCode Integration Options

## Option A: MCP browser server

Use a local or remote MCP server that exposes browser automation tools.

Pros:

- fits OpenCode's native MCP model cleanly
- no repo-local tool runtime code needed to get started
- easier to reuse existing browser servers

Cons:

- tool names and capabilities vary by provider
- larger tool surface may be harder to standardize for `/qa`
- screenshot and evidence behavior may differ from the `gstack` workflow

Best use:

- fastest path to a working `/qa`
- teams already using a browser MCP

## Option B: Custom OpenCode tool adapter

Create `.opencode/tools/browser.ts` with a shaped command surface that normalizes a browser backend.

Pros:

- stable interface designed for this repo's workflows
- can wrap either Playwright scripts or an MCP backend later
- easier to keep `qa-playbook` and commands consistent

Cons:

- more implementation work up front
- requires maintaining a small tool layer in this repo

Best use:

- long-term maintainability
- predictable `/qa` behavior across environments

## Recommended Path

Build a thin custom tool adapter, but design it so the first backend can be an MCP server.

That gives the project:

- a stable repo-owned browser interface
- a fast path to first working QA via MCP
- freedom to swap in a Playwright-backed implementation later without rewriting the `qa` workflow

In other words:

1. define the browser contract in-repo
2. implement the first adapter against MCP
3. keep the `qa` workflow independent of the backend details

## Proposed Adapter Contract

The browser adapter should expose a small set of high-value operations.

### Session and navigation

- `status`
- `goto`
- `reload`
- `back`
- `forward`
- `url`

### Interaction

- `click`
- `fill`
- `select`
- `hover`
- `press`
- `scroll`
- `upload`
- `wait`

### Inspection

- `snapshot`
- `text`
- `html`
- `links`
- `forms`
- `console`
- `network`
- `is`
- `js`

### Visual evidence

- `screenshot`
- `responsive`

### Session state

- `cookies`
- `cookie-import`
- `storage`

This is intentionally smaller than `gstack`'s full browse command set.

## Minimal QA Capability Threshold

`/qa` should not claim full browser-backed execution unless these capabilities are available:

- navigation: `goto`
- interaction: `click`, `fill`
- inspection: `snapshot` or equivalent page structure inspection
- error inspection: `console`
- evidence: `screenshot`
- state verification: `is` or equivalent assertion capability

If one of these is missing, `/qa` should report limited mode or blocked mode instead of pretending full coverage.

## Configuration Surface

Use `opencode.json` for the browser backend declaration and keep the project tools disabled by default until configured.

Recommended model:

1. browser backend configured under `mcp` or through repo-local tool code
2. browser-facing tool names enabled only for the `qa` agent
3. no global activation unless the user explicitly wants browser tools exposed everywhere

See `docs/browser-adapter-config.md` for proposed config shapes.

## Implementation Phases

## Phase 1: Contract and config

Deliver:

- this adapter plan
- config examples for MCP-backed browser integration
- explicit `qa` capability checks documented in the repo

## Phase 2: First working backend

Deliver:

- a minimal browser adapter implementation
- one backend path, preferably MCP-backed first
- enough commands for diff-aware QA smoke coverage

Success criteria:

- `/qa` can open the app, inspect structure, click through a basic flow, and capture evidence

## Phase 3: Verification polish

Deliver:

- stable screenshot paths
- responsive capture
- better console and network reporting
- clearer blocked-mode and limited-mode reporting

## Phase 4: Advanced parity work

Optional later work:

- persistent named browser sessions
- cookie import helpers
- auth handoff support
- richer interaction diffing similar to `gstack snapshot -D`

## Risks

- locking the workflow to one vendor-specific MCP shape
- overbuilding a browser abstraction before getting the first real QA session working
- claiming parity with `gstack` before evidence capture and verification are reliable

## Recommended Next Implementation Step

Implement the first browser adapter as a thin wrapper over a browser MCP server, then update `/qa` to check for the adapter explicitly before execution.
