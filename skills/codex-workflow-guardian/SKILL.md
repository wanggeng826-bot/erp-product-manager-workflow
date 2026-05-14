---
name: codex-workflow-guardian
description: Use when the user worries about Git branches, traceability, rollback, uncommitted changes, checkpoint commits, context bloat, long Codex conversations, task handoff, or wants Codex to proactively guard safe usage and teach better Codex habits.
---

# Codex Workflow Guardian

This skill keeps Product Manager AI Workflow work traceable, recoverable, and teachable for a user who heavily relies on Codex but does not want to manage Git and context hygiene manually.

For universal local/Git/GitHub checkpointing, use `$codex-checkpoint-guardian`. This skill adds project-specific workflow, context, branch, PRD, prototype, and handoff guardrails.

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

If the user's immediate intent is simply `守护一下` or `存档`, route to `$codex-checkpoint-guardian` first.

If the user only wants a small adjustment to an existing generated prototype, doc, or page, prefer a lightweight guard path instead of the full workflow path.

## Work Modes

Choose one mode before loading references:

1. **Micro Edit**
   - existing prototype/content tweak
   - read only branch status, the target files, and `prototype-spec.md` or equivalent local spec if it exists
   - skip README, broad knowledge indexes, long planning files, and unrelated workflow references
2. **Normal Task**
   - one coherent PM/UI workflow task
   - use the usual task classification and minimum references
3. **Heavy Task**
   - new requirement, broad redesign, mixed goals, or long-thread recovery
   - use planning files, handoff, source map, and full guardrails

## Start Gate

Before substantial work:

1. Run `git status --short --branch`.
2. Run `git diff --stat` when there are local changes.
3. If useful, run `git log --oneline --decorate -n 8`.
4. Decide `Micro Edit` / `Normal Task` / `Heavy Task` before loading more context.
5. Read `task_plan.md`, `findings.md`, and `progress.md` only for `Heavy Task` or true continuation recovery.
6. Classify the work:
   - **Workflow capability**: belongs in `skills/`, `knowledge/`, `ui-library/`, or main docs.
   - **Specific case**: belongs in `cases/<case-name>/`.
   - **Prototype**: belongs in `prototype/<short-name>/` with `prototype-spec.md`.
   - **Code change**: follow `$karpathy-guidelines`.
7. Tell the user the likely files or directories that will be touched before editing.

If the worktree has many unrelated changes, do not hide it. State the risk and either isolate the new work or propose checkpoint commits.

For `Micro Edit`, do not escalate into broad project reading unless:
- the target file lacks a local spec or source map
- the user asks for structural redesign rather than adjustment
- the diff shows unrelated risk

## Stop Gate

Before executing, predict whether the request is likely to fail, corrupt traceability, or make rollback harder. If a stop condition is met, pause the task and tell the user what must be fixed before continuing.

Stop instead of proceeding when:

- The current branch is clearly wrong for the task and switching/creating a branch is the safer next step.
- The worktree already contains broad uncommitted changes and the new task would touch unrelated files.
- The user asks for destructive Git operations, cleanup, deletion, reset, force push, or broad overwrite without explicit confirmation.
- Credentials, tokens, private account data, or sensitive screenshots would be written into tracked files.
- A PRD/prototype task lacks source map, confirmed input, or `prototype-spec.md` requirements and Codex would need to invent business rules.
- The conversation has mixed multiple major goals and a handoff/new thread is needed before continuing.
- Required local configuration is missing or suspicious, such as Git identity before a push/PR workflow, missing dependency setup for verification, or unclear target branch.

Use this format when stopping:

```markdown
我先暂停，不继续执行。
原因：
需要你先确认/修正：
我建议的下一步：
```

Only continue after the user confirms the safer path or fixes the configuration. For low-risk issues, warn and continue; for traceability, data-loss, or sensitive-data risks, stop.

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
