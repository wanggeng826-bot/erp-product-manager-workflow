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
