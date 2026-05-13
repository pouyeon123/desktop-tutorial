/* ── Loader ── */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('gone'), 1400);
});

/* ── Header ── */
const hd     = document.getElementById('hd');
const fabTop = document.getElementById('fabTop');

window.addEventListener('scroll', () => {
  hd.classList.toggle('stuck', window.scrollY > 40);
  fabTop.classList.toggle('vis', window.scrollY > 400);
}, { passive: true });

/* ── Mobile nav ── */
const hbg    = document.getElementById('hbg');
const mobNav = document.getElementById('mob-nav');
hbg.addEventListener('click', () => mobNav.classList.toggle('open'));
mobNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobNav.classList.remove('open')));

/* ── Canvas particles ── */
(function () {
  const canvas = document.getElementById('canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  function init() {
    pts = Array.from({ length: 45 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.8 + .6,
      vx: (Math.random() - .5) * .35,
      vy: (Math.random() - .5) * .35,
      a: Math.random() * .45 + .1,
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  resize(); init(); draw();
  window.addEventListener('resize', () => { resize(); init(); });
})();

/* ── Reveal on scroll ── */
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); ro.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('[data-r]').forEach(el => ro.observe(el));

/* ── Nav active highlight ── */
const secEls  = [...document.querySelectorAll('section[id]')];
const navAncs = [...document.querySelectorAll('.pc-nav a')];
window.addEventListener('scroll', () => {
  const y = window.scrollY + 90;
  let cur = '';
  secEls.forEach(s => { if (y >= s.offsetTop) cur = s.id; });
  navAncs.forEach(a => {
    const match = a.getAttribute('href') === `#${cur}`;
    if (!a.classList.contains('cta-link')) a.style.color = match ? 'var(--p)' : '';
  });
}, { passive: true });

/* ── Material filter ── */
document.querySelectorAll('.ft').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.ft').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.f;
    document.querySelectorAll('.mc').forEach(c => c.classList.toggle('hide', f !== 'all' && c.dataset.cat !== f));
  });
});

/* ── Card → pre-select material ── */
document.querySelectorAll('.mc-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.dataset.m;
    if (val) document.getElementById('matSel').value = val;
  });
});

/* ── FAQ accordion ── */
function faq(btn) {
  const item = btn.closest('.fi');
  const open = item.classList.contains('open');
  document.querySelectorAll('.fi.open').forEach(i => i.classList.remove('open'));
  if (!open) item.classList.add('open');
}

/* ── Order form ── */
function submitForm(e) {
  e.preventDefault();
  const btn = document.getElementById('qBtn');
  btn.textContent = '처리 중...';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('qForm').style.display = 'none';
    const done = document.getElementById('qDone');
    done.style.display = 'block';
    done.classList.add('on');
    done.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 800);
}

function resetForm() {
  const form = document.getElementById('qForm');
  form.reset();
  form.style.display = 'block';
  document.getElementById('qDone').style.display = 'none';
  const btn = document.getElementById('qBtn');
  btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>견적 요청 보내기';
  btn.disabled = false;
}
