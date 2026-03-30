---
name: doc-sync
description: This skill should be used when the user asks to update the docs, sync documentation after shipping changes, refresh README and architecture docs, or run a post-ship documentation audit.
license: MIT
compatibility: opencode
---
## Purpose

Provide an OpenCode-native post-ship documentation workflow inspired by `gstack`'s `document-release` skill.

The goal is to keep documentation accurate after code ships instead of letting README, architecture notes, changelog, and release metadata drift.

## Core Contract

- read docs and diff together
- update factual drift directly
- preserve changelog history carefully
- treat version changes as explicit decisions
- improve GitHub-facing docs with stronger adoption-oriented structure when justified by the diff
- end with a documentation health summary

## Workflow Order

Use this order:

1. pre-flight and diff scan
2. documentation inventory
3. per-file audit
4. factual updates
5. changelog and version review
6. cross-doc consistency pass
7. final summary

## 1. Pre-Flight And Diff Scan

Collect:

- branch diff stat
- commit summary
- changed file list

Classify changes into:

- new features
- changed behavior
- removed behavior
- infrastructure or release-system changes

## 2. Documentation Inventory

Find relevant documentation files in the repo.

Typical targets:

- `README.md`
- `AGENTS.md`
- `ARCHITECTURE.md`
- `CONTRIBUTING.md`
- `CHANGELOG.md`
- `VERSION`
- `TODOS.md`
- other top-level or `docs/` markdown files

Treat `AGENTS.md` as a first-class project doc in this OpenCode repo, especially where `gstack` would otherwise use `CLAUDE.md`.

When the target includes GitHub-facing entry docs such as `README.md`, also treat them as adoption surfaces rather than only factual references.

## 3. Per-File Audit

For each documentation file:

- read it fully before editing
- compare it against the actual shipped changes
- classify needed edits as either factual and safe or narrative and risky

Safe factual changes include:

- command lists
- file paths
- workflow counts
- skill tables
- references to docs or config homes
- outdated setup instructions clearly contradicted by the diff

Riskier changes include:

- project positioning
- architecture rationale
- security explanations
- large narrative rewrites
- deleting sections wholesale

## GitHub README Guidance

When updating `README.md` or another GitHub-first landing document, use this guideline adapted from Daytona's README advice:

- lead with a strong header area
- include a concise one-liner and a short supporting subtitle or context block
- use trust signals near the top when they are truthful and useful
- highlight the most compelling features before deeper detail
- provide a quickstart early
- explain why the project matters from the reader's perspective
- include backstory only when it adds real context
- keep the main body concise and move excess detail into `docs/`
- keep project hygiene visible: contributing, license, support, security, releases, and issue/reporting paths when relevant

Do not cargo-cult every README section. Apply the structure proportionally to the project and the diff.

## Badge Guidance

Use Shields.io badges for GitHub-facing docs when badges improve trust and scanability.

Rules:

- prefer a small set of accurate badges over a badge wall
- prefer badges for facts users care about quickly, such as CI status, version, license, or major platform support
- do not invent metrics or imply integrations that do not exist
- do not add decorative badges with no decision value
- keep badge style reasonably consistent across the document

If a badge would require unsupported data or create maintenance burden without clear value, skip it.

## 4. Factual Updates

Apply clear factual updates directly.

For each modified doc, record a concise summary of what changed.

If the doc is GitHub-facing, you may also make bounded presentation improvements that increase clarity, trust, and adoption, as long as they stay truthful and consistent with the actual project state.

Examples:

- added `/document-release` to the workflow list
- updated deploy config references from `CLAUDE.md` to `AGENTS.md`
- corrected browser workflow count

## 5. Changelog And Version Review

Rules:

- never casually rewrite changelog history
- preserve existing entries
- polish wording conservatively when warranted
- do not invent release notes unsupported by the diff
- treat version changes as explicit decisions, not automatic side effects

If `VERSION` exists, consider whether documentation changes alone justify a bump. Usually they do not.

## 6. Cross-Doc Consistency

Check whether the main entry-point docs agree.

Important consistency checks:

- README versus AGENTS workflow lists
- README versus actual `.opencode/commands`
- deploy config references use `AGENTS.md`, not stale `CLAUDE.md` assumptions
- architecture docs match current system boundaries where the diff clearly affects them
- discoverability: major docs should be reachable from README or AGENTS
- GitHub badges and claims match actual project state and repo files

## 7. Output Format

End with a structured summary like:

```text
Documentation health:
  README.md        Updated (added /document-release to workflow list)
  AGENTS.md        Current
  CHANGELOG.md     Current
  VERSION          Not bumped
```

Use one of these statuses:

- Updated
- Current
- Voice polished
- Already bumped
- Not bumped
- Skipped

## Important Rules

- read before editing
- do not overwrite changelog history
- be conservative with release metadata
- prefer factual corrections over broad rewriting
- keep docs discoverable and internally consistent
- for GitHub-facing docs, optimize for clarity, trust, and fast scanning before depth
- use Shields.io badges only when they are truthful and worth maintaining

## Port Notes From gstack

This skill preserves the important parts of `gstack`'s `document-release` workflow:

- docs are audited after shipping work
- factual drift is corrected directly
- changelog and version handling stay conservative
- documentation health is reported explicitly

The OpenCode adaptation is that `AGENTS.md` replaces `CLAUDE.md` wherever project-local instructions are the source of truth.
