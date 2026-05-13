const datasets = {
  orders: {
    title: "订单列表",
    tableTitle: "订单结果",
    tableSub: "共 4 条记录，已按付款时间倒序排列",
    breadcrumb: "订单列表",
    defaultStatus: "all"
  },
  review: {
    title: "待审订单",
    tableTitle: "待审核订单",
    tableSub: "集中审核已完成检测的订单，优先核对费用、库存和发货信息",
    breadcrumb: "待审订单",
    defaultStatus: "review"
  },
  packages: {
    title: "包裹列表",
    tableTitle: "包裹结果",
    tableSub: "展示仓库、物流渠道与履约状态，包裹拦截规则仍需业务复核",
    breadcrumb: "包裹列表",
    defaultStatus: "all"
  }
};

const baseRows = [
  {
    id: "SO202605090018",
    platform: "Amazon",
    platformType: "amazon",
    businessUnit: "北美事业部",
    site: "US",
    store: "北美优选-US",
    country: "美国",
    status: "待发货",
    statusType: "green",
    product: "Wireless Bluetooth Headphones Premium Noise Cancelling",
    sku: "BT-PRO-001",
    quantity: "1 件",
    amount: "USD 89.99",
    profit: "利润率 18.6%",
    packageNo: "PKG-US-0509-018",
    warehouse: "美西仓",
    logistics: "USPS Ground",
    payTime: "付款 05-09 09:23",
    updateTime: "更新 10:21",
    flag: "资料完整",
    flagType: "blue",
    owner: "客服-李明"
  },
  {
    id: "SO202605090016",
    platform: "TikTok Shop",
    platformType: "tiktok",
    businessUnit: "东南亚事业部",
    site: "MY",
    store: "东南亚旗舰-MY",
    country: "马来西亚",
    status: "待审核",
    statusType: "orange",
    product: "Portable Mini Fan Rechargeable USB-C Summer Series",
    sku: "FAN-MINI-02",
    quantity: "2 件",
    amount: "MYR 126.40",
    profit: "利润率 12.3%",
    packageNo: "待生成",
    warehouse: "华东仓",
    logistics: "J&T Express",
    payTime: "付款 05-09 08:14",
    updateTime: "更新 09:21",
    flag: "需人工审核",
    flagType: "orange",
    owner: "客服-王敏"
  },
  {
    id: "SO202605080229",
    platform: "Shopee",
    platformType: "shopee",
    businessUnit: "东南亚事业部",
    site: "PH",
    store: "菲律宾家居-PH",
    country: "菲律宾",
    status: "异常",
    statusType: "red",
    product: "Kitchen Scale PrecisionMaster Digital 5kg",
    sku: "SCALE-5KG-WH",
    quantity: "1 件",
    amount: "PHP 1,245.00",
    profit: "地址待补全",
    packageNo: "PKG-PH-0508-229",
    warehouse: "华南仓",
    logistics: "物流不可达",
    payTime: "付款 05-08 20:42",
    updateTime: "更新 10:22",
    flag: "地址异常",
    flagType: "red",
    owner: "客服-陈晨"
  },
  {
    id: "SO202605080211",
    platform: "Walmart",
    platformType: "walmart",
    businessUnit: "北美事业部",
    site: "US",
    store: "北美数码-US",
    country: "美国",
    status: "已发货",
    statusType: "gray",
    product: "USB-C Hub 7-in-1 Aluminum Multiport Adapter",
    sku: "HUB-7IN1-GY",
    quantity: "1 件",
    amount: "USD 42.80",
    profit: "利润率 21.1%",
    packageNo: "PKG-US-0508-211",
    warehouse: "美东仓",
    logistics: "FedEx",
    payTime: "发货 05-09 06:18",
    updateTime: "更新 11:23",
    flag: "运输中",
    flagType: "blue",
    owner: "客服-周舟"
  }
];

