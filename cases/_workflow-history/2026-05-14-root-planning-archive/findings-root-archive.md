# Findings: ERP Order And Package Flow Research

## Local Context Findings

- 仓库定位：当前项目是跨境电商自研 ERP 的 PM 工作流和知识沉淀仓库，不是业务功能代码仓库。
- 当前检索未发现 `docs/` 目录、业务代码目录或测试目录；`package.json` 仅声明 `playwright` 依赖，无 npm scripts。
- 长期稳定知识进入 `knowledge/`；当前任务过程进入 `task_plan.md`、`findings.md`、`progress.md`。
- 新任务默认不读取 `cases/**`；本次未读取历史退款案例。
- 主线示例中 `prototype/order-management/` 可作为订单模块命名参考，但本次不是原型输出，拟新增 `docs/order-package-flow/` 存放手册和截图。

## ERP Page Findings

### 订单列表

- 页面 URL：`/yh-oms/omsList`。
- 顶部面包屑/标签：订单-首页、订单列表。
- 左侧可见菜单：订单-首页、库存管理、调拨管理、订单管理、销售看板、SMT仓发接单列表、订单报表、包裹管理、基础配置、运营管理。
- 包裹管理已展开，可见子菜单：包裹列表、包裹拦截。
- 状态页签：全部、待付款、待检测、待盈亏、待审核、待发货、部分发货、已发货、已取消、异常、可合并、缺货、作废。
- 基础筛选项：单号类型（默认平台单号）、关键词输入、平台、店铺、站点；按钮包括搜索、高级筛选、重置、常用搜索。
- 列表操作区：手工订单、操作订单、批量处理、批量操作包裹、下载订单、数据导出、订单任务、异常处理、批量复制、SKU映射、匹配规则。
- 表格列：订单信息、产品信息、费用信息、包裹信息、时间；当前截图状态显示暂无数据、分页、每页条数。
- 高级筛选弹窗标题为“订单高级筛选”，按钮为“重置筛选条件”“确定”“取消”。
- 高级筛选首屏字段：创建时间、付款时间、订单下载时间、平台最后更新时间、跟踪号有效期、订单发货、扫描时间、打包时间、系统标签、部门、订单金额(CNY)、订单利润(CNY)、订单利润率(%)、是否结算、是否变更收入、是否重发、订单重量(KG)、平台配送方式、订单类型、平台单号、锁定状态、是否拆分/合并、订单来源、卖家备注旗帜、平台产品名称、平台订单状态、产品类目、SKU销售状态。

### 待审订单

- 页面 URL：`/yh-oms/toBeReviewed`。
- 订单管理展开后可见子菜单：订单列表、待审订单、退款订单、异常订单、退款订单、SKU映射、运费试算、产品资料库、退件列表、退件认领列表。
- 页面顶部筛选项：单号类型（平台单号）、关键词、平台、店铺、站点；按钮包括搜索、高级筛选、重置、常用搜索。
- 操作按钮：一键审核、批量提交审核、数据导出。
- 表格列：平台订单信息、产品信息、费用信息、发货信息、操作。
- 当前截图处于加载/暂无数据状态，未确认单条操作弹窗。

### 包裹列表 / 包裹拦截

- 左侧包裹管理展开后可见子菜单：包裹列表、包裹拦截。
- 包裹列表 URL：`/yh-oms/omsPackage`。
- 包裹拦截 URL：`/yh-oms/interception`。
- 2026-05-07 12:40 左右，`omsList`、`toBeReviewed`、`omsPackage`、`interception` 四个 OMS 业务路径均可建立 TCP 连接，但 HTTP 请求 8 秒内无响应，Chrome 展示 `ERR_EMPTY_RESPONSE`。
- 因服务空响应，包裹列表和包裹拦截页面字段、按钮、弹窗未能完成页面级确认；正式知识库中必须列入待确认。

## Source Map

| Source | Evidence Captured | Notes |
|--------|-------------------|-------|
| Local project docs | README、START_HERE、knowledge、intake/prototype README、Skill references | 未发现业务代码/测试；不读取 `cases/**` |
| Test ERP pages | 订单列表、高级筛选、待审订单、包裹菜单、业务路径空响应截图 | 通过 Chrome 已有登录态读取；包裹页面因 OMS 空响应未完成字段采集 |

## Confirmed Facts

- ERP 是中文 B 端后台，UI 基线为 Ant Design 风格。
- 订单列表页存在大量状态页签和批量操作入口，需要明确风险等级。
- 订单与包裹在列表页已通过“包裹信息”列、批量操作包裹和包裹管理菜单产生关联。
- 待审订单是订单管理下的独立子菜单，不仅是订单列表中的“待审核”状态页签。
- 待审订单支持一键审核、批量提交审核、数据导出。

## Reasonable Inferences

- 订单列表是订单全量检索、状态筛选、批量处理和异常处理的主入口。
- 订单列表“待审核”页签与“待审订单”独立页面很可能服务于同一审核链路的不同操作视角：前者在全量订单列表中筛状态，后者集中处理审核动作。
- 包裹列表通常承接已生成包裹的查询、物流信息查看、状态跟踪和包裹相关操作；包裹拦截通常承接已发货前后异常干预，但具体状态条件需复核。

## Open Questions

- 审核订单、异常处理、包裹拦截的具体弹窗字段和后置状态变化。
- 订单、库存、仓储、物流、退款的系统级状态联动规则。
- 包裹列表的筛选项、表格字段、状态、详情页和批量操作。
- 包裹拦截的筛选项、表格字段、可拦截条件、拦截结果和失败原因。


## Differences Between Local Docs And Test ERP

