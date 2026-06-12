# ChurroManía Web Design System

This document defines the visual and structural rules for the ChurroManía website rebuild. It pulls from the ChurroManía 2025 Brand Manual (brand colors, fonts, mascot, illustration style) and layers on modern web patterns for spacing, depth, and component design.

Note on links: the site deploys to a GitHub project page at `/churromania-site/`, so every internal link is **relative** (`menu.html`, `index.html`, `./`). Absolute paths like `/menu.html` would resolve to the wrong site.

Note on CSS: Tailwind is **precompiled** to `css/styles.css` via the Tailwind CLI (see `tailwind.config.js`). No Play CDN. Rebuild with:
`npx tailwindcss@3 -i css/tailwind.in.css -o css/styles.css --minify`

## Core Principles

1. **Heritage with energy.** 28 years of history shows through warm photography and brand consistency. But the layouts feel 2026, not 2010.
2. **Two voices, one site.** Customer-facing pages are warm, playful, sweet. Franchise-facing sections are professional, numbers-forward, FOMO-inducing.
3. **Soft radius everywhere.** `rounded-xl` (12px) and `rounded-2xl` (16px) dominate. Nothing feels sharp.
4. **Yellow and blue, with restraint.** Yellow for accents and FOMO moments, blue for body sections, white/cream for breathing room.
5. **Editorial density.** Generous whitespace. Big food photography. Bold display type. Don't crowd the page.
6. **Conversion-first on franchise pages.** Every franchise-facing section has a clear next step. Every CTA is visible.

## Typography

| Role | Font | Tailwind |
|------|------|----------|
| Display (hero, page titles, brand moments) | Bricolage Grotesque, weight 700-800 | `font-display` |
| Body | Lexend Deca, weight 400-500 | `font-body` |
| Mono (numbers, metadata, labels) | JetBrains Mono, weight 400-500 | `font-mono` |

Bricolage Grotesque replaces the brand book's "Ginear" (a paid font not on Google Fonts). It is a near-match in feel: geometric, bold, modern, friendly.

### Scale

| Role | Classes |
|------|---------|
| Hero headline | `text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-[0.95]` |
| Page title | `text-4xl md:text-5xl font-display font-bold tracking-tight` |
| Section heading | `text-2xl md:text-3xl font-display font-bold tracking-tight` |
| Subsection | `text-xl md:text-2xl font-display font-semibold` |
| Body large | `text-lg leading-relaxed font-body` |
| Body | `text-base leading-relaxed font-body` |
| Small | `text-sm font-body` |
| Mono label | `text-xs font-mono uppercase tracking-wider` |

## Color Palette

| Token | Hex | Tailwind | Role |
|-------|-----|----------|------|
| Blue | `#116BCE` | `cm-blue` | Primary CTA, links, headings on light bg |
| Blue Dark | `#11345A` | `cm-blue-dark` | Headings, footer bg, navy moments |
| Blue Deep | `#135495` | `cm-blue-deep` | Hover states |
| Blue Light | `#28B2FF` | `cm-blue-light` | Accents, hover |
| Blue Pale | `#D8F3FF` | `cm-blue-pale` | Soft backgrounds, badges |
| Blue Bg | `#EDFAFF` | `cm-blue-bg` | Page background option |
| Yellow | `#FFDC10` | `cm-yellow` | FOMO moments, badges, world record callouts |
| Yellow Warm | `#F9B406` | `cm-yellow-warm` | Accent variant |
| Orange | `#F79200` | `cm-orange` | Energy accents, hover on yellow |
| Cream | `#FAFAF7` | `cm-cream` | Warm white, default page bg |

### Text hierarchy (use opacity, not gray shades)

| Role | Class |
|------|-------|
| Primary text | `text-cm-blue-dark` |
| Strong body | `text-cm-blue-dark/80` |
| Body | `text-cm-blue-dark/70` |
| Muted | `text-cm-blue-dark/50` |
| On dark bg | `text-white` or `text-cm-yellow` for highlights |

## Spacing

Base unit: 4px (Tailwind default).

| Context | Value |
|---------|-------|
| Section vertical padding | `py-16 md:py-24 lg:py-32` |
| Card padding | `p-6 md:p-8` |
| Page container | `max-w-7xl mx-auto px-4 md:px-6 lg:px-8` |
| Reading container | `max-w-3xl mx-auto px-4` |
| Standard stack | `space-y-6` |
| Button padding | `px-6 py-3` (default), `px-8 py-4` (large) |

## Radius

| Token | Tailwind | Usage |
|-------|----------|-------|
| Card / panel | `rounded-2xl` | Major cards, hero blocks, modals |
| Standard | `rounded-xl` | Buttons, smaller cards, inputs |
| Subtle | `rounded-lg` | Tags, small UI elements |
| Pill | `rounded-full` | Badges, pills, circular elements |

## Depth

Soft shadows. Layered backgrounds beat heavy shadows.

| State | Treatment |
|-------|-----------|
| Card at rest | `border border-cm-blue-dark/5` |
| Card hover | `hover:shadow-lg hover:shadow-cm-blue/5 hover:-translate-y-0.5 transition-all duration-200` |
| Input focus | `focus:ring-2 focus:ring-cm-blue/30 focus:border-cm-blue` |
| Sticky header | `shadow-sm bg-white/80 backdrop-blur-md` (added by nav.js on scroll) |
| FOMO callout | `shadow-lg shadow-cm-yellow/20` |

