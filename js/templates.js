/* ============================================
   KCW — Shared markup renderers
   Reads SITE / PROJECTS from data.js. Every page
   pulls its header, footer, and (on project.html)
   its detail body from these functions.
   ============================================ */

/* ---------- Header ---------- */

function renderSiteHeader({ activeId = 'home', scrolled = false } = {}) {
  const link = (item, variant = 'nav-link') => {
    const isActive = item.id === activeId;
    const cls = `${variant}${isActive ? ' active' : ''}`;
    return `<a href="${item.href}" class="${cls}" data-section="${item.id}">${item.label}</a>`;
  };

  return `
    <header class="header header-dark${scrolled ? ' scrolled' : ''}">
      <div class="header-inner">
        <a href="index.html" class="logo" aria-label="${SITE.name} Home">
          <img src="assets/logo-light.png" alt="${SITE.name} Logo" class="logo-img logo-img-light">
          <img src="assets/logo-dark.png" alt="${SITE.name} Logo" class="logo-img logo-img-dark">
        </a>
        <nav class="nav-desktop" aria-label="Main navigation">
          ${SITE.nav.map(item => link(item)).join('')}
          <a href="${SITE.contact.instagramUrl}" target="_blank" rel="noopener" class="nav-ig-link" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
        </nav>
        <button class="hamburger" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
        <div class="nav-mobile" aria-hidden="true">
          ${SITE.nav.map(item => link(item, 'nav-mobile-link')).join('')}
        </div>
      </div>
    </header>
  `;
}

/* ---------- Footer ---------- */

