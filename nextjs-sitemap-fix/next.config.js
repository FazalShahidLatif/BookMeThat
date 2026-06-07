/**
 * Next.js Production Configuration
 * File Path: next.config.js
 * 
 * DESCRIPTION:
 * Guarantees that /sitemap.xml is delivered with correct headers to avoid gzip corruption or encoding mismatches.
 * Forces the 'Content-Encoding: identity' header to explicitly prevent CDN proxies (like Cloudflare Pages) from 
 * double gzipping or triple-compressing the XML response body. Corrects indexation status in Google Search Console.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            // Crucial fix: overrides Cloudflare double-compression issues by forcing identity transport
            key: 'Content-Encoding',
            value: 'identity',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
