# gstack-for-opencode

An OpenCode-native workflow pack inspired by `gstack`.

The goal is to bring opinionated planning, review, QA, investigation, and shipping workflows to OpenCode using its native primitives:

- `AGENTS.md` for repository guidance
- `.opencode/agents/` for specialist agents
- `.opencode/commands/` for slash commands
- `.opencode/skills/` for reusable workflows
- optional `.opencode/tools/` and MCP integrations for browser and deploy adapters

## Status

Usable alpha, now moving into an external-adoption phase focused on installability, verification, and contributor-facing docs.

## Project Layout

```text
AGENTS.md
IMPLEMENTATION_PLAN.md
opencode.json
.opencode/
  agents/
  commands/
  skills/
  tools/
```

## Design Goals

- OpenCode-first, not a thin Claude Code port
- small, inspectable Markdown artifacts
- findings-first review behavior
- root-cause-first debugging
- optional browser and deploy adapters

## Near-Term Roadmap

1. finish the engineering core: `review`, `investigate`, `qa`, `plan-eng-review`
2. add shared skills for review, QA, planning, and release checks
3. add optional browser-backed QA and deployment integrations
4. document install and usage for both global and repo-local setups

## Quickstart

To install this pack into another project:

```sh
./scripts/quickstart-setup.sh /path/to/your-project
```

Then open that target project in OpenCode.

Full setup notes live in `docs/quickstart.md`.

Canonical install guide:

- `docs/install.md`

Contributor and architecture docs:

- `ARCHITECTURE.md`
- `CONTRIBUTING.md`
- `CHANGELOG.md`
- `VERSION`

## Usage

Open the repo in OpenCode. Project-local commands, agents, and skills should be discovered automatically.

The first implemented workflow is:

- `/review`

Additional implemented workflows:

- `/browse`
- `/setup-browser-cookies`
- `/investigate`
- `/qa`
- `/qa-only`
- `/plan-eng-review`
- `/setup-deploy`
- `/land-and-deploy`
- `/document-release`
- `/office-hours`
- `/plan-ceo-review`
- `/plan-design-review`
- `/design-review`
- `/autoplan`
- `/careful`
- `/freeze`
- `/guard`
- `/unfreeze`
- `/canary`
- `/benchmark`
- `/ship`

Notes:

- `/review` is implemented for findings-first code review.
- `/investigate` is implemented for root-cause-first debugging.
- `/browse` is implemented as the first-class direct browser workflow on top of the repo-owned adapter.
- `/setup-browser-cookies` is implemented as the authenticated browser-session setup workflow on top of the same adapter.
- `/qa` now has a repo-owned `browser` tool and a first working backend bridge to the installed `gstack` browse binary.
- `/qa-only` is implemented as the report-only sibling of `/qa` and shares the same browser runtime gating.
- `/plan-eng-review` is implemented as the engineering plan review workflow for scope, architecture, tests, and performance.
- `/setup-deploy` is implemented as the deploy configuration workflow and uses `AGENTS.md` as the repo-local source of truth.
- `/land-and-deploy` is implemented as the merge, deploy, and verification workflow for post-ship release handling.
- `/document-release` is implemented as the post-ship documentation sync workflow for README, release docs, and related project docs.
- `/office-hours` is implemented as the pre-implementation product and builder brainstorming workflow that ends in a design doc instead of code.
- `/plan-ceo-review` is implemented as the strategic founder-mode review workflow for scope, ambition, and long-term direction.
- `/plan-design-review` is implemented as the pre-implementation design completeness review for plans with UI or UX scope.
- `/design-review` is implemented as the live design audit and polish workflow for rendered UIs.
- `/autoplan` is implemented as the full review orchestrator for CEO, design, and engineering plan reviews.
- `/careful` is implemented as the destructive-command warning workflow for high-risk operational work.
- `/freeze` is implemented as the directory-scoped edit-boundary workflow.
- `/guard` is implemented as the combined careful-plus-freeze safety posture.
- `/unfreeze` is implemented as the workflow that clears the current edit boundary.
- `/canary` is implemented as the post-deploy monitoring workflow for live deployment health.
- `/benchmark` is implemented as the baseline-aware performance regression workflow.
- `/ship` is implemented as the shipping workflow and requires gitmoji-formatted commit messages for commits it creates.

Planning docs:

- `docs/browser-adapter-plan.md`
- `docs/browser-adapter-config.md`

Verification:

```sh
./scripts/verify-pack.sh
```
