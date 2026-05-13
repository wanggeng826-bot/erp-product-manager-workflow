# Tokens 说明

`tokens.css` 是这个 UI 库的「Foundation」——所有组件颜色、间距、字号、状态都从它取。
任何原型只要在头部加上一行 `<link rel="stylesheet" href="../ui-library/tokens.css">`，CSS 变量就立刻可用。

## 为什么独立成文件

视频方法（`skills/ui-optimization-master/references/ant-design-video-workflow.md`）的 Stage 1 明确要求把 token 作为「输入包」的一部分先确认下来，避免出现「页面写好后才发现颜色对不上 Ant Design」。

把它独立成文件还有两个好处：

1. **修改一处，所有原型自动跟随**。比如以后 Ant 升级了主色到 `#0958d9`，只需要改一个变量。
2. **原型评审有客观依据**。`prototype-quality-gate.md` 里要求「token 一致性」可以直接对照本文件检查。

## 与 Ant Design v5 默认主题的关系

| Token | tokens.css | Ant Design v5 | 备注 |
|---|---|---|---|
| 主色 | `--color-primary-6: #1677ff` | `colorPrimary: #1677ff` | 完全一致 |
| 成功 | `--color-success: #52c41a` | `colorSuccess: #52c41a` | 完全一致 |
| 警告 | `--color-warning: #faad14` | `colorWarning: #faad14` | 完全一致 |
| 错误 | `--color-error: #ff4d4f` | `colorError: #ff4d4f` | 完全一致 |
| 文本主 | `rgba(0,0,0,0.88)` | `colorText` | 完全一致 |
| 文本次 | `rgba(0,0,0,0.65)` | `colorTextSecondary` | 完全一致 |
| 圆角 | `--radius: 6px` | `borderRadius: 6` | 一致；ERP 面板可上调到 8px |
| 页面背景 | `#f5f7fa` | `colorBgLayout: #f5f5f5` | 微调更冷，与 chinese-b-end-erp-visual-baseline 保持一致 |

## 与项目「视觉基线」的对齐

`chinese-b-end-erp-visual-baseline.md` 明确：

- 浅灰背景（`#f5f7fa` / `#f7f8fa`）→ `--color-bg-layout: #f5f7fa`
- 白色面板 + 弱阴影 → `--color-bg-container: #ffffff` + `--shadow-1`
- 字号 18-20 / 14 / 12-13 → `--font-size-xl/2xl` + `--font-size` + `--font-size-xs/sm`
- 圆角 4-8px → `--radius-sm: 4px` / `--radius: 6px` / `--radius-lg: 8px`

## 与「ERP 参考模式补充规范」的对齐

`erp-reference-patterns.md` 给出的尺寸都已落到变量：

| 规范 | 变量 |
|---|---|
| 侧边栏 200/64 | `--layout-sider-width`, `--layout-sider-collapsed-width` |
| 顶部栏 64 | `--layout-header-height` (调整为 56，与近期 Ant ERP 收紧值一致) |
| 面包屑 48 | `--layout-breadcrumb-height` (调整为 40) |
| 页面 padding 24 | `--layout-page-padding`, `--space-6` |
| 同级卡片 16 | `--space-4` |
| 模块间 24 | `--space-6` |

> 注：顶栏 56 / 面包屑 40 是与 Ant Pro 实际产品常见取值对齐的微调，如与某具体页面冲突，可在该页面 inline override。

## 修改原则

1. **只增不删**：组件可能在引用某个变量，删除会立刻断链
2. **改值不改名**：调主色就改 `#1677ff` → 新值，但变量名 `--color-primary-6` 保持
3. **变更必登记**：在本文件最下方追加 changelog

## Changelog

- 2026-05-12 · 初版（v0.1）从视频方法的 Stage 2 Token 表落地，对齐 Ant Design v5
