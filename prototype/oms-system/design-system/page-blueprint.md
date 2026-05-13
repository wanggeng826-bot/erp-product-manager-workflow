# OMS Page Blueprint

## Source Map

| Item | Decision |
|------|----------|
| Page name | OMS 订单履约系统 - 订单列表 |
| Primary task | 快速筛选订单，识别待审核、待发货、异常和包裹履约状态 |
| User entry | 左侧菜单：订单列表、待审订单、包裹列表 |
| Business basis | `knowledge/order-package-flow.md` 已确认订单列表、待审订单、包裹列表入口和订单状态 |
| Main surface | 查询筛选 + 状态页签 + 高密度表格 |
| Detail surface | 右侧抽屉，不离开列表上下文 |
| Real actions | 当前原型只读；搜索、筛选、页签、详情为展示型交互 |
| Excluded | 真实审核、导出、批量处理、删除、拦截、角色切换、状态切换 |

## Page Anatomy

1. `ErpShell`
   - Dark Ant-like sider.
   - Two menu groups: 订单管理、包裹管理.
2. `PageHeaderBar`
   - Breadcrumb and page title.
   - Data update metadata.
3. `OperationalSummary`
   - Compact counters for prioritization only.
4. `QueryFilterBar`
   - High-frequency query row.
   - BI 驾驶舱样式 `StoreSelector` popover: tree, search, multi-select, parent-child linkage.
5. `StatusTabs`
   - 13 confirmed order statuses.
6. `DataTablePanel`
   - Dense table; long text ellipsis; Ant status tags.
7. `DetailDrawer`
   - Descriptions + timeline + operation log.

## State Coverage

| State | Representation |
|-------|----------------|
| Default | 4 example rows with different OMS states |
| Filtered empty | Status tabs with count 0 show empty row when selected |
| Loading | Not animated in static prototype; layout supports stable table body |
| Error | Business error represented by exception row/tag, not page-level fake switch |
| Disabled / no permission | No fake operation button; only read-only detail entry |
| Success feedback | Not shown because no real mutation action exists |

## Ant Design Mapping

| Visible Area | Ant Component |
|--------------|---------------|
| Left nav | `Layout.Sider`, `Menu` |
| Header | `Breadcrumb`, `Typography`, `Space` |
| Query row | `Form`, `Select`, `Input`, `DatePicker.RangePicker`, `Button` |
| Store selector | `TreeSelect` equivalent using popover tree |
| Status tabs | `Tabs` |
| Table | `Table`, `Tag`, `Pagination`, `Tooltip` |
| Drawer | `Drawer`, `Descriptions`, `Timeline` |
