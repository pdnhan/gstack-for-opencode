---
name: post-deploy-monitoring
description: This skill should be used when the user asks to monitor a deploy, run a canary check, watch production after release, verify a deployment over time, or look for post-deploy regressions in a live app.
license: MIT
compatibility: opencode
---
## Purpose

Provide an OpenCode-native post-deploy canary workflow inspired by `gstack`'s `canary` skill.

The goal is to detect real regressions shortly after deploy, with evidence.

## Core Contract

- monitor a live app after deploy
- compare against a baseline or a pre-monitor reference
- capture screenshots and browser evidence
- classify the deploy as healthy, degraded, or broken

## Workflow Order

Use this order:

1. setup and target detection
2. baseline loading or capture
3. page discovery
4. monitoring loop
5. alert handling
6. final canary report

## 1. Setup And Target Detection

Determine:

- target URL
- monitoring duration
- page scope
- whether the user wants baseline capture mode or active monitoring

Recommended report location:

```text
.gstack/canary-reports/
```

Typical subpaths:

- `.gstack/canary-reports/baselines/`
- `.gstack/canary-reports/screenshots/`

## 2. Baseline Handling

If baseline mode is requested, capture the current state and stop.

For each page, gather:

- screenshot path
- console error count
- load time or performance reference
- simple page text or structural snapshot

Persist a baseline manifest so later runs can compare against it.

If no baseline exists during a live run, capture a quick pre-monitor reference instead.

## 3. Page Discovery

If no pages are specified, derive a small monitoring set from the homepage and obvious navigation links.

Always include the homepage.

Keep the default set small and useful rather than exhaustive.

## 4. Monitoring Loop

During monitoring, repeat checks on each page at a steady interval.

Important checks:

- page load failure
- console error changes
- performance regression relative to baseline
- obvious broken rendering or navigation failure

Use browser operations that produce inspectable evidence, such as:

- screenshots
- console checks
- snapshots or text captures

## 5. Alert Rules

Alert on changes, not absolutes.

Examples:

- a new console error that was not present before
- a load time that is materially worse than the baseline
- a page that now fails to load

Avoid overreacting to one-off noise. Prefer persistent patterns where feasible.

Suggested severity model:

- Critical: page load failure or obviously broken deploy path
- High: new persistent console or runtime failures on important pages
- Medium: sustained performance regression or degraded but usable page
- Low: minor anomaly worth watching

Every important alert should include evidence.

## 6. Final Report

The report should include:

- duration
- pages monitored
- checks performed
- per-page status
- alerts fired by severity
- evidence locations
- final verdict

Suggested verdicts:

- HEALTHY
- DEGRADED
- BROKEN

## Baseline Update

If the deploy stays healthy, the workflow may recommend updating the baseline for future runs.

Do not silently replace an old baseline without making that decision explicit.

## Final Output Contract

End with:

- monitored scope
- main findings and alerts
- final deploy verdict
- where the report and evidence were written

## Port Notes From gstack

This skill preserves the important parts of `gstack`'s `canary` workflow:

- baseline-aware post-deploy monitoring
- repeated checks rather than a single page load
- screenshot-backed alerts
- relative regression detection instead of raw thresholds alone
- clear healthy/degraded/broken verdicts

This OpenCode port intentionally uses the repo-owned browser adapter and repo-local report paths instead of hidden host-specific runtime machinery.
