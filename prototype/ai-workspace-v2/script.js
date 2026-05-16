// ============================================================
// AI Workspace v2 · Interactions
// ============================================================

// ===== STATE =====
let currentPage = 'ai-workspace';
let currentModel = 'claude';
let currentConversation = 1;
let chatOpen = true;
let isOptimizing = false;
let isGenerating = false;
let isFetching = false;
let modelDropdownOpen = false;

// ===== MOCK DATA =====
const agents = [
  { id: 1, name: 'Listing 优化专家', emoji: '📝', author: '官方', desc: '多平台 Listing 诊断、关键词优化、标题改写、A+ 文案生成', uses: 1240, forks: 56, tag: '运营', official: true },
  { id: 2, name: '图片生成助手', emoji: '🖼', author: '官方', desc: '根据 Prompt 生成商品主图、场景图、广告图，支持多种风格', uses: 890, forks: 32, tag: '设计', official: true },
  { id: 3, name: '广告诊断师', emoji: '📊', author: '李明', desc: '分析广告投放数据，识别低效投放，给出预算和出价建议', uses: 340, forks: 12, tag: '数据', official: false },
  { id: 4, name: '差评回复助手', emoji: '💬', author: '王芳', desc: '根据差评内容生成专业、有礼的回复模板，提升客户满意度', uses: 520, forks: 28, tag: '客服', official: false },
  { id: 5, name: 'Shopee 上新助手', emoji: '🛒', author: '陈涛', desc: '自动翻译标题、生成卖点、适配 Shopee 各站点语言风格', uses: 210, forks: 8, tag: '运营', official: false },
  { id: 6, name: '竞品监控 Agent', emoji: '🔍', author: '赵敏', desc: '定时追踪竞品价格、评价、排名变化，自动推送摘要', uses: 180, forks: 15, tag: '数据', official: false },
];

const myAgents = [
  { id: 101, name: '我的 Listing 助手', emoji: '✨', author: '我', desc: '基于官方 Listing 专家修改，加入了公司的品牌话术库', uses: 45, forks: 2, tag: '运营', status: '已发布' },
  { id: 102, name: 'TikTok 文案生成器', emoji: '🎵', author: '我', desc: '专门生成 TikTok Shop 的短视频文案和标签', uses: 12, forks: 0, tag: '营销', status: '草稿' },
];

const taskRecords = [
  { name: 'Listing 优化 · B0ABC12345', agent: 'Listing 优化专家', time: '2026-05-17 09:30', status: '已完成', statusColor: 'success' },
  { name: '图片生成 · 无线耳机主图 x4', agent: '图片生成助手', time: '2026-05-17 08:15', status: '已完成', statusColor: 'success' },
  { name: '广告诊断 · 美国站 SP 广告', agent: '广告诊断师', time: '2026-05-16 16:45', status: '已完成', statusColor: 'success' },
  { name: '竞品分析 · 充电宝类目', agent: '竞品监控 Agent', time: '2026-05-16 14:20', status: '失败', statusColor: 'error' },
  { name: 'Listing 优化 · LS-SHOP-202605', agent: 'Listing 优化专家', time: '2026-05-15 11:00', status: '已完成', statusColor: 'success' },
];

const conversations = [
  { id: 1, title: 'Listing 优化建议', agent: 'Listing 优化专家', time: '刚刚', emoji: '💬' },
  { id: 2, title: '生成商品主图', agent: '图片生成助手', time: '昨天', emoji: '🖼' },
  { id: 3, title: '广告诊断分析', agent: '广告诊断师', time: '昨天', emoji: '📊' },
  { id: 4, title: '智能客服脚本', agent: '差评回复助手', time: '5月15日', emoji: '🤖' },
  { id: 5, title: '竞品调研报告', agent: '竞品监控 Agent', time: '5月14日', emoji: '💡' },
];

