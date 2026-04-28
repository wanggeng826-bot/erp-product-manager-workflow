// ===== 全局状态 =====
let currentTab = 'overview';
let selectedRows = new Set();

// ===== Tab 切换 =====
function switchTab(tab) {
    currentTab = tab;
    
    // 更新 Tab 样式
    document.querySelectorAll('.tab-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    
    // 更新内容区
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tab}-tab`).classList.add('active');
    
    // 记录日志
    console.log(`[埋点] Tab切换: ${tab === 'overview' ? '退款总览看板' : '退款明细报表'}`);
}

// ===== 图表 Tab 切换 =====
function switchChartTab(element, type) {
    document.querySelectorAll('.chart-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    element.classList.add('active');
    
    // 模拟图表数据变化
    const chartBars = document.querySelectorAll('.chart-bar');
    const heights = {
        orders: ['40%', '65%', '55%', '80%', '45%', '70%', '60%'],
        rate: ['30%', '50%', '45%', '60%', '35%', '55%', '50%'],
        amount: ['50%', '75%', '65%', '90%', '55%', '80%', '70%'],
        success: ['60%', '70%', '65%', '80%', '55%', '75%', '70%']
    };
    
    chartBars.forEach((bar, index) => {
        bar.style.height = heights[type][index];
    });
    
    console.log(`[埋点] 趋势指标切换: ${type}`);
}

// ===== 高级筛选展开/收起 =====
function toggleAdvancedFilter() {
    const overviewFilter = document.getElementById('advanced-filter');
    const detailFilter = document.getElementById('advanced-filter-detail');
    const overviewArrow = document.getElementById('advanced-arrow');
    const detailArrow = document.getElementById('advanced-arrow-detail');
    
    if (currentTab === 'overview' && overviewFilter) {
        const isHidden = overviewFilter.style.display === 'none';
        overviewFilter.style.display = isHidden ? 'flex' : 'none';
        if (overviewArrow) overviewArrow.textContent = isHidden ? '▲' : '▼';
    } else if (currentTab === 'detail' && detailFilter) {
        const isHidden = detailFilter.style.display === 'none';
        detailFilter.style.display = isHidden ? 'flex' : 'none';
        if (detailArrow) detailArrow.textContent = isHidden ? '▲' : '▼';
    }
}

// ===== 查询 =====
function handleQuery() {
    showToast('查询中...', 'info');
    
    // 模拟查询延迟
    setTimeout(() => {
        showToast('查询成功', 'success');
        console.log('[埋点] 查询执行, 当前Tab:', currentTab);
    }, 500);
}

// ===== 重置 =====
function handleReset() {
    const activeTab = document.getElementById(`${currentTab}-tab`);
    const inputs = activeTab.querySelectorAll('.input');
    const selects = activeTab.querySelectorAll('.select');
    
    inputs.forEach(input => {
        if (!input.readOnly) input.value = '';
    });
    
    selects.forEach(select => {
        select.selectedIndex = 0;
    });
    
    showToast('筛选条件已重置', 'info');
    console.log('[埋点] 筛选重置');
}

// ===== 刷新数据 =====
function refreshData() {
    showToast('数据刷新中...', 'info');
    
    setTimeout(() => {
        // 更新时间
        const now = new Date();
        const timeStr = now.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).replace(/\//g, '-');
        
        document.querySelector('.sync-info').textContent = `最近同步：${timeStr}`;
        showToast('数据已刷新', 'success');
        console.log('[埋点] 数据刷新');
    }, 800);
}

// ===== 下钻 =====
function drillDown(dimension, value) {
    console.log(`[埋点] 下钻: dimension=${dimension}, value=${value}`);
    
    // 切换到明细页并带入条件
    switchTab('detail');
    
    // 模拟带入筛选条件
    setTimeout(() => {
        showToast(`已切换至明细页，已自动筛选: ${value}`, 'success');
    }, 300);
}

// ===== 详情抽屉 =====
function showDetailDrawer(refundNo) {
    const overlay = document.getElementById('detail-drawer-overlay');
    const drawer = document.getElementById('detail-drawer');
    
    overlay.classList.add('active');
    drawer.classList.add('active');
    
    // 禁止背景滚动
    document.body.style.overflow = 'hidden';
    
    console.log(`[埋点] 查看详情: refundNo=${refundNo}`);
}

function closeDetailDrawer() {
    const overlay = document.getElementById('detail-drawer-overlay');
    const drawer = document.getElementById('detail-drawer');
    
    overlay.classList.remove('active');
    drawer.classList.remove('active');
    
    // 恢复背景滚动
    document.body.style.overflow = '';
}

// ===== 导出任务抽屉 =====
function showExportTaskDrawer() {
    const overlay = document.getElementById('export-drawer-overlay');
    const drawer = document.getElementById('export-drawer');
    
    overlay.classList.add('active');
    drawer.classList.add('active');
    
    document.body.style.overflow = 'hidden';
    
    console.log('[埋点] 查看导出任务');
}

function closeExportDrawer() {
    const overlay = document.getElementById('export-drawer-overlay');
    const drawer = document.getElementById('export-drawer');
    
    overlay.classList.remove('active');
    drawer.classList.remove('active');
    
    document.body.style.overflow = '';
}

function retryExport(taskId) {
    showToast(`正在重试任务: ${taskId}`, 'info');
    console.log(`[埋点] 导出重试: taskId=${taskId}`);
}

// ===== 导出 =====
function handleExport() {
    const modalOverlay = document.getElementById('export-modal-overlay');
    const modal = document.getElementById('export-modal');
    
    modalOverlay.classList.add('active');
    modal.classList.add('active');
    
    console.log('[埋点] 打开导出确认');
}

function closeExportModal() {
    const modalOverlay = document.getElementById('export-modal-overlay');
    const modal = document.getElementById('export-modal');
    
    modalOverlay.classList.remove('active');
    modal.classList.remove('active');
}

function confirmExport() {
    closeExportModal();
    showToast('导出任务已创建，请至「导出任务」查看进度', 'success');
    console.log('[埋点] 确认导出');
}

// ===== 列管理 =====
function showColumnManager() {
    const modalOverlay = document.getElementById('column-modal-overlay');
    const modal = document.getElementById('column-modal');
    
    modalOverlay.classList.add('active');
    modal.classList.add('active');
    
    console.log('[埋点] 打开列管理');
}

function closeColumnManager() {
    const modalOverlay = document.getElementById('column-modal-overlay');
    const modal = document.getElementById('column-modal');
    
    modalOverlay.classList.remove('active');
    modal.classList.remove('active');
}

function saveColumnSettings() {
    closeColumnManager();
    showToast('列设置已保存', 'success');
    console.log('[埋点] 保存列设置');
}

// ===== 表格选择 =====
function toggleSelectAll(checkbox) {
    const table = checkbox.closest('table');
    const rowCheckboxes = table.querySelectorAll('tbody input[type="checkbox"]');
    
    rowCheckboxes.forEach(cb => {
        cb.checked = checkbox.checked;
    });
    
    updateSelection();
}

function updateSelection() {
    const checkboxes = document.querySelectorAll('.detail-table tbody input[type="checkbox"]:checked');
    const selectedCount = checkboxes.length;
    const batchActions = document.getElementById('batch-actions');
    const countEl = document.getElementById('selected-count');
    
    if (countEl) countEl.textContent = selectedCount;
    
    if (batchActions) {
        batchActions.style.display = selectedCount > 0 ? 'flex' : 'none';
    }
}

// ===== Toast 提示 =====
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    
    toast.textContent = message;
    toast.classList.add('active');
    
    // 根据类型设置颜色
    const colors = {
        info: '#262626',
        success: '#52c41a',
        warning: '#faad14',
        error: '#ff4d4f'
    };
    toast.style.background = colors[type] || colors.info;
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// ===== 键盘事件 =====
document.addEventListener('keydown', function(e) {
    // ESC 关闭抽屉/弹窗
    if (e.key === 'Escape') {
        closeDetailDrawer();
        closeExportDrawer();
        closeExportModal();
        closeColumnManager();
    }
});

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('[系统] 退款报表原型已加载');
    console.log('[系统] 当前角色: 运营专员（运营角色）');
    
    // 模拟首屏加载
    setTimeout(() => {
        console.log('[系统] 首屏数据加载完成');
    }, 500);
});

// ===== 分析卡片 Tab 切换（平台/站点/组合等） =====
document.querySelectorAll('.card-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const parent = this.closest('.card-header');
        parent.querySelectorAll('.card-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        const cardTitle = parent.querySelector('h3').textContent;
        console.log(`[埋点] 卡片Tab切换: ${cardTitle} -> ${this.textContent}`);
    });
});
