# AGENTS.md

## Purpose

This repository builds an OpenCode-native workflow pack inspired by `gstack`.

Prefer OpenCode primitives over Claude Code compatibility shims.

## Core Rules

- Prefer `.opencode/agents`, `.opencode/commands`, and `.opencode/skills` as the primary runtime surface.
- Keep prompts small and push reusable behavior into shared skills.
- Prefer Markdown-defined agents and commands unless code is required for a tool adapter.
- Keep the first version narrow and reliable before adding more commands.
- Prefer auditability over cleverness. Behavior should be easy to inspect in-repo.

## Workflow Priorities

Implement in this order unless explicitly redirected:

1. `office-hours`
2. `plan-ceo-review`
3. `plan-eng-review`
4. `investigate`
5. `review`
6. `qa`
7. `ship`
8. `retro`

## Review Standard

When working on review-related prompts and agents:

- findings come first
- focus on correctness, regressions, and missing tests
- cite files when possible
- keep summaries brief and secondary

## Agent Design Standard

- Use focused subagents with narrow responsibilities.
- Keep agent prompts concise and load shared skills for detailed workflows.
- Restrict tool access when the workflow is read-oriented.
- Prefer `subtask: true` for commands that should not pollute the parent context.

## Command Design Standard

- Commands should be thin wrappers.
- Put routing and high-level invocation in command templates.
- Put reusable decision logic in agents and skills.
- Avoid long duplicated prompts across commands.

## Naming

- Use direct names for now: `/review`, `/qa`, `/investigate`, `/plan-eng-review`
- Revisit namespacing only if collisions become a real problem.

## Tooling Strategy

- Browser QA and deployment flows are optional adapters.
- Prefer existing MCP integrations when stable and low-friction.
- Use custom tools only when workflow-specific shaping is needed.
- Preserve the intent of `gstack` workflows when porting them, but rewrite them to match OpenCode capabilities instead of copying host-specific mechanics.

## gstack Cross-Check

When implementing a workflow inspired by `gstack`:

- cross-check the relevant `gstack` skill or docs first
- preserve the behavioral contract, not the telemetry, upgrade, or host-specific bootstrap shell logic
- call out any capability gap explicitly when OpenCode lacks the underlying tool surface

## Definition Of Done

A workflow is considered implemented when:

- OpenCode discovers the command, agent, and any referenced skills
- the workflow prompt is understandable from repo files alone
- the output format is explicit
- the behavior is aligned with the implementation plan
