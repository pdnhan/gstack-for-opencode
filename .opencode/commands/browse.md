---
description: Run direct browser tasks with the repo-owned browser adapter
agent: browse
subtask: true
---
Run a direct browser workflow using the repo-owned browser adapter.

Requirements:

- call the `browser` tool with `status` first
- verify adapter availability before claiming browser execution
- use explicit browser operations for navigation, inspection, and evidence capture
- report what operations were run and what evidence was collected
- stop clearly on blocked browser states such as missing config, auth walls, or unsupported capabilities
