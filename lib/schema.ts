import { SITE } from './site';

// JSON-LD builders. Rendered via the <JsonLd> component.

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.legalName,
    // Brand variants people actually search - helps entity resolution for
    // "Leak Sonic" / product-name queries in search and AI answer engines.
    alternateName: [SITE.name, 'Leak Sonic', 'LeakSonic Technologies', `Sentrix by ${SITE.name}`],
    url: SITE.url,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE.url}/LeakSonicLogo.png`,
    },
    image: `${SITE.url}/LeakSonicLogo.png`,
    description: SITE.positioning,
    slogan: SITE.tagline,
    foundingDate: SITE.founding.year,
    foundingLocation: SITE.founding.place,
    founder: {
      '@type': 'Person',
      name: SITE.founder.name,
      jobTitle: SITE.founder.role,
    },
    knowsAbout: SITE.knowsAbout,
    keywords: SITE.knowsAbout.join(', '),
    // Industry classification helps AI/answer engines place the company.
    naics: '541715',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
      addressLocality: SITE.address.city,
      postalCode: SITE.address.postalCode,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.countryCode,
    },
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'Place', name: 'Global oil and gas infrastructure' },
    ],
    email: SITE.email,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'Partnerships',
        email: SITE.emailPartners,
        areaServed: 'Worldwide',
        availableLanguage: ['en'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'Research',
        email: SITE.emailResearch,
        areaServed: 'Worldwide',
        availableLanguage: ['en'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'Media',
        email: SITE.emailPress,
        areaServed: 'Worldwide',
        availableLanguage: ['en'],
      },
    ],
    award: [
      'National winner, Smart India Hackathon 2025',
      'DPIIT-recognised startup under Startup India',
      'MSME-registered deep-tech company',
    ],
    sameAs: Object.values(SITE.socials),
  };
}

/**
 * Service schema - the commercial offering, distinct from the SoftwareApplication
 * entity. Helps answer engines and search resolve "pipeline inspection software /
 * service" commercial-intent queries and connect them to the organization.
 */
export function serviceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE.url}/#service`,
    name: 'Oil and gas inspection decision intelligence',
    serviceType: 'Engineering decision intelligence for pipeline and refinery inspection',
    description: SITE.shortPositioning,
    provider: { '@id': `${SITE.url}/#organization` },
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'Place', name: 'Global oil and gas infrastructure' },
    ],
    audience: {
      '@type': 'Audience',
      audienceType:
        'Gas pipeline operators, refinery and industrial plant operators, integrity engineers, regulators',
    },
    url: `${SITE.url}/platform`,
  };
}

/** Person schema for the founder - E-E-A-T signal, rendered on /about. */
export function founderSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE.url}/#founder`,
    name: SITE.founder.name,
    jobTitle: SITE.founder.role,
    worksFor: { '@id': `${SITE.url}/#organization` },
    knowsAbout: SITE.knowsAbout.slice(0, 8),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    publisher: { '@id': `${SITE.url}/#organization` },
    inLanguage: 'en',
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: new URL(c.path, SITE.url).toString(),
    })),
  };
}

type ArticleArgs = {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
  author: string;
  image?: string;
  section?: string;
  keywords?: string[];
  wordCount?: number;
};

export function articleSchema({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  author,
  image,
  section,
  keywords,
  wordCount,
}: ArticleArgs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished,
    dateModified,
    inLanguage: 'en',
    isAccessibleForFree: true,
    author: {
      '@type': 'Organization',
      name: author,
      url: SITE.url,
    },
    publisher: { '@id': `${SITE.url}/#organization` },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE.url}/blog/${slug}`,
    },
    ...(section ? { articleSection: section } : {}),
    ...(keywords && keywords.length ? { keywords: keywords.join(', ') } : {}),
    ...(wordCount ? { wordCount } : {}),
    ...(image ? { image: new URL(image, SITE.url).toString() } : {}),
  };
}

export type FaqItem = { question: string; answer: string };

export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'en',
    // Speakable marks the FAQ as suitable for voice/assistant answers (AEO).
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', 'h3'],
    },
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/**
 * Describes Sentrix as a product/application entity - the schema type AI
 * answer engines and shopping/product-aware search surfaces look for when
 * resolving "what is Sentrix" style queries. Rendered on the homepage and
 * /platform.
 */
export function softwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${SITE.url}/#sentrix`,
    name: SITE.product,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory:
      'Engineering Decision Intelligence Platform for Pipeline and Refinery Inspection',
    operatingSystem: 'Web',
    description: SITE.positioning,
    url: `${SITE.url}/platform`,
    provider: { '@id': `${SITE.url}/#organization` },
    audience: {
      '@type': 'Audience',
      audienceType:
        'Gas pipeline operators, refinery and industrial plant operators, integrity engineers, regulators',
    },
  };
}

/**
 * Describes a free, client-side calculator/tool page as a WebApplication -
 * the schema type answer engines look for when resolving "is there a tool
 * for X" queries (AEO/GEO). Paired with faqSchema on the same page.
 */
export function toolSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: new URL(path, SITE.url).toString(),
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    provider: { '@id': `${SITE.url}/#organization` },
  };
}

export type ListedItem = { name: string; path: string; description?: string };

/** Generic ItemList schema for index pages (blog, glossary, resources). */
export function itemListSchema(items: ListedItem[], listName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: new URL(item.path, SITE.url).toString(),
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}
