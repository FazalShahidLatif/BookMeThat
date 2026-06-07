/**
 * Next.js App Router Native Sitemap Generator
 * File Path: app/sitemap.ts
 * 
 * DESCRIPTION:
 * Generates a clean, dynamically structured XML sitemap on-the-fly at runtime using native Next.js MetadataRoute.
 * To avoid gzip double-compression issues common on CDN networks (like Cloudflare Pages), this output is processed
 * without compression and written as standards-compliant XML.
 */

import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bookmethat.com'
  const lastModifiedDate = new Date('2026-06-02') // Matches editor publication updates

  // Strictly maps the precise indexing pages of BookMeThat.com
  const pages = [
    {
      url: '',
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: '/esim',
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: '/car-rental',
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: '/flights',
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: '/about',
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: '/contact',
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  return pages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: lastModifiedDate,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
