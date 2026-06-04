import React, { useState } from 'react';

interface Voucher {
  id: string;
  brand: string;
  code: string;
  discount: string;
  desc: string;
  link: string;
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

    // 2. Open affiliate link in a new tab to plant conversion cookies
    window.open(voucher.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      id={`voucher-card-${voucher.id}`}
      className="bg-[#F8F7F2] border border-[#E5E5E1] p-6 hover:border-brand-orange hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full relative group"
    >
      <div className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 text-[8.5px] font-bold px-2 py-0.5 uppercase tracking-wider font-mono border border-emerald-300">
        Vouched & Active
      </div>
      
      <div className="space-y-3">
        <span className="text-[10px] font-mono font-bold tracking-widest text-[#E55B13] block uppercase">
          {voucher.discount}
        </span>
        <h3 className="text-lg font-serif font-bold italic text-gray-900 group-hover:text-brand-orange transition">
          {voucher.brand}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed pb-3">
          {voucher.desc}
        </p>
      </div>

      <div className="space-y-3.5 pt-4 border-t border-[#E5E5E1]/70">
        <div className="flex items-center justify-between gap-2 p-2.5 bg-white border border-[#E5E5E1] rounded-none">
          <code className="text-xs font-mono font-extrabold text-[#1A1A1A] tracking-wider select-all">
            {voucher.code}
          </code>
          <button
            onClick={handleCopyAndRedirect}
            id={`btn-copy-${voucher.id}`}
            className={`text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 transition-colors cursor-pointer rounded-none flex items-center gap-1 ${
              copied 
                ? 'bg-emerald-500 text-white' 
                : 'bg-[#1A1A1A] hover:bg-brand-orange text-white'
            }`}
          >
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>

        <button
          onClick={handleCopyAndRedirect}
          id={`btn-go-${voucher.id}`}
          className="w-full text-center block bg-transparent hover:bg-[#1A1A1A] hover:text-white border border-[#1A1A1A] text-[#1A1A1A] text-[9px] font-bold uppercase tracking-widest py-3 transition-all duration-300 cursor-pointer"
        >
          Activate Promo Code & Go →
        </button>
      </div>
    </div>
  );
}
