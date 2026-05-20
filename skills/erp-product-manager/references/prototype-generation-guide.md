# Prototype Generation Guide

## 1. 目的

本文件用于说明：在新建对话中，如何让 Codex 读取当前项目的 UI 规范与 PRD，并基于这些要求生成 HTML 可交互原型。

本项目强制 **HTML First**：先生成 HTML 可交互原型给用户确认；只有用户确认 HTML 无误，并明确发出“生成 UI 设计稿 / 生成 Figma 设计稿 / 去 Figma 创建”的指令后，才允许创建 Figma UI 设计稿。除此以外不创建 Figma UI 设计稿。

本指南适用于以下场景：

- 已有 PRD，希望直接生成可点击原型
- 希望所有原型统一输出到固定目录
- 希望后续每次新对话都能稳定复用同一套提示方式

## 2. 固定文件与目录

生成原型前按 router 决定读取范围：

- `skills/workflow-strategy-router/SKILL.md`（必先读）
- `references/prototype-template.md`
- `references/chinese-b-end-erp-visual-baseline.md`
- `references/ui-interaction-spec.md`
- `references/erp-reference-patterns.md`

只有 router 判定为 `prototype-final` 或 `ui-review` 时，才额外读取：

- `skills/ui-optimization-master/references/ai-ui-production-workflow.md`
- `skills/ui-optimization-master/references/erp-ui-pattern-library.md`
- `skills/ui-optimization-master/references/erp-design-system-checklist.md`
- `skills/ui-optimization-master/references/erp-ui-anti-pattern-catalog.md`

默认输出到：

- `prototype/`

## 3. 生成原型的标准流程

每次新对话中，默认按以下顺序执行：

1. 先运行 router，锁定 `prototype-draft` 或 `prototype-final`
2. 读取最小必需规范和 PRD 文件
3. 先确认页面清单、主任务、交付边界，并生成原型任务单
4. 生成页面来源映射
5. 建立设计基础映射：颜色、字体、间距、圆角、边框、阴影、状态语义
6. 建立组件映射：壳层、标题区、筛选区、表格区、批量操作、抽屉、弹窗、状态、权限、日志
7. 拆解主流程、弹窗、抽屉、状态与权限差异
8. 校验每个可见元素是否能回指到 PRD 或已确认需求
9. 生成 HTML 可交互原型
10. 若为 `prototype-draft`，只做忠实性检查和最小自检
11. 若为 `prototype-final`，再按反模式清单和质量门禁做正式修正
12. 将原型文件输出到固定目录

补充规则：

- 如果没有正式 PRD，先生成 PRD，再生成原型。
- “原型”默认指 HTML 可交互原型，不等于 Figma UI 设计稿。
- 未经用户确认 HTML 原型无误，并明确要求生成 Figma/UI 设计稿，不得创建 Figma 文件或写入 Figma 画布。
- 未经 PRD 或用户明确确认，不得自行扩展页面数量或模块结构。
- 未经页面来源映射确认，不得加入新的导航项、页签、摘要卡、快捷操作或模块标题。
- 默认首次输出是原型初稿，不要自动进入正式 UI 审查。
- 正式交付版必须由 router 明确判定为 `prototype-final`。

## 4. 新对话的标准提示词

```text
请先读取当前项目中的 router 和最小 UI 设计规范文件：
0. skills/workflow-strategy-router/SKILL.md
1. references/chinese-b-end-erp-visual-baseline.md
2. references/ui-interaction-spec.md
3. references/erp-reference-patterns.md

再读取这份 PRD：
/你的PRD文件路径

然后基于这些规范，为我生成一套 HTML 可交互原型。
要求：
1. 使用 Ant Design + 中文 B 端 ERP 后台风格
2. 严格遵循现有 UI 规范和操作日志规范
3. 先输出原型任务单、页面来源映射和组件映射，再生成页面
4. draft 阶段只做忠实交付和最小自检，不进入正式 UI 审查
5. 尽量少跳转，查看优先抽屉，字段少新建用弹窗，字段多用抽屉
6. 原型需要可点击
7. 输出到 prototype/
8. 不创建 Figma UI 设计稿；等我确认 HTML 后，再根据我的明确指令进入 Figma
```

