# gstack-for-opencode

An OpenCode-native workflow pack inspired by `gstack`.

The goal is to bring opinionated planning, review, QA, investigation, and shipping workflows to OpenCode using its native primitives:

- `AGENTS.md` for repository guidance
- `.opencode/agents/` for specialist agents
- `.opencode/commands/` for slash commands
- `.opencode/skills/` for reusable workflows
- optional `.opencode/tools/` and MCP integrations for browser and deploy adapters

## Status

Early scaffold.

Implemented so far:

- implementation plan
- project guidance via `AGENTS.md`
- minimal `opencode.json`
- first shared review skill
- first `review` agent and `/review` command
- `investigate` agent, command, and shared skill
- `qa` agent, command, and shared skill

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

## Usage

Open the repo in OpenCode. Project-local commands, agents, and skills should be discovered automatically.

The first implemented workflow is:

- `/review`

Additional implemented workflows:

- `/investigate`
- `/qa`
- `/qa-only`
- `/plan-eng-review`
- `/ship`

Notes:

- `/review` is implemented for findings-first code review.
- `/investigate` is implemented for root-cause-first debugging.
- `/qa` now has a repo-owned `browser` tool and a first working backend bridge to the installed `gstack` browse binary.
- `/qa-only` is implemented as the report-only sibling of `/qa` and shares the same browser runtime gating.
- `/plan-eng-review` is implemented as the engineering plan review workflow for scope, architecture, tests, and performance.
- `/ship` is implemented as the shipping workflow and requires gitmoji-formatted commit messages for commits it creates.

Planning docs:

- `docs/browser-adapter-plan.md`
- `docs/browser-adapter-config.md`
