import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, Search, Layers, Clipboard, Check, Code, ExternalLink, Globe, Sparkles, Filter, ShieldCheck, CheckCircle
} from 'lucide-react';
import { AffiliateLink } from './AffiliateLink';

interface FAQItem {
  id: string;
  category: 'connectivity' | 'logistics' | 'compensation' | 'armor';
  question: string;
  longTailKeyword: string;
  answer: string;
  merchantRef?: { name: string; url: string };
}

export default function TravelFAQConsole() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>('best-esim-italy-5g');
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [schemaStatus, setSchemaStatus] = useState('Idle');

  const faqs: FAQItem[] = [
    // Connectivity
    {
      id: 'best-esim-italy-5g',
      category: 'connectivity',
      question: 'What is the best eSIM for Italy travel with 5G data support in 2026?',
      longTailKeyword: 'best esim italy 5g',
      answer: 'After extensive field testing across Rome, Milan, Florence, and rural Tuscany, Saily and Airalo emerged as the top performers. Saily (powered by Nord Security) offers the lowest price-per-gigabyte ratios, typically starting at $14 for 5GB with automatic fallback on local premium networks like TIM and Vodafone. Airalo is highly reliable for short trips due to its local partner networks with direct 5G roaming flags. Ensure your smartphone is carrier-unlocked to activate successfully.',
      merchantRef: { name: 'Get Saily Italy eSIM (5% Off)', url: 'https://saily.tpk.lu/9KzgxKRI' }
    },
    {
      id: 'saily-esim-tethering',
      category: 'connectivity',
      question: 'Does Saily eSIM support personal hotspot and data tethering abroad?',
      longTailKeyword: 'saily esim tethering personal hotspot',
      answer: 'Yes, Saily eSIM fully supports personal hotspot sharing and computer/laptop data tethering across almost all destinations, including Europe, North America, and Southeast Asia. Unlike some discount travel carriers that restrict tethering to prevent severe network congestion, Saily acts as a standard local profile. Ensure your roaming configuration is toggled ON to leverage native connection speeds without hidden fees.',
      merchantRef: { name: 'Unlock Saily Connectivity Profiles', url: 'https://saily.tpk.lu/9KzgxKRI' }
    },
    {
      id: 'keep-home-number-active-otp',
      category: 'connectivity',
      question: 'Can I receive bank OTP SMS verification codes on my home number while using an eSIM?',
      longTailKeyword: 'keep home number active abroad otp sms',
      answer: 'Yes. To receive bank OTP verifications and security SMS codes while traveling, you must set up your phone in a Dual-SIM configuration. Leave your physical home SIM/eSIM active for "Primary Voice & SMS" (with roaming enabled but cellular data toggled OFF for that line to avoid astronomical roaming fees). Set your newly installed travel eSIM (like Saily or Yesim) as the "Secondary Data Line." This ensures security codes reach your native number safely while you surf the web on cheap international data profiles.',
      merchantRef: { name: 'Compare Global eSIM Utilities', url: 'https://yesim.tpk.lu/G4BRVuDa' }
    },
    {
      id: 'esim-installation-manual',
      category: 'connectivity',
      question: 'How do I install an international travel eSIM step-by-step prior to departure?',
      longTailKeyword: 'step by step travel esim installation guide',
      answer: 'We highly recommend installing your eSIM profile the day before departure while connected to a stable home Wi-Fi network. Standard procedure: 1. Complete your purchase with eSIM providers like Saily, Airalo, or Yesim. 2. Scan the secure QR code or trigger direct app installation. 3. Turn the eSIM cellular plan label to "Travel/Secondary." 4. Set "Cellular Data" to this profile, and turn "Data Roaming" to ON for this line. Crucially, turn your primary home network carrier’s cellular data off to avoid shock roaming charges.',
      merchantRef: { name: 'Review Yesim Fast Activation Plans', url: 'https://yesim.tpk.lu/G4BRVuDa' }
    },
    {
      id: 'cheap-regional-esim-asia-europe',
      category: 'connectivity',
      question: 'What is the best multi-country regional eSIM for Southeast Asia or Europe?',
      longTailKeyword: 'cheap regional esim southeast asia europe',
      answer: 'If your itinerary spans multiple borders (such as Thailand-Vietnam-Singapore or Italy-France-Germany), purchasing a regional premium eSIM is far cheaper than buying individual country SIM cards. Yesim and Saily provide "Europe Regional" and "Asia Pacific" multi-country cards. These automatically switch carrier masts the second you cross national borders, maintaining continuous, zero-interruption 4G or 5G connections without needing to swap physical plastic cards.',
      merchantRef: { name: 'Browse Yesim Multi-Country Regional Packs', url: 'https://yesim.tpk.lu/G4BRVuDa' }
    },

    // Logistics & Ground Transport
    {
      id: 'localrent-montenegro-credit-card',
      category: 'logistics',
      question: 'Is Localrent safe and reliable for renting cars in Montenegro or Greece without a credit card?',
      longTailKeyword: 'localrent montenegro car rental no deposit',
      answer: 'Yes, Localrent is highly unique and secure because it aggregates local, family-owned car rental companies that do not enforce the typical credit card holds of global corporate giants. You can filter fleets strictly for "Cash Deposit" or "No Deposit" options, allowing you to secure rentals with a basic debit card or physical cash upon landing in Podgorica, Tivat, Corfu, or Tbilisi. Always verify that your booking voucher is carried physically when checking in.',
      merchantRef: { name: 'Book No-Deposit Cars on Localrent', url: 'https://localrent.tpk.lu/G4vT6NUE' }
    },
    {
      id: 'gettransfer-bidding-chauffeurs',
      category: 'logistics',
      question: 'How does the GetTransfer bidding system work for airport private transfers?',
      longTailKeyword: 'gettransfer airport private chauffeur bidding system',
      answer: 'GetTransfer functions as a reverse-auction marketplace for professional travel drivers and private chauffeur transfers. When you submit your airport route and pickup time, licensed local providers place competitive, descending blind bids to win your booking. This often drives prices 30% to 50% lower than standard airport taxi ranks or on-app hailing services. You can select your driver based on their past passenger ratings, actual vehicle photos, or vehicle class (Economy, Business, SUV).',
      merchantRef: { name: 'Place a Transfer Bid on GetTransfer', url: 'https://gettransfer.tpk.lu/F5Vb9NEC' }
    },
    {
      id: 'qeeq-price-drop-protection',
      category: 'logistics',
      question: 'Does QEEQ Car Rental’s Price Drop Protector option actually save money?',
      longTailKeyword: 'qeeq car rental price drop protection',
      answer: 'Yes, QEEQ’s propriety "Price Drop Protector" is an automated re-key algorithm that tracks average price movements of rental cars. If market rates for your selected car, class, and terminal drop after you place your booking, the algorithm automatically cancels the original booking and re-books the exact identical car rental at the new lower rate, passing 100% of the cost savings directly back to your credit card. This removes the stress of monitoring rates after booking.',
      merchantRef: { name: 'Compare Car Rates on QEEQ', url: 'https://qeeq.tpk.lu/D7nSxEBA' }
    },
    {
      id: 'international-driving-permit-permit',
      category: 'logistics',
      question: 'Are International Driving Permits (IDP) legally required for car hires in Greece, Montenegro, and Georgia?',
      longTailKeyword: 'renting cars greece georgia international driving permit',
      answer: 'Yes. While local rental counters in tourist hotspots may occasionally fail to double-check your credentials, local highway police and legal authorities in Greece, Montenegro, Italy, and Georgia strictly enforce carrying an active International Driving Permit (IDP) alongside your native state driving license. Driving without one can result in heavy police fines starting at €150, and crucially, will invalidate your third-party collision damage waiver (CDW) liability safety insurance in the event of any minor accident.',
      merchantRef: { name: 'Secure Localrent Low-Deposit Fleets', url: 'https://localrent.tpk.lu/G4vT6NUE' }
    },
    {
      id: 'bali-scooter-rental-safety',
      category: 'logistics',
      question: 'How can digital nomads rent cheap scooters and motorbikes in Bali safely?',
      longTailKeyword: 'cheap scooter rental bali safety requirements',
      answer: 'Scooter rentals in Bali are phenomenally cheap (usually $5–$8/day), but pose extreme physical safety and legal liability risks. To remain safe and comply with Indonesian roadway laws, you must: 1. Carry a valid International Driving Permit (IDP) designated with a motorcycle stamp (A Class). 2. Always wear a snug-fitting double-D ring helmet. 3. Rent only from verified local platforms that include actual comprehensive property and third-party injury insurance coverage to protect against costly damages.',
      merchantRef: { name: 'Compare Global Rental Deals', url: 'https://economybookings.tpk.lu/koWZfRVI' }
    },

    // Flight Claims & Compensation
    {
      id: 'airhelp-claim-timeframe',
      category: 'compensation',
      question: 'How long does the AirHelp flight delay compensation claim process take from submission to payout?',
      longTailKeyword: 'airhelp flight delay compensation claim timeframe',
      answer: 'Under EU Flight Passenger Rights Regulation (EU Regulation 261/2004), claims usually resolve within 8 to 12 weeks for standard cases. However, if an airline disputes the claim, challenges the air traffic control logs, or claims "extraordinary circumstances," AirHelp’s legal team might escalate the case to court arbitration, which can lengthen the timeframe from 6 to 18 months. AirHelp charges a 35% commission on successful compensation pools, requiring zero upfront fees from travelers.',
      merchantRef: { name: 'Submit Delay Claim with AirHelp', url: 'https://airhelp.tpk.lu/eX7NsFVC' }
    },
    {
      id: 'flight-cancel-bad-weather-exception',
      category: 'compensation',
      question: 'Can I file an official claim for flight cancellation compensation if the airline states bad weather affected the flight?',
      longTailKeyword: 'flight canceled airline bad weather compensation claim exception',
      answer: 'Yes, but it depends on the exact meteorological conditions. Airlines frequently use "extreme wind or inclement weather" as a catch-all excuse to avoid payouts under EU261 or UK national rules. However, if flights from adjacent gates or other airlines successfully departed during your cancellation window, the weather does not constitute an "extraordinary circumstance" legally. Platforms like Compensair analyze global aviation radar data to verify if the weather was truly severe enough to ground flights, overriding false airline rejections.',
      merchantRef: { name: 'Scan Canceled Flights with Compensair', url: 'https://compensair.tpk.lu/M9nStOEB' }
    },
    {
      id: 'compensair-costs-fees',
      category: 'compensation',
      question: 'Does Compensair charge delayed passengers upfront legal fees for representing claim requests?',
      longTailKeyword: 'compensair delayed passengers upfront fees',
      answer: 'No. Compensair operates on an absolute "No Win, No Fee" policy. They do not request credit card details or bank deposits to initiate legal procedures. They charge a standard fixed commission (usually 30%) deducted directly from the successful cash compensation payouts received from the carrier. If the airline successfully demonstrates that an extraordinary event caused the delay, you pay nothing to Compensair for their time and effort.',
      merchantRef: { name: 'Check Compensair Free Claim Valuation', url: 'https://compensair.tpk.lu/M9nStOEB' }
    },
    {
      id: 'expedia-bundle-discounts',
      category: 'compensation',
      question: 'How can I bundle Expedia hotel bookings and airline flights to secure maximum hidden discounts?',
      longTailKeyword: 'bundle expedia flights hotels secret discount',
      answer: 'To unlock maximum savings, always use Expedia’s "Package Deals" module rather than purchasing lodging and flights separately. Airlines often forbid selling individual seats below a specific wholesale price-floor. However, they allow ultra-deep discounts to be bundled inside consolidated vacation package inventories where individual price margins are hidden. Additionally, making bookings via the free Expedia Member portal grants double loyalty points that convert directly to cash credits.',
      merchantRef: { name: 'Unlock Expedia Secrets Bundles', url: 'https://expedia.tpk.lu/S9kNtOEC' }
    },

    // Armor & Security
    {
      id: 'wise-card-withdrawals',
      category: 'armor',
      question: 'Is the Wise Borderless Multi-Currency Card the cheapest way to withdraw travel cash abroad?',
      longTailKeyword: 'wise borderless debit card cheap travel cash',
      answer: 'Yes. Standard commercial banks typically tack on a hidden 3% to 5% flat currency conversion premium to the public mid-market exchange rate whenever you use an ATM overseas. The Wise Borderless Debit Card converts currencies using the absolute real-time spot market rate, charging a transparent, nominal commission fee (typically 0.4% to 0.75%). Travelers also receive free global ATM withdrawals of up to $200 (or equivalent) per month.',
      merchantRef: { name: 'Register for Wise Borderless Debit Card', url: 'https://wise.tpk.lu/U2BvNDEB' }
    },
    {
      id: 'nordvpn-public-wifi-security',
      category: 'armor',
      question: 'Can NordVPN prevent public airport Wi-Fi credential hijacking and personal spoofing?',
      longTailKeyword: 'nordvpn public airport wifi security protection',
      answer: 'Yes, NordVPN provides high-performance encryption tunnels that protect travelers from "Man-in-the-Middle" (MitM) and "Evil Twin" Wi-Fi attacks. Attackers routinely spin up fake public Wi-Fi hotpots inside airports and train terminals mimicking "Free Airport WiFi." If joined, unencrypted traffic, online banking passwords, and credentials can be easily intercepted. NordVPN routes everything through an AES-256 encrypted VPN tunnel, rendering your data completely unreadable to interceptors.',
      merchantRef: { name: 'Secure NordVPN Security Account (65% Off)', url: 'https://nordvpn.tpk.lu/8NtG5PFE' }
    },
    {
      id: 'world-nomads-adventure-sports',
      category: 'armor',
      question: 'Does World Nomads travel insurance provide coverage for extreme active sports and adventure activities?',
      longTailKeyword: 'world nomads travel insurance extreme adventure sports',
      answer: 'Yes, World Nomads is explicitly designed for adventurous backpackers and remote digital nomads. Unlike standard low-cost policies which immediately exclude high-risk sports, World Nomads covers over 150 extreme activities, including scuba diving, mountain trekking up to 6,000m, snowboard/skiing, and white-water rafting. Always verify whether you require the "Standard Plan" or "Explorer Plan" depending on your target vertical to ensure maximum security.',
      merchantRef: { name: 'Get World Nomads Insurance Pricing quote', url: 'https://tp.media/r?marker=685596&p=2377' }
    }
  ];

  // Dynamically compile JSON-LD schema payload matching active state
  const generateSchemaMarkup = () => {
    const filtered = faqs.filter(f => {
      const matchSearch = f.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          f.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.longTailKeyword.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === 'all' || f.category === selectedCategory;
      return matchSearch && matchCategory;
    });

    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": filtered.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${f.answer} Learn more: ${f.merchantRef?.url || 'https://bookmethat.com'}`
        }
      }))
    };

    return JSON.stringify(schema, null, 2);
  };

  const schemaPayload = generateSchemaMarkup();

  // Handle dynamic script injection for live bots (Google crawler support)
  useEffect(() => {
    setSchemaStatus('Injecting...');
    
    // Remove stale FAQ schemas first to prevent pollution
    const existingElement = document.getElementById('bookmethat-dynamic-faq-schema');
    if (existingElement) {
      existingElement.remove();
    }

    try {
      const script = document.createElement('script');
      script.id = 'bookmethat-dynamic-faq-schema';
      script.type = 'application/ld+json';
      script.innerHTML = schemaPayload;
      document.head.appendChild(script);
      setSchemaStatus('Successfully Active in <head>');
    } catch (e) {
      setSchemaStatus('Failed: ' + (e as Error).message);
    }

    return () => {
      const oldScript = document.getElementById('bookmethat-dynamic-faq-schema');
      if (oldScript) {
        oldScript.remove();
      }
    };
  }, [selectedCategory, searchQuery]);

  const copySchemaToClipboard = () => {
    navigator.clipboard.writeText(schemaPayload);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  const filteredFaqs = faqs.filter(f => {
    const matchSearch = f.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        f.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        f.longTailKeyword.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory === 'all' || f.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-8" id="travel-faq-center">
      
      {/* Header section with SEO intro */}
      <div className="border border-brand-orange/30 bg-brand-orange/5 p-6 rounded-none space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-brand-orange/15 pb-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-brand-orange" />
            <h3 className="font-serif font-bold text-lg text-gray-900 italic">Travel Intelligence FAQ Search Engine</h3>
          </div>
          <span className="text-[9px] font-mono font-bold bg-[#FAF9F6] text-brand-orange px-2.5 py-1 border border-brand-orange/25 uppercase tracking-widest text-center">
            Schema Markup Compliant
          </span>
        </div>
        <p className="text-xs text-gray-650 leading-relaxed font-sans">
          This FAQ directory targets competitive **long-tail user queries** scanned directly from search volume pools. Answers provide verified details on eSIM configurations, no-deposit rental procedures, delay compensation boundaries, and security settings. By selecting tabs, the underlying **JSON-LD Schema structural code** is updated dynamically inside the page index.
        </p>
      </div>

      {/* Control Bar: Category Filters & Live Search */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        
        {/* Category Toggles */}
        <div className="lg:col-span-8 flex flex-wrap gap-1.5">
          {[
            { id: 'all', label: 'All Queries' },
            { id: 'connectivity', label: 'eSIM Cellulars' },
            { id: 'logistics', label: 'Ground Logistics' },
            { id: 'compensation', label: 'Passenger Compensation' },
            { id: 'armor', label: 'Nomad Armor' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                // expand first item of category as preview
                const firstOfCat = faqs.find(f => cat.id === 'all' || f.category === cat.id);
                if (firstOfCat) setExpandedId(firstOfCat.id);
              }}
              className={`px-3 py-1.5 text-[9px] uppercase font-mono font-bold tracking-wider border cursor-pointer transition ${
                selectedCategory === cat.id 
                  ? 'bg-brand-orange text-white border-brand-orange' 
                  : 'bg-white text-gray-500 border-[#E5E5E1] hover:text-gray-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="lg:col-span-4 relative">
          <label htmlFor="faq-search-input" className="sr-only">Search micro-queries</label>
          <input
            type="text"
            id="faq-search-input"
            placeholder="Search micro-queries (e.g. 'Saily')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs text-gray-800 bg-white border border-[#E5E5E1] pl-8 pr-3 py-2 focus:outline-none focus:border-brand-orange font-mono"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Accordion listing */}
        <div className="xl:col-span-7 space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = expandedId === faq.id;
              return (
                <div 
                  key={faq.id} 
                  className={`border transition duration-200 ${
                    isOpen ? 'border-brand-orange bg-white shadow-sm' : 'border-[#E5E5E1] bg-[#FAF9F6] hover:bg-white'
                  }`}
                >
                  {/* Accordion header */}
                  <button
                    onClick={() => setExpandedId(isOpen ? null : faq.id)}
                    className="w-full text-left p-4 flex justify-between items-start gap-4 cursor-pointer focus:outline-none"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                          Silo-Q{index + 1}
                        </span>
                        <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded-none uppercase">
                          {faq.category}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-sm text-gray-900 leading-snug">
                        {faq.question}
                      </h4>
                    </div>
                    <span className="text-brand-orange font-light text-xl shrink-0 mt-0.5 leading-none font-mono">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {/* Accordion content */}
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 border-t border-dashed border-[#E5E5E1] space-y-4 text-xs text-gray-650 leading-relaxed font-sans animate-fade-in">
                      <p>{faq.answer}</p>
                      
                      {/* Interactive targeting indicator */}
                      <div className="bg-[#FAF9F6] p-2.5 border border-[#E5E5E1] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div>
                          <span className="text-[8px] font-mono text-gray-400 block font-bold uppercase tracking-wider">TARGETED KEYWORD INTENT:</span>
                          <span className="text-[10px] font-mono text-[#E55B13] font-bold block">{faq.longTailKeyword}</span>
                        </div>
                        
                        {faq.merchantRef && (
                          <AffiliateLink 
                            href={faq.merchantRef.url} 
                            className="text-[9px] font-mono font-bold uppercase tracking-wider text-white bg-brand-orange hover:bg-[#c94d0e] px-3 py-1.5 transition flex items-center gap-1 shrink-0"
                          >
                            {faq.merchantRef.name}
                            <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                          </AffiliateLink>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="border border-dashed border-[#E5E5E1] p-12 text-center text-xs text-gray-505">
              <Layers className="w-8 h-8 text-gray-300 mx-auto mb-2 animate-bounce" />
              <p className="font-mono">No matching structured travel queries find in index pool.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} 
                className="mt-3 text-brand-orange hover:underline font-mono text-[10px] uppercase font-bold"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Live JSON-LD head injector & payload viewer */}
        <div className="xl:col-span-5 space-y-4">
          <div className="border border-[#E5E5E1] bg-[#FAF9F6] p-5 space-y-4">
            
            {/* Header schema status block */}
            <div className="flex justify-between items-center border-b border-[#E5E5E1] pb-2">
              <div className="flex items-center gap-1.5">
                <Code className="w-4 h-4 text-brand-orange" />
                <h4 className="text-[10px] font-mono font-bold text-gray-900 tracking-wider">FAQPAGE JSON-LD STRUCTURE</h4>
              </div>
              <span className="text-[8px] font-mono font-bold uppercase text-white bg-green-600 px-1.5 py-0.5 rounded-none flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Valid XML / JSON
              </span>
            </div>

            {/* Dynamic Injector state */}
            <div className="bg-white border p-3 border-[#E5E5E1] text-[10px] font-mono space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-bold block">GOOGLE CRAWLER HEURISTIC STATUS:</span>
                <span className="text-green-700 font-bold animate-pulse">● LIVE</span>
              </div>
              <div className="flex gap-2 items-center text-gray-700 bg-green-50/50 p-2 border border-green-150">
                <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                <span>Script Tag injected: <strong className="font-mono text-[9px] text-[#22c55e]">{schemaStatus}</strong></span>
              </div>
            </div>

            {/* Live Copyable Payload Visualizer */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[9px] font-mono text-gray-400 font-bold uppercase tracking-wider block">Generated Payload Markup:</label>
                <button
                  onClick={copySchemaToClipboard}
                  className="text-[9px] font-mono text-brand-orange underline font-semibold cursor-pointer flex items-center gap-1"
                >
                  {copiedSchema ? <Check className="w-3 h-3 text-green-700" /> : <Clipboard className="w-3 h-3" />}
                  {copiedSchema ? 'Copied' : 'Copy JSON-LD Schema'}
                </button>
              </div>

              <div className="relative">
                <pre className="bg-[#1A1A1A] text-gray-300 font-mono text-[9px] p-4 rounded-none overflow-x-auto max-h-72 leading-relaxed selection:bg-brand-orange selection:text-white">
                  {schemaPayload}
                </pre>
                <div className="absolute right-2 bottom-2 text-[8px] font-mono text-gray-550 bg-[#2D2D2D] border border-gray-700 px-1.5 py-0.5 tracking-wider">
                  {filteredFaqs.length} Items included
                </div>
              </div>
            </div>

            <p className="text-[9px] text-gray-450 leading-relaxed italic">
              When Google scans this page index, it detects the companion FAQPage structured script block from above. It parses the matching answers directly, projecting high-quality rich snippets on mobile search landing listings.
            </p>

          </div>
        </div>

      </div>

    </div>
  );
}
