import type { Metadata } from 'next';
import { ToolShell } from '@/components/tools/ToolShell';
import { CorrosionRateCalculator } from '@/components/tools/CorrosionRateCalculator';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Corrosion Rate & Remaining Life Calculator',
  description:
    'Free engineering engine: enter two wall-thickness readings to compute a linear corrosion rate, remaining corrosion allowance, projected remaining life, and a suggested next-inspection interval using the half-life convention from API 510/570/653-style programmes.',
  path: '/tools/corrosion-remaining-life-calculator',
  keywords: [
    'corrosion rate calculator',
    'remaining life calculator pipeline',
    'API 570 inspection interval calculator',
    'wall thickness corrosion rate tool',
    'half-life inspection interval calculator',
    'retirement thickness calculator',
  ],
});

const faqs = [
  {
    question: 'What does the Corrosion Rate & Remaining Life Calculator compute?',
    answer:
      'From an original thickness, a current measured thickness, and the years between readings, it computes a linear corrosion rate, the remaining corrosion allowance down to your stated minimum required thickness, a projected remaining life in years, and a suggested next-inspection interval using the "half of remaining life" convention common in API 510/570/653-style in-service inspection programmes.',
  },
  {
    question: 'Does this replace a fitness-for-service assessment?',
    answer:
      'No. A real retirement-thickness or fitness-for-service determination follows your governing code - commonly API 579-1/ASME FFS-1 for fitness-for-service, or API 510/570/653 for the applicable asset type - and accounts for factors this tool does not, including flaw geometry, remaining strength, and applicable safety factors. This tool is a fast, linear approximation for reasoning about a known corrosion trend, not a substitute for that assessment.',
  },
  {
    question: 'Why does the tool ask about general versus localized corrosion?',
    answer:
      'A linear rate is a reasonable approximation for general (uniform) corrosion but can be dangerously optimistic for localized mechanisms - pitting, corrosion under insulation, or microbiologically influenced corrosion - which can progress far faster at specific points than a uniform average suggests. The tool flags this explicitly rather than presenting one projection as universally valid.',
  },
  {
    question: 'Where does the minimum required thickness value come from?',
    answer:
      'You supply it - this tool does not calculate a code-minimum thickness itself. That figure should come from your own governing-code calculation (for example ASME B31G for pipelines, or the applicable API code for your asset type), since it depends on design pressure, material properties, and safety factors this tool does not model.',
  },
];

export default function Page() {
  return (
    <ToolShell
      eyebrow="Free tool"
      title="Corrosion Rate & Remaining Life Calculator"
      lead="Two thickness readings in, a full engineering breakdown out: corrosion rate, remaining allowance, projected remaining life, and a suggested next-inspection interval - with every step of the arithmetic shown."
      slug="/tools/corrosion-remaining-life-calculator"
      name="Corrosion Rate & Remaining Life Calculator"
      schemaDescription="A free engineering engine that computes a linear corrosion rate, remaining corrosion allowance, projected remaining life, and a suggested next-inspection interval from two wall-thickness readings, in the style of API 510/570/653-based in-service inspection programmes."
      methodologyNote="Corrosion rate is computed as (original thickness − current thickness) ÷ years in service - a linear approximation. Remaining allowance is current thickness minus your stated minimum required thickness; remaining life is that allowance divided by the corrosion rate. The suggested next-inspection interval applies the widely used 'half of remaining life' convention from API 510/570/653-style programmes, capped at whatever maximum interval you set. This tool does not calculate your minimum required thickness, does not account for localized corrosion mechanisms unless you factor that in yourself, and is not a substitute for a real fitness-for-service assessment under API 579-1/ASME FFS-1 or your governing code."
      faqs={faqs}
    >
      <CorrosionRateCalculator />
    </ToolShell>
  );
}
