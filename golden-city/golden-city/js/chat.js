// ═══════════════════════════════════
// js/chat.js — AI Qualification Chatbot
// ═══════════════════════════════════

const CHAT_STEPS = ['unit', 'name', 'phone', 'budget', 'timeline', 'loan'];

const CHAT_QUESTIONS = {
  unit:     { q: 'What are you looking for?',                     opts: ['2BHK Flat','3BHK Flat','1BHK Flat','Commercial Shop'] },
  name:     { q: 'Great choice! May I know your name?',           opts: [] },
  phone:    { q: 'Thank you! What is your WhatsApp number?',      opts: [] },
  budget:   { q: 'What is your approximate budget?',              opts: ['Under ₹20L','₹20L – ₹35L','₹35L – ₹50L','Above ₹50L'] },
  timeline: { q: 'When are you planning to buy?',                 opts: ['Within 1 month','1–3 months','3–6 months','Just exploring'] },
  loan:     { q: 'Will you need home loan assistance?',           opts: ['Yes, I need loan help','No, self-funded'] },
};

let chatStep = 0;
let chatData = { unit: '', name: '', phone: '', budget: '', timeline: '', loan: '' };

function startChat(unit) {
  document.getElementById('chatbot').scrollIntoView({ behavior: 'smooth' });
  if (unit) {
    setTimeout(() => { selectOption(null, unit, true); }, 800);
  }
}

function selectOption(el, val, skipHighlight) {
  if (!skipHighlight && el) {
    document.querySelectorAll('.chat-opt').forEach(b => b.classList.remove('selected'));
    el.classList.add('selected');
  }
  const key = CHAT_STEPS[chatStep];
  chatData[key] = val;
  appendMsg('user', val);
  document.getElementById('chatOptions').innerHTML = '';
  chatStep++;

  setTimeout(() => {
    if (chatStep < CHAT_STEPS.length) {
      const next = CHAT_STEPS[chatStep];
      showTyping(() => {
        removeTyping();
        appendMsg('bot', CHAT_QUESTIONS[next].q);
        if (CHAT_QUESTIONS[next].opts.length > 0) {
          showOptions(CHAT_QUESTIONS[next].opts);
          document.getElementById('chatInput').placeholder = 'Or type here...';
        } else {
          document.getElementById('chatInput').placeholder = next === 'phone' ? 'Enter your 10-digit number...' : 'Type your answer...';
          document.getElementById('chatInput').focus();
        }
      });
    } else {
      showTyping(() => { removeTyping(); finishChat(); });
    }
  }, 600);
}

function sendMsg() {
  const inp = document.getElementById('chatInput');
  const val = inp.value.trim();
  if (!val) return;
  inp.value = '';
  const key = CHAT_STEPS[chatStep];
  // Basic phone validation
  if (key === 'phone' && !/^[6-9]\d{9}$/.test(val.replace(/\s/g,''))) {
    appendMsg('bot', 'Please enter a valid 10-digit Indian mobile number.');
    return;
  }
  selectOption(null, val, true);
}

function showTyping(cb) {
  const msgs = document.getElementById('chatMessages');
  const t = document.createElement('div');
  t.className = 'msg bot'; t.id = 'typingMsg';
  t.innerHTML = '<div class="msg-bubble typing"><span></span><span></span><span></span></div>';
  msgs.appendChild(t);
  msgs.scrollTop = msgs.scrollHeight;
  setTimeout(cb, 1200);
}

function removeTyping() {
  const t = document.getElementById('typingMsg');
  if (t) t.remove();
}

function showOptions(opts) {
  const container = document.getElementById('chatOptions');
  container.innerHTML = '';
  opts.forEach(o => {
    const b = document.createElement('button');
    b.className = 'chat-opt';
    b.textContent = o;
    b.onclick = function() { selectOption(this, o); };
    container.appendChild(b);
  });
}

function appendMsg(type, text) {
  const msgs = document.getElementById('chatMessages');
  const d = document.createElement('div');
  d.className = 'msg ' + type;
  const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  d.innerHTML = `<div class="msg-bubble">${text}</div><div class="msg-time">${now}</div>`;
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
}

function finishChat() {
  const score = calcLeadScore(chatData);
  const tier  = score >= 75 ? '🔥 Hot' : score >= 45 ? '🌤 Warm' : '❄ Cold';
  const waLink = `https://wa.me/919130711811?text=Hi%2C%20I%20am%20${encodeURIComponent(chatData.name)}%2C%20interested%20in%20Golden%20City%20Sangamner.%20Looking%20for%3A%20${encodeURIComponent(chatData.unit)}%2C%20Budget%3A%20${encodeURIComponent(chatData.budget)}%2C%20Timeline%3A%20${encodeURIComponent(chatData.timeline)}`;

  appendMsg('bot', `Thank you <b>${chatData.name} ji</b>! 🙏 Your enquiry for a <b>${chatData.unit}</b> has been registered as <b>${tier}</b>.<br><br>Our team will contact you on <b>${chatData.phone}</b> shortly.`);

  setTimeout(() => {
    appendMsg('bot', `<a href="${waLink}" target="_blank" style="display:inline-block;background:#25D366;color:white;padding:10px 18px;border-radius:6px;text-decoration:none;font-weight:600;font-size:0.88rem;margin-top:4px">💬 Connect on WhatsApp Now</a>`);
    addNewLead(chatData, score, tier.replace(/[^\w\s]/g,'').trim());
  }, 800);
}
