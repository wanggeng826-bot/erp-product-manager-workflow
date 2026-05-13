# Claude ↔ Codex 交接协议

> 本文件规定 **Claude 输出 PRD** 与 **Codex 生成原型** 之间的标准交接形式。
> 一句话：PRD 末尾必须有一节叫"原型生成输入包"，Codex 只读这一节就能干活。

## 1. 为什么要这个协议

之前的问题：

- Claude 写 PRD → Codex 接到长 markdown → Codex 要"自己读懂业务 + 自己推断组件 + 自己编 mock 数据"
- 结果：每次原型质量不稳，Codex 会发明 Figma 库里没有的组件、用错 token、漏掉权限分支
- 根本原因：**交接的载体是"散文式 PRD"，不是"结构化输入"**

这个协议要做的：

- PRD 主体（1-7 节）继续是给人看的散文 + 表格 + mermaid
- PRD 末尾新增一节"**原型生成输入包**"——给 Codex 看的结构化 JSON-like 表格
- Codex 拿到 PRD 后，**只需读这一节就能开工**

---

## 2. 谁产什么、放哪、何时停

```
┌─────────┐                      ┌─────────┐                      ┌──────────┐
│ Claude  │ ── 写 PRD + 输入包 ──▶│ 落地于  │ ── Codex 读 ────────▶│  Codex   │
│ (我)    │                      │ intake/ │                      │  生成原型 │
│         │                      │ prd/    │                      │          │
└─────────┘                      └─────────┘                      └──────────┘
     │                                                                   │
     ▼                                                                   ▼
 用户确认 PRD                                                    用户验收原型
     │                                                                   │
     │ 如果原型出来后用户改主意 →                                          │
     │   小改 → 直接改 prototype/                                          │
     │   大改 → 回到 Claude 改 PRD + 输入包 → Codex 重生成                  │
     ▼                                                                   ▼
 沉淀回 knowledge/                                            截图归档到 prototype/<name>/
```

### Claude 的边界（我）

- ✅ 写需求澄清、冻结事实、PRD 主体、原型生成输入包
- ✅ 把 PRD 保存到 `intake/prd/<name>.md`
- ✅ 沉淀稳定信息到 `knowledge/modules/<module>.md`
- ❌ 不生成原型 HTML（那是 Codex 的事）
- ❌ 不直接改 `prototype/` 下的代码（除非用户要 UI 评审/微调）

### Codex 的边界（独立工具）

- ✅ 读 `intake/prd/<name>.md` 的"原型生成输入包"那节
- ✅ 按输入包指向的 Figma fileKey + ui-library 路径取组件
- ✅ 生成 `prototype/<name>/index.html` + `styles.css` + `script.js`
- ✅ 跑 binding-checklist 自检
- ❌ 不自己脑补业务规则（PRD 没写就回 Claude 问）
- ❌ 不发明 Figma 库里没有的组件

---

## 3. 输入包结构（PRD 必有的最后一节）

PRD 末尾必有一节 `## X. 原型生成输入包（Codex 消费）`，按以下七块结构填：

### 3.1 必读引用（Required Reading）

```yaml
figma:
  fileKey: KaI3eGyylfiwrPlU3OR08C
  page_to_use: "04 Templates" or "03 ERP Patterns"
  preferred_template: ListPageTemplate   # 或 "自定义"

html_mirror:
  tokens_css: ../../ui-library/tokens.css
  components_dir: ../../ui-library/components/

specs:
  - knowledge/figma-ant-design-ui-library.md
  - knowledge/product-design-preferences.md
  - skills/erp-product-manager/references/ui-interaction-spec.md
  - skills/erp-product-manager/references/erp-reference-patterns.md
  - skills/ui-optimization-master/references/erp-ui-pattern-library.md
```

### 3.2 页面清单（Page Inventory）

每页一行，明确总数（**Codex 不得新增**）：

| 页面 ID | 页面名称 | 路径建议 | 模板 | 是否包含抽屉/弹窗 |
|---|---|---|---|---|
| P1 | 订单列表 | `/orders/list` | ListPageTemplate | DetailDrawer + RiskConfirm |
| P2 | 订单详情（独立页） | `/orders/:id` | ErpShell + 自定义 | — |

### 3.3 组件映射表（Component Map）

每个页面的每个可见区域都要映射到 Figma 库 / ui-library 镜像里已有的组件名：

| 页面 | 区域 | Figma 组件 | HTML 镜像 | Notes |
|---|---|---|---|---|
| P1 | 顶部壳 | ErpShell | components/erp-shell.html | 侧栏含 4 个一级菜单 |
| P1 | 标题区 | PageHeaderBar | components/page-header-bar.html | 主操作"+ 新建订单" |
| P1 | 筛选区 | QueryFilterBar | components/query-filter-bar.html | 4 个高频字段 + 折叠更多 |
| P1 | 结果区 | DataTablePanel | components/data-table-panel.html | 含 BatchActionBar |
| P1 | 详情 | DetailDrawer | components/detail-drawer.html | 4 个 Tab |

**禁止**自己发明组件——如果输入包里某个区域映射不到任何已有组件，回 Claude 反馈，由 Claude 决定补组件还是改方案。

### 3.4 状态覆盖矩阵（State Matrix）

