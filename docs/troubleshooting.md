# Troubleshooting

## Goal

Provide one recovery path for the most common install, discovery, and adapter problems.

## Commands Are Not Discovered

Check these first:

1. The target repo contains `opencode.json` at the repo root.
2. The target repo contains `.opencode/commands/` and `.opencode/agents/`.
3. You opened the target repo itself in OpenCode, not a parent directory.

If you installed with `scripts/quickstart-setup.sh` and files are missing:

1. re-run the setup script
2. read the `skip` lines carefully
3. merge any existing repo-local OpenCode files intentionally if the script preserved them

## `AGENTS.md` Or `opencode.json` Already Existed

The setup script is intentionally non-destructive.

That means existing files are preserved and may prevent the pack's defaults from landing automatically.

Recovery path:

1. compare the existing file with this repo's copy
2. merge only the pack-owned behavior you want
3. re-run setup if needed for the `.opencode/` tree

## `/qa` Or `/browse` Reports Blocked Browser Capability

The default adapter config points to `.opencode/bin/gstack-browser-backend`.

That wrapper expects a compatible backend binary at one of these paths:

- `$PWD/.claude/skills/gstack/browse/dist/browse`
- `$HOME/.claude/skills/gstack/browse/dist/browse`

Recovery path:

1. confirm the backend exists at one of those paths, or
2. edit `.opencode/browser-adapter.json` to point at your own backend command, or
3. start from `.opencode/browser-adapter.example.json`

Blocked browser mode is expected when no backend is configured.

## Quickstart Script Fails

Common causes:

- target path does not exist
- the script is being run from the wrong repo
- target files already exist and are being skipped on purpose

Run:

```sh
./scripts/verify-pack.sh
```

If that passes in this repo but your target install still fails, inspect the target repo for existing `AGENTS.md`, `opencode.json`, or `.opencode/*` files that may need a manual merge.

## CI Fails On Release Metadata

Check both files:

1. `VERSION` must contain a plain `x.y.z` version string
2. `CHANGELOG.md` must contain both `## Unreleased` and `## <current-version>`

If you changed user-visible behavior, update the changelog entry too.

## I Need To Remove The Pack

There is no dedicated uninstall command yet.

Remove or revert the copied project-local files intentionally:

- `AGENTS.md`
- `opencode.json`
- `.opencode/`

If those files were merged with existing project-specific setup, remove only the sections you introduced.
