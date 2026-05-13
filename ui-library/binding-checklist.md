# Binding Checklist

原型交付前用这份清单逐项打勾——视频方法 Stage 6 Binding Check + Stage 7 90% Gate 的项目落地版。

只要任何一项不通过，就先修再交付。

## A · Foundation Tokens

- [ ] 已 `<link>` 引用 `ui-library/tokens.css`
- [ ] 页面里没有硬编码颜色（搜 `#fff`、`#000`、`#1677ff` 之外的字面色都应是从 var(--xxx) 来）
- [ ] 已声明主题模式（默认 `data-theme="default"`；按需求切 `dark/glass`）
- [ ] 字号只用 `--font-size-*` 体系，没有「随手 13px」
- [ ] 间距只用 4 的倍数（`--space-*`）
- [ ] 圆角不超过 `--radius-lg` (8px)

## B · Component Mapping

- [ ] 每个可见区块都能映射到 `components-index.md` 里的一个组件
- [ ] 没有自创的「半组件」——发现新模式先回 `components/` 沉淀，再来组装
- [ ] 同类元素（按钮、状态标签、表格、抽屉）在整个页面内的样式/类名一致
- [ ] 按钮语义使用 `color + variant`（`btn--solid/outlined/text/link` + `btn--color-*`），不回退成纯旧语义
- [ ] `PageHeaderBar / Actions` 是透明布局容器（无 fill/stroke/effect，padding=0，radius=0，hug contents）
- [ ] 新增 Auto Layout 外层容器不允许保留 Figma 默认 `100px` 固定宽度；必须显式 `HUG` 或设置业务宽度

## C · 源映射（来自 ui-interaction-spec §20.4 与 prototype-generation-guide §9.1）

- [ ] 当前存在正式 PRD 或经用户确认的页面清单
- [ ] 页面数量、模块结构都有需求依据，**没有自行新增页面**
- [ ] 每个可见的标题、说明文案、摘要卡、快捷操作都能回指到 PRD
- [ ] 没有混入「演示控件、调试面板、角色切换器、状态切换器」
- [ ] 「状态覆盖」「权限差异」体现在真实业务界面，不通过显式切换器暴露

## D · 状态覆盖

每个核心页面这 8 态各检查一次：

- [ ] 默认态
- [ ] 加载态（≥ 300ms 显示骨架屏或 Spin）
- [ ] 空状态（区分「暂无数据」和「筛选无结果」）
- [ ] 错误态（说明原因 + 建议动作 + 重试入口）
- [ ] 成功反馈态（Message / Notification / Result 三选一）
- [ ] 禁用态
- [ ] 无权限态（隐藏 vs 禁用 + 解释）
- [ ] 边界态（数据极多 / 字段极长 / 异常字符）

## E · 交互细节

- [ ] 删除有二次确认（`RiskConfirm`），文案说明对象 + 后果 + 可恢复性
- [ ] 关键操作的反馈中包含「撤回入口」或「不可撤回」说明
- [ ] 查阅优先使用抽屉而不是新页面
- [ ] 抽屉宽度约屏幕 2/3（`--layout-drawer-width: 67vw`）
- [ ] 表格行级操作 ≤ 3 个常驻项，多余的折叠到「更多」
- [ ] 批量操作只在勾选后出现（`BatchActionBar`）

## F · 视觉基线

- [ ] 3 秒内能识别出这是「中文 B 端 ERP 后台」，不是欧美 SaaS / 营销看板
- [ ] 没有大留白、大渐变、glass 玻璃感、装饰性背景
- [ ] 页面标题右上角动作区没有“额外白色小卡片”包裹
- [ ] 表格 / 筛选 / 抽屉 比 卡片 / 图表 视觉权重高
- [ ] 图标功能性、不花哨

## G · 浏览器验证（可选但强烈建议）

- [ ] 在 desktop 宽度（≥ 1280px）打开无横向滚动
- [ ] 右边缘没被截断、文字没被换行卡断
- [ ] 截图保存到 `prototype/<name>/screenshot.png`

## H · 操作日志（如涉及）

字段表必须**只增不删**地遵循 `erp-reference-patterns §7.5`：

- [ ] 列表字段只用：菜单 / 一级功能 / 二级功能
- [ ] 记录字段只用：操作人 / 操作类型 / 操作对象 / 操作详情 / 操作时间
- [ ] 没有新增模板外的列

## I · Figma 镜像一致性（新增）

- [ ] 当前任务引用了 Figma 库版本号（如 `v0.2.1`）
- [ ] 已优先读取 `knowledge/figma-component-registry.json`，没有默认全量读取 Figma 库
- [ ] Figma 有新增组件/约束修复时，`components-index.md` 已同步
- [ ] Figma 有 token 或主题变更时，`tokens.css` 与 `tokens.md` 已同步
- [ ] 本文件中的约束项与 Figma 最新修复一致（如动作区容器、Auto Layout 宽度约束）
- [ ] 仅在写入 Figma、版本变化、nodeId 失效、或用户明确要求检查 Figma 时调用 MCP
- [ ] 视觉截图验收未作为 Figma MCP 触发条件

## 一句话验收语

> "如果把这份原型直接发给一个新加入的研发，他能不能立刻按 PRD 跑下去，不需要再问我任何关于通用交互的问题？"
