# LeakSonic / Sentrix — Website Audit

**Audit date:** 2026-07-14
**Scope:** Every page route and shared component, read directly from source (not from memory).
**Method:** Read `app/**/page.tsx`, all shared components (`Hero`, `PageHero`, `Navbar`, `Footer`, `AudienceLayout`, `LegalLayout`, `CtaBand`, all `diagrams/*`, `ui/*`, `blog/*`), the design system (`globals.css`, `tailwind.config.ts`), content data (`lib/faq.ts`, `lib/glossary.ts`, `lib/content.ts`, `lib/site.ts`), and the 48 MDX blog posts' structure.

**Pages in scope (17 route templates + dynamic blog):**
`/` · `/platform` · `/solutions/pipeline-operators` · `/solutions/government-agencies` · `/solutions/researchers` · `/research` (labelled "Approach") · `/blog` · `/blog/[slug]` (48 posts) · `/about` · `/case-studies` · `/press` · `/contact` · `/resources/glossary` · `/resources/faq` · `/resources/reports` · `/privacy` · `/terms`

**One-line overall verdict:** The site is genuinely well-built, consistent, and copy-strong — it reads as a *credible early-stage company*, not a student project — but a near-total absence of real photography/product imagery plus several visibly-unfinished placeholder pages hold it back from reading as an *established, fundable enterprise vendor*.

---

## 1. Visual design audit

### Design system (applies to all pages)
- **Palette:** near-black base (`#0A0A0B`), single deep-red accent (`#C41F2B`), off-white ink, five ink tints. Disciplined and consistent. Dark-first with a working light theme toggle.
- **Typography:** Figtree only (single variable font). Type scale is defined and restrained: `display-lg`, `display`, `h1`, `h2`, `h3` (clamp-based/responsive) plus standard body sizes. **Only five font weights are used** across the whole site (normal ×1, medium ×24, semibold ×45, bold ×20, extrabold ×4) — this is a clear, intentional scale, not ad hoc.
- **Texture:** subtle film-grain + faint grid overlays stop the dark fields from reading as flat. This is a real, tasteful technique.
- **Radii/spacing:** squircle radii, section padding tightened to `3.25rem`. Container maxes at `min(94vw, 1440px)` so wide screens don't leave dead margins.
- **Cross-cutting visual weakness:** **only two real raster images exist in the entire site** — the logo mark and the founder photo. Everything else is hand-built SVG (diagrams, dashboard mock, blog covers) or CSS. This is the single biggest visual limitation and recurs on every page below.

### `/` Homepage
- **Hierarchy:** strong. Clear H1, one primary (red) CTA vs one secondary CTA, then a well-sequenced scroll (reframe chart → before/after → 3 pillars → flow diagram → dashboard mock → standards band → why-now → "where we are" → differentiation → footer CTA). It is obvious what matters most.
- **Whitespace:** good; sections alternate `bg-base`/`bg-surface` and have breathing room.
- **Color:** restrained, one accent per section. Good.
- **Imagery:** the only "visual proof" is `DashboardPreview` — an **SVG mock explicitly captioned "Illustrative representation of the Sentrix integrity console."** The hero visual (`DroneScan`) is an abstract animated radar sweep, not a product or field image. No photography anywhere. This is the weakest link on an otherwise strong page.
- **Consistency/mobile:** grids collapse 3→1 cleanly; hero stacks. No obvious breakage.

### `/platform`
- **Hierarchy:** strong and logical (problem cards → single flow diagram → 3 pillar deep-dives → 6-deliverable grid → dashboard mock → standards grid → 2 governance cards → CTA).
- **Whitespace/consistency:** good; matches homepage rhythm.
- **Imagery:** same limitation — the only visuals are the `FlowDiagram` (clean, plain) and the illustrative `DashboardPreview`. The 6-deliverable grid and standards grid are text-in-boxes; a couple would land faster as small icons/diagrams.
- **Typography/color:** consistent.

### `/solutions/*` (operators / government-agencies / researchers)
- Shared `AudienceLayout`: PageHero → 3 stat chips → "concerns" Q&A cards → "value" cards → CTA.
- **Hierarchy:** fine, but these pages are **entirely text cards with zero supporting visual** — no diagram, no image, no screenshot. They read as walls of well-written cards.
- **Consistency:** all three are visually identical in structure (intended), which is good for cohesion but makes them feel templated.

