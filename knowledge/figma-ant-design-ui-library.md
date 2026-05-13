# Figma Ant Design ERP UI Library

## 文件信息

- Figma 文件名：`Ant Design ERP UI Library`
- Figma URL：https://www.figma.com/design/KaI3eGyylfiwrPlU3OR08C
- fileKey：`KaI3eGyylfiwrPlU3OR08C`
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
| ERP Patterns | PageHeaderBar、QueryFilterBar、DataTablePanel、DetailDrawer、RiskConfirm、StoreSelector |
| Templates | ErpShell、ListPageTemplate |

## 2026-05-13 · Pro v6 对齐增量

- 依据：`ant-design-pro` v6 发布说明（issue #11734 / #11735）和 `preview.pro.ant.design/welcome`
- 主题模式升级：`Ant ERP / Colors` 从单一模式升级为 `Default / Dark / Glass`
- 新增组件：
  - `Button v6`（`variant x color x state`，24 变体）
  - `ListPageTemplate v6`（`Theme=Default|Dark|Glass`）
  - `ErpShell v6`（`Theme=Default|Dark|Glass`）
- 新增文档页：`05 Pro v6 Update`

## 后续原型使用规则

1. 做 Figma 原型前，先打开或引用 `Ant Design ERP UI Library`。
2. 先检索同名基础组件：Button、Input、Select、Table 相关模式、Tag、Drawer、Modal/Popconfirm 等。
3. 如果任务要求最新 Pro 风格，优先选用 `Button v6`、`ListPageTemplate v6`、`ErpShell v6`。
4. 未指定主题时默认 `Theme=Default`；用户明确要求暗色或玻璃效果时切到 `Dark` 或 `Glass`。
5. 中文 ERP 列表页优先使用 `ListPageTemplate` 或 `ListPageTemplate v6`，再替换业务字段和内容。
6. 页面组合优先使用 `PageHeaderBar`、`QueryFilterBar`、`DataTablePanel`、`DetailDrawer`、`RiskConfirm`、`StoreSelector`。
7. 如需跨文件作为团队 Library 使用，需要用户在 Figma 里发布该文件；在同一文件中 Codex 可直接实例化本地组件。

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
2. mcp__figma__whoami        ← 验证登录账号
3. mcp__figma__get_metadata  ← fileKey=KaI3eGyylfiwrPlU3OR08C, nodeId=0:1
                                抓 Cover 页验证连通 + 组件清单
4. 按需取具体组件（见下表）
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

## 后续维护

新增 Figma 组件 / 改 token 时，按顺序：

1. 在 Figma 文件里改动
2. 回本文件 §「已创建内容」表追加 / 修改一行
3. 评估是否需要更新 HTML 镜像（`ui-library/components/`）
4. 如果改了颜色 / 间距等 foundation token，同步改 `ui-library/tokens.css`
