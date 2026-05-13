# OMS 订单履约系统原型规格

## 本次修订结论

上一版问题不是单点样式问题，而是没有真正把 Figma 文件里的 `ERP Patterns` 和 `ListPageTemplate` 作为页面视觉约束。它验证了 Figma 库存在，也引用了 token，但实现仍保留旧版自定义 CSS、展示型指标卡和较强的 demo 卡片感。

本版按 Figma `Ant Design ERP UI Library` 重新修正：页面结构收回到 `ErpShell -> PageHeaderBar -> QueryFilterBar -> DataTablePanel -> DetailDrawer/RiskConfirm`，去掉展示型指标卡，把流程演练压缩为 B 端业务处理条，让筛选、表格、状态和抽屉成为页面主任务。

本轮继续修正四个截图问题：

- 图一：流程演练区像 demo 展示块，原因是把“跑效果”直接做成首屏大模块。已改为低权重业务进度组件，去掉“重置流程”等明显 demo 控件。
- 图二：顶部缺少标准 ERP 壳层动作区，原因是只套了 56px header 尺寸，没有按 `ErpShell` 补齐折叠菜单、全局搜索、帮助、通知、用户身份。已补齐。
- 图三：原生 `<select>` 点击后暴露浏览器默认下拉样式。已替换为 Ant 风格自绘 Select 触发器和下拉菜单。
- 图四：关键词输入没有支持批量搜索。已改为点击展开矩形 textarea，支持换行、英文逗号、中文逗号解析，并在应用后用 chip 回显。

## Figma 参考

| Figma 节点 | 用途 | 本版落地 |
|------------|------|----------|
| `03 Components / ERP Patterns` | PageHeaderBar、QueryFilterBar、DataTablePanel、DetailDrawer、RiskConfirm、StoreSelector | 作为页面组件映射 |
| `04 Templates / ErpShell` | 200px 深色侧栏、56px 顶栏 | 对齐侧栏和顶栏尺寸节奏 |
| `04 Templates / ListPageTemplate` | 1440 画布、40px 面包屑、20px 内容间距、白色标题/筛选/表格 | 对齐页面骨架和首屏布局 |

## 视频流程迁移

视频演示的是 TD Design，本原型迁移其流程，不迁移其组件风格。实际执行为 Ant Design 版：

1. 建立 `design-system/tokens.md`，对应视频中的变量库。
2. 建立 `design-system/components.md`，对应视频中的组件库。
3. 建立 `design-system/page-blueprint.md`，对应页面生成前的需求与组件映射。
4. 建立 `design-system/binding-checklist.md`，对应批量绑定/组件关系检查。
5. 建立 `design-system/quality-gate.md`，对应 90% 完成度验收。
6. 再重构 `index.html`、`styles.css`、`script.js`。

## 页面来源映射

| 可见元素 | 来源 | 本版处理 |
|----------|------|----------|
| OMS 后台壳层 | 用户要求生成 OMS 系统，菜单不用多 | 左侧仅保留订单列表、待审订单、包裹列表 |
| 订单状态页签 | `knowledge/order-package-flow.md` 已确认订单列表状态 | 使用全部、待付款、待检测、待盈亏、待审核、待发货、部分发货、已发货、已取消、异常、可合并、缺货、作废 |
| 基础筛选 | 订单列表已确认：单号类型、关键词、平台、店铺、站点 | 合并为单号、关键词、`StoreSelector`、站点、付款时间 |
| 批量搜索 | 用户明确要求批量搜索 | 点击关键词控件后展开 textarea，支持换行/逗号识别，应用后 chip 回显 |
| 店铺控件 | 历史模板：沿用 BI 驾驶舱 / 销售运营概况样式，平台、事业部、站点、店铺名树形结构 | 落地为树形多选选择器，支持展开/收起、父子联动、半选态和搜索 |
| 表格列 | 已确认：订单信息、产品信息、费用信息、包裹信息、时间 | 保留订单、产品、费用、包裹、状态、时间、详情 |
| 详情抽屉 | 查看详情优先抽屉，少跳转 | 抽屉展示订单基础、商品费用、包裹履约、履约轨迹、操作日志 |
| 订单履约链路 | 用户要求“跑一跑效果”；`knowledge/order-package-flow.md` 合理推断主链路 | 作为紧凑处理条展示同步、检测、审核、生成包裹、仓库交接、发货 |
| 包裹拦截确认 | 高风险操作必须二次确认；包裹拦截字段仍待确认 | 使用 `RiskConfirm` 风格确认对象、影响范围、可恢复性和结果 |

