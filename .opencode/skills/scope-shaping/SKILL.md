---
name: scope-shaping
description: This skill should be used when the user asks to think bigger about a plan, review product scope, challenge ambition, rethink a feature strategy, or run a founder-style strategic review before implementation.
license: MIT
compatibility: opencode
---
## Purpose

Provide an OpenCode-native strategic plan review inspired by `gstack`'s `plan-ceo-review` skill.

The goal is to improve the plan before implementation by making the right scope and ambition decisions explicit.

## Core Contract

- challenge the problem, not just the implementation
- choose a mode intentionally
- never change scope silently
- generate alternatives before recommendation
- leave a sharper plan with explicit in-scope, deferred, and not-in-scope decisions

## Review Modes

### Scope Expansion

Use when the user wants to think bigger or when the plan is obviously too timid.

Behavior:

- dream big
- surface 10x improvements
- propose expansion ideas individually
- only accepted expansions become in scope

### Selective Expansion

Use when the user wants rigor plus a menu of optional ambition upgrades.

Behavior:

- keep the existing scope as baseline
- identify cherry-pick expansion opportunities
- present each as its own decision

### Hold Scope

Use when the scope is accepted and the review should maximize rigor without changing ambition.

Behavior:

- do not expand or reduce silently
- make the current scope bulletproof

### Scope Reduction

Use when the plan is too large, too diffuse, or too slow to ship.

Behavior:

- cut ruthlessly
- find the smallest version that still delivers value
- move non-essential work to deferred or not-in-scope

## Workflow Order

Use this order:

1. system and plan context
2. premise challenge
3. existing-code leverage review
4. dream-state delta
5. implementation alternatives
6. mode selection and confirmation
7. strategic review sections
8. plan updates and readiness summary

## 1. System And Plan Context

Before the main review, understand:

- the current system state
- recent project context
- prior design docs or plan docs when they exist
- whether UI scope exists
- whether the plan touches already-problematic areas

Use that context to avoid reviewing the plan in a vacuum.

## 2. Premise Challenge

Challenge:

- is this the right problem
- is this the direct path to the user or business outcome
- what happens if nothing is built

Weak premises should be named directly.

## 3. Existing-Code Leverage

Map sub-problems to existing code or workflows.

Ask:

- what already exists
- what can be reused
- what should not be rebuilt

## 4. Dream-State Delta

Describe:

- current state
- what this plan changes
- the 12-month ideal end state

This should make it obvious whether the plan moves toward or away from the desired long-term shape.

## 5. Implementation Alternatives

This phase is mandatory.

Generate at least 2 approaches, 3 when meaningful.

Required mix:

- one minimal viable approach
- one ideal architecture or ideal product path
- optional third creative/lateral option

For each include:

- name
- summary
- effort
- risk
- pros
- cons
- reused code or patterns

Then recommend one approach before mode confirmation.

## 6. Mode Selection And Confirmation

Default guidance:

- greenfield feature, expansion
- enhancement, selective expansion
- bug fix, hotfix, or focused refactor, hold scope
- very large plan, reduction

Once the mode is chosen, do not drift away from it.

Every expansion or reduction decision should be explicit and one at a time.

## 7. Strategic Review Sections

After mode and approach are locked, review the plan through these sections:

1. Architecture Review
2. Error and Rescue Map
3. Security and Threat Model
4. Data Flow and Interaction Edge Cases
5. Code Quality Review
6. Test Review
7. Performance Review
8. Observability and Debuggability Review
9. Deployment and Rollout Review
10. Long-Term Trajectory Review
11. Design and UX Review, only when UI scope exists

## 8. Plan Updates And Output Artifacts

The review should leave behind explicit artifacts such as:

- What already exists
- Dream state delta
- Error and Rescue Registry
- Failure Modes Registry
- Not in scope
- Deferred items
- Completion Summary

Deferred items must be explicit. Nothing important should be deferred silently.

## Final Output Contract

End with:

- mode used
- section-by-section summary
- unresolved decisions
- what is in scope
- what is deferred
- what is not in scope
- recommended next reviews such as `/plan-eng-review` or `/plan-design-review`

## Port Notes From gstack

This skill preserves the important parts of `gstack`'s `plan-ceo-review` workflow:

- explicit review modes
- premise challenge before execution detail
- alternatives generation before recommendation
- one-decision-at-a-time scope handling
- output artifacts for deferred and excluded work

This OpenCode port intentionally avoids host-specific telemetry and hidden disk state as hard requirements.
