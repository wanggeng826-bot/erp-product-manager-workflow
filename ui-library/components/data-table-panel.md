# DataTablePanel

ERP 列表页的「结果区」——含工具栏、批量条、表格、空/错/加载态、分页。

## Ant Design 对应

`Table` + `Pagination` + `Tag` + `Dropdown` + `Tooltip` + `Empty`。`BatchActionBar` 已内置进来。

## 强约束

### 行级操作 ≤ 3 个常驻

来自 `ui-interaction-spec §8.1` 和 `§14.1`：

> 行级操作不超过 3 个高频动作，其余收入"更多"。

落到 HTML：每行末列只放 3 个 `<a class="link">`，第 3 个是「更多 ▾」用 Dropdown 展开。

### 状态用稳定标签体系

`erp-reference-patterns` 已定义了 5 个 tag 类：

| 类名 | 业务语义 |
|---|---|
| `tag--default` | 草稿、未提交 |
| `tag--processing` | 处理中（已支付、已发货、审核中、运送中） |
| `tag--success` | 完成（已完成、入库成功） |
| `tag--warning` | 待办（待支付、待审、待发） |
| `tag--error` | 异常（已取消、已驳回、退款中） |

**不允许在原型里自创颜色**——如果新业务状态找不到现有类对应，先回 `tokens.css` 加新变量并讨论是否扩充。

### 空状态分两类

来自 `ui-interaction-spec §10.4 / §15.2`：

| 类型 | 触发 | 文案 |
|---|---|---|
| `data-show-when="empty"` | 全表无数据（业务从未产生） | "还没有 X" + 引导动作 |
| `data-show-when="filtered-empty"` | 有数据但被筛掉了 | "没有符合条件的 X" + 列出生效筛选 + 「清空筛选」 |

不要混用——「没有数据」和「筛得太狠」需要的用户行动不一样。

### 加载态用骨架屏

300ms 内就能拿到数据时不显示。300ms 之后切到 `data-show-when="loading"`——表格行被替换为骨架条。**保持表头不变**，避免布局跳动。

### 批量操作只在勾选后出现

`data-has-selection="true"` 时 `.c-batch-bar` 才显示。批量高风险动作（取消、删除）用 `btn--danger`。

## 工具栏（toolbar）

- 左侧：结果统计（"共 X 条；已筛选 Y 条"）
- 右侧：列设置 / 导出 / 视图保存等元能力，全部用 `btn--sm`

注意：工具栏的功能性按钮**不要做成 primary**——避免与 PageHeader 的主操作竞争注意力。

## 与 DetailDrawer 协作

行点击或「查看」按钮 → 打开 DetailDrawer。**不跳新页面**（除非任务复杂到抽屉装不下）。

约定：

```js
document.addEventListener('click', e => {
  const trigger = e.target.closest('[data-row-id]');
  if (trigger && e.target.closest('.c-table__cell--actions')) {
    // 是操作列里的链接：根据 data-action 决定行为
  } else if (trigger) {
    // 行整行点击：默认进抽屉详情
    openDrawer(trigger.dataset.rowId);
  }
});
```

## 列设置（高级）

`列设置` 按钮的功能：

- 勾选哪些列显示
- 列顺序拖动
- 保存为个人视图（v0.2 补）

当前 v0.1 没实现，只放占位按钮。

## 反模式

❌ 行级有 5+ 个操作按钮（"查看 / 编辑 / 发货 / 退款 / 打印 / 取消"）
❌ 状态列直接显示英文枚举值（"PROCESSING"）—— 必须翻译为中文 + tag
❌ 加载时用 `<div>` 替换整个表格（包括表头）—— 会布局跳动
❌ 空状态只有「暂无数据」一句话 —— 至少要解释「为啥空」+「能做什么」
❌ 把批量条做成一直显示的工具栏 —— 应该只在选中后出现
❌ 在正式原型里保留 `demo-state-switcher`（这是 demo 文件特有的）

## Changelog

- 2026-05-12 · v0.1 初版，含 5 个状态 + BatchActionBar + 分页
