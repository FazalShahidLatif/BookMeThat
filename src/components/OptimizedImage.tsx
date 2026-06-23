import React, { useState, useEffect } from 'react';
import { getOptimizedArticleImage } from '../utils/imageOptimizer';

interface OptimizedImageProps {
  /** The source URL or descriptive prompt string */
  src?: string;
  /** Primary fallback silo theme (e.g. connectivity, transport, booking, utility) */
  silo?: string;
  /** Core associated article identifier to query optimized asset tables */
  articleId?: string;
  /** Unsanitized descriptive text that can be used to generate clean alt text */
  promptDescription?: string;
  /** Explicit styling additions */
  className?: string;
  /** Desired render width to fetch from the asset cloud server (e.g. 800) */
  width?: number;
  /** Desired render height to fetch from the asset cloud server (e.g. 450) */
  height?: number;
  /** Optional custom alt text to override automatic sanitization */
  customAlt?: string;
}

/**
 * Clean & Sanitize Descriptive Prompts to strict SEO compliance (under 125 characters)
 */
export function sanitizeToAltText(rawText: string, fallbackBranding: string = "BookMeThat travel partner deal"): string {
  if (!rawText || rawText.trim() === '') {
    return fallbackBranding;
  }

  // Under 125 characters check, extract key terms, remove decorative phrases
  let clean = rawText
    .replace(/(Panoramic view of|Close-up of|Graphic of|Action shot tracking|A beautiful sleek|Split screen interface showing|Detailed setting panel of an|Handheld smartphone scanning a|Beautiful layout of a|An alert warning icon of|Interior perspective of a|Close up view of tourist)/gi, '')
    .trim();

  // Pick first letter uppercase
  clean = clean.charAt(0).toUpperCase() + clean.slice(1);

  if (clean.length > 120) {
    clean = clean.substring(0, 117) + '...';
  }

  return clean;
}

/**
 * Lead CRO & SEO Performance Image Component
 * 
 * Intercepts raw description strings passed directly to <img> tags, resolving rendering breaks.
 * Employs clean aspect-ratio wrapping to guarantee zero Cumulative Layout Shift (CLS).
 */
export default function OptimizedImage({
  src,
  silo = 'general',
  articleId = '',
  promptDescription = '',
  className = 'w-full h-full object-cover',
  width = 800,
  height = 450,
  customAlt
}: OptimizedImageProps) {
  const [resolvedSrc, setResolvedSrc] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);
  const [isPromptFallback, setIsPromptFallback] = useState<boolean>(false);

  useEffect(() => {
    // Determine if the src passed is a descriptive prompt rather than a valid file or web URL
    const safeSrc = src || '';
    const isUrl = safeSrc.startsWith('http://') || safeSrc.startsWith('https://') || safeSrc.startsWith('/') || safeSrc.startsWith('./');
    const isDescriptiveText = !isUrl && safeSrc.length > 30;

    if (isDescriptiveText || !safeSrc) {
      setIsPromptFallback(true);
      // Map descriptive prompt or article ID to an optimized high-res Unsplash asset
      const resolved = getOptimizedArticleImage(articleId, silo, width, height);
      setResolvedSrc(resolved);
    } else {
      setIsPromptFallback(false);
      setResolvedSrc(safeSrc);
    }
  }, [src, articleId, silo, width, height]);

  // Clean raw prompts or source text for screen readers
  const finalAltText = customAlt || sanitizeToAltText(
    promptDescription || (isPromptFallback ? src : '') || articleId || silo
  );

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      // Failover directly to our highly reliable Unsplash high-res category cache matching the silo
      const failoverSrc = getOptimizedArticleImage(articleId, silo, width, height);
      setResolvedSrc(failoverSrc);
    }
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {resolvedSrc ? (
        <img
          src={resolvedSrc}
          alt={finalAltText}
          loading="lazy"
          onLoad={() => {}}
          onError={handleError}
          referrerPolicy="no-referrer"
          className={`transition-all duration-500 ease-in-out ${className}`}
          width={width}
          height={height}
        />
      ) : (
        // Soft fallback layout skeleton during resolution state
        <div className="absolute inset-0 flex items-center justify-center bg-stone-100 animate-pulse">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#E55B13]/30">BookMeThat Stream...</span>
        </div>
      )}
    </div>
  );
}
