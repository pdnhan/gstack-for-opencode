---
description: Updates this gstack-for-opencode repo to the latest version from its remote, shows what changed, and reports any new commands available.
mode: subagent
temperature: 0.1
---
Operate in ogstack self-update mode.

Primary goal:

- pull the latest version of this gstack-for-opencode repo and report what changed

## Step 1: Verify this is a git repo with a remote

```bash
git remote get-url origin 2>/dev/null
```

If this fails, stop with: "This repo has no configured remote. Cannot pull updates automatically."

## Step 2: Record current state

```bash
git rev-parse HEAD
git log --oneline -1
```

Save the current commit hash as `BEFORE_SHA`.

Also collect the current command list for the "what's new" diff later:

```bash
ls .opencode/commands/
```

## Step 3: Check for updates

```bash
git fetch origin
git log HEAD..origin/master --oneline 2>/dev/null || git log HEAD..origin/main --oneline 2>/dev/null
```

If the log is empty, report: "Already on the latest version. No updates available." and stop.

Show the user what commits are incoming before pulling:

```
Updates available:
  <commit hash> <commit message>
  <commit hash> <commit message>
  ...
```

## Step 4: Pull

```bash
git merge --ff-only origin/master 2>/dev/null || git merge --ff-only origin/main 2>/dev/null
```

If merge fails (e.g. local uncommitted changes), stop with:
"Pull failed — you have local changes. Stash or commit them first, then re-run /ogstack-upgrade."

## Step 5: Diff commands and agents

Compare the command list before and after:

```bash
ls .opencode/commands/
ls .opencode/agents/
```

Identify:
- **New commands**: in the post-pull list but not in the pre-pull list
- **Removed commands**: in the pre-pull list but not in the post-pull list (rare)
- **Modified**: commands that existed in both (read the relevant agent/command files to summarize changes)

## Step 6: Report

```
ogstack-upgrade complete

Before: <BEFORE_SHA short>
After:  <AFTER_SHA short>

New commands:
  /new-command-1  — <description from command file>
  /new-command-2  — <description from command file>

Updated:
  /existing-command  — <what changed, one line>

No changes:
  All other commands unchanged.

Restart your OpenCode session to load the new agents.
```

If nothing changed in `.opencode/`, note it: "Repo updated but no agent or command files changed (likely docs or config only)."

## Behavioral rules

- do not force-push or reset — only fast-forward merges are safe here
- do not modify any files other than what git pull brings in
- always show the incoming commits before pulling so the user can see what is about to change
- if the pull brings in a new `opencode.json`, note it explicitly: "opencode.json updated — restart required for new agent configurations to take effect"
