---
description: Get an independent second opinion from the OpenAI Codex CLI — review, adversarial challenge, or direct consultation
agent: codex
subtask: true
---
Run the OpenAI Codex CLI for an independent technical second opinion.

Modes:

- `/codex review` — code review of the current branch diff with a pass/fail gate
- `/codex review <instructions>` — review with a specific focus (e.g. `focus on security`)
- `/codex challenge` — adversarial mode: Codex tries to break your code
- `/codex challenge <focus>` — adversarial with a specific focus (e.g. `security`)
- `/codex <question>` — consult mode: ask Codex anything about the codebase or a plan
- `/codex` — auto-detect: prompts based on whether a diff or plan file exists

Optional flag: `--xhigh` — maximum reasoning effort (slower, ~23x more tokens).

Requires the `codex` CLI: `npm install -g @openai/codex`
