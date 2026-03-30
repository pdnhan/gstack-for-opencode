---
description: Configure deploy settings for land-and-deploy
agent: setup-deploy
subtask: true
---
Configure deploy settings for the current project.

Requirements:

- detect likely deploy platform, URLs, and verification commands first
- confirm or refine weak assumptions before persisting them
- write the deploy configuration into `AGENTS.md`
- keep the configuration explicit so `/land-and-deploy` can read it later
- never expose secrets or store credentials in the config
