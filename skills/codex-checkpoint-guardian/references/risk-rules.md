# Risk Rules

## Must Stop

Stop before editing when:

- existing dirty files are unrelated to the new task
- the branch name clearly belongs to another task
- more than one top-level directory is dirty and the new task touches another directory
- untracked files look like user work and could be missed by a checkpoint
- the user asks to delete, reset, overwrite, force push, or cleanup without exact scope
- secrets, tokens, account names, or private screenshots may be written

Use:

```text
我先暂停，不继续执行。
原因：...
建议：...
```

## Warn And Continue

Warn, then continue when:

- there are only task-related dirty files
- checks are unavailable but the change is documentation-only
- no GitHub remote exists and the user only needs local save

## Beginner Coaching

Keep coaching short and action-based:

- "现在适合说：存档。"
- "这个任务建议新开分支。"
- "当前有未跟踪文件，checkpoint 前不能忽略。"
- "这次目标变了，建议先生成 handoff 再开新对话。"

Avoid lecturing or long Git explanations unless the user asks.
