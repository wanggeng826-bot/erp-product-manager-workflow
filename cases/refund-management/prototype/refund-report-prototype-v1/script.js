const roleConfigs = {
  sales: {
    label: "销售",
    shopScope: "4 家授权店铺",
    exportMode: "hidden",
    canViewTasks: false,
    showAmount: false,
    showFinance: false,
    canAdjustAmount: false,
    insight: "以趋势、SKU 与原因分析为主，金额与核账字段默认不展示。"
  },
  operations: {
    label: "运营",
    shopScope: "12 家授权店铺",
    exportMode: "enabled",
    canViewTasks: true,
    showAmount: true,
    showFinance: false,
    canAdjustAmount: false,
    insight: "高频分析角色，可导出本人权限范围内明细，核账字段默认隐藏。"
  },
  customer: {
    label: "客服",
    shopScope: "8 家授权店铺",
    exportMode: "restricted",
    canViewTasks: false,
    showAmount: false,
    showFinance: false,
    canAdjustAmount: false,
    insight: "聚焦状态、时效、原因跟进，导出默认关闭并保留策略待确认。"
  },
  finance: {
    label: "财务",
    shopScope: "全部授权店铺",
    exportMode: "enabled",
    canViewTasks: true,
    showAmount: true,
    showFinance: true,
    canAdjustAmount: true,
    insight: "关注原币种与本位币金额、核账状态、导出任务与差异处理闭环。"
  },
  manager: {
    label: "管理层",
    shopScope: "全部授权店铺",
    exportMode: "enabled",
    canViewTasks: true,
    showAmount: true,
    showFinance: true,
    canAdjustAmount: true,
    insight: "优先查看汇总看板，可下钻明细与导出汇总/明细结果。"
  },
  developer: {
    label: "开发/问题治理",
    shopScope: "问题排查授权店铺",
    exportMode: "hidden",
    canViewTasks: false,
    showAmount: false,
    showFinance: false,
    canAdjustAmount: false,
    insight: "聚焦退款原因、责任归因与时效问题，不开放导出与财务字段。"
  },
  admin: {
    label: "系统管理员",
    shopScope: "全部店铺 + 审计授权范围",
    exportMode: "enabled",
    canViewTasks: true,
    showAmount: true,
    showFinance: true,
    canAdjustAmount: true,
    insight: "具备导出任务查看、权限排查与审计辅助能力。"
  }
};

const selectOptions = {
  platform: ["全部平台", "Amazon", "TikTok", "Shopee", "eBay", "AliExpress", "Lazada"],
  site: ["全部站点", "US", "UK", "SG", "MY", "BR", "PH"],
  shop: ["全部店铺", "US-Store-01", "US-Store-02", "UK-Store-01", "TikTok-US-02", "Shopee-SG-03", "Lazada-MY-01"],
  dateType: ["退款创建时间", "退款完成时间", "订单支付时间"],
  datePreset: ["最近 7 天", "最近 30 天", "本月", "上月", "自定义范围"],
  granularity: ["按天", "按周", "按月"],
  status: ["全部状态", "待买家处理", "卖家待处理", "平台介入中", "已同意", "商品退回中", "已拒绝", "已取消", "已完成", "已关闭"],
  bizType: ["全部业务类型", "订单退款", "售后退款"],
  processType: ["全部处理类型", "仅退款", "退货退款"],
  amountType: ["全部金额类型", "全额退款", "部分退款"],
  reason: ["全部原因", "物流超时", "包装破损", "质量问题", "买家误购", "描述不符", "未分类"],
  owner: ["全部责任方", "仓库", "物流", "运营", "客服", "供应商", "未归因"],
  warehouse: ["全部发货仓", "深圳 A 仓", "义乌 B 仓", "洛杉矶前置仓", "曼谷中转仓"]
};

const detailRows = [
  {
    id: "RF260420001",
    platformOrderNo: "AMZ20260420001",
    refundNo: "RF260420001",
    platform: "Amazon",
    site: "US",
    shopName: "US-Store-01",
    skuCode: "SKU-RED-M",
    productName: "轻羽防风外套",
    warehouse: "深圳 A 仓",
    bizType: "售后退款",
    processType: "退货退款",
    amountType: "部分退款",
    rawStatus: "商品退回中",
    finishFlag: false,
    reason: "物流超时",
    owner: "物流",
    currency: "USD",
    amountOriginal: 15.99,
    amountBase: 115.32,
    createdAt: "2026-04-20 09:12",
    finishedAt: "-",
    durationMin: null,
    financeStatus: "未核账",
    summary: "等待买家退件入仓，物流节点超过 48 小时未更新。",
    operator: "陈雪",
    remark: "客服已催付平台物流单号。"
  },
  {
    id: "RF260420002",
    platformOrderNo: "TTK20260420008",
    refundNo: "RF260420002",
    platform: "TikTok",
    site: "US",
    shopName: "TikTok-US-02",
    skuCode: "SKU-BLUE-L",
    productName: "速干训练裤",
    warehouse: "洛杉矶前置仓",
    bizType: "订单退款",
    processType: "仅退款",
    amountType: "全额退款",
    rawStatus: "已完成",
    finishFlag: true,
    reason: "描述不符",
    owner: "运营",
    currency: "USD",
    amountOriginal: 28.80,
    amountBase: 207.36,
    createdAt: "2026-04-18 14:26",
    finishedAt: "2026-04-19 10:15",
    durationMin: 1189,
    financeStatus: "已核账",
    summary: "商品描述尺码偏差，平台直接完成退款。",
    operator: "赵敏",
    remark: "已同步内容团队修正文案。"
  },
  {
    id: "RF260420003",
    platformOrderNo: "AMZ20260419012",
    refundNo: "RF260420003",
    platform: "Amazon",
    site: "UK",
    shopName: "UK-Store-01",
    skuCode: "SKU-BAG-01",
    productName: "城市通勤双肩包",
    warehouse: "义乌 B 仓",
    bizType: "售后退款",
    processType: "退货退款",
    amountType: "部分退款",
    rawStatus: "已关闭",
    finishFlag: true,
    reason: "包装破损",
    owner: "仓库",
    currency: "GBP",
    amountOriginal: 12.50,
    amountBase: 114.90,
    createdAt: "2026-04-16 11:02",
    finishedAt: "2026-04-18 18:42",
    durationMin: 3340,
    financeStatus: "差异待处理",
    summary: "仓库出库包装不完整，买家签收后申请部分退款。",
    operator: "刘真",
    remark: "等待仓库确认补偿责任。"
  },
  {
    id: "RF260420004",
    platformOrderNo: "SHP20260417007",
    refundNo: "RF260420004",
    platform: "Shopee",
    site: "SG",
    shopName: "Shopee-SG-03",
    skuCode: "SKU-LAMP-08",
    productName: "桌面阅读灯",
    warehouse: "深圳 A 仓",
    bizType: "订单退款",
    processType: "仅退款",
    amountType: "全额退款",
    rawStatus: "卖家待处理",
    finishFlag: false,
    reason: "质量问题",
    owner: "供应商",
    currency: "SGD",
    amountOriginal: 36.00,
    amountBase: 193.68,
    createdAt: "2026-04-17 07:44",
    finishedAt: "-",
    durationMin: null,
    financeStatus: "未核账",
    summary: "商品灯珠闪烁，客服待确认售后方案。",
    operator: "王晨",
    remark: "已提交供应商质检反馈。"
  },
  {
    id: "RF260420005",
    platformOrderNo: "LZD20260416019",
    refundNo: "RF260420005",
    platform: "Lazada",
    site: "MY",
    shopName: "Lazada-MY-01",
    skuCode: "SKU-MUG-03",
    productName: "保温咖啡杯",
    warehouse: "义乌 B 仓",
    bizType: "订单退款",
    processType: "仅退款",
    amountType: "全额退款",
    rawStatus: "已取消",
    finishFlag: false,
    reason: "买家误购",
    owner: "未归因",
    currency: "MYR",
    amountOriginal: 18.90,
    amountBase: 29.80,
    createdAt: "2026-04-16 16:18",
    finishedAt: "-",
    durationMin: null,
    financeStatus: "未核账",
    summary: "买家主动取消退款申请，订单恢复正常。",
    operator: "唐倩",
    remark: "无需继续跟进。"
  },
  {
    id: "RF260420006",
    platformOrderNo: "EBY20260414003",
    refundNo: "RF260420006",
    platform: "eBay",
    site: "US",
    shopName: "US-Store-02",
    skuCode: "SKU-CASE-12",
    productName: "防摔手机壳",
    warehouse: "深圳 A 仓",
    bizType: "售后退款",
    processType: "仅退款",
    amountType: "部分退款",
    rawStatus: "已完成",
    finishFlag: true,
    reason: "包装破损",
    owner: "仓库",
    currency: "USD",
    amountOriginal: 6.40,
    amountBase: 46.08,
    createdAt: "2026-04-14 09:35",
    finishedAt: "2026-04-15 13:22",
    durationMin: 1667,
    financeStatus: "已核账",
    summary: "平台完成部分退款，仓库责任成立。",
    operator: "顾远",
    remark: "已进入仓库周报问题池。"
  },
  {
    id: "RF260420007",
    platformOrderNo: "AMZ20260413021",
    refundNo: "RF260420007",
    platform: "Amazon",
    site: "US",
    shopName: "US-Store-01",
    skuCode: "SKU-RED-M",
    productName: "轻羽防风外套",
    warehouse: "深圳 A 仓",
    bizType: "订单退款",
    processType: "仅退款",
    amountType: "全额退款",
    rawStatus: "平台介入中",
    finishFlag: false,
    reason: "物流超时",
    owner: "物流",
    currency: "USD",
    amountOriginal: 42.90,
    amountBase: 309.60,
    createdAt: "2026-04-13 12:06",
    finishedAt: "-",
    durationMin: null,
    financeStatus: "核账中",
    summary: "平台仲裁中，等待末端物流轨迹更新。",
    operator: "陈雪",
    remark: "预计 24 小时内出裁决。"
  },
  {
    id: "RF260420008",
    platformOrderNo: "ALI20260412005",
    refundNo: "RF260420008",
    platform: "AliExpress",
    site: "BR",
    shopName: "US-Store-02",
    skuCode: "SKU-FAN-09",
    productName: "便携手持风扇",
    warehouse: "义乌 B 仓",
    bizType: "售后退款",
    processType: "退货退款",
    amountType: "部分退款",
    rawStatus: "已拒绝",
    finishFlag: false,
    reason: "描述不符",
    owner: "运营",
    currency: "USD",
    amountOriginal: 9.30,
    amountBase: 67.08,
    createdAt: "2026-04-12 08:20",
    finishedAt: "-",
    durationMin: null,
    financeStatus: "未核账",
    summary: "买家证据不足，平台驳回退款申请。",
    operator: "赵敏",
    remark: "无需补发。"
  },
  {
    id: "RF260420009",
    platformOrderNo: "SHP20260411017",
    refundNo: "RF260420009",
    platform: "Shopee",
    site: "PH",
    shopName: "Shopee-SG-03",
    skuCode: "SKU-SHOE-22",
    productName: "轻便跑鞋",
    warehouse: "曼谷中转仓",
    bizType: "售后退款",
    processType: "退货退款",
    amountType: "全额退款",
    rawStatus: "已完成",
    finishFlag: true,
    reason: "质量问题",
    owner: "供应商",
    currency: "PHP",
    amountOriginal: 890.00,
    amountBase: 111.25,
    createdAt: "2026-04-11 17:10",
    finishedAt: "2026-04-14 09:32",
    durationMin: 3852,
    financeStatus: "差异待处理",
    summary: "批次鞋底开胶，完成全额退款并启动供应商追责。",
    operator: "王晨",
    remark: "已锁定对应批次库存。"
  },
  {
    id: "RF260420010",
    platformOrderNo: "TTK20260410028",
    refundNo: "RF260420010",
    platform: "TikTok",
    site: "US",
    shopName: "TikTok-US-02",
    skuCode: "SKU-CAP-04",
    productName: "速干棒球帽",
    warehouse: "洛杉矶前置仓",
    bizType: "订单退款",
    processType: "仅退款",
    amountType: "部分退款",
    rawStatus: "已同意",
    finishFlag: false,
    reason: "买家误购",
    owner: "客服",
    currency: "USD",
    amountOriginal: 4.90,
    amountBase: 35.28,
    createdAt: "2026-04-10 10:05",
    finishedAt: "-",
    durationMin: null,
    financeStatus: "未核账",
    summary: "客服已同意部分退款，等待平台放款回执。",
    operator: "唐倩",
    remark: "用户已确认不退货。"
  }
];