- 本地知识库此前只记录自研 ERP 通用规则，没有订单/包裹模块事实。
- 本地未发现可对照的业务代码、测试或订单模块文档；测试 ERP 页面是本次事实来源。
- 测试 ERP 当前业务路径出现空响应，导致包裹相关页面无法与文档交叉验证。

---

# Findings: Ant Design Figma UI Library

## User Intent

- 用户希望按参考视频思路，在自己的 Figma 中生成 Ant Design 组件库。
- 后续让 Codex 设计原型图时，需要优先从该 UI 库找素材并生成页面。
- 整体 UI 风格必须保持 Ant Design 一致，且适配本项目中文 B 端 ERP 风格。

## Local Workflow Findings

- 项目已有 `ui-library/`，它把视频方法落地为 `tokens.css`、`tokens.md`、`components-index.md`、组件 HTML 片段和 binding checklist。
- 本地 `ui-library/components-index.md` 的首版核心组件包括 `ErpShell`、`PageHeaderBar`、`QueryFilterBar`、`DataTablePanel`、`DetailDrawer`，待补组件包括 `EditDrawer`、`CreateModal`、`RiskConfirm`、`StoreSelector` 等。
- `skills/ui-optimization-master/references/ant-design-video-workflow.md` 明确流程为 `Input Package -> Ant Foundation -> Ant Components -> Page Assembly -> Spec Reverse Check -> Component Binding -> Review Gate -> Revision`。
- Figma MCP 已 OAuth 授权，默认使用 remote MCP；desktop MCP 仅作为当前选中 frame 备用。

## Ant Design Official Findings

- Ant Design 当前官网强调企业级 Web 应用组件库、TypeScript、国际化和主题定制能力。
- 用户补充指定组件来源：`https://ant.design/components/overview-cn`，组件设计必须以该中文组件总览为准。
- 组件总览当前展示版本为 `6.3.7`，官方分类包括通用、布局、导航、数据录入、数据展示、反馈、其他、重型组件。
- Ant Design token 体系使用 Seed Token、Map Token、Alias Token；核心默认值包括 `colorPrimary: #1677ff`、`colorSuccess: #52c41a`、`colorWarning: #faad14`、`colorError: #ff4d4f`、`borderRadius: 6`、`controlHeight: 32`。
- Ant Design 字体系统以系统默认字体栈为优先，基础字号为 14，对应行高 22；常用字重以 regular 400 和 medium 500 为主。
- Button 官方类型包括 Primary、Default、Dashed、Text、Link，并支持 danger、ghost、disabled 等状态。
- Input 官方 token 包括 default/large/small 字号与 padding、focus/hover/error 状态边框和阴影。

## Official Component Categories From Overview CN

| Category | Components |
|----------|------------|
| 通用 | Button、FloatButton、Icon、Typography |
| 布局 | Divider、Flex、Grid、Layout、Masonry、Space、Splitter |
| 导航 | Anchor、Breadcrumb、Dropdown、Menu、Pagination、Steps、Tabs |
| 数据录入 | AutoComplete、Cascader、Checkbox、ColorPicker、DatePicker、Form、Input、InputNumber、Mentions、Radio、Rate、Select、Slider、Switch、TimePicker、Transfer、TreeSelect、Upload |
| 数据展示 | Avatar、Badge、Calendar、Card、Carousel、Collapse、Descriptions、Empty、Image、List、Popover、QRCode、Segmented、Statistic、Table、Tag、Timeline、Tooltip、Tour、Tree |
| 反馈 | Alert、Drawer、Message、Modal、Notification、Popconfirm、Progress、Result、Skeleton、Spin、Watermark |
| 其他 | Affix、App、ConfigProvider、Util |
| 重型组件 | ProLayout、ProForm、ProTable、ProDescriptions、ProList、EditableProTable |

## Figma Library Scope V1

| Layer | Planned Assets |
|-------|----------------|
| Foundation | Color, text, border, background, spacing, radius, shadow, control height variables |
| Base Components | Button, Input, Select, StatusTag, Pagination, EmptyState |
| ERP Components | PageHeaderBar, QueryFilterBar, DataTablePanel, DetailDrawer, RiskConfirm, StoreSelector |
| Templates | ErpShell, List Page Template, Detail Drawer Template |

## Figma Delivery Inventory

- Figma URL: `https://www.figma.com/design/KaI3eGyylfiwrPlU3OR08C`
- Pages: `00 Cover`、`01 Foundations`、`--- Components`、`02 Components / Base`、`03 Components / ERP Patterns`、`04 Templates`
- Variables: `Ant ERP / Colors` 28 个、`Ant ERP / Metrics` 30 个
- Component sets: Button、Input、Select、Checkbox、Radio、Switch、Tag、Alert
- Components: Pagination、Tabs、Empty、Spin、Skeleton、PageHeaderBar、QueryFilterBar、DataTablePanel、DetailDrawer、RiskConfirm、StoreSelector、ErpShell、ListPageTemplate

## Open Notes

- 如需跨 Figma 文件自动作为 Library 检索，用户需要在 Figma 中发布该文件为团队 Library；Codex 可以在同一文件内直接实例化本地组件。

---

# Findings: OMS System Flow Demo Refresh

## User Intent

- 用户要求生成一个 OMS 系统 demo，并“用现在最近的流程跑一跑效果”。
- 结合项目上下文，本轮理解为：基于当前最新 PM/UI/组件库流程，对已有 OMS HTML 原型复跑并增强为可点击的订单履约流程 demo。
- 用户没有要求读取历史 `cases/**`；本轮不读取历史案例。

## Workflow And Component Source

