---
description: Enable destructive-command safety mode for this session
agent: careful
subtask: true
---
Enable careful mode for this session.

Requirements:

- treat destructive actions as requiring explicit warning first
- warn before risky shell, git, database, container, or infra deletion commands
- allow only well-understood safe cleanup exceptions without interruption
- keep the active safety rules clear to the user
- prefer asking over guessing when the blast radius is uncertain
