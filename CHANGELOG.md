# Changelog

本文件是本项目工作流主线的**唯一权威更新日志**。

规则：

- 只记录通用工作流升级，不记录单个业务 PRD、单页原型或临时实验
- 任何改动 `AGENTS.md`、`skills/**`、`shared-references/**`、`.codex/hooks/**`、`docs/prototype-hosting.md`、`docs/team-onboarding.md`、`README.md`、`START_HERE.md`、`prototype/README.md`、`scripts/prototype-*.js` 时，必须同步更新本文件
- 每条记录写清：日期、变更、影响

## 2026-05-20

- **workflow cleanup**
  - 删除 `codex-checkpoint-guardian`、`codex-workflow-guardian`、`workflow-strategy-router`
  - 将任务分档内联到 `$erp-product-manager`
  - 新增 `shared-references/`，去掉 UI 规范重复副本
  - 删除 `HANDOFF_PROTOCOL.md`
  - 统一项目口径为：原型默认是本地 HTML，`分享原型` 才发布，Figma 仅在明确要求时进入
  - 影响：主线 workflow 更轻，技能入口更少，项目说明与原型发布口径统一
- **knowledge closure + team bootstrap**
  - 新增 `team:setup`、`team:doctor`、`knowledge:doctor`、`knowledge:publish`
  - `$erp-product-manager` 在 PRD / HTML 原型确认后，强制发起 knowledge 草稿沉淀提议
  - 团队成员上手文档、START_HERE、README 补齐 knowledge-only PR 闭环
  - 影响：团队成员完成 PRD / 原型后，可在用户确认下直接创建 knowledge-only PR 更新 `main`

## 2026-05-16

- **store management workflow alignment**
  - 新增店铺管理「新增页 + 编辑页」统一 PRD 结构
  - 增加“可维护枚举值选择器”组件交互规范
  - 影响：减少原型与 PRD 字段不一致问题，提升生成稳定性
