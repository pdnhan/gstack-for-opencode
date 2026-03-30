---
description: Update GitHub-facing docs with adoption-focused README quality standards
agent: document-release
subtask: true
---
Run the documentation update workflow for the current branch.

Requirements:

- audit GitHub-facing docs against the current branch diff
- when updating `README.md` or other GitHub entry docs, apply the Daytona README guideline:
  - strong header structure
  - concise one-liner and supporting context
  - clear feature highlights and quickstart
  - why, backstory, and getting-started depth when justified
  - strong project hygiene links
- use truthful Shields.io badges when badges improve GitHub readability and trust
- avoid decorative or misleading badges
- keep changelog and release metadata conservative and accurate
- end with a structured documentation health summary
