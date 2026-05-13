// Preloader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('done');
  }, 1400);
});

// Header scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
  const floatTop = document.getElementById('floatTop');
  floatTop.classList.toggle('visible', window.scrollY > 400);
});

// Mobile nav
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
menuToggle.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});
mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// Product filter
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.product-card').forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

// Card order button — prefill material select
const materialMap = {
  pu: 'pu', eva: 'eva', melamine: 'melamine',
  neoprene: 'neoprene', epdm: 'epdm', nbr: 'nbr',
  silicone: 'silicone', pe: 'pe',
};
document.querySelectorAll('.card-order-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const val = btn.dataset.material;
    if (val) document.getElementById('material').value = val;
  });
});

// FAQ accordion
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// Order form
function submitOrder(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.textContent = '처리 중...';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('orderForm').style.display = 'none';
    const success = document.getElementById('orderSuccess');
    success.style.display = 'block';
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    triggerAos(success);
  }, 900);
}

function resetForm() {
  const form = document.getElementById('orderForm');
  form.reset();
  form.style.display = 'block';
  document.getElementById('orderSuccess').style.display = 'none';
  const btn = document.getElementById('submitBtn');
  btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> 견적 요청 보내기';
  btn.disabled = false;
}

// Simple AOS (Animate on Scroll)
function triggerAos(el) {
  el.classList.add('aos-in');
}

const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.aosDelay ? parseInt(entry.target.dataset.aosDelay) : 0;
      setTimeout(() => entry.target.classList.add('aos-in'), delay);
      aosObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-aos]').forEach(el => aosObserver.observe(el));

// Active nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul li a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--primary)' : '';
  });
}, { passive: true });
