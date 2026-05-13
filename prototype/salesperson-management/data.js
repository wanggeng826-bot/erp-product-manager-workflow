const state = {
  module: "unit",
  unitTab: "members",
  orderTab: "pending",
  selectedOrgId: "smt-tools",
  selectedPeople: new Set(),
  selectedOrders: new Set(),
  personnelMode: "add",
  editingPersonId: null,
  storeSelection: new Set(["shopee-tw-01", "shopee-tw-02", "smt033"]),
  targetEditing: null,
  targetDirty: new Set(),
  targetExpanded: new Set(["bu", "person-zhangsai"]),
  adjustmentScopeMode: "orderIds",
  adjustmentSalesMode: "rule",
  adjustmentUnitMode: "rule"
};

const orgRows = [
  { id: "root", level: 0, label: "四海芯舟", sub: "四海芯舟", count: 76, expanded: true },
  { id: "industrial", level: 1, label: "工业运营中心", sub: "四海芯舟-工业运营中心", count: 65, expanded: true },
  { id: "smt-biz", level: 2, label: "速卖通事业部", sub: "四海芯舟-工业运营中心-速卖通事业部", count: 19, expanded: true },
  { id: "smt-tools", level: 3, label: "深圳速卖通工具组", sub: "四海芯舟-速卖通工业事业部-深圳速卖通工具组", count: 7 },
  { id: "smt-components", level: 3, label: "深圳速卖通元器件组", sub: "四海芯舟-速卖通工业事业部-深圳速卖通元器件组", count: 6 },
  { id: "smt-managed", level: 3, label: "深圳速卖通全托管组", sub: "四海芯舟-速卖通工业事业部-深圳速卖通全托管组", count: 12 },
  { id: "ali-international", level: 3, label: "阿里国际组", sub: "四海芯舟-速卖通工业事业部-阿里国际组", count: 1 },
  { id: "shopify", level: 3, label: "shopify组", sub: "四海芯舟-工业运营中心-shopify组", count: 1 },
  { id: "sea-project", level: 2, label: "东南亚项目部", sub: "四海芯舟-工业运营中心-东南亚项目部", count: 9, expanded: true },
  { id: "sea-cross", level: 3, label: "深圳东南亚跨境组", sub: "四海芯舟-工业运营中心-东南亚项目部-跨境组", count: 3 },
  { id: "sea-local", level: 3, label: "深圳东南亚本土组", sub: "四海芯舟-工业运营中心-东南亚项目部-本土组", count: 6 },
  { id: "amazon-industrial", level: 2, label: "亚马逊工业事业部", sub: "四海芯舟-工业运营中心-亚马逊工业事业部", count: 9, expanded: true },
  { id: "amazon-jp", level: 3, label: "亚马逊工业-日本组", sub: "四海芯舟-工业运营中心-亚马逊-日本组", count: 1 }
];

const people = [
  {
    id: "p1",
    name: "沈浩楠",
    employeeNo: "SMT-1001",
    orgPath: "工业运营中心 > 速卖通事业部 > 速卖通工具组",
    unit: "深圳速卖通工具组",
    function: "负责人",
    stores: [
      { platform: "AliExpress", names: ["SMT001", "SMT018", "SMT072", "SMT085", "SMT096", "SMT107"] },
      { platform: "Amazon", names: ["AMZ-DE-01", "AMZ-US-03"] }
    ],
    activeFrom: "2026-05-01",
    status: "生效中"
  },
  {
    id: "p2",
    name: "张赛",
    employeeNo: "SMT-1024",
    groupTag: "速卖通",
    orgPath: "工业运营中心 > 速卖通事业部 > 速卖通工具组",
    unit: "深圳速卖通工具组",
    function: "组员",
    stores: [
      { platform: "AliExpress", names: ["SMT033", "SMT008", "SMT019", "SMT048"] },
      { platform: "Shopee", names: ["Shopee台湾01店", "Shopee台湾03店"] }
    ],
    activeFrom: "2026-05-01",
    status: "生效中"
  },
  {
    id: "p3",
    name: "廖中霞",
    employeeNo: "SMT-1031",
    orgPath: "工业运营中心 > 速卖通事业部 > 速卖通工具组",
    unit: "深圳速卖通工具组",
    function: "组员",
    stores: [],
    activeFrom: "2026-05-13",
    status: "待配置"
  },
  {
    id: "p4",
    name: "黄爱纯",
    employeeNo: "SMT-1043",
    groupTag: "速卖通",
    orgPath: "工业运营中心 > 速卖通事业部 > 速卖通工具组",
    unit: "深圳速卖通工具组",
    function: "组员",
    stores: [
      { platform: "AliExpress", names: ["SMT072"] }
    ],
    activeFrom: "2026-05-01",
    status: "生效中"
  },
  {
    id: "p5",
    name: "张旭",
    employeeNo: "SMT-1056",
    groupTag: "速卖通",
    orgPath: "工业运营中心 > 速卖通事业部 > 速卖通工具组",
    unit: "深圳速卖通工具组",
    function: "组员",
    stores: [
      { platform: "AliExpress", names: ["SMT100", "SMT048"] }
    ],
    activeFrom: "2026-05-01",
    status: "生效中"
  },
  {
    id: "p6",
    name: "万思",
    employeeNo: "SMT-1062",
    orgPath: "工业运营中心 > 速卖通事业部 > 速卖通工具组",
    unit: "深圳速卖通工具组",
    function: "组员",
    stores: [
      { platform: "AliExpress", names: ["SMT085", "SMT018", "SMT127"] }
    ],
    activeFrom: "2026-05-01",
    status: "生效中"
  },
  {
    id: "p7",
    name: "李洋",
    employeeNo: "SMT-1077",
    groupTag: "速卖通",
    orgPath: "工业运营中心 > 速卖通事业部 > 速卖通工具组",
    unit: "深圳速卖通工具组",
    function: "组员",
    stores: [
      { platform: "AliExpress", names: ["SMT077", "SMT086", "SMT143"] }
    ],
    activeFrom: "2026-05-01",
    status: "生效中"
  }
];

const logs = [
  { type: "编辑人员配置", operator: "王耕", object: "张赛", detail: "新增店铺 SMT033、SMT008；生效日期 2026-05-01", time: "2026-05-13 14:26:21" },
  { type: "归属重算", operator: "王耕", object: "SMT033", detail: "按 ShopID + Order_CreateTime 重新匹配订单归属，共命中 32 单", time: "2026-05-13 14:21:07" },
  { type: "移除人员", operator: "沈浩楠", object: "廖中霞", detail: "解除当前业务单元关联；名下 0 个店铺", time: "2026-05-12 18:04:33" },
  { type: "角色调整", operator: "王耕", object: "沈浩楠", detail: "业务职能由组员调整为负责人", time: "2026-05-11 09:32:10" },
  { type: "添加人员", operator: "沈浩楠", object: "李洋", detail: "加入深圳速卖通工具组，默认职能：组员", time: "2026-05-10 11:15:48" }
];

const pendingOrders = [
  { id: "AE202605130001", time: "2026-05-13 10:42:08", platform: "AliExpress", store: "SMT033", reason: "店铺未配置归属规则" },
  { id: "AE202605130089", time: "2026-05-13 09:18:46", platform: "AliExpress", store: "SMT127", reason: "对应销售员已解绑或失效" },
  { id: "SP202605120731", time: "2026-05-12 20:33:15", platform: "Shopee", store: "Shopee台湾02店", reason: "业务单元被停用" },
  { id: "AE202605120224", time: "2026-05-12 17:05:02", platform: "AliExpress", store: "SMT048", reason: "店铺未配置归属规则" }
];

const historyRows = [
  { orderId: "AE202605060119", store: "SMT033 / AliExpress", time: "2026-05-06 11:42:10", before: "王五 / Temu半托管组", after: "张赛 / 深圳速卖通工具组", rule: "指定运营 + 指定业务单元", operator: "王耕", updateTime: "2026-05-13 14:19:03" },
  { orderId: "AE202605040771", store: "SMT072 / AliExpress", time: "2026-05-04 09:26:41", before: "空 / 未归属", after: "黄爱纯 / 深圳速卖通工具组", rule: "按最新规则匹配", operator: "沈浩楠", updateTime: "2026-05-12 16:42:55" },
  { orderId: "SP202605030118", store: "Shopee台湾02店 / Shopee", time: "2026-05-03 21:16:09", before: "钱七 / 菲律宾土组", after: "张赛 / 深圳速卖通工具组", rule: "指定运营 + 按最新业务单元", operator: "王耕", updateTime: "2026-05-11 10:06:20" }
];

const storeTree = [
  {
    key: "shopee",
    label: "Shopee（包含 15 店铺）",
    platform: "Shopee",
    level: 0,
    children: [
      {
        key: "shopee-sea",
        label: "东南亚本土运营中心",
        platform: "Shopee",
        level: 1,
        children: [
          {
            key: "shopee-tw",
            label: "台湾",
            platform: "Shopee",
            level: 2,
            children: [
              { key: "shopee-tw-01", label: "Shopee台湾01店", platform: "Shopee", level: 3, ownerType: "self", owner: "张赛" },
              { key: "shopee-tw-02", label: "Shopee台湾02店", platform: "Shopee", level: 3, ownerType: "other", owner: "菲律宾土组 - 王五" },
              { key: "shopee-tw-03", label: "Shopee台湾03店", platform: "Shopee", level: 3, ownerType: "clean", owner: "" }
            ]
          }
        ]
      }
    ]
  },
  {
    key: "amazon",
    label: "Amazon（包含 20 店铺）",
    platform: "Amazon",
    level: 0,
    children: [
      {
        key: "amazon-eu",
        label: "欧洲站点",
        platform: "Amazon",
        level: 1,
        children: [
          { key: "amz-de-01", label: "AMZ-DE-01", platform: "Amazon", level: 3, ownerType: "clean", owner: "" },
          { key: "amz-fr-04", label: "AMZ-FR-04", platform: "Amazon", level: 3, ownerType: "other", owner: "欧美组 - 钱七" }
        ]
      }
    ]
  },
  {
    key: "aliexpress",
    label: "AliExpress（包含 42 店铺）",
    platform: "AliExpress",
    level: 0,
    children: [
      { key: "smt033", label: "SMT033", platform: "AliExpress", level: 3, ownerType: "self", owner: "张赛" },
      { key: "smt048", label: "SMT048", platform: "AliExpress", level: 3, ownerType: "other", owner: "张旭" },
      { key: "smt143", label: "SMT143", platform: "AliExpress", level: 3, ownerType: "clean", owner: "" }
    ]
  }
];

const targetRows = [
  { id: "bu", type: "BU", name: "深圳速卖通工具组", values: [100, 100, 110, 120, 120, 130], actual: [92, 96, 104, 38, 0, 0] },
  { id: "person-zhangsai", parentId: "bu", type: "PERSON", name: "张赛", values: [36, 36, 38, 42, 42, 45], actual: [35, 33, 37, 16, 0, 0] },
  { id: "store-smt033", parentId: "person-zhangsai", type: "STORE", name: "SMT033", values: [18, 18, 20, 22, 20, 22], actual: [17, 16, 19, 9, 0, 0] },
  { id: "store-shopee01", parentId: "person-zhangsai", type: "STORE", name: "Shopee台湾01店", values: [18, 18, 18, 20, 21.7, 23], actual: [18, 17, 18, 7, 0, 0] },
  { id: "person-huang", parentId: "bu", type: "PERSON", name: "黄爱纯", values: [24, 24, 26, 28, 30, 30], actual: [21, 22, 24, 9, 0, 0] },
  { id: "person-li", parentId: "bu", type: "PERSON", name: "李洋", values: [18, 18, 20, 20, 18, 20], actual: [16, 17, 19, 6, 0, 0] },
  { id: "person-other", parentId: "bu", type: "PERSON", name: "其他组员汇总", values: [22, 22, 26, 29.5, 30, 35], actual: [20, 21, 24, 6, 0, 0] }
];

