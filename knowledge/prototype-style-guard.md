# Prototype Style Guard · 原型风格守门

> 目标：消除不同大模型生成原型时的 UI 风格漂移。

## 问题定义

在同一套产品经理 AI 工作流下，Claude / GPT / 其他模型生成的 HTML 原型存在以下风格差异：

| 漂移维度 | 典型表现 | 严重程度 |
|---|---|:---:|
| 主色调 | `#3B82F6` (Tailwind) vs `#1677ff` (Ant Design) | 🔴 高 |
| 背景色 | `#F8FAFC` vs `#f5f7fa` | 🟡 中 |
| 阴影系统 | `--shadow-sm/md/lg` vs `--shadow-1/2` | 🟡 中 |
| 圆角值 | `12px` vs `8px` | 🟡 中 |
| 壳层组件 | `.top-nav + .sidebar` vs `.c-shell` vs `.erp-shell` | 🟡 中 |
| 字体栈 | 缺失 `BlinkMacSystemFont` 或顺序不同 | 🟢 低 |
| 控件基础类 | `tag--processing` 没有 `.tag`，裸 `button` 显示浏览器默认样式 | 🔴 高 |

## 根因分析

### 根因 1：tokens.css 引入不强制

- `salesperson-management` 原型**完全没有引入** `ui-library/tokens.css`，自行定义了 `:root` 变量。
- 其他原型有的用相对路径 `../../ui-library/tokens.css`，有的复制到本地 `./tokens.css`。
- 模型在生成时，如果未明确指定路径，会自行"发明"一套颜色系统。

### 根因 2：组件复用流于纸面

`prototype-generation-guide.md` 要求：
> "复制 ui-library/components/*.html 直接拼装 prototype"

实际执行：
- 每个原型都是模型**重新手写**壳层、标题区、筛选区、表格等组件。
- 类名各自为政：`.c-shell__sider`、`.erp-shell`、`.top-nav + .sidebar`
- 导致同功能组件的 padding、border、shadow、hover 状态不一致。

### 根因 3：模型训练数据的风格偏好

| 模型 | 风格偏好 | 具体表现 |
|---|---|---|
| GPT-4o / o3 | 偏向 Tailwind / 现代 SaaS | `#3B82F6`、更大的圆角、更亮的背景 |
| Claude | 偏向标准 Ant Design | `#1677ff`、紧凑布局、 subdued 阴影 |
| 其他 | 依赖 prompt 中的示例 | 容易复制 prompt 里的第一个示例风格 |

**关键洞察**：模型不会"主动"知道项目用的是 `#1677ff` 而不是 `#3B82F6`，除非在 prompt 中**显式禁止**后者。

### 根因 4：缺少预提交自动化检查

- 原型生成后直接 push 到 `gh-pages`，没有脚本检查颜色、间距、类名是否符合规范。
- 人眼很难在代码层面发现 `#F8FAFC` 和 `#f5f7fa` 的差异。

### 根因 5：Prompt 缺少"禁止值"清单

现有 prompt 只说了"使用 Ant Design 风格"，但没有：
- 列出禁止使用的颜色值
- 列出必须使用的 CSS 变量名
- 要求类名前缀统一

---

## 解决方案（三层防御）

```
┌─────────────────────────────────────────────────────────────┐
│ 第一层：Prompt 加固（生成前）                                  │
│  ├─ 必须使用 tokens.css                                      │
│  ├─ 禁止颜色值清单                                           │
│  ├─ 必须类名前缀                                             │
│  └─ 组件复用检查清单                                         │
├─────────────────────────────────────────────────────────────┤
│ 第二层：自动化检查（生成后）                                   │
│  ├─ scripts/prototype-style-guard.js                         │
│  ├─ 检查颜色、间距、类名、阴影                                 │
│  └─ CI / 本地预提交钩子                                       │
├─────────────────────────────────────────────────────────────┤
│ 第三层：人工审查（发布前）                                     │
│  ├─ $ui-optimization-master 正式 UI 审查                      │
│  └─ 设计系统检查清单逐项核对                                   │
└─────────────────────────────────────────────────────────────┘
```

