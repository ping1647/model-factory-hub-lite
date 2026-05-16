(function () {
  'use strict';

  const DATA = window.MF_DATA || { models: [], watchlist: [], batches: [], agents: [], tests: [], meta: {} };
  const state = {
    page: 'dashboard',
    modelSearch: '',
    modelStatus: 'all',
    stockSearch: '',
    stockStatus: 'all',
    buyStatus: 'all'
  };

  const pages = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'models', icon: '🧠', label: 'Model Registry' },
    { id: 'watchlist', icon: '📈', label: 'Stock Watchlist' },
    { id: 'buyzones', icon: '🎯', label: 'Buy Zone Monitor' },
    { id: 'batches', icon: '🧪', label: 'Batch Log' },
    { id: 'agents', icon: '🤖', label: 'Agent Workflow' },
    { id: 'tests', icon: '✅', label: 'Requirements & QA' },
    { id: 'settings', icon: '⚙️', label: 'Settings' }
  ];

  const $ = (sel) => document.querySelector(sel);
  const content = $('#content');
  const title = $('#page-title');

  function safeText(value, fallback = '—') {
    return value === null || value === undefined || value === '' ? fallback : String(value);
  }

  function badge(text, type = 'neutral') {
    return `<span class="badge ${type}">${safeText(text)}</span>`;
  }

  function statusBadge(status) {
    const map = {
      decision: ['Decision-support', 'good'],
      experimental: ['Experimental', 'warn'],
      'not-ready': ['Not decision-ready', 'bad'],
      hold: ['Hold/Core', 'good'],
      near: ['Near Buy Zone', 'good'],
      wait: ['Wait/Pullback', 'warn'],
      speculative: ['Speculative only', 'warn'],
      avoid: ['Avoid Chase', 'bad']
    };
    const picked = map[status] || [status || 'Unknown', 'neutral'];
    return badge(picked[0], picked[1]);
  }

  function riskBadge(risk) {
    const r = String(risk || '').toLowerCase();
    if (r.includes('extreme') || r.includes('สูงมาก')) return badge(risk, 'bad');
    if (r.includes('high') || r.includes('สูง')) return badge(risk, 'warn');
    if (r.includes('low')) return badge(risk, 'good');
    return badge(risk || 'Medium', 'info');
  }

  function setPage(pageId) {
    state.page = pageId;
    const page = pages.find(p => p.id === pageId) || pages[0];
    title.textContent = page.label;
    renderNav();
    render();
  }

  function renderNav() {
    const nav = $('#nav');
    nav.innerHTML = pages.map(p => `
      <button type="button" class="${state.page === p.id ? 'active' : ''}" data-page="${p.id}">
        <span>${p.icon}</span><span>${p.label}</span>
      </button>
    `).join('');
    nav.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => setPage(btn.dataset.page)));
  }

  function summaryStats() {
    const active = DATA.models.length;
    const decision = DATA.models.filter(m => m.status === 'decision').length;
    const experimental = DATA.models.filter(m => m.status === 'experimental').length;
    const near = DATA.watchlist.filter(s => s.status === 'near').length;
    const avoid = DATA.watchlist.filter(s => s.status === 'avoid').length;
    const avgProgress = active ? Math.round(DATA.models.reduce((sum, m) => sum + (m.progress || 0), 0) / active) : 0;
    return { active, decision, experimental, near, avoid, avgProgress };
  }

  function renderDashboard() {
    const stats = summaryStats();
    return `
      <div class="notice"><strong>หมายเหตุ:</strong> ${safeText(DATA.meta.warning)} — โหมดนี้ตั้งใจให้เสถียรก่อน ยังไม่ต่อ API สดเพื่อป้องกันโหลดช้า/พัง</div>
      <div class="grid cols-4">
        ${metricCard('Active Models', stats.active, 'M1–M16 seed registry loaded')}
        ${metricCard('Decision-ready', stats.decision, 'โมเดลที่ใช้ช่วยตัดสินใจได้')}
        ${metricCard('Near Buy Zone', stats.near, 'จาก mock watchlist')}
        ${metricCard('Avg Progress', stats.avgProgress + '%', 'ค่าเฉลี่ย progress ของโมเดล')}
      </div>
      <div class="grid cols-2">
        <div class="card">
          <h3>Latest Batch Updates</h3>
          <div class="table-wrap">${batchTable(DATA.batches.slice(0,4))}</div>
        </div>
        <div class="card">
          <h3>Attention Queue</h3>
          ${attentionList()}
        </div>
      </div>
      <div class="grid cols-3">
        ${infoCard('Stable First', 'MVP นี้ใช้ static/local data ก่อน เพื่อให้หน้าเปิดไวและไม่ crash แม้ไม่มี API หรือ backend')}
        ${infoCard('Manual PM Check', 'PM auto-run ทุก 2 ชม. ถูกปิดไว้โดยตั้งใจ ลด token/limit burn และลดงานวนมั่ว')}
        ${infoCard('Future Ready', 'ต่อยอดไป GitHub/Codex/API ราคา/earnings ได้ภายหลัง เมื่อ UX และ data schema นิ่ง')}
      </div>
    `;
  }

  function metricCard(label, value, hint) {
    return `<div class="card metric"><span class="label">${label}</span><span class="value">${value}</span><span class="hint">${hint}</span></div>`;
  }

  function infoCard(title, body) {
    return `<div class="card"><h3>${title}</h3><p>${body}</p></div>`;
  }

  function attentionList() {
    const items = DATA.watchlist.filter(s => ['near', 'speculative', 'avoid'].includes(s.status)).slice(0, 6);
    if (!items.length) return '<div class="empty">ยังไม่มีรายการต้องดูเป็นพิเศษ</div>';
    return items.map(s => `
      <div class="agent-card clickable" data-stock="${s.ticker}">
        <h4>${s.ticker} · ${s.name}</h4>
        <p>${statusBadge(s.status)} ${riskBadge(s.risk)}</p>
        <p>${safeText(s.note)}</p>
      </div>
    `).join('');
  }

  function filteredModels() {
    const q = state.modelSearch.toLowerCase().trim();
    return DATA.models.filter(m => {
      const matchesQ = !q || [m.id, m.name, m.version, m.level, m.marker].join(' ').toLowerCase().includes(q);
      const matchesStatus = state.modelStatus === 'all' || m.status === state.modelStatus || m.level === state.modelStatus;
      return matchesQ && matchesStatus;
    });
  }

  function renderModels() {
    const rows = filteredModels();
    return `
      <div class="card">
        <h3>Model Registry</h3>
        <p>ใช้ดูว่าโมเดลไหนใช้ช่วยตัดสินใจได้ โมเดลไหนยังเป็น experimental และโมเดลไหนยังไม่พร้อม</p>
        <div class="toolbar">
          <input class="search" id="model-search" placeholder="Search model, M7, L4..." value="${state.modelSearch}" />
          <select id="model-status">
            ${option('all','All status',state.modelStatus)}
            ${option('decision','Decision-support',state.modelStatus)}
            ${option('experimental','Experimental',state.modelStatus)}
            ${option('not-ready','Not decision-ready',state.modelStatus)}
            ${option('L4','L4',state.modelStatus)}
            ${option('Draft','Draft',state.modelStatus)}
          </select>
        </div>
        ${rows.length ? modelTable(rows) : emptyState('ไม่พบโมเดลตามเงื่อนไขที่ค้นหา')}
      </div>
    `;
  }

  function option(value, label, selected) {
    return `<option value="${value}" ${value === selected ? 'selected' : ''}>${label}</option>`;
  }

  function modelTable(rows) {
    return `<div class="table-wrap"><table>
      <thead><tr><th>Model</th><th>Status</th><th>Progress</th><th>Cases</th><th>Alpha</th><th>Risk Data</th><th>Next Gap</th></tr></thead>
      <tbody>${rows.map(m => `<tr class="clickable" data-model="${m.id}">
        <td><strong>${m.id}</strong><br><span class="muted">${m.name}</span><br>${badge(m.version,'neutral')}</td>
        <td>${statusBadge(m.status)}<br><small>${safeText(m.marker)}</small></td>
        <td><strong>${safeText(m.progress)}%</strong><div class="progress"><span style="width:${Math.max(0, Math.min(100, m.progress || 0))}%"></span></div><small>${safeText(m.level)} · ${safeText(m.confidence)}</small></td>
        <td>${safeText(m.cases)}</td>
        <td>${safeText(m.alpha)}</td>
        <td><small>Drawdown: ${safeText(m.drawdown)}</small><br><small>Valuation: ${safeText(m.valuation)}</small></td>
        <td>${safeText(m.nextGap)}</td>
      </tr>`).join('')}</tbody>
    </table></div>`;
  }

  function filteredStocks(statusKey = state.stockStatus) {
    const q = state.stockSearch.toLowerCase().trim();
    return DATA.watchlist.filter(s => {
      const matchesQ = !q || [s.ticker, s.name, s.theme, s.model, s.stance, s.note].join(' ').toLowerCase().includes(q);
      const matchesStatus = statusKey === 'all' || s.status === statusKey;
      return matchesQ && matchesStatus;
    });
  }

  function renderWatchlist() {
    const rows = filteredStocks();
    return `
      <div class="card">
        <h3>Stock Watchlist</h3>
        <p>รายการหุ้น/ETF/คริปโตที่ผูกกับโมเดล — ยังไม่ใช่ live price ต้องเช็กราคาจริงก่อนตัดสินใจ</p>
        <div class="toolbar">
          <input class="search" id="stock-search" placeholder="Search ticker, SOFI, water..." value="${state.stockSearch}" />
          <select id="stock-status">
            ${option('all','All stance',state.stockStatus)}
            ${option('hold','Hold/Core',state.stockStatus)}
            ${option('near','Near Buy Zone',state.stockStatus)}
            ${option('wait','Wait/Pullback',state.stockStatus)}
            ${option('speculative','Speculative only',state.stockStatus)}
            ${option('avoid','Avoid Chase',state.stockStatus)}
          </select>
        </div>
        ${rows.length ? stockTable(rows) : emptyState('ไม่พบหุ้นตามเงื่อนไขที่ค้นหา')}
      </div>
    `;
  }

  function stockTable(rows) {
    return `<div class="table-wrap"><table>
      <thead><tr><th>Ticker</th><th>Model / Theme</th><th>Stance</th><th>Buy Zones</th><th>Risk</th><th>Notes</th></tr></thead>
      <tbody>${rows.map(s => `<tr class="clickable" data-stock="${s.ticker}">
        <td><strong>${s.ticker}</strong><br><span class="muted">${s.name}</span></td>
        <td>${badge(s.model,'info')}<br><small>${s.theme}</small></td>
        <td>${statusBadge(s.status)}<br><small>${s.stance}</small></td>
        <td><small><strong>Buy:</strong> ${s.buyZone}</small><br><small><strong>Add:</strong> ${s.addZone}</small><br><small><strong>Strong:</strong> ${s.strongAdd}</small></td>
        <td>${riskBadge(s.risk)}</td>
        <td>${s.note}</td>
      </tr>`).join('')}</tbody>
    </table></div>`;
  }

  function renderBuyZones() {
    const status = state.buyStatus;
    const rows = DATA.watchlist.filter(s => status === 'all' || s.status === status);
    return `
      <div class="notice"><strong>Data guardrail:</strong> Buy zone ตอนนี้เป็น seed/mock จาก memory เท่านั้น ยังไม่ต่อราคาสด ห้ามใช้เป็นคำสั่งซื้อจริงโดยไม่เช็กราคาปัจจุบัน</div>
      <div class="card">
        <h3>Buy Zone Monitor</h3>
        <div class="toolbar">
          <select id="buy-status">
            ${option('all','All signals',state.buyStatus)}
            ${option('near','Near Buy Zone',state.buyStatus)}
            ${option('wait','Wait/Pullback',state.buyStatus)}
            ${option('hold','Hold/Core',state.buyStatus)}
            ${option('speculative','Speculative only',state.buyStatus)}
            ${option('avoid','Avoid Chase',state.buyStatus)}
          </select>
        </div>
        ${rows.length ? stockTable(rows) : emptyState('ไม่มีรายการในสถานะนี้')}
      </div>
    `;
  }

  function batchTable(rows) {
    return `<table><thead><tr><th>Date</th><th>Model</th><th>Batch</th><th>Impact</th><th>Gap</th></tr></thead>
      <tbody>${rows.map(b => `<tr><td>${b.date}</td><td>${badge(b.model,'info')}</td><td><strong>${b.title}</strong><br><small>${b.progressDelta} · ${b.confidence}</small></td><td>${b.impact}<br><small>Alpha: ${b.alpha}</small></td><td>${b.gap}</td></tr>`).join('')}</tbody></table>`;
  }

  function renderBatches() {
    return `<div class="card"><h3>Batch Log</h3><p>บันทึกการพัฒนาโมเดลล่าสุดแบบอ่านเร็ว</p><div class="table-wrap">${batchTable(DATA.batches)}</div></div>`;
  }

  function renderAgents() {
    const lanes = ['Backlog', 'In Progress', 'QA', 'Blocked', 'Done'];
    return `
      <div class="notice"><strong>PM auto-run:</strong> Disabled by default. ใช้ manual check เพื่อประหยัด token/limits และลด loop ที่ไม่จำเป็น</div>
      <div class="kanban">
        ${lanes.map(lane => `<div class="kanban-col"><h3>${lane}</h3>${DATA.agents.filter(a => a.lane === lane).map(agentCard).join('') || '<p class="muted">No task</p>'}</div>`).join('')}
      </div>
      <div class="grid cols-2">
        ${infoCard('BA Rule', 'ทุก requirement ต้องถูกแปลงเป็น user story + acceptance criteria ก่อน dev')}
        ${infoCard('PQA Rule', 'ทุก feature ต้องมี test case อย่างน้อย 1 ชุด และ bug ต้องย้อนกลับไปหา BA/Dev')}
      </div>
    `;
  }

  function agentCard(a) {
    return `<div class="agent-card"><h4>${a.role}</h4>${badge(a.status,'info')}<p>${a.responsibility}</p></div>`;
  }

  function renderTests() {
    return `
      <div class="grid cols-2">
        <div class="card">
          <h3>MVP Acceptance Checklist</h3>
          <div class="checklist">
            ${['แอปเปิดได้โดยไม่ต้องต่อ API','ทุกเมนูกดได้ไม่ crash','ตารางบนมือถือ scroll ได้','ค้นหาและ filter ทำงาน','Detail modal เปิด/ปิดได้','มี empty state เมื่อไม่พบข้อมูล','มี warning ว่าเป็น mock data'].map((x,i)=>`<label class="check-item"><input type="checkbox" ${i < 5 ? 'checked' : ''}/><span>${x}</span></label>`).join('')}
          </div>
        </div>
        <div class="card">
          <h3>PQA Test Cases</h3>
          <div class="table-wrap"><table><thead><tr><th>ID</th><th>Area</th><th>Case</th><th>Status</th></tr></thead><tbody>${DATA.tests.map(t=>`<tr><td>${t.id}</td><td>${t.area}</td><td>${t.case}</td><td>${badge(t.status, t.status.includes('Pass') ? 'good':'warn')}</td></tr>`).join('')}</tbody></table></div>
        </div>
      </div>
    `;
  }

  function renderSettings() {
    return `
      <div class="grid cols-2">
        <div class="card">
          <h3>Data Source</h3>
          <p><strong>Current mode:</strong> ${safeText(DATA.meta.dataMode)}</p>
          <p>ยังไม่ต่อ live stock API, GitHub sync, earnings calendar หรือ backend เพื่อให้ MVP เสถียรก่อน</p>
          ${badge('Safe MVP mode','good')}
        </div>
        <div class="card">
          <h3>Future Integrations</h3>
          <p>ต่อยอดได้ภายหลัง: GitHub model registry JSON, price API, earnings calendar, batch logs, authentication, export report</p>
          ${badge('Future-ready','info')}
        </div>
      </div>
      <div class="card">
        <h3>ศัพท์สั้น ๆ</h3>
        <p><strong>Pullback/Dip:</strong> ราคาย่อลงจากจุดสูงหรือจากราคาปัจจุบัน</p>
        <p><strong>Buy Zone:</strong> ช่วงราคาที่ risk/reward เริ่มน่าสนใจ</p>
        <p><strong>Kill Switch:</strong> เงื่อนไขที่ทำให้ thesis เสีย ต้องหยุดหรือทบทวน</p>
        <p><strong>ETF Fallback:</strong> ถ้าหุ้นเดี่ยวไม่ชนะ benchmark ชัด ใช้ ETF แทนเพื่อลดความเสี่ยง</p>
      </div>
    `;
  }

  function emptyState(message) { return `<div class="empty">${message}</div>`; }

  function render() {
    try {
      const routes = {
        dashboard: renderDashboard,
        models: renderModels,
        watchlist: renderWatchlist,
        buyzones: renderBuyZones,
        batches: renderBatches,
        agents: renderAgents,
        tests: renderTests,
        settings: renderSettings
      };
      content.innerHTML = (routes[state.page] || renderDashboard)();
      bindPageEvents();
    } catch (error) {
      content.innerHTML = `<div class="card"><h3>Something went wrong</h3><p>แอปเจอ error แต่ไม่ crash ทั้งหน้า: ${safeText(error.message)}</p></div>`;
      console.error(error);
    }
  }

  function bindPageEvents() {
    const modelSearch = $('#model-search');
    if (modelSearch) modelSearch.addEventListener('input', e => { state.modelSearch = e.target.value; render(); });
    const modelStatus = $('#model-status');
    if (modelStatus) modelStatus.addEventListener('change', e => { state.modelStatus = e.target.value; render(); });
    const stockSearch = $('#stock-search');
    if (stockSearch) stockSearch.addEventListener('input', e => { state.stockSearch = e.target.value; render(); });
    const stockStatus = $('#stock-status');
    if (stockStatus) stockStatus.addEventListener('change', e => { state.stockStatus = e.target.value; render(); });
    const buyStatus = $('#buy-status');
    if (buyStatus) buyStatus.addEventListener('change', e => { state.buyStatus = e.target.value; render(); });

    document.querySelectorAll('[data-model]').forEach(el => el.addEventListener('click', () => openModel(el.dataset.model)));
    document.querySelectorAll('[data-stock]').forEach(el => el.addEventListener('click', () => openStock(el.dataset.stock)));
  }

  function openModel(id) {
    const m = DATA.models.find(x => x.id === id);
    if (!m) return;
    openModal(`${m.id} · ${m.name}`, `
      <div class="detail-grid">
        ${detail('Version', m.version)}${detail('Decision Marker', m.marker)}${detail('Progress', m.progress + '%')}${detail('Confidence', m.confidence)}
        ${detail('Benchmark Alpha', m.alpha)}${detail('Drawdown', m.drawdown)}${detail('Valuation', m.valuation)}${detail('Next Gap', m.nextGap)}
      </div>
      <p class="notice"><strong>Next action:</strong> ปิด gap ที่ระบุ ก่อนยกระดับ confidence หรือใช้ซื้อหนัก</p>
    `);
  }

  function openStock(ticker) {
    const s = DATA.watchlist.find(x => x.ticker === ticker);
    if (!s) return;
    openModal(`${s.ticker} · ${s.name}`, `
      <div class="detail-grid">
        ${detail('Theme', s.theme)}${detail('Model', s.model)}${detail('Stance', s.stance)}${detail('Risk', s.risk)}
        ${detail('Buy Zone', s.buyZone)}${detail('Add Zone', s.addZone)}${detail('Strong Add', s.strongAdd)}${detail('Notes', s.note)}
      </div>
      <p class="notice"><strong>Guardrail:</strong> ต้องดึงราคาปัจจุบันจริงก่อนทำ action buy/hold/sell</p>
    `);
  }

  function detail(label, value) {
    return `<div class="detail-box"><strong>${label}</strong><span>${safeText(value)}</span></div>`;
  }

  function openModal(header, body) {
    const root = $('#modal-root');
    root.classList.remove('hidden');
    root.innerHTML = `<div class="modal"><div class="modal-header"><h3>${header}</h3><button class="close-btn" type="button">Close</button></div>${body}</div>`;
    root.querySelector('.close-btn').addEventListener('click', closeModal);
    root.addEventListener('click', (e) => { if (e.target === root) closeModal(); }, { once: true });
  }

  function closeModal() {
    const root = $('#modal-root');
    root.classList.add('hidden');
    root.innerHTML = '';
  }

  $('#toggle-theme').addEventListener('click', () => document.body.classList.toggle('light'));
  $('#quick-health').addEventListener('click', () => openModal('System Health', `
    <div class="detail-grid">
      ${detail('Mode', DATA.meta.dataMode)}${detail('Model count', DATA.models.length)}${detail('Watchlist count', DATA.watchlist.length)}${detail('Last updated', DATA.meta.lastUpdated)}
    </div>
    <p class="notice">No backend, no polling, no live API in MVP. This is intentional for speed and stability.</p>
  `));

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => null));
  }

  renderNav();
  setPage('dashboard');
})();