- 已使用本地项目 Skill：`erp-product-manager`、`ui-optimization-master`、`karpathy-guidelines`、`planning-with-files`。
- Figma 组件库已验证：`whoami` 为 `wanggeng826@gmail.com / Freddy`；`get_metadata(fileKey=KaI3eGyylfiwrPlU3OR08C, nodeId=0:1)` 返回 Cover 和 Base Components Preview。
- 已读取 `get_design_context(nodeId=16:151)`；本轮 HTML 实现不引入 React/Tailwind，按工具提示转换为项目现有静态 HTML/CSS/JS 和 token 体系。
- HTML 镜像规则要求原型引用 `ui-library/tokens.css`，组件命名与 Figma 库保持一致。

## Current Prototype Findings

| Area | Current State | Gap For This Task |
|------|---------------|-------------------|
| Shell | 已有 OMS 侧边栏、页面头、订单/待审/包裹菜单 | 可保留 |
| Query | 已有单号、关键词、StoreSelector、站点、付款时间、高级筛选 | 可保留 |
| Results | 已有状态页签、批量条、订单表格、分页 | 页签计数是硬编码，流程变更后不会同步 |
| Drawer | 已有订单详情、商品费用、包裹履约、履约轨迹、操作日志 | 需要跟随流程变更显示最新状态 |
| Flow | 当前只有只读展示，没有可跑的订单履约链路 | 需要新增流程演练区 |
| Risk | 没有高风险动作确认 | 需要补 `RiskConfirm` 风格的包裹拦截确认 |

## Flow Source Map

| Visible Area | Requirement Source | Handling |
|--------------|--------------------|----------|
| OMS 后台壳层 | 用户要求 OMS 系统 demo + ERP UI library | 保留 `ErpShell` |
| 订单履约流程演练 | 用户要求“跑一跑效果” + `order-package-flow.md` 合理推断 | 增加业务流程区，非调试面板 |
| 状态页签 | `order-package-flow.md` 已确认订单状态 | 动态计数，随流程状态更新 |
| 表格/详情抽屉 | 已有原型 + 订单列表已确认列 | 更新行状态、包裹号、履约轨迹 |
| 包裹拦截确认 | 高风险操作规则 + 包裹拦截待确认 | 只表达风险确认和演示状态，不声明真实拦截字段 |

## Component Map

| Page Area | Component | Ant Design Mapping |
|-----------|-----------|--------------------|
| Admin shell | `ErpShell` | Layout / Sider / Menu / Breadcrumb |
| Header | `PageHeaderBar` | Typography / Space / Button |
| Query | `QueryFilterBar` + `StoreSelector` | Form / Input / Select / TreeSelect |
| Flow demo | `ContentPanel` + `Steps` + `FeedbackState` | Steps / Alert / Message |
| Results | `DataTablePanel` + `BatchActionBar` | Table / Tag / Pagination / Alert |
| Detail | `DetailDrawer` + `OperationLog` | Drawer / Descriptions / Timeline |
| Risk | `RiskConfirm` | Modal.confirm |

## Assumptions

- Demo 使用一条样例订单 `SO202605090016` 来跑通流程，不连接真实接口。
- 当前可演练主链路为：平台订单同步 -> 风控/库存/利润检测 -> 审核通过 -> 生成包裹 -> 仓库交接 -> 已发货。
- 包裹拦截只作为高风险确认交互样例；真实拦截条件、失败原因和后置影响仍为待确认。

## Verification Findings

- `node --check prototype/oms-system/script.js` 通过。
- 本地 Playwright smoke check 结果：`initialStatus=待检测`、`completedStatus=已发货`、`completedPackage=PKG-MY-0512-016`、`shippedCount=2`。
- 拦截确认链路通过：包裹生成后 `openInterceptBtn` 可用，`RiskConfirm` 弹窗可见，确认后 `flowResultTag=拦截中`、异常计数更新为 `2`。
- 详情与店铺交互通过：`drawerOpen=1`、`storeOpen=true`。
- 布局检查通过：`rightOverflow=false`，1440 桌面宽度无页面横向溢出。

---

# Findings: OMS Figma Style Correction

## User Feedback

- 用户指出 OMS UI 应偏 B 端、符合中国用户口味，并质疑上一版没有参考 Figma 文件里的 UI 设计样式和规范。
- 该反馈成立：上一版完成了流程交互，但视觉绑定不充分。

## Root Cause

| Problem | Cause | Fix Direction |
|---------|-------|---------------|
| 只验证 Figma 库存在，没有真正套用模板 | 上轮只读了 Cover/Base Components，没有读取 `03 Components / ERP Patterns` 和 `04 Templates` | 补读 ERP Patterns 与 ListPageTemplate，并按其结构调整页面 |
| 页面保留旧版自定义样式 | `styles.css` 仍大量使用旧变量和手写样式，如自定义深色侧栏、指标卡、表格阴影 | 重写为 token-first，接近 HTML 镜像和 Figma template |
| 页面像展示 demo | `operation-strip` 和三列 flow card 抢了列表主任务权重 | 删除指标卡，把流程压缩为业务处理条 |
| 组件绑定不够清晰 | 类名不是 `c-shell / c-filter / c-table-panel / c-drawer` 系，但页面区域能映射 | 视觉和规格明确映射到 Figma 组件，保留现有 JS hooks |

## Figma Reference Findings

- `03 Components / ERP Patterns` 节点已读取，包含：
  - `PageHeaderBar` `11:2`
  - `QueryFilterBar` `11:11`
  - `DataTablePanel` `11:39`
  - `DetailDrawer` `11:118`
  - `RiskConfirm` `11:142`
  - `StoreSelector` `11:150`
- `04 Templates` 节点已读取，包含：
  - `ErpShell` `13:46`
  - `ListPageTemplate` `13:70`
