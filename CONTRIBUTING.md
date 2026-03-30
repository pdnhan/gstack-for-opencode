# Contributing

## Goal

Contributions should keep the pack OpenCode-native, inspectable, and easy to trust.

Prefer small, auditable changes over broad prompt expansion.

## Setup

### Work on this repo directly

Open this repository in OpenCode.

### Install the pack into another project

From this repo root:

```sh
./scripts/quickstart-setup.sh /path/to/your-project
```

See `docs/quickstart.md` for the non-destructive install behavior and browser adapter notes.

## Repository Conventions

- prefer `.opencode/agents`, `.opencode/commands`, and `.opencode/skills` over compatibility shims
- keep prompts small and move reusable behavior into skills
- prefer Markdown-defined workflows unless code is required for a tool adapter
- optimize for auditability over cleverness
- preserve the behavior contract from upstream `gstack`, not its host-specific bootstrap details

## Workflow Priorities

Unless a change explicitly targets a different area, prefer work in this order:

1. `review`
2. `investigate`
3. `qa`
4. `plan-eng-review`
5. `ship`

## How To Add Or Change A Workflow

### 1. Start with the smallest correct surface

Ask:

- is this a new command, or should an existing workflow absorb it?
- does the behavior belong in a reusable skill?
- is a repo-owned tool actually required, or can the workflow stay read-only?

### 2. Update the right runtime layers

For a typical workflow change, touch only what is necessary:

- `.opencode/skills/<name>/SKILL.md` for reusable procedure
- `.opencode/agents/<name>.md` for role and boundaries
- `opencode.json` for agent registration, tools, and skill permissions
- `.opencode/commands/<name>.md` for the user-facing slash command

Not every change needs all four.

### 3. Keep commands thin

Commands should not carry long duplicated prompts. Put durable logic in skills and focused behavior in agents.

### 4. Keep agents focused

Agents should:

- have one clear job
- define tool access narrowly
- state output format and stop conditions explicitly

### 5. Document capability gaps honestly

If OpenCode lacks a surface that upstream `gstack` relied on, call that out directly in the prompt or docs instead of faking parity.

## Review Standard

Review-oriented workflows must:

- put findings first
- focus on bugs, regressions, risky assumptions, and missing tests
- cite files when possible
- keep summaries secondary

## Browser And Tooling Changes

If you change `.opencode/tools/browser.ts`, browser adapter config, or QA runtime behavior:

- update the relevant docs in `docs/`
- keep blocked-mode behavior honest
- avoid claiming browser coverage when adapter capability is insufficient

## Verification

Run the verification script before opening a PR or asking for review:

```sh
./scripts/verify-pack.sh
```

What it currently checks:

- required top-level files exist
- core commands, agents, and skills exist
- `opencode.json` parses and maps to real agent files
- command frontmatter agent references resolve
- skill permissions in agents and `opencode.json` resolve
- browser-enabled agents have the repo-owned browser tool available

This is a structural verification pass, not full workflow e2e coverage.

## Documentation Expectations

Update docs when behavior changes in a way a new adopter or contributor would notice.

Common examples:

- workflow added or removed
- command semantics changed
- install behavior changed
- browser or deploy setup changed
- contribution rules or architecture assumptions changed
- release metadata changed

At minimum, consider whether `README.md`, `ARCHITECTURE.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `VERSION`, and any affected file in `docs/` need updates.

## Pull Request Scope

Prefer one logical change per PR:

- one workflow
- one skill extraction
- one tool/runtime improvement
- one docs or install improvement
- one verification improvement

Small PRs are easier to review and easier to trust.