const chatResponses = {
  '优化': '已生成优化方案：\n\n1️⃣ **标题优化** — 压缩至 178 字符，加入 "noise cancelling wireless earbuds"\n2️⃣ **关键词补充** — 新增 5 个高流量长尾词\n3️⃣ **卖点重构** — 5 条 Bullet Points 突出差异点\n4️⃣ **A+ 文案** — 生成品牌故事模块文案\n\n需要我直接应用到店铺吗？',
  '图片': '已理解需求，正在生成 4 张商品图…\n\n风格：商业摄影\n场景：木质桌面 + 暖光\n尺寸：1:1 主图\n\n预计 30 秒完成。',
  '广告': '广告诊断结果：\n\n📊 **ACoS 偏高** — 当前 42%，建议降至 30% 以下\n🎯 **关键词浪费** — 3 个词花费 $120 无转化，建议暂停\n💰 **预算分配** — 80% 预算集中在 2 个广告组，建议分散\n📈 **建议出价** — 核心词出价下调 15%，测试新词 +20%',
  '客服': '以下是差评回复模板：\n\n---\n尊敬的客户，\n\n非常抱歉给您带来不好的体验。我们已立即排查该批次产品，确认是 [具体问题] 导致。\n\n我们为您提供以下解决方案：\n1. 全额退款 / 免费换货\n2. 赠送 $5 优惠券作为补偿\n3. 专人跟进确保问题解决\n\n再次致歉，期待您的回复。\n---',
  '默认': '收到！让我来帮你处理这个问题。\n\n你可以通过以下方式继续：\n1️⃣ 提供更详细的数据或背景\n2️⃣ 选择上方的快捷操作\n3️⃣ @其他 Agent 协作处理'
};

// ===== NAVIGATION =====
function switchPage(p) {
  document.querySelectorAll('.c-shell__menu-item[data-page]').forEach(e => e.classList.remove('c-shell__menu-item--active'));
  document.querySelector(`.c-shell__menu-item[data-page="${p}"]`)?.classList.add('c-shell__menu-item--active');
  document.querySelectorAll('.page').forEach(e => e.classList.remove('active'));
  document.getElementById('page-' + p)?.classList.add('active');
  currentPage = p;

  const titles = {
    'ai-workspace': 'AI 工作台',
    'agent-market': 'Agent 市场',
    'workspace-mgmt': '工作管理',
    'listing': 'Listing 优化',
    'image': '图片工坊'
  };
  document.getElementById('crumbCurrent').textContent = titles[p] || '';

  // Close dropdowns
  closeModelDropdown();
}

document.querySelectorAll('.c-shell__menu-item[data-page]').forEach(e => {
  e.addEventListener('click', () => switchPage(e.dataset.page));
});

// Shell collapse
document.querySelector('[data-action="collapse"]')?.addEventListener('click', (e) => {
  const shell = document.getElementById('shell');
  shell.dataset.collapsed = shell.dataset.collapsed === 'true' ? 'false' : 'true';
});

// ===== AI WORKSPACE: CONVERSATIONS =====
function switchConversation(id) {
  currentConversation = id;
  document.querySelectorAll('.aws-sidebar__item').forEach(el => el.classList.remove('aws-sidebar__item--active'));
  document.querySelector(`.aws-sidebar__item[data-conv="${id}"]`)?.classList.add('aws-sidebar__item--active');

  const conv = conversations.find(c => c.id === id);
  if (conv) {
    document.getElementById('chatTitle').textContent = conv.title;
    // Clear and load mock messages
    const msgs = document.getElementById('chatMessages');
    msgs.innerHTML = `
      <div class="chat-msg chat-msg--bot">
        <div class="chat-msg__avatar chat-msg__avatar--bot">🤖</div>
        <div>
          <div class="chat-msg__bubble">继续「${conv.title}」的对话。\n\n当前绑定 Agent：${conv.agent}</div>
          <div class="chat-msg__time">刚刚</div>
        </div>
      </div>
    `;
  }
}

