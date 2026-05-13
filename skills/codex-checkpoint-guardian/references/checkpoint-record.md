# Checkpoint Record

Prefer this file when the project has a knowledge base:

```text
knowledge/codex-checkpoints.md
```

Otherwise use:

```text
.codex-checkpoints/checkpoints.md
```

## Entry Template

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

## Completeness Checklist

- [ ] Modified files included or intentionally excluded
- [ ] Added files included or intentionally excluded
- [ ] Deleted files included or intentionally excluded
- [ ] Untracked files reviewed
- [ ] Staged diff checked before commit
- [ ] Checkpoint record updated
- [ ] Push/PR status recorded when using GitHub
