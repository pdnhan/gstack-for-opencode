---
name: full-safety-mode
description: This skill should be used when the user asks for guard mode, full safety, maximum safety, or wants both destructive-command warnings and directory-scoped edit restrictions active together.
license: MIT
compatibility: opencode
---
## Purpose

Provide the OpenCode-native full safety posture inspired by `gstack`'s `guard` skill.

This combines:

- destructive-command warnings from careful mode
- directory-scoped edit boundaries from freeze mode

## Core Contract

- destructive commands should be warned on
- edits should be restricted to one boundary
- both protections should be visible to the user

## Setup Behavior

When guard mode is enabled:

1. activate the careful-mode warning posture
2. set an edit boundary using the freeze contract
3. confirm both protections in one response

## Active Protections

The user should be told explicitly that two protections are running:

1. destructive command warnings
2. edit boundary restriction

## How To Relax Guard Mode

- use `unfreeze` to remove the boundary while keeping the safety concept available
- end or reset the session to drop the whole safety posture

## Port Note

Upstream `gstack` implements this with multiple hooks.

This OpenCode port preserves the same operational contract and shared state, while leaving stronger automatic enforcement as a later enhancement.
