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

const pages: Array<{ path: string; title: string; description: string }> = [
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
    description: 'AI-assisted travel itinerary builder for flights, accommodations, and transit hubs with real-time saving hacks.'
  },
  {
    path: 'heatmap',
    title: 'Global Travel Intelligence & Deal Heatmap | BookMeThat',
    description: 'Real-time interactive matrix comparing regional eSIM speeds, rental car deposit rules, and flight compensation win-rates.'
  },
  {
    path: 'challenge',
    title: 'Interactive Travel IQ Quiz & Safety Checklist | BookMeThat',
    description: 'Test your knowledge on flight passenger compensation rights, eSIM coverage, and rental car deposit secrets.'
  },
  {
    path: 'faq',
    title: 'Frequently Asked Questions & Travel Guide | BookMeThat',
    description: 'Answers to common questions about buying direct eSIMs, rental car zero deposit policies, and claiming flight delay compensation.'
  }
];

// Add all articles
for (const art of ARTICLES) {
  pages.push({
    path: art.slug.toLowerCase(),
    title: art.metaTitle || `${art.title} | BookMeThat`,
    description: art.metaDescription || art.summary || 'Comprehensive travel analysis and insider booking advice from BookMeThat.'
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
