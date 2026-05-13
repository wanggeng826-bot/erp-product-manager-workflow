---
name: codex-workflow-guardian
description: Use when the user worries about Git branches, traceability, rollback, uncommitted changes, checkpoint commits, context bloat, long Codex conversations, task handoff, or wants Codex to proactively guard safe usage and teach better Codex habits.
---

# Codex Workflow Guardian

This skill keeps Codex work traceable, recoverable, and teachable for a user who heavily relies on Codex but does not want to manage Git and context hygiene manually.

## Core Promise

Prevent five failure modes:

- Work cannot be traced back to a task, reason, or prompt.
- Many unrelated changes accumulate in one dirty branch.
- A long conversation grows so large that Codex starts missing constraints.
- A prototype or PRD has no source map, spec, or verification record.
- The user gets a result but does not learn the safe operating pattern.

## When To Use

Use this skill proactively. The user should not need to invoke it by name.

Trigger it when the request includes or implies:

- Branch purpose, Git status, commit, checkpoint, rollback, diff, merge, PR, or "怕后面出错无法溯源".
- Starting, continuing, or finishing a large Codex task.
- Multiple unrelated topics in one conversation.
- A user asks how to use Codex safely or become better at Codex.
- A task modifies `skills/`, `knowledge/`, `prototype/`, `cases/`, `docs/`, or many files.
- The worktree is dirty before a new task starts.
- The task is likely to touch more than 5 files or more than one top-level directory.
- The user is continuing a long thread, switching goals mid-thread, or asking "继续".

If any trigger appears, briefly announce guardian mode and run the Start Gate before implementation. Do not wait for the user to ask for this skill.

For detailed risk rules and checklists, read `references/risk-rules-and-checklists.md`.

## Start Gate

Before substantial work:

1. Run `git status --short --branch`.
2. Run `git diff --stat` when there are local changes.
3. If useful, run `git log --oneline --decorate -n 8`.
4. Read `task_plan.md`, `findings.md`, and `progress.md` if the task is complex or a continuation.
5. Classify the work:
   - **Workflow capability**: belongs in `skills/`, `knowledge/`, `ui-library/`, or main docs.
   - **Specific case**: belongs in `cases/<case-name>/`.
   - **Prototype**: belongs in `prototype/<short-name>/` with `prototype-spec.md`.
   - **Code change**: follow `$karpathy-guidelines`.
6. Tell the user the likely files or directories that will be touched before editing.

If the worktree has many unrelated changes, do not hide it. State the risk and either isolate the new work or propose checkpoint commits.

## Execution Loop

During work:

- Keep edits scoped to the classified work type.
- Update `task_plan.md`, `findings.md`, and `progress.md` for complex tasks.
- For PRD or prototype work, record source map, component map, state coverage, and verification.
- After every two important reads, searches, screenshots, browser checks, or design inspections, write the key finding to disk.
- When a risky user habit appears, add one short coaching note. Do not lecture.

## Delivery Gate

Before final delivery:

1. Summarize changed files by purpose.
2. Run available checks. If none exist, say that clearly.
3. Report verification results and residual risks.
4. Show whether the branch is still dirty.
5. Recommend a checkpoint plan when changes are meaningful.

Do not stage or commit unless the user explicitly requested it, or the user has established an "auto checkpoint" rule for the current task.

## Checkpoint Rules

Use checkpoint commits to make work recoverable:

- One commit should represent one coherent purpose.
- Prefer small commit groups over one mixed commit.
- Commit message format: `type(scope): short purpose`.
- Suggested types: `docs`, `feat`, `fix`, `chore`, `refactor`.
- Examples:
  - `docs(workflow): add Codex traceability guard`
  - `feat(ui): add OMS prototype source map`
  - `docs(knowledge): record Codex usage preferences`

When current changes are already mixed, propose grouping before committing.

## Context Hygiene

Proactively suggest a new thread when:

- The conversation has covered more than one major goal.
- The current task depends on many screenshots, browser states, or long documents.
- The user says "继续上次" after a long gap.
- The task would exceed roughly 15 touched files or several independent deliverables.
- Codex begins needing repeated reminders of the same constraints.

When suggesting a new thread, create a concise handoff:

```markdown
目标：
当前分支：
已完成：
未完成：
关键文件：
验证结果：
下一步：
不要读取：
```

## Coaching Style

Teach by pointing out the exact risk and the safer next action.

Good:

> 这次已经跨了两个目标，继续在同一对话里做会增加漏约束风险。我建议先生成 handoff，然后开新对话继续原型验证。

Avoid:

> 你这样用不规范。