## 5. 你给我的输入建议

为了让我生成得更快更准，PRD 最好至少包含以下内容：

- 功能目标
- 页面清单
- 页面之间的跳转关系
- 哪些页面有弹窗、抽屉、详情查看
- 角色与权限差异
- 状态说明
- 边界情况

如果 PRD 里没写完整，我会优先按现有 UI 规范补齐默认交互。

但补齐默认交互不等于允许擅自扩展正式页面结构。没有来源的新增模块、说明文案、快捷操作、摘要卡和导航，不得进入交付物。

## 6. 我默认会遵守的交互规则

只要你没有额外说明，我生成原型时会默认遵循以下规则：

- 使用 Ant Design 风格
- 默认只生成 HTML 可交互原型；HTML 未经用户确认前，不创建 Figma UI 设计稿。
- 使用中文 B 端 ERP 后台风格，不使用欧美 SaaS、营销看板或演示型 dashboard 风格
- 默认采用左侧导航、顶部栏、面包屑、紧凑标题区、浅灰背景、白色面板、中高信息密度
- ERP 顶部栏默认包含折叠/菜单入口、系统/模块名、可选全局搜索、帮助、通知、用户头像/姓名，不生成只有一个标题的空顶栏
- 列表页优先三段式结构：标题区、筛选区、表格区
- 正式原型必须先有页面来源映射和组件映射
- 复用 ERP 公共组件库中的筛选、表格、批量操作、抽屉、弹窗、状态、日志、导入、店铺选择和报表时间控件
- 操作尽量少跳转
- 查看优先抽屉
- 抽屉默认占屏幕约 2/3
- 字段少的新建优先弹窗
- 字段多的新建优先抽屉
- 删除必须二次确认
- 重要操作必须有可撤回或明确不可撤回提示
- 权限不同的角色可见按钮和可操作范围不同
- 页面要补齐默认态、加载态、空状态、错误态、成功反馈态、禁用态
- “补齐状态”指原型设计需要覆盖这些状态，不代表要在正式页面中提供状态切换控件
- 正式页面中不得出现演示控制区、角色切换器、页面状态切换器、重置演示按钮或其他调试面板
- 正式列表页不要把“样例流程”“运行下一步”“重置流程”等演示模块放在表格前；确需演示流程时，应独立 demo、折叠、下沉，或设计成真实业务进度组件
- HTML 原型不得使用可见原生 `<select>` 作为正式筛选控件；需要用 Ant 风格 Select 触发器和下拉面板，避免截图出现浏览器默认下拉样式
- 交付前必须运行 `npm run check:prototype`。该检查是硬门禁：若存在可见原生 `<select>`、页面级横向滚动、宽表未限制在 `.table-wrap` 内滚动、店铺别名列未固定，则不得交付原型。
- 批量搜索必须支持点击展开矩形 textarea，按换行、英文逗号、中文逗号识别输入，输入时展示识别数量，应用后用 chip 回显已生效条件
- 状态与权限差异要体现在真实业务界面本身，不通过显式切换器暴露给业务用户
- 如需做演示版，必须单独输出，与正式版原型分开

## 6.1 Figma 设计稿创建门禁

只有同时满足以下条件，才允许进入 Figma：

1. 已存在 HTML 原型文件，并已交付给用户查看。
2. 用户明确确认 HTML 原型内容无误或要求按当前 HTML 版本定稿。
3. 用户明确发出生成 UI 设计稿、生成 Figma 设计稿、去 Figma 创建等指令。

不满足时：

- 不调用 Figma create/write 类工具。
- 不创建新的 Figma 文件。
- 不把“原型图”“交互原型”“画原型”理解为 Figma 设计稿。
- 如用户只说“生成原型”，默认输出 HTML 到 `prototype/<module-name>/`。

## 7. 原型输出建议

为了后续维护更清晰，建议每次原型至少包含以下文件：

- `index.html`
- `styles.css`
- `script.js`

如果页面较多，可以按模块拆目录，例如：

- `prototype/order-management/`
- `prototype/<module-name>/`
- `prototype/inventory-management/`

### 7.1 原型发布到 GitHub Pages（必做）