### `/research` ("Approach")
- **Hierarchy:** good — philosophy statement → 4 principle cards → `ValidationStepper` diagram → 5 "claims under test" rows (each with an "In progress" badge) → collaboration CTA.
- **Imagery:** one SVG stepper; otherwise text cards.
- **Note:** the repeated "In progress" badges visually signal early-stage (see §3).

### `/about`
- **Hierarchy:** strong; now includes the SDG-alignment section (6 goal cards) and the "shift we're part of" narrative, which add visual and mission variety.
- **Imagery:** the founder photo is the single strongest real-image moment on the site. Everything else is text.
- **Length:** the longest prose page; see §2.

### `/case-studies`
- **Hierarchy:** clear, but the page's *content* is the problem. It contains: a field-visit write-up (three stacked prose blocks), an **`ImagePlaceholder` that literally renders "Pending field documentation"**, a validation roadmap (3 cards), and a **"The structure a real case study will drop into" section showing four empty "TEMPLATE SLOT" cards**. Visually this reads as a page that is still under construction.
- **Imagery:** the only image slot is an explicit placeholder.

### `/contact`
- **Hierarchy:** excellent — 4 clearly-iconned segmented forms (operator/government/researcher/investor), jump-nav chips, email fallback. This is one of the most polished, purpose-built pages.
- **Imagery:** none needed; forms carry the page.

### `/press`
- **Hierarchy:** clean facts table → recognition chips → coverage → press contact.
- **Imagery/credibility:** recognitions are **text+icon chips, not real logos** (code has a `TODO` to swap in real logos), and the "Coverage & releases" section is a **dashed empty box reading "No press coverage or releases to list yet."** Honest, but visually unfinished.

### `/resources/glossary`
- **Hierarchy:** good — jump-chips + a long definition list. Content-rich (30+ terms). Text-only by nature (acceptable for a glossary).

### `/resources/faq`
- **Hierarchy:** topic chips + accordion of 20+ Q&As. Text-only (acceptable for FAQ). Long.

### `/resources/reports`
- **Content:** only **two items — one "Coming soon" (locked), one linking to `/research`.** The thinnest page on the site; reads as a stub.

### `/blog` (index) and `/blog/[slug]`
- **Index hierarchy:** clean category filter + 3-col card grid.
- **Covers:** every card uses `BlogCover` — a generated SVG that varies only by **one of four category motifs** (fundamentals/india/technical/industry) plus a per-slug seed. Across 48 posts this produces **strong visual monotony**: the index is a wall of near-identical abstract red-on-black tiles.
- **Post page:** good reading layout (cover → answer-first summary → body with `Definition` boxes → FAQ → tags). **In-body visuals are absent** — posts are long-form text with only the cover image; no inline diagrams, charts, or photos to break up 1,000–1,500-word articles.

### `/privacy`, `/terms`
- Shared `LegalLayout`. Dense text walls (expected for legal). Low visual priority.

### Consistency across pages — **strong.** Every inner page uses `PageHero`; section rhythm, card styles, `CtaBand`, badges, and buttons are reused everywhere. The site unmistakably feels like one product.

### Mobile responsiveness — **generally solid from the code.** Grids collapse to single column; the navbar has a working mobile menu; the hero and all multi-column sections stack. Watch items: `DashboardPreview` is information-dense and collapses its sidebar to a 44px icon rail on mobile (legible but tight), and the hero's `min-h-[calc(100svh-4rem)]` can feel tall on small screens.

---

## 2. Copy and content density audit

### Overall
The copy is **specific, credible, and engineering-literate** — well above the generic-startup baseline. The dominant density problem is not vagueness; it is **length plus repetition**, and a few unbroken prose blocks.

### Per-page density

| Page | Approx. visible words | Read as text-heavy? | Notes |
|---|---|---|---|
| `/` Homepage | ~650–750 | No — well broken up | Chart, cards, stats, diagram, dashboard give strong relief |
| `/platform` | ~700–800 | Slightly | Good structure; deliverables/standards are text-in-boxes |
| `/about` | ~750–850 | Yes | Longest prose page; mission + active-dev + founder + why + SDG |
| `/research` | ~550–650 | Moderate | Mostly cards + stepper; readable |
| `/case-studies` | ~450 | Moderate | Three stacked prose blocks in the field-visit section |
| `/solutions/*` (each) | ~450–500 | Yes | All-text cards, no visual relief |
| `/press` | ~200 | No | Facts table format |
| `/contact` | ~200 prose + forms | No | Form-driven |
| `/resources/faq` | ~2,500+ (20 Q&As) | Yes (by design) | Accordion mitigates it |
| `/resources/glossary` | ~4,000+ (30+ terms) | Yes (by design) | Jump-nav mitigates it |
| `/resources/reports` | ~120 | No — too thin | Understocked |
| `/privacy`, `/terms` | ~900 / ~1,250 | Yes (legal) | Expected |
| `/blog/[slug]` | ~1,000–1,500 each | Yes | Headers + Definition boxes help, but no inline visuals |

