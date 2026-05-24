import React, { useState } from 'react';
import { ARTICLES } from '../data/articles';
import { Article } from '../types';
import { 
  Search, Smartphone, Car, Shield, Coins, ArrowRight, 
  ExternalLink, Calendar, BookOpen, Volume2, Trophy, Eye 
} from 'lucide-react';
import { AFFILIATES } from '../data/affiliates';

export default function SiloGuides() {
  const [selectedSilo, setSelectedSilo] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewedArticle, setViewedArticle] = useState<Article | null>(null);

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
          </div>

          {/* Optimized Image with Alt Text markup visible */}
          <div className="relative aspect-video rounded-none overflow-hidden border border-[#E5E5E1] bg-[#FAF9F6]">
            <img 
              src={getSiloImage(viewedArticle.silo)} 
              alt={viewedArticle.altTextMap.hero} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-black/85 text-white font-mono text-[9px] px-2.5 py-1 rounded-none max-w-sm">
              <span className="font-extrabold text-brand-orange">SEO ALT TEXT:</span> {viewedArticle.altTextMap.hero}
            </div>
          </div>

          {/* HTML Long Form SEO Content */}
          <div 
            className="prose prose-slate max-w-none prose-sm leading-relaxed text-gray-700 space-y-5"
            dangerouslySetInnerHTML={{ __html: viewedArticle.content }}
          />

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
                    <img 
                      src={getSiloImage(art.silo)} 
                      alt={art.altTextMap.hero} 
                      referrerPolicy="no-referrer"
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
                  <span className="text-[9px] font-mono text-gray-400">Readability Score: {art.readabilityScore}/100</span>
                  <button
                    onClick={() => setViewedArticle(art)}
                    className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E55B13] hover:text-[#c94d0e] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="md:col-span-2 text-center py-12 bg-white rounded-none border border-[#E5E5E1] p-6">
              <div className="w-12 h-12 border border-[#E5E5E1] text-brand-orange rounded-none flex items-center justify-center mx-auto mb-3 bg-[#FAF9F6]">
                <BookOpen className="w-4 h-4" />
              </div>
              <h4 className="text-[#1A1A1A] font-serif font-bold text-sm">No items match your search</h4>
              <p className="text-xs text-gray-450 mt-1">Try toggling to "All Silos" or refining search query keywords.</p>
            </div>
          )}
        </div>
      )}

      {/* Embedded Popular Merchants Quick Grid for Direct Clicks */}
      <div className="bg-[#F8F7F2] rounded-none border border-[#E5E5E1] p-6 md:p-8 space-y-6">
        <div>
          <h4 className="text-xs font-mono tracking-widest uppercase text-gray-400 font-bold">Direct Tracking Gateways</h4>
          <p className="text-xs text-gray-500 mt-1">Skip the articles and access secure affiliate booking portals directly:</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {AFFILIATES.map(p => (
            <a 
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-brand-orange/5 border border-[#E5E5E1] hover:border-brand-orange p-3 rounded-none text-center transition group block"
            >
              <span className="text-[8px] font-mono text-gray-400 uppercase tracking-widest block mb-0.5 font-bold group-hover:text-brand-orange">{p.category}</span>
              <span className="text-xs font-serif font-bold text-[#1A1A1A] group-hover:text-[#E55B13] block my-1">{p.name} →</span>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
