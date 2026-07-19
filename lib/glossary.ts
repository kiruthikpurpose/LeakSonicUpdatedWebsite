export type GlossaryEntry = {
  term: string;
  abbr?: string;
  definition: string;
};

export function glossarySlug(term: string): string {
  return term
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Standalone, citable definitions. Each entry is written to stand on its own as
 * a quotable passage rather than a one-line dictionary gloss.
 */
export const GLOSSARY: GlossaryEntry[] = [
  {
    term: 'TDLAS',
    abbr: 'Tunable Diode Laser Absorption Spectroscopy',
    definition:
      'TDLAS is an optical gas-sensing technique that measures the concentration of a target gas - for pipeline work, most often methane - by tuning a laser to a wavelength the gas absorbs and measuring how much light is lost across a path. Because it responds to a specific absorption line, it is highly selective for methane and largely immune to interference from other gases, which makes it well suited to airborne and handheld leak surveys. Its principal limitation is that it reports an integrated column concentration along the beam path, so it confirms that methane is present between the sensor and a surface but does not by itself localise the source in three dimensions.',
  },
  {
    term: 'OSAVI',
    abbr: 'Optimized Soil-Adjusted Vegetation Index',
    definition:
      'OSAVI is a vegetation index derived from red and near-infrared reflectance that adds a soil-adjustment term to reduce the influence of bare-ground background, making it more reliable than raw NDVI over sparse or patchy canopy such as pipeline rights-of-way. Vegetation indices are used broadly across agriculture and land monitoring as a proxy for plant health and stress, because changes in canopy reflectance can appear before any visually obvious change - which is what makes them a subject of ongoing research interest in infrastructure and environmental monitoring.',
  },
  {
    term: 'NDVI',
    abbr: 'Normalized Difference Vegetation Index',
    definition:
      'NDVI is the most widely used vegetation index, computed as the normalized difference between near-infrared and red reflectance, yielding a value that rises with healthy, photosynthetically active canopy. In pipeline monitoring it provides a cheap, continuously available baseline of vegetation vigour along the right-of-way from free satellite sources such as Sentinel-2. Its weakness for leak detection is sensitivity to soil background and saturation over dense canopy, which is why soil-adjusted variants such as OSAVI are often preferred when the goal is to isolate stress signals rather than measure overall greenness.',
  },
  {
    term: 'BVLOS',
    abbr: 'Beyond Visual Line of Sight',
    definition:
      'BVLOS refers to drone operations conducted beyond the range at which the remote pilot can see the aircraft unaided, which is the regime required to inspect long linear assets such as transmission pipelines efficiently. BVLOS unlocks the economics of aerial pipeline inspection because it removes the need to leapfrog crews along the route, but it also carries the heaviest regulatory burden, since the operator must demonstrate detect-and-avoid capability and airspace safety without direct visual contact. In India, BVLOS approvals to date have flowed through government-sponsored consortiums with security clearance rather than open commercial licensing.',
  },
  {
    term: 'PNGRB',
    abbr: 'Petroleum and Natural Gas Regulatory Board',
    definition:
      'The PNGRB is the statutory regulator for India’s downstream petroleum and natural gas sector, established under the PNGRB Act, 2006. It authorises and oversees natural gas pipelines and City Gas Distribution networks, sets technical and safety standards including integrity-management and inspection requirements, and governs the reporting operators must maintain. For a technology vendor, PNGRB matters because inspection outputs that are not aligned with its reporting expectations create manual rework for operators; compliance-native reporting is therefore a functional requirement, not a nicety.',
  },
  {
    term: 'Cathodic Protection',
    abbr: 'CP',
    definition:
      'Cathodic protection is an electrochemical technique that suppresses corrosion on buried or submerged steel pipelines by making the pipeline the cathode of a controlled electrochemical cell, either with sacrificial anodes or an impressed-current system. It is one of the primary defences against external corrosion on coated steel lines, complementing the coating by protecting any exposed metal at coating defects. CP effectiveness is monitored through pipe-to-soil potential measurements; gaps or drift in those readings indicate zones where the protective current is inadequate and corrosion risk is elevated.',
  },
  {
    term: 'Technology Readiness Level',
    abbr: 'TRL',
    definition:
      'Technology Readiness Level is a nine-point scale, originally from NASA and now widely used by defence and deep-tech funding bodies, that describes how mature a technology is - from TRL-1 (basic principles observed) through TRL-9 (proven in operational use). TRL-4 denotes a technology validated in a laboratory or controlled environment: the components work and the concept has been demonstrated, but it has not yet been proven in the field at operational scale. Stating a TRL honestly signals to technical reviewers exactly what has and has not been demonstrated.',
  },
  {
    term: 'SCADA',
    abbr: 'Supervisory Control and Data Acquisition',
    definition:
      'SCADA is the class of industrial control systems that pipeline operators use to monitor and control flow, pressure, and equipment across a network in near real time from a central control room. For integrity work, SCADA is a rich but underused source of operational context - pressure transients, flow anomalies, and CP rectifier data - that is often siloed from the imagery and field-inspection workflows. Fusing SCADA context with surface observations is part of what turns raw inspection data into prioritised, decision-ready intelligence.',
  },
  {
    term: 'Right-of-Way',
    abbr: 'ROW',
    definition:
      'The right-of-way is the corridor of land along a pipeline route over which the operator holds legal access for construction, operation, and maintenance. It is the physical unit that inspection programmes are organised around: encroachment, ground disturbance, vegetation change, and third-party activity within the ROW are all leading indicators of integrity risk. Monitoring the ROW as a continuous linear asset - rather than as a set of disconnected inspection points - is central to detecting change over time.',
  },
  {
    term: 'OGMP 2.0',
    abbr: 'Oil & Gas Methane Partnership 2.0',
    definition:
      'OGMP 2.0 is the UN Environment Programme’s framework for credible, measurement-based reporting of methane emissions across the oil and gas value chain. It sets a tiered pathway that moves companies from generic emission-factor estimates toward source-level, measurement-based quantification. It matters for pipeline monitoring because it is shifting the industry standard from estimated to measured methane, which raises the value of any technology that can attribute and quantify emissions to specific locations along an asset with supporting evidence.',
  },
  {
    term: 'City Gas Distribution',
    abbr: 'CGD',
    definition:
      'City Gas Distribution is the network of pipelines and infrastructure that delivers natural gas to domestic, commercial, industrial, and transport (CNG) users within a defined geographical area. India’s CGD sector has been expanding rapidly through successive PNGRB bidding rounds, extending authorised networks across hundreds of geographical areas. This expansion multiplies the length of distribution pipeline that must be inspected and maintained faster than conventional inspection capacity can scale, which is the structural demand driver behind more efficient, prioritised inspection.',
  },
  {
    term: 'RTK / NTRIP',
    abbr: 'Real-Time Kinematic / Networked Transport of RTCM via Internet Protocol',
    definition:
      'RTK is a satellite-positioning technique that uses carrier-phase corrections from a nearby reference station to resolve position far more precisely than standard GPS, and NTRIP is the standard protocol for streaming those corrections to a rover over the internet. High-precision positioning is used widely across surveying, mapping, and infrastructure inspection wherever repeat measurements need to line up accurately enough that a difference between them reflects real change rather than positioning error.',
  },
  {
    term: 'In-Line Inspection',
    abbr: 'ILI / Smart Pig',
    definition:
      'In-line inspection uses an instrumented tool - commonly called a smart pig - that travels through a pipeline under product flow, recording sensor data (typically magnetic flux leakage or ultrasonic) along the full internal length of the line. ILI is the industry standard for finding internal and external wall loss, dents, and cracks on pipe that can accommodate a pig, and it remains the most direct way to measure metal loss anywhere along a pipeline. Its limitations are practical rather than technical: it requires launcher and receiver infrastructure, is typically run on a multi-year cycle rather than continuously, and cannot be used on unpiggable lines with tight bends, varying diameters, or no pigging infrastructure - which is a meaningful share of older distribution and gathering pipe.',
  },
  {
    term: 'DCVG',
    abbr: 'Direct Current Voltage Gradient',
    definition:
      'DCVG is an above-ground survey technique that detects coating defects on a buried pipeline by measuring voltage gradients in the soil created by a pulsed cathodic protection current leaking through a holiday in the coating. Because it can pinpoint the location and estimate the severity of individual coating defects, it is often paired with close-interval potential surveys to prioritise which defects need excavation and repair first. It requires the cathodic protection system to be active and pulsed during the survey and is typically walked on foot along the right-of-way, which limits how much pipeline can be covered per field day.',
  },
  {
    term: 'CIPS',
    abbr: 'Close Interval Potential Survey',
    definition:
      'A close interval potential survey measures pipe-to-soil potential at closely spaced intervals - often every one to two metres - along the entire route of a buried pipeline, producing a continuous profile of cathodic protection performance rather than the single-point readings taken at test posts. CIPS is the standard method for finding localised gaps in CP coverage that a sparse test-post survey would miss entirely, since protection can be adequate at a test post half a kilometre away while a specific short section sits unprotected. Its main cost is labour: walking a continuous survey over long transmission routes is slow and typically run on a periodic cycle rather than continuously.',
  },
  {
    term: 'MAOP',
    abbr: 'Maximum Allowable Operating Pressure',
    definition:
      'MAOP is the highest pressure at which a pipeline is permitted to operate under its design, material, and regulatory constraints, and it is one of the central numbers in any pipeline integrity management program. Operating above MAOP, even briefly, is a regulatory and safety event; operating with a shrinking safety margin against MAOP as a pipeline ages or as corrosion reduces wall thickness is exactly the kind of slow-moving risk that continuous or frequent inspection is meant to catch before it becomes a violation or a failure. MAOP verification and re-confirmation has become a specific regulatory focus in several jurisdictions following pipeline incidents traced to inaccurate or undocumented pressure ratings.',
  },
  {
    term: 'High Consequence Area',
    abbr: 'HCA',
    definition:
      'A high consequence area is a location along a pipeline route - typically a populated area, a body of water used for drinking supply, or an ecologically sensitive zone - where a failure would have disproportionately severe consequences, and where regulators correspondingly require more rigorous and more frequent integrity assessment. HCA designation is one of the primary inputs into risk-based inspection prioritisation: two segments with identical corrosion rates can carry very different regulatory and practical urgency depending on what sits above or beside them. Identifying and keeping HCA designations current as land use changes around a pipeline is itself an ongoing data problem.',
  },
  {
    term: 'Pipeline Integrity Management Program',
    abbr: 'IMP / PIMS',
    definition:
      'A pipeline integrity management program is the documented, auditable system an operator maintains to identify threats, assess risk, schedule inspection and maintenance, and record the outcomes across its pipeline network over time. Regulators in most jurisdictions require a formal IMP for transmission pipelines and increasingly for distribution networks, and the quality of a program is judged less by any single inspection than by whether the full loop - threat identification through to verified repair - is systematic, current, and demonstrable. A technology is only as useful to an IMP as its output is easy to fold into that documented loop.',
  },
  {
    term: 'Corrosion Rate',
    definition:
      'Corrosion rate is the speed at which a pipeline is losing wall thickness to electrochemical attack, typically expressed in millimetres per year, and it is the number that ultimately determines how long a given defect has before it threatens the pipeline’s pressure-carrying capacity. Corrosion rate is rarely uniform - it depends on soil chemistry, moisture, cathodic protection coverage, and coating condition at each specific location - which is why a single network-average figure is much less useful than location-specific estimates. Two successive measurements of wall loss at the same point, spaced by a known time interval, are what actually let an engineer calculate a real corrosion rate rather than assume one.',
  },
  {
    term: 'Wall Loss',
    definition:
      'Wall loss is the reduction in a pipeline’s original wall thickness caused by internal or external corrosion, expressed either in absolute units or as a percentage of the nominal wall thickness. It is the primary quantity that in-line inspection tools are built to measure, because remaining wall thickness relative to MAOP is what determines whether a given corrosion feature is a monitoring item or an immediate repair. Wall loss data only becomes actionable when it is tied to a precise location and compared against a prior measurement at that same location - without that pairing, a single wall-loss reading tells you a defect exists but not whether it is stable or actively growing.',
  },
  {
    term: 'Pipeline Coating',
    definition:
      'Pipeline coating is the external barrier - typically fusion-bonded epoxy, polyethylene, or coal-tar enamel depending on the pipeline’s age - applied to steel pipe to physically separate it from the surrounding soil and prevent the electrochemical contact that causes external corrosion. Coating and cathodic protection work as a paired system: the coating handles the vast majority of the surface area, while CP protects the much smaller area exposed at coating defects, or holidays. Coating degrades with age, soil stress, and installation damage, and identifying where coating has failed - well before a leak develops - is one of the central goals of external corrosion surveys.',
  },
  {
    term: 'Holiday (Coating Defect)',
    definition:
      'A holiday is a gap, pinhole, or discontinuity in a pipeline’s protective coating that exposes bare steel to the surrounding soil, creating a point where cathodic protection current concentrates and where corrosion is most likely to initiate if that current is inadequate. Holidays can originate during manufacturing, from handling and installation damage, or from age-related coating degradation, and detecting them is the specific purpose of techniques such as DCVG and holiday (jeep) testing. A coating with many small holidays but strong, uniform cathodic protection can still perform well; the risk concentrates where holidays coincide with weak or absent CP coverage.',
  },
  {
    term: 'Stray Current',
    definition:
      'Stray current is current from an external source - commonly DC transit systems, welding operations, or other cathodically protected structures nearby - that enters a pipeline at one point and discharges at another, and at the discharge point it can cause corrosion far more rapidly than natural electrochemical corrosion alone. Stray current interference is notoriously difficult to diagnose from static readings because it varies with the external source’s operating pattern, which is part of why continuous or frequent monitoring is more effective at catching it than infrequent manual surveys taken at arbitrary times.',
  },
  {
    term: 'AC Interference',
    definition:
      'AC interference occurs when a pipeline runs parallel to or crosses high-voltage AC power transmission lines, inducing alternating current onto the pipeline that can cause a distinct form of corrosion at coating holidays even when cathodic protection readings look adequate by normal DC criteria. It is an increasingly common integrity threat as power transmission corridors and pipeline corridors are frequently co-located for right-of-way efficiency, and it requires its own dedicated AC voltage and current density measurements to assess, separate from standard CP surveys.',
  },
  {
    term: 'Girth Weld',
    definition:
      'A girth weld is the circumferential weld that joins two lengths of pipe end-to-end during construction, and because it is a discrete manufactured joint rather than continuous pipe body, it carries its own distinct population of potential defects - incomplete fusion, porosity, cracking - that inspection programs track separately from general corrosion. Girth welds are a recurring focus of both in-line inspection and direct examination because a population of welds from the same construction period or contractor can share a systematic defect if welding procedures or quality control were inconsistent at the time.',
  },
  {
    term: 'Class Location',
    definition:
      'Class location is a regulatory classification - typically four classes, from sparsely populated to highly populated or high-occupancy areas - that determines the design and safety margins a pipeline segment must meet, with more densely populated class locations requiring lower operating stress relative to pipe strength. Class location can change over time as land develops around an existing pipeline, which means a segment designed and built to one standard can find itself operating in a higher-risk class years later without any change to the pipe itself - a slow-moving risk shift that integrity programs need external, geography-aware data to track.',
  },
  {
    term: 'Microbiologically Influenced Corrosion',
    abbr: 'MIC',
    definition:
      'Microbiologically influenced corrosion is accelerated metal loss caused or promoted by the metabolic activity of bacteria - most notably sulphate-reducing bacteria - living in the soil or water in contact with a pipeline. MIC often produces distinctive, localised pitting that can progress faster than general electrochemical corrosion and can be harder to detect with standard cathodic protection readings, since CP is effective against electrochemical corrosion but only partially mitigates microbial activity. It is more common in wet, anaerobic, organic-rich soils and near water crossings, which makes soil and environmental context a genuine input into where MIC risk should be weighted higher.',
  },
  {
    term: 'Emission Factor',
    definition:
      'An emission factor is a generic, statistically derived estimate of how much methane or other pollutant a given type of equipment or activity is assumed to release, used to estimate total emissions by multiplying activity counts by the relevant factor rather than measuring actual releases. Emission-factor-based reporting is the long-standing default across the oil and gas sector, but it systematically misses large, intermittent releases from abnormal operation or equipment failure - which is precisely the gap that measurement-based frameworks such as OGMP 2.0 are designed to close by requiring source-level, measured data instead.',
  },
  {
    term: 'Tiered Emissions Reporting',
    abbr: 'OGMP Tier 1-5',
    definition:
      'Tiered emissions reporting, as defined under frameworks such as OGMP 2.0, ranks the rigour of a company’s methane reporting on a scale from Tier 1 (generic industry-average emission factors) up to Tier 5 (source-level, measured data reconciled against independent site-level or satellite measurement). Moving up the tiers means moving from estimation toward direct measurement and attribution, and the direction of regulatory and investor pressure is consistently toward the higher tiers - which is why technologies that can attribute an emissions or risk signal to a specific, evidenced location are becoming more valuable than generic estimation tools.',
  },
  {
    term: 'False Positive Rate',
    definition:
      'False positive rate is the proportion of an inspection or detection system’s alerts that turn out, on investigation, not to reflect a real issue - and in practice it is one of the most important numbers determining whether engineers actually trust and use a system, regardless of how sensitive it is. A detector tuned to catch every possible anomaly but that also floods engineers with false alarms will get ignored within a few cycles; a workable system has to balance sensitivity against a false positive rate low enough that every flagged item is worth an engineer’s time to check. This is why multi-signal corroboration, rather than any single sensor’s raw sensitivity, is usually the deciding factor in a detection system’s real-world usefulness.',
  },
  {
    term: 'Hyperspectral Imaging',
    definition:
      'Hyperspectral imaging captures reflectance across many narrow, contiguous spectral bands - often hundreds - compared to the handful of broad bands captured by standard multispectral sensors, giving a much more detailed spectral fingerprint of whatever the sensor is looking at. In vegetation-stress research, hyperspectral data is what allows researchers to isolate subtle, early stress signatures (such as methane-induced canopy change) that a coarser multispectral sensor would blend into noise. The trade-off is cost, data volume, and sensor availability - most free, continuously updated satellite sources such as Sentinel-2 are multispectral, not hyperspectral, which is why translating hyperspectral research findings into an operational multispectral pipeline is a genuine open problem rather than a solved one.',
  },
  {
    term: 'Anomaly Detection',
    definition:
      'Anomaly detection, in a pipeline integrity context, is the general class of methods - statistical, rule-based, or machine-learning - used to flag a measurement or an observation that deviates from an expected baseline, whether that baseline is a prior inspection cycle, a physical model, or a learned pattern across similar segments. The hard part of anomaly detection is rarely finding deviations; sensors and models routinely find them everywhere. The hard part is ranking which deviations are worth an engineer’s attention, which is why anomaly detection on its own is a component, not a finished product - it needs to feed into prioritisation and evidence, not just a list of flags.',
  },
  {
    term: 'Leak Detection System',
    abbr: 'LDS',
    definition:
      'A leak detection system is a technology or method deployed to identify that a pipeline is releasing product, ranging from internal methods that infer a leak from pressure and flow-balance anomalies inside the pipe, to external methods - including gas sensing, thermal imaging, and vegetation monitoring - that look for the surface evidence a leak produces. Internal and external methods are complementary rather than redundant: internal systems can be highly sensitive to sudden, large releases but poor at detecting small chronic leaks in low-flow conditions, while external surface-based methods can catch slow, small leaks that never produce a detectable internal pressure signature, at the cost of being indirect proxies rather than direct measurements.',
  },
  {
    term: 'Geospatial Risk Mapping',
    abbr: 'GIS-based risk mapping',
    definition:
      'Geospatial risk mapping is the practice of representing a pipeline network’s integrity risk as a geographic layer - typically within a GIS - so that risk scores, inspection history, class location, soil data, and other threat indicators can all be viewed and cross-referenced against the same physical route. It turns a table of per-segment numbers into something an integrity team can actually navigate and act on: a geographic view makes it immediately visible where multiple risk factors overlap on the same stretch of pipe, which a spreadsheet of the same data would not surface nearly as clearly.',
  },
  {
    term: 'Risk-Based Inspection',
    abbr: 'RBI',
    definition:
      'Risk-based inspection is an inspection-planning methodology, formalised for pressure equipment and pipelines in standards such as API 580 and API 581, that ranks assets or segments by risk - generally likelihood of failure multiplied by consequence of failure - so inspection frequency and effort are weighted toward the highest-risk locations rather than applied uniformly on a fixed calendar. An RBI programme is only as accurate as the evidence feeding its risk calculations; stale or inconsistent inspection data quietly degrades the ranking even when the underlying methodology is sound.',
  },
  {
    term: 'External Corrosion Direct Assessment',
    abbr: 'ECDA',
    definition:
      'External Corrosion Direct Assessment is a structured, four-step methodology - pre-assessment, indirect inspection, direct examination, and post-assessment - used to evaluate and manage external corrosion on buried pipeline segments where in-line inspection tools cannot be run. The indirect inspection step uses above-ground survey techniques to identify locations where coating damage or corrosion activity is likely, prioritising them for direct examination; it is a specific, named methodology, not a generic term for "inspecting from the surface."',
  },
  {
    term: 'API 581 Damage Factor',
    abbr: 'Damage Factor',
    definition:
      'In the API 581 risk-based inspection methodology, a damage factor is a numerical multiplier applied to an asset\'s generic failure probability, adjusted for the specific degradation mechanisms it is actually exposed to - corrosion rate, prior inspection findings, and how effectively those mechanisms have historically been inspected for. Better, more current, more consistently comparable inspection evidence generally supports a more accurate and often more favourable damage factor calculation, which is one of the direct, quantifiable links between inspection quality and an RBI programme\'s output.',
  },
  {
    term: 'ASME B31.8S',
    definition:
      'ASME B31.8S is the standard governing the management of integrity for gas transmission pipeline systems, widely used in the United States and referenced internationally, including in India, as a framework for structuring an integrity management programme - covering threat identification and categorisation, risk assessment, and inspection interval planning. It organises pipeline threats into named categories (such as time-dependent, stable, and time-independent threats), which is the categorisation scheme most gas-pipeline integrity engineers already think in.',
  },
  {
    term: 'Integrity Management System',
    abbr: 'IMS',
    definition:
      'An Integrity Management System is the documented, auditable programme an operator runs to identify pipeline threats, assess and prioritise risk, plan and execute inspection and mitigation, and record the outcomes - the organisational structure that standards like ASME B31.8S and frameworks like API 580/581 sit inside. Indian regulatory guidance, including PNGRB\'s pipeline safety requirements, uses "Integrity Management System" as the formal term for this programme, alongside related requirements such as HAZOP studies, Quantitative Risk Assessment (QRA), and Emergency Response Plans.',
  },
  {
    term: 'Geographical Area',
    abbr: 'GA',
    definition:
      'A Geographical Area, in Indian City Gas Distribution regulation, is a defined administrative and geographic zone that PNGRB authorises a specific CGD entity to develop and operate gas distribution infrastructure within, typically covering one or more districts. GA authorisation is the regulatory unit City Gas Distribution licensing, build-out obligations, and integrity reporting are all organised around, which is why it appears constantly in PNGRB filings and CGD operator documentation even though it rarely gets explained outside that regulatory context.',
  },
  {
    term: 'PESO',
    abbr: 'Petroleum and Explosives Safety Organisation',
    definition:
      'PESO is India\'s regulatory authority for the safe handling, storage, and transport of explosives, petroleum, and compressed gases, including licensing requirements relevant to hazardous-area operations at oil and gas facilities. Any technology - drone or otherwise - operating in or near a PESO-licensed hazardous area is subject to that facility\'s safety requirements; a vendor should always be asked directly what PESO-relevant approvals or exemptions apply to their specific operating context, since general drone regulation and hazardous-area explosives regulation are separate regimes.',
  },
];