### Large unbroken paragraph blocks (candidates for a stat/list/diagram)
- **Homepage "Why now"** — one dense paragraph carrying three separate ideas (network growth, OGMP shift, India CGD figure). Would land faster as three stat callouts.
- **`/case-studies` field-visit** — "Why we went / What we learned / What this is and isn't" are three consecutive prose blocks with no visual.
- **`/solutions/*` "concerns" and "value" sections** — every point is a prose card; some (e.g. "does it reduce risk per inspection dollar?") could be a stat or icon.
- **`/platform` six deliverables + governance cards** — all prose; a couple would be clearer as a labelled diagram.
- **Blog posts** — each is long-form prose relieved only by `##` headers and occasional `Definition` boxes; none contain an inline chart/diagram even where one would explain faster (e.g. the leak-detection "spectrum," the pigging "launcher/receiver" flow, the drone market "three layers").

### Repeated points across pages (same idea restated)
These positioning lines recur near-verbatim on multiple pages — reinforcement that tips into redundancy for anyone who browses more than one page:
- **"The drone is one input; the product is the decision layer."** — home, platform, about, FAQ, `/research`, drone-market blog.
- **"We integrate rather than replace / not another system to adopt."** — home (differentiation), platform (flow + governance), solutions, FAQ, about.
- **"We say plainly what we don't do — no wall-thickness measurement, no underground sensing."** — home, `/research`, FAQ, platform.
- **"The cost/effort is in the deciding, not the flying" (the 20/80 reframe).** — home, platform.
- **"No fabricated logos / no invented case studies / we won't overclaim."** — home ("Where we are"), case-studies (twice), press, FAQ, `/research`.

### Vague / generic / filler language
- Comparatively little. The phrases most at risk of sounding interchangeable-with-any-startup are **"engineering decision intelligence," "decision-ready," "with evidence," "auditable"** — but each is consistently backed by concrete specifics, so they mostly earn their place. No lorem ipsum, no obvious filler paragraphs.
- Mild corporate-tone repetition of the word **"honest / honestly"** (appears as a theme on case-studies, press, FAQ, research) — the honesty is a genuine differentiator but is *stated* often enough to become a verbal tic.

### Where a wall of text could become a visual
- Homepage "Why now" → 3 stat tiles.
- Leak-detection blog "spectrum of methods" → one sensitivity-vs-coverage diagram.
- Pigging blog "launcher → line → receiver" → one flow diagram.
- Drone-market blog "three layers" → one stacked diagram.
- `/platform` deliverables → an annotated single console/diagram rather than six text boxes.

---

## 3. Professionalism and credibility audit

### Verdict: **credible early-stage company, not a student project — but with visible "still-under-construction" tells that cap the ceiling.**

**What creates the *polished / credible* impression:**
- Genuinely consistent, intentional design system (one font, one accent, disciplined spacing, working light/dark theme).
- Sophisticated, specific, non-hype copy that speaks the integrity engineer's language (API 1160, ASME B31.8S, PNGRB T4S, OGMP 2.0, DCVG/CIPS, MAOP/HCA, MIC, BVLOS).
- A real, purpose-built segmented contact system (4 personas, each with tailored fields and response SLAs).
- Comprehensive structured data and a deep, well-organized content library (48 posts, 30+ glossary terms, 20+ FAQs).
- Credibility signals are present and real: Smart India Hackathon 2025 national win, government incubation (AIC RAISE), DPIIT/MSME status — surfaced in the hero strip, About, and Press.

**What creates the *not-yet-real / one-person-project* impression:**
- **No real photography or product screenshots anywhere.** The "product" is shown only as an explicitly-labelled illustrative SVG mock. For a big-O&G buyer, the absence of a real screenshot or a single field photo is the loudest "is this real?" signal.
- **Visibly unfinished pages:** `/case-studies` shows an empty "TEMPLATE SLOT ×4" scaffold and a "Pending field documentation" image placeholder; `/press` shows a dashed "No press coverage yet" box; `/resources/reports` has two items, one "Coming soon." These are honest, but they look like a site mid-build.
- **A repeated early-stage drumbeat:** "pre-pilot," "in active discussions," "no invented case studies," "we don't know yet," and five "In progress" badges on `/research`. Individually fine and admirably honest; collectively they keep telling the visitor the company is very early — which works against the "fund us / adopt us" goal.
- Recognitions shown as text chips rather than official program/award logos (weaker trust signal than the real marks).

