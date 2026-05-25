 leave a gap but # KCW — Khizar's Custom Wood Work
## Claude Project Instructions

> **Self-update rule:** After every session that changes architecture, adds a new section, introduces a new CSS pattern, or resolves a recurring bug — update this file to reflect the current state. Keep it accurate; it is the source of truth for future Claude sessions.

---

## Project Overview

**Client:** Khizar's Custom Wood Work (KCW)
**Type:** Static **multi-page** HTML/CSS/JS site (no framework, no build step). Runs from `file://` in Safari; no local server needed. Each top-level nav item has its own page (home, about, portfolio, contact) so there's no long-scroll homepage anymore.
**Location:** `/Users/mesumraza/kcw-website/`

---

## File Structure

```
kcw-website/
├── index.html          ← Home (hero only, no scroll)
├── about.html          ← About (K/C/W grid + framed about card + reviews)
├── portfolio.html      ← Portfolio carousel
├── contact.html        ← Contact form + Instagram reels
├── project.html        ← Universal project detail template (reads ?id=<slug>)
├── css/
│   └── styles.css      ← Single stylesheet
├── js/
│   ├── data.js         ← Single source of truth: SITE + PROJECTS
│   ├── templates.js    ← renderSiteHeader/Footer/DetailPage + data-driven section injectors
│   └── main.js         ← Interactive behaviour (splash, carousel, scroll reveal, etc.)
├── assets/             ← Images, videos, logos, cutouts
├── CLAUDE.md           ← This file (not shipped, .gitignored)
└── .gitignore
```

---

## Architecture (how the site is wired)

1. **Single source of truth** — `js/data.js` exports two globals:
   - `SITE` — brand info, nav items, contact
   - `PROJECTS` — keyed map of project detail content (brimley, orange-dental, government, skyridge, bridle)
   Add/edit a project by touching **only** this file.

2. **Shared renderers** — `js/templates.js` exposes the functions that read `data.js` and return HTML strings:
   - `renderSiteHeader({ activeId, scrolled })` / `renderSiteFooter({ variant })`
   - `renderDetailPage(item, { backHash, backLabel })` — used by `project.html`
   - `renderPortfolioSlides()` — produces the home-page carousel slides
   - `injectSiteChrome()` / `injectDetailFromQuery()` / `injectDataDrivenSections()` — the three entry points called from `main.js` on `DOMContentLoaded`

3. **Slots** — every page declares slots via `id` + `data-*` attributes and `templates.js` replaces/fills them:
   - `<div id="site-header" data-active="<page-id>" data-scrolled="true|false"></div>` → full header+nav. Nav links go to `about.html` / `portfolio.html` / `contact.html`. KCW logo on the left always links to `index.html`.
   - `<div id="site-footer" data-variant="full|minimal"></div>` → full 3-col footer everywhere except `project.html` (minimal) and `index.html` (no footer at all).
   - `<main id="detail-root"></main>` → filled from `?id=<slug>` on `project.html`
   - `<div class="project-track" id="projectTrack"></div>` → carousel slides on `portfolio.html`

4. **Detail pages are data-driven** — `project.html` is ~23 lines. The router in `injectDetailFromQuery()` reads `?id=<slug>`, looks it up in `PROJECTS`, and renders. 404-style fallback if the id doesn't match. `document.title` + `<meta name="description">` are also updated from data.

5. **Per-page body class** — every page sets `<body data-page="<id>">` (home, about, portfolio, contact, project-detail). Used by CSS for layout tweaks (e.g. `body[data-page="home"]` is no-scroll, `body[data-page="portfolio"]` gets `padding-top: var(--header-height)`) and by `main.js` (e.g. about-page auto-scrolls to `#about-intro` ~5s after the K/C/W reveal completes).

