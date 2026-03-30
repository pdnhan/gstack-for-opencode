# Contributing to gstack-for-opencode

Thank you for your interest in contributing! This guide covers how to set up, develop, and submit changes to the gstack-for-opencode project.

## Goal

Contributions should keep the pack OpenCode-native, inspectable, and easy to trust. Prefer small, auditable changes over broad prompt expansion.

## Setup

### Work on this repo directly

Open this repository in OpenCode:

```sh
opencode /path/to/gstack-for-opencode
```

### Install the pack into another project

From this repo root:

```sh
./scripts/quickstart-setup.sh /path/to/your-project
```

See [`docs/quickstart.md`](docs/quickstart.md) for the non-destructive install behavior and browser adapter notes.

For the full install decision tree and trust expectations, also read:

- `docs/install.md`
- `docs/verification.md`
- `docs/troubleshooting.md`

## Repository Conventions

- Prefer `.opencode/agents`, `.opencode/commands`, and `.opencode/skills` over compatibility shims
- Keep prompts small and move reusable behavior into skills
- Prefer Markdown-defined workflows unless code is required for a tool adapter
- Optimize for auditability over cleverness
- Preserve the behavior contract from upstream `gstack`, not its host-specific bootstrap details

## Workflow Priorities

Unless a change explicitly targets a different area, prefer work in this order:

1. `review`
2. `investigate`
3. `qa`
4. `plan-eng-review`
5. `ship`

## How to Add or Change a Workflow

### 1. Start with the smallest correct surface

Ask yourself:

- Is this a new command, or should an existing workflow absorb it?
- Does the behavior belong in a reusable skill?
- Is a repo-owned tool actually required, or can the workflow stay read-only?

### 2. Update the right runtime layers

For a typical workflow change, touch only what is necessary:

| Layer | Purpose |
|-------|---------|
| `.opencode/skills/<name>/SKILL.md` | Reusable procedure |
| `.opencode/agents/<name>.md` | Role and boundaries |
| `opencode.json` | Agent registration, tools, permissions |
| `.opencode/commands/<name>.md` | User-facing slash command |

Not every change needs all four.

### 3. Keep commands thin

Commands should not carry long duplicated prompts. Put durable logic in skills and focused behavior in agents.

### 4. Keep agents focused

Agents should:

- Have one clear job
- Define tool access narrowly
- State output format and stop conditions explicitly

### 5. Document capability gaps honestly

If OpenCode lacks a surface that upstream `gstack` relied on, call that out directly in the prompt or docs instead of faking parity.

## Review Standard

Review-oriented workflows must:

- Put findings first
- Focus on bugs, regressions, risky assumptions, and missing tests
- Cite files when possible
- Keep summaries secondary

## Git Best Practices

When submitting changes:

- Use specific file paths in `git add` rather than greedy commands:
  ```sh
  # Good
  git add README.md .opencode/commands/review.md

  # Avoid
  git add .
  ```
- Write clear, concise commit messages
- Keep PRs focused on one logical change

## Browser and Tooling Changes

If you change `.opencode/tools/browser.ts`, browser adapter config, or QA runtime behavior:

- Update the relevant docs in `docs/`
- Keep blocked-mode behavior honest
- Avoid claiming browser coverage when adapter capability is insufficient

## Verification

Run the verification script before opening a PR:

```sh
./scripts/verify-pack.sh
```

What it checks:

- Required top-level files exist
- Core commands, agents, and skills exist
- `opencode.json` parses and maps to real agent files
- Command frontmatter agent references resolve
- Skill permissions in agents and `opencode.json` resolve
- Browser-enabled agents have the repo-owned browser tool available

## Release Metadata

This repo keeps release state explicit:

- `VERSION` is the current pack version
- `CHANGELOG.md` has an `Unreleased` section plus released version sections

When shipping a user-visible change:

1. update `CHANGELOG.md`
2. bump `VERSION` if the change is part of a release cut
3. keep docs aligned with the release surface

## Documentation Expectations

Update docs when behavior changes in a way a new adopter or contributor would notice.

Common examples:

- Workflow added or removed
- Command semantics changed
- Install behavior changed
- Browser or deploy setup changed
- Contribution rules or architecture assumptions changed
- Release metadata changed

At minimum, consider whether `README.md`, `ARCHITECTURE.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `VERSION`, and any affected file in `docs/` need updates.

## Pull Request Scope

Prefer one logical change per PR:

- One workflow
- One skill extraction
- One tool/runtime improvement
- One docs or install improvement
- One verification improvement

Small PRs are easier to review and easier to trust.

## Code of Conduct

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/). By participating, you are expected to uphold this code.

## Getting Help

- 📖 [Documentation](docs/)
- 🐛 [Issue Tracker](https://github.com/anomalyco/opencode/issues)
- 💬 [Discussions](https://github.com/anomalyco/opencode/discussions)
