# 产品经理工作流

本文件是当前项目的主入口总文件。它负责把新对话中的所有任务路由到正确流程，并定义主线项目与独立案例的边界。

## 1. 项目目标

本项目用于承接产品经理的多场景工作流，包括：

- 新需求方案与 PRD
- 竞品分析
- 基于 PRD 生成 HTML 可交互原型
- 日常讨论 / 评审 / 修改

项目主线只承载通用工作流与通用规范。具体案例应独立归档，不污染主线目录。

## 2. 新对话启动规则

每次进入这个项目的新对话时，默认先执行以下流程：

1. 先用一句简短欢迎语说明当前项目可基于规范生成 PRD 或可交互原型
2. 第一优先级先询问用户是否已经有 PRD 文档
3. 如果用户已有 PRD：
   - 请用户直接上传 PRD 文件，或提供 PRD 在项目中的文件路径
4. 如果用户没有 PRD：
   - 先基于现有规范帮助用户整理需求并生成 PRD
5. 一旦拿到 PRD：
   - 先读取规范文件，再读取 PRD，然后直接开始生成原型

## 3. 默认欢迎语

可自然转述，含义如下：

“这个项目已经配置好产品经理工作流。你这次主要想做哪类事情：新需求方案与 PRD、竞品分析、基于 PRD 生成原型，还是日常讨论？如果你已经有 PRD，也可以直接上传文件或给我路径，我会读取规范后开始生成原型。”

## 4. 主线工作流顺序

### 4.1 新需求方案与 PRD

读取以下文件后执行：

- `docs/ui-system/跨境电商IT产品专家（用于新需求方案输出）.md`
- `docs/workflows/new-requirement-flow.md`
- `docs/prompts/new-requirement-prompt-template.md`
- `docs/templates/prd-template.md`
- `docs/ui-system/ui-interaction-spec.md`
- `docs/ui-system/erp-reference-patterns.md`

输出要求：

- 先对齐背景、目标、用户、问题、约束和边界
- 再输出方案和 PRD
- PRD 完成后，必须询问用户是否继续生成原型

### 4.2 竞品分析

读取以下文件后执行：

- `docs/ui-system/竞品分析&产品专家（用于竞品分析及 PRD方案输出）.md`
- `docs/workflows/competitor-analysis-flow.md`
- `docs/prompts/competitor-analysis-prompt-template.md`
- `docs/ui-system/ui-interaction-spec.md`
- `docs/ui-system/erp-reference-patterns.md`

输出要求：

- 先明确竞品对象、分析目标、分析维度和输出形式
- 产出竞品分析结果
- 之后询问用户是否继续转产品方案 / PRD / 原型

### 4.3 基于 PRD 生成原型

读取以下文件后执行：

- `docs/workflows/prd-to-prototype-flow.md`
- `docs/prototype-generation-guide.md`
- `docs/ui-system/ui-interaction-spec.md`
- `docs/ui-system/erp-reference-patterns.md`
- `docs/templates/prototype-template.md`

输出要求：

- 先让用户上传 PRD 文件，或提供 PRD 路径
- 读取 PRD 后，按规范生成 HTML 可交互原型

### 4.4 日常讨论 / 评审 / 修改

读取以下文件后执行：

- `docs/workflows/daily-communication-flow.md`

输出要求：

- 以问题解决和交流为主
- 不强制进入 PRD 或原型工作流
- 仅当用户明确要求时，再进入结构化产出

## 5. 通用规范

开始任何 PRD 或原型工作前，优先读取以下文件：

- `docs/ui-system/ui-interaction-spec.md`
- `docs/ui-system/erp-reference-patterns.md`

如任务涉及模板，还需参考：

- `docs/templates/prd-template.md`
- `docs/templates/prototype-template.md`

## 6. 原型生成要求

生成原型时默认遵循以下规则：

- 使用 Ant Design 风格
- 严格遵循 UI 主规范与 ERP 补充规范
- 操作尽量少跳转
- 查看优先抽屉
- 抽屉默认占屏幕约 2/3
- 字段少的新建优先弹窗
- 字段多的新建优先抽屉
- 删除必须二次确认
- 重要操作必须可撤回或明确不可撤回
- 权限差异必须体现到按钮可见性、可操作性和只读状态
- 页面要补齐默认态、加载态、空状态、错误态、成功反馈态、禁用态

## 7. 操作日志硬约束

凡是涉及操作日志的 PRD、原型、页面说明或交互说明，必须遵循既有模板：

- 只能删减，不能新增
- 不能新增模板外字段
- 不能改变模板字段原意

## 8. 案例隔离规则

独立案例应进入单独目录，不得写回主线目录。

建议统一放到：

- `cases/<case-name>/`

## 9. PRD 入口约定

主线 PRD 优先放入：

- `intake/prd/`

独立案例 PRD 优先放入对应案例目录，例如：

- `cases/<case-name>/intake/prd/`

## 10. 原型输出约定

主线 HTML 原型默认输出到：

- `prototype/`

独立案例原型优先输出到对应案例目录，例如：

- `cases/<case-name>/prototype/`

## 11. 新对话推荐启动词

```text
请按当前项目工作流开始。
先判断我这次是新需求方案、竞品分析、已有 PRD 生成原型，还是日常讨论。
如果我已经有 PRD，请先让我上传文件或提供路径，然后读取规范并生成 HTML 可交互原型。
如果我还没有 PRD，请先帮我整理需求并输出 PRD。
```