function newConversation() {
  const newId = conversations.length + 1;
  const newConv = { id: newId, title: '新对话', agent: '通用助手', time: '刚刚', emoji: '💬' };
  conversations.unshift(newConv);

  const list = document.getElementById('conversationList');
  const item = document.createElement('div');
  item.className = 'aws-sidebar__item aws-sidebar__item--active';
  item.dataset.conv = newId;
  item.onclick = () => switchConversation(newId);
  item.innerHTML = `<span>${newConv.emoji}</span> ${newConv.title}`;

  // Remove active from others and prepend
  document.querySelectorAll('.aws-sidebar__item').forEach(el => el.classList.remove('aws-sidebar__item--active'));
  const todayGroup = list.querySelector('.aws-sidebar__group');
  if (todayGroup && todayGroup.textContent === '今天') {
    todayGroup.after(item);
  } else {
    list.insertBefore(item, list.firstChild);
  }

  currentConversation = newId;
  document.getElementById('chatTitle').textContent = '新对话';
  document.getElementById('chatMessages').innerHTML = `
    <div class="chat-msg chat-msg--bot">
      <div class="chat-msg__avatar chat-msg__avatar--bot">🤖</div>
      <div>
        <div class="chat-msg__bubble">👋 你好！有什么可以帮你的？\n\n你可以：\n• 直接描述你的需求\n• 使用 @ 唤起特定 Agent\n• 点击下方的快捷操作</div>
        <div class="chat-msg__time">刚刚</div>
      </div>
    </div>
  `;
  document.getElementById('chatInput').focus();
}

// ===== CHAT =====
function appendMessage(text, role) {
  const m = document.getElementById('chatMessages');
  const time = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  const avatar = role === 'user' ? '张' : '🤖';
  const avatarClass = role === 'user' ? 'chat-msg__avatar--user' : 'chat-msg__avatar--bot';
  m.innerHTML += `
    <div class="chat-msg chat-msg--${role}">
      <div class="chat-msg__avatar ${avatarClass}">${avatar}</div>
      <div>
        <div class="chat-msg__bubble">${escapeHtml(text)}</div>
        <div class="chat-msg__time">${time}</div>
      </div>
    </div>
  `;
  m.scrollTop = m.scrollHeight;
}

function showTyping() {
  const m = document.getElementById('chatMessages');
  m.innerHTML += `
    <div class="chat-typing" id="typingIndicator">
      <span></span><span></span><span></span>
    </div>
  `;
  m.scrollTop = m.scrollHeight;
}

function hideTyping() {
  const el = document.getElementById('typingIndicator');
  if (el) el.remove();
}

function sendChat() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  input.rows = 1;
  appendMessage(text, 'user');
  showTyping();

  // Simple keyword matching
  let reply = chatResponses['默认'];
  for (const [k, v] of Object.entries(chatResponses)) {
    if (k === '默认') continue;
    if (text.includes(k)) { reply = v; break; }
  }

  setTimeout(() => {
    hideTyping();
    appendMessage(reply, 'bot');
  }, 800 + Math.random() * 600);
}

function quickChat(text) {
  document.getElementById('chatInput').value = text;
  sendChat();
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Auto-resize textarea
const chatInput = document.getElementById('chatInput');
if (chatInput) {
  chatInput.addEventListener('input', function() {
    this.rows = 1;
    const rows = Math.min(5, Math.ceil(this.scrollHeight / 24));
    this.rows = Math.max(1, rows);
  });
}

// ===== MODEL SELECTOR =====
function toggleModelDropdown() {
  const dd = document.getElementById('modelDropdown');
  modelDropdownOpen = !modelDropdownOpen;
  dd.style.display = modelDropdownOpen ? 'block' : 'none';
}

function closeModelDropdown() {
  modelDropdownOpen = false;
  document.getElementById('modelDropdown').style.display = 'none';
}

function selectModel(model) {
  currentModel = model;
  const names = { claude: 'Claude 4', gpt: 'GPT-4o', gemini: 'Gemini 2.5', deepseek: 'DeepSeek V3' };
  const colors = { claude: '#818cf8', gpt: '#10b981', gemini: '#38bdf8', deepseek: '#a855f7' };
  document.getElementById('modelSelector').innerHTML = `
    <span style="width:8px;height:8px;border-radius:50%;background:${colors[model]};display:inline-block;"></span>
    <span>${names[model]}</span>
    <span>▼</span>
  `;
  document.querySelectorAll('.model-option').forEach(el => el.classList.remove('model-option--active'));
  document.querySelector(`.model-option[data-model="${model}"]`)?.classList.add('model-option--active');
  closeModelDropdown();
  showToast(`已切换模型至 ${names[model]}`);
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('#modelSelector') && !e.target.closest('#modelDropdown')) {
    closeModelDropdown();
  }
});

