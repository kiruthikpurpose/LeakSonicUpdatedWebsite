/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://leaksonic.com';

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  // API routes and standalone XML feed routes should not be listed as pages.
  exclude: ['/api/*', '/blog/feed.xml', '/news-sitemap.xml'],
  robotsTxtOptions: {
    // Explicitly welcome AI answer-engine crawlers (GEO/AEO) - we WANT to be
    // cited by them - alongside the standard allow-all policy.
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
    ],
    additionalSitemaps: [`${siteUrl}/sitemap.xml`, `${siteUrl}/news-sitemap.xml`],
  },
  transform: async (config, path) => {
    // Give the most authoritative, highest-intent pages top priority.
    const highest = ['/', '/platform', '/research'];
    const high = [
      '/blog',
      '/resources/glossary',
      '/resources/faq',
      '/solutions/pipeline-operators',
      '/solutions/refinery-operators',
      '/solutions/government-agencies',
      '/solutions/researchers',
      '/tools',
      '/tools/inspection-cost-calculator',
      '/tools/reporting-readiness-assessment',
      '/tools/inspection-priority-score',
      '/tools/corrosion-remaining-life-calculator',
      '/tools/mission-coverage-planner',
      '/tools/methane-emissions-value-estimator',
    ];
    const isBlogPost = path.startsWith('/blog/') && path !== '/blog';
    let priority = config.priority;
    let changefreq = config.changefreq;
    if (highest.includes(path)) {
      priority = 1.0;
      changefreq = 'daily';
    } else if (high.includes(path) || isBlogPost) {
      priority = 0.85;
      changefreq = 'weekly';
    }
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
