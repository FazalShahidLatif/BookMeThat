import React, { useState } from 'react';
import { 
  MapPin, Calendar, DollarSign, Smartphone, Car, Shield, 
  Coins, Sparkles, ExternalLink, CheckCircle2, ArrowRight, Lock, Info 
} from 'lucide-react';
import { AFFILIATES } from '../data/affiliates';
import { PlanningInput } from '../types';

export default function InteractivePlanner() {
  const [inputs, setInputs] = useState<PlanningInput>({
    destination: '',
    durationDays: 7,
    budget: 'midrange',
    transportNeeded: true,
    needsSim: true,
    needsVpn: true,
    needsInsurance: true
  });

  const [hasCalculated, setHasCalculated] = useState(false);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setInputs(prev => ({ ...prev, [name]: checked }));
    } else {
      setInputs(prev => ({ 
        ...prev, 
        [name]: name === 'durationDays' ? Number(value) : value 
      }));
    }
  };

  const getPartner = (id: string) => AFFILIATES.find(p => p.id === id);

  // Recommendations generator purely based on user profiles to maximize target clicks
  const getCustomRecommendations = () => {
    const recs = [];
    
    // 1. eSIM selection
    if (inputs.needsSim) {
      if (inputs.budget === 'budget') {
        const p = getPartner('saily');
        if (p) recs.push({
          ...p,
          customReason: 'Optimized for budget travel. Nord Security-backed Saily delivers the lowest data-entry price for short getaways.'
        });
      } else if (inputs.budget === 'premium') {
        const p = getPartner('yesim');
        if (p) recs.push({
          ...p,
          customReason: 'Uncapped unlimited travel data with built-in VPN. Perfect for heavy streaming and professional nomad work.'
        });
      } else {
        const p = getPartner('airalo');
        if (p) recs.push({
          ...p,
          customReason: 'The absolute gold standard. Provides local network backup hops across 200+ regions for guaranteed stability.'
        });
      }
    }

    // 2. Transport selection
    if (inputs.transportNeeded) {
      if (inputs.budget === 'budget') {
        const p = getPartner('getrentacar');
        if (p) recs.push({
          ...p,
          customReason: 'Enables direct user bidding. Compare local peer-to-peer agencies to secure the absolute lowest rental deals.'
        });
      } else if (inputs.budget === 'premium') {
        const p = getPartner('gettransfer');
        if (p) recs.push({
          ...p,
          customReason: 'Skip driving entirely to travel in absolute luxury. Hire background-vetted chauffeurs via transparent bidding.'
        });
      } else {
        // Check destination or general
        const p = getPartner('localrent');
        if (p) recs.push({
          ...p,
          customReason: 'Excellent value option. Secure exact vehicle models from trusted local suppliers with low cash-only deposits.'
        });
      }
    }

    // 3. Finance & Security
    if (inputs.needsVpn) {
      const p = getPartner('nordvpn');
      if (p) recs.push({
        ...p,
        customReason: 'Protects critical bank logins over unsafe public hotel Wi-Fi. Spoof server location to secure cheaper flights.'
      });
    }

    if (inputs.needsInsurance) {
      const p = getPartner('worldnomads');
      if (p) recs.push({
        ...p,
        customReason: 'Robust global policy covering over 150 extreme adventure sports, baggage loss, and workspace tech replacements.'
      });
    }

    // 4. Stays
    const exp = getPartner('expedia');
    if (exp) recs.push({
      ...exp,
      customReason: `Bundling accommodation + routes to ${inputs.destination || 'your destination'} can save up to 20% over individual items.`
    });

    return recs;
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setHasCalculated(true);
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(url);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const recommendedPartners = getCustomRecommendations();

  return (
    <div className="bg-white rounded-none border border-[#E5E5E1] shadow-none overflow-hidden" id="interactive-planner">
      <div className="bg-[#F8F7F2] p-6 md:p-8 text-[#1A1A1A] border-b border-[#E5E5E1]">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-4 h-4 text-brand-orange" />
          <span className="text-[9px] font-mono uppercase tracking-widest text-brand-orange font-bold bg-brand-orange/5 px-2.5 py-0.5 border border-brand-orange/20">
            AI Optimizer Setup
          </span>
        </div>
        <h3 className="text-2xl font-serif font-bold italic mb-2">Interactive Travel Setup Generator</h3>
        <p className="text-gray-500 text-xs md:text-sm max-w-2xl font-sans">
          Tell us about your upcoming route. Our semantic model matches your profile against top travel networks to compile your ideal setup guide with zero hidden markups.
        </p>
      </div>

      <div className="p-6 md:p-8 bg-[#FAF9F6]">
        <form onSubmit={handleCalculate} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-[10px] font-mono tracking-wider uppercase text-gray-400 mb-2 font-bold">
              <MapPin className="w-3.5 h-3.5 inline mr-1 text-brand-orange" /> Destination
            </label>
            <input 
              type="text"
              name="destination"
              value={inputs.destination}
              onChange={handleInputChange}
              required
              placeholder="e.g., Montenegro, Spain, Bali"
              className="w-full px-4 py-2.5 rounded-none border border-[#E5E5E1] bg-white text-sm text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-brand-orange/20 focus:border-brand-orange transition"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono tracking-wider uppercase text-gray-400 mb-2 font-bold">
              <Calendar className="w-3.5 h-3.5 inline mr-1 text-brand-orange" /> Duration (Days)
            </label>
            <input 
              type="number"
              name="durationDays"
              value={inputs.durationDays}
              onChange={handleInputChange}
              min={1}
              required
              max={180}
              className="w-full px-4 py-2.5 rounded-none border border-[#E5E5E1] bg-white text-sm text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-brand-orange/20 focus:border-brand-orange transition"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono tracking-wider uppercase text-gray-400 mb-2 font-bold">
              <DollarSign className="w-3.5 h-3.5 inline mr-1 text-brand-orange" /> Budget profile
            </label>
            <select
              name="budget"
              value={inputs.budget}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-none border border-[#E5E5E1] text-sm text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-brand-orange/20 focus:border-brand-orange transition bg-white"
            >
              <option value="budget">Thrifty Budget (Pre-vetted, direct bid local offers)</option>
              <option value="midrange">Smart Mid-Range (Transparent rates & high reliability)</option>
              <option value="premium">Elite Premium (Chauffeurs, high data limits, max safety)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-mono tracking-wider uppercase text-gray-400 mb-4 font-bold">
              Travel Essentials Checklist
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-2 cursor-pointer text-[#1A1A1A] text-xs font-semibold">
                <input 
                  type="checkbox"
                  name="needsSim"
                  checked={inputs.needsSim}
                  onChange={handleInputChange}
                  className="accent-brand-orange border-[#E5E5E1] w-4 h-4 rounded-none"
                />
                Need Travel eSIM
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-[#1A1A1A] text-xs font-semibold">
                <input 
                  type="checkbox"
                  name="transportNeeded"
                  checked={inputs.transportNeeded}
                  onChange={handleInputChange}
                  className="accent-brand-orange border-[#E5E5E1] w-4 h-4 rounded-none"
                />
                Need Transit / Car Hire
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-[#1A1A1A] text-xs font-semibold">
                <input 
                  type="checkbox"
                  name="needsVpn"
                  checked={inputs.needsVpn}
                  onChange={handleInputChange}
                  className="accent-brand-orange border-[#E5E5E1] w-4 h-4 rounded-none"
                />
                Secure Public Wi-Fi
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-[#1A1A1A] text-xs font-semibold">
                <input 
                  type="checkbox"
                  name="needsInsurance"
                  checked={inputs.needsInsurance}
                  onChange={handleInputChange}
                  className="accent-brand-orange border-[#E5E5E1] w-4 h-4 rounded-none"
                />
                Travel Health Insurance
              </label>
            </div>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-4 bg-[#1A1A1A] hover:bg-brand-orange text-white font-bold text-xs uppercase tracking-widest rounded-none transition duration-350 flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Build Custom Setup Guide</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>
          </div>
        </form>

        {hasCalculated && (
          <div className="border-t border-[#E5E5E1] pt-8 view-enter">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h4 className="text-lg font-serif font-bold text-[#1A1A1A]">
                  Setup Recommendations for {inputs.destination || 'Your Getaway'}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Plan Duration: {inputs.durationDays} days | Budget Category: {inputs.budget}
                </p>
              </div>
              <div className="flex items-center self-start sm:self-auto gap-1.5 text-[9px] font-mono tracking-wider uppercase text-brand-orange bg-brand-orange/5 px-2.5 py-1 border border-brand-orange/20 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Checked & Optimized
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedPartners.map((partner) => (
                <div 
                  key={partner.id} 
                  className="group relative bg-[#F8F7F2] hover:bg-white rounded-none p-5 border border-[#E5E5E1] transition duration-200 flex flex-col justify-between"
                  id={`recommend-card-${partner.id}`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-brand-orange bg-brand-orange/5 px-2 py-0.5 border border-brand-orange/20">
                          {partner.category}
                        </span>
                        <h5 className="font-serif font-bold italic text-base text-[#1A1A1A] mt-2 flex items-center gap-1">
                          {partner.name}
                        </h5>
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono italic">Affiliate</span>
                    </div>

                    <p className="text-xs text-gray-650 mb-3.5 leading-relaxed">
                      {partner.description}
                    </p>

                    <p className="text-xs bg-white p-3 rounded-none border border-[#E5E5E1] text-[#1A1A1A] italic mb-4">
                      <strong>Deployment Profile:</strong> {partner.customReason}
                    </p>

                    <div className="mb-4">
                      <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block mb-1.5 font-bold">Included benefits:</span>
                      <ul className="space-y-1">
                        {partner.benefits.slice(0, 3).map((b, idx) => (
                          <li key={idx} className="text-xs text-[#1A1A1A] flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-brand-orange" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <a 
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3 bg-brand-orange hover:bg-[#c94d0e] text-white rounded-none text-[10px] uppercase font-bold tracking-wider text-center flex items-center justify-center gap-1 transition"
                    >
                      <span>Secure Best Offer</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopyLink(partner.url)}
                      className="px-2.5 py-2 hover:bg-white text-gray-500 border border-[#E5E5E1] rounded-none text-[10px] uppercase tracking-wider font-semibold flex items-center justify-center cursor-pointer transition"
                      title="Copy Affiliate Referral Link"
                    >
                      {copiedLink === partner.url ? 'Copied!' : 'Copy Link'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white rounded-none p-5 border border-[#E5E5E1] text-[#1A1A1A]">
              <div className="flex gap-4">
                <div className="p-2 border border-[#E5E5E1] text-brand-orange self-start bg-[#FAF9F6]">
                  <Coins className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-serif font-bold text-xs uppercase tracking-wider text-[#1A1A1A] mb-1">Affiliate Safety Policy & Best Price Guarantee</h5>
                  <p className="text-xs leading-relaxed text-gray-500">
                    BookMeThat values complete monetization transparency. By using these recommended links, you unlock exclusive partner rates (including QEEQ’s Price Drop protection, Localrent specific-car guarantees, and Wise middle-market spot forex savings). We earn a minor secondary micro-commission at zero supplemental expense to you, which enables us to maintain this semantic directory 100% ad-supported and free.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
