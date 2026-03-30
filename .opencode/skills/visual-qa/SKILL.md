---
name: visual-qa
description: This skill should be used when the user asks to audit a live design, polish the UI, run visual QA, check whether a site looks good, or fix visual consistency and interaction quality issues in a rendered app.
license: MIT
compatibility: opencode
---
## Purpose

Provide an OpenCode-native live design audit and fix workflow inspired by `gstack`'s `design-review` skill.

This workflow audits the rendered UI, fixes issues in small steps, and verifies the result with browser evidence.

## Core Contract

- evaluate the rendered product, not just source code
- gather browser evidence first
- prioritize the highest-impact design issues
- fix in small, verifiable steps
- report score movement and deferred issues explicitly

## Workflow Order

Use this order:

1. target and scope detection
2. baseline browser audit
3. findings prioritization
4. iterative fix loop
5. final re-audit
6. report and artifacts

## 1. Target And Scope Detection

Determine:

- target URL or local app URL
- whether this is full, quick, deep, or diff-aware scope
- whether auth or cookies are required

If browser-backed access is not available, stop and say so clearly.

## 2. Baseline Browser Audit

Collect browser evidence before touching code.

High-value evidence:

- screenshots
- snapshots or structural captures
- console errors
- responsive checks
- interaction walkthroughs on important flows

## 3. Findings Prioritization

Work findings in impact order.

Typical categories:

- visual hierarchy
- typography
- spacing and layout
- color and contrast
- interaction states
- responsive quality
- content and microcopy clarity
- AI slop patterns
- performance feel

## 4. Iterative Fix Loop

For each fixable finding:

1. locate the exact source
2. change only directly related files
3. prefer styling-level fixes before structural changes
4. make the smallest fix that resolves the issue
5. re-verify in the browser

Track each fix as one of:

- verified
- best-effort
- reverted

After every few fixes, reassess whether continued changes create too much design-fix risk. Stop if the risk becomes meaningfully high.

## Verification Standard

Every fixed finding should have, when possible:

- a before screenshot or equivalent baseline evidence
- an after screenshot or equivalent verification evidence
- a re-check for console errors or visible regressions in the affected flow

Do not call a finding fixed if only the source changed but the rendered result was not checked.

## Baseline And Regression Handling

Record a baseline design score and AI slop score before fixes.

If prior baseline data exists, compare:

- category deltas
- newly introduced findings
- resolved findings

Warn clearly if the final state is worse than baseline.

## Report Structure

The report should include:

- findings with severity
- fix status per finding
- files changed for fixes, when relevant
- before/after evidence references
- total findings
- fixes applied by status
- deferred findings
- design score delta
- AI slop score delta

## Final Output Contract

End with:

- a concise design health summary
- score movement
- deferred or reverted findings
- recommendation for what to polish next, if anything remains

If the final state is materially stronger than baseline and the major findings are verified, say so plainly.

If important issues remain, say exactly what remains and why.

## Port Notes From gstack

This skill preserves the important parts of `gstack`'s `design-review` workflow:

- live design audit rather than plan review
- iterative fix and verify loop
- before/after evidence discipline
- design score and AI slop score tracking
- explicit deferred and reverted findings

This OpenCode port intentionally uses the repo-owned browser adapter and avoids depending on hidden host-specific design artifact machinery as a hard requirement.
