# Figma Ant Design ERP UI Library

## 文件信息

- Figma 文件名：`Ant Design ERP UI Library`
- Figma URL：https://www.figma.com/design/KaI3eGyylfiwrPlU3OR08C
- fileKey：`KaI3eGyylfiwrPlU3OR08C`
- 库版本：`v0.2.1`
- Ant 基线：`ant.design 6.3.7` + `ant-design-pro v6`
- 本地组件索引：`knowledge/figma-component-registry.json`
- 创建日期：2026-05-12
- 用途：后续 Figma 原型优先从该库取 Ant Design / 中文 B 端 ERP 组件和模板。

## 组件来源约束

- 组件清单和分类以用户指定的 Ant Design 中文组件总览为准：https://ant.design/components/overview-cn
- 当前总览页显示版本：`6.3.7`
- 分类按官方总览组织：通用、布局、导航、数据录入、数据展示、反馈、其他、重型组件。
- ERP Patterns 只是业务组合层，不能替代或偏离 Ant Design 官方组件语义。

## 已创建内容

| Layer | Assets |
|-------|--------|
| Pages | `00 Cover`、`01 Foundations`、`--- Components`、`02 Components / Base`、`03 Components / ERP Patterns`、`04 Templates` |
| Variables | `Ant ERP / Colors` 28 个、`Ant ERP / Metrics` 30 个 |
| Text Styles | Title 24、Page Title 20、Section 16、Body 14、Body Medium 14、Caption 12 |
| Effect Styles | Card、Popover、Drawer |
| Base Component Sets | Button、Input、Select、Checkbox、Radio、Switch、Tag、Alert |
| Base Components | Pagination、Tabs、Empty、Spin、Skeleton |
| ERP Patterns | PageHeaderBar、QueryFilterBar、DataTablePanel、DetailDrawer、RiskConfirm、StoreSelector、EditDrawer、CreateModal、DateComparisonControl、MetricComparisonCard、FeedbackState、OperationLog、FieldHelp、ImportFlow |
| Templates | ErpShell、ListPageTemplate |

## 2026-05-13 · Pro v6 对齐增量

- 依据：`ant-design-pro` v6 发布说明（issue #11734 / #11735）和 `preview.pro.ant.design/welcome`
- 主题模式升级：`Ant ERP / Colors` 从单一模式升级为 `Default / Dark / Glass`
- 新增组件：
  - `Button v6`（`variant x color x state`，24 变体）
  - `ListPageTemplate v6`（`Theme=Default|Dark|Glass`）
  - `ErpShell v6`（`Theme=Default|Dark|Glass`）
- 新增文档页：`05 Pro v6 Update`

## 2026-05-13 · PageHeader 动作区约束补丁

- 问题类型：历史迭代中出现“标题右上动作区被包成白色小卡片”的布局偏差。
- 根因：动作区容器被当成视觉层使用（填充/阴影/固定空白）而非纯布局层。
- 已执行修正：`PageHeaderBar / Actions` 统一约束为 `fill=none`、`stroke=none`、`effect=none`、`padding=0`、`radius=0`、`hug contents`。
- 后续校验：所有列表模板页新增动作区检查，不允许再出现额外卡片包裹。

## 后续原型使用规则

1. 做 Figma 原型或 HTML 原型前，先读取 `knowledge/figma-component-registry.json`。
2. 默认用 Registry + HTML 镜像选择组件，不全量读取 Figma 库。
3. 如果任务要求最新 Pro 风格，优先选用 `Button v6`、`ListPageTemplate v6`、`ErpShell v6`，并在交付描述里标注「基于库版本 `v0.2.1`」。
4. 未指定主题时默认 `Theme=Default`；用户明确要求暗色或玻璃效果时切到 `Dark` 或 `Glass`。
5. 中文 ERP 列表页优先使用 `ListPageTemplate` 或 `ListPageTemplate v6`，再替换业务字段和内容。
6. 页面组合优先使用 `PageHeaderBar`、`QueryFilterBar`、`DataTablePanel`、`DetailDrawer`、`RiskConfirm`、`StoreSelector`。
7. 只有需要写入 Figma、库版本变化、nodeId 失效、或用户明确要求检查当前 Figma 文件时，才调用 Figma MCP。
8. 视觉截图验收不作为 Figma MCP 触发条件；优先用本地 HTML/浏览器验收。
9. 如需跨文件作为团队 Library 使用，需要用户在 Figma 里发布该文件；在同一文件中 Codex 可直接实例化本地组件。

## 版本号策略（新增）

版本格式：`v<major>.<minor>.<patch>`。

- `major`：结构级不兼容调整（组件命名、层级、变量集合重构）。
- `minor`：新增组件、主题模式、重要交互模式扩展。
- `patch`：不改契约的修复（布局约束、容器尺寸、样式细节修复）。

当前建议：

- `v0.2.0`：Pro v6 对齐 + v0.2 组件补齐。
- `v0.2.1`：动作区容器约束与 `v0.2 Supplements` 布局闭环修复。

## Figma ↔ 知识文件同步节奏（新增）

每次 Figma 库发生以下变更，必须在同一次任务内同步本文件：

