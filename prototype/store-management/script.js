// 店铺管理原型交互脚本
(function() {
  'use strict';

  var selectedIds = new Set();
  var activePlatform = '全部平台';
  var currentStore = null;
  var sensitiveUnlocked = false;
  var filteredStores = window.STORE_DATA.slice();
  var editOrigin = 'table';
  var pendingShopeeAssets = [];
  var pendingShopeeSourceStore = null;

  function $(id) {
    return document.getElementById(id);
  }

  function value(id) {
    var el = $(id);
    return el ? el.value.trim() : '';
  }

  function syncSelect(id) {
    var el = $(id);
    if (el && el.tagName === 'SELECT') el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function toast(msg, type) {
    var el = document.createElement('div');
    el.className = 'toast ' + (type || 'success');
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(function(){ el.remove(); }, 2500);
  }

  function formatNow() {
    return new Date().toISOString().slice(0,16).replace('T',' ');
  }

  function nextYear() {
    var d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    return d.toISOString().slice(0,16).replace('T',' ');
  }

  function tagForAuth(status) {
    return window.AUTH_STATUS_MAP[status] || { tag: 'tag-gray', text: status || '未授权' };
  }

  function tagHtml(text, cls) {
    return '<span class="tag ' + (cls || '') + '">' + (text || '—') + '</span>';
  }

  function normalizeStore(store) {
    if (!store.storeEmail) store.storeEmail = store.platform === 'TikTok Shop' ? 'tiktok-store@yiyihe.com' : '';
    if (!store.paymentAccounts) {
      store.paymentAccounts = store.fundPlatform ? [{
        platform: store.fundPlatform,
        account: store.fundAccount || '—',
        accountRaw: store.fundAccountRaw || store.fundAccount || '',
        accountId: store.fundAccountId || '',
        currency: store.platform === 'Amazon' ? 'USD' : 'USD'
      }] : [];
    }
    if (!store.bodyChangeRecords) store.bodyChangeRecords = [];
    if (!store.paymentChangeRecords) store.paymentChangeRecords = [];
    if (!store.permissions) store.permissions = ['订单查看'];
    if (!store.adAccountId) store.adAccountId = '';
    if (!store.bcId) store.bcId = '';
    if (!('adSyncSetting' in store)) store.adSyncSetting = null;
    if (!store.authCallbackCode) store.authCallbackCode = store.authStatus === '已授权' ? 'code_******' : '—';
    if (!store.tokenStatus) store.tokenStatus = store.authStatus === '已授权' ? 'access_token / refresh_token 已写入' : '未写入';
    if (!store.childStores && store.relatedStores && store.relatedStores.length) {
      store.childStores = store.relatedStores.map(function(name, index) {
        return { alias: name, site: index === 0 ? '马来西亚' : '泰国', authStatus: '成功' };
      });
    }
  }

  function canShowAuthAction(store) {
    return ['未授权', '已过期', '即将过期'].indexOf(store.authStatus) >= 0;
  }

  function getRelatedChildren(store) {
    normalizeStore(store);
    if (store.childStores && store.childStores.length) return store.childStores;
    if (!store.mainAccountId) return [];
    return window.STORE_DATA.filter(function(item) {
      return item.parentMainAccountId && item.parentMainAccountId === store.mainAccountId;
    }).map(function(item) {
      return { alias: item.alias, site: item.site, authStatus: item.authStatus === '已授权' ? '成功' : item.authStatus, storeId: item.id };
    });
  }

  function isShopeeMainStore(store) {
    return store.platform === 'Shopee' && (store.relationRole === 'main' || getRelatedChildren(store).length > 0);
  }

  function shouldUseMainAccountAuth(store) {
    if (!store || store.platform !== 'Shopee') return false;
    return store.authType === 'main_account' || ['跨境店（CNSC）', '3PF', 'KRSC'].indexOf(store.storeType) >= 0 || isShopeeMainStore(store);
  }

  function applyFilters() {
    var keyword = value('filterKeyword').toLowerCase();
    var body = $('filterBody').value;
    var site = $('filterSite').value;
    var status = $('filterStatus').value;
    var auth = $('filterAuth').value;
    var operator = value('filterOperator');
    var isMain = $('filterMainAccount').value;
    var isSip = $('filterSip').value;
    var platformType = $('filterPlatformType').value;
    var bu = $('filterBU').value;

    filteredStores = window.STORE_DATA.filter(function(s) {
      var text = [s.name, s.alias, s.subName, s.platformShopName].join(' ').toLowerCase();
      if (activePlatform !== '全部平台' && s.platform !== activePlatform) return false;
      if (keyword && text.indexOf(keyword) === -1) return false;
      if (body !== '全部' && s.body !== body) return false;
      if (site !== '全部' && s.site !== site) return false;
      if (status !== '全部' && s.status !== status) return false;
      if (auth !== '全部' && s.authStatus !== auth) return false;
      if (operator && s.operator.indexOf(operator) === -1) return false;
      if (isMain !== '全部' && (s.mainAccountId ? '是' : '否') !== isMain) return false;
      if (isSip !== '全部' && (s.isSip ? '是' : '否') !== isSip) return false;
      if (platformType !== '全部' && s.platformStoreType !== platformType) return false;
      if (bu !== '全部' && s.bu !== bu) return false;
      return true;
    });
  }

  function renderTable() {
    applyFilters();
    var tbody = $('storeTableBody');
    var rows = '';
    filteredStores.forEach(function(s) {
      var authTag = tagForAuth(s.authStatus);
      var statusTag = s.status === '启用' ? 'tag-green' : 'tag-gray';
      var checked = selectedIds.has(s.id) ? 'checked' : '';
      var authActionText = canShowAuthAction(s) ? '授权' : '重授权';
      var childStores = s.platform === 'Shopee' ? getRelatedChildren(s) : [];
      var childCountHtml = isShopeeMainStore(s)
        ? '<button class="table-inline-link" data-op="子店铺" data-id="' + s.id + '" type="button">' + childStores.length + '</button>'
        : '—';
      var opsHtml =
        '<button class="table-action-link" data-op="详情" data-id="' + s.id + '" type="button">详情</button>' +
        '<button class="table-action-link" data-op="编辑" data-id="' + s.id + '" type="button">编辑</button>' +
        '<button class="table-action-link" data-op="授权" data-id="' + s.id + '" type="button">' + authActionText + '</button>' +
        '<button class="table-action-more" data-op="更多" data-id="' + s.id + '" type="button">更多 ▾</button>';
      var shopeeExt = '—';
      if (s.platform === 'Shopee') {
        if (s.relationRole === 'child') shopeeExt = '子店铺 / ' + (s.isSip ? '是' : '否');
        else if (isShopeeMainStore(s)) shopeeExt = '主账号 / ' + (s.isSip ? '是' : '否');
        else shopeeExt = (s.mainAccountId ? '主账号' : '否') + ' / ' + (s.isSip ? '是' : '否');
      }

      rows += '<tr>';
      rows += '<td class="col-check"><input type="checkbox" class="row-checkbox" data-id="' + s.id + '" ' + checked + ' /></td>';
      rows += '<td class="col-name" title="' + (s.name || '—') + '">' + (s.name || '—') + '</td>';
      rows += '<td class="col-alias">' + (s.alias || '—') + '</td>';
      rows += '<td class="col-body" title="' + (s.body || '—') + '">' + (s.body || '—') + '</td>';
      rows += '<td class="col-site">' + tagHtml(s.site) + '</td>';
      rows += '<td class="col-region platform-col platform-amazon">' + (s.platform === 'Amazon' ? (s.region || '—') : '—') + '</td>';
      rows += '<td class="col-type">' + (s.storeType || '—') + '</td>';
      rows += '<td class="col-platform-type">' + (s.platformStoreType || '—') + '</td>';
      rows += '<td class="col-sub platform-col platform-shopee">' + (s.platform === 'Shopee' ? (s.subName || '—') : '—') + '</td>';
      rows += '<td class="col-shopee-ext platform-col platform-shopee">' + shopeeExt + '</td>';
      rows += '<td class="col-child-count platform-col platform-shopee">' + childCountHtml + '</td>';
      rows += '<td class="col-ad-account platform-col platform-tiktok">' + (s.platform === 'TikTok Shop' ? (s.adAccountId || '—') : '—') + '</td>';
      rows += '<td class="col-bc-id platform-col platform-tiktok">' + (s.platform === 'TikTok Shop' ? (s.bcId || '—') : '—') + '</td>';
      rows += '<td class="col-bu">' + (s.bu || '—') + '</td>';
      rows += '<td class="col-status">' + tagHtml(s.status, statusTag) + '</td>';
      rows += '<td class="col-auth">' + tagHtml(authTag.text, authTag.tag) + '</td>';
      rows += '<td class="col-auth-time">' + (s.authTime || '—') + '</td>';
      rows += '<td class="col-expire">' + (s.authExpire || '—') + '</td>';
      rows += '<td class="col-sync">' + (s.syncOrderTime || '—') + '</td>';
      rows += '<td class="col-ops">' + (s.operator || '—') + ' / ' + (s.cs || '—') + '</td>';
      rows += '<td class="col-actions"><div class="cell-actions">' + opsHtml + '</div></td>';
      rows += '</tr>';
    });
    tbody.innerHTML = rows || '<tr><td colspan="21" class="empty-cell">暂无符合条件的店铺</td></tr>';
    applyPlatformColumns();
    $('totalCount').textContent = filteredStores.length;
    $('selectedCount').textContent = '已选 ' + selectedIds.size + ' 项';
    $('btnBatchDelete').disabled = selectedIds.size === 0;
    $('btnBatchDownloadPayment').disabled = selectedIds.size === 0;
  }

  function applyPlatformColumns() {
    var showShopee = activePlatform === 'Shopee';
    var showAmazon = activePlatform === 'Amazon';
    var showTiktok = activePlatform === 'TikTok Shop';
    document.querySelectorAll('.platform-shopee').forEach(function(el){ el.classList.toggle('is-hidden-col', !showShopee); });
    document.querySelectorAll('.platform-amazon').forEach(function(el){ el.classList.toggle('is-hidden-col', !showAmazon); });
    document.querySelectorAll('.platform-tiktok').forEach(function(el){ el.classList.toggle('is-hidden-col', !showTiktok); });
  }

  function bindTabs() {
    document.querySelectorAll('.platform-tab').forEach(function(tab) {
      tab.addEventListener('click', function() {
        document.querySelectorAll('.platform-tab').forEach(function(t){ t.classList.remove('active'); });
        tab.classList.add('active');
        activePlatform = tab.textContent.trim().replace(/\s*\(\d+\)$/, '');
        if (activePlatform === '全部') activePlatform = '全部平台';
        if (activePlatform === '其他平台') activePlatform = '其他平台';
        renderTable();
      });
    });
  }

  function enhanceSelects() {
    document.querySelectorAll('select.ant-select').forEach(function(select) {
      if (select.dataset.enhanced === 'true') return;
      select.dataset.enhanced = 'true';
      select.classList.add('native-hidden');

      var shell = document.createElement('div');
      shell.className = 'ant-select-shell';
      var trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'ant-select-trigger';
      var popup = document.createElement('div');
      popup.className = 'ant-select-popup';
      popup.hidden = true;

      function syncTrigger() {
        var option = select.options[select.selectedIndex];
        trigger.textContent = option ? option.textContent : '';
      }

      function renderOptions() {
        popup.innerHTML = '';
        Array.from(select.options).forEach(function(option) {
          var item = document.createElement('div');
          item.className = 'ant-select-option' + (option.value === select.value ? ' selected' : '');
          item.textContent = option.textContent;
          item.dataset.value = option.value;
          item.addEventListener('click', function() {
            select.value = option.value;
            select.dispatchEvent(new Event('change', { bubbles: true }));
            syncTrigger();
            renderOptions();
            closePopup();
          });
          popup.appendChild(item);
        });
      }

      function closePopup() {
        popup.hidden = true;
        trigger.classList.remove('open');
      }

      trigger.addEventListener('click', function(e) {
        e.stopPropagation();
        document.querySelectorAll('.ant-select-popup').forEach(function(other) {
          if (other !== popup) other.hidden = true;
        });
        document.querySelectorAll('.ant-select-trigger.open').forEach(function(other) {
          if (other !== trigger) other.classList.remove('open');
        });
        popup.hidden = !popup.hidden;
        trigger.classList.toggle('open', !popup.hidden);
      });
      select.addEventListener('change', function() {
        syncTrigger();
        renderOptions();
      });

      select.parentNode.insertBefore(shell, select.nextSibling);
      shell.appendChild(trigger);
      shell.appendChild(popup);
      syncTrigger();
      renderOptions();
    });

    document.addEventListener('click', function() {
      document.querySelectorAll('.ant-select-popup').forEach(function(popup) { popup.hidden = true; });
      document.querySelectorAll('.ant-select-trigger.open').forEach(function(trigger) { trigger.classList.remove('open'); });
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.ant-select-popup').forEach(function(popup) { popup.hidden = true; });
        document.querySelectorAll('.ant-select-trigger.open').forEach(function(trigger) { trigger.classList.remove('open'); });
      }
    });
  }

  function bindFilters() {
    $('btnSearch').addEventListener('click', renderTable);
    $('btnReset').addEventListener('click', function() {
      ['filterKeyword','filterOperator'].forEach(function(id){ $(id).value = ''; });
      ['filterBody','filterSite','filterStatus','filterAuth','filterMainAccount','filterSip','filterPlatformType','filterBU'].forEach(function(id){ $(id).value = '全部'; });
      ['filterBody','filterSite','filterStatus','filterAuth','filterMainAccount','filterSip','filterPlatformType','filterBU'].forEach(syncSelect);
      renderTable();
    });
    $('btnToggleAdvanced').addEventListener('click', function() {
      var fields = document.querySelectorAll('.advanced-field');
      var shouldShow = fields[0].hidden;
      fields.forEach(function(el){ el.hidden = !shouldShow; });
      this.textContent = shouldShow ? '收起高级筛选' : '展开高级筛选';
    });
  }

  function bindSelection() {
    $('selectAll').addEventListener('change', function() {
      if (this.checked) {
        filteredStores.forEach(function(s){ selectedIds.add(s.id); });
      } else {
        filteredStores.forEach(function(s){ selectedIds.delete(s.id); });
      }
      renderTable();
    });

    $('storeTableBody').addEventListener('change', function(e) {
      if (!e.target.classList.contains('row-checkbox')) return;
      var id = parseInt(e.target.dataset.id, 10);
      if (e.target.checked) selectedIds.add(id);
      else selectedIds.delete(id);
      $('selectedCount').textContent = '已选 ' + selectedIds.size + ' 项';
      $('btnBatchDelete').disabled = selectedIds.size === 0;
      $('btnBatchDownloadPayment').disabled = selectedIds.size === 0;
    });
  }

  function bindRowActions() {
    $('storeTableBody').addEventListener('click', function(e) {
      var btn = e.target.closest('[data-op]');
      if (!btn) return;
      e.stopPropagation();
      var store = window.STORE_DATA.find(function(s){ return s.id === parseInt(btn.dataset.id, 10); });
      if (!store) return;
      if (btn.dataset.op === '详情') openDetail(store);
      if (btn.dataset.op === '编辑') {
        openEditBasic(store, 'table');
      }
      if (btn.dataset.op === '授权') openReAuth(store);
      if (btn.dataset.op === '子店铺') openChildStores(store);
      if (btn.dataset.op === '更多') openRowMoreMenu(btn, store);
    });
    document.addEventListener('click', closeActionMenu);
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeActionMenu();
    });
  }

  function openChildStores(store) {
    var children = getRelatedChildren(store);
    $('drawerChildStores').hidden = false;
    $('childParentAlias').textContent = store.alias || store.name || '—';
    $('childStoreSummary').textContent = '当前全球店主账号共关联 ' + children.length + ' 个子店铺，子店铺的授权 Token 随主账号统一刷新。';
    $('childStoreRows').innerHTML = children.length ? children.map(function(child) {
      return '<tr>' +
        '<td><strong>' + escapeHtml(child.alias || '—') + '</strong></td>' +
        '<td>' + tagHtml(child.site || '—', 'tag-blue') + '</td>' +
        '<td><span class="status-dot"></span> ' + (child.authStatus || '成功') + '</td>' +
        '<td><button class="table-action-link" type="button">详情</button></td>' +
      '</tr>';
    }).join('') : '<tr><td colspan="4" class="empty-cell">暂无关联子店铺</td></tr>';
  }

  function closeActionMenu() {
    var menu = $('rowActionMenu');
    if (menu) menu.remove();
  }

  function openRowMoreMenu(anchor, store) {
    closeActionMenu();
    var menu = document.createElement('div');
    menu.id = 'rowActionMenu';
    menu.className = 'row-action-menu';
    menu.innerHTML =
      '<button data-menu-op="ad-auth" type="button">广告授权/设置</button>' +
      '<button data-menu-op="affiliate-auth" type="button">联盟授权</button>' +
      '<button data-menu-op="download-payment" type="button">下载收款信息</button>' +
      '<button data-menu-op="sync-setting" type="button">同步设置</button>' +
      '<button data-menu-op="log" type="button">查看操作日志</button>' +
      '<button data-menu-op="delete" class="danger" type="button">删除</button>';
    document.body.appendChild(menu);

    var rect = anchor.getBoundingClientRect();
    menu.style.top = Math.min(rect.bottom + 6, window.innerHeight - menu.offsetHeight - 12) + 'px';
    menu.style.left = Math.max(12, rect.right - menu.offsetWidth) + 'px';

    menu.addEventListener('click', function(e) {
      var item = e.target.closest('[data-menu-op]');
      if (!item) return;
      handleMoreAction(item.dataset.menuOp, store);
      closeActionMenu();
    });
  }

  function handleMoreAction(op, store) {
    currentStore = store;
    normalizeStore(store);
    if (op === 'ad-auth') {
      if (store.platform === 'TikTok Shop') {
        store.adAuthStatus = '已授权';
        openAdSyncModal();
        toast('广告授权成功，请设置广告数据更新时段');
      } else {
        toast('当前平台暂无广告授权配置');
      }
      return;
    }
    if (op === 'affiliate-auth') {
      store.affiliateAuthStatus = '已授权';
      toast('联盟授权成功');
      return;
    }
    if (op === 'download-payment') {
      downloadPaymentInfo([store]);
      return;
    }
    if (op === 'sync-setting') {
      toast('同步设置包含订单同步、库存同步与广告数据更新频率');
      return;
    }
    if (op === 'log') {
      openDetail(store);
      activateDetailTab('log');
      return;
    }
    if (op === 'delete') {
      var confirmed = confirm('确认删除店铺「' + (store.alias || store.name) + '」吗？\n\n删除后仅移除 ERP 店铺记录，不会取消平台授权。');
      if (!confirmed) return;
      window.STORE_DATA = window.STORE_DATA.filter(function(s){ return s.id !== store.id; });
      selectedIds.delete(store.id);
      renderTable();
      toast('店铺记录已删除');
    }
  }

  function bindCreateStore() {
    $('btnAddStore').addEventListener('click', function() {
      $('modalAddStore').hidden = false;
      $('inputNickname').value = '';
      $('inputStoreEmail').value = '';
      $('selectStoreType').value = 'local';
      $('selectAuthSite').value = 'MY';
      syncSelect('selectStoreType');
      syncSelect('selectAuthSite');
    });
    $('btnCloseAddStore').addEventListener('click', function(){ $('modalAddStore').hidden = true; });
    $('btnCancelAddStore').addEventListener('click', function(){ $('modalAddStore').hidden = true; });

    $('btnGoAuth').addEventListener('click', function() {
      var nickname = value('inputNickname');
      if (!nickname) {
        toast('请填写店铺昵称', 'error');
        return;
      }
      var storeType = $('selectStoreType').value;
      var site = $('selectAuthSite').value;
      var typeLabel = { local:'本土店', cnsc:'跨境店（CNSC）', '3pf':'3PF', krsc:'KRSC' }[storeType];
      var isGlobalAuth = storeType !== 'local';
      var confirmed = confirm(
        '即将跳转到 Shopee 店铺授权地址。\n\n' +
        '店铺昵称：' + nickname + '\n' +
        '店铺类型：' + typeLabel + '\n\n' +
        (isGlobalAuth
          ? '请使用 Shopee 主账号登录，勾选 Auth Merchant 与需要授权的站点店铺。授权成功后系统会要求为主账号和子店铺补充系统别名。'
          : '请使用 Shopee 店铺账号登录并确认授权。授权成功后系统会按当前录入信息创建店铺。') +
        '\n\n点击确定模拟跳转授权并返回系统。'
      );
      if (!confirmed) return;

      if (isGlobalAuth) {
        openShopeeAuthResult(nickname, typeLabel, storeType, null);
        return;
      }

      var created = [createShopeeStore(nickname, typeLabel, 'shop_account', site, null, false, 'Shopee_' + site + '_Shop', '普通店铺')];
      window.STORE_DATA = created.concat(window.STORE_DATA);
      $('modalAddStore').hidden = true;
      renderTable();
      toast('Shopee 授权成功，已按录入信息创建店铺', 'success');
    });

    $('btnCloseShopeeAuthResult').addEventListener('click', closeShopeeAuthResult);
    $('btnCancelShopeeAuthResult').addEventListener('click', closeShopeeAuthResult);
    $('btnConfirmShopeeAuthResult').addEventListener('click', confirmShopeeAuthResult);
    $('btnCloseChildStores').addEventListener('click', function(){ $('drawerChildStores').hidden = true; });
  }

  function openShopeeAuthResult(nickname, typeLabel, storeType, sourceStore) {
    var isSip = storeType === '3pf' || storeType === '3PF';
    pendingShopeeSourceStore = sourceStore || null;
    var mainAccountId = sourceStore && sourceStore.mainAccountId ? sourceStore.mainAccountId : 'main_acct_10888:main';
    var mainPlatformName = sourceStore && sourceStore.platformShopName ? sourceStore.platformShopName : 'YYH_Global_Main';
    var mainAlias = sourceStore && sourceStore.alias ? sourceStore.alias : nickname;
    pendingShopeeAssets = [
      { platformName: mainPlatformName, site: '全球', role: '主账号', alias: mainAlias, typeLabel: typeLabel, authType: 'main_account', mainAccountId: mainAccountId, isSip: isSip },
      { platformName: 'YYH_SG_Shop', site: '新加坡', role: '子店铺', alias: '', typeLabel: typeLabel, authType: 'main_account', mainAccountId: mainAccountId, isSip: isSip },
      { platformName: 'YYH_PH_Shop', site: '菲律宾', role: '子店铺', alias: '', typeLabel: typeLabel, authType: 'main_account', mainAccountId: mainAccountId, isSip: isSip }
    ];
    $('modalAddStore').hidden = true;
    $('modalReAuth').hidden = true;
    $('drawerDetail').hidden = true;
    $('modalShopeeAuthResult').hidden = false;
    $('aliasError').hidden = true;
    $('shopeeAssetCount').textContent = pendingShopeeAssets.length;
    renderShopeeAuthRows();
  }

  function renderShopeeAuthRows() {
    $('shopeeAuthAssetRows').innerHTML = pendingShopeeAssets.map(function(asset, index) {
      return '<tr>' +
        '<td><strong>' + asset.platformName + '</strong> <span class="tag ' + (asset.role === '主账号' ? 'tag-blue' : 'tag-gray') + '">' + asset.role + '</span></td>' +
        '<td><span class="tag tag-blue">' + asset.site + '</span></td>' +
        '<td><input class="form-input alias-input" data-index="' + index + '" value="' + escapeHtml(asset.alias || '') + '" placeholder="如：云易盒全球店" /></td>' +
      '</tr>';
    }).join('');
  }

  function closeShopeeAuthResult() {
    $('modalShopeeAuthResult').hidden = true;
    pendingShopeeAssets = [];
    pendingShopeeSourceStore = null;
    toast('已取消本次 Shopee 授权录入');
  }

  function confirmShopeeAuthResult() {
    var hasMissing = false;
    document.querySelectorAll('.alias-input').forEach(function(input) {
      var alias = input.value.trim();
      pendingShopeeAssets[Number(input.dataset.index)].alias = alias;
      input.classList.toggle('input-error', !alias);
      if (!alias) hasMissing = true;
    });
    $('aliasError').hidden = !hasMissing;
    if (hasMissing) {
      toast('请先补充所有店铺系统别名', 'error');
      return;
    }
    var mainAsset = pendingShopeeAssets.find(function(asset) { return asset.role === '主账号'; });
    var childAssets = pendingShopeeAssets.filter(function(asset) { return asset.role === '子店铺'; });
    var mainStore = pendingShopeeSourceStore || createShopeeStore(mainAsset.alias, mainAsset.typeLabel, mainAsset.authType, mainAsset.site, mainAsset.mainAccountId, mainAsset.isSip, mainAsset.platformName, mainAsset.role);
    mainStore.alias = mainAsset.alias;
    mainStore.storeType = mainAsset.typeLabel;
    mainStore.authType = mainAsset.authType;
    mainStore.mainAccountId = mainAsset.mainAccountId;
    mainStore.platformShopName = mainAsset.platformName;
    mainStore.authStatus = '已授权';
    mainStore.authTime = formatNow();
    mainStore.authExpire = nextYear();
    mainStore.syncOrderTime = formatNow();
    mainStore.authCallbackCode = 'code_' + Math.floor(100000 + Math.random() * 900000);
    mainStore.tokenStatus = 'access_token / refresh_token 已写入';
    mainStore.relationRole = 'main';
    mainStore.childStores = childAssets.map(function(asset) {
      return { alias: asset.alias, site: asset.site, authStatus: '成功' };
    });
    mainStore.relatedStores = childAssets.map(function(asset) { return asset.alias; });
    mainStore.unrecordedStores = 0;
    var childStores = childAssets.map(function(asset) {
      var childStore = createShopeeStore(asset.alias, asset.typeLabel, asset.authType, asset.site, null, asset.isSip, asset.platformName, asset.role);
      childStore.relationRole = 'child';
      childStore.parentMainAccountId = mainAsset.mainAccountId;
      childStore.parentAlias = mainAsset.alias;
      childStore.relatedStores = [];
      childStore.unrecordedStores = 0;
      return childStore;
    });
    var created = pendingShopeeSourceStore ? childStores : [mainStore].concat(childStores);
    window.STORE_DATA = created.concat(window.STORE_DATA);
    $('modalShopeeAuthResult').hidden = true;
    pendingShopeeAssets = [];
    pendingShopeeSourceStore = null;
    renderTable();
    toast('Shopee 授权成功，已录入 ' + (childStores.length + 1) + ' 个店铺资产');
  }

  function createShopeeStore(alias, storeType, authType, site, mainAccountId, isSip, platformName, role) {
    var maxId = Math.max.apply(null, window.STORE_DATA.map(function(s){ return s.id; }));
    var now = formatNow();
    return {
      id: maxId + Math.floor(Math.random() * 10000) + 1,
      platform: 'Shopee',
      name: 'Shopee ' + site + ' Store',
      alias: alias,
      body: '云易盒科技有限公司',
      subName: role === '子店铺' ? platformName : '—',
      site: site,
      region: '',
      storeType: storeType,
      platformStoreType: '普通店铺',
      bu: $('selectBU').value,
      status: '启用',
      authStatus: '已授权',
      authTime: now,
      authExpire: nextYear(),
      authType: authType,
      mainAccountId: mainAccountId,
      isSip: !!isSip,
      syncOrderTime: now,
      operator: $('selectOperator').value.indexOf('不指定') === 0 ? '待分配' : $('selectOperator').value,
      cs: $('selectCS').value.indexOf('不指定') === 0 ? '待分配' : $('selectCS').value,
      platformShopId: String(40000 + Math.floor(Math.random()*10000)),
      platformShopName: platformName || ('Shop ' + site),
      merchantId: mainAccountId ? 'merchant_' + (1000000 + Math.floor(Math.random()*100000)) : null,
      useStatus: '正常使用',
      enabled: true,
      cancelDate: null,
      dept: $('selectBU').value,
      owner: '待分配',
      browserName: '',
      browserStoreName: '',
      accountType: '',
      registrationType: '',
      registrationCompany: '云易盒科技有限公司',
      registrationDate: '',
      fundPlatform: '',
      fundAccount: '',
      fundAccountRaw: '',
      fundAccountId: '',
      aeFreightAlipay: '',
      hasDeposit: false,
      depositRefundStatus: '无需退回',
      depositAccount: '',
      depositAccountRaw: '',
      depositAmount: '',
      depositRefundTime: '',
      depositRefundTransactionId: '',
      remarks: '授权后自动录入。',
      adAuthStatus: '未授权',
      affiliateAuthStatus: '未授权',
      relatedStores: [],
      unrecordedStores: 0,
      storeEmail: value('inputStoreEmail'),
      adAccountId: '',
      bcId: '',
      paymentAccounts: [],
      bodyChangeRecords: [],
      paymentChangeRecords: [],
      permissions: Array.from(document.querySelectorAll('.permission-check:checked')).map(function(el){ return el.value; }),
      adSyncSetting: null,
      authCallbackCode: 'code_' + Math.floor(100000 + Math.random() * 900000),
      tokenStatus: 'access_token / refresh_token 已写入',
      ops: ['详情', '编辑', '授权', '更多']
    };
  }

  function renderSensitive(store) {
    renderPaymentList(store);
    var ae = $('aeFreightAlipay');
    if (ae) ae.textContent = sensitiveUnlocked ? (store.aeFreightAlipay || '—') : (store.aeFreightAlipay ? '**** ****' : '—');
    $('depositAccount').textContent = sensitiveUnlocked ? (store.depositAccountRaw || '—') : (store.depositAccount || '—');
    $('sensitiveBar').textContent = sensitiveUnlocked ? '当前已解锁资金信息查看权限' : '当前为脱敏查看模式';
    $('sensitiveBar').classList.toggle('unlocked', sensitiveUnlocked);
    $('btnUnlockSensitive').hidden = sensitiveUnlocked;
    $('btnLockSensitive').hidden = !sensitiveUnlocked;
  }

  function renderPaymentList(store) {
    var accounts = store.paymentAccounts || [];
    $('paymentList').innerHTML = accounts.length ? accounts.map(function(account, index) {
      var accountText = sensitiveUnlocked ? (account.accountRaw || account.account || '—') : (account.account || maskAccount(account.accountRaw));
      return '<div class="payment-item">' +
        '<strong>' + (account.platform || '—') + '</strong>' +
        '<span class="sensitive-value">' + accountText + '</span>' +
        '<span>' + (account.accountId || '—') + '</span>' +
        '<span class="tag">' + (account.currency || 'USD') + '</span>' +
      '</div>';
    }).join('') : '<div class="payment-item"><span>暂无收款账号</span></div>';
  }

  function maskAccount(raw) {
    if (!raw) return '—';
    return '**** **** ' + raw.slice(-4);
  }

  function renderRecords(id, records, emptyText) {
    $(id).innerHTML = records && records.length ? '<div class="record-list">' + records.map(function(record) {
      var content = record.content || ((record.from || '—') + ' → ' + (record.to || '—'));
      return '<div class="record-item"><strong>' + record.time + ' · ' + record.operator + '</strong>' + content + '</div>';
    }).join('') + '</div>' : '<div class="record-item">' + emptyText + '</div>';
  }

  function openDetail(store) {
    normalizeStore(store);
    currentStore = store;
    sensitiveUnlocked = false;
    $('drawerDetail').hidden = false;
    $('detailName').textContent = store.name || '—';
    $('detailSite').textContent = store.site || '—';
    $('detailPlatform').textContent = store.platform || '—';

    var statusTag = $('detailStatus');
    statusTag.textContent = store.status || '—';
    statusTag.className = 'tag ' + (store.status === '启用' ? 'tag-green' : 'tag-gray');

    var authInfo = tagForAuth(store.authStatus);
    var authTag = $('detailAuthStatus');
    authTag.textContent = authInfo.text;
    authTag.className = 'tag ' + authInfo.tag;

    $('basicAlias').textContent = store.alias || '—';
    $('basicShopId').textContent = store.platformShopId || '—';
    $('basicShopName').textContent = store.platformShopName || '—';
    $('basicBody').textContent = store.body || '—';
    $('basicEmail').textContent = store.storeEmail || '—';
    $('basicSite').textContent = store.site || '—';
    $('basicType').textContent = store.storeType || '—';
    $('basicMainAcct').textContent = store.mainAccountId || '否';
    $('basicSip').textContent = store.isSip ? '是' : '否';
    $('basicAdAccountId').textContent = store.platform === 'TikTok Shop' ? (store.adAccountId || '—') : '—';
    $('basicBcId').textContent = store.platform === 'TikTok Shop' ? (store.bcId || '—') : '—';
    $('basicBrowserName').textContent = store.browserName || '—';
    $('basicBrowserStore').textContent = store.browserStoreName || '—';
    $('basicAccountType').textContent = store.accountType || '—';
    $('basicRegistrationType').textContent = store.registrationType || '—';
    $('basicRegistrationCompany').textContent = store.registrationCompany || '—';
    $('basicRegistrationDate').textContent = store.registrationDate || '—';

    $('bizDept').textContent = store.dept || '—';
    $('bizOwner').textContent = store.owner || '—';
    $('bizUseStatus').textContent = store.useStatus || '—';
    $('bizEnabled').textContent = store.enabled ? '是' : '否';
    $('bizCancelDate').textContent = store.cancelDate || '—';
    $('bizOperator').textContent = store.operator || '—';
    $('bizCs').textContent = store.cs || '—';
    $('bizBu').textContent = store.bu || '—';
    $('depositHas').textContent = store.hasDeposit ? '是' : '否';
    $('depositRefundStatus').textContent = store.depositRefundStatus || '—';
    $('depositAmount').textContent = store.depositAmount ? '¥' + store.depositAmount : '—';
    $('depositRefundTime').textContent = store.depositRefundTime || '—';
    $('depositRefundTransactionId').textContent = store.depositRefundTransactionId || '—';
    $('bizRemarks').textContent = store.remarks || '—';
    $('bizPermissions').textContent = (store.permissions || []).join('、') || '—';
    renderRecords('bodyChangeRecords', store.bodyChangeRecords, '暂无店铺主体变更记录');
    renderRecords('paymentChangeRecords', store.paymentChangeRecords, '暂无收款信息变更记录');
    renderSensitive(store);

    var authStatusEl = $('authStatus');
    authStatusEl.textContent = authInfo.text;
    authStatusEl.className = 'tag ' + authInfo.tag;
    $('authTime').textContent = store.authTime || '—';
    $('authExpire').textContent = store.authExpire || '—';
    $('authStoreType').textContent = store.storeType || '—';
    $('authMainAccount').textContent = store.mainAccountId || '—';
    $('authCallbackCode').textContent = store.authCallbackCode || '—';
    $('authTokenStatus').textContent = store.tokenStatus || '—';
    $('authRemain').textContent = remainDays(store.authExpire);
    $('adAuthStatus').textContent = store.adAuthStatus || '未授权';
    $('adAuthStatus').className = 'tag ' + tagForAuth(store.adAuthStatus).tag;
    $('affiliateAuthStatus').textContent = store.affiliateAuthStatus || '未授权';
    $('affiliateAuthStatus').className = 'tag ' + tagForAuth(store.affiliateAuthStatus).tag;
    $('btnAdSyncSetting').hidden = store.adAuthStatus !== '已授权';

    renderRelatedStores(store);
    activateDetailTab('basic');
  }

  function renderRelatedStores(store) {
    $('mainAccountCard').hidden = !store.mainAccountId;
    if (!store.mainAccountId) return;
    $('relatedStores').innerHTML = (store.relatedStores || []).map(function(name) {
      return '<div class="related-item"><span>' + name + '</span><span class="tag tag-green">已录入</span></div>';
    }).join('') || '<div class="related-item"><span>暂无其他已录入店铺</span></div>';
    $('unrecordedStoresTip').hidden = !store.unrecordedStores;
    $('unrecordedStoresCount').textContent = store.unrecordedStores || 0;
  }

  function remainDays(expireText) {
    if (!expireText || expireText === '—') return '—';
    var remain = Math.ceil((new Date(expireText) - new Date()) / (1000*60*60*24));
    return remain > 0 ? remain + ' 天' : '已过期';
  }

  function activateDetailTab(tabName) {
    document.querySelectorAll('.detail-tab').forEach(function(t){ t.classList.remove('active'); });
    document.querySelector('.detail-tab[data-tab="' + tabName + '"]').classList.add('active');
    document.querySelectorAll('.tab-content').forEach(function(t){ t.hidden = true; });
    $('tab' + tabName.charAt(0).toUpperCase() + tabName.slice(1)).hidden = false;
  }

  function bindDetail() {
    $('btnCloseDetail').addEventListener('click', function(){ $('drawerDetail').hidden = true; });
    document.querySelector('.detail-tabs').addEventListener('click', function(e) {
      var tab = e.target.closest('.detail-tab');
      if (tab) activateDetailTab(tab.dataset.tab);
    });
    $('btnReAuth').addEventListener('click', function(){ if (currentStore) openReAuth(currentStore); });
    $('btnCancelAuth').addEventListener('click', cancelAuth);
    $('btnDownloadPayment').addEventListener('click', function(){ downloadPaymentInfo([currentStore]); });
    $('btnAdAuth').addEventListener('click', function() {
      if (!currentStore) return;
      currentStore.adAuthStatus = '已授权';
      toast('广告授权成功，请设置广告数据更新时段');
      openDetail(currentStore);
      activateDetailTab('auth');
      openAdSyncModal();
    });
    $('btnAdSyncSetting').addEventListener('click', openAdSyncModal);
    $('btnUnlockSensitive').addEventListener('click', function() {
      if (!currentStore) return;
      var password = prompt('为保护店铺资金信息安全，请输入查阅密码后继续查看');
      if (password === null) return;
      sensitiveUnlocked = true;
      renderSensitive(currentStore);
      toast('资金信息已解锁');
    });
    $('btnLockSensitive').addEventListener('click', function() {
      sensitiveUnlocked = false;
      renderSensitive(currentStore);
      toast('资金信息已重新锁定');
    });
    $('btnEditBasic').addEventListener('click', function(){ if (currentStore) openEditBasic(currentStore, 'detail'); });
    $('btnEditBiz').addEventListener('click', function(){ if (currentStore) openEditBiz(currentStore, 'detail'); });
    $('btnBatchDownloadPayment').addEventListener('click', downloadSelectedPaymentInfo);
  }

  function openReAuth(store) {
    currentStore = store;
    if (shouldUseMainAccountAuth(store)) {
      var confirmed = confirm(
        '即将跳转到 Shopee 主账号授权地址。\n\n' +
        '店铺：' + (store.alias || store.name) + '\n' +
        '请使用主账号登录，勾选 Auth Merchant 与需要授权的子店铺。\n\n' +
        '点击确定模拟授权成功并返回系统录入。'
      );
      if (!confirmed) return;
      openShopeeAuthResult(store.alias || store.name, store.storeType || '跨境店（CNSC）', store.storeType || 'cnsc', store);
      return;
    }
    $('modalReAuth').hidden = false;
    $('reAuthExpire').textContent = store.authExpire || '—';
  }

  function bindReAuth() {
    $('btnCloseReAuth').addEventListener('click', function(){ $('modalReAuth').hidden = true; });
    $('btnCancelReAuth').addEventListener('click', function(){ $('modalReAuth').hidden = true; });
    $('btnConfirmReAuth').addEventListener('click', function() {
      if (!currentStore) return;
      var confirmed = confirm('即将在新窗口打开 Shopee 官方授权页面。\n\n店铺：' + currentStore.alias + '\n重新授权不会创建新店铺，仅更新授权状态和到期时间。\n\n点击确定模拟重新授权成功。');
      if (!confirmed) return;
      currentStore.authStatus = '已授权';
      currentStore.authTime = formatNow();
      currentStore.authExpire = nextYear();
      currentStore.syncOrderTime = formatNow();
      $('modalReAuth').hidden = true;
      renderTable();
      if (!$('drawerDetail').hidden) openDetail(currentStore);
      toast('重新授权成功！有效期已更新至 ' + currentStore.authExpire);
    });
  }

  function cancelAuth() {
    if (!currentStore) return;
    var confirmed = confirm('确认取消该店铺的 Shopee 授权吗？\n\n取消后将无法同步订单和产品数据。\n建议同时在 Shopee 卖家中心取消授权。');
    if (!confirmed) return;
    currentStore.authStatus = '未授权';
    currentStore.authTime = '—';
    currentStore.authExpire = '—';
    currentStore.syncOrderTime = '—';
    renderTable();
    openDetail(currentStore);
    activateDetailTab('auth');
    toast('授权已取消');
  }

  function openEditBasic(store, origin) {
    normalizeStore(store);
    currentStore = store;
    editOrigin = origin || ($('drawerDetail').hidden ? 'table' : 'detail');
    if (editOrigin === 'table') $('drawerDetail').hidden = true;
    $('drawerEditBasic').hidden = false;
    $('editPlatform').textContent = store.platform || '—';
    $('editAlias').value = store.alias || '';
    $('editBody').value = store.body || '';
    $('editStoreEmail').value = store.storeEmail || '';
    $('editAdAccountId').value = store.adAccountId || '';
    $('editBcId').value = store.bcId || '';
    $('editShopId').value = store.platformShopId || '';
    $('editShopName').value = store.platformShopName || '';
    $('editSite').textContent = store.site || '—';
    $('editStoreType').value = store.storeType || '';
    $('editBrowserName').value = store.browserName || '';
    $('editBrowserStore').value = store.browserStoreName || '';
    $('editAccountType').value = store.accountType || '';
    $('editRegistrationType').value = store.registrationType || '';
    $('editRegistrationCompany').value = store.registrationCompany || '';
    $('editRegistrationDate').value = store.registrationDate || '';
  }

  function bindEditBasic() {
    ['btnCloseEditBasic','btnCancelEditBasic'].forEach(function(id) {
      $(id).addEventListener('click', function(){ $('drawerEditBasic').hidden = true; });
    });
    $('btnSaveEditBasic').addEventListener('click', function() {
      if (!currentStore) return;
      if (value('editAlias').length < 2) {
        toast('店铺别名长度需为 2-50 个字符', 'error');
        return;
      }
      currentStore.alias = value('editAlias');
      var oldBody = currentStore.body || '';
      var newBody = value('editBody');
      if (oldBody !== newBody) {
        currentStore.bodyChangeRecords = currentStore.bodyChangeRecords || [];
        currentStore.bodyChangeRecords.unshift({ time: formatNow(), operator: 'Freddy', from: oldBody || '—', to: newBody || '—' });
        toast('店铺主体已变更，请关注收款与授权主体一致性');
      }
      currentStore.body = newBody;
      currentStore.storeEmail = value('editStoreEmail');
      currentStore.adAccountId = value('editAdAccountId');
      currentStore.bcId = value('editBcId');
      currentStore.platformShopId = value('editShopId');
      currentStore.platformShopName = value('editShopName');
      currentStore.storeType = value('editStoreType');
      currentStore.browserName = value('editBrowserName');
      currentStore.browserStoreName = value('editBrowserStore');
      currentStore.accountType = value('editAccountType');
      currentStore.registrationType = value('editRegistrationType');
      currentStore.registrationCompany = value('editRegistrationCompany');
      currentStore.registrationDate = value('editRegistrationDate');
      $('drawerEditBasic').hidden = true;
      renderTable();
      if (editOrigin === 'detail') openDetail(currentStore);
      toast('基础资料保存成功');
    });
  }

  function openEditBiz(store, origin) {
    normalizeStore(store);
    currentStore = store;
    editOrigin = origin || ($('drawerDetail').hidden ? 'table' : 'detail');
    if (editOrigin === 'table') $('drawerDetail').hidden = true;
    $('drawerEditBiz').hidden = false;
    $('editDept').value = store.dept || '';
    $('editOwner').value = store.owner || '';
    $('editUseStatus').value = store.useStatus || '';
    $('editEnabled').value = store.enabled ? '是' : '否';
    syncSelect('editEnabled');
    renderPaymentEditList(store.paymentAccounts || []);
    $('editHasDeposit').value = store.hasDeposit ? '是' : '否';
    $('editDepositRefundStatus').value = store.depositRefundStatus || '无需退回';
    syncSelect('editHasDeposit');
    syncSelect('editDepositRefundStatus');
    $('editDepositAccount').value = store.depositAccountRaw || '';
    $('editDepositAmount').value = store.depositAmount || '';
    $('editDepositRefundTime').value = store.depositRefundTime || '';
    $('editDepositRefundTransactionId').value = store.depositRefundTransactionId || '';
    $('editRemarks').value = store.remarks || '';
  }

  function bindEditBiz() {
    ['btnCloseEditBiz','btnCancelEditBiz'].forEach(function(id) {
      $(id).addEventListener('click', function(){ $('drawerEditBiz').hidden = true; });
    });
    $('btnAddPaymentAccount').addEventListener('click', function() {
      addPaymentEditRow({ platform: '', accountRaw: '', accountId: '', currency: 'USD' });
    });
    $('btnSaveEditBiz').addEventListener('click', function() {
      if (!currentStore) return;
      var accounts = collectPaymentEditRows();
      var invalidAccount = accounts.some(function(account) {
        return (account.platform && !account.accountRaw) || (!account.platform && account.accountRaw);
      });
      if (invalidAccount) {
        toast('收款平台与收款账号需要成对填写', 'error');
        return;
      }
      var hasDeposit = $('editHasDeposit').value === '是';
      if (hasDeposit && !value('editDepositAccount')) {
        toast('请填写保证金缴纳的账号', 'error');
        return;
      }
      if (hasDeposit && (!value('editDepositAmount') || Number(value('editDepositAmount').replace(/,/g, '')) <= 0)) {
        toast('请填写正确的保证金金额', 'error');
        return;
      }
      if ($('editDepositRefundStatus').value === '已退回' && !value('editDepositRefundTime') && !value('editDepositRefundTransactionId')) {
        toast('请至少填写保证金退回时间或退回流水号', 'error');
        return;
      }
      currentStore.dept = value('editDept');
      currentStore.owner = value('editOwner');
      currentStore.useStatus = value('editUseStatus');
      currentStore.enabled = $('editEnabled').value === '是';
      var oldPayment = JSON.stringify(currentStore.paymentAccounts || []);
      currentStore.paymentAccounts = accounts.map(function(account) {
        return {
          platform: account.platform,
          accountRaw: account.accountRaw,
          account: maskAccount(account.accountRaw),
          accountId: account.accountId,
          currency: account.currency || 'USD'
        };
      });
      if (oldPayment !== JSON.stringify(currentStore.paymentAccounts)) {
        currentStore.paymentChangeRecords = currentStore.paymentChangeRecords || [];
        currentStore.paymentChangeRecords.unshift({ time: formatNow(), operator: 'Freddy', content: '更新收款账号，共 ' + currentStore.paymentAccounts.length + ' 个' });
        toast('收款信息已变更，请确认主体与各收款账号平台一致性');
      }
      var first = currentStore.paymentAccounts[0] || {};
      currentStore.fundPlatform = first.platform || '';
      currentStore.fundAccountRaw = first.accountRaw || '';
      currentStore.fundAccount = first.account || '';
      currentStore.fundAccountId = first.accountId || '';
      currentStore.hasDeposit = hasDeposit;
      currentStore.depositRefundStatus = hasDeposit ? $('editDepositRefundStatus').value : '无需退回';
      currentStore.depositAccountRaw = hasDeposit ? value('editDepositAccount') : '';
      currentStore.depositAccount = hasDeposit && value('editDepositAccount') ? '**** ' + value('editDepositAccount').slice(-4) : '';
      currentStore.depositAmount = hasDeposit ? value('editDepositAmount') : '';
      currentStore.depositRefundTime = hasDeposit ? value('editDepositRefundTime') : '';
      currentStore.depositRefundTransactionId = hasDeposit ? value('editDepositRefundTransactionId') : '';
      currentStore.remarks = value('editRemarks');
      $('drawerEditBiz').hidden = true;
      renderTable();
      if (editOrigin === 'detail') {
        openDetail(currentStore);
        activateDetailTab('biz');
      }
      toast('业务信息保存成功');
    });
  }

  function renderPaymentEditList(accounts) {
    $('paymentEditList').innerHTML = '';
    (accounts.length ? accounts : [{ platform: '', accountRaw: '', accountId: '', currency: 'USD' }]).forEach(addPaymentEditRow);
  }

  function addPaymentEditRow(account) {
    var row = document.createElement('div');
    row.className = 'payment-edit-row';
    row.innerHTML =
      '<input class="form-input payment-platform" placeholder="收款平台" value="' + escapeHtml(account.platform || '') + '" />' +
      '<input class="form-input payment-account" placeholder="收款账号" value="' + escapeHtml(account.accountRaw || '') + '" />' +
      '<input class="form-input payment-account-id" placeholder="账号ID" value="' + escapeHtml(account.accountId || '') + '" />' +
      '<button class="btn btn-icon" type="button">×</button>';
    row.querySelector('button').addEventListener('click', function() {
      row.remove();
      if (!$('paymentEditList').children.length) addPaymentEditRow({ platform: '', accountRaw: '', accountId: '', currency: 'USD' });
    });
    $('paymentEditList').appendChild(row);
  }

  function collectPaymentEditRows() {
    return Array.from(document.querySelectorAll('.payment-edit-row')).map(function(row) {
      return {
        platform: row.querySelector('.payment-platform').value.trim(),
        accountRaw: row.querySelector('.payment-account').value.trim(),
        accountId: row.querySelector('.payment-account-id').value.trim(),
        currency: 'USD'
      };
    }).filter(function(account) {
      return account.platform || account.accountRaw || account.accountId;
    });
  }

  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, function(ch) {
      return ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[ch];
    });
  }

  function requestPaymentPassword() {
    var password = prompt('下载收款信息包含敏感资金数据，请输入资金信息查看密码');
    if (password === null) return false;
    if (!password.trim()) {
      toast('请输入资金信息查看密码', 'error');
      return false;
    }
    return true;
  }

  function downloadSelectedPaymentInfo() {
    var stores = Array.from(selectedIds).map(function(id) {
      return window.STORE_DATA.find(function(s){ return s.id === id; });
    }).filter(Boolean);
    if (!stores.length) {
      toast('请先选择需要下载收款信息的店铺', 'error');
      return;
    }
    downloadPaymentInfo(stores);
  }

  function downloadPaymentInfo(stores) {
    stores = (stores || [currentStore]).filter(Boolean);
    if (!stores.length) return;
    if (!requestPaymentPassword()) return;
    stores.forEach(normalizeStore);
    var rows = [['店铺别名', '店铺主体', '收款平台', '收款账号', '账号ID', '币种']];
    stores.forEach(function(store) {
      if (!store.paymentAccounts.length) {
        rows.push([store.alias, store.body, '—', '—', '—', '—']);
        return;
      }
      store.paymentAccounts.forEach(function(account) {
        rows.push([store.alias, store.body, account.platform, account.accountRaw || account.account, account.accountId, account.currency || 'USD']);
      });
    });
    var csv = rows.map(function(row) {
      return row.map(function(cell) { return '"' + String(cell || '').replace(/"/g, '""') + '"'; }).join(',');
    }).join('\n');
    var blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = (stores.length === 1 ? (stores[0].alias || '店铺') : '批量店铺') + '-收款信息.csv';
    link.click();
    URL.revokeObjectURL(url);
    toast('收款信息已下载，共 ' + stores.length + ' 个店铺');
  }

  function openAdSyncModal() {
    if (!currentStore) return;
    var setting = currentStore.adSyncSetting || {};
    $('modalAdSync').hidden = false;
    $('adSyncStart').value = setting.start || '2026-05-01';
    $('adSyncEnd').value = setting.end || '2026-05-19';
    $('adSyncFrequency').value = setting.frequency || '每日 02:00';
    syncSelect('adSyncFrequency');
  }

  function bindAdSync() {
    ['btnCloseAdSync','btnCancelAdSync'].forEach(function(id) {
      $(id).addEventListener('click', function(){ $('modalAdSync').hidden = true; });
    });
    $('btnSaveAdSync').addEventListener('click', function() {
      if (!currentStore) return;
      if (!value('adSyncStart') || !value('adSyncEnd')) {
        toast('请填写广告数据更新开始日期和结束日期', 'error');
        return;
      }
      currentStore.adSyncSetting = {
        start: value('adSyncStart'),
        end: value('adSyncEnd'),
        frequency: $('adSyncFrequency').value
      };
      $('modalAdSync').hidden = true;
      toast('广告数据更新时段已设置');
    });
  }

  function init() {
    enhanceSelects();
    renderTable();
    bindTabs();
    bindFilters();
    bindSelection();
    bindRowActions();
    bindCreateStore();
    bindDetail();
    bindReAuth();
    bindEditBasic();
    bindEditBiz();
    bindAdSync();
  }

  init();
})();
