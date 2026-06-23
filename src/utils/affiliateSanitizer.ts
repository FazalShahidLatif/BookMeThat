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

    // 2. Reconstruct Travelpayouts 'tp.media' structures to eliminate 400/404 response codes.
    // Standardizing parameters avoids unexpected keys that cause API gateway rejection.
    if (hostname.includes('tp.media')) {
      const marker = urlObj.searchParams.get('marker') || urlObj.searchParams.get('shmarker') || '685596';
      const programId = urlObj.searchParams.get('p') || urlObj.searchParams.get('promo_id');
      const subid = urlObj.searchParams.get('subid') || urlObj.searchParams.get('sub_id');

      const cleanParams = new URLSearchParams();

      // Enforce the explicit dotted notation tracking structure: marker=MARKER_ID.SUBID
      let finalMarker = marker;
      if (subid && !marker.includes('.')) {
        finalMarker = `${marker}.${subid}`;
      }

      const isPromoClick = urlObj.pathname.includes('/click');

      if (isPromoClick) {
        cleanParams.set('shmarker', finalMarker);
        if (programId) cleanParams.set('promo_id', programId);
        cleanParams.set('source_type', 'link');
        cleanParams.set('type', 'click');
        urlObj.pathname = '/click';
      } else {
        cleanParams.set('marker', finalMarker);
        if (programId) cleanParams.set('p', programId);
        urlObj.pathname = '/r';
      }

      urlObj.search = cleanParams.toString();
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
      // Corrected direct structural path format for TP Media network (solving template typo `{cleanMarker}` -> `/r?marker=${cleanMarker}`)
      return `https://tp.media/r?marker=${cleanMarker}&p=5328&subid=${cleanSubId}&campaign_id=121`;
      
    case 'worldnomads':
      return `https://tp.media/r?marker=${cleanMarker}&p=2377&subid=${cleanSubId}&campaign_id=89`;
      
    case 'wise':
      return `https://tp.media/r?marker=${cleanMarker}&p=3697&subid=${cleanSubId}&campaign_id=164`;

    default:
      // Fallback network safety route
      return `https://travelpayouts.com/?marker=${cleanMarker}`;
  }
}

