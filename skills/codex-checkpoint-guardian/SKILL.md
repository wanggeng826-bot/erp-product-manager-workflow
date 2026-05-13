---
name: codex-checkpoint-guardian
description: Universal safety workflow for vibe coding checkpoints, local rollback, Git commits, GitHub backup, branch hygiene, and beginner-friendly "守护一下" / "存档" usage. Use when a user may modify files, wants backup, needs rollback, is new to Git or GitHub, or risks polluting a project with untracked or mixed changes.
---

# Codex Checkpoint Guardian

This skill protects vibe coding work from becoming untraceable, polluted, or impossible to roll back. It works for users with or without GitHub.

## User Commands

Users only need two short commands:

- `守护一下`: run a preflight before work.
- `存档`: checkpoint the current useful state.

Use this skill proactively even when the user does not say these commands if the request will edit files, change many files, start a new task on a dirty worktree, or push/share work.

## Core Promise

Before work:
- identify the current save mode
- detect dirty files and wrong branches
- stop risky work before project pollution

After useful work:
- create a complete checkpoint
- record what was saved and how to roll back
- push/share only when the user asks or the workflow requires it

## Save Modes

Choose one mode:

1. **Local Git**: repository has Git but no GitHub remote or user wants local only.
2. **GitHub Cloud**: repository has GitHub remote and user wants cloud backup or sharing.
3. **Local Snapshot**: no Git repository exists.

For details, read `references/modes.md`.

## Start Gate

For `守护一下` or any substantial file-editing task:

1. Run `git status --short --branch` if inside a Git repo.
2. Run `git diff --stat` when local changes exist.
3. Check untracked files; do not ignore `??`.
4. Check whether the branch name matches the task.
5. Classify the work: docs, knowledge, skill, prototype, code, case, or mixed.
6. Tell the user:
   - current branch or save mode
   - risky dirty files
   - whether to continue, checkpoint, clean, or switch branch

Stop instead of editing when the new task is unrelated to existing dirty changes.

## Checkpoint Gate

For `存档`:

1. Summarize all changed, added, deleted, and untracked files.
2. Split mixed changes into coherent checkpoint groups.
3. Stage only the files for the selected checkpoint.
4. Show or summarize the staged diff.
5. Commit with `type(scope): short purpose` in Git modes.
6. Push only in GitHub Cloud mode when the user asked for cloud backup/share.
7. Update a checkpoint record. Prefer `knowledge/codex-checkpoints.md`; otherwise use `.codex-checkpoints/checkpoints.md`.

Do not stage, commit, push, delete, reset, or overwrite unrelated work without user confirmation.

## Stop Conditions

Say `我先暂停，不继续执行。` when:

- the worktree contains unrelated dirty changes
- the current branch is wrong for the new task
- the user asks for destructive cleanup without explicit scope
- a formal PRD/prototype lacks source map or confirmed input
- secrets, account data, or private screenshots may be saved
- there is no rollback path before a large rewrite

Then state the reason and the safest next action in short Chinese.

## Delivery Gate

Before final response after edits or checkpoint:

- state the save mode
- list changed files by purpose
- report checks run
- state whether the worktree is clean
- state checkpoint id or snapshot path
- state rollback command or restore path

## Relationship To Project Skills

This is the universal checkpoint and rollback layer.

Domain skills such as product-manager, UI, writing, or coding skills own the task quality. This skill owns traceability, checkpoint completeness, and rollback safety.
