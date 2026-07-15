/**
 * Single source of truth for brand, contact, and navigation data.
 * Company: LeakSonic Private Limited. Product: Sentrix.
 */

export const SITE = {
  name: 'LeakSonic',
  legalName: 'LeakSonic Private Limited',
  product: 'Sentrix',
  // Product category - Sentrix is a software and hardware decision-intelligence
  // platform, not a flight service. The drone is one input among several.
  category: 'Engineering Decision Intelligence Platform (Software & Hardware)',
  // Positioning spine - reused verbatim across the site and in structured data.
  // Covers the full range of oil and gas inspection applications we work
  // across - pipeline corridors (including City Gas Distribution networks,
  // our core focus today), refineries, terminals, and offshore platforms.
  positioning:
    'Sentrix reduces the engineering effort required to validate, compare, prioritise, and report inspection findings across oil and gas infrastructure - gas pipeline and City Gas Distribution networks, refineries, terminals, and offshore platforms - combining proprietary decision-intelligence software with the hardware systems that capture evidence, so raw inspection data becomes standardised, decision-ready engineering intelligence inside the workflows operators already use.',
  // Shorter form for meta descriptions and cards (~150 chars).
  shortPositioning:
    'Sentrix combines proprietary decision-intelligence software with drone hardware to turn raw inspection evidence into standardised, decision-ready engineering intelligence across oil and gas infrastructure.',
  tagline: 'Engineering decision intelligence for oil and gas inspection.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://leaksonic.com',
  // Contact routing
  email: 'contact@leaksonic.com',
  emailResearch: 'research@leaksonic.com',
  emailPartners: 'partners@leaksonic.com',
  emailPress: 'press@leaksonic.com',
  // Registered address
  address: {
    org: 'LeakSonic Private Limited',
    line1: 'AIC RAISE Incubation Centre',
    line2: 'Madukkarai Road, Eachanari',
    city: 'Coimbatore',
    postalCode: '641021',
    region: 'Tamil Nadu',
    country: 'India',
    countryCode: 'IN',
  },
  founding: {
    place: 'Coimbatore, Tamil Nadu, India',
    year: '2025',
  },
  // Founder - first name is already public (About page, photo credit).
  founder: {
    name: 'Kiruthik',
    role: 'Founder',
  },
  // Topics the company is authoritative on - a strong topical-authority signal
  // for AI answer engines resolving "who works on X" style queries (GEO/AEO).
  knowsAbout: [
    'Pipeline integrity management',
    'Gas pipeline inspection',
    'Oil and gas pipeline inspection',
    'Engineering decision intelligence',
    'Drone-based pipeline inspection',
    'Drone inspection for oil and gas',
    'Refinery inspection',
    'Static equipment inspection',
    'Rope access alternative',
    'Scaffolding inspection alternative',
    'Industrial asset inspection drone',
    'Fired heater inspection',
    'Pressure vessel inspection',
    'BVLOS drone operations',
    'Methane leak detection',
    'Fugitive emissions monitoring',
    'Risk-based inspection',
    'Cathodic protection',
    'Pipeline corrosion',
    'Corrosion under insulation',
    'Right-of-way encroachment monitoring',
    'Inspection data governance',
    'PNGRB integrity reporting',
    'OGMP 2.0 methane reporting',
    'Inline inspection',
    'Pipeline pigging',
    'Storage tank inspection',
    'Offshore asset integrity',
    'City gas distribution',
    'LNG infrastructure',
    'Hydrogen pipeline integrity',
    'Pipeline geohazards',
    'Change detection for infrastructure inspection',
    'Sensor fusion for infrastructure monitoring',
    'Industrial AI for asset integrity',
    'Decision intelligence software',
    'Drone hardware integration',
    'Dual-use inspection technology',
  ],
  // Industry standards and frameworks the platform is designed to align with -
  // the language a major operator's integrity department speaks. Standards
  // bodies and frameworks only; no vendors or classification-society names.
  standards: [
    { code: 'API 1160', desc: 'Managing System Integrity for Hazardous Liquid Pipelines' },
    { code: 'ASME B31.8S', desc: 'Managing System Integrity of Gas Pipelines' },
    { code: 'ISO 55000', desc: 'Asset management systems' },
    { code: 'PNGRB T4S', desc: 'India pipeline integrity & reporting requirements' },
    { code: 'OGMP 2.0', desc: 'Measurement-based methane reporting framework' },
  ],
  socials: {
    linkedin: 'https://www.linkedin.com/company/leaksonic',
    youtube: 'https://www.youtube.com/@LeakSonic',
    x: 'https://x.com/LeakSonic',
    instagram: 'https://www.instagram.com/leaksonic',
    facebook: 'https://www.facebook.com/LeakSonicOfficial',
  },
} as const;