5. **Script order matters** — every page loads scripts in this order:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>  <!-- home only -->
   <script src="js/data.js"></script>
   <script src="js/templates.js"></script>
   <script src="js/main.js"></script>
   ```

---

## Tech Stack

| Layer | Detail |
|-------|--------|
| HTML | Semantic HTML5, three thin shells (`index.html`, `project.html`, `service.html`) |
| CSS | Custom properties, no framework, `clamp()` for responsive sizing |
| JS | Vanilla ES6+, three script files (data / templates / main) loaded in that order |
| Animation | GSAP 3.12.5 via CDN — carousel swipe + perspective tilt on home. Graceful degradation if GSAP fails to load. |
| Fonts | Bebas Neue (headings/logo), Inter (body), Cormorant (accent) |
| Forms | Web3Forms (POST to `api.web3forms.com/submit` — `access_key` is a placeholder until a real key is pasted in) |

---

## Design System

### Brand Colors (CSS custom properties)
```css
--green-deepest: #0F1F17   /* darkest bg */
--green-deep:    #1A2F23
--green-rich:    #264A36   /* primary green */
--green-mid:     #3A6B50
--green-sage:    #7A9B85   /* accent green */
--green-light:   #A8C4AD
--green-pale:    #D0E0D4
--white:         #F2EFE9   /* warm white */
--white-warm:    #F7F5F0
--charcoal:      #2B2B2B
--black:         #111111
```

### Typography
- **Headings/Logo:** `Bebas Neue` (`--font-heading`) — all caps, wide tracking
- **Body:** `Inter` (`--font-body`)
- **Accent:** `Cormorant Garamond` (`--font-accent`)

---

## Page Architecture

### `index.html` (home — `data-page="home"`)
| Element | Notes |
|---------|-------|
| Splash | `#splash` `.splash` cream overlay with KCW logo, fades in/out via `initSplash()`. |
| Header | Injected by `renderSiteHeader({ activeId: 'home' })`. |
| Hero | `.hero` `#home` — video bg (`forest-bg.mp4`), centered KCW logo, slogan. Fills the viewport exactly. |

`body[data-page="home"]` has `overflow: hidden` + `height: 100vh` — there's nothing to scroll to.

### `about.html` (`data-page="about"`)
| Element | Notes |
|---------|-------|
| Header | `data-active="about"`. |
| K/C/W grid | `#heroGrid` `.page-hero-grid` — full-viewport, letters fade to photos with K(0.4s) → C(1.6s) → W(2.8s) stagger. "About Us" overlay fades in at 2.8s. |
| About card | `#about-intro` — framed `.about-frame` with centered header, 2-col `.about-layout` (slideshow + content), `.about-reviews` testimonial grid. |
| Footer | Full. |

`initAboutHero()` adds `.revealed` to the grid on intersection, then `scheduleAboutHandoff()` smooth-scrolls to `#about-intro` ~5s later. The cream gap above the grid (`#about` padding-top) is zeroed via `body[data-page="about"] #about { padding-top: 0; }`.

### `portfolio.html` (`data-page="portfolio"`)
| Element | Notes |
|---------|-------|
| Header | `data-active="portfolio"`, `data-scrolled="true"`. |
| Carousel | `.portfolio-section` → `.project-stage` → `.project-track#projectTrack`. Slides injected from `PROJECTS`. ← / → arrows + arrow keys swipe between projects. |
| Footer | Full. |

Loads GSAP via CDN. `body` has `padding-top: var(--header-height)` so content starts below the fixed nav.

### `contact.html` (`data-page="contact"`)
| Element | Notes |
|---------|-------|
| Header | `data-active="contact"`, `data-scrolled="true"`. |
| Contact section | `.contact-section` — 2-col info + Web3Forms form. |
| Instagram | `.instagram-section` — 3 embedded reels. Handle: `@k_customwoodwork`. |
| Footer | Full. |

Same `padding-top: var(--header-height)` rule as portfolio.

### `project.html` (`data-page="project-detail"`)
Universal project detail template. `<main id="detail-root">` is filled by `injectDetailFromQuery()` from `?id=<slug>`. Footer variant is `minimal`. Uses the `.svc-detail-*` styling.

---

## Key CSS Patterns

### KCW Letter Animation (About Grid)
- `.page-hero-grid` **must** have `position: relative` (without it, `.about-hero-title` escapes the grid bounds).
- `.page-hero-grid.revealed` is toggled by `IntersectionObserver` in `main.js`.
- Stagger: K at 0.4s, C at 1.6s, W at 2.8s → "About Us" fades in at 2.8s.

### Founder Slideshow (`.about-founder-img`)
- Container is `position: relative` + `aspect-ratio: 3/4`; slides are `position: absolute; inset: 0`.
- Only the `.is-active` slide has `opacity: 1`; others transition opacity over 1.6s.
- `initFounderSlideshow()` rotates `.is-active` every 4.5s.

### Project Detail Page (`.svc-detail-*`)
- `project.html` renders into `#detail-root`: `.svc-detail-hero` (uses `--svc-hero-img` CSS var for background), `.svc-detail-body`, `.svc-detail-grid` (2-col narrative + specs list), `.svc-detail-list`, `.svc-detail-cta`, `.svc-detail-back`.
- The `svc-detail-` prefix is historical (services used to share this template). Don't rename — just treat it as the detail-page pattern.

