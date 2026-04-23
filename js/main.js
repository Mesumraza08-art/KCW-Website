/* ============================================
   KCW — Khizar's Custom Wood Work
   Main JS — interactivity + page orchestration.
   Shared markup lives in templates.js; data in data.js.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inject shared chrome (header/footer) based on slot data attrs.
  injectSiteChrome();

  // 2. Render detail page body if this is project.html / service.html.
  injectDetailFromQuery();

  // 3. Populate any data-driven sections on the home page
  //    (portfolio slides + services tiles) if their slots exist.
  injectDataDrivenSections();

  // 4. Wire up interactive behaviour. Each initializer is a no-op
  //    if its required DOM isn't on the current page.
  initSplash();
  initHeader();
  initMobileMenu();
  initNavHighlight();
  initSmoothScroll();
  initScrollReveal();
  initAboutHero();
  initAboutGap();
  initCounters();
  initContactForm();
  initImageLoad();
  initFounderSlideshow();
  initProjectCarousel();
});

/* ============================================
   SPLASH — white bg + KCW logo, smooth fade
   ============================================ */
function initSplash() {
  const splash = document.getElementById('splash');
  const logo = document.getElementById('logoDark');
  if (!splash || !logo) return;

  requestAnimationFrame(() => {
    logo.classList.add('visible');
  });

  setTimeout(() => {
    splash.classList.add('exit');
    setTimeout(() => splash.remove(), 1000);
  }, 1400);
}

/* ============================================
   HEADER — Scroll state
   ============================================ */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  // Only scroll-toggle the header look on pages with a hero (index).
  // On detail pages, the header starts scrolled and stays scrolled.
  const hasHero = !!document.querySelector('.hero');
  if (!hasHero) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.pageYOffset > 50);
  }, { passive: true });
}

/* ============================================
   MOBILE MENU
   ============================================ */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  const body = document.body;
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open', isOpen);
    body.classList.toggle('menu-open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  mobileNav.querySelectorAll('.nav-mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      body.classList.remove('menu-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ============================================
   NAV HIGHLIGHT — Active link on scroll
   ============================================ */
function initNavHighlight() {
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  if (!navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id === 'heroGrid' ? 'about' : entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });

  document.querySelectorAll('section[id]').forEach(s => observer.observe(s));
}

/* ============================================
   SMOOTH SCROLL — Anchor nav links
   ============================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const headerH = document.querySelector('.header')?.offsetHeight || 80;
      window.scrollTo({ top: target.offsetTop - headerH, behavior: 'smooth' });
    });
  });
}

/* ============================================
   SCROLL REVEAL — .reveal elements
   ============================================ */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -80px 0px', threshold: 0.1 });

  els.forEach(el => observer.observe(el));
}

/* ============================================
   ABOUT HERO — KCW grid reveal when scrolled into view
   ============================================ */
function initAboutHero() {
  const heroGrid = document.getElementById('heroGrid');
  if (!heroGrid) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        heroGrid.classList.add('revealed');
        observer.unobserve(heroGrid);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(heroGrid);
}

/* ============================================
   ABOUT GAP — Cream gap shrinks as user scrolls toward #about
   ============================================ */
function initAboutGap() {
  const about = document.getElementById('about');
  const hero = document.getElementById('home');
  if (!about || !hero) return;

  const MAX_GAP = 5; // rem
  let ticking = false;

  const update = () => {
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const scrollY = window.scrollY;
    // Start shrinking when user is in the last 50% of the hero
    const startShrink = heroBottom - window.innerHeight * 0.5;
    const endShrink = heroBottom;
    let progress = (scrollY - startShrink) / (endShrink - startShrink);
    progress = Math.max(0, Math.min(1, progress));
    const gap = MAX_GAP * (1 - progress);
    about.style.setProperty('--about-gap', gap.toFixed(2) + 'rem');
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();
}

/* ============================================
   COUNTERS — Animate stat numbers on visibility
   ============================================ */
function initCounters() {
  const statsSection = document.querySelector('.about-stats');
  if (!statsSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);

      entry.target.querySelectorAll('.stat-number[data-count]').forEach(counter => {
        const target = parseInt(counter.dataset.count);
        const step = target / (2000 / 16);
        let current = 0;

        const tick = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(tick);
          } else {
            counter.textContent = target;
          }
        };
        tick();
      });
    });
  }, { threshold: 0.5 });

  observer.observe(statsSection);
}

