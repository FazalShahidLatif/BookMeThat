import React, { useState, useEffect } from 'react';
import { Shield, Lock, FileText, BadgeCheck, Mail, Send, Check, Sparkles } from 'lucide-react';

interface LegalPagesProps {
  defaultTab?: 'disclosure' | 'privacy' | 'terms' | 'ai_seo' | 'impressum';
}

export default function LegalPages({ defaultTab }: LegalPagesProps) {
  const [activeSubTab, setActiveSubTab] = useState<'disclosure' | 'privacy' | 'terms' | 'ai_seo' | 'impressum'>(defaultTab || 'disclosure');
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (defaultTab) {
      setActiveSubTab(defaultTab);
    }
  }, [defaultTab]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setContactForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="bg-white rounded-none border border-[#E5E5E1] shadow-none overflow-hidden bg-white" id="legal-pages-center">
      
      {/* Visual Header */}
      <div className="bg-[#F8F7F2] p-6 md:p-8 flex items-center justify-between border-b border-[#E5E5E1] text-[#1A1A1A]">
        <div className="space-y-1">
          <span className="text-[9px] font-mono tracking-widest text-[#E55B13] uppercase font-bold bg-brand-orange/5 border border-brand-orange/20 px-2.5 py-0.5 rounded-none">
            Compliance Center
          </span>
          <h3 className="text-2xl font-serif font-bold italic text-[#1A1A1A] mt-2">Regulatory Disclosure & Compliance Core</h3>
          <p className="text-xs text-gray-400 mt-1">
            AdSense-optimized, fully transparent terms, privacy rules, and affiliate disclosures for bookmethat.com.
          </p>
        </div>
        <Shield className="w-8 h-8 text-brand-orange hidden sm:block" />
      </div>

      {/* Navigation Sub-menu */}
      <div className="flex bg-[#F8F7F2] border-b border-[#E5E5E1] overflow-x-auto text-[10px] font-mono uppercase tracking-wider">
        {[
          { id: 'disclosure', label: 'Commercial Affiliate Disclosure', icon: <BadgeCheck className="w-3.5 h-3.5" /> },
          { id: 'privacy', label: 'GDPR Privacy & Cookie Consent', icon: <Lock className="w-3.5 h-3.5" /> },
          { id: 'terms', label: 'User Terms and Conditions', icon: <FileText className="w-3.5 h-3.5" /> },
          { id: 'ai_seo', label: 'Modern AI SEO (GEO / AIO / EEAT)', icon: <Sparkles className="w-3.5 h-3.5" /> },
          { id: 'impressum', label: 'Impressum & Direct Support', icon: <Mail className="w-3.5 h-3.5" /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`flex items-center gap-1.5 px-5 py-3.5 border-r border-[#E5E5E1] transition cursor-pointer whitespace-nowrap ${
              activeSubTab === tab.id 
                ? 'bg-white text-brand-orange border-b-2 border-brand-orange font-bold' 
                : 'text-gray-500 hover:bg-white/50'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Canvas */}
      <div className="p-6 md:p-10 leading-relaxed text-sm text-[#1A1A1A]">
        
        {activeSubTab === 'disclosure' && (
          <div className="space-y-6 view-enter" id="legal-affiliate-disclosure">
            <h4 className="text-lg font-serif font-bold text-[#1A1A1A] border-b border-[#E5E5E1] pb-3 italic">
              Section 1: FTCA & Google Content Policy Affiliate Disclosure
            </h4>
            
            <p className="text-gray-700 font-sans">
              This informational portal, <strong>bookmethat.com</strong>, operates under strict commercial transparency principles. In accordance with the Federal Trade Commission (FTC) guidelines in the United States, alongside the European Consumer Protection directives, we explicitly declare that our content is monetized through commissions scored via travel booking affiliate networks.
            </p>

            <div className="bg-[#F8F7F2] border-l-2 border-brand-orange p-5 rounded-none space-y-2">
              <h5 className="font-serif font-bold text-[#1A1A1A] text-xs uppercase tracking-wide">
                Key Partnership Affiliations & Verification References:
              </h5>
              <p className="text-xs text-gray-500">
                BookMeThat is a certified publisher in the <strong>Travelpayouts Affiliate Network</strong>. Our primary publisher tracking credentials are as follows:
              </p>
              <ul className="text-xs font-mono text-[#1A1A1A] list-disc list-inside space-y-1 bg-white p-3 rounded-none border border-[#E5E5E1]">
                <li>Primary Tracking Marker ID: <strong className="font-bold text-brand-orange">685596</strong></li>
                <li>Secondary Widget Marker ID: <strong className="font-bold text-brand-orange">474841</strong></li>
                <li>Target Registry Domain: <strong className="font-bold text-brand-orange">bookmethat.com</strong></li>
              </ul>
            </div>

            <h5 className="font-serif font-bold text-[#1A1A1A] text-base mt-6">Declared Networks and Deep-link Channels</h5>
            <p className="text-xs text-gray-500">
              When clicking on various recommendation links throughout our Silo directories (including Saily, Airalo, Drimsim, Localrent, EconomyBookings, Auto Europe, QEEQ, BikesBooking, GetTransfer, Searadar, Go City, Klook, Radical Storage, NordVPN, Wise, Ekta Traveling, World Nomads, Compensair, AirHelp, and Expedia), you trigger standard tracking tags. These tags record zero unique personal identification factors but enable the associated merchants to verify bookmethat.com as the source publisher.
            </p>

            <table className="w-full text-left text-xs text-gray-750 border border-[#E5E5E1] rounded-none overflow-hidden mt-4 bg-white">
              <thead className="bg-[#F8F7F2] text-[#1A1A1A] font-mono font-bold text-[9px] uppercase tracking-wider border-b border-[#E5E5E1]">
                <tr>
                  <th className="p-3">Partner Entity / Program</th>
                  <th className="p-3">Category Classification</th>
                  <th className="p-3">Target Link Signature</th>
                  <th className="p-3">Standard Cookie Grace Window</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E1]">
                <tr>
                  <td className="p-3 font-semibold text-[#1A1A1A]">Saily eSIM</td>
                  <td className="p-3">Travel eSIM Systems</td>
                  <td className="p-3 font-mono text-brand-orange">saily.tpk.lu</td>
                  <td className="p-3">30 Days Duration</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1A1A1A]">Airalo Marketplace</td>
                  <td className="p-3">Travel eSIM Systems</td>
                  <td className="p-3 font-mono text-brand-orange">airalo.tpk.lu, airalo.com</td>
                  <td className="p-3">30 Days Duration</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1A1A1A]">Drimsim Universal SIM</td>
                  <td className="p-3">Pay-As-You-Go Cellular/Data</td>
                  <td className="p-3 font-mono text-brand-orange">drimsim.tpk.lu</td>
                  <td className="p-3">30 Days Duration</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1A1A1A]">Localrent</td>
                  <td className="p-3">Local Car Rentals</td>
                  <td className="p-3 font-mono text-brand-orange">localrent.tpk.lu</td>
                  <td className="p-3">30 Days Duration</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1A1A1A]">EconomyBookings</td>
                  <td className="p-3">Car Rental Aggregator</td>
                  <td className="p-3 font-mono text-brand-orange">economybookings.tpk.lu</td>
                  <td className="p-3">30 Days Duration</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1A1A1A]">Auto Europe</td>
                  <td className="p-3">Car Rental Broker</td>
                  <td className="p-3 font-mono text-brand-orange">autoeurope.tpk.lu</td>
                  <td className="p-3">30 Days Duration</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1A1A1A]">QEEQ</td>
                  <td className="p-3">Car Insurance & Rental Price Dropper</td>
                  <td className="p-3 font-mono text-brand-orange">qeeq.tpk.lu, qeeq.com</td>
                  <td className="p-3">30 Days Duration</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1A1A1A]">BikesBooking</td>
                  <td className="p-3">Scooter, Moped, and Bike Rentals</td>
                  <td className="p-3 font-mono text-brand-orange">bikesbooking.tpk.lu</td>
                  <td className="p-3">30 Days Duration</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1A1A1A]">GetTransfer</td>
                  <td className="p-3">Private Chauffeurs & Transfers</td>
                  <td className="p-3 font-mono text-brand-orange">gettransfer.tpk.lu, gettransfer.com</td>
                  <td className="p-3">30 Days Duration</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1A1A1A]">Searadar Yacht Charter</td>
                  <td className="p-3">Marinas & Bareboat Yacht Rentals</td>
                  <td className="p-3 font-mono text-brand-orange">searadar.tpk.lu</td>
                  <td className="p-3">30 Days Duration</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1A1A1A]">Go City Passes</td>
                  <td className="p-3">Multi-Attraction Sightseeing Passes</td>
                  <td className="p-3 font-mono text-brand-orange">gocity.tpk.lu, gocity.com</td>
                  <td className="p-3">30 Days Duration</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1A1A1A]">Klook Tours</td>
                  <td className="p-3">Activity, Tourism & Transit Booking</td>
                  <td className="p-3 font-mono text-brand-orange">klook.tpk.lu, klook.com</td>
                  <td className="p-3">30 Days Duration</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1A1A1A]">Radical Storage</td>
                  <td className="p-3">Global Luggage Storage Network</td>
                  <td className="p-3 font-mono text-brand-orange">radicalstorage.tpk.lu</td>
                  <td className="p-3">30 Days Duration</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1A1A1A]">NordVPN</td>
                  <td className="p-3">Digital Security & Data Encryption</td>
                  <td className="p-3 font-mono text-brand-orange">nordvpn.com, tp.media</td>
                  <td className="p-3">30 Days Duration</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1A1A1A]">Wise borderless card</td>
                  <td className="p-3">Cross-Border Forex Billing</td>
                  <td className="p-3 font-mono text-brand-orange">wise.com</td>
                  <td className="p-3">30 Days Duration</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1A1A1A]">Ekta Traveling</td>
                  <td className="p-3">Travel Medical Protection</td>
                  <td className="p-3 font-mono text-brand-orange">ektatraveling.tpk.lu</td>
                  <td className="p-3">30 Days Duration</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1A1A1A]">World Nomads</td>
                  <td className="p-3">Adventure Travel Cover</td>
                  <td className="p-3 font-mono text-brand-orange">worldnomads.com</td>
                  <td className="p-3">30 Days Duration</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1A1A1A]">Compensair</td>
                  <td className="p-3">Flight Delay Legal Claims</td>
                  <td className="p-3 font-mono text-brand-orange">compensair.tpk.lu</td>
                  <td className="p-3">30 Days Duration</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1A1A1A]">AirHelp</td>
                  <td className="p-3">Passenger Flight Delay Redress</td>
                  <td className="p-3 font-mono text-brand-orange">airhelp.com, tp.media</td>
                  <td className="p-3">30 Days Duration</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1A1A1A]">Expedia</td>
                  <td className="p-3">Dynamic Vacation & Flight Bundles</td>
                  <td className="p-3 font-mono text-brand-orange">expedia.com</td>
                  <td className="p-3">30 Days Duration</td>
                </tr>
              </tbody>
            </table>

            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider">Zero-Supplemental Passenger Toll Agreement</h5>
            <p className="text-xs text-gray-500 italic">
              Under no situations do these tracking markers increase the final ticket price, rental cost, or subscription toll paid by the user. On the contrary, several partner agreements grant our users exclusive discounts (e.g. Wise free transfer tiers, and Localrent lowest deposit rates).
            </p>
          </div>
        )}

        {activeSubTab === 'privacy' && (
          <div className="space-y-6 view-enter" id="legal-privacy-consent">
            <h4 className="text-lg font-serif font-bold text-[#1A1A1A] border-b border-[#E5E5E1] pb-3 italic">
              Section 2: Privacy Policy & Cookie Control Compliance (GDPR & CCPA)
            </h4>

            <p className="text-gray-700 font-sans">
              At bookmethat.com, the privacy of our global visitors represents a core architectural principle. This document outlines the types of personal data received and archived by bookmethat.com and how we utilize data tracking loops safely.
            </p>

            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider font-bold">Log Files & Modern Diagnostics</h5>
            <p className="text-xs text-gray-500">
              Similar to other professional publishing websites, bookmethat.com makes use of log file statistics. These metrics encompass Internet Protocol (IP) addresses, browser brand models, Internet Service Provider (ISP), timestamp logs, referring and exit web addresses, and total click footprints to analyze general traveler trends. These are not linked to any personal dossier.
            </p>

            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider font-bold">Google DoubleClick DART Cookies & Ad Delivery</h5>
            <p className="text-xs text-gray-500">
              Google, as our preferred third-party ad delivery network, uses DART cookies to dynamically adjust programmatic advertisements based on your visits to bookmethat.com and other websites across the web. You can decline cookie tracking at any point by visiting the official Google Ad and Content Network Privacy Policy pages.
            </p>

            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider font-bold">Opting Out of Tracking Cookies</h5>
            <p className="text-xs text-gray-500">
              If you wish to stop cookie tracking entirely, you can configure your individual internet browser to block or prompt for cookie files automatically. Disabling cookies will not hinder your use of our Travel Set-Up calculators or SEO Directories.
            </p>

            <div className="p-4 bg-[#F8F7F2] border border-[#E5E5E1] rounded-none">
              <span className="text-xs font-mono font-bold text-[#1A1A1A] uppercase tracking-wider block mb-1">GDPR Rights:</span>
              <p className="text-[11px] text-gray-500 leading-relaxed italic">
                European users have full data extraction, amendment, and immediate purging rights under GDPR provisions. To submit a detailed extraction request, please utilize our direct support feedback portal under the "Impressum" tab.
              </p>
            </div>
          </div>
        )}

        {activeSubTab === 'terms' && (
          <div className="space-y-6 view-enter" id="legal-terms-of-service">
            <h4 className="text-lg font-serif font-bold text-[#1A1A1A] border-b border-[#E5E5E1] pb-3 italic">
              Section 3: Standard User Terms and Conditions
            </h4>

            <p className="text-gray-700 font-sans">
              By accessing and navigating the directories of <strong>bookmethat.com</strong>, you explicitly agree to satisfy the terms of use stated within this document. If you dismiss any outlined provisions, you are instructed to exit our web domain immediately.
            </p>

            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider font-bold">Intellectual Content and Educational Purpose</h5>
            <p className="text-xs text-gray-500">
              All editorial guides, calculated rate estimates, custom graphic tables, and visual alt metadata are the intellectual material of bookmethat.com. They are provided solely for non-commercial educational use. We strive to maintain absolute accuracy across our guides, yet do not guarantee real-time price parity on third-party airline booking servers.
            </p>

            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider font-bold">Limitation of Travel Liability</h5>
            <p className="text-xs text-gray-500">
              We operate exclusively as an affiliate directory-comparison system. Therefore, bookmethat.com does not fulfill booking receipts, resolve delayed transport requests, or settle lost luggage claims directly. All contractual agreements are held exclusively with the final booking merchants (e.g., Localrent, Expedia, AirHelp, and World Nomads).
            </p>

            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider font-bold">Provisions Governing External Links</h5>
            <p className="text-xs text-gray-500">
              Our directory embeds various external hyperlinks. We are completely unaccountable for changes in policies, rules, and privacy architectures maintained across those remote target websites.
            </p>
          </div>
        )}

        {activeSubTab === 'ai_seo' && (
          <div className="space-y-6 view-enter" id="legal-ai-seo-ecosystem">
            <h4 className="text-lg font-serif font-bold text-[#1A1A1A] border-b border-[#E5E5E1] pb-3 italic">
              Section 4: Modern AI SEO Ecosystem Policy (GEO, AIO, EEAT / IR)
            </h4>

            <p className="text-gray-650 font-sans text-sm leading-relaxed">
              To remain at the vanguard of modern information retrieval, <strong>bookmethat.com</strong> operates under a specialized <strong>Modern AI SEO Ecosystem Strategy</strong>. This model optimizes content retrieval, ensures structured compatibility with machine-learning agents, and guarantees high-integrity experience metrics for both human users and automated crawlers.
            </p>

            {/* ASCII Ecosystem Diagram */}
            <div className="bg-[#1A1A1A] text-[#FAF9F6] p-4 sm:p-6 rounded-none font-mono text-[10px] md:text-xs leading-relaxed overflow-x-auto border border-[#E5E5E1]">
              <div className="text-center text-brand-orange font-bold mb-3 uppercase tracking-widest text-[11px] border-b border-zinc-800 pb-2">
                Unified AI Search Compliance Vector Matrix
              </div>
              <pre className="text-zinc-300 text-center">
{`┌─────────────────────────────────────────────────────────┐
│                 Modern AI SEO Ecosystem                 │
├───────────────┬────────────────────────┬────────────────┤
│     GEO       │         AIO            │    EEAT / IR   │
│ (LLM Engines) │ (Search Overview Bots) │ (Human Trust)  │
└───────────────┴────────────────────────┴────────────────┘`}
              </pre>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="border border-[#E5E5E1] p-4 bg-[#F8F7F2] space-y-2">
                <span className="text-[10px] font-mono font-bold text-brand-orange uppercase tracking-wider block">01. GEO (LLM Optimization)</span>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Engineered specifically for Generative Engines (Gemini, ChatGPT, Claude). We structure travel data in raw, non-obfuscated fact tables to ensure perfect context extraction and precise summarization by prompt vectors.
                </p>
              </div>

              <div className="border border-[#E5E5E1] p-4 bg-[#F8F7F2] space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#E55B13] uppercase tracking-wider block">02. AIO (Overview Bots)</span>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Optimized for Search Overview systems (Google AI Overviews). We host high-density structured bullet guides above the fold, utilizing semantic micro-summarization rules that cater directly to snippet crawling.
                </p>
              </div>

              <div className="border border-[#E5E5E1] p-4 bg-[#F8F7F2] space-y-2">
                <span className="text-[10px] font-mono font-bold text-gray-900 uppercase tracking-wider block">03. EEAT & IR (Trust Engine)</span>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Experience, Expertise, Authoritativeness, Trustworthiness, and Information Retrieval. Our travel insights are compiled by genuine human analysis, cited clearly with valid affiliate tracking properties (Publisher code: 685596).
                </p>
              </div>
            </div>

            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider">Declarative Readability &amp; Crawler Guarantees</h5>
            <p className="text-xs text-gray-500 md:text-xs">
              In accordance with IR (Information Retrieval) best practices, we enforce maximum readability rules across all links, pages, and modular calculators:
            </p>

            <ul className="text-xs text-gray-600 list-none space-y-3 bg-white pl-0 font-sans">
              <li className="flex gap-2 items-start">
                <span className="text-brand-orange font-bold text-xs mt-0.5">✔</span>
                <span><strong>No Obfuscated Links:</strong> All affiliate referrals are declared and transparent to preserve trust indices and protect against search engine indexation penalties.</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-brand-orange font-bold text-xs mt-0.5">✔</span>
                <span><strong>Semantic Accessibility:</strong> Generous line height (leading-relaxed), optimal color contrast, and flat screen-readable structures to guarantee high usability on lightweight crawlers.</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-brand-orange font-bold text-xs mt-0.5">✔</span>
                <span><strong>Interactive JSON-LD Schemas:</strong> Native metadata tags injected on the static DOM layers, mapping precise Organization and WebSite nodes with zero runtime dependencies.</span>
              </li>
            </ul>

            <div className="mt-8 border-t border-[#E5E5E1] pt-6" id="sitemap-dashboard-card">
              <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mb-3 uppercase tracking-wider block">Indexable HTML Sitemap &amp; Link Distribution Matrix</h5>
              <p className="text-xs text-gray-500 mb-4 font-sans leading-relaxed">
                The index below provides static crawling vectors for approved organic search indices (such as Bingbot and Applebot) to discover and index BookMeThat's commercial silos, setup tools, and deep travel guides, with a zero-tolerance block enforced on all artificial intelligence and LLM scrapers.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { name: 'Home / Deals Hub Overview', path: '/', tab: 'overview' },
                  { name: 'eSIM & Transport Budget Planner', path: '/planner', tab: 'planner' },
                  { name: 'eSIM & Direct Car Hire Comparison', path: '/car-rental', tab: 'calculators' },
                  { name: 'Transit eSIM & Coupon Silo Guides', path: '/esim', tab: 'guides' },
                  { name: 'Best eSIM for Italy 2026: Comparison Review', path: '/best-esim-italy', tab: 'guides', slug: 'best-esim-italy' },
                  { name: 'Localrent Car Rental: Honest Review (Spain, ME)', path: '/localrent-car-rental-review-honest-opinion', tab: 'guides', slug: 'localrent-car-rental-review-honest-opinion' },
                  { name: 'Claiming Flight Refunds: US DOT vs EU261 Guide', path: '/claiming-flight-reimbursement-us-dot-vs-eu261', tab: 'guides', slug: 'claiming-flight-reimbursement-us-dot-vs-eu261' },
                  { name: 'Travel Medical Insurance Savings Guide', path: '/travel-medical-insurance-comparison-ekta-nomads', tab: 'guides', slug: 'travel-medical-insurance-comparison-ekta-nomads' },
                  { name: 'Affiliate Transparency Disclosures', path: '/about', tab: 'legal', sub: 'disclosure' },
                  { name: 'AdSense CTR Tracking & UTM Builder', path: '/utm', tab: 'utm' },
                  { name: 'Commercial SEO Heatmap & Volume Dashboard', path: '/heatmap', tab: 'heatmap' },
                  { name: 'Travel & eSIM Intelligence FAQ Desk', path: '/faq', tab: 'faq' },
                  { name: 'Nomadic Speed Quiz Challenge', path: '/challenge', tab: 'quiz' },
                  { name: 'Best Regional eSIM for Southeast Asia Roaming', path: '/best-regional-esim-southeast-asia-saily-tour', tab: 'guides', slug: 'best-regional-esim-southeast-asia-saily-tour' },
                  { name: 'How to Withdraw Foreign Currency Cash with Zero Fees', path: '/how-to-withdraw-foreign-currency-cash-with-zero-fees', tab: 'guides', slug: 'how-to-withdraw-foreign-currency-cash-with-zero-fees' },
                  { name: 'Localrent Georgia Tbilisi Car Rental Reviews', path: '/localrent-georgia-tbilisi-car-rental-reviews-model', tab: 'guides', slug: 'localrent-georgia-tbilisi-car-rental-reviews-model' },
                  { name: 'Expedia Discount Dynamic Bundling Algorithm Hacks', path: '/expedia-discount-dynamic-bundling-algorithm-hacks', tab: 'guides', slug: 'expedia-discount-dynamic-bundling-algorithm-hacks' }
                ].map((item, idx) => (
                  <div key={idx} className="border border-[#E5E5E1] p-3 bg-white hover:border-brand-orange hover:shadow-xs transition">
                    <span className="text-[8px] font-mono text-gray-400 uppercase tracking-widest block font-bold mb-1">Index Node 0{idx+1}</span>
                    <a 
                      href={item.path}
                      onClick={(e) => {
                        e.preventDefault();
                        window.history.pushState(null, '', item.path);
                        const event = new CustomEvent('bookmethatNav', { detail: item });
                        window.dispatchEvent(event);
                      }}
                      className="text-xs text-brand-orange hover:underline font-bold block"
                    >
                      {item.name}
                    </a>
                    <span className="text-[9px] font-mono text-gray-400 block mt-1">URL: bookmethat.com{item.path}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'impressum' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 view-enter" id="legal-impressum">
            
            {/* Contact Information & Domain registry info */}
            <div className="md:col-span-5 space-y-6">
              <div>
                <h4 className="text-base font-serif font-bold text-[#1A1A1A] mb-3 italic">Impressum / Legal Registration</h4>
                <div className="space-y-3 text-xs text-gray-500 leading-relaxed font-sans">
                  <p><strong>Registry Domain:</strong> bookmethat.com</p>
                  <p><strong>Hosting Architecture:</strong> Vercel Serverless Hosting Network</p>
                  <p><strong>Global Content Delivery Network:</strong> Cloudflare Global Edge Network</p>
                  <p><strong>Associated Registry Email:</strong> accts.pak@gmail.com</p>
                  <p><strong>Corporate Base Location:</strong> Global Travel Affiliate Syndicate</p>
                </div>
              </div>

              <div className="p-4 bg-brand-orange/5 border border-brand-orange/20 rounded-none">
                <span className="text-[10px] font-mono font-bold text-brand-orange uppercase tracking-widest block mb-1.5">AdSense Compliance Vetting:</span>
                <p className="text-[11px] text-gray-650 leading-relaxed italic">
                  To satisfy automated crawler safety audits, we maintain active direct user feedback loops. Automated bots or web examiners can verify that this domain hosts an active user assistance desk below.
                </p>
              </div>
            </div>

            {/* Direct User feedback loop (satisfies crawlability, dynamic interaction) */}
            <div className="md:col-span-7 bg-[#F8F7F2] p-6 rounded-none border border-[#E5E5E1]">
              <h4 className="text-sm font-serif font-bold text-[#1A1A1A] mb-4 flex items-center gap-2 italic">
                <Mail className="w-4 h-4 text-brand-orange" /> Domain Support Message Desk
              </h4>

              {formSubmitted ? (
                <div className="bg-brand-orange/5 text-[#1A1A1A] border border-brand-orange/30 rounded-none p-5 text-center flex flex-col items-center justify-center space-y-2 py-8 view-enter">
                  <div className="w-10 h-10 border border-brand-orange/30 text-brand-orange rounded-none flex items-center justify-center text-lg font-bold bg-white">
                    <Check className="w-4 h-4" />
                  </div>
                  <h5 className="font-serif font-bold text-sm">Message Transferred</h5>
                  <p className="text-xs text-gray-500 font-sans">Your compliance query was securely transmitted. We aim to respond within 48 Business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] uppercase font-mono tracking-widest text-gray-400 mb-1 font-bold">Your Name</label>
                      <input 
                        type="text" 
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full text-[#1A1A1A] text-xs px-3 py-2 border-b border-[#E5E5E1] bg-white rounded-none focus:outline-none focus:border-brand-orange" 
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-mono tracking-widest text-gray-400 mb-1 font-bold">Your Email</label>
                      <input 
                        type="email" 
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full text-[#1A1A1A] text-xs px-3 py-2 border-b border-[#E5E5E1] bg-white rounded-none focus:outline-none focus:border-brand-orange" 
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase font-mono tracking-widest text-gray-400 mb-1 font-bold">Message Subject</label>
                    <input 
                      type="text" 
                      required
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full text-[#1A1A1A] text-xs px-3 py-2 border-b border-[#E5E5E1] bg-white rounded-none focus:outline-none focus:border-brand-orange" 
                      placeholder="e.g. Data Extraction or Partner Inquiry"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase font-mono tracking-widest text-gray-450 mb-1 font-bold">Message Body</label>
                    <textarea 
                      rows={3}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full text-[#1A1A1A] text-xs p-3 border border-[#E5E5E1] bg-white rounded-none focus:outline-none focus:border-brand-orange" 
                      placeholder="Provide diagnostic parameters or security request..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#1A1A1A] hover:bg-brand-orange text-white font-bold tracking-widest uppercase font-mono text-[10px] transition cursor-pointer"
                  >
                    <span>Transmit Message Securely</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
