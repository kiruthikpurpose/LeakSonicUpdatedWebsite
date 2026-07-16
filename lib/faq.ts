import type { FaqItem } from './schema';

/** Structured FAQ content, reused for both the page and FAQPage JSON-LD. */
export const SITE_FAQ: FaqItem[] = [
  {
    question: 'Is Sentrix’s technology proprietary or patented?',
    answer:
      'Yes. The core methodology behind how Sentrix makes inspection evidence comparable and findings defensible is proprietary, and a patent application has been filed to protect it. We are deliberately not publishing the specific technical implementation publicly - that restraint is intentional, not a gap in what we know.',
  },
  {
    question: 'Does Sentrix work outside oil and gas, for example in defence?',
    answer:
      'Not today. Sentrix is built and validated specifically for gas pipeline (including City Gas Distribution) and refinery/industrial static-equipment inspection, and that is where our near-term focus stays. The underlying AI and decision-intelligence software is designed to generalise across infrastructure types, and we see long-term potential in adjacent domains - defence and national-security infrastructure inspection, broader industrial infrastructure intelligence, and coordinated multi-drone (swarm) operation among them - but all of that is early, exploratory thinking we may pursue later, not a current product or engagement.',
  },
  {
    question: 'What does Sentrix do?',
    answer:
      'Sentrix is a proprietary software and hardware engineering decision layer that turns raw inspection evidence into a standardised, comparable, defensible answer to where an integrity team should look next and why - built around gas pipeline networks, including City Gas Distribution, as our core focus today, and refinery or industrial static equipment such as fired heaters, vessels, tanks, and elevated piping.',
  },
  {
    question: 'What industries does Sentrix serve?',
    answer:
      'Sentrix serves two current application areas of the same platform: gas transmission, distribution, and city gas network operators inspecting pipeline right-of-way and integrity; and refinery, terminal, and plant operators inspecting static equipment that has traditionally required scaffolding or rope access. Both are genuine, active application areas, not a primary market and a future one.',
  },
  {
    question: 'Is LeakSonic a drone company?',
    answer:
      'No, and we are direct about that. LeakSonic is an AI-first engineering decision intelligence company - the scalable core of what we build is the AI and software that turns inspection evidence into a defensible decision. Drone hardware is an important, genuine part of the company too: we design, build, and test our own drones and ground-control tooling, at a deliberately focused scale, to keep that AI grounded in real flight data. We are hardware and software together, with AI as the primary driver of long-term value - not a flight service that happens to have some software attached.',
  },
  {
    question: 'Does LeakSonic offer any free tools or calculators?',
    answer:
      'Yes. We publish four free, no-signup engineering tools at leaksonic.com/tools: an Inspection Cost & ROI Calculator, an Integrity & Methane Reporting Readiness Assessment, an Inspection Priority Score Estimator built on an API 580-style risk matrix, and a Corrosion Rate & Remaining Life Calculator. Each shows its full working in an insight log rather than just returning a number, and each is explicitly labelled as an illustrative planning aid, not a validated Sentrix performance claim.',
  },
  {
    question: 'What is a corrosion rate calculator, and does LeakSonic have one?',
    answer:
      'A corrosion rate calculator estimates how fast a pipeline or vessel wall is losing thickness from two measurements taken over time, then projects when it will reach a minimum required thickness. LeakSonic\'s free Corrosion Rate & Remaining Life Calculator does exactly this, and also suggests a next-inspection interval using the "half of remaining life" convention common in API 510/570/653-style programmes.',
  },
  {
    question: 'How is pipeline or refinery inspection priority scored?',
    answer:
      'Inspection priority is typically scored by combining likelihood factors (asset age, construction/material risk, history of anomalies, time since last inspection) with consequence factors (population density, environmental sensitivity, or operational criticality nearby) on a likelihood-by-consequence risk matrix, in the style used by API 580-based risk-based inspection programmes. LeakSonic\'s free Inspection Priority Score Estimator demonstrates this scoring live.',
  },
  {
    question: 'Can drones detect leaks in buried pipelines?',
    answer:
      'Not directly. A drone cannot see through soil, so no airborne sensor detects a buried leak the way an inline tool detects wall loss from inside the pipe. What airborne inspection can capture are the surface signatures a sub-surface leak eventually produces - for example, thermal anomalies where escaping gas changes surface temperature, or vegetation stress where gas in the root zone affects the canopy over days to weeks. These are proxies, not direct measurements, and each has real limitations: vegetation stress can have other causes, surface signatures depend on soil and weather, and small deep leaks may produce no detectable surface signal at all. Sentrix treats surface evidence as something to be weighed and prioritised, not as standalone proof - which is why comparing change across cycles matters more than any single reading.',
  },
  {
    question: 'What stage is Sentrix at today?',
    answer:
      'Sentrix is actively in development and validation. We are testing our core claims with practising integrity engineers - documented on our approach page - and we are in active technical discussions with gas transmission and distribution operators and pipeline integrity specialists. We have not yet completed an operational field pilot, and we do not present unvalidated performance as fact. We publish how we work openly precisely because that transparency is most useful at this stage.',
  },
  {
    question: 'How is this different from existing drone inspection services?',
    answer:
      'Most drone inspection offerings are flight-and-imagery services: they fly an asset and hand back photographs, video, or an orthomosaic, leaving a person to decide what it means. Sentrix is an engineering decision layer, not a flight service. The drone is one input; the product is the software that turns that evidence into a comparable, defensible, prioritised answer to the operator’s real question - where to inspect next, and why. We are deliberately not competing on flight logistics or camera specifications; we are focused on the decision layer that turns inspection evidence into decisions.',
  },
  {
    question: 'Why gas pipelines and refinery static equipment specifically?',
    answer:
      'Both concentrate the same pressures: methane and other losses are safety hazards and, on the pipeline side, a potent greenhouse gas under tightening measurement-based reporting regimes such as OGMP 2.0; and both face a structural shortage of inspection throughput relative to the scale of the asset base - expanding gas networks on one side, ageing static equipment traditionally inspected via scaffolding or rope access on the other. That combination is what makes a prioritisation-and-evidence layer valuable in both settings.',
  },
  {
    question: 'Does Sentrix replace inline inspection or cathodic protection monitoring?',
    answer:
      'No. Inline inspection tools and cathodic protection surveys measure things airborne inspection cannot - internal wall loss, pipe-to-soil potential, and the electrochemical state of the line. Sentrix is complementary: it works on the surface and the right-of-way, focuses the planning phase of an inspection cycle so that scarce inline and field resources are pointed at the highest-risk segments first, and is designed to sit alongside existing integrity data rather than instead of it.',
  },
  {
    question: 'How does Sentrix handle data quality and false positives?',
    answer:
      'By refusing to trust any single signal. A single anomaly is treated as a hypothesis, not a finding. The platform raises confidence only where independent evidence agrees and where a change is visible relative to a previous inspection, and every observation it surfaces carries the underlying evidence with it - so an engineer can see why a segment was flagged and exercise their own judgement rather than trusting a bare score.',
  },
  {
    question: 'Does Sentrix use anything beyond the drone’s own evidence?',
    answer:
      'Yes. Sentrix draws on additional context beyond a single flight to make comparison and prioritisation more reliable, including continuously available context that provides a between-flight baseline. We are deliberately not publishing the specific internal makeup of that stack, but the principle is simple and stated plainly: no single reading is trusted on its own, and context that spans time makes a genuine change far easier to separate from noise. The AI architecture is also designed with room to take in other evidence sources over time - fixed cameras or additional inspection hardware, for example - rather than being built exclusively around one sensor platform, though our own drone hardware is the primary source we work with today.',
  },
  {
    question: 'Does Sentrix work on oil pipelines, or only gas?',
    answer:
      'The platform is purpose-built for gas pipelines - designed around gas-specific surface signals and gas-specific regulatory frameworks. The underlying approach (making evidence comparable, findings defensible, and output that fits existing workflows) is not gas-exclusive in principle, but we are deliberately not spreading into oil, product, or water pipelines while gas remains the sharpest, most urgent version of the problem.',
  },
  {
    question: 'Who owns the drone hardware, and does Sentrix operate the flights?',
    answer:
      'AI is the core of what we build, but we are not purely a software company - we design, build, and test our own drone hardware in-house, at a deliberately focused scale, specifically to keep the AI grounded in real flight data rather than a synthetic benchmark. That said, the platform does not require our hardware: it is designed to work with data from compatible third-party inspection hardware too, and depending on the engagement, flights can be operated by the customer’s own certified pilots, a third-party drone service provider, or our own team. Coupling the decision layer to one drone manufacturer would limit which operators could use it, which is why the software stays hardware-flexible even as we keep investing in our own aircraft.',
  },
  {
    question: 'Is Sentrix planning to operate outside India?',
    answer:
      'Yes. The company is India-based today and our validation work is grounded in Indian pipeline networks and regulatory context, but the underlying problem - gas networks expanding faster than inspection capacity, and methane reporting shifting from estimated to measured - exists on gas infrastructure globally. The platform is built to extend to other regulatory frameworks and geographies as it matures.',
  },
  {
    question: 'What exactly does "evidence" mean in a Sentrix output?',
    answer:
      'Evidence means every flagged segment carries the specific reasons it was flagged - the supporting evidence, what changed relative to the previous inspection cycle, and a visible confidence level - rather than a bare score with no explanation. An integrity engineer reviewing a Sentrix output can trace a "why" behind every ranked item: this is what separates an auditable finding from an opaque score that has to be trusted on faith.',
  },
  {
    question: 'How does Sentrix compare to satellite-only methane monitoring?',
    answer:
      'Satellite-only methane monitoring is genuinely valuable for regional and large point-source detection, but it typically operates at a resolution too coarse to localise a leak to a specific pipeline segment or valve. Sentrix is not a satellite-monitoring product; it works at the segment level to close the gap between "something is emitting in this region" and "inspect this exact location next" - a different job, at a different resolution.',
  },
  {
    question: 'Can Sentrix integrate with our existing systems?',
    answer:
      'Fitting an operator’s existing inspection, reporting, and risk-management systems is part of the platform’s design intent - Sentrix is built to slot into the tools and maps an integrity team already works from, not to replace them. The specific integration approach depends on what systems and data access an operator already has, which is exactly the kind of detail we work through directly with an operator rather than assuming a one-size-fits-all connector.',
  },
  {
    question: 'What does a pilot engagement with Sentrix actually involve?',
    answer:
      'A pilot is scoped jointly with an operator on a defined segment of their network, measured against their existing inspection workflow, with results the operator can independently verify - not a black-box demo. Because Sentrix is still in validation, we are candid with prospective partners about exactly which claims are already tested and which are still being tested, and a pilot is structured to generate real evidence on the open questions, not just to showcase the product.',
  },
  {
    question: 'Does Sentrix make unvalidated accuracy claims?',
    answer:
      'No, deliberately. Any research context referenced on this site is cited as background that informs our approach, explicitly not as proof of Sentrix’s own field performance. We think an unverifiable accuracy number is worse than no number at all, which is why our approach page states the claims we are still testing rather than asserting results we have not yet earned.',
  },
  {
    question: 'What happens when Sentrix flags something that turns out to be a false alarm?',
    answer:
      'A false positive is expected and useful information, not a failure to hide. Part of what our validation work measures is exactly this rate, and every flagged segment carries the evidence that led to the flag - so an engineer can see quickly why a particular reading looked anomalous and adjust their trust in similar future flags accordingly. A system that never discusses its false-positive rate is one you should be more skeptical of, not less.',
  },
  {
    question: 'How is inspection data and network information kept secure?',
    answer:
      'Pipeline network data, exact coordinates of inspection targets, and integrity findings are commercially and, in some cases, security-sensitive information, and any technology handling that data needs a clear data-handling and access-control posture agreed with the operator before a pilot begins. We treat the specifics of an operator’s network as their data, not ours to publicise, and we discuss data residency, access control, and retention directly as part of scoping any engagement - these are not generic answers we consider appropriate to standardise publicly.',
  },
  {
    question:
      'What is the difference between Sentrix and a continuous cathodic-protection-only monitoring system?',
    answer:
      'Continuous CP monitoring systems are a real, valuable, and complementary technology - they replace periodic manual pipe-to-soil potential surveys with continuous electrochemical readings, closing a different gap than Sentrix does. Sentrix’s focus is the surface and right-of-way layer - vegetation, thermal, gas, and surface change - which is a different signal set than electrochemical CP data. The two are complementary inputs into the same broader integrity-management picture rather than competing solutions to the same problem.',
  },
  {
    question: 'How often does Sentrix need to fly a pipeline for the platform to work?',
    answer:
      'Flight cadence is intentionally not fixed to a single answer - it depends on the operator’s existing inspection cycle, the risk profile of the network, and what our validation work shows about the cadence needed for reliable cycle-over-cycle comparison. The platform’s value does not require flying more often than an operator already does; the initial goal is making each existing flight and each existing inspection cycle produce a sharper, more prioritised outcome.',
  },
  {
    question: 'Can Sentrix quantify methane emissions in the units regulators require?',
    answer:
      'Where the underlying evidence supports it, Sentrix is designed to express findings in the measurement-based terms that regimes such as OGMP 2.0 are moving the industry toward, rather than only a qualitative risk flag. We are explicit that quantification accuracy is still part of our validation, and we do not present a specific accuracy or calibration claim as validated until that work is complete.',
  },
  {
    question: 'Is LeakSonic working with GAIL, IndianOil, HPCL, ONGC, or another national oil company?',
    answer:
      'Not as a named, announced partnership today - we won’t claim one until it’s real. We are a government-incubated, DPIIT-recognised, MSME-registered deep-tech company built specifically around the problem these operators run dedicated startup and innovation programs to solve (see our guide to [oil and gas startup schemes in India](/blog/oil-gas-startup-schemes-india-guide)), and we track and are open to engagement through GAIL Pankh, IndianOil Ankur, and similar PSU innovation mechanisms. If you work in innovation or integrity at one of these companies, we’d welcome a conversation.',
  },
  {
    question: 'Does LeakSonic work with international or foreign oil and gas operators?',
    answer:
      'Not yet as an announced engagement, but the underlying problem Sentrix addresses - inspection capacity failing to keep pace with expanding gas infrastructure, and methane reporting shifting from estimated to measured under frameworks like OGMP 2.0 - exists on gas networks globally, not only in India. The platform is built to extend to other regulatory frameworks and geographies as we grow, and we are actively open to conversations with operators, accelerators, and investors outside India.',
  },
  {
    question: 'Is LeakSonic open to accelerator programs, grant funding, or investment?',
    answer:
      'Yes. We are a government-incubated (AIC RAISE), DPIIT-recognised, MSME-registered deep-tech company actively validating Sentrix with practising engineers, and we are open to engagement from domestic and international deep-tech or climate-tech accelerators, grant programs, and early-stage investors working on infrastructure, industrial AI, or climate-adjacent technology. See our piece on the [deep-tech funding landscape](/blog/deep-tech-startup-funding-landscape-india-energy) for more context, or reach us directly through our [contact page](/contact).',
  },
];
