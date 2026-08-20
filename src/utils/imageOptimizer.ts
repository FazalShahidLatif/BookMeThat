/**
 * BookMeThat.com - Asset Routing & Image Optimization Engine
 * 
 * Maps travel articles directly to fast, specialized, high-resolution Unsplash assets
 * that match their precise geographic location and transactional context.
 * Prevents repeating generic image fallbacks across distinct topics.
 */

// Mapping of Article ID to precise Unsplash Photo IDs matching the article descriptions
const ARTICLE_PHOTO_IDS: Record<string, string> = {
  // SILO 1: CELLULAR CONNECTIVITY & eSIMS
  'best-esim-japan': 'photo-1503899036084-c55cdd92da26', // Tokyo neon cityscape & bullet train connectivity
  'best-esim-usa': 'photo-1485738422979-f5c462d49f74', // New York skyline & USA 5G data
  'best-esim-italy': 'photo-1516483638261-f4dbaf036963', // Beautiful view of Venice/Italy
  'best-travel-esims-pillar': 'photo-1488646953014-85cb44e25828', // Travel map with smartphone
  'saily-vs-airalo-esim-speed': 'photo-1562408590-e32931084e23', // Clean high-tech cellular interface
  'yesim-mobile-deep-dive': 'photo-1511707171634-5f897ff02aa9', // Sleek smartphone user interface
  'home-number-active-abroad': 'photo-1488085061387-422e29b40080', // Boarding pass and passports
  'install-esim-iphone-android': 'photo-1563986768609-322da13575f3', // Detailed cell phone settings configuration
  'cheap-esims-southeast-asia-europe': 'photo-1528127269322-539801943592', // Stunning Southeast Asian tourist temple
  'drimsim-pay-as-you-go-esim': 'photo-1451187580459-43490279c0fa', // High-tech satellite network globe
  'best-regional-esim-southeast-asia-saily': 'photo-1525625293386-3f8f99389edd', // Singapore skyline sunset

  // SILO 2: GROUND TRANSPORT & CAR RENTALS
  'car-rental-insurance-excess-counter-hacks': 'photo-1449965408869-eaa3f722e40d', // Car keys and inspection clipboard at airport desk
  'discovercars-vs-localrent-vs-economybookings': 'photo-1549399542-7e3f8b79c341', // Modern rental car fleet parked at scenic coastal road
  'ground-logistics-master-pillar': 'photo-1533473359331-0135ef1b58bf', // Rental car traveling down scenic mountain road
  'localrent-cars-deposit-secrets': 'photo-1568605117036-5fe5e7bab0b7', // Clean keys and vehicle front
  'gettransfer-driver-bidding': 'photo-1449965408869-eaa3f722e40d', // Hands of a driver on high-quality steering wheel
  'qeeq-price-drop-protection': 'photo-1551836022-d5d88e9218df', // Analytics tracker dashboard rates
  'rent-car-montenegro-greece': 'photo-1486496146582-9ffcd0b2b2b7', // Mountain pass coast road Montenegro/Greece
  'localrent-georgia-balkans-secrets': 'photo-1504280390367-361c6d9f38f4', // Off-road tracking car Tbilisi mountains
  'road-trip-car-hire-rental-comparison': 'photo-1532974297617-c0f05fe48bff', // Beautiful white convertible on sea-cliff highway
  'localrent-georgia-tbilisi-car-rental-reviews-model': 'photo-1514362545857-3bc16c4c7d1b', // Medieval Tbilisi church valley Caucasus

  // SILO 3: PASSENGER RIGHTS, FLIGHT DELAYS & STAY BOOKINGS
  'japan-rail-pass-2026-worth-it-calculator': 'photo-1538688525198-9b88f6f53126', // Japanese Shinkansen bullet train Mount Fuji
  'viator-vs-getyourguide-vs-klook': 'photo-1502602898657-3e91760cbb34', // Paris Louvre & Colosseum skip-the-line tour tickets
  'flight-delay-cancellation-refund-chargeback-guide': 'photo-1512753360435-329c4535a9a7', // Airport departure delay schedule board
  'passenger-restitution-hotel-pillar': 'photo-1436491865332-7a61a109cc05', // Passenger flight terminal runways golden sunrise
  'airhelp-delayed-flight-eu261': 'photo-1474487548417-781cb71495f3', // High-definition airport delayed flights board
  'expedia-bundle-deals-hacks': 'photo-1507525428034-b723cf961d3e', // Resort beachfront vacation booking vibes
  'flight-canceled-emergency-steps': 'photo-1530521951415-324156efddc7', // Canceled status monitors at high-traffic train/airport terminal
  'passenger-rights-namer-asia': 'photo-1517059224940-d4af9eec41b7', // Jet aircraft taking off strongly in blue skies
  'airhelp-flight-compensation-us-eu-acts': 'photo-1556742044-3c52d6e88c62', // Suitcases in modern airport lounge
  'expedia-hotel-bundle-secret-unlocked': 'photo-1540555700478-4be289fbecef', // Guest overlooking infinity luxury resort pool
  'compensair-airhelp-flight-refunds': 'photo-1520607162513-77705c0f0d4a', // Analytical tracking of flight delay claims
  'expedia-discount-dynamic-bundling-algorithm-hacks': 'photo-1522202176988-66273c2fd55f', // Collaborative booking tech screen

  // SILO 4: NOMAD BANKING, SECURITY & MULTI-CURRENCY CHECKS
  'safetywing-vs-world-nomads-heymondo': 'photo-1501504905252-473c47e087f8', // Digital nomad with laptop, passport, and medical travel insurance
  'nomad-security-finance-pillar': 'photo-1527685216984-a1a47deb0020', // Nomad workspace overlooking palm shorelines
  'wise-borderless-saving-forex': 'photo-1580519542036-c47de6196ba5', // Wise multi-currency wallet credit card and cash
  'nordvpn-travel-threat-defence': 'photo-1563968743331-244a8a12c8ad', // Secure laptops with VPN server locks active
  'world-nomads-adventure-insurance': 'photo-1464822759023-fed622ff2c3b', // Climber on sharp mountain peak cliffs
  'global-business-banking-abroad': 'photo-1454165804606-c3d57bc86b40', // International financial advisor charts on workdesk
  'wise-vs-revolut-travel-card-fees': 'photo-1559526324-4b87b5e36e44', // Multi-card secure cashless transactions
  'klook-gocity-sightseeing-passes': 'photo-1513635269975-59663e0ca1ad', // London tower bridge historic landmarks
  'baggage-freedom-radical-storage-guide': 'photo-1492691527719-9d1e07e534b4', // Tourist exploring historic streets with no luggage burden
  'how-to-withdraw-foreign-currency-cash-zero-fees': 'photo-1502920917128-1aa500764cbd', // Modern cash ATM safe card extraction
  'travelpayouts-rpm-masterclass': 'photo-1460925895917-afdab827c52f', // Digital nomad travel marketing workspace with performance charts
  'travelpayouts-operational-blueprint': 'photo-1551836022-d5d88e9218df', // Modern analytical dashboard and desk
  'travelpayouts-destination-guide': 'photo-1488646953014-85cb44e25828', // Global travel destination planning mapping
  'travelpayouts-tech-automation': 'photo-1552202176988-66273c2fd55f', // Dynamic automation tech screen
  'travelpayouts-esim-growth-loop': 'photo-1563986768609-322da13575f3' // Premium modern smartphone screen with active eSIM metrics
};

