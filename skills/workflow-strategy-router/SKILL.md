---
name: workflow-strategy-router
description: Mandatory front-door router for Product Manager AI workflow tasks. Use before product-manager, prototype, UI review, or workflow-guardian work to classify task weight, lock delivery mode, allow only the minimum needed skills and references, and block unnecessary planning or review steps.
---

# Workflow Strategy Router

This skill is the front-door strategy layer for this project.

Run it before `$erp-product-manager`, `$ui-optimization-master`, or workflow guard skills when the user asks for PM, PRD, prototype, UI, or workflow work.

It does not produce the final artifact. It decides:

- task tier
- delivery mode
- risk level
- allowed skills
- allowed references
- blocked actions
- validation mode

## Required Output

Before domain execution, produce a short decision pack:

```text
Task Tier: light | standard | heavy
Delivery Mode: discussion | prd | prototype-draft | prototype-final | ui-review | workflow-governance
Risk: low | medium | high
Allowed Skills:
- ...
Allowed References:
- ...
Blocked Actions:
- ...
Validation Mode:
- none | minimal | formal
```

Do not skip this pack for ambiguous PM / UI / prototype requests.

## Tier Rules

### 1. Light

Use when the user wants:

- small edits to an existing prototype
- small PRD wording changes
- narrow file edits in one area
- screenshot-based small UI fixes

Allow:

- target files
- current diff
- directly related spec
- `karpathy-guidelines`
- one domain skill only if needed

Block:

- root planning files
- broad knowledge loading
- Figma authority docs by default
- formal UI review
- Playwright / heavy QA
- reopening requirement discovery

Validation mode: `minimal`

### 2. Standard

Use when the user wants:

- one coherent module solution
- one PRD
- one prototype draft
- one scoped UI optimization task

Allow:

- one primary domain skill
- minimum supporting references for that area
- checkpoint guardian when branch or rollback risk matters

Block:

- full project-wide reading
- formal review stack unless the user explicitly asks for final review

Validation mode: `minimal` or `formal` depending on delivery mode

### 3. Heavy

Use when the user wants:

- new requirement discovery across multiple rounds
- competitor analysis
- major prototype generation with many pages
- formal UI review / final QA
- workflow redesign
- module refactor
- long-context continuation

Allow:

- planning
- guardian
- domain skill plus formal references
- full checkpoint / rollback process

Validation mode: `formal`

## Delivery Modes

### discussion

Use for clarification, strategy, or tradeoff talk only.

Block:

- file edits
- prototype generation
- UI review

### prd

Use when the user wants a formal PRD.

Require:

- stable facts or explicit assumptions
- PRD template contract sections

Block:

- direct prototype generation before the PRD has page contracts

### prototype-draft

Use for first-pass prototype generation.

In this project, first-pass prototype generation means HTML interactive prototype only. Do not create Figma UI design files in `prototype-draft`.

Require:

- prototype task sheet
- source map or confirmed page contract

Block:

- formal UI review
- full quality gate
- Playwright smoke checks

Must tell the user:

`本次为原型初稿，只做忠实交付和最小自检，不进入正式 UI 审查。`

Also obey HTML First:

`本阶段只生成 HTML 可交互原型；你确认 HTML 无误并明确要求生成 Figma/UI 设计稿后，才会创建 Figma。`

### prototype-final

Use only when the user confirms:

- the scheme is stable
- the PRD or page contract is confirmed
- they want a final deliverable

Allow:

- full prototype quality gate
- component mapping validation
- final browser checks

Figma UI design creation is still blocked unless the user has already confirmed the HTML prototype and explicitly requests Figma/UI 设计稿 creation.

### ui-review

Use only when the user explicitly asks for:

- UI 审查
- 定稿 QA
- 正式优化
- Ant Design 合规检查

### workflow-governance

Use for:

- branch hygiene
- checkpointing
- long conversation risk
- rollback and traceability

## Prototype Fidelity Gate

For any prototype work, require these three gates before delivery:

1. `Prototype Task Sheet`
   - pages to build
   - main task per page
   - explicitly requested content
   - explicit out-of-scope items
   - explicit assumptions

2. `Source Mapping`
   - every visible module must map back to user instruction, confirmed scheme, or PRD section

3. `Fidelity Check`
   - no missing requested modules
   - no invented modules
   - no design-principle notes rendered into UI
   - no replacement of user intent with model preference

If any gate fails, stop instead of generating or polishing.

## Forced Strategy Triggers

Always force router output first when:

- user starts a new requirement
- user asks for PRD
- user asks for prototype generation
- user asks for UI review
- user asks to continue a long task
- user asks to modify workflow, skills, or hooks

## Autonomous Decisions

You should decide automatically:

- whether the task is light, standard, or heavy
- whether planning is justified
- whether checkpointing is needed before work
- whether prototype work is draft or final

But do not let downstream skills override the router decision unless the user explicitly changes the task.
