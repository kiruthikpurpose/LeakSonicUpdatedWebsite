# Image generation manifest

This environment has no image-generation tool available to me (confirmed by
searching the full tool list, not an assumption) - Steps below are ready for
you to run through Gemini/Nano Banana (or any generator you have access to)
and drop the files straight into the paths listed. No code changes needed
after that for most slots - just save the file at the exact path and, for the
two marked ⚙️, swap one placeholder component for `next/image`.

**Style brief for every prompt below** (prepend if your tool supports a
system/style prefix): *"Photorealistic, documentary/editorial tone, moody and
dark, muted colour grading limited to near-black, white/off-white, and a
single deep red accent (#C41F2B) - no other saturated colours. No text, no
logos, no illustration/cartoon style. 16:9 unless noted."*

---

## 1. Homepage hero background
- **Path:** `public/images/hero-corridor.jpg`
- **Prompt:** "Aerial photograph of a gas pipeline right-of-way corridor cutting through industrial/rural terrain at dusk, shot from a drone at altitude, long shadows, overcast muted lighting, documentary tone. Photorealistic, no people, no text."
- **Wire-up (⚙️):** in `components/sections/Hero.tsx`, add `<Image src="/images/hero-corridor.jpg" fill className="object-cover opacity-30" />` inside the existing absolutely-positioned background `<div>` (the one with the radial-gradient style), behind the grid overlay so text contrast is preserved.

## 2. /platform hero background
- **Path:** `public/images/platform-corridor.jpg`
- **Prompt:** "Ground-level photograph of industrial gas pipeline infrastructure - exposed steel pipe, valve station, or above-ground crossing - at dawn, photorealistic, documentary/editorial tone, muted dark palette."

## 3. /technology - drone in flight
- **Path:** `public/images/drone-flight.jpg`
- **Prompt:** "A quadcopter drone in flight over rural/industrial terrain, photographed from a distance so it reads as real aerial photography, small in frame against a wide landscape, photorealistic, not illustrative or cartoonish, overcast lighting."

## 4. /technology - sensor/payload hardware close-up
- **Path:** `public/images/sensor-hardware.jpg`
- **Prompt:** "Editorial product photograph of a small thermal camera and gas sensor housing mounted on a drone gimbal, close-up macro shot, clean dark studio background, single soft key light, photorealistic."
- **Note:** this can sit alongside the existing `SensorPayload` SVG diagram on `/technology` rather than replacing it - the diagram explains the architecture, a photo would show the real hardware.

## 5. /technology - satellite/orbital imagery
- **Path:** `public/images/satellite-corridor.jpg`
- **Prompt:** "Satellite imagery style photograph of terrain from directly above, showing a visible linear right-of-way corridor cutting through fields or industrial land, muted natural colours desaturated toward the site's dark palette, photorealistic."

## 6. Blog post covers (11 posts, 1200x675 / 16:9)
Currently each post uses the hand-built `BlogCover` SVG component (category-based
motif + atmosphere layer) - real per-post photography would be a strict upgrade.
One prompt per post, same file-naming pattern as the old site:

| Slug | Path | Prompt subject |
|---|---|---|
| `what-is-pipeline-integrity-management` | `public/images/blog/what-is-pipeline-integrity-management.jpg` | Wide shot of a pipeline right-of-way marker post in open terrain |
| `tdlas-vs-thermal-vs-satellite-methane-detection` | `.../tdlas-vs-thermal-vs-satellite-methane-detection.jpg` | Close-up of a handheld gas-detection sensor in use in the field |
| `india-cgd-expansion-pipeline-inspection-demand` | `.../india-cgd-expansion-pipeline-inspection-demand.jpg` | Urban gas distribution pipeline construction trench, city backdrop |
| `bvlos-drone-regulation-india` | `.../bvlos-drone-regulation-india.jpg` | Drone pilot operating a ground control station outdoors |
| `why-naive-sensor-fusion-fails` | `.../why-naive-sensor-fusion-fails.jpg` | Abstract dark photo of multiple overlapping data-readout screens |
| `vegetation-stress-pipeline-leak-indicator` | `.../vegetation-stress-pipeline-leak-indicator.jpg` | Aerial shot of a vegetation line/right-of-way with a visible stress patch |
| `cathodic-protection-explained` | `.../cathodic-protection-explained.jpg` | Cathodic-protection test post/rectifier cabinet beside a pipeline |
| `risk-based-inspection-pipelines` | `.../risk-based-inspection-pipelines.jpg` | Engineer reviewing inspection plans on a tablet in the field |
| `methane-regulation-global-comparison` | `.../methane-regulation-global-comparison.jpg` | Industrial gas facility flare stack at dusk |
| `rtk-gps-change-detection-explained` | `.../rtk-gps-change-detection-explained.jpg` | RTK GPS base-station antenna on a tripod in a field |
| `false-positive-rate-inspection-software` | `.../false-positive-rate-inspection-software.jpg` | Close-up of an integrity engineer's hands on a laptop reviewing data |

**Wire-up (⚙️):** add `image: '/images/blog/<slug>.jpg'` to each post's MDX
frontmatter (the field already exists in `BlogFrontmatter`, just unused),
then update `components/blog/BlogCard.tsx` and `app/blog/[slug]/page.tsx` to
render `<Image src={post.image} .../>` when `post.image` is set, falling back
to `<BlogCover>` when it isn't - so posts upgrade one at a time as images land.

## 7. Real photography (not generatable - flagged, not faked)
- `public/images/field/` - actual pipeline construction-site visit photos (referenced in `/case-studies`)
- Founder photo - already done (`public/KiruthikProfilePictureSquare.png`)
- Team/office photos - do not generate fake versions of these; wait for real photos

---

### If you regain image-gen access
Say so and share 2-3 generated files - I'll wire the `⚙️` code changes above
(Hero background layer, blog frontmatter + card/post fallback logic) in one
pass so every future image just needs to land at the right path.
