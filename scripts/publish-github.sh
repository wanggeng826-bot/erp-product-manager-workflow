#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  scripts/publish-github.sh "<title>" "<summary>" [--no-pr] [--dry-run]

Description:
  1) 自动更新 knowledge/codex-checkpoints.md
  2) 提交业务改动
  3) 提交 checkpoint 日志
  4) 推送当前分支到 origin
  5) 若 gh 已登录，自动创建或复用 Draft PR

Arguments:
  title     本次发布标题（例如：UI 原型输出可控性规范）
  summary   本次发布摘要（一句话）

Options:
  --no-pr   跳过 Draft PR 创建
  --dry-run 仅打印计划动作，不执行 git 写操作
EOF
}

if [ "${1:-}" = "-h" ] || [ "${1:-}" = "--help" ]; then
  usage
  exit 0
fi

if [ "$#" -lt 2 ]; then
  usage
  exit 1
fi

TITLE="$1"
SUMMARY="$2"
shift 2

CREATE_PR=1
DRY_RUN=0

while [ "$#" -gt 0 ]; do
  case "$1" in
    --no-pr)
      CREATE_PR=0
      ;;
    --dry-run)
      DRY_RUN=1
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage
      exit 1
      ;;
  esac
  shift
done

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Not inside a git repository." >&2
  exit 1
fi

BRANCH="$(git branch --show-current)"
if [ -z "$BRANCH" ]; then
  echo "Cannot detect current branch." >&2
  exit 1
fi

if [ ! -f "knowledge/codex-checkpoints.md" ]; then
  echo "Missing file: knowledge/codex-checkpoints.md" >&2
  exit 1
fi

if [ -z "$(git status --porcelain)" ]; then
  echo "No local changes to publish."
  exit 1
fi

STAMP="$(TZ=Asia/Shanghai date '+%Y-%m-%d %H:%M CST')"
CHANGED_FILES="$(git status --porcelain | sed 's/^...//')"

if [ "$DRY_RUN" -eq 1 ]; then
  cat <<EOF
[DRY RUN]
Branch: $BRANCH
Title: $TITLE
Summary: $SUMMARY
Changed files:
$CHANGED_FILES
Would run:
  git add -A
  git commit -m "chore: $TITLE"
  append checkpoint log
  git add knowledge/codex-checkpoints.md
  git commit -m "docs(checkpoint): $TITLE"
  git push -u origin $BRANCH
  create/reuse draft PR: $([ "$CREATE_PR" -eq 1 ] && echo yes || echo no)
EOF
  exit 0
fi

git add -A
if git diff --cached --quiet; then
  echo "No staged changes after git add -A."
  exit 1
fi

CODE_COMMIT_MSG="chore: ${TITLE}"
git commit -m "$CODE_COMMIT_MSG"
CODE_COMMIT_HASH="$(git rev-parse --short HEAD)"

{
  echo
  echo "## ${STAMP} - ${TITLE}"
  echo
  echo "- Mode: GitHub Cloud"
  echo "- Branch: \`${BRANCH}\`"
  echo "- Commit: \`${CODE_COMMIT_HASH} ${CODE_COMMIT_MSG}\`"
  echo "- Scope:"
  printf '%s\n' "$CHANGED_FILES" | while IFS= read -r file; do
    [ -n "$file" ] && echo "  - \`$file\`"
  done
  echo "- Saved:"
  echo "  - ${SUMMARY}"
  echo "- Rollback:"
  echo "  - 查看记录：\`git log --oneline -n 10\`"
  echo "  - 回退本次代码提交：\`git revert ${CODE_COMMIT_HASH}\`"
} >> knowledge/codex-checkpoints.md

git add knowledge/codex-checkpoints.md
git commit -m "docs(checkpoint): ${TITLE}"
git push -u origin "$BRANCH"

if [ "$CREATE_PR" -eq 0 ]; then
  echo "Publish done (PR skipped)."
  exit 0
fi

GH_BIN=""
if command -v gh >/dev/null 2>&1; then
  GH_BIN="gh"
elif [ -x "/Users/freddy/.local/bin/gh" ]; then
  GH_BIN="/Users/freddy/.local/bin/gh"
fi

if [ -z "$GH_BIN" ]; then
  echo "Publish done. gh not found, skipped PR creation."
  exit 0
fi

if ! "$GH_BIN" auth status >/dev/null 2>&1; then
  echo "Publish done. gh auth invalid, skipped PR creation."
  exit 0
fi

PR_URL="$("$GH_BIN" pr view --json url --jq .url 2>/dev/null || true)"
if [ -n "$PR_URL" ]; then
  echo "Publish done. Existing PR: $PR_URL"
  exit 0
fi

BASE_BRANCH="$("$GH_BIN" repo view --json defaultBranchRef --jq .defaultBranchRef.name)"
PR_TITLE="[codex] ${TITLE}"
PR_BODY_FILE="$(mktemp)"
cat > "$PR_BODY_FILE" <<EOF
## What Changed
- ${SUMMARY}

## Commits
- ${CODE_COMMIT_HASH} ${CODE_COMMIT_MSG}
- $(git rev-parse --short HEAD) docs(checkpoint): ${TITLE}

## Verification
- See \`knowledge/codex-checkpoints.md\` latest entry.
EOF

"$GH_BIN" pr create \
  --draft \
  --base "$BASE_BRANCH" \
  --head "$BRANCH" \
  --title "$PR_TITLE" \
  --body-file "$PR_BODY_FILE"

rm -f "$PR_BODY_FILE"
echo "Publish done with Draft PR."
