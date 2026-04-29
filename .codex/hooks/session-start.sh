#!/bin/sh
# planning-with-files: SessionStart hook for Codex
# Runs session catchup, then reuses the same prompt context hook as UserPromptSubmit.

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
CODEX_ROOT="$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)"
SKILL_DIR="$CODEX_ROOT/skills/planning-with-files"
PYTHON_BIN="${PYTHON_BIN:-$(command -v python3 || command -v python)}"
PROJECT_ROOT="$(pwd)"

if [ -n "$PYTHON_BIN" ] && [ -f "$SKILL_DIR/scripts/session-catchup.py" ]; then
    "$PYTHON_BIN" "$SKILL_DIR/scripts/session-catchup.py" "$(pwd)"
fi

if [ ! -f "$PROJECT_ROOT/task_plan.md" ] || [ ! -f "$PROJECT_ROOT/findings.md" ] || [ ! -f "$PROJECT_ROOT/progress.md" ]; then
    sh "$SKILL_DIR/scripts/init-session.sh" "$(basename "$PROJECT_ROOT")" >/dev/null 2>&1 || true
fi

sh "$SCRIPT_DIR/user-prompt-submit.sh"
exit 0
