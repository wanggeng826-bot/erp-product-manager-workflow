# Components Index

视频方法 Stage 1 输入包里的 `components.md` 对应文件。
`v0.2` 已对齐 Ant Design Pro v6 的输出要求：组件命名保持不变，新增 v6 语义（如 Button color+variant）和主题模式适配。

## 11 个核心组件

| # | 本地名 | Ant Design 基线 | 用途 | 状态 |
|---|---|---|---|---|
| 1 | `ErpShell` | `Layout` / `Sider` / `Header` / `Menu` / `Breadcrumb` | 后台壳层（侧边栏 + 顶栏 + 面包屑 + 内容容器） | ✅ v0.1 |
| 2 | `PageHeaderBar` | `Typography` / `Space` / `Button` | 页面标题 + 一级主操作 | ✅ v0.1 |
| 3 | `QueryFilterBar` | `Form` / `Input` / `Select` / `DatePicker` / `Button` | 列表/报表的筛选区 | ✅ v0.1 |
| 4 | `DataTablePanel` | `Table` / `Pagination` / `Tag` / `Dropdown` / `Tooltip` / `Empty` | 结果区，含批量操作 | ✅ v0.1 |
| 5 | `DetailDrawer` | `Drawer` / `Descriptions` / `Tabs` / `Timeline` | 抽屉详情查看 | ✅ v0.1 |
| 6 | `EditDrawer` | `Drawer` / `Form` / `Input` / `Select` / `DatePicker` | 抽屉编辑 | ✅ v0.2 |
| 7 | `CreateModal` | `Modal` / `Form` | 字段 ≤6 的轻量新建 | ✅ v0.2 |
| 8 | `RiskConfirm` | `Popconfirm` / `Modal.confirm` | 删除/批量等高风险二次确认 | ✅ v0.2 |
| 9 | `StoreSelector` | `TreeSelect` + 平台图标 | 平台→事业部→站点→店铺 | ✅ v0.2 |
| 10 | `DateComparisonControl` | `RangePicker` + `Radio.Group` + `Tooltip` | 报表时间对比（环比/同比） | ✅ v0.2 |
| 11 | `MetricComparisonCard` | `Card` + `Tooltip` / `Popover` | 报表指标卡 + 悬浮明细 | ✅ v0.2 |

## 还需补的横切组件

| # | 本地名 | 用途 | 状态 |
|---|---|---|---|
| 12 | `BatchActionBar` | 勾选行后才出现的批量操作条（已并入 DataTablePanel） | ✅ 已合并 |
| 13 | `FeedbackState` | Message / Notification / Result 的选型示意 | ✅ v0.2 |
| 14 | `OperationLog` | 操作日志表（固定字段模板） | ✅ v0.2 |
| 15 | `FieldHelp` | 字段说明（tooltip / 问号气泡 / 统一面板） | ✅ v0.2 |
| 16 | `ImportFlow` | 文件导入三阶段 | ✅ v0.2 |

## Pro v6 增量说明

1. Button 语义从 `type` 扩展到 `color + variant`。
2. 页面可声明主题模式：`Default` / `Dark` / `Glass`。
3. 组件样式必须使用 token，不允许硬编码新色值。

## 状态覆盖（每个组件必须考虑）

```
默认 / 加载 / 空 / 筛选无结果 / 错误 / 成功反馈 / 禁用 / 无权限
```

不需要每个组件都 8 种都实现，但要在 .md 说明里**显式列出**哪些状态适用、哪些不适用。

## 使用方式（在新原型里）

最小复用模板：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <title>订单列表</title>
  <link rel="stylesheet" href="../../ui-library/tokens.css">
</head>
<body>
  <!-- 1. 从 components/erp-shell.html 复制壳层 -->
  <!-- 2. 在内容区粘贴 components/page-header-bar.html -->
  <!-- 3. 粘贴 components/query-filter-bar.html -->
  <!-- 4. 粘贴 components/data-table-panel.html -->
  <!-- 5. 在 body 末尾粘贴 components/detail-drawer.html -->
</body>
</html>
```

实际工作时，由于每个 HTML 片段都是完整 demo 页，复制时按其内部的 `<!-- BEGIN COMPONENT --> ... <!-- END COMPONENT -->` 标记裁切。

## 命名约定

- 文件名用 `kebab-case`：`page-header-bar.html`
- HTML 内类名用 `c-<component>__<part>` BEM 风格：`.c-page-header__title`
- 数据 hook 用 `data-*`：`data-state="loading"`、`data-role="store-selector"`

## 维护

新增一个组件 → 同时改 5 个地方：
1. `components/<name>.html`（实现）
2. `components/<name>.md`（说明 + 适用场景）
3. 本文件（加一行）
4. `gallery.html`（加预览入口）
5. `tokens.md` / `binding-checklist.md`（如涉及规则变化）

漏改任一处都会让以后维护者迷路。
