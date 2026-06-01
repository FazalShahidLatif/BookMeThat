import React, { useState } from 'react';
import { Sparkles, BarChart2, DollarSign, TrendingUp, HelpCircle, ShieldAlert, CheckCircle, RefreshCw, Layers } from 'lucide-react';

interface KeywordNode {
  keyword: string;
  silo: 'connectivity' | 'transport' | 'booking' | 'utility';
  volume: number;
  kd: number; // Keyword Difficulty (0-100)
  cpc: number; // Cost Per Click ($ value)
  conversionRate: number; // % rate
  intent: 'Commercial' | 'Transactional' | 'Informational';
  affiliateProvider: string;
}

const HEATMAP_KEYWORDS: KeywordNode[] = [
  // connectivity
  { keyword: 'best travel eSIM card for tourists 2026', silo: 'connectivity', volume: 12000, kd: 34, cpc: 2.10, conversionRate: 4.8, intent: 'Transactional', affiliateProvider: 'Saily / Airalo' },
  { keyword: 'Saily eSIM speed test results international latency', silo: 'connectivity', volume: 4500, kd: 18, cpc: 1.85, conversionRate: 5.2, intent: 'Commercial', affiliateProvider: 'Saily ESM' },
  { keyword: 'how to receive banking OTP texts abroad free', silo: 'connectivity', volume: 8200, kd: 26, cpc: 1.20, conversionRate: 3.5, intent: 'Informational', affiliateProvider: 'Yesim SMS' },
  { keyword: 'best regional eSIM card Southeast Asia roaming', silo: 'connectivity', volume: 6800, kd: 22, cpc: 2.30, conversionRate: 4.5, intent: 'Transactional', affiliateProvider: 'Saily Regional' },
  
  // transport
  { keyword: 'cheap international car hire Montenegro cash deposit', silo: 'transport', volume: 9500, kd: 29, cpc: 3.15, conversionRate: 3.9, intent: 'Commercial', affiliateProvider: 'Localrent' },
  { keyword: 'private chauffeur airport transfer bidding best prices', silo: 'transport', volume: 5400, kd: 15, cpc: 4.20, conversionRate: 5.8, intent: 'Transactional', affiliateProvider: 'GetTransfer' },
  { keyword: 'QEEQ price drop protection car rental algorithm', silo: 'transport', volume: 3200, kd: 12, cpc: 2.90, conversionRate: 6.1, intent: 'Commercial', affiliateProvider: 'QEEQ Motor' },
  { keyword: 'Localrent Georgia Tbilisi car rental reviews model', silo: 'transport', volume: 2800, kd: 14, cpc: 3.40, conversionRate: 5.0, intent: 'Commercial', affiliateProvider: 'Localrent Georgia' },

  // booking
  { keyword: 'claiming flight delay compensations EU261 AirHelp', silo: 'booking', volume: 15000, kd: 42, cpc: 5.50, conversionRate: 4.2, intent: 'Transactional', affiliateProvider: 'AirHelp' },
  { keyword: 'how to save money on vacation bundle packages Expedia', silo: 'booking', volume: 11000, kd: 48, cpc: 3.80, conversionRate: 3.2, intent: 'Commercial', affiliateProvider: 'Expedia Group' },
  { keyword: 'airline cancels flight gate emergency refund cash', silo: 'booking', volume: 8900, kd: 31, cpc: 4.60, conversionRate: 4.0, intent: 'Transactional', affiliateProvider: 'AirHelp Advocacy' },
  { keyword: 'Expedia discount dynamic bundling algorithm hacks', silo: 'booking', volume: 4100, kd: 19, cpc: 3.10, conversionRate: 4.7, intent: 'Commercial', affiliateProvider: 'Expedia Stays' },

  // utility
  { keyword: 'Wise multi currency borderless debit card review', silo: 'utility', volume: 18000, kd: 52, cpc: 2.40, conversionRate: 3.8, intent: 'Commercial', affiliateProvider: 'Wise Ledger' },
  { keyword: 'best travel VPN protocols NordVPN airport hacking', silo: 'utility', volume: 14000, kd: 45, cpc: 2.80, conversionRate: 4.1, intent: 'Transactional', affiliateProvider: 'NordVPN Shield' },
  { keyword: 'World Nomads adventure travel insurance reviews sports', silo: 'utility', volume: 9205, kd: 38, cpc: 3.90, conversionRate: 3.4, intent: 'Commercial', affiliateProvider: 'World Nomads' },
  { keyword: 'how to withdraw foreign currency cash with zero fees', silo: 'utility', volume: 7600, kd: 27, cpc: 1.95, conversionRate: 4.9, intent: 'Transactional', affiliateProvider: 'Wise Cash ATM' }
];

