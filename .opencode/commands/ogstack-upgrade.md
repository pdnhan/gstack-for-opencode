---
description: Update this gstack-for-opencode repo to the latest version and show what new commands are available
agent: ogstack-upgrade
subtask: true
---
Pull the latest version of this gstack-for-opencode repo from its remote.

Shows incoming commits before pulling, performs a fast-forward merge, then diffs the command list to report any new or updated workflows.

If `opencode.json` changed, restart your OpenCode session to load the new agent configurations.

Requires this repo to have a configured git remote (`git remote get-url origin`).