const exportTasksSeed = [
  {
    id: "EXP-20260427-001",
    creator: "李倩 / 运营",
    createdAt: "2026-04-27 09:42",
    status: "已完成",
    fileName: "退款明细_Amazon_US_最近30天.xlsx",
    snapshot: "平台=Amazon；站点=US；最近30天；状态=全部",
    fields: "默认列 + 责任归因",
    channel: "站内通知",
    result: "10,284 行"
  },
  {
    id: "EXP-20260427-002",
    creator: "周琳 / 财务",
    createdAt: "2026-04-27 10:08",
    status: "生成中",
    fileName: "退款核账明细_最近7天.xlsx",
    snapshot: "最近7天；核账状态=未核账/差异待处理",
    fields: "财务字段全量",
    channel: "站内通知",
    result: "处理中"
  },
  {
    id: "EXP-20260426-013",
    creator: "黄涛 / 管理层",
    createdAt: "2026-04-26 18:21",
    status: "生成失败",
    fileName: "退款总览汇总_店铺分组.xlsx",
    snapshot: "本月；平台=全部；粒度=按日",
    fields: "汇总指标卡 + 平台/站点",
    channel: "站内通知",
    result: "字段映射超时"
  }
];

const dashboardBase = {
  metrics: [
    { key: "payment", label: "支付订单数", value: 12580, note: "退款率分母", formatter: "int" },
    { key: "related", label: "去重退款相关订单数", value: 286, note: "退款率分子", formatter: "int" },
    { key: "finished", label: "退款完成订单数", value: 231, note: "成功率分子", formatter: "int" },
    { key: "rate", label: "退款率", value: 2.27, note: "退款相关订单数 / 支付订单数", formatter: "percent" },
    { key: "success", label: "退款成功率", value: 80.77, note: "退款完成订单数 / 去重退款相关订单数", formatter: "percent" },
    { key: "partial", label: "部分退款率", value: 36.36, note: "部分退款订单数 / 去重退款相关订单数", formatter: "percent" },
    { key: "amount", label: "本位币退款金额", value: 86543.21, note: "统一经营分析金额口径", formatter: "money" },
    { key: "duration", label: "平均退款时长", value: 42.5, note: "仅统计完成态订单", formatter: "duration_hour" }
  ],
  trends: {
    refundOrder: [24, 26, 31, 29, 35, 39, 34],
    refundRate: [1.9, 2.0, 2.3, 2.1, 2.7, 2.9, 2.5],
    refundAmount: [6400, 7080, 8360, 7720, 9180, 9720, 8550],
    refundSuccess: [76, 78, 79, 77, 81, 83, 80]
  },
  trendLabels: ["04-21", "04-22", "04-23", "04-24", "04-25", "04-26", "04-27"],
  dimensions: {
    platform: [
      { label: "Amazon", count: 118, amount: 31820, rate: 2.31, success: 81.4 },
      { label: "TikTok", count: 64, amount: 15560, rate: 2.58, success: 77.8 },
      { label: "Shopee", count: 44, amount: 12080, rate: 2.12, success: 83.1 },
      { label: "eBay", count: 31, amount: 7340, rate: 1.86, success: 79.5 }
    ],
    site: [
      { label: "US", count: 132, amount: 40220, rate: 2.42, success: 79.7 },
      { label: "UK", count: 41, amount: 10220, rate: 2.10, success: 82.0 },
      { label: "SG", count: 36, amount: 9850, rate: 2.01, success: 81.6 },
      { label: "MY", count: 22, amount: 6210, rate: 1.78, success: 84.4 }
    ],
    combo: [
      { label: "Amazon / US", count: 76, amount: 21840, rate: 2.66, success: 80.2 },
      { label: "TikTok / US", count: 52, amount: 12870, rate: 2.49, success: 78.8 },
      { label: "Shopee / SG", count: 28, amount: 8120, rate: 2.14, success: 84.0 },
      { label: "Amazon / UK", count: 24, amount: 6510, rate: 1.97, success: 82.5 }
    ]
  },
  skuTop: [
    { label: "SKU-RED-M", productName: "轻羽防风外套", count: 26, amount: 3510, rate: 6.92 },
    { label: "SKU-LAMP-08", productName: "桌面阅读灯", count: 19, amount: 2920, rate: 5.38 },
    { label: "SKU-SHOE-22", productName: "轻便跑鞋", count: 17, amount: 4610, rate: 4.74 }
  ],
  reasonTop: [
    { label: "物流超时", count: 61, amount: 18240, share: 21.3 },
    { label: "包装破损", count: 48, amount: 11420, share: 16.8 },
    { label: "质量问题", count: 42, amount: 16010, share: 14.7 }
  ],
  ownerTop: [
    { label: "物流", count: 66, amount: 18880, share: 23.1 },
    { label: "仓库", count: 54, amount: 12360, share: 18.9 },
    { label: "运营", count: 37, amount: 10220, share: 12.9 }
  ],
  efficiency: {
    avg: "1 天 18 小时",
    timeoutCount: 36,
    within24h: 58,
    within72h: 28,
    over72h: 14
  }
};

