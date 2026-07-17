# YetImages — Image Generation Brief for LeakSonic / Sentrix

This is a self-contained brief for generating real, photographic imagery for the site.
Generate these externally, drop the finished files into `/public/images/generated/`
using the **exact filenames** below, and hand them back — the filenames are what let
the actual integration pass map each image to the right component without back-and-forth.

Scope for this round: **homepage, platform, tools hub, solutions pages, about, and
approach** — the blog is deliberately out of scope for now (it's a much larger,
separate batch).

---

## 0. Read this first — house style, applies to every single image below

The brand is black/red/white, dark-mode-first, restrained, and precise — think
enterprise industrial photography (Bloomberg Businessweek energy features, Vercel/
Stripe/Linear marketing photography), **not** generic startup stock photography.
Every prompt below should be generated with these constraints layered on top of the
specific brief:

- **Photographic, not illustrated.** Real-camera look: natural depth of field, real
  lens characteristics (slight vignette, realistic grain), not a 3D render, not a
  digital painting, not a "flat vector illustration" style. If the generator has a
  photorealism/cinematic mode, use it.
- **Color grade:** near-black backgrounds and shadows, desaturated overall palette,
  with warm red/amber accent light sources (hazard lighting, sunset/dusk, warning
  beacons, screen glow) doing the work color usually would. Avoid the blue-heavy
  "corporate tech" color grade almost every AI image generator defaults to — that
  reads as generic SaaS, not this brand. Avoid bright, evenly-lit daylight scenes;
  everything should feel like it's shot at dusk, dawn, indoors under practical
  lighting, or overcast.
- **No text, no logos, no UI screenshots inside the image itself.** Any generator
  attempting to render readable text, dashboards, or logos inside a photo will
  produce garbled, fake-looking text — treat that as an automatic reject. Screens
  visible in a shot should show soft, out-of-focus, abstract glow/light, not
  legible content.
- **No recognizable faces as the subject.** Where a person appears, keep them
  midground/background, partially turned away, in silhouette, or cropped so the
  image reads as "an engineer" generically — not a posed headshot. We already have
  a real founder photo elsewhere; these should never try to depict a specific,
  identifiable individual as if they were that founder or a named employee.
  Anonymous, plausible, working professionals only.
- **Technical accuracy matters.** Drones should look like real, plausible
  industrial multirotor inspection drones (quadcopter or hexacopter, visible
  camera/sensor gimbal underneath, matte black or white-and-black body) — not a
  sci-fi concept drone, not a toy, not a fixed-wing military aircraft. Pipelines,
  refinery vessels, fired heaters, and control rooms should look like real oil &
  gas / gas distribution infrastructure, not a generic "factory."
- **No overclaiming in the imagery.** Nothing that implies a specific real company,
  a specific named country's military, or a certification/deployment we haven't
  actually got. Generic, plausible, unbranded industrial settings only.
- **Aspect ratios and resolution are given per image below** — generate at 2x the
  listed display size (already reflected in the "Generate at" dimensions) so images
  stay sharp on retina displays, then I'll handle any further compression.
- **Format:** export as `.jpg` (quality ~85, good for photographic content) unless
  otherwise noted. Keep file sizes reasonable — under ~500KB each after export if
  your tool supports quality/compression control.

---

## 1. Homepage (`app/page.tsx`, `components/sections/Hero.tsx`)

### 1.1 `hero-drone-pipeline-corridor.jpg`
- **Placement:** Hero section, right column — either replaces or sits behind/beside
  the existing `DroneScan` SVG panel as a full-bleed or panel-framed photographic
  moment (final integration TBD once the image exists).
- **Display size:** ~800×900px panel (portrait-leaning) · **Generate at:** 1600×1800px
- **Prompt:** A professional quadcopter drone in flight, mid-frame, hovering low
  over a straight gas pipeline right-of-way corridor that cuts through a
  semi-rural landscape — visible mown/cleared strip of land with the buried
  pipeline route marked by occasional yellow marker posts, sparse vegetation on
  either side. Time of day: dusk, sun just below the horizon, deep blue-black sky
  fading to a thin band of warm amber/red at the horizon line. The drone's
  downward-facing sensor/camera gimbal is visible underneath it, catching a
  glint of warm light. Camera angle: three-quarter view from slightly below and
  to the side of the drone, long lens compression (the corridor recedes into soft
  focus in the background), shallow depth of field with the drone in sharp focus.
  Cinematic industrial photography, moody, high contrast between the dark
  landscape and the drone silhouette, single warm rim-light on the drone from the
  horizon glow. No visible people, no text, no logos, no readable markings on the
  drone body.

