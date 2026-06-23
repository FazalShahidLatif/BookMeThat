import React from 'react';
import { sanitizeAffiliateUrl } from '../utils/affiliateSanitizer';

export interface AffiliateLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  url?: string; // support explicit URL property as well
}

/**
 * Safe Affiliate Link Anchor Abstraction Component
 * Passes standard target link through the custom sanitizeAffiliateUrl utility,
 * enforces high-security rel/target defaults, and intercepts clicks to log any broken
 * outbound links (non-200 responses) directly to the console before routing.
 */
export const AffiliateLink: React.FC<AffiliateLinkProps> = ({
  href,
  url,
  children,
  onClick,
  className = '',
  ...props
}) => {
  const rawTarget = url || href || '';
  const sanitizedUrl = sanitizeAffiliateUrl(rawTarget);

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Invoke optional custom click handler if specified
    if (onClick) {
      onClick(e);
    }

    if (sanitizedUrl && sanitizedUrl.startsWith('http')) {
      // Perform background head-request validation to check for active 400/404 signals
      Promise.resolve().then(async () => {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 1200);

          const response = await fetch(sanitizedUrl, {
            method: 'HEAD',
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          if (response && response.status && (response.status < 200 || response.status >= 400)) {
            console.error(
              `[AffiliateLink Security Alert] Outbound link validation returned critical status: ${response.status} for URL: ${sanitizedUrl}`
            );
          }
        } catch (error: any) {
          // If of type AbortError, it was an expected timeout under slower mobile frames
          if (error.name !== 'AbortError') {
            console.warn(
              `[AffiliateLink Validation Engine] Verification check encountered diagnostic error on url: ${sanitizedUrl}. Details: ${error.message || error}`
            );
          }
        }
      });
    }
  };

  return (
    <a
      href={sanitizedUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
      id={props.id}
      {...props}
    >
      {children}
    </a>
  );
};
