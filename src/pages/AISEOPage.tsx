import React from 'react';
import { Shield, Lock, FileText, BadgeCheck, Mail, Send, Check, Cpu, Globe, Users, Clock, AlertTriangle, Scale, Eye, Cookie, Database, Server, MapPin, Phone, Building2, Cpu } from 'lucide-react';

interface AISEOPageProps {
  backLink?: boolean;
}

export default function AISEOPage({ backLink = false }: AISEOPageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white border border-[#E5E5E1] rounded-none overflow-hidden">
        <div className="bg-[#F8F7F2] p-4 md:p-6 border-b border-[#E5E5E1]">
          <div className="flex items-center gap-3">
            <Cpu className="w-6 h-6 text-[#B84200]" />
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold italic text-[#1A1A1A]">AI SEO Policy</h1>
              <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Last Updated: October 28, 2026</p>
            </div>
          </div>
        </div>
        <div className="p-6 md:p-10 text-sm text-[#1A1A1A]">
          <p className="text-gray-700 font-sans">
            This policy describes how <strong>bookmethat.com</strong> (BookMeThat) approaches <strong>Artificial Intelligence Search Optimization (AI SEO)</strong> to ensure our content is discoverable, accessible, and trustworthy across both traditional search engines and AI-powered information retrieval systems (LLM engines, AI Overviews, AI chat assistants, and featured snippet databases).
          </p>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">1. Purpose of This Policy</h3>
          <p className="text-xs text-gray-500">
            As AI-powered search tools (Google AI Overviews, ChatGPT, Gemini, Perplexity, Claude, etc.) become primary sources of travel information, we must ensure our content is structured, crawlable, and referenceable by both human users and machine-learning systems. This policy defines our approach to AI SEO.
          </p>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">2. Key Principles</h3>
          <ul className="text-xs text-gray-600 list-disc list-inside space-y-2 pl-2">
            <li><strong>Accuracy:</strong> All travel information is fact-checked against official airline, rail, and service provider data before publication.</li>
            <li><strong>Transparency:</strong> All affiliate links and commercial relationships are clearly disclosed (see Affiliate Disclosure policy).</li>
            <li><strong>Accessibility:</strong> Content is written in plain language, structured with clear headings, and supported by structured data.</li>
            <li><strong>Completeness:</strong> Articles provide comprehensive coverage of each topic, answering the primary question and related sub-questions.</li>
            <li><strong>Regular Updates:</strong> Content is reviewed and updated quarterly to reflect current pricing, policies, and network availability.</li>
          </ul>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">3. Technical Compliance</h3>
          <ul className="text-xs text-gray-600 list-disc list-inside space-y-2 pl-2">
            <li><strong>Structured Data:</strong> JSON-LD markup implemented on all content pages for Article, FAQ, BreadcrumbList, and Organization schemas.</li>
            <li><strong>Crawlability:</strong> All pages are indexable (no noindex tags on commercial pages). Sitemap.xml is auto-generated and submitted to Google via Indexing API.</li>
            <li><strong>Performance:</strong> Page load times optimized for both humans and AI crawlers. All images use descriptive alt text.</li>
            <li><strong>Mobile-First:</strong> All pages responsive and function correctly on 320px–1920px viewports.</li>
          </ul>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">4. Content Architecture</h3>
          <p className="text-xs text-gray-500">
            Our content follows a hub-and-spoke model:
          </p>
          <ul className="text-xs text-gray-600 list-disc list-inside space-y-2 pl-2">
            <li><strong>Pillar Pages:</strong> Long-form, comprehensive guides (e.g., "Best eSIM for USA 2026," "Complete Trip to Europe") — cover 20,000+ search volume terms.</li>
            <li><strong>Hub Pages:</strong> Category pages that link to related articles and cross-promote pillar pages.</li>
            <li><strong>Spoke Pages:</strong> Focused articles targeting specific keywords (e.g., "Best eSIM for Japan 2026").</li>
            <li><strong>Journey Pages:</strong> Multi-step trip planning guides that chain multiple commission points per booking (e.g., flights → eSIM → car rental → luggage → tours → insurance).</li>
          </ul>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">5. AI Visibility Strategy</h3>
          <ul className="text-xs text-gray-600 list-disc list-inside space-y-2 pl-2">
            <li><strong>Answer-First Content:</strong> Every article begins with a direct, plain-language answer to the primary search query, optimised for AI overview extraction.</li>
            <li><strong>Table Data:</strong> Comparison tables use semantic HTML with proper header cells for AI parsers to extract.</li>
            <li><strong>Structured Lists:</strong> Step-by-step instructions use <code>ol</code>/<code>li</code> tags for easy step extraction.</li>
            <li><strong>Indicated Citations:</strong> Affiliate partners, prices, and coverage data include source attribution where possible.</li>
          </ul>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">6. Monitoring & Maintenance</h3>
          <ul className="text-xs text-gray-600 list-disc list-inside space-y-2 pl-2">
            <li>Monthly GSC (Google Search Console) review to identify indexing and CTR issues.</li>
            <li>Quarterly content refresh cycle for all pillar and hub pages.</li>
            <li>Ongoing monitoring of AI Overview citations and featured snippet capture for top-performing pages.</li>
          </ul>

          <div className="mt-8 pt-6 border-t border-[#E5E5E1]">
            <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">Legal Pages</p>
            <ul className="space-y-1.5 text-xs text-gray-500">
              <li><a href="/privacy-policy" className="hover:text-brand-orange transition inline-flex items-center gap-1">← Back to Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-brand-orange transition inline-flex items-center gap-1">Terms of Service →</a></li>
              <li><a href="/impressum" className="hover:text-brand-orange transition inline-flex items-center gap-1">Impressum &amp; Contact →</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}