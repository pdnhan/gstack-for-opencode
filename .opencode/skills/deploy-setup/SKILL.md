---
name: deploy-setup
description: This skill should be used when the user asks to set up deploy config, configure land-and-deploy, define production URLs and health checks, or make deploy verification automatic for later release workflows.
license: MIT
compatibility: opencode
---
## Purpose

Provide the OpenCode-native deploy configuration workflow inspired by `gstack`'s `setup-deploy` skill.

This workflow exists so `/land-and-deploy` can stop guessing and start reading explicit deploy settings.

## Core Contract

- detect first
- confirm weak assumptions
- write explicit deploy configuration
- persist it in `AGENTS.md` as the repo-local source of truth

## Source Of Truth

For this OpenCode port, persist deploy configuration in `AGENTS.md` under a dedicated section.

Recommended section header:

```markdown
## Deploy Configuration
```

Later workflows should read this section before trying best-effort detection.

## Workflow Order

Use this order:

1. inspect existing configuration
2. detect likely platform and deploy model
3. gather missing details
4. write configuration
5. run lightweight verification
6. summarize the result

## 1. Inspect Existing Configuration

Check whether `AGENTS.md` already has a deploy configuration section.

If one exists:

- show it
- let the user keep it, replace it, or refine specific fields

## 2. Detect Likely Platform

Look for:

- platform config files such as `fly.toml`, `render.yaml`, `vercel.json`, `netlify.toml`, `Procfile`, `railway.json`, `railway.toml`
- deploy-oriented GitHub workflow files
- project type clues such as app versus CLI or library

Use platform-specific inferences when possible, but treat them as proposed values until confirmed.

## 3. Gather Missing Details

Aim to collect:

- platform
- production URL
- optional staging URL
- deploy trigger model
- deploy status command or workflow source
- post-deploy health check URL or command
- preferred merge method when relevant

If something cannot be detected, ask for the smallest missing detail.

Do not ask for secrets. Never persist tokens, passwords, or full API keys.

## 4. Write Configuration

Persist the section in `AGENTS.md` with a clear, editable format.

Recommended structure:

```markdown
## Deploy Configuration

- Platform: ...
- Production URL: ...
- Staging URL: ...
- Deploy workflow: ...
- Deploy status command: ...
- Merge method: ...
- Project type: ...
- Post-deploy health check: ...

### Custom Deploy Hooks

- Pre-merge: ...
- Deploy trigger: ...
- Deploy status: ...
- Health check: ...
```

Prefer explicit values over prose paragraphs.

## 5. Lightweight Verification

If a health-check URL is known, test reachability.

If a deploy status command is known and safe to run, test it.

Failures here are warnings, not automatic blockers. The config can still be useful if the environment is temporarily unreachable.

## Output Format

Use this structure:

```text
DEPLOY SETUP REPORT
Platform: ...
Production URL: ...
Staging URL: ...
Deploy status: ...
Health check: ...

Written to:
- AGENTS.md

Warnings:
- ...

Status: DONE | DONE_WITH_CONCERNS | BLOCKED | NEEDS_CONTEXT
```

## Relationship To Land-And-Deploy

`/setup-deploy` makes `/land-and-deploy` stronger by giving it:

- explicit production and staging targets
- a clearer wait strategy
- a better health verification path

Without this setup, `/land-and-deploy` should still try best-effort detection, but it must report that limitation.

## Port Notes From gstack

This skill preserves the important parts of `gstack`'s `setup-deploy` workflow:

- platform detection
- user-confirmed production URL and health-check setup
- persistent deploy configuration for later automation

The key OpenCode adaptation is using `AGENTS.md` instead of `CLAUDE.md` as the configuration home.
