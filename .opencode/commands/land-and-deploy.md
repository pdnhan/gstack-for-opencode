---
description: Merge, deploy, and verify the current branch or PR
agent: land-and-deploy
subtask: true
---
Run the land-and-deploy workflow for the current branch or PR.

Requirements:

- verify merge readiness before performing irreversible actions
- merge first, then wait for deployment, then verify the live result
- distinguish staging verification from production verification when both exist
- stop clearly on CI failures, merge conflicts, deploy failures, or verification failures
- provide a concrete final report instead of a vague deployment summary
