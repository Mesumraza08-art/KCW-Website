/* ============================================
   KCW — Single source of truth
   Edit this file to add/edit projects & services;
   every page reads from here at runtime.
   ============================================ */

const SITE = {
  name: 'KCW',
  fullName: "Khizar's Custom Wood Work",
  tagline: 'Handcrafted woodwork and custom cabinetry for discerning homeowners across the Greater Toronto Area.',
  year: 2026,
  contact: {
    location: '100 Dynamic Drive',
    phone: '(647) 231-5177',
    phoneRaw: '+16472315177',
    email: 'khizar@k-customwoodwork.ca',
    instagramHandle: '@k_customwoodwork',
    instagramUrl: 'https://www.instagram.com/k_customwoodwork/',
  },
  nav: [
    { id: 'home',      label: 'Home',      hash: '#home' },
    { id: 'about',     label: 'About',     hash: '#about' },
    { id: 'portfolio', label: 'Portfolio', hash: '#portfolio' },
    { id: 'services',  label: 'Services',  hash: '#services' },
    { id: 'contact',   label: 'Contact',   hash: '#contact' },
  ],
  footerServiceLinks: [
    'Custom Cabinetry',
    'Kitchen Woodwork',
    'Custom Millwork',
    'Built-in Solutions',
    'Wall Paneling',
  ],
};

/* ---------- Projects (portfolio detail pages) ---------- */

