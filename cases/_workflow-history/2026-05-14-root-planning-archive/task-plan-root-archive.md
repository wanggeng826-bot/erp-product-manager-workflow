# Task Plan: Salesperson Management Prototype Cleanup

## Goal

Remove requirement-analysis and product-thinking copy from the formal salesperson-management HTML prototype, then update the case rules so later iterations do not reintroduce source-material notes as visible UI.

## Scope

- Current prototype: `prototype/salesperson-management/index.html`
- Runtime content: `prototype/salesperson-management/data.js`
- Case memory/spec: `prototype/salesperson-management/context-summary.md`, `prototype/salesperson-management/prototype-spec.md`
- Do not read historical `cases/**`.
- Do not change unrelated dirty files.

## Phases

| Phase | Status | Notes |
|---|---|---|
| Source review | Complete | Read context summary, prototype spec, Word source, UI/code skills, component baseline. |
| Root-cause diagnosis | Complete | The prototype spec converted source-mapping notes and screenshot design principles into visible drawer content. |
| Prototype cleanup | Complete | Removed principle cards/product-thinking block; kept operational import flow and feedback. |
| Rule update | Complete | Updated case spec/context and long-term UI preferences to keep source analysis out of formal UI. |
| Verification | Complete | `node --check` passed and runtime prototype files no longer contain the removed analysis-copy terms. |

## Success Criteria

- Annual target import drawer no longer displays `产品思考`, `Efficiency`, `Accuracy`, `Usability`, `Feedback`, or visible design-principle cards.
- Operational content remains: download template, upload file, precheck validation, blocked import state, precheck report, task center result.
- Case docs explicitly prevent source-analysis notes from being rendered into user-facing prototype UI.
- `node --check prototype/salesperson-management/data.js` passes.