### Portfolio Carousel (`.project-*`) — GSAP-driven
- `.project-frame` wraps a `.project-stage`. One `.project-slide` is `.is-active` at a time; others hidden (`opacity: 0`, `visibility: hidden`, `pointer-events: none`).
- `.project-house` is a background image (`.project-house-cutout` variant for transparent PNGs — no mask, softer drop shadow).
- `initProjectCarousel()` runs a continuous `y: -14` sine float per house, applies mousemove perspective tilt, handles arrow-click / arrow-key navigation via GSAP timeline (opacity + x swipe, z-index for layering, `clearProps` cleanup on completion).
- Slide centering is via `margin: 0 auto` + `left: 0; right: 0` (NOT `transform: translateX(-50%)`), so GSAP's `x` animation doesn't fight CSS centering.

### Intro for Detail Pages
- `project.html` / `service.html` set `data-scrolled="true"` on the header slot so the nav renders pre-scrolled.
- `initHeader()` short-circuits if there's no `.hero` on the page, keeping detail-page nav permanently in the scrolled look.

---

## Critical Rules & Gotchas

1. **Never use `object-fit: cover` or `object-fit: contain` on `.letter-img`** — it caps the display size of the K/C/W letters. Control size via `width`/`height` only.

2. **`.page-hero-grid` must have `position: relative`** — `about-hero-title` is `position: absolute`; without this the text escapes the grid and overlays other sections.

3. **Add projects by editing `js/data.js` only.** Do not create a new `*.html` file. The portfolio carousel auto-renders from `PROJECTS`.

4. **Two prefixes:** `.project-*` is the home portfolio carousel; `.svc-detail-*` is the detail-page styling (the prefix is historical). Don't mix.

5. **GSAP must load before `main.js`.** `initProjectCarousel()` and `initTiltCards` early-return if `typeof gsap === 'undefined'`. On detail pages GSAP isn't loaded (not needed) — the carousel code no-ops because `#projectStage` isn't in the DOM.

6. **Script load order is `data.js → templates.js → main.js`** — `main.js` calls `injectSiteChrome()` / `injectDetailFromQuery()` / `injectDataDrivenSections()` which are defined in `templates.js` and need `SITE` / `PROJECTS` / `SERVICES` from `data.js`.

7. **Instagram handle** is `@k_customwoodwork` (underscore, not hyphen).

8. **Contact form** — `index.html` has a `<form action="https://api.web3forms.com/submit" ...>` with `access_key` placeholder `YOUR_ACCESS_KEY_HERE`. Until a real key is pasted, submissions return a "Failed" state. `initContactForm()` in `main.js` does the async POST.

---

## JavaScript Functions (js/main.js)

| Function | Purpose |
|----------|---------|
| `injectSiteChrome()` (templates.js) | Fills `#site-header` and `#site-footer` from `SITE` + slot data attrs. |
| `injectDetailFromQuery()` (templates.js) | On `project.html` / `service.html`, reads `?id=` and renders the detail body. |
| `injectDataDrivenSections()` (templates.js) | Renders portfolio slides + services tiles into their slots if present. |
| `initSplash()` | Cream splash: fade logo in, hold 1.4s, fade out, remove node. |
| `initHeader()` | Scroll-toggle `.scrolled` on header. No-op on pages without a `.hero`. |
| `initMobileMenu()` | Hamburger open/close. |
| `initNavHighlight()` | IntersectionObserver active-nav-link on home. |
| `initSmoothScroll()` | Smooth anchor scroll with header offset. |
| `initScrollReveal()` | `.reveal` → `.revealed` on scroll into view. |
| `initAboutHero()` | Triggers KCW letter grid animation on scroll into view. |
| `initAboutGap()` | Cream gap between hero and about shrinks with scroll. |
| `initCounters()` | Animates stat numbers when `.about-stats` is visible. |
| `initContactForm()` | Async POST to Web3Forms; visual success/error feedback on the submit button. |
| `initImageLoad()` | Lazy-loads `img[data-src]`. |
| `initFounderSlideshow()` | Crossfades `.founder-slide` images every 4.5s. |
| `initProjectCarousel()` | GSAP timeline swipe + mousemove perspective tilt + float loop on `.portfolio-section`. |