### 第一层：Prompt 加固

在原型生成提示词中**强制追加**以下段落：

```text
【风格硬约束 — 违反则退回修正】

1. 必须引入：`<link rel="stylesheet" href="../../ui-library/tokens.css">`
   - 禁止自行定义 :root 颜色、间距、圆角、阴影变量
   - 禁止使用任何不在 tokens.css 中的颜色值

2. 禁止颜色值（模型常错用）：
   - ❌ #3B82F6, #2563EB, #1D4ED8（Tailwind 蓝系）
   - ❌ #6366F1, #4F46E5（Indigo 系）
   - ❌ #10B981（Emerald 绿作为主色）
   - ✅ 主色必须使用 var(--color-primary-6) = #1677ff
   - ✅ 背景必须使用 var(--color-bg-layout) = #f5f7fa

3. 必须从 ui-library/components/ 复制以下组件：
   - erp-shell.html → 壳层（禁止自行手写）
   - page-header-bar.html → 标题区
   - 其他按需复制

4. 类名前缀统一：
   - 壳层：c-shell__*
   - 页面标题：c-page-header__*
   - 按钮：btn, btn--primary, btn--sm
   - 禁止 invent 新前缀如 .erp-shell、.top-nav
   - 状态标签必须使用 `.tag + .tag--*`，禁止只写 `tag--processing` / `tag--default`
   - 平台、渠道、状态等短枚举切换必须映射为 `Segmented` / `Radio.Group` / 明确的 tag group，禁止裸 button 默认样式

5. 检查项（交付前自检）：
   - [ ] tokens.css 已引入
   - [ ] 无禁止颜色值硬编码
   - [ ] 壳层来自 erp-shell.html
   - [ ] 无原生 <select> 作为正式控件
   - [ ] 无 `tag--*` 缺少 `.tag` 基础类
```

### 第二层：自动化检查

见 `scripts/prototype-style-guard.js`。

运行方式：
```bash
node scripts/prototype-style-guard.js prototype/ai-workspace-v2/
```

检查维度：
1. **颜色守门**：扫描 CSS/内嵌 style，发现禁止颜色值则报错
2. **Token 引入检查**：确认 HTML 中引用了 tokens.css
3. **类名一致性**：检查壳层类名是否符合规范
4. **原生 select 检查**：发现正式页面中的 `<select>` 标签则报错
5. **Tag 基础类检查**：发现 `tag--default`、`tag--processing` 等状态类缺少 `.tag` 基础类则报错

### 第三层：人工审查

`$ui-optimization-master` 正式 UI 审查时，增加"跨原型一致性"检查项：

- 同一项目内的不同原型，壳层结构、颜色、间距、圆角是否一致
- 同类控件是否都能映射到 PRD §10 UI 设计契约和组件映射表
- 是否存在裸控件、浏览器默认控件外观、缺失基础类的状态标签
- 若不一致，标记为「明显偏离」级别，必须统一后才能定稿

---

## 现有原型修复优先级

| 原型 | 问题 | 修复动作 |
|---|---|---|
| `salesperson-management` | 无 tokens.css，Tailwind 色系 | 🔴 P0：引入 tokens.css，替换颜色变量 |
| `ai-workspace-v2` | 壳层类名 `.c-shell__*` 与 OMS 不一致 | 🟡 P1：统一为 `.c-shell__*` 或 `.erp-shell` |
| `oms-system` | 壳层类名 `.erp-shell` 与 ai-workspace 不一致 | 🟡 P1：统一壳层类名 |
| `oms-router-demo` | 同 oms-system | 🟡 P1：同 oms-system |

---

## 决策记录

- **壳层类名统一决策**：`ai-workspace-v2` 使用的 `.c-shell__*` 前缀与 `ui-library/components/erp-shell.html` 一致，以此为准。OMS 系列后续迁移。
- **背景色决策**：统一使用 `#f5f7fa`（Ant Design 默认布局背景），放弃 `#F8FAFC`。
- **主色决策**：统一使用 `#1677ff`（Ant Design 默认主色），放弃所有 Tailwind 蓝。
