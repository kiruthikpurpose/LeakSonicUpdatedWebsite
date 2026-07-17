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
      'Yes. We publish six free, no-signup engineering tools at leaksonic.com/tools: an Inspection Cost & ROI Calculator, an Integrity & Methane Reporting Readiness Assessment, an Inspection Priority Score Estimator built on an API 580-style risk matrix, a Corrosion Rate & Remaining Life Calculator, a Drone Mission Coverage & Flight Time Planner, and a Methane Emissions Value Estimator. Each shows its full working in an insight log rather than just returning a number, and each is explicitly labelled as an illustrative planning aid, not a validated Sentrix performance claim.',
  },
  {
    question: 'What is Meridian GCS?',
    answer:
      'Meridian GCS is a ground-control station software product LeakSonic is developing in-house - designed for CAD-to-waypoint conversion (from P&ID, CSV, or DXF files), direct companion-computer control, collaborative mission editing, cloud version control for mission plans, mission scheduling and docking integration, and a scriptable mission simulator. It is under active development, not released or generally available today.',
  },
  {
    question: 'Why is AI, not the drone, the most important part of LeakSonic’s technology?',
    answer:
      'Because drone hardware alone is only moderately scalable and increasingly commoditised, while the AI and decision-intelligence software that turns raw evidence into a comparable, defensible, prioritised finding is what actually compounds in value across customers and asset types. We still design, build, and test our own drone hardware - it exists specifically to keep the AI grounded in real flight data - but the AI is the part built to scale.',
  },
  {
    question: 'What is multimodal sensor fusion, and does Sentrix use it?',
    answer:
      'Multimodal sensor fusion means combining evidence from more than one sensing source - visual, thermal, or other signal types - into a single, more reliable finding rather than trusting any one reading alone. It is a design principle behind how Sentrix builds confidence into a finding, and the architecture is built to extend to additional evidence sources over time as the platform matures.',
  },
  {
    question: 'Does AI replace the engineer in an inspection decision?',
    answer:
      'No. Sentrix is built to surface evidence and a confidence level for an engineer to review and decide on, not to make an unreviewable autonomous call. The value of AI here is reducing manual review effort and making cycle-over-cycle comparison reliable - engineering judgement stays in the loop by design, not as an afterthought.',
  },
  {
    question: 'What is a digital twin, and does Sentrix build one for pipelines?',
    answer:
      'A digital twin is a continuously updated digital representation of a physical asset, built from inspection and operational data, that lets an engineer reason about the asset’s condition without being on site. Standardised, comparable inspection evidence - which is what Sentrix produces - is a foundational input to building a reliable digital twin, and it is a natural extension of the platform as it matures.',
  },
  {
    question: 'Is LeakSonic’s drone technology used for defense or security applications today?',
    answer:
      'No. LeakSonic’s validated, funded work today is entirely in gas pipeline and refinery inspection. We are honest that the underlying AI architecture is general enough to have long-term potential in defence, national-security infrastructure inspection, and coordinated multi-drone (swarm) operation, and that we find that direction genuinely interesting - but there is no current defence deployment, program, or announced engagement, and we say that plainly rather than let it be assumed.',
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
    question: 'How do you calculate flight time and battery count for a drone survey?',
    answer:
      'Total distance to fly (corridor length times passes, or site area divided by effective swath width) is increased for the image overlap the survey needs, then divided by cruise speed to get flight time. Flight time divided by battery endurance, rounded up, gives the battery count, with swap time added between legs for total mission time. LeakSonic\'s free Drone Mission Coverage & Flight Time Planner runs this calculation live from your own inputs.',
  },
  {
    question: 'How much does an undetected methane leak actually cost?',
    answer:
      'It depends on the leak rate, the gas price, and critically, how long the leak goes undetected before repair - the last variable is usually the one an inspection programme actually controls, and every cost figure scales linearly with it. LeakSonic\'s free Methane Emissions Value Estimator calculates both the commercial value lost and the CO2-equivalent climate impact from those inputs.',
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
  {
    question: 'How does drone pipeline inspection actually work?',
    answer:
      'A drone flies the pipeline right-of-way capturing visual, thermal, and other sensor evidence along the route, typically at a set altitude and overlap so the imagery can be stitched and compared cycle over cycle. That evidence then has to be reviewed - traditionally by an engineer manually scanning through it - to flag anything that looks like a defect, encroachment, or anomaly worth a closer look. Sentrix sits at that review step: it standardises the evidence, compares it against the last flight, and surfaces a prioritised, evidence-backed list of what actually changed, rather than leaving that comparison to memory.',
  },
  {
    question: 'What is risk-based inspection (RBI)?',
    answer:
      'Risk-based inspection is an inspection-planning methodology, formalised in standards like API 580 and API 581, that ranks assets or segments by risk - typically likelihood of failure multiplied by consequence of failure - so inspection effort and budget go to the highest-risk locations first instead of being spread uniformly across a network on a fixed calendar. RBI depends on current, comparable evidence to keep its risk rankings accurate, which is exactly the input Sentrix is built to supply from drone inspection data.',
  },
  {
    question: 'What is ECDA (External Corrosion Direct Assessment)?',
    answer:
      'External Corrosion Direct Assessment is a structured, four-step methodology (pre-assessment, indirect inspection, direct examination, and post-assessment) used to evaluate and manage external corrosion on buried pipelines where in-line inspection tools cannot run. The indirect inspection step uses above-ground survey techniques to identify locations where coating or corrosion issues are likely, which then get prioritised for direct examination - a structure that surface-level drone evidence can feed into as an additional indirect-inspection input.',
  },
  {
    question: 'Can drones measure pipe wall thickness?',
    answer:
      'No, not directly - and no credible drone-based system claims to. Wall thickness is measured by contact methods such as ultrasonic testing or by in-line inspection tools running inside the pipe. What a drone can capture are surface signatures - thermal anomalies, vegetation stress, visible coating damage, or corrosion staining - that help an integrity team prioritise where those contact measurements should happen next. Sentrix is explicit about this boundary: it does not replace wall-thickness measurement, it helps decide where to point it.',
  },
  {
    question: 'What is OGMP 2.0 and why does it matter for gas pipelines?',
    answer:
      'OGMP 2.0 (the Oil & Gas Methane Partnership 2.0) is an international measurement-based methane reporting framework that pushes companies from estimated emission factors toward source-level, and eventually site-level reconciled, measured methane data. For gas pipeline and CGD operators, it matters because reporting expectations are shifting toward evidence that can be measured and verified, not just calculated - which is the same direction inspection evidence itself needs to move for reporting to stay credible.',
  },
  {
    question: 'How much does pipeline inspection cost in India?',
    answer:
      'It varies widely by network size, terrain, inspection method, and cycle frequency, so there is no single honest number to quote here. What tends to be more useful is understanding where the cost actually goes - manual evidence review and reporting is usually a bigger driver than the flight or walk itself. Our free [Inspection Cost & ROI Calculator](/tools/inspection-cost-calculator) lets you work through that arithmetic with your own numbers rather than relying on a generic industry figure.',
  },
  {
    question: 'What is an API 581 damage factor?',
    answer:
      'A damage factor, in the API 581 risk-based inspection methodology, is a numerical multiplier that adjusts an asset\'s generic failure probability based on the specific degradation mechanisms it is actually exposed to - such as corrosion rate, past inspection findings, and equipment-specific factors - and how effectively those mechanisms have been inspected for. Better, more current inspection evidence generally supports a more favourable (lower-risk) damage factor calculation, which is part of why keeping inspection evidence standardised and comparable across cycles has a direct downstream effect on an RBI programme\'s outputs.',
  },
  {
    question: 'How do you compare pipeline inspections over time?',
    answer:
      'Reliably comparing one inspection cycle to the last requires evidence that lines up - the same segment, roughly the same conditions, captured and referenced consistently - which is difficult to do from memory or loosely organised photo folders. Sentrix standardises evidence capture and geolocation so that what changed between cycles is computed directly rather than relied on someone recalling what a segment looked like a year ago, isolating genuine change from static, already-known features.',
  },
  {
    question: 'What is ASME B31.8S and how does it apply here?',
    answer:
      'ASME B31.8S is the standard that governs managing the integrity of gas transmission pipeline systems in the United States and is widely referenced internationally, including in India, as a framework for structuring an integrity management programme - covering threat identification, risk assessment, and inspection interval planning. Sentrix is designed to produce evidence and findings organised around the same threat categories that framework already uses, so output slots into an existing integrity management programme rather than requiring a parallel one.',
  },
  {
    question: 'How does drone inspection compare to rope access or scaffolding on cost?',
    answer:
      'Rope access and scaffolding both require specialised crews, mobilisation time, and - for scaffolding especially - meaningful setup and teardown cost before any inspection actually happens, which is why they are typically reserved for locations that genuinely need close-contact work. A drone survey covers the same static equipment far faster and without that mobilisation overhead, which is why the realistic case for most operators is not "replace rope access entirely" but "screen everything with a drone first, and reserve rope access and scaffolding for what the screening actually flags." See [our refinery operators page](/solutions/refinery-operators) for how that split works in practice.',
  },
];
