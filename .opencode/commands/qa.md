---
description: Run QA testing workflow for the current app or branch
agent: qa
subtask: true
---
Run the QA workflow for the current application or branch.

Requirements:

- call the `browser` tool first to detect adapter availability and capabilities
- use explicit runtime branching:
- full mode when the adapter supports `goto`, `click`, `fill`, `snapshot`, `console`, `screenshot`, and `is`
- limited mode when the adapter supports `goto`, `console`, `screenshot`, and at least one of `snapshot` or `text`
- blocked mode when the adapter is missing, unhealthy, or below the limited threshold
- prefer browser-backed testing
- use diff-aware scope when no URL is provided and branch changes imply a feature under test
- document concrete findings with severity and evidence
- only fix issues in full mode unless the user explicitly asks for best-effort limited-mode fixes
- if browser tooling is not configured, stop with a clear explanation of what adapter is missing and what can be done next
