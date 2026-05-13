# ERP Design System Checklist

Use this checklist as the foundation gate before generating or approving formal UI.

## 1. Token Foundation

### Color

- Primary color uses Ant Design blue or the project-confirmed active blue.
- Neutral background stays light: usually `#f5f7fa`, `#f7f8fa`, or close equivalent.
- Panels are white or near-white with subtle borders.
- Status colors are semantic and stable: success, warning, error, processing, disabled.
- Trend colors follow business meaning, especially for negative indicators.

### Typography

- Page title: around `18-20px`.
- Section title: around `15-16px`.
- Body text: around `14px`.
- Helper text: around `12-13px`.
- Avoid viewport-scaled type and oversized hero typography inside ERP surfaces.

### Spacing

- Page padding: `24px` standard, `16px` compact.
- Same-group spacing: `8-16px`.
- Module spacing: `16-24px`.
- Ant Design proximity rule: stronger relationship means smaller spacing; unrelated groups need larger spacing or a divider. Default vertical scale is `8px`, then `16px`, then `24px`.
- Table row height should support dense scanning without looking cramped.

### Radius, Border, Shadow

- Radius: `4-8px`.
- Borders: subtle and consistent.
- Shadows: light; avoid floating marketing cards.
- Do not nest cards inside cards.

## 2. Component Foundation

Confirm each relevant component has a stable pattern:

- `ErpShell`
- `PageHeaderBar`
- `QueryFilterBar`
- `AdvancedFilterPanel`
- `DataTablePanel`
- `BatchActionBar`
- `DetailDrawer`
- `EditDrawer`
- `CreateModal`
- `RiskConfirm`
- `FeedbackState`
- `StateSet`
- `StoreSelector`
- `DateComparisonControl`
- `MetricComparisonCard`
- `FieldHelp`
- `OperationLog`
- `ImportFlow`

If a page uses a component not listed here, record why it is needed.

## 3. Page-Level Checks

- One page has one primary task.
- One screen has one highest-priority action.
- Every visible section maps back to PRD or confirmed scope.
- Filters, table, actions, and details are stronger than decorative cards and charts.
- Details and light edits close in drawer/modal where possible.
- Complex multi-step flows are the exception, not the default.

## 4. State And Permission Checks

- Default state is complete.
- Loading state keeps layout stable.
- Empty state tells whether there is no data or no matching result.
- Error state gives reason and next action.
- Success feedback matches operation weight.
- Disabled state explains unmet condition when visible.
- No-permission state uses hidden, disabled, read-only, or feedback behavior.
- No formal page contains state switchers or role switchers.

## 5. Accessibility And Usability

- Text contrast is readable on light backgrounds.
- Click targets are not too small for desktop operations.
- Form errors appear near the field.
- Tables remain scannable with long Chinese text.
- Important icons have labels, tooltips, or adjacent text.
- Color is not the only signal for status or trend.

## 6. Prototype Implementation Checks

- HTML class names reflect component roles.
- CSS tokens or variables are used for recurring colors, spacing, radius, and shadows.
- JS interactions are limited to the expected prototype behaviors.
- Drawers, modals, dropdowns, filters, row actions, and batch actions are clickable where relevant.
- No visible native `<select>` for formal HTML prototypes; use custom Ant-style select/dropdown surfaces.
- Batch search fields, when needed, support textarea expansion, newline/comma parsing, recognized-count feedback, and chip echo after apply.
- Formal and demo artifacts are separated.
- Playwright or browser smoke check is run for final-review prototypes when available.

## 7. Final Style Judgment

Use the existing three-level judgment:

- `符合`: foundation, components, density, and source mapping are stable.
- `轻微偏离`: usable but needs spacing, density, or component consistency polish.
- `明显偏离`: looks like a SaaS showcase, marketing dashboard, or demo page and needs structural redesign.
