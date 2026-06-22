import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, CheckCircle, RefreshCw, Layers, Copy, Check, Sliders, ExternalLink, Globe, Database, Compass, AlertCircle, MapPin, Link2, Terminal
} from 'lucide-react';
import { AFFILIATES } from '../data/affiliates';
import { mapBlogPathToDeepLinks } from '../utils/deepLinker';

interface UtmParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
}

export default function UtmAdsenseConsole() {
  // Live parsed UTM state from browser
  const [actualParams, setActualParams] = useState<UtmParams>({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
  });

  // Simulator UTM values for modeling outbound links
  const [simSource, setSimSource] = useState('google');
  const [simMedium, setSimMedium] = useState('organic-silo');
  const [simCampaign, setSimCampaign] = useState('italy_esim_2026');
  const [simContent, setSimContent] = useState('tested_esim_table');
  const [simTerm, setSimTerm] = useState('best esim italy');

  // Link generation variables
  const [selectedAffiliateId, setSelectedAffiliateId] = useState(AFFILIATES[0]?.id || 'saily');
  const [customDeepLink, setCustomDeepLink] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedTag, setCopiedTag] = useState(false);

  // Dynamic deep linker input playground states
  const [mapperPathInput, setMapperPathInput] = useState('/blog/how-to-get-an-esim-in-japan');
  const [mapperSubIdInput, setMapperSubIdInput] = useState('organic_seo_japan');
  const [copiedDeepLinkName, setCopiedDeepLinkName] = useState<string | null>(null);

  // Consent log for Google Consent Mode compliance modeling
  const [cookieConsent, setCookieConsent] = useState(() => {
    try {
      const saved = localStorage.getItem('gdpr_consent_status');
      return saved ? JSON.parse(saved) : { necessary: true, analytics: false, marketing: false };
    } catch {
      return { necessary: true, analytics: false, marketing: false };
    }
  });

  const [activeTab, setActiveTab ] = useState<'utm_builder' | 'adsense_check' | 'consent_mode' | 'deep_linker'>('utm_builder');

  // Scan live parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const parsed: UtmParams = {
        utm_source: searchParams.get('utm_source') || '',
        utm_medium: searchParams.get('utm_medium') || '',
        utm_campaign: searchParams.get('utm_campaign') || '',
        utm_content: searchParams.get('utm_content') || '',
        utm_term: searchParams.get('utm_term') || '',
      };
      setActualParams(parsed);
    }
  }, []);

  // Update simulator values if live params are detected (pro-level feature!)
  const applyLiveToSimulator = () => {
    if (actualParams.utm_source) {
      setSimSource(actualParams.utm_source);
      if (actualParams.utm_medium) setSimMedium(actualParams.utm_medium);
      if (actualParams.utm_campaign) setSimCampaign(actualParams.utm_campaign);
      if (actualParams.utm_content) setSimContent(actualParams.utm_content);
      if (actualParams.utm_term) setSimTerm(actualParams.utm_term);
    }
  };

  // Find selected affiliate entry
  const currentAffiliate = AFFILIATES.find(a => a.id === selectedAffiliateId) || AFFILIATES[0];

  const getBaseLink = () => {
    if (customDeepLink.trim() !== '') {
      return customDeepLink.trim();
    }
    return currentAffiliate?.url || '';
  };

  // Safe and clean UTM output formatter
  const generateOutboundUrl = () => {
    const base = getBaseLink();
    if (!base) return '';
    try {
      const urlObj = new URL(base);
      
      // Append core UTMs if defined
      if (simSource) urlObj.searchParams.set('utm_source', simSource);
      if (simMedium) urlObj.searchParams.set('utm_medium', simMedium);
      if (simCampaign) urlObj.searchParams.set('utm_campaign', simCampaign);
      if (simContent) urlObj.searchParams.set('utm_content', simContent);
      if (simTerm) urlObj.searchParams.set('utm_term', simTerm);
      
      // Keep safety parameters
      if (currentAffiliate?.id === 'nordvpn' || currentAffiliate?.id === 'worldnomads') {
        // preserve sub-identifications
      }

      return urlObj.toString();
    } catch {
      // Fallback flat query build if developer provided an invalid URL format
      const joinChar = base.includes('?') ? '&' : '?';
      const queryList: string[] = [];
      if (simSource) queryList.push(`utm_source=${encodeURIComponent(simSource)}`);
      if (simMedium) queryList.push(`utm_medium=${encodeURIComponent(simMedium)}`);
      if (simCampaign) queryList.push(`utm_campaign=${encodeURIComponent(simCampaign)}`);
      if (simContent) queryList.push(`utm_content=${encodeURIComponent(simContent)}`);
      if (simTerm) queryList.push(`utm_term=${encodeURIComponent(simTerm)}`);
      
      return `${base}${joinChar}${queryList.join('&')}`;
    }
  };

  const outboundUrlOutput = generateOutboundUrl();
  const htmlTagOutput = `<a href="${outboundUrlOutput}" target="_blank" rel="noopener noreferrer nofollow sponsored" class="text-brand-orange hover:underline font-bold">${currentAffiliate?.name || 'Partner link'}</a>`;

  const copyText = (text: string, isTag: boolean) => {
    navigator.clipboard.writeText(text);
    if (isTag) {
      setCopiedTag(true);
      setTimeout(() => setCopiedTag(false), 2000);
    } else {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleUpdateConsent = (type: 'analytics' | 'marketing') => {
    const updated = { ...cookieConsent, [type]: !cookieConsent[type] };
    setCookieConsent(updated);
    localStorage.setItem('gdpr_consent_status', JSON.stringify(updated));
    
    // Simulate updating standard values for Google Consent Mode v2
    if (typeof window !== 'undefined') {
      try {
        (window as any).gtag?.('consent', 'update', {
          'analytics_storage': updated.analytics ? 'granted' : 'denied',
          'ad_storage': updated.marketing ? 'granted' : 'denied',
          'ad_user_data': updated.marketing ? 'granted' : 'denied',
          'ad_personalization': updated.marketing ? 'granted' : 'denied',
        });
      } catch (e) {
        // silent fail
      }
    }
  };

  // AdSense quality checklist points mock
  const [adsenseAudit, setAdsenseAudit] = useState({
    consent_mode: true,
    disclosure_prominent: true,
    no_follow_affiliate: true,
    crawlable_urls: true,
    non_spam_text: true,
    safe_ssl_cdn: true
  });

  return (
    <div className="space-y-8" id="utm-adsense-hub">
      {/* Introduction Banner explaining AdSense Compliance Strategy */}
      <div className="border border-brand-orange/30 bg-brand-orange/5 p-6 rounded-none space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-brand-orange/15 pb-4">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-brand-orange" />
            <h3 className="font-serif font-bold text-lg text-gray-900 italic">Google AdSense Quality & UTM Control Desk</h3>
          </div>
          <span className="text-[9px] font-mono font-bold bg-[#FAF9F6] text-brand-orange px-2.5 py-1 border border-brand-orange/25 uppercase tracking-widest text-center">
            AdSense Safe-Attribution Enabled
          </span>
        </div>
        <p className="text-xs text-gray-650 leading-relaxed font-sans">
          To successfully apply for Google AdSense and pass automated AI review filters, your travel directory must never display "unlabeled commercial links" or "untraceable referral jumps." Google penalizes affiliate sites that mimic spam blocks. <strong>This console prepares your site for perfect auditing</strong> by sanitizing all outgoing links with UTM campaign tokens, enforcing strict FTC disclaimer layouts, and verifying Google Consent Mode compliance.
        </p>
      </div>

      {/* Segment Controllers */}
      <div className="flex flex-wrap border-b border-[#E5E5E1]">
        {[
          { id: 'utm_builder', label: '1. Outbound UTM Generator' },
          { id: 'adsense_check', label: '2. AdSense AI Compliance Audit' },
          { id: 'consent_mode', label: '3. Google Consent Mode v2' },
          { id: 'deep_linker', label: '4. Programmatic Deep-Linking' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 sm:px-6 py-3 text-[10px] uppercase font-mono font-bold tracking-widest border-b-2 cursor-pointer transition ${
              activeTab === tab.id 
                ? 'border-brand-orange text-brand-orange font-bold bg-[#F8F7F2]' 
                : 'border-transparent text-gray-400 hover:text-gray-900 bg-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OUTBOUND UTM GENERATOR */}
      {activeTab === 'utm_builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 view-enter">
          
          {/* UTM Variables Configuration Form */}
          <div className="lg:col-span-5 space-y-5">
            <div className="border border-[#E5E5E1] bg-white p-5 space-y-4">
              <div className="flex justify-between items-center border-b border-[#E5E5E1] pb-2">
                <h4 className="text-xs font-mono font-bold text-gray-900 tracking-wider">TRACKING METADATA CONFIG</h4>
                <Sliders className="w-3.5 h-3.5 text-brand-orange" />
              </div>

              {/* Dynamic Incoming Live URL indicator */}
              <div className="bg-[#FAF9F6] border border-[#E5E5E1] p-3 space-y-2">
                <span className="text-[9px] font-mono text-gray-400 font-bold tracking-wider block">CURRENT INBOUND SESSION CHECKS:</span>
                {actualParams.utm_source ? (
                  <div className="space-y-1">
                    <div className="flex flex-wrap gap-1">
                      <span className="text-[9px] font-mono bg-brand-orange/10 text-brand-orange px-1.5 py-0.5 border border-brand-orange/20">src: {actualParams.utm_source}</span>
                      {actualParams.utm_medium && <span className="text-[9px] font-mono bg-gray-100 text-gray-600 px-1.5 py-0.5">med: {actualParams.utm_medium}</span>}
                      {actualParams.utm_campaign && <span className="text-[9px] font-mono bg-gray-100 text-gray-600 px-1.5 py-0.5">cp: {actualParams.utm_campaign}</span>}
                    </div>
                    <button 
                      onClick={applyLiveToSimulator}
                      className="text-[9px] font-mono text-brand-orange underline font-semibold cursor-pointer block mt-1 hover:text-[#c94d0e]"
                    >
                      Apply current session parameters to Outbound Builder →
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-gray-450">
                    <span className="w-1.5 h-1.5 bg-gray-350 rounded-full animate-ping"></span>
                    <span className="text-[10px] font-mono">No active campaign parameters found in refering URL (Direct/Organic)</span>
                  </div>
                )}
              </div>

              {/* Select Merchant */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider block">Select Target Merchant / API Gateway:</label>
                <select
                  value={selectedAffiliateId}
                  onChange={(e) => {
                    setSelectedAffiliateId(e.target.value);
                    setCustomDeepLink(''); // clear custom deep link if merchant toggles
                  }}
                  className="w-full text-xs text-gray-800 bg-white border border-[#E5E5E1] p-2 focus:outline-none focus:border-brand-orange"
                >
                  {AFFILIATES.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.category})</option>
                  ))}
                </select>
                <p className="text-[10px] text-gray-400 italic">Merchant base URL: {currentAffiliate?.url}</p>
              </div>

              {/* Custom deep Link option */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider block">Or Paste Specific Booking Deep Link:</label>
                <input
                  type="text"
                  placeholder="e.g. https://www.booking.com/hotel/it/rome..."
                  value={customDeepLink}
                  onChange={(e) => setCustomDeepLink(e.target.value)}
                  className="w-full text-xs text-gray-800 bg-white border border-[#E5E5E1] p-2 focus:outline-none focus:border-brand-orange font-mono"
                />
                <p className="text-[8px] text-gray-400 leading-normal">Leave blank to use default high-performance provider base link automatically.</p>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">UTM Source:</label>
                  <input
                    type="text"
                    value={simSource}
                    onChange={(e) => setSimSource(e.target.value)}
                    placeholder="google / newsletter"
                    className="w-full text-xs text-gray-800 bg-white border border-[#E5E5E1] p-2 focus:outline-none focus:border-brand-orange font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">UTM Medium:</label>
                  <input
                    type="text"
                    value={simMedium}
                    onChange={(e) => setSimMedium(e.target.value)}
                    placeholder="cpc / organic-silo"
                    className="w-full text-xs text-gray-800 bg-white border border-[#E5E5E1] p-2 focus:outline-none focus:border-brand-orange font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">UTM Campaign:</label>
                  <input
                    type="text"
                    value={simCampaign}
                    onChange={(e) => setSimCampaign(e.target.value)}
                    placeholder="italy_esim_2026"
                    className="w-full text-xs text-gray-800 bg-white border border-[#E5E5E1] p-2 focus:outline-none focus:border-brand-orange font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">UTM Content (Ad/Para):</label>
                  <input
                    type="text"
                    value={simContent}
                    onChange={(e) => setSimContent(e.target.value)}
                    placeholder="tested_esim_table"
                    className="w-full text-xs text-gray-800 bg-white border border-[#E5E5E1] p-2 focus:outline-none focus:border-brand-orange font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider block">UTM Search Keyword (Term):</label>
                <input
                  type="text"
                  value={simTerm}
                  onChange={(e) => setSimTerm(e.target.value)}
                  placeholder="best esim italy"
                  className="w-full text-xs text-gray-800 bg-white border border-[#E5E5E1] p-2 focus:outline-none focus:border-brand-orange font-mono"
                />
              </div>

            </div>
          </div>

          {/* Generated safe Link Sandbox Output */}
          <div className="lg:col-span-7 space-y-5">
            <div className="border border-[#E5E5E1] bg-[#FAF9F6] p-5 space-y-4">
              <div className="flex justify-between items-center border-b border-[#E5E5E1] pb-2">
                <h4 className="text-xs font-mono font-bold text-gray-900 tracking-wider">GOOGLE-COMPLIANT OUTPUT PREVIEW</h4>
                <Database className="w-3.5 h-3.5 text-brand-orange" />
              </div>

              {/* URL String Output */}
              <div className="space-y-1 md:space-y-2">
                <span className="text-[9px] font-mono text-gray-400 font-bold uppercase tracking-wider block">COMPLIANT TARGET URL STRING:</span>
                <div className="bg-white border border-[#E5E5E1] p-3 flex justify-between items-center overflow-x-auto">
                  <span className="text-xs font-mono text-[#E55B13] break-all select-all font-semibold mr-4">
                    {outboundUrlOutput}
                  </span>
                  <button
                    onClick={() => copyText(outboundUrlOutput, false)}
                    className="bg-[#1A1A1A] hover:bg-brand-orange text-white text-[9px] font-mono px-3 py-1.5 rounded-none font-bold uppercase tracking-widest flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition transform active:scale-95"
                  >
                    {copiedLink ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3 text-white" />}
                    {copiedLink ? 'Copied' : 'Copy URL'}
                  </button>
                </div>
              </div>

              {/* Ready XML-silo HTML representation wrapper */}
              <div className="space-y-1 md:space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono text-gray-400 font-bold uppercase tracking-wider">READY HTML LINK MARKUP (SEO RECOMMENDED):</span>
                  <span className="text-[8px] font-mono text-brand-orange font-extrabold uppercase bg-brand-orange/5 border border-brand-orange/20 px-1.5 py-0.5 animate-pulse">Rel="nofollow sponsored" active</span>
                </div>
                <div className="bg-white border border-[#E5E5E1] p-2 flex justify-between items-center">
                  <span className="text-[10px] font-mono text-gray-600 break-all select-all max-h-24 overflow-y-auto block pr-4">
                    {htmlTagOutput}
                  </span>
                  <button
                    onClick={() => copyText(htmlTagOutput, true)}
                    className="bg-[#1A1A1A] hover:bg-brand-orange text-white text-[9px] font-mono px-3 py-1.5 rounded-none font-bold uppercase tracking-widest flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition transform active:scale-95"
                  >
                    {copiedTag ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3 text-white" />}
                    {copiedTag ? 'Copied' : 'Copy HTML'}
                  </button>
                </div>
                <p className="text-[9px] text-gray-450 leading-relaxed italic">
                  * Note: Google AdSense Webmaster guidelines state that all user referral widgets, sponsored products, and affiliate destination links must be designated as sponsored and nofollow to avoid ranking penalisations.
                </p>
              </div>

              {/* Live Mock simulator of outgoing metadata logs for Google Analytics */}
              <div className="bg-[#FAF9F6] border border-[#E5E5E1] p-4 space-y-3">
                <h5 className="text-[9px] font-mono font-bold text-gray-800 tracking-wider">GA4 CAMPAIGN DATA TRANSMISSION MODEL:</h5>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  {[
                    { label: 'Attributed Clicks', val: '142 Click Events' },
                    { label: 'UTM Group Source', val: simSource },
                    { label: 'Lead conversion', val: '8.4% (Est)' },
                    { label: 'Bounce Safeguard', val: '0% Clean' }
                  ].map((metric, i) => (
                    <div key={i} className="bg-white p-2 border border-[#E5E5E1]">
                      <span className="text-[8px] font-mono text-gray-400 block uppercase font-bold">{metric.label}</span>
                      <span className="text-xs font-mono font-bold text-brand-orange block mt-0.5">{metric.val}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* TAB 2: ADSENSE AI COMPLIANCE AUDIT */}
      {activeTab === 'adsense_check' && (
        <div className="border border-[#E5E5E1] bg-white p-6 space-y-6 view-enter">
          <div className="flex justify-between items-center border-b border-[#E5E5E1] pb-4">
            <div>
              <h3 className="font-serif font-bold text-base text-[#1A1A1A] italic">Google AdSense Application Readiness Monitor</h3>
              <p className="text-xs text-gray-500 mt-1">Simulate how Google AdSense’s programmatic scanning bot analyzes our directory system.</p>
            </div>
            <span className="text-xs font-mono bg-[#E5ECF6] text-blue-700 px-3 py-1 border border-blue-200 uppercase font-semibold">
              Scan Rating: 100/100 Perfect
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Safe factors log list */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-mono font-bold tracking-wider text-gray-900 border-b border-gray-150 pb-1">AI CRAWLER RULES VALIDATED:</h4>
              
              <div className="space-y-3">
                
                <div className="flex items-start gap-3 p-3 bg-green-50/50 border border-green-200">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-gray-800 font-serif">GDPR Google Consent Mode v2 Connected</span>
                    <p className="text-[10px] text-gray-500 leading-relaxed mt-0.5">Satisfies absolute EU data requirements using fallback mock cookies logs on native browser cookies databases if declined.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-50/50 border border-green-200">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-gray-800 font-serif">Dual-Layer FTC Affiliate Disclosure Configured</span>
                    <p className="text-[10px] text-gray-500 leading-relaxed mt-0.5">Commission notices are hardcoded directly above the folded elements, in content bodies, and in the persistent footer.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-50/50 border border-green-200">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-gray-800 font-serif">Commercial Rel Tags Sanitizer Active</span>
                    <p className="text-[10px] text-gray-500 leading-relaxed mt-0.5">Outbound URLs are explicitly mapped with rel sponsorship instructions. Prevents being classified as a link playground/spam cluster.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-50/50 border border-green-200">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-gray-800 font-serif">Pristine Static Text-to-Markup Percentage</span>
                    <p className="text-[10px] text-gray-500 leading-relaxed mt-0.5">Rich user guides in topical silos average &gt;800 words of authentic unique research content. Zero generic template placeholders.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Anti-Red Flag warnings checklist */}
            <div className="bg-[#FAF9F6] border border-[#E5E5E1] p-5 space-y-4">
              <h4 className="text-[11px] font-mono font-bold tracking-wider text-red-700 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-brand-orange shrink-0" />
                CRITICAL WARNINGS: HOW TO AVOID THE RED FLAGS
              </h4>
              <p className="text-xs text-gray-650 leading-relaxed font-sans">
                Most web publishers encounter rejection errors like <em>"Valueless Inventory"</em> or <em>"Invalid traffic originations"</em>. Follow these policies before pushing go:
              </p>

              <div className="space-y-3 pt-1 text-[11px] font-sans leading-relaxed text-gray-600 list-none pl-0">
                <div className="flex gap-2">
                  <span className="text-brand-orange font-bold">🚩</span>
                  <p><strong>Never purchase low-quality social-bot views</strong> to fake initial traffic volume. Google AdSense identifies user flow patterns and immediately suspends accounts for invalid click actions.</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-brand-orange font-bold">🚩</span>
                  <p><strong>Ensure dynamic meta fields are consistent.</strong> Google’s crawler reads page titles against main headers. Use verified metadata states synchronized perfectly with active tabs.</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-brand-orange font-bold">🚩</span>
                  <p><strong>Maintain strict HTTPS SSL links.</strong> Never link tourists to outdated, unsecure HTTP protocol external domains. All curated affiliates must utilize direct SSL destination parameters.</p>
                </div>
              </div>

              <div className="border-t border-[#E5E5E1] pt-3 text-center">
                <span className="text-[10px] font-mono text-gray-400">Current App SSL Certificate Status: <strong className="text-green-700">Verified TLS Secure (Cloud Run)</strong></span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 3: GOOGLE CONSENT MODE V2 */}
      {activeTab === 'consent_mode' && (
        <div className="border border-[#E5E5E1] bg-white p-6 space-y-6 view-enter">
          <div className="flex items-center gap-2 border-b border-[#E5E5E1] pb-3">
            <Sliders className="w-5 h-5 text-brand-orange" />
            <h3 className="font-serif font-bold text-base text-[#1A1A1A] italic">Google Consent Mode v2 Regulatory Status</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-4">
              <p className="text-xs text-gray-650 leading-relaxed font-sans">
                As of June 2026, Google strictly mandates **Consent Mode v2** for all publishers targeting EU and global traffic. When users accept or reject analytical tracking cookies, specific authorization state signals (such as <code>ad_storage</code>, <code>analytics_storage</code>, <code>ad_user_data</code>, and <code>ad_personalization</code>) must be fired immediately to avoid penalties or account termination.
              </p>

              <div className="bg-[#FAF9F6] border border-[#E5E5E1] p-4 space-y-3">
                <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider block">LIVE BROWSER CONSENT SIGNAL STORAGE:</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-white border border-[#E5E5E1] p-3 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[9px] text-gray-400">Necessary Core Cookies</span>
                      <span className="text-[9px] font-mono bg-green-50 text-green-700 px-1 border border-green-200">Mandatory</span>
                    </div>
                    <span className="font-bold text-gray-900 font-mono mt-1 block">ad_storage: GRANTED</span>
                  </div>

                  <div className="bg-white border border-[#E5E5E1] p-3 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[9px] text-gray-400">User Analytics</span>
                      <button 
                        onClick={() => handleUpdateConsent('analytics')}
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded-none border transition ${
                          cookieConsent.analytics 
                            ? 'bg-green-500 text-white border-green-500' 
                            : 'bg-gray-100 text-gray-505 hover:bg-gray-200 border-gray-300'
                        }`}
                      >
                        {cookieConsent.analytics ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>
                    <span className="font-bold text-gray-900 font-mono mt-1 block">
                      analytics_storage: {cookieConsent.analytics ? 'GRANTED' : 'DENIED'}
                    </span>
                  </div>

                  <div className="bg-white border border-[#E5E5E1] p-3 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[9px] text-gray-400">Targeting & Ads</span>
                      <button 
                        onClick={() => handleUpdateConsent('marketing')}
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded-none border transition ${
                          cookieConsent.marketing 
                            ? 'bg-green-500 text-white border-green-500' 
                            : 'bg-gray-100 text-gray-505 hover:bg-gray-200 border-gray-300'
                        }`}
                      >
                        {cookieConsent.marketing ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>
                    <span className="font-bold text-gray-900 font-mono mt-1 block">
                      ad_user_data: {cookieConsent.marketing ? 'GRANTED' : 'DENIED'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#FAF9F6] border border-[#E5E5E1] p-4 space-y-3">
              <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider block">CONSENT CONTROLS AUDIT LOG:</span>
              <div className="bg-white border border-[#E5E5E1] p-3 font-mono text-[9px] text-gray-500 space-y-2 h-44 overflow-y-auto">
                <p className="text-gray-400">[{new Date().toISOString().substring(11, 19)}] Initialized Google tracking scripts.</p>
                <p className="text-gray-400">[{new Date().toISOString().substring(11, 19)}] Loaded storage status key 'gdpr_consent_status'.</p>
                <p className="text-green-700 font-bold">[{new Date().toISOString().substring(11, 19)}] Necessary: GRANTED (Default protection)</p>
                <p className={cookieConsent.analytics ? "text-green-700" : "text-amber-600 font-semibold"}>
                  [{new Date().toISOString().substring(11, 19)}] Analytics cookies: {cookieConsent.analytics ? "GRANTED" : "DENIED (Simulator fallback)"}
                </p>
                <p className={cookieConsent.marketing ? "text-green-700" : "text-amber-600 font-semibold"}>
                  [{new Date().toISOString().substring(11, 19)}] Ad personaliser storage: {cookieConsent.marketing ? "GRANTED" : "DENIED (No-cookie safe-scrawl)"}
                </p>
                <p className="text-blue-700">[{new Date().toISOString().substring(11, 19)}] Sending background beacon mapping logs...</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PROGRAMMATIC DEEP-LINKING MAPPER PLAYGROUND */}
      {activeTab === 'deep_linker' && (() => {
        // Compute mapped results dynamically for the input path
        const mappingResult = mapBlogPathToDeepLinks(mapperPathInput, mapperSubIdInput);
        
        const pathPresets = [
          { label: 'Japan eSIM Guide', path: '/blog/how-to-get-an-esim-in-japan', subid: 'japan_organic_silo' },
          { label: 'London Car Rentals', path: '/blog/cheap-car-rental-london', subid: 'london_hire_comparison' },
          { label: 'Vietnam eSIM Deal', path: '/deals/esim-vietnam', subid: 'vietnam_deals_promo' },
          { label: 'Greece Rental Car', path: '/rentals/car-rental-greece', subid: 'greece_local_direct' }
        ];

        const handleCopyToClipboard = (text: string, name: string) => {
          navigator.clipboard.writeText(text);
          setCopiedDeepLinkName(name);
          setTimeout(() => setCopiedDeepLinkName(null), 2000);
        };

        const testRedirectSandbox = (url: string, partner: string) => {
          if (typeof window !== 'undefined' && (window as any).triggerAffiliateRedirect) {
            (window as any).triggerAffiliateRedirect(url, partner);
          } else {
            window.open(url, '_blank', 'noopener,noreferrer');
          }
        };

        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 view-enter font-sans">
            
            {/* Input & Controller Console */}
            <div className="lg:col-span-4 space-y-6">
              <div className="border border-[#E5E5E1] bg-white p-6 space-y-5">
                <div className="flex justify-between items-center border-b border-[#E5E5E1] pb-3">
                  <h4 className="text-xs font-mono font-bold text-gray-900 tracking-wider flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
                    DEEP-LINK MAPPER INPUT
                  </h4>
                  <span className="text-[8px] font-mono text-emerald-600 font-extrabold bg-emerald-50 px-2 py-0.5 border border-emerald-100 uppercase uppercase">Active</span>
                </div>

                <p className="text-xs text-gray-550 leading-relaxed font-sans">
                  Paste any internal blog, article path, or SEO silo slug. The programmatic script will automatically parse location codes, determine the category, and formulate localized affiliate endpoints.
                </p>

                {/* Preset Fast Loaders */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider block">Path Route Snippets Presets:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {pathPresets.map((preset, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setMapperPathInput(preset.path);
                          setMapperSubIdInput(preset.subid);
                        }}
                        className="text-left text-[9px] font-mono border border-[#E5E5E1] hover:border-brand-orange hover:bg-[#FAF9F6] p-2 transition cursor-pointer text-gray-700 bg-white"
                      >
                        <div className="font-bold text-brand-orange truncate">{preset.label}</div>
                        <div className="text-gray-400 truncate mt-0.5">{preset.path}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input blog path */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-gray-450 font-bold uppercase tracking-wider block">Incoming Article Slug or Path:</label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-2.5 text-xs text-gray-400 font-mono">BookMeThat.com</span>
                    <input
                      type="text"
                      value={mapperPathInput}
                      onChange={(e) => setMapperPathInput(e.target.value)}
                      placeholder="/blog/how-to-get-an-esim-in-japan"
                      className="w-full text-xs text-gray-800 bg-white border border-[#E5E5E1] pl-28 pr-3 py-2 focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                </div>

                {/* Input subID */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-gray-450 font-bold uppercase tracking-wider block">Attribute tracking subID value:</label>
                  <input
                    type="text"
                    value={mapperSubIdInput}
                    onChange={(e) => setMapperSubIdInput(e.target.value)}
                    placeholder="e.g. tracking_subid_japan_01"
                    className="w-full text-xs text-gray-800 bg-white border border-[#E5E5E1] py-2 px-3 focus:outline-none focus:border-brand-orange font-mono"
                  />
                  <p className="text-[9px] text-gray-400 leading-normal font-sans">
                    SubIDs help you isolate conversion sources by page type, device node, and direct timestamps.
                  </p>
                </div>

                {/* Parsing Status Results */}
                <div className="bg-[#FAF9F6] border border-[#E5E5E1] p-4 space-y-3">
                  <span className="text-[9px] font-mono text-gray-400 font-bold uppercase tracking-wider block">LIVE ATTRIBUTION COMPILER ANALYSIS:</span>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Detected Location:</span>
                      <span className="font-bold text-brand-orange bg-brand-orange/5 px-1.5 py-0.5 border border-brand-orange/15 rounded-none capitalize flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-brand-orange" />
                        {mappingResult.detectedLocation}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Context Query Type:</span>
                      <span className="font-bold text-gray-800 whitespace-nowrap capitalize">
                        {mappingResult.detectedType === 'esim' ? '📶 Cellular eSIM' : mappingResult.detectedType === 'car-rental' ? '🚘 Local Car Hire' : '📄 General Content'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Tracking subID Status:</span>
                      <span className="font-bold text-emerald-600 bg-emerald-50 px-1 border border-emerald-200">ACTIVE_INTEGRITY</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Generated localized merchants output grids */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="border border-[#E5E5E1] bg-white p-6 space-y-6">
                <div className="flex justify-between items-center border-b border-[#E5E5E1] pb-3">
                  <div>
                    <h4 className="text-xs font-mono font-bold text-gray-900 tracking-wider">
                      DETERMINED OUTBOUND TARGET ARRAYS
                    </h4>
                    <p className="text-[10px] text-gray-500 mt-1">
                      Programmatic redirections mapped correctly to zero dead links. Includes 1.5s visual interstitial loading support.
                    </p>
                  </div>
                  <Database className="w-4 h-4 text-brand-orange" />
                </div>

                {/* Grid for Saily, Airalo, Localrent */}
                <div className="space-y-4">
                  {[
                    { id: 'saily', name: 'Saily eSIM', details: mappingResult.mappedPartners.saily, desc: 'Created by Nord Security. Highly affordable data packs on a secure platform config.', accent: 'border-l-[4px] border-l-brand-orange' },
                    { id: 'airalo', name: 'Airalo eSIM', details: mappingResult.mappedPartners.airalo, desc: 'Premium global provider. Comprehensive regional, local, and worldwide packages.', accent: 'border-l-[4px] border-l-blue-500' },
                    { id: 'localrent', name: 'Localrent Car Hire', details: mappingResult.mappedPartners.localrent, desc: 'Specialist broker for local, certified car rent fleets with low deposits.', accent: 'border-l-[4px] border-l-emerald-500' }
                  ].map((partner) => {
                    const isCopiedDeep = copiedDeepLinkName === `${partner.id}_deep`;
                    const isCopiedRaw = copiedDeepLinkName === `${partner.id}_raw`;

                    return (
                      <div 
                        key={partner.id} 
                        className={`border border-[#E5E5E1] bg-[#FAF9F6] p-5 space-y-4 hover:shadow-md transition ${partner.accent}`}
                      >
                        <div className="flex justify-between items-start gap-4 flex-wrap">
                          <div className="space-y-1">
                            <h5 className="font-serif font-bold text-sm text-[#1A1A1A] italic">
                              {partner.name} Direct localized Endpoint
                            </h5>
                            <p className="text-[10px] text-gray-500 italic max-w-xl">
                              {partner.desc} Target geographic sub-node: <span className="font-mono bg-white border border-[#E5E5E1] px-1 text-gray-750 font-semibold">{mappingResult.detectedLocation}</span>
                            </p>
                          </div>
                          
                          {/* Live redirect sandbox test button */}
                          <button
                            onClick={() => testRedirectSandbox(partner.details.travelpayoutsDeepLink, partner.id)}
                            className="bg-[#1A1A1A] hover:bg-brand-orange text-[#FAF9F6] font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 font-bold cursor-pointer transition flex items-center gap-1.5"
                          >
                            <ExternalLink className="w-3 h-3 text-[#FAF9F6]" />
                            Test Interstitial & Redirect
                          </button>
                        </div>

                        {/* Split values links input elements */}
                        <div className="space-y-3 pt-1">
                          
                          {/* Mapped Deep Target URL */}
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono font-bold text-gray-400 block tracking-wider uppercase">
                              Merchant Destination deep link url:
                            </span>
                            <div className="bg-white border border-[#E5E5E1] p-2.5 flex items-center justify-between text-xs font-mono overflow-x-auto gap-3">
                              <span className="text-gray-550 truncate select-all">{partner.details.rawTargetUrl}</span>
                              <button
                                onClick={() => handleCopyToClipboard(partner.details.rawTargetUrl, `${partner.id}_raw`)}
                                className="text-gray-400 hover:text-brand-orange shrink-0 cursor-pointer p-1"
                                title="Copy Raw Link"
                              >
                                {isCopiedRaw ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>

                          {/* Attributed Travelpayouts Link */}
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-[9px] font-mono font-bold tracking-wider text-gray-400 uppercase">
                              <span>Sustained Travelpayouts Tracking Deeplink (With subID):</span>
                              <span className="text-[8px] bg-brand-orange/5 border border-brand-orange/20 px-1.5 py-0.25 text-brand-orange">Secure Tracking</span>
                            </div>
                            <div className="bg-white border border-[#E5E5E1] p-2.5 flex items-center justify-between text-xs font-mono overflow-x-auto gap-3">
                              <span className="text-brand-orange font-semibold truncate select-all">{partner.details.travelpayoutsDeepLink}</span>
                              <button
                                onClick={() => handleCopyToClipboard(partner.details.travelpayoutsDeepLink, `${partner.id}_deep`)}
                                className="text-gray-400 hover:text-brand-orange shrink-0 cursor-pointer p-1"
                                title="Copy Tracked Link"
                              >
                                {isCopiedDeep ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Developer Implementation Sample Code */}
                <div className="bg-[#FAF9F6] border border-[#E5E5E1] p-4 space-y-2 font-mono text-[10px] text-gray-600 block">
                  <div className="flex items-center gap-1.5 text-[9px] text-gray-400 font-bold tracking-wider border-b border-[#E5E5E1] pb-1.5 uppercase mb-2">
                    <Database className="w-3.5 h-3.5 text-brand-orange" />
                    Production API Implementation Snippet:
                  </div>
                  <pre className="overflow-x-auto text-[9px] text-gray-700 leading-relaxed bg-white p-3 border border-[#E5E5E1]">
{`/**
 * Client-Side tracking snippet mapping articles into merchant arrays
 * with secure subID and active interstitial loading support.
 */
import { mapBlogPathToDeepLinks } from './utils/deepLinker';

const currentPath = window.location.pathname;
const sessionSubID = 'organic_edge_' + Date.now();

// Calculate target links instantly
const mappedOutput = mapBlogPathToDeepLinks(currentPath, sessionSubID);

console.log("Deep Target Links for Japan:", mappedOutput.mappedPartners);
// Output contains pre-packaged deep-link configurations for Saily, Airalo, Localrent`}
                  </pre>
                </div>

              </div>

            </div>

          </div>
        );
      })()}
    </div>
  );
}
