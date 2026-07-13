# LeakSonic — Sentrix website

Marketing and content website for **LeakSonic Private Limited**, a government-incubated,
DPIIT-recognised, MSME-registered deep-tech startup building **Sentrix**, an engineering decision
intelligence platform for pipeline inspection.

> Sentrix reduces the engineering effort required to validate, compare, prioritise, and report
> pipeline inspection findings — turning raw drone evidence into standardised, decision-ready
> engineering intelligence inside the workflows operators already use. The drone is one input; the
> product is the decision layer.

Built with Next.js 14 (App Router), TypeScript (strict), Tailwind CSS, Framer Motion (via
`LazyMotion`), and a hand-rolled MDX content system. Dark-theme-only, enterprise-credible, no
gradient-mesh tells, and no technical/mechanism disclosure on public pages by design.

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (also runs next-sitemap via postbuild)
npm run start      # serve the production build
npm run lint       # ESLint
npm run format     # Prettier write
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` for correct canonical/OG/sitemap
URLs.

---

## Project structure

```
app/
  layout.tsx                 Root layout: font, Navbar, Footer, sitewide JSON-LD, skip link
  page.tsx                   Homepage
  platform/                  The Sentrix platform - solution page, single flow diagram
  research/                  "Our approach" - how Sentrix earns trust, no mechanism detail
  case-studies/               Honest, current-stage field engagement
  solutions/*/                Three audience pages (shared AudienceLayout)
  blog/ blog/[slug]/          Blog index (filterable) + MDX post template
  resources/*/                glossary · faq · reports
  about/ press/                Company pages
  contact/                    Four segmented forms
  privacy/ terms/              Legal pages
  api/contact/*/route.ts       One serverless route per contact segment
  api/og/route.tsx             Dynamic branded OG image (per-page title)
  not-found.tsx                404

components/
  layout/                    Navbar, Footer, Logo, SocialLinks
  sections/                  Page section blocks (Hero, CtaBand, AudienceLayout, LegalLayout)
  diagrams/                  Hand-coded SVG/HTML diagrams - outcome-level only, no architecture
  ui/                        Restyled primitives (Button, Card, Accordion, Field, …)
  blog/                      Blog-specific components
  contact/                   Reusable segmented ContactForm
  MotionProvider.tsx          LazyMotion wrapper (domAnimation feature set only)
  JsonLd.tsx                  Renders JSON-LD script tags

content/blog/*.mdx           Blog posts (frontmatter + MDX body) - 39 and growing

lib/
  site.ts                    Brand, contact, nav, footer, standards, contact-segment config
  metadata.ts                buildMetadata() — per-route title/description/OG
  schema.ts                  JSON-LD builders (Organization, Service, Person, Article, FAQPage, …)
  blog.ts / blog-meta.ts     MDX loader (server) / client-safe types & constants
  glossary.ts faq.ts         Structured content data
  contact-schemas.ts         Zod schemas shared by client forms and API routes
  content.ts                 The three value pillars (home + platform)
```

**Client/server split note:** `lib/blog.ts` uses the Node filesystem and must only be imported by
server components. Client components import types and constants from `lib/blog-meta.ts` instead.

---

## Adding a new blog post

1. Create `content/blog/your-slug.mdx`.
2. Add frontmatter:

   ```yaml
   ---
   title: 'Your headline as a question or claim'
   date: '2026-07-01'
   lastUpdated: '2026-07-01'
   author: 'LeakSonic Research'
   category: 'fundamentals' # fundamentals | india | technical
   summary: 'A complete, direct answer to the headline in ~1–2 sentences. This is shown as the answer-first opener and used as the meta description.'
   tags: ['tag-one', 'tag-two']
   faqs:
     - question: 'A question this post raises?'
       answer: 'A complete, self-contained answer.'
   ---
   ```

   Frontmatter is parsed as YAML — if any string contains an apostrophe, escape it by doubling the
   quote (`don''t`), not with a backslash (`don\'t` is invalid YAML and will break the build).

3. Write the body in MDX. Open with a direct answer in the first ~150 words, use question-phrased
   `##` subheadings, and weave in cited context as complete passages.

The post is statically generated, appears in the index and category filter automatically, and its
`Article` + `FAQPage` JSON-LD is emitted automatically. No registry to update — except
`public/llms.txt` (see below).

---

## What must never appear on the public site

This site deliberately does not disclose Sentrix's technical mechanism, to avoid handing
competitors a blueprint. Before adding content, avoid:

- Sensor specifications, data-source names, accuracy/positioning numbers, or architecture diagrams
  beyond the single plain-language flow diagram on `/platform`.
- Named competitors, anywhere, in any direction.
- Fabricated PSU partnerships, pilot customers, or funding relationships — if it isn't real and
  announced, don't imply it. Content about the broader ecosystem (grant schemes, industry
  standards, global operators' public commitments) is fine and encouraged; claiming a specific
  relationship that doesn't exist is not.
- Pricing, unit economics, or specific unvalidated performance claims.

See `/research` ("Our approach") for how the site handles validation claims honestly instead.

---

## Regenerating the sitemap & llms.txt after adding content

- **Sitemap + robots.txt** are generated automatically by `next-sitemap` on `npm run build`
  (the `postbuild` script). No manual step. Config: `next-sitemap.config.js` — includes explicit
  `allow` rules for major AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.) for
  GEO/AEO discoverability.
- **`public/llms.txt`** is maintained by hand. When you add a high-authority page or a strong blog
  post, add it to the relevant section so AI answer engines can find and cite it.

---

## Contact form integration (TODO)

The four `/api/contact/*` routes validate submissions with Zod and currently **log them
server-side only** — nothing is emailed or persisted. To wire real delivery, implement `deliver()`
in `app/api/contact/_lib.ts` against your provider (e.g. Resend, SES, or a CRM webhook) using the
`CONTACT_*` env vars documented in `.env.example`. A honeypot field guards against basic spam.

---

## Design system

- **Color:** near-black base (`#0A0A0B`), controlled deep red accent used sparingly, off-white
  text. Tokens live in `tailwind.config.ts`. Dark theme only.
- **Type:** Figtree only, loaded as a single variable-weight font file via `next/font/google`
  (not per-weight static files) — see `app/fonts.ts`.
- **Motion:** `framer-motion` via `LazyMotion`/`domAnimation` (`components/MotionProvider.tsx`) —
  every animated component uses `m.*`, not `motion.*`, to keep the shared bundle small. Restrained
  fade-up on scroll (`Reveal`), one-time SVG draw-in on diagrams, ~150ms micro-interactions.
  Respects `prefers-reduced-motion`.
- **SEO/GEO/AEO:** per-route metadata, Organization/Service/Person/Article/FAQPage/BreadcrumbList/
  SoftwareApplication JSON-LD, `llms.txt`, semantic HTML, dynamic OG images, speakable markup on
  FAQ content.

## Deployment

Vercel-compatible and static-first. `npm run build` prerenders every content route; the OG image
and contact API routes run server-side on demand.