// ===== RIGHT PANEL =====
function toggleRightPanel() {
  const panel = document.getElementById('rightPanel');
  panel.dataset.collapsed = panel.dataset.collapsed === 'true' ? 'false' : 'true';
}

// ===== AGENT MARKET =====
function renderAgentMarket() {
  const grid = document.getElementById('agentMarketGrid');
  if (!grid) return;
  grid.innerHTML = agents.map(a => `
    <div class="agent-card" onclick="useAgent(${a.id})">
      <div class="agent-card__header">
        <div class="agent-card__avatar">${a.emoji}</div>
        <div class="agent-card__info">
          <div class="agent-card__name">${escapeHtml(a.name)} ${a.official ? '<span class="tag tag--processing" style="font-size:10px;height:18px;padding:0 6px;">官方</span>' : ''}</div>
          <div class="agent-card__author">${escapeHtml(a.author)}</div>
        </div>
      </div>
      <div class="agent-card__desc">${escapeHtml(a.desc)}</div>
      <div class="agent-card__footer">
        <div class="agent-card__stats">
          <span>▶ ${a.uses}</span>
          <span>🍴 ${a.forks}</span>
        </div>
        <span class="tag tag--default">${a.tag}</span>
      </div>
    </div>
  `).join('');
}

function useAgent(id) {
  const agent = agents.find(a => a.id === id);
  if (!agent) return;
  switchPage('ai-workspace');
  showToast(`已切换至 ${agent.name}`);
  document.getElementById('chatTitle').textContent = `与 ${agent.name} 对话`;
}

// ===== WORKSPACE MANAGEMENT =====
function switchWsTab(tab) {
  document.querySelectorAll('.ws-mgmt__tab').forEach(el => el.classList.remove('ws-mgmt__tab--active'));
  document.querySelector(`.ws-mgmt__tab[data-tab="${tab}"]`)?.classList.add('ws-mgmt__tab--active');
  document.querySelectorAll('.ws-panel').forEach(el => el.classList.remove('active'));
  document.getElementById('panel-' + tab)?.classList.add('active');
}

function renderHistory() {
  const list = document.getElementById('historyList');
  if (!list) return;
  list.innerHTML = conversations.map(c => `
    <div class="conv-item" onclick="switchPage('ai-workspace');switchConversation(${c.id})">
      <div class="conv-item__icon">${c.emoji}</div>
      <div class="conv-item__info">
        <div class="conv-item__title">${escapeHtml(c.title)}</div>
        <div class="conv-item__meta">${c.agent} · ${c.time}</div>
      </div>
      <button class="btn btn--sm">打开</button>
    </div>
  `).join('');
}

