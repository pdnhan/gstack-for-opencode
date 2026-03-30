# gstack-for-opencode Implementation Plan

## Goal

Build an OpenCode-native equivalent of the `gstack` workflow pack: opinionated planning, review, QA, shipping, and supporting skills that feel natural inside OpenCode instead of being a thin Claude Code compatibility shim.

## Product Definition

The project should provide:

- reusable OpenCode agents for key specialist roles
- slash commands that trigger the right agent and prompt template
- reusable `SKILL.md` modules for shared workflows and policies
- optional custom tools or MCP integrations for browser QA and deployment helpers
- repo-level guidance via `AGENTS.md`
- installation and usage docs for both user-global and project-local setups

## Non-Goals

- exact one-to-one cloning of every `gstack` internal implementation detail
- depending on Claude Code-only behavior or file layout as the primary runtime path
- solving every browser automation and deployment integration in v1
- recreating every `gstack` command before validating the core workflow loop

## Design Principles

- OpenCode-first: prefer `.opencode/*` primitives over compatibility hacks
- incremental: ship a small useful core before broad command coverage
- composable: keep prompts and behaviors reusable across commands and agents
- auditable: keep behavior in Markdown where possible
- optional integrations: browser and deploy tooling should be adapters, not hard dependencies

## Target Architecture

```text
AGENTS.md
.opencode/
  agents/
    review.md
    qa.md
    investigate.md
    plan-eng-review.md
    ship.md
  commands/
    review.md
    qa.md
    investigate.md
    ship.md
    plan-eng-review.md
  skills/
    review-workflow/SKILL.md
    qa-playbook/SKILL.md
    release-checks/SKILL.md
    planning-rubric/SKILL.md
  tools/
    browser.ts
    deploy.ts
opencode.json
README.md
docs/
  architecture.md
  command-mapping.md
  install.md
```

## Feature Mapping

### Phase 1 core workflow

- `/plan-eng-review`
- `/review`
- `/investigate`
- `/qa`
- `/ship`

These cover the main delivery loop: plan, review, debug, test, ship.

### Phase 2 extensions

- `/plan-ceo-review`
- `/plan-design-review`
- `/qa-only`
- `/document-release`
- `/retro`

### Phase 3 optional power tools

- browser session helpers
- deployment configuration helpers
- cross-model or second-opinion review integrations
- safety modes comparable to `careful`, `freeze`, and `guard`

## Implementation Phases

## Phase 0: Foundation

Deliverables:

- initialize repo layout
- write `README.md` with project intent
- write `AGENTS.md` with OpenCode usage rules
- create a minimal `opencode.json`
- document command naming conventions

Exit criteria:

- repo explains what it is
- OpenCode can discover the project-local config structure

## Phase 1: Core Agents And Commands

Deliverables:

- `review` subagent
- `qa` subagent
- `investigate` subagent
- `plan-eng-review` subagent
- `ship` subagent or command-driven workflow
- matching command files in `.opencode/commands/`

Key decisions:

- use Markdown agent files first for transparency
- keep command prompts small and delegate behavior to agents and skills
- use `subtask: true` for context isolation when appropriate

Exit criteria:

- each core command is invokable in OpenCode
- each command routes to a specialized agent with a focused prompt

## Phase 2: Shared Skills

Deliverables:

- `review-workflow` skill for bug/regression review criteria
- `qa-playbook` skill for test methodology and reporting format
- `planning-rubric` skill for architecture, edge cases, and testing expectations
- `release-checks` skill for pre-PR and pre-merge validation

Key decisions:

- move repeated reasoning patterns out of agents into skills
- keep skill descriptions specific enough for automatic selection

Exit criteria:

- agents load skills intentionally instead of duplicating long prompts
- skills can be reused by future commands and agents

## Phase 3: Tooling Adapters

Deliverables:

- evaluate whether browser QA should use MCP, a custom tool, or both
- implement one browser automation adapter for `/qa`
- implement one deployment adapter or documented interface for `/ship`

Key decisions:

- prefer MCP if the target integration already exists and is stable
- prefer a custom tool when behavior must be tightly shaped for the workflow
- keep adapters optional and documented behind feature flags or config checks

Exit criteria:

- `/qa` has a clear path for browser-backed verification
- `/ship` has a documented integration boundary for GitHub/deploy platforms

## Phase 4: Documentation And Distribution

Deliverables:

- install guide for project-local usage
- install guide for user-global usage
- command mapping doc from `gstack` to `gstack-for-opencode`
- architecture doc explaining agents, skills, commands, and tools
- contribution guide for adding new workflows

Exit criteria:

- a new user can install and run the core commands without reading the source

## Open Questions

- Should command names exactly mirror `gstack` where possible, or be namespaced like `/gstack-review`?
- Should `ship` perform actions directly, or stay review-oriented until optional integrations are configured?
- Which browser backend is the best default for OpenCode users: MCP, Playwright wrapper, or existing external tool?
- How much Claude-compatible `.claude/skills` mirroring should be kept for portability?

## Risks

- over-porting from `gstack` without adapting to OpenCode interaction patterns
- building browser/deploy complexity before validating core agent quality
- letting command prompts become large and duplicated instead of skill-driven
- creating too many specialist agents before the first five workflows feel solid

## First Milestone

Milestone: usable alpha for engineering workflows

Scope:

- `AGENTS.md`
- `README.md`
- minimal `opencode.json`
- 4 core agents: `review`, `qa`, `investigate`, `plan-eng-review`
- 4 matching commands
- 2 shared skills: `review-workflow`, `qa-playbook`

Success criteria:

- OpenCode discovers the agents, skills, and commands
- `/review` produces structured findings-first output
- `/investigate` enforces root-cause-first debugging
- `/qa` can run as report-only initially if browser tooling is not configured
- `/plan-eng-review` gives actionable architecture feedback without editing code

## Recommended Build Order

1. `README.md`
2. `AGENTS.md`
3. `opencode.json`
4. `.opencode/agents/review.md`
5. `.opencode/commands/review.md`
6. `.opencode/agents/investigate.md`
7. `.opencode/commands/investigate.md`
8. `.opencode/agents/qa.md`
9. `.opencode/commands/qa.md`
10. `.opencode/agents/plan-eng-review.md`
11. `.opencode/commands/plan-eng-review.md`
12. shared skills
13. tooling adapters
14. docs and install polish

## Next Step

Implement Phase 0 by creating the foundational project files and the first core `review` workflow end to end.
