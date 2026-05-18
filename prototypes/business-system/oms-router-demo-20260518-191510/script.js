const pageMeta = {
  orders: {
    title: "订单列表",
    description: "集中查看订单状态、履约节点和异常包裹处理。",
    tableTitle: "订单队列",
    subtitle: "按订单维度处理异常、审核与履约",
    statuses: ["全部", "待检测", "待审核", "待发货", "已发货", "异常"],
    columns: ["订单信息", "店铺 / 平台", "状态", "履约进度", "包裹信息", "操作"],
  },
  review: {
    title: "待审订单",
    description: "聚焦审核待处理订单，快速识别风险单与异常单。",
    tableTitle: "待审队列",
    subtitle: "按审核优先级排序",
    statuses: ["全部", "待初审", "待复审", "高风险", "已退回"],
    columns: ["订单信息", "问题摘要", "金额 / 风险", "责任人", "更新时间", "操作"],
  },
  packages: {
    title: "包裹列表",
    description: "查看包裹出库、交运和拦截进度，控制异常扩散。",
    tableTitle: "包裹履约队列",
    subtitle: "按包裹维度跟踪交运与拦截",
    statuses: ["全部", "待打包", "待交运", "运输中", "拦截申请中", "已签收"],
    columns: ["包裹信息", "关联订单", "物流状态", "仓库 / 渠道", "更新时间", "操作"],
  },
};

const rows = {
  orders: [
    {
      id: "OMS-240514-001",
      platform: "Amazon / 北美优选-US",
      status: "待审核",
      statusTone: "orange",
      progress: "检测完成，等待审核",
      packageInfo: "PKG-US-001 / 深圳 A 仓",
      note: "高货值，需人工复核收货地址",
    },
    {
      id: "OMS-240514-002",
      platform: "Shopee / 马来工业-MY",
      status: "待发货",
      statusTone: "blue",
      progress: "已生成包裹，待仓库交运",
      packageInfo: "PKG-MY-016 / 义乌 B 仓",
      note: "客户催发，优先出库",
    },
    {
      id: "OMS-240514-003",
      platform: "TikTok / 东南亚精选-PH",
      status: "异常",
      statusTone: "red",
      progress: "平台回传地址异常",
      packageInfo: "--",
      note: "待客服联系买家修正地址",
    },
    {
      id: "OMS-240514-004",
      platform: "Amazon / 家居补货-US",
      status: "已发货",
      statusTone: "green",
      progress: "交运完成，等待签收",
      packageInfo: "PKG-US-018 / 海外中转仓",
      note: "物流已接单",
    },
  ],
  review: [
    {
      id: "RVW-240514-101",
      platform: "Amazon",
      store: "北美优选-US",
      issue: "收货地址疑似 PO Box，需人工复核",
      amount: "¥8,420 / 高风险",
      owner: "Jenny",
      updated: "10:12",
      note: "地址异常 + 高货值",
    },
    {
      id: "RVW-240514-102",
      platform: "Shopee",
      store: "马来工业-MY",
      issue: "SKU 和仓库可发库存不一致",
      amount: "¥1,960 / 中风险",
      owner: "Leo",
      updated: "09:48",
      note: "建议拆单",
    },
    {
      id: "RVW-240514-103",
      platform: "TikTok",
      store: "东南亚精选-PH",
      issue: "平台备注要求延迟发货",
      amount: "¥560 / 低风险",
      owner: "Mina",
      updated: "09:10",
      note: "需修改承诺时效",
    },
  ],
  packages: [
    {
      id: "PKG-MY-016",
      platform: "Shopee",
      store: "马来工业-MY",
      order: "OMS-240514-002",
      status: "待交运",
      statusTone: "blue",
      channel: "义乌 B 仓 / YunExpress",
      updated: "10:35",
      note: "可发起包裹拦截",
      interceptable: true,
    },
    {
      id: "PKG-US-018",
      platform: "Amazon",
      store: "家居补货-US",
      order: "OMS-240514-004",
      status: "运输中",
      statusTone: "green",
      channel: "海外中转仓 / UPS",
      updated: "09:52",
      note: "已出库，待签收",
      interceptable: false,
    },
    {
      id: "PKG-PH-007",
      platform: "TikTok",
      store: "东南亚精选-PH",
      order: "OMS-240514-008",
      status: "拦截申请中",
      statusTone: "orange",
      channel: "深圳 A 仓 / 4PX",
      updated: "09:06",
      note: "等待仓库确认",
      interceptable: false,
    },
  ],
};