**Navigation & footer:** consistent and intentional. Sticky navbar with logo, 6 nav items, theme toggle, and a "Partner with us" CTA; a 4-column footer (Platform/Solutions/Resources/Company) with address and socials. Both look professional.

**Path to next step:** every visitor type has a route — operators and government via hero CTAs and solutions pages; researchers via a solutions page; **investors only via the `/contact` form and footer, with no homepage entry point** (see §4). Every page ends in a `CtaBand` or contact prompt, so a next step is always visible.

**Placeholder text / broken links / unfinished sections:** no lorem ipsum and no broken internal links found. The unfinished-*looking* sections are the intentional-but-visible placeholders noted above (case-studies template slots, press coverage box, reports "Coming soon," case-studies image placeholder). All `SPACE:`/`TODO:` markers in code are comments (not user-visible) except where they drive those visible placeholder states.

**Capitalization / punctuation / formatting consistency:** strong. Headings are consistently sentence-case; eyebrow labels are consistently uppercase-tracked; the site consistently uses spaced hyphens " - " as its dash style and curly apostrophes. One naming inconsistency: the single destination `/research` is labelled **"Approach"** in the nav, **"Our approach"** as the page title, and lives at a **`/research`** URL — three names for one place.

---

## 4. Structural and navigation audit

### Navigation order (as it appears in the header)
1. **Platform** → `/platform`
2. **Solutions** (dropdown) → Pipeline Operators / Government & Agencies / Researchers
3. **Approach** → `/research`
4. **Blog** → `/blog`
5. **About** → `/about`
6. **Contact** → `/contact`
7. *(CTA button)* **Partner with us** → `/contact`

### Footer columns
- **Platform:** Platform overview, Our approach, Case studies
- **Solutions:** Pipeline operators, Government & agencies, Researchers
- **Resources:** Blog, Glossary, FAQ, Reports
- **Company:** About, Press, Contact, Privacy

### Findings
- **Homepage visitor routing is only partial.** The hero offers two CTAs — "For pipeline operators" and "For research & government partners." Researchers and government share one button; **investors have no homepage path at all** and appear only inside the `/contact` form and footer. Given how heavily investor/accelerator inbound is a stated goal, this is a real gap.
- **Thin / placeholder pages that may read as redundant or unfinished:** `/case-studies` (mostly a "how a case study will look" scaffold), `/press` (facts + empty coverage box), `/resources/reports` (two items, one "Coming soon"). None is broken, but all three are understocked relative to the polish of the rest of the site.
- **Missing pages given the stated purpose:**
  - No dedicated **Investors / "Why fund us"** page, despite investors being a named priority (they get a contact form but no narrative destination).
  - No **Team / Company** depth beyond the single founder block on About.
  - No **product tour / demo / screenshot** destination (the closest is the illustrative dashboard mock embedded on home + platform).
  - Pricing is intentionally absent (appropriate).
- **Findability / clicks:** everything important is within one or two clicks. `/case-studies` is only reachable via the footer and cross-links (not in the top nav) — reasonable given its current thinness. `Reports` is buried under Resources (fine).
- **Nav label vs URL vs title mismatch:** "Approach" (nav) / `/research` (URL) / "Our approach — how Sentrix earns trust" (title) — one destination, three names.

---

## 5. Technical / SEO quick check

