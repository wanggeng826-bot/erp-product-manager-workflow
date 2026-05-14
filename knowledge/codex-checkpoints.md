# Codex Checkpoints

这个文件记录通过 `$codex-checkpoint-guardian` 生成的重要存档。

新手只需要记住：

- `守护一下`：开始前检查分支、脏文件和风险。
- `存档`：把当前可用成果保存成 checkpoint。

## Record Format

```markdown
## YYYY-MM-DD HH:mm

Mode: local-git | github-cloud | local-snapshot
Branch: <branch-or-none>
Checkpoint: <commit-or-snapshot-path>
Remote: pushed | not-pushed | none

Purpose:
- ...

Files:
- ...

Verification:
- ...

Rollback:
- ...
```

## 2026-05-14 19:40

Mode: local-git
Branch: `codex/workflow-lean-refactor`
Checkpoint: pending local commit
Remote: not-pushed

Purpose:
- 收紧轻任务的引用范围和执行路径
- 降低 planning hook 的可见噪音
- 归档旧的根目录 planning 历史，避免新任务继续串味

Files:
- `.codex/hooks.json`
- `skills/erp-product-manager/SKILL.md`
- `skills/ui-optimization-master/SKILL.md`
- `skills/shared/context-memory-workflow.md`
- `cases/_workflow-history/2026-05-14-root-planning-archive/*`

Verification:
- `python3 -m json.tool .codex/hooks.json`
- `wc -l task_plan.md progress.md findings.md`
- targeted `rg` checks for fast-path and single-active-heavy-task rules

Rollback:
- 查看记录：`git log --oneline -n 10`
- 回退本次提交：`git revert <commit>`
