/* Preloader */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('preloader').classList.add('out'), 1400);
});

/* Header */
const header = document.getElementById('header');
const fabTop = document.getElementById('fabTop');

window.addEventListener('scroll', () => {
  header.classList.toggle('stuck', window.scrollY > 40);
  fabTop.classList.toggle('show', window.scrollY > 400);
}, { passive: true });

/* Mobile menu */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

/* Product filter */
document.querySelectorAll('.filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.f;
    document.querySelectorAll('.pcard').forEach(c => {
      c.classList.toggle('off', f !== 'all' && c.dataset.cat !== f);
    });
  });
});

/* Card → prefill material */
document.querySelectorAll('.pcard-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.dataset.mat;
    if (val) document.getElementById('materialSelect').value = val;
  });
});

/* FAQ */
function toggleFaq(btn) {
  const item = btn.closest('.fitem');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.fitem.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

/* Order form */
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.textContent = '처리 중...';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('orderForm').style.display = 'none';
    const done = document.getElementById('orderDone');
    done.style.display = 'block';
    done.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 800);
}

function resetForm() {
  const form = document.getElementById('orderForm');
  form.reset();
  form.style.display = 'block';
  document.getElementById('orderDone').style.display = 'none';
  const btn = document.getElementById('submitBtn');
  btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> 견적 요청 보내기';
  btn.disabled = false;
}

/* Scroll reveal */
const ro = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in');
    ro.unobserve(entry.target);
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-right').forEach(el => ro.observe(el));

/* Nav active highlight */
const sections = [...document.querySelectorAll('section[id]')];
const navLinks = [...document.querySelectorAll('#nav a')];

window.addEventListener('scroll', () => {
  const y = window.scrollY + 100;
  let cur = '';
  sections.forEach(s => { if (y >= s.offsetTop) cur = s.id; });
  navLinks.forEach(a => {
    const isActive = a.getAttribute('href') === `#${cur}`;
    a.style.color = (isActive && !a.classList.contains('nav-order')) ? 'var(--blue)' : '';
  });
}, { passive: true });

/* Simple hero particles */
(function () {
  const canvas = document.createElement('canvas');
  const wrap = document.getElementById('particles');
  if (!wrap) return;
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;opacity:.35';
  wrap.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let W, H, dots = [];

  function resize() {
    W = canvas.width = wrap.offsetWidth;
    H = canvas.height = wrap.offsetHeight;
  }

  function init() {
    dots = Array.from({ length: 40 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - .5) * .4,
      vy: (Math.random() - .5) * .4,
      a: Math.random() * .5 + .2,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    dots.forEach(d => {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0 || d.x > W) d.vx *= -1;
      if (d.y < 0 || d.y > H) d.vy *= -1;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${d.a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  init();
  draw();
  window.addEventListener('resize', () => { resize(); init(); });
})();
