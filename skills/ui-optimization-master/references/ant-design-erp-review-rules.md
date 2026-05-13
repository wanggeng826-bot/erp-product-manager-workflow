# Ant Design ERP Review Rules

Use Ant Design as the default component and interaction baseline.

## Component Mapping

- List/report pages: `Table`, `Pagination`, `Tag`, `Tooltip`, `Dropdown`.
- Search and filters: `Form`, `Input`, `Select`, `DatePicker`, `Checkbox`, `Radio`, `Space`.
- Report time comparison: `Select`, `DatePicker`, `RangePicker`, `Radio.Group`, `Tooltip`, `Popover`.
- Store selector: tree-style selector with platform icon, platform name, business unit, site, and store name hierarchy.
- Detail viewing: `Drawer`, `Descriptions`, `Tabs` when groups are parallel and stable.
- Small creation or confirmation: `Modal`.
- Simple destructive confirmation: `Popconfirm`.
- High-risk confirmation: `Modal.confirm`.
- Feedback: `Message` for lightweight feedback, `Notification` for async or delayed results.
- Empty/no permission/completion: `Empty` and `Result`.
- Loading: `Skeleton` for first-screen loading, `Spin` for local loading, `Progress` for async tasks.
- Layout: `Layout`, `Menu`, `Breadcrumb`, `Grid`, `Flex`, `Space`.

## Review Focus

- Component choice must match Ant Design mental models.
- Form labels, validation, help text, and required states must be clear.
- Table columns should support scanning, comparison, sorting, filtering, and row actions.
- Row actions should keep high-frequency actions visible and move low-frequency actions into more menus.
- Drawer and modal widths should match task complexity.
- State and feedback should use standard Ant Design patterns before custom behavior.
- Report pages that compare time must support day/week/month granularity, standard comparison, and custom comparison.
- Standard comparison must derive previous-period and year/month-over-year ranges from the selected statistical period.
- Metric cards with comparison data should expose current period and comparison-period details on hover.
- Store selectors must preserve the fixed hierarchy: platform -> business unit -> site -> store name.

## Visual Discipline

- Keep border radius restrained.
- Use Ant Design blue as primary active color.
- Avoid decorative gradients and dramatic shadows.
- Prefer subtle borders and light background contrast.
- Keep spacing consistent through `Space`, grid rhythm, and stable panel padding.
- Apply Ant Design proximity: related fields/actions stay close as one visual unit; unrelated areas separate with `16-24px` spacing or a divider. Use the 8px rhythm (`8/16/24`) for vertical hierarchy.
- Use Ant-style custom Select / Dropdown surfaces in HTML prototypes; do not rely on native `<select>` because browser dropdown screenshots break Ant Design visual consistency.
- ERP top headers must not be bare title bars. Include the standard shell affordances: collapse/menu trigger, optional global search, help, notification, and user identity.

## Report Control Review

When reviewing BI, dashboard, sales, refund, finance, or operation reports, check:

- The time filter includes day, week, and month dimensions when time comparison is needed.
- The comparison mode includes both standard comparison and custom comparison.
- Standard comparison labels and ranges match the current statistical period.
- If the user selects an entire month by day dimension, last-month comparison uses the entire previous month.
- Custom comparison clearly displays the user-selected comparison range.
- Different time dimensions use matching picker styles instead of one generic date input.
- Metric card hover details show period labels, date ranges, values, deltas, and trend direction.
- Store selection follows platform icon + platform name + business unit + site + store name.
