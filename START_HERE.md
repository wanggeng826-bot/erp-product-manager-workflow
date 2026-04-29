# 产品经理工作流 - START HERE

这个项目的规则以各自 `SKILL.md` 为准。
长对话由 `.codex/` hooks 维护任务计划、发现和进度。
复杂 PM / UI 任务按 `skills/shared/context-memory-workflow.md` 执行。
长期偏好、公司背景和自研 ERP 信息由 `knowledge/` 维护。

## 你现在怎么开始

1. 新需求、竞品分析、PRD、原型生成走 `$erp-product-manager`。
2. UI 评审、原型优化、Ant Design 合规检查走 `$ui-optimization-master`。
3. 代码生成、代码修改、代码走查走 `$karpathy-guidelines`。
4. 稳定背景和偏好进入 `knowledge/`，当前任务进度进入 `task_plan.md / findings.md / progress.md`。
5. 独立案例只放到 `cases/<case-name>/`。
6. 新任务默认不读取历史 `cases/**`，除非明确继续或参考某个案例。
7. 在开始 PRD 或原型前，先确认页面来源映射，避免把无来源的导航、页签、摘要或测试控件带进正式产出。
8. 每完成 2 次重要读取、搜索、浏览、截图或评审，就把关键发现写入 `findings.md`。

## 推荐的第一句话

按任务类型直接调用对应 Skill 即可。
