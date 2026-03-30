---
name: deploy-verification
description: This skill should be used when the user asks to merge and deploy a PR, land a branch, deploy to production, verify a post-merge deployment, or run a merge-to-live release workflow.
license: MIT
compatibility: opencode
---
## Purpose

Provide an OpenCode-native merge, deploy, and verify workflow inspired by `gstack`'s `land-and-deploy` skill.

The point is not merely to merge. The point is to land code and know whether the deployment is actually healthy.

## Core Contract

- merge safely
- wait for the deploy path intelligently
- verify staging or production health explicitly
- separate merge success, deploy success, and health verification in the final report

## Workflow Order

Use this order:

1. pre-flight and target detection
2. merge readiness
3. merge execution
4. deploy wait strategy
5. live verification
6. final report

## 1. Pre-flight And Target Detection

Determine:

- the PR or branch to land
- the base branch
- whether a staging or production URL is available
- whether deploy config is already documented

If the workflow cannot identify what to merge or where to verify, stop and ask for the smallest missing piece of context.

## 2. Merge Readiness

Before merging, check:

- CI status
- mergeability
- whether review and release readiness look acceptable for the repo
- whether docs-only changes can skip deploy verification

Blockers here should stop the workflow before merge.

## 3. Merge Execution

Prefer the platform's standard merge path.

Important distinctions:

- auto-merge or merge queue path
- direct merge path
- merge conflict or permission failure

If using a queue, report queue waiting separately from deploy waiting.

## 4. Deploy Wait Strategy

After merge, determine how deploy progress can be observed.

Possible strategies:

- GitHub Actions or CI workflow polling
- deploy platform status checks
- custom command from repo configuration
- fixed wait plus health verification when no stronger signal exists

Progress should be reported periodically. Do not leave the user guessing.

If deployment fails, stop and report the failure clearly.

## 5. Live Verification

Verification depth should depend on scope:

- docs-only: skip deploy verification entirely
- config-only: smoke check only
- backend-only: health check plus error inspection
- frontend or mixed: fuller page-load and behavior verification

Verification should prefer:

- reachable URL
- successful page load
- no critical console errors when browser verification is available
- plausible content, not an error shell or blank page
- load time or latency observations when available

If verification fails, report evidence and stop for a decision.

## Staging-First Behavior

If staging exists and the deploy model supports it, prefer:

1. verify staging
2. then verify production

If the user or environment indicates staging-only validation, stop after staging with a clear staging verdict.

## Stop Conditions

Stop and report clearly on:

- no PR or branch target found
- failing CI
- merge conflicts
- permission-denied merge
- deploy timeout without user-approved continuation
- deploy failure
- failed live verification

Docs-only changes may short-circuit to success without deploy verification.

## Output Format

Use this structure:

```text
LAND & DEPLOY REPORT
Target: ...
Base: ...
Merge: queued | merged | blocked
Deploy: success | failed | timeout | skipped
Verification: healthy | unhealthy | skipped | unverified

Checks:
- ...

Timings:
- ...

Blockers:
- ...

Verdict: DEPLOYED AND VERIFIED | DEPLOYED (UNVERIFIED) | STAGING VERIFIED | REVERTED | BLOCKED
Status: DONE | DONE_WITH_CONCERNS | BLOCKED | NEEDS_CONTEXT
```

## Relationship To Setup

This workflow becomes stronger when `/setup-deploy` has already documented deploy platform, production URL, health checks, and optional staging targets.

Until then, use the best available local evidence and state the gaps explicitly.

## Port Notes From gstack

This skill preserves the important parts of `gstack`'s `land-and-deploy` workflow:

- merge first, then deploy, then verify
- queue-aware and wait-aware release behavior
- staging-first logic when appropriate
- explicit production health verification
- clear final verdicts instead of vague success language

This OpenCode port intentionally avoids host-specific telemetry, giant shell wrappers, and repo-external state machinery as hard dependencies.
