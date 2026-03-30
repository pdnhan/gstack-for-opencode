---
name: review-workflow
description: This skill should be used when the user asks to review code, check a diff, inspect a branch for bugs, perform a PR review, or evaluate changes for regressions and missing tests.
license: MIT
compatibility: opencode
---
## Purpose

Provide a consistent review workflow for code and change-set analysis in `gstack-for-opencode`.

Use this skill to keep review behavior narrow, findings-first, and risk-oriented.

## What To Review

Prioritize the following in order:

1. correctness defects
2. behavioral regressions
3. security or data-safety issues in changed behavior
4. missing tests around risky paths
5. maintainability concerns that create near-term risk

## Review Process

1. Determine the effective scope of the review.
2. Inspect the changed code and adjacent logic needed to understand behavior.
3. Look for places where the implementation contradicts expected behavior, existing patterns, or likely edge cases.
4. Distinguish hard findings from softer suggestions.
5. Report only concrete, defensible findings as primary output.

## Findings Standard

A valid finding should include:

- the location, when available
- the issue itself
- why it matters
- the condition under which it fails or regresses

Avoid vague statements like "this could be improved" unless tied to a real failure mode.

## Output Format

Return findings first.

For each finding, include:

- severity or ordering by importance
- file reference
- concise explanation of the defect or risk
- short impact statement

After findings, optionally include:

- open questions
- residual risks
- a short overall summary

If no concrete findings are discovered, state that explicitly and call out any testing gaps or verification limits.

## Non-Goals

Do not default to style feedback.

Do not recommend refactors unless they are needed to fix a concrete defect, reduce a clear regression risk, or support missing testability in changed behavior.

Do not pad the review with praise or long summaries.
