#!/bin/bash
# planning-with-files: Post-tool-use hook for Codex
# Reused from the Cursor integration.

ACTIVE_FILE=".codex/planning-active"

if [ ! -f "$ACTIVE_FILE" ]; then
    exit 0
fi

if [ -f task_plan.md ]; then
    echo "[planning-with-files] Update progress.md with what you just did. If a phase is now complete, update task_plan.md status."
fi
exit 0
