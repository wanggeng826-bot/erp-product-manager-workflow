---
name: ui-optimization-master
description: UI optimization and review workflow for Chinese B-end ERP pages, Ant Design prototypes, screenshots, PRD page specs, and HTML interactive prototypes. Use when the user asks to optimize UI, review a prototype, improve page structure, check Ant Design compliance, reduce cognitive load, remove demo controls, or make an ERP interface more production-ready.
---

# UI Optimization Master

Use this skill to review, diagnose, and improve Chinese B-end ERP UI designs, especially Ant Design based pages and HTML interactive prototypes.

This skill improves existing UI output. It does not replace product discovery or PRD generation. If there is no confirmed PRD or page requirement, first ask the user to provide one or confirm the page scope.

## First Move

Identify what the user provided:

- Screenshot
- HTML prototype directory
- PRD or page spec
- Page description
- Existing UI optimization request
- General complaint such as "页面太乱", "不够专业", "不像正式系统"

Then determine whether the task is:

- Review only
- Optimization proposal
- Direct file modification
- PRD-to-UI consistency check
- Ant Design compliance check

If the user asks for direct modification and files are available, inspect the files before editing.

## Required References

When working inside this project, read references as needed:

- For Chinese B-end ERP visual style: read `references/chinese-b-end-erp-visual-baseline.md`.
- For interaction behavior, permissions, states, drawers, forms, tables, operation logs: read `references/ui-interaction-spec.md`.
- For ERP page patterns and shared component behavior: read `references/erp-reference-patterns.md`.
- For formal prototype gates: read `references/prototype-quality-gate.md`.
- For Ant Design review details: read `references/ant-design-erp-review-rules.md`.

## Core Review Principles

Always review against these principles:

- Easy to understand within 3 seconds.
- Fewer page jumps.
- Stable Chinese B-end ERP admin shell.
- One primary task per page.
- One highest-priority action per screen.
- Important actions are reversible or clearly irreversible.
- Permissions are visible through real UI states, not demo switches.
- State coverage is complete but not exposed as testing controls.
- Components follow Ant Design behavior and mental models.
- Dense ERP information remains scannable and predictable.
- Visual style is restrained, professional, and operation-focused.

## Hard Rules

Flag these as high-priority issues:

- Formal prototype contains demo controls.
- Formal prototype contains role switchers.
- Formal prototype contains page state switchers.
- Formal prototype contains debug panels.
- Navigation, tabs, cards, summaries, or buttons cannot map back to PRD or confirmed requirements.
- Page invents modules not present in PRD.
- Page has duplicate title areas, duplicate summary areas, or duplicate action areas.
- User must jump pages for simple view or light edit tasks.
- Delete lacks second confirmation.
- Important operation lacks undo, rollback, or irreversible warning.
- Permission difference is expressed through a test panel instead of real disabled, hidden, or read-only UI behavior.
- Empty, loading, error, success, disabled, or no-permission states are missing.
- Operation log fields exceed the allowed template.
- Page looks like western SaaS, a marketing dashboard, or a demo showcase instead of a Chinese ERP backend.

## Output Format

For review tasks, output:

### Overall Judgment

State whether the UI is ready for review, needs minor changes, or needs structural revision. Include a style fit judgment: `符合`, `轻微偏离`, or `明显偏离`.

### Issues

Use severity:

- `P0` blocks delivery.
- `P1` should fix before review.
- `P2` can improve polish or efficiency.

Each issue should include location, problem, impact, recommendation, and related rule.

### Optimization Plan

Group concrete changes by page area: header and page context, filters, table/content, drawer/modal, states and feedback, permissions, visual consistency.

### Ant Design Mapping

List recommended Ant Design components and why.

### Next Step

If files exist and the user asked for implementation, edit directly. If only screenshot or text exists, provide a concrete revision spec.

## Direct Editing Rules

When editing HTML prototypes:

- Inspect `index.html`, `styles.css`, and `script.js` before changing.
- Keep changes aligned with the existing prototype architecture.
- Remove demo controls from formal pages unless the user explicitly requests a demo version.
- Do not add role switchers, state switchers, or debug panels to formal prototypes.
- Do not add new business modules without PRD or user confirmation.
- Keep page interactions clickable where possible.
- Preserve the case directory boundary, such as `cases/<case-name>/`.
- After editing, verify the prototype can still open locally.

## Relationship With ERP Product Manager Skill

Use `$erp-product-manager` for new requirement discovery, competitor analysis, solution design, PRD writing, and new prototype generation.

Use `$ui-optimization-master` for UI review, prototype quality gates, Ant Design compliance checks, formal prototype cleanup, page structure optimization, and existing HTML prototype refinement.

