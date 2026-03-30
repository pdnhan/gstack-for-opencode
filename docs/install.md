# Install Guide

## Goal

Install `gstack-for-opencode` in a way that matches how you want to use it:

- project-local when a repo should carry the workflow pack with it
- user-global when you want the pack available as a reusable source for multiple projects

## Choose An Install Mode

### Project-local

Choose this when:

- you want the workflow pack committed with a repository
- collaborators should get the same commands, agents, and skills
- you want repo-local review, QA, and shipping behavior

### User-global

Choose this when:

- you want one canonical local copy of the pack
- you plan to install it into multiple repos from the same source
- you are iterating on the pack itself and want to re-run setup into target repos

## Project-Local Install

From this repo root:

```sh
./scripts/quickstart-setup.sh /path/to/your-project
```

This is the fastest path and is intentionally non-destructive.

What it does:

- copies `AGENTS.md` only if the target does not already have one
- copies `opencode.json` only if the target does not already have one
- merges the pack's `.opencode/` directories without overwriting existing files
- copies browser adapter example/config files if they are missing

After install:

1. open the target project in OpenCode
2. try `/review`, `/investigate`, `/qa`, or `/ship`
3. if browser-backed commands are blocked, configure `.opencode/browser-adapter.json`

For more detail, see `docs/quickstart.md`.

## User-Global Install

There is no separate package manager install yet. The current user-global path is to keep a local clone of this repository and use it as the source for project-local installs.

Recommended flow:

```sh
git clone <this-repo-url>
cd gstack-for-opencode
./scripts/quickstart-setup.sh /path/to/your-project
```

Suggested pattern:

- keep this repo cloned somewhere stable on your machine
- update it when you want newer workflows or docs
- re-run `quickstart-setup.sh` into target repos as needed
- review any skipped files in the target repo and merge intentionally

## Browser Runtime Notes

The default browser adapter config points at `.opencode/bin/gstack-browser-backend`.

That wrapper currently expects an installed `gstack` browse backend at one of these locations:

- `$PWD/.claude/skills/gstack/browse/dist/browse`
- `$HOME/.claude/skills/gstack/browse/dist/browse`

If that backend is not available:

- browser-based workflows will degrade into limited or blocked mode
- `/qa` and related browser workflows should report the limitation explicitly
- you can replace `.opencode/browser-adapter.json` with your own backend command

## Verification After Install

In this repository, run:

```sh
./scripts/verify-pack.sh
```

That verifies the workflow pack itself.

In a target repository, OpenCode should discover the copied local files automatically once the pack is installed.

## Current Limits

This install flow is intentionally simple right now.

Known limitations:

- no standalone package distribution yet
- no automated upgrade command for downstream target repos
- existing `AGENTS.md`, `opencode.json`, or `.opencode/*` files are not merged semantically
- browser-backed workflows still depend on adapter configuration in the target repo
