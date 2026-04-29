# Prototype Quality Gate

Use this checklist before approving or editing a formal HTML prototype.

## Must Pass

- A PRD or confirmed page scope exists.
- A page source map exists for every visible navigation item, tab, card, summary, title, and button.
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

## Style Gate

- The page matches Chinese B-end ERP backend expectations.
- The page uses an admin shell when appropriate.
- Tables, filters, actions, and drawers are stronger than decorative cards and charts.
- Information density supports daily operational work.
- Visual style is restrained, professional, and not marketing-oriented.

## Implementation Gate

- `index.html`, `styles.css`, and `script.js` remain aligned.
- Clickable interactions still work after edits.
- Formal and demo prototypes are separated if both exist.
- Case files remain under `cases/<case-name>/`.
