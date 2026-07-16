import type { Metadata } from 'next';
import {
  MapPinned,
  Cable,
  Users,
  CalendarClock,
  History,
  FlaskConical,
  Eye,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Card } from '@/components/ui/Card';
import { CtaBand } from '@/components/sections/CtaBand';
import JsonLd from '@/components/JsonLd';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumbSchema, toolSchema } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({
  title: 'Meridian GCS - a ground control station we are building',
  description:
    'Meridian GCS is the ground-control station software LeakSonic is developing in-house: automatic P&ID/CSV/DXF-to-waypoint conversion, direct companion-computer control, collaborative mission editing, cloud version control, and a scriptable mission simulator - in active development, not yet released.',
  path: '/solutions/meridian-gcs',
  keywords: [
    'ground control station software',
    'drone mission planning software',
    'waypoint generation from CAD',
    'companion computer control GCS',
    'collaborative drone mission planning',
    'drone mission simulator',
  ],
});

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Solutions', path: '/solutions/pipeline-operators' },
  { name: 'Meridian GCS', path: '/solutions/meridian-gcs' },
];

type Feature = { icon: LucideIcon; title: string; body: string };

const FEATURES: Feature[] = [
  {
    icon: MapPinned,
    title: 'CAD-to-waypoint conversion',
    body: 'Import a P&ID, a CSV of asset coordinates, or a DXF site drawing and generate a waypoint mission on the map directly - designed to remove the manual, click-by-click waypoint building most ground-control tools still require.',
  },
  {
    icon: Cable,
    title: 'Direct companion-computer control',
    body: 'Control and monitor a companion computer from inside the GCS itself, without a second laptop or a separate connection just to check on it - one interface for the aircraft and the compute running on it.',
  },
  {
    icon: Eye,
    title: 'Built for clarity, not clutter',
    body: 'A visually clean interface designed around what a pilot or mission planner actually needs to see and do in the moment - accessibility and legibility as design requirements, not an afterthought.',
  },
  {
    icon: Users,
    title: 'Collaborative mission editing',
    body: 'More than one person can work on a mission plan together, so planning a complex survey does not have to be a single person\'s solo task passed around as files.',
  },
  {
    icon: CalendarClock,
    title: 'Mission scheduling & docking integration',
    body: 'Schedule recurring missions and connect them to docking-station operations, aimed at the repeat-cycle inspection work that makes up most of an integrity programme\'s flying.',
  },
  {
    icon: History,
    title: 'Cloud version control for missions',
    body: 'Mission plans get the same version history and rollback that source code gets - see what changed between revisions and who changed it, instead of guessing which file is current.',
  },
  {
    icon: FlaskConical,
    title: 'Scriptable mission simulation',
    body: 'A Python-scriptable simulation environment to test automation scripts and mission logic safely before they ever run against a real aircraft.',
  },
];

export default function MeridianGcsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          toolSchema({
            name: 'Meridian GCS',
            description:
              'A ground-control station software product in development at LeakSonic, covering CAD-to-waypoint conversion, companion-computer control, collaborative mission editing, cloud version control, and scriptable simulation.',
            path: '/solutions/meridian-gcs',
          }),
        ]}
      />
      <PageHero
        eyebrow="In development"
        title="Meridian GCS - the ground control station we wished existed."
        lead="Alongside Sentrix, we're building Meridian GCS: a ground-control station designed around how a mission actually gets planned, flown, and repeated - not just how a single flight gets flown. It's in active development, not yet released, and this page describes what we're building toward."
        crumbs={crumbs}
      />

      <section className="border-b border-line bg-base py-section">
        <div className="container-content max-w-3xl">
          <Reveal>
            <SectionLabel>Where this actually stands</SectionLabel>
            <p className="mt-6 text-lg leading-relaxed text-ink-secondary">
              To be direct: Meridian GCS is an internal software product under active development,
              not a shipped or generally available tool today. It grew out of building and flying
              our own drones for Sentrix - the gap between what existing ground-control tools do and
              what a repeat-cycle, evidence-driven inspection programme actually needs. We are
              designing it to be faster and more intuitive to plan a mission in than the ground-
              control tools most teams reach for today, though that is a design goal we are building
              toward, not a benchmarked claim.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-line bg-surface py-section">
        <div className="container-content">
          <Reveal>
            <SectionHeading
              eyebrow="What we're building"
              title="Seven capabilities we're designing Meridian GCS around"
              lead="Each of these is a design goal we're actively building toward, not a shipped feature list - stated plainly, not oversold."
            />
          </Reveal>
          <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} delay={i * 0.05}>
                  <Card className="h-full p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-tile border border-line bg-surface text-accent">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 text-h3 font-semibold text-ink">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{f.body}</p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-base py-section">
        <div className="container-content max-w-3xl">
          <Reveal>
            <SectionLabel>How it fits</SectionLabel>
            <h2 className="mt-4 text-h2 font-bold text-ink">
              The ground station for our own hardware, built for our own AI.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-secondary">
              Meridian GCS exists because we build and test our own drone hardware for Sentrix, and
              we wanted the tool that flies it to be built with the same evidence-first thinking as
              the AI it feeds. It is not a separate product launch competing for attention with
              Sentrix - it is infrastructure we are building because we needed it, and are open
              about sharing more on as it matures.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Curious about Meridian GCS?"
        body="It's early, and we're candid about that. If you fly drones for infrastructure inspection and want to follow along or share what a ground-control tool should actually do, we'd like to hear from you."
        primaryHref="/contact"
        primaryLabel="Talk to us about Meridian GCS"
        secondaryHref="/platform"
        secondaryLabel="See the Sentrix platform"
      />
    </>
  );
}
