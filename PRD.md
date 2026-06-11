# product requirements document
## churromania website rebuild

date: june 12, 2026
author: mateo acosta-rubio
status: draft

---

## 1. overview

we're rebuilding churromania.com. the current site is dated, not ada accessible, and has no real lead funnel for franchise inquiries. ChurroMania has been around 30+ years with 140+ stores across 10 countries, so the new site has to carry that heritage while looking modern. v1 is front-end only: html, css, vanilla js, deployed to GitHub Pages. the priority is accessibility and a clean franchise funnel.

## 2. goals

- ada compliant. mitigates legal risk from accessibility lawsuits.
- convert prospective franchisees into qualified leads.
- modernize the brand presentation without losing 30 years of heritage.
- responsive across desktop, tablet, mobile.
- fast page load.
- standard customer functions (menu, locations, contact) work cleanly.

## 3. non-goals (what we're NOT doing in v1)

- no backend or database
- no live ordering or e-commerce
- no user accounts or login
- no admin panel for editing content
- no real-time chat
- the b2b visitor identification tool is a stretch goal, not v1

## 4. target audiences

### primary: prospective franchisees
- multi-unit operators looking for new concepts
- single-unit first-time operators
- existing franchise owners considering expansion

what they need: clear info on costs, support, available territories, easy way to start a conversation.

### secondary: regular customers
- looking up menu items
- finding their nearest store
- general brand discovery

what they need: fast access to menu, locations, basic brand story.

## 5. page structure

| page | purpose | primary action |
|------|---------|---------------|
| home (`/`) | brand intro + franchise cta + heritage cues | scroll to franchise section or click into franchise page |
| menu (`/menu.html`) | display product lineup | browse, no purchase action |
| locations (`/locations.html`) | show where stores exist | find nearest store |
| franchise (`/franchise.html`) | the lead funnel | submit interest form |
| contact (`/contact.html`) | general contact | submit message |

## 6. content requirements

### home page
- hero section: brand statement, "30+ years, 140+ stores, 10 countries" line, franchise cta button.
- heritage section: short brand story.
- product highlight: 3-4 signature items pulled from menu.
- locations preview: countries with store counts.
- franchise teaser: short sales pitch + cta to franchise page.
- footer: links, social, copyright.

### menu page
- categorized list: classic churros, filled churros, dipping sauces, shakes, coffee.
- each item: name, short description, image.
- no prices in v1.

### locations page
- list grouped by country.
- each country: store count + list of cities (or just count if too many).
- "find a store near you" cta (links to contact form for now).

### franchise page
- the funnel page. give it weight.
- sections: why churromania, the opportunity (numbers/track record), what's included in a franchise, how to apply.
- inquiry form at the bottom: name, email, phone, current business (multi-unit/single/none), markets of interest, message.
- form submits to a placeholder action (real backend out of scope for v1).

### contact page
- standard form: name, email, message, reason for contact (dropdown).
- general inquiries, not franchise-specific.

## 7. design requirements

reference: see `mood-board.pdf` in this repo.

- color palette: warm off-white background, near-black text, dominant orange accent, secondary cream and brown tones.
- typography: bold serif for display, clean sans-serif for body, mono for small labels/metadata.
- layout: generous whitespace, large-format food photography, editorial feel.
- header: persistent across all pages with logo + nav + cta button.
- footer: consistent across all pages.

## 8. technical requirements

### stack
- vanilla html, css, javascript
- tailwind via cdn for utility classes (no build step)
- minimal custom css in `css/styles.css` for brand-specific overrides
- no frameworks (no react, vue, next)
- deploys to github pages

### accessibility (wcag 2.1 aa minimum)
- semantic html on every page (header, nav, main, section, footer)
- lang attribute on html element
- alt text on every image
- proper heading hierarchy (h1 per page, h2 for sections, never skip levels)
- aria labels on every form input and on icon-only buttons
- keyboard navigation works on every interactive element
- color contrast ratios meet wcag aa
- focus states visible on all interactive elements
- form errors announced to screen readers

### responsive design
- viewport meta tag on every page
- mobile-first approach
- breakpoints handled via tailwind's defaults (sm 640px, md 768px, lg 1024px)
- test at 375px (iphone 14 pro max width)
- nav collapses to hamburger on mobile

### performance
- images optimized, no raw heic or oversized files
- inline svg for icons where possible
- lazy load images below the fold

## 9. success metrics

- all 5 pages live and reachable
- responsive at 375px, 768px, 1024px, 1440px
- lighthouse accessibility score 95+
- lighthouse performance score 85+
- zero broken links
- form submits successfully (echoes back to user in v1)

## 10. out of scope for v1

- the b2b visitor identification tool (stretch goal mentioned in proposal)
- multi-language support
- backend api for form submissions
- store locator with map integration
- live order tracking
- user accounts

## 11. timeline

- prd: friday 6/12
- v1 build: friday 6/12 through saturday 6/13
- review and polish: sunday 6/14
- showcase: monday 6/15