const queueMap = {
  orders: [
    ["待检测", "18 单待系统校验"],
    ["待审核", "7 单待人工确认"],
    ["待发货", "26 单已生成包裹"],
  ],
  review: [
    ["高风险", "2 单需主管复核"],
    ["库存异常", "4 单建议拆单"],
    ["地址异常", "3 单需修正收件信息"],
  ],
  packages: [
    ["待交运", "11 个包裹待仓库交接"],
    ["运输中", "32 个包裹在途"],
    ["拦截申请中", "3 个包裹等待反馈"],
  ],
};

const todoMap = {
  orders: [
    ["异常订单清零", "今天 18:00 前处理异常单，避免履约积压"],
    ["高货值复核", "审核金额 > ¥5,000 的订单地址与运费"],
  ],
  review: [
    ["复审超时提醒", "超过 2 小时未复审的订单需升级"],
    ["平台时效确认", "确认 TikTok 延迟发货订单说明"],
  ],
  packages: [
    ["仓库交接看板", "待交运包裹需在 30 分钟内出库"],
    ["拦截反馈回写", "收到仓库结果后同步订单日志"],
  ],
};

let currentPage = "orders";
let currentStatus = "全部";
let currentInterceptRow = null;
let platformValue = "all";
let selectedStoreValues = ["北美优选-US"];
let warehouseValue = "all";
let toastTimer = null;

function renderPage() {
  const meta = pageMeta[currentPage];
  document.getElementById("breadcrumbCurrent").textContent = meta.title;
  document.getElementById("pageTitle").textContent = meta.title;
  document.getElementById("pageDescription").textContent = meta.description;
  document.getElementById("tableTitle").textContent = meta.tableTitle;
  document.getElementById("tableSubtitle").textContent = meta.subtitle;
  renderTabs(meta.statuses);
  renderTable(meta.columns);
  renderQueue();
  renderTodos();
  updateMenu();
}

function renderTabs(statuses) {
  const container = document.getElementById("statusTabs");
  container.innerHTML = "";
  statuses.forEach((status, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `status-tab${index === 0 ? " active" : ""}`;
    button.textContent = status;
    button.addEventListener("click", () => {
      currentStatus = status;
      document.querySelectorAll(".status-tab").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderTable(pageMeta[currentPage].columns);
    });
    container.appendChild(button);
  });
  currentStatus = statuses[0];
}

function renderTable(columns) {
  const head = document.getElementById("tableHead");
  const body = document.getElementById("tableBody");
  head.innerHTML = `<tr>${columns.map((item) => `<th>${item}</th>`).join("")}</tr>`;
  const keyword = document.getElementById("keywordInput").value.trim().toLowerCase();
  const data = rows[currentPage].filter((row) => {
    if (platformValue !== "all" && !JSON.stringify(row).includes(platformValue)) return false;
    if (selectedStoreValues.length > 0 && !selectedStoreValues.some((value) => JSON.stringify(row).includes(value))) return false;
    if (warehouseValue !== "all" && !JSON.stringify(row).includes(warehouseValue)) return false;
    if (!keyword) return true;
    return JSON.stringify(row).toLowerCase().includes(keyword);
  });
  document.getElementById("tableSubtitle").textContent = `${pageMeta[currentPage].subtitle} · 共 ${data.length} 条`;
  body.innerHTML = data.map((row) => renderRow(row)).join("");
  bindRowActions(data);
}

