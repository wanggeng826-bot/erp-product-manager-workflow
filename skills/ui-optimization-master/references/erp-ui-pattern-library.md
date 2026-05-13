# ERP UI Pattern Library

This library is the reusable component inventory for Chinese B-end ERP prototypes. Use it before creating page-specific UI.

## 1. Foundation Components

### 1.1 `ErpShell`

Use for most desktop ERP pages.

- Anatomy: left sidebar, top header, breadcrumb, content container.
- Default size: sidebar `200px` expanded / `64px` collapsed, top header `56px`, breadcrumb row `40px`.
- Top header minimum anatomy: collapse/menu trigger, current system/module name, optional global search, help entry, notification entry, user avatar/name.
- Behavior: navigation highlights current module; content area scrolls independently when appropriate.
- Avoid: marketing hero, split landing layout, decorative backgrounds.
- Ant Design: `Layout`, `Sider`, `Header`, `Menu`, `Breadcrumb`.

### 1.2 `PageHeaderBar`

Use at the top of each business page.

- Anatomy: compact title, optional short context text, one primary action, secondary actions if required.
- Title size: `18-20px`; helper text `12-13px`.
- Primary action: one highest-priority button per screen.
- Avoid: duplicate title cards, oversized hero text, long usage instructions inside the UI.
- Ant Design: `Typography`, `Button`, `Space`.

### 1.3 `ContentPanel`

Use for grouped business content.

- Visual: white background, subtle border, minimal shadow, radius `4-8px`.
- Padding: `16px` compact or `24px` standard.
- Avoid: card inside card, heavy shadow, decorative glass effect.

## 2. Query And Result Components

### 2.1 `QueryFilterBar`

Default query area for list and report pages.

- Anatomy: keyword search, high-frequency filters, search/reset buttons, optional advanced filter entry.
- High-frequency filters remain visible; low-frequency filters move into `AdvancedFilterPanel`.
- Query button stays in the filter area, not in the page header.
- Preserve user inputs after query.
- Submitted filters must be echoed as chips below the filter row. Chips show effective conditions, not draft input.
- Do not use native browser `<select>` in HTML prototypes. Use an Ant-style Select trigger + popup menu so screenshots never expose OS/browser default dropdown styling.
- Ant Design: `Form`, `Input`, `Select`, `DatePicker`, `Button`, `Space`.

### 2.1.1 `BatchSearchInput`

Use when users need to search many order IDs, package IDs, SKU codes, tracking numbers, or platform order numbers.

- Default placement: in `QueryFilterBar`, paired with a nearby search type selector.
- Trigger state: a 32px Ant-style input/select surface that shows the first value or `首个值 等 N 个`.
- Expanded state: show a rectangular textarea below the filter row, not a browser prompt or small tooltip.
- Parsing: split by newline, English comma, and Chinese comma; trim whitespace and de-duplicate.
- Feedback: show recognized count while typing; after apply, echo values as chips below the filter row.
- Chip overflow: show the first 3 values and a compact `另 N 个` chip.
- Avoid: single-line keyword fields for batch search, comma text hidden with no feedback, and textarea styles that do not match Input/Select radius, border, focus, and spacing.
- Ant Design: `Input.TextArea`, `Tag`, `Button`, `Space`.

### 2.2 `AdvancedFilterPanel`

Use when filters exceed the first-screen readable limit.

- Drawer or collapsible panel depending on complexity.
- Group filters by decision logic, not database order.
- Provide reset and confirm actions.
- Avoid turning the first screen into a form wall.
- Ant Design: `Drawer`, `Collapse`, `Form`.

### 2.3 `DataTablePanel`

Default result area for operational pages.

- Anatomy: result summary, optional table tools, table, pagination.
- Table columns must support scanning and comparison.
- Status columns use stable status tags.
- Row actions: keep up to 3 high-frequency actions visible; move the rest into `More`.
- Empty state distinguishes no data from filtered no result.
- Ant Design: `Table`, `Pagination`, `Tag`, `Tooltip`, `Dropdown`, `Empty`.

### 2.4 `BatchActionBar`

Use only after the user selects rows.

- Shows selected count and available batch actions.
- High-risk batch actions require impact summary and confirmation.
- Partial success must distinguish successful and failed records.
- Ant Design: `Alert`, `Button`, `Space`, `Modal`.

## 3. Object Detail And Edit Components

### 3.1 `DetailDrawer`

Default view container for list-to-detail workflows.

- Width: about two thirds of viewport for medium-complex ERP objects.
- Anatomy: object title, status, key fields, grouped descriptions, related records, operation log if needed.
- Keeps list context after close.
- Ant Design: `Drawer`, `Descriptions`, `Tabs`, `Table`.

