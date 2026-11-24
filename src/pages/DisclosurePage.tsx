import React from 'react';
import { Shield, Lock, FileText, BadgeCheck, Mail, Send, Check, Cpu, Globe, Users, Clock, AlertTriangle, Scale, Eye, Cookie, Database, Server, MapPin, Phone, Building2, BadgeCheck } from 'lucide-react';

interface DisclosurePageProps {
  backLink?: boolean;
}

export default function DisclosurePage({ backLink = false }: DisclosurePageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white border border-[#E5E5E1] rounded-none overflow-hidden">
        <div className="bg-[#F8F7F2] p-4 md:p-6 border-b border-[#E5E5E1]">
          <div className="flex items-center gap-3">
            <BadgeCheck className="w-6 h-6 text-[#B84200]" />
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold italic text-[#1A1A1A]">Affiliate Disclosure</h1>
              <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Last Updated: October 28, 2026</p>
            </div>
          </div>
        </div>
        <div className="p-6 md:p-10 text-sm text-[#1A1A1A]">
          <p className="text-gray-700 font-sans">
            This informational portal, <strong>bookmethat.com</strong> (BookMeThat), operates under strict commercial transparency principles. In accordance with the Federal Trade Commission (FTC) guidelines in the United States (16 CFR Part 255) and the European Consumer Protection directives (EU Directive 2005/29/EC and Directive 2011/83/EU), we explicitly declare that our content is monetized through commissions earned via travel booking affiliate networks.
          </p>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">1. Affiliate Network Partnerships</h3>
          <p className="text-xs text-gray-500">
            BookMeThat is a certified publisher in the <strong>Travelpayouts Affiliate Network</strong> (Publisher ID: 685596) and the <strong>Adsterra advertising network</strong> (Publisher ID: id723194). We display advertisements and referral links from these networks.
          </p>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">2. How Affiliate Links Work</h3>
          <p className="text-xs text-gray-500">
            When you click on recommendation links throughout our travel guides — including links to <strong>Saily, Airalo, Drimsim, Localrent, EconomyBookings, Auto Europe, QEEQ, BikesBooking, GetTransfer, Searadar, Go City, Klook, Radical Storage, NordVPN, Wise, Ekta Traveling, World Nomads, Compensair, AirHelp, and Expedia</strong> — you trigger standard tracking tags. These tags record zero unique personal identification factors. A cookie is placed on your browser (typically 30 days) so the merchant verifies you came from our site.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            This is standard industry practice and is fully disclosed here in compliance with FTC guidelines (16 CFR Part 255).
          </p>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">3. No Cost to You</h3>
          <p className="text-xs text-gray-500">
            Under no circumstances do these tracking markers increase the final ticket price, rental cost, or subscription toll paid by you. When you click through our affiliate links, your price is identical to what you would pay if you went directly to the merchant. We only earn a commission if you complete a booking or purchase through our link.
          </p>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">4. Editorial Independence</h3>
          <p className="text-xs text-gray-500">
            Our reviews and recommendations are based on independent research and real-world testing. Affiliate partnerships do not influence our editorial content. We do not accept payment for positive reviews or rankings. All opinions expressed are our own and based on thorough analysis of pricing, coverage, speed, and user experience.
          </p>

          <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-8 border-b border-[#E5E5E1] pb-3 italic">5. Advertising Disclosure</h3>
          <p className="text-xs text-gray-500">
            This website displays advertisements through <strong>Adsterra</strong> (Publisher ID: id723194, Website ID: 6112813). Advertisements are clearly labeled and served based on contextual relevance. We do not control the specific ads displayed and are not responsible for their content. Ad serving is consent-gated — no ads are displayed until you accept marketing cookies.
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