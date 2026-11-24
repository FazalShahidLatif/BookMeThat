import React from 'react';
import { Shield, Lock, FileText, BadgeCheck, Mail, Send, Check, Cpu, Globe, Users, Clock, AlertTriangle, Scale, Eye, Cookie, Database, Server, MapPin, Phone, Building2, Policy } from 'lucide-react';

interface PrivacyPageProps {
  backLink?: boolean;
}

export default function PrivacyPolicy({ backLink = false }: PrivacyPageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white border border-[#E5E5E1] rounded-none overflow-hidden">
        <div className="bg-[#F8F7F2] p-4 md:p-6 border-b border-[#E5E5E1]">
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-[#B84200]" />
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold italic text-[#1A1A1A]">Privacy Policy</h1>
              <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Last Updated: October 28, 2026</p>
            </div>
          </div>
        </div>
        <div className="p-6 md:p-10 text-sm text-[#1A1A1A]">
          <p className="text-gray-700 font-sans">
            At <strong>bookmethat.com</strong> (BookMeThat), we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">1. Information We Collect</h3>
          <ul className="text-xs text-gray-600 list-disc list-inside space-y-2 pl-2">
            <li><strong>Log Data:</strong> IP address, browser type, operating system, referring pages, clickstream data, and usage statistics.</li>
            <li><strong>Cookies & Tracking:</strong> We use cookies to enhance your experience, remember preferences, and analyze site usage via Google Analytics 4.</li>
            <li><strong>Contact Information:</strong> When you contact us via the contact form, we collect your name, email address, and message content.</li>
            <li><strong>Affiliate Data:</strong> When you click affiliate links, the partner merchant may collect referral data (governed by their own policies).</li>
            <li><strong>Traffic Data:</strong> Google Analytics, Adsterra, and Travelpayouts provide aggregated traffic and user data.</li>
          </ul>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">2. How We Use Your Information</h3>
          <ul className="text-xs text-gray-600 list-disc list-inside space-y-2 pl-2">
            <li>Provide, maintain, and improve our website and services</li>
            <li>Analyze usage patterns and content performance</li>
            <li>Respond to your inquiries and provide support</li>
            <li>Monitor and prevent fraud or abuse</li>
            <li>Comply with legal obligations and enforce our Terms of Service</li>
            <li>Serve relevant advertising (consent-gated via Adsterra)</li>
          </ul>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">3. Cookie Types</h3>
          <ul className="text-xs text-gray-600 list-disc list-inside space-y-2 pl-2">
            <li><strong>Strictly Necessary:</strong> Required for core site functionality (cannot be disabled).</li>
            <li><strong>Analytics Cookies:</strong> Google Analytics 4 — collects anonymized usage data. Can be declined.</li>
            <li><strong>Advertising Cookies:</strong> Adsterra — consent-gated ad serving. We honor Do Not Track (DNT) and Global Privacy Control (GPC) signals.</li>
            <li><strong>Affiliate Tracking Cookies:</strong> Placed by partner merchants (e.g., Localrent, Expedia, AirHelp). Typically expire after 30 days.</li>
          </ul>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">4. Third-Party Services</h3>
          <ul className="text-xs text-gray-600 list-disc list-inside space-y-2 pl-2">
            <li><strong>Google Analytics 4:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">Google Privacy Policy</a></li>
            <li><strong>Adsterra:</strong> <a href="https://adsterra.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">Adsterra Privacy Policy</a></li>
            <li><strong>Travelpayouts:</strong> <a href="https://www.travelpayouts.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">Travelpayouts Privacy Policy</a></li>
            <li><strong>Vercel:</strong> <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">Vercel Privacy Policy</a></li>
            <li><strong>Cloudflare:</strong> <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">Cloudflare Privacy Policy</a></li>
          </ul>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">5. Your Rights</h3>
          <ul className="text-xs text-gray-600 list-disc list-inside space-y-2 pl-2">
            <li><strong>Access:</strong> Request a copy of your personal data.</li>
            <li><strong>Rectification:</strong> Request correction of inaccurate data.</li>
            <li><strong>Erasure:</strong> Request deletion of your personal data ("right to be forgotten").</li>
            <li><strong>Restrict Processing:</strong> Request limitation on data processing.</li>
            <li><strong>Data Portability:</strong> Request your data in a machine-readable format.</li>
            <li><strong>Objection:</strong> Object to processing for marketing purposes.</li>
            <li><strong>Withdraw Consent:</strong> Withdraw cookie tracking consent at any time.</li>
            <li><strong>Complaint:</strong> Lodge a complaint with your local data protection authority.</li>
          </ul>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">6. Data Retention</h3>
          <ul className="text-xs text-gray-600 list-disc list-inside space-y-2 pl-2">
            <li>Server log files: Maximum 12 months</li>
            <li>Google Analytics data: 14 months</li>
            <li>Contact form submissions: 24 months or until deletion</li>
            <li>Affiliate tracking cookies: 30 days</li>
            <li>Consent preferences: Browser localStorage until cleared</li>
          </ul>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">7. International Data Transfers</h3>
          <p className="text-xs text-gray-500">
            Our website is hosted on Vercel's global infrastructure and served via Cloudflare's CDN. Your data may be processed in the United States and other countries. Appropriate safeguards are in place including standard contractual clauses.
          </p>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">8. Children's Privacy</h3>
          <p className="text-xs text-gray-500">
            Our website is not directed at children under 13 (or 16 in the EEA). We do not knowingly collect personal information from children. If you believe we have collected such information, please contact us immediately.
          </p>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">9. Security</h3>
          <p className="text-xs text-gray-500">
            We implement appropriate technical and organizational security measures including HTTPS encryption, secure hosting, and regular security reviews. However, no Internet transmission is 100% secure.
          </p>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">10. Changes to This Policy</h3>
          <p className="text-xs text-gray-500">
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. For significant changes, we provide prominent notice.
          </p>

          <div className="mt-8 pt-6 border-t border-[#E5E5E1]">
            <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">Legal Pages</p>
            <ul className="space-y-1.5 text-xs text-gray-500">
              <li><a href="/privacy-policy" className="hover:text-brand-orange transition inline-flex items-center gap-1">← Back to Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-brand-orange transition inline-flex items-center gap-1">Terms of Service →</a></li>
              <li><a href="/cookie-policy" className="hover:text-brand-orange transition inline-flex items-center gap-1">Cookie Policy →</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}