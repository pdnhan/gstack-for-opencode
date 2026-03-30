---
name: design-plan-rubric
description: This skill should be used when the user asks to review a design plan, critique UI or UX before implementation, improve a product plan's design completeness, or run a design-focused plan review.
license: MIT
compatibility: opencode
---
## Purpose

Provide an OpenCode-native design plan review inspired by `gstack`'s `plan-design-review` skill.

The goal is to improve the plan itself by filling in missing UI and UX decisions before implementation starts.

## Core Contract

- review the plan, not the live site
- rate design completeness by dimension
- fix obvious gaps directly in the plan
- ask only for genuine design choices
- leave unresolved design decisions explicit

## Initial Gate

Before doing a full review, determine whether the plan has real UI or UX scope.

If the plan has no UI, UX, or user-facing interaction scope, say so and stop. This workflow is not for pure backend changes.

## Rating Method

For each design dimension:

1. rate it 0-10
2. explain what a 10 would require for this plan
3. add the missing detail to the plan when obvious
4. re-rate

Repeat until:

- the dimension reaches 10, or
- the user explicitly says the current state is good enough

On reruns, dimensions already at 8+ can get a lighter pass.

## Review Passes

Use these passes:

1. Information Architecture
2. Interaction State Coverage
3. User Journey and Emotional Arc
4. AI Slop Risk and Specificity
5. Design System Alignment
6. Responsive and Accessibility
7. Unresolved Design Decisions

## Pass Expectations

### 1. Information Architecture

Check:

- hierarchy of what the user sees first, second, third
- structure of pages, screens, and navigation
- whether the plan respects user attention

### 2. Interaction State Coverage

Check:

- loading states
- empty states
- error states
- success states
- partial or transitional states

Empty states are features, not afterthoughts.

### 3. User Journey And Emotional Arc

Check:

- first impression
- key transitions
- user confidence and trust
- how the plan handles confusion or surprise

### 4. AI Slop Risk And Specificity

Check whether the plan describes something intentional or just generic UI tropes.

Flag vague phrases like:

- clean modern layout
- intuitive dashboard
- card-based interface

Replace them with concrete design decisions.

### 5. Design System Alignment

If a design system or design guidance exists, align the plan to it.

If no design system exists, say so and recommend upstream design-definition work when that gap is material.

### 6. Responsive And Accessibility

Require explicit per-viewport intent plus accessibility basics:

- keyboard navigation
- screen reader support
- touch target sizing
- contrast expectations

### 7. Unresolved Design Decisions

Surface any ambiguity that would hurt implementation.

Do not leave important design choices implied.

## Plan Update Behavior

The output of this workflow is an improved plan, not a separate critique document.

For each pass:

- add obvious fixes directly into the plan
- ask only for real tradeoffs
- record approved mockups or design references when relevant

The plan should end up with explicit sections for:

- what already exists
- not in scope
- unresolved decisions
- completion summary

## Mockup Alignment

If the plan already has mockups or design artifacts attached and they no longer match the revised plan, note that and offer a one-time regeneration so the visuals align with the updated design direction.

## Final Output Contract

End with:

- completion summary table with before-and-after ratings
- unresolved decisions
- approved mockups or design references, if any
- recommendation for follow-up `/design-review` after implementation when the plan is design-complete enough to build

If all passes are 8+ or better, say the plan is design-complete enough to implement.

If anything is still below 8, say what remains unresolved and whether that was a deliberate user decision.

## Port Notes From gstack

This skill preserves the important parts of `gstack`'s `plan-design-review` workflow:

- 0-10 design completeness ratings
- pass-by-pass review
- direct plan improvement rather than detached commentary
- explicit unresolved design decisions
- design completeness as a gate before implementation

This OpenCode port intentionally avoids host-specific mockup binaries and hidden artifact stores as hard requirements.
