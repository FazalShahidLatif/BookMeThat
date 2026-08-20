import React, { useState, useEffect } from 'react';
import { ARTICLES } from '../data/articles';
import { Article } from '../types';
import { 
  Search, Smartphone, Car, Shield, Coins, ArrowRight, 
  ExternalLink, Calendar, BookOpen, Volume2, Trophy, Eye 
} from 'lucide-react';
import { AFFILIATES } from '../data/affiliates';
import { getOptimizedArticleImage } from '../utils/imageOptimizer';
import OptimizedImage, { sanitizeToAltText } from './OptimizedImage';
import { AffiliateLink } from './AffiliateLink';

export function cleanAffiliateContentLinks(html: string): string {
  if (!html) return html;
  
  let cleaned = html;
  
  const rules = [
    { regex: /https?:\/\/(?:www\.)?saily\.tpk\.lu\/[a-zA-Z0-9_-]+/gi, replacement: "/go/saily" },
    { regex: /https?:\/\/(?:www\.)?airalo\.tpk\.lu\/[a-zA-Z0-9_-]+/gi, replacement: "/go/airalo" },
    { regex: /https?:\/\/(?:www\.)?yesim\.tpk\.lu\/[a-zA-Z0-9_-]+/gi, replacement: "/go/yesim" },
    { regex: /https?:\/\/(?:www\.)?drimsim\.tpk\.lu\/[a-zA-Z0-9_-]+/gi, replacement: "/go/drimsim" },
    { regex: /https?:\/\/(?:www\.)?localrent\.tpk\.lu\/[a-zA-Z0-9_-]+/gi, replacement: "/go/localrent" },
    { regex: /https?:\/\/(?:www\.)?gettransfer\.tpk\.lu\/[a-zA-Z0-9_-]+/gi, replacement: "/go/gettransfer" },
    { regex: /https?:\/\/(?:www\.)?getrentacar\.tpk\.lu\/[a-zA-Z0-9_-]+/gi, replacement: "/go/getrentacar" },
    { regex: /https?:\/\/(?:www\.)?qeeq\.tpk\.lu\/[a-zA-Z0-9_-]+/gi, replacement: "/go/qeeq" },
    { regex: /https?:\/\/(?:www\.)?intui\.tpk\.lu\/[a-zA-Z0-9_-]+/gi, replacement: "/go/intui" },
    { regex: /https?:\/\/(?:www\.)?autoeurope\.tpk\.lu\/[a-zA-Z0-9_-]+/gi, replacement: "/go/autoeurope" },
    { regex: /https?:\/\/(?:www\.)?economybookings\.tpk\.lu\/[a-zA-Z0-9_-]+/gi, replacement: "/go/economybookings" },
    { regex: /https?:\/\/(?:www\.)?bikesbooking\.tpk\.lu\/[a-zA-Z0-9_-]+/gi, replacement: "/go/bikesbooking" },
    { regex: /https?:\/\/(?:www\.)?searadar\.tpk\.lu\/[a-zA-Z0-9_-]+/gi, replacement: "/go/searadar" },
    { regex: /https?:\/\/(?:www\.)?kiwitaxi\.tpk\.lu\/[a-zA-Z0-9_-]+/gi, replacement: "/go/kiwitaxi" },
    { regex: /https?:\/\/(?:www\.)?airhelp\.tpk\.lu\/[a-zA-Z0-9_-]+/gi, replacement: "/go/airhelp" },
    { regex: /https?:\/\/(?:www\.)?compensair\.tpk\.lu\/[a-zA-Z0-9_-]+/gi, replacement: "/go/compensair" },
    { regex: /https?:\/\/(?:www\.)?ticketnetwork\.tpk\.lu\/[a-zA-Z0-9_-]+/gi, replacement: "/go/ticketnetwork" },
    { regex: /https?:\/\/(?:www\.)?wegotrip\.tpk\.lu\/[a-zA-Z0-9_-]+/gi, replacement: "/go/wegotrip" },
    { regex: /https?:\/\/(?:www\.)?gocity\.tpk\.lu\/[a-zA-Z0-9_-]+/gi, replacement: "/go/gocity" },
    { regex: /https?:\/\/(?:www\.)?radicalstorage\.tpk\.lu\/[a-zA-Z0-9_-]+/gi, replacement: "/go/radicalstorage" },
    { regex: /https?:\/\/(?:www\.)?ektatraveling\.tpk\.lu\/[a-zA-Z0-9_-]+/gi, replacement: "/go/ektatraveling" },
    { regex: /https?:\/\/tpk\.lu\/[a-zA-Z0-9_-]+/gi, replacement: "/go/travelpayouts" },
    
    // travelpayouts tp.media redirect formats (p=ID or promo_id=ID)
    { regex: /https?:\/\/tp\.media\/[rq]\?marker=\d+&p=3813/gi, replacement: "/go/expedia" },
    { regex: /https?:\/\/tp\.media\/[rq]\?marker=\d+&p=3297/gi, replacement: "/go/klook" },
    { regex: /https?:\/\/tp\.media\/[rq]\?marker=\d+&p=5328/gi, replacement: "/go/nordvpn" },
    { regex: /https?:\/\/tp\.media\/[rq]\?marker=\d+&p=2377/gi, replacement: "/go/worldnomads" },
    { regex: /https?:\/\/tp\.media\/[rq]\?marker=\d+&p=3697/gi, replacement: "/go/wise" },
    { regex: /https?:\/\/tp\.media\/click\?shmarker=\d+&promo_id=3813\S*/gi, replacement: "/go/expedia" },
    { regex: /https?:\/\/tp\.media\/click\?shmarker=\d+&promo_id=3297\S*/gi, replacement: "/go/klook" },
    { regex: /https?:\/\/tp\.media\/click\?shmarker=\d+&promo_id=5328\S*/gi, replacement: "/go/nordvpn" },
    { regex: /https?:\/\/tp\.media\/click\?shmarker=\d+&promo_id=2377\S*/gi, replacement: "/go/worldnomads" },
    { regex: /https?:\/\/tp\.media\/click\?shmarker=\d+&promo_id=3697\S*/gi, replacement: "/go/wise" }
  ];

  for (const rule of rules) {
    cleaned = cleaned.replace(rule.regex, rule.replacement);
  }

  return cleaned;
}

