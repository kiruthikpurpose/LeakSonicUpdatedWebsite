import type { Metadata } from 'next';
import { ToolShell } from '@/components/tools/ToolShell';
import { MissionCoveragePlanner } from '@/components/tools/MissionCoveragePlanner';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Drone Mission Coverage & Flight Time Planner',
  description:
    'Free planning engine: estimate flight distance, flight time, battery count, and total mission time for a pipeline corridor or refinery site survey, from your aircraft speed, endurance, and coverage requirements.',
  path: '/tools/mission-coverage-planner',
  keywords: [
    'drone mission planning calculator',
    'drone flight time calculator',
    'pipeline drone survey planning tool',
    'drone battery planning calculator',
    'photogrammetry coverage calculator',
    'drone survey mission planner',
  ],
});

const faqs = [
  {
    question: 'What does the Drone Mission Coverage & Flight Time Planner compute?',
    answer:
      'From your site type (a linear pipeline corridor or an area-based refinery site), coverage requirements, cruise speed, and battery endurance, it computes the total flight distance needed, flight time, number of batteries required, and total mission time including battery-swap overhead - with every step shown in an insight log.',
  },
  {
    question: 'Does it work for both pipeline and refinery/area surveys?',
    answer:
      'Yes. Toggle between a linear corridor (you set length and number of passes) and an area site (you set hectares and effective swath width per pass) - the underlying distance-to-time arithmetic is the same either way.',
  },
  {
    question: 'Why does the tool ask about image overlap?',
    answer:
      'Overlap between passes is what makes downstream photogrammetry, comparison, and change detection reliable - it is flown distance, not wasted effort. Higher overlap increases total flight distance and therefore flight time and battery count, and the tool makes that trade-off visible rather than hiding it.',
  },
];

export default function Page() {
  return (
    <ToolShell
      eyebrow="Free tool"
      title="Drone Mission Coverage & Flight Time Planner"
      lead="Set your site, your coverage requirements, and your aircraft's specs, and get flight distance, flight time, battery count, and total mission time - with the full arithmetic shown."
      slug="/tools/mission-coverage-planner"
      name="Drone Mission Coverage & Flight Time Planner"
      schemaDescription="A free planning engine that estimates flight distance, flight time, battery count, and total mission time for a pipeline corridor or refinery site drone survey."
      methodologyNote="For a linear site, distance is corridor length times number of passes. For an area site, distance is site area divided by effective swath width per pass. That raw distance is increased by your stated overlap percentage, converted to flight time at your cruise speed, then divided into battery-length legs (rounded up) with swap time added between them. This tool does not model wind, terrain, regulatory flight ceilings, or airspace restrictions, and is a planning aid, not a certified flight plan."
      faqs={faqs}
      heroImage={{
        src: '/images/generated/tools-drone-mission-planning.jpg',
        alt: 'A drone operator planning a flight route on a tablet in the field',
      }}
    >
      <MissionCoveragePlanner />
    </ToolShell>
  );
}
