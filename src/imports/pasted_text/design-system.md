WEBSITE DESIGN SYSTEM
Visual Identity  ·  UI/UX Architecture  ·  Animation Language  ·  Responsive System
Growth-Stage Digital Repositioning Service
Expert Specification for Design & Development  ·  v1.0


Design Philosophy
This document defines the complete visual and interaction language of the website. Every decision here serves one master: making a visitor feel — within the first three seconds — that they have found someone who understands their business at a level that others do not.

The website does not sell a service. It demonstrates the service. The quality of the experience IS the pitch.


The Guiding Tension
This site must resolve a specific creative tension: it needs to feel premium and strategic — not decorative or trend-chasing. It must show creative capability without shouting about it. The aesthetic should make serious business owners feel they are in the right hands — not intimidated, not underwhelmed.



Think: the feeling of walking into a studio that has thought about every detail, but where none of the details feels effortful. Calm authority. Not a portfolio. A presence.


Personality Pillars — The Five Words

Composed
Nothing screams. Everything earns its place. Restraint signals confidence.
Sharp
Precise language, precise layout, precise timing. No filler anywhere.
Warm
Premium does not mean cold. This is approachable intelligence, not corporate distance.
Purposeful
Every section exists to move the visitor toward one thing: starting a conversation.
Alive
Motion, texture, and micro-interactions create a site that breathes — not one that sits.


What It Is Not
Not a portfolio site — this is not a gallery of past work, it is a business case for a specific service
Not a brochure — it does not list everything we do, it selects what matters to the right client
Not a trend piece — no glass morphism for its own sake, no 3D blobs, no gratuitous scroll effects
Not cold — premium design does not require minimalism that feels empty; this site has warmth and texture

1. Colour Palette
The palette is built around warmth and authority — not the cold blues of generic SaaS, and not the black-and-white minimalism of a portfolio studio. It should feel like a well-designed office: thoughtful materials, natural warmth, precise accents.

Primary Palette

 
 
 
Off Black
#0E0E0E
Primary text, deep backgrounds, nav on scroll
Warm White
#F5F2ED
Primary background — never pure white, always aged warmth
Ink
#1A1A2E
Section dividers, dark hero background alternative


Secondary Palette

 
 
 
 
Sage
#4A7C6F
CTAs, hover states, active links, progress indicators
Sand
#C8A97A
Accent highlights, pulled quotes, decorative strokes
Mist
#E8E4DE
Card backgrounds, section separators, tag labels
Deep Slate
#2A5C8A
Interactive elements, focus rings, secondary buttons


