# Product Manager AI Workflow

这是一个面向中文 B 端 ERP / 跨境电商 ERP 的产品经理 AI 工作流项目。它的目标不是“记录聊天”，而是把需求沟通、方案设计、PRD、UI 设计、原型输出、知识库、操作手册和 Codex 使用守护串成一条可重复执行的工作链。

这个仓库适合两类人：

- 产品经理：用它把需求从想法推进到 PRD、原型和知识库沉淀。
- 刚上手 vibe coding / Codex / GitHub 的同学：用 `$codex-checkpoint-guardian` 和 `$codex-workflow-guardian` 学会存档、回滚、分支、上下文治理和可追溯协作。

## 新手先记两个词

在开始让 AI 改文件前，先说：

```text
守护一下
```

当你觉得当前成果还不错，或者准备大改前，马上说：

```text
存档
```

`守护一下` 会检查当前分支、未提交改动和污染风险。`存档` 会把当前可用成果保存成 checkpoint。

即使你没有 GitHub，也可以用本地 Git commit 或本地快照保存。
如果你有 GitHub，checkpoint 还可以 push 到云端，方便找回、共享和 PR 审查。

## 你会怎么用

1. 新建对话后，先说清楚这次要做什么。
2. 如果是新需求，先做需求澄清与冻结事实，再进入 PRD。
3. 如果你已经有 PRD，再进入原型规划或原型生成。
4. 如果你要优化已有页面或原型，走 UI 优化流程。
5. 如果涉及代码、HTML、CSS、JS 改动，额外遵守编程规范 Skill。
6. 如果涉及文件修改、Git、分支、checkpoint、长对话或发布，先走 checkpoint / workflow guardian 预检。

## 给新同学的协作规则

本仓库采用“只读学习 + fork 后提 PR”的协作方式。

- 你可以 fork 本仓库到自己的 GitHub。
- 你可以修改 `knowledge/**`，补充业务知识、术语、流程和经验。
- 你不要直接修改 `skills/**`、`.codex/**`、`ui-library/**`、`prototype/**`、`.github/**` 等核心工作流文件。
- 如果你确实认为核心流程需要改，请先在 issue 或 PR 描述里说明原因，由维护者判断。
- Figma 组件库权限不在 GitHub 控制，由仓库维护者在 Figma 里单独授权。

第一次用 GitHub 的同学，可以先读 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 实际工作流

### 1. 任务分流

默认先判断用户意图，再决定使用哪个主入口：

- 新需求、竞品分析、产品方案、PRD、原型生成 -> `$erp-product-manager`
- UI 评审、原型优化、Ant Design 合规检查 -> `$ui-optimization-master`
- 代码生成、代码编辑、代码走查 -> `$karpathy-guidelines`
- 本地存档、Git checkpoint、GitHub 云端备份、回滚记录 -> `$codex-checkpoint-guardian`
- 分支溯源、上下文治理、任务交接、产品经理工作流风险提醒 -> `$codex-workflow-guardian`

### 2. 新需求流程

新需求不能直接跳到方案或 PRD，必须先完成这些步骤：

1. 需求澄清
2. 冻结事实
3. 信息缺口确认
4. 方案设计
5. 分阶段 PRD 输出
6. 用户确认后再决定是否进入原型

### 3. PRD / 原型流程

- 如果已有 PRD：先读 PRD，再做页面来源映射，再生成原型。
- 如果没有 PRD：先完成需求澄清和 PRD。
- formal prototype 里的每个导航、页签、按钮、摘要卡都必须能回指到 PRD 或用户确认需求。

### 4. UI 优化流程

- 先判断是否符合中文 B 端 ERP 后台风格。
- 优先检查结构、信息密度、组件选择、状态覆盖和风险操作。
- 再看视觉 polish，不先做“好看”，先做“对路”。

### 5. 长对话与记忆

- `task_plan.md`：当前任务阶段、目标、状态
- `findings.md`：当前任务中的发现、来源映射、临时判断
- `progress.md`：当前任务的修改记录和验证结果
- `knowledge/`：长期稳定的用户偏好、公司背景、自研 ERP 约束、设计口味和术语
- `cases/<case-name>/`：独立案例资产，和主线隔离

### 6. 案例边界

- 新任务默认不读取历史 `cases/**`
- 只有你明确说“继续某个案例”或“参考历史案例”时，才读对应案例
- 退款管理这类具体项目只保存在 `cases/<case-name>/`，不回流到主线

## 目录说明

- `AGENTS.md`
  项目级最小路由说明。
- `skills/erp-product-manager/`
  产品经理 AI 工作流 Skill 源文件。
- `skills/ui-optimization-master/`
  UI 优化大师 Skill 源文件。
- `skills/karpathy-guidelines/`
  编程规范 Skill 源文件。
- `skills/codex-workflow-guardian/`
  Codex 分支溯源、checkpoint、上下文治理、Stop Gate 和使用提醒 Skill 源文件。
- `skills/codex-checkpoint-guardian/`
  通用 vibe coding 存档、Git checkpoint、本地快照、GitHub 云端备份和回滚记录 Skill 源文件。
- `.codex/`
  planning-with-files hooks 和 workspace Skill，用于自动恢复和维护任务记忆。
- `skills/shared/context-memory-workflow.md`
  长上下文工作记忆规则，把 planning-with-files 方法接入 PM / UI 工作流。
- `knowledge/`
  长期知识库，沉淀用户偏好、公司背景、自研 ERP 信息和设计口味。
- `START_HERE.md`
  新用户第一入口。
- `intake/prd/`
  主线 PRD 临时入口。
- `cases/<case-name>/`
  独立案例目录。
- `prototype/`
  主线原型临时输出目录。

## Skill 安装位置

本项目已安装 Skill 到：

- `/Users/freddy/.codex/skills/erp-product-manager`
- `/Users/freddy/.codex/skills/ui-optimization-master`
- `/Users/freddy/.codex/skills/karpathy-guidelines`
- `/Users/freddy/.codex/skills/codex-checkpoint-guardian`
- `/Users/freddy/.codex/skills/codex-workflow-guardian`

详细规则见各自 `SKILL.md`。

## 最后一句

如果你不知道从哪里开始，先看 `START_HERE.md`。  
如果你要做具体任务，直接告诉我“这是新需求 / 竞品分析 / 现有 PRD 出原型 / UI 优化 / 代码修改”，我会按对应流程接。

## 更新日志

| 日期 | 更新内容 | 原因 |
|---|---|---|
| 2026-05-16 | 新增店铺管理「新增页+编辑页」统一 PRD（10 节结构）；新增「可维护枚举值选择器」组件交互规范 | Figma AI 生成的新增页字段与编辑页不一致，需用 PRD 统一字段定义与交互规范 |

## License

MIT License. 见 [LICENSE](LICENSE)。