- `ListPageTemplate` design context 显示目标布局：
  - 1440 宽画布，左侧 200px 深色 `#001529` 侧栏
  - 顶栏 56px 白底，面包屑 40px
  - 内容区 padding 20px，模块 gap 16px
  - PageHeaderBar 高 96px，白底，主标题 20px
  - QueryFilterBar 高 156px，白底细边框，控件高度 32px
  - DataTablePanel 高 500px，白底细边框，Toolbar 56px，表头 48px，行高 64px

## Correction Source Map

| Visible Area | Figma/Rule Source | Correction |
|--------------|-------------------|------------|
| Shell | `ErpShell` / `ListPageTemplate` | 调整为 200px Ant 深色侧栏、56px 顶栏、40px 面包屑节奏 |
| Header | `PageHeaderBar` | 白底标题块，减少 sticky/毛玻璃感 |
| Query | `QueryFilterBar` | 控件 32px、label 12px、白底细边框 |
| Flow | 用户要求跑流程 + Anti-pattern catalog | 压缩为业务处理条，不做大卡片 dashboard |
| Table | `DataTablePanel` | Toolbar、状态页签、表格行高和分页按 B 端密度调整 |
| Drawer/Modal | `DetailDrawer` / `RiskConfirm` | 对齐 67vw 抽屉和 Modal.confirm 风格 |

## Verification Findings

- 脚本检查：`node --check prototype/oms-system/script.js` 通过。
- 反模式扫描：未发现 `operation-strip`、`strip-item`、`demo-state`、`role switch`、`state switch`、`debug`、`调试`、`角色切换`、`状态切换`。
- 硬编码颜色扫描：除平台品牌色和 Ant 侧栏基础色外，样式已回到 token / CSS variable。
- 浏览器验证：
  - `shellColumns=200px 1240px`
  - `topbarHeight=56px`
  - `breadcrumbHeight=40px`

---

# Findings: OMS UI Domestic ERP Hardening

## Screenshot Root Causes

| Screenshot | Root Cause | Corrective Rule |
|------------|------------|-----------------|
| 图一流程块 | 把“跑 demo 效果”直接做成首屏业务模块，且出现“样例订单流程 / 运行下一步 / 重置流程”等 demo 语言 | 正式列表页不要在表格前放演示流程块；需要流程时降低权重、下沉、折叠或转成真实业务进度 |
| 图二顶部 | 只实现了 56px 顶栏尺寸，没有按 `ErpShell` 补齐折叠菜单、全局搜索、帮助、通知、用户身份 | ERP 顶部栏必须有标准壳层动作区，不能是孤立标题条 |
| 图三下拉 | 使用原生 `<select>`，点击时暴露浏览器/系统默认下拉视觉 | HTML 原型用 Ant 风格 Select trigger + popup，不使用可见原生 `<select>` |
| 图四关键词 | 关键词是单行输入，未覆盖批量搜索场景，也没有输入完成回显 | 建立 `BatchSearchInput`：textarea 展开、换行/逗号解析、识别数量、chip 回显 |

## Ant Design Proximity Findings

- 官方 `proximity-cn` 的核心：关联性越高的信息距离越近，越像一个视觉单元；不相关的信息距离更远，以帮助用户看清页面结构。
- 纵向层级使用 8px 基础间距，常用 8/16/24；不够时可叠加基础间距或使用分割线。
- 横向布局应使用栅格保证灵活性；组件内部的横向间距也应有层次。

## Current Correction Map

| Area | Correction |
|------|------------|
| Header | 补齐菜单按钮、模块名、全局搜索、帮助、通知、头像和用户信息 |
| Filters | 全部可见 `select` 替换为 `.select-trigger` + `.select-menu` |
| Batch Search | 点击关键词控件后展示矩形 textarea，输入按换行/英文逗号/中文逗号解析 |
| Echo | 应用后在筛选区下方展示 chip：店铺、单号值、溢出数量 |
| Flow | 删除重置按钮，标题改为业务进度，隐藏当前订单大卡片，降低流程块高度和权重 |

## Long-Term Persistence

- 已更新项目内 UI Skill references：Ant Design review rules、visual baseline、anti-pattern catalog、design system checklist、ERP pattern library。
- 已更新 PM 原型生成指南，确保新原型也继承这些规则。
- 已更新 `knowledge/product-design-preferences.md`，作为长期 UI 偏好。

## Verification Findings

- `node --check prototype/oms-system/script.js` 通过。
- 原型文件扫描未发现可见 `<select>`、`样例订单流程`、`运行下一步`、`重置流程`、调试/角色/状态切换等正式原型反模式。
- 浏览器验证通过：`rightOverflow=false`、`nativeSelects=0`、`topbarHeight=56px`、`headerSearch=true`、`batchSummary=AMZ-2026 等 3 个`、`chipCount=4`、`runButton=推进下一状态`、`queryRightOverflow=false`。
- 最终截图：`prototype/oms-system/oms-system-domestic-corrected.png`。
  - `rightOverflow=false`
  - `scrollX=0`
  - `flowStatus=待发货`
  - `interceptEnabled=true`
  - `riskVisible=true`
  - `drawerOpen=1`
  - `storeOpen=true`
- 最终截图：`prototype/oms-system/oms-system-figma-corrected.png`。

---

# Findings: UI Design Skills Method Upgrade

## Local Skill Baseline

- 本项目 UI 设计主入口是 `skills/ui-optimization-master/SKILL.md`；PM / PRD / 原型主入口是 `skills/erp-product-manager/SKILL.md`。
- `ui-optimization-master` 已有核心规则：中文 B 端 ERP、Ant Design、去 demo 控件、去角色/状态切换器、状态和权限通过真实 UI 表达、正式原型不得像营销或 Western SaaS。
- 当前项目内 `ui-optimization-master` 引用了 `prototype-quality-gate.md`、`ant-design-erp-review-rules.md`、`chinese-b-end-erp-visual-baseline.md`、`ui-interaction-spec.md`、`erp-reference-patterns.md`，但尚未实际存在模式库、反模式库和设计系统检查表。
- `erp-product-manager` 已要求基于 PRD 做 source mapping，且强调不凭空扩展页面模块。
- 本任务不读取 `cases/**`，只升级主线 Skill 和通用 UI 规则。