const rows = baseRows.map((row) => ({ ...row }));
const flowOrderId = "SO202605090016";

const flowStepsConfig = [
  {
    label: "订单同步",
    desc: "平台订单进入 OMS",
    tag: "待检测",
    tagType: "blue",
    result: "订单已进入 OMS，下一步将执行风控、库存、利润检测。",
    checks: "下一步需确认：平台单号、SKU 映射、库存可用数。",
    rowPatch: {
      status: "待检测",
      statusType: "blue",
      flag: "等待检测",
      flagType: "blue",
      packageNo: "待生成",
      logistics: "待匹配",
      payTime: "同步 05-12 09:10",
      updateTime: "更新 10:24"
    }
  },
  {
    label: "检测完成",
    desc: "库存/利润/风控通过",
    tag: "待审核",
    tagType: "orange",
    result: "系统检测通过，订单进入待审订单池，等待运营确认费用和发货信息。",
    checks: "下一步需确认：利润率、发货仓、物流渠道和异常标签。",
    rowPatch: {
      status: "待审核",
      statusType: "orange",
      flag: "检测通过",
      flagType: "blue",
      packageNo: "待生成",
      logistics: "J&T Express",
      payTime: "付款 05-12 09:10",
      updateTime: "更新 10:27"
    }
  },
  {
    label: "审核通过",
    desc: "进入待发货",
    tag: "待发货",
    tagType: "green",
    result: "订单审核通过，已进入待发货队列，等待生成或关联包裹。",
    checks: "下一步需确认：仓库库存锁定、包裹拆合规则、物流渠道可达性。",
    rowPatch: {
      status: "待发货",
      statusType: "green",
      flag: "审核通过",
      flagType: "green",
      packageNo: "待生成",
      logistics: "J&T Express",
      updateTime: "更新 10:30"
    }
  },
  {
    label: "生成包裹",
    desc: "关联仓库与渠道",
    tag: "包裹已生成",
    tagType: "blue",
    result: "包裹已生成并关联仓库、物流渠道，当前可演练包裹拦截的风险确认。",
    checks: "下一步需确认：包裹号、仓库作业状态、面单和渠道有效性。",
    rowPatch: {
      status: "待发货",
      statusType: "green",
      flag: "包裹已生成",
      flagType: "blue",
      packageNo: "PKG-MY-0512-016",
      logistics: "J&T Express",
      updateTime: "更新 10:34"
    }
  },
  {
    label: "仓库交接",
    desc: "扫描/打包/交运",
    tag: "交接中",
    tagType: "blue",
    result: "仓库已接收包裹并进入扫描、打包、交运流程，发货前仍可发起拦截申请。",
    checks: "下一步需确认：扫描时间、打包时间、跟踪号有效期。",
    rowPatch: {
      status: "待发货",
      statusType: "green",
      flag: "仓库交接中",
      flagType: "blue",
      packageNo: "PKG-MY-0512-016",
      logistics: "J&T Express",
      updateTime: "更新 10:37"
    }
  },
  {
    label: "发货完成",
    desc: "同步跟踪号",
    tag: "已发货",
    tagType: "gray",
    result: "包裹已发货，OMS 同步跟踪号并保留订单、包裹和操作日志记录。",
    checks: "后续关注：物流轨迹、平台妥投、售后或退款联动。",
    rowPatch: {
      status: "已发货",
      statusType: "gray",
      flag: "运输中",
      flagType: "blue",
      packageNo: "PKG-MY-0512-016",
      logistics: "J&T Express",
      payTime: "发货 05-12 10:38",
      updateTime: "更新 10:39"
    }
  }
];

const statusFilterMap = {
  pay: "待付款",
  detect: "待检测",
  profit: "待盈亏",
  review: "待审核",
  ship: "待发货",
  partial: "部分发货",
  shipped: "已发货",
  cancel: "已取消",
  exception: "异常",
  out: "缺货",
  void: "作废"
};

