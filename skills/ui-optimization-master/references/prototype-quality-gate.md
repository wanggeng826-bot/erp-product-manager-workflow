# Prototype Quality Gate

Use this checklist before approving or editing a formal HTML prototype.

## Must Pass

- A PRD or confirmed page scope exists.
- A page source map exists for every visible navigation item, tab, card, summary, title, and button.
- A component map exists for formal prototypes and major UI rewrites.
- Page count, page relationship, and module structure come from PRD or user confirmation.
- Navigation, tabs, cards, summaries, and buttons can map back to PRD or confirmed requirements.
- No demo controls are present in the formal page.
- No role switcher is present in the formal page.
- No page state switcher is present in the formal page.
- No debug panel is present in the formal page.
- No duplicate title area, duplicate summary area, or duplicate action area exists.
- Permissions are shown through hidden, disabled, read-only, or feedback behavior.
- States are designed but not exposed through testing controls.
- Delete and high-risk operations have the required confirmation and reversibility handling.
- Repeated filters, tables, drawers, modals, selectors, status tags, and logs reuse documented patterns instead of one-off UI.

## Style Gate

- The page matches Chinese B-end ERP backend expectations.
- The page uses an admin shell when appropriate.
- Tables, filters, actions, and drawers are stronger than decorative cards and charts.
- Information density supports daily operational work.
- Visual style is restrained, professional, and not marketing-oriented.
- Foundation tokens are consistent: color, typography, spacing, radius, border, shadow, and status semantics.
- Component-level rhythm is consistent across filters, tables, drawers, forms, buttons, and feedback.

## Implementation Gate

- `index.html`, `styles.css`, and `script.js` remain aligned.
- Class names and JS behaviors reflect reusable component responsibilities where practical.
- Clickable interactions still work after edits.
- If the artifact is a final draft or the user explicitly requests final QA, run a Playwright smoke pass on the local prototype and verify the main path, page load, and any drawer/modal states that changed.
- If the artifact is still in iterative discussion or Playwright is unavailable, document manual browser verification instead of pretending automated coverage happened.
- Formal and demo prototypes are separated if both exist.
- Case files remain under `cases/<case-name>/`.
