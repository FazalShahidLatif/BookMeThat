import React, { useState } from 'react';
import { Smartphone, Car, ExternalLink, HelpCircle, Check, Coins, ArrowRight } from 'lucide-react';
import { AFFILIATES } from '../data/affiliates';
import { AffiliateLink } from './AffiliateLink';

export default function ComparisonCalculators() {
  // Calculator 1: eSIM Mobile Data Estimator
  const [dataGbs, setDataGbs] = useState<number>(10);
  const [duration, setDuration] = useState<number>(7);
  
  // Calculator 2: Car Hire vs Private Transfer
  const [distanceKm, setDistanceKm] = useState<number>(50);
  const [rentalDays, setRentalDays] = useState<number>(4);

  // eSIM Estimates logic based on actual travel rates
  const getSimEstimates = () => {
    // Saily Nord Security: very cheap entry tiers
    const sailyPrice = Math.min(4.5 + dataGbs * 1.5, 39);
    // Airalo: solid regional plans, mid-range
    const airaloPrice = Math.min(5.0 + dataGbs * 1.8, 48);
    // Yesim: slightly higher starting but includes unlimited deals, great for heavy users
    const yesimPrice = Math.min(6.0 + dataGbs * 2.1, 55);

    return [
      {
        id: 'saily',
        name: 'Saily Nord eSIM',
        price: sailyPrice,
        perGb: sailyPrice / dataGbs,
        badge: 'Lowest Budget Price',
        bgColor: 'border-teal-400 bg-teal-50/20',
        url: '/go/saily'
      },
      {
        id: 'airalo',
        name: 'Airalo Global',
        price: airaloPrice,
        perGb: airaloPrice / dataGbs,
        badge: 'Recommended Traveler Pick',
        bgColor: 'border-indigo-400 bg-indigo-50/20',
        url: '/go/airalo'
      },
      {
        id: 'yesim',
        name: 'Yesim Unlimited',
        price: yesimPrice,
        perGb: yesimPrice / dataGbs,
        badge: 'Heavy Data / Unlimited Options',
        bgColor: 'border-slate-300 bg-slate-50/40',
        url: '/go/yesim'
      }
    ];
  };

  // Car rental vs transfer math logic
  const getCarVsTransferEstimates = () => {
    // Car Rental estimate (Localrent/QEEQ)
    const dailyRentalCost = 28; // $28/day avg
    const depositDeposit = 150; // low deposit
    const gasAndParkingPerKm = 0.18; // Fuel cost per km
    const insuranceWaiverDaily = 5; // typical Qeeq policy

    const totalCarCost = (dailyRentalCost + insuranceWaiverDaily) * rentalDays + (distanceKm * gasAndParkingPerKm);

    // Private Transfers (GetTransfer Bidding)
    // Starts with base bid fee + rate per km
    const totalTransferCost = 25 + (distanceKm * 1.05);

    return {
      car: {
        total: totalCarCost,
        daily: totalCarCost / rentalDays,
        deposit: depositDeposit,
        label: 'Self-Drive Rental (Localrent / QEEQ)',
        sub: 'Unlimited mileage, maximum holiday exploration freedom'
      },
      transfer: {
        total: totalTransferCost,
        oneWay: totalTransferCost,
        label: 'Airport Private Transfer (GetTransfer)',
        sub: 'No parking rules, no international driving license anxiety'
      }
    };
  };

  const simEstimates = getSimEstimates();
  const transportEstimates = getCarVsTransferEstimates();

  return (
    <div className="space-y-12" id="comparison-calculators-hub">
      
      {/* eSIM Core Calculator */}
      <section className="bg-white rounded-none border border-[#E5E5E1] shadow-none p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-[#E5E5E1] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1 px-2.5 bg-brand-orange/5 text-brand-orange border border-brand-orange/20 font-mono text-[9px] uppercase font-bold tracking-widest">Travel Tech Utilities</span>
            </div>
            <h4 className="text-2xl font-serif font-bold italic text-[#1A1A1A] flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-brand-orange" /> eSIM Travel Data Cost Comparison
            </h4>
            <p className="text-xs text-gray-500 mt-1">
              Select your required digital data volume and slide to estimate charges. Skip high retail airport SIM markups.
            </p>
          </div>
          <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
            *Estimates update instantly in USD
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sliders Block */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#F8F7F2] p-5 rounded-none border border-[#E5E5E1]">
              <label className="flex justify-between text-xs font-mono font-bold text-[#1A1A1A] mb-3 uppercase tracking-wider">
                <span>Estimated Mobile Data:</span>
                <span className="text-brand-orange font-mono font-bold">{dataGbs} GB</span>
              </label>
              <input 
                type="range" 
                min={1} 
                max={50} 
                value={dataGbs}
                onChange={(e) => setDataGbs(Number(e.target.value))}
                className="w-full h-1 bg-[#E5E5E1] appearance-none cursor-pointer accent-brand-orange"
              />
              <div className="flex justify-between text-[9px] text-gray-400 mt-2 font-mono">
                <span>1 GB</span>
                <span>20 GB</span>
                <span>50 GB</span>
              </div>
            </div>

            <div className="bg-[#F8F7F2] p-5 rounded-none border border-[#E5E5E1]">
              <label className="flex justify-between text-xs font-mono font-bold text-[#1A1A1A] mb-3 uppercase tracking-wider">
                <span>Vacation Duration:</span>
                <span className="text-brand-orange font-mono font-bold">{duration} Days</span>
              </label>
              <input 
                type="range" 
                min={1} 
                max={30} 
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full h-1 bg-[#E5E5E1] appearance-none cursor-pointer accent-brand-orange"
              />
              <div className="flex justify-between text-[9px] text-gray-400 mt-2 font-mono">
                <span>1 Day</span>
                <span>14 Days</span>
                <span>30 Days</span>
              </div>
            </div>

            <div className="bg-[#F8F7F2] rounded-none p-4 border border-brand-orange/30">
              <h5 className="text-xs font-serif font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">💡 Roaming Cost Alert:</h5>
              <p className="text-[11px] text-gray-650 leading-relaxed italic">
                Standard US and EU home networks routinely bill $10.00 a day for dynamic international roaming, totaling roughly <strong>${duration * 10}.00</strong> for your vacation. Switching to digital eSIM plans can save you up to 80%!
              </p>
            </div>
          </div>

          {/* Estimates Comparison Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {simEstimates.map((s) => (
              <div 
                key={s.id} 
                className="rounded-none border border-[#E5E5E1] p-5 bg-white flex flex-col justify-between transition group hover:bg-[#F8F7F2]"
                id={`sim-compare-${s.id}`}
              >
                <div>
                  <span className="text-[9px] font-mono tracking-widest uppercase font-bold text-brand-orange bg-brand-orange/5 px-2 py-0.5 border border-brand-orange/20">
                    {s.badge}
                  </span>
                  <h5 className="font-serif font-bold italic text-base text-[#1A1A1A] mt-3 mb-1">{s.name}</h5>
                  <hr className="border-[#E5E5E1] my-3" />
                  
                  <div className="my-3">
                    <span className="text-3xl font-serif font-bold text-[#1A1A1A]">${s.price.toFixed(2)}</span>
                    <span className="text-[10px] text-gray-400 font-mono block mt-0.5 uppercase tracking-wider">est. pack price</span>
                  </div>
                </div>

                <div className="space-y-4 pt-3 border-t border-[#E5E5E1]">
                  <div className="flex justify-between text-[11px] text-gray-500 font-mono">
                    <span>Rate per GB:</span>
                    <span className="font-bold text-[#1A1A1A]">${s.perGb.toFixed(2)}</span>
                  </div>
                  
                  <AffiliateLink 
                    href={s.url}
                    className="w-full py-2.5 px-3 bg-[#1A1A1A] hover:bg-brand-orange text-white rounded-none text-[10px] uppercase font-bold tracking-widest text-center flex items-center justify-center gap-1 transition-all"
                  >
                    <span>Activate Plan</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </AffiliateLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Car Hire vs Private Transfer Calculator */}
      <section className="bg-white rounded-none border border-[#E5E5E1] shadow-none p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-[#E5E5E1] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1 px-2.5 bg-brand-orange/5 text-brand-orange border border-brand-orange/20 font-mono text-[9px] uppercase font-bold tracking-widest">Transit Logistics</span>
            </div>
            <h4 className="text-2xl font-serif font-bold italic text-[#1A1A1A] flex items-center gap-2">
              <Car className="w-5 h-5 text-brand-orange" /> Holiday Road Trip vs. Private Transfer Calculator
            </h4>
            <p className="text-xs text-gray-500 mt-1">
              Do you actually need to hire a car for your entire resort stay? Compare the direct costs of self-driving versus point-to-point private transfers with driver bidding.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Inputs Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#F8F7F2] p-5 rounded-none border border-[#E5E5E1]">
              <label className="flex justify-between text-xs font-mono font-bold text-[#1A1A1A] mb-2 uppercase tracking-wider">
                <span>Total Drive Distance:</span>
                <span className="text-brand-orange font-mono font-bold">{distanceKm} KM</span>
              </label>
              <input 
                type="range" 
                min={10} 
                max={500} 
                step={10}
                value={distanceKm}
                onChange={(e) => setDistanceKm(Number(e.target.value))}
                className="w-full h-1 bg-[#E5E5E1] appearance-none cursor-pointer accent-brand-orange"
              />
              <div className="flex justify-between text-[9px] text-gray-400 mt-2 font-mono">
                <span>10 KM</span>
                <span>250 KM</span>
                <span>500 KM</span>
              </div>
            </div>

            <div className="bg-[#F8F7F2] p-5 rounded-none border border-[#E5E5E1]">
              <label className="flex justify-between text-xs font-mono font-bold text-[#1A1A1A] mb-2 uppercase tracking-wider">
                <span>Rental Duration:</span>
                <span className="text-brand-orange font-mono font-bold">{rentalDays} Days</span>
              </label>
              <input 
                type="range" 
                min={1} 
                max={14} 
                value={rentalDays}
                onChange={(e) => setRentalDays(Number(e.target.value))}
                className="w-full h-1 bg-[#E5E5E1] appearance-none cursor-pointer accent-brand-orange"
              />
              <div className="flex justify-between text-[9px] text-gray-400 mt-2 font-mono">
                <span>1 Day</span>
                <span>7 Days</span>
                <span>14 Days</span>
              </div>
            </div>

            <div className="bg-white rounded-none p-4 border border-[#E5E5E1]">
              <h5 className="text-xs font-serif font-bold uppercase tracking-wider text-[#1A1A1A] mb-1 flex items-center gap-1">
                <Coins className="w-3.5 h-3.5 text-brand-orange" /> Localrent Deposit Advantage:
              </h5>
              <p className="text-[11px] text-gray-500 leading-relaxed italic">
                By booking through <strong>Localrent</strong>, you verify precise local parameters, allowing you to settle security deposits in cash rather than blocking significant credit funds at standard multi-national desks.
              </p>
            </div>
          </div>

          {/* Results Comparison Block */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Self-Drive Card */}
            <div className="border border-[#E5E5E1] rounded-none p-6 bg-[#F8F7F2] flex flex-col justify-between hover:bg-white transition duration-200 group">
              <div>
                <span className="py-1 px-2.5 bg-[#1A1A1A] text-white text-[9px] font-mono uppercase font-bold rounded-none block w-fit mb-3">
                  Option A
                </span>
                <h5 className="font-serif font-bold text-[#1A1A1A] text-base mb-1">{transportEstimates.car.label}</h5>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  {transportEstimates.car.sub}
                </p>

                <div className="my-5 border-t border-b border-dashed border-[#E5E5E1] py-4 space-y-2">
                  <div className="flex justify-between text-xs text-gray-600 font-mono">
                    <span>Base Vehicle Rental:</span>
                    <span>${(28 * rentalDays).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 font-mono">
                    <span>Insurance Cover:</span>
                    <span>${(5 * rentalDays).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 font-mono">
                    <span>Fuel Contribution:</span>
                    <span>${(distanceKm * 0.18).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-xs font-mono text-gray-400 uppercase tracking-widest font-bold">Total Estimated Cost:</span>
                  <span className="text-2xl font-serif font-bold text-[#1A1A1A]">${transportEstimates.car.total.toFixed(2)}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <AffiliateLink 
                    href="https://localrent.tpk.lu/YI6tdTTl"
                    className="py-2.5 px-3 bg-brand-orange hover:bg-[#c94d0e] text-white rounded-none text-[10px] font-bold uppercase tracking-widest text-center flex items-center justify-center gap-1 transition"
                  >
                    <span>Localrent Hire</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </AffiliateLink>
                  <AffiliateLink 
                    href="https://qeeq.tpk.lu/nAGGDc6e"
                    className="py-2.5 px-2 bg-[#1A1A1A] hover:bg-brand-orange text-white rounded-none text-[10px] font-bold uppercase tracking-widest text-center flex items-center justify-center gap-1 transition-all"
                  >
                    <span>Global QEEQ</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </AffiliateLink>
                </div>
              </div>
            </div>

            {/* Private Transfer Card */}
            <div className="border border-[#E5E5E1] rounded-none p-6 bg-[#F8F7F2] flex flex-col justify-between hover:bg-white transition duration-200 group">
              <div>
                <span className="py-1 px-2.5 bg-[#1A1A1A] text-white text-[9px] font-mono uppercase font-bold rounded-none block w-fit mb-3">
                  Option B
                </span>
                <h5 className="font-serif font-bold text-[#1A1A1A] text-base mb-1">{transportEstimates.transfer.label}</h5>
                <p className="text-xs text-gray-500 leading-relaxed mb-4 font-sans">
                  {transportEstimates.transfer.sub}
                </p>

                <div className="my-5 border-t border-b border-dashed border-[#E5E5E1] py-4 space-y-2">
                  <div className="flex justify-between text-xs text-gray-600 font-mono">
                    <span>Base Driver Call Fee:</span>
                    <span>$25.00</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 font-mono">
                    <span>Mileage Rate ($1.05/km):</span>
                    <span>${(distanceKm * 1.05).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-brand-orange font-bold font-mono uppercase tracking-wider text-[10px]">
                    <span>Airport Delay Greeting:</span>
                    <span>Included (60m)</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-xs font-mono text-gray-400 uppercase tracking-widest font-bold">Flat Bidding Price:</span>
                  <span className="text-2xl font-serif font-bold text-brand-orange">${transportEstimates.transfer.total.toFixed(2)}</span>
                </div>

                <AffiliateLink 
                  href="https://gettransfer.tpk.lu/zUalOSms"
                  className="w-full py-2.5 px-4 bg-brand-orange hover:bg-[#c94d0e] text-white rounded-none text-[10px] font-bold uppercase tracking-widest text-center flex items-center justify-center gap-1.5 transition"
                >
                  <span>Submit bidding call to GetTransfer</span>
                  <ExternalLink className="w-3 h-3" />
                </AffiliateLink>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
