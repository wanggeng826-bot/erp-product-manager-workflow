#!/bin/bash
# planning-with-files: Pre-tool-use hook for Codex
# Reused from the Cursor integration.

PLAN_FILE="task_plan.md"
ACTIVE_FILE=".codex/planning-active"

if [ ! -f "$ACTIVE_FILE" ]; then
    echo '{"decision": "allow"}'
    exit 0
fi

if [ -f "$PLAN_FILE" ]; then
    # Log plan context to stderr so the Codex adapter can surface it as systemMessage.
    head -30 "$PLAN_FILE" >&2
fi

echo '{"decision": "allow"}'
exit 0