## Research Access Notes

- Bilibili 视频网页直连首次返回 412，不能依赖普通页面抓取。
- 后续研究采用：公开接口获取元信息、本地下载工具获取字幕/描述、必要时使用视频标题和可访问素材做方法论归纳。

## Local Video Review Findings

User provided four local videos under `/Users/freddy/Downloads/`:

- `UIVlog AIUI全套工作流`
- `UIVlog AI在Figma从0-1搓出完整UI组件库+变量库`
- `UIVlog AI基于UI一键搓设计规范+批量绑定组件库全流程`
- `UIVlog FigmaSkill AI根据组件库在Figma直搓UI`

Key observed workflow:

- Start from a design-system foundation, not a single page: colors, typography, spacing, radius, shadows, icons, states, and component naming are established first.
- Use Markdown / agent-readable files as the design-system source of truth; AI is more reliable when the component inventory, token names, and page structure are written clearly.
- Generate or organize the component library before asking AI to produce full pages. The page generation step should reference existing components instead of creating isolated shapes.
- A component library does not need to be perfect before first page generation, but missing component relations must be repaired after the first pass.
- Build pages from reusable components, then inspect what is missing, tell the AI what is wrong, and iterate with concrete correction instructions.
- Reverse-generate design specifications from existing UI pages, then bind or rebuild components according to the generated specs.
- In Figma workflows, the method depends on a working MCP / skill connection, readable frame links, and clear instructions that name the target frame, component library, page goal, and constraints.
- The practical loop is: `Foundation -> Components -> Page -> Spec -> Binding -> Review -> Revision`, not `prompt -> finished UI`.

Transfer to this ERP project:

- Treat `skills/**/references/*.md` as the local equivalent of Figma design-system Markdown: they must include token rules, component inventory, page skeletons, state rules, and quality gates.
- For HTML prototypes, require a source map and component map before writing markup: page areas, components used, token choices, states, permissions, and interactions.
- Reusable ERP components must be explicitly specified so later prototypes do not reinvent filters, tables, drawers, modals, operation logs, import flows, store selectors, date comparison controls, or status tags.
- The target visual style from the videos is high-completion but restrained: clear foundation, polished component consistency, clean spacing, reliable alignment, professional page-level rhythm, and no one-off decoration.

## Figma MCP Setup Findings

- `codex mcp list` initially only showed `computer-use`; Figma plugin was enabled but no Figma MCP server had been configured.
- Added remote `figma` MCP with `https://mcp.figma.com/mcp` and completed OAuth authorization.
- Added desktop fallback `figma-desktop` with `http://127.0.0.1:3845/mcp`.
- `figma` remote MCP is the default path for future Figma file work.
- `figma-desktop` is configured but local port `3845` was not listening during verification because the current foreground Figma files are Figma Make files rather than normal Dev Mode design files; keep it as fallback for future normal design-file workflows.
- Figma MCP status was documented in `knowledge/figma-mcp-setup.md`.

---

# Findings: OMS UI Showcase Prototype

## Page Source Map

| Item | Decision |
|------|----------|
| Page name | OMS 系统展示原型 |
| Main task | 展示订单/包裹运营后台的信息组织和视觉完成度 |
| User entry | 左侧少量菜单进入：订单列表、待审订单、包裹列表 |
| Visible sections | 顶部系统栏、页面标题区、核心指标条、查询区、结果表格、详情抽屉 |
| Primary action | 页面主操作仅用于展示，不做真实业务提交 |
| Secondary actions | 查看详情、展开筛选、切换菜单、打开抽屉 |
| States | 默认、加载感占位、空结果提示、异常标签、禁用态按钮、无真实权限开关 |
| Permission differences | 通过禁用态和说明体现，不放角色切换器 |

## Component Map

| Page Area | Component | Notes |
|-----------|-----------|-------|
| Admin shell | `ErpShell` | 左侧轻量菜单 + 顶部栏 + 内容区 |
| Page title | `PageHeaderBar` | 紧凑标题、刷新时间、少量辅助信息 |
| Query area | `QueryFilterBar` | 单号、平台、店铺、状态、时间 |
| Advanced filters | `AdvancedFilterPanel` | 展开后显示渠道、仓库、异常类型 |
| Results | `DataTablePanel` | 高密度订单/包裹表格、状态标签、行操作 |
| Detail | `DetailDrawer` | 查看订单/包裹摘要、轨迹、操作日志 |
| State tokens | `StateSet` | 异常、待审核、可发货、拦截中、已发货 |

## Foundation

- 主色：Ant Design blue 系列。
- 背景：浅灰 `#f5f7fb`。
- 面板：白底、细边框、弱阴影、`8px` 内圆角上限。
- 字体：标题 18-20px，正文 14px，辅助 12-13px。
- 间距：页面 20-24px，组内 8-16px。

## Revision Diagnosis: 2026-05-09 User Feedback