### 1.2 `manual-inspector-fieldwork.jpg`
- **Placement:** "Before and after" section (`app/page.tsx`, the "Today, by hand"
  card) — small supporting image above or beside the bullet list.
- **Display size:** ~640×480px · **Generate at:** 1280×960px
- **Prompt:** A lone technician in standard hi-vis safety gear and a hard hat,
  seen from behind or in three-quarter silhouette, walking along an exposed
  pipeline right-of-way carrying a handheld gas-detection instrument at waist
  height, a thin cable or strap visible. Overcast midday light, flat and slightly
  desaturated — deliberately less cinematic and less warm than the drone imagery,
  to visually reinforce "the old, unglamorous way." Wide, empty landscape
  stretching ahead of them emphasizing distance and scale — the sense of a long
  walk still ahead. No visible face. No text, no logos, no company branding on
  the safety gear.

### 1.3 `drone-inspection-in-flight.jpg`
- **Placement:** "Before and after" section, the "With Sentrix" card — paired
  directly against 1.2 as the visual contrast.
- **Display size:** ~640×480px · **Generate at:** 1280×960px
- **Prompt:** The same style of pipeline right-of-way as 1.2, but now shown with
  a small inspection drone in active flight low over the corridor, motion-blur
  on the rotors suggesting speed, a thin visible downward sensor beam or glow
  under the aircraft. Golden-hour lighting this time — warm, directional, slight
  lens flare from a low sun — a deliberate tonal contrast against the flat grey
  light of 1.2. Same landscape type for visual continuity between the pair. No
  visible people, no text, no logos.

### 1.4 `capabilities-banner.jpg`
- **Placement:** "Three outcomes, not fifty features" section — a wide banner
  image above or behind the three capability cards.
- **Display size:** ~1600×500px (wide banner) · **Generate at:** 3200×1000px
- **Prompt:** Close, shallow-depth-of-field shot of an engineer's hands (only
  hands and forearms visible, no face) working at a desk with two monitors
  showing soft, abstract, out-of-focus glows of charts and imagery (content
  intentionally illegible/blurred, not meant to be read). A tablet or printed
  inspection report with a visible but illegible red-highlighted marking sits
  beside the keyboard. Dark, moody indoor lighting, single warm desk-lamp light
  source, black background falling into shadow at the edges of frame. Extremely
  shallow depth of field — the hands and nearest screen edge sharp, everything
  else soft. No readable text anywhere in frame.

### 1.5 `why-now-cgd-corridor.jpg`
- **Placement:** "Why now" section — background treatment or side image next to
  the stat tiles.
- **Display size:** ~1200×700px · **Generate at:** 2400×1400px
- **Prompt:** An elevated (drone-height, not satellite-height) view looking down
  at a moderate angle over a small Indian city's outskirts where a visible gas
  distribution pipeline right-of-way corridor runs alongside residential streets
  and low-rise buildings — rooftops, water tanks, narrow roads, a few visible
  vehicles, all at a scale where individual people are not distinguishable. Dusk
  lighting, streetlights and windows beginning to glow warm amber against a
  darkening blue-grey sky. Realistic aerial drone photography look — real lens
  distortion consistent with a wide-angle drone camera, not a satellite map
  image. No text, no legible signage, no real identifiable landmarks or city
  skylines.

### 1.6 `footer-cta-industrial-dusk.jpg`
- **Placement:** Final CTA band before the footer — full-bleed background image
  behind the "Talk to us" card.
- **Display size:** ~1920×600px (wide, will sit behind a dark overlay + text) ·
  **Generate at:** 3840×1200px