## 组件映射

| 页面区域 | ERP 公共组件 | 实现 |
|----------|--------------|------|
| 壳层 | `ErpShell` | `.erp-shell`, `.sidebar`, `.page-header` |
| 顶栏/面包屑 | `ErpShell` | `.page-header`, `.breadcrumb-bar` |
| 顶栏动作 | `ErpShell` | `.header-left`, `.header-search`, `.header-icon-btn`, `.avatar` |
| 标题区 | `PageHeaderBar` | `.page-title-panel` |
| 查询区 | `QueryFilterBar` | `.query-panel`, `.query-grid` |
| 批量搜索 | `BatchSearchInput` | `.batch-search-trigger`, `.batch-search-panel`, `.filter-chip` |
| 筛选下拉 | `Select` | `.select-trigger`, `.select-menu`, `.select-option`；不使用原生 `<select>` |
| 店铺选择 | `StoreSelector` | `.store-trigger`, `.store-popover`, `.store-tree`, `.tree-node` |
| 高级筛选 | `AdvancedFilterPanel` | `.advanced-row` |
| 结果区 | `DataTablePanel` | `.table-panel`, `.status-tabs`, `table` |
| 流程演练 | `ContentPanel` + `FeedbackState` | `.flow-panel`, `.flow-steps`, `.toast`；弱视觉权重，不替代表格 |
| 详情 | `DetailDrawer` | `.detail-drawer` |
| 高风险确认 | `RiskConfirm` | `.risk-modal`, `.modal-mask` |
| 状态 | `StateSet` | `.tag`, `.tag-row` |
| 操作日志 | `OperationLog` | 抽屉内固定字段：操作人、操作类型、操作对象、操作详情、操作时间 |

## 本轮流程 demo

本轮在已有 OMS 页面内新增“订单履约链路”，用于点击验证主流程，而不是调试面板或角色/状态切换器。

| 步骤 | 订单状态 | 页面反馈 |
|------|----------|----------|
| 订单同步 | 待检测 | 样例订单进入 OMS，等待检测 |
| 检测完成 | 待审核 | 状态页签计数和表格状态同步更新 |
| 审核通过 | 待发货 | 订单进入待发货队列 |
| 生成包裹 | 待发货 | 生成 `PKG-MY-0512-016`，允许演练拦截确认 |
| 仓库交接 | 待发货 | 展示扫描、打包、交运前状态 |
| 发货完成 | 已发货 | 已发货计数增加，流程按钮进入完成态 |

高风险拦截链路：

- 仅在包裹生成后、发货完成前开放“申请包裹拦截”。
- 点击后打开 `RiskConfirm` 风格弹窗，展示操作对象、影响范围、可恢复性和操作结果。
- 确认后样例订单进入“异常 / 拦截申请中”，详情抽屉操作日志同步显示拦截记录。
- 真实拦截条件、失败原因和后置影响仍标注为待确认，不在原型中写成已确认规则。

## 反模式修复

| 原问题 | 修复 |
|--------|------|
| 可见的“UI 展示原型”提示像临时样例 | 已移除 |
| 店铺范围是普通输入框，不符合既有方案 | 改为固定层级 StoreSelector |
| 店铺控件误做成四列级联 | 改为历史模板要求的树形多选结构 |
| 大指标卡占据首屏，表格主任务弱 | 已删除展示型指标卡，保留列表页主结构 |
| 流程区像 demo 卡片 | 压缩为业务处理条，保留流程演练但降低视觉权重 |
| 顶部缺少正式 ERP 壳层元素 | 补齐折叠菜单、全局搜索、帮助、通知、头像和用户信息 |
| 原生下拉样式破坏 Ant 视觉 | 所有可见 `<select>` 替换为 Ant 风格自绘 Select |
| 批量搜索缺少输入和回显 | 新增 textarea 批量输入、数量识别和 chip 回显 |
| 状态页签未按 OMS 已确认状态覆盖 | 补全订单列表状态 |
| 表格右侧和头部出现裁切风险 | 主体禁止横向溢出，表格滚动限定在表格容器内 |
| 行内存在禁用“操作”按钮 | 只保留只读详情入口 |

## 原型边界

- 本原型展示 OMS 页面视觉、信息结构、只读详情链路和本地样例流程演练。
- 所有流程状态变化只发生在浏览器内存中，不连接真实接口，不提交真实审核、发货或拦截请求。
- 不包含真实删除、导出、批量处理、扣费、库存释放或物流下发。
- 不读取历史 `cases/**`。
