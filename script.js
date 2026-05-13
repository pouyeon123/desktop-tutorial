// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile nav toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobileNav');

menuToggle.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

function closeMobileNav() {
  mobileNav.classList.remove('open');
}

// Product filter
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    productCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// "이 소재로 주문" button — prefill the material select
document.querySelectorAll('.card-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const card = btn.closest('.product-card');
    const materialName = card.querySelector('h3').textContent.trim();
    const select = document.getElementById('material');
    const options = Array.from(select.options);

    const materialMap = {
      '폴리우레탄 폼': 'pu',
      'EVA 폼': 'eva',
      '멜라민 스펀지': 'melamine',
      '네오프렌': 'neoprene',
      'EPDM 스펀지': 'epdm',
      'NBR 스펀지': 'nbr',
      '실리콘 스펀지': 'silicone',
      'PE 폼': 'pe',
    };

    const value = materialMap[materialName];
    if (value) select.value = value;
  });
});

// Order form submission
function submitOrder(e) {
  e.preventDefault();

  const form = document.getElementById('orderForm');
  const success = document.getElementById('orderSuccess');

  // Simulate submission
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.textContent = '처리 중...';
  submitBtn.disabled = true;

  setTimeout(() => {
    form.style.display = 'none';
    success.style.display = 'block';
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 800);
}

function resetForm() {
  const form = document.getElementById('orderForm');
  const success = document.getElementById('orderSuccess');

  form.reset();
  form.style.display = 'block';
  success.style.display = 'none';

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.textContent = '견적 요청 보내기';
  submitBtn.disabled = false;
}

// Scroll reveal for cards
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = `${(i % 4) * 0.08}s`;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.product-card, .step').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});