- **Prompt:** A wide, low-angle shot of industrial refinery/pipeline
  infrastructure silhouetted against a dramatic dusk sky — vertical pipe racks,
  a distant flare stack with a small controlled flame, storage tank domes — shot
  from far enough away that it reads as atmosphere and texture, not a specific
  identifiable facility. Very high contrast, mostly black silhouette with a
  narrow band of deep red-orange sky at the horizon. This image needs to work
  as a **background behind dark text overlay**, so keep the upper two-thirds of
  the frame darker and less busy, with the more detailed silhouette concentrated
  in the lower third. No text, no logos, no visible company signage.

---

## 2. Platform page (`app/platform/page.tsx`)

### 2.1 `platform-hero-control-room.jpg`
- **Placement:** Platform page hero, as a side or background image.
- **Display size:** ~900×700px · **Generate at:** 1800×1400px
- **Prompt:** Interior shot of a dim, modern industrial control-room or
  operations desk at night — a single engineer, seen from behind or in
  silhouette at a wide multi-monitor desk setup, screens glowing with soft,
  abstract, illegible blue-white and red light against an otherwise dark room.
  One monitor shows a soft red-highlighted region suggesting a flagged finding,
  intentionally out of focus/illegible. Moody, cinematic, shallow depth of
  field on the nearest screen glow. No readable text or UI, no visible face.

### 2.2 `ai-software-core.jpg`
- **Placement:** "What we actually build" section, the "AI & software" card.
- **Display size:** ~640×480px · **Generate at:** 1280×960px
- **Prompt:** Extreme close-up, macro-style shot of a laptop keyboard and the
  edge of a screen at night, screen glow lighting the keys from below/behind —
  soft, abstract red and white light bleeding across the frame, completely
  illegible content on screen (treat any visible screen area as pure light and
  color, not content). Shallow depth of field, almost abstract. This should
  read as "software, computation, focus" without literally showing any UI.

### 2.3 `drone-hardware-workshop.jpg`
- **Placement:** "What we actually build" section, the "Hardware" card.
- **Display size:** ~640×480px · **Generate at:** 1280×960px
- **Prompt:** Close, workbench-level shot of a partially disassembled
  quadcopter drone frame on a workshop table, one arm/rotor assembly detached
  and lying beside it, small tools (hex driver, tweezers) nearby, a single
  warm overhead work-lamp providing hard directional light against a dark
  background. Hands may be partially visible working on the frame but no face,
  no visible skin detail close enough to be identifying. Gritty, real,
  workshop-photography feel — not a clean product-photography shot. No text,
  no visible brand markings on tools or drone parts.

### 2.4 `standards-governance-blueprint.jpg`
- **Placement:** "Standards & governance" section banner.
- **Display size:** ~1600×450px (wide banner) · **Generate at:** 3200×900px
- **Prompt:** Overhead flat-lay shot of a printed pipeline engineering
  schematic/blueprint-style drawing on a dark desk surface, partially
  overlapped by a red pen, a ruler, and reading glasses, warm single-source
  desk lighting from one side casting soft shadows. The drawing should show
  generic, plausible pipeline-and-valve schematic linework and NOT attempt to
  render specific readable technical labels, numbers, or standard codes (any
  attempted text will look fake) — treat the drawing's line-work as abstract
  technical texture, not literal content. Moody, desaturated, dark.

### 2.5 `deliverables-report-desk.jpg`
- **Placement:** "What you get" / six-deliverables section banner.
- **Display size:** ~1200×500px · **Generate at:** 2400×1000px
- **Prompt:** A tablet on a desk displaying a soft, abstract, illegible glow
  suggesting a ranked list/report interface (out of focus, not literal UI),
  next to a closed laptop and a cup of coffee, dark moody indoor lighting,
  single warm light source from upper-left, shallow depth of field with the
  tablet's glow as the brightest point in frame. No readable text anywhere.

### 2.6 `rbi-evidence-review.jpg`
- **Placement:** "From evidence to your RBI programme" section (the new
  standards-bridge section).
