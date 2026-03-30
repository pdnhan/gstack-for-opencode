# Quickstart

## Goal

Get this workflow pack into a project quickly so OpenCode can discover the agents, commands, skills, and browser adapter files without manual copying.

This is the shortest path. For the full decision tree, use `docs/install.md`.

## Fastest Path

From this repo root, run:

```sh
./scripts/quickstart-setup.sh /path/to/your-project
```

The setup is non-destructive:

- existing files are not overwritten
- missing pack files are copied into the target project
- OpenCode-specific files land in the standard project-local locations

## What Gets Installed

- `AGENTS.md` if the target repo does not already have one
- `opencode.json` if the target repo does not already have one
- `.opencode/agents`
- `.opencode/commands`
- `.opencode/skills`
- `.opencode/tools`
- `.opencode/bin`
- `.opencode/safety`
- `.opencode/browser-adapter.json`
- `.opencode/browser-adapter.example.json`

## Start Using It

Open the target project in OpenCode and try one of these commands:

- `/review`
- `/investigate`
- `/qa`
- `/qa-only`
- `/browse`
- `/ship`

If command discovery or runtime setup fails, jump to `docs/troubleshooting.md`.

## Browser Notes

The default browser adapter config points at the wrapper in `.opencode/bin/gstack-browser-backend`.

That wrapper expects a `gstack` browse binary at one of these paths:

- `$PWD/.claude/skills/gstack/browse/dist/browse`
- `$HOME/.claude/skills/gstack/browse/dist/browse`

If that binary is not present, browser-based workflows will report a blocked or missing backend state. In that case:

1. edit `.opencode/browser-adapter.json` to point at your own browser backend, or
2. start from `.opencode/browser-adapter.example.json`

## Existing Project Setup

If the target repo already has custom `AGENTS.md`, `opencode.json`, or `.opencode/*` files, the script leaves them in place.

That keeps the quickstart safe, but it also means you may need to merge repo-specific config manually if you want this pack and existing local setup to coexist cleanly.

## Verify The Install

Use this short smoke check in the target repo:

1. Open the repo in OpenCode.
2. Confirm `/review` is discoverable.
3. Run `/review`.
4. Run `/investigate`.
5. Run `/qa` and confirm the browser state is reported honestly.

For the repo-level verification contract and CI checks, see `docs/verification.md`.
