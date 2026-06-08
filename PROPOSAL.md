# proposal: churromania website rebuild

date: june 6, 2026
author: mateo acosta-rubio
client: ChurroMania

## the client

ChurroMania is a churro franchise that's been in business for over 30 years. they have 140+ stores across 10 countries, plus a few corporate-owned locations. i've worked with their product development team for a few years on operational stuff. they're who i pitched on doing a website rebuild for class, and they said yes because the current site needs work anyway.

## the problem

the current churromania.com site is outdated. couple of specific issues they raised in our conversations:

- not ada accessible. this is a real legal risk. a friend of theirs in the franchise industry got hit with an accessibility lawsuit recently. there's a whole cottage industry of firms that scan sites for ada violations and file suits. they want this fixed.
- no real lead funnel for franchise inquiries. the current site has a contact form buried somewhere but nothing that actually converts.
- design feels stuck in 2010. they want modern without losing the heritage of a 30-year-old brand.
- almost no analytics or visitor data. they don't know who's visiting the site or what those people are looking for.

## the goal

build a modern, accessible website that does three things well:

1. tells the brand story in a way that respects the 30-year history but doesn't look dated
2. functions as the top of a franchise sales funnel. someone curious about owning a churromania store should be able to find what they need fast and start a conversation.
3. handles all the standard stuff: menu, locations, contact, careers.

## target audience

primary: prospective franchisees. multi-unit operators looking for new concepts. single-unit first-time operators. these are the people the funnel needs to convert.

secondary: regular customers looking up menu items, store hours, locations.

## page structure (rough)

- home: hero with brand moment + clear franchise cta + heritage cues. probably a "30+ years, 140+ stores" headline somewhere visible.
- about: the brand story, founding, what makes them different.
- menu: products with photos. doesn't need to be huge. churros, dips, drinks.
- locations: searchable map. this is one of the few interactive pieces.
- franchise: dedicated section for prospects. the funnel lives here. what it costs, what's included, how to apply, current openings.
- contact: standard.

## technical approach

front-end heavy. html, css, vanilla js. no backend needed for v1.

for accessibility:
- semantic html (proper header, nav, main, footer)
- alt text on every image
- proper heading hierarchy
- color contrast checked against wcag aa
- keyboard navigation works on every interactive element
- lang attribute set

deploys to github pages for the class submission. could move to a real domain later if the client wants to use it.

## extras i'm exploring

one idea i want to test: adding a b2b visitor identification tool that captures rough info on site visitors even when they don't submit a form. the company they're using would let us see which companies are browsing the franchise page. that info gets piped into an ai filter to flag actual multi-unit operators vs random traffic. could enable real outbound which they currently don't do at all.

this is a stretch goal. v1 of the site doesn't need it.

## mood board

i put together a one-slide mood board with reference images and a rough layout. it's in the repo as mood-board.pdf.

## timeline

- proposal: this week
- prd: next week
- v1 build: through weeks 4-5 of class
- showcase deadline per syllabus: monday june 15
