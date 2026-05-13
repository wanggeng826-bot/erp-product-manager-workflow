# Figma MCP Setup

## Current Status

As of 2026-05-09, Codex has two Figma MCP entries configured:

| MCP server | URL | Status | Usage |
|------------|-----|--------|-------|
| `figma` | `https://mcp.figma.com/mcp` | Installed and OAuth authenticated | Default Figma read/write path |
| `figma-desktop` | `http://127.0.0.1:3845/mcp` | Installed as local fallback | Use only when Figma desktop Dev Mode MCP Server is enabled |

## Default Usage

- Use `figma` remote MCP for Figma file work, design-system discovery, component reading, variable/style access, and Figma screen generation.
- Use `figma-desktop` only when the task depends on the currently selected local Figma frame.
- If `figma-desktop` is needed, a normal Figma design file must be open in the desktop app and Dev Mode MCP Server must be enabled. Figma Make files may not start the local `3845` listener.

## Project Workflow Impact

For UI generation, the Figma MCP setup supports the workflow learned from the reference videos:

`Foundation -> Components -> Page -> Spec -> Binding -> Review -> Revision`

When Figma tools are available, Codex should:

1. Inspect existing file structure, components, variables, and styles before creating anything.
2. Reuse component instances and variables instead of drawing isolated shapes.
3. Build screens section by section.
4. Validate the generated screen against the source map and component map.
5. Record any reusable rule back into `skills/ui-optimization-master/references/`.

For HTML prototype work, use the same workflow through Markdown references, HTML structure, CSS tokens, and reusable class names.