function renderSiteFooter({ variant = 'full' } = {}) {
  const { contact, nav, year, name, fullName, tagline } = SITE;
  const copyright = `&copy; ${year} ${name} — ${fullName}. All rights reserved.`;

  if (variant === 'minimal') {
    return `
      <footer class="footer">
        <div class="container">
          <div class="footer-bottom">
            <p>${copyright}</p>
          </div>
        </div>
      </footer>
    `;
  }

  const navLinks = [
    `<a href="index.html">Home</a>`,
    ...nav.map(n => `<a href="${n.href}">${n.label}</a>`),
  ].join('');

  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="index.html" class="footer-brand-logo">
              <img src="assets/logo-light.png" alt="${name}">
            </a>
            <p>${tagline}</p>
          </div>
          <div>
            <h5>Navigate</h5>
            <div class="footer-links">${navLinks}</div>
          </div>
          <div>
            <h5>Contact</h5>
            <div class="footer-contact-item">${contact.location}</div>
            <div class="footer-contact-item">
              <a href="mailto:${contact.email}">${contact.email}</a>
            </div>
            <div class="footer-contact-item">
              <a href="tel:${contact.phoneRaw}">${contact.phone}</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>${copyright}</p>
          <div class="footer-social">
            <a href="${contact.instagramUrl}" target="_blank" rel="noopener" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="#" aria-label="Pinterest">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.993 3.995-.282 1.193.599 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.091.375-.293 1.199-.334 1.363-.053.225-.174.271-.402.163-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

/* ---------- Project detail page ---------- */

function renderDetailPage(item, { backHref, backLabel }) {
  if (item.gallery?.length) {
    const lastIdx = item.gallery.length - 1;
    return `
      <section class="svc-detail-gallery">
        <div class="svc-gallery-grid">
          ${item.gallery.map((g, i) => g.type === 'video'
            ? `<div class="svc-gallery-item svc-gallery-item--video"><video autoplay muted loop playsinline><source src="${g.src}" type="video/mp4"></video></div>`
            : `<div class="svc-gallery-item${i === lastIdx ? ' is-last' : ''}"><img src="${g.src}" alt="Project photo"></div>`
          ).join('')}
        </div>
      </section>
    `;
  }

  const paragraphs = item.narrative.paragraphs.map(p => `<p>${p}</p>`).join('');
  const specs = item.specs.items
    .map(it => `<li><strong>${it.label}</strong>${it.value}</li>`)
    .join('');

  return `
    <section class="svc-detail-hero" style="--svc-hero-img:url('${item.heroImage}');">
      <div class="container">
        <span class="svc-detail-eyebrow">${item.detailEyebrow}</span>
        <h1>${item.titleLong}</h1>
        <p class="svc-detail-lede">${item.lede}</p>
      </div>
    </section>

    <section class="svc-detail-body">
      <div class="container">
        <a href="${backHref}" class="svc-detail-back"><span aria-hidden="true">←</span> ${backLabel}</a>

        <div class="svc-detail-grid">
          <div>
            <h2>${item.narrative.heading}</h2>
            ${paragraphs}
          </div>
          <div>
            <h2>${item.specs.heading}</h2>
            <ul class="svc-detail-list">${specs}</ul>
          </div>
        </div>

        <div class="svc-detail-cta">
          <div>
            <h3>${item.cta.heading}</h3>
            <p>${item.cta.body}</p>
          </div>
          <a href="contact.html">${item.cta.label} <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  `;
}

/* ---------- Portfolio carousel (legacy, kept for backward compat) ---------- */

function renderPortfolioSlides() {
  return Object.values(PROJECTS).map((p, i) => `
    <a href="project.html?id=${p.id}" class="project-slide${i === 0 ? ' is-active' : ''}" data-address="${p.address}">
      <div class="project-house${p.isCutout ? ' project-house-cutout' : ''}" style="background-image:url('${p.cardImage}')"></div>
    </a>
  `).join('');
}

/* ---------- Projects editorial grid ---------- */

function renderProjectCards() {
  return Object.values(PROJECTS).map((p, i) => `
    <a href="project.html?id=${p.id}" class="proj-card${p.cardContain ? ' proj-card--illustration' : ''}" aria-label="${p.address} — ${p.eyebrow}">
      <div class="proj-card-img" style="background-image:url('${p.cardImage}');${p.cardContain ? 'background-size:contain;background-color:#f5f5f5;background-repeat:no-repeat;' : ''}"></div>
      <div class="proj-card-overlay"></div>
      <div class="proj-card-top">
        <span class="proj-card-eyebrow">${p.eyebrow}</span>
      </div>
      <div class="proj-card-body">
        <h2 class="proj-card-title">${p.address}</h2>
        <p class="proj-card-blurb">${p.cardBlurb}</p>
        <span class="proj-card-cta">View Project <span aria-hidden="true">→</span></span>
      </div>
    </a>
  `).join('');
}

/* ---------- Page-level injection ---------- */

function injectSiteChrome() {
  const headerSlot = document.getElementById('site-header');
  const footerSlot = document.getElementById('site-footer');

  if (headerSlot) {
    headerSlot.outerHTML = renderSiteHeader({
      activeId: headerSlot.dataset.active || 'home',
      scrolled: headerSlot.dataset.scrolled === 'true',
    });
  }

  if (footerSlot) {
    footerSlot.outerHTML = renderSiteFooter({
      variant: footerSlot.dataset.variant || 'full',
    });
  }
}

function injectDataDrivenSections() {
  const portfolioTrack = document.getElementById('projectTrack');
  if (portfolioTrack && !portfolioTrack.children.length) {
    portfolioTrack.innerHTML = renderPortfolioSlides();
  }

  const projectsGrid = document.getElementById('projectsGrid');
  if (projectsGrid && !projectsGrid.children.length) {
    projectsGrid.innerHTML = renderProjectCards();
  }
}

function injectDetailFromQuery() {
  const root = document.getElementById('detail-root');
  if (!root) return;

  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const item = id ? PROJECTS[id] : null;

  if (!item) {
    root.innerHTML = `
      <section class="svc-detail-body">
        <div class="container">
          <a href="portfolio.html" class="svc-detail-back"><span aria-hidden="true">←</span> Back to Portfolio</a>
          <h2 style="margin-top:2rem;">Project Not Found</h2>
          <p>We couldn't find that project. It may have been renamed or removed.</p>
        </div>
      </section>
    `;
    return;
  }

  document.title = `${item.address} — KCW | Custom Construction Toronto`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && item.metaDescription) metaDesc.setAttribute('content', item.metaDescription);
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', `${item.address} — KCW | ${item.detailEyebrow}`);

  root.innerHTML = renderDetailPage(item, {
    backHref: 'portfolio.html',
    backLabel: 'Back to Portfolio',
  });
}