1. 新增/删除组件或组件集。
2. Token/主题模式调整。
3. 布局约束修复（如固定宽高、自动布局、容器可见性）。

同步动作至少包含：

1. 更新「库版本」与「已创建内容」。
2. 更新 `knowledge/figma-component-registry.json`。
3. 在「连通验证记录」新增一条可追溯记录。
4. 评估并执行 HTML 镜像同步。

## 低 token MCP 使用策略（新增）

默认路径：

1. 读取 `knowledge/figma-component-registry.json`。
2. 读取对应 `ui-library/components/*.md` / `*.html` 镜像。
3. 根据 Registry 中的组件用途和规则完成组件选择与原型生成。

允许调用 Figma MCP 的场景：

1. 写入或更新真实 Figma 画布节点。
2. Figma 库版本发生变化。
3. Registry 里的 `figmaNodeId` 缺失或失效，且当前任务必须操作 Figma。
4. 用户明确要求检查当前 Figma 文件。

不需要调用 Figma MCP 的场景：

1. HTML 原型生成。
2. 常规 UI 评审和组件选择。
3. 基于本地镜像的 Ant Design 合规检查。
4. 视觉截图验收。

## 风格边界

- 使用 Ant Design 主色 `#1677ff`、成功 `#52c41a`、警告 `#faad14`、错误 `#ff4d4f`。
- 默认控件高度 32px、圆角 6px、基础字号 14/22。
- 保持中文 B 端 ERP 的信息密度：筛选、表格、抽屉、操作反馈优先。
- 不使用 TD Design、营销卡片、紫色渐变、玻璃拟态、装饰性背景。

---

## 这是权威组件源

**任何 UI 设计 / 原型 / 方案输出，组件来源都是这个 Figma 文件**。
项目里的其他资产是它的衍生物：

| 资产 | 角色 |
|---|---|
| 本 Figma 文件 | ✅ 单一权威源 |
| `ui-library/tokens.css` | Foundation tokens 的代码镜像 |
| `ui-library/components/*.html` + `*.md` | ERP Patterns 的 HTML 镜像，给原型快速复制粘贴用 |
| `skills/erp-product-manager/references/erp-reference-patterns.md` | 业务侧规则的文字版（如店铺选择器层级、操作日志字段） |
| `skills/ui-optimization-master/references/erp-ui-pattern-library.md` | 组件角色 / 行为规范的文字版 |

不一致时**永远以 Figma 库为准**，然后回过头修正镜像文件。

## Figma MCP 调用流程（每次 UI 任务开场）

```
1. 读本文件
2. 读 knowledge/figma-component-registry.json
3. 只有命中「允许调用 Figma MCP 的场景」时才调用 MCP
4. 调用时优先使用 Registry 里的具体 nodeId，不做整库扫描
```

| 想做的事 | 工具 | 关键参数 |
|---|---|---|
| 看库整体结构 / 某 page 子树 | `get_metadata` | `fileKey + nodeId` |
| 按名字找组件 | `search_design_system` | `query` + `fileKey` |
| 把某组件落到代码 | `get_design_context` | `nodeId` |
| 取颜色 / 间距 token | `get_variable_defs` | `nodeId` 或 `search_design_system includeVariables=true` |
| 看真实截图 | `get_screenshot` | `nodeId` |

**默认 fileKey：`KaI3eGyylfiwrPlU3OR08C`**。今后若新建库，先来本文件登记新 fileKey。

## 连通验证记录

| 日期 | 操作 | 结果 |
|---|---|---|
| 2026-05-12 | `whoami` | `wanggeng826@gmail.com` / Freddy / `汪耕's team` |
| 2026-05-12 | `get_metadata(fileKey=KaI3eGyylfiwrPlU3OR08C, nodeId=0:1)` | 返回 Cover 页，含全部基础组件实例（Button × 15 状态、Input × 5、Select × 4、Checkbox × 4、Radio × 3、Switch × 3、Tag × 5、Alert × 4、Pagination、Tabs、Empty、Spin、Skeleton）。✅ 库与上文清单完全一致 |
| 2026-05-13 | `use_figma`（动作区约束修正） | `PageHeaderBar / Actions` 已统一为透明布局容器（无 fill/stroke/effect，padding/radius=0，hug 内容）。✅ |
| 2026-05-13 | `use_figma`（v0.2 组件补齐） | 已新增 `EditDrawer / CreateModal / DateComparisonControl / MetricComparisonCard / FeedbackState / OperationLog / FieldHelp / ImportFlow` 组件。✅ |
| 2026-05-13 | `use_figma`（v0.2 Supplements 闭环修复） | 修复 `48:43` / `48:158` 窄列挤压问题，改为 `1480px` 包裹网格布局；8 个组件全部可见且无 `100px` 异常容器。✅ |

## 后续维护

新增 Figma 组件 / 改 token 时，按顺序：

1. 在 Figma 文件里改动
2. 回本文件 §「已创建内容」表追加 / 修改一行
3. 评估是否需要更新 HTML 镜像（`ui-library/components/`）
4. 如果改了颜色 / 间距等 foundation token，同步改 `ui-library/tokens.css`
