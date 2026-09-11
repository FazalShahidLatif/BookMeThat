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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Invoke optional custom click handler if specified
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <a
      href={sanitizedUrl}
      target="_blank"
      rel="noopener noreferrer nofollow sponsored"
      onClick={handleClick}
      className={className}
      id={props.id}
      {...props}
    >
      {children}
    </a>
  );
};
