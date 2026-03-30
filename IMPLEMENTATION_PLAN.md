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

## Current Status Snapshot

The repo now has the first engineering core implemented in OpenCode-native form.

Implemented workflows:

- `/browse`
- `/setup-browser-cookies`
- `/setup-deploy`
- `/land-and-deploy`
- `/canary`
- `/benchmark`
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
- `/review`
- `/investigate`
- `/qa`
- `/qa-only`
- `/plan-eng-review`
- `/ship`

Implemented supporting pieces:

- `AGENTS.md`
- `opencode.json`
- repo-owned browser adapter surface in `.opencode/tools/browser.ts`
- first working backend bridge to the installed `gstack` browse binary
- browser adapter planning and runtime docs
- quickstart setup script for copying the pack into another project
- quickstart install and usage doc
- `ship` adapted to require gitmoji-formatted commits

This means the project is at a usable alpha for engineering workflows, but not yet at full `gstack` surface or platform parity.

## Gap Analysis Against gstack

This section records what is still missing after cross-checking the upstream `gstack` repository.

### Missing workflow surface

Not yet implemented:

- `/design-consultation`
- `/design-shotgun`
- `/connect-chrome`
- `/retro`
- `/codex`
- `/cso`
- `/gstack-upgrade`

### Missing deeper runtime capabilities

The larger missing areas are not just command names.

1. Browser productization

- screenshot and evidence conventions
- headed Chrome and handoff/resume UX
- backend abstraction that does not depend primarily on the `gstack` binary bridge

2. Install and distribution

- quickstart setup script now exists for project-local bootstrap
- polished global and repo-local install flow still missing
- release/build pipeline
- versioning and changelog automation

3. Docs maturity

- `ARCHITECTURE.md`
- `CONTRIBUTING.md`
- `CHANGELOG.md`
- `VERSION`
- deeper usage and troubleshooting docs

4. Verification and CI

- automated tests for commands, skills, and tools
- workflow/e2e verification
- CI pipeline
- prompt/workflow evaluation harness

5. Orchestration and memory

- review readiness and state tracking
- cross-workflow artifact passing
- test-plan artifact generation and consumption
- local learnings or memory system
- autoplan-style orchestration

6. Safety and operational controls

- destructive command safety mode
- freeze/guard editing boundaries
- deploy config and post-deploy verification

7. Advanced ship/release behavior

- richer base-branch detection
- PR creation automation
- coverage audit and release-note flow
- documentation sync after ship

## Phase 2: Full-Stack Completion

Phase 2 is about closing the biggest remaining gaps so `gstack-for-opencode` becomes more than an engineering-core prompt pack.

### Phase 2 priorities

Build in this order:

1. native browser workflows
2. deploy and landing workflows
3. documentation sync and release polish
4. product and design planning workflows
5. safety modes and operational controls
6. orchestration and install/distribution

### Phase 2A: Native Browser Workflows

Deliverables:

- `/browse`
- `/setup-browser-cookies`
- browser evidence and screenshot conventions
- stronger backend abstraction over the current bridge

Why first:

- browser-backed QA is already partially real
- `gstack`'s biggest experiential advantage comes from the browser layer
- `/qa` becomes much more useful when `/browse` exists as a first-class workflow

Exit criteria:

- a user can invoke `/browse` directly for navigation, inspection, and evidence capture
- `/qa` and `/qa-only` share the same underlying browser contract cleanly

### Phase 2B: Deploy And Landing

Deliverables:

- `/setup-deploy`
- `/land-and-deploy`
- `/canary`

Exit criteria:

- merge-to-deploy flow exists in OpenCode-native form
- production verification is explicit, not implied

### Phase 2C: Release And Docs

Deliverables:

- `/document-release`
- improved `/ship`
- `CHANGELOG.md`
- `VERSION`

Exit criteria:

- post-ship docs and release metadata can be kept in sync automatically

### Phase 2D: Product And Design Workflow Layer

Deliverables:

- `/office-hours`
- `/plan-ceo-review`
- `/plan-design-review`
- `/design-review`
- `/design-consultation`
- `/design-shotgun`

Exit criteria:

- the product-to-design-to-build planning loop exists, not just eng execution

### Phase 2E: Safety And Orchestration

Deliverables:

- `/careful`
- `/freeze`
- `/guard`
- `/unfreeze`
- `/autoplan`
- review readiness and artifact-passing primitives

Exit criteria:

- the system can protect itself during risky work and coordinate multi-review flows more intelligently

### Phase 2F: Packaging And Verification

Deliverables:

- setup/install flow
- CI
- tests for commands, skills, and tools
- contributor docs and architecture docs

Exit criteria:

- someone else can install, verify, and contribute without reading the source first

## Immediate Next Build Order

The next implementation sequence should be:

1. `/retro`
2. `/codex`
3. `/cso`

## Active Next Step

Continue by closing the remaining operational and support workflows, starting with `/retro`.
