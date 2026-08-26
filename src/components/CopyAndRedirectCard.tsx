import React, { useState } from 'react';
import { Copy, ExternalLink, Check } from 'lucide-react';

interface CopyAndRedirectCardProps {
  partnerName: string;
  offerLabel: string;
  discountText: string;
  couponCode: string;
  affiliateUrl: string;
  partnerId?: string;
}

/**
 * Lead CRO Optimization Component: CopyAndRedirectCard
 * 
 * Combines discount code activation with an outbound deep-linked 
 * redirect system to eliminate choice fatigue, maximize cookie placement,
 * and secure Travelpayouts affiliate subID tracking.
 */
export default function CopyAndRedirectCard({
  partnerName,
  offerLabel,
  discountText,
  couponCode,
  affiliateUrl,
  partnerId
}: CopyAndRedirectCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyAndRedirect = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    // 1. Copy the Coupon Code to clipboard
    try {
      await navigator.clipboard.writeText(couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.warn("Failed to write coupon to clipboard automatically:", err);
    }

    // 2. Open link using global interstitial or default fallback
    const matchedPartner = partnerId || partnerName.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (typeof window !== 'undefined' && (window as any).triggerAffiliateRedirect) {
      (window as any).triggerAffiliateRedirect(affiliateUrl, matchedPartner);
    } else {
      window.open(affiliateUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      id={`cro-card-${partnerName.toLowerCase().replace(/\s+/g, '-')}`}
      className="bg-[#F8F7F2] border-2 border-[#E5E5E1] p-6 hover:border-brand-orange hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full relative group"
    >
      {/* Visual active badge */}
      <div className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 text-[8px] font-bold px-2.5 py-1 uppercase tracking-widest font-mono border border-emerald-300 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        Verified Active
      </div>

      <div className="space-y-4">
        {/* Discount Accent Header */}
        <div className="flex items-center">
          <span className="text-[10px] font-mono font-bold tracking-widest text-brand-orange block uppercase">
            {discountText}
          </span>
        </div>

        {/* Headings */}
        <div className="space-y-1">
          <h3 className="text-xl font-serif font-bold italic text-gray-900 group-hover:text-brand-orange transition-colors">
            {partnerName}
          </h3>
          <p className="text-[11px] text-gray-400 font-mono tracking-wider uppercase">
            Promo: {offerLabel}
          </p>
        </div>

        {/* Explanatory CTA Copy */}
        <p className="text-xs text-gray-650 leading-relaxed font-sans pb-3 border-b border-dashed border-[#E5E5E1]">
          Click activates and copies coupon key. Secures direct checkout on secure wholesale merchant page. Prevents agent price inflated fees.
        </p>
      </div>

      <div className="space-y-4 pt-4">
        {/* Ticket Stub Code Display */}
        <div className="relative overflow-hidden bg-white border border-[#E5E5E1] p-3 flex items-center justify-between gap-3 group/stub">
          {/* Half-circle coupon punches */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-4 bg-[#F8F7F2] border-r border-[#E5E5E1] rounded-r-full"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-4 bg-[#F8F7F2] border-l border-[#E5E5E1] rounded-l-full"></div>

          <div className="pl-3.5 flex flex-col">
            <span className="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">COUPON APPLIED</span>
            <code className="text-xs font-mono font-extrabold text-[#1A1A1A] tracking-wider bg-[#FAF9F6] px-2 py-0.5 border border-[#E5E5E1]/70 mt-0.5 select-all">
              {couponCode}
            </code>
          </div>

          <span className="text-[9px] font-mono text-gray-400 font-bold uppercase tracking-wider pr-2.5 flex items-center gap-1 italic shrink-0">
            {copied ? 'Copied' : 'Inactive'}
            {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <span className="w-1 h-1 rounded-full bg-[#E55B13]"></span>}
          </span>
        </div>

        {/* Single Unified Action Button */}
        <button
          onClick={handleCopyAndRedirect}
          className="w-full text-center bg-[#1A1A1A] hover:bg-brand-orange text-white text-[10.5px] font-bold uppercase tracking-widest py-3.5 px-4 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400 animate-bounce" />
              <span>Coupon Copied & Redirecting...</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-white/80" />
              <span>Copy Code & Get Dynamic Deal →</span>
              <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
            </>
          )}
        </button>

        {/* CRO Explanatory Text */}
        <div className="text-[8.5px] text-gray-400 text-center font-mono tracking-wide leading-normal uppercase">
          ⚡ Dual-Action: Copies coupon is target-referenced securely on referral subIDs.
        </div>
      </div>
    </div>
  );
}