const PROJECTS = {
  brimley: {
    id: 'brimley',
    eyebrow: 'Custom Home',
    detailEyebrow: 'Commercial Millwork',
    address: '3370 Brimley Rd',
    titleLong: '3370 Brimley Rd.',
    cardImage: 'assets/brimley-cutout.png',
    isCutout: true,
    heroImage: 'assets/dental-exterior-wide.jpg',
    cardBlurb: 'A modern two-storey residence in Scarborough — brick, stucco, and custom millwork brought together from the studs out.',
    lede: 'A full commercial fit-out in Scarborough — reception joinery, custom millwork, and finish carpentry handled end-to-end by the KCW team.',
    narrative: {
      heading: 'Project Overview',
      paragraphs: [
        'The brief at 3370 Brimley was simple on paper, complicated in execution: deliver a commercial space that reads as warm, grounded, and professional — without defaulting to the beige office-park template.',
        'KCW handled the full scope of the millwork package — reception casework, interior wood detailing, storage built-ins, and finish carpentry throughout. Every piece was milled in our shop, colour-matched to the interior scheme, and installed by the same crew that built it.',
        'The result is a space that feels tailored without feeling precious — surfaces that hold up to daily commercial traffic, details that hold up to a second look.',
      ],
    },
    specs: {
      heading: 'Project Specs',
      items: [
        { label: 'Location',   value: '3370 Brimley Rd, Scarborough ON' },
        { label: 'Scope',      value: 'Commercial millwork & finish carpentry' },
        { label: 'Materials',  value: 'Engineered veneers, solid hardwood trim' },
        { label: 'Delivered',  value: 'In-house design, mill, and install' },
        { label: 'Status',     value: 'Completed' },
      ],
    },
    cta: {
      heading: 'Planning A Commercial Fit-Out?',
      body: "Tell us the space and the brief — we'll tell you what it actually takes.",
      label: 'Start A Project',
    },
    metaDescription: 'KCW Project — 3370 Brimley Rd. Commercial millwork and finish carpentry in Scarborough.',
  },

  'orange-dental': {
    id: 'orange-dental',
    eyebrow: 'Residential',
    detailEyebrow: 'Commercial Dental',
    address: 'Orange Dental',
    titleLong: 'Orange Dental.',
    cardImage: 'assets/orange-dental-cutout.png',
    isCutout: true,
    heroImage: 'assets/dental-cabinetry.jpg',
    cardBlurb: "A residential build shaped around the homeowner's vision — bespoke cabinetry, custom casework, and tight finish work.",
    lede: 'A full commercial fit-out for a modern dental practice — bespoke cabinetry, reception joinery, and treatment-room millwork designed to hold up to daily clinical use.',
    narrative: {
      heading: 'Project Overview',
      paragraphs: [
        'Orange Dental came to KCW with a simple ask: a clinic that looks nothing like a clinic. Most dental offices default to sterile, oversized corporate furniture — they wanted a space that felt calm, considered, and architectural from the moment a patient walked in.',
        'We handled the full scope of the millwork package: reception casework, operatory cabinetry, storage built-ins, and finish carpentry throughout the practice. Every piece was milled in our shop, colour-matched to the interior palette, and installed by the same crew that built it.',
        'The result is a dental office that reads as warm and grounded — while still doing the hard job of standing up to daily clinical traffic, sterilization protocols, and years of patient throughput.',
      ],
    },
    specs: {
      heading: 'Project Specs',
      items: [
        { label: 'Location',  value: 'Greater Toronto Area' },
        { label: 'Scope',     value: 'Commercial dental clinic fit-out' },
        { label: 'Materials', value: 'Engineered veneers, solid hardwood trim, stone-clad casework' },
        { label: 'Features',  value: 'Custom reception desk, operatory cabinetry, integrated storage' },
        { label: 'Status',    value: 'Completed & open' },
      ],
    },
    cta: {
      heading: 'Planning A Clinic Or Commercial Space?',
      body: 'Dental offices, retail, hospitality — we handle the full fit-out under one roof.',
      label: 'Start A Project',
    },
    metaDescription: 'KCW Project — Orange Dental. Commercial dental clinic fit-out with custom cabinetry and millwork.',
  },

  government: {
    id: 'government',
    eyebrow: 'Structural',
    detailEyebrow: 'Structural',
    address: '2 Government Road',
    titleLong: '2 Government Road.',
    cardImage: 'assets/framing-interior-wide.jpg',
    isCutout: false,
    heroImage: 'assets/framing-interior-wide.jpg',
    cardBlurb: 'Structural framing and rough carpentry delivered to spec — on time, on budget, and inspection-ready.',
    lede: 'Structural framing and rough carpentry delivered to spec — on time, on budget, and inspection-ready from the first walk-through.',
    narrative: {
      heading: 'Project Overview',
      paragraphs: [
        'Structural work is where careful planning meets honest labour. 2 Government Road was a full framing package: floors, walls, roof system, and the engineered connections that make it all hold together through a decade of Ontario winters.',
        "KCW's crew handled framing end-to-end, coordinating directly with the structural engineer and the site supervisor so nothing got lost between the drawings and the wood. Inspectors came, inspectors signed off — first pass.",
        "Good framing isn't glamorous work. But every finished space that follows depends on it being done right the first time.",
      ],
    },
    specs: {
      heading: 'Project Specs',
      items: [
        { label: 'Location',  value: '2 Government Road, Greater Toronto Area' },
        { label: 'Scope',     value: 'Structural framing & rough carpentry' },
        { label: 'Materials', value: 'Engineered lumber, dimensional framing' },
        { label: 'Delivered', value: 'In-house crew, licensed and insured' },
        { label: 'Status',    value: 'Completed — inspection passed' },
      ],
    },
    cta: {
      heading: 'Got A Structural Build Coming Up?',
      body: "Send us the drawings — we'll tell you what it really takes to build it right.",
      label: 'Request A Quote',
    },
    metaDescription: 'KCW Project — 2 Government Road. Structural framing and rough carpentry delivered to code.',
  },

  skyridge: {
    id: 'skyridge',
    eyebrow: 'Wall Paneling',
    detailEyebrow: 'Wall Paneling',
    address: '1100 Skyridge Blvd',
    titleLong: '1100 Skyridge Blvd.',
    cardImage: 'assets/dental-interior-slats.jpg',
    isCutout: false,
    heroImage: 'assets/dental-interior-slats.jpg',
    cardBlurb: 'Bespoke wall paneling and slat treatments milled in-house and installed by the KCW crew.',
    lede: 'Bespoke wall paneling and slat treatments — milled in-house, colour-matched to the space, and installed by the same crew that built them.',
    narrative: {
      heading: 'Project Overview',
      paragraphs: [
        'Wall paneling can go one of two ways: a trend that dates the room in three years, or a design move that makes the whole space feel considered. At 1100 Skyridge, we went for the second.',
        'KCW drew the slat profile, milled the panels, finished them to the interior scheme, and handled every cut on site. The spacing, the rhythm, the transitions at the ceiling and floor — nothing was left to improvisation.',
        'The result is a surface that holds up close and reads well from the other side of the room.',
      ],
    },
    specs: {
      heading: 'Project Specs',
      items: [
        { label: 'Location',  value: '1100 Skyridge Blvd, Greater Toronto Area' },
        { label: 'Scope',     value: 'Wall paneling & slat treatments' },
        { label: 'Materials', value: 'Solid hardwood slats, veneered backing' },
        { label: 'Delivered', value: 'Custom milled and installed in-house' },
        { label: 'Status',    value: 'Completed' },
      ],
    },
    cta: {
      heading: 'Thinking About Paneling Or A Feature Wall?',
      body: "Send us the room — we'll come back with a profile and a plan.",
      label: 'Start A Project',
    },
    metaDescription: 'KCW Project — 1100 Skyridge Blvd. Bespoke wall paneling and slat treatments.',
  },

  bridle: {
    id: 'bridle',
    eyebrow: 'Commercial',
    detailEyebrow: 'Commercial',
    address: '2490 Bridle Rd',
    titleLong: '2490 Bridle Rd.',
    cardImage: 'assets/dental-reception.jpg',
    isCutout: false,
    heroImage: 'assets/dental-reception.jpg',
    cardBlurb: 'A commercial fit-out anchored by a sculpted slat ceiling, a stone-clad reception desk, and custom joinery throughout.',
    lede: 'A commercial fit-out anchored by a sculpted slat ceiling, a stone-clad reception desk, and custom joinery running the length of the space.',
    narrative: {
      heading: 'Project Overview',
      paragraphs: [
        "The 2490 Bridle fit-out is a good example of what happens when a client trusts the shop: a reception room that doesn't look like anyone else's. The centrepiece is a custom slat ceiling that runs from the entry back over the check-in desk, framing the space without feeling heavy.",
        'Below it, a reception desk pairs warm wood casework with a marbled stone face — a deliberate contrast that makes both materials read as intentional. Every built-in, every trim detail, every piece of millwork in the space was drawn, built, and installed by KCW.',
        'The space has been open long enough now that we can say it honestly: it still looks like day one.',
      ],
    },
    specs: {
      heading: 'Project Specs',
      items: [
        { label: 'Location',  value: '2490 Bridle Rd, Greater Toronto Area' },
        { label: 'Scope',     value: 'Full commercial fit-out & joinery' },
        { label: 'Features',  value: 'Custom slat ceiling, reception casework, integrated storage' },
        { label: 'Delivered', value: 'End-to-end by the KCW crew' },
        { label: 'Status',    value: 'Completed & open' },
      ],
    },
    cta: {
      heading: 'Planning A Commercial Space?',
      body: "Reception desks, slat ceilings, full fit-outs — tell us what you're building.",
      label: 'Start A Project',
    },
    metaDescription: 'KCW Project — 2490 Bridle Rd. Commercial fit-out with sculpted slat ceiling, custom reception, and full-scope millwork.',
  },
};

