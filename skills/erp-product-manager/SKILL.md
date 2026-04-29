---
name: erp-product-manager
description: ERP product management workflow for UI design standards, competitor analysis, requirement discovery, solution design, PRD writing, and Ant Design HTML prototype planning. Use when the user asks for product manager work such as "UI 设计规范", "竞品分析", "需求方案", "PRD", "产品方案", "交互原型", "基于 PRD 生成原型", or B-end ERP product design.
---

# ERP Product Manager

Use this skill to run a product manager workflow for internal ERP systems. It routes user requests into UI design, competitor analysis, requirement solutioning, PRD output, and prototype planning while keeping project-specific cases separate from reusable standards.

## First Move

Start by identifying the user's intent:

- New requirement or solution design
- Competitor analysis
- UI or interaction design standard
- Existing PRD to prototype
- Daily discussion, review, or revision

If the user intent is unclear, ask which path they want. If the intent is clear, continue directly.

## Required Reference Loading

Load references only when needed:

- For long-term user taste, company context, ERP background, case boundaries, and terminology: read `knowledge/README.md`, then the relevant files under `knowledge/`.
- For long-context tasks, PRD/prototype work, competitor analysis, or multi-step solution design: read `skills/shared/context-memory-workflow.md` and keep `task_plan.md`, `findings.md`, and `progress.md` current.
- For code, scripts, HTML, CSS, JavaScript, or automation changes: read `skills/karpathy-guidelines/SKILL.md` first.
- For UI design rules, interaction behavior, Ant Design constraints, Chinese B-end ERP visual style, permissions, state handling, drawers, modals, forms, tables, operation logs: read `references/chinese-b-end-erp-visual-baseline.md`, `references/ui-interaction-spec.md`, and `references/erp-reference-patterns.md`.
- For new requirement discovery, solution design, and PRD writing: read `references/new-requirement-expert.md`, then `references/prd-template.md`, plus UI references if the output includes interaction or page design.
- For competitor analysis: read `references/competitor-analysis-expert.md`, plus UI references if the analysis continues into product design, PRD, or prototype.
- For existing PRD to prototype: read `references/prototype-generation-guide.md`, `references/prototype-template.md`, and the UI references before generating the prototype plan or HTML prototype.

## Workflow Rules

Always follow these rules:

- New requirement and solution tasks must start with discovery and confirmation. Do not create a solution document, PRD draft, prototype plan, or case artifact until the user has confirmed the background, goal, scope, constraints, open questions, and output strategy.
- The first output for a new requirement must be a requirements alignment response: known facts, assumptions, missing information, decision points, and a confirmation checklist. Stop after that response and wait for the user.
- Keep reusable standards separate from concrete cases.
- Keep long-term knowledge in `knowledge/`; keep current-task memory in `task_plan.md`, `findings.md`, and `progress.md`.
- For complex PM work, update planning files as active working memory: plan before execution, record findings after every 2 important research/read/browser operations, and log verification in progress.
- Put independent cases under `cases/<case-name>/` when working in a project directory.
- Do not let a concrete PRD or prototype pollute reusable workflow or UI spec files.
- Default searches for new requirements, new PRDs, and new prototypes must exclude `cases/**` unless the user explicitly says to continue or reference an existing case.
- If a similar historical case exists, mention it as optional context and wait for user confirmation before reading its PRD or prototype files.
- Do not write unconfirmed assumptions into confirmed knowledge. Use `待确认` sections in `knowledge/`.
- Before any PRD or prototype output, build a source map for the current page scope: page count, page relationship, main task, sections, tabs, primary actions, states, and permission differences.
- Any visible navigation item, tab, summary card, section title, or button in a formal prototype must map back to the PRD or a user-confirmed requirement; otherwise remove it or return to requirement discovery.
- If the PRD only confirms a single business page, do not expand it into hidden dashboard/detail/task combinations unless the user confirms that boundary change.
- State coverage and permission coverage must be represented through real UI behavior in the formal page, not through demo switches or debug panels.
- For PRD or prototype tasks, first determine whether the user already has a PRD.
- If a PRD exists, ask for the file or path, then read UI references before generating prototype output.
- If no PRD exists, first align background, users, goal, scope, constraints, and decisions, then write the PRD.
- After writing a PRD, ask whether to continue into prototype generation.
- If information is missing or uncertain, collect it in a confirmation list before pushing the work forward.
- Do not write files under `cases/<case-name>/`, `intake/`, or `prototype/` during discovery unless the user explicitly confirms the case boundary and asks to create a document.

## Operation Log Constraint

When operation logs are involved, only use the established template fields from the UI references. Fields may be removed when not applicable, but do not add new fields or change field meaning.

## Output Guidance

Match the output to the task:

- For UI design: output rules, component choices, interaction decisions, and page patterns.
- For competitor analysis: output objective, scope, comparison dimensions, evidence, conclusions, opportunity points, and next product direction.
- For solution design: output problem definition, target users, scenarios, options, recommended solution, boundaries, risks, and decisions needed.
- For PRD: use the PRD template reference and keep interaction details aligned with the UI references.
- For prototype: produce a page list, flow, interaction model, state coverage, permissions, and implementation-ready HTML prototype structure.

Keep outputs practical and implementation-oriented. Avoid inventing new interaction patterns unless the user explicitly asks to extend the standard.
