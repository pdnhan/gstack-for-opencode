# Architecture

## Purpose

`gstack-for-opencode` is an OpenCode-native workflow pack. It ports the useful behavioral contracts from `gstack` into inspectable repo files instead of relying on host-specific bootstrap logic or Claude Code-only conventions.

The primary runtime surface is:

- `AGENTS.md` for repo-level operating rules
- `.opencode/commands/` for slash command entrypoints
- `.opencode/agents/` for focused workflow agents
- `.opencode/skills/` for reusable procedure and policy modules
- `.opencode/tools/` for optional repo-owned tool adapters
- `opencode.json` for agent registration and tool permissions

## Design Principles

- OpenCode-first over compatibility shims
- Markdown-first for auditability
- small commands and focused agents
- reusable behavior moved into skills
- adapters are optional and explicit

## Repository Layout

```text
AGENTS.md                  repo rules and workflow standards
ARCHITECTURE.md            system overview and runtime model
CHANGELOG.md               release history
CONTRIBUTING.md            contributor workflow and conventions
IMPLEMENTATION_PLAN.md     roadmap and milestone decisions
README.md                  user-facing entrypoint
VERSION                    current pack version
opencode.json              agent registration and permissions

.opencode/
  agents/                  workflow agent definitions
  commands/                slash command entrypoints
  skills/                  shared workflow modules
  tools/                   repo-owned OpenCode tools
  bin/                     helper executables for adapters
  safety/                  session-state files for safety workflows

docs/                      usage, runtime, and adapter docs
scripts/                   setup and verification scripts
```

## Runtime Model

The normal execution path is:

1. a user invokes a slash command such as `/review`
2. the command file in `.opencode/commands/` selects an agent and provides a thin task prompt
3. the selected agent file in `.opencode/agents/` defines the operating contract, tool access, and required skills
4. the agent loads one or more skills from `.opencode/skills/` for the reusable workflow details
5. if needed, the agent uses an OpenCode tool such as the repo-owned `browser` adapter
6. the final output is shaped by the command, agent, and skill contracts together

This keeps behavior inspectable:

- commands stay short
- agents define role and boundaries
- skills hold the procedural detail
- tools provide optional integration points

## Commands

Commands are thin wrappers. They should:

- describe the user-facing action clearly
- route to exactly one focused agent when possible
- avoid duplicating long workflows already defined in skills
- use `subtask: true` when the workflow should stay isolated from the parent context

Example: `.opencode/commands/review.md` routes to the `review` agent and only adds a short findings-first review prompt.

## Agents

Agents are the behavioral core. They should:

- have a narrow responsibility
- define tool restrictions explicitly
- load the right shared skill before doing substantive work
- state output format and failure boundaries honestly

Examples:

- `review` is read-oriented and explicitly disables file editing and shell access
- `qa` enables the repo-owned `browser` tool and branches into full, limited, or blocked mode based on adapter capability
- `ship` delegates release policy to shared skills instead of embedding release logic directly in the command

## Skills

Skills hold reusable workflow rules that would otherwise be duplicated across agents or commands.

Typical skill responsibilities:

- review criteria
- QA runtime branching and report format
- planning rubric and architecture checks
- release and documentation synchronization policy
- safety and edit-boundary behavior

Skills are the main place for detailed procedures. Agents should reference them rather than re-explaining the same workflow inline.

## Agent Registration In `opencode.json`

`opencode.json` is the registry that tells OpenCode which agents exist and what permissions they need.

It currently serves three roles:

- registers named agents such as `review`, `qa`, `ship`, and `office-hours`
- enables or disables tools per agent
- grants skill permissions per agent

This means there are two layers of agent definition:

- the runtime registration in `opencode.json`
- the prompt and behavior contract in `.opencode/agents/<name>.md`

Those two layers must stay aligned.

## Browser Adapter Architecture

The repo currently has one repo-owned tool adapter at `.opencode/tools/browser.ts`.

Its contract is:

- load `.opencode/browser-adapter.json`
- expose a stable `status` operation first
- report capabilities declared by the configured backend
- refuse undeclared operations
- return structured adapter state instead of pretending a browser exists

The current default config points to `.opencode/bin/gstack-browser-backend`, which bridges to an installed `gstack` browse binary when available.

Important architectural constraint:

- browser-backed workflows must degrade honestly when the backend is missing or weak

That constraint is enforced by the QA runtime design in `docs/qa-runtime.md` and the `qa-playbook` skill.

## Safety And Operational State

Safety-oriented workflows such as `/careful`, `/freeze`, `/guard`, and `/unfreeze` may persist session-scoped state in `.opencode/safety/`.

The repository treats safety controls as first-class workflows rather than hidden behavior.

## Cross-Checks And Drift Prevention

Because the system is distributed across commands, agents, skills, and `opencode.json`, drift is a real risk.

The verification layer should catch at least these cases:

- a command references a missing agent
- an agent or `opencode.json` entry references a missing skill
- `opencode.json` registers an agent that has no Markdown definition
- a browser-enabled agent exists without the repo-owned browser tool

The verification script in `scripts/verify-pack.mjs` is intended to enforce these structural contracts in CI.

## Extension Pattern

When adding a new workflow, prefer this order:

1. add or refine the shared skill if the behavior will be reused
2. add the agent Markdown file with narrow responsibility and clear boundaries
3. register the agent in `opencode.json` with only the needed tools and permissions
4. add the thin command wrapper in `.opencode/commands/`
5. add docs only after the workflow is understandable and discoverable

This keeps the pack inspectable and prevents command prompts from becoming long, duplicated blobs.

## Current Gaps

The architecture is intentionally lightweight, but still has known gaps:

- verification is structural, not behavioral end-to-end
- browser runtime still relies on a bridge backend by default
- release metadata and distribution are lighter than the workflow surface
- cross-workflow artifact passing is still limited

Those gaps are tracked in `IMPLEMENTATION_PLAN.md` under the external-adoption milestone.
