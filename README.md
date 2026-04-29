# 产品经理工作流

## 目录说明

- `AGENTS.md`
  项目级最小路由说明。
- `skills/erp-product-manager/`
  产品经理工作流 Skill 源文件。
- `skills/ui-optimization-master/`
  UI 优化大师 Skill 源文件。
- `skills/karpathy-guidelines/`
  编程规范 Skill 源文件。
- `.codex/`
  planning-with-files hooks 和 workspace Skill，用于自动恢复和提醒维护任务记忆。
- `skills/shared/context-memory-workflow.md`
  长上下文工作记忆规则，把 planning-with-files 方法接入 PM / UI 工作流。
- `knowledge/`
  长期知识库，沉淀用户偏好、公司背景、自研 ERP 信息和设计口味。
- `START_HERE.md`
  新用户第一入口。
- `intake/prd/`
  主线 PRD 入口。
- `cases/<case-name>/`
  独立案例目录。
- `prototype/`
  主线原型输出目录。

## 使用方式

1. 打开 `START_HERE.md`
2. 规则以各自 `SKILL.md` 为准
3. 长对话由 `.codex/` hooks 维护 task_plan.md / findings.md / progress.md
4. 复杂 PM / UI 任务按 `skills/shared/context-memory-workflow.md` 执行
5. 长期背景和偏好由 `knowledge/` 维护
6. 独立案例统一放到 `cases/<case-name>/` 内维护
7. 新任务默认不读取历史 `cases/**`，除非明确继续或参考某个案例
8. 做 PRD 或原型前先建立页面来源映射，确认每个可见元素都能回指到 PRD 或已确认需求

## Skill 使用

本项目已安装 Skill 到：

- `/Users/freddy/.codex/skills/erp-product-manager`
- `/Users/freddy/.codex/skills/ui-optimization-master`
- `/Users/freddy/.codex/skills/karpathy-guidelines`
详细规则见各自 `SKILL.md`。
