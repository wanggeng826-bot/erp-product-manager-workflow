# Ant Design AI UI Video Workflow

This workflow ports the user's referenced AI + Figma + component-library video method into this project. The videos demonstrate TD Design, but this project must use Ant Design as the component and interaction baseline.

## Core Principle

Do not jump from prompt to page.

The required sequence is:

`Input Package -> Ant Foundation -> Ant Components -> Page Assembly -> Spec Reverse Check -> Component Binding -> Review Gate -> Revision`

For Figma work, this means variables, components, frames, MCP reads, and component binding.

For HTML prototypes, this means Markdown design-system files, CSS variables, component-role class names, page source maps, and browser verification.

## Stage 1: Input Package

Before generating or rewriting a formal page, create or read an input package:

- `tokens.md`: colors, typography, spacing, radius, borders, shadows, status colors.
- `components.md`: Ant Design component inventory and local component names.
- `page-blueprint.md`: business source map, visible page sections, primary task, state coverage.
- `binding-checklist.md`: every visible block maps to a component and token source.
- `quality-gate.md`: final acceptance criteria and anti-pattern checks.

If these files do not exist for the prototype, create them before page-level implementation.

## Stage 2: Ant Foundation

Use Ant Design tokens as the foundation:

| Token | Default |
|-------|---------|
| Primary | `#1677ff` |
| Success | `#52c41a` |
| Warning | `#faad14` |
| Error | `#ff4d4f` |
| Info / Processing | `#1677ff` |
| Text primary | `rgba(0,0,0,0.88)` or project equivalent |
| Text secondary | `rgba(0,0,0,0.65)` or project equivalent |
| Border | `#d9d9d9` / `#f0f0f0` |
| Background layout | `#f5f5f5` / `#f5f7fa` |
| Border radius | `6px` Ant v5 default, up to `8px` for ERP panels |

Do not use TD Design tokens, purple gradients, decorative orbs, oversized marketing cards, or one-off colors.

## Stage 3: Ant Component Mapping

Use these mappings before inventing custom UI:

| Local Component | Ant Design Baseline | Required Behavior |
|-----------------|---------------------|-------------------|
| `ErpShell` | `Layout`, `Sider`, `Header`, `Menu`, `Breadcrumb` | Stable left navigation, compact page title, content scroll |
| `PageHeaderBar` | `Typography`, `Space`, `Button` | One compact title, minimal meta, one primary action if needed |
| `QueryFilterBar` | `Form`, `Input`, `Select`, `DatePicker`, `Button` | High-frequency filters visible, search/reset in same row |
| `StoreSelector` | `TreeSelect` / `Popover` + `Checkbox` | Platform -> business unit -> site -> store, platform icon + name |
| `AdvancedFilterPanel` | `Drawer` / collapsible `Form` | Low-frequency filters grouped, not a first-screen wall |
| `DataTablePanel` | `Table`, `Tabs`, `Tag`, `Pagination`, `Tooltip` | Dense scanning, stable columns, status tags |
| `BatchActionBar` | `Alert`, `Space`, `Button` | Only appears after row selection, high-risk actions confirm |
| `DetailDrawer` | `Drawer`, `Descriptions`, `Tabs`, `Timeline` | View-first detail without leaving list context |
| `RiskConfirm` | `Popconfirm`, `Modal.confirm` | Names object, scope, consequence, reversibility |
| `FeedbackState` | `Message`, `Notification`, `Result`, `Empty` | State feedback matches operation risk |

## Stage 4: Page Assembly Rules

- Build page from mapped components only.
- Every visible section must map to the page source map.
- Keep operational pages table-first and query-first.
- Use compact `24px / 16px / 8px` rhythm.
- Use Ant status semantics: success, processing, warning, error, default.
- Use drawers for details and light review; avoid unnecessary page jumps.
- Do not include formal-page demo controls, role switches, state switches, or debug panels.

## Stage 5: Spec Reverse Check

After the first page pass, reverse-generate:

- What components were actually used?
- Which visible sections cannot be mapped back to the source map?
- Which tokens were hardcoded or inconsistent?
- Which states are missing?
- Which Ant component should replace a custom shape?

Write this into the prototype spec or findings before further polishing.

## Stage 6: Binding Check

A page reaches the binding stage only when:

- CSS variables match the token file.
- Class names reflect component roles, not visual accidents.
- Repeated filters, tags, buttons, table cells, drawer sections, and logs reuse the same classes.
- Interaction JS follows component responsibilities, such as `StoreSelector`, `StatusTabs`, and `DetailDrawer`.
- Screenshot validation confirms no major clipping, overlap, or layout instability.

## Stage 7: 90% Gate

An Ant Design ERP prototype is considered near 90% when:

- It has the full input package.
- It looks like an Ant Design Chinese ERP page within 3 seconds.
- It uses known business facts and marks assumptions separately.
- It has reusable component binding, not one-off layout patches.
- Store selector, table, tabs, tags, drawer, pagination, empty state, and disabled/no-permission states are represented in production UI form.
- Browser validation passes at desktop width with no right-edge clipping or overlapping text.
- The final screenshot is attached or saved with the prototype.

## Figma / MCP Note

When Figma is involved, first read the target file and component library through Figma MCP, then ask the model to build or update screens from Ant Design mappings. If no Figma file is supplied, use the HTML prototype equivalent: local Markdown package plus static browser validation.
