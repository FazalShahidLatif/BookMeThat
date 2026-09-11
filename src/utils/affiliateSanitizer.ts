/**
 * BookMeThat.com - Elite Affiliate link Sanitation Layer
 * 
 * Sanitizes raw URLs by removing UI text prefixes, reconstructing
 * Travelpayouts routing string structures cleanly, and formatting tracking markers natively.
 */

export interface AffiliateSanitizerInput {
  url: string;
  id?: string;
  name?: string;
  category?: string;
}

/**
 * Programmatic URL Sanitizer Function
 * Takes a URL string or an affiliate partner's database object properties as input.
 * Extracts, sanitizes, and reconstructs Travelpayouts routing to eliminate 400/404 server errors.
 */
export function sanitizeAffiliateUrl(
  input: string | AffiliateSanitizerInput
): string {
  let rawUrl = '';

  // Handle both string and database object properties as input
  if (typeof input === 'object' && input !== null) {
    rawUrl = input.url || '';
  } else if (typeof input === 'string') {
    rawUrl = input;
  }

  if (!rawUrl) return '';

  // If it is already an internal redirect tunnel, return directly
  if (rawUrl.startsWith('/go/')) {
    return rawUrl;
  }

  // 1. Strip away any literal UI string text contamination (like 'bookingTicket Network →')
  // We locate the actual HTTP/HTTPS address inside the contaminated wrapper
  const urlRegex = /(https?:\/\/[^\s"'`〉>]+)/i;
  const match = rawUrl.match(urlRegex);
  if (match) {
    rawUrl = match[1];
  }

  // Remove any remaining trailing arrows, brackets, or trailing spaces
  rawUrl = rawUrl.trim().replace(/[→〉>\s]+$/, '');

  try {
    // Solve duplicate inquiry indicators (like "??", which corrupts routing parameters)
    if (rawUrl.includes('??')) {
      const queryIndex = rawUrl.indexOf('??');
      const base = rawUrl.substring(0, queryIndex);
      const queryStr = rawUrl.substring(queryIndex + 2).replace(/\?/g, '&');
      rawUrl = `${base}?${queryStr}`;
    }

    const urlObj = new URL(rawUrl);
    const hostname = urlObj.hostname.toLowerCase();

    // Map known broken tp.media promo paths to verified working tpk.lu shortlinks or go tunnels
    if (rawUrl.includes('p=3801') || rawUrl.includes('gocity.com')) {
      return 'https://gocity.tpk.lu/u1mHhjxd';
    }
    if (rawUrl.includes('p=3641') || rawUrl.includes('radicalstorage')) {
      return 'https://radicalstorage.tpk.lu/Qm4b7jm0';
    }
    if (rawUrl.includes('p=3585') || rawUrl.includes('ektatraveling')) {
      return 'https://ektatraveling.tpk.lu/2dmZqZZg';
    }
    if (rawUrl.includes('p=3813') || rawUrl.includes('promo_id=3813')) {
      return '/go/expedia';
    }
    if (rawUrl.includes('p=3297') || rawUrl.includes('promo_id=3297')) {
      return '/go/klook';
    }
    if (rawUrl.includes('p=5328') || rawUrl.includes('promo_id=5328')) {
      return '/go/nordvpn';
    }
    if (rawUrl.includes('p=2377') || rawUrl.includes('promo_id=2377')) {
      return '/go/worldnomads';
    }
    if (rawUrl.includes('p=3697') || rawUrl.includes('promo_id=3697')) {
      return '/go/wise';
    }

    // 2. Reconstruct Travelpayouts 'tp.media' structures to eliminate 400/404 response codes.
    // Preserves campaign_id, u, trs, and destination parameters required by CloudFront/Travelpayouts.
    if (hostname.includes('tp.media')) {
      const marker = urlObj.searchParams.get('marker') || urlObj.searchParams.get('shmarker') || '685596';
      const subid = urlObj.searchParams.get('subid') || urlObj.searchParams.get('sub_id');

      // Enforce the explicit dotted notation tracking structure: marker=MARKER_ID.SUBID
      let finalMarker = marker;
      if (subid && !marker.includes('.')) {
        finalMarker = `${marker}.${subid}`;
      }

      if (urlObj.searchParams.has('shmarker')) {
        urlObj.searchParams.set('shmarker', finalMarker);
      } else {
        urlObj.searchParams.set('marker', finalMarker);
      }

      // Ensure default TRS if not present
      if (!urlObj.searchParams.has('trs')) {
        urlObj.searchParams.set('trs', '474841');
      }

      // Clean up redundant sub_id
      if (urlObj.searchParams.has('sub_id')) {
        urlObj.searchParams.delete('sub_id');
      }
    }
    // 3. Clean up the 'tpk.lu' links and eliminate unnecessary hops or wrong keys
    else if (hostname.includes('tpk.lu')) {
      const subid = urlObj.searchParams.get('subid') || urlObj.searchParams.get('sub_id');
      if (subid) {
        urlObj.searchParams.delete('sub_id');
        urlObj.searchParams.set('subid', subid);
      }
    }

    return urlObj.toString();
  } catch (error) {
    // Highly resilient string fallback fallback if URL parsing fails
    let cleaned = rawUrl;
    cleaned = cleaned.replace(/\?\?/g, '?');
    cleaned = cleaned.replace(/&+/g, '&');
    return cleaned;
  }
}

/**
 * Dynamic sanitization/generation engine for BookMeThat outbound links
 * Corrects template path format and guards details to construct flawless outbound URLs.
 */
export function generateValidAffiliateUrl(
  programId: string | undefined,
  markerId: string | number | undefined,
  subId: string = "hub_card"
): string {
  // Guard against missing identifiers
  if (!markerId) return "https://travelpayouts.com";

  // Base configurations for standard TP.Media and TPK networks
  const cleanMarker = String(markerId).trim();
  const cleanSubId = encodeURIComponent(subId);

  switch (String(programId).toLowerCase()) {
    case 'nordvpn':
      return `/go/nordvpn`;
      
    case 'worldnomads':
      return `/go/worldnomads`;
      
    case 'wise':
      return `/go/wise`;

    case 'expedia':
      return `/go/expedia`;

    case 'klook':
      return `/go/klook`;

    case 'gocity':
    case 'go city':
      return `https://gocity.tpk.lu/u1mHhjxd`;

    case 'radicalstorage':
    case 'radical storage':
      return `https://radicalstorage.tpk.lu/Qm4b7jm0`;

    case 'ekta':
    case 'ektatraveling':
    case 'ekta traveling':
      return `https://ektatraveling.tpk.lu/2dmZqZZg`;

    default:
      // Fallback network safety route
      return `/go/${encodeURIComponent(String(programId || '').toLowerCase())}`;
  }
}

