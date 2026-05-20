# Chinese B-end ERP Visual Baseline

This baseline prevents generated ERP pages from drifting into western SaaS dashboard or marketing-page aesthetics.

## Default Style Direction

All generated PRDs, page specs, UI reviews, and HTML prototypes must default to Chinese B-end ERP admin style:

- Classic admin shell: left sidebar, top header, breadcrumb, compact page title, content area.
- Light neutral page background, usually `#f5f7fa`, `#f7f8fa`, or similar.
- White content panels with subtle borders and restrained shadows.
- Ant Design blue as the primary active color.
- Compact typography: page title around `18-20px`, body text around `14px`, helper text around `12-13px`.
- Medium-high information density for repeated daily operations.
- Tables, filters, task lists, status tags, forms, drawers, and business lists are primary UI.
- Charts support business decisions but must not dominate the page.
- Card radius should stay restrained, usually `4-8px`.
- Icons must be functional and quiet, not decorative.

## Preferred Page Skeleton

For most ERP pages, prefer this structure:

1. Left navigation
2. Top header
3. Breadcrumb
4. Compact page title and short helper text
5. Filter/action area
6. Table, form, task list, or business content
7. Drawer/modal for details or contextual actions

## Avoid

Flag or revise these patterns:

- Western SaaS landing-page style.
- Oversized hero areas.
- Large marketing-style metric cards.
- Decorative gradients, glass effects, heavy shadows, glossy surfaces.
- Excessive whitespace.
- Dashboard showcase layouts that weaken table, filter, action, and drawer workflows.
- Card-heavy layouts where business operations become secondary.
- UI that looks like a demo page instead of a daily internal operations system.
- Text blocks explaining how to use the page inside the business UI.

## Style Fit Judgment

Before delivering a prototype or UI plan, judge style fit:

- `符合`: The page structure, density, components, and restraint match a formal Chinese ERP backend.
- `轻微偏离`: The page is usable, but has overly large cards, too much whitespace, or visual emphasis that should be toned down.
- `明显偏离`: The page looks like western SaaS, a marketing dashboard, or a demo showcase and must be redesigned toward Ant Design ERP backend style.

## Delivery Check

Before delivery, verify:

- The page looks like a Chinese ERP backend page.
- It has a stable admin shell structure when applicable.
- Information density supports long-term daily work.
- Tables, filters, actions, drawers, and status tags are stronger than decorative cards and charts.
- Every visible module maps back to the PRD or confirmed user requirement.

