# Save Modes

## Local Git Mode

Use when:

- the folder is a Git repository
- no GitHub remote exists, or the user wants local-only backup

Workflow:

1. `git status --short --branch`
2. `git diff --stat`
3. group files by purpose
4. stage selected files
5. inspect staged diff
6. commit locally
7. record checkpoint

Explain to users:

```text
本地 commit 可以回滚，但只保存在这台电脑。
```

Rollback examples:

```bash
git log --oneline -n 10
git restore <file>
git revert <commit>
```

## GitHub Cloud Mode

Use when:

- the folder is a Git repository
- a GitHub remote exists
- the user wants cloud backup, sharing, or PR workflow

Workflow:

1. run Local Git Mode
2. push the branch
3. optionally open a PR
4. record remote branch or PR URL

Explain to users:

```text
commit 是本机可回滚；push 到 GitHub 才是云端可找回和可共享。
```

Branch rule:

```text
codex/<short-task-name>
```

Never push directly to `main` unless the user explicitly asks and the repo policy allows it.

## Local Snapshot Mode

Use when:

- the folder is not a Git repository
- the user cannot or does not want to initialize Git

Workflow:

1. create `.codex-checkpoints/<timestamp>-<slug>/`
2. copy changed files into `files/`
3. write `manifest.json`
4. write `notes.md`
5. update `.codex-checkpoints/checkpoints.md`

Explain to users:

```text
这是文件快照，不如 Git 精确，但能保住当前可用版本。
```

Prefer suggesting Git initialization when the user will continue iterative work:

```bash
git init
```

Only initialize Git after user confirmation.
