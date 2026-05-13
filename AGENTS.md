# 项目说明

本项目的主入口是 `$erp-product-manager` 和 `$ui-optimization-master` Skills。

本文件只保留最小路由信息：

- 新需求、竞品分析、方案、PRD、原型生成优先使用 `$erp-product-manager`
- UI 评审、原型优化、Ant Design 合规检查优先使用 `$ui-optimization-master`
- 代码生成、代码编辑、代码走查优先使用 `$karpathy-guidelines`
- 分支溯源、checkpoint、上下文过长、任务交接、Codex 使用风险提醒优先使用 `$codex-workflow-guardian`
- Skill 源文件在 `skills/erp-product-manager/SKILL.md`、`skills/ui-optimization-master/SKILL.md`、`skills/karpathy-guidelines/SKILL.md` 和 `skills/codex-workflow-guardian/SKILL.md`
- 本项目启用 `.codex/` 的 planning-with-files hooks，用于长对话的任务计划、发现和进度维护
- 复杂 PM / UI 任务的长上下文执行规则见 `skills/shared/context-memory-workflow.md`
- 长期用户偏好、公司背景、自研 ERP 信息沉淀到 `knowledge/`
- 新任务默认不读取历史 `cases/**`；只有用户明确要求继续或参考某个案例时，才读取该案例内容
- 主线只承载通用工作流
- 退款管理等具体案例放到 `cases/<case-name>/`

如需更细的执行规则，统一以对应 Skill 的 `SKILL.md` 和 `references/` 为准。
