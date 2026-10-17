import fs from 'fs';

import path from 'path';

import { ARTICLES } from '../src/data/articles';



const distPath = path.resolve(process.cwd(), 'dist');

const templatePath = path.join(distPath, 'index.html');



if (!fs.existsSync(templatePath)) {

  console.log('No dist/index.html found, skipping static generation.');

  process.exit(0);

}



const template = fs.readFileSync(templatePath, 'utf-8');



const pages: Array<{ path: string; title: string; description: string; noindex?: boolean }> = [

  {

    path: 'planner',

    title: 'Travel Budget Planner & Vacation Estimator 2026 | BookMeThat',

    description: 'Design custom travel itineraries and calculate real-time savings on regional cellular eSIM data, local car rentals, and airport transfers.'

  },

  {

    path: 'car-rental',

    title: 'Car Rental With No Deposit 2026: Compare Zero-Hold Companies | BookMeThat',

    description: 'Avoid the €3,000 card hold. Compare Localrent, QEEQ and Auto Europe car hire and find rentals with no credit card deposit at all.'

  },

  {

    path: 'esim',

    title: 'Cheap Travel eSIM Deals 2026: Compare Saily, Airalo & Yesim | BookMeThat',

    description: 'Compare cheap eSIM data plans for your destination. Real prices, real speeds and working discount codes for 150+ countries — updated every month.'

  },

  {

    path: 'flights',

    title: 'Flight Delay Compensation 2026: Claim Up To €600 Free | BookMeThat',

    description: 'Claim up to €600 for a delayed or canceled flight. Check your eligibility in 30 seconds and learn how to claim free under EU261, UK261 and US DOT rules.'

  },

  {

    path: 'about',

    title: 'Regulatory Compliance, FTC & Privacy Terms | BookMeThat',

    description: 'Publisher terms, GDPR-compliant privacy policy, FTC affiliate disclosures, and editorial guidelines for BookMeThat services.'

  },

  {

    path: 'contact',

    title: 'Contact Editorial Desk & Publisher Information | BookMeThat',

    description: 'Contact BookMeThat editorial staff, partnership representatives, and corporate headquarters.'

  },

  {

    path: 'privacy',

    title: 'Privacy Policy & Data Rights | BookMeThat',

    description: 'Comprehensive GDPR, CCPA, and global privacy policy for BookMeThat visitors and customers.'

  },

  {

    path: 'terms',

    title: 'Terms of Service & Usage Agreement | BookMeThat',

    description: 'Review the official terms of service and conditions governing your access to BookMeThat travel resources.'

  },

  {

    path: 'ai-seo',

    title: 'AI Travel Route Planner & SEO Engine | BookMeThat',

    description: 'AI-assisted travel itinerary builder for flights, accommodations, and transit hubs with real-time saving hacks.',

    noindex: true

  },

  {

    path: 'heatmap',

    title: 'Global Travel Intelligence & Deal Heatmap | BookMeThat',

    description: 'Real-time interactive matrix comparing regional eSIM speeds, rental car deposit rules, and flight compensation win-rates.',

    noindex: true

  },

  {

    path: 'challenge',

    title: 'Interactive Travel IQ Quiz & Safety Checklist | BookMeThat',

    description: 'Test your knowledge on flight passenger compensation rights, eSIM coverage, and rental car deposit secrets.',

    noindex: true

  },

  {

    path: 'faq',

    title: 'Frequently Asked Questions & Travel Guide | BookMeThat',

    description: 'Answers to common questions about buying direct eSIMs, rental car zero deposit policies, and claiming flight delay compensation.'

  }

];



// Pages that must never appear in search results. The client-side check in

// App.tsx is invisible to crawlers, so it has to be stamped here too — these

// pages were ranking on page 1 for our own commercial keywords and pulling

// visitors away from pages that actually sell something.

const NOINDEX_PREFIXES = ['travelpayouts-', 'utm', 'ai-seo', 'heatmap', 'challenge'];

const isNoIndex = (path: string) =>

  NOINDEX_PREFIXES.some((p) => path === p || path.startsWith(p));



// Add all articles

for (const art of ARTICLES) {

  const slug = art.slug.toLowerCase();

  pages.push({

    path: slug,

    title: art.metaTitle || `${art.title} | BookMeThat`,

    description: art.metaDescription || art.summary || 'Comprehensive travel analysis and insider booking advice from BookMeThat.',

    noindex: isNoIndex(slug)

  });

}



// Generate an index.html for each page