export default function SiloGuides({ 
  onViewArticle,
  initialArticle = null
}: { 
  onViewArticle?: (art: Article | null) => void;
  initialArticle?: Article | null;
}) {
  const [selectedSilo, setSelectedSilo] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewedArticle, setViewedArticle_local] = useState<Article | null>(initialArticle);

  useEffect(() => {
    setViewedArticle_local(initialArticle);
  }, [initialArticle]);

  const setViewedArticle = (art: Article | null) => {
    setViewedArticle_local(art);
    if (onViewArticle) onViewArticle(art);
  };

  // Search filter matching title, keywords, content, and silo
  const filteredArticles = ARTICLES.filter(art => {
    const matchesSilo = selectedSilo === 'all' || art.silo === selectedSilo;
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.longTailKeywords.some(kw => kw.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesSilo && matchesSearch;
  });

  const getSiloIcon = (silo: string) => {
    switch (silo) {
      case 'connectivity': return <Smartphone className="w-4 h-4 text-brand-orange" />;
      case 'transport': return <Car className="w-4 h-4 text-brand-orange" />;
      case 'booking': return <Trophy className="w-4 h-4 text-brand-orange" />;
      case 'utility': return <Shield className="w-4 h-4 text-brand-orange" />;
      default: return <BookOpen className="w-4 h-4 text-brand-orange" />;
    }
  };

  const getSiloLabel = (silo: string) => {
    switch (silo) {
      case 'connectivity': return 'Cellular Tech & eSIM';
      case 'transport': return 'Ground Transport';
      case 'booking': return 'Smart Flight Bookings';
      case 'utility': return 'Security & Nomad Banking';
      default: return 'General Travel';
    }
  };

  // Safe sample placeholder images for high-performing loading speeds with proper alt description
  const getSiloImage = (silo: string) => {
    switch (silo) {
      case 'connectivity':
        return 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80';
      case 'transport':
        return 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80';
      case 'booking':
        return 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80';
      case 'utility':
        return 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&w=800&q=80';
      default:
        return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80';
    }
  };

  return (
    <div className="space-y-8" id="silo-guides-hub">
      
      {/* Category selector & search bar */}
      <div className="bg-[#F8F7F2] rounded-none p-5 border border-[#E5E5E1] flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {[
            { id: 'all', label: 'All Silos' },
            { id: 'connectivity', label: 'eSIM Connectivity' },
            { id: 'transport', label: 'Car Rent & Transfer' },
            { id: 'booking', label: 'Refunds & Stays' },
            { id: 'utility', label: 'Security & Finance' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setSelectedSilo(tab.id); setViewedArticle(null); }}
              className={`px-3 py-1.5 rounded-none text-[9px] font-mono font-bold uppercase tracking-widest cursor-pointer transition ${
                selectedSilo === tab.id 
                  ? 'bg-[#1A1A1A] text-white border border-[#1A1A1A]' 
                  : 'bg-white hover:bg-[#FAF9F6] text-gray-750 border border-[#E5E5E1]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search keywords or articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-[#1A1A1A] text-xs pl-10 pr-4 py-2.5 rounded-none border border-[#E5E5E1] bg-white focus:outline-none focus:border-brand-orange transition"
          />
        </div>
      </div>

      {viewedArticle ? (
        /* Full Article Detail View */
        <article className="bg-white rounded-none border border-[#E5E5E1] p-6 md:p-10 space-y-8 view-enter" id={`article-full-${viewedArticle.id}`}>
          
          {/* Header */}
          <div className="space-y-4 border-b border-[#E5E5E1] pb-6">
            <button
              onClick={() => setViewedArticle(null)}
              className="text-[10px] text-gray-500 hover:text-brand-orange flex items-center gap-1.5 cursor-pointer font-mono font-bold uppercase tracking-widest"
            >
              ← Back to all Guides
            </button>
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5 text-[9px] text-[#E55B13] font-mono font-bold bg-brand-orange/5 px-2.5 py-1 border border-brand-orange/20 uppercase tracking-wider">
                {getSiloIcon(viewedArticle.silo)}
                {getSiloLabel(viewedArticle.silo)}
              </span>
              <span className="text-[10px] font-mono text-gray-450 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-brand-orange" /> High Volume Search Cluster ({viewedArticle.searchVolume})
              </span>
            </div>

            <h1 className="text-2xl md:text-3.5xl font-serif font-bold tracking-tight text-[#1A1A1A] leading-tight italic">
              {viewedArticle.title}
            </h1>

            <p className="text-gray-500 text-sm italic border-l-2 border-brand-orange pl-4">
              {viewedArticle.summary}
            </p>

            {/* GEO (AI Engine Citation) Key Takeaways & Answer Box */}
            <div className="bg-[#FAF9F6] border-l-4 border-[#E55B13] border-y border-r border-[#E5E5E1] p-4.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#E55B13] uppercase tracking-wider flex items-center gap-1.5">
                  ⚡ Fast Answer & AI Citation Summary (June 2026 Audit)
                </span>
                <span className="text-[9px] font-mono bg-[#E55B13]/10 text-[#E55B13] px-2 py-0.5 font-bold uppercase">Verified Partner Rates</span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed font-sans">
                <strong>Core Logistics Answer:</strong> Comparing top-tier providers across cellular connectivity, car rentals, and flight delay claims. Booking directly through verified affiliate gateways unlocks direct wholesale pricing with zero broker surcharges.
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] font-mono text-gray-600 pt-1">
                <span className="bg-white border border-[#E5E5E1] px-2 py-0.5">Primary Target: {viewedArticle.longTailKeywords[0] || viewedArticle.title}</span>
                <span className="bg-white border border-[#E5E5E1] px-2 py-0.5">Search Volume: {viewedArticle.searchVolume}</span>
                <span className="bg-white border border-[#E5E5E1] px-2 py-0.5">Flesch Score: {viewedArticle.readabilityScore}/100</span>
              </div>
            </div>
          </div>

          {/* Optimized Image with Alt Text markup visible */}
          <div className="relative aspect-video rounded-none overflow-hidden border border-[#E5E5E1] bg-[#FAF9F6]">
            <OptimizedImage 
              src={viewedArticle.hero} 
              silo={viewedArticle.silo}
              articleId={viewedArticle.id}
              promptDescription={viewedArticle?.altTextMap?.hero || viewedArticle?.title}
              width={1200}
              height={675}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-black/85 text-white font-mono text-[9px] px-2.5 py-1 rounded-none max-w-sm">
              <span className="font-extrabold text-brand-orange">SEO ALT TEXT:</span> {sanitizeToAltText(viewedArticle?.altTextMap?.hero || viewedArticle?.title)}
            </div>
          </div>

          {/* HTML Long Form SEO Content */}
          <div 
            className="prose prose-slate max-w-none prose-sm leading-relaxed text-gray-700 space-y-5"
            dangerouslySetInnerHTML={{ __html: cleanAffiliateContentLinks(viewedArticle.content) }}
          />

          {/* Cross-Silo Interlinking & Recommended Logistics Matrix */}
          <div className="bg-[#FAF9F6] border border-[#E5E5E1] p-5 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-2 border-b border-[#E5E5E1] pb-2">
              <BookOpen className="w-4 h-4 text-brand-orange" /> Recommended Cross-Silo Travel Logistics & Tools
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <a href="/esim" className="bg-white border border-[#E5E5E1] p-3 hover:border-brand-orange transition group block">
                <span className="text-[10px] font-mono text-brand-orange uppercase font-bold block mb-1">📶 Mobile Data</span>
                <span className="text-xs font-serif font-bold text-[#1A1A1A] group-hover:text-brand-orange leading-tight block">Compare Saily, Airalo & Yesim 5G eSIM Deals →</span>
              </a>
              <a href="/car-rental" className="bg-white border border-[#E5E5E1] p-3 hover:border-brand-orange transition group block">
                <span className="text-[10px] font-mono text-brand-orange uppercase font-bold block mb-1">🚗 Ground Transport</span>
                <span className="text-xs font-serif font-bold text-[#1A1A1A] group-hover:text-brand-orange leading-tight block">Rent Local Cars with Zero Credit Card Deposit →</span>
              </a>
              <a href="/flights" className="bg-white border border-[#E5E5E1] p-3 hover:border-brand-orange transition group block">
                <span className="text-[10px] font-mono text-brand-orange uppercase font-bold block mb-1">✈️ Flight Restitution</span>
                <span className="text-xs font-serif font-bold text-[#1A1A1A] group-hover:text-brand-orange leading-tight block">Claim up to €600 EU261 Delay Compensation →</span>
              </a>
            </div>
          </div>

          {/* YouTube Responsive Embed */}
          {viewedArticle.youtubeId && (
            <div className="border border-[#E5E5E1] rounded-none p-5 md:p-6 bg-[#F8F7F2] space-y-4">
              <h4 className="text-md font-serif font-bold italic text-[#1A1A1A] flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-brand-orange" /> Watch Setup Instructions Live
              </h4>
              <p className="text-xs text-gray-500">
                Prefer a visual walk-through? Play the step-by-step setup overview vetted by BookMeThat:
              </p>
              
              <div className="aspect-video w-full rounded-none overflow-hidden border border-[#E5E5E1] bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${viewedArticle.youtubeId}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  referrerPolicy="no-referrer"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          )}

          {/* SEO Tagging metadata for verification */}
          <div className="bg-[#F8F7F2] rounded-none p-5 border border-[#E5E5E1] space-y-3">
            <h4 className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#1A1A1A]">
              Semantic Search Engine Mapping Information
            </h4>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-gray-500 font-mono text-[11px]">Readability Score (Flesch): <strong className="text-brand-orange font-mono font-bold">{viewedArticle.readabilityScore} / 100</strong></span>
              <span className="text-gray-500 font-mono text-[11px]">Index Status: <strong className="text-brand-orange font-mono font-bold">Crawlable XML Silo</strong></span>
            </div>

            <div>
              <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider block mb-1.5 font-semibold">Target Long-Tail Clusters:</span>
              <div className="flex flex-wrap gap-1.5">
                {viewedArticle.longTailKeywords.map((kw, idx) => (
                  <span key={idx} className="text-[9px] font-mono bg-white text-gray-700 px-2 py-0.5 rounded-none border border-[#E5E5E1]">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="border-t border-[#E5E5E1] pt-6 flex justify-between items-center">
            <button
              onClick={() => setViewedArticle(null)}
              className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-brand-orange cursor-pointer"
            >
              ← Back to all Guides
            </button>
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest italic">Book Me That Affiliate Partner Hub</span>
          </div>

        </article>
      ) : (
        /* SILO ARTICLES GRID */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 view-enter">
          {filteredArticles.length > 0 ? (
            filteredArticles.map(art => (
              <div 
                key={art.id} 
                className="group bg-white rounded-none border border-[#E5E5E1] overflow-hidden shadow-none hover:bg-[#FAF9F6] transition flex flex-col justify-between"
                id={`article-card-${art.id}`}
              >
                <div>
                  
                   {/* Card Thumbnail */}
                  <div className="relative aspect-video w-full overflow-hidden bg-white border-b border-[#E5E5E1]">
                    <OptimizedImage 
                      src={art.hero} 
                      silo={art.silo}
                      articleId={art.id}
                      promptDescription={art?.altTextMap?.thumbnail || art?.title}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover group-hover:scale-[1.01] transition duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#E55B13] text-white font-mono text-[9px] px-2 py-0.5 rounded-none uppercase font-semibold tracking-wider">
                      {art.searchVolume} Searches
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-wider text-[#E55B13]">
                      {getSiloIcon(art.silo)}
                      {getSiloLabel(art.silo)}
                    </span>
                    
                    <h3 className="text-base font-serif font-bold text-[#1A1A1A] group-hover:text-brand-orange transition leading-snug">
                      {art.title}
                    </h3>
                    
                    <p className="text-xs text-gray-650 leading-relaxed line-clamp-2">
                      {art.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-[#E5E5E1] mt-3 bg-white group-hover:bg-[#FAF9F6]">
                  <span className="text-[9.5px] font-mono text-gray-700 font-medium">Readability Score: {art.readabilityScore}/100</span>
                  <button
                    onClick={() => setViewedArticle(art)}
                    className="min-h-[44px] text-[10.5px] font-mono font-extrabold uppercase tracking-widest text-[#B84200] hover:text-[#8C3200] flex items-center gap-1.5 cursor-pointer py-2 px-1"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="md:col-span-2 text-center py-12 bg-white rounded-none border border-[#E5E5E1] p-6">
              <div className="w-12 h-12 border border-[#E5E5E1] text-[#B84200] rounded-none flex items-center justify-center mx-auto mb-3 bg-[#FAF9F6]">
                <BookOpen className="w-4 h-4" />
              </div>
              <h4 className="text-[#1A1A1A] font-serif font-bold text-sm">No items match your search</h4>
              <p className="text-xs text-gray-600 mt-1">Try toggling to "All Silos" or refining search query keywords.</p>
            </div>
          )}
        </div>
      )}

      {/* Embedded Popular Merchants Quick Grid for Direct Clicks */}
      <div className="bg-[#F8F7F2] rounded-none border border-[#E5E5E1] p-6 md:p-8 space-y-6">
        <div>
          <h4 className="text-xs font-mono tracking-widest uppercase text-gray-800 font-extrabold">Direct Tracking Gateways</h4>
          <p className="text-xs text-gray-700 mt-1">Skip the articles and access secure affiliate booking portals directly:</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {AFFILIATES.map(p => (
            <AffiliateLink 
              key={p.id}
              href={p.url}
              aria-label={`${p.name} (${p.category}) - Official Partner Portal`}
              className="bg-white hover:bg-brand-orange/5 border border-[#E5E5E1] hover:border-[#B84200] p-3.5 min-h-[64px] rounded-none text-center transition group flex flex-col justify-center items-center select-none"
            >
              <span className="text-[8.5px] font-mono text-gray-700 uppercase tracking-widest block mb-0.5 font-bold group-hover:text-[#B84200]">{p.category}</span>
              <span className="text-xs font-serif font-bold text-[#1A1A1A] group-hover:text-[#B84200] block my-1">{p.name} →</span>
            </AffiliateLink>
          ))}
        </div>
      </div>

    </div>
  );
}