function renderRow(row) {
  if (currentPage === "orders") {
    return `
      <tr>
        <td><div class="cell-title">${row.id}</div><div class="cell-sub">${row.note}</div></td>
        <td><div class="cell-title">${row.platform}</div><div class="cell-sub">付款时间 10:20</div></td>
        <td><span class="tag ${row.statusTone}">${row.status}</span></td>
        <td><div class="cell-title">${row.progress}</div><div class="cell-sub">当前视图：${currentStatus}</div></td>
        <td><div class="cell-title">${row.packageInfo}</div><div class="cell-sub">${row.status === "异常" ? "待生成包裹" : "可继续履约"}</div></td>
        <td><button class="table-action" data-action="detail" data-id="${row.id}">查看详情</button></td>
      </tr>
    `;
  }

  if (currentPage === "review") {
    return `
      <tr>
        <td><div class="cell-title">${row.id}</div><div class="cell-sub">待审单</div></td>
        <td><div class="cell-title">${row.issue}</div><div class="cell-sub">${row.note}</div></td>
        <td><span class="tag ${row.amount.includes("高") ? "red" : row.amount.includes("中") ? "orange" : "blue"}">${row.amount}</span></td>
        <td><div class="cell-title">${row.owner}</div><div class="cell-sub">当前队列负责人</div></td>
        <td>${row.updated}</td>
        <td>
          <button class="table-action" data-action="detail" data-id="${row.id}">查看详情</button>
          <button class="table-action" data-action="approve" data-id="${row.id}">通过审核</button>
        </td>
      </tr>
    `;
  }

  return `
    <tr>
      <td><div class="cell-title">${row.id}</div><div class="cell-sub">${row.note}</div></td>
      <td><div class="cell-title">${row.order}</div><div class="cell-sub">关联订单</div></td>
      <td><span class="tag ${row.statusTone}">${row.status}</span></td>
      <td><div class="cell-title">${row.channel}</div><div class="cell-sub">包裹履约链路</div></td>
      <td>${row.updated}</td>
      <td>
        <button class="table-action" data-action="detail" data-id="${row.id}">查看详情</button>
        ${row.interceptable ? `<button class="table-action" data-action="intercept" data-id="${row.id}">申请拦截</button>` : ""}
      </td>
    </tr>
  `;
}

function bindRowActions(data) {
  document.querySelectorAll("[data-action='detail']").forEach((button) => {
    button.addEventListener("click", () => openDrawer(button.dataset.id, data.find((item) => item.id === button.dataset.id)));
  });

  document.querySelectorAll("[data-action='approve']").forEach((button) => {
    button.addEventListener("click", () => {
      showToast(`样例动作：${button.dataset.id} 已通过审核。`);
    });
  });

  document.querySelectorAll("[data-action='intercept']").forEach((button) => {
    button.addEventListener("click", () => openInterceptModal(data.find((item) => item.id === button.dataset.id)));
  });
}

function renderQueue() {
  const container = document.getElementById("miniQueue");
  container.innerHTML = queueMap[currentPage]
    .map(
      ([title, meta]) => `
        <div class="queue-item">
          <strong>${title}</strong>
          <div class="queue-meta">${meta}</div>
        </div>
      `,
    )
    .join("");
}

function renderTodos() {
  const container = document.getElementById("todoList");
  container.innerHTML = todoMap[currentPage]
    .map(
      ([title, meta]) => `
        <li class="todo-item">
          <strong>${title}</strong>
          <div class="todo-meta">${meta}</div>
        </li>
      `,
    )
    .join("");
}

function updateMenu() {
  document.querySelectorAll(".side-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.page === currentPage);
  });
}

function openDrawer(id, row) {
  if (!row) return;
  document.getElementById("drawerTitle").textContent = id;
  document.getElementById("drawerSubtitle").textContent =
    currentPage === "packages" ? "查看包裹履约与拦截信息" : "查看订单与履约详情";
  document.getElementById("drawerBody").innerHTML = buildDrawerContent(row);
  document.getElementById("drawerMask").classList.remove("hidden");
  document.getElementById("detailDrawer").classList.remove("hidden");
}

function buildDrawerContent(row) {
  const fields =
    currentPage === "review"
      ? [
          ["审核单号", row.id],
          ["问题摘要", row.issue],
          ["责任人", row.owner],
          ["风险等级", row.amount],
        ]
      : currentPage === "packages"
        ? [
            ["包裹号", row.id],
            ["关联订单", row.order],
            ["当前状态", row.status],
            ["仓配渠道", row.channel],
          ]
        : [
            ["订单号", row.id],
            ["平台 / 店铺", row.platform],
            ["当前状态", row.status],
            ["包裹信息", row.packageInfo],
          ];

  return `
    <section class="detail-section">
      <h3>基础信息</h3>
      <div class="detail-grid">
        ${fields
          .map(
            ([label, value]) => `
              <div class="detail-item">
                <div class="detail-label">${label}</div>
                <div class="detail-value">${value}</div>
              </div>
            `,
          )
          .join("")}
      </div>
    </section>
    <section class="detail-section">
      <h3>履约轨迹</h3>
      <div class="timeline">
        <div class="timeline-item"><strong>10:08</strong><div class="cell-sub">系统同步订单并完成基础校验</div></div>
        <div class="timeline-item"><strong>10:16</strong><div class="cell-sub">运营识别当前风险并进入处理队列</div></div>
        <div class="timeline-item"><strong>10:28</strong><div class="cell-sub">当前页面内可继续查看详情或执行受控操作</div></div>
      </div>
    </section>
    <section class="detail-section">
      <h3>操作日志</h3>
      <div class="timeline">
        <div class="timeline-item"><strong>Freddy</strong><div class="cell-sub">查看详情 · 2026-05-14 10:32</div></div>
        <div class="timeline-item"><strong>OMS Job</strong><div class="cell-sub">同步状态回写 · 2026-05-14 10:16</div></div>
      </div>
    </section>
  `;
}

