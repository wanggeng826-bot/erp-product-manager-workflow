# 项目说明

本项目是产品经理 AI 工作流。所有 PM / PRD / 原型 / UI / workflow 任务，先经过 `$workflow-strategy-router`，再进入领域 Skill。

本文件只保留最小路由信息：

- 前置调度：新需求、PRD、原型生成、UI 评审、工作流改造、长任务续跑，先使用 `$workflow-strategy-router`
- 新需求、竞品分析、方案、PRD、原型生成由 `$erp-product-manager` 执行，但必须服从 router 的 task tier / delivery mode / blocked actions
- UI 评审、原型优化、Ant Design 合规检查由 `$ui-optimization-master` 执行，但只在 router 判定为 `ui-review` 或 `prototype-final` 时进入正式审查
- 代码生成、代码编辑、代码走查优先使用 `$karpathy-guidelines`
- 本地存档、Git checkpoint、GitHub 云端备份、回滚记录优先使用 `$codex-checkpoint-guardian`
- 分支溯源、checkpoint、上下文过长、任务交接、Codex 使用风险提醒优先使用 `$codex-workflow-guardian`
- Skill 源文件在 `skills/workflow-strategy-router/SKILL.md`、`skills/erp-product-manager/SKILL.md`、`skills/ui-optimization-master/SKILL.md`、`skills/karpathy-guidelines/SKILL.md`、`skills/codex-checkpoint-guardian/SKILL.md` 和 `skills/codex-workflow-guardian/SKILL.md`
- 本项目启用 `.codex/` 的 planning-with-files hooks，用于长对话的任务计划、发现和进度维护
- 复杂 PM / UI 任务的长上下文执行规则见 `skills/shared/context-memory-workflow.md`
- 长期用户偏好、公司背景、自研 ERP 信息沉淀到 `knowledge/`
- 新任务默认不读取历史 `cases/**`；只有用户明确要求继续或参考某个案例时，才读取该案例内容
- 主线只承载通用工作流
- 退款管理等具体案例放到 `cases/<case-name>/`

强规则：

- 未经 `$workflow-strategy-router` 分流，不允许直接进入 PM / PRD / prototype / UI review 全流程
- 原型初稿默认是 `prototype-draft`，只做忠实交付和最小自检，不自动进入正式 UI 审查
- 只有 router 判定为 `prototype-final` 或 `ui-review`，才允许正式质量门禁、组件映射校验和自动化审查
- 轻任务禁止开启 root planning files；重任务才允许 `.codex/planning-active`

如需更细的执行规则，统一以对应 Skill 的 `SKILL.md` 和 `references/` 为准。
