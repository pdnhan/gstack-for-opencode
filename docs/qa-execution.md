# QA Execution

## Purpose

Explain how `/qa` becomes executable in this repo.

The workflow definition already exists. Browser-backed execution now depends on the repo-owned `browser` tool plus a configured backend.

## Browser Tool

The tool entrypoint is:

- `.opencode/tools/browser.ts`

It provides a stable browser surface for the `qa` agent.

The intended flow is:

1. `/qa` calls `browser` with `operation: "status"`
2. the tool reports whether a backend is configured and which capabilities it claims
3. `/qa` decides whether it can run full QA, limited QA, or must stop as blocked

## Adapter Config

The browser tool reads:

- `.opencode/browser-adapter.json`

This repo now includes a real first backend config that points to a repo-local wrapper over the installed `gstack` browse binary.

Example shape:

```json
{
  "command": ["npx", "-y", "your-browser-cli"],
  "capabilities": [
    "status",
    "goto",
    "click",
    "fill",
    "snapshot",
    "console",
    "screenshot",
    "is"
  ],
  "timeoutMs": 30000
}
```

An example file is included at:

- `.opencode/browser-adapter.example.json`

The active repo-local backend config is:

- `.opencode/browser-adapter.json`

The backend wrapper is:

- `.opencode/bin/gstack-browser-backend`

## Current Behavior

## Current Backend

The first working backend is a bridge to `gstack` browse.

Resolution order:

1. `./.claude/skills/gstack/browse/dist/browse` inside the current worktree
2. `~/.claude/skills/gstack/browse/dist/browse`

That means the repo-owned `browser` tool now has a real execution target without forcing the QA workflow to depend directly on `gstack` paths.

### `status`

`status` is the required first call.

If no adapter config exists, the tool returns:

- `available: false`
- `mode: "missing-config"`
- `configPath`
- `exampleConfigPath`
- `nextStep`

If config exists, the tool returns:

- `available: true`
- `mode: "configured"`
- `capabilities`
- `command`
- `timeoutMs`

### All other operations

For non-status operations, the tool:

1. validates that the adapter config exists
2. checks that the requested operation is declared in `capabilities`
3. runs the configured command as:

```text
<configured command...> <operation> <arguments...>
```

It then returns:

- `exitCode`
- `stdout`
- `stderr`

## Minimal Capability Threshold For `/qa`

For full browser-backed QA, the adapter should expose at least:

- `goto`
- `click`
- `fill`
- `snapshot`
- `console`
- `screenshot`
- `is`

If one of these is missing, `/qa` should report limited or blocked mode.

## Why this shape

This is the thinnest useful adapter surface.

It keeps the QA workflow stable while allowing the backend to be:

- a browser MCP wrapped by a CLI
- a custom Playwright CLI
- a future repo-local implementation with the same command contract

## Next Implementation Step

Teach `/qa` to branch explicitly on capability availability and execution mode, then add a second backend option so the adapter is not tied only to `gstack` browse.
