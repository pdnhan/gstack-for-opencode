# Changelog

All notable changes to this project should be documented in this file.

The format is intentionally lightweight and optimized for a workflow-pack repository.

## Unreleased

- formalized the external-adoption trust layer around install, verification, CI, troubleshooting, and release metadata
- added clean-install smoke verification and release metadata checks to the pack verification flow
- documented canonical install, verification, and recovery paths for adopters and contributors
- added `/update-docs` as a GitHub-facing docs update alias and taught the doc workflow to use stronger README structure and truthful Shields.io badges where appropriate

## 0.1.0

Initial usable alpha release.

Included in this release:

- OpenCode-native command, agent, and skill structure for core engineering workflows
- implemented workflows including `review`, `investigate`, `qa`, `qa-only`, `plan-eng-review`, and `ship`
- browser-oriented workflows and repo-owned browser adapter surface
- deploy, planning, review-orchestration, safety, and documentation-sync workflows
- quickstart setup script for project-local installation
- contributor, architecture, and structural verification baseline