function closeDrawer() {
  document.getElementById("drawerMask").classList.add("hidden");
  document.getElementById("detailDrawer").classList.add("hidden");
}

function openInterceptModal(row) {
  currentInterceptRow = row;
  document.getElementById("modalBody").innerHTML = `
    <div class="detail-grid">
      <div class="detail-item">
        <div class="detail-label">包裹号</div>
        <div class="detail-value">${row.id}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">关联订单</div>
        <div class="detail-value">${row.order}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">影响范围</div>
        <div class="detail-value">包裹将进入异常处理队列，需同步仓库确认</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">可恢复性</div>
        <div class="detail-value">仓库未交运前可撤回，交运后需人工跟进</div>
      </div>
    </div>
  `;
  document.getElementById("modalMask").classList.remove("hidden");
  document.getElementById("riskModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modalMask").classList.add("hidden");
  document.getElementById("riskModal").classList.add("hidden");
  currentInterceptRow = null;
}

function confirmIntercept() {
  if (!currentInterceptRow) return;
  showToast(`样例动作：${currentInterceptRow.id} 已提交拦截申请。`);
  closeModal();
}

function initCustomSelect(name, onChange) {
  const trigger = document.getElementById(`${name}Trigger`);
  const menu = document.getElementById(`${name}Menu`);
  const valueNode = document.getElementById(`${name}Value`);
  trigger.addEventListener("click", () => {
    document.querySelectorAll(".select-menu").forEach((item) => {
      if (item !== menu) item.classList.add("hidden");
    });
    menu.classList.toggle("hidden");
  });
  menu.querySelectorAll(".select-option").forEach((option) => {
    option.addEventListener("click", () => {
      menu.querySelectorAll(".select-option").forEach((item) => item.classList.remove("selected"));
      option.classList.add("selected");
      valueNode.textContent = option.textContent;
      menu.classList.add("hidden");
      onChange(option.dataset.value);
      renderTable(pageMeta[currentPage].columns);
    });
  });
}

function getChildNodes(parentId) {
  return [...document.querySelectorAll(`#storeTree [data-parent="${parentId}"]`)];
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
    if (checkbox.dataset.node) setDescendants(checkbox.dataset.node, checked);
  });
}

function updateAncestors(nodeId) {
  const checkbox = document.querySelector(`#storeTree .tree-check[data-node="${nodeId}"]`);
  if (!checkbox?.dataset.parent) return;
  const parent = document.querySelector(`#storeTree .tree-check[data-node="${checkbox.dataset.parent}"]`);
  const siblings = getChildChecks(checkbox.dataset.parent);
  const checkedCount = siblings.filter((item) => item.checked).length;
  const partialCount = siblings.filter((item) => item.indeterminate).length;
  parent.checked = checkedCount === siblings.length;
  parent.indeterminate = (checkedCount > 0 && checkedCount < siblings.length) || partialCount > 0;
  updateAncestors(parent.dataset.node);
}

function updateStoreSummary() {
  const selectedStores = [...document.querySelectorAll("#storeTree .store-check:checked")];
  selectedStoreValues = selectedStores
    .map((item) => item.closest("[data-store-value]")?.dataset.storeValue)
    .filter(Boolean);
  const firstNode = selectedStores[0]?.closest("[data-path]");
  const firstPath = firstNode?.dataset.path;
  const platform = firstNode?.dataset.platform;
  const summary = document.getElementById("storeSummary");
  const footer = document.getElementById("storeFooterText");
  const dot = document.getElementById("storePlatformDot");

  if (selectedStores.length === 0) {
    summary.textContent = "全部平台 / 全部事业部 / 全部站点 / 全部店铺";
    footer.textContent = "未选择具体店铺";
    dot.textContent = "全";
    dot.className = "platform-dot amazon";
    return;
  }

  summary.textContent = selectedStores.length === 1 ? firstPath : `${firstPath} 等 ${selectedStores.length} 个店铺`;
  footer.textContent = `已选 ${selectedStores.length} 个店铺`;
  if (platform === "shopee") {
    dot.textContent = "S";
    dot.className = "platform-dot shopee";
  } else if (platform === "tiktok") {
    dot.textContent = "T";
    dot.className = "platform-dot tiktok";
  } else {
    dot.textContent = "A";
    dot.className = "platform-dot amazon";
  }
}

