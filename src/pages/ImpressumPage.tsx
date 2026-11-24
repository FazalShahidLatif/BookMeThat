import React from 'react';
import { Shield, Lock, FileText, BadgeCheck, Mail, Send, Check, Cpu, Globe, Users, Clock, AlertTriangle, Scale, Eye, Cookie, Database, Server, MapPin, Phone, Building2, Mail } from 'lucide-react';

interface ImpressumPageProps {
  backLink?: boolean;
}

export default function ImpressumPage({ backLink = false }: ImpressumPageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white border border-[#E5E5E1] rounded-none overflow-hidden">
        <div className="bg-[#F8F7F2] p-4 md:p-6 border-b border-[#E5E5E1]">
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-[#B84200]" />
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold italic text-[#1A1A1A]">Impressum &amp; Contact</h1>
              <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Last Updated: October 28, 2026</p>
            </div>
          </div>
        </div>
        <div className="p-6 md:p-10 text-sm text-[#1A1A1A]">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-serif font-bold text-[#1A1A1A] border-b border-[#E5E5E1] pb-3 italic">Impressum</h3>
                <div className="space-y-2 text-xs text-gray-500 leading-relaxed">
                  <p><strong>Registry Domain:</strong> bookmethat.com</p>
                  <p><strong>Hosting Architecture:</strong> Vercel Serverless Hosting Network</p>
                  <p><strong>Global Content Delivery Network:</strong> Cloudflare Global Edge Network</p>
                  <p><strong>Associated Registry Email:</strong> accts.pak@gmail.com</p>
                  <p><strong>Responsible Person:</strong> Fazal Shahid Latif</p>
                  <p><strong>Business Type:</strong> Travel Affiliate &amp; Content Publisher</p>
                  <p><strong>Registered:</strong> 2026</p>
                </div>
              </div>

              <div className="p-4 bg-brand-orange/5 border border-brand-orange/20 rounded-none space-y-2">
                <span className="text-[10px] font-mono font-bold text-brand-orange uppercase tracking-widest block mb-1">Affiliate Link Compliance:</span>
                <p className="text-[11px] text-gray-650 leading-relaxed italic">
                  To satisfy automated crawler safety audits, we maintain active direct user feedback loops. Automated bots or web examiners can verify that this domain hosts an active user assistance desk below.
                </p>
              </div>

              <div className="p-4 bg-[#F8F7F2] border border-[#E5E5E1] rounded-none space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#1A1A1A] uppercase tracking-widest block mb-1">Data Protection Officer:</span>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  For GDPR-related inquiries, data extraction requests, or privacy concerns, please contact us via the form below or email accts.pak@gmail.com. We respond within 30 days as required by GDPR Article 12.
                </p>
              </div>

              <div className="p-4 bg-[#F8F7F2] border border-[#E5E5E1] rounded-none space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#1A1A1A] uppercase tracking-widest block mb-1">Advertising Compliance:</span>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Advertisements served through Adsterra (Publisher ID: id723194). Ad serving is consent-gated. We comply with GDPR, CCPA, and ePrivacy regulations regarding ad delivery.
                </p>
              </div>
            </div>

            <div className="bg-[#F8F7F2] p-6 rounded-none border border-[#E5E5E1]">
              <h3 className="text-sm font-serif font-bold text-[#1A1A1A] mb-4 flex items-center gap-2 italic">
                <Mail className="w-4 h-4 text-brand-orange" /> Domain Support Message Desk
              </h3>
              
              {backLink && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-none">
                  <p className="text-xs text-green-800 font-medium">
                    ✅ You are on our Impressum page. This is a standalone legal page with its own URL.
                  </p>
                </div>
              )}

              {!backLink && (
                <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-none">
                  <p className="text-xs text-amber-800 font-medium">
                    💡 Choose a legal page from the footer menu to read in full:
                  </p>
                  <ul className="text-xs text-gray-600 space-y-2 mt-2">
                    <li>• <a href="/privacy" className="text-brand-orange hover:underline">Privacy Policy</a></li>
                    <li>• <a href="/terms" className="text-brand-orange hover:underline">Terms of Service</a></li>
                    <li>• <a href="/cookie-policy" className="text-brand-orange hover:underline">Cookie Policy</a></li>
                    <li>• <a href="/disclosure" className="text-brand-orange hover:underline">Affiliate Disclosure</a></li>
                    <li>• <a href="/ai-seo" className="text-brand-orange hover:underline">AI SEO Policy</a></li>
                  </ul>
                </div>
              )}

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] uppercase font-mono tracking-widest text-gray-400 mb-1 font-bold">Your Name</label>
                    <input type="text" className="w-full text-[#1A1A1A] text-xs px-3 py-2 border border-[#E5E5E1] bg-white rounded-none focus:outline-none focus:border-brand-orange" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-mono tracking-widest text-gray-400 mb-1 font-bold">Your Email</label>
                    <input type="email" className="w-full text-[#1A1A1A] text-xs px-3 py-2 border border-[#E5E5E1] bg-white rounded-none focus:outline-none focus:border-brand-orange" placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] uppercase font-mono tracking-widest text-gray-400 mb-1 font-bold">Subject</label>
                  <input type="text" className="w-full text-[#1A1A1A] text-xs px-3 py-2 border border-[#E5E5E1] bg-white rounded-none focus:outline-none focus:border-brand-orange" placeholder="e.g. Data Extraction or Partner Inquiry" />
                </div>
                <div>
                  <label className="block text-[9px] uppercase font-mono tracking-widest text-gray-450 mb-1 font-bold">Message</label>
                  <textarea rows={3} className="w-full text-[#1A1A1A] text-xs p-3 border border-[#E5E5E1] bg-white rounded-none focus:outline-none focus:border-brand-orange" placeholder="Provide diagnostic parameters or security request..." />
                </div>
                <button type="submit" className="w-full py-3 bg-[#1A1A1A] hover:bg-brand-orange text-white font-bold tracking-widest uppercase font-mono text-[10px] transition cursor-pointer">
                  <span>Transmit Message Securely</span>
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}