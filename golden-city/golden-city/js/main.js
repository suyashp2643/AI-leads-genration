// ═══════════════════════════════════
// js/main.js — Scroll animations & utilities
// ═══════════════════════════════════

// ── Smooth scroll helper ──
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ── Fade-in on scroll ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── Navbar scroll effect ──
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.style.boxShadow = window.scrollY > 20 ? '0 2px 20px rgba(0,0,0,0.4)' : 'none';
});
