---
name: idea-framing
description: This skill should be used when the user asks to brainstorm an idea, think through what to build, run office hours, decide if something is worth building, or shape a project before implementation starts.
license: MIT
compatibility: opencode
---
## Purpose

Provide an OpenCode-native office-hours workflow inspired by `gstack`'s `office-hours` skill.

The point is to sharpen the idea and produce a design document, not to rush into code.

## Hard Gate

Do not write implementation code, scaffold a project, or invoke implementation workflows as part of this skill.

The deliverable is a design doc or explicit unresolved questions.

## Core Contract

- understand the problem first
- choose startup mode or builder mode intentionally
- challenge assumptions before selecting an approach
- generate 2-3 distinct approaches
- get explicit user approval on an approach
- produce a design doc

## Mode Split

### Startup mode

Use when the user is exploring a startup, internal venture, or something that needs real demand validation.

Focus on:

- demand reality
- current workaround and status quo
- target user specificity
- narrowest wedge
- user observation and surprise
- future-fit

Push toward evidence. Vague market language is not enough.

### Builder mode

Use when the user is building for fun, learning, research, hackathons, demos, or open source.

Focus on:

- what makes the idea exciting
- what would delight a real viewer or user
- fastest path to something shareable
- how it differs from existing things
- the 10x version if time were unlimited

Push toward the coolest buildable version, not market interrogation.

## Workflow Order

Use this order:

1. context gathering
2. mode-specific questioning
3. premise challenge
4. optional second-opinion synthesis
5. alternatives generation
6. approach approval
7. design doc creation
8. doc approval or revision

## 1. Context Gathering

Understand:

- the project and area the user wants to change
- whether prior design docs or plans exist
- what recent code or product context matters

Then ask for the user's goal with this idea. The answer determines the mode.

## 2. Mode-Specific Questioning

Ask questions one at a time. Stop after each and wait for the answer.

Use smart skipping. If the user's initial prompt already answers a question, do not ask it again.

### Startup-mode questions

Work through the forcing themes:

- strongest demand evidence
- current status quo and workaround cost
- desperate specificity about the user
- narrowest wedge someone would pay for now
- observed user surprises
- future-fit if the world changes

### Builder-mode questions

Use generative prompts like:

- what is the coolest version of this
- who would you show it to
- what is the fastest path to something shareable
- what existing thing is closest
- what is the 10x version

## 3. Premise Challenge

Before recommending solutions, write the premises explicitly.

Examples:

- this is the right problem
- the current workaround is painful enough
- this can start with a narrow wedge instead of a broad platform
- distribution is feasible for the artifact type

Premises should be written as statements the user can agree or disagree with.

## 4. Optional Second Opinion

If an independent second opinion is available and appropriate, synthesize it as a cross-check.

If no second opinion runs, omit that section entirely from the design doc.

## 5. Alternatives Generation

This phase is mandatory.

Produce at least 2 approaches, 3 when meaningful.

Required mix:

- one minimal viable approach
- one ideal long-term architecture or product path
- optional third creative or lateral option

For each approach include:

- name
- short summary
- effort: S, M, L, or XL
- risk: Low, Med, or High
- pros
- cons
- existing code or patterns reused

Then recommend one approach clearly.

Do not continue until the user approves an approach.

## 6. Design Doc Creation

After an approach is approved, write a design doc.

Suggested common header:

```text
# Design: {title}
Date: {today}
Branch: {branch}
Repo: {repo}
Status: DRAFT
Mode: Startup | Builder
```

### Suggested startup doc sections

- Problem Statement
- Demand Evidence
- Status Quo
- Target User and Narrowest Wedge
- Constraints
- Premises
- Cross-Model Perspective, if used
- Approaches Considered
- Recommended Approach
- Open Questions
- Success Criteria
- Distribution Plan, when relevant
- Dependencies
- The Assignment

### Suggested builder doc sections

- Problem Statement
- What Makes This Cool
- Constraints
- Premises
- Cross-Model Perspective, if used
- Approaches Considered
- Recommended Approach
- Open Questions
- Success Criteria
- Distribution Plan
- Next Steps

## 7. Approval Loop

The design doc is not complete until the user approves it or explicitly defers.

Possible outcomes:

- approved
- revise requested sections
- start over from discovery

## Output Contract

The final output of this workflow is one of:

- an approved design doc
- a draft with explicit unresolved questions
- a blocked result because critical context is missing

## Port Notes From gstack

This skill preserves the important parts of `gstack`'s `office-hours` workflow:

- startup mode versus builder mode
- problem understanding before solutioning
- premise challenge
- mandatory alternatives generation
- design doc as the deliverable

This OpenCode port intentionally avoids host-specific telemetry, local hidden doc stores, and implementation handoff as part of the office-hours workflow itself.
