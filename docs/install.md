# Install Guide

## Goal

Install `gstack-for-opencode` in a way that matches how you want to use it:

- project-local when a repo should carry the workflow pack with it
- user-global when you want one local source clone that you copy into multiple projects

For this milestone, project-local install is the primary path.

## Choose An Install Mode

### Project-local

Choose this when:

- you want the workflow pack committed with a repository
- collaborators should get the same commands, agents, and skills
- you want repo-local review, QA, and shipping behavior
- you want the best-supported install and verification path

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

Recommended target state:

- the target repo owns its copied `AGENTS.md`, `opencode.json`, and `.opencode/` files
- the workflow pack is visible in the target repo instead of hidden behind a machine-local dependency
- OpenCode discovers the workflows without any extra bootstrap step

What it does:

- safely appends pack agents to `AGENTS.md` if the target already has one
- interactively merges `opencode.json` tools and agents if the target already has one
- merges the pack's `.opencode/` directories without overwriting existing files
- copies browser adapter example/config files if they are missing

After install:

1. open the target project in OpenCode
2. try `/review`, `/investigate`, `/qa`, or `/ship`
3. if browser-backed commands are blocked, configure `.opencode/browser-adapter.json`
4. if commands are not discovered, use `docs/troubleshooting.md`

For more detail, see `docs/quickstart.md`.

## User-Global Install

There is no standalone package-manager install yet. The current user-global path is to keep a local clone of this repository and use that clone as the source for project-local installs.

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

This is a source-of-truth workflow, not a globally activated runtime install.

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

That verifies the workflow pack itself, including a fresh-directory install smoke test.

In a target repository, use this smoke checklist:

1. Open the repo in OpenCode.
2. Confirm project-local command discovery.
3. Run `/review`.
4. Run `/investigate`.
5. Run `/qa` and confirm it either works or reports blocked browser capability honestly.

See `docs/verification.md` for the full verification contract.

## Upgrade And Reinstall

To pick up newer pack changes in a target project:

1. update your local clone of `gstack-for-opencode`
2. re-run `./scripts/quickstart-setup.sh /path/to/your-project`
3. review skipped files and merge intentionally where the target repo already owns local changes

The setup script does not overwrite existing files, so upgrades are intentionally conservative.

## Uninstall And Rollback

The pack does not yet ship a dedicated uninstall command.

Rollback today means removing or reverting the copied project-local files intentionally:

- `AGENTS.md`
- `opencode.json`
- `.opencode/`

If those files were merged with existing project-specific configuration, remove only the pack-owned changes you actually introduced.

## Current Limits

This install flow is intentionally simple right now.

Known limitations:

- no standalone package distribution yet
- no automated upgrade command for downstream target repos
- `AGENTS.md` and `opencode.json` are now semantically merged, but existing `.opencode/*` folder files are not forcefully overwritten
- browser-backed workflows still depend on adapter configuration in the target repo
- user-global install is documented as a source-clone workflow, not a runtime-wide package install