const columnDefinitions = [
  { key: "platformOrderNo", label: "平台订单号", width: "1.35fr", defaultVisible: true, permission: "all" },
  { key: "refundNo", label: "退款单号", width: "1.35fr", defaultVisible: true, permission: "all" },
  { key: "platformSite", label: "平台 / 站点", width: "1fr", defaultVisible: true, permission: "all" },
  { key: "shopName", label: "店铺", width: "1fr", defaultVisible: true, permission: "all" },
  { key: "skuCode", label: "SKU", width: "0.95fr", defaultVisible: true, permission: "all" },
  { key: "rawStatus", label: "原始退款状态", width: "1fr", defaultVisible: true, permission: "all" },
  { key: "finishFlag", label: "完成态", width: "0.72fr", defaultVisible: true, permission: "all" },
  { key: "reason", label: "退款原因", width: "0.95fr", defaultVisible: true, permission: "all" },
  { key: "owner", label: "责任归因", width: "0.85fr", defaultVisible: false, permission: "all" },
  { key: "amountBase", label: "本位币退款金额", width: "0.9fr", defaultVisible: true, permission: "amount", align: "right" },
  { key: "financeStatus", label: "财务核账状态", width: "0.95fr", defaultVisible: false, permission: "finance" },
  { key: "createdAt", label: "退款创建时间", width: "1fr", defaultVisible: true, permission: "all" },
  { key: "finishedAt", label: "退款完成时间", width: "1fr", defaultVisible: false, permission: "all" },
  { key: "duration", label: "退款时效", width: "0.8fr", defaultVisible: false, permission: "all" },
  { key: "warehouse", label: "发货仓", width: "0.95fr", defaultVisible: false, permission: "all" }
];

const defaultFilters = {
  keyword: "",
  platform: "全部平台",
  site: "全部站点",
  shop: "全部店铺",
  dateType: "退款创建时间",
  datePreset: "最近 30 天",
  granularity: "按天",
  status: "全部状态",
  bizType: "全部业务类型",
  processType: "全部处理类型",
  amountType: "全部金额类型",
  reason: "全部原因",
  owner: "全部责任方",
  warehouse: "全部发货仓"
};

const state = {
  role: "finance",
  pageState: "ready",
  activeTab: "dashboard",
  trendMetric: "refundOrder",
  dimensionTab: "platform",
  detailDrawerTab: "basic",
  detailDrawerOpen: false,
  taskDrawerOpen: false,
  columnModalOpen: false,
  advancedOpen: false,
  pending: false,
  lastQueryAt: formatNow(),
  lastSyncAt: formatNow(),
  filters: { ...defaultFilters },
  draftFilters: { ...defaultFilters },
  drillMessage: "",
  selectedRowId: null,
  visibleColumns: columnDefinitions.filter((item) => item.defaultVisible).map((item) => item.key),
  pendingColumns: [],
  tasks: exportTasksSeed.map((item) => ({ ...item })),
  toasts: [],
  toastId: 1
};

const refs = {
  heroMeta: document.getElementById("heroMeta"),
  heroActions: document.getElementById("heroActions"),
  appliedSummary: document.getElementById("appliedSummary"),
  tabBar: document.getElementById("tabBar"),
  pageView: document.getElementById("pageView"),
  detailDrawer: document.getElementById("detailDrawer"),
  detailDrawerTitle: document.getElementById("detailDrawerTitle"),
  detailDrawerBody: document.getElementById("detailDrawerBody"),
  detailDrawerFooter: document.getElementById("detailDrawerFooter"),
  taskDrawer: document.getElementById("taskDrawer"),
  taskDrawerBody: document.getElementById("taskDrawerBody"),
  scrim: document.getElementById("scrim"),
  columnModal: document.getElementById("columnModal"),
  columnModalBody: document.getElementById("columnModalBody"),
  toastStack: document.getElementById("toastStack"),
  advancedFilters: document.getElementById("advancedFilters"),
  advancedToggle: document.getElementById("advancedToggle")
};

init();

function init() {
  populateSelectOptions();
  bindEvents();
  render();
}

function bindEvents() {
  document.addEventListener("click", handleClick);
  document.addEventListener("change", handleChange);
  document.addEventListener("input", handleInput);
  document.addEventListener("keydown", handleKeyDown);
}

function handleKeyDown(event) {
  if (event.key === "Enter" && event.target.id === "filterKeyword") {
    event.preventDefault();
    runQuery();
  }
}

function handleChange(event) {
  const filterKey = event.target.dataset.filter;
  if (filterKey) {
    state.draftFilters[filterKey] = event.target.value;
    renderAppliedSummary();
    return;
  }

  if (event.target.matches("[data-column-key]")) {
    const key = event.target.dataset.columnKey;
    if (event.target.checked) {
      if (!state.pendingColumns.includes(key)) {
        state.pendingColumns.push(key);
      }
    } else {
      state.pendingColumns = state.pendingColumns.filter((item) => item !== key);
    }
  }
}

function handleInput(event) {
  const filterKey = event.target.dataset.filter;
  if (filterKey) {
    state.draftFilters[filterKey] = event.target.value;
    renderAppliedSummary();
  }
}

function handleClick(event) {
  const trigger = event.target.closest("[data-action]");
  if (!trigger) {
    return;
  }

  const disabledReason = trigger.dataset.disabledReason;
  if (disabledReason) {
    pushToast("warning", "当前角色不可操作", disabledReason);
    return;
  }

  const action = trigger.dataset.action;

  if (action === "toggle-advanced") {
    state.advancedOpen = !state.advancedOpen;
    renderAdvancedFilters();
    return;
  }

  if (action === "reset-filters") {
    state.draftFilters = { ...defaultFilters };
    state.filters = { ...defaultFilters };
    state.drillMessage = "";
    populateSelectOptions();
    render();
    pushToast("info", "已重置筛选", "已恢复默认最近 30 天与全部授权店铺视图。");
    return;
  }

  if (action === "run-query") {
    runQuery();
    return;
  }

  if (action === "refresh-sync") {
    runQuery("manual-refresh");
    return;
  }

  if (action === "close-all-overlays") {
    state.detailDrawerOpen = false;
    state.taskDrawerOpen = false;
    state.columnModalOpen = false;
    renderDrawers();
    return;
  }

  if (action === "switch-tab") {
    state.activeTab = trigger.dataset.tab;
    render();
    return;
  }

  if (action === "switch-trend") {
    state.trendMetric = trigger.dataset.metric;
    renderPageView();
    return;
  }

  if (action === "switch-dimension") {
    state.dimensionTab = trigger.dataset.dimension;
    renderPageView();
    return;
  }

  if (action === "drill-filter") {
    applyDrilldown(trigger.dataset.filterKey, trigger.dataset.filterValue, trigger.dataset.source);
    return;
  }

  if (action === "drill-date") {
    state.activeTab = "detail";
    state.filters = { ...state.filters, datePreset: "自定义范围" };
    state.draftFilters = { ...state.filters };
    state.drillMessage = `已从趋势图带入日期点 ${trigger.dataset.dateLabel}，自动切换到退款明细页签。`;
    populateSelectOptions();
    render();
    pushToast("info", "已完成下钻", "趋势图日期点已透传到明细查询上下文。");
    return;
  }

  if (action === "clear-drill") {
    state.drillMessage = "";
    renderPageView();
    return;
  }

  if (action === "open-detail") {
    state.selectedRowId = trigger.dataset.rowId;
    state.detailDrawerTab = "basic";
    state.detailDrawerOpen = true;
    renderDrawers();
    return;
  }

  if (action === "close-detail-drawer") {
    state.detailDrawerOpen = false;
    renderDrawers();
    return;
  }

  if (action === "switch-drawer-tab") {
    state.detailDrawerTab = trigger.dataset.drawerTab;
    renderDrawers();
    return;
  }

  if (action === "copy-value") {
    const value = trigger.dataset.copyValue;
    const label = trigger.dataset.copyLabel || "内容";
    copyText(value, label);
    return;
  }

  if (action === "open-column-modal") {
    state.pendingColumns = [...state.visibleColumns];
    state.columnModalOpen = true;
    renderDrawers();
    return;
  }

  if (action === "close-column-modal") {
    state.columnModalOpen = false;
    renderDrawers();
    return;
  }

  if (action === "apply-column-settings") {
    const mandatory = ["platformOrderNo", "refundNo", "rawStatus"];
    mandatory.forEach((item) => {
      if (!state.pendingColumns.includes(item)) {
        state.pendingColumns.push(item);
      }
    });
    state.visibleColumns = [...new Set(state.pendingColumns)];
    state.columnModalOpen = false;
    render();
    pushToast("success", "列配置已应用", "默认列已更新，字段权限仍按当前角色自动裁剪。");
    return;
  }

  if (action === "open-task-drawer") {
    if (!getCurrentRole().canViewTasks) {
      pushToast("warning", "当前角色不可查看导出任务", "仅导出授权角色、财务、管理层、管理员和审计范围内用户可查看任务。");
      return;
    }
    state.taskDrawerOpen = true;
    renderDrawers();
    return;
  }

  if (action === "close-task-drawer") {
    state.taskDrawerOpen = false;
    renderDrawers();
    return;
  }

  if (action === "open-task-tab") {
    if (!getCurrentRole().canViewTasks) {
      pushToast("warning", "当前角色不可查看导出任务", "当前角色没有导出任务中心访问权限。");
      return;
    }
    state.activeTab = "tasks";
    render();
    return;
  }

  if (action === "task-download") {
    const task = state.tasks.find((item) => item.id === trigger.dataset.taskId);
    if (!task) {
      return;
    }
    if (task.status !== "已完成") {
      pushToast("warning", "暂不可下载", `${task.id} 当前状态为 ${task.status}，请等待任务完成后再下载。`);
      return;
    }
    pushToast("success", "开始下载文件", `${task.fileName} 已开始下载。`);
    return;
  }

  if (action === "run-export") {
    startExportTask();
    return;
  }

  if (action === "retry-query") {
    state.pageState = "ready";
    render();
    runQuery();
    return;
  }
}