Colour Usage Rules
Background
Warm White (#F5F2ED) is default. Sections alternate with Mist (#E8E4DE) for rhythm. Dark sections use Off Black (#0E0E0E) or Ink (#1A1A2E).
Text on light
Off Black (#0E0E0E) at full opacity for body. 60% opacity for secondary/supporting text.
Text on dark
Warm White (#F5F2ED) at full opacity. Sand (#C8A97A) for accents and highlights in dark sections.
CTAs & actions
Sage (#4A7C6F) as the primary action colour. Hover state: Sage darkened 15%, with 2px upward translate. Never use red or orange for actions.
Never use
Pure #000000 or #FFFFFF anywhere. Purple gradients. Neon colours. More than 3 colours on any single component.


Dark / Light Section Alternation
The page does not stay in one mode. Sections alternate intentionally — not arbitrarily. Dark sections create drama and emphasis. Light sections create breathing room. The rhythm should feel musical, not mechanical.

Hero
Dark (Ink or Off Black) — immediate authority and contrast
About / Problem
Light (Warm White) — openness, honesty, approachability
How It Works
Mist (#E8E4DE) — neutral, methodical, trust-building
Case Study / Proof
Dark (Off Black) — drama, before/after contrast
Services
Light — clarity, easy reading, no distraction
Contact / CTA
Dark (Ink) — close the loop, return to the authority of the opening


2. Typography System
Typography is the single most powerful differentiator on a text-heavy service website. The font choices below were selected to be expressive without being decorative, structured without being cold, and completely distinctive in this market category.

Font Stack

Display / Hero
Cormorant Garamond — Variable, Bold/SemiBold weights only for large headings. Loaded from Google Fonts. Elegant, editorial, unexpected in a B2B digital context.
Headlines / UI
DM Sans — Variable, weights 300–700. Clean geometric sans with personality. Used for section headings, navigation, labels, and UI text.
Body / Long-form
Source Serif 4 — Variable. For paragraph-length content. Humanist serif that reads beautifully at small sizes and adds warmth to long passages.
Monospace / Code
JetBrains Mono — For technical callouts, process steps labelled numerically, code snippets in case studies.


Font loading strategy: Preload the 3 most-used weights of each variable font. Use font-display: swap. Host statically after confirming Google Fonts licence or self-host via Fontsource.


Type Scale — Desktop

Your business has grown. Does your website show it?
Display / Hero H1  ·  Cormorant Garamond  ·  Bold  ·  clamp(52px, 6vw, 84px) · line-height 1.0 · tracking -0.03em


What changes when the gap is closed
Section H2  ·  Cormorant Garamond  ·  Bold  ·  clamp(36px, 4vw, 60px) · line-height 1.1 · tracking -0.02em


The three outcomes every engagement delivers
Subsection H3  ·  DM Sans  ·  Bold  ·  28px–34px · line-height 1.2 · tracking -0.01em · weight 600


GROWTH-STAGE REPOSITIONING
UI Label / Eyebrow  ·  DM Sans  ·  Bold  ·  11px–12px · UPPERCASE · letter-spacing 0.15em · weight 600 · Sage colour


Most businesses evolve faster than their website. That gap creates a credibility problem that costs more than a redesign ever would.
Body / Long-form  ·  Source Serif 4  ·  Regular  ·  16px–18px · line-height 1.7 · max-width 65ch · weight 400


The site should make them feel found, not pitched at.
Pull Quote / Emphasis  ·  Source Serif 4  ·  Bold  ·  20px–24px · italic · line-height 1.4 · Sand underline accent · weight 600


Type Scale — Mobile Adjustments
H1 Display
clamp(36px, 8vw, 52px) · tighter tracking · max 3 lines · never truncated
H2 Section
clamp(28px, 6vw, 40px) · allow 2–3 lines · line-height 1.15
H3 Subsection
22px–26px · same weight, reduce line-height to 1.25
Body
17px–18px · line-height 1.75 · max-width 100% (full bleed on mobile)
Eyebrow label
10px · same tracking · reduce margin below
Pull quote
20px · same italic weight · full-width on mobile, no sidebar positioning


Typography Rules
Never set body text wider than 65–70 characters (65ch). Long lines break reading flow.
Never use a font weight below 300 for body — it renders poorly on non-Retina screens.
Never centre-align body text longer than 2 lines. Centred paragraphs are almost always wrong.
Always use optical sizing for Cormorant Garamond (font-optical-sizing: auto).
Eyebrow labels always appear ABOVE the headline they describe, never below it.
Use typographic hierarchy — do not rely on colour alone to differentiate levels.

3. Layout System & Visual Hierarchy
Layout is the invisible architecture of the site. Done well, the visitor never notices it — they simply feel guided. Done badly, they feel lost or overwhelmed after three seconds and leave.

Grid System
Base grid
12-column grid · max-width 1200px · centred · gutter 24px desktop, 16px tablet, 12px mobile
Content width
Readable content: 8 of 12 columns (centred) · wide content: 10 of 12 · full bleed: edge-to-edge with padding-x 48px desktop
Section padding
Vertical: 120px desktop · 80px tablet · 60px mobile · Never less than 48px between sections
Card grid
3-up on desktop · 2-up on tablet · 1-up on mobile · gap 32px desktop, 20px mobile
Asymmetric zones
Select sections break the grid intentionally — e.g. text 7/12, image 6/12 with -1 col overlap. Use sparingly for drama.


Visual Hierarchy — The Focal Point System
Every section of the page has one focal point. Not two. Not three. One. The designer's job is to make that decision and enforce it with contrast, size, and whitespace. Use this system to evaluate every layout:

Hierarchy Level
Visual Treatment
Example Element
Rule
Primary
Largest size · strongest weight · highest contrast · most whitespace around it
Hero headline
One per screen. Never compete with itself.
Secondary
Medium size · medium weight · moderate contrast · breathing room
Section headline, CTA button
Max 2 per screen, clearly subordinate to primary
Tertiary
Smaller · lighter weight · reduced opacity or colour · tight spacing
Body copy, labels, dates
Can be multiple — these are supporting, not leading
Ghost
Very low contrast · sometimes greyed · decorative role
Background words, decorative numbers, section markers
Never competes, only adds texture


Page-Level Architecture
The full page is structured as a persuasion journey — not a catalogue. Each section has a job. The job connects to the next section. Nothing is decorative filler.

01
HERO — The Provocation
Full-viewport. Dark background. One enormous headline that names the pain. A 1-line subheadline that names the solution. One CTA only: 'Start the conversation'. No body copy, no bullet points, no service list. The visitor should feel: 'This is for me.'
02
SOCIAL PROOF BAR
Horizontal scrolling ticker or static logos of types of businesses served. Not a name-drop wall — a category credibility strip. Keeps the momentum from the hero.
03
THE PROBLEM — Named with Precision
Light section. 2–3 short paragraphs that articulate the gap problem better than the visitor could articulate it themselves. This is the moment of recognition. Sub-copy that names the three specific costs of the gap (lost trust, wrong clients, lower perceived value). No bullet lists — prose only.
04
HOW IT WORKS — The Process
Mist background. 3-step process with large numeral markers, brief headline per step, 2-sentence explanation. Horizontal on desktop, vertical on mobile. Animated entry on scroll — numbers count up, steps fade in sequentially.
05
THE OUTCOME — What Changes
Dark section. 3 outcome cards: Clarity / Credibility / Conversion. Each card: bold headline, 2-line description, decorative icon or abstract mark. Subtle hover state. This is the transition from problem to solution.
06
CASE STUDY — Proof in Motion
Split layout: before/after visual on one side, business impact narrative on the other. Dark background for the visual, light card for the text. 'What changed' written in the client's language. Link to full story (optional).
07
WHO THIS IS FOR — Recognition Moment
3 short persona profiles — not named as 'personas', but written as recognition: 'If you're the founder who...' Each one 3–4 sentences. No jargon. The visitor should self-select into one.
08
ABOUT / THE DIFFERENTIATOR
Not a bio. One paragraph that names what makes this engagement different from a designer, a developer, or an agency — and why the combination matters. Photo optional but recommended for trust.
09
CTA SECTION — The Ask
Dark section. Full-width. One headline: 'Ready to close the gap?' One sub-line. Two options: 'Start with a Clarity Sprint' (primary CTA) and 'Not sure yet — read more' (secondary, softer link). No forms on this section — just directional links.
10
CONTACT — Frictionless Entry
Light section or standalone page. NOT a generic contact form. A brief intake: 'Tell us about your business (3 questions).' Question 1: What does your business do and who do you serve? Question 2: What feels misaligned about your current digital presence? Question 3: What would you want to be different in 90 days? Submit → confirmation with next-step expectation set.


4. Animation & Motion Language
Motion on this site is never decorative. Every animation earns its place by either guiding attention, communicating quality, or making the experience feel more alive. The motion language is slow and considered — not bouncy or energetic.

Animation principle: The best animation on this site is the one the visitor does not consciously notice — they just feel that the site is alive and responsive.


Library Stack
GSAP (GreenSock)
Primary animation engine. Used for all scroll-triggered sequences, timeline choreography, and any animation requiring precise control. The ScrollTrigger plugin handles viewport-based triggers.
GSAP ScrollTrigger
Plugin for GSAP. Fires animations when elements enter the viewport. Used for section reveals, number counting, line drawing. Far more reliable than IntersectionObserver for complex sequences.
Lenis
Smooth scroll library. Replaces the browser's native scroll with a lerp-based (linear interpolation) system. Creates the 'premium site' feel where the page moves fluidly rather than snapping. Lightweight (~2KB).
Motion One (optional)
Web Animations API wrapper. Use for simple CSS-class-driven micro-interactions (button hover, card lift, link underline) where GSAP is overkill. Only add if already using it to avoid duplication.
CSS Transitions
For all hover states, focus states, and state changes on interactive elements (buttons, nav links, form inputs). Always prefer CSS over JS for these — better performance and progressive enhancement.


Motion Timing Tokens
/* Motion tokens — define once, reference everywhere */
--duration-instant:   80ms;    /* Input feedback, focus rings */
--duration-fast:     200ms;    /* Hover states, small reveals */
--duration-base:     400ms;    /* Standard element entry */
--duration-slow:     700ms;    /* Section reveals, hero entry */
--duration-crawl:   1200ms;    /* Staggered sequences, count-up numbers */

--ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);    /* Decelerating entries */
--ease-in-expo:   cubic-bezier(0.7, 0, 0.84, 0);    /* Disappearing elements */
--ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1); /* Subtle overshoot on CTAs */
--ease-smooth:    cubic-bezier(0.4, 0, 0.2, 1);      /* General transitions */


Animation Specification — Full Table

Element
Trigger
Library
Duration
Easing
Notes
Hero headline
Page load
GSAP
900ms
ease-out-expo
Stagger each word 60ms. Y: +40px → 0. Opacity 0 → 1. ClipPath reveal optional.
Hero subline
Page load +400ms
GSAP
700ms
ease-out-expo
Follows headline. Same Y translation but smaller distance (+20px).
Hero CTA button
Page load +700ms
GSAP
500ms
ease-spring
Scale 0.9 → 1 + opacity. Subtle spring bounce communicates interactivity.
Nav on scroll
Scroll Y > 80px
CSS + GSAP
300ms
ease-smooth
Background fades from transparent to Off Black/blur. Logo scales down 5%.
Section headline
Enters viewport
GSAP ScrollTrigger
700ms
ease-out-expo
Y: +30px → 0. Opacity 0 → 1. Trigger: 80% from top of viewport.
Body paragraphs
Enters viewport
GSAP ScrollTrigger
500ms
ease-out-expo
Y: +20px → 0. Opacity 0 → 1. Stagger 80ms per paragraph.
Process step numbers
Enters viewport
GSAP
800ms
ease-out-expo
Count up from 0 to final number. Each digit animates independently.
Outcome cards
Enters viewport
GSAP ScrollTrigger
600ms
ease-out-expo
Stagger 120ms per card. Y: +24px → 0. Hover: Y: -4px + shadow deepens.
Case study split
Enters viewport
GSAP ScrollTrigger
800ms
ease-smooth
Left panel slides from -5% X. Right panel fades in 200ms after.
Persona cards
Enters viewport
GSAP ScrollTrigger
600ms
ease-out-expo
Stagger 100ms. Opacity + Y reveal. Border-left draws in via scaleY.
CTA button hover
Mouse enter
CSS
200ms
ease-spring
Background Sage → Sage-dark. Y: -2px. Box-shadow deepens. Scale 1.02.
Link underlines
Mouse enter
CSS
200ms
ease-smooth
Underline width 0 → 100% via scaleX from left. Use transform-origin: left.
Form inputs focus
Focus event
CSS
150ms
ease-smooth
Border-color transitions to Sage. Subtle box-shadow ring. Label floats up.
Page transitions
Route change (if SPA)
GSAP
400ms
ease-smooth
Outgoing: opacity 1 → 0 + Y: 0 → -20px. Incoming: reverse. Overlap 100ms.
Horizontal ticker
On load / loop
CSS (marquee)
∞
linear
Duplicate content for seamless loop. Pause on hover. Respect prefers-reduced-motion.
Cursor (desktop)
Mouse move
Vanilla JS + CSS
—
lerp 0.12
Custom cursor: 12px Sage dot + 40px ring that trails at 12% lerp speed.


Reduced Motion — Accessibility
All motion must respect the user's prefers-reduced-motion preference. This is not optional — it is a WCAG AA requirement.

@media (prefers-reduced-motion: reduce) {
  /* Disable all GSAP animations — check this flag before initialising */
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* In GSAP — check at init */
const motionOK = window.matchMedia(
  '(prefers-reduced-motion: no-preference)'
).matches;

if (motionOK) {
  // initialise all GSAP timelines and ScrollTriggers
  initAnimations();
}


Lenis Smooth Scroll Setup
import Lenis from '@studio-freight/lenis';

const lenis = new Lenis({
  duration: 1.2,          // Overall scroll duration multiplier
  easing: (t) =>          // Custom easing function
    Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1.0,
  touchMultiplier: 2.0,
  infinite: false,
});

// Connect to GSAP ticker for ScrollTrigger compatibility
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);


5. Responsive System
Responsive is not about shrinking a desktop layout onto a phone. It is about redesigning the hierarchy for each context. Mobile users are not second-class — they are likely first contact. Design mobile with the same intention as desktop.

Breakpoint System

Name
Range
Token
Key Behaviour
Mobile S
320px – 479px
--bp-xs
Single column. Nav collapses to hamburger. Hero text max 2 lines. CTA full-width button.
Mobile L
480px – 767px
--bp-sm
Single column, generous padding. Typography scales up 10%. Touch targets min 48×48px.
Tablet
768px – 1023px
--bp-md
2-column grids unlock. Side-by-side case study cards. Nav still collapsed. Hero gets more breathing room.
Desktop S
1024px – 1279px
--bp-lg
Full navigation. 3-column layouts available. Sticky nav activates. GSAP ScrollTrigger fires.
Desktop L
1280px – 1535px
--bp-xl
Max content width 1200px, centred. Wider margins. Larger typographic scale.
Wide
1536px+
--bp-2xl
Max-width capped. Background elements fill the void. No layout changes — only atmosphere.


Mobile-First Development Approach
Write base CSS for mobile. Use min-width media queries to enhance upward. Never write desktop-first and patch mobile with max-width overrides.


/* Correct: Mobile-first */
.hero-headline {
  font-size: clamp(36px, 8vw, 52px);  /* Mobile default */
}
@media (min-width: 1024px) {           /* Enhance for desktop */
  .hero-headline {
    font-size: clamp(52px, 6vw, 84px);
  }
}

/* Wrong: Desktop-first with mobile patches */
.hero-headline { font-size: 84px; }   /* Bad — do not do this */
@media (max-width: 768px) { ... }      /* Patching is error-prone */


Component Behaviour by Breakpoint
Navigation
Desktop: horizontal links, right-aligned CTA button. Tablet: links collapse, hamburger appears. Mobile: full-screen overlay menu, large tap targets, CTA prominent at bottom.
Hero section
Desktop: 2-column — headline left, visual right (or full-width headline). Mobile: full-width headline stacked, CTA below, no split layout.
Process steps
Desktop: horizontal 3-step row with connecting line. Tablet: 2-up + 1 below. Mobile: vertical stack, number left, text right.
Outcome cards
Desktop: 3-column. Tablet: 2+1 layout or full-width with reduced padding. Mobile: vertical stack, full-width cards.
Case study
Desktop: 50/50 split with visual overlap. Tablet: stacked — visual top, text below. Mobile: same stack, image scaled to 60vh.
Contact form
Desktop: centred, max-width 640px. Mobile: full-width, larger input tap areas, keyboard-aware (avoid content jumping).
Custom cursor
Desktop only — never shown on touch devices. Check via pointer media query.
Ticker / marquee
Desktop: full-width, smooth. Mobile: same but slower speed (12s per cycle vs 20s).


Touch & Interaction Considerations
All interactive elements must have a minimum touch target of 48×48px (WCAG 2.5.5)
Hover-only interactions must have touch alternatives — no content that is only accessible on hover
Swipe gestures on mobile for carousels must have visible pagination dots as fallback
The custom cursor (Sage dot + ring) must be completely hidden on touch devices using @media (pointer: coarse)
GSAP ScrollTrigger works on mobile but test scroll velocity — Lenis must be configured with a higher touchMultiplier
Form inputs must not cause viewport zoom on iOS — set font-size: 16px minimum on all inputs

6. UX Flow — How We Sell Without Showing Price
The site is a funnel, not a catalogue. The job of every section is to move the visitor one step closer to starting a conversation. Price is never shown — because price is not the point. The point is whether this visitor recognises their problem in what they read and feels confident enough to start a dialogue.

The Three Visitor Types & Their Journeys
The Ready Buyer
Already knows they have the problem. Looking for evidence you can solve it. Journey: Hero → Case Study → Contact. Give them a fast path — make the CTA visible at all times in the nav.
The Exploring Buyer
Has the problem but is not yet committed to solving it now. Needs to understand the problem better than they do. Journey: Hero → Problem section → How It Works → Persona recognition → Case Study → Contact.
The Referred Visitor
Sent by someone who knows you. Already has partial trust. Needs validation. Journey: Hero → About → Case Study → Contact. They are looking for reasons to confirm the referral.


Contact Strategy — Frictionless, Not Formless
The contact section replaces a generic contact form with a 3-question intake. This serves three purposes: it qualifies the lead, it shows sophistication (you ask the right questions), and it makes the visitor articulate their own problem — which increases commitment before the first call.

Question 1
What does your business do and who do you serve? (3-4 lines) → Qualifies the client category, checks fit
Question 2
What feels misaligned about your current digital presence? → Surfaces the problem in their words — gold for the first call
Question 3
If this was sorted in 90 days, what would be different for you? → Surfaces the outcome they are buying, not the service they think they need
After submit
Confirmation message: 'We'll review this and come back to you within one business day with some initial thoughts — not a pitch, just an honest reaction.' Sets expectation. Not automated.
Response time
Within 24 business hours. Manual, personalised reply — reference something specific from their form. This is the first demonstration of the service quality.
No price on site
Price is never shown. If asked via form or email before a call: 'Our engagements range depending on scope — the best thing is a short call where we can give you an honest assessment.' Never quote blind.


Navigation CTA Strategy
Primary CTA in the navigation: 'Start the conversation' — not 'Contact', not 'Get a quote', not 'Book a call'
CTA is always visible on desktop in the top-right nav. On mobile, it appears at the bottom of the hamburger menu.
On scroll past the hero, the nav CTA becomes sticky and gains a Sage background — it follows the visitor down the page
Secondary CTA at the bottom of every section: not a button, but a text link — 'Ready to talk? →' — so it never competes with the section's primary purpose
There is no pricing page. If a visitor navigates looking for one, the 404 should redirect to the intake form with copy: 'Pricing depends on what you actually need. Tell us a bit about your situation.'

7. Key UI Components
CTA Button — Primary
.btn-primary {
  background:    var(--color-sage);         /* #4A7C6F */
  color:         var(--color-warm-white);   /* #F5F2ED */
  font-family:   'DM Sans', sans-serif;
  font-size:     15px;
  font-weight:   600;
  letter-spacing: 0.04em;
  padding:       14px 32px;
  border-radius: 2px;                       /* Barely rounded — intentional */
  border:        none;
  cursor:        pointer;
  transition:    all var(--duration-fast) var(--ease-spring);
}
.btn-primary:hover {
  background:    #3A6358;                   /* Sage -15% lightness */
  transform:     translateY(-2px);
  box-shadow:    0 8px 24px rgba(74,124,111,0.3);
}
.btn-primary:focus-visible {
  outline:       3px solid var(--color-sand);
  outline-offset: 3px;
}


Eyebrow Label
.eyebrow {
  font-family:   'DM Sans', sans-serif;
  font-size:     11px;
  font-weight:   600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color:         var(--color-sage);
  margin-bottom: 12px;
  display:       block;
}


Outcome / Service Card
.card {
  background:    var(--color-mist);
  border:        1px solid rgba(0,0,0,0.06);
  border-radius: 4px;
  padding:       40px 36px;
  transition:    transform var(--duration-fast) var(--ease-spring),
                 box-shadow var(--duration-fast) var(--ease-smooth);
}
.card:hover {
  transform:     translateY(-4px);
  box-shadow:    0 16px 48px rgba(0,0,0,0.10);
}
.card__number {
  font-family:   'Cormorant Garamond', serif;
  font-size:     72px;
  font-weight:   700;
  color:         var(--color-sand);
  opacity:       0.4;
  line-height:   1;
  margin-bottom: 16px;
}


Section Divider — Typographic
Never use a horizontal rule (<hr>) as a section divider. Use white space, background colour changes, or this typographic divider for visual rhythm without cliché:
.section-divider {
  display:         flex;
  align-items:     center;
  gap:             16px;
  margin:          80px 0;
}
.section-divider::before,
.section-divider::after {
  content:         '';
  flex:            1;
  height:          1px;
  background:      linear-gradient(
    to right,
    transparent,
    var(--color-sand) 40%,
    transparent
  );
}
.section-divider span {
  font-family:     'JetBrains Mono', monospace;
  font-size:       11px;
  color:           var(--color-sand);
  letter-spacing:  0.12em;
}


8. Graphic Line & Visual Aesthetic
The graphic language of this site is editorial minimalism with warmth — closer to a well-designed financial publication or a premium architecture studio than a tech startup or a creative agency. It has restraint, but it has character.

Decorative Elements
Large ghost numerals
Oversized, very low-opacity Cormorant Garamond numerals behind section content (e.g. '01', '02'). Colour: Off Black at 5-8% opacity on light sections. Warm White at 6% on dark. Never interfere with readability.
Thin horizontal rules
A single 1px line in Sand (#C8A97A) at 40% opacity. Used sparingly — max twice per page — before section eyebrow labels to create visual anchors.
Geometric dot grid
A very subtle dot grid pattern as a texture layer on Mist sections. Created via CSS radial-gradient at 3% opacity. Never on dark sections.
Grain overlay
A fine grain texture (SVG feTurbulence or CSS background via data URI) at 4% opacity over ALL sections. Removes the 'screen' feeling and adds print-like warmth. Critical for the premium feel.
Single accent line
A 2px vertical line in Sage used as a left-border accent on pull quotes and testimonials. Nothing else. Consistency gives it meaning.
No photography style
If photography is used: natural light, warm tones, editorial framing. Never stock. Never posed. If no photography is available yet, use geometric abstract sections instead — do not use placeholder visuals.


What to Avoid Completely
Gradient meshes or blob shapes — too 2021-2022 SaaS startup, undermines credibility
3D elements or perspective transforms — not wrong everywhere, wrong for this brand positioning
Animated backgrounds that compete with content — motion should serve content, not distract from it
Drop shadows on text — use whitespace and contrast for separation, not shadows
Border radius above 6px — keep edges clean and slightly sharp to signal precision
Full-bleed stock photography as hero backgrounds — the headline is the hero, not the image
More than two typefaces visible at any time — our four-font stack is a system, not a free-for-all

Atmosphere & Texture Technique
/* Grain overlay — applied to body or specific sections */
.grain-overlay::after {
  content:    '';
  position:   fixed;
  inset:      0;
  pointer-events: none;
  z-index:    9999;
  opacity:    0.04;
  background-image: url("data:image/svg+xml,..."); /* SVG noise */
  /* Or use: filter: url(#grain) via inline SVG feTurbulence */
}

/* Dot grid — Mist sections only */
.section--mist {
  background-image: radial-gradient(
    circle,
    rgba(26,26,46,0.12) 1px,
    transparent 1px
  );
  background-size: 24px 24px;
}


9. Accessibility Standards
Accessibility is not a checklist — it is a design constraint that makes the site better for everyone. Target WCAG 2.1 Level AA as the minimum. These are non-negotiable.

Colour contrast
Body text on backgrounds: minimum 4.5:1 ratio. Large text (24px+ or 18px+ bold): minimum 3:1. Test every combination with a contrast checker before final design sign-off.
Focus indicators
Visible focus rings on all interactive elements. Use outline: 3px solid #C8A97A (Sand) with outline-offset: 3px. Never remove :focus — only style it.
Semantic HTML
Use correct heading hierarchy (one H1 per page). Use <nav>, <main>, <section>, <article>. Buttons must be <button> not <div>. Links must have descriptive text — never 'click here'.
Alt text
All images require meaningful alt text. Decorative images (grain texture, dot grid) use alt="" to be skipped by screen readers.
Motion safety
All animations respect prefers-reduced-motion. No flashing or strobing content. Carousels must be pausable.
Font size floor
No text below 14px in the design. 16px for body copy. Form inputs 16px minimum (prevents iOS auto-zoom).
Touch targets
All interactive elements: minimum 48×48px on mobile. Spaced minimum 8px apart. Never stack tap targets.


10. Recommended Technical Stack
The tech stack should serve the design, not constrain it. These are recommendations based on what delivers the best performance, animation capability, and developer experience for this type of site.

Framework
Next.js (React) — SSG for static pages, SSR for the contact form handler. Excellent performance, Vercel deployment, full control over the DOM.
Styling
CSS Modules + custom CSS properties (variables). No Tailwind — the design system needs bespoke specificity that utility classes make awkward. Tailwind is excellent for product UIs, not bespoke marketing sites.
Animation
GSAP + ScrollTrigger + Lenis. Loaded client-side only — use dynamic import() to avoid SSR conflicts with window.
Fonts
Fontsource (npm) for self-hosted Google Fonts — avoids the Google Fonts network call and GDPR implications. Variable fonts where available.
Forms
React Hook Form for the intake form. Submission via Next.js API route → email notification (Resend or Nodemailer). No third-party form services — keep control.
Analytics
Fathom or Plausible — privacy-first, GDPR-compliant, no cookie banner required. Track: page views, CTA clicks, form starts, form completions.
CMS (optional)
Sanity.io — if case studies need to be added without a dev. Headless, excellent DX, real-time preview. Only add if content will be updated regularly.
Deployment
Vercel — zero-config Next.js deployment, edge CDN, preview URLs per branch. Free tier is sufficient to start.
Performance targets
Lighthouse: 90+ on all four metrics. Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID < 100ms. Test on real mobile devices, not just Chrome DevTools.


11. Summary — The Site in One Paragraph
Build a site that feels like the best version of what we offer — composed, purposeful, alive with subtle motion, warm with texture, clear in its hierarchy. Every visitor should feel that their problem has been named and that they have found the right team to solve it. There is no price, no menu of services, no bulleted feature list. There is a conversation waiting for them at the end — and the entire site is designed to make starting that conversation feel like the obvious next move.


Pre-Build Checklist
Define all CSS custom properties (tokens) before writing any component CSS
Confirm font licences and set up Fontsource before any design decisions finalise
Test colour contrast ratios for every text-background combination
Set up Lenis and GSAP in a single animation.js file — do not scatter GSAP code across components
Build mobile-first — design the 375px layout before the 1440px layout
Add prefers-reduced-motion check to all animation initialisation code
Set up Plausible/Fathom analytics before launch — not after
Test on real devices: iPhone SE (small), Android mid-range, iPad, and 1080p desktop
Run Lighthouse audit on production build — not dev server
Write the 3 intake form questions before building the form — they are the most important UI on the site

This specification is a living document. Update it as design decisions evolve. Every deviation from these guidelines should be a deliberate, documented choice — not an accident.
