# Tokens 说明

`tokens.css` 是本库 Foundation，组件只能消费 token，不允许在组件里硬编码新色值。

## 当前版本（v0.2）

- 对齐 Ant Design Pro v6：主题模式支持 `Default / Dark / Glass`
- 按钮语义升级：`color + variant`（保留旧类名兼容）
- 保持中文 B 端 ERP 密度和节奏

## 主题模式映射

| 模式 | 入口 | 用途 |
|---|---|---|
| Default | `:root` / `[data-theme="default"]` | 常规 ERP 页面 |
| Dark | `[data-theme="dark"]` | 夜间运营与监控 |
| Glass | `[data-theme="glass"]` | Pro v6 玻璃主题预览 |

## 与 Ant Design v6 / Pro v6 对齐

| 语义 | tokens.css | 对齐点 |
|---|---|---|
| 主色 | `--color-primary-6: #1677ff` | `colorPrimary` |
| 语义色 | `success/warning/error` | 状态语义稳定 |
| 文本层级 | `text/secondary/tertiary/disabled` | 信息层级一致 |
| 背景层级 | `layout/container/spotlight` | 布局层级一致 |
| 圆角 | `--radius-sm/--radius/--radius-lg` | 4-8px，ERP 合规 |
| 按钮语义 | `.btn--solid/.btn--outlined/.btn--text/.btn--link` + `.btn--color-primary/.btn--color-danger` | v6 `variant + color` |

## 布局与密度基线

| 规范 | 变量 |
|---|---|
| 侧边栏 200/64 | `--layout-sider-width`, `--layout-sider-collapsed-width` |
| 顶栏 56 | `--layout-header-height` |
| 面包屑 40 | `--layout-breadcrumb-height` |
| 页面 padding 24 | `--layout-page-padding`, `--space-6` |
| 模块间距 16/24 | `--space-4`, `--space-6` |

## 约束（防偏移）

1. 只增不删 token；改值不改名。
2. 组件层不得新建裸颜色、裸阴影、裸圆角。
3. `PageHeader` 动作区必须透明容器（无 fill/stroke/effect），不能做成卡片。

## Changelog

- 2026-05-12 · v0.1 初版，对齐 Ant Design v5
- 2026-05-13 · v0.2 升级到 Pro v6 主题模式与按钮语义，补充动作区容器约束