| Issue | Root Cause | Fix |
|-------|------------|-----|
| 店铺控件像临时输入框 | 未绑定长期偏好的 `StoreSelector` 层级规则 | 改为平台、事业部、站点、店铺名四列级联，平台层展示图标和名称 |
| 页面像放大的静态表格 | 先画页面，后补组件，没有形成组件到页面的绑定 | 重排为 PageHeader、处理概况、QueryFilterBar、状态页签、DataTable、DetailDrawer |
| 订单状态覆盖不足 | 未引用 `order-package-flow.md` 中已确认订单状态 | 补全 13 个订单状态页签 |
| 可见临时提示和禁用操作 | 把原型边界暴露到了正式页面 | 移除侧栏提示、禁用导出、禁用操作按钮，仅保留只读详情入口 |
| 右侧裁切风险 | 查询栅格最小宽度大于 1440 首屏可用内容宽度 | 压缩筛选列宽，表格横向滚动限定在表格容器内，验证 `rightOverflow=false` |

---

# Findings: Ant Design Video Workflow Port

## Video Frame Review

| Video | Observed Method | Ant Design Transfer |
|-------|-----------------|---------------------|
| AIUI 全套工作流 | 先理解一套 AI + UI 工作流，再准备素材、组件库和页面目标 | 先建立 Ant Design design-system 输入包，再生成 OMS 页面 |
| Figma 从 0-1 组件库 + 变量库 | 用 Markdown 一次生成基础变量、颜色、字体、按钮、表单、表格等组件库 | 用 Ant token、Form、Button、Table、Drawer、Tag、TreeSelect 映射，不用 TD 组件 |
| 基于 UI 生成规范 + 批量绑定组件库 | 从现有页面反向提取设计规范，再自动搭建组件库，复制页面后检查绑定关系 | 对 HTML 原型反向生成 `prototype-spec.md`、组件绑定清单和质量报告 |
| FigmaSkill 根据组件库直搓 UI | 先让 AI 读取 Figma 组件库和 MCP 状态，再给链接、目标、缺失点，生成页面后指出问题继续修 | 对本地 HTML 等价执行：读取本地 Ant 组件包、页面 source map、业务知识，再生成页面和复验 |

## Required Workflow Artifacts

| Stage | Required Artifact | Why |
|-------|-------------------|-----|
| Foundation | `design-system/tokens.md` + CSS variables | 防止颜色、间距、圆角、阴影每页随机 |
| Components | `design-system/components.md` | 先确定 Ant Design 组件映射，避免散装 HTML |
| Page | `design-system/page-blueprint.md` | 页面区域必须映射业务来源和组件 |
| Spec | `prototype-spec.md` | 反向记录页面、组件、状态和边界 |
| Binding | `design-system/binding-checklist.md` | 检查每个可见区域是否绑定组件和 token |
| Review | `design-system/quality-gate.md` | 把审美要求变成可执行验收 |
| Revision | `progress.md` + screenshot | 每轮修改必须有验证证据 |

## Ant Design Port Rules

- 视频演示的 TD Design 只作为流程参考；组件、token、交互模型统一迁移到 Ant Design。
- Ant 组件映射优先级：`Layout`、`Menu`、`Breadcrumb`、`Form`、`Input`、`Select`、`TreeSelect`、`DatePicker`、`Button`、`Table`、`Tabs`、`Tag`、`Drawer`、`Descriptions`、`Timeline`、`Pagination`、`Tooltip`。
- 不直接写页面前，必须先有 source map、component map、token map、quality gate。
- 如果只是 HTML 原型，Figma 的“变量/组件/绑定”分别落地为 CSS variables、组件类名、绑定清单。

---

# Findings: Codex Workflow Guardian Agent

## User Pain Points

- 用户重度使用 Codex，并认可 Codex 能帮助修改大量文件，但担心后续出错时无法溯源。
- 用户不熟悉 Git 分支、checkpoint、回滚、上下文治理等操作，希望 Codex 主动守护。
- 用户希望在使用过程中被提醒不规范风险，例如长期在一个对话框内处理多个任务导致上下文巨大、模型漏约束。

## Existing Project Support

- 项目已有 `planning-with-files`，通过 `task_plan.md`、`findings.md`、`progress.md` 记录当前任务目标、发现和进度。
- 项目已有 `skills/shared/context-memory-workflow.md`，规定复杂 PM/UI 任务的文件化记忆循环。
- 现有 `AGENTS.md` 只路由 PM、UI 和代码任务，缺少专门处理分支溯源、checkpoint、上下文治理的入口。
- 当前 `codex/UI` 分支有大量未提交文件，适合先建立 guardrail，再拆分 checkpoint。

## Agent Design Requirements

- 启动前必须检查 `git status --short --branch`，有改动时查看 `git diff --stat`。
- 改动前向用户说明目标文件或目录，降低“偷偷改了很多东西”的风险。
- 复杂任务必须更新 planning files，PRD/原型必须保留来源映射和验证记录。
- 交付前必须输出改动摘要、验证结果、剩余风险和 checkpoint 建议。
- 不应在用户未授权时自动 stage/commit/push。
- 检测到长对话、多目标混杂、大量文件未提交时，应给出简短使用提醒和 handoff 建议。

---

# Findings: OMS Order System Demo Workflow Run

## User Intent

- 用户要求“试跑一下新工作流程”，并生成一个 OMS 订单系统 demo。
- 本轮按项目路由理解为：用 `erp-product-manager -> Figma/HTML UI library -> karpathy-guidelines -> planning-with-files` 复跑一次原型生成/验证闭环。
- 用户没有要求参考历史案例；本轮不读取 `cases/**`。

## Workflow Sources Loaded

