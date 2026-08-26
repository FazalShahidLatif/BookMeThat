import React, { useState } from 'react';
import { Copy, ExternalLink, Check } from 'lucide-react';

interface Voucher {
  id: string;
  brand: string;
  code: string;
  discount: string;
  desc: string;
  link: string;
  category?: string;
  validThrough?: string;
}

interface VoucherCardProps {
  voucher: Voucher;
  key?: string | number;
}

export default function VoucherCard({ voucher }: VoucherCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyAndRedirect = () => {
    // 1. Copy coupon code to clipboard
    navigator.clipboard.writeText(voucher.code)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      })
      .catch((err) => {
        console.warn("Failed to copy code to clipboard:", err);
      });

    // 2. Open affiliate link in a new tab via global interceptor or direct fallback
    if (typeof window !== 'undefined' && (window as any).triggerAffiliateRedirect) {
      (window as any).triggerAffiliateRedirect(voucher.link, voucher.id);
    } else {
      window.open(voucher.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      id={`voucher-card-${voucher.id}`}
      className="bg-[#F8F7F2] border-2 border-[#E5E5E1] p-6 hover:border-[#B84200] hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full relative group"
    >
      {/* Active trust tag */}
      <div className="absolute top-4 right-4 bg-emerald-50 text-emerald-800 text-[8.5px] font-bold px-2.5 py-1 uppercase tracking-widest font-mono border border-emerald-300 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
        {voucher.validThrough || 'Verified Active 2026'}
      </div>
      
      <div className="space-y-3">
        {/* Deal Discount Banner & Category Tag */}
        <div className="flex items-center gap-2 flex-wrap pt-0.5">
          {voucher.category && (
            <span className="text-[8px] font-mono font-bold uppercase tracking-wider bg-zinc-200 text-zinc-800 px-2 py-0.5 border border-zinc-300">
              {voucher.category}
            </span>
          )}
          <div className="flex items-center">
            <span className="text-[10px] font-mono font-extrabold tracking-widest text-[#B84200] block uppercase">
              {voucher.discount}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-serif font-bold italic text-gray-900 group-hover:text-[#B84200] transition-colors">
          {voucher.brand}
        </h3>
        
        <p className="text-xs text-gray-700 leading-relaxed font-sans pb-3 border-b border-dashed border-[#E5E5E1]">
          {voucher.desc}
        </p>
      </div>

      <div className="space-y-4 pt-4">
        {/* Coupon Ticket Stub Styling Visualizer */}
        <div className="relative overflow-hidden bg-white border border-[#E5E5E1] p-3 flex items-center justify-between gap-3 group/stub">
          {/* Half-circle left ticket bite */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-4 bg-[#F8F7F2] border-r border-[#E5E5E1] rounded-r-full"></div>
          {/* Half-circle right ticket bite */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-4 bg-[#F8F7F2] border-l border-[#E5E5E1] rounded-l-full"></div>
          
          <div className="pl-3.5 flex flex-col items-start">
            <span className="text-[8.5px] font-mono font-bold text-gray-700 uppercase tracking-widest">PROMO CODE</span>
            <code className="text-xs font-mono font-extrabold text-[#1A1A1A] tracking-wider select-all bg-[#FAF9F6] px-2 py-0.5 border border-[#E5E5E1]/70 mt-0.5">
              {voucher.code}
            </code>
          </div>

          <span className="text-[9.5px] font-mono text-gray-700 font-bold uppercase tracking-wider pr-2.5 flex items-center gap-1 italic shrink-0">
            {copied ? 'Copied' : 'Key Locked'}
            {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <span className="w-1.5 h-1.5 rounded-full bg-[#B84200]"></span>}
          </span>
        </div>

        {/* PRIMARY UNIFIED DYNAMIC AFFILIATE BUTTON */}
        <button
          onClick={handleCopyAndRedirect}
          id={`btn-trigger-${voucher.id}`}
          className="w-full min-h-[44px] text-center bg-[#1A1A1A] hover:bg-[#B84200] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-widest py-3.5 px-4 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg flex items-center justify-center gap-2 relative active:scale-[0.98]"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400 animate-bounce" />
              <span>Coupon Copied & Redirecting...</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-white/90" />
              <span>Copy Code & Go to Direct Deal →</span>
              <ExternalLink className="w-3 h-3 opacity-80 ml-0.5" />
            </>
          )}
        </button>

        {/* Micro conversion safety helper */}
        <div className="text-[9px] text-gray-650 text-center font-mono tracking-wide leading-normal">
          ⚡ 1-Click Action secures direct discount, copies code, & logs secure referral subID.
        </div>
      </div>
    </div>
  );
}
