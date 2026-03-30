---
description: Check upstream gstack for new workflows and port unimplemented ones to this OpenCode repo
agent: gstack-upgrade
subtask: true
---
Check the installed gstack skill pack for any workflows that are not yet ported to this gstack-for-opencode repo.

If a newer version of gstack is available, pull it first. Then compare gstack's skill list against `.opencode/commands/` and generate OpenCode-native agent and command files for anything that is missing.

Each ported skill gets:
- `.opencode/agents/<name>.md` — agent behavior adapted for OpenCode
- `.opencode/commands/<name>.md` — command entry point
- `.opencode/skills/<name>/SKILL.md` — shared skill if the workflow has reusable reasoning

Requires gstack to be installed at `~/.claude/skills/gstack/`.
