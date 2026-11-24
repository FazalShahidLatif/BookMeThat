import React, { useState, useEffect } from 'react';
import { Shield, Lock, FileText, BadgeCheck, Mail, Send, Check, Cpu, Globe, Users, Clock, AlertTriangle, Scale, Eye, Cookie, Database, Server, MapPin, Phone, Building2 } from 'lucide-react';
import DisclosurePage from '../pages/DisclosurePage';
import PrivacyPage from '../pages/PrivacyPolicy';
import TermsPage from '../pages/TermsPage';
import AISEOPage from '../pages/AISEOPage';
import CookiePolicyPage from '../pages/CookiePolicyPage';
import ImpressumPage from '../pages/ImpressumPage';

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
          <span className="text-[9px] font-mono tracking-widest text-[#B84200] uppercase font-bold bg-[#B84200]/10 border border-[#B84200]/30 px-2.5 py-0.5 rounded-none">Legal Pages</span>
          <h3 className="text-2xl font-serif font-bold italic text-[#1A1A1A] mt-2">Legal Compliance Center</h3>
          <p className="text-xs text-gray-700 mt-1">Fully transparent terms, privacy rules, affiliate disclosures, and legal compliance for bookmethat.com.</p>
        </div>
        <Shield className="w-8 h-8 text-[#B84200] hidden sm:block" />
      </div>

      <div className="p-6 md:p-10 text-sm leading-relaxed text-[#1A1A1A] view-enter">
        {activeSubTab === 'disclosure' && <DisclosurePage backLink />}
        {activeSubTab === 'privacy' && <PrivacyPage backLink />}
        {activeSubTab === 'terms' && <TermsPage backLink />}
        {activeSubTab === 'ai_seo' && <AISEOPage backLink />}
        {activeSubTab === 'cookie_policy' && <CookiePolicyPage backLink />}
        {activeSubTab === 'impressum' && <ImpressumPage backLink />}
      </div>
    </div>
  );
}