function initStoreSelector() {
  const trigger = document.getElementById("storeTrigger");
  const popover = document.getElementById("storePopover");
  const search = document.getElementById("storeSearch");

  trigger.addEventListener("click", () => {
    popover.classList.toggle("hidden");
    trigger.setAttribute("aria-expanded", String(!popover.classList.contains("hidden")));
  });

  popover.addEventListener("click", (event) => {
    const toggle = event.target.closest(".tree-toggle");
    if (!toggle) return;
    const node = toggle.closest(".tree-node");
    const nodeId = node.dataset.node;
    const children = getChildNodes(nodeId);
    const willExpand = toggle.textContent.trim() === "›";
    toggle.textContent = willExpand ? "⌄" : "›";
    children.forEach((child) => child.classList.toggle("tree-hidden", !willExpand));
  });

  popover.addEventListener("change", (event) => {
    const checkbox = event.target.closest(".tree-check");
    if (!checkbox) return;
    checkbox.indeterminate = false;
    if (checkbox.dataset.node) {
      setDescendants(checkbox.dataset.node, checkbox.checked);
      updateAncestors(checkbox.dataset.node);
    }
    updateStoreSummary();
    renderTable(pageMeta[currentPage].columns);
  });

  search.addEventListener("input", () => {
    const keyword = search.value.trim().toLowerCase();
    popover.querySelectorAll(".tree-node").forEach((node) => {
      const text = node.innerText.toLowerCase();
      node.classList.toggle("search-hidden", keyword !== "" && !text.includes(keyword));
    });
  });

  document.getElementById("storeDone").addEventListener("click", () => {
    popover.classList.add("hidden");
    trigger.setAttribute("aria-expanded", "false");
  });

  updateStoreSummary();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.add("hidden");
  }, 2200);
}

document.querySelectorAll(".side-item").forEach((item) => {
  item.addEventListener("click", () => {
    currentPage = item.dataset.page;
    renderPage();
  });
});

document.getElementById("applyFilterBtn").addEventListener("click", () => renderTable(pageMeta[currentPage].columns));
document.getElementById("resetFilterBtn").addEventListener("click", () => {
  document.getElementById("keywordInput").value = "";
  platformValue = "all";
  selectedStoreValues = ["北美优选-US"];
  warehouseValue = "all";
  document.getElementById("platformValue").textContent = "全部平台";
  document.getElementById("warehouseValue").textContent = "全部仓库";
  document.querySelectorAll("#platformMenu .select-option, #warehouseMenu .select-option").forEach((item) => {
    item.classList.remove("selected");
  });
  document.querySelector("#platformMenu .select-option[data-value='all']").classList.add("selected");
  document.querySelector("#warehouseMenu .select-option[data-value='all']").classList.add("selected");
  document.querySelectorAll("#storeTree .store-check, #storeTree .tree-check").forEach((item) => {
    item.checked = false;
    item.indeterminate = false;
  });
  document.querySelector('#storeTree .tree-check[data-node="amazon"]').checked = true;
  document.querySelector('#storeTree .tree-check[data-node="amazon-na"]').checked = true;
  document.querySelector('#storeTree .tree-check[data-node="amazon-na-us"]').checked = true;
  document.querySelector("#storeTree .store-check").checked = true;
  updateStoreSummary();
  renderTable(pageMeta[currentPage].columns);
});
document.getElementById("closeDrawerBtn").addEventListener("click", closeDrawer);
document.getElementById("drawerMask").addEventListener("click", closeDrawer);
document.getElementById("closeModalBtn").addEventListener("click", closeModal);
document.getElementById("cancelModalBtn").addEventListener("click", closeModal);
document.getElementById("modalMask").addEventListener("click", closeModal);
document.getElementById("confirmInterceptBtn").addEventListener("click", confirmIntercept);

document.addEventListener("click", (event) => {
  if (!event.target.closest(".select-field")) {
    document.querySelectorAll(".select-menu").forEach((item) => item.classList.add("hidden"));
  }
  if (!event.target.closest(".field-store")) {
    document.getElementById("storePopover").classList.add("hidden");
    document.getElementById("storeTrigger").setAttribute("aria-expanded", "false");
  }
});

initCustomSelect("platform", (value) => {
  platformValue = value;
});
initCustomSelect("warehouse", (value) => {
  warehouseValue = value;
});
initStoreSelector();

renderPage();