let activeFlowIndex = 0;
let currentStatus = "all";
let toastTimer;

const pageTitle = document.getElementById("pageTitle");
const breadcrumbCurrent = document.getElementById("breadcrumbCurrent");
const tableTitle = document.getElementById("tableTitle");
const tableSub = document.getElementById("tableSub");
const tableBody = document.getElementById("tableBody");
const drawer = document.getElementById("detailDrawer");
const drawerMask = document.getElementById("drawerMask");
const drawerTitle = document.getElementById("drawerTitle");
const drawerBody = document.getElementById("drawerBody");
const storeTrigger = document.getElementById("storeTrigger");
const storePopover = document.getElementById("storePopover");
const storeSummary = document.getElementById("storeSummary");
const storeFooterText = document.getElementById("storeFooterText");
const batchActionBar = document.getElementById("batchActionBar");
const selectedCount = document.getElementById("selectedCount");
const selectAll = document.getElementById("selectAll");
const paginationSummary = document.querySelector(".pagination span");
const flowSteps = document.getElementById("flowSteps");
const flowStepCount = document.getElementById("flowStepCount");
const flowOrderNo = document.getElementById("flowOrderNo");
const flowOrderStatus = document.getElementById("flowOrderStatus");
const flowPackageNo = document.getElementById("flowPackageNo");
const flowWarehouse = document.getElementById("flowWarehouse");
const flowLogistics = document.getElementById("flowLogistics");
const flowStageHint = document.getElementById("flowStageHint");
const flowResultTag = document.getElementById("flowResultTag");
const flowResultText = document.getElementById("flowResultText");
const flowNextChecks = document.getElementById("flowNextChecks");
const runFlowBtn = document.getElementById("runFlowBtn");
const resetFlowBtn = document.getElementById("resetFlowBtn");
const openFlowDetail = document.getElementById("openFlowDetail");
const openInterceptBtn = document.getElementById("openInterceptBtn");
const interceptHint = document.getElementById("interceptHint");
const batchSearchTrigger = document.getElementById("batchSearchTrigger");
const batchSearchSummary = document.getElementById("batchSearchSummary");
const batchSearchPanel = document.getElementById("batchSearchPanel");
const batchSearchInput = document.getElementById("batchSearchInput");
const batchSearchCount = document.getElementById("batchSearchCount");
const filterChips = document.getElementById("filterChips");
const riskModalMask = document.getElementById("riskModalMask");
const closeRiskModalBtn = document.getElementById("closeRiskModal");
const cancelRiskModalBtn = document.getElementById("cancelRiskModal");
const confirmInterceptBtn = document.getElementById("confirmIntercept");
const riskObject = document.getElementById("riskObject");
const toast = document.getElementById("toast");
let batchSearchValues = ["AMZ-2026"];

function getFlowRow() {
  return rows.find((row) => row.id === flowOrderId);
}

function statusMatches(row, filter) {
  if (filter === "all") return true;
  if (filter === "merge") return row.flag === "可合并";
  const status = statusFilterMap[filter];
  return status ? row.status === status : true;
}

function renderStatusCounts() {
  document.querySelectorAll(".tab").forEach((tab) => {
    const count = rows.filter((row) => statusMatches(row, tab.dataset.status)).length;
    const badge = tab.querySelector("span");
    if (badge) badge.textContent = String(count);
  });
}