**每次生成原型后，必须同步发布到 GitHub Pages，提供可访问的在线地址。**

发布流程：

1. 确保原型目录包含 `index.html`，且所有资源路径为相对路径（如 `./styles.css`、`./ui-library/tokens.css`）。
2. 切到 `gh-pages` 分支：`git checkout gh-pages`
3. 将原型文件复制或移动到 `prototype/<module-name>/` 目录
4. 如果原型引用了 `../../ui-library/tokens.css`，需复制一份 `tokens.css` 到原型目录内，并修正路径为 `./ui-library/tokens.css`
5. 提交并推送：`git add . && git commit -m "add prototype: <module-name>" && git push origin gh-pages`
6. 等待 1-2 分钟自动部署
7. 向用户返回访问地址：
   ```
   https://wanggeng826-bot.github.io/erp-product-manager-workflow/prototype/<module-name>/
   ```

**注意**：
- `gh-pages` 分支只用于托管静态页面，不要在上面做开发
- 如果 `ui-library/tokens.css` 有更新，需要同步复制到各原型目录
- 所有原型必须能通过上述 URL 直接访问，不能只提供本地文件路径

## 8. 原型命名建议

建议按功能模块命名原型目录：

- `order-list-prototype`
- `module-name-prototype`
- `product-import-prototype`

若是版本迭代，可加版本后缀：

- `order-list-prototype-v1`
- `order-list-prototype-v2`

## 9. 当 PRD 不完整时的默认处理

如果 PRD 缺少部分细节，我会按以下优先级补足：

1. 现有 UI 主规范
2. ERP 参考模式补充规范
3. Ant Design 常见后台心智
4. 最小惊讶原则

这意味着：我会优先保持一致，而不是为了“看起来更炫”去发明新的交互模式。

但有两个例外不能擅自补：

- 不能擅自新增页面数量、页面组合关系或模块结构。
- 不能擅自加入任何用于演示、调试、状态切换、角色模拟的页面内控件。
- 不能在没有来源映射的情况下补出新的导航项、页签、摘要卡、快捷操作或页面说明文案。

## 9.1 交付前检查清单

每次输出正式原型前，至少检查以下问题：

- 当前是否存在正式 PRD；若没有，是否已先产出 PRD
- 当前页面数量、页面关系、模块结构，是否都有明确需求依据
- 当前页面来源映射是否完整，页面上的每个可见元素是否能回指到 PRD 或确认需求
- 页面标题、说明文案、摘要卡片，是否来自已确认需求，而不是模型自行补充
- 页面中的导航项、页签、快捷操作，是否都能在 PRD 或已确认需求中找到来源
- 正式页面内是否混入演示控件、调试面板、角色切换器、状态切换器
- 是否把“状态覆盖”“权限差异”错误实现成页面内可切换控件
- 是否存在重复标题区、重复概述区、重复操作区
- 是否仍符合正式交付版，而不是演示版
- 是否符合中文 B 端 ERP 后台风格，而不是欧美 SaaS 或营销看板风格
- 是否有 foundation token 一致性：颜色、字体、间距、圆角、边框、阴影、状态语义
- 是否有组件复用一致性：同类筛选、表格、抽屉、弹窗、按钮、标签、反馈不应各自为政
- **是否已发布到 GitHub Pages 并提供在线访问地址**
- **在线地址是否能正常打开，资源（CSS/JS/图片）是否加载正常**

如任一项不满足，应先修正再交付。

## 10. 典型使用方式

### 10.1 你已经有 PRD

直接在新对话里发标准提示词，并附 PRD 路径。

### 10.2 你只有需求，还没有 PRD

先让我基于规范生成 PRD，再继续生成原型。

推荐提示词：

```text
请先读取当前项目 UI 规范，基于以下需求先生成 PRD，再继续生成 HTML 可交互原型。
```

### 10.3 你只想更新已有原型

推荐提示词：

```text
请读取当前项目规范和已有原型目录，再根据最新 PRD 增量更新原型，不要推翻原有结构。
```

## 11. 一句话版本

如果你想最省事，后续新对话直接发这句即可：

```text
请读取当前项目 UI 规范和这份 PRD，并在 prototype/ 中生成一套遵循现有规范的 HTML 可交互原型。
```
