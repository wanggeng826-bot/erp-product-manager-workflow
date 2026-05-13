# Ant Design Pro v6 Baseline (2026-05)

## Source Of Truth

- Release notes (CN): https://github.com/ant-design/ant-design-pro/issues/11734 (opened on 2026-04-30)
- Release notes (EN): https://github.com/ant-design/ant-design-pro/issues/11735 (opened on 2026-04-30)
- Preview: https://preview.pro.ant.design/welcome
- Repo overview/features: https://github.com/ant-design/ant-design-pro
- Ant Design v6 theme docs: https://ant.design/docs/react/customize-theme/
- Ant Design button API (`color` + `variant`): https://ant.design/components/button/

## Confirmed Baseline

1. Pro stack baseline: React 19 + antd 6 + Umi Max 4 + ProComponents v3.
2. Style baseline: cssVar-first, modern CSS stack (Tailwind CSS v4 + antd-style v4 + CSS Modules).
3. Theme baseline: Default / Dark / Glass style presets should be supported by design assets.
4. Component baseline: use semantic combinations (`color` + `variant`) where applicable, especially Button.
5. Prototype baseline: keep Chinese ERP high-density list/query/drawer workflows, but align visual language to Pro v6.

## Figma Library Mapping

- Figma library file: `Ant Design ERP UI Library`
- fileKey: `KaI3eGyylfiwrPlU3OR08C`
- Added in this iteration:
  - `Ant ERP / Colors` modes: `Default`, `Dark`, `Glass`
  - `Button v6` component set (24 variants: `variant x color x state`)
  - `ListPageTemplate v6` (`Theme=Default|Dark|Glass`)
  - `ErpShell v6` (`Theme=Default|Dark|Glass`)
  - `05 Pro v6 Update` page for traceable design baseline notes

## Rules For Future Output

1. Figma prototype tasks should use `ListPageTemplate v6` and `ErpShell v6` first.
2. If Button is involved, prefer `Button v6` over legacy `Button` set.
3. New page proposals should explicitly state target theme mode: `Default`, `Dark`, or `Glass`.
4. If user does not specify theme, default to `Default`.
5. Do not invent non-Ant visual language when user asks for Pro/Ant-aligned prototype.
