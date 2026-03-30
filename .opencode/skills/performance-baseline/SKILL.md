---
name: performance-baseline
description: This skill should be used when the user asks to benchmark a site, measure page speed, track web vitals, compare load-time regressions, or analyze bundle and resource growth over time.
license: MIT
compatibility: opencode
---
## Purpose

Provide an OpenCode-native performance benchmarking workflow inspired by `gstack`'s `benchmark` skill.

The goal is to detect meaningful regressions by comparing real browser metrics against a baseline.

## Core Contract

- measure, do not guess
- use browser-collected metrics
- compare against a baseline or pre-run reference when available
- track timing, requests, and resource size changes
- report regressions with explicit thresholds

## Workflow Order

Use this order:

1. setup and target detection
2. page discovery
3. metric collection
4. baseline capture or load
5. comparison and regression classification
6. budget and trend summary
7. final benchmark report

## 1. Setup And Target Detection

Determine:

- target URL
- page scope
- whether the run is baseline capture, quick check, diff-aware, or trend-oriented

Recommended report location:

```text
.gstack/benchmark-reports/
```

Recommended baseline location:

```text
.gstack/benchmark-reports/baselines/
```

## 2. Page Discovery

If the user does not specify pages, discover a small useful set from the homepage and main navigation.

Always include the homepage.

If the run is diff-aware, bias toward pages most likely affected by the current branch.

## 3. Metric Collection

For each page, collect browser evidence such as:

- navigation timing
- paint and interactive milestones when available
- total requests
- transfer size
- resource durations
- script and stylesheet weight

Useful categories include:

- TTFB
- FCP
- LCP
- DOM interactive
- DOM complete
- full load
- total request count
- total transfer size
- JS bundle bytes
- CSS bundle bytes

## 4. Baseline Handling

If baseline mode is requested, save the current metrics as the new baseline and stop.

If no baseline exists during a comparison run, record a reference snapshot now and clearly note that the run is not a true regression comparison yet.

## 5. Comparison And Thresholds

When a baseline exists, compare current metrics against it.

Suggested regression thresholds:

- timing metrics: more than 50% worse or more than 500ms worse = regression
- timing metrics: more than 20% worse = warning
- bundle size: more than 25% increase = regression
- bundle size: more than 10% increase = warning
- request count: more than 30% increase = warning

Alert on relative change, not only absolute values.

## 6. Resource And Budget Analysis

Include:

- slowest resources
- largest bundles or payload contributors
- whether changes are first-party or third-party
- simple budget checks for things like JS, CSS, total transfer, and request count

Treat bundle growth as a leading indicator, even when load time variance is noisy.

## 7. Trend Mode

If prior reports or baselines exist, summarize trend direction across recent runs.

Useful trend outputs:

- whether key timings are improving or degrading
- whether bundle size is creeping upward over time
- whether request count is steadily increasing

## Final Output Contract

End with:

- per-page metric summary
- regressions and warnings
- top resource contributors
- budget summary
- final performance verdict
- report and baseline paths

## Port Notes From gstack

This skill preserves the important parts of `gstack`'s `benchmark` workflow:

- baseline-driven regression detection
- browser-collected timing metrics
- resource and bundle analysis
- trend-aware reporting
- relative thresholds instead of abstract judgments alone

This OpenCode port intentionally uses the repo-owned browser adapter and repo-local report storage instead of hidden host-specific benchmark machinery.
