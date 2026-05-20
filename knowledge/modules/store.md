# 店铺 / 渠道（Store & Channel）

> 最近更新：2026-05-19（v0.2 — 沉淀 Shopee 授权与子店铺录入）

## 1. 这个模块管什么 / 不管什么

**管**：
- 店铺层级（平台 → 事业部 → 站点 → 店铺名）
- 渠道对接方式（按平台差异：Shopee OAuth / Amazon SP-API / 手动录入）
- 店铺授权生命周期（授权 → Token 刷新 → 即将过期预警 → 过期/取消）
- 店铺与权限的关系

**不管**：
- 订单 / 商品本身的渠道字段（见 `order.md` / `inventory.md`）

## 2. 核心实体

| 实体 | 关键字段 | 说明 |
|---|---|---|
| Platform | `platform_id`、`name`、`icon` | Amazon、eBay、Shopify、独立站、Shopee |
| BusinessUnit | `bu_id`、`name`、`platform_id` | 事业部 |
| Site | `site_id`、`bu_id`、`region` | 站点（如 Amazon US / Amazon UK、Shopee MY / SG） |
| Store | `store_id`、`site_id`、`name`、`auth_status`、`platform_shop_id`、`main_account_id`、`auth_type` | 店铺账号 |
| ShopeeToken | `platform_shop_id`、`main_account_id`、`auth_type`、`access_token`、`refresh_token`、`claim_status` | Shopee 专用授权凭证（PRD: `intake/prd/shopee-auth-flow-redesign.md`） |

## 3. 关键约束

> 已确认（来自 `../figma-ant-design-ui-library.md` + `erp-reference-patterns.md`）：店铺选择器层级固定为 `平台 → 事业部 → 站点 → 店铺名`，平台层**必须**展示平台图标与平台名。

## 4. 业务规则

- 店铺层级固定为 4 级，不允许扩展。（来源：UI 交互规范 §7.1）
- Shopee："授权" ≠ "创建店铺"。授权获取平台数据权限（token + shop_id_list），用户需通过"子店铺录入"认领后才成为 ERP 可运营店铺。
- Shopee 待认领店铺进入"待认领店铺池"，可后续认领；授权过期后不可认领。
- Shopee 同一主账号的多个子店铺，支持补充授权（只展示新增店铺）。
- 多店铺之间的库存共享 vs 隔离 <待沉淀>

## 5. 与其他模块的关系

- 关联 `order.md`：每个订单归属一个店铺
- 关联 `inventory.md`：库存按店铺隔离 / 共享 <待沉淀>
- 关联 `permission.md`：角色按店铺范围授权

## 6. 常见误解 / 易混淆点

- **Shopee 主账号 ≠ ERP 店铺**：主账号是授权入口，旗下子店铺才是 ERP 中的 Store 实体。
- **授权 ≠ 录入**：授权完成只是拿到 token，子店铺需要在 ERP 中认领录入后才能运营。
- **平台店铺 ID（platform_shop_id）≠ ERP 店铺 ID（store_id）**：前者是 Shopee 平台的 shop_id，后者是 ERP 内部主键。

## 7. 历史决策

- 2026-05-19：Shopee 授权流程正式方案确定，采用 OAuth 跳转 → 回调 → 子店铺认领录入的三阶段流程。详见 `intake/prd/shopee-auth-flow-redesign.md`。

---

## 沉淀引导

- [ ] 每个层级的实际个数（多少平台、多少事业部）
- [ ] 多店铺权限矩阵
- [ ] 店铺授权续期 / 失效后的兜底
- [ ] 跨店铺数据汇总规则（用于 BI 驾驶舱）
- [ ] 新店铺接入流程