function init() {
  ensureRuntimeStyles();
  ensureGenericModal();
  renderSidebar();
  renderMain();
  document.addEventListener("click", hideStorePopover);
}

function ensureRuntimeStyles() {
  if (document.getElementById("runtimeStyles")) return;
  const style = document.createElement("style");
  style.id = "runtimeStyles";
  style.textContent = `
    .module-nav-row { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:12px; }
    .module-switch { display:flex; align-items:center; gap:0; border-bottom:1px solid var(--color-border-secondary); flex:1; min-width:0; }
    .module-switch button { height:36px; padding:0 18px; color:var(--color-text-secondary); border-bottom:2px solid transparent; margin-bottom:-1px; }
    .module-switch button:hover { color:var(--color-primary-6); }
    .module-switch button.active { color:var(--color-primary-6); border-bottom-color:var(--color-primary-6); font-weight:var(--font-weight-medium); }
    .page-context { display:flex; align-items:center; gap:12px; color:var(--color-text-tertiary); font-size:var(--font-size-sm); margin-top:4px; }
    .metric-strip { display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:12px; padding:16px 24px 0; }
    .metric-card { border:1px solid var(--color-border-secondary); border-radius:var(--radius-lg); padding:12px 16px; background:#fff; }
    .metric-card .label { color:var(--color-text-tertiary); font-size:12px; }
    .metric-card .value { margin-top:6px; font-size:20px; font-weight:600; color:var(--color-text); }
    .metric-card .sub { margin-top:4px; color:var(--color-text-secondary); font-size:12px; }
    .table-tools { display:flex; align-items:center; gap:8px; padding:16px 24px 0; }
    .table-tools-right { margin-left:auto; display:flex; gap:8px; align-items:center; }
    .table-summary { color:var(--color-text-tertiary); font-size:12px; padding:8px 24px 0; }
    .checkbox-cell { width:36px; text-align:center; }
    .status-dot { display:inline-block; width:6px; height:6px; border-radius:50%; margin-right:6px; vertical-align:middle; }
    .status-dot.success { background:var(--color-success); }
    .status-dot.warning { background:var(--color-warning); }
    .action-link { color:var(--color-primary-6); padding:0 6px; font-size:13px; }
    .action-link.danger { color:var(--color-error); }
    .empty-state { padding:48px; text-align:center; color:var(--color-text-tertiary); }
    .filter-chip-row { display:flex; gap:8px; flex-wrap:wrap; padding:0 24px 12px; }
    .filter-chip { display:inline-flex; align-items:center; height:24px; padding:0 8px; border-radius:var(--radius-sm); background:var(--color-bg-spotlight); color:var(--color-text-secondary); font-size:12px; border:1px solid var(--color-border-secondary); }
    .store-summary { display:flex; align-items:center; gap:6px; flex-wrap:wrap; padding:10px 0 0; }
    .date-row { display:flex; gap:12px; align-items:center; }
    .radio-row { display:flex; gap:16px; align-items:center; margin-top:6px; }
    .radio-pill { display:inline-flex; align-items:center; gap:6px; font-size:13px; color:var(--color-text-secondary); }
    .radio-mark { width:14px; height:14px; border-radius:50%; border:1px solid var(--color-border); display:inline-flex; align-items:center; justify-content:center; }
    .radio-mark.checked { border-color:var(--color-primary-6); }
    .radio-mark.checked::after { content:""; width:6px; height:6px; border-radius:50%; background:var(--color-primary-6); }
    .drawer-header { height:56px; display:flex; align-items:center; justify-content:space-between; padding:0 24px; background:#fff; border-bottom:1px solid var(--color-border-secondary); }
    .drawer-header h3 { font-size:18px; font-weight:600; }
    .drawer-body { flex:1; overflow:auto; padding:20px 24px 92px; }
    .drawer-footer { position:absolute; left:0; right:0; bottom:0; display:flex; justify-content:flex-end; gap:12px; padding:16px 24px; background:#fff; border-top:1px solid var(--color-border-secondary); }
    .step-panel { background:#fff; border:1px solid var(--color-border-secondary); border-radius:var(--radius-lg); margin-bottom:16px; }
    .step-panel h4 { padding:14px 16px; border-bottom:1px solid var(--color-border-secondary); font-size:15px; }
    .step-panel .step-body { padding:16px; }
    .textarea-like { width:100%; min-height:84px; resize:vertical; border:1px solid var(--color-border); border-radius:var(--radius); padding:8px 12px; outline:none; }
    .textarea-like:focus { border-color:var(--color-primary-6); box-shadow:0 0 0 2px rgba(22,119,255,.1); }
    .target-toolbar { display:flex; align-items:center; gap:10px; padding:16px 24px; }
    .target-setup-strip { display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:12px; margin:16px 24px 0; }
    .target-setup-item { border:1px solid var(--color-border-secondary); border-radius:var(--radius-lg); padding:12px 14px; background:#fff; }
    .target-setup-item .title { color:var(--color-text); font-weight:600; font-size:13px; }
    .target-setup-item .desc { margin-top:4px; color:var(--color-text-tertiary); font-size:12px; line-height:1.6; }
    .target-table-wrap { overflow:auto; margin:0 24px 24px; border:1px solid var(--color-border-secondary); border-radius:var(--radius-lg); background:#fff; }
    .target-table { min-width:1180px; width:100%; border-collapse:collapse; font-size:13px; }
    .target-table th, .target-table td { border-bottom:1px solid var(--color-border-secondary); border-right:1px solid var(--color-border-secondary); padding:8px 10px; vertical-align:top; }
    .target-table th { background:var(--color-bg-spotlight); color:var(--color-text-secondary); font-weight:500; white-space:nowrap; }
    .target-table tr:hover td { background:#fafafa; }
    .node-name { display:flex; flex-direction:column; gap:4px; }
    .node-name .node-line { display:flex; align-items:center; gap:6px; }
    .target-tree-toggle { width:18px; height:18px; display:inline-flex; align-items:center; justify-content:center; border:0; border-radius:var(--radius-sm); color:var(--color-text-secondary); background:transparent; line-height:1; cursor:pointer; }
    .target-tree-toggle:hover { color:var(--color-primary-6); background:var(--color-primary-1); }
    .target-tree-toggle.placeholder { cursor:default; visibility:hidden; }
    .target-summary-detail { margin-top:6px; color:var(--color-text-tertiary); font-size:12px; line-height:1.6; }
    .node-type { width:max-content; padding:1px 6px; border-radius:3px; background:var(--color-primary-1); color:var(--color-primary-6); font-size:11px; }
    .month-cell.locked .target-value { color:var(--color-text-tertiary); font-weight:600; }
    .month-cell.future .target-value { color:var(--color-primary-6); font-weight:600; }
    .target-value-row { display:flex; align-items:center; gap:6px; min-height:24px; }
    .target-edit-btn { height:22px; padding:0 6px; border:1px solid transparent; border-radius:var(--radius-sm); color:var(--color-primary-6); background:transparent; font-size:12px; opacity:.58; transition:all var(--motion); }
    .month-cell.future:hover .target-edit-btn, .month-cell.editing .target-edit-btn { opacity:1; background:var(--color-primary-1); border-color:var(--color-primary-3); }
    .target-dirty { display:inline-flex; align-items:center; height:20px; margin-top:6px; padding:0 6px; border-radius:var(--radius-sm); color:#ad6800; background:var(--color-warning-bg); border:1px solid var(--color-warning-border); font-size:12px; }
    .month-cell .actual { margin-top:4px; color:var(--color-text-tertiary); font-size:12px; }
    .diff-bar { margin:6px -10px -8px; padding:2px 8px; background:var(--color-error); color:#fff; font-size:11px; }
    .target-edit-panel { min-width:170px; padding:8px; border:1px solid var(--color-primary-3); border-radius:var(--radius); background:#fff; box-shadow:var(--shadow-1); }
    .target-edit-meta { color:var(--color-text-tertiary); font-size:12px; margin-top:4px; }
    .target-edit-actions { display:flex; gap:6px; margin-top:8px; }
    .target-edit-actions .btn { height:24px; padding:0 8px; font-size:12px; }
    .inline-edit-input { width:132px; height:28px; border:1px solid var(--color-primary-6); border-radius:var(--radius-sm); padding:0 6px; }
    .audit-before { color:var(--color-text-tertiary); text-decoration:line-through; }
    .audit-after { color:var(--color-primary-6); font-weight:600; }
    .copy-btn { color:var(--color-primary-6); margin-left:4px; font-size:12px; }
    .disabled-hint { color:var(--color-text-tertiary); font-size:12px; margin-left:8px; }
    .primary-title-row { display:flex; align-items:center; gap:10px; }
    .section-heading { display:flex; align-items:center; gap:10px; padding:18px 24px 0; }
    .section-heading .mark { width:20px; height:20px; border-radius:50%; background:var(--color-primary-1); color:var(--color-primary-6); display:inline-flex; align-items:center; justify-content:center; font-size:12px; }
    .section-heading h3 { font-size:16px; font-weight:600; }
    .criteria-grid { display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:12px 16px; }
    .criteria-grid .form-input, .criteria-grid .form-select-trigger { width:100%; }
    .rule-card { border:1px solid var(--color-border-secondary); border-radius:var(--radius-lg); padding:14px 16px; margin-bottom:12px; background:#fff; }
    .rule-card.active { border-color:var(--color-primary-3); background:var(--color-primary-1); }
    .rule-title { display:flex; align-items:center; gap:8px; font-weight:600; margin-bottom:8px; }
    .rule-summary { margin-top:10px; padding:10px 12px; border-radius:var(--radius); background:var(--color-bg-spotlight); color:var(--color-text-secondary); font-size:13px; line-height:1.7; }
    .import-stage-row { display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); border:1px solid var(--color-border-secondary); border-radius:var(--radius-lg); overflow:hidden; background:#fff; margin-bottom:16px; }
    .import-stage { padding:12px 16px; border-right:1px solid var(--color-border-secondary); color:var(--color-text-secondary); font-weight:500; text-align:center; }
    .import-stage:last-child { border-right:0; }
    .import-stage.active { color:var(--color-primary-6); background:var(--color-primary-1); box-shadow:inset 0 -2px 0 var(--color-primary-6); }
    .import-drawer { max-width:none; }
    .import-drawer .drawer-body { background:var(--color-bg-layout); padding:22px 28px 96px; }
    .import-knowledge-block { border:1px solid var(--color-primary-3); border-radius:var(--radius-lg); background:linear-gradient(180deg,#edf6ff,#f7fbff); padding:12px; margin-bottom:16px; }
    .import-principles { display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:12px; }
    .principle-card { border:1px solid var(--color-primary-3); border-radius:var(--radius-lg); padding:16px 18px; background:#fff; min-height:108px; }
    .principle-card .icon { font-size:18px; margin-bottom:6px; }
    .principle-card strong { color:#1d39c4; font-size:15px; }
    .principle-card p { margin-top:6px; color:#2f54eb; font-size:13px; line-height:1.7; }
    .product-thinking { margin-top:12px; padding:12px 14px; border:1px solid var(--color-primary-3); border-radius:var(--radius); background:var(--color-primary-1); color:var(--color-primary-7); font-weight:500; }
    .import-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
    .import-card { border:1px solid var(--color-border-secondary); border-radius:var(--radius-lg); padding:20px 22px; background:#fff; box-shadow:var(--shadow-1); }
    .import-card h4 { margin-bottom:8px; font-size:16px; }
    .template-preview { border:1px solid var(--color-border-secondary); border-radius:var(--radius); overflow:hidden; margin-top:12px; font-size:12px; }
    .template-preview .preview-head { display:flex; justify-content:space-between; padding:8px 10px; background:var(--color-bg-spotlight); color:var(--color-text-secondary); }
    .template-preview table { width:100%; border-collapse:collapse; }
    .template-preview th, .template-preview td { border-top:1px solid var(--color-border-secondary); border-right:1px solid var(--color-border-secondary); padding:7px 8px; text-align:left; }
    .template-preview th { background:#eef6ff; color:var(--color-text); }
    .template-preview td.example { background:#fffbe6; }
    .field-list { display:flex; flex-wrap:wrap; gap:8px; margin-top:10px; }
    .field-chip { height:24px; padding:0 8px; display:inline-flex; align-items:center; border-radius:var(--radius-sm); background:var(--color-bg-spotlight); color:var(--color-text-secondary); font-size:12px; border:1px solid var(--color-border-secondary); }
    .upload-box { border:1px dashed var(--color-border); background:#fff; border-radius:var(--radius-lg); padding:26px; text-align:center; color:var(--color-text-secondary); }
    .upload-box .upload-icon { font-size:34px; color:var(--color-text-tertiary); margin-bottom:8px; }
    .upload-file { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-top:12px; padding:10px 12px; border:1px solid var(--color-border-secondary); border-radius:var(--radius); background:var(--color-bg-spotlight); }
    .mode-card { border:1px solid var(--color-border-secondary); border-radius:var(--radius); padding:12px; margin-bottom:10px; }
    .mode-card.active { border-color:var(--color-primary-3); background:var(--color-primary-1); }
    .validation-list { margin-top:10px; display:grid; gap:8px; }
    .validation-item { display:flex; justify-content:space-between; gap:12px; padding:8px 10px; border-radius:var(--radius); background:var(--color-bg-spotlight); font-size:13px; }
    .validation-item strong { color:var(--color-text); }
    .method-table { display:grid; gap:10px; margin-top:12px; }
    .method-row { display:grid; grid-template-columns:160px 1fr; gap:12px; align-items:center; padding:12px 14px; border-radius:var(--radius); background:var(--color-bg-spotlight); }
    .method-row strong { color:var(--color-text); }
    .error-report-card { border-color:var(--color-primary-3); background:linear-gradient(180deg,#f0fff4,#fff); }
    .timeline-list { display:grid; gap:12px; }
    .timeline-item { display:grid; grid-template-columns:34px 1fr; gap:10px; align-items:start; }
    .timeline-index { width:28px; height:28px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; background:var(--color-primary-6); color:#fff; font-weight:600; }
    .timeline-item h4 { margin:0 0 4px; font-size:14px; }
    .task-card { border:1px solid var(--color-border-secondary); border-radius:var(--radius-lg); padding:14px 16px; background:#fff; }
    .task-meta { display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:10px; margin-top:12px; }
    .task-meta div { padding:10px; border-radius:var(--radius); background:var(--color-bg-spotlight); }
    .result-table th.status-col { background:#e6fffb; }
    .result-table th.error-col { background:#fff1f0; }
  `;
  document.head.appendChild(style);
}

