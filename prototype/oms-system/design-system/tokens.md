# OMS Ant Design Tokens

## Foundation

| Token | Value | Ant Design Mapping | Usage |
|-------|-------|--------------------|-------|
| `--ant-color-primary` | `#1677ff` | `colorPrimary` | Primary buttons, active menu, active tabs, links |
| `--ant-color-success` | `#52c41a` | `colorSuccess` | Ready, complete, shipped success states |
| `--ant-color-warning` | `#faad14` | `colorWarning` | Pending review, manual check |
| `--ant-color-error` | `#ff4d4f` | `colorError` | Exception, address error |
| `--ant-color-info` | `#1677ff` | `colorInfo` | Processing, package links |
| `--ant-color-text` | `rgba(0, 0, 0, 0.88)` | `colorText` | Main content |
| `--ant-color-text-secondary` | `rgba(0, 0, 0, 0.65)` | `colorTextSecondary` | Metadata, helper text |
| `--ant-color-text-tertiary` | `rgba(0, 0, 0, 0.45)` | `colorTextTertiary` | Low emphasis text |
| `--ant-color-border` | `#d9d9d9` | `colorBorder` | Inputs, panel borders |
| `--ant-color-border-secondary` | `#f0f0f0` | `colorBorderSecondary` | Table row separators |
| `--ant-color-bg-layout` | `#f5f5f5` | `colorBgLayout` | Page background |
| `--ant-color-bg-container` | `#ffffff` | `colorBgContainer` | Panels and table containers |
| `--ant-border-radius` | `6px` | `borderRadius` | Buttons, inputs, tags |
| `--erp-panel-radius` | `8px` | ERP extension | Content panels |

## Typography

| Role | Size | Weight | Notes |
|------|------|--------|-------|
| Page title | `20px` | `600` | Ant `Typography.Title` level 4 equivalent |
| Section title | `16px` | `600` | Table panel title |
| Body | `14px` | `400` | Default ERP body |
| Label / helper | `12px` | `400` | Form labels, metadata |
| Number | `22px` | `600` | Compact operational counters |

## Spacing

| Token | Value | Usage |
|-------|-------|-------|
| Page horizontal padding | `20px` | Static prototype desktop canvas |
| Module gap | `14px - 16px` | Between header, filters, table |
| Panel padding | `14px - 16px` | Query and table areas |
| Inline gap | `8px - 12px` | Form items, buttons, tags |
| Table cell padding | `11px 14px` | Dense ERP table |

## Status Semantics

| Business State | Ant Status | Color |
|----------------|------------|-------|
| 待发货 / 资料完整 | success | green |
| 待审核 / 需人工审核 | warning | orange |
| 异常 / 地址异常 | error | red |
| 运输中 / 包裹链接 | processing | blue |
| 已发货 / 默认弱状态 | default | gray |
