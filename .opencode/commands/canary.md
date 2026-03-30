---
description: Monitor a live deployment for regressions after release
agent: canary
subtask: true
---
Run the canary monitoring workflow for the target deployment.

Requirements:

- capture or load a baseline when available
- monitor the live site with browser-backed evidence
- detect changes relative to the baseline or pre-monitor reference
- alert on meaningful persistent regressions
- end with a structured canary report and deploy verdict
