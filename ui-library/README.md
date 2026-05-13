# ERP UI Library（HTML 镜像）

> ⚠️ **本目录不是权威组件源**。
>
> 权威组件源是 Figma 文件 [`Ant Design ERP UI Library`](https://www.figma.com/design/KaI3eGyylfiwrPlU3OR08C)（fileKey: `KaI3eGyylfiwrPlU3OR08C`），见 [`knowledge/figma-ant-design-ui-library.md`](../knowledge/figma-ant-design-ui-library.md)。
>
> 本目录是该 Figma 库的 **HTML 镜像**，给 HTML 原型快速复制粘贴用。**不一致时永远以 Figma 库为准**，然后回过头修正本镜像。

## 它在解决什么

Figma 库解决「设计协作 / 评审」场景；但 HTML 原型生成时，每次都重新写 token / 重新拼组件，会偏离 Figma 库。

这层 HTML 镜像把 Figma 库的关键资产「翻译」成可直接复制的 HTML/CSS：

- **Foundation Tokens (`tokens.css`)** —— Figma variables 的 CSS 变量镜像，import 一次就有统一颜色、间距、字号
- **Components (`components/*.html`)** —— Figma ERP Patterns 的 HTML 实现，含默认/加载/空/错误/禁用等状态
- **Gallery (`gallery.html`)** —— 浏览器可打开的总览页
- **Binding Checklist** —— 出原型前用它逐项核对（含「与 Figma 库一致性」检查）

下次做 HTML 原型时的流程：

```
1. 读 knowledge/figma-ant-design-ui-library.md   ← 先看权威源有什么
2. 读 knowledge/figma-component-registry.json     → 用低 token 索引选组件
3. 读 ui-library/tokens.css                       → 拿到 :root 变量
4. 读 ui-library/components-index.md              → 看清需要哪些组件
5. 复制 ui-library/components/*.html              → 直接拼装 prototype
6. 按 ui-library/binding-checklist.md             → 自检
```

## 与 Figma 库的同步关系

| 维度 | Figma 库 | 本目录（HTML 镜像） |
|---|---|---|
| 权威性 | ✅ 单一权威源 | ❌ 衍生镜像 |
| 用途 | 设计协作、原型评审、Figma 文件 | HTML 原型快速复用 |
| 谁维护 | freddy 在 Figma 里改 | 改完 Figma 后，按需同步 HTML |
| 不一致时听谁的 | Figma | — |
| 组件命名 | `PageHeaderBar` / `DataTablePanel` … | **必须与 Figma 一致** |

任何 Figma 库的重大更新（新增组件、改 token），先回 `knowledge/figma-ant-design-ui-library.md` 登记，再决定是否更新本镜像。

## 目录结构

```
ui-library/
├── README.md                ← 本文件
├── tokens.css               ← 所有 CSS 变量（颜色/字体/间距/圆角/状态色）
├── tokens.md                ← tokens.css 的说明 + Ant Design v5 对齐表
├── components-index.md      ← 11 个组件总览，每个组件链接到下面的具体文件
├── components/              ← 每个组件一个 HTML + 一个 .md 说明
│   ├── erp-shell.html              · 壳层（侧边栏 + 顶栏 + 面包屑）
│   ├── erp-shell.md
│   ├── page-header-bar.html        · 页面标题区
│   ├── query-filter-bar.html       · 筛选区
│   ├── data-table-panel.html       · 表格 + 分页 + 批量
│   ├── detail-drawer.html          · 详情抽屉
│   ├── edit-drawer.html            · 编辑抽屉
│   ├── edit-drawer.md
│   ├── create-modal.html           · 新建弹窗
│   ├── create-modal.md
│   ├── risk-confirm.html           · 风险二次确认
│   ├── risk-confirm.md
│   ├── store-selector.html         · 店铺选择器
│   ├── store-selector.md
│   ├── date-comparison.html        · 报表时间对比控件
│   ├── date-comparison.md
│   ├── metric-comparison-card.html · 报表指标卡片
│   ├── metric-comparison-card.md
│   ├── feedback-state.html         · 反馈状态族
│   ├── feedback-state.md
│   ├── operation-log.html          · 操作日志
│   ├── operation-log.md
│   ├── field-help.html             · 字段说明
│   ├── field-help.md
│   ├── import-flow.html            · 文件导入
│   └── import-flow.md
├── gallery.html             ← 总览演示页（在浏览器打开看所有组件）
└── binding-checklist.md     ← 原型交付前的自检清单
```

## 与现有规范的关系

| 资产 | 作用 | 与本库关系 |
|---|---|---|
| `skills/erp-product-manager/references/ui-interaction-spec.md` | 22 章交互规范 | 本库每个组件的「行为」遵守它 |
| `skills/erp-product-manager/references/chinese-b-end-erp-visual-baseline.md` | 视觉基线 | tokens.css 把它落到 CSS 变量 |
| `skills/erp-product-manager/references/erp-reference-patterns.md` | 公共控件文字版规范 | 本库的 HTML 实现以它为契约 |
| `skills/ui-optimization-master/references/erp-ui-pattern-library.md` | 11 个组件的角色定义 | 本库就是把它从「文字」变成「代码」 |
| `skills/ui-optimization-master/references/ant-design-video-workflow.md` | 输入包方法论 | 本库的目录结构与字段直接抄它 Stage 1 |

## 当前版本（v0.2）

1. 已补齐核心 ERP 组件族（11 + 横切组件）。
2. 已补齐 HTML 镜像与说明文档。
3. 已对齐 Pro v6 规范要求：支持 `Default / Dark / Glass` 主题变量、Button `color + variant` 语义。

## 版本映射（新增）

| 资产 | 当前版本 | 说明 |
|---|---|---|
| Figma 权威库 | `v0.2.1` | 含 Pro v6 对齐与布局闭环修复 |
| HTML 镜像 | `v0.2.1` | 与 Figma `v0.2.1` 对齐 |

当 Figma 版本升级后，HTML 镜像必须在同一任务或下一次提交内补齐版本号。

## 低 token 使用方式（新增）

默认不通过 MCP 全量读取 Figma 组件库。优先使用：

1. `knowledge/figma-component-registry.json`
2. `ui-library/components-index.md`
3. `ui-library/components/*.md`
4. `ui-library/components/*.html`

只有写入 Figma、库版本变化、nodeId 失效、或用户明确要求检查当前 Figma 文件时，才调用 Figma MCP。视觉截图验收不作为 Figma MCP 触发条件。

## HTML 镜像一致性检查（新增）

下列场景必须执行镜像同步检查：

1. Figma 新增/删除组件、组件集、变体属性。
2. Figma 调整 token 或主题模式。
3. Figma 修复了布局约束问题（Auto Layout、固定宽高、容器填充/阴影）。

最小检查项：

1. `components-index.md` 是否包含最新组件清单。
2. `tokens.css` / `tokens.md` 是否同步主题与语义规则。
3. `binding-checklist.md` 是否同步新增约束。
4. 本文件版本映射是否更新。

## 怎么扩展

- 新增组件：在 `components/` 下加一对 `<name>.html` + `<name>.md`，再到 `components-index.md` 和 `gallery.html` 各加一项链接
- 修改 token：改 `tokens.css` 即可，所有组件因为用变量会自动跟随
- 新增状态：每个组件 .html 文件里以 `<section data-state="loading">` 这种语义化分块的方式追加

## 变更记录

- 2026-05-13 · `v0.2`：补齐缺失组件、补充 Pro v6 主题与语义规则。
- 2026-05-13 · `v0.2.1`：补充版本映射、镜像一致性检查清单、与 Figma `v0.2.1` 对齐。
- 2026-05-14 · `v0.2.1`：新增本地 Figma 组件 Registry，默认用低 token 索引替代 MCP 全量读库。