// Map silo names to high-quality Unsplash fallbacks
const SILO_FALLBACKS: Record<string, string> = {
  'connectivity': 'photo-1563986768609-322da13575f3', // Tech/Mobile
  'transport': 'photo-1549399542-7e3f8b79c341', // Roadway/Car
  'booking': 'photo-1436491865332-7a61a109cc05', // Airport/Sky
  'utility': 'photo-1563013544-824ae1d704d3', // Secured network node/Cards
  'general': 'photo-1488646953014-85cb44e25828' // Globe/Travel Map
};

/**
 * Resolves a highly optimized Unsplash URL with exact dimensions, focus, and compress parameters.
 * 
 * @param articleId The identifier of the article
 * @param silo The fallback travel category
 * @param width The target pixel width (defaults to 800)
 * @param height The target pixel height (defaults to 450)
 */
export function getOptimizedArticleImage(
  articleId: string, 
  silo: string, 
  width: number = 800, 
  height: number = 450
): string {
  // 1. Check for specific matching high-res Unsplash ID
  let photoId = ARTICLE_PHOTO_IDS[articleId];
  
  if (!photoId) {
    // 2. Lookup silo fallback
    photoId = SILO_FALLBACKS[silo] || SILO_FALLBACKS.general;
  }

  // 3. Format complete Unsplash URL optimized for production loads
  // Use lossless auto-formatting, optimal cropping, and reliable compression (q=80)
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;
}
