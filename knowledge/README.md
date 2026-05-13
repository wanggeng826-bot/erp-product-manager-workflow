# Knowledge Base

这个目录是产品经理工作流的长期知识库，用来沉淀用户偏好、公司背景、自研 ERP 规则、设计判断和术语。

它和 `task_plan.md`、`findings.md`、`progress.md` 的职责不同：

| 类型 | 文件 | 用途 | 生命周期 |
|------|------|------|----------|
| 短期工作记忆 | `task_plan.md` | 当前任务阶段、目标、状态 | 单个任务或会话 |
| 短期发现记录 | `findings.md` | 当前任务中的发现、问题、临时决策 | 单个任务或会话 |
| 短期进度日志 | `progress.md` | 当前任务做了什么、验证了什么 | 单个任务或会话 |
| 长期知识库 | `knowledge/` | 稳定偏好、背景、业务规则、设计原则 | 跨任务长期复用 |

## 使用规则

- 新需求、竞品分析、PRD、原型生成前，先读取本文件，再按任务读取相关知识文件。
- UI 优化和原型走查前，优先读取 `product-design-preferences.md` 和 `erp-context.md`。
- 只有稳定、反复会影响判断的信息进入知识库。
- 单次任务的过程、临时方案、未确认猜测，不直接写入长期知识库。
- 不确定的信息必须标记为 `待确认`，不能当成事实使用。

## 文件索引

- `user-profile.md`
  用户本人偏好、工作方式、输出口味。
- `company-context.md`
  公司环境、组织特征、协作背景。
- `erp-context.md`
  自研 ERP 的产品背景、用户、业务约束。
- `product-design-preferences.md`
  UI、交互、PRD、原型输出偏好。
- `codex-usage-preferences.md`
  Codex 重度使用时的分支溯源、checkpoint、上下文治理和提醒偏好。
- `prd-style-anchor.md`
  **写 PRD 时的口味锚点** —— 句法 / 表达 / 长度偏好 + 反例。任何写 PRD 的任务都先读它。
- `prd-example-order-batch-cancel.md`
  **范例 PRD** —— 完整示范一份 PRD 的写法 + 第 8 节"原型生成输入包"长什么样。新需求开场 Claude 应"按这个口味写"。
- `glossary.md`
  常用术语和命名。
- `knowledge-capture-rules.md`
  什么内容该进入知识库，如何更新。
- `case-boundary-rules.md`
  主线、历史案例、新案例之间的文件边界和检索规则。
- `order-package-flow.md`
  订单列表、待审订单、包裹列表、包裹拦截的流程调研知识库（早期合并文档，未来拆迁到 `modules/order.md` + `modules/package.md`）。
- `modules/`
  按业务模块拆分的稳定业务规则。每个模块一个 .md，含字段表、状态机、业务规则、与其他模块关系。详见 `modules/README.md`。
- `figma-mcp-setup.md`
  Figma MCP 安装状态、默认使用方式和对 UI 工作流的影响。
- `figma-ant-design-ui-library.md`
  Figma Ant Design ERP 组件库文件链接、组件清单和后续原型使用规则。
- `ant-design-pro-v6-baseline.md`
  Ant Design Pro v6 最新迭代基线、来源链接、Figma 对齐策略和后续原型输出规则。
