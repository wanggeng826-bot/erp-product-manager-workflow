# AI UI Production Workflow

This workflow turns the observed AI + Figma method into a repeatable process for this ERP project.

The core idea is simple: do not jump from prompt directly to page. Build or read the foundation first, map reusable components, generate the page from those components, then review and revise against the source map.

## 1. Workflow Loop

Use this loop for new prototypes, UI rewrites, and major optimization work:

1. `Foundation`
   - Read or define tokens: color, typography, spacing, radius, shadow, border, layout, state colors.
   - Use `chinese-b-end-erp-visual-baseline.md` and `erp-design-system-checklist.md`.
2. `Components`
   - Select reusable components from `erp-ui-pattern-library.md`.
   - Do not invent a new filter, table, drawer, modal, selector, log, or import pattern if the library already covers it.
3. `Page`
   - Build the page from the selected components.
   - Keep the page source map next to the implementation decision: each visible area must map back to PRD or confirmed scope.
4. `Spec`
   - After the first page draft, reverse-check whether the page has exposed missing rules.
   - If a recurring component or rule is missing, add it to the reference files instead of solving it as a one-off.
5. `Binding`
   - Bind page areas to reusable components: shell, title area, query bar, table, drawer, modal, state, permission, operation log.
   - In HTML prototypes, this means naming classes and JS behaviors by component responsibility.
6. `Review`
   - Run the anti-pattern catalog, design-system checklist, Ant Design mapping, and prototype quality gate.
7. `Revision`
   - Fix concrete gaps: missing component relationship, inconsistent token, wrong spacing, non-source-mapped section, fake demo control, weak state coverage.

## 2. Required Pre-Generation Maps

Before writing or heavily editing a formal prototype, create these maps in `findings.md`, the prototype spec, or the PRD handoff.

### 2.1 Page Source Map

| Item | Required Answer |
|------|-----------------|
| Page name | What business page is this? |
| Main task | What is the one primary task? |
| User entry | Where does the user enter from? |
| Visible sections | Which PRD requirement confirms each section? |
| Primary action | Which action has highest priority? |
| Secondary actions | Why are they present? |
| States | Default, loading, empty, error, success, disabled, no-permission |
| Permission differences | Hidden, disabled, read-only, or feedback behavior |

### 2.2 Component Map

| Page Area | Default Component | Ant Design Mapping | Notes |
|-----------|-------------------|--------------------|-------|
| Admin shell | `ErpShell` | `Layout`, `Menu`, `Breadcrumb` | Use for most desktop ERP pages |
| Page title | `PageHeaderBar` | `Typography`, `Button`, `Space` | Compact title, one primary action |
| Query area | `QueryFilterBar` | `Form`, `Input`, `Select`, `DatePicker` | High-frequency filters visible |
| Advanced filters | `AdvancedFilterPanel` | `Drawer` or collapsible panel | Avoid first-screen form wall |
| Results | `DataTablePanel` | `Table`, `Pagination`, `Tag`, `Tooltip` | Main content for list pages |
| Batch actions | `BatchActionBar` | `Alert`, `Space`, `Button` | Appears only after selection |
| Details | `DetailDrawer` | `Drawer`, `Descriptions`, `Tabs` | View first, edit only when allowed |
| Edit/create | `EditDrawer` / `CreateModal` | `Drawer`, `Modal`, `Form` | Choose by field count and complexity |
| Risk action | `RiskConfirm` | `Popconfirm`, `Modal.confirm` | Must explain object and consequence |
| Feedback | `FeedbackState` | `Message`, `Notification`, `Result` | Match risk and duration |

## 3. Execution Rules For AI Agents

- Treat the Markdown reference files as the local design system.
- If a component is already specified, reuse it before creating a custom page-level solution.
- If the page needs a recurring pattern that is not documented, add the pattern to `erp-ui-pattern-library.md` first or record it as a gap.
- Keep component naming stable in prototype code. Prefer names like `query-bar`, `data-table-panel`, `detail-drawer`, `batch-action-bar`.
- Do not mix formal business UI with demo controls. State coverage belongs in real UI behavior, separate documentation, or a separate demo artifact.
- Visual polish must follow the foundation. Do not fix weak design by adding gradients, oversized cards, decorative backgrounds, or unrelated dashboard modules.
- After first generation, run a second pass focused only on missing component binding, spacing rhythm, state coverage, and source mapping.

## 4. 90% Completion Definition

A UI artifact is at roughly 90% completion when:

- The page source map is complete.
- The component map is complete.
- The first screen makes the page purpose obvious within 3 seconds.
- Layout, spacing, typography, color, radius, borders, and shadows follow the foundation.
- Main workflow is clickable in the prototype.
- Table, filters, drawers, forms, states, feedback, permissions, and risk confirmations are covered where relevant.
- No demo controls, fake role switchers, fake state switchers, or debug panels appear in the formal page.
- The page still feels like a daily-use Chinese ERP backend, not a showcase.

## 5. When Figma Is Involved

If a future task explicitly involves Figma:

- Prefer the configured remote Figma MCP server `figma` (`https://mcp.figma.com/mcp`) for file-level read/write work.
- Use the configured desktop fallback `figma-desktop` (`http://127.0.0.1:3845/mcp`) only when the local Figma desktop app has Dev Mode MCP Server enabled and port `3845` is listening.
- Verify the Figma connection or MCP capability before promising canvas edits.
- Ask the tool to read the component library or target frame before generating new UI.
- Provide the target frame, component library reference, page source map, and component map in the prompt.
- After generation, inspect whether the produced nodes are bound to reusable components or merely copied shapes.

If the task is HTML prototype work, apply the same logic through files, classes, and reusable patterns instead of Figma nodes.

## 6. MCP Setup Status For This Project

As of 2026-05-09:

- `figma` remote MCP is installed in Codex config and authenticated with OAuth.
- `figma-desktop` local MCP fallback is installed in Codex config.
- The desktop fallback requires Figma desktop Dev Mode MCP Server to be enabled in a normal Figma design file. Figma Make files may not start the local `3845` listener.

Operational default:

1. Use `figma` remote MCP for most Figma design-system and screen generation tasks.
2. Use `figma-desktop` only when the task depends on the user's currently selected local frame.
3. If both are unavailable, continue with the Markdown design-system workflow and record the limitation.
