---
description: Run the ship workflow for the current branch
agent: ship
subtask: true
---
Run the ship workflow for the current branch.

Requirements:

- verify the current branch is not the base branch
- assess branch state, tests, and review readiness before shipping actions
- if a commit is created, load the `gitmoji commits` skill and use a gitmoji commit message
- prefer a PR-ready output over vague release guidance
- stop clearly on blockers such as merge conflicts, failed branch-owned tests, or missing release context