- **Display size:** ~900×600px · **Generate at:** 1800×1200px
- **Prompt:** Two engineers (both partially turned away or in soft-focus
  background, not posed toward camera) standing at a large wall-mounted screen
  in a dim room, the screen showing an abstract, illegible soft-glow
  visualization suggestive of a risk map or ranked list (no literal readable
  content), one person gesturing toward a highlighted red region on the
  screen. Cinematic, dark, single light source from the screen itself
  illuminating the two figures from the front. No readable text or numbers on
  the screen.

---

## 3. Tools hub (`app/tools/page.tsx`)

### 3.1 `tools-hub-hero.jpg`
- **Placement:** Tools page hero banner.
- **Display size:** ~1400×500px (wide) · **Generate at:** 2800×1000px
- **Prompt:** A clean, dark desk-top flat-lay: a laptop showing soft abstract
  illegible chart-like glow, a scientific calculator, a notebook with
  handwritten (illegible, abstract scribble-style, not attempted real text)
  sketches and a small hand-drawn diagram, a pen, all lit by a single warm
  desk lamp against near-black surroundings. Should feel like "engineering
  calculation happening," precise and a little analog despite the laptop.
  Shallow depth of field. No readable text anywhere in frame, no UI content
  legible on the laptop screen.

### 3.2 `tools-drone-mission-planning.jpg`
- **Placement:** Optional secondary image, Mission Coverage & Flight Time
  Planner tool page hero.
- **Display size:** ~900×500px · **Generate at:** 1800×1000px
- **Prompt:** Overhead flat-lay of a printed aerial/satellite-style map (
  abstract, generic terrain patterns, no readable place names or labels) with
  a drawn illustrative flight-path line across it in red marker, a small
  drone model or drone remote controller resting on top of the map, warm
  single-source lighting, dark surrounding desk. No readable text or labels
  on the map.

---

## 4. Solutions pages

### 4.1 `pipeline-operators-hero.jpg`
- **Placement:** `/solutions/pipeline-operators` hero.
- **Display size:** ~1200×700px · **Generate at:** 2400×1400px
- **Prompt:** Elevated wide shot of a long, straight gas transmission pipeline
  right-of-way corridor cutting through open agricultural/semi-rural terrain,
  receding to the horizon under a heavy, moody overcast sky with a break of
  warm light on the horizon line. Realistic drone-height aerial photography
  perspective, natural lens characteristics. No people, no text, no
  identifiable landmarks.

### 4.2 `refinery-operators-hero.jpg`
- **Placement:** `/solutions/refinery-operators` hero.
- **Display size:** ~1200×700px · **Generate at:** 2400×1400px
- **Prompt:** Wide shot of a refinery's static equipment cluster at dusk —
  a fired heater stack, a cluster of vertical pressure vessels, and elevated
  interconnecting pipe racks, silhouetted against a deep blue-to-amber dusk
  sky, a few practical warning/beacon lights glowing warm red-amber on
  equipment. Shot from a moderate distance (not extreme close-up), industrial
  photography feel, generic/unbranded facility. No visible scaffolding rope-
  access workers up close (keep any human presence tiny and distant if present
  at all). No text, no company signage or logos.

---

## 5. About page (`app/about/page.tsx`)

### 5.1 `about-incubation-facility.jpg`
- **Placement:** "Where we are now" or founder section, supporting image.
- **Display size:** ~900×600px · **Generate at:** 1800×1200px
- **Prompt:** Interior of a modern, modest Indian startup incubator workspace
  at dusk/evening — a few desks with laptops (screens showing soft illegible
  glow only), a whiteboard with abstract illustrative sketch-diagrams (not
  attempted readable text), warm practical lighting (desk lamps, string
  lights, or warm overhead fixtures) against large windows showing a
  darkening sky outside. Should feel authentic and lived-in, not a polished
  corporate stock-photo office. No visible people's faces, no readable text
  on the whiteboard, no real institution signage.

### 5.2 `about-field-testing.jpg`
- **Placement:** Founder section or "Why this company" supporting image.
- **Display size:** ~900×600px · **Generate at:** 1800×1200px
- **Prompt:** A person crouched beside a small inspection drone resting on
  the ground near a visible pipeline marker post, mid-preparation for a test
  flight, seen from behind or the side (no visible face), open rural terrain
  around them, overcast late-afternoon light. Should read as genuine field
  testing, slightly rough/unpolished, not a staged product shot. No text, no
  branding.

