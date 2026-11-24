import React from 'react';
import { Shield, Lock, FileText, BadgeCheck, Mail, Send, Check, Cpu, Globe, Users, Clock, AlertTriangle, Scale, Eye, Cookie, Database, Server, MapPin, Phone, Building2, Cookie } from 'lucide-react';

interface CookiePolicyPageProps {
  backLink?: boolean;
}

export default function CookiePolicyPage({ backLink = false }: CookiePolicyPageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white border border-[#E5E5E1] rounded-none overflow-hidden">
        <div className="bg-[#F8F7F2] p-4 md:p-6 border-b border-[#E5E5E1]">
          <div className="flex items-center gap-3">
            <Cookie className="w-6 h-6 text-[#B84200]" />
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold italic text-[#1A1A1A]">Cookie Policy</h1>
              <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Last Updated: October 28, 2026</p>
            </div>
          </div>
        </div>
        <div className="p-6 md:p-10 text-sm text-[#1A1A1A]">
          <p className="text-gray-700 font-sans">
            This Cookie Policy explains how bookmethat.com ("we," "us," or "our") uses cookies and similar tracking technologies when you visit our website. It explains what these technologies are, why we use them, and your rights to control them. This policy does not cover third-party cookies placed by partners or service providers.
          </p>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">1. What Are Cookies?</h3>
          <p className="text-xs text-gray-500">
            A cookie is a small text file that is placed on your computer or mobile device when you visit a website. Cookies are widely used to make websites work efficiently, improve user experience, and provide information to website owners. They are not programs — they cannot run code, access your personal files, or carry viruses.
          </p>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">2. Types of Cookies We Use</h3>
          <ul className="text-xs text-gray-600 list-disc list-inside space-y-2 pl-2">
            <li><strong>Strictly Necessary Cookies:</strong> Essential for core site functionality (e.g., cookie consent preferences, session management). Without these, the site cannot function properly.</li>
            <li><strong>Functionality Cookies:</strong> Recognise you when you return. Remember preferences (e.g., language, region) so you don't re-enter them each visit.</li>
            <li><strong>Analytics Cookies:</strong> Google Analytics 4 — detects unique visitors and tracks page views, session duration, and traffic sources. Collects anonymized data.</li>
            <li><strong>Advertising Cookies:</strong> Adsterra — consent-gated ad serving. Tracks browsing for relevant advertising. Honors DNT and GPC signals.</li>
            <li><strong>Affiliate Tracking Cookies:</strong> Placed by partner merchants when you click an affiliate link. Track referrals. Typically expire after 30 days.</li>
          </ul>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">3. Managing Cookies</h3>
          <p className="text-xs text-gray-500">
            You can control and manage cookies through your browser settings. You can:
          </p>
          <ul className="text-xs text-gray-600 list-disc list-inside space-y-2 pl-2">
            <li>Refuse all cookies</li>
            <li>Indicate when a cookie is being sent</li>
            <li>Delete cookies after each session</li>
            <li>Set preferences for specific cookie categories via our cookie consent banner</li>
          </ul>
          <p className="text-xs text-gray-500 mt-2">
            Disabling cookies may affect site functionality. Our site remains fully accessible without tracking cookies.
          </p>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">4. Third-Party Cookies</h3>
          <ul className="text-xs text-gray-600 list-disc list-inside space-y-2 pl-2">
            <li><strong>Travelpayouts:</strong> When you click an affiliate link, the partner merchant may place cookies to track referrals. Governed by the partner's cookie policy.</li>
            <li><strong>Adsterra:</strong> May place cookies to serve relevant advertisements. We honor DNT and GPC signals.</li>
            <li><strong>Google Analytics:</strong> Google may use cookies to collect anonymized analytics data.</li>
          </ul>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">5. Cookie Duration</h3>
          <table className="w-full text-left text-xs text-gray-800 border border-[#E5E5E1] rounded-none overflow-hidden bg-white">
            <thead className="bg-[#F8F7F2] text-[#1A1A1A] font-mono font-bold text-[9px] uppercase tracking-wider border-b border-[#E5E5E1]">
              <tr>
                <th className="p-3">Cookie Type</th>
                <th className="p-3">Purpose</th>
                <th className="p-3">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E1]">
              <tr><td className="p-3">Strictly Necessary</td><td className="p-3">Core site functionality</td><td className="p-3">Session</td></tr>
              <tr><td className="p-3">Functionality</td><td className="p-3">Remember preferences</td><td className="p-3">Up to 12 months</td></tr>
              <tr><td className="p-3">Analytics (GA4)</td><td className="p-3">Usage analysis</td><td className="p-3">14 months</td></tr>
              <tr><td className="p-3">Advertising (Adsterra)</td><td className="p-3">Ad targeting, measurement</td><td className="p-3">30 days</td></tr>
              <tr><td className="p-3">Affiliate tracking</td><td className="p-3">Track affiliate referrals</td><td className="p-3">30 days</td></tr>
            </tbody>
          </table>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">6. Changes to This Cookie Policy</h3>
          <p className="text-xs text-gray-500">
            We may update this policy from time to time. Changes will be posted on this page with an updated "Last Updated" date.
          </p>

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