export default function SEOHeatmapConsole() {
  const [selectedSiloFilter, setSelectedSiloFilter] = useState<string>('all');
  const [minVolume, setMinVolume] = useState<number>(2000);
  const [monthlyTrafficSlider, setMonthlyTrafficSlider] = useState<number>(3500); // Simulated traffic reach
  const [avgCommissionPercentage, setAvgCommissionPercentage] = useState<number>(12); // Slider parameter for conversions

  const filteredKeywords = HEATMAP_KEYWORDS.filter(kw => {
    const matchesSilo = selectedSiloFilter === 'all' || kw.silo === selectedSiloFilter;
    const matchesVolume = kw.volume >= minVolume;
    return matchesSilo && matchesVolume;
  });

  // Calculate Cumulative Traffic and ROI Yield based on slider settings
  const totalWeight = HEATMAP_KEYWORDS.reduce((acc, kw) => acc + kw.volume, 0);
  
  // Predict Projected Monthly Yield for $500 target
  // Formula: reach * conversionRate * cpc * commission percentage multiplier
  const calculateSiloRevenue = (silo: string) => {
    const siloKws = HEATMAP_KEYWORDS.filter(kw => kw.silo === silo);
    const siloWeight = siloKws.reduce((acc, kw) => acc + kw.volume, 0);
    const proportion = siloWeight / totalWeight;
    const simulatedSiloTrafficClick = monthlyTrafficSlider * proportion;
    
    // Average metrics
    const avgCvRate = siloKws.reduce((acc, kw) => acc + kw.conversionRate, 0) / siloKws.length / 100;
    const avgCpc = siloKws.reduce((acc, kw) => acc + kw.cpc, 0) / siloKws.length;
    
    // Affiliate revenue calculation
    return simulatedSiloTrafficClick * avgCvRate * avgCpc * (avgCommissionPercentage / 10);
  };

  const totalRev = 
    calculateSiloRevenue('connectivity') +
    calculateSiloRevenue('transport') +
    calculateSiloRevenue('booking') +
    calculateSiloRevenue('utility');

  const getSiloBgClass = (silo: string) => {
    switch (silo) {
      case 'connectivity': return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'transport': return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'booking': return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'utility': return 'bg-purple-50 text-purple-800 border-purple-200';
      default: return 'bg-gray-55 bg-gray-100 border-gray-200';
    }
  };

  const getDifficultyColor = (kd: number) => {
    if (kd < 20) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (kd < 35) return 'text-amber-600 bg-amber-50 border-amber-100';
    return 'text-red-600 bg-red-50 border-red-100';
  };

  return (
    <div className="space-y-8" id="seo-heatmap-root">
      
      {/* 1. SPECIALIST TEAM EXECUTIVE ADVISORY HEADER */}
      <div className="border border-[#E5E5E1] bg-[#FAF9F6] p-6 space-y-4 rounded-none">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-orange animate-pulse" />
            <h3 className="text-normal font-mono font-bold tracking-widest text-[#1A1A1A] uppercase">
              Specialist Taskforce Action Policy
            </h3>
          </div>
          <span className="text-[9px] font-mono font-semibold uppercase tracking-widest px-2 py-1 text-emerald-700 bg-emerald-50 border border-emerald-200">
            Active Target Strategy: &gt; $500 Monthly Recurring Commission
          </span>
        </div>
        
        <p className="text-xs text-gray-550 leading-relaxed">
          The <strong>BookMeThat Editorial Coalition</strong> has modeled a rigid content program matching longtail keywords with strong commercial search intents. By structuring 25 comprehensive information nodes and optimizing each article page speed layout, we bypass costly intermediary nodes to trigger high conversion payouts.
        </p>

        {/* 3 Experts Column Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
          <div className="bg-white border border-[#E5E5E1] p-4 space-y-2">
            <span className="text-[8.5px] font-mono font-extrabold text-brand-orange uppercase tracking-wider block">OPPORTUNITY ANALYZER EXPERT</span>
            <div className="text-[11px] text-gray-800 font-sans leading-relaxed">
              &quot;By monitoring high commercial CPC bids on Google Ads, we selected longtail search query branches featuring high buyer intent. Traditional aggregators are too slow to rank for multi-word modifiers.&quot;
            </div>
          </div>
          <div className="bg-white border border-[#E5E5E1] p-4 space-y-2">
            <span className="text-[8.5px] font-mono font-extrabold text-brand-orange uppercase tracking-wider block">WORLD-CLASS SEO STRATEGIST</span>
            <div className="text-[11px] text-gray-800 font-sans leading-relaxed">
              &quot;We group keywords into 4 rigid topical silos to pass topical-authority crawling tests. Each article enforces deep logical links back to the high-authority affiliate tracking nodes.&quot;
            </div>
          </div>
          <div className="bg-white border border-[#E5E5E1] p-4 space-y-2">
            <span className="text-[8.5px] font-mono font-extrabold text-[#1A1A1A] uppercase tracking-wider block">DIRECTOR OF OPERATIONS</span>
            <div className="text-[11px] text-gray-800 font-sans leading-relaxed">
              &quot;Our performance guidelines ensure absolute compliance with FTC rules while maintaining Lighthouse ratings at 100 on desktop devices. We regularly audited our 25 articles.&quot;
            </div>
          </div>
        </div>
      </div>

      {/* 2. LIVE HEATMAP & ROI ESTIMATION GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Heatmap Keyword Table */}
        <div className="lg:col-span-8 bg-white border border-[#E5E5E1] p-5 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-serif font-bold italic text-[#1A1A1A]">Long-tail Keyword Cluster Matrix</h4>
              <p className="text-[11px] text-gray-450 mt-0.5">High Potential Targets mapping volume weight against Keyword Difficulty (KD).</p>
            </div>

            {/* Filter tab selectors */}
            <div className="flex flex-wrap gap-1">
              {[
                { id: 'all', label: 'All Silos' },
                { id: 'connectivity', label: 'Cellular' },
                { id: 'transport', label: 'Transport' },
                { id: 'booking', label: 'Refunds' },
                { id: 'utility', label: 'Security' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedSiloFilter(opt.id)}
                  className={`px-2 py-1 text-[8.5px] font-mono uppercase tracking-wider border rounded-none cursor-pointer transition ${
                    selectedSiloFilter === opt.id
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                      : 'bg-white hover:bg-gray-50 text-gray-600 border-[#E5E5E1]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-[#E5E5E1]">
              <thead className="bg-[#FAF9F6] text-gray-700 font-mono text-[9px] uppercase tracking-wider border-b border-[#E5E5E1]">
                <tr>
                  <th className="p-3">Semantic Target Keyword</th>
                  <th className="p-3">Silo</th>
                  <th className="p-3">Difficulty (KD)</th>
                  <th className="p-3">Search Volume</th>
                  <th className="p-3">Est. Conversion</th>
                  <th className="p-3">Intent Node</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E1]">
                {filteredKeywords.map((node, index) => (
                  <tr key={index} className="hover:bg-[#F8F7F2] transition text-[11px] font-sans text-gray-750">
                    <td className="p-3 font-semibold text-[#1A1A1A]">
                      {node.keyword}
                      <span className="block text-[9px] text-[#E55B13] font-mono mt-0.5">Target: {node.affiliateProvider}</span>
                    </td>
                    <td className="p-3">
                      <span className={`text-[9px] px-1.5 py-0.5 border uppercase font-mono tracking-wider ${getSiloBgClass(node.silo)}`}>
                        {node.silo}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-none font-mono text-[9.5px] border ${getDifficultyColor(node.kd)}`}>
                        {node.kd}%
                      </span>
                    </td>
                    <td className="p-3 font-mono">{node.volume.toLocaleString()}/mo</td>
                    <td className="p-3 font-mono text-emerald-700 font-bold">~{node.conversionRate}%</td>
                    <td className="p-3">
                      <span className="font-mono text-[9px] text-gray-550 italic">{node.intent}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dynamic ROI Estimator Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#FAF9F6] border border-[#E5E5E1] p-5 space-y-5">
            <div>
              <span className="text-[9px] font-mono font-bold tracking-widest text-[#E55B13] uppercase block">Interactive Estimations</span>
              <h4 className="text-base font-serif font-bold italic text-gray-900 mt-1">Silo Yield Engine</h4>
              <p className="text-xs text-gray-500 mt-1">Adjust monthly organic click targets to predict commission revenues.</p>
            </div>

            <div className="space-y-4 border-t border-[#E5E5E1] pt-4">
              
              {/* Traffic slider */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-600 font-semibold">Simulated User Traffic:</span>
                  <span className="font-mono font-bold text-brand-orange">{monthlyTrafficSlider.toLocaleString()} clicks/mo</span>
                </div>
                <input 
                  type="range" 
                  min={1000} 
                  max={20000} 
                  step={500}
                  value={monthlyTrafficSlider}
                  onChange={(e) => setMonthlyTrafficSlider(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-[#E5E5E1] rounded-lg appearance-none cursor-pointer accent-brand-orange"
                />
              </div>

              {/* Commission scale slider */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-600 font-semibold">Affiliate Payout Scale:</span>
                  <span className="font-mono font-bold text-[#E55B13]">{avgCommissionPercentage}% CPC Mult.</span>
                </div>
                <input 
                  type="range" 
                  min={5} 
                  max={30} 
                  step={1}
                  value={avgCommissionPercentage}
                  onChange={(e) => setAvgCommissionPercentage(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-[#E5E5E1] rounded-lg appearance-none cursor-pointer accent-brand-orange"
                />
              </div>

            </div>

            {/* Calculated outputs */}
            <div className="border-t border-[#E5E5E1] pt-4 space-y-3.5">
              <span className="text-[9px] font-mono font-bold tracking-wider text-gray-400 uppercase block">Estimated Revenue Breakdown per Silo:</span>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Cellular Tech / eSIM (connectivity):</span>
                  <strong className="font-mono font-bold text-[#1A1A1A]">${calculateSiloRevenue('connectivity').toFixed(2)}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ground Car Hire (transport):</span>
                  <strong className="font-mono font-bold text-[#1A1A1A]">${calculateSiloRevenue('transport').toFixed(2)}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Stays & Flight Compensation (booking):</span>
                  <strong className="font-mono font-bold text-[#1A1A1A]">${calculateSiloRevenue('booking').toFixed(2)}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cybersecurity Cards (utility):</span>
                  <strong className="font-mono font-bold text-[#1A1A1A]">${calculateSiloRevenue('utility').toFixed(2)}</strong>
                </div>
              </div>

              <div className="bg-white border border-[#E5E5E1] p-4 text-center space-y-1">
                <span className="text-[9px] font-mono text-gray-400 uppercase font-semibold">Total Predicted Monthly Revenue Yield</span>
                <div className="text-3xl font-serif font-extrabold italic text-emerald-700">
                  ${totalRev.toFixed(2)}
                </div>
                {totalRev >= 500 ? (
                  <div className="inline-flex items-center gap-1 text-[9.5px] font-mono text-emerald-700 bg-emerald-55 px-2 py-0.5 border border-emerald-200">
                    <CheckCircle className="w-3 h-3 text-emerald-700" /> Target Cleared &gt; $500 Threshold!
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1 text-[9.5px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 border border-amber-200">
                    <ShieldAlert className="w-3 h-3 text-amber-700" /> Adjust traffic slider to cross $500
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* POLICY NOTE CARD */}
          <div className="border border-zinc-200 bg-zinc-900 text-zinc-100 p-5 rounded-none font-mono text-[10.5px] leading-relaxed space-y-2">
            <span className="text-[9px] font-bold text-brand-orange uppercase tracking-wider block">COALITION POLICY STATEMENT:</span>
            <p className="text-zinc-300">
              This SEO keyword heatmap represents an continuous corporate strategy policy maintained within bookmethat.com’s database structure.
            </p>
            <p className="text-zinc-300">
              Future articles added to this domain MUST prioritize keywords categorized under Commercial and Transactional intents, featuring organic difficulties under 40% to achieve maximum initial crawling index yields.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
