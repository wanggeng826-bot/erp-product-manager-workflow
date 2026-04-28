# Ant Design ERP Review Rules

Use Ant Design as the default component and interaction baseline.

## Component Mapping

- List/report pages: `Table`, `Pagination`, `Tag`, `Tooltip`, `Dropdown`.
- Search and filters: `Form`, `Input`, `Select`, `DatePicker`, `Checkbox`, `Radio`, `Space`.
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

## Visual Discipline

- Keep border radius restrained.
- Use Ant Design blue as primary active color.
- Avoid decorative gradients and dramatic shadows.
- Prefer subtle borders and light background contrast.
- Keep spacing consistent through `Space`, grid rhythm, and stable panel padding.

