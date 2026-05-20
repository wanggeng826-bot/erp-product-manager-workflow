#!/bin/bash
# planning-with-files: Post-tool-use hook for Codex
# Reused from the Cursor integration.

ACTIVE_FILE=".codex/planning-active"
CHANGELOG_FILE="CHANGELOG.md"

workflow_files_changed() {
    git diff --name-only 2>/dev/null | grep -Eq '^(AGENTS\.md|README\.md|START_HERE\.md|prototype/README\.md|docs/prototype-hosting\.md|docs/team-onboarding\.md|skills/|shared-references/|\.codex/hooks/|scripts/prototype-.*\.js)'
}

changelog_missing() {
    ! git diff --name-only 2>/dev/null | grep -qx "$CHANGELOG_FILE"
}

if workflow_files_changed && changelog_missing; then
    echo "[workflow-changelog] You changed workflow core files but did not update CHANGELOG.md. Add a changelog entry before finishing."
fi

if [ ! -f "$ACTIVE_FILE" ]; then
    exit 0
fi

if [ -f task_plan.md ]; then
    echo "[planning-with-files] Update progress.md with what you just did. If a phase is now complete, update task_plan.md status."
fi
exit 0