/* ---------- Services (services detail pages) ---------- */

const SERVICES = {
  'custom-homes': {
    id: 'custom-homes',
    tileLabel: '01 — New Builds',
    tileTitle: 'Custom Homes',
    tileBlurb: 'Ground-up custom homes shaped around how you actually live — architectural millwork and craftsmanship built in from day one.',
    tileImage: 'assets/kcw-site-banner.jpg',
    detailEyebrow: '01 — New Builds',
    titleLong: 'Custom Homes, Built Around You.',
    heroImage: 'assets/kcw-site-banner.jpg',
    lede: "From the foundation up — ground-up residences where architectural millwork and craftsmanship aren't an upgrade, they're the plan.",
    narrative: {
      heading: 'A Home Built The Way You Live.',
      paragraphs: [
        "Every KCW custom home starts the same way: a long conversation, a clear plan, and a detailed set of drawings. We partner with architects, designers, and — when you need one — we bring our own. The result is a home that's been engineered for your routine, not a plan pulled off the shelf.",
        'Because we run the woodwork shop in-house, the custom cabinetry, built-ins, stair systems, and millwork are all integrated into the build from day one. No retrofits. No guesswork at the finish line.',
        'We build across the Greater Toronto Area — fully licensed, fully insured, and obsessive about Ontario Building Code compliance at every stage.',
      ],
    },
    specs: {
      heading: "What's Included",
      items: [
        { label: 'Site & Feasibility',       value: 'Lot review, zoning checks, and a realistic budget from day one.' },
        { label: 'Architecture & Design',    value: 'Collaboration with your architect or ours — drawings that reflect how you actually live.' },
        { label: 'Structural Framing',       value: 'Full framing package delivered by our in-house crew, built to code and inspection-ready.' },
        { label: 'Integrated Millwork',      value: 'Custom cabinetry, staircases, built-ins, and paneling engineered into the build, not bolted on later.' },
        { label: 'Finishing & Handover',     value: 'Painting, flooring, trim, and final walk-through — the house you asked for, on the day you were promised.' },
      ],
    },
    cta: {
      heading: 'Thinking About A Custom Home?',
      body: "Let's sit down, walk the lot, and sketch what's possible.",
      label: 'Start The Conversation',
    },
    metaDescription: 'KCW — Custom Homes. Ground-up custom home builds across the Greater Toronto Area.',
  },

  residential: {
    id: 'residential',
    tileLabel: '02 — Construction',
    tileTitle: 'Residential Construction',
    tileBlurb: 'Full-scope residential builds, additions, and structural framing — licensed, insured, and delivered to code across the GTA.',
    tileImage: 'assets/project-framing-exterior.jpg',
    detailEyebrow: '02 — Construction',
    titleLong: 'Residential Construction, Done Right.',
    heroImage: 'assets/project-framing-exterior.jpg',
    lede: "Framing, additions, second storeys, full structural builds — delivered by a licensed crew that treats your home the way we'd treat our own.",
    narrative: {
      heading: 'Structural Work You Can Trust.',
      paragraphs: [
        "Residential construction at KCW is the backbone of what we do. Our crew has been framing homes across the GTA for over a decade — additions, second storeys, garden suites, and full rebuilds — and we've learned that the quality of the finish is set the day the framing is tight.",
        "We show up on time, tarp what we should, protect what we can't move, and keep you in the loop from the first permit to the final inspection. No cutting corners on code. No surprises on the invoice.",
        'Every project is backed by our own licensed, insured team — no rotating subcontractors, no hand-offs that drop the ball.',
      ],
    },
    specs: {
      heading: 'What We Build',
      items: [
        { label: 'Additions & Second Storeys',  value: 'Expanding what you already love about your home, without starting over.' },
        { label: 'Structural Framing',          value: 'Load-bearing work, roof systems, and engineered lumber — done to spec, on schedule.' },
        { label: 'Garden & Laneway Suites',     value: 'Purpose-built secondary dwellings, permitted and built end-to-end.' },
        { label: 'Full Rebuilds',               value: "When it's time to take it back to studs — or further — we handle the whole thing." },
        { label: 'Permits & Inspections',       value: "We manage the paperwork and the inspectors so you don't have to." },
      ],
    },
    cta: {
      heading: 'Got A Build In Mind?',
      body: "Tell us what you're planning — we'll tell you what it really takes.",
      label: 'Request A Quote',
    },
    metaDescription: 'KCW — Residential Construction. Framing, additions, and full residential builds across the Greater Toronto Area.',
  },

  renovations: {
    id: 'renovations',
    tileLabel: '03 — Design-Led',
    tileTitle: 'Custom Design & Renovations',
    tileBlurb: 'Design-forward renovations and bespoke interior transformations — cabinetry, millwork, and finishes, all handled in-house.',
    tileImage: 'assets/dental-reception.jpg',
    detailEyebrow: '03 — Design-Led',
    titleLong: 'Custom Design & Renovations.',
    heroImage: 'assets/dental-reception.jpg',
    lede: 'Design-forward remodels and bespoke interiors — cabinetry, millwork, wall systems, and finishes, all handled under one roof.',
    narrative: {
      heading: 'Rooms That Feel Made For You.',
      paragraphs: [
        "Renovations at KCW aren't about ripping things out — they're about making a space finally work the way it should. Kitchens that flow. Built-ins that earn their footprint. Bathrooms that don't feel borrowed from a showroom. Commercial fit-outs that say something about who you are.",
        'We design, mill, and install every major wood element in-house, which means tighter tolerances, faster timelines, and fewer "someone else\'s problem" moments. If we draw it, we can build it.',
        "Whether it's one room or the entire floor plan, we'll handle design, demo, millwork, and finishes — and keep your day-to-day livable while we do.",
      ],
    },
    specs: {
      heading: 'Where We Go Deep',
      items: [
        { label: 'Custom Kitchens',         value: 'Cabinetry, islands, pantries, and integrated appliances — designed around how you actually cook.' },
        { label: 'Built-Ins & Millwork',    value: 'Bookcases, media walls, entryways, closets — pieces that look like the room was built around them.' },
        { label: 'Wall Paneling & Ceilings', value: 'Slat walls, fluted panels, coffered ceilings — texture done without the gimmick.' },
        { label: 'Bath & Laundry',          value: 'Vanities, linen towers, and built-in storage that earn every inch.' },
        { label: 'Commercial Fit-Outs',     value: 'Dental offices, retail, and hospitality — reception desks, slat ceilings, and finish work that reads professional.' },
      ],
    },
    cta: {
      heading: 'Ready To Redesign A Space?',
      body: "Send us the room and what isn't working — we'll come back with options.",
      label: 'Book A Consultation',
    },
    metaDescription: 'KCW — Custom Design & Renovations. Bespoke interior renovations, cabinetry, and millwork across the Greater Toronto Area.',
  },
};
