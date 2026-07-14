# LeakSonic / Sentrix — Website Audit V2 (post-implementation)

**Date:** 2026-07-14
**Scope:** Follow-up to `WEBSITE_AUDIT.md`, after implementing the 10-priority fix pass built from that audit's top-10 findings.
**Method:** Every item below was verified against the actual rendered site (production build + live HTTP smoke tests), not just against a code comment. Nothing is marked resolved unless `curl`-verified in the built output.

---

## What changed, mapped to the original top-10

| # | Original finding | Status | What was actually done |
|---|---|---|---|
| 1 | No real photography/product screenshots anywhere; product shown only via one "illustrative" mock | **Partially resolved** | Cannot fabricate real photography or screenshots that don't exist (see "Genuinely blocked," below) — that constraint is unchanged. What *was* fixed: the illustrative `DashboardPreview` mock is no longer the page's sole visual proof point. A second, distinct mock (`EvidenceTrail`, showing one finding's evidence trail) now sits beside it on `/` and `/platform`, so the "does this product exist" burden is split across two deliberately different, honestly-labelled visuals instead of resting on one. The mock's off-brand red (`#E5384A`) was also fixed to the real accent token (`#C41F2B`). |
| 2 | Visibly unfinished placeholder pages (`/case-studies`, `/press`, `/resources/reports`) | **Resolved** | `/case-studies`: the four empty "TEMPLATE SLOT" cards are deleted; the field-visit write-up is now three labelled insight cards instead of three stacked paragraphs; the "Pending field documentation" image placeholder is removed entirely (verified: `0` occurrences of both strings in rendered HTML). `/press`: the "No press coverage yet" empty box is gone — the section now only renders once a real `COVERAGE` array has entries (verified: `0` occurrences). Recognition chips were deliberately *not* replaced with generated logos — real program marks are trademarked assets we can't recreate or source without permission, so text+icon chips remain, now with an honest in-code rationale instead of a bare TODO. `/resources/reports`: expanded from 2 items (1 locked "Coming soon") to 5, four of them live, real, clickable resources built from existing site content (approach page, glossary, standards brief, the 48-post blog library) — verified in rendered HTML. |
| 3 | Repeated early-stage drumbeat across 4-6 pages; five identical "In progress" badges on `/research` | **Resolved** | `/research`'s five per-claim "In progress" badges are replaced with one summary line ("All five claims below are currently being tested…") — verified `0` remaining per-claim badges in rendered HTML. Homepage's "Where we are" section had its duplicate "no fabricated logos / no invented case studies" sentence removed (that claim already lives as a stat tile in the differentiation section below it) and now links to `/research` instead of restating. |
| 4 | Investors have no homepage entry point or dedicated content | **Resolved** | Hero now includes a visible investor/researcher line with a direct link to `/contact#investor` (verified in rendered HTML). `/about` gained a dedicated "For investors — the case in brief" section (Market / Why defensible / Team / Stage, honestly) — four cards, no invented traction numbers, verified rendering live. |
| 5 | 48 posts share only 4 cover motifs — visual monotony on `/blog` | **Resolved** | Each of the 4 categories now has two structurally distinct compositions (not just re-parameterised color seeds), selected deterministically per slug — 8 effective looks instead of 4. The `/blog` index also now gives the most recent post a larger, horizontal "Latest" featured-card treatment instead of a uniform grid — verified both changes in rendered HTML. |
| 6 | Cross-page repetition of core positioning lines | **Resolved** | The homepage differentiation section's full restatement of the non-goals ("does not measure pipe-wall thickness… does not sense underground…") was cut down to a single sentence pointing to `/research`, which remains the canonical, full statement of those non-goals. |
| 7 | `/solutions/*` all-text; blog posts lack inline visuals; homepage "Why now" is one dense paragraph | **Resolved** | All three `/solutions/*` pages now include the `FlowDiagram` (shared change via `AudienceLayout`) — verified on both `pipeline-operators` and `researchers`. Three new inline SVG diagrams were built and inserted into the three posts the original audit named specifically: a sensitivity-vs-coverage plot in the leak-detection post, a launcher→line→receiver diagram in the pigging post, and a three-layer stack in the drone-market post — all verified rendering live. Homepage "Why now" is now three stat tiles plus a shorter closing sentence, not one three-idea paragraph. |
| 8 | `/research` named three ways ("Approach" nav / `/research` URL / "Our approach" title) | **Resolved** | Nav label, footer label, page `<title>`, and page eyebrow all now say "Approach" consistently. URL kept at `/research` (per the original instruction's own caveat: only change the URL if it doesn't cost existing link/SEO equity — a redirect adds complexity for a naming-only concern, so the URL was left as-is while every visible label was aligned). |
| 9 | Oversized assets; `DashboardPreview` off-brand color | **Resolved** | `DashboardPreview` color token fixed (covered under #1). All five site images were compressed: `favicon.ico` 170KB→7.8KB, `icon.png` 170KB→20KB, founder photo 338KB→33KB (converted PNG→JPEG, code reference updated), `LeakSonicLogo.png` 153KB→22KB, `LeakSonicMark.png` 169KB→20KB. **Total image weight: 1,000KB → 103KB (90% reduction)**, verified via clean rebuild and live HTTP 200s on every asset URL. |
| 10 | Final verification pass | **This document.** | Full production build (74 pages, 0 errors), TypeScript clean, 16 key routes + all new content spot-checked via `curl` against the live rendered HTML, not just against source. |

---

## Genuinely blocked (honest, not glossed over)

Per the instruction not to mark anything resolved unless it's genuinely resolved in the rendered site — these remain open, and here's exactly why:

- **Real product screenshots, field/lab/team photography.** None exist anywhere in this repository, its git history, or any location accessible in this environment. The original prompt's own fallback path for this ("if none exist, pair the mock with a supporting visual instead") is what was implemented (#1 above). Fabricating photos — even labelled "temporary" — was explicitly against this project's standing rule against invented evidence, established over many prior turns on this exact site. This is the single highest-remaining-impact item and requires the user to supply real assets; no further code change can substitute for them.
- **Real official program logos** (Smart India Hackathon, Startup India, MSME, MeitY, AIC RAISE). These are third-party trademarked marks. Recreating them without the issuing program's actual asset file would be both inaccurate and a trademark risk — worse than the current honest text-chip treatment. Sourcing them requires the user to obtain the real files from each program's official channel.
- **A published Sentrix whitepaper PDF.** Still explicitly marked "In preparation" on `/resources/reports` — this is real written content that doesn't exist yet, not a placeholder problem.
- **Git commit of these changes.** All work above is complete in the working tree and build-verified, but per this project's standing practice, changes are not committed to git without an explicit user request to do so.

---

## What a fresh six-category pass shows now

**1. Visual design** — The homepage and platform pages now carry two distinct product-adjacent visuals instead of one; blog covers have doubled compositional variety; solutions pages and three flagship blog posts gained diagrams. The core limitation from V1 (no real photography) is unchanged and can only be resolved with real assets from the user.

**2. Copy density** — Homepage "Why now" is now scannable stat tiles instead of a single paragraph; the most-repeated non-goals statement now has one canonical home (`/research`) instead of two full restatements.

**3. Professionalism/credibility** — The three pages that most visibly signalled "under construction" (`/case-studies`, `/press`, `/resources/reports`) now read as complete, populated pages. The early-stage messaging is still present (correctly — it's honest and load-bearing) but no longer echoed via five duplicate badges in one place.

**4. Structure/navigation** — Investors now have a real, visible path from the homepage and a dedicated content section, closing the gap flagged in V1. The `/research` naming inconsistency is resolved.

**5. Technical/SEO** — No regressions: build is clean, all metadata/schema untouched and intact, total image payload cut by 90%.

**6. Updated top open items**, most impactful first:
1. Real photography/screenshots — blocked on the user supplying assets (see above).
2. Real official program logos — blocked on the user sourcing them.
3. The Sentrix whitepaper is still "in preparation," not published.
4. Everything else from the original top-10 is resolved as described in the table above.

---

*End of V2 audit. All "Resolved" markings above were verified against a clean production build and live HTTP responses, not against code comments alone.*