export type NavChild = { label: string; href: string; description?: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

// Six top-level items, per brief.
export const NAV_LINKS: NavItem[] = [
  { label: 'Platform', href: '/platform' },
  {
    label: 'Tools',
    href: '/tools',
    children: [
      {
        label: 'Inspection Cost & ROI Calculator',
        href: '/tools/inspection-cost-calculator',
        description: 'Estimate hours and cost a prioritised workflow could save',
      },
      {
        label: 'Reporting Readiness Assessment',
        href: '/tools/reporting-readiness-assessment',
        description: 'Five questions, an instant readiness band',
      },
      {
        label: 'Inspection Priority Score',
        href: '/tools/inspection-priority-score',
        description: 'Estimate relative priority from five risk factors',
      },
      {
        label: 'Corrosion Rate & Remaining Life',
        href: '/tools/corrosion-remaining-life-calculator',
        description: 'Compute corrosion rate and a suggested inspection interval',
      },
    ],
  },
  {
    label: 'Solutions',
    href: '/solutions/pipeline-operators',
    children: [
      {
        label: 'Pipeline Operators',
        href: '/solutions/pipeline-operators',
        description: 'For gas transmission and distribution operators',
      },
      {
        label: 'Refinery & Industrial',
        href: '/solutions/refinery-operators',
        description: 'For refinery, terminal, and plant inspection teams',
      },
      {
        label: 'Government & Agencies',
        href: '/solutions/government-agencies',
        description: 'For regulators, incubators and grant programs',
      },
      {
        label: 'Researchers',
        href: '/solutions/researchers',
        description: 'For academic and industrial collaborators',
      },
      {
        label: 'Defence & Dual-Use',
        href: '/solutions/defense-dual-use',
        description: 'Long-term exploratory direction, not a current engagement',
      },
    ],
  },
  { label: 'Approach', href: '/research' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

// Full sitemap for the footer.
export const FOOTER_COLUMNS: { title: string; links: NavChild[] }[] = [
  {
    title: 'Platform',
    links: [
      { label: 'Platform overview', href: '/platform' },
      { label: 'Approach', href: '/research' },
      { label: 'Case studies', href: '/case-studies' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Pipeline operators', href: '/solutions/pipeline-operators' },
      { label: 'Refinery & industrial', href: '/solutions/refinery-operators' },
      { label: 'Government & agencies', href: '/solutions/government-agencies' },
      { label: 'Researchers', href: '/solutions/researchers' },
      { label: 'Defence & dual-use', href: '/solutions/defense-dual-use' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Glossary', href: '/resources/glossary' },
      { label: 'FAQ', href: '/resources/faq' },
      { label: 'Reports', href: '/resources/reports' },
      { label: 'Free tools', href: '/tools' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Press', href: '/press' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy', href: '/privacy' },
    ],
  },
];

export const CONTACT_SEGMENTS = [
  {
    id: 'operator',
    label: 'Pipeline operator / industry partner',
    responseNote: 'We respond to operator inquiries within 2 business days.',
  },
  {
    id: 'government',
    label: 'Government program / incubator / funding body',
    responseNote: 'We respond to program and agency inquiries within 3 business days.',
  },
  {
    id: 'research',
    label: 'Researcher / academic',
    responseNote: 'We respond to research inquiries within 3 business days.',
  },
  {
    id: 'investor',
    label: 'Investor',
    responseNote: 'We respond to investor inquiries within 3 business days.',
  },
] as const;

export type ContactSegmentId = (typeof CONTACT_SEGMENTS)[number]['id'];