每个页面 × 8 态，至少标"必有/可选/不适用"：

| 页面 | 默认 | 加载 | 空 | 筛选无结果 | 错误 | 成功反馈 | 禁用 | 无权限 |
|---|---|---|---|---|---|---|---|---|
| P1 | 必 | 必 | 必 | 必 | 必 | 必 | 可选 | 必 |
| P2 | 必 | 必 | 不适 | 不适 | 必 | 可选 | 必 | 必 |

### 3.5 风险操作清单（Risk Operations）

哪些动作要 `RiskConfirm`、文案怎么写：

| 动作 | 触发位置 | 风险等级 | 二次确认形式 | 文案 |
|---|---|---|---|---|
| 单条取消订单 | 详情抽屉底部 | 中 | Popconfirm | "取消订单 O-XXX？取消后库存自动释放，不可撤回。" |
| 批量取消 | 列表批量条 | 高 | Modal.confirm | "将取消已选 N 条订单。涉及 ¥X 金额，操作后…" |

### 3.6 权限差异表（Permission Matrix）

| 角色 | 进入页面 | 看到字段 | 可操作 | 备注 |
|---|---|---|---|---|
| 客服 | ✅ | 全部 | 查看 + 取消（小金额） | 大额取消提示「联系主管」 |
| 主管 | ✅ | 全部 | 全部 | — |
| 财务（只读） | ✅ | 不含联系电话 | 仅查看 + 导出 | — |

### 3.7 Mock 数据样本（Mock Samples）

至少给 5-8 条真实样子的 mock，让 Codex 不用编：

```json
[
  {"id": "O-20260512-000001", "user": "张三", "channel": "Amazon US", "status": "已支付", "amount": 1280.00, "ts": "2026-05-12 10:23"},
  {"id": "O-20260512-000002", "user": "李四", "channel": "eBay UK",   "status": "待支付", "amount":  580.00, "ts": "2026-05-12 11:02"}
]
```

如果有多个对象（订单/商品/用户），分别给样本。

---

## 4. 文件位置约定

```
New project/
├── intake/prd/<short-name>.md       ← Claude 把完整 PRD 放这里
├── prototype/<short-name>/          ← Codex 把生成的原型放这里
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   ├── prototype-spec.md            ← Codex 自带的页面来源映射 + 组件映射回写
│   └── screenshot.png               ← 验收截图
└── knowledge/modules/<module>.md    ← Claude 把"系统业务规则"沉淀到这里
```

**短名命名**：用 `<业务域>-<动作>` 的 kebab-case，例：`order-batch-cancel`、`refund-approval-flow`、`package-intercept-config`。

---

## 5. 触发动作的关键字

### Claude 应该停下来等用户的信号

- "出 PRD" / "需求要做完了" / "可以画原型了" → Claude 把 PRD 写到 `intake/prd/<name>.md`，停下，让用户去 Codex 接手
- "PRD 里 X 缺了" → Claude 改 PRD 后告诉用户重新触发 Codex

### Codex 应该停下来回 Claude 的信号

- 输入包里某个组件映射不到 → 在 `prototype-spec.md` 里写下"映射断裂：X 区域无对应组件"，停下来等 Claude
- 输入包里某个状态没写清楚 → 同上
- 业务规则模糊（"取消后库存怎么释放"PRD 没说）→ 同上

### 用户要在 Claude / Codex 之间切换的信号

- PRD 文档生成 → 在 Claude 这边
- HTML 原型生成 / 改原型代码 → 在 Codex 那边
- UI 评审、原型 QA、Ant Design 合规检查 → 在 Claude 这边（`$ui-optimization-master`）
- 业务方案变更 → 在 Claude 这边改 PRD + 输入包，再回 Codex 重生

---

## 6. 反馈环（迭代）

```
v0.1 PRD → Codex 出 v0.1 原型 → 用户看 → 反馈
                                            │
                ┌───────────────────────────┴───────────────────────────┐
                ▼                                                       ▼
     小改（位置、文案、状态）                                   大改（流程、字段、权限）
                │                                                       │
                ▼                                                       ▼
     用户在 Codex 那边直接改                                 Claude 改 PRD + 输入包
                │                                                       │
                ▼                                                       ▼
     prototype/ 增量更新                                      Codex 按新输入包重生
                │                                                       │
                └────────────────────┬──────────────────────────────────┘
                                     ▼
                  从最终原型反向沉淀业务规则到 knowledge/modules/
```

**关键约定**：原型反复改后，**最终业务规则要回写到 knowledge/modules/**——不能让 PRD 和原型不一致就停在那里。沉淀这一步由 Claude 在用户验收完成后主动做。

---

## 7. 谁来维护这个协议

- 协议本身（本文件）：Claude 在跨需求大改的时候提议更新
- PRD 模板：在 `skills/erp-product-manager/references/prd-template.md`
- 范例 PRD：在 `knowledge/prd-example-*.md`

每次发现 Codex 接错了什么、或者 Claude 漏给了什么，先记到 `findings.md`，攒到 3-5 次后做一次协议升级。

---

## 8. Changelog

- 2026-05-13 · v0.1 初版，由 freddy + Claude 共同制定。背景：用户希望 Claude 出 PRD、Codex 出原型，需要协议化 handoff，避免 Codex 每次"自己推断"。
