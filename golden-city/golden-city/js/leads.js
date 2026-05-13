// ═══════════════════════════════════
// js/leads.js — Lead Scoring & Dashboard
// ═══════════════════════════════════

// ── Sample demo leads (replace with real data / backend later) ──
let allLeads = [
  { name: 'Rajesh Patil',     phone: '98XXXXXXXX', unit: '2BHK Flat',        budget: '₹35L – ₹50L', timeline: 'Within 1 month', loan: 'No, self-funded',       score: 95, tier: 'Hot' },
  { name: 'Sunita Deshmukh',  phone: '97XXXXXXXX', unit: '3BHK Flat',        budget: '₹35L – ₹50L', timeline: '1–3 months',     loan: 'Yes, I need loan help', score: 70, tier: 'Warm' },
  { name: 'Amit Thorat',      phone: '96XXXXXXXX', unit: 'Commercial Shop',  budget: 'Above ₹50L',   timeline: 'Within 1 month', loan: 'No, self-funded',       score: 95, tier: 'Hot' },
  { name: 'Priya Shinde',     phone: '95XXXXXXXX', unit: '2BHK Flat',        budget: '₹20L – ₹35L', timeline: '3–6 months',     loan: 'Yes, I need loan help', score: 50, tier: 'Warm' },
  { name: 'Vijay Kulkarni',   phone: '94XXXXXXXX', unit: '1BHK Flat',        budget: 'Under ₹20L',   timeline: 'Just exploring', loan: 'Yes, I need loan help', score: 25, tier: 'Cold' },
];

let currentFilter = 'all';

// ── Scoring Algorithm ──
function calcLeadScore(d) {
  let s = 0;
  // Budget score (0–35)
  if      (d.budget === 'Above ₹50L')   s += 35;
  else if (d.budget === '₹35L – ₹50L') s += 35;
  else if (d.budget === '₹20L – ₹35L') s += 25;
  else                                   s += 10;
  // Timeline score (0–40)
  if      (d.timeline === 'Within 1 month') s += 40;
  else if (d.timeline === '1–3 months')     s += 30;
  else if (d.timeline === '3–6 months')     s += 15;
  else                                       s += 5;
  // Loan score (0–20): self-funded = higher intent
  s += d.loan === 'No, self-funded' ? 20 : 10;
  return Math.min(s, 100);
}

// ── Add new lead from chatbot ──
function addNewLead(d, score, tierRaw) {
  const tier = tierRaw.includes('Hot') ? 'Hot' : tierRaw.includes('Warm') ? 'Warm' : 'Cold';
  allLeads.unshift({ name: d.name || 'New Enquiry', phone: d.phone || '—', unit: d.unit, budget: d.budget, timeline: d.timeline, loan: d.loan, score, tier });
  renderLeads();
  updateCounts();
  // Save to localStorage so data persists on page reload
  try { localStorage.setItem('gc_leads', JSON.stringify(allLeads)); } catch(e) {}
}

// ── Filter tabs ──
function filterLeads(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.score-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderLeads();
}

// ── Render table ──
function renderLeads() {
  const body = document.getElementById('leadsBody');
  if (!body) return;
  const list = currentFilter === 'all' ? allLeads : allLeads.filter(l => l.tier === currentFilter);
  if (list.length === 0) {
    body.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:2rem;color:var(--muted)">No leads yet</td></tr>`;
    return;
  }
  body.innerHTML = list.map(l => {
    const waMsg = `https://wa.me/91${l.phone.replace(/\D/g,'')}?text=Namaste%20${encodeURIComponent(l.name)}%20ji!%20Thank%20you%20for%20enquiring%20about%20Golden%20City%20Sangamner.`;
    return `<tr>
      <td style="font-weight:500">${l.name}</td>
      <td>${l.phone}</td>
      <td>${l.unit}</td>
      <td>${l.budget}</td>
      <td>${l.timeline}</td>
      <td>
        <div class="score-bar">
          <div class="score-track"><div class="score-fill" style="width:${l.score}%"></div></div>
          <span class="score-num">${l.score}</span>
        </div>
      </td>
      <td><span class="badge ${l.tier.toLowerCase()}">${l.tier}</span></td>
      <td><button class="action-btn" onclick="window.open('${waMsg}','_blank')">WhatsApp</button></td>
    </tr>`;
  }).join('');
}

// ── Update counters ──
function updateCounts() {
  const total = document.getElementById('totalCount');
  const hot   = document.getElementById('hotCount');
  const warm  = document.getElementById('warmCount');
  const cold  = document.getElementById('coldCount');
  if (total) total.textContent = allLeads.length;
  if (hot)   hot.textContent   = allLeads.filter(l => l.tier === 'Hot').length;
  if (warm)  warm.textContent  = allLeads.filter(l => l.tier === 'Warm').length;
  if (cold)  cold.textContent  = allLeads.filter(l => l.tier === 'Cold').length;
}

// ── Load saved leads on startup ──
(function loadSavedLeads() {
  try {
    const saved = localStorage.getItem('gc_leads');
    if (saved) allLeads = JSON.parse(saved);
  } catch(e) {}
  renderLeads();
  updateCounts();
})();