### 3.2 `EditDrawer`

Default edit container for medium-complex objects.

- Use when fields exceed a small modal or require grouping/linkage.
- Fixed footer with save/cancel.
- Preserve validation state and unsaved-change warning when appropriate.
- Ant Design: `Drawer`, `Form`, `Input`, `Select`, `DatePicker`.

### 3.3 `CreateModal`

Use for simple creation with up to 6 core fields and no complex linkage.

- Keep title and action labels specific to the object.
- Avoid long forms or multi-step flows.
- Ant Design: `Modal`, `Form`.

### 3.4 `InlineEdit`

Use for one-field or small repeated edits inside a table or detail area.

- Must show clear edit affordance.
- Validate near the field.
- Provide immediate save/cancel or auto-save feedback if project standard allows it.

## 4. Risk, Feedback, And State Components

### 4.1 `RiskConfirm`

Use for delete, overwrite, batch modification, permission changes, publishing, and hard-to-reverse state changes.

- Low-risk delete: `Popconfirm`.
- High-risk or batch operation: `Modal.confirm`.
- Must name object, scope, consequence, and reversibility.

### 4.2 `FeedbackState`

Choose feedback by impact:

- `Message`: quick success or lightweight result.
- `Notification`: async task, delayed result, important non-blocking update.
- `Result`: full-page or drawer-level completion/exception.
- `Modal`: blocking risk or severe error.

### 4.3 `StateSet`

Every formal page must design these states:

- Default
- Loading
- Empty
- Filtered empty
- Error
- Success feedback
- Disabled
- No permission

Do not expose these states through a formal-page state switcher.

## 5. ERP Specialized Components

### 5.1 `StoreSelector`

Use the fixed hierarchy:

`platform -> business unit -> site -> store name`

- Platform level displays platform icon and platform name.
- Supports search, multi-select, parent-child linkage, half-selected state, and selection summary.
- Max height around `400px`.
- Ant Design: `TreeSelect`, `Popover`, `Checkbox`, custom platform icon.

### 5.2 `DateComparisonControl`

Use for reports involving time comparison.

- Includes time granularity: day, week, month.
- Includes time type when relevant, such as payment time, creation time, shipping time.
- Includes range picker matching granularity.
- Includes standard comparison and custom comparison.
- Standard comparison derives previous period and year/month-over-year ranges from the selected period.
- Ant Design: `DatePicker`, `RangePicker`, `Radio.Group`, `Tooltip`.

### 5.3 `MetricComparisonCard`

Use for report metrics, not as a replacement for operational tables.

- Shows core value and key trend on the card.
- Hover shows current period, comparison period, values, delta, and trend.
- Negative indicators must use business semantics, not mechanical red/green rules.
- Ant Design: `Card`, `Tooltip` or `Popover`.

### 5.4 `FieldHelp`

Use for abbreviations, metrics, confusing business concepts, and non-obvious calculation rules.

- Simple explanation: tooltip.
- Medium explanation: help icon with popover.
- Many fields: unified field-description entry.

### 5.5 `OperationLog`

Use the fixed project template only.

Operation list fields:

- Menu
- First-level function
- Second-level function

Record fields:

- Operator
- Operation type
- Operation object
- Operation detail
- Operation time

Do not add template-external fields. Remove unused fields when necessary.

### 5.6 `ImportFlow`

Use for file import.

Three stages:

1. Download template
2. Upload file
3. Result feedback

Must include template version, file constraints, validation rules, task tracking, result download, success flag, and error reason.

## 6. Page Pattern Defaults

### 6.1 List Page

Default structure:

1. `ErpShell`
2. `PageHeaderBar`
3. `QueryFilterBar`
4. `DataTablePanel`
5. `DetailDrawer` / `EditDrawer` / `CreateModal`

### 6.2 Report Page

Default structure:

1. `ErpShell`
2. `PageHeaderBar`
3. `QueryFilterBar` with `DateComparisonControl` and `StoreSelector`
4. Compact `MetricComparisonCard` group when needed
5. Chart/table area where tables remain available for exact inspection

### 6.3 Approval Page

Default structure:

1. `QueryFilterBar`
2. `DataTablePanel`
3. Row/detail review drawer
4. `RiskConfirm` for approve/reject/batch actions
5. `OperationLog` or audit trail when relevant

### 6.4 Configuration Page

Default structure:

1. Compact title and warning scope if risky
2. Grouped form or editable table
3. Change preview for high-risk settings
4. Save confirmation when changes affect permissions, finance, inventory, shipping, or automation