function populateSelectOptions() {
  Object.entries(selectOptions).forEach(([key, options]) => {
    const element = document.querySelector(`[data-filter="${key}"]`);
    if (!element) {
      return;
    }
    element.innerHTML = options
      .map((item) => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`)
      .join("");
    element.value = state.draftFilters[key];
  });
}

function runQuery() {
  state.pending = true;
  state.filters = { ...state.draftFilters };
  state.lastQueryAt = formatNow();
  render();
  window.setTimeout(() => {
    state.pending = false;
    state.lastSyncAt = formatNow();
    render();
    if (state.pageState === "ready") {
      pushToast("success", "查询已刷新", "退款总览和退款明细已按当前筛选条件更新。");
    }
  }, 720);
}

function render() {
  ensureActiveTab();
  populateSelectOptions();
  const keywordInput = document.getElementById("filterKeyword");
  if (keywordInput) {
    keywordInput.value = state.draftFilters.keyword;
  }
  renderHeaderMeta();
  renderHeroActions();
  renderAppliedSummary();
  renderAdvancedFilters();
  renderTabs();
  renderPageView();
  renderDrawers();
  renderToasts();
}

function renderHeaderMeta() {
  const chips = [
    `最近同步时间：${state.lastSyncAt}`,
    `默认时间范围：${state.filters.datePreset}`,
    `授权店铺：${getCurrentRole().shopScope}`
  ];
  refs.heroMeta.innerHTML = chips.map((item) => `<span class="meta-pill">${escapeHtml(item)}</span>`).join("");
}

function renderHeroActions() {
  refs.heroActions.innerHTML = `
    <button class="secondary-btn" data-action="refresh-sync">刷新数据</button>
    <button class="primary-btn" data-action="open-task-tab">导出任务</button>
  `;
}

function renderAppliedSummary() {
  const entries = Object.entries(state.draftFilters).filter(([, value]) => {
    return !String(value).startsWith("全部") && value !== "" && value !== "最近 30 天" && value !== "退款创建时间" && value !== "按天";
  });
  if (!entries.length) {
    refs.appliedSummary.innerHTML = `<span class="summary-pill">默认条件：最近 30 天 / 退款创建时间 / 按天 / 全部授权店铺</span>`;
    return;
  }
  refs.appliedSummary.innerHTML = entries
    .map(([key, value]) => `<span class="summary-pill">${escapeHtml(filterLabelMap(key))}：${escapeHtml(value)}</span>`)
    .join("");
}

function renderAdvancedFilters() {
  refs.advancedFilters.hidden = !state.advancedOpen;
  refs.advancedToggle.textContent = state.advancedOpen ? "收起高级筛选" : "展开高级筛选";
}

function renderTabs() {
  const tabs = getAvailableTabs();
  refs.tabBar.innerHTML = tabs
    .map((tab) => {
      const isActive = tab.key === state.activeTab;
      return `
        <button class="tab-btn ${isActive ? "tab-btn-active" : ""}" data-action="switch-tab" data-tab="${tab.key}">
          ${escapeHtml(tab.label)}
        </button>
      `;
    })
    .join("");
}

function renderPageView() {
  const view = state.activeTab;
  if (view === "dashboard") {
    refs.pageView.innerHTML = renderDashboardView();
  } else if (view === "detail") {
    refs.pageView.innerHTML = renderDetailView();
  } else {
    refs.pageView.innerHTML = renderTaskView();
  }
}

function renderDashboardView() {
  if (state.pageState === "no_permission") {
    return renderResultState("无权限查看退款报表", "当前账号缺少退款报表菜单权限或授权店铺为空。建议联系管理员补齐菜单或店铺权限。", true);
  }

  if (state.pending || state.pageState === "loading") {
    return renderSkeletonState();
  }

  if (state.pageState === "error") {
    return renderErrorState("看板聚合失败", "聚合接口超时，请保留当前筛选条件后重试；局部区块异常时不影响其他分区继续查看。");
  }

  if (state.pageState === "empty") {
    return renderEmptyState("当前筛选没有匹配数据", "筛选条件已保留。你可以直接清空筛选、切换站点或放宽时间范围继续查找。");
  }

  const dashboard = getDashboardData();
  return `
    <div class="page-view">
      <section class="summary-strip">
        ${dashboard.metrics.map((item) => renderMetricCard(item)).join("")}
      </section>

      <section class="trend-layout">
        <div class="panel">
          <div class="panel-header">
            <div>
              <h3 class="panel-title">退款趋势分析</h3>
              <p class="panel-subtitle">按日观察退款订单数、退款率、退款金额与成功率走势，点击图点可直接下钻到明细。</p>
            </div>
            <div class="segment-group">
              ${renderTrendTabs()}
            </div>
          </div>
          ${renderTrendChart(dashboard)}
        </div>

        <div class="panel">
          <div class="panel-header">
            <div>
              <h3 class="panel-title">时效与超时监控</h3>
              <p class="panel-subtitle">默认展示完成态订单的平均退款时长与超时分布。</p>
            </div>
            <button class="chip-btn" data-action="drill-filter" data-filter-key="status" data-filter-value="商品退回中" data-source="超时单入口">查看超时单</button>
          </div>
          <div class="kpi-list">
            <div class="kpi-item">
              <div>
                <p class="helper-text">平均退款时长</p>
                <div class="metric-value">${dashboard.efficiency.avg}</div>
              </div>
              <span class="tag tag-info">仅统计完成态</span>
            </div>
            <div class="kpi-item">
              <div>
                <p class="helper-text">超时单数</p>
                <div class="metric-value">${dashboard.efficiency.timeoutCount}</div>
              </div>
              <span class="tag tag-warning">> 72 小时</span>
            </div>
            <div class="inline-kpis">
              <div class="inline-kpi">
                <p class="helper-text">24h 内完成</p>
                <div class="inline-kpi-value">${dashboard.efficiency.within24h}%</div>
              </div>
              <div class="inline-kpi">
                <p class="helper-text">72h 内完成</p>
                <div class="inline-kpi-value">${dashboard.efficiency.within72h}%</div>
              </div>
              <div class="inline-kpi">
                <p class="helper-text">超 72h</p>
                <div class="inline-kpi-value">${dashboard.efficiency.over72h}%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="analysis-grid">
        <div class="panel full-width">
          <div class="panel-header">
            <div>
              <h3 class="panel-title">平台 / 站点 / 组合分析</h3>
              <p class="panel-subtitle">展示退款订单数、金额、退款率与成功率，点击任一行可自动带参进入明细报表。</p>
            </div>
            <div class="segment-group">
              <button class="segment-btn ${state.dimensionTab === "platform" ? "segment-btn-active" : ""}" data-action="switch-dimension" data-dimension="platform">平台</button>
              <button class="segment-btn ${state.dimensionTab === "site" ? "segment-btn-active" : ""}" data-action="switch-dimension" data-dimension="site">站点</button>
              <button class="segment-btn ${state.dimensionTab === "combo" ? "segment-btn-active" : ""}" data-action="switch-dimension" data-dimension="combo">平台 + 站点</button>
            </div>
          </div>
          ${renderDimensionTable(dashboard)}
        </div>
      </section>

      <section class="dashboard-lower-grid">
        <div class="panel">
          <div class="panel-header">
            <div>
              <h3 class="panel-title">SKU TOP 分析</h3>
              <p class="panel-subtitle">按退款订单数、金额、退款率识别高风险 SKU。</p>
            </div>
          </div>
          ${renderTopTable(dashboard.skuTop, "sku")}
        </div>

        <div class="panel">
          <div class="panel-header">
            <div>
              <h3 class="panel-title">退款原因 TOP</h3>
              <p class="panel-subtitle">按订单数与金额双口径定位高频退款原因。</p>
            </div>
            <span class="light-tag">未归类统一归入未分类</span>
          </div>
          ${renderTopTable(dashboard.reasonTop, "reason")}
        </div>

        <div class="panel">
          <div class="panel-header">
            <div>
              <h3 class="panel-title">责任归因占比</h3>
              <p class="panel-subtitle">按责任方聚合订单数与金额，辅助问题治理闭环。</p>
            </div>
            <span class="light-tag">空值归入未归因</span>
          </div>
          ${renderTopTable(dashboard.ownerTop, "owner")}
        </div>
      </section>
    </div>
  `;
}

function renderDetailView() {
  if (state.pageState === "no_permission") {
    return renderResultState("当前角色不可查看退款明细", "当前账号没有退款明细查看权限。", true);
  }

  if (state.pending || state.pageState === "loading") {
    return renderSkeletonState();
  }

  if (state.pageState === "error") {
    return renderErrorState("明细查询失败", "分页查询接口返回超时或筛选参数非法。建议保留条件后点击重试。");
  }

  const rows = getFilteredRows();
  if (state.pageState === "empty" || rows.length === 0) {
    return `
      <div class="page-view">
        ${state.drillMessage ? renderDrillBanner() : ""}
        ${renderEmptyState("暂无匹配的退款明细", "当前筛选条件下没有符合条件的退款记录。可以清空筛选、调整平台站点或时间范围后重试。")}
      </div>
    `;
  }

  const columns = getAccessibleColumns();
  const exportMeta = getExportMeta();
  const taskMeta = getTaskAccessMeta();
  return `
    <div class="page-view">
      ${state.drillMessage ? renderDrillBanner() : ""}
      <div class="toolbar">
        <div class="toolbar-meta">
          <div class="inline-actions">
            <span class="summary-pill">查询结果 ${rows.length} 条</span>
          </div>
          <p class="helper-text">点击平台订单号或退款单号查看详情，导出按当前筛选条件异步生成。</p>
        </div>
        <div class="top-actions">
          <button class="ghost-btn" data-action="open-column-modal">列管理</button>
          ${taskMeta.hidden ? "" : `<button class="secondary-btn ${taskMeta.disabled ? "btn-disabled" : ""}" data-action="open-task-drawer" ${taskMeta.reason ? `data-disabled-reason="${escapeHtml(taskMeta.reason)}"` : ""}>查看最近任务</button>`}
          ${exportMeta.hidden ? "" : `<button class="primary-btn ${exportMeta.disabled ? "btn-disabled" : ""}" data-action="run-export" ${exportMeta.reason ? `data-disabled-reason="${escapeHtml(exportMeta.reason)}"` : ""}>异步导出</button>`}
        </div>
      </div>
      ${renderDetailTable(rows, columns)}
    </div>
  `;
}

function renderTaskView() {
  if (!getCurrentRole().canViewTasks) {
    return renderResultState("当前角色不可查看导出任务", "当前账号没有导出任务查看权限。", false);
  }

  if (state.pageState === "no_permission") {
    return renderResultState("当前角色不可查看导出任务", "当前账号没有导出任务查看权限。", true);
  }

  if (state.pending || state.pageState === "loading") {
    return renderSkeletonState();
  }

  if (state.pageState === "error") {
    return renderErrorState("导出任务加载失败", "任务中心接口异常时应保留当前任务快照，并通过站内通知继续反馈结果。");
  }

  if (state.pageState === "empty") {
    return renderEmptyState("暂无导出任务", "当前角色尚未发起导出，或在授权范围内没有可查看的导出任务记录。");
  }

  const tasks = getVisibleTasks();
  return `
    <div class="page-view">
      <div class="panel">
        <div class="panel-header">
          <div>
            <h3 class="panel-title">导出任务中心</h3>
            <p class="panel-subtitle">查看任务状态、失败原因和下载入口。</p>
          </div>
          <span class="light-tag">按当前筛选条件异步生成</span>
        </div>
        ${renderTaskTable(tasks)}
      </div>
    </div>
  `;
}

function renderMetricCard(metric) {
  return `
    <button class="metric-card" data-action="drill-filter" data-filter-key="status" data-filter-value="全部状态" data-source="${metric.label}">
      <div class="metric-top">
        <div>
          <div class="metric-title">${escapeHtml(metric.label)}</div>
          <div class="metric-value">${formatMetric(metric.value, metric.formatter)}</div>
        </div>
        <span class="tag tag-info">下钻明细</span>
      </div>
      <div class="metric-note">${escapeHtml(metric.note)}</div>
    </button>
  `;
}

function renderTrendTabs() {
  const map = {
    refundOrder: "退款订单数",
    refundRate: "退款率",
    refundAmount: "退款金额",
    refundSuccess: "退款成功率"
  };
  return Object.entries(map)
    .map(([key, label]) => {
      const active = key === state.trendMetric;
      return `<button class="segment-btn ${active ? "segment-btn-active" : ""}" data-action="switch-trend" data-metric="${key}">${label}</button>`;
    })
    .join("");
}

function renderTrendChart(dashboard) {
  const values = dashboard.trends[state.trendMetric];
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const points = values.map((value, index) => {
    const x = 28 + index * 90;
    const y = 190 - ((value - min) / range) * 140;
    return { x, y, value, label: dashboard.trendLabels[index] };
  });
  const line = points.map((point) => `${point.x},${point.y}`).join(" ");
  const area = `${points.map((point) => `${point.x},${point.y}`).join(" ")} ${points.at(-1).x},210 ${points[0].x},210`;
  return `
    <div class="chart-shell">
      <div class="chart-grid">
        <div class="chart-axis">
          <span>${Math.round(max)}</span>
          <span>${Math.round((max + min) / 2)}</span>
          <span>${Math.round(min)}</span>
        </div>
        <div>
          <svg class="chart-svg" viewBox="0 0 620 220" role="img" aria-label="退款趋势图">
            <polyline class="chart-area" points="${area}"></polyline>
            <polyline class="chart-line" points="${line}"></polyline>
            ${points
              .map(
                (point) => `
                  <circle class="chart-point" cx="${point.x}" cy="${point.y}" r="7" data-action="drill-date" data-date-label="${point.label}"></circle>
                  <text x="${point.x}" y="${point.y - 14}" text-anchor="middle" fill="#5b6b87" font-size="12">${point.value}</text>
                `
              )
              .join("")}
          </svg>
          <div class="chart-labels">
            ${dashboard.trendLabels.map((label) => `<span>${label}</span>`).join("")}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderDimensionTable(dashboard) {
  const rows = dashboard.dimensions[state.dimensionTab];
  return `
    <div class="table-shell">
      <div class="table-head" style="grid-template-columns: 1.2fr 0.8fr 0.9fr 0.8fr 0.8fr;">
        <div>${state.dimensionTab === "combo" ? "组合维度" : state.dimensionTab === "site" ? "站点" : "平台"}</div>
        <div>退款单数</div>
        <div class="align-right">退款金额</div>
        <div class="align-right">退款率</div>
        <div class="align-right">成功率</div>
      </div>
      ${rows
        .map(
          (item) => `
            <button class="table-row analysis-row" style="grid-template-columns: 1.2fr 0.8fr 0.9fr 0.8fr 0.8fr;" data-action="drill-filter" data-filter-key="${state.dimensionTab === "site" ? "site" : "platform"}" data-filter-value="${state.dimensionTab === "combo" ? item.label.split(" / ")[0] : item.label}" data-source="${item.label}">
              <div class="table-cell-strong">${escapeHtml(item.label)}</div>
              <div>${item.count}</div>
              <div class="align-right">${formatMoney(item.amount)}</div>
              <div class="align-right">${item.rate.toFixed(2)}%</div>
              <div class="align-right">${item.success.toFixed(1)}%</div>
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function renderTopTable(rows, mode) {
  const rowsHtml = rows
    .map((item, index) => {
      const filterKey = mode === "sku" ? "keyword" : mode;
      const filterValue = mode === "sku" ? item.label : item.label;
      const rightText =
        mode === "sku"
          ? `${formatMoney(item.amount)} / ${item.rate.toFixed(2)}%`
          : `${formatMoney(item.amount)} / 占比 ${item.share.toFixed(1)}%`;
      const helper = mode === "sku" ? item.productName : `${item.count} 单`;
      return `
        <button class="table-row analysis-row" style="grid-template-columns: 0.28fr 1fr 1fr;" data-action="drill-filter" data-filter-key="${filterKey}" data-filter-value="${filterValue}" data-source="${mode}排行">
          <div class="table-cell-strong">#${index + 1}</div>
          <div>
            <div class="table-cell-strong">${escapeHtml(item.label)}</div>
            <div class="helper-text">${escapeHtml(helper)}</div>
          </div>
          <div class="align-right">
            <div class="table-cell-strong">${item.count} 单</div>
            <div class="helper-text">${escapeHtml(rightText)}</div>
          </div>
        </button>
      `;
    })
    .join("");
  return `<div class="table-shell">${rowsHtml}</div>`;
}

function renderDetailTable(rows, columns) {
  const template = columns.map((item) => item.width || "1fr").join(" ");
  const head = columns.map((item) => `<div class="${item.align === "right" ? "align-right" : ""}">${escapeHtml(item.label)}</div>`).join("");
  const body = rows
    .map((row) => {
      const cells = columns.map((column) => renderDetailCell(row, column)).join("");
      return `<div class="table-row" style="grid-template-columns: ${template};">${cells}</div>`;
    })
    .join("");

  return `
    <div class="table-shell">
      <div class="table-head" style="grid-template-columns: ${template};">${head}</div>
      ${body}
    </div>
  `;
}

function renderDetailCell(row, column) {
  const alignClass = column.align === "right" ? "align-right" : "";
  if (column.key === "platformOrderNo") {
    return `
      <div class="${alignClass}">
        <button class="table-link" data-action="open-detail" data-row-id="${row.id}">${escapeHtml(row.platformOrderNo)}</button>
        <button class="mini-copy" data-action="copy-value" data-copy-label="平台订单号" data-copy-value="${row.platformOrderNo}">复制</button>
      </div>
    `;
  }
  if (column.key === "refundNo") {
    return `
      <div class="${alignClass}">
        <button class="table-link" data-action="open-detail" data-row-id="${row.id}">${escapeHtml(row.refundNo)}</button>
        <button class="mini-copy" data-action="copy-value" data-copy-label="退款单号" data-copy-value="${row.refundNo}">复制</button>
      </div>
    `;
  }
  if (column.key === "platformSite") {
    return `<div><div class="table-cell-strong">${escapeHtml(row.platform)}</div><div class="helper-text">${escapeHtml(row.site)}</div></div>`;
  }
  if (column.key === "rawStatus") {
    return `<div>${renderTag(row.rawStatus)}</div>`;
  }
  if (column.key === "finishFlag") {
    return `<div>${renderTag(row.finishFlag ? "完成" : "未完成")}</div>`;
  }
  if (column.key === "amountBase") {
    return `<div class="${alignClass}">${formatMoney(row.amountBase)}</div>`;
  }
  if (column.key === "financeStatus") {
    return `<div>${renderTag(row.financeStatus)}</div>`;
  }
  if (column.key === "duration") {
    return `<div>${formatDuration(row.durationMin)}</div>`;
  }
  const map = {
    shopName: row.shopName,
    skuCode: row.skuCode,
    reason: row.reason,
    owner: row.owner,
    createdAt: row.createdAt,
    finishedAt: row.finishedAt,
    warehouse: row.warehouse
  };
  return `<div class="${alignClass}">${escapeHtml(String(map[column.key] ?? "-"))}</div>`;
}

function renderTaskTable(tasks) {
  const template = "1fr 1.1fr 1fr 0.8fr 1.2fr 1fr 0.75fr";
  return `
    <div class="task-shell">
      <div class="task-head" style="grid-template-columns: ${template};">
        <div>任务号 / 文件名</div>
        <div>创建人</div>
        <div>创建时间</div>
        <div>状态</div>
        <div>筛选条件</div>
        <div>导出字段 / 通知方式</div>
        <div>操作</div>
      </div>
      ${tasks
        .map(
          (task) => `
            <div class="task-row" style="grid-template-columns: ${template};">
              <div>
                <div class="table-cell-strong">${escapeHtml(task.id)}</div>
                <div class="helper-text">${escapeHtml(task.fileName)}</div>
              </div>
              <div>${escapeHtml(task.creator)}</div>
              <div>${escapeHtml(task.createdAt)}</div>
              <div>${renderTag(task.status)}</div>
              <div class="helper-text">${escapeHtml(task.snapshot)}</div>
              <div>
                <div class="helper-text">${escapeHtml(task.fields)}</div>
                <div class="helper-text">${escapeHtml(task.channel)}</div>
              </div>
              <div>
                <button class="secondary-btn" data-action="task-download" data-task-id="${task.id}">${task.status === "已完成" ? "下载" : "查看"}</button>
              </div>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function renderDrillBanner() {
  return `
    <div class="banner banner-info">
      <div>
        <div class="strong">已从看板完成下钻</div>
        <p class="helper-text">${escapeHtml(state.drillMessage)}</p>
      </div>
      <button class="ghost-btn" data-action="clear-drill">收起提示</button>
    </div>
  `;
}

function renderEmptyState(title, description) {
  return `
    <div class="empty-state">
      <div class="empty-icon">∅</div>
      <h4>${escapeHtml(title)}</h4>
      <p>${escapeHtml(description)}</p>
      <div class="inline-actions" style="justify-content:center; margin-top: 20px;">
        <button class="secondary-btn" data-action="reset-filters">重置筛选</button>
      </div>
    </div>
  `;
}

function renderErrorState(title, description) {
  return `
    <div class="error-state">
      <div class="result-icon result-icon-danger">!</div>
      <h4>${escapeHtml(title)}</h4>
      <p>${escapeHtml(description)}</p>
      <div class="inline-actions" style="justify-content:center; margin-top: 20px;">
        <button class="secondary-btn" data-action="retry-query">重试查询</button>
      </div>
    </div>
  `;
}

function renderResultState(title, description, withRetry) {
  return `
    <div class="result-state">
      <div class="result-icon ${withRetry ? "result-icon-danger" : ""}">${withRetry ? "⛔" : "ℹ"}</div>
      <h4>${escapeHtml(title)}</h4>
      <p>${escapeHtml(description)}</p>
      ${withRetry ? `<div class="inline-actions" style="justify-content:center; margin-top: 20px;"><button class="secondary-btn" data-action="retry-query">恢复默认态</button></div>` : ""}
    </div>
  `;
}

function renderSkeletonState() {
  return `
    <div class="skeleton-state">
      <div class="skeleton-grid">
        <div class="summary-strip">
          <div class="skeleton-card"></div>
          <div class="skeleton-card"></div>
          <div class="skeleton-card"></div>
          <div class="skeleton-card"></div>
        </div>
        <div class="skeleton-row"></div>
        <div class="skeleton-row"></div>
        <div class="skeleton-row skeleton-row-short"></div>
      </div>
    </div>
  `;
}

function renderDrawers() {
  const row = getSelectedRow();
  refs.detailDrawer.classList.toggle("drawer-open", state.detailDrawerOpen);
  refs.detailDrawer.setAttribute("aria-hidden", String(!state.detailDrawerOpen));
  refs.taskDrawer.classList.toggle("drawer-open", state.taskDrawerOpen);
  refs.taskDrawer.setAttribute("aria-hidden", String(!state.taskDrawerOpen));
  refs.scrim.hidden = !(state.detailDrawerOpen || state.taskDrawerOpen || state.columnModalOpen);
  refs.columnModal.hidden = !state.columnModalOpen;

  if (row) {
    refs.detailDrawerTitle.textContent = `${row.refundNo} · ${row.productName}`;
    refs.detailDrawerBody.innerHTML = renderDetailDrawerBody(row);
    refs.detailDrawerFooter.innerHTML = renderDetailDrawerFooter();
  } else {
    refs.detailDrawerBody.innerHTML = "";
    refs.detailDrawerFooter.innerHTML = "";
  }

  refs.taskDrawerBody.innerHTML = getCurrentRole().canViewTasks
    ? `
        ${renderTaskTable(getVisibleTasks().slice(0, 4))}
      `
    : renderResultState("当前角色不可查看导出任务", "当前账号没有导出任务查看权限。", false);

  refs.columnModalBody.innerHTML = renderColumnModalBody();
}

function renderDetailDrawerBody(row) {
  return `
    <div class="summary-strip" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
      <div class="metric-card">
        <div class="metric-title">原始退款状态</div>
        <div>${renderTag(row.rawStatus)}</div>
        <div class="metric-note">完成态：${row.finishFlag ? "是" : "否"}</div>
      </div>
      <div class="metric-card">
        <div class="metric-title">本位币退款金额</div>
        <div class="metric-value">${getCurrentRole().showAmount ? formatMoney(row.amountBase) : "权限隐藏"}</div>
        <div class="metric-note">原币种：${row.currency} ${row.amountOriginal.toFixed(2)}</div>
      </div>
      <div class="metric-card">
        <div class="metric-title">财务核账状态</div>
        <div>${getCurrentRole().showFinance ? renderTag(row.financeStatus) : renderTag("权限隐藏")}</div>
        <div class="metric-note">按角色权限显示</div>
      </div>
    </div>

    <div class="drawer-tab-group">
      <button class="drawer-tab ${state.detailDrawerTab === "basic" ? "drawer-tab-active" : ""}" data-action="switch-drawer-tab" data-drawer-tab="basic">基础信息</button>
      <button class="drawer-tab ${state.detailDrawerTab === "amount" ? "drawer-tab-active" : ""}" data-action="switch-drawer-tab" data-drawer-tab="amount">金额与状态</button>
      <button class="drawer-tab ${state.detailDrawerTab === "audit" ? "drawer-tab-active" : ""}" data-action="switch-drawer-tab" data-drawer-tab="audit">原因与审计</button>
    </div>

    ${state.detailDrawerTab === "basic" ? renderDrawerBasic(row) : ""}
    ${state.detailDrawerTab === "amount" ? renderDrawerAmount(row) : ""}
    ${state.detailDrawerTab === "audit" ? renderDrawerAudit(row) : ""}
  `;
}

function renderDrawerBasic(row) {
  return `
    <section class="drawer-section">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">基础信息</h3>
        </div>
      </div>
      <div class="description-grid">
        <div class="description-item">
          <span class="description-label">平台订单号</span>
          <span class="description-value">${escapeHtml(row.platformOrderNo)}</span>
        </div>
        <div class="description-item">
          <span class="description-label">退款单号</span>
          <span class="description-value">${escapeHtml(row.refundNo)}</span>
        </div>
        <div class="description-item">
          <span class="description-label">平台 / 站点</span>
          <span class="description-value">${escapeHtml(row.platform)} / ${escapeHtml(row.site)}</span>
        </div>
        <div class="description-item">
          <span class="description-label">店铺</span>
          <span class="description-value">${escapeHtml(row.shopName)}</span>
        </div>
        <div class="description-item">
          <span class="description-label">SKU</span>
          <span class="description-value">${escapeHtml(row.skuCode)}</span>
        </div>
        <div class="description-item">
          <span class="description-label">发货仓</span>
          <span class="description-value">${escapeHtml(row.warehouse)}</span>
        </div>
        <div class="description-item description-item-wide">
          <span class="description-label">退款摘要</span>
          <span class="description-value">${escapeHtml(row.summary)}</span>
        </div>
      </div>
    </section>

    <section class="drawer-section">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">状态时间轴</h3>
        </div>
      </div>
      <div class="description-grid">
        <div class="description-item">
          <span class="description-label">退款创建时间</span>
          <span class="description-value">${escapeHtml(row.createdAt)}</span>
        </div>
        <div class="description-item">
          <span class="description-label">退款完成时间</span>
          <span class="description-value">${escapeHtml(row.finishedAt)}</span>
        </div>
        <div class="description-item">
          <span class="description-label">当前状态</span>
          <span class="description-value">${renderTag(row.rawStatus)}</span>
        </div>
        <div class="description-item">
          <span class="description-label">退款时效</span>
          <span class="description-value">${escapeHtml(formatDuration(row.durationMin))}</span>
        </div>
      </div>
    </section>
  `;
}

function renderDrawerAmount(row) {
  const canSeeAmount = getCurrentRole().showAmount;
  const canSeeFinance = getCurrentRole().showFinance;
  return `
    <section class="drawer-section">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">金额与核账</h3>
        </div>
      </div>
      <div class="description-grid">
        <div class="description-item">
          <span class="description-label">原币种退款金额</span>
          <span class="description-value">${canSeeAmount ? `${row.currency} ${row.amountOriginal.toFixed(2)}` : "权限隐藏"}</span>
        </div>
        <div class="description-item">
          <span class="description-label">本位币退款金额</span>
          <span class="description-value">${canSeeAmount ? formatMoney(row.amountBase) : "权限隐藏"}</span>
        </div>
        <div class="description-item">
          <span class="description-label">退款金额类型</span>
          <span class="description-value">${escapeHtml(row.amountType)}</span>
        </div>
        <div class="description-item">
          <span class="description-label">财务核账状态</span>
          <span class="description-value">${canSeeFinance ? row.financeStatus : "权限隐藏"}</span>
        </div>
        <div class="description-item">
          <span class="description-label">完成状态</span>
          <span class="description-value">${row.finishFlag ? "已完成" : "未完成"}</span>
        </div>
        <div class="description-item">
          <span class="description-label">原始退款状态</span>
          <span class="description-value">${escapeHtml(row.rawStatus)}</span>
        </div>
      </div>
    </section>
  `;
}

function renderDrawerAudit(row) {
  const logs = buildAuditLogs(row);
  return `
    <section class="drawer-section">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">原因与责任归因</h3>
        </div>
      </div>
      <div class="description-grid">
        <div class="description-item">
          <span class="description-label">退款原因</span>
          <span class="description-value">${escapeHtml(row.reason)}</span>
        </div>
        <div class="description-item">
          <span class="description-label">责任归因方</span>
          <span class="description-value">${escapeHtml(row.owner)}</span>
        </div>
        <div class="description-item">
          <span class="description-label">当前跟进人</span>
          <span class="description-value">${escapeHtml(row.operator)}</span>
        </div>
        <div class="description-item">
          <span class="description-label">备注</span>
          <span class="description-value">${escapeHtml(row.remark)}</span>
        </div>
      </div>
    </section>

    <section class="drawer-section">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">操作日志</h3>
        </div>
      </div>
      <div class="log-table">
        <div class="log-head">
          <div>菜单</div>
          <div>一级功能</div>
          <div>二级功能</div>
          <div>操作人</div>
          <div>操作类型</div>
          <div>操作对象</div>
          <div>操作详情</div>
          <div>操作时间</div>
        </div>
        ${logs
          .map(
            (log) => `
              <div class="log-row">
                <div>${escapeHtml(log.menu)}</div>
                <div>${escapeHtml(log.level1)}</div>
                <div>${escapeHtml(log.level2)}</div>
                <div>${escapeHtml(log.operator)}</div>
                <div>${escapeHtml(log.type)}</div>
                <div>${escapeHtml(log.object)}</div>
                <div>${escapeHtml(log.detail)}</div>
                <div>${escapeHtml(log.time)}</div>
              </div>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderDetailDrawerFooter() {
  return `
    <button class="ghost-btn" data-action="copy-value" data-copy-label="退款单号" data-copy-value="${getSelectedRow()?.refundNo || ""}">复制退款单号</button>
    <button class="primary-btn" data-action="close-detail-drawer">关闭抽屉</button>
  `;
}

function renderColumnModalBody() {
  const role = getCurrentRole();
  return `
    <div class="banner banner-info">
      <div>
        <div class="strong">列管理规则</div>
        <p class="helper-text">平台订单号、退款单号、原始退款状态为必选字段，其余字段按当前权限显示。</p>
      </div>
    </div>
    <div class="column-list">
      ${columnDefinitions
        .map((column) => {
          const allowed = isColumnAllowed(column, role);
          const checked = state.pendingColumns.includes(column.key) && allowed;
          return `
            <label class="checkbox-card">
              <input type="checkbox" data-column-key="${column.key}" ${checked ? "checked" : ""} ${allowed ? "" : "disabled"}>
              <span>
                <div class="checkbox-title">${escapeHtml(column.label)}</div>
                <p class="checkbox-note">${allowed ? "可参与当前角色默认列配置" : "当前角色无此字段权限，保持隐藏"}</p>
              </span>
            </label>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderToasts() {
  refs.toastStack.innerHTML = state.toasts
    .map(
      (toast) => `
        <div class="toast toast-${toast.type}">
          <div class="toast-title">${escapeHtml(toast.title)}</div>
          <p>${escapeHtml(toast.message)}</p>
        </div>
      `
    )
    .join("");
}

function getDashboardData() {
  const platformFactor = state.filters.platform === "全部平台" ? 1 : 0.36;
  const siteFactor = state.filters.site === "全部站点" ? 1 : 0.62;
  const shopFactor = state.filters.shop === "全部店铺" ? 1 : 0.52;
  const modifier = +(platformFactor * siteFactor * shopFactor).toFixed(2);
  return {
    metrics: dashboardBase.metrics.map((item) => ({
      ...item,
      value: scaleMetric(item.value, item.formatter, modifier)
    })),
    trendLabels: dashboardBase.trendLabels,
    trends: Object.fromEntries(
      Object.entries(dashboardBase.trends).map(([key, values]) => [
        key,
        values.map((value) => roundByFormatter(scaleMetric(value, key === "refundAmount" ? "money" : key === "refundRate" || key === "refundSuccess" ? "percent" : "int", modifier)))
      ])
    ),
    dimensions: dashboardBase.dimensions,
    skuTop: dashboardBase.skuTop,
    reasonTop: dashboardBase.reasonTop,
    ownerTop: dashboardBase.ownerTop,
    efficiency: dashboardBase.efficiency
  };
}

function getFilteredRows() {
  return detailRows.filter((row) => {
    if (state.filters.platform !== "全部平台" && row.platform !== state.filters.platform) {
      return false;
    }
    if (state.filters.site !== "全部站点" && row.site !== state.filters.site) {
      return false;
    }
    if (state.filters.shop !== "全部店铺" && row.shopName !== state.filters.shop) {
      return false;
    }
    if (state.filters.status !== "全部状态" && row.rawStatus !== state.filters.status) {
      return false;
    }
    if (state.filters.bizType !== "全部业务类型" && row.bizType !== state.filters.bizType) {
      return false;
    }
    if (state.filters.processType !== "全部处理类型" && row.processType !== state.filters.processType) {
      return false;
    }
    if (state.filters.amountType !== "全部金额类型" && row.amountType !== state.filters.amountType) {
      return false;
    }
    if (state.filters.reason !== "全部原因" && row.reason !== state.filters.reason) {
      return false;
    }
    if (state.filters.owner !== "全部责任方" && row.owner !== state.filters.owner) {
      return false;
    }
    if (state.filters.warehouse !== "全部发货仓" && row.warehouse !== state.filters.warehouse) {
      return false;
    }
    if (state.filters.keyword) {
      const keyword = state.filters.keyword.toLowerCase();
      const searchable = [row.platformOrderNo, row.refundNo, row.skuCode, row.productName].join(" ").toLowerCase();
      if (!searchable.includes(keyword)) {
        return false;
      }
    }
    return true;
  });
}

function getSelectedRow() {
  return detailRows.find((row) => row.id === state.selectedRowId) || null;
}

function getCurrentRole() {
  return roleConfigs[state.role];
}

function getAvailableTabs() {
  const tabs = [
    { key: "dashboard", label: "退款总览看板" },
    { key: "detail", label: "退款明细报表" }
  ];
  if (getCurrentRole().canViewTasks) {
    tabs.push({ key: "tasks", label: "导出任务中心" });
  }
  return tabs;
}

function ensureActiveTab() {
  const available = getAvailableTabs().map((item) => item.key);
  if (!available.includes(state.activeTab)) {
    state.activeTab = "dashboard";
  }
}

function getAccessibleColumns() {
  const role = getCurrentRole();
  return columnDefinitions.filter((column) => state.visibleColumns.includes(column.key) && isColumnAllowed(column, role));
}

function isColumnAllowed(column, role) {
  if (column.permission === "all") {
    return true;
  }
  if (column.permission === "amount") {
    return role.showAmount;
  }
  if (column.permission === "finance") {
    return role.showFinance;
  }
  return true;
}

function getVisibleTasks() {
  const role = getCurrentRole();
  if (!role.canViewTasks) {
    return [];
  }
  if (state.role === "operations") {
    return state.tasks.filter((task) => /运营|财务|管理层/.test(task.creator));
  }
  if (state.role === "finance") {
    return state.tasks.filter((task) => /财务|运营|管理层/.test(task.creator));
  }
  if (state.role === "manager" || state.role === "admin") {
    return state.tasks;
  }
  return state.tasks.filter((task) => task.creator.includes(role.label));
}

function buildAuditLogs(row) {
  return [
    {
      menu: "退款报表",
      level1: "进入退款报表",
      level2: "查看详情抽屉",
      operator: row.operator,
      type: "查看",
      object: `${row.refundNo} (${row.platformOrderNo})`,
      detail: "从退款明细列表打开详情抽屉",
      time: formatNow()
    },
    {
      menu: "退款报表",
      level1: "明细查询",
      level2: "原因/责任查看",
      operator: row.operator,
      type: "查询",
      object: row.refundNo,
      detail: `退款原因：${row.reason}；责任归因：${row.owner}`,
      time: "2026-04-27 09:18"
    },
    {
      menu: "退款报表",
      level1: "导出任务",
      level2: "下载结果",
      operator: "周琳",
      type: "导出",
      object: row.refundNo,
      detail: "使用当前筛选条件导出退款明细",
      time: "2026-04-27 10:26"
    }
  ];
}

function applyDrilldown(filterKey, filterValue, source) {
  state.activeTab = "detail";
  if (filterKey === "keyword") {
    state.filters = { ...state.filters, keyword: filterValue };
  } else {
    state.filters = { ...state.filters, [filterKey]: filterValue };
  }
  state.draftFilters = { ...state.filters };
  state.drillMessage = `已从 ${source} 自动带入 ${filterLabelMap(filterKey)} = ${filterValue}。`;
  populateSelectOptions();
  render();
  pushToast("info", "已切换到退款明细", `来自 ${source} 的下钻条件已自动带入。`);
}

function getExportMeta() {
  const role = getCurrentRole();
  if (role.exportMode === "enabled") {
    return { hidden: false, disabled: false, reason: "" };
  }
  if (role.exportMode === "restricted") {
    return { hidden: false, disabled: true, reason: "当前角色暂不支持导出。" };
  }
  return { hidden: true, disabled: false, reason: "" };
}

function getTaskAccessMeta() {
  if (getCurrentRole().canViewTasks) {
    return { hidden: false, disabled: false, reason: "" };
  }
  return { hidden: true, disabled: false, reason: "" };
}

function startExportTask() {
  const role = getCurrentRole();
  if (role.exportMode !== "enabled") {
    pushToast("warning", "导出未开放", role.exportMode === "restricted" ? "当前角色暂不支持导出。" : "当前角色没有导出权限。");
    return;
  }

  const taskId = `EXP-${new Date().getTime().toString().slice(-9)}`;
  const task = {
    id: taskId,
    creator: `${role.label === "管理层" ? "李总" : role.label === "财务" ? "周琳" : "李倩"} / ${role.label}`,
    createdAt: formatNow(),
    status: "生成中",
    fileName: `退款明细_${state.filters.platform === "全部平台" ? "全部平台" : state.filters.platform}_${state.filters.datePreset.replace(/\s/g, "")}.xlsx`,
    snapshot: summarizeFilters(),
    fields: summarizeExportFields(),
    channel: "站内通知",
    result: "处理中"
  };
  state.tasks.unshift(task);
  render();
  pushToast("success", "已创建导出任务", `${task.id} 已按当前筛选条件进入异步生成流程。`);

  window.setTimeout(() => {
    const currentTask = state.tasks.find((item) => item.id === taskId);
    if (!currentTask) {
      return;
    }
    currentTask.status = "已完成";
    currentTask.result = `${Math.max(186, getFilteredRows().length * 24)} 行`;
    currentTask.channel = "站内通知";
    render();
    pushToast("info", "导出完成", `${currentTask.fileName} 已生成，可在任务中心或任务抽屉下载。`);
  }, 1800);
}

function summarizeFilters() {
  const pairs = [];
  ["platform", "site", "shop", "status", "datePreset"].forEach((key) => {
    const value = state.filters[key];
    if (value && !String(value).startsWith("全部")) {
      pairs.push(`${filterLabelMap(key)}=${value}`);
    }
  });
  return pairs.length ? pairs.join("；") : "默认最近30天；全部授权店铺";
}

function summarizeExportFields() {
  const columns = getAccessibleColumns().map((item) => item.label);
  return columns.length > 5 ? `${columns.slice(0, 5).join(" / ")} 等 ${columns.length} 列` : columns.join(" / ");
}

function pushToast(type, title, message) {
  const id = state.toastId++;
  state.toasts.unshift({ id, type, title, message });
  state.toasts = state.toasts.slice(0, 4);
  renderToasts();
  window.setTimeout(() => {
    state.toasts = state.toasts.filter((item) => item.id !== id);
    renderToasts();
  }, 2800);
}

function copyText(value, label) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(value).catch(() => {});
  }
  pushToast("success", "复制成功", `${label} 已复制到剪贴板。`);
}

function filterLabelMap(key) {
  const labels = {
    keyword: "关键字",
    platform: "平台",
    site: "站点",
    shop: "店铺",
    dateType: "时间类型",
    datePreset: "时间范围",
    granularity: "时间粒度",
    status: "退款状态",
    bizType: "退款业务类型",
    processType: "退款处理类型",
    amountType: "退款金额类型",
    reason: "退款原因",
    owner: "责任归因方",
    warehouse: "发货仓"
  };
  return labels[key] || key;
}

function renderTag(value) {
  const normalized = String(value);
  let cls = "tag-muted";
  if (["已完成", "已关闭", "完成", "已核账"].includes(normalized)) {
    cls = "tag-success";
  } else if (["商品退回中", "平台介入中", "核账中", "差异待处理"].includes(normalized)) {
    cls = "tag-warning";
  } else if (["已拒绝", "生成失败", "已过期"].includes(normalized)) {
    cls = "tag-danger";
  } else if (["卖家待处理", "待买家处理", "未核账", "未完成", "生成中", "权限隐藏"].includes(normalized)) {
    cls = "tag-info";
  }
  return `<span class="tag ${cls}">${escapeHtml(normalized)}</span>`;
}

function formatMetric(value, formatter) {
  if (formatter === "int") {
    return formatNumber(value);
  }
  if (formatter === "percent") {
    return `${Number(value).toFixed(2)}%`;
  }
  if (formatter === "money") {
    return formatMoney(value);
  }
  if (formatter === "duration_hour") {
    return `${Number(value).toFixed(1)} 小时`;
  }
  return String(value);
}

function scaleMetric(value, formatter, modifier) {
  if (formatter === "percent") {
    return +(value * (0.92 + modifier * 0.08)).toFixed(2);
  }
  if (formatter === "duration_hour") {
    return +(value * (0.96 + modifier * 0.04)).toFixed(1);
  }
  return +(value * modifier).toFixed(2);
}

function roundByFormatter(value) {
  if (value >= 1000) {
    return Math.round(value);
  }
  if (value >= 10) {
    return Math.round(value * 10) / 10;
  }
  return Math.round(value * 100) / 100;
}

function formatMoney(value) {
  return new Intl.NumberFormat("zh-CN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

function formatNumber(value) {
  return new Intl.NumberFormat("zh-CN").format(Math.round(value));
}

function formatDuration(minutes) {
  if (!minutes) {
    return "-";
  }
  const days = Math.floor(minutes / (60 * 24));
  const hours = Math.floor((minutes % (60 * 24)) / 60);
  const mins = minutes % 60;
  const dayText = days ? `${days} 天 ` : "";
  const hourText = hours ? `${hours} 小时 ` : "";
  const minText = mins ? `${mins} 分` : "";
  return `${dayText}${hourText}${minText}`.trim();
}

function calculateTaskSuccessRate(tasks) {
  if (!tasks.length) {
    return "0.0";
  }
  const success = tasks.filter((task) => task.status === "已完成").length;
  return ((success / tasks.length) * 100).toFixed(1);
}

function formatNow() {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${d} ${hh}:${mm}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
