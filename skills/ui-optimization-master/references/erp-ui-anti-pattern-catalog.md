# ERP UI Anti-Pattern Catalog

Use this catalog during UI review and before final prototype delivery. Each item should be fixed or explicitly justified.

## P0: Blocks Formal Delivery

### Demo Controls In Formal UI

- Symptoms: role switcher, state switcher, reset demo button, debug panel, fake permission panel.
- Impact: business users see non-production UI; PRD mapping becomes unreliable.
- Fix: remove from formal prototype. Put demo controls in a separate demo artifact only when required.

### Non-Source-Mapped Modules

- Symptoms: navigation, tabs, cards, shortcuts, summaries, or buttons that cannot map to PRD or user confirmation.
- Impact: prototype invents scope and misleads development.
- Fix: remove the element or return to requirement confirmation.

### One Page Becomes A Dashboard Suite

- Symptoms: a single list requirement becomes overview dashboard, detail center, task center, analytics tabs.
- Impact: scope explosion and wrong implementation estimate.
- Fix: preserve the confirmed page count and relationships.

### Missing Risk Confirmation

- Symptoms: delete, overwrite, batch change, publish, permission change, or irreversible status change executes directly.
- Impact: operational risk.
- Fix: use `RiskConfirm` with object, scope, consequence, and reversibility.

## P1: Should Fix Before Review

### Prompt-To-Page Without Foundation

- Symptoms: colors, spacing, radii, table styles, drawers, and buttons differ page by page.
- Impact: UI looks AI-generated and hard to maintain.
- Fix: establish foundation tokens and component map before page generation.

### Filter Wall

- Symptoms: first screen is dominated by many filters, with table pushed below the fold.
- Impact: daily operation slows down.
- Fix: keep high-frequency filters visible and move low-frequency filters to `AdvancedFilterPanel`.

### Card-Heavy Operational Page

- Symptoms: many large cards and charts replace the table/search workflow.
- Impact: page feels like Western SaaS or marketing dashboard instead of ERP.
- Fix: restore query, table, status, action, drawer workflow as the main structure.

### Demo Flow Block In Formal List Page

- Symptoms: visible "sample flow", "run next step", "reset flow", process playground, or tutorial-like module appears above the table on an operational list page.
- Impact: users perceive the prototype as a demo/showcase instead of a production ERP page; the table and search task are pushed down.
- Fix: remove it from the formal page, collapse it, move it below the main table, or convert it into a real business progress/status component with subordinate visual weight.

### Native Browser Select In HTML Prototype

- Symptoms: clicking a select shows macOS/Chrome/Windows default dark or OS-styled dropdown instead of Ant Design popup styling.
- Impact: screenshots look unfinished and inconsistent with Ant Design; this problem often recurs in generated prototypes.
- Fix: implement Select as an Ant-style trigger + popup menu/listbox in HTML prototypes, with 32px control height, 6px radius, subtle border, active item highlight, and keyboard/click-close behavior where feasible.

### Duplicate Title, Summary, Or Action Areas

- Symptoms: page title appears in header and card; primary action appears in multiple competing places.
- Impact: weak hierarchy and user confusion.
- Fix: keep one `PageHeaderBar`, one primary action, and one result context.

### Fake Permission Simulation

- Symptoms: page uses role tabs or a role dropdown to show permission differences.
- Impact: formal UI exposes test controls.
- Fix: model permissions through hidden, disabled, read-only, or feedback states.

### Weak Empty/Error States

- Symptoms: only `暂无数据` or generic error text appears.
- Impact: user cannot understand next action.
- Fix: distinguish no data, filtered empty, no permission, loading, and error with actionable copy.

### Unbound Component Shapes

- Symptoms: repeated filters/tables/buttons look similar but have different spacing, naming, and behavior.
- Impact: future changes cannot be reused.
- Fix: bind them to the pattern library and component map.

## P2: Polish And Efficiency Issues

### Over-Wide Spacing

- Symptoms: excessive whitespace, large cards, tall rows, low data density.
- Impact: daily scanning becomes inefficient.
- Fix: use compact ERP spacing rhythm: `16px` inner groups, `24px` page/module spacing.

### Decorative Visual Weight

- Symptoms: gradient backgrounds, glowing shadows, decorative icons, large hero blocks.
- Impact: business content becomes secondary.
- Fix: use neutral background, subtle borders, quiet shadows, functional icons.

### Row Actions Overloaded

- Symptoms: many visible row buttons.
- Impact: table is hard to scan.
- Fix: keep up to 3 high-frequency actions visible; move others to `More`.

### Ambiguous Button Copy

- Symptoms: buttons only say `确认`, `提交`, `操作`, `处理`.
- Impact: user must infer object and result.
- Fix: use object + action, such as `提交审核`, `保存变更`, `导出当前结果`.

### Component Choice Drift

- Symptoms: custom widgets replace standard Ant Design patterns without reason.
- Impact: development cost and learning cost increase.
- Fix: return to Ant Design mapping unless a business constraint requires extension.
