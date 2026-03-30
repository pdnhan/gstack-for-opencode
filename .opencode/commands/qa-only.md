---
description: Run report-only QA for the current app or branch
agent: qa-only
subtask: true
---
Run the QA workflow in report-only mode for the current application or branch.

Requirements:

- call the `browser` tool first to detect adapter availability and capabilities
- use the same runtime branching contract as `/qa`: full, limited, or blocked
- document concrete findings with severity and evidence
- never fix bugs or edit code
- if browser tooling is not configured, stop with a clear explanation of what adapter is missing and what can be done next
