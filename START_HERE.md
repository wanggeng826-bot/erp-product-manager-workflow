# 产品经理 AI 工作流 - START HERE

这个项目的规则以各自 `SKILL.md` 为准。
只有重任务会由 `.codex/` hooks 维护任务计划、发现和进度。
复杂 PM / UI 重任务按 `skills/shared/context-memory-workflow.md` 执行。
长期偏好、公司背景和自研 ERP 信息由 `knowledge/` 维护。

如果你是第一次上手，先读：

- [团队成员上手说明](docs/team-onboarding.md)

第一次建议先跑：

```bash
npm run team:setup
npm run team:doctor
```

## 你现在怎么开始

1. 新需求、竞品分析、PRD、原型生成走 `$erp-product-manager`。
2. UI 评审、原型优化、Ant Design 合规检查走 `$ui-optimization-master`。
3. 代码生成、代码修改、代码走查走 `$karpathy-guidelines`。
4. 稳定背景和偏好进入 `knowledge/`，当前重任务进度进入 `task_plan.md / findings.md / progress.md`。
5. 独立案例只放到 `cases/<case-name>/`。
6. 新任务默认不读取历史 `cases/**`，除非明确继续或参考某个案例。
7. 在开始 PRD 或原型前，先确认页面来源映射，避免把无来源的导航、页签、摘要或测试控件带进正式产出。
8. 这里说的原型默认是 HTML 可交互原型，输出到 `prototype/<name>/index.html`；Figma 设计稿只有你明确要求时才生成。
9. 默认只生成本地 HTML；需要发给别人时说 `分享原型`，再让 Codex 执行 `npm run prototype:publish -- --source prototype/<name> --title <原型名> --business-system <系统名>`。
10. PRD 或原型确认后，要补一次 knowledge 草稿；确认无误后执行 `npm run knowledge:publish -- --title "docs(knowledge): update <module>"`。
11. 只有复杂需求、长对话、多页面原型、正式 UI 审查，才维护 planning 文件。

本项目默认依赖 repo 内 `AGENTS.md + skills/`，不是依赖你本机全局 Skill 目录。