function renderRows(filter = currentStatus) {
  currentStatus = filter;
  const visible = rows.filter((row) => statusMatches(row, filter));

  tableBody.innerHTML = visible
    .map(
      (row) => `
        <tr data-row-id="${row.id}">
          <td class="check-col"><input type="checkbox" class="row-check" aria-label="选择 ${row.id}" /></td>
          <td>
            <div class="order-main">
              <div class="order-line">
                <span class="platform-dot ${row.platformType}">${row.platform.slice(0, 1)}</span>
                <button class="order-no" data-index="${rows.indexOf(row)}">${row.id}</button>
              </div>
              <span class="muted">${row.platform} / ${row.businessUnit} / ${row.site}</span>
              <span class="muted">${row.store} · ${row.owner}</span>
            </div>
          </td>
          <td>
            <div class="cell-stack">
              <span class="product-name">${row.product}</span>
              <span class="muted">SKU: ${row.sku} · ${row.quantity}</span>
              <span class="tag gray">${row.country}</span>
            </div>
          </td>
          <td>
            <div class="cell-stack">
              <span class="money">${row.amount}</span>
              <span class="muted">${row.profit}</span>
            </div>
          </td>
          <td>
            <div class="cell-stack">
              <button class="package-link" data-index="${rows.indexOf(row)}">${row.packageNo}</button>
              <span class="muted">${row.warehouse} / ${row.logistics}</span>
            </div>
          </td>
          <td>
            <div class="tag-row">
              <span class="tag ${row.statusType}">${row.status}</span>
              <span class="tag ${row.flagType}">${row.flag}</span>
            </div>
          </td>
          <td>
            <div class="cell-stack">
              <span>${row.payTime}</span>
              <span class="muted">${row.updateTime}</span>
            </div>
          </td>
          <td>
            <button class="text-action" data-index="${rows.indexOf(row)}">查看</button>
          </td>
        </tr>
      `
    )
    .join("");

  if (visible.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="8">
          <div class="cell-stack" style="align-items:center;padding:34px;color:#667085;">
            <strong>当前筛选无结果</strong>
            <span class="muted">可调整订单状态、关键词、店铺或付款时间后查看</span>
          </div>
        </td>
      </tr>
    `;
  }

  paginationSummary.textContent =
    visible.length > 0 ? `第 1 - ${visible.length} 条，共 ${visible.length} 条` : "共 0 条";
  updateBatchActionBar();
  renderStatusCounts();
}

function updateBatchActionBar() {
  const checked = tableBody.querySelectorAll(".row-check:checked").length;
  selectedCount.textContent = String(checked);
  batchActionBar.hidden = checked === 0;
  if (selectAll) {
    const boxes = tableBody.querySelectorAll(".row-check");
    selectAll.checked = boxes.length > 0 && checked === boxes.length;
    selectAll.indeterminate = checked > 0 && checked < boxes.length;
  }
}

function setActiveStatus(status) {
  currentStatus = status;
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.status === status);
  });
  renderRows(status);
}

function getFlowTimeline(row) {
  if (row.id !== flowOrderId) {
    return [
      ["平台订单同步至 OMS", "05-09 08:10"],
      ["完成风控、库存和利润检测", "05-09 08:18"],
      ["仓库和物流信息完成匹配", "05-09 09:41"],
      ["等待下一步履约结果", "当前"]
    ];
  }

  const timeline = flowStepsConfig.slice(0, activeFlowIndex + 1).map((step, index) => [
    step.label,
    index === activeFlowIndex ? "当前" : `10:${24 + index * 3}`
  ]);

  if (row.intercepted) {
    timeline.push(["包裹拦截申请已提交，等待仓库复核", "当前"]);
  }

  return timeline;
}

function openDrawer(row) {
  const timeline = getFlowTimeline(row)
    .map(
      ([label, time]) => `
        <li><span class="timeline-dot"></span><span>${label}</span><small>${time}</small></li>
      `
    )
    .join("");

  drawerTitle.textContent = row.id;
  drawerBody.innerHTML = `
    <section class="drawer-section">
      <h4>订单基础信息</h4>
      <dl class="description-grid">
        <dt>平台</dt><dd>${row.platform}</dd>
        <dt>事业部</dt><dd>${row.businessUnit}</dd>
        <dt>站点</dt><dd>${row.site}</dd>
        <dt>店铺</dt><dd>${row.store}</dd>
        <dt>负责人</dt><dd>${row.owner}</dd>
        <dt>订单状态</dt><dd><span class="tag ${row.statusType}">${row.status}</span></dd>
      </dl>
    </section>
    <section class="drawer-section">
      <h4>商品与费用</h4>
      <dl class="description-grid">
        <dt>商品</dt><dd>${row.product}</dd>
        <dt>SKU</dt><dd>${row.sku}</dd>
        <dt>数量</dt><dd>${row.quantity}</dd>
        <dt>订单金额</dt><dd>${row.amount}</dd>
        <dt>利润/说明</dt><dd>${row.profit}</dd>
        <dt>异常标记</dt><dd><span class="tag ${row.flagType}">${row.flag}</span></dd>
      </dl>
    </section>
    <section class="drawer-section">
      <h4>包裹履约</h4>
      <dl class="description-grid">
        <dt>包裹号</dt><dd>${row.packageNo}</dd>
        <dt>仓库</dt><dd>${row.warehouse}</dd>
        <dt>物流渠道</dt><dd>${row.logistics}</dd>
        <dt>关键时间</dt><dd>${row.payTime}</dd>
      </dl>
    </section>
    <section class="drawer-section">
      <h4>履约轨迹</h4>
      <ul class="timeline">${timeline}</ul>
    </section>
    <section class="drawer-section">
      <h4>操作日志</h4>
      <dl class="description-grid">
        <dt>操作人</dt><dd>系统</dd>
        <dt>操作类型</dt><dd>${row.intercepted ? "包裹拦截" : "状态同步"}</dd>
        <dt>操作对象</dt><dd>${row.id}</dd>
        <dt>操作详情</dt><dd>${row.intercepted ? "已生成拦截申请，等待人工复核" : row.flag}</dd>
        <dt>操作时间</dt><dd>2026-05-12 10:40</dd>
      </dl>
    </section>
  `;
  drawerMask.hidden = false;
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
}

function closeDrawer() {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  setTimeout(() => {
    drawerMask.hidden = true;
  }, 180);
}

function renderFlow() {
  const row = getFlowRow();
  const step = flowStepsConfig[activeFlowIndex];
  const canIntercept = activeFlowIndex >= 3 && activeFlowIndex < 5 && !row.intercepted;

  flowOrderNo.textContent = row.id;
  flowOrderStatus.textContent = row.status;
  flowPackageNo.textContent = row.packageNo;
  flowWarehouse.textContent = row.warehouse;
  flowLogistics.textContent = row.logistics;
  flowStageHint.textContent = row.intercepted
    ? "包裹拦截申请已提交，当前等待仓库复核。"
    : step.desc;
  flowStepCount.textContent = `${activeFlowIndex + 1} / ${flowStepsConfig.length}`;
  flowResultTag.textContent = row.intercepted ? "拦截中" : step.tag;
  flowResultTag.className = `tag ${row.intercepted ? "orange" : step.tagType}`;
  flowResultText.textContent = row.intercepted
    ? "拦截申请已生成。正式系统需要继续校验仓库作业、物流交运和售后联动影响。"
    : step.result;
  flowNextChecks.innerHTML = `<span>${row.intercepted ? "下一步需确认：仓库是否已出库、物流是否接收、是否需要释放库存或触发售后。" : step.checks}</span>`;

  openInterceptBtn.disabled = !canIntercept;
  interceptHint.textContent = canIntercept
    ? "当前包裹未完成发货，申请前需二次确认"
    : activeFlowIndex < 3
      ? "包裹生成后可演练拦截确认"
      : row.intercepted
        ? "拦截申请已提交"
        : "已发货后需转售后/物流异常处理";

  runFlowBtn.disabled = activeFlowIndex === flowStepsConfig.length - 1 || row.intercepted;
  runFlowBtn.textContent = activeFlowIndex === flowStepsConfig.length - 1 ? "流程已完成" : "推进下一状态";

  flowSteps.innerHTML = flowStepsConfig
    .map((item, index) => {
      const state = index < activeFlowIndex ? "done" : index === activeFlowIndex ? "current" : "";
      return `
        <div class="flow-step ${state}">
          <strong>${item.label}</strong>
          <span>${item.desc}</span>
        </div>
      `;
    })
    .join("");
}

function applyFlowStep(index, options = {}) {
  activeFlowIndex = Math.max(0, Math.min(index, flowStepsConfig.length - 1));
  const row = getFlowRow();
  const patch = flowStepsConfig[activeFlowIndex].rowPatch;
  Object.assign(row, patch, { intercepted: false });
  renderFlow();
  renderRows(currentStatus);
  if (!options.silent) showToast(`已运行：${flowStepsConfig[activeFlowIndex].label}`);
}

function resetRows() {
  rows.splice(0, rows.length, ...baseRows.map((row) => ({ ...row })));
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.hidden = false;
  toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 2200);
}

function parseBatchSearch(value) {
  return [...new Set(value.split(/[\n,，]+/).map((item) => item.trim()).filter(Boolean))];
}

function updateBatchSearchPreview() {
  const values = parseBatchSearch(batchSearchInput.value);
  batchSearchCount.textContent = `已识别 ${values.length} 个单号`;
}

function renderFilterChips() {
  const type = document.querySelector(".field-number-type .select-value")?.textContent || "平台单号";
  const keywordChips = batchSearchValues.slice(0, 3).map((value) => `
    <span class="filter-chip">${type}: ${value}<button type="button" data-remove-keyword="${value}" aria-label="移除 ${value}">×</button></span>
  `);
  const overflow = batchSearchValues.length > 3
    ? `<span class="filter-chip">另 ${batchSearchValues.length - 3} 个</span>`
    : "";
  filterChips.innerHTML = `
    <span class="filter-chip">店铺: Amazon / 北美优选-US</span>
    ${keywordChips.join("")}
    ${overflow}
  `;
  batchSearchSummary.textContent =
    batchSearchValues.length <= 1 ? batchSearchValues[0] || "点击输入批量单号" : `${batchSearchValues[0]} 等 ${batchSearchValues.length} 个`;
}

function applyBatchSearch() {
  batchSearchValues = parseBatchSearch(batchSearchInput.value);
  batchSearchPanel.hidden = true;
  batchSearchTrigger.setAttribute("aria-expanded", "false");
  renderFilterChips();
  renderRows(document.querySelector(".tab.active")?.dataset.status || "all");
}

function openRiskModal() {
  const row = getFlowRow();
  riskObject.textContent = `${row.id} / ${row.packageNo}`;
  riskModalMask.hidden = false;
}

function closeRiskModal() {
  riskModalMask.hidden = true;
}

function confirmIntercept() {
  const row = getFlowRow();
  Object.assign(row, {
    status: "异常",
    statusType: "red",
    flag: "拦截申请中",
    flagType: "orange",
    logistics: "仓库拦截复核",
    updateTime: "更新 10:40",
    intercepted: true
  });
  closeRiskModal();
  renderFlow();
  renderRows(currentStatus);
  showToast("包裹拦截申请已提交，等待仓库复核");
}

document.querySelectorAll(".side-item").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".side-item").forEach((nav) => nav.classList.remove("active"));
    item.classList.add("active");
    const page = datasets[item.dataset.page];
    pageTitle.textContent = page.title;
    breadcrumbCurrent.textContent = page.breadcrumb;
    tableTitle.textContent = page.tableTitle;
    tableSub.textContent = page.tableSub;
    setActiveStatus(page.defaultStatus);
  });
});

document.getElementById("toggleAdvanced").addEventListener("click", (event) => {
  const row = document.getElementById("advancedRow");
  const willOpen = row.hidden;
  row.hidden = !willOpen;
  event.currentTarget.textContent = willOpen ? "收起筛选" : "高级筛选";
});

document.querySelectorAll("[data-select]").forEach((field) => {
  const trigger = field.querySelector(".select-trigger");
  const menu = field.querySelector(".select-menu");
  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    document.querySelectorAll(".select-menu").forEach((item) => {
      if (item !== menu) item.hidden = true;
    });
    const willOpen = menu.hidden;
    menu.hidden = !willOpen;
    trigger.setAttribute("aria-expanded", String(willOpen));
  });
  menu.addEventListener("click", (event) => {
    const option = event.target.closest(".select-option");
    if (!option) return;
    field.querySelector(".select-value").textContent = option.textContent.trim();
    menu.querySelectorAll(".select-option").forEach((item) => item.classList.toggle("selected", item === option));
    menu.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
    renderFilterChips();
  });
});

batchSearchTrigger.addEventListener("click", () => {
  const willOpen = batchSearchPanel.hidden;
  batchSearchPanel.hidden = !willOpen;
  batchSearchTrigger.setAttribute("aria-expanded", String(willOpen));
  if (willOpen) batchSearchInput.focus();
});

batchSearchInput.addEventListener("input", updateBatchSearchPreview);
document.getElementById("applyBatchSearch").addEventListener("click", applyBatchSearch);
document.getElementById("cancelBatchSearch").addEventListener("click", () => {
  batchSearchPanel.hidden = true;
  batchSearchTrigger.setAttribute("aria-expanded", "false");
});

filterChips.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-keyword]");
  if (!removeButton) return;
  batchSearchValues = batchSearchValues.filter((value) => value !== removeButton.dataset.removeKeyword);
  batchSearchInput.value = batchSearchValues.join("\n");
  updateBatchSearchPreview();
  renderFilterChips();
});

document.getElementById("statusTabs").addEventListener("click", (event) => {
  const button = event.target.closest(".tab");
  if (!button) return;
  setActiveStatus(button.dataset.status);
});

tableBody.addEventListener("click", (event) => {
  if (event.target.matches(".row-check")) {
    updateBatchActionBar();
    return;
  }
  const button = event.target.closest("button[data-index]");
  if (!button) return;
  openDrawer(rows[Number(button.dataset.index)]);
});

selectAll.addEventListener("change", () => {
  tableBody.querySelectorAll(".row-check").forEach((checkbox) => {
    checkbox.checked = selectAll.checked;
  });
  updateBatchActionBar();
});

batchActionBar.addEventListener("click", (event) => {
  if (!event.target.matches("button")) return;
  tableBody.querySelectorAll(".row-check").forEach((checkbox) => {
    checkbox.checked = false;
  });
  updateBatchActionBar();
});

storeTrigger.addEventListener("click", () => {
  const willOpen = storePopover.hidden;
  storePopover.hidden = !willOpen;
  storeTrigger.setAttribute("aria-expanded", String(willOpen));
});

function getChildNodes(parentId) {
  return [...storePopover.querySelectorAll(`[data-parent="${parentId}"]`)];
}

function getChildChecks(parentId) {
  return getChildNodes(parentId)
    .map((node) => node.querySelector(".tree-check"))
    .filter(Boolean);
}

function setDescendants(nodeId, checked) {
  getChildChecks(nodeId).forEach((checkbox) => {
    checkbox.checked = checked;
    checkbox.indeterminate = false;
    setDescendants(checkbox.dataset.node, checked);
  });
}

function updateAncestors(nodeId) {
  const checkbox = storePopover.querySelector(`.tree-check[data-node="${nodeId}"]`);
  if (!checkbox?.dataset.parent) return;
  const parent = storePopover.querySelector(`.tree-check[data-node="${checkbox.dataset.parent}"]`);
  const siblings = getChildChecks(checkbox.dataset.parent);
  const checkedCount = siblings.filter((item) => item.checked).length;
  const partialCount = siblings.filter((item) => item.indeterminate).length;
  parent.checked = checkedCount === siblings.length;
  parent.indeterminate = (checkedCount > 0 && checkedCount < siblings.length) || partialCount > 0;
  updateAncestors(parent.dataset.node);
}

function updateStoreSummary() {
  const selectedStores = [...storePopover.querySelectorAll(".store-check:checked")];
  const firstPath = selectedStores[0]?.closest("[data-path]")?.dataset.path;
  if (selectedStores.length === 0) {
    storeSummary.textContent = "全部平台 / 全部事业部 / 全部站点 / 全部店铺";
    storeFooterText.textContent = "未选择具体店铺";
    return;
  }
  storeSummary.textContent = selectedStores.length === 1 ? firstPath : `${firstPath} 等 ${selectedStores.length} 个店铺`;
  storeFooterText.textContent = `已选 ${selectedStores.length} 个店铺`;
}

storePopover.addEventListener("click", (event) => {
  const toggle = event.target.closest(".tree-toggle");
  if (!toggle) return;
  const node = toggle.closest(".tree-node");
  const nodeId = node.dataset.node;
  const children = getChildNodes(nodeId);
  const willExpand = toggle.textContent.trim() === "›";
  toggle.textContent = willExpand ? "⌄" : "›";
  node.classList.toggle("expanded", willExpand);
  children.forEach((child) => {
    child.classList.toggle("tree-hidden", !willExpand);
  });
});

storePopover.addEventListener("change", (event) => {
  const checkbox = event.target.closest(".tree-check");
  if (!checkbox) return;
  checkbox.indeterminate = false;
  setDescendants(checkbox.dataset.node, checkbox.checked);
  updateAncestors(checkbox.dataset.node);
  updateStoreSummary();
});

document.getElementById("storeSearch").addEventListener("input", (event) => {
  const keyword = event.target.value.trim().toLowerCase();
  storePopover.querySelectorAll(".tree-node").forEach((node) => {
    const text = node.innerText.toLowerCase();
    node.classList.toggle("search-hidden", keyword !== "" && !text.includes(keyword));
  });
});

document.getElementById("storeDone").addEventListener("click", () => {
  storePopover.hidden = true;
  storeTrigger.setAttribute("aria-expanded", "false");
});

document.addEventListener("click", (event) => {
  if (!event.target.closest("[data-select]")) {
    document.querySelectorAll(".select-menu").forEach((menu) => {
      menu.hidden = true;
      menu.closest("[data-select]")?.querySelector(".select-trigger")?.setAttribute("aria-expanded", "false");
    });
  }
  if (!event.target.closest(".field-store")) {
    storePopover.hidden = true;
    storeTrigger.setAttribute("aria-expanded", "false");
  }
});

document.getElementById("searchBtn").addEventListener("click", () => {
  renderRows(document.querySelector(".tab.active")?.dataset.status || "all");
});

runFlowBtn.addEventListener("click", () => {
  applyFlowStep(activeFlowIndex + 1);
});

if (resetFlowBtn) {
  resetFlowBtn.addEventListener("click", () => {
  resetRows();
  applyFlowStep(0, { silent: true });
  showToast("流程已重置到订单同步");
  });
}

openFlowDetail.addEventListener("click", () => {
  openDrawer(getFlowRow());
});

openInterceptBtn.addEventListener("click", openRiskModal);
closeRiskModalBtn.addEventListener("click", closeRiskModal);
cancelRiskModalBtn.addEventListener("click", closeRiskModal);
confirmInterceptBtn.addEventListener("click", confirmIntercept);
riskModalMask.addEventListener("click", (event) => {
  if (event.target === riskModalMask) closeRiskModal();
});

document.getElementById("closeDrawer").addEventListener("click", closeDrawer);
drawerMask.addEventListener("click", closeDrawer);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeRiskModal();
    closeDrawer();
  }
});

applyFlowStep(0, { silent: true });
updateStoreSummary();
updateBatchSearchPreview();
renderFilterChips();