## Component Patterns

### Primary CTA (the franchise button)

```html
<a href="franchise.html" class="inline-flex items-center gap-2 px-8 py-4 bg-cm-blue text-white font-display font-bold tracking-tight rounded-xl hover:bg-cm-blue-deep transition-all duration-200 shadow-lg shadow-cm-blue/20 hover:shadow-xl hover:shadow-cm-blue/30">
  Become a Franchisee
  <span aria-hidden="true">&rarr;</span>
</a>
```

### Secondary CTA

```html
<a href="menu.html" class="inline-flex items-center gap-2 px-6 py-3 bg-white text-cm-blue-dark border-2 border-cm-blue-dark/10 font-display font-semibold rounded-xl hover:border-cm-blue hover:text-cm-blue transition-all duration-200">
  See the Menu
</a>
```

### Stat card (franchise page)

```html
<div class="rounded-2xl bg-cm-cream p-8 border border-cm-blue-dark/5">
  <div class="font-mono text-xs uppercase tracking-wider text-cm-blue-dark/50 mb-3">EST. 1997</div>
  <div class="font-display text-5xl md:text-6xl font-bold text-cm-blue-dark tracking-tight">28 years</div>
  <div class="font-body text-cm-blue-dark/70 mt-2">of frying churros</div>
</div>
```

### Menu item card

```html
<article class="group rounded-2xl bg-white border border-cm-blue-dark/5 overflow-hidden hover:shadow-lg hover:shadow-cm-blue/5 transition-all duration-200">
  <div class="aspect-[4/3] bg-cm-blue-pale overflow-hidden">
    <img src="..." alt="..." class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
  </div>
  <div class="p-6">
    <h3 class="font-display text-xl font-bold text-cm-blue-dark">Original</h3>
    <p class="font-body text-cm-blue-dark/70 mt-2">Crispy fresh, fried to order, dusted with cinnamon sugar.</p>
  </div>
</article>
```

### FOMO badge (world record callout)

```html
<div class="inline-flex items-center gap-2 px-4 py-2 bg-cm-yellow rounded-full border border-cm-blue-dark/10">
  <span class="font-mono text-xs uppercase tracking-wider text-cm-blue-dark font-semibold">Guinness World Record</span>
</div>
```

### Form input

```html
<div>
  <label for="name" class="block font-mono text-xs uppercase tracking-wider text-cm-blue-dark/70 mb-2">Full Name</label>
  <input type="text" id="name" name="name" required class="w-full px-4 py-3 rounded-xl border border-cm-blue-dark/15 bg-white font-body text-cm-blue-dark focus:ring-2 focus:ring-cm-blue/30 focus:border-cm-blue outline-none transition-all">
</div>
```

### Header / nav

Fixed. Transparent at top, white with backdrop-blur once scrolled (handled by `js/nav.js`, toggled via `#site-header`). Mobile menu uses `#nav-toggle` and `#mobile-menu`.

### Footer

Dark blue (`bg-cm-blue-dark`), white text, yellow mono labels, four columns: brand blurb, Explore, Business, Connect. Consistent across every page.

## Layout

| Element | Value |
|---------|-------|
| Page max-width | `max-w-7xl mx-auto` |
| Content padding | `px-4 md:px-6 lg:px-8` |
| Section vertical | `py-16 md:py-24 lg:py-32` |
| Sticky header clearance | `pt-20` on the first section |
| Reading column | `max-w-3xl mx-auto` |
| Two-column split | `grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12` |
| Three-column grid | `grid grid-cols-1 md:grid-cols-3 gap-6` |
| Stat grid | `grid grid-cols-2 md:grid-cols-4 gap-4` |

## Accessibility

- Semantic html on every page: `header`, `nav`, `main`, `section`, `article`, `footer`.
- `lang="en"` on every page.
- Alt text on every image.
- Proper heading hierarchy, never skip levels.
- All form inputs have labels.
- ARIA labels on icon-only buttons.
- Color contrast meets WCAG AA.
- Focus states visible on every interactive element.
- Keyboard navigation works everywhere.
- `prefers-reduced-motion` honored (marquee and fade-up disabled).

## Canonical brand facts (use consistently everywhere)

- Founded 1997 in Caracas, Venezuela.
- 28 years in business.
- 120+ stores across 10 countries.
- Guinness World Record for longest churro, 2023.
- "World's largest churro franchise."
- Product lines: Crispy Manía, Twist Manía, Churro Bites, Big Manía.

## Stretch / v1.1 ideas (NOT in v1)

- 3D interactive globe on `stores.html` using globe.gl, pinning every store.
- Real backend (Supabase) for menu, stores, and blog. Admin becomes a real CMS.
- Individual blog post pages (v1 is listing only).
- Spanish version. Most ChurroManía markets are Latin America.
- Live ordering / delivery integration.
- Customer accounts. Loyalty program.
- Real B2B visitor identification tool integrated into the franchise funnel.
- Schema.org Review structured data for testimonials.
- A/B testing on the franchise CTA.