| Source | Finding |
|--------|---------|
| `skills/erp-product-manager/SKILL.md` | OMS demo 属于跨境电商 ERP 原型生成任务；默认 Ant Design + 中文 B 端后台 |
| `skills/karpathy-guidelines/SKILL.md` | 代码处理必须小范围、目标驱动、先验证再改 |
| `planning-with-files` | 本轮需要记录 `task_plan.md`、`findings.md`、`progress.md` |
| `knowledge/figma-ant-design-ui-library.md` | Figma 权威库为 `KaI3eGyylfiwrPlU3OR08C`，HTML 原型用本地镜像快速落地 |
| `ui-library/README.md` | 本地 HTML 镜像版本 `v0.2.1`，与 Figma `v0.2.1` 对齐 |
| `chinese-b-end-erp-visual-baseline.md` | OMS demo 应保持左侧导航、顶部栏、面包屑、筛选、表格、抽屉的正式 ERP 结构 |

## Figma Read-Only Check

| Check | Result |
|-------|--------|
| `whoami` | `wanggeng826@gmail.com` / Freddy |
| `get_metadata(fileKey=KaI3eGyylfiwrPlU3OR08C, nodeId=0:1)` | Cover 页可读取，基础组件 Button/Input/Select/Checkbox/Radio/Switch/Tag/Alert/Pagination/Tabs/Empty/Spin/Skeleton 存在 |
| `search_design_system` | 未返回组件，推测是库未作为可搜索团队 Library 暴露；本轮改用 metadata/context 验证 |
| `get_design_context(nodeId=16:151)` | 返回基础组件 React/Tailwind 参考和截图；按工具要求转换为当前静态 HTML/CSS/JS 语义，不引入 Tailwind |

## Current Prototype Findings

| Area | State |
|------|-------|
| Files | `prototype/oms-system/index.html`、`styles.css`、`script.js`、`prototype-spec.md` 均存在 |
| Structure | 已覆盖 `ErpShell`、顶部动作区、面包屑、标题区、查询区、状态页签、表格、详情抽屉、风险弹窗 |
| Demo Flow | 已有订单履约链路：同步、检测、审核、生成包裹、仓库交接、发货 |
| UI Fit | 首屏是中文 B 端 ERP 列表页，流程演练以业务处理条形式存在，没有角色切换器或调试面板 |
| Known Boundary | 所有状态变化仅在浏览器内存中，不连接真实接口；包裹拦截真实规则仍待确认 |

## Fixes From This Run

| Issue | Fix |
|-------|-----|
| 批量搜索 HTML 已切到组合输入，但 JS 仍绑定旧版 `batchSearchSummary` | 改为使用 `batchSearchType`、`batchSearchInlineInput`、`batchTypeMenu` |
| `applyBatchSearch` / `cancelBatchSearch` 节点缺失会导致脚本中断 | 在批量搜索浮层补齐“取消 / 应用”按钮与底部操作区 |
| 旧版 `resetFlowBtn` demo 控制残留 | 删除残留变量、重置函数和监听，保持正式原型边界 |

## Verification Findings

| Check | Result |
|-------|--------|
| `node --check prototype/oms-system/script.js` | 通过 |
| DOM ID binding check | `checked=54`，`missing=[]` |
| Playwright smoke check | `errors=[]`，初始标签“待检测”，批量搜索 3 个单号回显 4 个 chip，发货完成后 `已发货=2`，拦截后 `异常=2` |
| Interaction coverage | 批量搜索、履约推进、风险确认、表格详情抽屉、店铺选择器均可用 |
| Layout | `rightOverflow=false` |
| Screenshot | `prototype/oms-system/oms-system-demo-workflow-run.png` |

---

# Findings: Salesperson Management Prototype

## User Intent

- 用户提供当前系统截图，并要求“基于需求生成对应的原型图”。
- 已提供需求文档路径：`/Users/freddy/Desktop/销售人员管理V1.2.docx`。
- 本轮按“已有 PRD/需求文档 -> Ant Design 中文 B 端 HTML 原型 -> 截图交付”执行。
- 不默认读取历史 `cases/**`。

## Initial Source Map

| Source | Finding |
|--------|---------|
| 用户截图 | 当前页面是工具组/组织架构成员管理页：左侧架构导航，右侧工具组标题、成员列表/操作日志切换、绑定人员主按钮、成员概览表格 |
| 现有仓库状态 | 存在未跟踪目录 `prototype/salesperson-management/`，需先检查内容再修改 |
| 项目规则 | UI 原型需遵循 Ant Design、中文 B 端 ERP、当前系统架构导航风格；复杂任务记录 planning files |

## Requirement Findings

| Area | Requirement |
|------|-------------|
| 模块定义 | 销售人员管理是以业务单元为组织载体、以店铺归属为核心规则、以订单按店铺反查归属为主链路的销售归属配置中心 |
| 页面结构 | 业务单元配置页为主页面；订单归属处理为独立页面；添加/编辑人员配置、转岗/归属重算为弹窗/抽屉 |
| 成员列表 | 店铺列从纯文本改为默认展示店铺名称或“共 N 个店铺”，悬浮/点击后按平台分组展示店铺明细 |
| 顶部操作 | “绑定人员”改为“添加/编辑人员”；批量转岗、批量移除常驻显示，未勾选时 disabled，勾选后激活 |
| 转岗防呆 | 底部需要两个业务按钮：`仅人员转岗` 与 `携店铺转岗`，并常驻 Warning 提示店铺释放/转移后果 |
| 移除防呆 | 移除人员前校验名下店铺；有店铺时强警告说明店铺会失去负责人并进入待归属订单池 |
| 人员配置 | 弹窗含销售员、业务职能、平台筛选、店铺资源池树表、已选汇总、生效日期、长期有效 |
| 店铺资源池 | 树层级为平台 -> 组织 -> 区域 -> 店铺；别人的店允许强勾，保存时统一二次确认归属转移 |
| 操作日志 | 增加全部操作对象筛选；日志类型包含添加人员、移除人员、角色调整、编辑人员配置、归属重算 |
| 订单归属处理 | 待归属订单页签包含订单号、订单创建时间、出单店铺、异常原因筛选与批量重新匹配 |
| 历史订单调整 | 默认展示历史修改审计明细表；新建调整任务使用全屏抽屉，遵循先圈定范围、再核对明细、最后设置修改规则 |
| 销售目标 | 以左侧业务单元树为视角，右侧包含年度看板、年份/导入导出工具栏、年度目标拆解矩阵和强弱校验 |

