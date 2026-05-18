# 产品经理 AI 工作流 - START HERE

这个项目的规则以各自 `SKILL.md` 为准。
只有重任务会由 `.codex/` hooks 维护任务计划、发现和进度。
复杂 PM / UI 重任务按 `skills/shared/context-memory-workflow.md` 执行。
长期偏好、公司背景和自研 ERP 信息由 `knowledge/` 维护。

## 你现在怎么开始

1. 准备让 AI 改文件前，先说 `守护一下`，走 `$codex-checkpoint-guardian`。
2. 当前成果可用或准备大改前，说 `存档`，保存 checkpoint。
3. 新需求、竞品分析、PRD、原型生成走 `$erp-product-manager`。
4. UI 评审、原型优化、Ant Design 合规检查走 `$ui-optimization-master`。
5. 代码生成、代码修改、代码走查走 `$karpathy-guidelines`。
6. 分支溯源、上下文过长、任务交接、Codex 使用风险提醒走 `$codex-workflow-guardian`。
7. 稳定背景和偏好进入 `knowledge/`，当前任务进度进入 `task_plan.md / findings.md / progress.md`。
8. 独立案例只放到 `cases/<case-name>/`。
9. 新任务默认不读取历史 `cases/**`，除非明确继续或参考某个案例。
10. 在开始 PRD 或原型前，先确认页面来源映射，避免把无来源的导航、页签、摘要或测试控件带进正式产出。
11. 每完成 2 次重要读取、搜索、浏览、截图或评审，就把关键发现写入 `findings.md`。

## 推荐的第一句话

```text
守护一下
```

如果你已经有一版不错的成果，先说：

```text
存档
```

如果你要我直接发到 GitHub（自动补日志 + 提交 + 推送），说：

```text
发布一下：<标题> | <一句话摘要>
```
