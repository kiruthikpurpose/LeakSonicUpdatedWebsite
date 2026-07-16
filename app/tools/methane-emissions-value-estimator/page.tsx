import type { Metadata } from 'next';
import { ToolShell } from '@/components/tools/ToolShell';
import { MethaneValueEstimator } from '@/components/tools/MethaneValueEstimator';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Methane Emissions Value Estimator',
  description:
    'Free calculator: estimate the commercial value and CO2-equivalent climate impact of an undetected methane leak, from leak rate, detection time, gas value, and global warming potential - and see why detection speed is the single biggest lever.',
  path: '/tools/methane-emissions-value-estimator',
  keywords: [
    'methane leak cost calculator',
    'methane emissions value estimator',
    'gas leak economic impact calculator',
    'CO2 equivalent methane calculator',
    'methane GWP calculator',
  ],
});

const faqs = [
  {
    question: 'What does the Methane Emissions Value Estimator calculate?',
    answer:
      'From an estimated leak rate and the number of hours it goes undetected, it calculates total gas lost, the commercial value of that lost gas, and the CO2-equivalent climate impact using a global warming potential (GWP) multiplier you set - showing every step of the arithmetic.',
  },
  {
    question: 'Where does the GWP multiplier come from?',
    answer:
      'Global warming potential figures for methane come from IPCC assessment reports and vary by report version and time horizon - commonly around 28-36 for a 100-year horizon (GWP-100) and 80-83 for a 20-year horizon (GWP-20) in recent assessments. The tool defaults to a mid-range GWP-100 figure but lets you set your own to match whatever reporting framework you use.',
  },
  {
    question: 'What is the main takeaway from this tool?',
    answer:
      'That detection time, not leak size alone, is usually the biggest lever an operator actually controls. Every input on this page is roughly fixed by physical reality except how long a leak goes undetected - halving that number halves the estimated value and climate impact, which is the economic case for prioritised, cycle-over-cycle inspection over a fixed calendar schedule.',
  },
];

export default function Page() {
  return (
    <ToolShell
      eyebrow="Free tool"
      title="Methane Emissions Value Estimator"
      lead="Set a leak rate, a detection window, and a gas value, and see the commercial and climate cost of the time it takes to find and fix a leak - with the full arithmetic shown."
      slug="/tools/methane-emissions-value-estimator"
      name="Methane Emissions Value Estimator"
      schemaDescription="A free calculator that estimates the commercial value and CO2-equivalent climate impact of an undetected methane leak, from leak rate, detection time, gas value, and a user-set global warming potential multiplier."
      methodologyNote="Gas lost is leak rate multiplied by hours undetected. Commercial value is gas lost multiplied by your stated gas price. CO2-equivalent impact is gas lost multiplied by your stated GWP multiplier, which you should set to match whichever IPCC assessment report and time horizon your own reporting framework uses - the tool does not assert one canonical GWP value as correct. This is an illustrative estimate from assumptions you control, not a measurement of any real leak or a validated Sentrix performance claim."
      faqs={faqs}
    >
      <MethaneValueEstimator />
    </ToolShell>
  );
}
