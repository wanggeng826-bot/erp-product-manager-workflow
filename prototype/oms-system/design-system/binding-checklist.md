# OMS Component Binding Checklist

| Check | Expected | Status |
|-------|----------|--------|
| Token variables | CSS uses Ant-like token variables from `tokens.md` | passed |
| `ErpShell` | Sidebar, menu groups, active item, main content | passed |
| `PageHeaderBar` | Breadcrumb, page title, metadata | passed |
| `OperationalSummary` | Compact support counters, not dashboard cards | passed |
| `QueryFilterBar` | Single high-frequency filter row, no right clipping | passed |
| `StoreSelector` | BI 驾驶舱样式树形多选：platform -> BU -> site -> store, platform icon + name, expand/collapse, parent-child linkage | passed |
| `AdvancedFilterPanel` | Hidden by default, opens through button | passed |
| `StatusTabs` | 13 confirmed order states | passed |
| `DataTablePanel` | Table columns match confirmed OMS fields | passed |
| `DetailDrawer` | Opens from order/package/detail link | passed |
| `StateSet` | Semantic Ant status colors | passed |
| Anti-patterns | No formal-page demo controls or role/state switchers | passed |

## Browser Checks

| Check | Expected |
|-------|----------|
| Desktop width | `1440px` no body right overflow |
| Store selector | `storeOpen=1` after clicking trigger |
| Drawer | `drawerOpen=1` after clicking first detail entry |
| Visible temporary words | `visibleDemo=0` for formal UI body |
| Rows | 4 default rows |
| Tabs | 13 order status tabs |
