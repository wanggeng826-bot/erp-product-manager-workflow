# OMS Demo Prototype Spec

## Prototype Task Sheet

| Item | Content |
|---|---|
| Delivery Mode | `prototype-draft` |
| Pages | `订单列表`、`待审订单`、`包裹列表` |
| Main Task Per Page | 订单列表：检索与查看履约状态；待审订单：审核待处理订单；包裹列表：查看包裹状态与发起拦截 |
| Explicit Request | 试跑新的 workflow router，随手生成一个 OMS demo，观察整体效果 |
| Explicit Out of Scope | 不做正式 UI 审查；不接真实接口；不扩成完整 ERP；不做 PRD 长文；不做真实批量操作 |
| Assumptions | 采用中文 B 端 OMS 风格；以订单/审核/包裹三页构成最小闭环；详情优先抽屉；高风险操作用确认弹窗 |

## Source Mapping

| Visible Element | Source |
|---|---|
| OMS 壳层、三段式列表页骨架 | 用户要求“生成一个 OMS 系统 demo” + 项目默认 B 端 ERP 基线 |
| 三个菜单：订单列表 / 待审订单 / 包裹列表 | OMS 最小业务闭环的保守假设 |
| 标题区、筛选区、状态页签、结果表格 | 项目原型模板与 OMS 既有样式基线 |
| 详情抽屉 | “查看优先抽屉、少跳转”的项目交互规则 |
| 包裹拦截确认弹窗 | 高风险操作必须二次确认的项目规则 |
| 仅做前端内存态演练 | `prototype-draft` 规则，不接真实接口 |

## Fidelity Check

- 不新增未说明的业务模块，如售后、财务、库存、BI 大盘。
- 不渲染“设计原则”“产品思考”“来源映射”等分析文本到正式页面。
- 不加角色切换器、状态切换器、调试面板。
- 首次交付只做结构完整和可点击验证，不做正式 UI review。
