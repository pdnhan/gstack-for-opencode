---
description: Sync project documentation with shipped changes
agent: document-release
subtask: true
---
Run the post-ship documentation workflow for the current branch.

Requirements:

- audit project docs against the current branch diff
- update clear factual drift directly
- keep changelog and release metadata conservative and accurate
- avoid risky narrative rewrites without explicit justification
- end with a structured documentation health summary