## Component Map

| UI Area | Component Pattern |
|---------|-------------------|
| 整体布局 | `ErpShell`：左侧架构导航、顶部标题/面包屑、右侧内容区 |
| 主页面标题与动作 | `PageHeaderBar`：一个主按钮“添加/编辑人员”，次要批量操作靠近表格上下文 |
| 筛选区 | `QueryFilterBar`：姓名/工号搜索、业务职能筛选、日志类型/操作人/对象筛选、订单筛选 |
| 表格区 | `DataTablePanel`：成员列表、待归属订单列表、审计日志、目标矩阵 |
| 批量操作 | `BatchActionBar`：勾选后激活批量转岗/移除/重新匹配 |
| 弹窗与抽屉 | `CreateModal`/`RiskConfirm`/`DetailDrawer`：人员配置、转岗、移除确认、历史调整任务 |
| 店铺选择 | `StoreSelector`：树形资源池、父子级联、半选态、归属冲突二次确认 |
| 操作日志 | `OperationLog`：操作人、类型、对象、详情、时间 |
| 反馈状态 | `FeedbackState`：保存成功、移除警告、导入异步通知、空态 |

## Existing Prototype Findings

| File | Finding |
|------|---------|
| `prototype/salesperson-management/index.html` | 已有 CSS、壳层空容器、人员/转岗/移除/归属确认弹窗和抽屉容器 |
| `prototype/salesperson-management/data.js` | 文件缺失，导致打开 `index.html` 时页面无法渲染业务内容 |

## Figma Source Check

| Check | Result |
|-------|--------|
| `whoami` | `wanggeng826@gmail.com` / Freddy |
| `get_metadata(fileKey=KaI3eGyylfiwrPlU3OR08C, nodeId=0:1)` | Cover 页可读取，Base Components Preview 包含 Button、Input、Select、Checkbox、Radio、Tag、Alert、Pagination、Tabs、Empty、Spin、Skeleton |
| `get_design_context(nodeId=16:151)` | 已读取基础组件参考；实现时转换为当前静态 HTML/CSS/JS，不引入 Tailwind |

## Implementation Findings

| Area | Result |
|------|--------|
| 原型结构 | 复用 `prototype/salesperson-management/index.html` 壳层，新增 `data.js` 渲染业务内容和交互 |
| 主截图页面 | 默认首屏为“业务单元配置 / 成员列表 / 成员概览”，贴近用户当前系统截图 |
| 补充页面 | 同一原型内可切换“订单归属处理”和“销售目标” |
| 风险操作 | 人员配置冲突店铺、转岗、移除、历史订单覆盖、目标保存阻断均使用 Modal 确认 |
| Formal UI 边界 | 未加入角色切换器、状态切换器、调试面板或演示控制区 |

## Verification Findings

| Check | Result |
|-------|--------|
| `node --check prototype/salesperson-management/data.js` | 通过 |
| Playwright smoke check | `errors=[]`，成员行数 `7`，人员弹窗、归属确认、订单页、历史调整抽屉、销售目标页均可打开 |
| Main screenshot | `prototype/salesperson-management/salesperson-management-prototype.png` |
| Orders screenshot | `prototype/salesperson-management/salesperson-management-orders.png` |
| Targets screenshot | `prototype/salesperson-management/salesperson-management-targets.png` |

---

# Findings: Salesperson Management Prototype Cleanup

## Source Review

| Source | Finding |
|---|---|
| `prototype/salesperson-management/context-summary.md` | 年度目标导入方案记录了三阶段、四原则、产品思考提示和截图知识映射；这些属于设计/分析层，不应全部变成正式 UI。 |
| `prototype/salesperson-management/prototype-spec.md` | §3 和 §3.1 明确写入“导入抽屉包含效率、准确性、易用性、反馈四项设计原则”和“产品思考提示”，这是本次说明型内容进入原型的直接规格来源。 |
| `/Users/freddy/Desktop/销售人员管理V1.2.docx` | Word 原稿只要求 Excel 导入/导出、模板下载、上传、异步校验、错误报告和 Webhook/后台反馈；没有要求在界面顶部展示产品原则卡或产品思考说明。 |
| `prototype/salesperson-management/data.js` | `openTargetImportDrawer()` 在导入抽屉顶部渲染 `import-knowledge-block`、四张 `principle-card` 和 `importProductThinking(stage)`，导致截图里的说明层可见。 |

## Root Cause

| Type | Detail |
|---|---|
| 分层错误 | 把“截图/需求里的设计原则、产品思考和来源映射”当成正式页面内容，而不是转译为用户任务、校验状态、按钮和反馈文案。 |
| 规则缺失 | 当前案例说明没有明确禁止“需求来源/产品思考/设计原则”直接出现在正式原型里。 |
| 复发风险 | 后续继续按 `prototype-spec.md` 生成时，会再次保留四原则卡片和产品思考提示。 |

## Fix Direction

| Area | Decision |
|---|---|
| 原型 UI | 删除导入抽屉顶部说明型知识区；保留三阶段导入、模板、上传、预检、错误报告、任务中心结果。 |
| 案例规格 | 将“知识与样式映射”改为“设计转译规则”，明确原则只能内化为流程和状态，不作为可见说明卡。 |
| 上下文 | 增加正式原型禁止展示需求分析/产品思考/来源映射的规则。 |
