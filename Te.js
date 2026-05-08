/* ============================================
   SIMA — Marie Julienne Mendy | Premium Portfolio
   script.js
   ============================================ */

'use strict';

// ─── LOADER ───────────────────────────────────────────────────────────────────
const loader = document.getElementById('loader');

function hideLoader() {
  loader.classList.add('hidden');
  document.body.style.overflow = '';
  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 150);
  });
}

// Fallback : force hide après 2.5s quoi qu'il arrive
const loaderTimeout = setTimeout(hideLoader, 2500);

window.addEventListener('load', () => {
  clearTimeout(loaderTimeout);
  setTimeout(hideLoader, 400);
});

// Bloquer le scroll pendant le chargement
document.body.style.overflow = 'hidden';


// ─── CUSTOM CURSOR ────────────────────────────────────────────────────────────
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursorDot.style.left  = mouseX + 'px';
  cursorDot.style.top   = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Hover state on interactive elements
const hoverTargets = document.querySelectorAll('a, button, .service-card, .portfolio-card, .skill-badge, .contact-item, .social-btn');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
  cursorDot.style.opacity  = '0';
  cursorRing.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursorDot.style.opacity  = '1';
  cursorRing.style.opacity = '0.7';
});


// ─── NAVIGATION ───────────────────────────────────────────────────────────────
const nav       = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});


// ─── SMOOTH SCROLL ────────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


// ─── REVEAL ON SCROLL ─────────────────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el    = entry.target;
      const delay = parseInt(el.dataset.delay || 0, 10);
      setTimeout(() => el.classList.add('visible'), delay);
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal:not(.hero .reveal)').forEach(el => {
  revealObserver.observe(el);
});


// ─── SKILL BAR ANIMATION ──────────────────────────────────────────────────────
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-fill');
      fills.forEach(fill => {
        setTimeout(() => {
          fill.style.width = fill.dataset.width + '%';
        }, 400);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills-sec');
if (skillsSection) skillObserver.observe(skillsSection);


// ─── BACK TO TOP ──────────────────────────────────────────────────────────────
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 600);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ─── CONTACT FORM ─────────────────────────────────────────────────────────────
const contactForm  = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"] span');
    btn.textContent = 'Envoi en cours…';
    setTimeout(() => {
      contactForm.reset();
      btn.textContent = 'Envoyer le message';
      formSuccess.classList.add('show');
      setTimeout(() => formSuccess.classList.remove('show'), 5000);
    }, 1400);
  });
}


// ─── PARALLAX HERO ────────────────────────────────────────────────────────────
const heroOrbs = document.querySelectorAll('.hero-orb');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  heroOrbs.forEach((orb, i) => {
    const speed = i === 0 ? 0.4 : 0.25;
    orb.style.transform = `translateY(${scrolled * speed}px)`;
  });
});


// ─── ACTIVE NAV LINK HIGHLIGHT ────────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(sec => navObserver.observe(sec));


// ─── MAGNETIC BUTTONS ─────────────────────────────────────────────────────────
document.querySelectorAll('.btn-primary, .btn-outline, .social-btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect   = btn.getBoundingClientRect();
    const cx     = rect.left + rect.width  / 2;
    const cy     = rect.top  + rect.height / 2;
    const dx     = (e.clientX - cx) * 0.25;
    const dy     = (e.clientY - cy) * 0.25;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});


// ─── COUNTER ANIMATION FOR STATS ──────────────────────────────────────────────
function animateCounter(el, target, suffix) {
  let current = 0;
  const step  = Math.ceil(target / 50);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current + suffix;
  }, 30);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(num => {
        const raw    = num.textContent.trim();
        const suffix = raw.includes('+') ? '+' : '';
        const value  = parseInt(raw);
        if (!isNaN(value)) animateCounter(num, value, suffix);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('.about');
if (aboutSection) statsObserver.observe(aboutSection);