/* ============================================
   CONTACT FORM
   ============================================ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const btn = document.getElementById('submitBtn');
  const originalLabel = btn.textContent;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    btn.disabled = true;
    btn.textContent = 'Sending…';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        btn.textContent = 'Message Sent ✓';
        btn.style.background = 'var(--green-mid)';
        form.reset();
      } else {
        btn.textContent = 'Failed — Try Again';
        btn.style.background = '#a23a3a';
        console.error('Contact form error:', data);
      }
    } catch (err) {
      btn.textContent = 'Failed — Try Again';
      btn.style.background = '#a23a3a';
      console.error('Contact form error:', err);
    }

    setTimeout(() => {
      btn.textContent = originalLabel;
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);
  });
}

/* ============================================
   LAZY IMAGE LOAD
   ============================================ */
function initImageLoad() {
  const images = document.querySelectorAll('img[data-src]');
  if (!images.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      img.addEventListener('load', () => img.classList.add('loaded'));
      observer.unobserve(img);
    });
  }, { rootMargin: '200px 0px' });

  images.forEach(img => observer.observe(img));
}

/* ============================================
   PROJECT CAROUSEL — 3D floating-house slider
   ============================================ */
function initProjectCarousel() {
  const stage = document.getElementById('projectStage');
  if (!stage || typeof gsap === 'undefined') return;

  const slides = Array.from(stage.querySelectorAll('.project-slide'));
  const houses = slides.map(s => s.querySelector('.project-house'));
  const navPrev = stage.querySelector('.project-nav-prev');
  const navNext = stage.querySelector('.project-nav-next');

  if (!slides.length) return;

  let index = slides.findIndex(s => s.classList.contains('is-active'));
  if (index < 0) index = 0;
  let isAnimating = false;

  const floatTweens = houses.map(house => {
    if (!house) return null;
    return gsap.to(house, {
      y: -14,
      duration: 3.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  });

  const goTo = (newIndex, direction) => {
    if (isAnimating || newIndex === index) return;
    const total = slides.length;
    const target = ((newIndex % total) + total) % total;
    const outgoing = slides[index];
    const incoming = slides[target];
    const inHouse = houses[target];
    const dir = direction || (target > index ? 1 : -1);

    isAnimating = true;
    const OFFSET = window.innerWidth < 800 ? 120 : 240;

    if (inHouse) gsap.set(inHouse, { rotationX: 0, rotationY: 0 });

    gsap.set(outgoing, { zIndex: 1 });
    gsap.set(incoming, { zIndex: 2, x: dir * OFFSET, opacity: 0 });
    incoming.classList.add('is-active');

    const tl = gsap.timeline({
      onComplete: () => {
        outgoing.classList.remove('is-active');
        gsap.set(outgoing, { clearProps: 'transform,opacity,zIndex' });
        gsap.set(incoming, { clearProps: 'zIndex' });
        isAnimating = false;
      },
    });

    tl.to(outgoing, {
      x: -dir * OFFSET,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
    }, 0);

    tl.to(incoming, {
      x: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power3.out',
    }, 0.15);

    index = target;
  };

  navPrev?.addEventListener('click', () => goTo(index - 1, -1));
  navNext?.addEventListener('click', () => goTo(index + 1, 1));

  document.addEventListener('keydown', (e) => {
    if (!isElementInViewport(stage)) return;
    if (e.key === 'ArrowLeft') goTo(index - 1, -1);
    if (e.key === 'ArrowRight') goTo(index + 1, 1);
  });

  const MAX_TILT = 14;
  slides.forEach((slide, i) => {
    const house = houses[i];
    if (!house) return;

    let rect = null;
    const captureRect = () => { rect = slide.getBoundingClientRect(); };

    slide.addEventListener('mouseenter', () => {
      captureRect();
      floatTweens[i]?.pause();
    });

    slide.addEventListener('mousemove', (e) => {
      if (!rect) captureRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(house, {
        rotationY: px * MAX_TILT * 2,
        rotationX: -py * MAX_TILT * 2,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1600,
        transformOrigin: 'center center',
      });
    });

    slide.addEventListener('mouseleave', () => {
      gsap.to(house, {
        rotationY: 0,
        rotationX: 0,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        onComplete: () => { floatTweens[i]?.resume(); },
      });
    });

    window.addEventListener('resize', () => { rect = null; });
    window.addEventListener('scroll', () => { rect = null; }, { passive: true });
  });
}

function isElementInViewport(el) {
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < window.innerHeight;
}

/* ============================================
   FOUNDER SLIDESHOW — crossfade portraits
   ============================================ */
function initFounderSlideshow() {
  const slideshow = document.getElementById('founderSlideshow');
  if (!slideshow) return;
  const slides = slideshow.querySelectorAll('.founder-slide');
  if (slides.length < 2) return;

  let index = 0;
  setInterval(() => {
    slides[index].classList.remove('is-active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('is-active');
  }, 4500);
}

/* ============================================
   WORD REVEAL — keyframes injected once
   ============================================ */
const style = document.createElement('style');
style.textContent = `
  @keyframes wordReveal {
    from { transform: translateY(100%); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
`;
document.head.appendChild(style);
