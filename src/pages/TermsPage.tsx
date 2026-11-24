import React from 'react';
import { Shield, Lock, FileText, BadgeCheck, Mail, Send, Check, Cpu, Globe, Users, Clock, AlertTriangle, Scale, Eye, Cookie, Database, Server, MapPin, Phone, Building2, FileText } from 'lucide-react';

interface TermsPageProps {
  backLink?: boolean;
}

export default function TermsPage({ backLink = false }: TermsPageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white border border-[#E5E5E1] rounded-none overflow-hidden">
        <div className="bg-[#F8F7F2] p-4 md:p-6 border-b border-[#E5E5E1]">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-[#B84200]" />
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold italic text-[#1A1A1A]">Terms of Service</h1>
              <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Last Updated: October 28, 2026</p>
            </div>
          </div>
        </div>
        <div className="p-6 md:p-10 text-sm text-[#1A1A1A]">
          <p className="text-gray-700 font-sans">
            By accessing and using <strong>bookmethat.com</strong> (BookMeThat), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use this website.
          </p>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">1. Acceptance of Terms</h3>
          <p className="text-xs text-gray-500">
            By accessing or using bookmethat.com, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the website. These Terms apply to all visitors, users, and others who access or use the service.
          </p>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">2. Description of Service</h3>
          <p className="text-xs text-gray-500">
            BookMeThat is an informational travel comparison and affiliate directory website. We provide travel guides, eSIM comparisons, car rental reviews, flight compensation information, travel insurance comparisons, and related travel resources. We act as an informational intermediary — all bookings are made through third-party partner websites. We do not provide booking services directly.
          </p>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">3. Intellectual Property</h3>
          <p className="text-xs text-gray-500">
            All editorial guides, calculated rate estimates, custom graphic tables, visual alt metadata, original content, and website design are the intellectual property of bookmethat.com. This content is provided solely for non-commercial educational use. You may not reproduce, distribute, modify, create derivative works from, publicly display, or commercially exploit any content without our explicit written permission. Trademarks, logos, and brand names belong to their respective owners.
          </p>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">4. User Conduct</h3>
          <p className="text-xs text-gray-500">
            You agree not to: use the website for any unlawful purpose; attempt unauthorized access; use automated tools (bots, scrapers) to extract content; interfere with website functionality; transmit malicious code; impersonate others; or collect personally identifiable information from the site.
          </p>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">5. Limitation of Liability</h3>
          <p className="text-xs text-gray-500">
            We operate exclusively as an affiliate directory-comparison system. We do not fulfill booking receipts, resolve delayed transport requests, or settle lost luggage claims directly. All contractual agreements are with final booking merchants. We strive for accuracy but do not guarantee real-time price parity on third-party booking servers. Travel prices, availability, visa requirements, and terms are subject to change without notice. We are not liable for losses arising from your reliance on our information.
          </p>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">6. External Links</h3>
          <p className="text-xs text-gray-500">
            Our directory embeds external hyperlinks to partner websites. We are unaccountable for changes in policies, rules, privacy architectures, or service availability on those sites. Clicking an external link means you leave bookmethat.com and are subject to the destination site's terms. We do not endorse third-party products or services.
          </p>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">7. Disclaimer of Warranties</h3>
          <p className="text-xs text-gray-500">
            The website and all content are provided "as is" and "as available" without warranties of any kind, either express or implied, including implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant uninterrupted, error-free, secure service. Travel information subject to change.
          </p>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">8. Indemnification</h3>
          <p className="text-xs text-gray-500">
            You agree to indemnify and hold harmless bookmethat.com, its operators, affiliates, and licensors from any claims, damages, losses, or expenses (including reasonable attorney's fees) arising from your use of the website or violation of these Terms.
          </p>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">9. Governing Law & Dispute Resolution</h3>
          <p className="text-xs text-gray-500">
            These Terms shall be governed by applicable international law. Disputes shall first be resolved through good-faith negotiation. If unresolved, disputes shall be submitted to binding arbitration or the courts of competent jurisdiction.
          </p>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">10. Severability</h3>
          <p className="text-xs text-gray-500">
            If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
          </p>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">11. Changes to Terms</h3>
          <p className="text-xs text-gray-500">
            We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated "Last Updated" date. Your continued use of the website after changes constitutes acceptance of the new Terms.
          </p>

          <div className="mt-8 pt-6 border-t border-[#E5E5E1]">
            <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">Legal Pages</p>
            <ul className="space-y-1.5 text-xs text-gray-500">
              <li><a href="/privacy-policy" className="hover:text-brand-orange transition inline-flex items-center gap-1">← Back to Privacy Policy</a></li>
              <li><a href="/cookie-policy" className="hover:text-brand-orange transition inline-flex items-center gap-1">Cookie Policy →</a></li>
              <li><a href="/impressum" className="hover:text-brand-orange transition inline-flex items-center gap-1">Impressum →</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}