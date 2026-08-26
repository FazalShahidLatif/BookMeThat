import React from 'react';

interface BrandLogoProps {
  variant?: 'full' | 'header' | 'icon' | 'badge';
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  subtitleClassName?: string;
  colorMode?: 'default' | 'light' | 'dark';
  withTagline?: boolean;
}

/**
 * Brand Emblem Monogram:
 * Stylized "MB" / "BMT" monogram combining the initial M pillar,
 * open book / flying pages wings, an ascending 45-degree top-right arrow,
 * and base foundation loop, rendered in the signature terracotta (#B84200)
 * and deep charcoal (#1A1A1A) brand color theme.
 */
export const BrandIcon: React.FC<{ className?: string; colorMode?: 'default' | 'light' | 'dark' }> = ({
  className = "w-8 h-8",
  colorMode = 'default'
}) => {
  const isLightOnDark = colorMode === 'light';

  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`shrink-0 ${className}`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="BookMeThat Logo Emblem"
    >
      <defs>
        <linearGradient id="bmt-grad-orange" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#993300" />
          <stop offset="45%" stopColor="#B84200" />
          <stop offset="100%" stopColor="#E55B13" />
        </linearGradient>
        <linearGradient id="bmt-grad-dark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isLightOnDark ? "#FFFFFF" : "#2D1810"} />
          <stop offset="100%" stopColor={isLightOnDark ? "#E5E5E1" : "#1A1A1A"} />
        </linearGradient>
        <linearGradient id="bmt-grad-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E55B13" />
          <stop offset="100%" stopColor="#FF7A30" />
        </linearGradient>
      </defs>

      <g transform="translate(6, 6) scale(0.88)">
        {/* Left Stem of M / Spine */}
        <path 
          d="M 16 86 L 16 26 L 31 26 L 31 71 L 16 86 Z" 
          fill="url(#bmt-grad-dark)" 
        />

        {/* Top Left Wing / Open Book Left Page */}
        <path 
          d="M 23 35 C 33 27, 43 27, 50 34 C 44 24, 32 24, 23 30 Z" 
          fill="url(#bmt-grad-orange)" 
          opacity="0.9"
        />

        {/* Top Right Wing / Open Book Right Page */}
        <path 
          d="M 50 34 C 57 27, 67 27, 77 35 C 68 30, 56 24, 50 34 Z" 
          fill="url(#bmt-grad-highlight)" 
          opacity="0.95"
        />

        {/* Dynamic Ascending Central Arrow */}
        <path 
          d="M 31 71 L 50 42 L 67 25 L 61 22 L 86 16 L 80 41 L 74 35 L 50 56 L 31 71 Z" 
          fill="url(#bmt-grad-orange)" 
        />

        {/* Arrow Head 3D Dynamic Facets */}
        <polygon 
          points="86,16 67,25 74,35" 
          fill="#FF7A30" 
        />
        <polygon 
          points="86,16 61,22 67,25" 
          fill="#993300" 
        />

        {/* Bottom B-Curve / Base Foundation Loop */}
        <path 
          d="M 31 71 C 45 84, 76 86, 76 66 C 76 53, 62 49, 52 50 L 52 61 C 60 61, 65 63, 65 67 C 65 72, 48 72, 31 71 Z" 
          fill="url(#bmt-grad-dark)" 
        />
      </g>
    </svg>
  );
};

/**
 * Complete BookMeThat Brand Logo with Vector Typography & Subtitle
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'header',
  className = "",
  iconClassName = "w-8 h-8",
  textClassName = "",
  subtitleClassName = "",
  colorMode = 'default',
  withTagline = true
}) => {
  const isLight = colorMode === 'light';

  if (variant === 'icon') {
    return <BrandIcon className={iconClassName} colorMode={colorMode} />;
  }

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center justify-center p-1.5 rounded-xl border ${isLight ? 'bg-zinc-800/80 border-zinc-700' : 'bg-[#FAF9F6] border-[#E5E5E1]'} shadow-sm ${className}`}>
        <BrandIcon className={iconClassName} colorMode={colorMode} />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Icon Badge container */}
      <div className={`flex items-center justify-center p-1 rounded-xl transition-transform duration-200 group-hover:scale-105 ${isLight ? 'bg-zinc-800/90 border border-zinc-700' : 'bg-[#FAF9F6] border border-[#E5E5E1] shadow-xs'}`}>
        <BrandIcon className={iconClassName} colorMode={colorMode} />
      </div>

      {/* Typography Lockup */}
      <div className="flex flex-col text-left">
        <div className="flex items-center tracking-tight leading-none">
          <span className={`font-serif font-black text-lg sm:text-xl tracking-tight ${isLight ? 'text-white' : 'text-[#1A1A1A]'} ${textClassName}`}>
            BOOK
          </span>
          <span className="font-serif font-black text-lg sm:text-xl tracking-tight text-[#B84200]">
            METHAT
          </span>
          <span className="text-[10px] align-super text-[#B84200] font-bold ml-0.5 -mt-1 font-mono">
            ™
          </span>
        </div>
        
        {withTagline && (
          <span className={`text-[7.5px] sm:text-[8px] font-mono uppercase tracking-[0.22em] font-bold leading-tight mt-0.5 ${isLight ? 'text-zinc-400' : 'text-gray-500'} ${subtitleClassName}`}>
            Easy Scheduling &amp; Bookings
          </span>
        )}
      </div>
    </div>
  );
};

export default BrandLogo;
