---
name: planning-rubric
description: This skill should be used when the user asks to review an implementation plan, lock in architecture before coding, review a design doc for engineering risks, or pressure-test a plan for scope, testing, and performance.
license: MIT
compatibility: opencode
---
## Purpose

Provide an OpenCode-native engineering plan review workflow inspired by `gstack`'s `plan-eng-review`.

The goal is to catch overbuilding, missing edge cases, weak test plans, and risky architecture before implementation begins.

## Core Contract

- review the plan before writing code
- challenge scope first
- check architecture, code quality, tests, and performance explicitly
- prefer minimal correct designs over speculative complexity
- require concrete test coverage for the paths that matter

## Review Order

Use this order:

1. scope challenge
2. architecture review
3. code quality review
4. test review
5. performance review

## 1. Scope Challenge

Start every review by answering:

- what existing code, workflow, or built-in capability already solves part of this problem?
- what is the minimum set of changes that achieves the stated goal?
- is the plan touching too many files, abstractions, or services for the value delivered?
- does the plan include avoidable custom infrastructure where a boring built-in would work?

Flag these as smells:

- more than 8 files likely touched for a focused feature
- more than 2 new services, classes, or major abstractions
- infrastructure work that appears before the user-facing path is proven
- distribution or deployment concerns silently omitted for a new artifact type

If the plan looks overbuilt, recommend a smaller version first.

## 2. Architecture Review

Evaluate:

- component boundaries
- dependency direction and coupling
- data flow and state flow
- failure modes and blast radius
- auth, trust boundaries, and data access patterns
- reversibility and rollout safety when the change is risky

For each major new flow, identify one realistic production failure mode and whether the plan accounts for it.

Use ASCII diagrams when they clarify:

- data flow
- request lifecycle
- state transitions
- worker or queue pipelines
- integration boundaries

## 3. Code Quality Review

Evaluate:

- DRY violations and duplicated logic
- under-engineered paths that ignore likely edge cases
- over-engineered abstractions that hide simple behavior
- error handling and fallback behavior
- maintainability risks in naming, ownership, or layering

Bias toward explicit designs with small diffs.

## 4. Test Review

The bar is not "has some tests." The bar is that the important paths are intentionally covered.

Check both:

- code paths
- user-visible flows

Look for coverage of:

- happy path
- edge cases
- error paths
- regressions on existing behavior
- integration points where mocks can hide real failures

When useful, produce a simple ASCII coverage map like:

```text
CODE PATH COVERAGE
feature entry
|- happy path [covered]
|- invalid input [gap]
|- downstream failure [gap]

USER FLOW COVERAGE
user action
|- success state [covered]
|- retry path [gap]
|- empty state [gap]
```

Require regression tests when the plan changes existing behavior.

If the project has no test framework yet, say so explicitly and call it a delivery risk.

## 5. Performance Review

Evaluate:

- obvious N+1 or repeated network/database work
- expensive loops or repeated serialization/deserialization
- cache opportunities for hot paths
- latency and memory risks on the main user path
- scaling assumptions that are probably false in production

Prefer simple, measurable performance safeguards over premature optimization.

## Output Format

Use this structure:

```text
PLAN REVIEW
Scope challenge:
- ...

Architecture:
- ...

Code quality:
- ...

Test review:
- ...

Performance:
- ...

Open questions:
- ...

Recommendation:
- proceed | revise plan first
```

If no major issues are found, say so directly and list residual risks or assumptions.

## Port Notes From gstack

This skill preserves the important parts of `gstack`'s `plan-eng-review` workflow:

- scope challenge first
- architecture and execution rigor before coding
- strong attention to tests and edge cases
- explicit performance review
- bias toward opinionated recommendations

This OpenCode port intentionally excludes the large interactive wrapper, telemetry, and host-specific shell automation.
