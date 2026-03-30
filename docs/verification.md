# Verification

## Goal

Define what this repository means by "verified" for the external-adoption milestone.

The goal is not full OpenCode end-to-end automation yet. The goal is a trustable baseline that catches structural drift, release-metadata drift, and clean-install regressions.

## Verification Layers

### 1. Structural verification

Run:

```sh
./scripts/verify-pack.sh
```

Structural verification checks:

- required top-level files exist
- canonical install, quickstart, verification, and troubleshooting docs exist
- core commands, agents, and skills exist
- every command references a real agent
- agent skill permissions resolve to real skills
- `opencode.json` stays aligned with the Markdown agent layer
- browser-enabled agents have the repo-owned browser tool available

### 2. Release metadata verification

The same verification pass also checks release state:

- `VERSION` exists and uses `x.y.z` semver formatting
- `CHANGELOG.md` contains an `Unreleased` section
- `CHANGELOG.md` contains a section for the current `VERSION`

### 3. Clean-install smoke verification

The same verification pass performs a fresh-directory install smoke test:

- creates a temporary empty directory
- runs `scripts/quickstart-setup.sh` against it
- verifies the expected project-local OpenCode files are installed

This is the clean-machine acceptance baseline for the milestone.

## Manual Smoke Checks

In a target project after install:

1. Open the repo in OpenCode.
2. Confirm `/review` is discoverable.
3. Run `/review`.
4. Run `/investigate`.
5. Run `/qa` and confirm browser state is reported honestly.
6. Run `/ship` only in an appropriate git repo and only when you intend to exercise release behavior.

## CI Contract

CI should fail when any of these drift:

- documented install path no longer matches repo files
- command, agent, or skill references break
- release metadata is missing or malformed
- quickstart setup cannot install the pack into a fresh directory

## Known Limits

This verification contract does not yet include:

- full OpenCode command execution in CI
- browser-backed end-to-end UI workflows
- deploy-platform integration tests
- golden-output tests for agent prose
