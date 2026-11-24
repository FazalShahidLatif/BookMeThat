import React, { useState, useEffect } from 'react';
import { Shield, Lock, FileText, BadgeCheck, Mail, Send, Check, Cpu, Globe, Users, Clock, AlertTriangle, Scale, Eye, Cookie, Database, Server, MapPin, Phone, Building2 } from 'lucide-react';

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
      
      <div className="bg-[#F8F7F2] p-6 md:p-8 flex items-center justify-between border-b border-[#E5E5E1] text-[#1A1A1A]">
        <div className="space-y-1">
          <span className="text-[9px] font-mono tracking-widest text-[#B84200] uppercase font-bold bg-[#B84200]/10 border border-[#B84200]/30 px-2.5 py-0.5 rounded-none">Compliance Center</span>
          <h3 className="text-2xl font-serif font-bold italic text-[#1A1A1A] mt-2">Regulatory Disclosure & Compliance Core</h3>
          <p className="text-xs text-gray-700 mt-1">Fully transparent terms, privacy rules, affiliate disclosures, and legal compliance for bookmethat.com.</p>
        </div>
        <Shield className="w-8 h-8 text-[#B84200] hidden sm:block" />
      </div>

      <div className="flex bg-[#F8F7F2] border-b border-[#E5E5E1] overflow-x-auto text-[10px] font-mono uppercase tracking-wider">
        {[
          { id: 'disclosure', label: 'Affiliate Disclosure', icon: <BadgeCheck className="w-3.5 h-3.5" /> },
          { id: 'privacy', label: 'Privacy Policy', icon: <Lock className="w-3.5 h-3.5" /> },
          { id: 'terms', label: 'Terms of Service', icon: <FileText className="w-3.5 h-3.5" /> },
          { id: 'ai_seo', label: 'AI SEO Policy', icon: <Cpu className="w-3.5 h-3.5" /> },
          { id: 'cookie_policy', label: 'Cookie Policy', icon: <Cookie className="w-3.5 h-3.5" /> },
          { id: 'impressum', label: 'Impressum & Contact', icon: <Mail className="w-3.5 h-3.5" /> }
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveSubTab(tab.id as any)}
            className={`min-h-[44px] flex items-center gap-1.5 px-5 py-3.5 border-r border-[#E5E5E1] transition cursor-pointer whitespace-nowrap ${activeSubTab === tab.id ? 'bg-white text-[#B84200] border-b-2 border-[#B84200] font-bold' : 'text-gray-700 hover:bg-white/50 font-medium'}`}>
            {tab.icon}{tab.label}
          </button>
        ))}
      </div>

      <div className="p-6 md:p-10 text-sm leading-relaxed text-[#1A1A1A] view-enter">

        {activeSubTab === 'disclosure' && (
          <div className="space-y-6 view-enter" id="legal-affiliate-disclosure">
            <h4 className="text-lg font-serif font-bold text-[#1A1A1A] border-b border-[#E5E5E1] pb-3 italic">Section 1: Affiliate Disclosure & Commercial Transparency (FTC & EU Consumer Protection)</h4>
            <p className="text-gray-700 font-sans">This informational portal, <strong>bookmethat.com</strong>, operates under strict commercial transparency principles. In accordance with the Federal Trade Commission (FTC) guidelines in the United States (16 CFR Part 255), alongside the European Consumer Protection directives (EU Directive 2005/29/EC and Directive 2011/83/EU), we explicitly declare that our content is monetized through commissions earned via travel booking affiliate networks. We are a certified publisher in the <strong>Travelpayouts Affiliate Network</strong> (Publisher ID: 685596) and display advertisements through <strong>Adsterra</strong> (Publisher ID: id723194).</p>
            <div className="bg-[#F8F7F2] border-l-2 border-[#B84200] p-5 rounded-none space-y-2">
              <h5 className="font-serif font-bold text-[#1A1A1A] text-xs uppercase tracking-wide">Key Partnership Affiliations & Verification References:</h5>
              <p className="text-xs text-gray-700">BookMeThat is a certified publisher in the Travelpayouts Affiliate Network and Adsterra advertising network.</p>
              <ul className="text-xs font-mono text-[#1A1A1A] list-disc list-inside space-y-1 bg-white p-3 rounded-none border border-[#E5E5E1]">
                <li>Primary Tracking Marker ID: <strong className="font-bold text-[#B84200]">685596</strong></li>
                <li>Secondary Widget Marker ID: <strong className="font-bold text-[#B84200]">685596</strong></li>
                <li>Target Registry Domain: <strong className="font-bold text-[#B84200]">bookmethat.com</strong></li>
                <li>Adsterra Publisher ID: <strong className="font-bold text-[#B84200]">id723194</strong></li>
                <li>Adsterra Website ID: <strong className="font-bold text-[#B84200]">6112813</strong></li>
              </ul>
            </div>
            <h5 className="font-serif font-bold text-[#1A1A1A] text-base mt-6">How Affiliate Links Work</h5>
            <p className="text-xs text-gray-700">When you click on recommendation links throughout our travel guides, you trigger standard tracking tags. These tags record zero unique personal identification factors but enable the associated merchants to verify bookmethat.com as the source publisher. A cookie is placed on your browser (typically 30 days) so the merchant knows you came from our site. This is standard industry practice disclosed in compliance with FTC guidelines.</p>
            <h5 className="font-serif font-bold text-[#1A1A1A] text-base mt-6">No Cost to You</h5>
            <p className="text-xs text-gray-700">Under no circumstances do these tracking markers increase the final ticket price, rental cost, or subscription toll paid by you. Several partner agreements grant our users exclusive discounts. We only earn a commission if you complete a booking or purchase through our link. Your price remains identical whether you use our link or go directly to the merchant.</p>
            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider">Editorial Independence Statement</h5>
            <p className="text-xs text-gray-700">Our reviews and recommendations are based on independent research and real-world testing. Affiliate partnerships do not influence our editorial content. We may earn commissions from qualifying purchases, but this never affects the price you pay. All opinions expressed are our own and based on thorough analysis. We do not accept payment for positive reviews or rankings.</p>
            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider">Advertising Disclosure</h5>
            <p className="text-xs text-gray-700">This website displays advertisements through Adsterra (Publisher ID: id723194, Website ID: 6112813). Advertisements are clearly labeled and served based on contextual relevance. We do not control the specific ads displayed. Ad serving is consent-gated — no ads are displayed until you accept marketing cookies.</p>
          </div>
        )}

        {activeSubTab === 'privacy' && (
          <div className="space-y-6 view-enter" id="legal-privacy-consent">
            <h4 className="text-lg font-serif font-bold text-[#1A1A1A] border-b border-[#E5E5E1] pb-3 italic">Section 2: Privacy Policy & Data Protection (GDPR, CCPA, ePrivacy & PECR)</h4>
            <p className="text-gray-700 font-sans">At bookmethat.com, the privacy of our global visitors represents a core architectural principle. This Privacy Policy outlines the types of personal data we collect, how we use it, your rights regarding your information, and how we protect your data. By using our website, you consent to the data practices described in this policy.</p>
            <div className="p-4 bg-[#F8F7F2] border border-[#E5E5E1] rounded-none">
              <span className="text-xs font-mono font-bold text-[#1A1A1A] uppercase tracking-wider block mb-1">Last Updated:</span>
              <p className="text-[11px] text-gray-500 leading-relaxed">October 28, 2026</p>
              <span className="text-xs font-mono font-bold text-[#1A1A1A] uppercase tracking-wider block mb-1 mt-2">Effective Date:</span>
              <p className="text-[11px] text-gray-500 leading-relaxed">October 28, 2026</p>
            </div>
            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider font-bold">1. Information We Collect</h5>
            <p className="text-xs text-gray-500">We collect information in the following ways:</p>
            <ul className="text-xs text-gray-600 list-disc list-inside space-y-2 pl-2">
              <li><strong>Log Files:</strong> IP addresses, browser type, ISP, referring/exit pages, operating system, date/time stamps, and clickstream data. Used to analyze trends and administer the site. Not linked to personally identifiable information.</li>
              <li><strong>Cookies:</strong> Store visitor preferences and customize content. Controlled through browser settings.</li>
              <li><strong>Analytics Data:</strong> Google Analytics 4 collects anonymized data about page views, session duration, bounce rates, and traffic sources. Configured to respect Do Not Track (DNT) and Global Privacy Control (GPC) signals.</li>
              <li><strong>Contact Form Data:</strong> Name, email, subject, and message. Used solely to respond to inquiries.</li>
              <li><strong>Affiliate Click Data:</strong> Partner merchants may collect referral source data. Governed by the partner's privacy policy.</li>
            </ul>
            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider font-bold">2. How We Use Your Information</h5>
            <p className="text-xs text-gray-500">We use collected information to provide, maintain, and improve our website; analyze usage patterns; respond to inquiries; monitor and prevent fraud; comply with legal obligations; and serve relevant advertisements (consent-gated). We do <strong>not</strong> sell, trade, or rent your personal information to third parties.</p>
            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider font-bold">3. Third-Party Services</h5>
            <ul className="text-xs text-gray-600 list-disc list-inside space-y-2 pl-2">
              <li><strong>Google Analytics 4:</strong> Anonymized usage data. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">Google Privacy Policy</a></li>
              <li><strong>Adsterra:</strong> Advertising partner. Consent-gated ad serving. <a href="https://adsterra.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">Adsterra Privacy Policy</a></li>
              <li><strong>Travelpayouts:</strong> Affiliate network. <a href="https://www.travelpayouts.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">Travelpayouts Privacy Policy</a></li>
              <li><strong>Vercel:</strong> Hosting provider. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">Vercel Privacy Policy</a></li>
              <li><strong>Cloudflare:</strong> CDN provider. <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">Cloudflare Privacy Policy</a></li>
            </ul>
            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider font-bold">4. Cookies & Tracking Technologies</h5>
            <ul className="text-xs text-gray-600 list-disc list-inside space-y-2 pl-2">
              <li><strong>Necessary Cookies:</strong> Essential for website function. Cannot be disabled.</li>
              <li><strong>Analytics Cookies:</strong> Google Analytics site usage. Declinable via cookie banner.</li>
              <li><strong>Marketing Cookies:</strong> Adsterra ad serving. Declinable. We honor DNT and GPC signals.</li>
              <li><strong>Affiliate Tracking Cookies:</strong> Partner merchants. Expire after 30 days.</li>
            </ul>
            <p className="text-xs text-gray-500 mt-2">You can control cookies through browser settings. Disabling cookies will not hinder use of our travel guides or tools.</p>
            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider font-bold">5. Data Retention</h5>
            <ul className="text-xs text-gray-600 list-disc list-inside space-y-2 pl-2">
              <li><strong>Server log files:</strong> Maximum 12 months</li>
              <li><strong>Google Analytics data:</strong> 14 months</li>
              <li><strong>Contact form submissions:</strong> 24 months or until deletion requested</li>
              <li><strong>Affiliate tracking cookies:</strong> 30 days</li>
              <li><strong>Consent preferences:</strong> Stored in browser localStorage until cleared</li>
            </ul>
            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider font-bold">6. Your Rights (GDPR, CCPA & UK GDPR)</h5>
            <p className="text-xs text-gray-500">If you are a resident of the EEA, United Kingdom, or California, you have the following rights:</p>
            <ul className="text-xs text-gray-600 list-disc list-inside space-y-2 pl-2">
              <li><strong>Right of Access:</strong> Request a copy of personal data we hold about you.</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate data.</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your personal data.</li>
              <li><strong>Right to Restrict Processing:</strong> Request limitation on how we use your data.</li>
              <li><strong>Right to Data Portability:</strong> Request data in machine-readable format.</li>
              <li><strong>Right to Object:</strong> Object to processing for marketing purposes.</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw cookie tracking consent at any time.</li>
              <li><strong>Right to Lodge a Complaint:</strong> With your local data protection authority.</li>
            </ul>
            <p className="text-xs text-gray-500 mt-2">To exercise these rights, contact us via the Impressum tab or email accts.pak@gmail.com. We respond within 30 days.</p>
            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider font-bold">7. International Data Transfers</h5>
            <p className="text-xs text-gray-500">Our website is hosted on Vercel's global infrastructure and served via Cloudflare's CDN. Your data may be processed in the United States and other countries. Appropriate safeguards are in place including standard contractual clauses.</p>
            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider font-bold">8. Children's Privacy</h5>
            <p className="text-xs text-gray-500">Our website is not directed at children under 13 (or 16 in the EEA). We do not knowingly collect personal information from children. If you believe we have, contact us immediately.</p>
            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider font-bold">9. Security Measures</h5>
            <p className="text-xs text-gray-500">We implement appropriate technical and organizational security measures including HTTPS encryption, secure hosting infrastructure, and regular security reviews. No method of transmission over the Internet is 100% secure.</p>
            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider font-bold">10. Changes to This Policy</h5>
            <p className="text-xs text-gray-500">We may update this Privacy Policy from time to time. Changes posted on this page with updated date. For significant changes, we provide prominent notice. Review periodically.</p>
          </div>
        )}

        {activeSubTab === 'terms' && (
          <div className="space-y-6 view-enter" id="legal-terms-of-service">
            <h4 className="text-lg font-serif font-bold text-[#1A1A1A] border-b border-[#E5E5E1] pb-3 italic">Section 3: Terms of Service & User Agreement</h4>
            <p className="text-gray-700 font-sans">By accessing and navigating the directories of <strong>bookmethat.com</strong>, you explicitly agree to satisfy the terms of use stated within this document. If you dismiss any outlined provisions, you are instructed to exit our web domain immediately. These Terms govern your use of the bookmethat.com website and all related services.</p>
            <div className="p-4 bg-[#F8F7F2] border border-[#E5E5E1] rounded-none">
              <span className="text-xs font-mono font-bold text-[#1A1A1A] uppercase tracking-wider block mb-1">Last Updated:</span>
              <p className="text-[11px] text-gray-500 leading-relaxed">October 28, 2026</p>
            </div>
            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider font-bold">1. Acceptance of Terms</h5>
            <p className="text-xs text-gray-500">By accessing or using bookmethat.com, you agree to be bound by these Terms. If you disagree with any part, you may not access the website. These Terms apply to all visitors. We reserve the right to refuse service to anyone for any reason at any time.</p>
            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider font-bold">2. Description of Service</h5>
            <p className="text-xs text-gray-500">BookMeThat is an informational travel comparison and affiliate directory website. We provide travel guides, eSIM comparisons, car rental reviews, flight compensation information, travel insurance comparisons, and related travel resources. We do not provide booking services directly — all bookings are made through third-party partner websites. We act as an informational intermediary only.</p>
            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider font-bold">3. Intellectual Property Rights</h5>
            <p className="text-xs text-gray-500">All editorial guides, calculated rate estimates, custom graphic tables, visual alt metadata, original content, and website design are the intellectual property of bookmethat.com. Provided solely for non-commercial educational use. You may not reproduce, distribute, modify, create derivative works from, publicly display, or commercially exploit any content without explicit written permission. Trademarks belong to their respective owners.</p>
            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider font-bold">4. User Conduct</h5>
            <p className="text-xs text-gray-500">You agree not to: use the website for unlawful purposes; attempt unauthorized access; use automated tools to extract content; interfere with website functionality; transmit malicious code; impersonate any person; or collect personally identifiable information.</p>
            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider font-bold">5. Limitation of Liability</h5>
            <p className="text-xs text-gray-500">We operate exclusively as an affiliate directory-comparison system. We do not fulfill booking receipts, resolve delayed transport requests, or settle lost luggage claims. All contractual agreements are with final booking merchants. We strive for accuracy but do not guarantee real-time price parity. Travel prices, availability, visa requirements, and terms subject to change. We are not liable for losses arising from reliance on our information.</p>
            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider font-bold">6. Provisions Governing External Links</h5>
            <p className="text-xs text-gray-500">Our directory embeds external hyperlinks to partner websites. We are unaccountable for changes in policies, rules, privacy architectures, or service availability on those sites. Clicking an external link means you leave bookmethat.com and are subject to the destination site's terms. We do not endorse third-party products or services.</p>
            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider font-bold">7. Disclaimer of Warranties</h5>
            <p className="text-xs text-gray-500">The website and all content are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant uninterrupted, error-free, secure service. Travel information subject to change.</p>
            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider font-bold">8. Indemnification</h5>
            <p className="text-xs text-gray-500">You agree to indemnify and hold harmless bookmethat.com, its operators, affiliates, and licensors from any claims, damages, losses, or expenses arising from your use of the website or violation of these Terms.</p>
            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider font-bold">9. Governing Law & Dispute Resolution</h5>
            <p className="text-xs text-gray-500">These Terms governed by applicable international law. Disputes first attempted through good-faith negotiation. If unresolved, submitted to binding arbitration or courts of competent jurisdiction.</p>
            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider font-bold">10. Severability</h5>
            <p className="text-xs text-gray-500">If any provision is unenforceable, it shall be limited to the minimum extent necessary, and remaining provisions remain in full force.</p>
            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider font-bold">11. Changes to Terms</h5>
            <p className="text-xs text-gray-500">We reserve the right to modify these Terms at any time. Changes posted with updated date. Continued use constitutes acceptance.</p>
            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider font-bold">12. Contact</h5>
            <p className="text-xs text-gray-500">For questions, contact us via the Impressum tab or email accts.pak@gmail.com. We respond within 48 business hours.</p>
          </div>
        )}

        {activeSubTab === 'ai_seo' && (
          <div className="space-y-6 view-enter" id="legal-ai-seo-ecosystem">
            <h4 className="text-lg font-serif font-bold text-[#1A1A1A] border-b border-[#E5E5E1] pb-3 italic">Section 4: Modern AI SEO Ecosystem Policy (GEO, AIO, EEAT)</h4>
            <p className="text-gray-650 font-sans text-sm leading-relaxed">To remain at the vanguard of modern information retrieval, <strong>bookmethat.com</strong> operates under a specialized <strong>Modern AI SEO Ecosystem Strategy</strong>. This model optimizes content retrieval, ensures structured compatibility with machine-learning agents, and guarantees high-integrity experience metrics for both human users and automated crawlers.</p>
            <div className="bg-[#1A1A1A] text-[#FAF9F6] p-4 sm:p-6 rounded-none font-mono text-[10px] md:text-xs leading-relaxed overflow-x-auto border border-[#E5E5E1]">
              <div className="text-center text-brand-orange font-bold mb-3 uppercase tracking-widest text-[11px] border-b border-zinc-800 pb-2">Unified AI Search Compliance Vector Matrix</div>
              <pre className="text-zinc-300 text-center">{`┌─────────────────────────────────────────────────────────┐
│                 Modern AI SEO Ecosystem                 │
├───────────────┬────────────────────────┬────────────────┤
│     GEO       │         AIO            │    EEAT / IR   │
│ (LLM Engines) │ (Search Overview Bots) │ (Human Trust)  │
└───────────────┴────────────────────────┴────────────────┘`}</pre>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="border border-[#E5E5E1] p-4 bg-[#F8F7F2] space-y-2">
                <span className="text-[10px] font-mono font-bold text-brand-orange uppercase tracking-wider block">01. GEO (LLM Optimization)</span>
                <p className="text-xs text-gray-600 leading-relaxed">Engineered for Generative Engines (Gemini, ChatGPT, Claude, Perplexity). We structure travel data in raw, non-obfuscated fact tables for perfect context extraction.</p>
              </div>
              <div className="border border-[#E5E5E1] p-4 bg-[#F8F7F2] space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#E55B13] uppercase tracking-wider block">02. AIO (Overview Bots)</span>
                <p className="text-xs text-gray-600 leading-relaxed">Optimized for Search Overview systems (Google AI Overviews). High-density structured bullet guides above the fold for snippet crawling.</p>
              </div>
              <div className="border border-[#E5E5E1] p-4 bg-[#F8F7F2] space-y-2">
                <span className="text-[10px] font-mono font-bold text-gray-900 uppercase tracking-wider block">03. EEAT & IR (Trust Engine)</span>
                <p className="text-xs text-gray-600 leading-relaxed">Experience, Expertise, Authoritativeness, Trustworthiness, and Information Retrieval. Content compiled by genuine human analysis, cited with valid affiliate tracking (Publisher code: 685596).</p>
              </div>
            </div>
            <h5 className="font-serif font-bold text-[#1A1A1A] text-sm mt-6 block uppercase tracking-wider">Declarative Readability & Crawler Guarantees</h5>
            <ul className="text-xs text-gray-600 list-none space-y-3 bg-white pl-0 font-sans">
              <li className="flex gap-2 items-start"><span className="text-brand-orange font-bold text-xs mt-0.5">✔</span><span><strong>No Obfuscated Links:</strong> All affiliate referrals declared and transparent.</span></li>
              <li className="flex gap-2 items-start"><span className="text-brand-orange font-bold text-xs mt-0.5">✔</span><span><strong>Semantic Accessibility:</strong> Generous line height, optimal color contrast, flat screen-readable structures.</span></li>
              <li className="flex gap-2 items-start"><span className="text-brand-orange font-bold text-xs mt-0.5">✔</span><span><strong>Interactive JSON-LD Schemas:</strong> Native metadata tags mapping Organization and WebSite nodes.</span></li>
              <li className="flex gap-2 items-start"><span className="text-brand-orange font-bold text-xs mt-0.5">✔</span><span><strong>Answer-First Content:</strong> Every article begins with a direct, plain-language answer.</span></li>
              <li className="flex gap-2 items-start"><span className="text-brand-orange font-bold text-xs mt-0.5">✔</span><span><strong>Structured Data:</strong> Schema.org markup (Article, FAQ, BreadcrumbList, Organization) on all pages.</span></li>
              <li className="flex gap-2 items-start"><span className="text-brand-orange font-bold text-xs mt-0.5">✔</span><span><strong>Mobile-First:</strong> All pages responsive and optimized for mobile devices.</span></li>
            </ul>
          </div>
        )}

        {activeSubTab === 'impressum' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 view-enter" id="legal-impressum">
            <div className="md:col-span-5 space-y-6">
              <div>
                <h4 className="text-base font-serif font-bold text-[#1A1A1A] mb-3 italic">Impressum / Legal Registration</h4>
                <div className="space-y-3 text-xs text-gray-500 leading-relaxed font-sans">
                  <p><strong>Registry Domain:</strong> bookmethat.com</p>
                  <p><strong>Hosting Architecture:</strong> Vercel Serverless Hosting Network</p>
                  <p><strong>Global Content Delivery Network:</strong> Cloudflare Global Edge Network</p>
                  <p><strong>Associated Registry Email:</strong> accts.pak@gmail.com</p>
                  <p><strong>Responsible Person:</strong> Fazal Shahid Latif</p>
                  <p><strong>Business Type:</strong> Travel Affiliate & Content Publisher</p>
                  <p><strong>Registered:</strong> 2026</p>
                </div>
              </div>
              <div className="p-4 bg-brand-orange/5 border border-brand-orange/20 rounded-none">
                <span className="text-[10px] font-mono font-bold text-brand-orange uppercase tracking-widest block mb-1.5">Affiliate Link Compliance:</span>
                <p className="text-[11px] text-gray-650 leading-relaxed italic">To satisfy automated crawler safety audits, we maintain active direct user feedback loops.</p>
              </div>
              <div className="p-4 bg-[#F8F7F2] border border-[#E5E5E1] rounded-none">
                <span className="text-[10px] font-mono font-bold text-[#1A1A1A] uppercase tracking-widest block mb-1.5">Data Protection Officer:</span>
                <p className="text-[11px] text-gray-500 leading-relaxed">For GDPR-related inquiries, contact us via the form below or email accts.pak@gmail.com. We respond within 30 days as required by GDPR Article 12.</p>
              </div>
              <div className="p-4 bg-[#F8F7F2] border border-[#E5E5E1] rounded-none">
                <span className="text-[10px] font-mono font-bold text-[#1A1A1A] uppercase tracking-widest block mb-1.5">Advertising Compliance:</span>
                <p className="text-[11px] text-gray-500 leading-relaxed">Advertisements served through Adsterra (Publisher ID: id723194). Ad serving is consent-gated. We comply with GDPR, CCPA, and ePrivacy regulations.</p>
              </div>
            </div>
            <div className="md:col-span-7 bg-[#F8F7F2] p-6 rounded-none border border-[#E5E5E1]">
              <h4 className="text-sm font-serif font-bold text-[#1A1A1A] mb-4 flex items-center gap-2 italic"><Mail className="w-4 h-4 text-brand-orange" /> Domain Support Message Desk</h4>
              {formSubmitted ? (
                <div className="bg-brand-orange/5 text-[#1A1A1A] border border-brand-orange/30 rounded-none p-5 text-center flex flex-col items-center justify-center space-y-2 py-8 view-enter">
                  <div className="w-10 h-10 border border-brand-orange/30 text-brand-orange rounded-none flex items-center justify-center text-lg font-bold bg-white"><Check className="w-4 h-4" /></div>
                  <h5 className="font-serif font-bold text-sm">Message Transferred</h5>
                  <p className="text-xs text-gray-500 font-sans">Your compliance query was securely transmitted. We aim to respond within 48 Business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="block text-[9px] uppercase font-mono tracking-widest text-gray-400 mb-1 font-bold">Your Name</label><input type="text" required value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} className="w-full text-[#1A1A1A] text-xs px-3 py-2 border-b border-[#E5E5E1] bg-white rounded-none focus:outline-none focus:border-brand-orange" placeholder="John Doe" /></div>
                    <div><label className="block text-[9px] uppercase font-mono tracking-widest text-gray-400 mb-1 font-bold">Your Email</label><input type="email" required value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} className="w-full text-[#1A1A1A] text-xs px-3 py-2 border-b border-[#E5E5E1] bg-white rounded-none focus:outline-none focus:border-brand-orange" placeholder="john@example.com" /></div>
                  </div>
                  <div><label className="block text-[9px] uppercase font-mono tracking-widest text-gray-400 mb-1 font-bold">Message Subject</label><input type="text" required value={contactForm.subject} onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })} className="w-full text-[#1A1A1A] text-xs px-3 py-2 border-b border-[#E5E5E1] bg-white rounded-none focus:outline-none focus:border-brand-orange" placeholder="e.g. Data Extraction or Partner Inquiry" /></div>
                  <div><label className="block text-[9px] uppercase font-mono tracking-widest text-gray-450 mb-1 font-bold">Message Body</label><textarea rows={3} required value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} className="w-full text-[#1A1A1A] text-xs p-3 border border-[#E5E5E1] bg-white rounded-none focus:outline-none focus:border-brand-orange" placeholder="Provide diagnostic parameters or security request..." /></div>
                  <button type="submit" className="w-full py-3 bg-[#1A1A1A] hover:bg-brand-orange text-white font-bold tracking-widest uppercase font-mono text-[10px] transition cursor-pointer"><span>Transmit Message Securely</span></button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}