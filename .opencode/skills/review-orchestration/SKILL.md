---
name: review-orchestration
description: This skill should be used when the user asks to auto review a plan, run all plan reviews, orchestrate CEO/design/eng review automatically, or make the review decisions for them while still surfacing important choices at the end.
license: MIT
compatibility: opencode
---
## Purpose

Provide an OpenCode-native automatic review pipeline inspired by `gstack`'s `autoplan` skill.

The goal is to run the full plan review gauntlet with high rigor while reducing unnecessary back-and-forth on mechanical choices.

## Core Contract

- run plan reviews in sequence
- auto-decide mechanical choices using explicit principles
- preserve user control over the decisions that should remain theirs
- verify that review artifacts were actually produced
- end with a final approval gate

## Review Sequence

Always run in this order:

1. CEO review
2. design review, only if UI scope exists
3. engineering review

Do not run phases in parallel.

## Decision Principles

Use these principles when auto-deciding intermediate questions:

1. choose completeness
2. fix the whole blast radius when the added scope is still small and direct
3. prefer pragmatic clean solutions over deliberation theater
4. reject duplication and reuse what already exists
5. prefer explicit over clever
6. bias toward action once the review work is done

## Decision Classification

### Mechanical

One clearly right answer.

Auto-decide silently and log it.

### Taste Decision

Reasonable people could disagree.

Auto-recommend a direction but surface it at the final gate.

Typical causes:

- close alternatives
- borderline scope expansions
- dual-reviewer disagreement with valid reasoning

### User Challenge

When the pipeline believes the user's stated direction itself should change.

Never auto-decide this.

The default remains the user's original direction until they explicitly approve a change.

## Two Non-Automatic Gates

Even in autoplan, two categories should stay with the user:

- premise confirmation
- user challenges

Everything else can be auto-decided if the reasoning is clear and logged.

## Required Phase Outputs

Each phase should still produce the same substantive outputs it would have produced when run manually.

Examples include:

- premise challenge
- alternative approaches
- architecture or dream-state diagrams
- error and rescue registry
- failure modes registry
- test diagram or test plan artifact
- design completeness sections when UI scope exists
- what already exists
- not in scope
- deferred items
- completion summary

Automation does not permit skipping these artifacts.

## Verification Before Final Gate

Before presenting final approval, verify that:

- each required phase actually ran
- required artifacts exist in the plan or on disk
- dual-review or cross-check artifacts are present if the workflow claimed they ran
- the decision audit trail is populated

If required artifacts are missing, the review is incomplete.

## Final Approval Gate

The final gate should present:

- a short plan summary
- decision counts: total, auto-decided, taste decisions, user challenges
- review scores across phases
- cross-phase themes
- deferred items
- user challenges, if any
- taste decisions, if any
- pointer to the decision audit trail

The user should then be able to:

- approve as-is
- approve with overrides
- respond to user challenges
- interrogate the result
- request revisions
- reject and restart

## Final Output Contract

Completion is not just a chat summary.

The workflow should leave behind:

- updated plan outputs
- the decision audit trail
- any phase-specific artifacts required by the manual reviews
- a review-complete state the rest of the workflow stack can consume later

## Port Notes From gstack

This skill preserves the important parts of `gstack`'s `autoplan` workflow:

- CEO → design → eng sequencing
- explicit decision principles
- taste-decision surfacing at the end
- user challenges remain user-owned
- artifact verification before completion

This OpenCode port intentionally avoids host-specific telemetry and hidden review-log binaries as hard requirements. The orchestration contract remains, even where the artifact storage format is simpler.
