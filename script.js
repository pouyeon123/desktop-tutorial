/* ── Loader ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('gone');
  }, 1400);
});

/* ── Header scroll ── */
const hd     = document.getElementById('hd');
const fabTop = document.getElementById('fabTop');

window.addEventListener('scroll', () => {
  if (hd)     hd.classList.toggle('stuck', window.scrollY > 40);
  if (fabTop) fabTop.classList.toggle('vis', window.scrollY > 400);
}, { passive: true });

/* ── Mobile nav ── */
const hbg    = document.getElementById('hbg');
const mobNav = document.getElementById('mob-nav');
if (hbg && mobNav) {
  hbg.addEventListener('click', () => mobNav.classList.toggle('open'));
  mobNav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mobNav.classList.remove('open'))
  );
}

/* ── Canvas particles ── */
(function () {
  const canvas = document.getElementById('canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let W, H, pts = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth  || 800;
    H = canvas.height = canvas.offsetHeight || 600;
  }

  function init() {
    pts = Array.from({ length: 40 }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  Math.random() * 1.6 + 0.5,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      a:  Math.random() * 0.4 + 0.1,
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

  resize();
  init();
  draw();
  window.addEventListener('resize', () => { resize(); init(); });
})();

/* ── Reveal on scroll ── */
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('on');
      ro.unobserve(e.target);
    }
  });
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
    if (!a.classList.contains('cta-link')) {
      a.style.color = (a.getAttribute('href') === `#${cur}`) ? 'var(--p)' : '';
    }
  });
}, { passive: true });

/* ── Material filter ── */
document.querySelectorAll('.ft').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.ft').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.f;
    document.querySelectorAll('.mc').forEach(c =>
      c.classList.toggle('hide', f !== 'all' && c.dataset.cat !== f)
    );
  });
});

/* ── Card → pre-select material ── */
document.querySelectorAll('.mc-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const sel = document.getElementById('matSel');
    if (sel && btn.dataset.m) sel.value = btn.dataset.m;
  });
});

/* ── FAQ accordion ── */
function toggleFaq(btn) {
  const item = btn.closest('.fi');
  if (!item) return;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.fi.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

/* ── Order form ── */
function submitForm(e) {
  e.preventDefault();
  const btn  = document.getElementById('qBtn');
  const form = document.getElementById('qForm');
  const done = document.getElementById('qDone');
  if (!btn || !form || !done) return;

  btn.textContent = '처리 중...';
  btn.disabled = true;

  setTimeout(() => {
    form.style.display = 'none';
    done.style.display = 'block';
    done.classList.add('on');
    done.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 800);
}

function resetForm() {
  const form = document.getElementById('qForm');
  const done = document.getElementById('qDone');
  const btn  = document.getElementById('qBtn');
  if (!form || !done || !btn) return;

  form.reset();
  form.style.display = 'block';
  done.style.display = 'none';
  btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>견적 요청 보내기';
  btn.disabled = false;
}
