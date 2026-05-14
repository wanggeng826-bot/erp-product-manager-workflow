# Shopee 店铺授权 & 管理流程 PRD

> 版本：v1.0 | 日期：2026-05-14 | 作者：AI 辅助
> 基于：《店铺重构方案》+ Shopee Open Platform 开发者文档 + BigSeller 授权实践参考

---

## 1. 背景对齐

### 1.1 为什么要调整

《店铺重构方案》将授权统一描述为「沿用现有平台授权逻辑」，但 Shopee 的授权机制与其他平台（Amazon、Lazada 等）存在显著差异：

- Shopee 使用 **Open Platform OAuth 2.0 风格授权**，需 ERP 侧先注册为 Developer App；
- 区分 **店铺账号（Shop Account）** 和 **主账号（Main Account）** 两种授权入口；
- 主账号可 **一次性批量授权多个店铺 + 商户（Merchant）**；
- Token 有独立生命周期：`access_token`（4h）/ `refresh_token`（30d），需后端持续刷新；
- 授权最长有效期 365 天，支持卖家自定义过期时间；
- 平台支持 **授权过期前 7 天 Push 通知**，ERP 侧需订阅并响应。

### 1.2 目标用户

- 店铺管理员：在 ERP 内发起 Shopee 店铺授权
- 运营人员：查看授权状态、处理授权过期/失效

### 1.3 核心场景

| 场景 | 说明 |
|---|---|
| 新店铺接入 | 管理员在 ERP 店铺管理页点击「授权」，跳转 Shopee 完成 OAuth |
| 批量授权 | 管理员通过主账号一次授权多个站点店铺 |
| Token 续期 | 后端自动刷新 access_token，前端展示授权有效期 |
| 授权过期处理 | 过期前 7 天预警，过期后引导重新授权 |
| 授权取消 | 支持在 Shopee 卖家中心或 ERP 发起取消 |

---

## 2. Shopee 开放平台授权流程（技术层）

### 2.1 前置条件

