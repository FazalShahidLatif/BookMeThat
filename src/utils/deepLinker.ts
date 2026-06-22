/**
 * BookMeThat.com - Elite Affiliate Growth Engine
 * Universal Programmatic Deep-Linking & SubID Attribution Mapper
 * 
 * Maps incoming path URLs (e.g., from internal articles, blog posts, or geo-pSEO landers)
 * directly to high-performing Travelpayouts (TP) merchant localized destination checkpoints.
 */

export interface DeepLinkMappingResult {
  path: string;
  detectedLocation: string;
  detectedType: 'esim' | 'car-rental' | 'general' | 'unknown';
  mappedPartners: {
    airalo: {
      name: string;
      rawTargetUrl: string; // The merchant direct endpoint
      travelpayoutsDeepLink: string; // Cleaned deeplink wrapper
    };
    saily: {
      name: string;
      rawTargetUrl: string;
      travelpayoutsDeepLink: string;
    };
    localrent: {
      name: string;
      rawTargetUrl: string;
      travelpayoutsDeepLink: string;
    };
  };
}

/**
 * Standard base affiliate links mapped directly from production credentials.
 */
export const TP_MERCHANT_BASES = {
  airalo: {
    baseUrl: 'https://airalo.tpk.lu/X5knsFOB',
    deeplinkRoot: 'https://www.airalo.com/',
    campaignId: 'airalo'
  },
  saily: {
    baseUrl: 'https://saily.tpk.lu/9KzgxKRI',
    deeplinkRoot: 'https://saily.com/',
    campaignId: 'saily'
  },
  localrent: {
    baseUrl: 'https://localrent.tpk.lu/YI6tdTTl',
    deeplinkRoot: 'https://localrent.com/en/',
    campaignId: 'localrent'
  }
};

/**
 * Clean and normalise location string from blog path slugs
 */
export function extractLocationFromPath(path: string): { location: string; type: 'esim' | 'car-rental' | 'general' | 'unknown' } {
  const normalized = path.toLowerCase().trim().replace(/^\/+/g, '');
  
  // Decide page category
  let type: 'esim' | 'car-rental' | 'general' | 'unknown' = 'unknown';
  if (normalized.includes('esim') || normalized.includes('cellular') || normalized.includes('connectivity')) {
    type = 'esim';
  } else if (normalized.includes('rental') || normalized.includes('car-hire') || normalized.includes('rentals') || normalized.includes('car-rental')) {
    type = 'car-rental';
  } else if (normalized.startsWith('blog/') || normalized.startsWith('deals/') || normalized.startsWith('guides/')) {
    type = 'general';
  }

  // Common pattern lookups: e.g. "how-to-get-an-esim-in-japan" or "cheap-car-rental-london"
  // Split path parts and locate keywords of geo-targeting
  const parts = normalized.split('/');
  const lastPart = parts[parts.length - 1] || '';

  let location = 'global';
  
  // Regex to strip known prefixes
  const esimMatch = lastPart.match(/(?:esim-in-|esim-|get-an-esim-in-|connectivity-in-|internet-in-)([a-z-]+)/);
  const rentalMatch = lastPart.match(/(?:car-rental-in-|cheap-car-rental-|car-rental-|car-hire-)([a-z-]+)/);
  const generalDeals = lastPart.match(/(?:deals-in-|deals-|guides-|guide-)([a-z-]+)/);

  if (esimMatch && esimMatch[1]) {
    location = esimMatch[1];
  } else if (rentalMatch && rentalMatch[1]) {
    location = rentalMatch[1];
  } else if (generalDeals && generalDeals[1]) {
    location = generalDeals[1];
  } else {
    // Basic automatic extract fallback rules
    const words = lastPart.split('-');
    const stopwords = ['how', 'to', 'get', 'an', 'esim', 'in', 'cheap', 'car', 'rental', 'rentals', 'hire', 'for', 'best', 'the', 'guide', 'deals', 'promo', 'coupon'];
    const filtered = words.filter(w => !stopwords.includes(w) && w.length > 2);
    if (filtered.length > 0) {
      location = filtered.join('-');
    }
  }

  return { location, type };
}

/**
 * Programmatic generator that converts a clean destination into precise merchant deep link structures.
 */