---

## 6. Approach / Research page (`app/research/page.tsx`)

### 6.1 `approach-validation-session.jpg`
- **Placement:** Hero or "How we work" section supporting image.
- **Display size:** ~900×600px · **Generate at:** 1800×1200px
- **Prompt:** Two or three people around a table reviewing printed pages and
  a laptop together, mid-discussion, seen from a angle that keeps faces
  turned away or softly out of focus, one hand pointing at a specific spot on
  a printed page. Warm, focused, single-source lighting (desk lamp or pendant
  light over the table), dark room falling away around them. Genuine working-
  session feel, not a posed "team meeting" stock photo. No readable text on
  any papers or screens.

---

## 7. Dual-use / defence page (`app/solutions/defense-dual-use/page.tsx`)

### 7.1 `dual-use-abstract-systems.jpg`
- **Placement:** Hero or context section, used sparingly and tastefully given
  this page is explicitly about a long-term, exploratory direction, not a
  current capability.
- **Display size:** ~900×600px · **Generate at:** 1800×1200px
- **Prompt:** Deliberately abstract and non-specific: a dark, minimal shot of
  a single autonomous ground-control or telemetry-style display panel glowing
  with soft abstract light patterns (radar-sweep-like or waveform-like
  abstractions, not literal military iconography, no weapons, no uniforms, no
  flags, no specific national insignia), in an otherwise empty dark room.
  Should read as "advanced autonomous systems, generically" rather than
  anything defence-specific or geopolitically charged. No text, no
  insignia, no recognizable symbols of any kind.

---

## Summary table

| # | Filename | Page / component | Generate at (px) |
|---|---|---|---|
| 1.1 | `hero-drone-pipeline-corridor.jpg` | Homepage hero | 1600×1800 |
| 1.2 | `manual-inspector-fieldwork.jpg` | Homepage before/after | 1280×960 |
| 1.3 | `drone-inspection-in-flight.jpg` | Homepage before/after | 1280×960 |
| 1.4 | `capabilities-banner.jpg` | Homepage capabilities | 3200×1000 |
| 1.5 | `why-now-cgd-corridor.jpg` | Homepage why-now | 2400×1400 |
| 1.6 | `footer-cta-industrial-dusk.jpg` | Homepage footer CTA | 3840×1200 |
| 2.1 | `platform-hero-control-room.jpg` | Platform hero | 1800×1400 |
| 2.2 | `ai-software-core.jpg` | Platform AI/software card | 1280×960 |
| 2.3 | `drone-hardware-workshop.jpg` | Platform hardware card | 1280×960 |
| 2.4 | `standards-governance-blueprint.jpg` | Platform standards section | 3200×900 |
| 2.5 | `deliverables-report-desk.jpg` | Platform deliverables | 2400×1000 |
| 2.6 | `rbi-evidence-review.jpg` | Platform RBI-bridge section | 1800×1200 |
| 3.1 | `tools-hub-hero.jpg` | Tools hub hero | 2800×1000 |
| 3.2 | `tools-drone-mission-planning.jpg` | Mission planner tool | 1800×1000 |
| 4.1 | `pipeline-operators-hero.jpg` | Pipeline operators hero | 2400×1400 |
| 4.2 | `refinery-operators-hero.jpg` | Refinery operators hero | 2400×1400 |
| 5.1 | `about-incubation-facility.jpg` | About page | 1800×1200 |
| 5.2 | `about-field-testing.jpg` | About page founder section | 1800×1200 |
| 6.1 | `approach-validation-session.jpg` | Approach page | 1800×1200 |
| 7.1 | `dual-use-abstract-systems.jpg` | Defence/dual-use page | 1800×1200 |

**20 images total.** Drop finished files into `/public/images/generated/` with these
exact filenames and hand them back — I'll wire each one into its component (including
adding an optional `image` slot to the shared `PageHero` component where several of
these are hero images) and adjust surrounding layout/spacing once real imagery is in
place, since several of the "too much empty space" sections above are exactly the
ones this batch is meant to fill.
