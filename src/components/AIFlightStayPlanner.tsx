import React, { useState } from 'react';
import { 
  Plane, Hotel, Compass, Sparkles, HelpCircle, ArrowRight, Shield, 
  Globe, Award, Copy, Check, Info, Calendar, Users, DollarSign, Wallet, 
  MapPin, Search, ChevronRight, CheckCircle2, RefreshCw
} from 'lucide-react';
import { AffiliateLink } from './AffiliateLink';

interface KeySpec {
  feature: string;
  details: string;
}

interface FlightDeal {
  carrier: string;
  class: string;
  estimatedPrice: number;
  savingsHack: string;
  bookingUrl: string;
}

interface AccommodationReservation {
  hotelName: string;
  starRating: number;
  type: string;
  estimatedPricePerNight: number;
  conversionHook: string;
  bookingUrl: string;
}

interface ItineraryTimeline {
  day: string;
  focus: string;
  description: string;
}

interface TravelAIResult {
  metaTitle: string;
  metaDescription: string;
  routeOverview: string;
  keySpecs: KeySpec[];
  flightDeals: FlightDeal[];
  accommodationReservations: AccommodationReservation[];
  seoStrategyNotes: string[];
  itineraryTimeline: ItineraryTimeline[];
}

export default function AIFlightStayPlanner() {
  const [departureCity, setDepartureCity] = useState('Chicago');
  const [destinationCity, setDestinationCity] = useState('Paris');
  const [routeType, setRouteType] = useState<'domestic' | 'international'>('international');
  const [travelMonth, setTravelMonth] = useState('September 2026');
  const [budgetTier, setBudgetTier] = useState<'budget' | 'midrange' | 'luxury'>('midrange');
  const [occupants, setOccupants] = useState('2 Adults');

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<TravelAIResult | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const loadingPhrases = [
    "Tracing direct-to-destination carrier pathways...",
    "Querying travel affiliate database networks...",
    "Injecting Expedia flight & accommodation package hacks...",
    "Evaluating regional Saily eSIM connectivity coverage...",
    "Synthesizing high-CTR local search meta tags...",
    "Polishing human-first travel planning timelines..."
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setLoadingStep(0);

    // Dynamic phrasing transitions
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev < loadingPhrases.length - 1 ? prev + 1 : prev));
    }, 1200);

    try {
      const response = await fetch('/api/generate-route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          departureCity,
          destinationCity,
          routeType,
          travelMonth,
          budgetTier,
          occupants
        })
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Failed to generate routes with AI:", err);
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="space-y-8 text-slate-800" id="ai-planner-module">
      {/* Introduction Anchor */}
      <div className="border-l-4 border-brand-orange pl-4 space-y-2">
        <span className="inline-flex items-center gap-1 bg-[#FBFBFA] text-brand-orange text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded border border-[#E5E5E1]">
          <Sparkles className="w-3.5 h-3.5 text-brand-orange animate-pulse" /> Generative SEO Hub
        </span>
        <h2 className="text-2xl font-serif font-black tracking-tight text-gray-900 leading-none">
          AI-Powered Route & Stay Optimizer
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed font-sans max-w-3xl">
          Instantly synthesize comprehensive, target-keyword optimized flight logistics and accommodation booking blueprints. Connect local search travelers to wholesale direct integrations with Expedia stay-flight bundles.
        </p>
      </div>

      {/* Input Builder Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Container */}
        <div className="lg:col-span-4 bg-[#FBFBFA] border border-[#E5E5E1] p-5 sm:p-6 rounded-lg space-y-5">
          <form onSubmit={handleGenerate} className="space-y-4 font-sans">
            {/* Departure */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider font-mono font-bold text-gray-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-orange" /> Outbound Departure
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  value={departureCity}
                  onChange={(e) => setDepartureCity(e.target.value)}
                  placeholder="e.g. Seattle, ORD, London"
                  className="w-full text-sm bg-white border border-[#E5E5E1] p-2.5 pl-8 rounded focus:outline-none focus:border-brand-orange font-bold text-gray-950"
                  required
                />
                <Search className="absolute left-2.5 top-3 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Destination */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider font-mono font-bold text-gray-500 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-brand-orange" /> Target Destination
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  value={destinationCity}
                  onChange={(e) => setDestinationCity(e.target.value)}
                  placeholder="e.g. Tokyo, HNL, Berlin"
                  className="w-full text-sm bg-white border border-[#E5E5E1] p-2.5 pl-8 rounded focus:outline-none focus:border-brand-orange font-bold text-gray-950"
                  required
                />
                <Search className="absolute left-2.5 top-3 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Route Type */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider font-mono font-bold text-gray-500">
                Route Classification
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRouteType('domestic')}
                  className={`py-2 text-xs font-bold rounded cursor-pointer transition-all border ${
                    routeType === 'domestic' 
                      ? 'bg-brand-orange text-white border-brand-orange' 
                      : 'bg-white hover:bg-gray-50 border-[#E5E5E1] text-gray-600'
                  }`}
                >
                  Domestic Route
                </button>
                <button
                  type="button"
                  onClick={() => setRouteType('international')}
                  className={`py-2 text-xs font-bold rounded cursor-pointer transition-all border ${
                    routeType === 'international' 
                      ? 'bg-brand-orange text-white border-brand-orange' 
                      : 'bg-white hover:bg-gray-50 border-[#E5E5E1] text-gray-600'
                  }`}
                >
                  International Route
                </button>
              </div>
            </div>

            {/* Travel Month & Occupants */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider font-mono font-bold text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-brand-orange" /> Month
                </label>
                <select 
                  value={travelMonth}
                  onChange={(e) => setTravelMonth(e.target.value)}
                  className="w-full text-xs font-bold bg-white border border-[#E5E5E1] p-2 rounded focus:outline-none focus:border-brand-orange"
                >
                  {['July 2026', 'August 2026', 'September 2026', 'October 2026', 'December 2026', 'March 2027'].map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider font-mono font-bold text-gray-500 flex items-center gap-1">
                  <Users className="w-3 h-3 text-brand-orange" /> Party
                </label>
                <select 
                  value={occupants}
                  onChange={(e) => setOccupants(e.target.value)}
                  className="w-full text-xs font-bold bg-white border border-[#E5E5E1] p-2 rounded focus:outline-none focus:border-brand-orange"
                >
                  {['1 Adult', '2 Adults', 'Family of 3', 'Group of 4+'].map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Budget Tier cards */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider font-mono font-bold text-gray-500">
                Budget Tier & Class Choice
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'budget', label: 'Budget', desc: '$ Hostel/Promo' },
                  { id: 'midrange', label: 'Midrange', desc: '$$ Boutique' },
                  { id: 'luxury', label: 'Luxury', desc: '$$$ Resort/Biz' }
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setBudgetTier(tier.id as any)}
                    className={`p-2 text-left rounded-md transition-all border cursor-pointer ${
                      budgetTier === tier.id 
                        ? 'border-brand-orange bg-[rgba(238,98,31,0.03)] text-brand-orange' 
                        : 'border-[#E5E5E1] bg-white text-gray-500 hover:border-gray-400'
                    }`}
                  >
                    <div className="text-xs font-black">{tier.label}</div>
                    <div className="text-[9px] scale-95 origin-left tracking-tighter">{tier.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-orange text-white py-3 px-4 font-mono font-bold uppercase text-xs tracking-widest rounded flex items-center justify-center gap-2 hover:bg-[#d6521a] cursor-pointer shadow-sm disabled:opacity-50 transition-all select-none"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Booking Plan
                </>
              )}
            </button>
          </form>

          {/* Quick Info Box */}
          <div className="bg-[#FAF9F5] border border-[#E5E5E1] p-3 text-[11px] leading-relaxed text-gray-500 flex gap-2 rounded">
            <Info className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
            <div>
              <strong>Commercial SEO Targeting</strong> is applied globally. Recommended outbound redirects prioritize hidden wholesale deals, driving package checkout margins.
            </div>
          </div>
        </div>

        {/* Results Stream */}
        <div className="lg:col-span-8 border border-[#E5E5E1] rounded-lg min-h-[350px] relative overflow-hidden bg-white">
          {loading ? (
            /* Loading Container with beautiful staggered steps */
            <div className="absolute inset-0 flex flex-col justify-center items-center p-8 space-y-6 bg-white/95 backdrop-blur-xs z-20">
              <div className="w-16 h-16 border-4 border-[#E5E5E1] border-t-brand-orange rounded-full animate-spin"></div>
              <div className="text-center space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest bg-yellow-50 text-brand-orange font-black px-2.5 py-1 border border-brand-orange/20 rounded-md">
                  Active Gemini Synthesizer
                </span>
                <p className="text-sm font-serif italic text-gray-900 font-bold transition-all animate-pulse">
                  {loadingPhrases[loadingStep]}
                </p>
                <div className="w-48 h-1 bg-gray-100 mx-auto rounded overflow-hidden">
                  <div 
                    className="h-full bg-brand-orange transition-all duration-1000" 
                    style={{ width: `${((loadingStep + 1) / loadingPhrases.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ) : null}

          {!result && !loading ? (
            /* Empty State */
            <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-gray-50 border border-[#E5E5E1] flex items-center justify-center rounded-full text-gray-400">
                <Compass className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-black text-lg text-gray-900">No Booking Plan Drafted Yet</h3>
                <p className="text-xs text-slate-500 max-w-md">
                  Choose your coordinates and parameters on the left, then click "Generate Booking Plan" to summon personalized route logistics, cost indices, & stays.
                </p>
              </div>
            </div>
          ) : null}

          {result ? (
            /* Beautiful Generative Report Output */
            <div className="p-6 sm:p-8 space-y-8 animate-fade-in text-left">
              
              {/* Report Header: Meta Preview Optimization */}
              <div className="bg-[#FAF9E6]/30 border border-amber-200/50 p-5 rounded-md space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono uppercase font-black bg-amber-100 text-amber-800 px-2 py-0.5 rounded border border-amber-300">
                    SEO Meta Optimization Card
                  </span>
                  <Award className="w-4 h-4 text-amber-600" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                  {/* Meta Title block */}
                  <div className="bg-white border border-[#E5E5E1] p-3 rounded relative space-y-1">
                    <span className="text-[9px] font-mono text-gray-400 uppercase font-black">Meta Title (Max 55 Chars)</span>
                    <p className="font-bold text-gray-950 pr-8">{result.metaTitle}</p>
                    <button 
                      onClick={() => handleCopy(result.metaTitle, 'title')}
                      className="absolute top-2.5 right-2 text-gray-400 hover:text-brand-orange transition-all cursor-pointer"
                      title="Copy Meta Title"
                    >
                      {copiedField === 'title' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <div className="text-[9px] text-gray-400 text-right mt-1">
                      Length: <span className={result.metaTitle.length > 55 ? 'text-red-500 font-bold' : 'text-green-600 font-bold'}>{result.metaTitle.length} / 55 chars</span>
                    </div>
                  </div>

                  {/* Meta Description block */}
                  <div className="bg-white border border-[#E5E5E1] p-3 rounded relative space-y-1">
                    <span className="text-[9px] font-mono text-gray-400 uppercase font-black">Meta Description (Max 150 Chars)</span>
                    <p className="text-gray-700 pr-8 leading-relaxed">{result.metaDescription}</p>
                    <button 
                      onClick={() => handleCopy(result.metaDescription, 'desc')}
                      className="absolute top-2.5 right-2 text-gray-400 hover:text-brand-orange transition-all cursor-pointer"
                      title="Copy Meta Description"
                    >
                      {copiedField === 'desc' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <div className="text-[9px] text-gray-400 text-right mt-1">
                      Length: <span className={result.metaDescription.length > 150 ? 'text-red-500 font-bold' : 'text-green-600 font-bold'}>{result.metaDescription.length} / 150 chars</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Route Overview Section */}
              <div className="space-y-2">
                <h4 className="text-sm font-mono uppercase tracking-wider text-gray-400 font-bold">
                  Route Assessment Overview
                </h4>
                <p className="font-serif italic text-gray-900 leading-relaxed text-base">
                  "{result.routeOverview}"
                </p>
              </div>

              {/* Key Specs Grid - Bento Inspired */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {result.keySpecs?.map((spec, idx) => (
                  <div key={idx} className="bg-[#FAF9F5] border border-[#E5E5E1] p-3 rounded-md text-left">
                    <div className="text-[9px] font-mono text-gray-400 uppercase font-extrabold truncate">{spec.feature}</div>
                    <div className="text-sm font-serif font-black text-gray-900 mt-1">{spec.details}</div>
                  </div>
                ))}
              </div>

              {/* Wholesale Flight Deals */}
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 border-b border-light-wash pb-2">
                  <Plane className="w-5 h-5 text-brand-orange" />
                  <h4 className="text-base font-serif font-black text-gray-900">
                    Suggested Airline Logistics Outbound
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.flightDeals?.map((deal, idx) => (
                    <div 
                      key={idx} 
                      className="border border-[#E5E5E1] rounded-lg p-4 bg-white hover:border-gray-300 transition-all flex flex-col justify-between space-y-3 relative overflow-hidden"
                    >
                      <div className="absolute right-0 top-0 bg-yellow-100 text-yellow-800 text-[8px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 border-b border-l border-[#E5E5E1]">
                        Affiliate Link Activated
                      </div>
                      
                      <div>
                        <div className="flex items-baseline justify-between">
                          <span className="font-serif font-black text-base text-gray-900">{deal.carrier}</span>
                          <span className="text-[10px] font-mono text-gray-400 font-bold uppercase">{deal.class}</span>
                        </div>
                        
                        <div className="text-xl font-bold font-mono text-brand-orange mt-1.5">
                          ~${deal.estimatedPrice} <span className="text-xs text-gray-400">Est. Roundtrip</span>
                        </div>

                        <p className="text-xs text-gray-500 mt-2 italic border-l-2 border-[#E5E5E1] pl-2 font-sans">
                          <strong>Savings Hack:</strong> {deal.savingsHack}
                        </p>
                      </div>

                      <AffiliateLink 
                        href={deal.bookingUrl}
                        className="w-full bg-[#3B82F6]/5 text-[#3B82F6] hover:bg-[#3B82F6]/10 text-center py-2 rounded text-xs tracking-wide font-mono font-black flex items-center justify-center gap-1 border border-[#3B82F6]/20 transition-all cursor-pointer"
                      >
                        Secure Flight on Expedia <ArrowRight className="w-3 h-3" />
                      </AffiliateLink>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curated Accommodations */}
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 border-b border-light-wash pb-2">
                  <Hotel className="w-5 h-5 text-brand-orange" />
                  <h4 className="text-base font-serif font-black text-gray-900">
                    Recommended Accommodation Reservations
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.accommodationReservations?.map((hotel, idx) => (
                    <div 
                      key={idx} 
                      className="border border-[#E5E5E1] rounded-lg p-4 bg-white hover:border-gray-300 transition-all flex flex-col justify-between space-y-3 relative overflow-hidden"
                    >
                      <div className="absolute right-0 top-0 bg-yellow-100 text-yellow-800 text-[8px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 border-b border-l border-[#E5E5E1]">
                        Affiliate Lead Card
                      </div>

                      <div>
                        <div className="flex items-baseline justify-between">
                          <span className="font-serif font-black text-base text-gray-900 truncate max-w-[180px]" title={hotel.hotelName}>
                            {hotel.hotelName}
                          </span>
                          <span className="text-[10px] font-mono text-brand-orange font-bold">
                            {"★".repeat(hotel.starRating)} ({hotel.starRating}-Star)
                          </span>
                        </div>

                        <div className="text-xs font-mono text-gray-400 mt-0.5 font-bold uppercase">{hotel.type}</div>
                        
                        <div className="text-xl font-bold font-mono text-brand-orange mt-1.5">
                          ~${hotel.estimatedPricePerNight} <span className="text-xs text-gray-400">/ night code</span>
                        </div>

                        <p className="text-xs text-gray-500 mt-2 italic border-l-2 border-[#E5E5E1] pl-2 font-sans">
                          <strong>Conversion Bonus:</strong> {hotel.conversionHook}
                        </p>
                      </div>

                      <AffiliateLink 
                        href={hotel.bookingUrl}
                        className="w-full bg-[#10B981]/5 text-[#10B981] hover:bg-[#10B981]/10 text-center py-2 rounded text-xs tracking-wide font-mono font-black flex items-center justify-center gap-1 border border-[#10B981]/20 transition-all cursor-pointer"
                      >
                        Reserve Room on Expedia <ArrowRight className="w-3 h-3" />
                      </AffiliateLink>
                    </div>
                  ))}
                </div>
              </div>

              {/* Multi-Hub Timetable */}
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 border-b border-light-wash pb-2">
                  <Compass className="w-5 h-5 text-brand-orange" />
                  <h4 className="text-base font-serif font-black text-gray-900">
                    Coordinated Inter-Category Transit Timeline
                  </h4>
                </div>

                <div className="relative border-l border-[#E5E5E1] ml-2.5 pl-5 space-y-6 font-sans">
                  {result.itineraryTimeline?.map((item, idx) => (
                    <div key={idx} className="relative text-left">
                      {/* Timeline dot */}
                      <div className="absolute -left-[26px] top-1.5 bg-brand-orange text-white w-4.5 h-4.5 rounded-full border-4 border-white flex items-center justify-center text-[8px] font-mono font-bold"></div>
                      
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-brand-orange font-black bg-orange-50 px-2.2 py-0.5 rounded border border-brand-orange/15">
                          {item.day}
                        </span>
                        <h5 className="font-serif font-black text-sm text-gray-900 mt-1">{item.focus}</h5>
                        <p className="text-xs text-gray-500 leading-relaxed font-sans">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SEO Strategy Alignment */}
              <div className="bg-[#FBFBFA] border border-[#E5E5E1] p-5 rounded-md space-y-4">
                <div className="flex items-center gap-1.5 border-b border-[#E5E5E1] pb-2">
                  <Globe className="w-5 h-5 text-brand-orange animate-pulse" />
                  <h4 className="text-xs font-mono uppercase tracking-widest text-gray-900 font-bold">
                    Publisher SEO Strategy Optimization Notes
                  </h4>
                </div>
                
                <ul className="space-y-2.5 font-sans text-xs text-gray-500 list-none text-left">
                  {result.seoStrategyNotes?.map((note, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start">
                      <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