function renderMyAgents() {
  const grid = document.getElementById('myAgentsGrid');
  if (!grid) return;
  grid.innerHTML = myAgents.map(a => `
    <div class="agent-card">
      <div class="agent-card__header">
        <div class="agent-card__avatar">${a.emoji}</div>
        <div class="agent-card__info">
          <div class="agent-card__name">${escapeHtml(a.name)}</div>
          <div class="agent-card__author">
            <span class="tag tag--${a.status === '已发布' ? 'success' : 'warning'}" style="font-size:10px;height:18px;padding:0 6px;">${a.status}</span>
          </div>
        </div>
      </div>
      <div class="agent-card__desc">${escapeHtml(a.desc)}</div>
      <div class="agent-card__footer">
        <div class="agent-card__stats">
          <span>▶ ${a.uses}</span>
          <span>🍴 ${a.forks}</span>
        </div>
        <div style="display:flex;gap:var(--space-1);">
          <button class="btn btn--sm">编辑</button>
          <button class="btn btn--sm">分享</button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderTasks() {
  const tbody = document.getElementById('tasksTableBody');
  if (!tbody) return;
  tbody.innerHTML = taskRecords.map(t => `
    <tr style="border-bottom:1px solid var(--color-border-secondary);">
      <td style="padding:var(--space-3) var(--space-4);font-size:var(--font-size-sm);">${escapeHtml(t.name)}</td>
      <td style="padding:var(--space-3) var(--space-4);font-size:var(--font-size-sm);">${escapeHtml(t.agent)}</td>
      <td style="padding:var(--space-3) var(--space-4);font-size:var(--font-size-sm);color:var(--color-text-secondary);">${t.time}</td>
      <td style="padding:var(--space-3) var(--space-4);"><span class="tag tag--${t.statusColor}">${t.status}</span></td>
      <td style="padding:var(--space-3) var(--space-4);"><button class="btn btn--sm">查看</button></td>
    </tr>
  `).join('');
}

// ===== AGENT BUILDER =====
function openAgentBuilder() {
  document.getElementById('agentBuilderMask').dataset.open = 'true';
  document.getElementById('agentBuilderModal').dataset.open = 'true';
}

function closeAgentBuilder() {
  document.getElementById('agentBuilderMask').dataset.open = 'false';
  document.getElementById('agentBuilderModal').dataset.open = 'false';
}

function saveAgent() {
  const name = document.getElementById('agentNameInput').value.trim();
  if (!name) {
    showToast('请填写 Agent 名称', 'warning');
    return;
  }
  closeAgentBuilder();
  showToast('Agent 保存成功');
  // Add to my agents
  myAgents.unshift({
    id: Date.now(),
    name: name,
    emoji: document.getElementById('agentAvatarPreview').textContent.trim(),
    author: '我',
    desc: document.getElementById('agentDescInput').value || '暂无描述',
    uses: 0,
    forks: 0,
    tag: '自定义',
    status: '草稿'
  });
  renderMyAgents();
}

// Avatar picker
document.getElementById('agentAvatarPreview')?.addEventListener('click', function() {
  const emojis = ['🤖', '💡', '📝', '🖼', '📊', '💬', '🎯', '🔍', '✨', '🎨', '📈', '🛒'];
  const current = this.textContent.trim();
  const idx = emojis.indexOf(current);
  this.textContent = emojis[(idx + 1) % emojis.length];
});

// ===== LISTING OPTIMIZATION =====
function fetchListing() {
  if (isFetching) return;
  const id = document.getElementById('listingInput').value.trim();
  if (!id) { showToast('请输入 ASIN 或 Listing ID', 'warning'); return; }

  isFetching = true;
  document.getElementById('listingOriginal').innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;min-height:200px;gap:var(--space-2);color:var(--color-text-secondary);">
      <div style="width:20px;height:20px;border:2px solid var(--color-border);border-top-color:var(--color-primary-6);border-radius:50%;animation:spin 1s linear infinite;"></div>
      正在获取…
    </div>
  `;
  document.getElementById('listingOptimized').innerHTML = `
    <div class="listing-empty"><div class="listing-empty__icon">⏳</div><p>等待获取原始数据</p></div>
  `;

  setTimeout(() => {
    document.getElementById('listingOriginal').innerHTML = `
      <div style="display:flex;flex-direction:column;gap:var(--space-3);">
        <div><label style="font-size:var(--font-size-xs);color:var(--color-text-secondary);display:block;margin-bottom:var(--space-1);">标题</label>
        <div style="padding:var(--space-3);background:var(--color-bg-spotlight);border-radius:var(--radius);font-size:var(--font-size-sm);line-height:1.6;">Wireless Bluetooth Earbuds, IPX7 Waterproof Sports Earphones with Noise Cancelling Mic, 48H Battery Life, HD Stereo Sound, LED Display, Comfortable Fit for Running Gym Cycling</div></div>
        <div><label style="font-size:var(--font-size-xs);color:var(--color-text-secondary);display:block;margin-bottom:var(--space-1);">卖点</label>
        <div style="padding:var(--space-3);background:var(--color-bg-spotlight);border-radius:var(--radius);font-size:var(--font-size-sm);line-height:1.6;white-space:pre-wrap;">• 48-hour battery life for long-lasting use
• IPX7 waterproof rating for sports and outdoor
• Advanced noise cancelling technology
• HD stereo sound with deep bass
• Comfortable ergonomic design with ear hooks</div></div>
        <div><label style="font-size:var(--font-size-xs);color:var(--color-text-secondary);display:block;margin-bottom:var(--space-1);">关键词</label>
        <div style="padding:var(--space-3);background:var(--color-bg-spotlight);border-radius:var(--radius);font-size:var(--font-size-sm);">wireless earbuds, bluetooth earphones, sports headset, noise cancelling, waterproof earbuds</div></div>
      </div>
    `;
    document.getElementById('listingOptimized').innerHTML = `
      <div class="listing-empty"><div class="listing-empty__icon">✨</div><p>点击下方按钮生成优化方案</p><button class="btn btn--primary" style="margin-top:var(--space-3);" onclick="runOptimization()">AI 智能优化</button></div>
    `;
    isFetching = false;
    showToast('已获取 Listing 数据');
  }, 1000);
}

function runOptimization() {
  if (isOptimizing) return;
  isOptimizing = true;
  document.getElementById('listingOptimized').innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;min-height:200px;gap:var(--space-2);color:var(--color-text-secondary);">
      <div style="width:20px;height:20px;border:2px solid var(--color-border);border-top-color:var(--color-primary-6);border-radius:50%;animation:spin 1s linear infinite;"></div>
      AI 优化中…
    </div>
  `;
  setTimeout(() => {
    document.getElementById('listingOptimized').innerHTML = `
      <div style="display:flex;flex-direction:column;gap:var(--space-3);">
        <div style="display:flex;align-items:center;gap:var(--space-2);padding:var(--space-3);background:var(--color-success-bg);border-radius:var(--radius);border:1px solid var(--color-success-border);">
          <span style="font-size:24px;font-weight:var(--font-weight-semibold);color:var(--color-success);">92</span>
          <span style="font-size:var(--font-size-sm);color:var(--color-text-secondary);">优化评分 ↑18%</span>
          <span class="tag tag--success" style="margin-left:auto;">已优化</span>
        </div>
        <div><label style="font-size:var(--font-size-xs);color:var(--color-text-secondary);display:block;margin-bottom:var(--space-1);">优化标题</label>
        <div style="padding:var(--space-3);background:var(--color-primary-bg);border-radius:var(--radius);border:1px solid var(--color-primary-3);font-size:var(--font-size-sm);line-height:1.6;">Premium Wireless Bluetooth Earbuds, IPX7 Waterproof Sport Earphones with AI-Noise Cancellation, 48H Playtime, HD Stereo Sound, LED Display, Secure Fit for Gym Running & Cycling</div></div>
        <div><label style="font-size:var(--font-size-xs);color:var(--color-text-secondary);display:block;margin-bottom:var(--space-1);">优化卖点</label>
        <div style="display:flex;flex-direction:column;gap:var(--space-1);">
          <div style="padding:var(--space-2) var(--space-3);background:var(--color-bg-spotlight);border-radius:var(--radius);font-size:var(--font-size-sm);">🚀 48-Hour Marathon Battery — Full work week on single charge</div>
          <div style="padding:var(--space-2) var(--space-3);background:var(--color-bg-spotlight);border-radius:var(--radius);font-size:var(--font-size-sm);">💧 IPX7 Waterproof & Sweatproof — Fully protected against sweat, rain, spills</div>
          <div style="padding:var(--space-2) var(--space-3);background:var(--color-bg-spotlight);border-radius:var(--radius);font-size:var(--font-size-sm);">🔇 AI-Powered Noise Cancellation — Filters 95% ambient noise</div>
          <div style="padding:var(--space-2) var(--space-3);background:var(--color-bg-spotlight);border-radius:var(--radius);font-size:var(--font-size-sm);">🎵 HD Stereo with Deep Bass — 13mm dynamic drivers</div>
          <div style="padding:var(--space-2) var(--space-3);background:var(--color-bg-spotlight);border-radius:var(--radius);font-size:var(--font-size-sm);">⌚ Smart LED Display & Touch Control — Real-time battery</div>
        </div></div>
        <div><label style="font-size:var(--font-size-xs);color:var(--color-text-secondary);display:block;margin-bottom:var(--space-1);">关键词</label>
        <div style="padding:var(--space-3);background:var(--color-bg-spotlight);border-radius:var(--radius);font-size:var(--font-size-sm);">wireless earbuds noise cancelling, waterproof bluetooth earphones, sport earbuds 48 hours, premium running headset</div></div>
        <div style="display:flex;gap:var(--space-2);">
          <button class="btn btn--primary" style="flex:1;">应用优化</button>
          <button class="btn">复制</button>
          <button class="btn">对比</button>
        </div>
      </div>
    `;
    isOptimizing = false;
    showToast('优化完成！评分 92 ↑18%');
  }, 1500);
}

// ===== IMAGE STUDIO =====
function generateImages() {
  if (isGenerating) return;
  const prompt = document.getElementById('imagePrompt').value.trim();
  if (!prompt) { showToast('请输入图片描述', 'warning'); return; }

  isGenerating = true;
  const gallery = document.getElementById('imageGallery');
  gallery.innerHTML = `
    <div style="grid-column:1 / -1;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:300px;gap:var(--space-3);">
      <div style="width:32px;height:32px;border:3px solid var(--color-border);border-top-color:var(--color-primary-6);border-radius:50%;animation:spin 1s linear infinite;"></div>
      <p style="color:var(--color-text-secondary);font-size:var(--font-size-sm);">AI 创作中…</p>
    </div>
  `;

  setTimeout(() => {
    const colors = [
      ['#e0e7ff', '#c7d2fe'],
      ['#dbeafe', '#bfdbfe'],
      ['#fef3c7', '#fde68a'],
      ['#d1fae5', '#a7f3d0']
    ];
    const styles = ['商业摄影', '白底图', '生活方式', '3D'];
    gallery.innerHTML = '';
    for (let i = 0; i < 4; i++) {
      const styleIdx = i % 4;
      gallery.innerHTML += `
        <div class="image-card" style="background:linear-gradient(135deg,${colors[styleIdx][0]},${colors[styleIdx][1]});">
          <div style="text-align:center;padding:var(--space-4);">
            <div style="font-size:32px;margin-bottom:var(--space-2);">🖼</div>
            <p style="font-size:var(--font-size-xs);color:var(--color-text-secondary);">${styles[styleIdx]}</p>
          </div>
        </div>
      `;
    }
    isGenerating = false;
    showToast('生成 4 张图片');
  }, 2000);
}

// ===== TOAST =====
function showToast(msg, type) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ===== INIT =====
window.switchPage = switchPage;
window.switchConversation = switchConversation;
window.newConversation = newConversation;
window.sendChat = sendChat;
window.quickChat = quickChat;
window.toggleModelDropdown = toggleModelDropdown;
window.selectModel = selectModel;
window.toggleRightPanel = toggleRightPanel;
window.openAgentBuilder = openAgentBuilder;
window.closeAgentBuilder = closeAgentBuilder;
window.saveAgent = saveAgent;
window.useAgent = useAgent;
window.switchWsTab = switchWsTab;
window.fetchListing = fetchListing;
window.runOptimization = runOptimization;
window.generateImages = generateImages;
window.showToast = showToast;

// Add spin keyframes
const style = document.createElement('style');
style.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(style);

// Render on load
renderAgentMarket();
renderHistory();
renderMyAgents();
renderTasks();
