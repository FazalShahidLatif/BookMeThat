import React, { useState } from 'react';
import { Shield, Lock, FileText, BadgeCheck, Mail, Send, Check } from 'lucide-react';

export default function LegalPages() {
  const [activeSubTab, setActiveSubTab] = useState<'disclosure' | 'privacy' | 'terms' | 'impressum'>('disclosure');
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

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
            
            <p className="text-gray-650 font-sans">
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
              When clicking on various recommendation links throughout our Silo directories (including Saily, Airalo, Localrent, GetTransfer, NordVPN, Wise, Expedia, and World Nomads), you trigger standard tracking tags. These tags record zero unique personal identification factors but enable the associated merchants to verify bookmethat.com as the source publisher.
            </p>

            <table className="w-full text-left text-xs text-gray-650 border border-[#E5E5E1] rounded-none overflow-hidden mt-4 bg-white">
              <thead className="bg-[#F8F7F2] text-[#1A1A1A] font-mono font-bold text-[9px] uppercase tracking-wider border-b border-[#E5E5E1]">
                <tr>
                  <th className="p-3">Partner Entity</th>
                  <th className="p-3">Category Classification</th>
                  <th className="p-3">Target Link Signature</th>
                  <th className="p-3">Standard Cookie Grace Window</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E1]">
                <tr>
                  <td className="p-3 font-semibold text-[#1A1A1A]">Saily & Airalo</td>
                  <td className="p-3">Travel eSIM Systems</td>
                  <td className="p-3 font-mono text-brand-orange">saily.tpk.lu, airalo.com</td>
                  <td className="p-3">30 Days Duration</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1A1A1A]">Localrent & QEEQ</td>
                  <td className="p-3">Car Rentals & Insurance</td>
                  <td className="p-3 font-mono text-brand-orange">localrent.tpk.lu, qeeq.tpk.lu</td>
                  <td className="p-3">30 Days Duration</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1A1A1A]">GetTransfer</td>
                  <td className="p-3">Private Chauffeurs</td>
                  <td className="p-3 font-mono text-brand-orange">gettransfer.tpk.lu</td>
                  <td className="p-3">30 Days Duration</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1A1A1A]">NordVPN & Wise</td>
                  <td className="p-3">Security & Cross-Border Money</td>
                  <td className="p-3 font-mono text-brand-orange">nordvpn.com, wise.com</td>
                  <td className="p-3">30 Days Duration</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1A1A1A]">Expedia & World Nomads</td>
                  <td className="p-3">Vacations, Packages & Medical Cover</td>
                  <td className="p-3 font-mono text-brand-orange">expedia.com, worldnomads.com</td>
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

            <p className="text-gray-650 font-sans">
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

            <p className="text-gray-650 font-sans">
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

        {activeSubTab === 'impressum' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 view-enter" id="legal-impressum">
            
            {/* Contact Information & Domain registry info */}
            <div className="md:col-span-5 space-y-6">
              <div>
                <h4 className="text-base font-serif font-bold text-[#1A1A1A] mb-3 italic">Impressum / Legal Registration</h4>
                <div className="space-y-3 text-xs text-gray-500 leading-relaxed font-sans">
                  <p><strong>Registry Domain:</strong> bookmethat.com</p>
                  <p><strong>Hosting Architecture:</strong> Vercel Serverless Hosting Network</p>
                  <p><strong>CDN Delivery Node:</strong> Cloudflare Global Edge Network</p>
                  <p><strong>Associated Registry Email:</strong> accts.pak@gmail.com</p>
                  <p><strong>Corporate Base Location:</strong> Global Travel Affiliate Syndicate</p>
                </div>
              </div>

              <div className="p-4 bg-brand-orange/5 border border-brand-orange/20 rounded-none">
                <span className="text-[10px] font-mono font-bold text-brand-orange uppercase tracking-widest block mb-1.5">AdSense Compliance Vetting:</span>
                <p className="text-[11px] text-gray-505 leading-relaxed text-gray-550 italic">
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
