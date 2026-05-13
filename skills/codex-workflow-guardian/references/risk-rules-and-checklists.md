# Codex Workflow Guardian Risk Rules And Checklists

## Risk Matrix

| Risk | Signal | Guardian Action |
|------|--------|-----------------|
| Dirty branch sprawl | `git status` shows many modified/untracked files | Summarize categories, propose checkpoint groups before more work |
| Mixed concerns | One task touches workflow docs, prototype, knowledge, and case files | Split by purpose and explain which files belong to which lane |
| Missing source map | PRD/prototype has pages, tabs, buttons, or summary cards with no source | Stop expansion, ask for source or mark assumption in `findings.md` |
| Context bloat | Long thread, multiple topics, repeated constraints, many screenshots | Create handoff and suggest new conversation |
| No verification | Changes delivered without command/browser/doc checks | Run available checks or state no checks exist |
| User cannot rollback | No commit after meaningful changes | Recommend a checkpoint commit plan |
| Unclear branch purpose | Branch name does not match work or multiple projects share one branch | Explain branch role and suggest a new `codex/<scope>` branch for unrelated work |
| Sensitive data risk | Credentials, tokens, accounts, or test URLs appear in docs/screenshots | Do not write secrets; redact screenshots or record rule only |
| Guardian not invoked | User asks for broad work but does not mention this skill | Invoke it proactively and state the guardrail being applied |

## Pre-Work Checklist

- [ ] Current branch identified.
- [ ] Dirty worktree summarized.
- [ ] Task classified as workflow, case, prototype, or code.
- [ ] Target files/directories stated before edits.
- [ ] Existing `task_plan.md`, `findings.md`, `progress.md` checked for continuation tasks.
- [ ] Case boundary confirmed; do not read `cases/**` unless requested.
- [ ] If the user did not explicitly ask for guardian mode, decide whether triggers require proactive use.

## During-Work Checklist

- [ ] Important discoveries written to `findings.md`.
- [ ] Decisions and scope changes written to `task_plan.md`.
- [ ] File edits and validations written to `progress.md`.
- [ ] PRD/prototype source map kept current.
- [ ] Unrelated user changes preserved.
- [ ] No speculative refactors or unrelated cleanup.

## Delivery Checklist

- [ ] Changed files grouped by purpose.
- [ ] Checks or verification steps reported.
- [ ] Known limitations and residual risks stated.
- [ ] Branch dirtiness noted when relevant.
- [ ] Checkpoint commit grouping proposed if meaningful changes remain.
- [ ] User receives one practical Codex usage tip if a risky pattern was observed.

## User Habit Coaching

| Habit | Why It Is Risky | Suggested Reminder |
|-------|------------------|--------------------|
| Doing everything in one chat | Context grows and constraints become easier to miss | "这个目标已经变了，建议开新对话，我先给你 handoff。" |
| Leaving many uncommitted files | Hard to identify which task introduced a bug | "现在适合做 checkpoint，把可用状态固定下来。" |
| Asking for broad changes without scope | Codex may touch too many files | "我先限定这次只改这些目录，避免把任务混在一起。" |
| Mixing workflow edits and business cases | Main workflow becomes polluted by case-specific facts | "这个属于具体案例，应放到 `cases/<case-name>/`。" |
| Accepting prototype without spec | Later cannot explain why each UI element exists | "原型需要同步 `prototype-spec.md`，记录来源和验证。" |

## Recommended User Prompts

Use these prompts to trigger the guardian behavior:

```text
按可溯源流程执行：开始前看 git status，改动前说清楚会动哪些文件，完成后给 diff 摘要、验证结果和 checkpoint 建议。
```

```text
先帮我做一次分支体检：这个分支有什么改动、哪些可以提交、哪些有风险。
```

```text
这轮任务结束后，帮我整理 handoff，方便开新对话继续。
```

```text
帮我把当前未提交内容拆成几个 checkpoint commit 方案，先不要提交。
```
