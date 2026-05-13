# OMS Ant Design Component Inventory

| Local Component | Ant Design Baseline | Required OMS Binding |
|-----------------|---------------------|----------------------|
| `ErpShell` | `Layout`, `Sider`, `Menu` | Left menu includes only 订单列表、待审订单、包裹列表 |
| `PageHeaderBar` | `Breadcrumb`, `Typography`, `Space` | Breadcrumb + compact title + data update metadata |
| `OperationalSummary` | `Card` compact variant | Four compact counters, not a marketing dashboard |
| `QueryFilterBar` | `Form`, `Input`, `Select`, `DatePicker`, `Button` | 单号类型、关键词、店铺、站点、付款时间、搜索、重置、高级筛选 |
| `StoreSelector` | `TreeSelect` / `Popover` + tree | 平台、事业部、站点、店铺名；平台层有 icon + name；树形多选、展开收起、半选态 |
| `AdvancedFilterPanel` | `Collapse` / `Drawer` + `Form` | 仓库、物流渠道、异常类型、系统标签 |
| `StatusTabs` | `Tabs` | 订单列表 13 个状态页签 |
| `DataTablePanel` | `Table`, `Tag`, `Tooltip`, `Pagination` | 订单信息、产品信息、费用信息、包裹信息、状态、时间、详情 |
| `DetailDrawer` | `Drawer`, `Descriptions`, `Timeline` | 订单基础、商品费用、包裹履约、履约轨迹、操作日志 |
| `StateSet` | `Tag`, `Empty`, disabled/read-only states | Default, filtered empty, disabled/no-permission represented as real UI states |
| `OperationLog` | `Descriptions` / compact list | 操作人、操作类型、操作对象、操作时间 |

## Implementation Rules

- Class names must express component role, not just visual shape.
- No formal page demo controls, role switchers, state switchers, debug panels, or visible prototype labels.
- Do not show fake disabled business actions in the main UI when the user only requested visual evaluation.
- Details use drawer, not a new page.
- Table remains the primary work surface; counters only support prioritization.
- Page header action area is a transparent layout container only (`no fill/no shadow/no stroke/no extra radius`).
- Header action area must hug buttons and right-align; no fixed blank card-like wrapper is allowed.