for (const page of pages) {

  const pageDir = path.join(distPath, page.path);

  if (!fs.existsSync(pageDir)) {

    fs.mkdirSync(pageDir, { recursive: true });

  }



  const canonicalUrl = `https://www.bookmethat.com/${page.path}`;

  let html = template;



  html = html.replace(/<title>[\s\S]*?<\/title>/gi, `<title>${page.title}</title>`);

  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/gi, `<link rel="canonical" href="${canonicalUrl}" />`);

  html = html.replace(/<link\s+rel="alternate"\s+hreflang="([^"]*)"\s+href="[^"]*"\s*\/?>/gi, `<link rel="alternate" hreflang="$1" href="${canonicalUrl}" />`);

  html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/gi, `<meta name="description" content="${page.description}" />`);

  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/gi, `<meta property="og:title" content="${page.title}" />`);

  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/gi, `<meta property="og:description" content="${page.description}" />`);

  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/gi, `<meta property="og:url" content="${canonicalUrl}" />`);

  html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/gi, `<meta name="twitter:title" content="${page.title}" />`);

  html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/gi, `<meta name="twitter:description" content="${page.description}" />`);

  html = html.replace(/<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/gi, `<meta name="twitter:url" content="${canonicalUrl}" />`);



  if (page.noindex) {

    html = html.replace(

      /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/gi,

      '<meta name="robots" content="noindex, nofollow, noarchive" />'

    );

  }



  fs.writeFileSync(path.join(pageDir, 'index.html'), html, 'utf-8');

}



// Ensure ai-catalog.json and .well-known files are present in dist

const publicCatalogPath = path.resolve(process.cwd(), 'public', 'ai-catalog.json');

if (fs.existsSync(publicCatalogPath)) {

  const distWellKnown = path.join(distPath, '.well-known');

  if (!fs.existsSync(distWellKnown)) {

    fs.mkdirSync(distWellKnown, { recursive: true });

  }

  const catalogData = fs.readFileSync(publicCatalogPath, 'utf-8');

  fs.writeFileSync(path.join(distPath, 'ai-catalog.json'), catalogData, 'utf-8');

  fs.writeFileSync(path.join(distPath, 'ard.json'), catalogData, 'utf-8');

  fs.writeFileSync(path.join(distWellKnown, 'ai-catalog.json'), catalogData, 'utf-8');

  fs.writeFileSync(path.join(distWellKnown, 'ard.json'), catalogData, 'utf-8');

  console.log('Successfully mirrored ai-catalog.json and .well-known manifests to dist directory.');

}



console.log(`Successfully generated static HTML pages for ${pages.length} routes.`);

// ============================================================
// Sitemap generation
// ------------------------------------------------------------
// Derived from the same `pages` array as the static HTML, so a
// new article is included automatically. Previously this file was
// edited by hand and new pages were silently missed.
// Image tags are carried over from the previous sitemap so the
// existing image SEO is preserved.
// ============================================================
const SITEMAP_PATH = path.resolve(process.cwd(), 'public', 'sitemap.xml');

const imageByUrl: Record<string, string> = {};
if (fs.existsSync(SITEMAP_PATH)) {
  const prev = fs.readFileSync(SITEMAP_PATH, 'utf-8');
  for (const m of prev.matchAll(/<url>\s*<loc>([^<]+)<\/loc>([\s\S]*?)<\/url>/g)) {
    const img = m[2].match(/<image:image>[\s\S]*?<\/image:image>/);
    if (img) imageByUrl[m[1].trim()] = img[0];
  }
}

// The homepage is not part of `pages` (it is the Vite entrypoint), so it is
// emitted explicitly and kept first.
const today = new Date().toISOString().slice(0, 10);
const homeImg = imageByUrl['https://www.bookmethat.com/'];
const homeEntry = [
  '  <url>',
  '    <loc>https://www.bookmethat.com/</loc>',
  `    <lastmod>${today}</lastmod>`,
  '    <changefreq>daily</changefreq>',
  '    <priority>1.0</priority>',
  ...(homeImg ? ['    ' + homeImg] : []),
  '  </url>'
].join('\n');

const sitemapEntries = [
  homeEntry,
  ...pages
    .filter((pg) => !pg.noindex)
    .map((pg) => {
      const loc = `https://www.bookmethat.com/${pg.path}`;
      const img = imageByUrl[loc];
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        '    <changefreq>weekly</changefreq>',
        '    <priority>0.8</priority>',
        ...(img ? ['    ' + img] : []),
        '  </url>'
      ].join('\n');
    })
].join('\n\n');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries}
</urlset>
`;

fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemapXml, 'utf-8');
fs.writeFileSync(SITEMAP_PATH, sitemapXml, 'utf-8');
console.log(`Generated sitemap.xml with ${pages.filter((pg) => !pg.noindex).length} indexable URLs.`);
