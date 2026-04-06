/* ===========================
   TAVARES BARBER — SCRIPT
   =========================== */

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Mobile menu toggle ──
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
  menuToggle.classList.toggle('active');
});

// Close menu on nav link click
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.classList.remove('active');
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    mainNav.classList.remove('open');
    menuToggle.classList.remove('active');
  }
});

// ── Scroll fade-in animations ──
const fadeEls = document.querySelectorAll(
  '.service-card, .testimonial-card, .pricing-card, .gallery__item, .about__grid, .stat'
);

fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => observer.observe(el));

// ── Booking form ──
const bookingForm = document.getElementById('bookingForm');
const dateInput = document.getElementById('date');

// Set min date to today
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;
  const date = document.getElementById('date').value;

  if (!name || !phone || !service || !date) return;

  const msg = encodeURIComponent(
    `Olá! Gostaria de agendar um horário.\n\n*Nome:* ${name}\n*Serviço:* ${service}\n*Data:* ${formatDate(date)}\n*Telefone:* ${phone}`
  );

  window.open(`https://wa.me/5511999990000?text=${msg}`, '_blank');
});

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

// ── Smooth active nav highlight ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar__nav a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}`
      ? 'var(--gold)'
      : '';
  });
});