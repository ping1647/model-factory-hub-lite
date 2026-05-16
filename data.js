window.MF_DATA = {
  meta: {
    appName: 'Model Factory Hub Lite',
    dataMode: 'Local mock data',
    lastUpdated: '2026-05-16',
    warning: 'ราคาและสถานะทั้งหมดเป็น mock/local seed data เพื่อให้แอปโหลดไวและไม่ crash ยังไม่ใช่ live market data'
  },
  models: [
    { id:'M1', name:'Quality Compounder / Durable Moat', version:'V0.5 L4', progress:84, level:'L4', confidence:'Low-Medium+', marker:'📌 ใช้ช่วยตัดสินใจได้', cases:50, alpha:'Framework ready', drawdown:'Proxy partial', valuation:'Proxy partial', status:'decision', nextGap:'Exact 3M/6M/12M returns', updated:'2026-05-07' },
    { id:'M2', name:'AI Data Center / Compute Infrastructure', version:'V0.5 L4', progress:83, level:'L4', confidence:'Low-Medium', marker:'📌 ใช้ช่วยตัดสินใจได้', cases:50, alpha:'Framework ready', drawdown:'Proxy partial', valuation:'Proxy partial', status:'decision', nextGap:'Full benchmark alpha vs QQQ/SMH/IGV', updated:'2026-05-07' },
    { id:'M3', name:'Macro Regime / Liquidity / Valuation Compression', version:'Draft', progress:30, level:'L2', confidence:'Low', marker:'🚫 ยังไม่ใช้ตัดสินใจ', cases:0, alpha:'Missing', drawdown:'Missing', valuation:'Needed', status:'not-ready', nextGap:'Define regime rules and cases', updated:'2026-05-16' },
    { id:'M4', name:'Nuclear / Uranium / SMR', version:'L4 Candidate', progress:78, level:'L3+', confidence:'Low-Medium', marker:'🚫 ยังไม่ใช้ตัดสินใจ', cases:50, alpha:'Needs metrics pack', drawdown:'Needs proxy', valuation:'Needs proxy', status:'not-ready', nextGap:'L4 metrics pack', updated:'2026-05-07' },
    { id:'M5', name:'Fintech / Digital Bank / Brokerage', version:'V0.3', progress:80, level:'L3+', confidence:'Low-Medium+', marker:'🚫 ยังไม่ใช้ตัดสินใจ', cases:30, alpha:'Partial', drawdown:'Missing exact', valuation:'Band ready', status:'not-ready', nextGap:'Add to 50 cases and exact returns', updated:'2026-05-07' },
    { id:'M6', name:'Healthcare / Pharma / MedTech', version:'V0.5 L4', progress:84, level:'L4', confidence:'Low-Medium', marker:'📌 ใช้ช่วยตัดสินใจได้', cases:50, alpha:'Framework ready', drawdown:'Proxy partial', valuation:'Proxy partial', status:'decision', nextGap:'Full exact returns', updated:'2026-05-07' },
    { id:'M7', name:'Semiconductor / AI Compute / Foundry / Packaging', version:'L5 Phase 1', progress:94, level:'L4+', confidence:'Medium-', marker:'📌 ใช้ช่วยตัดสินใจได้', cases:50, alpha:'Live audit baseline', drawdown:'Pending actual', valuation:'Proxy ready', status:'decision', nextGap:'Historical exact-return 25 rows', updated:'2026-05-07' },
    { id:'M8', name:'Cybersecurity Platform', version:'Batch 3', progress:58, level:'L3', confidence:'Low-Medium', marker:'🚫 ยังไม่ใช้ตัดสินใจ', cases:30, alpha:'Partial', drawdown:'Missing', valuation:'Missing', status:'not-ready', nextGap:'Batch 4 to 50 cases', updated:'2026-05-07' },
    { id:'M9', name:'Quantum Computing', version:'Batch 3', progress:65, level:'L3', confidence:'Low-Medium-', marker:'🚫 ยังไม่ใช้ตัดสินใจ', cases:38, alpha:'Partial vs QTUM/QQQ', drawdown:'High proxy', valuation:'Extreme proxy', status:'not-ready', nextGap:'Batch 4 to 50 cases', updated:'2026-05-07' },
    { id:'M10', name:'Space / Satellite / Frontier Infrastructure', version:'V0.6 L4', progress:84, level:'L4', confidence:'Low-Medium', marker:'🧪 ทดลองเท่านั้น', cases:50, alpha:'Framework ready', drawdown:'High proxy', valuation:'Proxy partial', status:'experimental', nextGap:'Full cash runway/dilution table', updated:'2026-05-07' },
    { id:'M11', name:'Payment Rails / Financial Infrastructure', version:'L4 Candidate', progress:78, level:'L3+', confidence:'Low-Medium', marker:'🚫 ยังไม่ใช้ตัดสินใจ', cases:50, alpha:'Needs metrics pack', drawdown:'Missing proxy', valuation:'Needs proxy', status:'not-ready', nextGap:'L4 metrics pack', updated:'2026-05-07' },
    { id:'M12', name:'Banks / Credit Cycle / Deposit Franchise', version:'Draft V0.1', progress:20, level:'Draft', confidence:'Very Low', marker:'🚫 ยังไม่ใช้ตัดสินใจ', cases:0, alpha:'Missing', drawdown:'Missing', valuation:'Needed', status:'not-ready', nextGap:'Batch 1', updated:'2026-05-07' },
    { id:'M13', name:'Water / Environmental Infrastructure / PFAS', version:'Draft', progress:25, level:'Draft', confidence:'Very Low', marker:'🚫 ยังไม่ใช้ตัดสินใจ', cases:0, alpha:'Missing', drawdown:'Missing', valuation:'Needed', status:'not-ready', nextGap:'Define water/PFAS model cases', updated:'2026-05-16' },
    { id:'M14', name:'AI Energy Infrastructure / Power Bottleneck', version:'Batch 3', progress:65, level:'L3', confidence:'Low-Medium-', marker:'🚫 ยังไม่ใช้ตัดสินใจ', cases:38, alpha:'Partial vs XLU/ICLN/TAN/QQQ', drawdown:'Partial', valuation:'Partial', status:'not-ready', nextGap:'Batch 4 to 50 + L4 metrics', updated:'2026-05-07' },
    { id:'M15', name:'Frontier / Speculative High-upside Themes', version:'Unrecovered', progress:10, level:'Draft', confidence:'Very Low', marker:'🚫 ยังไม่ใช้ตัดสินใจ', cases:0, alpha:'Missing', drawdown:'Missing', valuation:'Missing', status:'not-ready', nextGap:'Define taxonomy', updated:'2026-05-16' },
    { id:'M16', name:'Digital Commerce / Marketplace / Platform Economics', version:'Draft', progress:15, level:'Draft', confidence:'Very Low', marker:'🚫 ยังไม่ใช้ตัดสินใจ', cases:0, alpha:'Missing', drawdown:'Missing', valuation:'Missing', status:'not-ready', nextGap:'Batch 1', updated:'2026-05-16' }
  ],
  watchlist: [
    { ticker:'VOO', name:'Vanguard S&P 500 ETF', theme:'Core ETF', model:'Benchmark', stance:'Core DCA', buyZone:'DCA / market-wide dips', addZone:'5-10% market pullback', strongAdd:'Crash / recession panic', risk:'Low-Med', status:'hold', note:'ETF fallback when single-stock alpha unclear' },
    { ticker:'GOOGL', name:'Alphabet', theme:'AI / Ads / Cloud', model:'M1', stance:'Hold / Starter on dip', buyZone:'รอราคาปัจจุบันจริงก่อนคำนวณ', addZone:'Pullback zone', strongAdd:'Deep value only if thesis intact', risk:'Medium', status:'wait', note:'Quality compounder; must check current price before action' },
    { ticker:'MSFT', name:'Microsoft', theme:'AI / Cloud / Productivity', model:'M1', stance:'Hold / Wait pullback', buyZone:'รอราคาปัจจุบันจริงก่อนคำนวณ', addZone:'5-10% dip from live price', strongAdd:'Major market drawdown', risk:'Medium', status:'wait', note:'Core quality but valuation sensitive' },
    { ticker:'SOFI', name:'SoFi Technologies', theme:'Fintech / Digital Bank', model:'M5', stance:'Starter / Watch-buy', buyZone:'Model note: $13.5-$15.0 preferred add', addZone:'$12.0-$13.5 if credit stable', strongAdd:'<$10.5 only if thesis intact', risk:'High', status:'near', note:'Use credit kill switches' },
    { ticker:'HIMS', name:'Hims & Hers', theme:'Healthcare / Consumer Health', model:'M6', stance:'Speculative only', buyZone:'Small position only', addZone:'After regulatory clarity', strongAdd:'Not core', risk:'Extreme', status:'speculative', note:'GLP-1 compounding/regulatory risk' },
    { ticker:'ERII', name:'Energy Recovery', theme:'Water / Desalination', model:'M13', stance:'Study / Starter if thesis verified', buyZone:'Prior note: $8.5-$10.5', addZone:'<$8.5 if thesis intact', strongAdd:'Only after earnings validation', risk:'Medium-High', status:'near', note:'Water scarcity / desalination pick-and-shovel' },
    { ticker:'TTEK', name:'Tetra Tech', theme:'Water / PFAS', model:'M13', stance:'Watch-buy on pullback', buyZone:'Prior note: $26-$31', addZone:'<$26', strongAdd:'Need live valuation', risk:'Medium', status:'wait', note:'PFAS compliance and water engineering' },
    { ticker:'AXTI', name:'AXT Inc.', theme:'InP / Photonics', model:'M7', stance:'Avoid chase / speculative', buyZone:'Only after major reset', addZone:'Small satellite', strongAdd:'No heavy buy', risk:'Extreme', status:'avoid', note:'Theme interesting, valuation/news risk high' },
    { ticker:'NVDA', name:'Nvidia', theme:'AI Accelerator', model:'M7', stance:'Core but buy-on-dip', buyZone:'Use live price before zones', addZone:'Pullback / post-earnings reset', strongAdd:'Only if growth thesis intact', risk:'High', status:'wait', note:'Benchmark against SMH/SOXX' },
    { ticker:'CEG', name:'Constellation Energy', theme:'Nuclear / AI Power', model:'M4/M14', stance:'Quality watch-buy-on-pullback', buyZone:'Need current price', addZone:'PPA/data-center catalyst pullback', strongAdd:'Only if policy/cash flow intact', risk:'Medium-High', status:'wait', note:'Cash-flow nuclear power exposure' },
    { ticker:'SMR', name:'NuScale Power', theme:'SMR / Nuclear', model:'M4', stance:'Speculative small only', buyZone:'Milestone-gated', addZone:'After contract/deployment proof', strongAdd:'Not core', risk:'Extreme', status:'speculative', note:'High upside but commercial risk' },
    { ticker:'IONQ', name:'IonQ', theme:'Quantum', model:'M9', stance:'Speculative / avoid chase', buyZone:'Only after valuation reset', addZone:'Milestone proof', strongAdd:'Not core', risk:'Extreme', status:'speculative', note:'Revenue growth vs valuation gap must be checked' }
  ],
  batches: [
    { date:'2026-05-16', model:'M13', title:'Water/PFAS model proposed', impact:'New theme from bottleneck framework', progressDelta:'+draft', confidence:'Very Low', alpha:'Not tested', gap:'Needs first 12 cases' },
    { date:'2026-05-07', model:'M7', title:'L5 Phase 1 baseline', impact:'Forward audit for semiconductor universe', progressDelta:'+L5 phase', confidence:'Medium-', alpha:'Pending 3M/6M/12M', gap:'Historical exact returns' },
    { date:'2026-05-07', model:'M6', title:'Healthcare L4 metrics pack', impact:'L4 live pilot ready', progressDelta:'+L4', confidence:'Low-Medium', alpha:'Framework ready', gap:'Full exact returns' },
    { date:'2026-05-07', model:'M10', title:'Space L4 metrics pack', impact:'Risk-restricted decision support', progressDelta:'+L4', confidence:'Low-Medium', alpha:'Framework ready', gap:'Cash runway/dilution table' }
  ],
  agents: [
    { role:'PM', status:'Manual only', responsibility:'Track scope, blockers, priority, status report. Auto-run every 2h disabled to save limits.', lane:'Backlog' },
    { role:'BA', status:'Ready', responsibility:'Translate user needs into requirements, user stories, acceptance criteria.', lane:'In Progress' },
    { role:'Dev', status:'Ready', responsibility:'Build FE/BE features from issue-level requirements. Keep MVP simple and stable.', lane:'Backlog' },
    { role:'PQA', status:'Ready', responsibility:'Create test cases, click every button, report defects to BA/Dev.', lane:'Backlog' }
  ],
  tests: [
    { id:'TC-001', area:'Navigation', case:'All sidebar menu items open without crash', status:'Pass seed' },
    { id:'TC-002', area:'Model Registry', case:'Search M7 and filter L4 models', status:'Pass seed' },
    { id:'TC-003', area:'Watchlist', case:'Search SOFI and open detail panel', status:'Pass seed' },
    { id:'TC-004', area:'Buy Zone', case:'Status badges render for Near/Wait/Speculative/Avoid', status:'Pass seed' },
    { id:'TC-005', area:'Empty State', case:'No results shows friendly message, not crash', status:'Pass seed' },
    { id:'TC-006', area:'Mobile', case:'Tables scroll horizontally on narrow screen', status:'Manual needed' }
  ]
};