ERP 需先在 [Shopee Open Platform](https://open.shopee.com) 注册为开发者并创建 App，获取：

| 参数 | 说明 | 环境差异 |
|---|---|---|
| `partner_id` | App 唯一标识 | 测试环境 / 生产环境不同 |
| `partner_key` | HMAC-SHA256 签名密钥 | 测试环境 / 生产环境不同 |
| Redirect URL Domain | 回调地址域名（需在 Console 配置） | 测试/生产分别配置 |

### 2.2 授权完整链路（5 步）

```
┌────────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────────┐
│  ERP 后端   │     │   ERP 前端    │     │ Shopee Auth  │     │  Shopee API  │
│            │     │              │     │    Page      │     │              │
└─────┬──────┘     └──────┬───────┘     └──────┬───────┘     └──────┬───────┘
      │                   │                    │                    │
      │ ① 生成授权链接     │                    │                    │
      │──────────────────>│                    │                    │
      │                   │                    │                    │
      │                   │ ② 跳转授权页        │                    │
      │                   │───────────────────>│                    │
      │                   │                    │                    │
      │                   │       ③ 卖家登录+选择店铺+确认授权        │
      │                   │                    │                    │
      │                   │ ④ 回调 redirect_uri│                    │
      │                   │<───────────────────│                    │
      │                   │   (code + shop_id  │                    │
      │                   │    或 main_account_id)                 │
      │                   │                    │                    │
      │ ⑤ 用 code 换 token │                    │                    │
      │──────────────────────────────────────────────────────────>│
      │                   │                    │                    │
      │ ⑥ 定时刷新 token   │                    │                    │
      │<─────────────────────────────────────────────────────────>│
      │                   │                    │                    │
```

#### 第一步：生成授权链接

ERP 后端构造授权 URL，参数说明：

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `partner_id` | int | 是 | App 的 partner_id |
| `auth_type` | string | 是 | 固定值 `"seller"`（店铺/商户授权） |
| `redirect_uri` | string | 是 | 回调地址，域名必须与 Console 配置一致 |
| `response_type` | string | 是 | 固定值 `"code"` |
| `state` | string | 否 | 防 CSRF 随机串，回调时原样返回 |
| `sign` | string | 是 | HMAC-SHA256 签名，有效期 5 分钟 |

**生产环境授权 URL 示例：**

```
https://open.shopee.com/auth?partner_id=10090&auth_type=seller&redirect_uri=https://erp.example.com/shopee/callback&response_type=code&state=random_csrf_token&sign=xxx
```

**环境 URL 对照：**

| 环境 | 区域 | 授权 URL |
|---|---|---|
| 生产 | 全球（非大陆/巴西） | `https://open.shopee.com/auth` |
| 生产 | 中国大陆 | `https://open.shopee.cn/auth` |
| 生产 | 巴西 | `https://open.shopee.com.br/auth` |
| 沙箱 | 全球 | `https://open.sandbox.test-stable.shopee.com/auth` |
| 沙箱 | 中国大陆 | `https://open.sandbox.test-stable.shopee.cn/auth` |

**签名计算规则（Public API 级别）：**

```
base_string = partner_id + api_path + timestamp
sign = HMAC-SHA256(partner_key, base_string) → hex 小写
```

> ⚠️ **重要**：timestamp 有效期仅 5 分钟，过期后需重新生成链接。这意味着「授权」按钮点击时必须实时生成链接，不能预生成缓存。

#### 第二步：卖家在 Shopee 授权页操作

ERP 前端将用户引导至授权 URL 后，卖家在 Shopee 页面完成：

**A. 店铺账号授权（授权单个店铺）：**

1. 输入店铺账号 + 密码 → 登录
2. 输入手机验证码 → 验证
3. 选择授权有效期（7/30/90/180/365 天或自定义）
4. 点击「确认授权」
5. 回调：`redirect_uri?code=xxx&shop_id=xxx&state=xxx`

**B. 主账号授权（批量授权多店铺）：**

1. 点击「Switch to Sub Account」切换主账号登录
2. 输入主账号（格式：`xxx:main`）+ 密码 → 登录
3. 勾选需要授权的店铺（可多选）
4. **跨境卖家**：需额外勾选「Auth Merchant」复选框（否则无法调用 Merchant API、无法使用库存推送）
5. 选择授权有效期
6. 点击「确认授权」
7. 回调：`redirect_uri?code=xxx&main_account_id=xxx&state=xxx`

> ⚠️ **关键差异**：主账号授权回调返回 `main_account_id`（非 `shop_id`），需后续通过 API 获取 `shop_id_list` 和 `merchant_id_list`。

#### 第三步：ERP 后端换取 Token

收到回调后，ERP 后端调用 Shopee API 用 `code` 换取初始 token：

**API：** `POST /api/v2/auth/token/get`

| 参数 | 说明 |
|---|---|
| `code` | 回调 URL 中的 code（一次性，10 分钟有效） |
| `partner_id` | App 的 partner_id |
| `shop_id` | 店铺账号授权时传入（与 main_account_id 二选一） |
| `main_account_id` | 主账号授权时传入（与 shop_id 二选一） |

**响应（店铺账号）：**

```json
{
  "access_token": "6a55746e61546f707579627656637464",
  "refresh_token": "456e416149664b76745a6a794156794a",
  "expire_in": 14400,
  "request_id": "c040b886cfcabdfa5a23af51c595cd1b"
}
```

**响应（主账号）：**

```json
{
  "access_token": "44776151594778486943647644745361",
  "refresh_token": "684d42685667777868597a4477587455",
  "expire_in": 14344,
  "shop_id_list": [33142, 46154],
  "merchant_id_list": [1001705],
  "request_id": "9199e13ee74b22411498209cb5516e24"
}
```

#### 第四步：Token 续期（Refresh）

| 项目 | 规则 |
|---|---|
| access_token 有效期 | **4 小时**，可重复使用 |
| refresh_token 有效期 | **30 天**，一次性使用 |
| 刷新时机 | access_token 过期前（建议提前 10 分钟刷新） |
| 刷新 API | `POST /api/v2/auth/access_token/get` |
| 刷新后 | 获得新 access_token（4h）+ 新 refresh_token（30d） |
| 旧 token 过渡 | 新 access_token 生成后，旧 access_token 仍有效 5 分钟 |

**关键规则：主账号初始授权后，所有 shop_id 和 merchant_id 共享同一对 token。首次 Refresh 后，每个 shop_id / merchant_id 各自独立刷新，产生独立的 token 对。**

```
初始状态：main_account → 1 个 access_token + 1 个 refresh_token
         ├── shop_1 ──────┘ (共享)
         ├── shop_2 ──────┘
         └── merchant_1 ──┘

首次 Refresh 后：
         ├── shop_1 → 独立 access_token_A + refresh_token_A
         ├── shop_2 → 独立 access_token_B + refresh_token_B
         └── merchant_1 → 独立 access_token_C + refresh_token_C
```

**刷新 API：** `POST /api/v2/auth/access_token/get`

| 参数 | 说明 |
|---|---|
| `refresh_token` | 当前有效的 refresh_token |
| `partner_id` | App 的 partner_id |
| `shop_id` | 与 merchant_id 二选一 |
| `merchant_id` | 与 shop_id 二选一 |

#### 第五步：授权取消

**方式一：ERP 发起取消链接**

将固定授权 URL 替换为取消授权 URL：

| 环境 | 取消授权 URL |
|---|---|
| 生产（全球） | `https://open.shopee.com/cancel_auth` |
| 生产（大陆） | `https://open.shopee.cn/cancel_auth` |
| 生产（巴西） | `https://open.shopee.com.br/cancel_auth` |

参数与授权链接一致，卖家登录后点击「Cancel Authorization」即可。

**方式二：卖家中心取消**

- 本土卖家：Seller Center → 首页 → Platform Partner → 找到 App → 点击 Separate
- CNSC/KRSC 卖家：卖家中心 → 开放平台管理 → 取消授权

### 2.3 Push 通知订阅（ERP 后端）

ERP 需订阅以下 Shopee Push 事件：

| Push 类型 | Code | 用途 |
|---|---|---|
| Shop Authorization Push | 1 | 授权成功时获取 shop_id / merchant_id 列表 |
| Shop Authorization Canceled Push | 2 | 授权被取消时通知 |
| Open API Authorization Expiry Push | 12 | 授权到期前 7 天预警 |

---

## 3. ERP 前端授权交互流程

### 3.1 授权入口

保留《店铺重构方案》中的入口设计，但 Shopee 平台的授权行为需特殊处理：

| 入口 | 位置 | 交互 |
|---|---|---|
| **店铺列表 - 操作列** | 列表每行「授权」按钮 | 对已存在但授权过期/未授权的店铺发起重授权 |
| **新增店铺流程** | 点击「新增店铺」→ 选择 Shopee → 填写基础信息 → 授权 | 新增店铺时必须同时完成授权 |
| **店铺详情 - 授权分区** | 详情页授权 Tab | 查看/管理授权状态，发起重授权 |

### 3.2 新增 Shopee 店铺 + 授权流程

```
┌──────────────────────────────────────────────────────────────┐
│                    ERP 新增 Shopee 店铺流程                     │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Step 1: 填写店铺基础信息（弹窗 / Drawer）                       │
│  ┌─────────────────────────────────────────────────────┐     │
│  │  平台：Shopee（已选）                                   │     │
│  │  店铺昵称：[            ] （ERP 内部识别名）              │     │
│  │  站点：[下拉选择] （MY/SG/TH/TW/ID/VN/PH/BR/MX...）    │     │
│  │  店铺类型：[本土店 / 跨境店(CNSC) / 3PF]                 │     │
│  │  事业部：[下拉选择]                                     │     │
│  │  运营负责人：[下拉选择]                                  │     │
│  │  客服负责人：[下拉选择]                                  │     │
│  │                                                       │     │
│  │  [取消]  [下一步：授权店铺]                              │     │
│  └─────────────────────────────────────────────────────┘     │
│        ↓                                                     │
│  Step 2: 引导授权（跳转 Shopee）                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │  正在生成授权链接...                                    │     │
│  │                                                       │     │
│  │  ┌──────────────────────────────────────────────┐    │     │
│  │  │  📋 授权须知                                   │    │     │
│  │  │  • 请使用店铺账号或主账号登录 Shopee             │    │     │
│  │  │  • 主账号可批量授权多个站点店铺                  │    │     │
│  │  │  • 跨境店铺(CNSC/3PF)必须使用主账号授权          │    │     │
│  │  │  • 授权有效期最长 365 天，建议选 365 天          │    │     │
│  │  │  • 跨境店铺请务必勾选「Auth Merchant」          │    │     │
│  │  └──────────────────────────────────────────────┘    │     │
│  │                                                       │     │
│  │  [取消]  [前往 Shopee 授权]                             │     │
│  └─────────────────────────────────────────────────────┘     │
│        ↓                                                     │
│  Step 3: 用户在 Shopee 页面完成授权                            │
│  (Shopee 侧操作，ERP 无法控制)                                 │
│        ↓                                                     │
│  Step 4: 授权回调 → ERP 后端处理                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │  授权成功！                                           │     │
│  │                                                       │     │
│  │  授权账号类型：主账号 / 店铺账号                         │     │
│  │  已授权店铺：3 个                                      │     │
│  │    • shop_1 (MY)                                      │     │
│  │    • shop_2 (SG)                                      │     │
│  │    • shop_3 (TH)                                      │     │
│  │  授权有效期至：2027-05-14                              │     │
│  │                                                       │     │
│  │  [完成]  [继续授权其他店铺]                             │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### 3.3 授权方式差异对照

| 维度 | 店铺账号授权 | 主账号授权 |
|---|---|---|
| 授权店铺数 | 1 个 | 多个（批量） |
| 登录方式 | 直接输入店铺账号密码 | 切换至 Sub Account，输入 `xxx:main` |
| 是否需要 Auth Merchant | 不需要 | 跨境卖家必须勾选 |
| 回调参数 | `shop_id` | `main_account_id` |
| 获取店铺列表 | 直接得到 shop_id | 需通过 token 接口获取 shop_id_list |
| 适用场景 | 本土单店 | 跨境多店 / CNSC / 3PF |
| 后续 token 管理 | 单店独立 token | 初始共享 → 首次刷新后独立 |

### 3.4 已有店铺重授权流程

```
店铺列表 → 找到授权过期/失效店铺 → 点击操作列「授权」
→ 弹窗确认（展示当前店铺信息）
→ 生成授权链接 → 跳转 Shopee
→ 用户登录授权 → 回调
→ ERP 后端更新 token → 前端更新授权状态
```

重授权时，ERP 后端需要用新的 code 换取全新的 token 对，覆盖旧的 token 记录。

---

## 4. 列表页字段调整

基于《店铺重构方案》3.1 公共列骨架，对 Shopee 平台做以下调整：

### 4.1 授权状态列（调整）

原方案「授权状态」为摘要 + Tooltip，针对 Shopee 需更细化：

| 状态 | 颜色 | 说明 |
|---|---|---|
| 已授权 | 绿 | access_token 有效，且在有效期内 |
| 即将过期 | 橙 | 距离授权到期 ≤ 7 天（Push 预警后） |
| 已过期 | 红 | 超过授权有效期，需重新授权 |
| Token 失效 | 红 | access_token 无法刷新（refresh_token 过期或手动取消） |
| 未授权 | 灰 | 从未发起过授权 |
| 授权中 | 蓝（Loading） | 已跳转 Shopee 但尚未回调 |

**Tooltip 明细内容：**

```
授权方式：主账号 / 店铺账号
授权时间：2026-05-14 10:30:00
过期时间：2027-05-14 10:30:00
剩余天数：365 天
Token 状态：正常 / 即将过期 / 已过期
最后刷新时间：2026-05-14 14:00:00
```

### 4.2 Shopee 平台扩展列（补充）

原方案 3.2 中 Shopee 扩展列需要补充：

| 字段 | 展示规则 | 插入位置 | 数据来源 |
|---|---|---|---|
| 是否主账号 | 是/否 Tag | 同步订单时间后 | 授权时记录 |
| 是否 SIP | 是/否 Tag | 是否主账号后 | shop_id 关联 |
| 授权方式 | 主账号授权 / 店铺授权 | 授权状态列 Tooltip | 授权回调记录 |
| 关联店铺数 | 数字（仅主账号显示） | 是否主账号后 | shop_id_list 计数 |

### 4.3 高级筛选项补充

| 字段 | 类型 | 适用平台 | 说明 |
|---|---|---|---|
| 授权方式 | 下拉（主账号/店铺账号） | Shopee | 区分授权入口 |
| 授权到期范围 | 日期范围 | Shopee | 按过期时间筛选 |

---

## 5. 详情页授权分区调整

原方案「八、授权信息分区」对 Shopee 调整为：

### 5.1 授权分区结构

```
┌──────────────────────────────────────────────────────────┐
│  授权信息                                                  │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─ 店铺授权 ─────────────────────────────────────┐      │
│  │  授权状态：● 已授权                              │      │
│  │  授权方式：主账号授权                            │      │
│  │  授权时间：2026-05-14 10:30:00                  │      │
│  │  过期时间：2027-05-14 10:30:00（剩余 365 天）     │      │
│  │  Token 状态：● 正常（最后刷新 14:00）             │      │
│  │  授权账号 ID：main_account_12345                │      │
│  │  关联店铺：                                     │      │
│  │    • shop_1 (MY) — 已授权                       │      │
│  │    • shop_2 (SG) — 已授权                       │      │
│  │    • shop_3 (TH) — 已授权                       │      │
│  │  关联商户 ID：merchant_1001705                   │      │
│  │                                                │      │
│  │  [重新授权]  [取消授权]                          │      │
│  └────────────────────────────────────────────────┘      │
│                                                          │
│  ┌─ 广告授权（如有）─────────────────────────────┐        │
│  │  ...（保持现有逻辑）                             │        │
│  └────────────────────────────────────────────────┘      │
│                                                          │
│  ┌─ 联盟授权（如有）─────────────────────────────┐        │
│  │  ...（保持现有逻辑）                             │        │
│  └────────────────────────────────────────────────┘      │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### 5.2 授权状态颜色（与方案一致）

| 状态 | 颜色 |
|---|---|
| 已授权（正常） | 绿色 #52c41a |
| 即将过期 | 橙色 #faad14 |
| 已过期 | 红色 #ff4d4f |
| Token 失效 | 红色 #ff4d4f |
| 未授权 | 灰色 #d9d9d9 |

### 5.3 取消授权交互

```
点击「取消授权」
→ Popconfirm：「确认取消该店铺的 Shopee 授权吗？取消后将无法同步订单和产品数据。」
→ 确认后：
   方案 A：生成取消授权链接，引导用户跳转 Shopee 完成取消（推荐，与平台规范一致）
   方案 B：后端标记授权失效，停止 API 调用（需同时通知用户在卖家中心取消）
→ 取消成功后，授权状态变为「未授权」
```

---

## 6. Token 生命周期管理（后端）

### 6.1 存储模型

```
shopee_token 表：
├── id
├── shop_id          (ERP 内部店铺 ID)
├── platform_shop_id  (Shopee shop_id)
├── merchant_id       (Shopee merchant_id，跨境店有值)
├── auth_type         (shop_account / main_account)
├── main_account_id   (主账号 ID，主账号授权时有值)
├── access_token      (加密存储)
├── refresh_token     (加密存储)
├── token_expire_at   (access_token 过期时间)
├── refresh_expire_at (refresh_token 过期时间)
├── auth_expire_at    (授权有效期截止时间)
├── auth_time         (最近授权时间)
├── created_at / updated_at
```

### 6.2 刷新策略

```
定时任务（建议每 30 分钟执行）：
  FOR EACH shopee_token WHERE token_expire_at < NOW() + 30min：
    IF refresh_expire_at > NOW()：
      调用 RefreshAccessToken API
      更新 access_token + refresh_token + 过期时间
      记录刷新日志
    ELSE：
      标记授权状态 = "expired"
      触发通知（ERP 内消息 + 店铺列表状态更新）
```

### 6.3 异常处理

| 异常 | 处理方式 |
|---|---|
| refresh_token 过期（30 天未刷新） | 标记授权过期，通知用户重新授权 |
| 授权被卖家取消 | Push 通知触发 → 标记授权取消 → 停用 API 调用 |
| 授权到期（365 天） | Push 提前 7 天预警 → 列表显示「即将过期」→ 到期后标记过期 |
| API 调用签名错误 | 检查 partner_key 和签名算法，重试 1 次 |
| Token 丢失（未保存最新 refresh_token） | 引导用户重新授权 → 参考 [Shopee FAQ#216](https://open.shopee.com/faq?top=177&sub=180&page=1&faq=216) |
| access_token 调用返回 token 无效 | 使用 refresh_token 获取新 token，若 refresh_token 也无效则标记过期 |

---

## 7. 与其他平台的差异对照

| 维度 | Shopee | Amazon (SP-API) | Lazada |
|---|---|---|---|
| 授权方式 | OAuth 2.0 跳转授权 | OAuth 2.0 + IAM Role | OAuth 2.0 |
| 账号层级 | 主账号 / 店铺账号 | Seller Central 账号 | 店铺账号 |
| 批量授权 | 主账号一次多店 | 不直接支持 | 不直接支持 |
| Token 有效期 | access: 4h, refresh: 30d | access: 1h, refresh: 长期 | access: 1h-7d |
| 授权有效期 | 最长 365 天（卖家可选） | 无固定期限 | 无固定期限 |
| 过期预警 | Push 通知（7 天前） | 无 | 无 |
| Auth Merchant | 跨境卖家必须勾选 | N/A | N/A |
| 取消授权 | cancel_auth 链接 / 卖家中心 | 卖家中心 | 卖家中心 |
| IP 隔离 | 不需要（官方 API 接口） | 不需要 | 不需要 |

---

## 8. 信息缺口 & 待确认清单

| # | 问题 | 优先级 |
|---|---|---|
| 1 | ERP 作为 Shopee Open Platform 开发者是否已注册并创建 App？partner_id / partner_key 是否已获取？ | 🔴 高 |
| 2 | ERP 后端 Shopee Token 刷新模块是否已开发？还是本期新建？ | 🔴 高 |
| 3 | 一个 ERP 主账号下允许多少个 Shopee 店铺？是否有上限？ | 🟡 中 |
| 4 | 同一 Shopee 店铺是否允许授权到不同 ERP 账号？（BigSeller 支持） | 🟡 中 |
| 5 | 授权过期后，已同步的历史订单数据是否保留可查看？还是标记不可用？ | 🟡 中 |
| 6 | Shopee 广告授权、联盟授权是否本期一起做？还是延后？ | 🟢 低 |
| 7 | 取消授权时，采用方案 A（引导跳转 Shopee）还是方案 B（后端标记 + 提醒）？ | 🟢 低 |
| 8 | 回调地址（redirect_uri）的域名和路径是否已确定？需在 Shopee Console 配置 | 🔴 高 |

---

## 9. 验收标准

### 9.1 授权流程

- [ ] 新增 Shopee 店铺时，填写基础信息后能正确跳转 Shopee 授权页
- [ ] 授权链接在 5 分钟内有效，超时后点击提示「授权链接已过期，请重新发起」
- [ ] 店铺账号授权：授权成功后回调正确解析 shop_id，token 正确存储
- [ ] 主账号授权：授权成功后回调正确解析 main_account_id，批量获取 shop_id_list 和 merchant_id_list
- [ ] 主账号授权时，前端提示用户勾选「Auth Merchant」（跨境店铺）
- [ ] 授权成功后，ERP 内自动创建对应的店铺记录（主账号场景下批量创建）
- [ ] 重授权：已过期店铺点击「授权」→ 完成 Shopee 授权 → token 更新 → 状态恢复

### 9.2 Token 管理

- [ ] access_token 在过期前自动刷新，不影响正常业务调用
- [ ] refresh_token 过期后标记授权为「已过期」，并发送通知
- [ ] 主账号初始共享 token → 首次刷新后各 shop/merchant 独立 token
- [ ] token 存储加密，不可明文

### 9.3 列表 & 详情展示

- [ ] 店铺列表「授权状态」列正确展示 6 种状态（含即将过期）
- [ ] Tooltip 展示完整授权信息（方式、时间、有效期、Token 状态）
- [ ] Shopee 扩展列正确展示：是否主账号、是否 SIP、授权方式、关联店铺数
- [ ] 详情页授权分区正确展示关联店铺列表和商户 ID

### 9.4 异常处理

- [ ] 授权过期前 7 天，列表状态变为「即将过期」（橙色）
- [ ] 卖家在 Shopee 侧取消授权后，ERP 通过 Push 或轮询感知并更新状态
- [ ] 授权回调失败时（code 过期等），前端给出明确提示并允许重试

### 9.5 兼容性

- [ ] 不破坏现有其他平台（Amazon、Lazada 等）的授权逻辑
- [ ] 列表公共列骨架保持不变，仅 Shopee 平台追加扩展列
- [ ] 详情页三大分区结构不变，授权分区内按平台差异化展示

---

## 10. 附录：关键 API 速查

| API | Method | 路径 | 用途 |
|---|---|---|---|
| 获取 Token | POST | `/api/v2/auth/token/get` | code → access_token + refresh_token |
| 刷新 Token | POST | `/api/v2/auth/access_token/get` | refresh_token → 新 token 对 |
| 获取店铺信息 | GET | `/api/v2/shop/get_shop_info` | 获取店铺基本信息 |
| 获取商户信息 | GET | `/api/v2/merchant/get_merchant_info` | 获取商户信息 |
| 获取已授权店铺 | GET | `/api/v2/public/get_shops_by_partner` | Public API，获取 partner 下已授权店铺列表 |
| 获取已授权商户 | GET | `/api/v2/public/get_merchants_by_partner` | Public API，获取 partner 下已授权商户列表 |

> 备注：所有 Shop API 调用需携带 `partner_id + timestamp + sign + access_token + shop_id`
> Merchant API 调用需携带 `partner_id + timestamp + sign + access_token + merchant_id`
