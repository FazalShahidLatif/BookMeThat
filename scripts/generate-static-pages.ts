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
    title: 'Direct Local Car Rentals & Scooter Deals (No Deposit) | BookMeThat',
    description: 'Compare Localrent, QEEQ, Auto Europe, and GetTransfer car hires. Guarantee exact vehicle models with zero credit card deposits.'
  },
  {
    path: 'esim',
    title: 'Best Travel eSIM Card Deals 2026 (Saily, Airalo & Yesim) | BookMeThat',
    description: 'Compare Saily, Airalo, Holafly, and Yesim data rates. Get instant 5G activation and verified discount vouchers across 150+ countries.'
  },
  {
    path: 'flights',
    title: 'EU261 Flight Delay Compensation & Claim Calculator | BookMeThat',
    description: 'Claim up to €600 ($650) for delayed, overbooked, or canceled flights under EU261 & US DOT laws with AirHelp and Compensair.'
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

console.log(`Successfully generated static HTML pages for ${pages.length} routes.`);