export function generateMerchantLocationUrl(partner: 'airalo' | 'saily' | 'localrent', location: string): string {
  const loc = location.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
  
  // Common edge conversions for countries/regions
  const countryAliases: Record<string, string> = {
    greece: 'greece',
    italy: 'italy',
    japan: 'japan',
    uk: 'united-kingdom',
    london: 'united-kingdom',
    usa: 'united-states',
    vietnam: 'vietnam',
    spain: 'spain',
    france: 'france',
    thailand: 'thailand',
    turkey: 'turkey',
    deutschland: 'germany',
    germany: 'germany'
  };

  const resolvedLoc = countryAliases[loc] || loc;

  switch (partner) {
    case 'airalo':
      // Airalo localized country links e.g. "https://www.airalo.com/japan-esim"
      return `https://www.airalo.com/${resolvedLoc}-esim`;
    
    case 'saily':
      // Saily country links e.g. "https://saily.com/country/japan-esim"
      return `https://saily.com/country/${resolvedLoc}-esim`;
    
    case 'localrent':
      // Localrent target URLs e.g. "https://localrent.com/en/greece/"
      return `https://localrent.com/en/${resolvedLoc}/`;
    
    default:
      return '';
  }
}

/**
 * Formats a raw vendor target link into a verified Travelpayouts redirect deep-link.
 * Preserves subID values directly in standard TP structure.
 */
export function buildTravelpayoutsDeepLink(partner: 'airalo' | 'saily' | 'localrent', destinationUrl: string, subId?: string): string {
  const partnerConfig = TP_MERCHANT_BASES[partner];
  
  // Format based on known Travelpayouts deep-linking schemes.
  // We can wrap target links inside our live proxy endpoint: `/go/[partner_name]?custom_url=[url_encoded]` or append direct parameters
  let resultUrl = '';
  
  if (partner === 'airalo') {
    // Airalo TP deep linkage uses basic tracking structure
    resultUrl = `https://airalo.tpk.lu/X5knsFOB?cls=${encodeURIComponent(destinationUrl)}`;
  } else if (partner === 'saily') {
    // Saily direct deep link formatting
    resultUrl = `https://saily.tpk.lu/9KzgxKRI?cls=${encodeURIComponent(destinationUrl)}`;
  } else if (partner === 'localrent') {
    // Localrent tracking gateway
    resultUrl = `https://localrent.tpk.lu/YI6tdTTl?custom_url=${encodeURIComponent(destinationUrl)}`;
  } else {
    resultUrl = partnerConfig.baseUrl;
  }

  // Inject subID tracking parameter for zero-revenue debugging
  if (subId) {
    const separator = resultUrl.includes('?') ? '&' : '?';
    resultUrl = `${resultUrl}${separator}subid=${encodeURIComponent(subId)}`;
  }

  return resultUrl;
}

/**
 * Main tracking mapper mapping absolute or relative blog paths into complete, secure outbound deep-links.
 */
export function mapBlogPathToDeepLinks(path: string, customSubId?: string): DeepLinkMappingResult {
  const { location, type } = extractLocationFromPath(path);
  
  const rawAiralo = generateMerchantLocationUrl('airalo', location);
  const rawSaily = generateMerchantLocationUrl('saily', location);
  const rawLocalrent = generateMerchantLocationUrl('localrent', location);

  // Generate complete affiliate links
  const airaloTp = buildTravelpayoutsDeepLink('airalo', rawAiralo, customSubId);
  const sailyTp = buildTravelpayoutsDeepLink('saily', rawSaily, customSubId);
  const localrentTp = buildTravelpayoutsDeepLink('localrent', rawLocalrent, customSubId);

  return {
    path,
    detectedLocation: location,
    detectedType: type,
    mappedPartners: {
      airalo: {
        name: 'Airalo eSIM',
        rawTargetUrl: rawAiralo,
        travelpayoutsDeepLink: airaloTp
      },
      saily: {
        name: 'Saily eSIM',
        rawTargetUrl: rawSaily,
        travelpayoutsDeepLink: sailyTp
      },
      localrent: {
        name: 'Localrent Car Hire',
        rawTargetUrl: rawLocalrent,
        travelpayoutsDeepLink: localrentTp
      }
    }
  };
}