function ensureGenericModal() {
  if (document.getElementById("genericModal")) return;
  const wrap = document.createElement("div");
  wrap.className = "modal-mask";
  wrap.id = "genericModal";
  wrap.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h3 id="genericModalTitle">确认</h3>
        <button class="modal-close" onclick="closeModal('genericModal')">×</button>
      </div>
      <div class="modal-body" id="genericModalBody"></div>
      <div class="modal-footer" id="genericModalFooter"></div>
    </div>
  `;
  document.body.appendChild(wrap);
}

function renderSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = `
    <div class="sidebar-header">
      <div class="sidebar-logo">组</div>
      <div>
        <div class="sidebar-title">架构导航</div>
        <div class="sidebar-subtitle">业务单元 / 人员 / 店铺</div>
      </div>
    </div>
    <div class="sidebar-search">
      <span class="sicon">⌕</span>
      <input placeholder="定位业务单位..." />
    </div>
    <div class="tree-nav">
      ${orgRows.map(renderOrgRow).join("")}
    </div>
  `;
}

function renderOrgRow(row) {
  const expand = row.expanded ? "▾" : row.level < 3 ? "▸" : "";
  const active = row.id === state.selectedOrgId;
  return `
    <div class="tree-row ${active ? "active" : ""}" style="--tree-level:${row.level}" title="${escapeAttr(row.sub)}" onclick="selectOrg('${row.id}')">
      <span class="expand-icon">${expand}</span>
      <span class="node-label">${escapeHtml(row.label)}</span>
      <span class="node-badge">${row.count}</span>
    </div>
  `;
}

function currentOrg() {
  return orgRows.find(row => row.id === state.selectedOrgId) || orgRows.find(row => row.id === "smt-tools");
}

function selectOrg(orgId) {
  state.selectedOrgId = orgId;
  state.selectedPeople.clear();
  state.selectedOrders.clear();
  state.targetEditing = null;
  state.targetDirty.clear();
  renderSidebar();
  renderMain();
  scrollContentToTop();
  showToast(contextSwitchMessage(), "success");
}

function contextSwitchMessage() {
  const org = currentOrg();
  if (state.module === "targets") return `已加载 ${org.label} 的销售目标设置`;
  if (state.module === "unit") return `已切换到 ${org.label} 的业务单元配置`;
  return `已切换到 ${org.label} 的订单归属范围`;
}

function renderMain() {
  const org = currentOrg();
  const main = document.getElementById("mainContent");
  main.innerHTML = `
    <div class="top-bar">
      <div class="top-bar-left">
        <div>
          <div class="top-bar-breadcrumb">销售人员管理 / <span>${currentModuleTitle()}</span></div>
        </div>
      </div>
      <div class="top-bar-right">
      </div>
    </div>
    <div class="content-area">
      <div class="module-nav-row">
        <div class="module-switch" aria-label="销售人员管理模块切换">
          <button type="button" class="${state.module === "unit" ? "active" : ""}" onclick="setModule('unit')">业务单元配置</button>
          <button type="button" class="${state.module === "orders" ? "active" : ""}" onclick="setModule('orders')">订单归属处理</button>
          <button type="button" class="${state.module === "targets" ? "active" : ""}" onclick="setModule('targets')">销售目标</button>
        </div>
      </div>
      ${state.module === "unit" ? renderUnitPage() : state.module === "orders" ? renderOrdersPage() : renderTargetsPage()}
    </div>
  `;
}

function currentModuleTitle() {
  if (state.module === "orders") return "订单归属处理";
  if (state.module === "targets") return "销售目标制定";
  return "业务单元配置";
}

function setModule(moduleName) {
  state.module = moduleName;
  renderMain();
  scrollContentToTop();
}

function jumpToUnitConfig(orderId) {
  state.module = "unit";
  state.unitTab = "members";
  state.selectedOrders.clear();
  renderMain();
  scrollContentToTop();
  showToast(`${orderId ? `订单 ${orderId} ` : ""}已切换到业务单元配置，可维护人员与店铺归属`, "success");
}

function scrollContentToTop() {
  requestAnimationFrame(() => {
    const content = document.querySelector(".content-area");
    if (content) content.scrollTop = 0;
  });
}

function currentOrgPathForTable() {
  const org = currentOrg();
  if (org.level <= 1) return "四海芯舟 > 工业运营中心";
  if (org.level === 2) return `工业运营中心 > ${org.label}`;
  return `工业运营中心 > ${org.sub.split("-").slice(-2).join(" > ")}`;
}

function renderUnitPage() {
  const org = currentOrg();
  return `
    <section class="page-panel">
      <div class="page-panel-header">
        <div class="page-panel-title">
          <span style="font-size:22px; color:var(--color-primary-6);">●</span>
          <div>
            <div class="primary-title-row">
              <h2>${escapeHtml(org.label)}</h2>
              <span class="permission-badge">管理权限生效中</span>
            </div>
            <div class="page-context">业务单元配置：${escapeHtml(org.sub)}；维护人员、业务职能、店铺资源、目标与日志</div>
          </div>
        </div>
      </div>
      <div class="tab-bar">
        <button class="tab-item ${state.unitTab === "members" ? "active" : ""}" onclick="setUnitTab('members')">成员列表</button>
        <button class="tab-item ${state.unitTab === "logs" ? "active" : ""}" onclick="setUnitTab('logs')">操作日志</button>
      </div>
      ${state.unitTab === "members" ? renderMembersTab() : renderLogsTab()}
    </section>
  `;
}

function setUnitTab(tab) {
  state.unitTab = tab;
  renderMain();
}

function renderMembersTab() {
  const checkedCount = state.selectedPeople.size;
  const memberCount = Math.min(currentOrg().count, people.length);
  return `
    <div class="section-heading">
      <span class="mark">员</span>
      <h3>成员概览</h3>
    </div>
    <div class="table-tools">
      <button class="btn btn-default" ${checkedCount ? "" : "disabled"} onclick="openTransferModal()">批量转岗${checkedCount ? `（${checkedCount}）` : ""}</button>
      <button class="btn btn-danger" ${checkedCount ? "" : "disabled"} onclick="openRemoveModal()">批量移除${checkedCount ? `（${checkedCount}）` : ""}</button>
      ${checkedCount ? `<span class="disabled-hint">已选 ${checkedCount} 人，转岗会先校验名下店铺资产</span>` : `<span class="disabled-hint">勾选人员后可批量转岗或移除</span>`}
      <div class="table-tools-right">
        <button class="btn btn-primary" onclick="openPersonnelModal('add')">添加/编辑人员</button>
        ${renderFakeSelect("全部职能", ["全部职能", "负责人", "组员"])}
        <input class="form-input" placeholder="按姓名/工号搜索..." />
        <button class="btn btn-default" onclick="showToast('已按当前条件刷新成员列表', 'success')">查询</button>
      </div>
    </div>
    <div class="table-summary">展示当前业务单元下 ${memberCount} 名成员；店铺列支持悬浮查看平台分组明细。</div>
    <div class="page-panel-body">
      <div class="data-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th class="checkbox-cell"><span class="custom-checkbox ${allPeopleChecked() ? "checked" : ""}" onclick="toggleAllPeople(event)"></span></th>
              <th>姓名</th>
              <th>行政组织</th>
              <th>业务单元所属</th>
              <th>店铺</th>
              <th>业务职能</th>
              <th>生效日期</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            ${people.slice(0, memberCount).map(renderPersonRow).join("")}
          </tbody>
        </table>
      </div>
      ${renderPagination(memberCount)}
    </div>
  `;
}

function renderPersonRow(person) {
  const selected = state.selectedPeople.has(person.id);
  const org = currentOrg();
  return `
    <tr>
      <td class="checkbox-cell"><span class="custom-checkbox ${selected ? "checked" : ""}" onclick="togglePerson(event, '${person.id}')"></span></td>
      <td>
        <div style="font-weight:600;">${escapeHtml(person.name)}</div>
        <div class="text-secondary">${escapeHtml(person.employeeNo)} ${person.groupTag ? `<span class="tag tag-default">${escapeHtml(person.groupTag)}</span>` : ""}</div>
      </td>
      <td>${escapeHtml(currentOrgPathForTable())}</td>
      <td>${escapeHtml(org.label)}</td>
      <td>${renderStoreCell(person)}</td>
      <td>${person.function === "负责人" ? `<span class="tag tag-warning">负责人</span>` : `<span class="tag tag-primary">组员</span>`}</td>
      <td>${escapeHtml(person.activeFrom)}</td>
      <td>
        <div class="action-cell">
          <button class="action-link" onclick="jumpToPersonLog('${person.id}')">日志</button>
          <button class="action-link" onclick="openPersonnelModal('edit','${person.id}')">编辑</button>
          <button class="action-link" onclick="openTransferModal('${person.id}')">转岗</button>
          <button class="action-link danger" onclick="openRemoveModal('${person.id}')">移除</button>
        </div>
      </td>
    </tr>
  `;
}

function renderStoreCell(person) {
  const names = flattenStores(person);
  if (!names.length) return `<span class="tag tag-warning">待配置</span>`;
  const text = names.length > 2 ? `共 ${names.length} 个店铺` : names.join("、");
  return `<span class="store-trigger" onclick="showStorePopover(event, '${person.id}')">${escapeHtml(text)}</span>`;
}

function flattenStores(person) {
  return person.stores.flatMap(group => group.names);
}

function allPeopleChecked() {
  const visible = visiblePeople();
  return visible.length > 0 && visible.every(person => state.selectedPeople.has(person.id));
}

function toggleAllPeople(event) {
  event.stopPropagation();
  if (allPeopleChecked()) state.selectedPeople.clear();
  else visiblePeople().forEach(person => state.selectedPeople.add(person.id));
  renderMain();
}

function visiblePeople() {
  return people.slice(0, Math.min(currentOrg().count, people.length));
}

function togglePerson(event, id) {
  event.stopPropagation();
  if (state.selectedPeople.has(id)) state.selectedPeople.delete(id);
  else state.selectedPeople.add(id);
  renderMain();
}

function showStorePopover(event, personId) {
  event.stopPropagation();
  const person = people.find(item => item.id === personId);
  const popover = document.getElementById("storePopover");
  if (!person || !person.stores.length) return;
  popover.innerHTML = person.stores.map(group => `
    <div class="platform-group">
      <div class="platform-label">${escapeHtml(group.platform)}</div>
      <div class="store-list">${group.names.map(name => `<span class="store-tag">${escapeHtml(name)}</span>`).join("")}</div>
    </div>
  `).join("");
  const rect = event.currentTarget.getBoundingClientRect();
  popover.style.left = `${Math.min(rect.left, window.innerWidth - 380)}px`;
  popover.style.top = `${rect.bottom + 8}px`;
  popover.classList.add("visible");
}

function hideStorePopover() {
  const popover = document.getElementById("storePopover");
  if (popover) popover.classList.remove("visible");
}

function jumpToPersonLog(personId) {
  const person = people.find(item => item.id === personId);
  state.unitTab = "logs";
  renderMain();
  showToast(`已筛选 ${person ? person.name : "该人员"} 的操作日志`, "success");
}

function renderLogsTab() {
  return `
    <div class="filter-row">
      <div class="filter-item"><label>日志类型</label>${renderFakeSelect("全部类型", ["全部类型", "添加人员", "移除人员", "角色调整", "编辑人员配置", "归属重算"])}</div>
      <div class="filter-item"><label>操作人</label>${renderFakeSelect("全部操作人", ["全部操作人", "王耕", "沈浩楠"])}</div>
      <div class="filter-item"><label>操作对象</label><input class="form-input" placeholder="搜索被操作销售员/店铺" /></div>
      <div class="filter-item"><label>操作时间</label><input class="form-input" value="近 30 天" /></div>
      <button class="btn btn-primary" onclick="showToast('日志查询已刷新', 'success')">查询</button>
      <button class="btn btn-default" onclick="showToast('筛选条件已重置', 'success')">重置</button>
    </div>
    <div class="filter-chip-row">
      <span class="filter-chip">日志类型：全部</span>
      <span class="filter-chip">操作对象：销售员 / 店铺</span>
      <span class="filter-chip">时间：近 30 天</span>
    </div>
    <div class="page-panel-body">
      <table class="data-table">
        <thead>
          <tr><th>操作类型</th><th>操作人</th><th>操作对象</th><th>操作详情</th><th>操作时间</th></tr>
        </thead>
        <tbody>
          ${logs.map(row => `
            <tr>
              <td><span class="tag ${row.type === "移除人员" ? "tag-error" : row.type === "归属重算" ? "tag-primary" : "tag-default"}">${escapeHtml(row.type)}</span></td>
              <td>${escapeHtml(row.operator)}</td>
              <td>${escapeHtml(row.object)}</td>
              <td>${escapeHtml(row.detail)}</td>
              <td>${escapeHtml(row.time)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
      ${renderPagination(logs.length)}
    </div>
  `;
}

function renderOrdersPage() {
  return `
    <section class="page-panel">
      <div class="page-panel-header">
        <div class="page-panel-title">
          <span style="font-size:22px; color:var(--color-primary-6);">●</span>
          <div>
            <h2>订单归属处理</h2>
            <div class="page-context">处理未命中归属配置、历史归属错配与批量重算</div>
          </div>
        </div>
      </div>
      <div class="tab-bar">
        <button class="tab-item ${state.orderTab === "pending" ? "active" : ""}" onclick="setOrderTab('pending')">待归属订单</button>
        <button class="tab-item ${state.orderTab === "history" ? "active" : ""}" onclick="setOrderTab('history')">历史订单调整</button>
      </div>
      ${state.orderTab === "pending" ? renderPendingOrdersTab() : renderHistoryOrdersTab()}
    </section>
  `;
}

function setOrderTab(tab) {
  state.orderTab = tab;
  renderMain();
}

function renderPendingOrdersTab() {
  const selectedCount = state.selectedOrders.size;
  return `
    <div class="filter-row">
      <div class="filter-item"><label>订单号</label><input class="form-input" style="width:260px" placeholder="多个订单号用英文逗号分隔" onblur="normalizeOrderInput(this)" /></div>
      <div class="filter-item"><label>订单创建时间（北京）</label><input class="form-input" style="width:260px" value="2026-05-06 00:00:00 ~ 2026-05-13 23:59:59" /></div>
      <div class="filter-item"><label>出单店铺</label>${renderFakeSelect("全部店铺", ["全部店铺", "[AliExpress] SMT033", "[Shopee] Shopee台湾02店"])}</div>
      <div class="filter-item"><label>异常原因</label>${renderFakeSelect("全部原因", ["全部原因", "店铺未配置归属规则", "对应销售员已解绑或失效", "业务单元被停用"])}</div>
      <button class="btn btn-primary" onclick="showToast('已查询待归属订单', 'success')">查询</button>
      <button class="btn btn-default" onclick="showToast('查询条件已恢复为近 7 天', 'success')">重置</button>
    </div>
    <div class="table-tools">
      <button class="btn btn-primary" ${selectedCount ? "" : "disabled"} onclick="batchRetryOrders()">批量重新匹配${selectedCount ? `（${selectedCount}）` : ""}</button>
      <span class="disabled-hint">${selectedCount ? `已选 ${selectedCount} 单，重新匹配将按 ShopID + Order_CreateTime 查询当时负责人` : "勾选订单后可批量重新匹配"}</span>
    </div>
    <div class="page-panel-body">
      <table class="data-table">
        <thead>
          <tr>
            <th class="checkbox-cell"><span class="custom-checkbox ${allOrdersChecked() ? "checked" : ""}" onclick="toggleAllOrders(event)"></span></th>
            <th>订单号</th><th>订单创建时间（北京）</th><th>所属平台</th><th>出单店铺</th><th>异常原因</th><th>操作</th>
          </tr>
        </thead>
        <tbody>
          ${pendingOrders.map(order => `
            <tr>
              <td class="checkbox-cell"><span class="custom-checkbox ${state.selectedOrders.has(order.id) ? "checked" : ""}" onclick="toggleOrder(event, '${order.id}')"></span></td>
              <td>${escapeHtml(order.id)}<button class="copy-btn" onclick="copyOrderId('${order.id}')">复制</button></td>
              <td>${escapeHtml(order.time)}</td>
              <td>${escapeHtml(order.platform)}</td>
              <td><strong>${escapeHtml(order.store)}</strong></td>
              <td><span class="tag tag-error">${escapeHtml(order.reason)}</span></td>
              <td>
                <button class="action-link" onclick="jumpToUnitConfig('${order.id}')">去配置</button>
                <button class="action-link" onclick="retryOrder('${order.id}')">重新匹配</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
      ${pendingOrders.length ? renderPagination(pendingOrders.length) : `<div class="empty-state">当前时段内暂无待归属订单</div>`}
    </div>
  `;
}

function renderHistoryOrdersTab() {
  return `
    <div class="table-tools">
      <div>
        <strong>历史归属调整任务</strong>
        <span class="disabled-hint">用于批量修正已出单订单的销售员与业务单元归属</span>
      </div>
      <div class="table-tools-right">
        <button class="btn btn-primary" onclick="openAdjustmentDrawer()">新建调整任务</button>
      </div>
    </div>
    <div class="filter-row">
      <div class="filter-item"><label>修改时间</label><input class="form-input" style="width:240px" value="近 30 天" /></div>
      <div class="filter-item"><label>订单号</label><input class="form-input" style="width:240px" placeholder="支持换行/逗号批量粘贴" /></div>
      <div class="filter-item"><label>操作人</label>${renderFakeSelect("全部操作人", ["全部操作人", "王耕", "沈浩楠"])}</div>
      <button class="btn btn-primary" onclick="showToast('历史审计列表已刷新', 'success')">查询</button>
      <button class="btn btn-default" onclick="showToast('筛选条件已重置', 'success')">重置</button>
    </div>
    <div class="page-panel-body">
      <table class="data-table">
        <thead>
          <tr><th>订单号</th><th>出单店铺</th><th>下单时间</th><th>修改前归属</th><th>修改后归属</th><th>修改规则</th><th>操作人</th><th>修改时间</th></tr>
        </thead>
        <tbody>
          ${historyRows.map(row => `
            <tr>
              <td>${escapeHtml(row.orderId)}<button class="copy-btn" onclick="copyOrderId('${row.orderId}')">复制</button></td>
              <td>${escapeHtml(row.store)}</td>
              <td class="text-secondary">${escapeHtml(row.time)}</td>
              <td class="audit-before">${escapeHtml(row.before)}</td>
              <td class="audit-after">${escapeHtml(row.after)}</td>
              <td><span class="tag tag-primary">${escapeHtml(row.rule)}</span></td>
              <td>${escapeHtml(row.operator)}</td>
              <td>${escapeHtml(row.updateTime)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
      ${renderPagination(historyRows.length)}
    </div>
  `;
}

function allOrdersChecked() {
  return pendingOrders.length > 0 && state.selectedOrders.size === pendingOrders.length;
}

function toggleAllOrders(event) {
  event.stopPropagation();
  if (allOrdersChecked()) state.selectedOrders.clear();
  else pendingOrders.forEach(order => state.selectedOrders.add(order.id));
  renderMain();
}

function toggleOrder(event, id) {
  event.stopPropagation();
  if (state.selectedOrders.has(id)) state.selectedOrders.delete(id);
  else state.selectedOrders.add(id);
  renderMain();
}

function normalizeOrderInput(input) {
  input.value = input.value.replace(/[\s，]+/g, ",").replace(/,+/g, ",").replace(/^,|,$/g, "");
}

function copyOrderId(id) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(id).then(() => showToast("复制成功", "success"));
  } else {
    showToast("复制成功", "success");
  }
}

function retryOrder(id) {
  showToast(`${id} 已重新匹配，若命中规则将从待归属列表移除`, "success");
}

function batchRetryOrders() {
  showToast(`已提交 ${state.selectedOrders.size} 单批量重新匹配`, "success");
}

function renderTargetsPage() {
  const allRows = currentTargetRows();
  const rows = visibleTargetRows(allRows);
  const buRow = allRows.find(row => row.type === "BU") || allRows[0];
  const total = buRow.values.reduce((sum, value) => sum + value, 0) * 10000;
  const actual = buRow.actual.reduce((sum, value) => sum + value, 0) * 10000;
  const hardIssues = targetHardIssues(allRows);
  const completionRate = total ? Math.round(actual / total * 1000) / 10 : 0;
  const org = currentOrg();
  return `
    <section class="page-panel">
      <div class="page-panel-header">
        <div class="page-panel-title">
          <span style="font-size:22px; color:var(--color-primary-6);">●</span>
          <div>
            <h2>销售目标制定</h2>
            <div class="page-context">当前范围：${escapeHtml(org.sub)}；按业务单元、销售员、店铺拆解年度目标</div>
          </div>
        </div>
      </div>
      <div class="metric-strip">
        <div class="metric-card"><div class="label">本年总目标</div><div class="value">${formatMoney(total)}</div><div class="sub">${renderTargetStatusTag(buRow)}</div></div>
        <div class="metric-card"><div class="label">累计实际业绩</div><div class="value">${formatMoney(actual)}</div><div class="sub">统计至 2026-05-13</div></div>
        <div class="metric-card"><div class="label">年度达成率</div><div class="value">${completionRate}%</div><div class="sub"><span style="display:inline-block;width:120px;height:6px;border-radius:6px;background:#f0f0f0;"><span style="display:block;width:${Math.min(100, completionRate)}%;height:6px;border-radius:6px;background:var(--color-warning);"></span></span></div></div>
        <div class="metric-card"><div class="label">强校验异常</div><div class="value">${hardIssues.length}</div><div class="sub">${hardIssues.length ? "需先处理超额或店铺拆解差额" : "可保存，仍需确认待分配"}</div></div>
      </div>
      <div class="target-setup-strip">
        <div class="target-setup-item">
          <div class="title">先定业务单元年度盘子</div>
          <div class="desc">左侧切换业务单元后，当前表格会加载该业务单元的年度目标。BU 行用于总盘子，人员与店铺行用于拆解。</div>
        </div>
        <div class="target-setup-item">
          <div class="title">表格精修，导入批量覆盖</div>
          <div class="desc">少量调整直接点击未来月份“编辑”；大批量目标使用模板导入，导入前先预校验差额与必填字段。</div>
        </div>
        <div class="target-setup-item">
          <div class="title">强校验防止拆解不平</div>
          <div class="desc">人员目标之和不能超过业务单元目标；店铺目标需平齐所属人员，差额在汇总列集中暴露。</div>
        </div>
      </div>
      <div class="target-toolbar">
        <span class="form-select-trigger" style="min-width:120px;">2026 年 <span class="arrow">⌄</span></span>
        <span class="disabled-hint">未来月份需点击“编辑”后调整，失焦不会保存；已结账月份不可修改。</span>
        <div class="toolbar-spacer"></div>
        <button class="btn btn-default" onclick="openTargetImportDrawer('download')">下载模板</button>
        <button class="btn btn-default" onclick="openTargetImportDrawer('upload')">导入年度目标</button>
        <button class="btn btn-default" onclick="showToast('当前数据已开始导出', 'success')">导出当前数据</button>
        <button class="btn btn-primary" onclick="saveTargets()">保存目标配置</button>
      </div>
      <div class="target-table-wrap">
        <table class="target-table">
          <thead>
            <tr>
              <th style="width:220px;">组织 / 人员 / 店铺</th>
              ${["01月", "02月", "03月", "04月", "05月", "06月"].map(month => `<th>${month}</th>`).join("")}
              <th style="width:180px;">全年汇总</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map(renderTargetRow).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function openTargetImportDrawer(stage = "download") {
  const org = currentOrg();
  const drawer = document.getElementById("orderDrawer");
  const stageIndex = stage === "upload" ? 1 : stage === "result" ? 2 : 0;
  drawer.classList.add("import-drawer");
  drawer.innerHTML = `
    <div class="drawer-header">
      <h3>年度目标导入</h3>
      <button type="button" class="modal-close" onclick="closeOrderDrawer()">×</button>
    </div>
    <div class="drawer-body">
      <div class="import-stage-row">
        <button type="button" class="import-stage ${stage === "download" ? "active" : ""}" onclick="openTargetImportDrawer('download')">⬇ 阶段一：下载模板</button>
        <button type="button" class="import-stage ${stage === "upload" ? "active" : ""}" onclick="openTargetImportDrawer('upload')">⬆ 阶段二：上传文件</button>
        <button type="button" class="import-stage ${stage === "result" ? "active" : ""}" onclick="openTargetImportDrawer('result')">✓ 阶段三：结果反馈</button>
      </div>
      <div class="import-knowledge-block">
        <div class="import-principles">
          <div class="principle-card"><div class="icon">⚡</div><strong>效率 Efficiency</strong><p>一次处理大量目标，节省手工逐格维护时间。</p></div>
          <div class="principle-card"><div class="icon">🎯</div><strong>准确性 Accuracy</strong><p>模板结构、字段格式、业务关系分层校验。</p></div>
          <div class="principle-card"><div class="icon">☝</div><strong>易用性 Usability</strong><p>每一步告诉用户该做什么、为什么失败。</p></div>
          <div class="principle-card"><div class="icon">💬</div><strong>反馈 Feedback</strong><p>任务中心统一追踪，结果文件可下载复盘。</p></div>
        </div>
        <div class="product-thinking">${importProductThinking(stage)}</div>
      </div>
      ${stage === "download" ? renderTargetImportDownload(org) : stage === "upload" ? renderTargetImportUpload(org) : renderTargetImportResult(org)}
    </div>
    ${renderTargetImportFooter(stageIndex)}
  `;
  document.getElementById("orderDrawerMask").classList.add("visible");
  drawer.classList.add("visible");
}

function importProductThinking(stage) {
  if (stage === "upload") return "产品思考：上传阶段必须让用户知道当前进行到哪一步、系统会如何处理、完成后去哪里下载结果文件。";
  if (stage === "result") return "产品思考：上传后不在弹窗里等待，统一进入任务中心；结果文件保留原始行，并追加状态列，方便复盘修正。";
  return "产品思考：导入前先给用户足够明确的模板、规则和示例，降低上传后才发现错误的概率。";
}

function renderTargetImportDownload(org) {
  return `
    <div class="import-card">
      <div style="display:flex;justify-content:space-between;gap:16px;align-items:flex-start;">
        <div>
          <h4>年度目标批量导入模板</h4>
          <p class="text-secondary">当前范围：${escapeHtml(org.label)} / 2026 年。模板内置当前业务单元、成员、店铺清单和月份列。</p>
        </div>
        <button type="button" class="btn btn-primary" onclick="showToast('已下载年度目标导入模板 V1.3', 'success')">下载模板（V1.3）</button>
      </div>
      <div class="alert alert-warning" style="margin-top:14px;">
        使用提示：文件大小不超过 10MB，单次导入不超过 1000 行；请勿修改模板表头；模板中包含“使用说明”工作表；金额单位为元。
      </div>
      <div class="template-preview">
        <div class="preview-head"><strong>模板预览</strong><span>Sheet：年度目标数据</span></div>
        <table>
          <thead><tr><th>年度 *</th><th>业务单元编码 *</th><th>目标层级 *</th><th>人员工号</th><th>店铺编码</th><th>01月目标 *</th><th>02月目标 *</th><th>备注</th></tr></thead>
          <tbody>
            <tr><td class="example">2026</td><td class="example">BU-SMT-COMP</td><td class="example">店铺</td><td class="example">SMT-1024</td><td class="example">SMT033</td><td class="example">180000</td><td class="example">180000</td><td class="example">示例行，请勿删除表头</td></tr>
            <tr><td colspan="8" class="text-secondary">从第 3 行开始填写数据，带 * 为必填项；目标层级支持：业务单元 / 人员 / 店铺。</td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="import-grid" style="margin-top:16px;">
      <div class="import-card">
        <h4>Excel 数据校验方法</h4>
        <div class="method-table">
          <div class="method-row"><strong>下拉列表</strong><span>目标层级、人员、店铺从系统范围生成</span></div>
          <div class="method-row"><strong>数字限制</strong><span>月份目标必须为非负数字</span></div>
          <div class="method-row"><strong>模板保护</strong><span>锁定表头和示例行，降低误修改</span></div>
          <div class="method-row"><strong>版本识别</strong><span>模板版本号 V1.3 写入隐藏字段</span></div>
        </div>
      </div>
      <div class="import-card error-report-card">
        <h4>错误报告方案</h4>
        <div class="alert alert-info">默认采用方案二：单 Sheet + 状态列。导入结果下载文件在原始数据右侧增加“是否导入成功”和“错误原因”两列。</div>
        <div class="template-preview">
          <table class="result-table">
            <thead><tr><th>业务单元编码</th><th>对象</th><th>05月目标</th><th class="status-col">是否导入成功</th><th class="error-col">错误原因</th></tr></thead>
            <tbody><tr><td>BU-SMT-COMP</td><td>SMT033</td><td>200000</td><td>成功</td><td>-</td></tr><tr><td>BU-SMT-COMP</td><td>张赛</td><td>abc</td><td style="color:var(--color-error);">失败</td><td>金额格式错误</td></tr></tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderTargetImportUpload(org) {
  return `
    <div class="import-card">
      <h4>上传导入文件</h4>
      <div class="mode-card active">
        <label class="radio-pill"><span class="radio-mark checked"></span>新增模式（保留已有数据）</label>
        <div class="text-secondary" style="margin-top:6px;">遇到重复业务单元 / 人员 / 店铺 / 年月时跳过，并在结果文件中标记原因。</div>
      </div>
      <div class="mode-card">
        <label class="radio-pill"><span class="radio-mark"></span>覆盖模式（替换当前范围未来月份目标）</label>
        <div class="text-secondary" style="margin-top:6px;">仅覆盖未结账月份；已结账月份强制保护，不允许覆盖。</div>
      </div>
      <div class="upload-box">
        <div class="upload-icon">⇧</div>
        <strong>点击上传或拖拽文件到此区域</strong>
        <div style="margin-top:6px;font-size:12px;">支持 .xlsx、.xls、.csv，大小不超过 10MB</div>
      </div>
      <div class="upload-file">
        <div><strong>年度目标导入_深圳速卖通元器件组_2026.xlsx</strong><div class="text-secondary">已读取 268 行，预计导入 240 行，跳过 28 行</div></div>
        <span class="tag tag-success">文件已解析</span>
      </div>
    </div>
    <div class="import-card" style="margin-top:16px;">
      <h4>数据校验逻辑（三层结构）</h4>
      <div class="timeline-list">
        <div class="timeline-item"><span class="timeline-index" style="background:#f5222d;">1</span><div><h4>模板结构校验</h4><p class="text-secondary">检查表头、Sheet、模板版本是否匹配。不匹配立即中止，提示“请使用标准模板”。</p></div></div>
        <div class="timeline-item"><span class="timeline-index" style="background:#fa8c16;">2</span><div><h4>单行数据格式校验</h4><p class="text-secondary">逐行检查年度、编码、月份金额、数字格式、必填项和目标层级。</p></div></div>
        <div class="timeline-item"><span class="timeline-index">3</span><div><h4>业务逻辑校验</h4><p class="text-secondary">校验业务单元、人员、店铺是否存在；人员是否属于业务单元；店铺是否属于人员；人员合计与店铺合计是否平衡。</p></div></div>
      </div>
      <div class="validation-list">
        <div class="validation-item"><strong>模板结构</strong><span class="tag tag-success">通过</span></div>
        <div class="validation-item"><strong>单行格式</strong><span class="tag tag-warning">12 行需跳过</span></div>
        <div class="validation-item"><strong>业务逻辑</strong><span class="tag tag-error">3 处差额需处理</span></div>
        <div class="validation-item"><strong>任务中心</strong><span>点击“开始导入”后进入后台任务，可在任务中心下载结果文件</span></div>
      </div>
    </div>
  `;
}

function renderTargetImportResult(org) {
  return `
    <div class="task-card">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
        <div><h4 style="margin:0;">任务中心 / 年度目标导入任务</h4><div class="text-secondary">任务编号：IMP-TARGET-20260514-0008；范围：${escapeHtml(org.label)} / 2026 年</div></div>
        <span class="tag tag-warning">部分成功</span>
      </div>
      <div class="task-meta">
        <div><strong>268</strong><br><span class="text-secondary">总行数</span></div>
        <div><strong>240</strong><br><span class="text-secondary">成功</span></div>
        <div><strong>16</strong><br><span class="text-secondary">失败</span></div>
        <div><strong>12</strong><br><span class="text-secondary">跳过</span></div>
      </div>
      <div style="margin-top:14px;display:flex;gap:8px;">
        <button type="button" class="btn btn-primary" onclick="showToast('已从任务中心下载导入结果文件', 'success')">下载导入结果</button>
        <button type="button" class="btn btn-default" onclick="showToast('已打开任务中心筛选：年度目标导入', 'success')">查看任务中心</button>
      </div>
    </div>
    <div class="import-card" style="margin-top:16px;">
      <h4>结果文件预览（方案二：单 Sheet + 状态列）</h4>
      <table class="data-table result-table">
        <thead><tr><th>原始行号</th><th>业务单元编码</th><th>目标对象</th><th>05月目标</th><th class="status-col">是否导入成功</th><th class="error-col">错误原因</th></tr></thead>
        <tbody>
          <tr><td>12</td><td>BU-SMT-COMP</td><td>SMT033</td><td>200000</td><td><span class="tag tag-success">成功</span></td><td>-</td></tr>
          <tr><td>18</td><td>BU-SMT-COMP</td><td>张赛</td><td>abc</td><td><span class="tag tag-error">失败</span></td><td>金额格式错误，应为数字</td></tr>
          <tr><td>27</td><td>BU-SMT-COMP</td><td>04月目标</td><td>1250000</td><td><span class="tag tag-warning">跳过</span></td><td>04月已结账，不允许覆盖</td></tr>
        </tbody>
      </table>
    </div>
  `;
}

function renderTargetImportFooter(stageIndex) {
  if (stageIndex === 0) {
    return `
      <div class="drawer-footer">
        <button type="button" class="btn btn-default" onclick="closeOrderDrawer()">取消</button>
        <button type="button" class="btn btn-primary" onclick="openTargetImportDrawer('upload')">下一步：上传文件</button>
      </div>
    `;
  }
  if (stageIndex === 1) {
    return `
      <div class="drawer-footer">
        <button type="button" class="btn btn-default" onclick="openTargetImportDrawer('download')">上一步</button>
        <button type="button" class="btn btn-default" onclick="closeOrderDrawer()">取消</button>
        <button type="button" class="btn btn-primary" onclick="openTargetImportDrawer('result'); showToast('导入任务已创建，可在任务中心查看进度', 'success')">开始导入</button>
      </div>
    `;
  }
  return `
    <div class="drawer-footer">
      <button type="button" class="btn btn-default" onclick="openTargetImportDrawer('upload')">返回上传</button>
      <button type="button" class="btn btn-primary" onclick="closeOrderDrawer()">完成</button>
    </div>
  `;
}

function currentTargetRows() {
  const org = currentOrg();
  const factor = Math.max(0.35, Math.min(1.35, org.count / 7));
  const rows = targetRows.map((row, index) => ({
    ...row,
    name: index === 0 ? org.label : row.name,
    values: row.values.map(value => scaleTargetValue(value, factor)),
    actual: row.actual.map(value => scaleTargetValue(value, factor))
  }));
  return enrichTargetRows(rows);
}

function scaleTargetValue(value, factor) {
  if (!value) return 0;
  return Math.round(value * factor * 10) / 10;
}

function enrichTargetRows(rows) {
  return rows.map(row => {
    const children = rows.filter(child => child.parentId === row.id);
    const hasStoreTargets = children.some(child => child.type === "STORE" && child.values.some(value => value > 0));
    const shouldCheckChildren = row.type === "BU" || (row.type === "PERSON" && hasStoreTargets);
    const monthlyDiffs = shouldCheckChildren
      ? row.values.map((value, index) => value - children.reduce((sum, child) => sum + (child.values[index] || 0), 0))
      : row.values.map(() => 0);
    const annualDiff = monthlyDiffs.reduce((sum, value) => sum + value, 0) * 10000;
    return {
      ...row,
      hasChildren: children.length > 0,
      canExpand: children.length > 0,
      monthlyDiffs,
      annualDiff,
      hasStoreTargets
    };
  });
}

function visibleTargetRows(rows) {
  const byParent = rows.reduce((map, row) => {
    const key = row.parentId || "__root__";
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(row);
    return map;
  }, new Map());
  const result = [];
  const visit = parentId => {
    (byParent.get(parentId) || []).forEach(row => {
      result.push(row);
      if (row.canExpand && state.targetExpanded.has(row.id)) visit(row.id);
    });
  };
  visit("__root__");
  return result;
}

function targetHardIssues(rows) {
  return rows.filter(row => {
    if (row.type === "BU") return row.annualDiff < 0 || row.monthlyDiffs.some(value => value < 0);
    if (row.type === "PERSON") return row.hasStoreTargets && row.monthlyDiffs.some(value => Math.abs(value) > 0.0001);
    return false;
  });
}

function renderTargetStatusTag(row) {
  const diff = Math.round(Math.abs(row.annualDiff));
  if (row.type === "STORE") return `<span class="tag tag-default">店铺目标</span>`;
  if (row.type === "PERSON" && !row.hasStoreTargets) return `<span class="tag tag-default">未拆到店</span>`;
  if (Math.abs(row.annualDiff) < 1 && !row.monthlyDiffs.some(value => Math.abs(value) > 0.0001)) {
    return `<span class="tag tag-success">${row.type === "BU" ? "人员承接平齐" : "店铺拆解平齐"}</span>`;
  }
  if (row.type === "BU" && row.annualDiff > 0) {
    return `<span class="tag tag-warning">待分配 ${formatMoney(diff)}</span>`;
  }
  if (row.type === "BU" && row.annualDiff < 0) {
    return `<span class="tag tag-error">人员超额 ${formatMoney(diff)}</span>`;
  }
  return `<span class="tag tag-error">店铺差额 ${formatMoney(diff)}</span>`;
}

function renderTargetDiffDetails(row) {
  if (row.type === "STORE" || (row.type === "PERSON" && !row.hasStoreTargets)) return "";
  const details = row.monthlyDiffs
    .map((value, index) => ({ value, month: `${String(index + 1).padStart(2, "0")}月` }))
    .filter(item => Math.abs(item.value) > 0.0001)
    .slice(0, 3)
    .map(item => {
      const prefix = row.type === "BU" && item.value > 0 ? "待分配" : row.type === "BU" ? "超额" : "差额";
      return `${item.month}${prefix}：${formatMoney(Math.abs(item.value) * 10000)}`;
    });
  if (!details.length) return "";
  return `<div class="target-summary-detail">${details.join("<br>")}</div>`;
}

function renderTargetRow(row) {
  const indent = row.type === "STORE" ? 28 : row.type === "PERSON" ? 14 : 0;
  const total = row.values.reduce((sum, value) => sum + value, 0) * 10000;
  const actual = row.actual.reduce((sum, value) => sum + value, 0) * 10000;
  const expanded = state.targetExpanded.has(row.id);
  const toggle = row.canExpand
    ? `<button type="button" class="target-tree-toggle" onclick="toggleTargetRow('${row.id}')">${expanded ? "▾" : "▸"}</button>`
    : `<span class="target-tree-toggle placeholder">·</span>`;
  return `
    <tr>
      <td>
        <div class="node-name" style="padding-left:${indent}px">
          <div class="node-line">${toggle}<strong>${escapeHtml(row.name)}</strong></div>
          <span class="node-type">${row.type}</span>
        </div>
      </td>
      ${row.values.map((value, index) => renderTargetCell(row, value, index)).join("")}
      <td>
        <strong>${formatMoney(total)}</strong>
        <div class="text-secondary">实：${formatMoney(actual)} / ${Math.round(actual / total * 100)}%</div>
        <div style="margin-top:6px;">${renderTargetStatusTag(row)}</div>
        ${renderTargetDiffDetails(row)}
      </td>
    </tr>
  `;
}

function renderTargetCell(row, value, index) {
  const locked = index < 3;
  const cellId = `${row.id}-${index}`;
  const actual = row.actual[index] || 0;
  if (state.targetEditing === cellId) {
    return `
      <td class="month-cell future editing">
        <div class="target-edit-panel">
          <input id="target-input-${cellId}" class="inline-edit-input" value="${value * 10000}" onkeydown="targetInputKey(event, '${cellId}')" autofocus />
          <div class="target-edit-meta">原值：${formatMoney(value * 10000)}</div>
          <div class="target-edit-actions">
            <button class="btn btn-primary" onclick="confirmTargetEdit('${cellId}')">暂存</button>
            <button class="btn btn-default" onclick="cancelTargetEdit()">取消</button>
          </div>
        </div>
        <div class="actual">实：${actual}万</div>
      </td>
    `;
  }
  return `
    <td class="month-cell ${locked ? "locked" : "future"}">
      <div class="target-value-row">
        <div class="target-value">${formatMoney(value * 10000)}</div>
        ${locked ? "" : `<button class="target-edit-btn" onclick="startTargetEdit('${cellId}')">编辑</button>`}
      </div>
      <div class="actual">实：${actual}万 / ${value ? Math.round(actual / value * 100) : 0}%</div>
      ${state.targetDirty.has(cellId) ? `<span class="target-dirty">已暂存</span>` : ""}
    </td>
  `;
}

function toggleTargetRow(rowId) {
  if (state.targetExpanded.has(rowId)) state.targetExpanded.delete(rowId);
  else state.targetExpanded.add(rowId);
  renderMain();
}

function startTargetEdit(cellId) {
  state.targetEditing = cellId;
  renderMain();
  setTimeout(() => {
    const input = document.querySelector(".inline-edit-input");
    if (input) input.focus();
  }, 0);
}

function targetInputKey(event, cellId) {
  if (event.key === "Enter") confirmTargetEdit(cellId);
  if (event.key === "Escape") cancelTargetEdit();
}

function confirmTargetEdit(cellId) {
  const input = document.getElementById(`target-input-${cellId}`);
  finishTargetEdit(cellId, input ? input.value : "");
}

function finishTargetEdit(cellId, value) {
  const [rowId, indexText] = cellId.split(/-(?=\d+$)/);
  const row = targetRows.find(item => item.id === rowId);
  const index = Number(indexText);
  if (row && Number.isFinite(index)) {
    const next = Math.max(0, Math.round(Number(value || 0) / 10000));
    row.values[index] = next;
    state.targetDirty.add(cellId);
  }
  state.targetEditing = null;
  renderMain();
  showToast("目标已暂存，点击“保存目标配置”后才会提交", "success");
}

function cancelTargetEdit() {
  state.targetEditing = null;
  renderMain();
}

function saveTargets() {
  const dirtyCount = state.targetDirty.size;
  const rows = currentTargetRows();
  const hardIssues = targetHardIssues(rows);
  if (hardIssues.length) {
    const first = hardIssues[0];
    const firstMonth = first.monthlyDiffs.findIndex(value => first.type === "BU" ? value < 0 : Math.abs(value) > 0.0001);
    const monthText = firstMonth >= 0 ? `${String(firstMonth + 1).padStart(2, "0")}月` : "全年";
    const reason = first.type === "BU"
      ? `${first.name} ${monthText} 人员目标超过业务单元总目标 ${formatMoney(Math.abs(first.monthlyDiffs[firstMonth] || first.annualDiff / 10000) * 10000)}`
      : `${first.name} ${monthText} 店铺目标未与人员目标平齐，差额 ${formatMoney(Math.abs(first.monthlyDiffs[firstMonth] || first.annualDiff / 10000) * 10000)}`;
    openGenericModal(
      "保存目标配置确认",
      `<div class="alert alert-warning">${escapeHtml(reason)}</div>
       <p style="margin-top:12px;">请先在汇总列定位差额月份，展开对应人员或店铺后调整目标。人员超出 BU、人员与店铺不平齐均属于强校验，不能保存。</p>`,
      [
        { text: "返回调整", cls: "btn btn-default", action: "closeModal('genericModal')" }
      ]
    );
    return;
  }
  const buRow = rows.find(row => row.type === "BU");
  if (buRow && buRow.annualDiff > 0) {
    openGenericModal(
      "保存目标配置确认",
      `<div class="alert alert-warning">当前有 ${dirtyCount} 个目标变更已暂存。业务单元总目标仍有 ${formatMoney(buRow.annualDiff)} 未分配给人员。</div>
       <p style="margin-top:12px;">待分配属于弱提示，可继续保存；后续仍可回到本页继续分解到人员或店铺。</p>`,
      [
        { text: "返回调整", cls: "btn btn-default", action: "closeModal('genericModal')" },
        { text: "确认保存", cls: "btn btn-primary", action: "closeModal('genericModal'); showToast('目标配置已保存', 'success')" }
      ]
    );
    return;
  }
  openGenericModal(
    "保存目标配置确认",
    `<div class="alert alert-success">当前有 ${dirtyCount} 个目标变更已暂存，业务单元、人员、店铺拆解均已通过校验。</div>`,
    [
      { text: "返回调整", cls: "btn btn-default", action: "closeModal('genericModal')" },
      { text: "确认保存", cls: "btn btn-primary", action: "closeModal('genericModal'); showToast('目标配置已保存', 'success')" }
    ]
  );
}

function openPersonnelModal(mode, personId) {
  state.personnelMode = mode || "add";
  state.editingPersonId = personId || null;
  if (mode === "edit") {
    state.storeSelection = new Set(["smt033", "shopee-tw-01", "shopee-tw-02"]);
  } else {
    state.storeSelection = new Set(["shopee-tw-02"]);
  }
  document.getElementById("personnelModalTitle").textContent = mode === "edit" ? "编辑人员配置" : "添加人员配置";
  renderPersonnelModalBody();
  openModal("personnelModal");
}

function renderPersonnelModalBody() {
  const person = people.find(item => item.id === state.editingPersonId) || people[1];
  const body = document.getElementById("personnelModalBody");
  const selectedStores = selectedLeafRows();
  body.innerHTML = `
    <div class="form-group">
      <label class="form-label">销售员 <span class="required">*</span></label>
      <input class="form-input form-input-block" value="${state.personnelMode === "edit" ? escapeAttr(person.name) : ""}" placeholder="远程搜索销售员" ${state.personnelMode === "edit" ? "disabled" : ""} />
    </div>
    <div class="form-group">
      <label class="form-label">业务职能 <span class="required">*</span></label>
      <div class="radio-row">
        <span class="radio-pill"><span class="radio-mark ${person.function === "负责人" ? "checked" : ""}"></span>负责人</span>
        <span class="radio-pill"><span class="radio-mark ${person.function !== "负责人" ? "checked" : ""}"></span>组员</span>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">平台（仅作筛选）</label>
      <div style="display:flex; gap:8px;">${["AliExpress", "Shopee", "Amazon", "Temu"].map(item => `<span class="tag tag-primary">${item}</span>`).join("")}</div>
    </div>
    <div class="form-group">
      <label class="form-label">店铺资源池 <span class="required">*</span></label>
      <input class="store-search-input" placeholder="搜索店铺名称..." />
      <div style="max-height:310px; overflow:auto; border:1px solid var(--color-border-secondary); border-radius:var(--radius); margin-top:10px;">
        <table class="tree-table">
          <thead><tr><th style="width:44px;"></th><th>店铺名称 / 层级</th><th>所属平台</th><th>当前归属状态</th></tr></thead>
          <tbody>${storeTree.map(renderStoreNode).join("")}</tbody>
        </table>
      </div>
      <div class="store-summary">
        <span class="tag tag-primary">已选 ${selectedStores.length} 个店铺</span>
        ${selectedStores.slice(0, 5).map(row => `<span class="tag tag-default">${escapeHtml(row.label)}</span>`).join("")}
        ${selectedStores.length > 5 ? `<span class="tag tag-default">另 ${selectedStores.length - 5} 个</span>` : ""}
      </div>
    </div>
    <div class="form-group date-row">
      <div style="flex:1;">
        <label class="form-label">生效日期</label>
        <input class="form-input form-input-block" value="2026-05-13" />
      </div>
      <label class="radio-pill" style="margin-top:24px;"><span class="custom-checkbox checked"></span>长期有效</label>
    </div>
  `;
}

function renderStoreNode(node) {
  const checkState = getNodeCheckState(node);
  const isLeaf = !node.children || !node.children.length;
  const status = renderStoreStatus(node);
  const rowClass = isLeaf && node.ownerType === "other" && state.storeSelection.has(node.key) ? "row-other-store" : "";
  const children = node.children ? node.children.map(renderStoreNode).join("") : "";
  return `
    <tr class="${rowClass}">
      <td><span class="custom-checkbox ${checkState}" onclick="toggleStoreNode(event, '${node.key}')"></span></td>
      <td>
        <span style="display:inline-block; width:${node.level * 22}px"></span>
        <span class="tree-toggle">${isLeaf ? "" : "▾"}</span>
        ${escapeHtml(node.label)}
      </td>
      <td>${escapeHtml(node.platform)}</td>
      <td>${status}</td>
    </tr>
    ${children}
  `;
}

function renderStoreStatus(node) {
  if (node.children) return `<span class="text-secondary">-</span>`;
  if (node.ownerType === "self") return `<span class="store-status-green">当前负责</span>`;
  if (node.ownerType === "other") return `<span class="store-status-orange">已归属：${escapeHtml(node.owner)}</span>`;
  return `<span class="text-secondary">未归属</span>`;
}

function getNodeCheckState(node) {
  const leaves = leafKeys(node);
  const selected = leaves.filter(key => state.storeSelection.has(key)).length;
  if (!selected) return "";
  if (selected === leaves.length) return "checked";
  return "indeterminate";
}

function leafKeys(node) {
  if (!node.children || !node.children.length) return [node.key];
  return node.children.flatMap(leafKeys);
}

function findStoreNode(nodes, key) {
  for (const node of nodes) {
    if (node.key === key) return node;
    if (node.children) {
      const found = findStoreNode(node.children, key);
      if (found) return found;
    }
  }
  return null;
}

function flattenStoreNodes(nodes) {
  return nodes.flatMap(node => node.children ? flattenStoreNodes(node.children) : [node]);
}

function selectedLeafRows() {
  return flattenStoreNodes(storeTree).filter(node => state.storeSelection.has(node.key));
}

function toggleStoreNode(event, key) {
  event.stopPropagation();
  const node = findStoreNode(storeTree, key);
  if (!node) return;
  const leaves = leafKeys(node);
  const allSelected = leaves.every(leaf => state.storeSelection.has(leaf));
  leaves.forEach(leaf => {
    if (allSelected) state.storeSelection.delete(leaf);
    else state.storeSelection.add(leaf);
  });
  renderPersonnelModalBody();
}

function savePersonnel() {
  const conflicts = selectedLeafRows().filter(row => row.ownerType === "other");
  if (conflicts.length) {
    document.getElementById("attributionConfirmBody").innerHTML = `
      <div class="alert alert-warning">您本次勾选的店铺中，有 ${conflicts.length} 个店铺当前由他人负责。</div>
      <div style="margin-top:12px;">
        ${conflicts.map(row => `<p>${escapeHtml(row.label)}（原属：${escapeHtml(row.owner)}）</p>`).join("")}
      </div>
      <p style="margin-top:12px;">继续保存后，系统将把这些店铺直接转移给当前销售员，并为原负责人和新负责人写入双向操作日志。是否确认？</p>
    `;
    openModal("attributionConfirmModal");
    return;
  }
  closeModal("personnelModal");
  showToast("人员配置已保存", "success");
}

function confirmAttributionTransfer() {
  closeModal("attributionConfirmModal");
  closeModal("personnelModal");
  showToast("已确认归属转移并保存，相关日志已生成", "success");
}

function openTransferModal(personId) {
  const ids = personId ? [personId] : Array.from(state.selectedPeople);
  const selected = ids.map(id => people.find(person => person.id === id)).filter(Boolean);
  const count = selected.length || 1;
  const storeCount = selected.reduce((sum, person) => sum + flattenStores(person).length, 0);
  document.getElementById("transferModalBody").innerHTML = `
    <div class="form-group">
      <label class="form-label">目标业务单元 <span class="required">*</span></label>
      <div class="form-select-trigger" style="width:100%;">四海芯舟 / 工业运营中心 / 东南亚项目部 / 深圳东南亚本土组 <span class="arrow">⌄</span></div>
    </div>
    <div class="alert alert-warning">
      当前选中人员 ${count} 人，共负责 ${storeCount} 个店铺。选择“携店铺转岗”将同步变更这些店铺的业务单元归属；选择“仅人员转岗”将释放这些店铺，请及时重新分配。
    </div>
    <div style="margin-top:12px;">
      ${selected.map(person => `<span class="tag tag-default" style="margin-right:6px;">${escapeHtml(person.name)}</span>`).join("") || `<span class="tag tag-default">张赛</span>`}
    </div>
  `;
  openModal("transferModal");
}

function confirmTransfer(type) {
  closeModal("transferModal");
  const text = type === "store" ? "已提交携店铺转岗，店铺归属将同步迁移" : "已提交仅人员转岗，原店铺将释放至待归属池";
  showToast(text, type === "store" ? "success" : "warning");
  state.selectedPeople.clear();
  renderMain();
}

function openRemoveModal(personId) {
  const ids = personId ? [personId] : Array.from(state.selectedPeople);
  const selected = ids.map(id => people.find(person => person.id === id)).filter(Boolean);
  const count = selected.length || 1;
  const storeCount = selected.reduce((sum, person) => sum + flattenStores(person).length, 0);
  document.getElementById("removeModalBody").innerHTML = storeCount
    ? `<div class="alert alert-error">确定要解除 ${count} 名人员与当前业务单元的关联吗？注意：这些人员名下还有 ${storeCount} 个负责的店铺。解除关联后，这些店铺将失去负责人并进入“待归属订单池”，请谨慎操作。</div>`
    : `<div class="alert alert-info">确定要解除 ${selected[0] ? escapeHtml(selected[0].name) : "该人员"} 与当前业务单元的关联吗？</div>`;
  openModal("removeModal");
}

function confirmRemove() {
  closeModal("removeModal");
  showToast("解除绑定已提交，系统将记录操作日志", "warning");
  state.selectedPeople.clear();
  renderMain();
}

function openAdjustmentDrawer() {
  const drawer = document.getElementById("orderDrawer");
  drawer.classList.remove("import-drawer");
  drawer.innerHTML = `
    <div class="drawer-header">
      <h3>新建历史订单调整任务</h3>
      <button class="modal-close" onclick="closeOrderDrawer()">×</button>
    </div>
    <div class="drawer-body">
      <div class="step-panel">
        <h4>Step 1：圈定修改范围</h4>
        <div class="step-body adjustment-scope-body">${renderAdjustmentScope()}</div>
      </div>
      <div class="step-panel">
        <h4>Step 2：明细加载与核对</h4>
        <div class="step-body">
          <div class="alert alert-info" style="margin-bottom:12px;">已成功加载 500 笔符合条件的订单，请抽检确认后在下方设定修改规则。</div>
          <table class="data-table">
            <thead><tr><th>订单号</th><th>出单时间</th><th>出单店铺</th><th>当前销售员</th><th>当前业务单元</th></tr></thead>
            <tbody>
              ${historyRows.map(row => `<tr><td>${escapeHtml(row.orderId)}</td><td>${escapeHtml(row.time)}</td><td>${escapeHtml(row.store)}</td><td>${escapeHtml(row.before.split(" / ")[0])}</td><td>${escapeHtml(row.before.split(" / ")[1] || "未归属")}</td></tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>
      <div class="step-panel">
        <h4>Step 3：修改规则</h4>
        <div class="step-body adjustment-rules-body">${renderAdjustmentRules()}</div>
      </div>
    </div>
    <div class="drawer-footer">
      <button type="button" class="btn btn-default" onclick="closeOrderDrawer()">取消</button>
      <button type="button" class="btn btn-danger" onclick="confirmHistoryAdjust()">确认修改</button>
    </div>
  `;
  document.getElementById("orderDrawerMask").classList.add("visible");
  drawer.classList.add("visible");
}

function renderAdjustmentScope() {
  const isOrderIds = state.adjustmentScopeMode === "orderIds";
  return `
    <div class="tab-bar" style="padding:0 0 12px;">
      <button type="button" class="tab-item ${isOrderIds ? "active" : ""}" onclick="setAdjustmentScopeMode('orderIds')">按订单号修改</button>
      <button type="button" class="tab-item ${isOrderIds ? "" : "active"}" onclick="setAdjustmentScopeMode('conditions')">按搜索条件修改</button>
    </div>
    ${isOrderIds ? `
      <textarea class="textarea-like" placeholder="粘贴订单号，支持逗号或换行分隔，单次最多 2000 单">AE202605060119
AE202605040771
SP202605030118</textarea>
      <div class="rule-summary">适合客服、财务指定一批明确订单号的修账场景；系统会按订单号精确圈定，不受当前筛选条件影响。</div>
    ` : `
      <div class="criteria-grid">
        <div class="form-group">
          <label class="form-label">下单时间 <span class="required">*</span></label>
          <input class="form-input" value="2026-05-01 00:00:00 ~ 2026-05-13 23:59:59" />
        </div>
        <div class="form-group">
          <label class="form-label">所属店铺</label>
          <span class="form-select-trigger">选择店铺（可多选） <span class="arrow">⌄</span></span>
        </div>
        <div class="form-group">
          <label class="form-label">原运营</label>
          <span class="form-select-trigger">远程搜索人员 <span class="arrow">⌄</span></span>
        </div>
        <div class="form-group">
          <label class="form-label">原业务单元</label>
          <span class="form-select-trigger">选择业务单元树 <span class="arrow">⌄</span></span>
        </div>
        <div class="form-group">
          <label class="form-label">所属平台</label>
          <span class="form-select-trigger">全部平台 <span class="arrow">⌄</span></span>
        </div>
        <div class="form-group">
          <label class="form-label">最大影响量</label>
          <input class="form-input" value="500" />
        </div>
      </div>
      <div class="alert alert-warning">按搜索条件修改适合批量洗数据。下单时间必填且跨度不超过 3 个月；加载后必须先核对明细，再允许确认修改。</div>
    `}
    <div style="margin-top:12px;">
      <button type="button" class="btn btn-primary" onclick="showToast('已加载 500 笔相关订单明细', 'success')">加载相关订单明细</button>
    </div>
  `;
}

function renderAdjustmentRules() {
  const salesSpecified = state.adjustmentSalesMode === "specified";
  const unitSpecified = state.adjustmentUnitMode === "specified";
  const salesText = salesSpecified ? "强制指定为：张赛（SMT-1024）" : "按订单 ShopID + Order_CreateTime 反查当时生效销售员";
  const unitText = unitSpecified ? `强制指定为：${currentOrg().label}` : "按订单 ShopID + Order_CreateTime 反查当时生效业务单元";
  return `
    <div class="rule-card ${salesSpecified ? "" : "active"}">
      <div class="rule-title">运营（销售员）</div>
      <div class="radio-row">
        <button type="button" class="radio-pill" onclick="setAdjustmentRule('sales','rule')"><span class="radio-mark ${salesSpecified ? "" : "checked"}"></span>按当前规则匹配</button>
        <button type="button" class="radio-pill" onclick="setAdjustmentRule('sales','specified')"><span class="radio-mark ${salesSpecified ? "checked" : ""}"></span>指定运营</button>
        <span class="form-select-trigger" style="${salesSpecified ? "" : "opacity:.45;"}">张赛 / SMT-1024 <span class="arrow">⌄</span></span>
      </div>
      <div class="rule-summary">${salesText}</div>
    </div>
    <div class="rule-card ${unitSpecified ? "" : "active"}">
      <div class="rule-title">业务单元</div>
      <div class="radio-row">
        <button type="button" class="radio-pill" onclick="setAdjustmentRule('unit','rule')"><span class="radio-mark ${unitSpecified ? "" : "checked"}"></span>按当前规则匹配</button>
        <button type="button" class="radio-pill" onclick="setAdjustmentRule('unit','specified')"><span class="radio-mark ${unitSpecified ? "checked" : ""}"></span>指定业务单元</button>
        <span class="form-select-trigger" style="${unitSpecified ? "" : "opacity:.45;"}">${escapeHtml(currentOrg().label)} <span class="arrow">⌄</span></span>
      </div>
      <div class="rule-summary">${unitText}</div>
    </div>
    <div class="alert alert-warning">
      执行后将覆盖已圈定订单的归属字段，并写入历史修改审计明细。若同时指定运营和业务单元，系统不再按店铺归属规则反查，请确认这是一次人工修账动作。
    </div>
  `;
}

function setAdjustmentScopeMode(mode) {
  state.adjustmentScopeMode = mode;
  refreshAdjustmentSection(".adjustment-scope-body", renderAdjustmentScope());
}

function setAdjustmentRule(type, mode) {
  if (type === "sales") state.adjustmentSalesMode = mode;
  if (type === "unit") state.adjustmentUnitMode = mode;
  refreshAdjustmentSection(".adjustment-rules-body", renderAdjustmentRules());
}

function refreshAdjustmentSection(selector, html) {
  const drawerBody = document.querySelector("#orderDrawer .drawer-body");
  const section = document.querySelector(selector);
  if (!drawerBody || !section) {
    openAdjustmentDrawer();
    return;
  }
  const scrollTop = drawerBody.scrollTop;
  section.innerHTML = html;
  requestAnimationFrame(() => {
    drawerBody.scrollTop = scrollTop;
  });
}

function confirmHistoryAdjust() {
  openGenericModal(
    "确认覆盖订单归属",
    `<div class="alert alert-error">确认将这 500 笔订单的归属数据按所设规则进行覆盖？此操作将永久记录审计日志。</div>`,
    [
      { text: "取消", cls: "btn btn-default", action: "closeModal('genericModal')" },
      { text: "确认覆盖并记录日志", cls: "btn btn-danger", action: "closeModal('genericModal'); closeOrderDrawer(); showToast('调整任务已提交并写入审计列表', 'success')" }
    ]
  );
}

function closeOrderDrawer() {
  document.getElementById("orderDrawerMask").classList.remove("visible");
  const drawer = document.getElementById("orderDrawer");
  drawer.classList.remove("visible");
  drawer.classList.remove("import-drawer");
}

function renderFakeSelect(label, options) {
  return `
    <span class="form-select">
      <span class="form-select-trigger">${escapeHtml(label)} <span class="arrow">⌄</span></span>
    </span>
  `;
}

function renderPagination(total) {
  return `
    <div class="pagination">
      <span class="text-secondary">共 ${total} 条</span>
      <button class="pagination-btn">‹</button>
      <button class="pagination-btn active">1</button>
      <button class="pagination-btn">2</button>
      <button class="pagination-btn">›</button>
      <span class="text-secondary">50 条/页</span>
    </div>
  `;
}

function openModal(id) {
  document.getElementById(id).classList.add("visible");
}

function closeModal(id) {
  document.getElementById(id).classList.remove("visible");
}

function openGenericModal(title, bodyHtml, buttons) {
  document.getElementById("genericModalTitle").textContent = title;
  document.getElementById("genericModalBody").innerHTML = bodyHtml;
  document.getElementById("genericModalFooter").innerHTML = buttons.map(button => `<button class="${button.cls}" onclick="${escapeAttr(button.action)}">${escapeHtml(button.text)}</button>`).join("");
  openModal("genericModal");
}

function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2600);
}

function formatMoney(value) {
  return `¥${Math.round(value).toLocaleString("zh-CN")}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}

window.setModule = setModule;
window.setUnitTab = setUnitTab;
window.setOrderTab = setOrderTab;
window.toggleAllPeople = toggleAllPeople;
window.togglePerson = togglePerson;
window.showStorePopover = showStorePopover;
window.jumpToPersonLog = jumpToPersonLog;
window.openPersonnelModal = openPersonnelModal;
window.toggleStoreNode = toggleStoreNode;
window.savePersonnel = savePersonnel;
window.confirmAttributionTransfer = confirmAttributionTransfer;
window.openTransferModal = openTransferModal;
window.confirmTransfer = confirmTransfer;
window.openRemoveModal = openRemoveModal;
window.confirmRemove = confirmRemove;
window.toggleAllOrders = toggleAllOrders;
window.toggleOrder = toggleOrder;
window.normalizeOrderInput = normalizeOrderInput;
window.copyOrderId = copyOrderId;
window.retryOrder = retryOrder;
window.batchRetryOrders = batchRetryOrders;
window.jumpToUnitConfig = jumpToUnitConfig;
window.openAdjustmentDrawer = openAdjustmentDrawer;
window.openTargetImportDrawer = openTargetImportDrawer;
window.setAdjustmentScopeMode = setAdjustmentScopeMode;
window.setAdjustmentRule = setAdjustmentRule;
window.confirmHistoryAdjust = confirmHistoryAdjust;
window.closeOrderDrawer = closeOrderDrawer;
window.selectOrg = selectOrg;
window.startTargetEdit = startTargetEdit;
window.toggleTargetRow = toggleTargetRow;
window.targetInputKey = targetInputKey;
window.confirmTargetEdit = confirmTargetEdit;
window.finishTargetEdit = finishTargetEdit;
window.cancelTargetEdit = cancelTargetEdit;
window.saveTargets = saveTargets;
window.closeModal = closeModal;
window.showToast = showToast;

document.addEventListener("DOMContentLoaded", init);
