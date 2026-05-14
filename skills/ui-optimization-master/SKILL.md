---
name: ui-optimization-master
description: UI optimization and review workflow for Chinese B-end ERP pages, Ant Design prototypes, screenshots, PRD page specs, and HTML interactive prototypes. Use when the user asks to optimize UI, review a prototype, improve page structure, check Ant Design compliance, reduce cognitive load, remove demo controls, or make an ERP interface more production-ready.
---

# UI Optimization Master

Use this skill to review, diagnose, and improve Chinese B-end ERP UI designs, especially Ant Design based pages and HTML interactive prototypes.

This skill improves existing UI output. It does not replace product discovery or PRD generation. If there is no confirmed PRD or page requirement, first ask the user to provide one or confirm the page scope.

When the user asks for high-completion UI execution, direct prototype improvement, or "落地", use the project AI UI production loop:

`Foundation -> Components -> Page -> Spec -> Binding -> Review -> Revision`

Do not jump from prompt directly to page-level UI. First identify the design foundation and reusable components, then map page areas to components, then review the result against the source map and component map.

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

- For long-term user taste, company context, ERP background, case boundaries, and UI preferences: read `knowledge/README.md`, then the relevant files under `knowledge/`.
- For Ant Design Pro latest design baseline: read `knowledge/ant-design-pro-v6-baseline.md` when user asks for "latest", "新版", "Pro 风格", or preview.pro.ant.design alignment.
- For long UI review or prototype optimization tasks: read `skills/shared/context-memory-workflow.md` and keep `task_plan.md`, `findings.md`, and `progress.md` current.
- For any direct code or prototype file edits, apply `skills/karpathy-guidelines/SKILL.md` first.
- For Chinese B-end ERP visual style: read `references/chinese-b-end-erp-visual-baseline.md`.
- For interaction behavior, permissions, states, drawers, forms, tables, operation logs: read `references/ui-interaction-spec.md`.
- For ERP page patterns and shared component behavior: read `references/erp-reference-patterns.md`.
- **For ANY UI design / review / prototype task in this project (READ FIRST):** read `../../knowledge/figma-ant-design-ui-library.md` and `../../knowledge/figma-component-registry.json`. The markdown file records the authority source and version policy; the JSON registry is the low-token component index. Default to the registry + HTML mirror before calling Figma MCP. **Figma remains the authority source**, but common component selection should not read the full Figma file every time.
- For Pro v6-aligned tasks, prioritize v6 assets in the same library: `Button v6`, `ListPageTemplate v6`, `ErpShell v6`, and explicit theme mode (`Default`, `Dark`, `Glass`).
- For HTML prototype review / edit, also load the HTML mirror: `../../ui-library/README.md`, with foundation tokens in `../../ui-library/tokens.css` and reusable HTML snippets in `../../ui-library/components/`. 评审 HTML 原型时优先比对它是否用了镜像里的变量与片段。
- Only call Figma MCP when writing/updating Figma canvas nodes, the Figma library version changes, a registry nodeId is missing/invalid for a Figma operation, or the user explicitly asks to inspect the current Figma file. Visual screenshot acceptance does not require Figma MCP; use local HTML/browser checks where possible.
- For AI-assisted UI production and revision workflow: read `references/ai-ui-production-workflow.md`.
- For user-referenced video workflow, 90% completion, Figma/MCP/component-library method, or TD Design to Ant Design transfer: read `references/ant-design-video-workflow.md`.
- For reusable ERP components and page patterns: read `references/erp-ui-pattern-library.md`.
- For recurring ERP UI failures and concrete fixes: read `references/erp-ui-anti-pattern-catalog.md`.
- For tokens, accessibility, component binding, and final consistency checks: read `references/erp-design-system-checklist.md`.
- For formal prototype gates: read `references/prototype-quality-gate.md`.
- For Ant Design review details: read `references/ant-design-erp-review-rules.md`.

## Core Review Principles

Always review against these principles:

- Respect confirmed long-term knowledge from `knowledge/` when it applies.
- Do not read historical `cases/**` prototype or PRD files unless the user asks to review that specific case.
- Keep review findings, source mapping, file changes, and verification notes in planning files during long tasks.
- Easy to understand within 3 seconds.
- Fewer page jumps.
- Stable Chinese B-end ERP admin shell.
- One primary task per page.
- One highest-priority action per screen.
- Important actions are reversible or clearly irreversible.
- Permissions are visible through real UI states, not demo switches.
- State coverage is complete but not exposed as testing controls.
- Components follow Ant Design behavior and mental models.
- Pages are generated from a stable foundation and reusable component map, not one-off visual guesses.
- Reusable page patterns should come from the ERP pattern library when applicable, instead of reinventing page structure per task.
- Accessibility, chart, state, token, and responsive checks should be applied in an ERP-appropriate way without changing the desktop-first internal-system baseline.
- Dense ERP information remains scannable and predictable.
- Visual style is restrained, professional, and operation-focused.

## Hard Rules

Flag these as high-priority issues:

- Formal prototype contains demo controls.
- Formal prototype contains role switchers.
- Formal prototype contains page state switchers.
- Formal prototype contains debug panels.
- Figma prototype creates common Ant components from scratch when same-name assets already exist in `Ant Design ERP UI Library` (fileKey: `KaI3eGyylfiwrPlU3OR08C`).
- User requests Pro v6 / latest style, but output still uses legacy button semantics (`type` only) instead of `color + variant` mapping where applicable.
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
- Page is generated without a foundation map or component map when the task is a formal prototype or major UI rewrite.
- Repeated filters, tables, drawers, modals, selectors, status tags, or logs are implemented as unrelated one-off UI.

## AI UI Execution Flow

For direct UI optimization or formal prototype generation/editing:

1. Build or read the page source map: page scope, main task, visible sections, primary action, states, permissions.
2. Build the component map from `erp-ui-pattern-library.md`.
3. If the user references the video method, component library generation, MCP, Figma, or 90% completion, create or read the Ant Design input package from `ant-design-video-workflow.md` before page edits.
4. Check foundation tokens from `erp-design-system-checklist.md`: color, typography, spacing, radius, border, shadow, status colors.
5. Edit or generate the prototype using mapped components.
6. Run the anti-pattern catalog before visual polish.
7. Run final quality gate and Ant Design mapping.
8. Record findings, files changed, and verification in planning files for long tasks.

If information is missing and the user explicitly says to proceed without questions, make conservative assumptions, mark them in findings, and continue with the standard ERP defaults.

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

### Design System & Quality Checks

List token, accessibility, chart, responsive, component-map, and anti-pattern checks from the supporting references when relevant.

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
- Only run `playwright` smoke checks when the user asks for final review, final QA, or when the prototype/PRD is explicitly treated as a final draft. During iterative draft work, skip automated smoke checks unless the user asks for them.
- If `playwright` is available and the artifact is in final-review state, run a lightweight browser smoke check on the local prototype and use it to confirm the primary interaction path, layout sanity, and any obvious broken states.
- If `playwright` is not available, or the artifact is still mid-iteration, fall back to direct browser validation and note that the verification was manual.

## Relationship With ERP Product Manager Skill

Use `$erp-product-manager` for new requirement discovery, competitor analysis, solution design, PRD writing, and new prototype generation.

Do not auto-invoke `$ui-optimization-master` during initial prototype creation. Initial generation stays draft-first.

Use `$ui-optimization-master` only after the user asks for final review, UI review, formal quality gate, Ant Design compliance checks, formal prototype cleanup, page structure optimization, or existing HTML prototype refinement.
