---
description: Import browser cookies for authenticated browser workflows
agent: setup-browser-cookies
subtask: true
---
Run the browser cookie import workflow using the repo-owned browser adapter.

Requirements:

- call the `browser` tool with `status` first
- determine whether cookie import is necessary before attempting it
- use adapter-supported cookie import operations when available
- verify cookie visibility after import when supported
- stop clearly if the adapter lacks cookie import capabilities or if manual user action is still required
