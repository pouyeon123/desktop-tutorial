/* ── 카카오맵 ── */
window.addEventListener('load', function () {
  if (typeof kakao === 'undefined' || !kakao.maps) return;
  var mapEl = document.getElementById('kakaoMap');
  if (!mapEl) return;
  kakao.maps.load(function () {
    var coords = new kakao.maps.LatLng(37.6937, 126.5483);
    var map = new kakao.maps.Map(mapEl, { center: coords, level: 4 });
    var marker = new kakao.maps.Marker({ map: map, position: coords });
    var infowindow = new kakao.maps.InfoWindow({
      content: '<div style="padding:8px 14px;font-size:13px;font-weight:700;white-space:nowrap;">TY스펀지</div>'
    });
    infowindow.open(map, marker);
  });
});

/* ── Loader ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('gone');
  }, 1400);
});

/* ── Header scroll + Top button ── */
const header = document.getElementById('header');
const topBtn = document.getElementById('topBtn');

window.addEventListener('scroll', () => {
  if (header) header.classList.toggle('stuck', window.scrollY > 40);
  if (topBtn) topBtn.classList.toggle('vis', window.scrollY > 400);
}, { passive: true });

if (topBtn) topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── Mobile nav ── */
const menuBtn   = document.getElementById('menuBtn');
const mobileGnb = document.getElementById('mobileGnb');
if (menuBtn && mobileGnb) {
  menuBtn.addEventListener('click', () => mobileGnb.classList.toggle('open'));
  mobileGnb.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mobileGnb.classList.remove('open'))
  );
}

/* ── Canvas particles ── */
(function () {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let W, H, pts = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth  || 800;
    H = canvas.height = canvas.offsetHeight || 600;
  }

  function init() {
    pts = Array.from({ length: 45 }, () => ({
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

  resize(); init(); draw();
  window.addEventListener('resize', () => { resize(); init(); });
})();

/* ── Reveal on scroll ── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('on');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));

/* ── Nav active highlight ── */
const secEls = [...document.querySelectorAll('section[id]')];
const gnbAncs = [...document.querySelectorAll('#gnb a')];

window.addEventListener('scroll', () => {
  const y = window.scrollY + 90;
  let cur = '';
  secEls.forEach(s => { if (y >= s.offsetTop) cur = s.id; });
  gnbAncs.forEach(a => {
    if (!a.classList.contains('gnb-cta')) {
      a.style.color = (a.getAttribute('href') === `#${cur}`) ? 'var(--p)' : '';
    }
  });
}, { passive: true });

/* ── Product filter ── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.product-card').forEach(c =>
      c.classList.toggle('hide', f !== 'all' && c.dataset.category !== f)
    );
  });
});

/* ── Card → pre-select material ── */
document.querySelectorAll('.card-order-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const sel = document.getElementById('materialSelect');
    if (sel && btn.dataset.mat) sel.value = btn.dataset.mat;
  });
});

/* ── FAQ accordion ── */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    if (!item) return;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ── Order form ── */
const orderForm = document.getElementById('orderForm');
if (orderForm) {
  orderForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn  = document.getElementById('submitBtn');
    const done = document.getElementById('orderDone');
    if (!btn || !done) return;

    btn.textContent = '처리 중...';
    btn.disabled = true;

    setTimeout(() => {
      orderForm.style.display = 'none';
      done.style.display = 'block';
      done.classList.add('on');
      done.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 800);
  });
}

function resetOrderForm() {
  const form = document.getElementById('orderForm');
  const done = document.getElementById('orderDone');
  const btn  = document.getElementById('submitBtn');
  if (!form || !done || !btn) return;

  form.reset();
  form.style.display = 'block';
  done.style.display = 'none';
  btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>견적 요청 보내기';
  btn.disabled = false;
}