- **Title tags & meta descriptions:** every one of the 17 route templates supplies a **distinct** title and description via `buildMetadata`; blog posts generate per-post metadata via `generateMetadata`. **No missing or duplicated page-level titles/descriptions found.** (The many `title:` strings in source are card/section data props, not page metadata.)
- **Structured data (JSON-LD):** **present on every page.** Organization + WebSite site-wide (root layout); SoftwareApplication + Service on home and platform; Article + FAQPage on blog posts; FAQPage on all three solutions pages (via `AudienceLayout`); DefinedTermSet on glossary; BreadcrumbList on every inner page; Person (founder) on About. This is a strong, complete implementation.
- **Image alt text:** only two real images exist. The founder photo has descriptive alt text; the logo mark correctly uses empty `alt=""` because it sits beside the "LeakSonic" wordmark and the link has an aria-label (this is the *correct* accessible choice, not a defect). No missing-alt problems — largely because there are almost no images.
- **Performance (from the codebase):**
  - No raw `<img>` tags anywhere; the two real images use `next/image` (AVIF/WebP, 1-year cache configured in `next.config.mjs`).
  - Motion is already optimized via `LazyMotion`/`domAnimation`; the font is a single variable file; all diagrams are inline SVG (no image requests).
  - **Oversized assets:** `favicon.ico` (~170 KB) and `icon.png` (~170 KB) are far larger than icons should be (a few KB is normal); the founder photo `KiruthikProfilePictureSquare.png` is ~338 KB (largish, though `next/image` will resize it). These are the only notable weight offenders.
  - Several always-on SVG animations (the hero `DroneScan` radar sweep, `DashboardPreview` pulses, `ValidationStepper`) run continuously but are lightweight and gated behind `prefers-reduced-motion`.
- **Color-token consistency (technical):** `DashboardPreview` hard-codes a brighter red (`#E5384A`) instead of the brand accent token (`#C41F2B`) — a small inconsistency between the "device" mock and the rest of the site.

---

## 6. Summary and prioritization — top 10 issues (most impactful first)

1. **No real photography or product screenshots anywhere on the site** — the product is shown only as an explicitly "illustrative" SVG mock, and there are zero field/site/team photos. This is the strongest "is this real / is this just one person?" signal for a big-O&G buyer or investor. *Affects: every page; most acutely `/`, `/platform`, `/case-studies`, `/about`, blog.*

2. **Visibly unfinished placeholder pages** — `/case-studies` renders empty "TEMPLATE SLOT ×4" cards and a "Pending field documentation" image placeholder; `/press` shows a dashed "No press coverage yet" box; `/resources/reports` has two items, one "Coming soon." They read as a site still under construction. *Affects: `/case-studies`, `/press`, `/resources/reports`.*

3. **A repeated early-stage drumbeat across the site** — "pre-pilot," "in active discussions," "no invented case studies," "we don't know yet," and five "In progress" badges. Individually honest and admirable; collectively they keep signalling *very early*, which works against the fund-us/adopt-us goal. *Affects: `/`, `/case-studies`, `/press`, `/research`, `/resources/faq`.*

4. **Investor/accelerator path is under-surfaced despite being a stated priority** — there is no homepage CTA and no dedicated investor/"why fund us" page; investors reach the company only through the generic contact form and footer. *Affects: `/` (hero routing), navigation, missing investor page.*

5. **48 blog posts share only four generated cover-art motifs** — the blog index is a wall of near-identical abstract red-on-black tiles, making a genuinely large, diverse content library look repetitive and machine-generated. *Affects: `/blog`, every `/blog/[slug]`.*

6. **The primary "what the product looks like" proof is an acknowledged mock** — `DashboardPreview` is a hand-built SVG captioned "Illustrative," standing in for a real screenshot on both the homepage and platform page. *Affects: `/`, `/platform`.*

7. **Cross-page copy repetition of the same positioning lines** — "the drone is one input, the product is the decision layer," "we integrate rather than replace," "we don't measure wall thickness / sense underground," and the 20/80 "cost is in deciding" reframe recur near-verbatim on 4–6 pages each. *Affects: `/`, `/platform`, `/about`, `/research`, `/resources/faq`, `/solutions/*`.*

8. **Long-form pages and blog posts lack inline visual relief** — the three `/solutions/*` pages are all-text card stacks, and 1,000–1,500-word blog posts contain no inline diagrams/charts even where one would explain faster than the paragraph. *Affects: `/solutions/*`, `/blog/[slug]`, parts of `/platform` and `/about`.*

9. **Credibility signals shown as text chips, not real marks** — Smart India Hackathon, Startup India, MSME, MeitY, and AIC RAISE appear as icon+text chips rather than official logos (a `TODO` in code acknowledges this), weakening an otherwise strong trust section. *Affects: `/press`, `/` hero strip.*

10. **Small polish/consistency tells** — (a) the `DashboardPreview` red (`#E5384A`) differs from the brand accent (`#C41F2B`); (b) one destination is named three ways ("Approach" nav / `/research` URL / "Our approach" title); (c) oversized icon/favicon assets (~170 KB each) and a ~338 KB founder photo. Minor individually, but collectively they are the difference between "polished" and "meticulous." *Affects: `/` + `/platform` (color), navigation + `/research` (naming), global (assets).*

---

*End of audit. No code was modified in producing this report.*
