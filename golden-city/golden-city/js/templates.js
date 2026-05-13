// ═══════════════════════════════════
// js/templates.js — WhatsApp Templates
// ═══════════════════════════════════

const WA_TEMPLATES = {
  hot: `Namaste [Name] ji! 🙏

Thank you for your interest in *Golden City, Sangamner* by Jaybhadra Builders.

You asked about a *[Unit Type]* — we have availability right now. Would you like to schedule a site visit this week?

📍 Near Swadeshkunj, Shri Ram Chowk, Sangamner
📞 9130711811`,

  warm: `Namaste [Name] ji! 🙏

We received your enquiry for Golden City Sangamner. Our team is ready to help you find the perfect [Unit Type].

✅ 27+ projects delivered
✅ Timely possession guaranteed
✅ Loan assistance available

When would be a good time to talk? 😊`,

  cold: `Namaste [Name] ji! 🙏

Just checking in — are you still exploring flats in Sangamner? Golden City still has a few units available.

🏠 Wing A: 24 units
🏠 Wing B & C: 42 units
🏪 12 Commercial Shops

Happy to share photos and pricing. Let us know! 🙂`
};

function copyTemplate(type) {
  const text = WA_TEMPLATES[type];
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector(`[onclick="copyTemplate('${type}')"]`);
    if (btn) {
      btn.textContent = '✓ Copied!';
      setTimeout(() => { btn.textContent = 'Copy Template'; }, 1800);
    }
  }).catch(() => {
    // Fallback for older browsers
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  });
}
