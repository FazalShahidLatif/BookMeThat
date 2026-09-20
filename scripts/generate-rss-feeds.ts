import fs from 'fs';
import path from 'path';
import { ARTICLES } from '../src/data/articles';

const distPath = path.resolve(process.cwd(), 'dist');

// Ensure dist/feed/ directory exists
const feedDir = path.join(distPath, 'feed');
if (!fs.existsSync(feedDir)) {
  fs.mkdirSync(feedDir, { recursive: true });
}

// Helper: escape XML special characters
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Helper: format date as RFC 822 (required by RSS 2.0)
function rssDate(date: Date): string {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const padded = (n: number) => String(n).padStart(2, '0');
  return `${padded(date.getDate())} ${months[date.getMonth()]} ${date.getFullYear()} ${padded(date.getHours())}:${padded(date.getMinutes())}:00 +0000`;
}

// Build one <item> entry for an article
function articleToRssItem(article: (typeof ARTICLES)[0], baseUrl: string): string {
  const link = `${baseUrl}/${article.slug}`;
  const desc = (article.metaDescription || article.summary || '').substring(0, 150);
  return `
    <item>
      <title><![CDATA[${article.metaTitle || article.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${escapeXml(desc)}]]></description>
      <pubDate>${rssDate(new Date())}</pubDate>
      <category>${article.silo}</category>
      <author>accts.pak@gmail.com (BookMeThat)</author>
    </item>`;
}

// Build one <item> for the homepage
function homeRssItem(baseUrl: string): string {
  return `
    <item>
      <title>BookMeThat — Travel Deals: eSIM, Car Rental, Flight Compensation & More (2026)</title>
      <link>${baseUrl}/</link>
      <guid isPermaLink="true">${baseUrl}/</guid>
      <description><![CDATA[Compare and book direct eSIM data, budget car rentals, and claim flight delay compensation up to €600. Verified deals from Saily, Airalo, Localrent, Expedia & more.]]></description>
      <pubDate>${rssDate(new Date())}</pubDate>
      <category>overview</category>
      <author>accts.pak@gmail.com (BookMeThat)</author>
    </item>`;
}

function generateRssFeed(baseUrl: string, filename: string, filterSilo?: string): void {
  const articles = filterSilo
    ? ARTICLES.filter(a => a.silo === filterSilo)
    : ARTICLES;

  const items = [
    homeRssItem(baseUrl),
    ...articles.map(a => articleToRssItem(a, baseUrl))
  ].join('\n');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>BookMeThat — Travel Deals, eSIM & Car Rental Comparisons</title>
    <link>${baseUrl}</link>
    <description>Compare and book direct eSIM data plans, budget car rentals, and claim flight delay compensation up to €600. Verified deals from Saily, Airalo, Localrent, Expedia and more — no broker markups.</description>
    <language>en</language>
    <managingEditor>accts.pak@gmail.com (BookMeThat)</managingEditor>
    <webMaster>accts.pak@gmail.com (BookMeThat)</webMaster>
    <lastBuildDate>${rssDate(new Date())}</lastBuildDate>
    <atom:link href="${baseUrl}/${filename}" rel="self" type="application/rss+xml"/>
    <ttl>60</ttl>
    <image>
      <url>${baseUrl}/favicon.png</url>
      <title>BookMeThat</title>
      <link>${baseUrl}</link>
    </image>
    <docs>http://www.rssboard.org/rss-specification</docs>
    <generator>BookMeThat Publishing Engine</generator>
${items}
  </channel>
</rss>`;

  const outPath = path.join(distPath, filename);
  fs.writeFileSync(outPath, feed);
  console.log(`RSS feed generated: ${outPath} (${articles.length} articles + homepage)`);
}

// Always generate the main feed
generateRssFeed('https://www.bookmethat.com', 'feed.xml');

// Generate category-specific feeds
generateRssFeed('https://www.bookmethat.com', 'feed/connectivity.xml', 'connectivity');
generateRssFeed('https://www.bookmethat.com', 'feed/transport.xml', 'transport');
generateRssFeed('https://www.bookmethat.com', 'feed/booking.xml', 'booking');
generateRssFeed('https://www.bookmethat.com', 'feed/utility.xml', 'utility');

console.log('All RSS feeds generated successfully.');
